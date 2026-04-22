#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const [a, b] = process.argv.slice(2)
if (!a || !b) {
    console.error('usage: node scripts/lh-diff.js <before.json> <after.json>')
    process.exit(1)
}

const loadReport = (p) => JSON.parse(readFileSync(resolve(p), 'utf8'))
const before = loadReport(a)
const after = loadReport(b)

const fmtMs = (v) => (v == null ? '—' : `${Math.round(v)}ms`)
const fmtScore = (s) => (s == null ? '—' : Math.round(s * 100))

const arrow = (dx) => (dx === 0 ? '·' : dx > 0 ? '↑' : '↓')

const scoreLine = (cat) => {
    const bs = before.categories?.[cat]?.score
    const as = after.categories?.[cat]?.score
    if (bs == null && as == null) return null
    const bPct = fmtScore(bs)
    const aPct = fmtScore(as)
    const dx = (as ?? 0) - (bs ?? 0)
    return `  ${cat.padEnd(18)} ${bPct} → ${aPct}  ${arrow(dx)}`
}

const metricLine = (id, label) => {
    const bAudit = before.audits?.[id]
    const aAudit = after.audits?.[id]
    if (!bAudit && !aAudit) return null
    const bv = bAudit?.numericValue ?? null
    const av = aAudit?.numericValue ?? null
    const dx = (av ?? 0) - (bv ?? 0)
    const tag = id === 'cumulative-layout-shift' ? '' : 'ms'
    const fmt = (v) => (v == null ? '—' : id === 'cumulative-layout-shift' ? v.toFixed(3) : fmtMs(v))
    const delta = dx === 0 ? '·' : `${dx > 0 ? '+' : ''}${id === 'cumulative-layout-shift' ? dx.toFixed(3) : Math.round(dx) + tag}`
    return `  ${label.padEnd(24)} ${fmt(bv)} → ${fmt(av)}  (${delta})`
}

console.log(`\nLighthouse diff\n  before: ${a}\n  after:  ${b}`)
console.log(`\n## Categories`)
for (const cat of ['performance', 'accessibility', 'best-practices', 'seo']) {
    const line = scoreLine(cat)
    if (line) console.log(line)
}

console.log(`\n## Key metrics`)
for (const [id, label] of [
    ['first-contentful-paint', 'FCP'],
    ['largest-contentful-paint', 'LCP'],
    ['total-blocking-time', 'TBT'],
    ['cumulative-layout-shift', 'CLS'],
    ['speed-index', 'Speed Index'],
    ['interactive', 'TTI'],
    ['mainthread-work-breakdown', 'Main-thread work'],
    ['bootup-time', 'JS exec time']
]) {
    const line = metricLine(id, label)
    if (line) console.log(line)
}

// Top wasteful audits (with numericValue) — sort by after's value, flag biggest regressions
const auditRows = []
for (const id of Object.keys(after.audits || {})) {
    const aAudit = after.audits[id]
    const bAudit = before.audits?.[id]
    const av = aAudit?.numericValue
    if (typeof av !== 'number' || av <= 0) continue
    if (aAudit.scoreDisplayMode === 'notApplicable') continue
    const bv = bAudit?.numericValue ?? 0
    auditRows.push({ id, title: aAudit.title, before: bv, after: av, delta: av - bv })
}

auditRows.sort((x, y) => y.delta - x.delta)
const regressions = auditRows.filter((r) => r.delta > 50).slice(0, 5)
if (regressions.length) {
    console.log(`\n## Regressions (audit numericValue went up)`)
    for (const r of regressions) console.log(`  ${r.title}: ${Math.round(r.before)} → ${Math.round(r.after)} (+${Math.round(r.delta)})`)
}

const improvements = auditRows.filter((r) => r.delta < -50).sort((x, y) => x.delta - y.delta).slice(0, 5)
if (improvements.length) {
    console.log(`\n## Improvements`)
    for (const r of improvements) console.log(`  ${r.title}: ${Math.round(r.before)} → ${Math.round(r.after)} (${Math.round(r.delta)})`)
}

console.log('')
