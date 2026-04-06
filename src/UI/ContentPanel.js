import * as data from '../Data/portfolioData.js'

export default class ContentPanel {
    constructor(game) {
        this.game = game
        this.panel = document.getElementById('content-panel')
        this.inner = document.getElementById('content-panel-inner')
        this.closeBtn = document.getElementById('content-panel-close')
        this.isOpen = false
        this._currentContentKey = null
        this._careerIndex = 0
        this._typingTimer = null
        this._typingAborted = false

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close())
        }

        this._onKeyDown = (e) => {
            if (e.code === 'Escape' && this.isOpen) {
                this.close()
            }
            // Arrow key navigation for career terminal
            if (this.isOpen && this._currentContentKey === 'career') {
                if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
                    e.preventDefault()
                    this._navigateCareer(1)
                } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
                    e.preventDefault()
                    this._navigateCareer(-1)
                }
            }
        }
        window.addEventListener('keydown', this._onKeyDown)
    }

    open(contentKey) {
        if (!this.panel || !this.inner) return

        this._clearTyping()
        this._currentContentKey = contentKey

        if (contentKey === 'career') {
            this.panel.classList.add('terminal-mode')
            this._careerIndex = 0
            this._renderCareerScreen(0)
        } else {
            this.panel.classList.remove('terminal-mode')
            const html = this._renderContent(contentKey)
            if (!html) return
            this.inner.innerHTML = html
        }

        this.panel.classList.add('visible')
        this.panel.classList.remove('hidden')
        this.isOpen = true

        if (document.pointerLockElement) {
            document.exitPointerLock()
        }
    }

    close() {
        if (!this.panel) return
        this.panel.classList.remove('visible')
        this.panel.classList.add('hidden')
        this.panel.classList.remove('terminal-mode')
        this.isOpen = false
        this._clearTyping()
    }

    _clearTyping() {
        this._typingAborted = true
        if (this._typingTimer) {
            clearTimeout(this._typingTimer)
            this._typingTimer = null
        }
    }

    /* ───── Career Terminal ───── */

    _renderCareerScreen(index) {
        const positions = data.career.positions
        const p = positions[index]
        const total = positions.length

        // Build line data for typing animation
        const lines = []
        lines.push({ text: `$ cat experience_${total - index}.log`, type: 'command' })
        lines.push({ text: '', type: 'blank' })
        lines.push({ text: p.role, type: 'header' })
        lines.push({ text: `${p.company}  |  ${p.date}`, type: 'meta' })
        lines.push({ text: p.location, type: 'meta' })
        lines.push({ text: '\u2500'.repeat(42), type: 'divider' })

        for (const section of p.sections) {
            if (section.title) {
                lines.push({ text: '', type: 'blank' })
                lines.push({ text: `[ ${section.title} ]`, type: 'section' })
            }
            for (const point of section.points) {
                lines.push({ text: `> ${point}`, type: 'point' })
            }
        }

        this._currentLines = lines

        const html = `
      <div class="terminal-window">
        <div class="terminal-chrome">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">career.log &mdash; ${index + 1}/${total}</span>
        </div>
        <div class="terminal-body" id="career-terminal-body">
          ${lines.map((l, i) => `<div class="terminal-line ${l.type}" data-line="${i}"></div>`).join('\n')}
          <span class="terminal-cursor">\u2588</span>
          <span class="terminal-skip-hint">click to skip</span>
        </div>
        <div class="terminal-nav">
          ${index > 0 ? '<button class="terminal-nav-btn" id="career-prev">\u25C0 PREV</button>' : '<span></span>'}
          <span class="terminal-counter">${index + 1} / ${total}</span>
          ${index < total - 1 ? '<button class="terminal-nav-btn" id="career-next">NEXT \u25B6</button>' : '<span></span>'}
        </div>
      </div>
    `

        this.inner.innerHTML = html

        // Bind navigation
        const prevBtn = document.getElementById('career-prev')
        const nextBtn = document.getElementById('career-next')
        if (prevBtn) prevBtn.addEventListener('click', () => this._navigateCareer(-1))
        if (nextBtn) nextBtn.addEventListener('click', () => this._navigateCareer(1))

        // Bind click-to-skip on terminal body
        const body = document.getElementById('career-terminal-body')
        if (body) {
            body.addEventListener('click', () => this._skipTyping(), { once: true })
        }

        // Start typing
        this._startTyping(lines)
    }

    _navigateCareer(dir) {
        const newIndex = this._careerIndex + dir
        const total = data.career.positions.length
        if (newIndex < 0 || newIndex >= total) return

        this._clearTyping()
        this._careerIndex = newIndex
        this._renderCareerScreen(newIndex)
    }

    _startTyping(lines) {
        const lineEls = this.inner.querySelectorAll('.terminal-line')
        const cursor = this.inner.querySelector('.terminal-cursor')
        const body = document.getElementById('career-terminal-body')

        this._typingAborted = false
        let lineIdx = 0
        let charIdx = 0

        const typeNext = () => {
            if (this._typingAborted || lineIdx >= lines.length) {
                // Done - hide skip hint
                const hint = this.inner.querySelector('.terminal-skip-hint')
                if (hint) hint.classList.add('hidden')
                return
            }

            const lineData = lines[lineIdx]
            const el = lineEls[lineIdx]

            // Instant reveal for blanks and dividers
            if (lineData.type === 'blank' || lineData.type === 'divider') {
                el.textContent = lineData.text || '\u00A0'
                if (cursor && el.parentNode) el.after(cursor)
                lineIdx++
                charIdx = 0
                if (body) body.scrollTop = body.scrollHeight
                this._typingTimer = setTimeout(typeNext, 30)
                return
            }

            if (charIdx < lineData.text.length) {
                // Type characters - batch more for long point lines
                const speed =
                    lineData.type === 'command'
                        ? 28
                        : lineData.type === 'header'
                          ? 22
                          : lineData.type === 'section'
                            ? 18
                            : lineData.type === 'point'
                              ? 6
                              : 14
                const batch = lineData.type === 'point' ? 3 : 1
                const end = Math.min(charIdx + batch, lineData.text.length)

                el.textContent = lineData.text.slice(0, end)
                charIdx = end
                if (cursor && el.parentNode) el.after(cursor)
                if (body) body.scrollTop = body.scrollHeight
                this._typingTimer = setTimeout(typeNext, speed)
            } else {
                // Line done - pause before next
                lineIdx++
                charIdx = 0
                const pause = lineData.type === 'point' ? 60 : 40
                this._typingTimer = setTimeout(typeNext, pause)
            }
        }

        typeNext()
    }

    _skipTyping() {
        this._typingAborted = true
        if (this._typingTimer) {
            clearTimeout(this._typingTimer)
            this._typingTimer = null
        }

        const lines = this._currentLines
        if (!lines) return

        const lineEls = this.inner.querySelectorAll('.terminal-line')
        lines.forEach((l, i) => {
            if (!lineEls[i]) return
            lineEls[i].textContent = l.type === 'blank' ? '\u00A0' : l.text
        })

        const hint = this.inner.querySelector('.terminal-skip-hint')
        if (hint) hint.classList.add('hidden')
    }

    /* ───── Other sections (unchanged) ───── */

    _renderContent(key) {
        switch (key) {
            case 'hero':
                return this._renderHero()
            case 'about':
                return this._renderAbout()
            case 'skills':
                return this._renderSkills()
            case 'leadership':
                return this._renderLeadership()
            case 'publications':
                return this._renderPublications()
            case 'certifications':
                return this._renderCertifications()
            case 'contact':
                return this._renderContact()
            default:
                return null
        }
    }

    _renderHero() {
        return `
      <h2>${data.hero.greeting}</h2>
      <p>${data.hero.heading}</p>
      <img src="${data.hero.photo}" alt="Naresh Sekar" style="width:120px;height:120px;border-radius:50%;margin:16px 0;border:2px solid var(--color-mint);">
    `
    }

    _renderAbout() {
        return `
      <h2>${data.about.title}</h2>
      <p class="panel-subtitle">${data.about.subtitle}</p>
      <p>${data.about.mission}</p>
      ${data.about.cards
          .map(
              (c) => `
        <div class="panel-card">
          <h4>${c.title}</h4>
          <p>${c.description}</p>
        </div>
      `
          )
          .join('')}
    `
    }

    _renderSkills() {
        return `
      <h2>${data.skills.title}</h2>
      <p class="panel-subtitle">${data.skills.subtitle}</p>
      ${data.skills.categories
          .map(
              (c) => `
        <h3>${c.name}</h3>
        <div class="panel-tags">
          ${c.items.map((i) => `<span class="panel-tag">${i}</span>`).join('')}
        </div>
      `
          )
          .join('')}
    `
    }

    _renderLeadership() {
        return `
      <h2>${data.leadership.title}</h2>
      <p class="panel-subtitle">${data.leadership.subtitle}</p>
      ${data.leadership.cards
          .map(
              (c) => `
        <div class="panel-card">
          <h4>${c.title}</h4>
          <p>${c.description}</p>
        </div>
      `
          )
          .join('')}
    `
    }

    _renderPublications() {
        const b = data.publications.book
        return `
      <h2>${data.publications.title}</h2>
      <p class="panel-subtitle">${data.publications.subtitle}</p>
      <div class="panel-card">
        <h4>${b.title}</h4>
        <div class="card-meta">by ${b.author} · ${b.publisher}</div>
        <p>${b.description}</p>
        <a href="${b.amazonUrl}" target="_blank" rel="noopener" class="panel-link">View on Amazon</a>
        <a href="${b.mediumUrl}" target="_blank" rel="noopener" class="panel-link" style="margin-left:8px;background:transparent;color:var(--color-mint);box-shadow:inset 0 0 0 2px var(--color-mint);">Read on Medium</a>
      </div>
    `
    }

    _renderCertifications() {
        return `
      <h2>${data.certifications.title}</h2>
      <p class="panel-subtitle">${data.certifications.subtitle}</p>
      ${data.certifications.items
          .map(
              (c) => `
        <div class="panel-card">
          <h4>${c.name}</h4>
          <div class="card-meta">${c.issuer}</div>
        </div>
      `
          )
          .join('')}
      <h3>Education</h3>
      <div class="panel-card">
        <h4>${data.education.degree}</h4>
        <div class="card-meta">${data.education.school} · ${data.education.period}</div>
        <div class="card-meta">${data.education.location}</div>
      </div>
    `
    }

    _renderContact() {
        const c = data.contact
        return `
      <h2>${c.title}</h2>
      <p class="panel-subtitle">${c.subtitle}</p>
      <div class="panel-card" style="text-align:center;">
        <h4>Say hello.</h4>
        <p><a href="mailto:${c.email}">${c.email}</a></p>
        <div style="display:flex;gap:16px;justify-content:center;margin-top:12px;">
          <a href="${c.social.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${c.social.github}" target="_blank" rel="noopener">GitHub</a>
          <a href="${c.social.medium}" target="_blank" rel="noopener">Medium</a>
        </div>
        <div style="margin-top:12px;display:flex;gap:16px;justify-content:center;">
          <a href="${c.extras.npm}" target="_blank" rel="noopener">npm</a>
          <a href="${c.extras.pypi}" target="_blank" rel="noopener">PyPI</a>
          <a href="${c.extras.rubygems}" target="_blank" rel="noopener">RubyGems</a>
        </div>
      </div>
    `
    }

    destroy() {
        this._clearTyping()
        window.removeEventListener('keydown', this._onKeyDown)
    }
}
