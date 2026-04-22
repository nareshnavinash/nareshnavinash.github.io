#!/usr/bin/env node
// Probe real-browser CPU / FPS while a page is live.
// Uses Playwright's bundled Chrome (GPU-enabled, unlike LH headless).
import { chromium } from 'playwright'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const OUT = resolve('.lh')
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

const TAG = process.argv[2] || `probe-${Date.now()}`
const PATHS = process.argv.slice(3).length ? process.argv.slice(3) : ['/', '/profile.html', '/world.html']
const BASE = 'http://localhost:5175'
const DURATION_MS = 6000

const probeScript = (ms) => `
    (async () => {
        const start = performance.now()
        let frames = 0
        let longTaskMs = 0
        let lastT = start
        const frameGaps = []
        const longTaskObs = new PerformanceObserver((list) => {
            for (const e of list.getEntries()) longTaskMs += e.duration
        })
        try { longTaskObs.observe({ type: 'longtask', buffered: true }) } catch (e) {}
        await new Promise((resolve) => {
            const tick = (t) => {
                frames++
                frameGaps.push(t - lastT)
                lastT = t
                if (t - start < ${ms}) requestAnimationFrame(tick)
                else resolve()
            }
            requestAnimationFrame(tick)
        })
        const elapsed = performance.now() - start
        const fps = (frames / elapsed) * 1000
        frameGaps.sort((a, b) => a - b)
        const p50 = frameGaps[Math.floor(frameGaps.length * 0.5)] || 0
        const p95 = frameGaps[Math.floor(frameGaps.length * 0.95)] || 0
        const p99 = frameGaps[Math.floor(frameGaps.length * 0.99)] || 0
        const mem = performance.memory ? {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
        } : null
        return { elapsed: Math.round(elapsed), frames, fps: +fps.toFixed(1), p50frame: +p50.toFixed(1), p95frame: +p95.toFixed(1), p99frame: +p99.toFixed(1), longTaskMs: Math.round(longTaskMs), memoryMB: mem }
    })()
`

const browser = await chromium.launch()
const results = {}
for (const path of PATHS) {
    const url = BASE + path
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    console.log(`→ ${url}`)
    const settleAfterLoad = process.env.PROBE_SETTLE_MS != null ? Number(process.env.PROBE_SETTLE_MS) : 1500
    await page.goto(url, { waitUntil: 'load' })
    if (settleAfterLoad > 0) await page.waitForTimeout(settleAfterLoad)
    const result = await page.evaluate(probeScript(DURATION_MS))
    results[path] = result
    console.log(
        `  fps=${result.fps} frames=${result.frames} p50=${result.p50frame}ms p95=${result.p95frame}ms p99=${result.p99frame}ms longTasks=${result.longTaskMs}ms memMB=${result.memoryMB?.used ?? '—'}`
    )
    await ctx.close()
}
await browser.close()

const outPath = resolve(OUT, `${TAG}.cpu.json`)
writeFileSync(outPath, JSON.stringify(results, null, 2))
console.log(`\n✓ saved ${outPath}`)
