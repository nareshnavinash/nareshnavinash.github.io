import { resolveIntent } from '../search/intentMatcher.js'
import { META_INTENT } from '../search/intentCatalog.js'
import { initTopicGuard, isOffTopic, getOffTopicResponse, GREETING_RESPONSE } from '../search/topicGuard.js'

let ctx = null

function initTarget(root, getRemaining, getMax) {
    if (!root?.logEl) return null
    const headLeft = root.logEl.closest('.ask')?.querySelector('.ask__head-l')
    let statusEl = null
    let rateEl = null
    if (headLeft) {
        const liveSpan = headLeft.querySelector('span:last-child')
        if (liveSpan) {
            liveSpan.innerHTML =
                'naresh.ai · <span class="ask__status" data-state="ready">ready</span> · <span class="ask__rate"></span>'
            statusEl = liveSpan.querySelector('.ask__status')
            rateEl = liveSpan.querySelector('.ask__rate')
            if (rateEl && getRemaining) rateEl.textContent = `${getRemaining()}/${getMax()}`
        }
    }
    return { ...root, statusEl, rateEl }
}

export function initChatAdapter(config) {
    const { primary, secondary, search, chunks, handlers, suggestions, queryRAG, getRemaining, getMax } = config

    const legacyMode = config.logEl !== undefined
    const pri = legacyMode
        ? initTarget(
              { logEl: config.logEl, inputEl: config.inputEl, sendEl: config.sendEl, suggEl: config.suggEl },
              getRemaining,
              getMax
          )
        : initTarget(primary, getRemaining, getMax)
    const sec = legacyMode ? null : initTarget(secondary, getRemaining, getMax)

    if (!pri?.logEl || !pri?.inputEl || !pri?.sendEl) return

    const targets = [pri, sec].filter(Boolean)

    const messages = [
        {
            role: 'a',
            text: "Hi! Ask me anything about Naresh's work, leadership, or projects. I'll answer from his resume."
        }
    ]

    ctx = {
        targets,
        messages,
        search,
        chunks,
        handlers,
        suggestions,
        queryRAG,
        getRemaining,
        getMax
    }

    const send = async (text) => {
        const q = (text || pri.inputEl.value || '').trim()
        if (!q) return
        targets.forEach((t) => {
            if (t.inputEl) t.inputEl.value = ''
        })
        messages.push({ role: 'u', text: q })
        render()

        // Show thinking
        setStatus('thinking')
        messages.push({ role: 't', stage: 'searching resume...' })
        render()

        try {
            // Resolve intent
            const resolution = resolveIntent(q, search, handlers)

            // Meta intent - canned response
            if (resolution?.intent?.type === 'meta') {
                popThinking()
                messages.push({ role: 'a', text: resolution.intent.response })
                render()
                setStatus('ready')
                return
            }

            // Navigation intent with high confidence
            if (resolution?.intent?.type === 'navigate' && resolution.confidence >= 0.7) {
                const target = resolution.intent.target
                popThinking()
                if (target.startsWith('/')) {
                    messages.push({ role: 'a', text: `Taking you to the 3D world...` })
                    render()
                    setStatus('ready')
                    setTimeout(() => {
                        window.location.href = target
                    }, 600)
                    return
                }
                messages.push({
                    role: 'a',
                    text: `Scrolling to ${resolution.intent.id.replace('nav.', '')} section...`
                })
                render()
                setStatus('ready')
                handlers.scrollTo?.(target)
                return
            }

            // Off-topic guard - catch before burning an API call
            const topicCheck = isOffTopic(q, search)
            if (topicCheck.greeting) {
                popThinking()
                messages.push({ role: 'a', text: GREETING_RESPONSE })
                render()
                setStatus('ready')
                return
            }
            if (topicCheck.offTopic) {
                popThinking()
                messages.push({ role: 'a', text: getOffTopicResponse() })
                render()
                showFollowUps('qa.general')
                setStatus('ready')
                return
            }

            // Query intent → RAG pipeline
            updateThinking('generating answer...')
            const result = await queryRAG(q)

            popThinking()

            if (result.type === 'answer') {
                messages.push({ role: 'a', text: result.text, model: result.model })
                if (result.sources?.length) {
                    messages.push({ role: 'sources', items: result.sources })
                }
            } else {
                messages.push({
                    role: 'a',
                    text: result.text,
                    model: result.model,
                    variant: result.error ? 'error' : undefined
                })
                if (result.chunks?.length) {
                    messages.push({
                        role: 'sources',
                        items: result.chunks.map((c) => ({
                            id: c.id,
                            section: c.section,
                            label: c.label,
                            meta: c.meta
                        }))
                    })
                }
            }

            render()
            updateRate()
            showFollowUps(resolution?.intent?.id)
        } catch (err) {
            popThinking()
            messages.push({
                role: 'a',
                text: 'Something went wrong. Try asking in a different way.',
                variant: 'error'
            })
            render()
            updateRate()
        }

        setStatus('ready')
    }

    targets.forEach((t) => {
        t.sendEl?.addEventListener('click', () => send())
        t.inputEl?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') send()
        })
    })

    initTopicGuard(chunks)

    renderSuggestions(suggestions, send)
    render()

    return { send }
}

