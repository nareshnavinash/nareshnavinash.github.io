import LoadingScreen from './LoadingScreen.js'

const MIN_BOOT_MS = 2500
const READY_PAUSE_MS = 700
const FADE_MS = 180

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
    setTimeout(() => {
        location.assign(destination)
    }, FADE_MS)
}

function setupChooserInteractions() {
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

function buildStubGame() {
    return {
        resumeData: {
            personal: {
                name: 'Naresh Sekar',
                roleTags: ['Engineering Manager', 'AI Adoption', 'Builder']
            }
        },
        canvas: null
    }
}

function driveProgress(loadingScreen) {
    const start = performance.now()
    let triggered = false

    const loop = () => {
        if (triggered) return
        const elapsed = performance.now() - start
        const timeP = Math.min(1, elapsed / MIN_BOOT_MS)
        const eased = 1 - Math.pow(1 - timeP, 3)
        loadingScreen.setProgress(Math.min(0.99, eased))

        if (elapsed >= MIN_BOOT_MS) {
            triggered = true
            loadingScreen.setProgress(1)
            setTimeout(() => loadingScreen.enter(), READY_PAUSE_MS)
            return
        }
        requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
}

function boot() {
    if (bypassIfRequested()) return

    const stubGame = buildStubGame()
    const ls = new LoadingScreen(stubGame, {
        autoLoad: false,
        onEnter: () => revealChooser(),
        onSkip: () => {
            location.assign(PROFILE_URL)
        }
    })

    driveProgress(ls)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
} else {
    boot()
}
