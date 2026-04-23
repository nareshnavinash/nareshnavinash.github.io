/**
 * Fetches public GitHub repos for nareshnavinash at build time.
 * Updates resume.json openSource section with live data.
 * Falls back gracefully to existing data if the API is unavailable.
 *
 * Thumbnail resolution (for repos not captured by Playwright):
 *   1. Homepage og:image
 *   2. README hero image (first non-badge <img> via GitHub API)
 *   3. GitHub repo page og:image (always available)
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

async function fetchOgImage(url) {
    if (!url) return ''
    try {
        var response = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'text/html'
            },
            redirect: 'follow',
            signal: AbortSignal.timeout(5000)
        })
        if (!response.ok) return ''
        var html = await response.text()
        var match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/)
        if (!match) match = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/)
        if (!match) return ''
        var imgUrl = match[1]
        if (imgUrl && !imgUrl.startsWith('http')) {
            imgUrl = new URL(imgUrl, response.url).href
        }
        return imgUrl
    } catch (_e) {
        return ''
    }
}

async function fetchReadmeHeroImage(repoName, defaultBranch) {
    try {
        var url = `https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`
        var response = await fetch(url, {
            headers: {
                Accept: 'application/vnd.github.html',
                'User-Agent': 'naresh-portfolio-build'
            },
            signal: AbortSignal.timeout(5000)
        })
        if (!response.ok) return ''
        var html = await response.text()

        var imgs = html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)
        for (var img of imgs) {
            var src = img[1]
            var tag = img[0]
            if (
                !src ||
                src.includes('shields.io') ||
                src.includes('camo.githubusercontent.com') ||
                src.includes('badge') ||
                (src.includes('github.com/') && src.includes('/workflows/'))
            )
                continue
            // Only accept images that look like intentional hero banners:
            // - in assets/ or images/ directory
            // - have width="100%" (full-width banner)
            // - are named banner/logo/icon/hero/social/og-image
            var isHero =
                src.match(/^assets\/|^images\//) ||
                tag.includes('width="100%"') ||
                src.match(/banner|logo|icon|hero|social|og-image/i)
            if (!isHero) continue
            if (!src.startsWith('http')) {
                src = `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${defaultBranch}/${src}`
            }
            return src
        }
        return ''
    } catch (_e) {
        return ''
    }
}

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
        topics: r.topics || [],
        defaultBranch: r.default_branch,
        thumbnail: ''
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

    // Resolve thumbnails via fallback chain
    var allReposMapped = [...starred, ...recent]
    for (var repo of allReposMapped) {
        // 1. Homepage og:image
        repo.thumbnail = await fetchOgImage(repo.homepage)

        // 2. README hero image
        if (!repo.thumbnail) {
            repo.thumbnail = await fetchReadmeHeroImage(repo.name, repo.defaultBranch)
        }

        // 3. GitHub repo page og:image
        if (!repo.thumbnail) {
            repo.thumbnail = await fetchOgImage(repo.url)
        }
    }

    // Remove defaultBranch from output (only needed for URL resolution)
    for (var r of allReposMapped) {
        delete r.defaultBranch
    }

    return { starred, recent }
}

async function fetchPublicRepoCount() {
    try {
        var response = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'naresh-portfolio-build'
            },
            signal: AbortSignal.timeout(5000)
        })
        if (!response.ok) return null
        var data = await response.json()
        return Number.isFinite(data.public_repos) ? data.public_repos : null
    } catch (_e) {
        return null
    }
}

try {
    console.log('Fetching GitHub repos...')
    var { starred, recent } = await fetchRepos()
    console.log(`Fetched ${starred.length} starred + ${recent.length} recent repos`)

    var publicRepoCount = await fetchPublicRepoCount()
    if (publicRepoCount != null) {
        console.log(`Public repo count: ${publicRepoCount}`)
    } else {
        console.log('Public repo count: (unavailable, keeping existing value)')
    }

    var resume = JSON.parse(readFileSync(resumePath, 'utf-8'))
    var nextOpenSource = {
        ...resume.openSource,
        repos: { starred, recent }
    }
    if (publicRepoCount != null) {
        nextOpenSource.publicRepoCount = publicRepoCount
    }
    resume.openSource = nextOpenSource
    writeFileSync(resumePath, JSON.stringify(resume, null, 4) + '\n', 'utf-8')
    console.log('Updated resume.json with GitHub repos')
} catch (err) {
    console.warn('GitHub fetch failed, using existing data:', err.message)
}
