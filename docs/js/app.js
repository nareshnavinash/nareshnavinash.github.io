// app.js — Naresh Sekar Profile, cinematic redesign
// Vanilla ES module. Handles: resume.json data loading, section rendering,
// career modal, ask-me chat (stubbed for static hosting), FAB, nav scroll,
// smooth scroll, count-up stats, theme toggle.

import { adaptResume } from './profile-render.js'

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag)
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') n.className = v
        else if (k === 'html') n.innerHTML = v
        else if (k.startsWith('on')) n.addEventListener(k.slice(2), v)
        else n.setAttribute(k, v)
    }
    kids.flat().forEach((k) => k != null && n.append(k.nodeType ? k : document.createTextNode(k)))
    return n
}

// ---------- data ----------
let CAREER = []
let CAREER_STAGE = []
let SKILLS = []
let LEADERSHIP = []
let CERTS = []
let SUGGESTIONS = []
let REPOS_STARRED = []
let REPOS_RECENT = []
let ARTICLES_PINNED = []
let ARTICLES_RECENT = []
let REPO_LIST = [] // flattened [...starred, ...recent] with .kind
let ARTICLE_LIST = [] // flattened [...pinned, ...recent] with .kind

async function loadResume() {
    const candidates = ['data/resume.json', '/data/resume.json', 'resume.json', '/resume.json', '../resume.json']
    for (const p of candidates) {
        try {
            const r = await fetch(p)
            if (r.ok) return await r.json()
        } catch (_) {
            /* try next */
        }
    }
    throw new Error('resume.json not found (tried: ' + candidates.join(', ') + ')')
}

// ---------- render sections ----------
function renderCareer() {
    const stage = $('#career-stage')
    const progress = $('#career-progress')
    if (!stage) return
    stage.innerHTML = ''
    if (progress) progress.innerHTML = ''

    CAREER_STAGE.forEach((c, i) => {
        const iconNum = String(i + 1).padStart(2, '0')
        const byline = c.url
            ? el(
                  'div',
                  { class: 'stage-card__co' },
                  'at ',
                  el('a', { href: c.url, target: '_blank', rel: 'noreferrer' }, c.co)
              )
            : el('div', { class: 'stage-card__co' }, 'at ' + c.co)
        const targetIdx = c.isTail ? c.targetIdx : i
        const onCardClick = (ev) => {
            if (ev && ev.target && ev.target.closest('a')) return
            openCareerModal(targetIdx)
        }
        const cardAttrs = {
            class: 'stage-card stage-card--career',
            'data-idx': String(i),
            onclick: onCardClick
        }
        if (c.isTail) cardAttrs['data-tail'] = 'true'
        const card = el(
            'div',
            cardAttrs,
            el('div', { class: 'icon' }, iconNum),
            el('div', { class: 'stage-card__date' }, c.date || ''),
            el('h3', {}, c.role),
            byline,
            el('p', {}, c.teaser || ''),
            el(
                'button',
                {
                    type: 'button',
                    class: 'stage-card__more',
                    onclick: (ev) => {
                        ev.stopPropagation()
                        openCareerModal(targetIdx)
                    }
                },
                c.isTail ? 'Before that ' : 'Show more ',
                el('span', { class: 'arr' }, '→')
            )
        )
        stage.append(card)

        if (progress) progress.append(el('span', { class: i === 0 ? 'active' : '' }))
    })
}

// ---------- career modal ----------
let currentModalIdx = 0

function openCareerModal(idx) {
    if (!CAREER.length) return
    currentModalIdx = ((idx % CAREER.length) + CAREER.length) % CAREER.length
    const c = CAREER[currentModalIdx]
    const modal = $('#career-modal')
    if (!modal) return
    $('#career-modal-meta').textContent = c.date
    $('#career-modal-title').textContent = c.role
    const byline = $('#career-modal-byline')
    byline.innerHTML = ''
    byline.append('at ')
    if (c.url) {
        byline.append(el('a', { href: c.url, target: '_blank', rel: 'noreferrer' }, c.co))
    } else {
        byline.append(c.co)
    }
    $('#career-modal-desc').innerHTML = c.desc
    $('#career-modal-count').textContent = currentModalIdx + 1 + ' / ' + CAREER.length
    modal.classList.add('open')
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
}

