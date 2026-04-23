import Fuse from 'fuse.js'

let popoverEl = null
let inputEl = null
let resultsEl = null
let activeIndex = 0
let items = []
let fuse = null
let prevFocused = null
let closeCb = null

export function initCmdK({ resumeData, search, handlers }) {
    const index = buildCmdKIndex(resumeData)
    fuse = new Fuse(index, {
        keys: [
            { name: 'label', weight: 0.5 },
            { name: 'subtitle', weight: 0.3 },
            { name: 'searchText', weight: 0.2 }
        ],
        threshold: 0.4,
        includeScore: true,
        ignoreLocation: true
    })
    items = index

    injectPopover()
    bindKeys(handlers)
}

function buildCmdKIndex(data) {
    const index = []

    // Sections
    const sections = [
        { id: '#about', label: 'About', subtitle: 'Who is Naresh' },
        { id: '#career', label: 'Career', subtitle: 'Experience & work history' },
        { id: '#skills', label: 'Skills', subtitle: 'Tech stack & tools' },
        { id: '#leadership', label: 'Leadership', subtitle: 'Management principles' },
        { id: '#open-source', label: 'Open Source', subtitle: 'GitHub repos & projects' },
        { id: '#writing', label: 'Writing', subtitle: 'Articles & publications' },
        { id: '#certs', label: 'Certifications', subtitle: 'AWS, Reforge, Cisco...' },
        { id: '#contact', label: 'Contact', subtitle: 'Email, LinkedIn, social' }
    ]
    sections.forEach((s) => {
        index.push({
            category: 'Sections',
            icon: '#',
            label: s.label,
            subtitle: s.subtitle,
            searchText: `${s.label} ${s.subtitle}`,
            action: { type: 'scroll', target: s.id }
        })
    })

    // Career roles
    const career = data.career || []
    career.forEach((role, i) => {
        if (role.isTail) return
        index.push({
            category: 'Career',
            icon: role.role?.includes('Manager') ? 'EM' : role.role?.substring(0, 2) || '>>',
            label: `${role.role} at ${role.co}`,
            subtitle: role.date,
            searchText: `${role.role} ${role.co} ${role.date} ${role.teaser}`,
            action: { type: 'career', idx: i }
        })
    })

    // Repos
    const allRepos = [
        ...(data.reposStarred || []).map((r, i) => ({ ...r, __kind: 'Starred', __idx: i })),
        ...(data.reposRecent || []).map((r, i) => ({ ...r, __kind: 'Recent', __idx: i }))
    ]
    allRepos.forEach((r) => {
        index.push({
            category: 'Repos',
            icon: '</>',
            label: r.name,
            subtitle: r.tagline || r.desc?.slice(0, 60) || '',
            searchText: `${r.name} ${r.tagline} ${r.desc} ${r.tags?.join(' ') || ''} ${r.language}`,
            action: { type: 'repo', kind: r.__kind, idx: r.__idx }
        })
    })

    // Articles
    const allArticles = [
        ...(data.articlesPinned || []).map((a, i) => ({ ...a, __kind: 'Pinned', __idx: i })),
        ...(data.articlesRecent || []).map((a, i) => ({ ...a, __kind: 'Recent', __idx: i }))
    ]
    allArticles.forEach((a) => {
        index.push({
            category: 'Articles',
            icon: '✎',
            label: a.title,
            subtitle: `${a.date} · ${(a.tags?.[0] || '').toUpperCase()}`,
            searchText: `${a.title} ${a.date} ${a.tags?.join(' ') || ''} ${a.desc}`,
            action: { type: 'article', kind: a.__kind, idx: a.__idx }
        })
    })

    // Skills
    const skills = data.skills || []
    skills.forEach((cat) => {
        cat.items.forEach((item) => {
            index.push({
                category: 'Skills',
                icon: '[S]',
                label: item,
                subtitle: cat.name,
                searchText: `${item} ${cat.name} skill`,
                action: { type: 'scroll', target: '#skills' }
            })
        })
    })

    return index
}

function injectPopover() {
    if (document.getElementById('cmdk-overlay')) return

    const html = `
        <div id="cmdk-overlay" class="cmdk" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Quick search">
            <div class="cmdk__backdrop"></div>
            <div class="cmdk__panel">
                <div class="cmdk__input-wrap">
                    <span class="cmdk__icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                    </span>
                    <input id="cmdk-input" type="text" placeholder="Search resume, ask a question..." autocomplete="off" />
                    <kbd class="cmdk__kbd">esc</kbd>
                </div>
                <div id="cmdk-results" class="cmdk__results" role="listbox" aria-label="Search results"></div>
                <div class="cmdk__footer">
                    <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                    <span><kbd>↵</kbd> select</span>
                    <span><kbd>esc</kbd> close</span>
                </div>
            </div>
        </div>`

    document.body.insertAdjacentHTML('beforeend', html)
    popoverEl = document.getElementById('cmdk-overlay')
    inputEl = document.getElementById('cmdk-input')
    resultsEl = document.getElementById('cmdk-results')

    // Backdrop click closes
    popoverEl.querySelector('.cmdk__backdrop').addEventListener('click', close)

    // Input handler
    let debounceTimer = null
    inputEl.addEventListener('input', () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            activeIndex = 0
            renderResults(inputEl.value.trim())
        }, 80)
    })

    // Keyboard navigation inside popover
    inputEl.addEventListener('keydown', (e) => {
        const count = resultsEl.querySelectorAll('.cmdk__item').length
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            activeIndex = (activeIndex + 1) % Math.max(count, 1)
            highlightActive()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            activeIndex = (activeIndex - 1 + Math.max(count, 1)) % Math.max(count, 1)
            highlightActive()
        } else if (e.key === 'Enter') {
            e.preventDefault()
            selectActive()
        } else if (e.key === 'Escape') {
            e.preventDefault()
            close()
        }
    })
}

