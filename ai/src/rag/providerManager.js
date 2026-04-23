import * as groq from './groqClient.js'
import * as gemini from './geminiClient.js'
import { consumeQuery, getRemaining, getMax } from './rateLimiter.js'

const MIN_INTERVAL_MS = 1500
let lastQueryTime = 0

const PROVIDERS = [
    { name: 'groq', client: groq },
    { name: 'gemini', client: gemini }
]

export function hasAnyProvider() {
    return PROVIDERS.some((p) => p.client.hasProxy())
}

export async function generate(systemPrompt, userPrompt) {
    const budget = consumeQuery()
    if (!budget.allowed) {
        throw new Error('DAILY_LIMIT')
    }

    const now = Date.now()
    if (now - lastQueryTime < MIN_INTERVAL_MS) {
        await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - (now - lastQueryTime)))
    }
    lastQueryTime = Date.now()

    let lastError = null
    for (const { name, client } of PROVIDERS) {
        if (!client.hasProxy()) continue
        try {
            const result = await client.generate(systemPrompt, userPrompt)
            return { ...result, provider: name }
        } catch (err) {
            lastError = err
            continue
        }
    }

    throw lastError || new Error('NO_API_KEY')
}

export { getRemaining, getMax }