function renderToLog(logEl, messages, handlers) {
    logEl.innerHTML = ''
    messages.forEach((m) => {
        if (m.role === 'a') {
            const tag = document.createElement('div')
            tag.className = 'msg__tag'
            tag.textContent = m.model ? `NARESH.AI · via ${m.model}` : 'NARESH.AI'
            const body = document.createElement('div')
            body.innerHTML = formatResponse(m.text)
            const wrap = document.createElement('div')
            wrap.className = `msg msg--a${m.variant === 'error' ? ' msg--error' : ''}`
            wrap.append(tag, body)
            logEl.append(wrap)
        } else if (m.role === 'u') {
            const div = document.createElement('div')
            div.className = 'msg msg--u'
            div.textContent = m.text
            logEl.append(div)
        } else if (m.role === 't') {
            const div = document.createElement('div')
            div.className = 'msg msg--think'
            div.innerHTML = `<span class="thinking-dots"><span></span><span></span><span></span></span> <span class="thinking-label">${m.stage || 'thinking...'}</span>`
            logEl.append(div)
        } else if (m.role === 'sources') {
            const wrap = document.createElement('div')
            wrap.className = 'msg__sources'
            ;(m.items || []).forEach((src) => {
                const btn = document.createElement('button')
                btn.className = 'msg__src'
                btn.textContent = src.label || src.section
                btn.addEventListener('click', () => handleSourceClick(src, handlers))
                wrap.append(btn)
            })
            logEl.append(wrap)
        }
    })
    logEl.scrollTop = logEl.scrollHeight
}

function render() {
    if (!ctx) return
    ctx.targets.forEach((t) => renderToLog(t.logEl, ctx.messages, ctx.handlers))
}

function handleSourceClick(src, handlers) {
    const sectionMap = {
        about: '#about',
        career: '#career',
        skills: '#skills',
        leadership: '#leadership',
        repos: '#repos',
        writing: '#writing',
        certs: '#certs',
        education: '#contact',
        contact: '#contact'
    }

    if (src.section === 'career' && src.meta?.idx !== undefined) {
        handlers.openCareerModal?.(src.meta.idx)
        return
    }
    if (src.section === 'repos' && src.meta) {
        handlers.openDetailModal?.('repo', (src.meta.kind || '').toLowerCase(), src.meta.idx)
        return
    }
    if (src.section === 'writing' && src.meta) {
        handlers.openDetailModal?.('article', (src.meta.kind || '').toLowerCase(), src.meta.idx)
        return
    }

    const target = sectionMap[src.section]
    if (target) handlers.scrollTo?.(target)
}

function setStatus(state) {
    if (!ctx) return
    const label = state === 'ready' ? 'ready' : state === 'thinking' ? 'thinking...' : state
    ctx.targets.forEach((t) => {
        if (t.statusEl) {
            t.statusEl.dataset.state = state
            t.statusEl.textContent = label
        }
    })
}

function updateRate() {
    if (!ctx?.getRemaining) return
    const text = `${ctx.getRemaining()}/${ctx.getMax()}`
    ctx.targets.forEach((t) => {
        if (t.rateEl) t.rateEl.textContent = text
    })
}

function popThinking() {
    if (!ctx) return
    const idx = ctx.messages.findIndex((m) => m.role === 't')
    if (idx !== -1) ctx.messages.splice(idx, 1)
}

function updateThinking(stage) {
    if (!ctx) return
    const msg = ctx.messages.find((m) => m.role === 't')
    if (msg) {
        msg.stage = stage
        render()
    }
}

function renderSuggestions(suggestions, send) {
    if (!ctx) return
    ctx.targets.forEach((t) => {
        if (!t.suggEl) return
        t.suggEl.innerHTML = ''
        ;(suggestions || []).forEach((s) => {
            const btn = document.createElement('button')
            btn.className = 'sugg'
            btn.textContent = s
            btn.addEventListener('click', () => {
                ctx.targets.forEach((tt) => {
                    if (tt.suggEl) tt.suggEl.innerHTML = ''
                })
                send(s)
            })
            t.suggEl.append(btn)
        })
    })
}

function formatResponse(text) {
    let s = String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

    const blocks = s.split(/\n{2,}/)
    return blocks
        .map((block) => {
            const lines = block.split('\n')
            if (lines.every((l) => /^[-•]\s/.test(l.trim()) || !l.trim())) {
                const items = lines.filter((l) => l.trim()).map((l) => `<li>${l.replace(/^[-•]\s+/, '')}</li>`)
                return `<ul>${items.join('')}</ul>`
            }
            return `<p>${lines.join('<br>')}</p>`
        })
        .join('')
}

const FOLLOW_UPS = {
    'qa.career_detail': ['What technologies were used?', 'How large was the team?', 'What about the previous role?'],
    'qa.skills_fit': ['Show me related projects', 'Where was this used?'],
    'qa.leadership': ['How do you handle conflict?', 'Tell me about team growth'],
    'qa.recruiter': ['What certifications does he have?', 'Tell me about his AI experience'],
    'qa.general': ['Show leadership principles', 'What are his top projects?']
}

function showFollowUps(intentId) {
    if (!ctx) return
    const followUps = FOLLOW_UPS[intentId] || FOLLOW_UPS['qa.general']
    ctx.targets.forEach((t) => {
        if (!t.suggEl) return
        t.suggEl.innerHTML = ''
        followUps.forEach((text) => {
            const btn = document.createElement('button')
            btn.className = 'sugg'
            btn.textContent = text
            btn.addEventListener('click', () => {
                ctx.targets.forEach((tt) => {
                    if (tt.suggEl) tt.suggEl.innerHTML = ''
                })
                t.inputEl.value = text
                t.sendEl.click()
            })
            t.suggEl.append(btn)
        })
    })
}