function bindKeys(handlers) {
    closeCb = handlers

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault()
            if (popoverEl?.classList.contains('open')) {
                close()
            } else {
                open()
            }
        }
    })

    // Search button in nav
    const searchBtn = document.getElementById('search-btn')
    if (searchBtn) {
        searchBtn.addEventListener('click', () => open())
    }
}

function open() {
    if (!popoverEl) return
    prevFocused = document.activeElement
    popoverEl.classList.add('open')
    popoverEl.setAttribute('aria-hidden', 'false')
    document.body.classList.add('cmdk-open')
    inputEl.value = ''
    activeIndex = 0
    renderResults('')
    setTimeout(() => inputEl.focus(), 50)
}

function close() {
    if (!popoverEl) return
    popoverEl.classList.remove('open')
    popoverEl.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('cmdk-open')
    if (prevFocused) {
        prevFocused.focus()
        prevFocused = null
    }
}

function renderResults(query) {
    if (!resultsEl) return
    resultsEl.innerHTML = ''

    let matched
    if (!query) {
        // Show sections + first few career roles when empty
        matched = items.filter((i) => i.category === 'Sections' || i.category === 'Career')
    } else {
        const fuseResults = fuse.search(query, { limit: 8 })
        matched = fuseResults.map((r) => r.item)

        // Add "Ask AI" option if query looks like a question
        if (query.length >= 3) {
            matched.push({
                category: 'Ask AI',
                icon: '✦',
                label: `Ask naresh.ai: "${query}"`,
                subtitle: 'Get an AI-powered answer',
                action: { type: 'ask', query }
            })
        }
    }

    // Group by category
    const grouped = new Map()
    matched.forEach((item) => {
        if (!grouped.has(item.category)) grouped.set(item.category, [])
        grouped.get(item.category).push(item)
    })

    let globalIdx = 0
    grouped.forEach((groupItems, category) => {
        const label = document.createElement('div')
        label.className = 'cmdk__group-label'
        label.textContent = category
        resultsEl.append(label)

        groupItems.forEach((item) => {
            const el = document.createElement('div')
            el.className = 'cmdk__item'
            el.setAttribute('role', 'option')
            el.dataset.idx = globalIdx

            el.innerHTML = `
                <span class="cmdk__item-icon">${escHtml(item.icon)}</span>
                <div class="cmdk__item-text">
                    <div class="cmdk__item-title">${escHtml(item.label)}</div>
                    <div class="cmdk__item-subtitle">${escHtml(item.subtitle)}</div>
                </div>`

            el.addEventListener('click', () => executeAction(item.action))
            el.addEventListener('mouseenter', () => {
                activeIndex = parseInt(el.dataset.idx, 10)
                highlightActive()
            })

            resultsEl.append(el)
            globalIdx++
        })
    })

    highlightActive()
}

function highlightActive() {
    if (!resultsEl) return
    const all = resultsEl.querySelectorAll('.cmdk__item')
    all.forEach((el, i) => {
        el.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false')
    })
    const active = all[activeIndex]
    if (active) active.scrollIntoView({ block: 'nearest' })
}

function selectActive() {
    const all = resultsEl.querySelectorAll('.cmdk__item')
    if (!all[activeIndex]) return

    // Find the item data by re-searching
    const query = inputEl.value.trim()
    let matched
    if (!query) {
        matched = items.filter((i) => i.category === 'Sections' || i.category === 'Career')
    } else {
        matched = fuse.search(query, { limit: 8 }).map((r) => r.item)
        if (query.length >= 3) {
            matched.push({ action: { type: 'ask', query } })
        }
    }

    if (matched[activeIndex]) {
        executeAction(matched[activeIndex].action)
    }
}

function executeAction(action) {
    if (!action || !closeCb) return
    close()

    switch (action.type) {
        case 'scroll':
            closeCb.scrollTo?.(action.target)
            break
        case 'career':
            closeCb.openCareerModal?.(action.idx)
            break
        case 'repo':
            closeCb.openDetailModal?.('repo', action.kind, action.idx)
            break
        case 'article':
            closeCb.openDetailModal?.('article', action.kind, action.idx)
            break
        case 'ask':
            openChatAndSend(action.query)
            break
    }
}

function openChatAndSend(query) {
    const panel = document.getElementById('chat-panel')
    const fab = document.getElementById('chat-fab')
    const input = document.getElementById('ask-input')
    const send = document.getElementById('ask-send')

    if (panel && !panel.classList.contains('is-open')) {
        panel.classList.add('is-open')
        panel.setAttribute('aria-hidden', 'false')
        if (fab) fab.setAttribute('aria-expanded', 'true')
        document.body.classList.add('chat-open')
    }

    if (input && send) {
        input.value = query
        setTimeout(() => send.click(), 100)
    }
}

function escHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}
