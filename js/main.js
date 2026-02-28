/* ============================================
   PORTFOLIO - Naresh Sekar
   Pure JS · Zero Dependencies
   ============================================ */

// --- Theme toggle ---
var THEME_COLORS = { night: '#080818', day: '#e8e4f8' }
var THEME_STORAGE_KEY = 'profile-theme'

function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored) return stored
    return 'day'
}

function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem(THEME_STORAGE_KEY, mode)
    var metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) metaThemeColor.setAttribute('content', THEME_COLORS[mode] || THEME_COLORS.night)
    if (typeof window.setThreeTheme === 'function') window.setThreeTheme(mode)
}

function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'night'
    var next = current === 'night' ? 'day' : 'night'
    document.documentElement.classList.add('theme-transitioning')
    setTheme(next)
    setTimeout(function () {
        document.documentElement.classList.remove('theme-transitioning')
    }, 600)
}

// --- Navigation scroll effect ---
function handleNavScroll() {
    var nav = document.querySelector('.nav')
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50)
}

// --- Hamburger toggle ---
function toggleMenu() {
    var hamburger = document.querySelector('.hamburger')
    var mobileMenu = document.querySelector('.mobile-menu')
    if (!hamburger || !mobileMenu) return
    hamburger.classList.toggle('open')
    mobileMenu.classList.toggle('open')
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : ''
}

// --- Active section tracking ---
function updateActiveNav() {
    var nav = document.querySelector('.nav')
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]')
    var sections = document.querySelectorAll('section[id]')
    var marker = (nav ? nav.offsetHeight : 0) + 24
    var activeId = null

    sections.forEach(function (section) {
        var rect = section.getBoundingClientRect()
        if (rect.top <= marker && rect.bottom > marker) {
            activeId = section.getAttribute('id')
        }
    })

    navLinks.forEach(function (link) {
        link.classList.remove('active')
    })

    if (!activeId || activeId === 'hero') return

    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active')
        }
    })
}

// --- Back to top ---
function handleBackToTop() {
    var backToTop = document.querySelector('.back-to-top')
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 600)
}

// --- Scroll progress bar ---
function updateScrollProgress() {
    var scrollProgress = document.querySelector('.scroll-progress')
    if (!scrollProgress) return
    var scrollTop = window.scrollY
    var docHeight = document.documentElement.scrollHeight - window.innerHeight
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    scrollProgress.style.width = progress + '%'
}

// --- Scroll reveal (Intersection Observer) ---
function createRevealObserver() {
    return new IntersectionObserver(
        function (entries) {
            entries.forEach(
                function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')

                        if (entry.target.classList.contains('skill-category')) {
                            var pills = entry.target.querySelectorAll('.skill-item')
                            pills.forEach(function (pill, i) {
                                pill.style.transitionDelay = i * 0.06 + 's'
                            })
                        }

                        this.unobserve(entry.target)
                    }
                }.bind(this)
            )
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
}

function observeReveals(observer) {
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
        observer.observe(el)
    })
}

// --- Unified scroll handler ---
var ticking = false
function onScroll() {
    if (!ticking) {
        requestAnimationFrame(function () {
            handleNavScroll()
            updateActiveNav()
            handleBackToTop()
            updateScrollProgress()
            ticking = false
        })
        ticking = true
    }
}

// --- Init ---
function init() {
    ticking = false

    var revealObserver = createRevealObserver()

    // Theme toggles
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        btn.addEventListener('click', toggleTheme)
    })

    // OS preference change listener
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            setTheme(e.matches ? 'day' : 'night')
        }
    })

    // Cross-tab sync
    window.addEventListener('storage', function (e) {
        if (e.key === THEME_STORAGE_KEY && e.newValue) {
            setTheme(e.newValue)
        }
    })

    // Apply theme on load
    setTheme(getPreferredTheme())

    // Hamburger
    var hamburger = document.querySelector('.hamburger')
    var mobileMenu = document.querySelector('.mobile-menu')
    if (hamburger) hamburger.addEventListener('click', toggleMenu)

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (mobileMenu.classList.contains('open')) {
                    toggleMenu()
                }
            })
        })
    }

    // Scroll reveal
    observeReveals(revealObserver)

    // Back to top
    var backToTop = document.querySelector('.back-to-top')
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }

    // Scroll handler
    window.addEventListener('scroll', onScroll, { passive: true })

    // Init state
    handleNavScroll()
    handleBackToTop()

    // Resume loaded event
    document.addEventListener('resume-loaded', function () {
        observeReveals(revealObserver)
        onScroll()
    })

    // Close mobile menu on Escape
    document.addEventListener('keydown', function (e) {
        var mm = document.querySelector('.mobile-menu')
        if (e.key === 'Escape' && mm && mm.classList.contains('open')) {
            toggleMenu()
        }
    })
}

// Auto-init when loaded in a page context (not when imported in tests)
/* v8 ignore next 3 */
if (typeof document !== 'undefined' && document.querySelector('.nav')) {
    init()
}

// Export for testing
export {
    THEME_COLORS,
    THEME_STORAGE_KEY,
    getPreferredTheme,
    setTheme,
    toggleTheme,
    handleNavScroll,
    toggleMenu,
    updateActiveNav,
    handleBackToTop,
    updateScrollProgress,
    createRevealObserver,
    observeReveals,
    onScroll,
    init
}
