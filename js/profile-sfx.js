;(() => {
    'use strict'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const STORAGE_KEY = 'profile-sfx-mute'
    let muted = localStorage.getItem(STORAGE_KEY) === '1'
    let unlocked = false

    const SOUNDS = {
        click: { src: 'sounds/mecanism/click.mp3', pool: 3, vol: 0.25 },
        slideIn: { src: 'sounds/stoneSlides/stoneSlideIn.mp3', pool: 1, vol: 0.2 },
        slideOut: { src: 'sounds/stoneSlides/stoneSlideOut.mp3', pool: 1, vol: 0.2 },
        paperIn: { src: 'sounds/paper/PaperMovement_fNAyV_01-2.mp3', pool: 1, vol: 0.2 },
        paperOut: { src: 'sounds/paper/PaperMovement_fNAyV_01-3.mp3', pool: 1, vol: 0.2 },
        slide: { src: 'sounds/mecanism/slide.mp3', pool: 1, vol: 0.18 },
        swoosh: { src: 'sounds/swoosh/Swoosh 02.mp3', pool: 2, vol: 0.15 },
        metalClick: {
            src: 'sounds/clicks/Source Metal Clicks Delicate Light Sharp Clip Mid 07.mp3',
            pool: 1,
            vol: 0.2
        },
        reward: { src: 'sounds/achievements/Money Reward 2.mp3', pool: 1, vol: 0.3 }
    }

    // ---- Audio pool ----

    const pools = {}
    const lastPlay = {}

    function initPools() {
        for (const [name, cfg] of Object.entries(SOUNDS)) {
            const arr = []
            for (let i = 0; i < cfg.pool; i++) {
                const a = new Audio()
                a.preload = 'auto'
                a.src = cfg.src
                arr.push(a)
            }
            pools[name] = { els: arr, idx: 0, vol: cfg.vol }
            lastPlay[name] = 0
        }
    }

    function play(name, opts) {
        if (muted) return
        const p = pools[name]
        if (!p) return
        const now = performance.now()
        if (now - lastPlay[name] < 100) return
        lastPlay[name] = now

        const el = p.els[p.idx]
        p.idx = (p.idx + 1) % p.els.length
        el.currentTime = 0
        el.volume = opts && opts.volume != null ? opts.volume : p.vol
        if (opts && opts.rate) el.playbackRate = opts.rate
        else el.playbackRate = 1
        el.play().catch(() => {})
    }

    function warmUp() {
        if (unlocked) return
        unlocked = true
        for (const p of Object.values(pools)) {
            for (const el of p.els) {
                const v = el.volume
                el.volume = 0
                el.play()
                    .then(() => el.pause())
                    .catch(() => {})
                el.volume = v
            }
        }
    }

    // ---- Mute toggle UI ----

    const ICON_ON =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
    const ICON_OFF =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'

    function updateBtn(btn) {
        btn.innerHTML = muted ? ICON_OFF : ICON_ON
        btn.title = muted ? 'Turn on sound effects' : 'Turn off sound effects'
        btn.setAttribute('data-active', !muted)
    }

    function mountToggle() {
        const btn = document.getElementById('sound-btn')
        if (!btn) return
        updateBtn(btn)
        btn.addEventListener('click', () => {
            warmUp()
            muted = !muted
            localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
            updateBtn(btn)
        })
    }

    // ---- First-gesture unlock ----

    function listenFirstGesture() {
        const handler = () => {
            warmUp()
            document.removeEventListener('click', handler, true)
            document.removeEventListener('keydown', handler, true)
            document.removeEventListener('touchstart', handler, true)
        }
        document.addEventListener('click', handler, { capture: true, once: false })
        document.addEventListener('keydown', handler, { capture: true, once: false })
        document.addEventListener('touchstart', handler, { capture: true, once: false })
    }

    // ---- Interaction wiring ----

    function wireIntroTyping() {
        const tryObserve = () => {
            const typed = document.getElementById('intro-typed')
            if (!typed) return false
            let prevLen = typed.textContent.length
            const obs = new MutationObserver(() => {
                const len = typed.textContent.length
                if (len > prevLen) {
                    play('click', { rate: 0.9 + Math.random() * 0.2 })
                }
                prevLen = len
            })
            obs.observe(typed, { childList: true, characterData: true, subtree: true })
            return true
        }
        if (!tryObserve()) {
            const body = new MutationObserver(() => {
                if (tryObserve()) body.disconnect()
            })
            body.observe(document.body, { childList: true, subtree: true })
        }
    }

    function wireModals() {
        const observe = (id, openSound, closeSound) => {
            const el = document.getElementById(id)
            if (!el) return
            let wasOpen = el.classList.contains('open')
            const obs = new MutationObserver(() => {
                const isOpen = el.classList.contains('open')
                if (isOpen && !wasOpen) play(openSound)
                if (!isOpen && wasOpen) play(closeSound)
                wasOpen = isOpen
            })
            obs.observe(el, { attributes: true, attributeFilter: ['class'] })
        }
        observe('career-modal', 'slideIn', 'slideOut')
        observe('detail-modal', 'paperIn', 'paperOut')
    }

    function wireModalNav() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#career-modal-prev, #career-modal-next, #detail-modal-prev, #detail-modal-next')) {
                play('metalClick')
            }
        })
    }

    function wireThemeToggle() {
        const btn = document.getElementById('theme-btn')
        if (!btn) return
        btn.addEventListener('click', () => play('click', { rate: 0.8 }))
    }

    function wireChatFab() {
        const tryObserve = () => {
            const panel = document.getElementById('chat-panel')
            if (!panel) return false
            let wasOpen = panel.classList.contains('is-open')
            const obs = new MutationObserver(() => {
                const isOpen = panel.classList.contains('is-open')
                if (isOpen !== wasOpen) play('slide')
                wasOpen = isOpen
            })
            obs.observe(panel, { attributes: true, attributeFilter: ['class'] })
            return true
        }
        if (!tryObserve()) {
            const body = new MutationObserver(() => {
                if (tryObserve()) body.disconnect()
            })
            body.observe(document.body, { childList: true, subtree: true })
        }
    }

    function wireConfetti() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#only-fans-btn')) play('reward')
        })
    }

    function wireDioramas() {
        const dios = [
            { id: 'diorama', sel: '.stage-card' },
            { id: 'career-dio', sel: '.stage-card' },
            { id: 'lead-dio', sel: '.lead-stage-card' }
        ]
        const state = {}
        let lastSwoosh = 0

        const update = () => {
            for (const d of dios) {
                const el = document.getElementById(d.id)
                if (!el) continue
                const cards = el.querySelectorAll(d.sel)
                if (!cards.length) continue
                const r = el.getBoundingClientRect()
                const total = el.offsetHeight - innerHeight
                if (total <= 0) continue
                const p = Math.max(0, Math.min(1, -r.top / total))
                const step = p * cards.length
                const idx = Math.min(cards.length - 1, Math.floor(step))

                if (state[d.id] == null) {
                    state[d.id] = idx
                    continue
                }
                if (idx !== state[d.id]) {
                    state[d.id] = idx
                    const now = performance.now()
                    if (now - lastSwoosh > 300) {
                        lastSwoosh = now
                        play('swoosh')
                    }
                }
            }
        }
        addEventListener('scroll', update, { passive: true })
    }

    // ---- Init ----

    initPools()

    document.addEventListener('DOMContentLoaded', () => {
        mountToggle()
        wireIntroTyping()
        wireModals()
        wireModalNav()
        wireThemeToggle()
        wireChatFab()
        wireConfetti()
        wireDioramas()
    })

    listenFirstGesture()
})()
