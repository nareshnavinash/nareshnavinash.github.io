import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const GROQ_KEY = process.env.GROQ_API_KEY || ''
const GEMINI_KEY = process.env.GEMINI_API_KEY || ''

const SYSTEM_PROMPT = `You are naresh.ai, a concise AI assistant for Naresh Sekar's professional portfolio.

Rules:
- Answer ONLY from the provided context. If the context doesn't contain the answer, say so honestly.
- Use first person ("I", "my") when speaking as Naresh.
- Keep answers under 3 short paragraphs. Be specific: include company names, technologies, and dates when available.
- For recruiter-style questions, be honest and factual. Don't oversell.
- If asked about something not in the context, suggest which section of the portfolio might help.
- Format with **bold** for emphasis and bullet points (using -) for lists. Use short paragraphs separated by blank lines.
- Be conversational and natural, not robotic.`

const QUESTIONS = [
    'what did you do at TestGorilla',
    'tell me about your Hopin role',
    'describe your work at Freshworks',
    'TestGorilla experience',
    'what did you do at Vue.ai',
    'tell me about your Cognizant role',
    'describe your work at WEInvest',
    'do you know Python',
    "what's your AI experience",
    'are you familiar with Kubernetes',
    'have you used Playwright',
    'what testing tools do you use',
    'do you have experience with TypeScript',
    'have you worked with AWS',
    'how do you scale teams',
    'your management approach',
    'mentorship philosophy',
    'how do you build engineering culture',
    'how do you handle conflict',
    'tell me about team growth',
    'is Naresh a good fit for VP Engineering',
    'how large are his teams',
    'startup vs scale-up experience',
    'why should we hire you',
    'what certifications does he have',
    'tell me about his AI experience',
    'summarize your experience',
    'what makes you unique',
    'what are your top projects',
    'show leadership principles',
    'what technologies were used',
    'how large was the team',
    'what about the previous role',
    'show me related projects',
    'where was this used',
    'tell me about yourself',
    'what is your current role',
    'how many years of experience do you have',
    'what kind of teams have you managed',
    'what is your education background',
    'have you written any books',
    'what are your open source projects',
    'what do you write about on Medium',
    'what is your tech stack',
    'are you available for hire',
    'what industries have you worked in',
    'describe your quality engineering expertise',
    'what is your experience with CI/CD',
    'how do you approach automation',
    'tell me about your Docker experience'
]

function stripHtml(html) {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function chunkResume(resume) {
    const docs = []
    const personal = resume.personal || {}

    if (personal.name) {
        const bio = personal.mission || personal.bio || ''
        docs.push({
            id: 'bio',
            section: 'about',
            label: personal.name,
            text: `${personal.name} is an ${personal.title || 'Engineering Manager'}. ${bio}`
        })
    }

    const aboutCards = resume.about?.cards || []
    aboutCards.forEach((card, i) => {
        docs.push({
            id: `about:${i}`,
            section: 'about',
            label: `About - ${card.title}`,
            text: `About - ${card.title}: ${card.description}`
        })
    })

    const positions = resume.career?.positions || []
    let roleIdx = 0
    for (const pos of positions) {
        for (const role of pos.roles || []) {
            const sections = role.sections || []
            const plainDesc = sections
                .flatMap((s) => s.points || [])
                .join('. ')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
            const co = pos.company || ''
            const roleName = role.shortRole || role.role || ''
            const date = role.date || ''
            docs.push({
                id: `career:${roleIdx}`,
                section: 'career',
                label: `${roleName} at ${co}`,
                text: `${personal.name || 'Naresh Sekar'} worked as ${roleName} at ${co} (${date}). ${plainDesc}`,
                meta: { idx: roleIdx, co, role: roleName, date }
            })
            roleIdx++
        }
    }

    const skills = resume.skills?.categories || []
    skills.forEach((cat, i) => {
        const items = Array.isArray(cat.items) ? cat.items : []
        docs.push({
            id: `skill:${i}`,
            section: 'skills',
            label: `Skills - ${cat.name}`,
            text: `Skills - ${cat.name}: ${items.join(', ')}`
        })
    })

    const leadership = resume.leadership?.cards || []
    leadership.forEach((card, i) => {
        docs.push({
            id: `leadership:${i}`,
            section: 'leadership',
            label: `Leadership - ${card.title}`,
            text: `Leadership - ${card.title}: ${card.description}`
        })
    })

    const reposStarred = resume.openSource?.repos?.starred || []
    reposStarred.forEach((r, i) => {
        const tags = (r.topics || []).join(', ') || r.language || ''
        docs.push({
            id: `repo:starred:${i}`,
            section: 'repos',
            label: r.name,
            text: `Open source repo: ${r.name} - ${r.tagline || r.description || ''}. Language: ${r.language || 'N/A'}. Tags: ${tags}`,
            meta: { kind: 'Starred', idx: i, name: r.name, url: r.url }
        })
    })

    const reposRecent = resume.openSource?.repos?.recent || []
    reposRecent.forEach((r, i) => {
        const tags = (r.topics || []).join(', ') || r.language || ''
        docs.push({
            id: `repo:recent:${i}`,
            section: 'repos',
            label: r.name,
            text: `Recent project: ${r.name} - ${r.tagline || r.description || ''}. Language: ${r.language || 'N/A'}. Tags: ${tags}`,
            meta: { kind: 'Recent', idx: i, name: r.name, url: r.url }
        })
    })

    const articlesPinned = resume.openSource?.pinnedArticles || []
    articlesPinned.forEach((a, i) => {
        const tags = (a.tags || []).join(', ')
        docs.push({
            id: `article:pinned:${i}`,
            section: 'writing',
            label: a.title,
            text: `Article: ${a.title} (${a.date || ''}). ${a.description || ''} Tags: ${tags}`,
            meta: { kind: 'Pinned', idx: i, title: a.title, url: a.url }
        })
    })

    const articlesRecent = resume.openSource?.recentArticles || []
    articlesRecent.forEach((a, i) => {
        const tags = (a.tags || []).join(', ')
        docs.push({
            id: `article:recent:${i}`,
            section: 'writing',
            label: a.title,
            text: `Article: ${a.title} (${a.date || ''}). ${a.description || ''} Tags: ${tags}`,
            meta: { kind: 'Recent', idx: i, title: a.title, url: a.url }
        })
    })

    const certs = resume.certifications?.items || []
    if (certs.length) {
        const certText = certs.map((c) => `${c.name} (${c.issuer})`).join(', ')
        docs.push({ id: 'certs', section: 'certs', label: 'Certifications', text: `Certifications: ${certText}` })
    }

    const edu = resume.education
    if (edu) {
        docs.push({
            id: 'education',
            section: 'education',
            label: 'Education',
            text: `Education: ${edu.degree || ''}, ${edu.school || ''}, ${edu.period || ''}, ${edu.location || ''}`
        })
    }

    const pub = resume.publications?.book
    if (pub) {
        docs.push({
            id: 'book',
            section: 'writing',
            label: pub.title,
            text: `Book: ${pub.title} by ${pub.author || 'Naresh Sekar'}. ${pub.description || ''} Published on ${pub.publisher || 'Amazon Kindle'}.`
        })
    }

    return docs
}

function simpleSearch(query, docs, topK = 5) {
    const words = query
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 2)
    if (!words.length) return docs.slice(0, topK)
    const scored = docs.map((d) => {
        const text = d.text.toLowerCase()
        const hits = words.filter((w) => text.includes(w)).length
        return { ...d, score: hits / words.length }
    })
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, topK)
}

