/**
 * Captures screenshots of GitHub repo homepages at build time.
 * Reads repo data from resume.json, captures each homepage with Playwright,
 * saves PNGs to static/screenshots/, and updates resume.json thumbnails.
 * Falls back gracefully - repos with failed captures keep their existing thumbnails.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

var __dirname = dirname(fileURLToPath(import.meta.url))
var resumePath = resolve(__dirname, '..', 'static', 'data', 'resume.json')
var screenshotDir = resolve(__dirname, '..', 'static', 'screenshots')

mkdirSync(screenshotDir, { recursive: true })

async function captureScreenshots() {
    var resume = JSON.parse(readFileSync(resumePath, 'utf-8'))
    var reposData = resume.openSource && resume.openSource.repos ? resume.openSource.repos : {}
    var allRepos = (reposData.starred || []).concat(reposData.recent || [])

    if (allRepos.length === 0) {
        console.log('No repos found in resume.json, skipping screenshots')
        return
    }

    var browser = await chromium.launch()
    var context = await browser.newContext({
        viewport: { width: 1200, height: 630 },
        deviceScaleFactor: 1
    })

    var captured = 0
    for (var repo of allRepos) {
        if (!repo.homepage) continue
        try {
            var page = await context.newPage()
            await page.goto(repo.homepage, { waitUntil: 'networkidle', timeout: 15000 })
            // Brief pause for animations/fonts to settle
            await page.waitForTimeout(500)
            var filename = repo.name + '.png'
            await page.screenshot({ path: resolve(screenshotDir, filename) })
            repo.thumbnail = 'screenshots/' + filename
            captured++
            console.log('Captured: ' + repo.name)
            await page.close()
        } catch (e) {
            console.warn('Screenshot failed for ' + repo.name + ': ' + e.message)
            // Keep existing thumbnail (fallback chain will handle it)
        }
    }

    await browser.close()

    // Write updated thumbnails back to resume.json
    writeFileSync(resumePath, JSON.stringify(resume, null, 4) + '\n', 'utf-8')
    console.log('Captured ' + captured + ' screenshots')
}

try {
    console.log('Capturing repo homepage screenshots...')
    await captureScreenshots()
} catch (err) {
    console.warn('Screenshot capture failed, using existing thumbnails:', err.message)
}