function closeCareerModal() {
    const modal = $('#career-modal')
    if (!modal) return
    modal.classList.remove('open')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
}

function setupCareerModal() {
    const modal = $('#career-modal')
    if (!modal) return
    modal.querySelectorAll('[data-close]').forEach((n) => {
        n.addEventListener('click', closeCareerModal)
    })
    $('#career-modal-prev')?.addEventListener('click', () => openCareerModal(currentModalIdx - 1))
    $('#career-modal-next')?.addEventListener('click', () => openCareerModal(currentModalIdx + 1))
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return
        if (e.key === 'Escape') closeCareerModal()
        else if (e.key === 'ArrowLeft') openCareerModal(currentModalIdx - 1)
        else if (e.key === 'ArrowRight') openCareerModal(currentModalIdx + 1)
    })
}

function renderSkills() {
    const body = $('#stack-term-body')
    const term = $('#stack-term')
    if (!body || !term) return
    body.innerHTML = ''

    const lines = [
        { k: 'cmd', text: 'naresh@stack ~/skills % cat stack.toml' },
        { k: 'blank', text: '' },
        { k: 'title', text: '# 11+ years. Teams grown. One toolkit.' },
        { k: 'blank', text: '' }
    ]
    SKILLS.forEach((cat) => {
        lines.push({ k: 'key', text: '[' + cat.name.toLowerCase().replace(/\s+/g, '_') + ']' })
        lines.push({ k: 'val', text: '  = ' + JSON.stringify(cat.items).replace(/,/g, ', ') })
        lines.push({ k: 'blank', text: '' })
    })
    lines.push({ k: 'cmd', text: 'naresh@stack ~/skills % _', cursor: true })

    const render = (upto, charsInLast) => {
        body.innerHTML = ''
        for (let i = 0; i < upto && i < lines.length; i++) {
            const l = lines[i]
            const div = el('div', { class: 'term-line term-line--' + l.k })
            div.textContent = l.text
            body.append(div)
        }
        if (upto <= lines.length) {
            const l = lines[Math.min(upto, lines.length) - 1]
            if (charsInLast != null && l) {
                const last = body.lastChild
                if (last) last.textContent = l.text.slice(0, charsInLast)
                if (last) last.appendChild(el('span', { class: 'term-caret' }))
            }
        }
    }

    let played = false
    const play = () => {
        if (played) return
        played = true
        let lineIdx = 0
        const step = () => {
            if (lineIdx >= lines.length) return
            const l = lines[lineIdx]
            const perChar = l.k === 'cmd' ? 28 : l.k === 'val' ? 4 : l.k === 'title' ? 16 : 10
            const delay = l.k === 'blank' ? 40 : l.k === 'key' ? 120 : 60
            const text = l.text
            let c = 0
            const typeChar = () => {
                c++
                render(lineIdx + 1, c)
                if (c < text.length) {
                    setTimeout(typeChar, perChar)
                } else {
                    render(lineIdx + 1)
                    lineIdx++
                    if (lineIdx === lines.length) {
                        render(lineIdx, lines[lineIdx - 1].text.length)
                    } else {
                        setTimeout(step, delay)
                    }
                }
            }
            if (text.length === 0) {
                render(lineIdx + 1)
                lineIdx++
                setTimeout(step, delay)
            } else {
                typeChar()
            }
        }
        step()
    }

    render(1)

    const io = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                play()
                io.disconnect()
            }
        },
        { threshold: 0.35 }
    )
    io.observe(term)
}

function renderLeadership() {
    const stage = $('#lead-dio-stage')
    const prog = $('#lead-dio-progress')
    if (!stage || !prog) return
    stage.innerHTML = ''
    prog.innerHTML = ''
    LEADERSHIP.forEach((l, i) => {
        stage.append(
            el(
                'div',
                { class: 'lead-stage-card' },
                el('div', { class: 'lead-stage-card__num' }, String(i + 1).padStart(2, '0')),
                el('h3', { class: 'lead-stage-card__title' }, l.t),
                el('p', { class: 'lead-stage-card__desc' }, l.d)
            )
        )
        prog.append(el('span', { class: i === 0 ? 'active' : '' }))
    })
}

