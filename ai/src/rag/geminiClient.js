const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent'
const MODEL = 'gemini-flash'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

export function hasApiKey() {
    return API_KEY.length > 0
}

export async function generate(systemPrompt, userPrompt) {
    if (!API_KEY) {
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
    return { text, model: MODEL }
}
