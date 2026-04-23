import Fuse from 'fuse.js'
import { NAV_INTENTS, QUERY_INTENTS, META_INTENT, ALL_INTENTS } from './intentCatalog.js'

const intentEntries = ALL_INTENTS.flatMap((intent) => [
    ...intent.keywords.map((k) => ({ text: k, intentId: intent.id })),
    ...(intent.examples || []).map((e) => ({ text: e, intentId: intent.id }))
])

const intentFuse = new Fuse(intentEntries, {
    keys: ['text'],
    threshold: 0.35,
    includeScore: true,
    ignoreLocation: true
})

export function resolveIntent(query, search, handlers) {
    const q = query.trim().toLowerCase()
    if (!q) return null

    // 1. Check meta intent first (exact keyword match)
    if (META_INTENT.keywords.some((k) => q.includes(k))) {
        return { intent: META_INTENT, confidence: 1.0 }
    }

    // 2. Exact keyword match for navigation intents
    for (const intent of NAV_INTENTS) {
        const match = intent.keywords.some((k) => {
            const kl = k.toLowerCase()
            return q === kl || q.includes(kl)
        })
        if (match) {
            // If the query is short and matches a nav keyword, it's likely navigation
            if (q.split(/\s+/).length <= 4 || !looksLikeQuestion(q)) {
                return { intent, confidence: 0.9 }
            }
        }
    }

    // 3. Check for company-name matches (career detail)
    const companyNames = ['testgorilla', 'hopin', 'vue.ai', 'weinvest', 'freshworks', 'cognizant']
    const matchedCompany = companyNames.find((c) => q.includes(c))
    if (matchedCompany && looksLikeQuestion(q)) {
        return {
            intent: QUERY_INTENTS.find((i) => i.id === 'qa.career_detail'),
            confidence: 0.85,
            params: { company: matchedCompany }
        }
    }

    // 4. Fuse.js fuzzy match over intent keywords/examples
    const fuseResults = intentFuse.search(q, { limit: 5 })
    if (fuseResults.length) {
        const best = fuseResults[0]
        const bestScore = 1 - best.score
        const intentId = best.item.intentId
        const intent = ALL_INTENTS.find((i) => i.id === intentId)

        if (intent && bestScore > 0.7) {
            // Navigation intents execute directly if confident
            if (intent.type === 'navigate') {
                return { intent, confidence: bestScore }
            }
            // Query intents proceed to RAG
            return { intent, confidence: bestScore }
        }

        // Lower confidence — still return best guess for RAG fallback
        if (intent && bestScore > 0.4) {
            return { intent, confidence: bestScore }
        }
    }

    // 5. Fallback to general Q&A
    return {
        intent: QUERY_INTENTS.find((i) => i.id === 'qa.general'),
        confidence: 0.3
    }
}

function looksLikeQuestion(q) {
    const starters = ['what', 'how', 'why', 'when', 'where', 'who', 'tell', 'describe', 'explain', 'show', 'can', 'do', 'does', 'is', 'are', 'have', 'has']
    const firstWord = q.split(/\s+/)[0]
    return q.includes('?') || starters.includes(firstWord)
}
