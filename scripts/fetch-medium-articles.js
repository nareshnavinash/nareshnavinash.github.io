/**
 * Fetches Medium articles for nareshnavinash at build time.
 * Parses the public RSS feed, splits into pinned + recent articles,
 * and updates resume.json with the results.
 * Falls back gracefully to existing data if the feed is unavailable.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

var __dirname = dirname(fileURLToPath(import.meta.url))
var resumePath = resolve(__dirname, '..', 'static', 'data', 'resume.json')

var FEED_URL = 'https://medium.com/feed/@nareshnavinash'
var MAX_RECENT = 6

function getText(item, tagName) {
    var el = item.getElementsByTagName(tagName)[0]
    return el ? el.textContent.trim() : ''
}

function stripHtml(html) {
    // Parse through JSDOM to properly decode HTML entities (&#x2019; → ', &#x2026; → …)
    var dom = new JSDOM('<body>' + html + '</body>')
    var text = dom.window.document.body.textContent || ''
    // Remove trailing Medium boilerplate like "Continue reading on Medium »"
    text = text.replace(/Continue reading on Medium\s*»?\s*$/, '').trim()
    return text
}

function extractThumbnail(item) {
    var content = item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]
    if (!content) return ''
    var match = content.textContent.match(/<img[^>]+src="([^"]+)"/)
    return match ? match[1] : ''
}

function extractDescription(item) {
    var content = item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]
    if (content) {
        return stripHtml(content.textContent).slice(0, 200)
    }
    var desc = getText(item, 'description')
    return stripHtml(desc).slice(0, 200)
}

function stripQueryParams(url) {
    try {
        return url.split('?')[0]
    } catch (_e) {
        return url
    }
}

function mapArticle(item) {
    var pubDate = getText(item, 'pubDate')
    var categories = Array.from(item.getElementsByTagName('category'))
    return {
        title: getText(item, 'title'),
        url: stripQueryParams(getText(item, 'link')),
        date: pubDate ? new Date(pubDate).toISOString() : '',
        description: extractDescription(item),
        tags: categories.map(function (c) {
            return c.textContent.trim()
        }),
        thumbnail: extractThumbnail(item)
    }
}

async function fetchArticles(pinnedUrls) {
    var response = await fetch(FEED_URL, {
        headers: { 'User-Agent': 'naresh-portfolio-build' }
    })

    if (!response.ok) {
        throw new Error('Medium RSS returned ' + response.status)
    }

    var xml = await response.text()
    var dom = new JSDOM(xml, { contentType: 'text/xml' })
    var items = Array.from(dom.window.document.querySelectorAll('item'))
    var allArticles = items.map(mapArticle)

    var pinnedSet = new Set(pinnedUrls || [])
    var pinned = allArticles.filter(function (a) {
        return pinnedSet.has(a.url)
    })
    var recent = allArticles
        .filter(function (a) {
            return !pinnedSet.has(a.url)
        })
        .slice(0, MAX_RECENT)

    return { pinned, recent }
}

try {
    console.log('Fetching Medium articles...')
    var resume = JSON.parse(readFileSync(resumePath, 'utf-8'))
    var pinnedUrls = (resume.openSource && resume.openSource.pinnedArticleUrls) || []
    var { pinned, recent } = await fetchArticles(pinnedUrls)
    console.log('Fetched ' + pinned.length + ' pinned + ' + recent.length + ' recent articles')

    resume.openSource = {
        ...resume.openSource,
        pinnedArticles: pinned,
        recentArticles: recent
    }
    writeFileSync(resumePath, JSON.stringify(resume, null, 4) + '\n', 'utf-8')
    console.log('Updated resume.json with Medium articles')
} catch (err) {
    console.warn('Medium fetch failed, using existing data:', err.message)
}
