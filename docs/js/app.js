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
let SKILLS = []
let LEADERSHIP = []
let WRITING = []
let CERTS = []
let REPOS = []
let SUGGESTIONS = []

async function loadResume() {
    const candidates = ['data/resume.json', '/data/resume.json', 'resume.json', '/resume.json', '../resume.json']
    for (const p of candidates) {
        try {
            const r = await fetch(p, { cache: 'no-cache' })
            if (r.ok) return await r.json()
        } catch (_) {
            /* try next */
        }
    }
    throw new Error('resume.json not found (tried: ' + candidates.join(', ') + ')')
}

// ---------- render sections ----------
function renderCareer() {
    const host = $('#career-list')
    if (!host) return
    host.innerHTML = ''
    CAREER.forEach((c, i) => {
        const byline = c.url
            ? el(
                  'div',
                  { class: 'career-item__co' },
                  'at ',
                  el('a', { href: c.url, target: '_blank', rel: 'noreferrer' }, c.co)
              )
            : el('div', { class: 'career-item__co' }, 'at ' + c.co)
        const card = el(
            'div',
            { class: 'career-item', 'data-idx': String(i) },
            el('div', { class: 'career-item__chapter' }, 'Chapter ' + String(i + 1).padStart(2, '0')),
            el('div', { class: 'career-item__date' }, c.date),
            el('h3', { class: 'career-item__role' }, c.role),
            byline,
            el('p', { class: 'career-item__teaser' }, c.teaser || ''),
            el(
                'button',
                {
                    type: 'button',
                    class: 'career-item__more',
                    onclick: () => openCareerModal(i),
                },
                'Show more ',
                el('span', { class: 'arr' }, '→')
            )
        )
        host.append(card)
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
        { k: 'blank', text: '' },
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

function renderRepos() {
    const host = $('#repos-grid')
    if (!host) return
    host.innerHTML = ''
    REPOS.forEach((r) => {
        const card = el(
            'div',
            { class: 'repo-card' },
            el(
                'div',
                { class: 'repo-card__top' },
                el('div', { class: 'repo-card__meta' }, 'OSS · ' + (r.tags[0] || 'repo')),
                el('h3', { class: 'repo-card__title' }, r.name),
                el('div', { class: 'repo-card__tagline' }, r.tagline)
            ),
            el(
                'div',
                { class: 'repo-card__body' },
                el('p', { class: 'repo-card__desc' }, r.desc),
                el(
                    'div',
                    { class: 'repo-card__tags' },
                    r.tags.map((t) => el('span', {}, t))
                )
            ),
            el(
                'div',
                { class: 'repo-card__footer' },
                el(
                    'a',
                    { class: 'repo-card__link', href: r.url, target: '_blank', rel: 'noreferrer' },
                    'source ↗'
                ),
                r.demo
                    ? el(
                          'a',
                          { class: 'repo-card__link', href: r.demo, target: '_blank', rel: 'noreferrer' },
                          'demo ↗'
                      )
                    : null
            )
        )
        host.append(card)
    })
}

function renderWriting() {
    const host = $('#writing-grid')
    if (!host) return
    host.innerHTML = ''
    WRITING.forEach((w, i) => {
        const row = el(
            'a',
            {
                class: 'writing-row',
                href: w.url,
                target: '_blank',
                rel: 'noreferrer',
                style: '--stagger: ' + i * 80 + 'ms',
            },
            el(
                'div',
                { class: 'writing-row__meta' },
                el('span', { class: 'writing-row__date' }, w.date),
                el('span', { class: 'writing-row__sep' }, '·'),
                el('span', { class: 'writing-row__tag' }, (w.tags[0] || '').toUpperCase())
            ),
            el('h3', { class: 'writing-row__title' }, w.title),
            el('p', { class: 'writing-row__desc' }, w.desc),
            el('span', { class: 'writing-row__arr' }, '↗')
        )
        host.append(row)
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
        { role: 'a', text: "Hi, ask me anything about Naresh's work, leadership, or projects. I'll answer from his resume." },
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

// ---------- experience timer ----------
const CAREER_START = new Date('2015-06-30T00:00:00Z').getTime()
function pad2(n) {
    return String(n).padStart(2, '0')
}
function setupExperienceTimer() {
    const yearsEl = $('#exp-years')
    const clockEl = $('#exp-clock')
    if (!yearsEl || !clockEl) return
    const tick = () => {
        const now = Date.now()
        const startDate = new Date(CAREER_START)
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
        const totalSec = Math.floor((now - CAREER_START) / 1000)
        const hrs = Math.floor(totalSec / 3600) % 24
        const min = Math.floor(totalSec / 60) % 60
        const sec = totalSec % 60
        yearsEl.textContent = `${years}y ${months}m ${days}d`
        clockEl.textContent = `${pad2(hrs)}:${pad2(min)}:${pad2(sec)}`
    }
    tick()
    setInterval(tick, 1000)
}

function setLiveCounts(articleCount, repoCount) {
    const medium = $('#medium-count')
    const gh = $('#repo-count')
    if (medium) medium.dataset.count = String(articleCount)
    if (gh) gh.dataset.count = String(repoCount)
}

// ---------- boot ----------
async function init() {
    let articleCount = 0
    let repoCount = 0
    try {
        const resume = await loadResume()
        const adapted = adaptResume(resume)
        CAREER = adapted.career
        SKILLS = adapted.skills
        LEADERSHIP = adapted.leadership
        WRITING = adapted.writing
        REPOS = adapted.repos
        CERTS = adapted.certs
        SUGGESTIONS = adapted.suggestions
        articleCount = adapted.articleCount
        repoCount = adapted.repoCount
    } catch (e) {
        console.warn('profile: resume.json load failed; rendering from prerender output only.', e)
    }

    // Data-driven renders: only run if we loaded resume.json. If it failed but
    // prerender already populated the DOM, leave the HTML in place.
    if (CAREER.length) renderCareer()
    if (SKILLS.length) renderSkills()
    if (LEADERSHIP.length) renderLeadership()
    if (REPOS.length) renderRepos()
    if (WRITING.length) renderWriting()
    if (CERTS.length) renderCerts()

    setLiveCounts(articleCount, repoCount)

    setupCareerModal()
    setupNavScroll()
    setupSmoothScroll()
    setupReveals()
    setupCountUps()
    setupExperienceTimer()
    setupTheme()
    setYear()

    makeChat({
        logEl: $('#ask-log'),
        inputEl: $('#ask-input'),
        sendEl: $('#ask-send'),
        suggEl: $('#ask-sugg'),
    })

    $('#scroll-btn')?.addEventListener('click', () => {
        const target = $('#about')
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' })
    })

    // Signal depth.js + enhancements.js that dynamic DOM is ready.
    document.dispatchEvent(new CustomEvent('resume-loaded'))
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
