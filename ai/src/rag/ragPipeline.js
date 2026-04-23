import { buildPrompt } from './promptTemplates.js'
import { generate, hasAnyProvider, getRemaining, getMax } from './providerManager.js'

export { getRemaining, getMax }

let cache = null
let cacheLoading = null

async function loadCache() {
    if (cache) return cache
    if (cacheLoading) return cacheLoading
    cacheLoading = fetch('data/ai-cache.json')
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => [])
        .then((data) => {
            cache = data
            cacheLoading = null
            return cache
        })
    return cacheLoading
}

function normalize(q) {
    return q
        .toLowerCase()
        .replace(/[?!.,;:'"]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

function findCachedAnswer(query, entries) {
    if (!entries || !entries.length) return null
    const nq = normalize(query)
    for (const entry of entries) {
        if (normalize(entry.q) === nq) return entry
    }
    const words = nq.split(' ').filter((w) => w.length > 2)
    if (!words.length) return null
    let best = null
    let bestScore = 0
    for (const entry of entries) {
        const en = normalize(entry.q)
        let matched = 0
        for (const w of words) {
            if (en.includes(w)) matched++
        }
        const score = matched / Math.max(words.length, en.split(' ').filter((w) => w.length > 2).length)
        if (score > bestScore) {
            bestScore = score
            best = entry
        }
    }
    return bestScore >= 0.7 ? best : null
}

function diverseFallback(chunks) {
    const seen = new Set()
    const picks = []
    for (const c of chunks) {
        if (!seen.has(c.section)) {
            seen.add(c.section)
            picks.push(c)
            if (picks.length >= 5) break
        }
    }
    return picks
}

export async function queryRAG(query, search, chunks) {
    const results = search.search(query, 5)
    const contextChunks =
        results.length >= 3
            ? results
            : results.length
              ? [...results, ...diverseFallback(chunks).filter((c) => !results.some((r) => r.id === c.id))].slice(0, 5)
              : diverseFallback(chunks)

    const sources = contextChunks.map((c) => ({
        id: c.id,
        section: c.section,
        label: c.label,
        meta: c.meta
    }))

    const entries = await loadCache()
    const cached = findCachedAnswer(query, entries)
    if (cached) {
        return {
            type: 'answer',
            text: cached.a,
            sources: cached.sources || sources,
            model: cached.model || 'cached'
        }
    }

    if (!hasAnyProvider()) {
        return {
            type: 'fallback',
            text: "Here's what I found in the resume:",
            sources,
            chunks: contextChunks,
            model: null
        }
    }

    const { system, user } = buildPrompt(query, contextChunks)

    try {
        const result = await generate(system, user)
        return {
            type: 'answer',
            text: result.text,
            sources,
            model: result.model
        }
    } catch (err) {
        const code = err.message || 'UNKNOWN'
        let fallbackText = "I couldn't reach the AI. Here's what I found locally:"

        if (code === 'DAILY_LIMIT') {
            fallbackText = `You've reached the daily limit (${getRemaining()}/${getMax()}). Come back tomorrow! Here's what I found locally:`
        } else if (code === 'RATE_LIMITED') {
            fallbackText = "naresh.ai is popular today — I've hit the rate limit. Here's what I found locally:"
        } else if (code === 'NO_API_KEY') {
            fallbackText = "AI answers aren't configured. Here's what I found in the resume:"
        }

        return {
            type: 'fallback',
            text: fallbackText,
            sources,
            chunks: contextChunks,
            error: code,
            model: null
        }
    }
}
