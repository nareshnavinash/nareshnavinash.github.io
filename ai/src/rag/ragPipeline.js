import { buildPrompt } from './promptTemplates.js'
import { generate, hasApiKey } from './geminiClient.js'

export async function queryRAG(query, search, chunks) {
    // Retrieve relevant chunks
    const results = search.search(query, 5)
    const contextChunks = results.length ? results : chunks.slice(0, 3)

    const sources = contextChunks.map((c) => ({
        id: c.id,
        section: c.section,
        label: c.label,
        meta: c.meta
    }))

    // If no API key, return local results only
    if (!hasApiKey()) {
        return {
            type: 'fallback',
            text: "Here's what I found in the resume:",
            sources,
            chunks: contextChunks
        }
    }

    // Build prompt and call Gemini
    const { system, user } = buildPrompt(query, contextChunks)

    try {
        const answer = await generate(system, user)
        return {
            type: 'answer',
            text: answer,
            sources
        }
    } catch (err) {
        const code = err.message || 'UNKNOWN'
        let fallbackText = "I couldn't reach the AI. Here's what I found locally:"

        if (code === 'RATE_LIMITED') {
            fallbackText = "naresh.ai is popular today — I've hit the rate limit. Here's what I found locally:"
        } else if (code === 'SESSION_LIMIT') {
            fallbackText = "You've asked a lot of great questions! I've reached the session limit. Here's what I found locally:"
        } else if (code === 'NO_API_KEY') {
            fallbackText = "AI answers aren't configured. Here's what I found in the resume:"
        }

        return {
            type: 'fallback',
            text: fallbackText,
            sources,
            chunks: contextChunks,
            error: code
        }
    }
}