function renderRepoTerminals() {
    const render = (hostId, list, kind) => {
        const host = $(hostId)
        if (!host) return
        host.innerHTML = ''
        list.forEach((r, i) => {
            const tag = r.tags[0] || r.language || 'repo'
            const row = el(
                'div',
                { class: 'repo-term__row', style: '--stagger: ' + i * 110 + 'ms' },
                el('span', { class: 'prompt' }, '❯'),
                el('span', { class: 'name' }, r.name),
                el('span', { class: 'tag' }, tag),
                el(
                    'button',
                    {
                        type: 'button',
                        class: 'repo-term__more',
                        'data-kind': kind,
                        'data-idx': String(i)
                    },
                    'show more →'
                )
            )
            host.append(row)
        })
    }
    render('#repo-term-starred', REPOS_STARRED, 'starred')
    render('#repo-term-recent', REPOS_RECENT, 'recent')
    observeForClass('.repo-term', 'is-typed', 0.2)
}

function renderScrolls() {
    const render = (hostId, list, kind) => {
        const host = $(hostId)
        if (!host) return
        host.innerHTML = ''
        list.forEach((a, i) => {
            const tag = (a.tags[0] || '').toUpperCase()
            const metaText = tag ? a.date + ' · ' + tag : a.date
            const row = el(
                'li',
                { class: 'scroll__row', style: '--stagger: ' + i * 70 + 'ms' },
                el(
                    'div',
                    { class: 'scroll__main' },
                    el(
                        'a',
                        {
                            class: 'scroll__title-link',
                            href: a.url,
                            target: '_blank',
                            rel: 'noreferrer'
                        },
                        a.title
                    ),
                    el('div', { class: 'scroll__meta' }, metaText)
                ),
                el(
                    'button',
                    {
                        type: 'button',
                        class: 'scroll__more',
                        'data-kind': kind,
                        'data-idx': String(i)
                    },
                    'show more →'
                )
            )
            host.append(row)
        })
    }
    render('#scroll-pinned', ARTICLES_PINNED, 'pinned')
    render('#scroll-recent', ARTICLES_RECENT, 'recent')
    observeScrollsUnroll()
}

function observeScrollsUnroll() {
    const wrapper = $('.scrolls')
    const scrolls = $$('.scroll')
    if (!wrapper || !scrolls.length) return
    if (typeof IntersectionObserver === 'undefined') {
        scrolls.forEach((s) => s.classList.add('is-unrolled'))
        return
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    scrolls.forEach((s, i) => {
                        setTimeout(() => s.classList.add('is-unrolled'), i * 180)
                    })
                    io.disconnect()
                }
            })
        },
        { threshold: 0.15 }
    )
    io.observe(wrapper)
}

function observeForClass(selector, className, threshold) {
    const targets = $$(selector)
    if (!targets.length || typeof IntersectionObserver === 'undefined') {
        targets.forEach((t) => t.classList.add(className))
        return
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className)
                    io.unobserve(entry.target)
                }
            })
        },
        { threshold }
    )
    targets.forEach((t) => io.observe(t))
}

// ---------- detail modal (repos + articles) ----------
let detailType = 'repo' // 'repo' | 'article'
let detailIdx = 0

function detailList() {
    return detailType === 'repo' ? REPO_LIST : ARTICLE_LIST
}

function resolveKindLabel(type, kind) {
    if (kind === 'starred') return 'Starred'
    if (kind === 'pinned') return 'Pinned'
    if (kind === 'recent') return type === 'repo' ? 'Recent' : 'Latest'
    return kind
}

function openDetailModal(type, kind, localIdx) {
    detailType = type
    const list = detailList()
    if (!list.length) return
    const target = resolveKindLabel(type, kind)
    const offset = list.findIndex((it) => it.__kind === target)
    const idx = offset >= 0 ? offset + localIdx : localIdx
    renderDetail(((idx % list.length) + list.length) % list.length)
}

