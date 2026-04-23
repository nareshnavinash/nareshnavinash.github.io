import { chunkResume } from './corpus/resumeChunker.js'
import { createLexicalSearch } from './search/lexicalSearch.js'
import { resolveIntent } from './search/intentMatcher.js'
import { queryRAG, getRemaining, getMax } from './rag/ragPipeline.js'
import { initChatAdapter } from './ui/chatAdapter.js'
import { initCmdK } from './ui/cmdKPopover.js'

let state = null

export function init({ resumeData, chatRoot, handlers, suggestions }) {
    const chunks = chunkResume(resumeData)
    const search = createLexicalSearch(chunks)

    state = { resumeData, chunks, search, handlers, suggestions }

    initChatAdapter({
        ...chatRoot,
        search,
        chunks,
        handlers,
        suggestions,
        resolveIntent: (q) => resolveIntent(q, search, handlers),
        queryRAG: (q) => queryRAG(q, search, chunks),
        getRemaining,
        getMax
    })

    initCmdK({
        resumeData,
        search,
        handlers,
        getRemaining,
        getMax
    })
}

export function destroy() {
    state = null
}
