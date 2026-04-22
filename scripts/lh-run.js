#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, '.lh')

const DEFAULTS = {
    base: 'http://localhost:5175',
    preset: 'desktop',
    paths: ['/', '/profile.html', '/world.html']
}

const args = process.argv.slice(2)
const tag = args[0] || `run-${Date.now()}`
const paths = args.length > 1 ? args.slice(1) : DEFAULTS.paths

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const chromeFlags = '--headless=new --no-sandbox --disable-gpu'

const run = (url, outPath) =>
    new Promise((res, rej) => {
        const p = spawn(
            'npx',
            [
                'lighthouse',
                url,
                `--preset=${DEFAULTS.preset}`,
                '--output=json',
                '--output=html',
                `--output-path=${outPath}`,
                `--chrome-flags=${chromeFlags}`,
                '--quiet'
            ],
            { stdio: 'inherit' }
        )
        p.on('exit', (code) => (code === 0 ? res() : rej(new Error(`lighthouse exited ${code} for ${url}`))))
    })

const slug = (p) => (p === '/' ? 'root' : p.replace(/\W+/g, '_').replace(/^_|_$/g, ''))

for (const path of paths) {
    const url = DEFAULTS.base + path
    const out = resolve(OUT_DIR, `${tag}-${slug(path)}`)
    console.log(`\n→ ${url} → ${out}.{json,html}`)
    await run(url, out)
}

console.log('\n✓ lighthouse runs complete')
