import gsap from 'gsap'

/**
 * Cosmic Gateway loading screen — immersive cinematic intro
 * with particle canvas, ambient orbs, SVG progress ring,
 * choreographed GSAP entrance, and cinematic exit.
 */
export default class LoadingScreen {
  constructor(game) {
    this.game = game
    this._ready = false
    this._progress = 0
    this._particles = []
    this._rafId = null
    this._msgIndex = 0
    this._isMobile = window.innerWidth < 768
    this._reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    this._statusMessages = [
      'Shaping terrain...',
      'Planting forests...',
      'Painting the sky...',
      'Adding atmosphere...',
      'Final touches...',
      'World ready'
    ]

    // Build DOM
    this.container = document.createElement('div')
    this.container.id = 'loading-screen'
    this.container.innerHTML = this._buildHTML()
    document.body.appendChild(this.container)

    // Cache refs
    this._canvas = this.container.querySelector('.ls-particle-canvas')
    this._ctx = this._canvas.getContext('2d')
    this._greeting = this.container.querySelector('.ls-greeting')
    this._titleLetters = this.container.querySelectorAll('.ls-title-letter')
    this._roleTags = this.container.querySelectorAll('.ls-role-tag')
    this._ringPath = this.container.querySelector('.ls-ring-fill')
    this._pctText = this.container.querySelector('.ls-pct')
    this._statusText = this.container.querySelector('.ls-status')
    this._btn = this.container.querySelector('.ls-enter-btn')
    this._skipBtn = this.container.querySelector('.ls-skip-btn')
    this._grid = this.container.querySelector('.ls-grid')
    this._accentLine = this.container.querySelector('.ls-accent-line')
    this._orbs = this.container.querySelectorAll('.ls-orb')
    this._ringGroup = this.container.querySelector('.ls-ring-group')
    this._buttonsWrap = this.container.querySelector('.ls-buttons')
    this._checkmark = this.container.querySelector('.ls-checkmark')
    this._content = this.container.querySelector('.ls-content')

    // Ring math
    this._ringRadius = 54
    this._ringCircumference = 2 * Math.PI * this._ringRadius
    this._ringPath.style.strokeDasharray = this._ringCircumference
    this._ringPath.style.strokeDashoffset = this._ringCircumference

    // Events
    this._btn.addEventListener('click', () => this._enter())
    this._skipBtn.addEventListener('click', () => this._skipToProfile())
    this._onResize = this._handleResize.bind(this)
    window.addEventListener('resize', this._onResize)

    // Inject styles
    this._addStyles()

    // Init systems
    this._initParticleCanvas()

    if (this._reducedMotion) {
      // Show everything immediately
      this._showAllImmediate()
    } else {
      // Set initial hidden states for entrance
      this._setInitialStates()
      // Build + play entrance
      this._buildEntranceTimeline()
    }

    this._startAmbientAnimations()
    this._simulateLoading()
  }

  _buildHTML() {
    const name = this.game.resumeData?.personal?.name || 'Naresh Sekar'
    const roleTags = this.game.resumeData?.personal?.roleTags || ['Engineering Manager', 'AI', 'Builder']

    const nameLetters = name.split('').map(ch =>
      ch === ' '
        ? '<span class="ls-title-letter">&nbsp;</span>'
        : `<span class="ls-title-letter">${ch}</span>`
    ).join('')

    const roleTagsHTML = roleTags
      .map((tag, i) => {
        const dot = i < roleTags.length - 1 ? '<span class="ls-role-dot">·</span>' : ''
        return `<span class="ls-role-tag">${tag}</span>${dot}`
      })
      .join('\n          ')

    return `
      <!-- Background layers -->
      <div class="ls-bg"></div>
      <div class="ls-grid"></div>
      <canvas class="ls-particle-canvas"></canvas>

      <!-- Ambient orbs -->
      <div class="ls-orb ls-orb-1"></div>
      <div class="ls-orb ls-orb-2"></div>
      <div class="ls-orb ls-orb-3"></div>

      <!-- Content -->
      <div class="ls-content">
        <div class="ls-accent-line"></div>
        <p class="ls-greeting">Welcome to the world of</p>
        <h1 class="ls-title">${nameLetters}</h1>
        <div class="ls-subtitle">
          ${roleTagsHTML}
        </div>

        <!-- SVG Progress Ring -->
        <div class="ls-ring-group">
          <svg class="ls-ring" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="ls-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00ffaa"/>
                <stop offset="100%" stop-color="#aa77ff"/>
              </linearGradient>
            </defs>
            <circle class="ls-ring-bg" cx="60" cy="60" r="54"
              fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4"/>
            <circle class="ls-ring-fill" cx="60" cy="60" r="54"
              fill="none" stroke="url(#ls-ring-grad)" stroke-width="4"
              stroke-linecap="round" transform="rotate(-90 60 60)"/>
          </svg>
          <span class="ls-pct">0</span>
          <span class="ls-checkmark" style="display:none">✓</span>
        </div>

        <p class="ls-status">Shaping terrain...</p>

        <div class="ls-buttons">
          <button class="ls-enter-btn">
            <span class="ls-btn-text">Enter World</span>
            <span class="ls-btn-arrow">→</span>
            <span class="ls-btn-shimmer"></span>
          </button>
          <button class="ls-skip-btn">Just the resume, please</button>
        </div>
      </div>
    `
  }

