const WORLD_URL = '/world.html'
const PROFILE_URL = '/profile.html'

function bypassIfRequested() {
    const go = new URLSearchParams(location.search).get('go')
    if (go === 'world') {
        location.assign(WORLD_URL)
        return true
    }
    if (go === 'profile') {
        location.assign(PROFILE_URL)
        return true
    }
    return false
}

function revealChooser() {
    const chooser = document.getElementById('boot-chooser')
    if (!chooser) return
    chooser.classList.add('is-ready')
    chooser.removeAttribute('aria-hidden')
    setupChooserInteractions()
}

function enterPanel(panel, destination, otherPanel) {
    document.body.classList.add('is-entering')
    otherPanel.classList.add('is-fading')

    if (destination === PROFILE_URL) {
        sessionStorage.setItem('seen-intro-v2', '1')
    }

    const overlay = document.createElement('div')
    Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '9999',
        background: '#080818',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
    })
    document.body.appendChild(overlay)
    requestAnimationFrame(() => {
        overlay.style.opacity = '1'
    })
    setTimeout(() => location.assign(destination), 320)
}

let chooserWired = false
function setupChooserInteractions() {
    if (chooserWired) return
    chooserWired = true
    const worldPanel = document.getElementById('boot-panel-world')
    const profilePanel = document.getElementById('boot-panel-profile')

    const activateWorld = () => enterPanel(worldPanel, WORLD_URL, profilePanel)
    const activateProfile = () => enterPanel(profilePanel, PROFILE_URL, worldPanel)

    const onClick = (activate) => (e) => {
        if (e.target instanceof HTMLElement && e.target.closest('a.boot-chooser__cta')) {
            e.preventDefault()
        }
        activate()
    }
    worldPanel.addEventListener('click', onClick(activateWorld))
    profilePanel.addEventListener('click', onClick(activateProfile))

    const onKey = (activate) => (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            activate()
        }
    }
    worldPanel.addEventListener('keydown', onKey(activateWorld))
    profilePanel.addEventListener('keydown', onKey(activateProfile))
}

// ---------- Typing splash ----------

function injectSplashStyles() {
    if (document.getElementById('boot-splash-styles')) return
    const style = document.createElement('style')
    style.id = 'boot-splash-styles'
    style.textContent = `
        .intro-splash {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: #0b0820;
            display: grid;
            place-items: center;
            color: #f0eafa;
            transition: opacity 0.7s ease, visibility 0.7s;
        }
        .intro-splash.gone {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
        .intro-content {
            text-align: center;
            max-width: 80ch;
            padding: 0 40px;
        }
        .intro-bar {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'VT323', monospace;
            font-size: 16px;
            letter-spacing: 0.08em;
            color: rgba(240, 234, 250, 0.6);
            margin-bottom: 32px;
        }
        .intro-bar::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #2fe0a9;
            box-shadow: 0 0 14px #2fe0a9;
            animation: boot-pulse 1.4s ease-in-out infinite;
        }
        .intro-name {
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-size: clamp(48px, 9vw, 120px);
            letter-spacing: -0.03em;
            line-height: 0.95;
            margin: 0 0 18px;
            min-height: 1.1em;
        }
        .intro-name .cursor-pipe {
            display: inline-block;
            width: 0.08em;
            height: 0.85em;
            background: #2fe0a9;
            margin-left: 0.04em;
            vertical-align: -0.08em;
            animation: boot-blink 0.9s steps(2) infinite;
        }
        .intro-tag {
            font-family: 'Caveat', cursive;
            font-size: clamp(22px, 3vw, 34px);
            color: #2fe0a9;
            margin: 0 0 40px;
            opacity: 0;
            transition: opacity 0.5s 0.4s ease;
        }
        .intro-tag.on { opacity: 1; }
        .intro-hint {
            font-family: 'VT323', monospace;
            font-size: 15px;
            color: rgba(240, 234, 250, 0.45);
            opacity: 0;
            transition: opacity 0.5s 0.8s ease;
        }
        .intro-hint.on { opacity: 1; }
        .intro-skip {
            position: absolute;
            bottom: 30px;
            right: 40px;
            background: transparent;
            border: 1px solid rgba(240, 234, 250, 0.2);
            color: rgba(240, 234, 250, 0.7);
            padding: 8px 16px;
            border-radius: 20px;
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .intro-skip:hover {
            border-color: #2fe0a9;
            color: #2fe0a9;
        }
        @keyframes boot-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
        }
        @keyframes boot-blink {
            50% { opacity: 0; }
        }
    `
    document.head.appendChild(style)
}

