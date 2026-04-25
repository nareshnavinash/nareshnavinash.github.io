let onTopicKeywords = new Set()

const STATIC_KEYWORDS = new Set([
    'naresh', 'sekar', 'navinash',
    'you', 'your', 'yourself', 'his', 'him', 'he',
    'resume', 'portfolio', 'cv',
    'career', 'experience', 'hire', 'recruit', 'interview', 'candidate', 'fit',
    'team', 'management', 'engineering', 'leadership'
])

const GREETINGS = new Set(['hi', 'hello', 'hey', 'sup', 'yo', 'howdy', 'greetings', 'hola'])

const OFF_TOPIC_PATTERNS = [
    /\b(weather|forecast|temperature)\b/,
    /\b(recipe|cook|bake|ingredient)\b/,
    /\b(joke|riddle|funny)\b/,
    /\b(poem|poetry|sonnet|haiku|limerick)\b/,
    /\b(story|fairy tale|once upon)\b/,
    /\b(capital of|president of|population of|king of|queen of)\b/,
    /\b(calculate|solve|equation|math)\b/,
    /\b(translate|translation)\b/,
    /\b(convert|converter|conversion)\b/,
    /\b(movie|film|netflix|spotify|song|music)\b/,
    /^(write|generate|create|build|make)\s+(me\s+)?(a|an|the|some)\s/,
    /\b(pretend|roleplay|act as|you are now|ignore your|forget (your|everything)|jailbreak)\b/,
    /\b(stock|crypto|bitcoin|price of)\b/,
    /\b(sports|score|nfl|nba|fifa|cricket)\b/,
    /\b(news|headline)\b/,
    /\b(diet|exercise|workout|health tip)\b/,
    /\b(what year is|what day is|what time is|current date|today's date)\b/,
    /\b(horoscope|zodiac|astrology)\b/,
    /\b(travel|flight|hotel|booking)\b/,
    /\b(who (is|was) (the|a) )/
]

const OFF_TOPIC_RESPONSES = [
    "That's a great question, but I'm specifically built to talk about Naresh's career, skills, and projects. Try asking about his experience at TestGorilla, his leadership approach, or his tech stack!",
    "I appreciate the curiosity! I'm best at answering questions about Naresh's professional background. Want to know about his AI experience, open-source work, or team leadership?",
    "I'm naresh.ai - I stick to what I know best: Naresh's professional journey. Ask me about his career, technical skills, or management philosophy!"
]

export const GREETING_RESPONSE =
    "Hey! I'm naresh.ai. I can tell you about Naresh's career, skills, leadership style, or projects. What would you like to know?"

export function initTopicGuard(chunks) {
    onTopicKeywords = new Set(STATIC_KEYWORDS)

    for (const chunk of chunks) {
        if (chunk.meta?.co) {
            addWords(chunk.meta.co)
        }

        if (chunk.meta?.name) {
            addWords(chunk.meta.name)
        }

        if (chunk.section === 'skills') {
            const afterColon = (chunk.text || '').split(':')[1]
            if (afterColon) {
                afterColon.split(',').forEach((item) => addWords(item))
            }
        }

        if (chunk.section === 'certs') {
            const afterColon = (chunk.text || '').split(':')[1]
            if (afterColon) {
                afterColon.split(',').forEach((item) => {
                    const name = item.split('(')[0]
                    addWords(name)
                })
            }
        }

        if (chunk.label) {
            addWords(chunk.label)
        }
    }
}

function addWords(str) {
    const words = (str || '')
        .toLowerCase()
        .replace(/[^a-z0-9.#+\-/\s]/g, '')
        .split(/\s+/)
    for (const w of words) {
        if (w.length >= 2) onTopicKeywords.add(w)
    }
}

export function isOffTopic(query, search) {
    const q = query.trim().toLowerCase()
    if (!q) return { offTopic: false }

    const words = q.replace(/[!?,.'":;]/g, '').trim().split(/\s+/)
    if (words.length <= 2 && words.some((w) => GREETINGS.has(w))) {
        return { offTopic: false, greeting: true }
    }

    if (words.some((w) => onTopicKeywords.has(w))) {
        return { offTopic: false }
    }

    if (OFF_TOPIC_PATTERNS.some((p) => p.test(q))) {
        return { offTopic: true }
    }

    const results = search.search(query, 3)
    if (results.length > 0 && results[0].score != null && results[0].score < 0.4) {
        return { offTopic: false }
    }

    if (results.length === 0) {
        return { offTopic: true }
    }

    return { offTopic: false }
}

export function getOffTopicResponse() {
    return OFF_TOPIC_RESPONSES[Math.floor(Math.random() * OFF_TOPIC_RESPONSES.length)]
}
