const PROXY_URL = import.meta.env.VITE_PROXY_URL || ''
const MODEL = 'openai/gpt-oss-20b'
const DISPLAY_MODEL = 'gpt-oss-20b'

export function hasProxy() {
    return PROXY_URL.length > 0
}

export async function generate(systemPrompt, userPrompt) {
    if (!PROXY_URL) {
        throw new Error('NO_API_KEY')
    }

    const body = {
        model: MODEL,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 512
    }

    const res = await fetch(`${PROXY_URL}/api/groq`, {
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
    const text = data?.choices?.[0]?.message?.content
    if (!text) {
        throw new Error('EMPTY_RESPONSE')
    }
    return { text, model: DISPLAY_MODEL }
}