function renderDetail(idx) {
    const modal = $('#detail-modal')
    if (!modal) return
    const list = detailList()
    if (!list.length) return
    detailIdx = ((idx % list.length) + list.length) % list.length
    const it = list[detailIdx]

    const chip = $('#detail-modal-chip')
    chip.textContent = it.__kind
    chip.setAttribute('data-variant', it.__kind.toLowerCase())

    const thumb = $('#detail-modal-thumb')
    thumb.innerHTML = ''
    if (it.thumbnail) {
        thumb.append(el('img', { src: it.thumbnail, alt: '', loading: 'lazy' }))
    }

    const title = detailType === 'repo' ? it.name : it.title
    $('#detail-modal-title').textContent = title

    const meta = $('#detail-modal-meta')
    if (detailType === 'repo') {
        const bits = []
        if (it.language) bits.push(it.language)
        if (it.tagline) bits.push(it.tagline)
        meta.textContent = bits.join(' · ')
    } else {
        meta.textContent = it.date
    }

    $('#detail-modal-desc').textContent = it.desc || ''

    const tags = $('#detail-modal-tags')
    tags.innerHTML = ''
    ;(it.tags || []).forEach((t) => tags.append(el('span', {}, t)))

    const links = $('#detail-modal-links')
    links.innerHTML = ''
    if (detailType === 'repo') {
        if (it.url) {
            links.append(el('a', { href: it.url, target: '_blank', rel: 'noreferrer' }, 'source ↗'))
        }
        if (it.demo) {
            links.append(el('a', { href: it.demo, target: '_blank', rel: 'noreferrer' }, 'live demo ↗'))
        }
    } else if (it.url) {
        links.append(el('a', { href: it.url, target: '_blank', rel: 'noreferrer' }, 'read on Medium ↗'))
    }

    $('#detail-modal-count').textContent = detailIdx + 1 + ' / ' + list.length

    modal.classList.add('open')
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
}

function closeDetailModal() {
    const modal = $('#detail-modal')
    if (!modal) return
    modal.classList.remove('open')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
}

function setupDetailModal() {
    const modal = $('#detail-modal')
    if (!modal) return
    modal.querySelectorAll('[data-detail-close]').forEach((n) => {
        n.addEventListener('click', closeDetailModal)
    })
    $('#detail-modal-prev')?.addEventListener('click', () => renderDetail(detailIdx - 1))
    $('#detail-modal-next')?.addEventListener('click', () => renderDetail(detailIdx + 1))
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return
        if (e.key === 'Escape') closeDetailModal()
        else if (e.key === 'ArrowLeft') renderDetail(detailIdx - 1)
        else if (e.key === 'ArrowRight') renderDetail(detailIdx + 1)
    })
    // If prerender populated the DOM, wire the existing buttons too.
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-kind][data-idx]')
        if (!btn) return
        const kind = btn.dataset.kind
        const localIdx = parseInt(btn.dataset.idx, 10)
        if (btn.classList.contains('repo-term__more')) {
            openDetailModal('repo', kind, localIdx)
        } else if (btn.classList.contains('scroll__more')) {
            openDetailModal('article', kind, localIdx)
        }
    })
}

function renderCerts() {
    const track = $('#certs-track')
    if (!track) return
    track.innerHTML = ''
    const build = () => {
        CERTS.forEach((c) => {
            track.append(
                el(
                    'span',
                    { class: 'cert-pill' },
                    el('span', { class: 'cert-pill__name' }, c.name),
                    el('span', { class: 'cert-pill__sep' }, '·'),
                    el('span', { class: 'cert-pill__issuer' }, c.issuer)
                )
            )
            track.append(el('span', { class: 'cert-pill__bullet' }, '◇'))
        })
    }
    build()
    build() // two passes for seamless marquee loop
    // Force layout so max-content width is computed before animation evaluates -50%
    void track.scrollWidth
    track.style.animation = 'none'
    void track.offsetHeight
    track.style.animation = ''
}

// ---------- ask-me chat (stubbed for static hosting) ----------
const STUB_REPLY =
    "Short version: Naresh leads engineering at TestGorilla, specialising in AI-augmented development. He ships AI video interviews and a credit-based pricing engine, runs open-source dev tools on weekends, and writes about it on Medium. Scroll down to the socials if you'd like to say hi, he loves engineering leadership and AI conversations."

function renderSuggestions(host, onPick) {
    host.innerHTML = ''
    SUGGESTIONS.forEach((s) => {
        host.append(el('button', { class: 'sugg', onclick: () => onPick(s) }, s))
    })
}

