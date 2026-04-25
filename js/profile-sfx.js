;(() => {
    'use strict'

    const _reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const STORAGE_KEY = 'profile-sfx-mute'
    let muted = localStorage.getItem(STORAGE_KEY) === '1'
    let unlocked = false

    // ---- Web Audio API state ----

    let _ctx = null
    let _master = null
    let _sfxBus = null
    let _ambientBus = null

    // ---- Sound definitions ----

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
        reward: { src: 'sounds/achievements/Money Reward 2.mp3', pool: 1, vol: 0.3 },
        reveal: { src: 'sounds/reveal/reveal-1.mp3', pool: 2, vol: 0.1 }
    }

    // ---- Ambient soundscape definitions ----

    const AMBIENT = {
        hero: { src: 'sounds/rain/soundjay_rain-on-leaves_main-01.mp3', vol: 0.08 },
        'ai-chat': {
            src: 'sounds/magic/Environmental Loop Scifi Bright Glassy Wandering Tones Layered 02.mp3',
            vol: 0.06
        },
        about: { src: 'sounds/magic/Mountain Audio - Small Chimes - Loop.mp3', vol: 0.07 },
        career: { src: 'sounds/fire/Mountain Audio - Fire Burning in a Wood Stove 1.mp3', vol: 0.06 },
        skills: { src: 'sounds/vehicle/energy/Energy_-_force_field_8_loop.mp3', vol: 0.05 },
        leadership: { src: 'sounds/wind/13582-wind-in-forest-loop.mp3', vol: 0.07 },
        repos: { src: 'sounds/crickets/Crickets.mp3', vol: 0.06 },
        contact: { src: 'sounds/waves/lake-waves.mp3', vol: 0.08 }
    }

    // ---- Musical scales for diorama scroll ----

    const SCALES = {
        diorama: [523.25, 659.25, 783.99],
        'career-dio': [293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
        'lead-dio': [349.23, 392.0, 440.0, 493.88, 523.25, 587.33]
    }

    // ---- HTML5 Audio pool ----

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

    // ---- Web Audio synth layer ----

    function synth(freq, opts) {
        if (muted || !_ctx) return
        const {
            type = 'sine',
            duration = 0.08,
            attack = 0.005,
            decay = 0.03,
            sustain = 0.4,
            release = 0.04,
            volume = 0.15,
            detune = 0
        } = opts || {}
        const now = _ctx.currentTime
        const osc = _ctx.createOscillator()
        const env = _ctx.createGain()
        osc.type = type
        osc.frequency.value = freq
        osc.detune.value = detune
        env.gain.setValueAtTime(0, now)
        env.gain.linearRampToValueAtTime(volume, now + attack)
        env.gain.linearRampToValueAtTime(volume * sustain, now + attack + decay)
        env.gain.setValueAtTime(volume * sustain, now + duration - release)
        env.gain.linearRampToValueAtTime(0, now + duration)
        osc.connect(env)
        env.connect(_sfxBus)
        osc.start(now)
        osc.stop(now + duration + 0.01)
    }

    // ---- Ambient soundscape engine ----

    let _ambientCurrent = null
    const _ambientNodes = {}

    function setAmbient(key) {
        if (key === _ambientCurrent || !_ctx) return
        const FADE = 1.5

        if (_ambientCurrent && _ambientNodes[_ambientCurrent]) {
            const old = _ambientNodes[_ambientCurrent]
            const now = _ctx.currentTime
            old.gain.gain.cancelScheduledValues(now)
            old.gain.gain.setValueAtTime(old.gain.gain.value, now)
            old.gain.gain.linearRampToValueAtTime(0, now + FADE)
            const ref = old.audio
            setTimeout(() => ref.pause(), FADE * 1000 + 100)
        }

        _ambientCurrent = key
        if (!key) return

        const cfg = AMBIENT[key]
        if (!cfg) return

        if (!_ambientNodes[key]) {
            const audio = new Audio()
            audio.preload = 'auto'
            audio.src = cfg.src
            audio.loop = true
            const source = _ctx.createMediaElementSource(audio)
            const gain = _ctx.createGain()
            gain.gain.value = 0
            source.connect(gain)
            gain.connect(_ambientBus)
            _ambientNodes[key] = { audio, source, gain, vol: cfg.vol }
        }

        const node = _ambientNodes[key]
        const now = _ctx.currentTime
        node.audio.play().catch(() => {})
        node.gain.gain.cancelScheduledValues(now)
        node.gain.gain.setValueAtTime(0, now)
        node.gain.gain.linearRampToValueAtTime(node.vol, now + FADE)
    }

    // ---- Warmup & browser unlock ----

    function warmUp() {
        if (unlocked) return
        unlocked = true
        for (const p of Object.values(pools)) {
            for (const el of p.els) {
                el.volume = 0
                el.play().catch(() => {})
            }
        }
        _ctx = new (window.AudioContext || window.webkitAudioContext)()
        _master = _ctx.createGain()
        _master.gain.value = muted ? 0 : 1
        _master.connect(_ctx.destination)
        _sfxBus = _ctx.createGain()
        _sfxBus.gain.value = 0.5
        _sfxBus.connect(_master)
        _ambientBus = _ctx.createGain()
        _ambientBus.gain.value = 0.3
        _ambientBus.connect(_master)
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
            if (_master) {
                const now = _ctx.currentTime
                _master.gain.linearRampToValueAtTime(muted ? 0 : 1, now + 0.15)
            }
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

    // ---- Deferred observer helper ----

    function deferObserve(id, setup) {
        const el = document.getElementById(id)
        if (el) {
            setup(el)
            return
        }
        const body = new MutationObserver(() => {
            const el = document.getElementById(id)
            if (el) {
                body.disconnect()
                setup(el)
            }
        })
        body.observe(document.body, { childList: true, subtree: true })
    }

    // ---- Interaction wiring ----

    function wireIntroTyping() {
        if (_reduced) return
        deferObserve('intro-typed', (typed) => {
            let prevLen = typed.textContent.length
            const obs = new MutationObserver(() => {
                const len = typed.textContent.length
                if (len > prevLen) {
                    play('click', { rate: 0.9 + Math.random() * 0.2 })
                }
                prevLen = len
            })
            obs.observe(typed, { childList: true, characterData: true, subtree: true })
        })
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
        deferObserve('chat-panel', (panel) => {
            let wasOpen = panel.classList.contains('is-open')
            const obs = new MutationObserver(() => {
                const isOpen = panel.classList.contains('is-open')
                if (isOpen !== wasOpen) play('slide')
                wasOpen = isOpen
            })
            obs.observe(panel, { attributes: true, attributeFilter: ['class'] })
        })
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
                        const scale = SCALES[d.id]
                        if (scale) {
                            synth(scale[idx % scale.length], {
                                type: 'triangle',
                                duration: 0.25,
                                attack: 0.01,
                                decay: 0.08,
                                sustain: 0.3,
                                release: 0.15,
                                volume: 0.12
                            })
                        }
                    }
                }
            }
        }
        addEventListener('scroll', update, { passive: true })
    }

    // ---- NEW: Section scroll-reveal ----

    function wireSectionReveal() {
        if (_reduced) return
        const ids = ['ai-chat-section', 'about', 'career', 'skills', 'leadership', 'repos', 'writing']
        const lastReveal = {}
        const wasInView = {}
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    const id = e.target.id
                    if (e.isIntersecting && !wasInView[id]) {
                        const now = performance.now()
                        if (!lastReveal[id] || now - lastReveal[id] > 800) {
                            lastReveal[id] = now
                            play('reveal')
                        }
                    }
                    wasInView[id] = e.isIntersecting
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        )
        ids.forEach((id) => {
            const el = document.getElementById(id)
            if (el) io.observe(el)
        })
    }

    // ---- NEW: Search modal (Cmd+K) ----

    function wireSearch() {
        deferObserve('cmdk-overlay', (el) => {
            let wasOpen = el.classList.contains('open')
            const obs = new MutationObserver(() => {
                const isOpen = el.classList.contains('open')
                if (isOpen && !wasOpen) {
                    synth(523.25, { type: 'triangle', duration: 0.08, volume: 0.1 })
                    setTimeout(() => synth(659.25, { type: 'triangle', duration: 0.06, volume: 0.1 }), 40)
                }
                if (!isOpen && wasOpen) {
                    synth(659.25, { type: 'triangle', duration: 0.06, volume: 0.08 })
                    setTimeout(() => synth(523.25, { type: 'triangle', duration: 0.08, volume: 0.08 }), 40)
                }
                wasOpen = isOpen
            })
            obs.observe(el, { attributes: true, attributeFilter: ['class'] })
        })
    }

    // ---- NEW: Terminal boot typing ----

    function wireTerminalBoot() {
        if (_reduced) return
        let lastTick = 0
        let dingFired = false
        deferObserve('stack-term-body', (el) => {
            const obs = new MutationObserver(() => {
                const now = performance.now()
                if (now - lastTick > 30) {
                    lastTick = now
                    synth(200 + Math.random() * 100, {
                        type: 'square',
                        duration: 0.02,
                        volume: 0.05,
                        attack: 0.002,
                        decay: 0.005,
                        sustain: 0.3,
                        release: 0.01
                    })
                }
                if (!dingFired && el.querySelector('.term-caret')) {
                    dingFired = true
                    synth(1046.5, {
                        type: 'sine',
                        duration: 0.2,
                        attack: 0.01,
                        decay: 0.05,
                        sustain: 0.3,
                        release: 0.12,
                        volume: 0.15
                    })
                }
            })
            obs.observe(el, { childList: true, characterData: true, subtree: true })
        })
    }

    // ---- NEW: AI chat send/receive ----

    function wireChatMessages() {
        let lastChat = 0
        const observeLog = (log) => {
            const obs = new MutationObserver((mutations) => {
                const now = performance.now()
                if (now - lastChat < 200) return
                for (const m of mutations) {
                    for (const node of m.addedNodes) {
                        if (node.nodeType !== 1) continue
                        if (node.classList.contains('msg--u')) {
                            lastChat = now
                            synth(880, { type: 'sine', duration: 0.06, volume: 0.12 })
                            return
                        }
                        if (node.classList.contains('msg--a')) {
                            lastChat = now
                            synth(659.25, { type: 'sine', duration: 0.06, volume: 0.1 })
                            setTimeout(() => synth(523.25, { type: 'sine', duration: 0.08, volume: 0.1 }), 60)
                            return
                        }
                    }
                }
            })
            obs.observe(log, { childList: true })
        }
        deferObserve('ai-log', observeLog)
        deferObserve('ask-log', observeLog)
    }

    // ---- NEW: Card hover blip ----

    function wireCardHover() {
        if (_reduced) return
        const SEL = '.about-card, .lead-card, .write-card, .skill-cat, .cert, .contact-card, .book, .impact__cell'
        let lastHover = 0
        document.addEventListener(
            'mouseenter',
            (e) => {
                if (!e.target.closest(SEL)) return
                const now = performance.now()
                if (now - lastHover < 150) return
                lastHover = now
                synth(440 + Math.random() * 200, {
                    type: 'sine',
                    duration: 0.04,
                    volume: 0.04,
                    attack: 0.003,
                    decay: 0.01,
                    sustain: 0.3,
                    release: 0.02
                })
            },
            true
        )
    }

    // ---- NEW: Ambient soundscapes ----

    function wireAmbient() {
        if (_reduced) return
        const sections = [
            { sel: '#top', key: 'hero' },
            { sel: '#ai-chat-section', key: 'ai-chat' },
            { sel: '#about', key: 'about' },
            { sel: '#career', key: 'career' },
            { sel: '#skills', key: 'skills' },
            { sel: '#leadership', key: 'leadership' },
            { sel: '#repos', key: 'repos' },
            { sel: '#contact', key: 'contact' }
        ]
        const visible = {}
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    const s = sections.find((s) => document.querySelector(s.sel) === e.target)
                    if (s) visible[s.key] = e.intersectionRatio
                }
                let best = null
                let bestRatio = 0
                for (const [k, r] of Object.entries(visible)) {
                    if (r > bestRatio) {
                        bestRatio = r
                        best = k
                    }
                }
                if (bestRatio > 0.1) setAmbient(best)
                else setAmbient(null)
            },
            { threshold: [0, 0.1, 0.3, 0.5, 0.7] }
        )
        sections.forEach((s) => {
            const el = document.querySelector(s.sel)
            if (el) io.observe(el)
        })
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
        wireSectionReveal()
        wireSearch()
        wireTerminalBoot()
        wireChatMessages()
        wireCardHover()
        wireAmbient()
    })

    listenFirstGesture()
})()
