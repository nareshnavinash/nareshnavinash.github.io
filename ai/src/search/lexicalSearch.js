import Fuse from 'fuse.js'

export function createLexicalSearch(docs) {
    const fuse = new Fuse(docs, {
        keys: [
            { name: 'text', weight: 0.6 },
            { name: 'label', weight: 0.3 },
            { name: 'section', weight: 0.1 }
        ],
        threshold: 0.4,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2
    })

    return {
        search(query, topK = 5) {
            if (!query || !query.trim()) return []
            const results = fuse.search(query.trim(), { limit: topK })
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
