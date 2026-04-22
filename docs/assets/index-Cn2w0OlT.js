import "./modulepreload-polyfill-B5Qt9EMX.js";
import { g as n } from "./index-DDlvirwQ.js";
class u {
  constructor(t, s = {}) {
    this.game = t, this._options = s, this._ready = false, this._progress = 0, this._particles = [], this._rafId = null, this._msgIndex = 0, this._isMobile = window.innerWidth < 768, this._reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches, this._skipCinematic = false;
    try {
      sessionStorage.getItem("skip-world-loading") === "1" && (sessionStorage.removeItem("skip-world-loading"), this._skipCinematic = true);
    } catch {
    }
    if (window.__embed && (this._skipCinematic = true), this._skipCinematic) {
      this.container = document.createElement("div"), this.container.style.display = "none";
      return;
    }
    this._statusMessages = ["Shaping terrain...", "Planting forests...", "Painting the sky...", "Adding atmosphere...", "Final touches...", "World ready"], this.container = document.createElement("div"), this.container.id = "loading-screen", this.container.innerHTML = this._buildHTML(), document.body.appendChild(this.container), this._canvas = this.container.querySelector(".ls-particle-canvas"), this._ctx = this._canvas.getContext("2d"), this._greeting = this.container.querySelector(".ls-greeting"), this._titleLetters = this.container.querySelectorAll(".ls-title-letter"), this._roleTags = this.container.querySelectorAll(".ls-role-tag"), this._ringPath = this.container.querySelector(".ls-ring-fill"), this._pctText = this.container.querySelector(".ls-pct"), this._statusText = this.container.querySelector(".ls-status"), this._btn = this.container.querySelector(".ls-enter-btn"), this._skipBtn = this.container.querySelector(".ls-skip-btn"), this._grid = this.container.querySelector(".ls-grid"), this._accentLine = this.container.querySelector(".ls-accent-line"), this._orbs = this.container.querySelectorAll(".ls-orb"), this._ringGroup = this.container.querySelector(".ls-ring-group"), this._buttonsWrap = this.container.querySelector(".ls-buttons"), this._checkmark = this.container.querySelector(".ls-checkmark"), this._content = this.container.querySelector(".ls-content"), this._ringRadius = 54, this._ringCircumference = 2 * Math.PI * this._ringRadius, this._ringPath.style.strokeDasharray = this._ringCircumference, this._ringPath.style.strokeDashoffset = this._ringCircumference, this._btn.addEventListener("click", () => this._enter()), this._skipBtn.addEventListener("click", () => this._skipToProfile()), this._onResize = this._handleResize.bind(this), window.addEventListener("resize", this._onResize), this._addStyles(), this._initParticleCanvas(), this._reducedMotion ? this._showAllImmediate() : (this._setInitialStates(), this._buildEntranceTimeline()), this._startAmbientAnimations(), this._options.autoLoad !== false && this._simulateLoading();
  }
  _buildHTML() {
    var _a, _b, _c, _d;
    const t = ((_b = (_a = this.game.resumeData) == null ? void 0 : _a.personal) == null ? void 0 : _b.name) || "Naresh Sekar", s = ((_d = (_c = this.game.resumeData) == null ? void 0 : _c.personal) == null ? void 0 : _d.roleTags) || ["Engineering Manager", "AI", "Builder"], i = t.split("").map((e) => e === " " ? '<span class="ls-title-letter">&nbsp;</span>' : `<span class="ls-title-letter">${e}</span>`).join(""), r = s.map((e, o) => {
      const l = o < s.length - 1 ? '<span class="ls-role-dot">\xB7</span>' : "";
      return `<span class="ls-role-tag">${e}</span>${l}`;
    }).join(`
          `);
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
        <h1 class="ls-title">${i}</h1>
        <div class="ls-subtitle">
          ${r}
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
          <span class="ls-checkmark" style="display:none">\u2713</span>
        </div>

        <p class="ls-status">Shaping terrain...</p>

        <div class="ls-buttons">
          <button class="ls-enter-btn">
            <span class="ls-btn-text">Enter World</span>
            <span class="ls-btn-arrow">\u2192</span>
            <span class="ls-btn-shimmer"></span>
          </button>
          <button class="ls-skip-btn">Just the resume, please</button>
        </div>
      </div>
    `;
  }
  _addStyles() {
    const t = document.createElement("style");
    t.textContent = `
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
    `, document.head.appendChild(t), this._style = t;
  }
  _initParticleCanvas() {
    this._handleResize();
    const t = this._isMobile ? 35 : 70, s = ["rgba(0,255,170,", "rgba(170,119,255,", "rgba(100,180,255,", "rgba(255,200,100,", "rgba(255,170,150,"];
    for (let i = 0; i < t; i++) this._particles.push({ x: Math.random() * this._canvas.width, y: Math.random() * this._canvas.height, r: Math.random() * 2 + 1, color: s[Math.floor(Math.random() * s.length)], alpha: Math.random() * 0.5 + 0.2, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.2, phase: Math.random() * Math.PI * 2, freq: Math.random() * 5e-3 + 2e-3, exploding: false, exVx: 0, exVy: 0 });
    this._animateParticles();
  }
  _handleResize() {
    this._isMobile = window.innerWidth < 768, this._canvas && (this._canvas.width = window.innerWidth * devicePixelRatio, this._canvas.height = window.innerHeight * devicePixelRatio, this._ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0));
  }
  _animateParticles() {
    const t = window.innerWidth, s = window.innerHeight, i = this._ctx, r = !this._isMobile;
    i.clearRect(0, 0, t, s);
    for (const e of this._particles) {
      e.exploding ? (e.x += e.exVx, e.y += e.exVy, e.alpha *= 0.97) : (e.phase += e.freq, e.x += e.vx + Math.sin(e.phase) * 0.3, e.y += e.vy + Math.cos(e.phase * 0.7) * 0.2, e.x < -10 && (e.x = t + 10), e.x > t + 10 && (e.x = -10), e.y < -10 && (e.y = s + 10), e.y > s + 10 && (e.y = -10));
      const o = Math.max(e.alpha, 0);
      i.beginPath(), i.arc(e.x, e.y, e.r, 0, Math.PI * 2), i.fillStyle = e.color + o + ")", r && (i.shadowColor = e.color + o * 0.6 + ")", i.shadowBlur = e.r * 6), i.fill(), i.shadowBlur = 0;
    }
    this._rafId = requestAnimationFrame(() => this._animateParticles());
  }
  _setInitialStates() {
    n.set(this._canvas, { opacity: 0 }), n.set(this._greeting, { y: 15, opacity: 0 }), n.set(this._titleLetters, { y: 30, rotateX: -40, opacity: 0 }), n.set(this._roleTags, { scale: 0.8, opacity: 0 }), n.set(this.container.querySelectorAll(".ls-role-dot"), { opacity: 0 }), n.set(this._ringGroup, { scale: 0.7, opacity: 0 }), n.set(this._statusText, { opacity: 0 }), n.set(this._buttonsWrap, { opacity: 0, display: "none" });
  }
  _showAllImmediate() {
    n.set([this._greeting, ...this._titleLetters, ...this._roleTags], { opacity: 1 }), n.set(this.container.querySelectorAll(".ls-role-dot"), { opacity: 1 }), n.set(this._grid, { opacity: 0.3 }), n.set(this._orbs, { opacity: 1 }), n.set(this._accentLine, { width: 80 }), n.set(this._ringGroup, { opacity: 1 }), n.set(this._statusText, { opacity: 1 });
  }
  _buildEntranceTimeline() {
    const t = n.timeline();
    t.to(this._orbs, { opacity: 1, duration: 0.8, stagger: 0.1 }, 0), t.to(this._grid, { opacity: 0.3, duration: 0.8 }, 0.3), t.to(this._accentLine, { width: 80, duration: 0.6, ease: "power2.out" }, 0.4), t.to(this._canvas, { opacity: 1, duration: 0.8 }, 0.5), t.to(this._greeting, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.6), t.to(this._titleLetters, { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.04, ease: "back.out(1.7)" }, 0.9), t.to(this._roleTags, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: "power2.out" }, 1.6), t.to(this.container.querySelectorAll(".ls-role-dot"), { opacity: 1, duration: 0.3, stagger: 0.1 }, 1.7), t.to(this._ringGroup, { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, 1.9), t.to(this._statusText, { opacity: 1, duration: 0.4 }, 2), this._entranceTl = t;
  }
  _startAmbientAnimations() {
    this._reducedMotion || (this._orbTweens = [], this._orbs.forEach((t, s) => {
      const i = n.to(t, { x: `+=${30 + s * 10}`, y: `+=${20 + s * 8}`, duration: 6 + s * 2, ease: "sine.inOut", repeat: -1, yoyo: true });
      this._orbTweens.push(i);
    }), this._gradTween = n.to(this._titleLetters, { backgroundPosition: "200% 200%", duration: 4, ease: "none", repeat: -1 }));
  }
  _simulateLoading() {
    let t = 0;
    const s = setInterval(() => {
      const i = t < 0.3 ? 0.03 : t < 0.7 ? 0.015 : 0.025;
      t += i + Math.random() * 0.01, t >= 1 && (t = 1, clearInterval(s), this._showEnterButton()), this.setProgress(t);
    }, 50);
    this._interval = s;
  }
  setProgress(t) {
    this._progress = Math.min(t, 1);
    const s = Math.round(this._progress * 100), i = this._ringCircumference * (1 - this._progress);
    this._ringPath.style.strokeDashoffset = i, this._pctText.textContent = s;
    const r = Math.min(Math.floor(this._progress * (this._statusMessages.length - 1)), this._statusMessages.length - 1);
    r !== this._msgIndex && (this._msgIndex = r, this._transitionStatusMessage(this._statusMessages[r]));
  }
  _transitionStatusMessage(t) {
    if (this._reducedMotion) {
      this._statusText.textContent = t;
      return;
    }
    n.to(this._statusText, { opacity: 0, y: -6, duration: 0.2, onComplete: () => {
      this._statusText.textContent = t, n.fromTo(this._statusText, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25 });
    } });
  }
  _showEnterButton() {
    this._ready = true, n.to(this._pctText, { opacity: 0, scale: 0.5, duration: 0.3, onComplete: () => {
      this._pctText.style.display = "none", this._checkmark.style.display = "flex", n.fromTo(this._checkmark, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
    } }), n.to(this._ringPath, { stroke: "#00ffaa", duration: 0.5 }), this._transitionStatusMessage("World ready"), this._buttonsWrap.style.display = "flex", this._reducedMotion ? n.set(this._buttonsWrap, { opacity: 1 }) : n.fromTo(this._buttonsWrap, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" });
  }
  _enter() {
    if (this._exitRunning) return;
    if (this._exitRunning = true, this._reducedMotion) {
      n.to(this.container, { opacity: 0, duration: 0.5, onComplete: () => this._finalizeEnter() });
      return;
    }
    const t = n.timeline({ onComplete: () => this._finalizeEnter() });
    t.to(this._btn, { scale: 1.15, boxShadow: "0 0 50px rgba(0,255,170,0.7), 0 0 120px rgba(0,255,170,0.3)", duration: 0.3, ease: "power2.in" });
    const s = [this._greeting, this.container.querySelector(".ls-title"), this.container.querySelector(".ls-subtitle"), this._ringGroup, this._statusText, this._buttonsWrap];
    t.to(s, { y: -40, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.in" }, 0.2), t.call(() => this._explodeParticles(), null, 0.3), t.to(this._orbs, { scale: 3, opacity: 0, duration: 0.7, stagger: 0.05, ease: "power2.in" }, 0.3), t.to(this.container, { opacity: 0, duration: 0.4 }, 0.8);
  }
  _explodeParticles() {
    const t = window.innerWidth / 2, s = window.innerHeight / 2;
    for (const i of this._particles) {
      const r = i.x - t, e = i.y - s, o = Math.sqrt(r * r + e * e) || 1;
      i.exploding = true, i.exVx = r / o * (4 + Math.random() * 6), i.exVy = e / o * (4 + Math.random() * 6);
    }
  }
  _finalizeEnter() {
    if (this.container.remove(), this._style && this._style.remove(), this._options.onEnter) {
      this._options.onEnter();
      return;
    }
    this.game && this.game.canvas && this.game.canvas.focus();
  }
  enter() {
    this._enter();
  }
  _skipToProfile() {
    if (this._options.onSkip) {
      this._options.onSkip();
      return;
    }
    window.location.href = "/profile.html";
  }
  destroy() {
    var _a;
    if (this._skipCinematic) {
      (_a = this.container) == null ? void 0 : _a.remove();
      return;
    }
    this._interval && clearInterval(this._interval), this._rafId && cancelAnimationFrame(this._rafId), window.removeEventListener("resize", this._onResize), this._entranceTl && this._entranceTl.kill(), this._orbTweens && this._orbTweens.forEach((t) => t.kill()), this._gradTween && this._gradTween.kill(), n.killTweensOf(this._statusText), this.container.remove(), this._style.remove();
  }
}
const h = 2500, m = 700, f = 180, g = "/world.html", c = "/profile.html";
function _() {
  const a = new URLSearchParams(location.search).get("go");
  return a === "world" ? (location.assign(g), true) : a === "profile" ? (location.assign(c), true) : false;
}
function b() {
  const a = document.getElementById("boot-chooser");
  a && (a.classList.add("is-ready"), a.removeAttribute("aria-hidden"), y());
}
function d(a, t, s) {
  document.body.classList.add("is-entering"), s.classList.add("is-fading"), setTimeout(() => {
    location.assign(t);
  }, f);
}
function y() {
  const a = document.getElementById("boot-panel-world"), t = document.getElementById("boot-panel-profile"), s = () => d(a, g, t), i = () => d(t, c, a), r = (o) => (l) => {
    l.target instanceof HTMLElement && l.target.closest("a.boot-chooser__cta") && l.preventDefault(), o();
  };
  a.addEventListener("click", r(s)), t.addEventListener("click", r(i));
  const e = (o) => (l) => {
    (l.key === "Enter" || l.key === " ") && (l.preventDefault(), o());
  };
  a.addEventListener("keydown", e(s)), t.addEventListener("keydown", e(i));
}
function x() {
  return { resumeData: { personal: { name: "Naresh Sekar", roleTags: ["Engineering Manager", "AI Adoption", "Builder"] } }, canvas: null };
}
function w(a) {
  const t = performance.now();
  let s = false;
  const i = () => {
    if (s) return;
    const r = performance.now() - t, e = Math.min(1, r / h), o = 1 - Math.pow(1 - e, 3);
    if (a.setProgress(Math.min(0.99, o)), r >= h) {
      s = true, a.setProgress(1), setTimeout(() => a.enter(), m);
      return;
    }
    requestAnimationFrame(i);
  };
  requestAnimationFrame(i);
}
function p() {
  if (_()) return;
  const a = x(), t = new u(a, { autoLoad: false, onEnter: () => b(), onSkip: () => {
    location.assign(c);
  } });
  w(t);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", p) : p();
