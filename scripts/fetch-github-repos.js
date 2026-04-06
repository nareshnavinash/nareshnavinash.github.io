/**
 * Fetches public GitHub repos for nareshnavinash at build time.
 * Updates resume.json openSource section with live data.
 * Falls back gracefully to existing data if the API is unavailable.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const resumePath = resolve(__dirname, '..', 'static', 'data', 'resume.json')

const GITHUB_USER = 'nareshnavinash'
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner`
const PAGES_BASE = `https://${GITHUB_USER}.github.io`

const EXCLUDED_NAMES = ['nareshnavinash.github.io']
const EXCLUDED_KEYWORDS = ['homebrew', 'scoop']

function isExcluded(repo) {
    if (EXCLUDED_NAMES.includes(repo.name)) return true
    var nameLower = repo.name.toLowerCase()
    var topics = (repo.topics || []).map((t) => t.toLowerCase())
    return EXCLUDED_KEYWORDS.some((kw) => nameLower.includes(kw) || topics.includes(kw))
}

async function fetchRepos() {
    var response = await fetch(API_URL, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'naresh-portfolio-build'
        }
    })

    if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`)
    }

    var allRepos = await response.json()
    var repos = allRepos.filter((r) => !r.fork && !r.archived && r.description && !isExcluded(r))

    var mapRepo = (r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        homepage: r.homepage || (r.has_pages ? PAGES_BASE + '/' + r.name + '/' : ''),
        hasPages: r.has_pages,
        createdAt: r.created_at,
        topics: r.topics || []
    })

    // Most starred repos (top 6)
    var starred = repos
        .slice()
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map(mapRepo)

    var starredNames = new Set(starred.map((r) => r.name))

    // Recent projects with GitHub Pages (created 2026+, not already in starred)
    var recent = repos
        .filter((r) => r.has_pages && new Date(r.created_at) >= new Date('2026-01-01') && !starredNames.has(r.name))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6)
        .map(mapRepo)

    return { starred, recent }
}

try {
    console.log('Fetching GitHub repos...')
    var { starred, recent } = await fetchRepos()
    console.log(`Fetched ${starred.length} starred + ${recent.length} recent repos`)

    var resume = JSON.parse(readFileSync(resumePath, 'utf-8'))
    resume.openSource = {
        ...resume.openSource,
        repos: { starred, recent }
    }
    writeFileSync(resumePath, JSON.stringify(resume, null, 4) + '\n', 'utf-8')
    console.log('Updated resume.json with GitHub repos')
} catch (err) {
    console.warn('GitHub fetch failed, using existing data:', err.message)
}