function buildPrompt(query, chunks) {
    const contextBlocks = chunks.map((c) => `[Section: ${c.label || c.section}]\n${c.text}`).join('\n---\n')
    return {
        system: SYSTEM_PROMPT,
        user: `CONTEXT:\n---\n${contextBlocks}\n---\n\nQUESTION: ${query}`
    }
}

async function callGroq(system, user) {
    if (!GROQ_KEY) throw new Error('NO_KEY')
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify({
            model: 'openai/gpt-oss-20b',
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user }
            ],
            temperature: 0.4,
            max_tokens: 512
        })
    })
    if (!res.ok) throw new Error(`GROQ_${res.status}`)
    const data = await res.json()
    return data?.choices?.[0]?.message?.content || ''
}

async function callGemini(system, user) {
    if (!GEMINI_KEY) throw new Error('NO_KEY')
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: system }] },
                contents: [{ parts: [{ text: user }] }],
                generationConfig: { temperature: 0.4, maxOutputTokens: 512 }
            })
        }
    )
    if (!res.ok) throw new Error(`GEMINI_${res.status}`)
    const data = await res.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

async function generateAnswer(system, user) {
    try {
        const text = await callGroq(system, user)
        if (text) return { text, model: 'gpt-oss-20b' }
    } catch (e) {
        if (e.message.includes('429')) {
            await new Promise((r) => setTimeout(r, 5000))
        }
    }
    try {
        const text = await callGemini(system, user)
        if (text) return { text, model: 'gemini-flash' }
    } catch {}
    return null
}

async function main() {
    if (!GROQ_KEY && !GEMINI_KEY) {
        console.log('[ai-cache] No API keys found, skipping cache generation')
        return
    }

    const resume = JSON.parse(readFileSync(resolve(ROOT, 'resume.json'), 'utf-8'))
    const chunks = chunkResume(resume)
    const results = []
    let success = 0
    let failed = 0

    console.log(`[ai-cache] Generating answers for ${QUESTIONS.length} questions...`)

    for (const q of QUESTIONS) {
        const topChunks = simpleSearch(q, chunks, 5)
        const { system, user } = buildPrompt(q, topChunks)
        const sources = topChunks.map((c) => ({
            id: c.id,
            section: c.section,
            label: c.label,
            meta: c.meta
        }))

        const answer = await generateAnswer(system, user)
        if (answer) {
            results.push({ q, a: answer.text, sources, model: answer.model })
            success++
            process.stdout.write('.')
        } else {
            failed++
            process.stdout.write('x')
        }

        await new Promise((r) => setTimeout(r, 2000))
    }

    console.log(`\n[ai-cache] Done: ${success} cached, ${failed} failed`)

    mkdirSync(resolve(ROOT, 'static/data'), { recursive: true })
    const outPath = resolve(ROOT, 'static/data/ai-cache.json')
    writeFileSync(outPath, JSON.stringify(results, null, 2))
    console.log(`[ai-cache] Written to ${outPath}`)
}

main().catch((err) => {
    console.error('[ai-cache] Fatal error:', err.message)
    process.exit(1)
})
