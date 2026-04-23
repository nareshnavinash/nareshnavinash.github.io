import { buildPrompt } from './promptTemplates.js'
import { generate, hasAnyApiKey, getRemaining, getMax } from './providerManager.js'

export { getRemaining, getMax }

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
    const contextChunks = results.length >= 3 ? results : results.length ? [...results, ...diverseFallback(chunks).filter((c) => !results.some((r) => r.id === c.id))].slice(0, 5) : diverseFallback(chunks)

    const sources = contextChunks.map((c) => ({
        id: c.id,
        section: c.section,
        label: c.label,
        meta: c.meta
    }))

    if (!hasAnyApiKey()) {
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