  _addStyles() {
    const style = document.createElement('style')
    style.textContent = `
      #loading-screen {
        position: fixed;
        inset: 0;
        z-index: 10000;
        overflow: hidden;
        font-family: 'Poppins', sans-serif;
      }

      /* === Background layers === */
      .ls-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 80% 60% at 50% 50%, #0d1a2a 0%, #080818 100%),
          radial-gradient(ellipse 40% 40% at 30% 40%, rgba(0,255,170,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 70% 60%, rgba(170,119,255,0.04) 0%, transparent 70%);
        background-color: #080818;
      }

      .ls-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 60px 60px;
        -webkit-mask-image: radial-gradient(ellipse 50% 40% at 50% 80%, rgba(0,0,0,0.4) 0%, transparent 100%);
        mask-image: radial-gradient(ellipse 50% 40% at 50% 80%, rgba(0,0,0,0.4) 0%, transparent 100%);
        perspective: 400px;
        transform: rotateX(45deg);
        transform-origin: 50% 100%;
        opacity: 0;
      }

      .ls-particle-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      /* === Ambient orbs === */
      .ls-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        pointer-events: none;
        opacity: 0;
      }
      .ls-orb-1 {
        width: 400px; height: 400px;
        background: rgba(0,255,170,0.12);
        top: -10%; left: -5%;
      }
      .ls-orb-2 {
        width: 350px; height: 350px;
        background: rgba(170,119,255,0.10);
        bottom: -10%; right: -5%;
      }
      .ls-orb-3 {
        width: 300px; height: 300px;
        background: rgba(100,180,255,0.08);
        top: 50%; left: 60%;
        transform: translate(-50%, -50%);
      }

      /* === Content === */
      .ls-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
      }

      .ls-accent-line {
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ffaa, #aa77ff, transparent);
        margin-bottom: 1.5rem;
        border-radius: 1px;
      }

      .ls-greeting {
        font-family: 'Caveat', cursive;
        font-size: clamp(1.1rem, 3vw, 1.5rem);
        color: rgba(170,119,255,0.7);
        margin: 0 0 0.3rem;
        opacity: 0;
      }

      .ls-title {
        font-size: clamp(2rem, 7vw, 5rem);
        font-weight: 900;
        margin: 0 0 0.8rem;
        line-height: 1.1;
      }

      .ls-title-letter {
        display: inline-block;
        opacity: 0;
        background: linear-gradient(135deg, #00ffaa, #aa77ff, #64b4ff, #ffaa77);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .ls-subtitle {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin: 0 0 2.2rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .ls-role-tag {
        font-size: clamp(0.7rem, 1.8vw, 0.85rem);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(224,224,240,0.7);
        opacity: 0;
      }

      .ls-role-dot {
        color: #00ffaa;
        font-size: 1rem;
        opacity: 0;
      }

      /* === Progress ring === */
      .ls-ring-group {
        position: relative;
        width: 120px;
        height: 120px;
        margin-bottom: 1rem;
        opacity: 0;
      }

      .ls-ring {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 8px rgba(0,255,170,0.3));
      }

      .ls-ring-fill {
        transition: stroke-dashoffset 0.3s ease;
      }

      .ls-pct {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        color: rgba(224,224,240,0.9);
      }

      .ls-checkmark {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        color: #00ffaa;
      }

      /* === Status text === */
      .ls-status {
        font-size: 0.85rem;
        color: rgba(224,224,240,0.5);
        margin: 0 0 2rem;
        min-height: 1.3em;
        opacity: 0;
      }

      /* === Buttons === */
      .ls-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        opacity: 0;
      }

      .ls-enter-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #00ffaa;
        color: #080818;
        border: none;
        padding: 14px 36px;
        font-size: 1rem;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
        border-radius: 50px;
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 0 20px rgba(0,255,170,0.3), 0 0 60px rgba(0,255,170,0.1);
        animation: ls-glow-pulse 2s ease-in-out infinite;
      }

      .ls-enter-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(0,255,170,0.5), 0 0 80px rgba(0,255,170,0.2);
      }

      .ls-enter-btn:hover .ls-btn-arrow {
        transform: translateX(4px);
      }

      .ls-btn-arrow {
        transition: transform 0.3s ease;
        font-size: 1.1rem;
      }

      .ls-btn-shimmer {
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: ls-shimmer 3s ease-in-out infinite;
      }

      @keyframes ls-shimmer {
        0% { left: -100%; }
        50%, 100% { left: 100%; }
      }

      @keyframes ls-glow-pulse {
        0%, 100% { box-shadow: 0 0 20px rgba(0,255,170,0.3), 0 0 60px rgba(0,255,170,0.1); }
        50% { box-shadow: 0 0 30px rgba(0,255,170,0.45), 0 0 80px rgba(0,255,170,0.15); }
      }

      .ls-skip-btn {
        position: relative;
        background: transparent;
        border: none;
        color: rgba(170,119,255,0.5);
        padding: 8px 20px;
        font-size: 0.82rem;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: color 0.3s ease;
        letter-spacing: 0.02em;
      }

      .ls-skip-btn::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 50%; right: 50%;
        height: 1px;
        background: rgba(170,119,255,0.5);
        transition: left 0.3s ease, right 0.3s ease;
      }

      .ls-skip-btn:hover {
        color: rgba(170,119,255,0.9);
      }

      .ls-skip-btn:hover::after {
        left: 20px;
        right: 20px;
      }

      /* === Mobile === */
      @media (max-width: 767px) {
        .ls-grid { display: none; }
        .ls-orb { filter: blur(60px); }
        .ls-orb-1 { width: 250px; height: 250px; }
        .ls-orb-2 { width: 200px; height: 200px; }
        .ls-orb-3 { width: 180px; height: 180px; }

        .ls-subtitle {
          flex-direction: column;
          gap: 0.4rem;
        }
        .ls-role-dot { display: none; }
      }

      /* === Reduced motion === */
      @media (prefers-reduced-motion: reduce) {
        .ls-enter-btn { animation: none; }
        .ls-btn-shimmer { animation: none; display: none; }
        .ls-title-letter { opacity: 1 !important; }
        .ls-greeting, .ls-role-tag, .ls-role-dot,
        .ls-ring-group, .ls-status, .ls-buttons {
          opacity: 1 !important;
        }
        .ls-grid { opacity: 0.3 !important; }
        .ls-orb { opacity: 1 !important; }
        .ls-accent-line { width: 80px !important; }
      }
    `
    document.head.appendChild(style)
    this._style = style
  }

