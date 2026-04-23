const PROXY_URL = import.meta.env.VITE_PROXY_URL || ''
const MODEL = 'gemini-flash'

export function hasProxy() {
    return PROXY_URL.length > 0
}

export async function generate(systemPrompt, userPrompt) {
    if (!PROXY_URL) {
        throw new Error('NO_API_KEY')
    }

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

    const res = await fetch(`${PROXY_URL}/api/gemini`, {
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
    return { text, model: MODEL }
}
