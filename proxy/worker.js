const ALLOWED_ORIGINS = ['https://nareshnavinash.github.io', 'http://localhost:5173', 'http://localhost:4173']

const ROUTES = {
    '/api/groq': {
        target: 'https://api.groq.com/openai/v1/chat/completions',
        auth: (env) => ({ Authorization: `Bearer ${env.GROQ_API_KEY}` })
    },
    '/api/gemini': {
        target: (env) =>
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${env.GEMINI_API_KEY}`,
        auth: () => ({})
    }
}

const rateMap = new Map()
const RATE_LIMIT = 15
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000

function checkRate(ip) {
    const now = Date.now()
    const entry = rateMap.get(ip)
    if (!entry || now - entry.start > RATE_WINDOW_MS) {
        rateMap.set(ip, { start: now, count: 1 })
        return true
    }
    if (entry.count >= RATE_LIMIT) return false
    entry.count++
    return true
}

function corsHeaders(origin) {
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
}

export default {
    async fetch(request, env) {
        const origin = request.headers.get('Origin') || ''
        const cors = corsHeaders(ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0])

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: cors })
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405, headers: cors })
        }

        if (!ALLOWED_ORIGINS.includes(origin)) {
            return new Response('Forbidden', { status: 403, headers: cors })
        }

        const url = new URL(request.url)
        const route = ROUTES[url.pathname]
        if (!route) {
            return new Response('Not found', { status: 404, headers: cors })
        }

        const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
        if (!checkRate(ip)) {
            return new Response(JSON.stringify({ error: 'Rate limited' }), {
                status: 429,
                headers: { ...cors, 'Content-Type': 'application/json' }
            })
        }

        const target = typeof route.target === 'function' ? route.target(env) : route.target
        const authHeaders = route.auth(env)

        const res = await fetch(target, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders
            },
            body: request.body
        })

        return new Response(res.body, {
            status: res.status,
            headers: {
                ...cors,
                'Content-Type': res.headers.get('Content-Type') || 'application/json'
            }
        })
    }
}