  // ── Particle system ──────────────────────────────────────

  _initParticleCanvas() {
    this._handleResize()
    const count = this._isMobile ? 35 : 70
    const colors = [
      'rgba(0,255,170,', 'rgba(170,119,255,', 'rgba(100,180,255,',
      'rgba(255,200,100,', 'rgba(255,170,150,'
    ]

    for (let i = 0; i < count; i++) {
      this._particles.push({
        x: Math.random() * this._canvas.width,
        y: Math.random() * this._canvas.height,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        freq: Math.random() * 0.005 + 0.002,
        // Exit explosion state
        exploding: false,
        exVx: 0,
        exVy: 0
      })
    }

    this._animateParticles()
  }

  _handleResize() {
    this._isMobile = window.innerWidth < 768
    if (this._canvas) {
      this._canvas.width = window.innerWidth * devicePixelRatio
      this._canvas.height = window.innerHeight * devicePixelRatio
      this._ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
  }

  _animateParticles() {
    const w = window.innerWidth
    const h = window.innerHeight
    const ctx = this._ctx
    const useGlow = !this._isMobile

    ctx.clearRect(0, 0, w, h)

    for (const p of this._particles) {
      if (p.exploding) {
        p.x += p.exVx
        p.y += p.exVy
        p.alpha *= 0.97
      } else {
        p.phase += p.freq
        p.x += p.vx + Math.sin(p.phase) * 0.3
        p.y += p.vy + Math.cos(p.phase * 0.7) * 0.2

        // Wrap around
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      const a = Math.max(p.alpha, 0)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.color + a + ')'

      if (useGlow) {
        ctx.shadowColor = p.color + (a * 0.6) + ')'
        ctx.shadowBlur = p.r * 6
      }

      ctx.fill()
      ctx.shadowBlur = 0
    }

    this._rafId = requestAnimationFrame(() => this._animateParticles())
  }

  // ── Entrance ──────────────────────────────────────────────

  _setInitialStates() {
    // Everything starts hidden; entrance timeline reveals them
    gsap.set(this._canvas, { opacity: 0 })
    gsap.set(this._greeting, { y: 15, opacity: 0 })
    gsap.set(this._titleLetters, { y: 30, rotateX: -40, opacity: 0 })
    gsap.set(this._roleTags, { scale: 0.8, opacity: 0 })
    gsap.set(this.container.querySelectorAll('.ls-role-dot'), { opacity: 0 })
    gsap.set(this._ringGroup, { scale: 0.7, opacity: 0 })
    gsap.set(this._statusText, { opacity: 0 })
    gsap.set(this._buttonsWrap, { opacity: 0, display: 'none' })
  }

  _showAllImmediate() {
    // Reduced motion: show everything instantly
    gsap.set([this._greeting, ...this._titleLetters, ...this._roleTags], { opacity: 1 })
    gsap.set(this.container.querySelectorAll('.ls-role-dot'), { opacity: 1 })
    gsap.set(this._grid, { opacity: 0.3 })
    gsap.set(this._orbs, { opacity: 1 })
    gsap.set(this._accentLine, { width: 80 })
    gsap.set(this._ringGroup, { opacity: 1 })
    gsap.set(this._statusText, { opacity: 1 })
  }

  _buildEntranceTimeline() {
    const tl = gsap.timeline()

    // 0.0s — Background gradient fades in (it's already visible, but orbs etc.)
    tl.to(this._orbs, { opacity: 1, duration: 0.8, stagger: 0.1 }, 0)

    // 0.3s — Grid appears
    tl.to(this._grid, { opacity: 0.3, duration: 0.8 }, 0.3)

    // 0.4s — Accent line draws from center
    tl.to(this._accentLine, { width: 80, duration: 0.6, ease: 'power2.out' }, 0.4)

    // 0.5s — Particles fade in
    tl.to(this._canvas, { opacity: 1, duration: 0.8 }, 0.5)

    // 0.6s — Greeting fades up
    tl.to(this._greeting, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.6)

    // 0.9s — Title letters cascade
    tl.to(this._titleLetters, {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.5, stagger: 0.04,
      ease: 'back.out(1.7)'
    }, 0.9)

    // 1.6s — Role tags
    tl.to(this._roleTags, {
      opacity: 1, scale: 1,
      duration: 0.4, stagger: 0.12,
      ease: 'power2.out'
    }, 1.6)

    // Also fade in role dots
    tl.to(this.container.querySelectorAll('.ls-role-dot'), {
      opacity: 1, duration: 0.3, stagger: 0.1
    }, 1.7)

    // 1.9s — Progress ring materializes
    tl.to(this._ringGroup, {
      opacity: 1, scale: 1,
      duration: 0.6, ease: 'elastic.out(1, 0.5)'
    }, 1.9)

    // 2.0s — Status text
    tl.to(this._statusText, { opacity: 1, duration: 0.4 }, 2.0)

    this._entranceTl = tl
  }

  // ── Ambient animations ────────────────────────────────────

  _startAmbientAnimations() {
    if (this._reducedMotion) return

    // Orb drift
    this._orbTweens = []
    this._orbs.forEach((orb, i) => {
      const tw = gsap.to(orb, {
        x: `+=${30 + i * 10}`, y: `+=${20 + i * 8}`,
        duration: 6 + i * 2, ease: 'sine.inOut',
        repeat: -1, yoyo: true
      })
      this._orbTweens.push(tw)
    })

    // Title gradient shift on each letter
    this._gradTween = gsap.to(this._titleLetters, {
      backgroundPosition: '200% 200%',
      duration: 4, ease: 'none', repeat: -1
    })
  }

  // ── Loading simulation ────────────────────────────────────

  _simulateLoading() {
    let progress = 0
    const interval = setInterval(() => {
      // Non-linear speed: starts fast, slows near middle, then finishes
      const speed = progress < 0.3 ? 0.03
        : progress < 0.7 ? 0.015
        : 0.025
      progress += speed + Math.random() * 0.01

      if (progress >= 1) {
        progress = 1
        clearInterval(interval)
        this._showEnterButton()
      }
      this.setProgress(progress)
    }, 50)
    this._interval = interval
  }

  setProgress(progress) {
    this._progress = Math.min(progress, 1)
    const pct = Math.round(this._progress * 100)

    // Update ring
    const offset = this._ringCircumference * (1 - this._progress)
    this._ringPath.style.strokeDashoffset = offset

    // Update percentage
    this._pctText.textContent = pct

    // Update status message
    const idx = Math.min(
      Math.floor(this._progress * (this._statusMessages.length - 1)),
      this._statusMessages.length - 1
    )
    if (idx !== this._msgIndex) {
      this._msgIndex = idx
      this._transitionStatusMessage(this._statusMessages[idx])
    }
  }

  _transitionStatusMessage(msg) {
    if (this._reducedMotion) {
      this._statusText.textContent = msg
      return
    }
    gsap.to(this._statusText, {
      opacity: 0, y: -6, duration: 0.2,
      onComplete: () => {
        this._statusText.textContent = msg
        gsap.fromTo(this._statusText,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.25 }
        )
      }
    })
  }

  // ── Complete state ────────────────────────────────────────

  _showEnterButton() {
    this._ready = true

    // Morph number to checkmark
    gsap.to(this._pctText, {
      opacity: 0, scale: 0.5, duration: 0.3,
      onComplete: () => {
        this._pctText.style.display = 'none'
        this._checkmark.style.display = 'flex'
        gsap.fromTo(this._checkmark,
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
        )
      }
    })

    // Turn ring mint
    gsap.to(this._ringPath, { stroke: '#00ffaa', duration: 0.5 })

    // Status text
    this._transitionStatusMessage('World ready')

    // Show buttons
    this._buttonsWrap.style.display = 'flex'
    if (this._reducedMotion) {
      gsap.set(this._buttonsWrap, { opacity: 1 })
    } else {
      gsap.fromTo(this._buttonsWrap,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      )
    }
  }

  // ── Enter world (cinematic exit) ──────────────────────────

  _enter() {
    if (this._exitRunning) return
    this._exitRunning = true

    if (this._reducedMotion) {
      // Simple fade
      gsap.to(this.container, {
        opacity: 0, duration: 0.5,
        onComplete: () => this._finalizeEnter()
      })
      return
    }

    const tl = gsap.timeline({
      onComplete: () => this._finalizeEnter()
    })

    // 1. Button charge up
    tl.to(this._btn, {
      scale: 1.15, boxShadow: '0 0 50px rgba(0,255,170,0.7), 0 0 120px rgba(0,255,170,0.3)',
      duration: 0.3, ease: 'power2.in'
    })

    // 2. Content scatters upward
    const contentEls = [
      this._greeting, this.container.querySelector('.ls-title'),
      this.container.querySelector('.ls-subtitle'),
      this._ringGroup, this._statusText, this._buttonsWrap
    ]
    tl.to(contentEls, {
      y: -40, opacity: 0,
      duration: 0.5, stagger: 0.05, ease: 'power2.in'
    }, 0.2)

    // 3. Particles explode
    tl.call(() => this._explodeParticles(), null, 0.3)

    // 4. Orbs flash-expand
    tl.to(this._orbs, {
      scale: 3, opacity: 0,
      duration: 0.7, stagger: 0.05, ease: 'power2.in'
    }, 0.3)

    // 5. Full container fade
    tl.to(this.container, { opacity: 0, duration: 0.4 }, 0.8)
  }

  _explodeParticles() {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2

    for (const p of this._particles) {
      const dx = p.x - cx
      const dy = p.y - cy
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      p.exploding = true
      p.exVx = (dx / dist) * (4 + Math.random() * 6)
      p.exVy = (dy / dist) * (4 + Math.random() * 6)
    }
  }

  _finalizeEnter() {
    this.container.remove()

    if (this.game.canvas) {
      this.game.canvas.focus()
    }
  }

  // ── Skip to profile ───────────────────────────────────────

  _skipToProfile() {
    window.location.href = '/profile.html'
  }

  // ── Cleanup ───────────────────────────────────────────────

  destroy() {
    if (this._interval) clearInterval(this._interval)
    if (this._rafId) cancelAnimationFrame(this._rafId)
    window.removeEventListener('resize', this._onResize)

    // Kill GSAP
    if (this._entranceTl) this._entranceTl.kill()
    if (this._orbTweens) this._orbTweens.forEach(tw => tw.kill())
    if (this._gradTween) this._gradTween.kill()
    gsap.killTweensOf(this._statusText)

    this.container.remove()
    this._style.remove()
  }
}
