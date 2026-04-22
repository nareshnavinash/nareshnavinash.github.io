/**
 * Pre-renders profile.html with resume.json data at build time.
 * Ensures crawlers see full content even without JavaScript execution.
 * Runs after sync-profile copies files to static/.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

import {
    adaptResume,
    renderCareerHtml,
    renderLeadershipHtml,
    renderLeadershipProgressHtml,
    renderReposHtml,
    renderWritingHtml,
    renderCertsHtml,
    renderSkillsTerminalHtml,
} from '../js/profile-render.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const htmlPath = resolve(root, 'static/profile.html')
const jsonPath = resolve(root, 'static/data/resume.json')

const html = readFileSync(htmlPath, 'utf-8')
const resume = JSON.parse(readFileSync(jsonPath, 'utf-8'))
const data = adaptResume(resume)

const dom = new JSDOM(html)
const { document } = dom.window

function setHtml(selector, htmlStr) {
    const el = document.querySelector(selector)
    if (el) el.innerHTML = htmlStr
}

setHtml('#career-list', renderCareerHtml(data.career))
setHtml('#lead-dio-stage', renderLeadershipHtml(data.leadership))
setHtml('#lead-dio-progress', renderLeadershipProgressHtml(data.leadership))
setHtml('#repos-grid', renderReposHtml(data.repos))
setHtml('#writing-grid', renderWritingHtml(data.writing))
setHtml('#certs-track', renderCertsHtml(data.certs))
setHtml('#stack-term-body', renderSkillsTerminalHtml(data.skills))

writeFileSync(htmlPath, dom.serialize(), 'utf-8')

console.log('[prerender] profile.html populated with resume.json data')