function makeChat({ logEl, inputEl, sendEl, suggEl }) {
    if (!logEl || !inputEl || !sendEl || !suggEl) return null
    const messages = [
        {
            role: 'a',
            text: "Hi, ask me anything about Naresh's work, leadership, or projects. I'll answer from his resume."
        }
    ]
    const render = () => {
        logEl.innerHTML = ''
        messages.forEach((m) => {
            if (m.role === 'a') {
                logEl.append(
                    el(
                        'div',
                        { class: 'msg msg--a' },
                        el('div', { class: 'msg__tag' }, 'NARESH.AI'),
                        el('div', {}, m.text)
                    )
                )
            } else if (m.role === 'u') {
                logEl.append(el('div', { class: 'msg msg--u' }, m.text))
            } else if (m.role === 't') {
                logEl.append(el('div', { class: 'msg msg--think' }, m.text))
            }
        })
        logEl.scrollTop = logEl.scrollHeight
    }
    const send = async (text) => {
        const q = (text || inputEl.value || '').trim()
        if (!q) return
        inputEl.value = ''
        messages.push({ role: 'u', text: q })
        messages.push({ role: 't', text: 'thinking…' })
        render()
        // Simulate a brief think so the UI beat lands.
        await new Promise((r) => setTimeout(r, 450))
        messages.pop()
        messages.push({ role: 'a', text: STUB_REPLY })
        render()
    }
    sendEl.addEventListener('click', () => send())
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') send()
    })
    renderSuggestions(suggEl, (text) => send(text))
    render()
    return { send }
}

// ---------- scroll effects ----------
function setupNavScroll() {
    const nav = $('.nav')
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    document.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
}

function setupSmoothScroll() {
    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href')
            if (id.length > 1) {
                const target = $(id)
                if (target) {
                    e.preventDefault()
                    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' })
                }
            }
        })
    })
}

