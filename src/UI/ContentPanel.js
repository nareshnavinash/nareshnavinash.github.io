import * as data from '../Data/portfolioData.js'

export default class ContentPanel {
  constructor(game) {
    this.game = game
    this.panel = document.getElementById('content-panel')
    this.inner = document.getElementById('content-panel-inner')
    this.closeBtn = document.getElementById('content-panel-close')
    this.isOpen = false

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close())
    }

    // Close on Escape
    this._onKeyDown = (e) => {
      if (e.code === 'Escape' && this.isOpen) {
        this.close()
      }
    }
    window.addEventListener('keydown', this._onKeyDown)
  }

  open(contentKey) {
    if (!this.panel || !this.inner) return

    const html = this._renderContent(contentKey)
    if (!html) return

    this.inner.innerHTML = html
    this.panel.classList.add('visible')
    this.panel.classList.remove('hidden')
    this.isOpen = true

    // Exit pointer lock so user can interact with panel
    if (document.pointerLockElement) {
      document.exitPointerLock()
    }
  }

  close() {
    if (!this.panel) return
    this.panel.classList.remove('visible')
    this.panel.classList.add('hidden')
    this.isOpen = false
  }

  _renderContent(key) {
    switch (key) {
      case 'hero':
        return this._renderHero()
      case 'about':
        return this._renderAbout()
      case 'career':
        return this._renderCareer()
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

  _renderCareer() {
    return `
      <h2>${data.career.title}</h2>
      <p class="panel-subtitle">${data.career.subtitle}</p>
      ${data.career.positions
        .map(
          (p) => `
        <div class="panel-card">
          <h4>${p.role}</h4>
          <div class="card-meta">${p.company} · ${p.date}</div>
          <div class="card-meta">${p.location}</div>
          <p>${p.summary}</p>
          <ul>
            ${p.achievements.map((a) => `<li>${a}</li>`).join('')}
          </ul>
          <div class="panel-tags">
            ${p.tags.map((t) => `<span class="panel-tag">${t}</span>`).join('')}
          </div>
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
    window.removeEventListener('keydown', this._onKeyDown)
  }
}
