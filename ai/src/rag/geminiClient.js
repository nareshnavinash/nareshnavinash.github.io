const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

let sessionQueryCount = 0
let lastQueryTime = 0
const MAX_PER_SESSION = 30
const MIN_INTERVAL_MS = 1500

export function hasApiKey() {
    return API_KEY.length > 0
}

export async function generate(systemPrompt, userPrompt) {
    if (!API_KEY) {
        throw new Error('NO_API_KEY')
    }

    // Client-side rate limiting
    sessionQueryCount++
    if (sessionQueryCount > MAX_PER_SESSION) {
        throw new Error('SESSION_LIMIT')
    }
    const now = Date.now()
    if (now - lastQueryTime < MIN_INTERVAL_MS) {
        await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - (now - lastQueryTime)))
    }
    lastQueryTime = Date.now()

    const body = {
        system_instruction: {
            parts: [{ text: systemPrompt }]
        },
        contents: [
            {
                parts: [{ text: userPrompt }]
            }
        ],
        generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 512
        }
    }

    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (res.status === 429) {
        throw new Error('RATE_LIMITED')
    }
    if (!res.ok) {
        throw new Error(`API_ERROR_${res.status}`)
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
        throw new Error('EMPTY_RESPONSE')
    }
    return text
}