function setupReveals() {
    const io = new IntersectionObserver(
        (ents) => {
            ents.forEach((en) => {
                if (en.isIntersecting) {
                    en.target.style.opacity = 1
                    en.target.style.transform = 'none'
                    io.unobserve(en.target)
                }
            })
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    $$('.section, .hero, .dossier-card').forEach((n) => {
        n.style.opacity = 0
        n.style.transform = 'translateY(20px)'
        n.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.16,.84,.44,1)'
        io.observe(n)
    })
}

function countUp(target, value, duration = 1600) {
    let raf
    let start
    const tick = (t) => {
        if (!start) start = t
        const p = Math.min(1, (t - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        const v = value * eased
        const isFloat = value % 1 !== 0
        target.textContent = isFloat ? v.toFixed(1) : Math.round(v).toLocaleString()
        if (p < 1) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
        (ents) => {
            if (ents[0].isIntersecting) {
                raf = requestAnimationFrame(tick)
                io.disconnect()
            }
        },
        { threshold: 0.4 }
    )
    io.observe(target)
}

function setupCountUps() {
    $$('[data-count]').forEach((n) => countUp(n, parseFloat(n.dataset.count)))
}

// ---------- theme toggle ----------
const THEME_KEY = 'profile-theme'
function setupTheme() {
    const btn = $('#theme-btn')
    if (!btn) return
    const setIcon = (t) => {
        btn.textContent = t === 'day' ? '☾' : '☀'
        btn.setAttribute('title', t === 'day' ? 'Switch to night' : 'Switch to day')
    }
    const current = () => document.documentElement.getAttribute('data-theme') || 'night'
    setIcon(current())
    btn.addEventListener('click', () => {
        const next = current() === 'day' ? 'night' : 'day'
        document.documentElement.setAttribute('data-theme', next)
        try {
            localStorage.setItem(THEME_KEY, next)
        } catch (_) {
            /* ignore */
        }
        setIcon(next)
    })
}

function setYear() {
    const y = $('#year')
    if (y) y.textContent = new Date().getFullYear()
}

// ---------- live timers ----------
const CAREER_START = new Date('2015-06-30T00:00:00Z').getTime()
const LEADING_START = new Date('2023-08-01T00:00:00Z').getTime()
function pad2(n) {
    return String(n).padStart(2, '0')
}
function computeYmd(startMs, now) {
    const startDate = new Date(startMs)
    const nowDate = new Date(now)
    let years = nowDate.getUTCFullYear() - startDate.getUTCFullYear()
    let months = nowDate.getUTCMonth() - startDate.getUTCMonth()
    let days = nowDate.getUTCDate() - startDate.getUTCDate()
    if (days < 0) {
        months--
        const prevMonth = new Date(Date.UTC(nowDate.getUTCFullYear(), nowDate.getUTCMonth(), 0))
        days += prevMonth.getUTCDate()
    }
    if (months < 0) {
        years--
        months += 12
    }
    return { years, months, days }
}
function setupTimer(startMs, yearsElId, clockElId) {
    const yearsEl = $(yearsElId)
    const clockEl = $(clockElId)
    if (!yearsEl || !clockEl) return
    const tick = () => {
        const now = Date.now()
        const { years, months, days } = computeYmd(startMs, now)
        const totalSec = Math.floor((now - startMs) / 1000)
        const hrs = Math.floor(totalSec / 3600) % 24
        const min = Math.floor(totalSec / 60) % 60
        const sec = totalSec % 60
        yearsEl.textContent = `${years}y ${months}m ${days}d`
        clockEl.textContent = `${pad2(hrs)}:${pad2(min)}:${pad2(sec)}`
    }

    // Render seed values synchronously so SSR/prerendered text stays sane.
    yearsEl.textContent = '0y 0m 0d'
    clockEl.textContent = '00:00:00'

    let started = false
    const animateThenLive = () => {
        if (started) return
        started = true
        const { years: tY, months: tM, days: tD } = computeYmd(startMs, Date.now())
        const duration = 1200
        let raf
        let animStart
        const animate = (t) => {
            if (!animStart) animStart = t
            const p = Math.min(1, (t - animStart) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            const y = Math.round(tY * eased)
            const m = Math.round(tM * eased)
            const d = Math.round(tD * eased)
            yearsEl.textContent = `${y}y ${m}m ${d}d`
            if (p < 1) {
                raf = requestAnimationFrame(animate)
            } else {
                tick()
                setInterval(tick, 1000)
            }
        }
        raf = requestAnimationFrame(animate)
    }

    const io = new IntersectionObserver(
        (ents) => {
            if (ents.some((e) => e.isIntersecting)) {
                animateThenLive()
                io.disconnect()
            }
        },
        { threshold: 0.4 }
    )
    io.observe(yearsEl)
}
function setupExperienceTimer() {
    setupTimer(CAREER_START, '#exp-years', '#exp-clock')
}
function setupLeadingTimer() {
    setupTimer(LEADING_START, '#lead-years', '#lead-clock')
}

function setLiveCounts(totalMediumPosts, publicRepoCount) {
    const medium = $('#medium-count')
    const gh = $('#repo-count')
    if (medium) medium.dataset.count = String(totalMediumPosts)
    if (gh) gh.dataset.count = String(publicRepoCount)
}

// ---------- chat FAB ----------
function setupChatFab() {
    const root = $('#chat-fab-root')
    if (!root) return
    root.innerHTML = `
        <button id="chat-fab" class="chat-fab" type="button" aria-label="Ask naresh.ai" aria-expanded="false">
            <svg class="chat-fab__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M10 1L7.78 6.22 2 8l5.78 1.78L10 16l2.22-5.22L18 9l-5.78-1.78zm8 4l-1.5 3.5L13 10l3.5 1.5L18 15l1.5-3.5L23 10l-3.5-1.5zm-4 10l-1.34 3.16L9.5 19.5l3.16 1.34L14 24l1.34-3.16 3.16-1.34-3.16-1.34z"/>
            </svg>
            <span class="chat-fab__dot" aria-hidden="true"></span>
        </button>
        <aside id="chat-panel" class="chat-panel" aria-hidden="true" aria-label="Ask naresh.ai" role="dialog">
            <div class="ask chat-panel__ask" role="region">
                <div class="ask__head">
                    <div class="ask__head-l">
                        <span class="dot"></span>
                        <span>naresh.ai · live</span>
                    </div>
                    <button id="chat-panel-close" class="chat-panel__close" type="button" aria-label="Close chat">×</button>
                </div>
                <div id="ask-log" class="ask__log" aria-live="polite"></div>
                <div id="ask-sugg" class="ask__sugg" aria-label="Suggested questions"></div>
                <div class="ask__input">
                    <span class="chev">›</span>
                    <input id="ask-input" type="text" placeholder="Ask about AI adoption, leadership, a specific project…" autocomplete="off" />
                    <button id="ask-send" type="button">Ask</button>
                </div>
            </div>
        </aside>
    `
    const fab = $('#chat-fab')
    const panel = $('#chat-panel')
    const closeBtn = $('#chat-panel-close')
    const input = $('#ask-input')
    const setOpen = (open) => {
        panel.classList.toggle('is-open', open)
        panel.setAttribute('aria-hidden', open ? 'false' : 'true')
        fab.setAttribute('aria-expanded', open ? 'true' : 'false')
        document.body.classList.toggle('chat-open', open)
        if (open) setTimeout(() => input?.focus(), 80)
    }
    fab.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')))
    closeBtn.addEventListener('click', () => setOpen(false))
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false)
    })
}

// ---------- snackbar ----------
function showSnackbar(message, { duration = 5000, variant } = {}) {
    const root = $('#snackbar-root')
    if (!root) return
    const classes = 'snackbar' + (variant ? ` snackbar--${variant}` : '')
    const children = []
    if (variant === 'of') {
        children.push(
            el('span', {
                class: 'snackbar__heart',
                'aria-hidden': 'true',
                html: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
            })
        )
    }
    children.push(el('span', { class: 'snackbar__msg' }, message))
    children.push(el('button', { class: 'snackbar__close', type: 'button', 'aria-label': 'Dismiss' }, '×'))
    const bar = el('div', { class: classes, role: 'status' }, ...children)
    const dismiss = () => {
        bar.classList.remove('is-visible')
        setTimeout(() => bar.remove(), 280)
    }
    bar.querySelector('.snackbar__close').addEventListener('click', dismiss)
    root.append(bar)
    requestAnimationFrame(() => bar.classList.add('is-visible'))
    setTimeout(dismiss, duration)
}

// ---------- confetti (birthday popper) ----------
function burstConfetti(anchor) {
    const rect =
        anchor && anchor.getBoundingClientRect
            ? anchor.getBoundingClientRect()
            : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 }
    const isMobile = window.innerWidth < 640
    const originX = rect.left + rect.width / 2
    const originY = isMobile
        ? Math.min(rect.top + rect.height / 2, window.innerHeight * 0.55)
        : rect.top + rect.height / 2
    const root = window.getComputedStyle(document.documentElement)
    const palette = [
        root.getPropertyValue('--color-mint').trim() || '#00b880',
        root.getPropertyValue('--color-peach').trim() || '#e85a2a',
        root.getPropertyValue('--color-lavender').trim() || '#7744cc',
        root.getPropertyValue('--color-gold').trim() || '#d4a010',
        root.getPropertyValue('--color-blue').trim() || '#3366dd'
    ]
    const count = isMobile ? 50 : 90
    const duration = 2400
    const pieces = []
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div')
        const isStreamer = Math.random() < 0.25
        piece.className = 'confetti-piece' + (isStreamer ? ' streamer' : '')
        piece.style.background = palette[i % palette.length]
        piece.style.left = `${originX}px`
        piece.style.top = `${originY}px`
        document.body.appendChild(piece)
        // initial burst: radial upward-biased angles
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1
        const speed = 380 + Math.random() * 460
        pieces.push({
            node: piece,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rot: Math.random() * 360,
            spin: (Math.random() - 0.5) * 720,
            drift: (Math.random() - 0.5) * 60
        })
    }
    const gravity = isMobile ? 600 : 900
    let last
    let startTs
    const tick = (ts) => {
        if (!startTs) {
            startTs = ts
            last = ts
        }
        const dt = Math.min(0.032, (ts - last) / 1000)
        last = ts
        const elapsed = (ts - startTs) / duration
        pieces.forEach((p) => {
            p.vy += gravity * dt
            p.vx += Math.sin((ts + p.drift) / 300) * 30 * dt
            const x = (parseFloat(p.node.style.left) || originX) + p.vx * dt
            const y = (parseFloat(p.node.style.top) || originY) + p.vy * dt
            p.node.style.left = `${x}px`
            p.node.style.top = `${y}px`
            p.rot += p.spin * dt
            p.node.style.transform = `rotate(${p.rot}deg)`
            p.node.style.opacity = String(Math.max(0, 1 - elapsed * 1.1))
        })
        if (elapsed < 1) {
            requestAnimationFrame(tick)
        } else {
            pieces.forEach((p) => p.node.remove())
        }
    }
    requestAnimationFrame(tick)
}

