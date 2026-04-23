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

async function fetchArticlePage(url) {
    try {
        var response = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'text/html'
            },
            redirect: 'follow'
        })
        if (!response.ok) return null
        var html = await response.text()
        var dom = new JSDOM(html)
        var doc = dom.window.document

        var title = ''
        var metaTitle = doc.querySelector('meta[property="og:title"]')
        if (metaTitle) title = metaTitle.getAttribute('content') || ''
        if (!title) title = doc.querySelector('title')?.textContent || ''

        var description = ''
        var metaDesc = doc.querySelector('meta[property="og:description"]')
        if (metaDesc) description = (metaDesc.getAttribute('content') || '').slice(0, 200)

        var date = ''
        var metaDate = doc.querySelector('meta[property="article:published_time"]')
        if (metaDate) date = metaDate.getAttribute('content') || ''

        var thumbnail = ''
        var metaImage = doc.querySelector('meta[property="og:image"]')
        if (metaImage) thumbnail = metaImage.getAttribute('content') || ''

        return {
            title: title,
            url: stripQueryParams(url),
            date: date,
            description: stripHtml(description),
            tags: [],
            thumbnail: thumbnail
        }
    } catch (_e) {
        return null
    }
}

async function fetchArticles(pinnedUrls, fallbackRecentUrls) {
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

    // Fetch any pinned articles not found in RSS directly from Medium
    var foundUrls = new Set(
        pinned.map(function (a) {
            return a.url
        })
    )
    var missingUrls = (pinnedUrls || []).filter(function (u) {
        return !foundUrls.has(u)
    })
    for (var i = 0; i < missingUrls.length; i++) {
        console.log('Fetching missing pinned article: ' + missingUrls[i].split('/').pop().slice(0, 50))
        var article = await fetchArticlePage(missingUrls[i])
        if (article) pinned.push(article)
    }

    // Sort pinned to match configured order
    var urlOrder = {}
    ;(pinnedUrls || []).forEach(function (u, idx) {
        urlOrder[u] = idx
    })
    pinned.sort(function (a, b) {
        return (urlOrder[a.url] ?? 999) - (urlOrder[b.url] ?? 999)
    })

    var recent = allArticles
        .filter(function (a) {
            return !pinnedSet.has(a.url)
        })
        .slice(0, MAX_RECENT)

    // Fetch og:image for recent articles with missing thumbnails
    for (var k = 0; k < recent.length; k++) {
        if (!recent[k].thumbnail) {
            console.log('Fetching thumbnail for recent article: ' + recent[k].url.split('/').pop().slice(0, 50))
            var scraped = await fetchArticlePage(recent[k].url)
            if (scraped && scraped.thumbnail) {
                recent[k].thumbnail = scraped.thumbnail
            }
        }
    }

    // Fetch additional recent articles from fallback URLs if RSS didn't provide enough
    if (recent.length < MAX_RECENT && fallbackRecentUrls && fallbackRecentUrls.length > 0) {
        var recentUrlSet = new Set(
            recent.map(function (a) {
                return a.url
            })
        )
        for (var j = 0; j < fallbackRecentUrls.length && recent.length < MAX_RECENT; j++) {
            var fbUrl = fallbackRecentUrls[j]
            if (!recentUrlSet.has(fbUrl) && !pinnedSet.has(fbUrl)) {
                console.log('Fetching fallback recent article: ' + fbUrl.split('/').pop().slice(0, 50))
                var extra = await fetchArticlePage(fbUrl)
                if (extra) recent.push(extra)
            }
        }
    }

    return { pinned, recent }
}

try {
    console.log('Fetching Medium articles...')
    var resume = JSON.parse(readFileSync(resumePath, 'utf-8'))
    var pinnedUrls = (resume.openSource && resume.openSource.pinnedArticleUrls) || []
    var fallbackRecentUrls = (resume.openSource && resume.openSource.fallbackRecentUrls) || []
    var { pinned, recent } = await fetchArticles(pinnedUrls, fallbackRecentUrls)
    console.log('Fetched ' + pinned.length + ' pinned + ' + recent.length + ' recent articles')

    // Preserve manually-set tags for scraped articles (page scraping can't extract tags)
    var existingByUrl = {}
    ;(resume.openSource.pinnedArticles || []).concat(resume.openSource.recentArticles || []).forEach(function (a) {
        if (a.tags && a.tags.length) existingByUrl[a.url] = a.tags
    })
    ;[pinned, recent].forEach(function (list) {
        list.forEach(function (a) {
            if ((!a.tags || !a.tags.length) && existingByUrl[a.url]) {
                a.tags = existingByUrl[a.url]
            }
        })
    })

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