function mountBootSplash() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
        const splash = document.createElement('div')
        splash.className = 'intro-splash'
        splash.innerHTML = `
            <div class="intro-content">
                <div class="intro-bar">naresh.ai · booting</div>
                <h1 class="intro-name">Naresh Sekar</h1>
                <p class="intro-tag on">engineering manager · ai adoption</p>
            </div>
        `
        document.body.appendChild(splash)
        return new Promise((resolve) => {
            setTimeout(() => {
                splash.classList.add('gone')
                setTimeout(() => {
                    splash.remove()
                    resolve()
                }, 700)
            }, 1200)
        })
    }

    const NAME = 'Naresh Sekar'

    const splash = document.createElement('div')
    splash.className = 'intro-splash'
    splash.innerHTML = `
        <div class="intro-content">
            <div class="intro-bar">naresh.ai · booting</div>
            <h1 class="intro-name">
                <span class="typed" id="boot-typed"></span>
                <span class="cursor-pipe"></span>
            </h1>
            <p class="intro-tag" id="boot-tag">engineering manager · ai adoption</p>
            <p class="intro-hint" id="boot-hint">press any key or wait</p>
        </div>
        <button class="intro-skip" id="boot-skip">skip →</button>
    `
    document.body.appendChild(splash)

    return new Promise((resolve) => {
        const typed = document.getElementById('boot-typed')
        const tag = document.getElementById('boot-tag')
        const hint = document.getElementById('boot-hint')
        const skip = document.getElementById('boot-skip')
        let dismissed = false
        let i = 0

        const dismiss = () => {
            if (dismissed) return
            dismissed = true
            splash.classList.add('gone')
            sessionStorage.setItem('seen-intro-v2', '1')
            setTimeout(() => {
                splash.remove()
                resolve()
            }, 800)
        }

        const typeNext = () => {
            if (dismissed) return
            if (i <= NAME.length) {
                typed.textContent = NAME.slice(0, i)
                i++
                setTimeout(typeNext, 90)
            } else {
                tag.classList.add('on')
                setTimeout(() => hint.classList.add('on'), 400)
                setTimeout(dismiss, 1600)
            }
        }
        setTimeout(typeNext, 200)

        skip.addEventListener('click', dismiss)
        window.addEventListener(
            'keydown',
            (e) => {
                if (!e.target.matches('input,textarea')) dismiss()
            },
            { once: true }
        )
    })
}

// ---------- Boot ----------

function boot() {
    if (bypassIfRequested()) return
    injectSplashStyles()
    mountBootSplash().then(() => revealChooser())
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
} else {
    boot()
}

window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return

    document.querySelectorAll('body > div').forEach((div) => {
        if (div.style.zIndex === '9999' && div.style.position === 'fixed') {
            div.remove()
        }
    })

    document.body.classList.remove('is-entering')
    document.querySelectorAll('.boot-chooser__panel').forEach((p) => p.classList.remove('is-fading'))

    const chooser = document.getElementById('boot-chooser')
    if (chooser) {
        chooser.classList.remove('is-ready')
        chooser.setAttribute('aria-hidden', 'true')
    }

    const oldSplash = document.querySelector('.intro-splash')
    if (oldSplash) oldSplash.remove()

    sessionStorage.removeItem('seen-intro-v2')

    injectSplashStyles()
    mountBootSplash().then(() => revealChooser())
})
