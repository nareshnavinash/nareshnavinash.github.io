import Fuse from 'fuse.js'

const STOP_WORDS = new Set([
    'what',
    'which',
    'who',
    'how',
    'does',
    'did',
    'do',
    'is',
    'are',
    'was',
    'were',
    'the',
    'a',
    'an',
    'and',
    'or',
    'of',
    'in',
    'to',
    'for',
    'on',
    'at',
    'has',
    'have',
    'had',
    'you',
    'your',
    'his',
    'her',
    'can',
    'could',
    'would',
    'should',
    'tell',
    'me',
    'about',
    'show',
    'give',
    'please',
    'i',
    'my',
    'he',
    'she',
    'it',
    'they',
    'them',
    'this',
    'that',
    'with',
    'from',
    'be',
    'been',
    'being'
])

function stripStopWords(query) {
    const words = query
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => !STOP_WORDS.has(w.replace(/[?!.,]/g, '')))
    return words.length ? words.join(' ') : query
}

export function createLexicalSearch(docs) {
    const fuse = new Fuse(docs, {
        keys: [
            { name: 'text', weight: 0.6 },
            { name: 'label', weight: 0.3 },
            { name: 'section', weight: 0.1 }
        ],
        threshold: 0.5,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2
    })

    return {
        search(query, topK = 5) {
            if (!query || !query.trim()) return []
            const cleaned = stripStopWords(query.trim())
            const results = fuse.search(cleaned, { limit: topK })
            return results.map((r) => ({
                ...r.item,
                score: r.score
            }))
        },

        getAllDocs() {
            return docs
        }
    }
}