function setupOnlyFans() {
    const btn = document.getElementById('only-fans-btn')
    if (!btn) return
    btn.addEventListener('click', () => {
        burstConfetti(btn)
        showSnackbar('You are my only fan. Thank you for clicking.', { variant: 'of', duration: 4000 })
    })
}

// ---------- boot ----------
async function init() {
    let totalMediumPosts = 0
    let publicRepoCount = 0
    let adapted = null
    let rawResume = null
    try {
        rawResume = await loadResume()
        adapted = adaptResume(rawResume)
        CAREER = adapted.career
        CAREER_STAGE = adapted.careerStage || adapted.career
        SKILLS = adapted.skills
        LEADERSHIP = adapted.leadership
        CERTS = adapted.certs
        SUGGESTIONS = adapted.suggestions
        REPOS_STARRED = adapted.reposStarred || []
        REPOS_RECENT = adapted.reposRecent || []
        ARTICLES_PINNED = adapted.articlesPinned || []
        ARTICLES_RECENT = adapted.articlesRecent || []
        REPO_LIST = [
            ...REPOS_STARRED.map((r) => ({ ...r, __kind: 'Starred' })),
            ...REPOS_RECENT.map((r) => ({ ...r, __kind: 'Recent' }))
        ]
        ARTICLE_LIST = [
            ...ARTICLES_PINNED.map((a) => ({ ...a, __kind: 'Pinned' })),
            ...ARTICLES_RECENT.map((a) => ({ ...a, __kind: 'Latest' }))
        ]
        totalMediumPosts = adapted.totalMediumPosts
        publicRepoCount = adapted.publicRepoCount
    } catch (e) {
        console.warn('profile: resume.json load failed; rendering from prerender output only.', e)
    }

    // Data-driven renders: only run if we loaded resume.json. If it failed but
    // prerender already populated the DOM, leave the HTML in place.
    if (CAREER.length) renderCareer()
    if (SKILLS.length) renderSkills()
    if (LEADERSHIP.length) renderLeadership()
    if (REPOS_STARRED.length || REPOS_RECENT.length) renderRepoTerminals()
    if (ARTICLES_PINNED.length || ARTICLES_RECENT.length) renderScrolls()
    if (CERTS.length) renderCerts()

    setLiveCounts(totalMediumPosts, publicRepoCount)

    setupCareerModal()
    setupDetailModal()
    setupNavScroll()
    setupSmoothScroll()
    setupReveals()
    setupCountUps()
    setupExperienceTimer()
    setupLeadingTimer()
    setupTheme()
    setYear()
    setupChatFab()
    setupOnlyFans()

    // AI-powered chat + Cmd+K search (replaces the old stub makeChat)
    try {
        const nareshAI = await import('./naresh-ai.mjs')
        nareshAI.init({
            resumeData: { ...adapted, rawResume },
            chatRoot: {
                logEl: $('#ask-log'),
                inputEl: $('#ask-input'),
                sendEl: $('#ask-send'),
                suggEl: $('#ask-sugg')
            },
            handlers: {
                scrollTo: (id) => {
                    const target = $(id)
                    if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' })
                },
                openCareerModal,
                openDetailModal,
                showSnackbar
            },
            suggestions: SUGGESTIONS
        })
    } catch (e) {
        console.warn('profile: AI module failed to load, falling back to stub chat.', e)
        makeChat({
            logEl: $('#ask-log'),
            inputEl: $('#ask-input'),
            sendEl: $('#ask-send'),
            suggEl: $('#ask-sugg')
        })
    }

    // Signal depth.js + enhancements.js that dynamic DOM is ready.
    document.dispatchEvent(new CustomEvent('resume-loaded'))
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
