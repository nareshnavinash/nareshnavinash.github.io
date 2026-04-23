const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'openai/gpt-oss-20b'
const DISPLAY_MODEL = 'gpt-oss-20b'
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''

export function hasApiKey() {
    return API_KEY.length > 0
}

export async function generate(systemPrompt, userPrompt) {
    if (!API_KEY) {
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

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`
        },
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
