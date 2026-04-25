// profile-render.js - pure data adapter for the cinematic profile.
// Used by js/app.js (browser) and scripts/prerender-profile.js (Node/JSDOM).
// No DOM or browser-only APIs here - keep it unit-testable under vitest + jsdom.

export function formatMonthYear(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return String(iso)
    return d.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

export function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

function buildCareerDesc(role) {
    const sections = role.sections || []
    if (!sections.length) return escapeHtml(role.headline || '')
    return sections
        .map((s) => {
            const points = (s.points || []).map((p) => `<li>${escapeHtml(p)}</li>`).join('')
            return `<div class="career-modal__section"><h4>${escapeHtml(s.title)}</h4><ul>${points}</ul></div>`
        })
        .join('')
}

function buildCompanySummary(role) {
    if (role.headline) return role.headline
    const firstPoints = (role.sections || []).flatMap((s) => s.points || []).slice(0, 2)
    return firstPoints.join(' ')
}

export function adaptResume(resume) {
    const r = resume || {}

    const positions = r.career?.positions || []

    const career = positions.flatMap((pos) =>
        (pos.roles || []).map((role) => ({
            date: role.date || '',
            role: role.shortRole || role.role || '',
            co: pos.company || '',
            url: pos.url || '',
            teaser: role.headline || role.sections?.[0]?.points?.[0] || '',
            desc: buildCareerDesc(role)
        }))
    )

    const recentCount = Number(r.career?.recentCount) || 0
    const shouldTrim = recentCount > 0 && recentCount < career.length

    let careerStage = career
    if (shouldTrim) {
        const recent = career.slice(0, recentCount)
        const older = career.slice(recentCount)
        const tailCfg = r.career?.tailCard || {}
        const companies = [...new Set(older.map((x) => x.co).filter(Boolean))]
        const tail = {
            date: tailCfg.dateLabel || '',
            role: tailCfg.role || 'Before that',
            co: tailCfg.co || companies.join(' · '),
            url: '',
            teaser:
                tailCfg.teaser ||
                `${older.length} roles across ${companies.length} ${companies.length === 1 ? 'company' : 'companies'}`,
            isTail: true,
            targetIdx: recentCount
        }
        careerStage = [...recent, tail]
    }

    // Per-company cards for the "Before that" modal. One entry per unique
    // company in the positions list, newest → oldest, summarising the latest
    // role held there.
    const careerCompanies = positions
        .filter((pos) => pos.company && (pos.roles || []).length)
        .map((pos) => {
            const latest = pos.roles[0]
            return {
                company: pos.company,
                url: pos.url || '',
                role: latest.shortRole || latest.role || '',
                date: latest.date || '',
                summary: buildCompanySummary(latest),
                roleCount: pos.roles.length,
                location: latest.location || ''
            }
        })

    // Focus index when the tail "Before that" card opens the modal: the first
    // company whose roles are NOT all inside the recent-stage slice. Walks
    // careerCompanies (not positions) so it stays aligned with the modal list.
    let careerCompaniesInitialIdx = 0
    if (shouldTrim && careerCompanies.length) {
        let rolesSoFar = 0
        for (let i = 0; i < careerCompanies.length; i++) {
            rolesSoFar += careerCompanies[i].roleCount
            if (rolesSoFar > recentCount) {
                careerCompaniesInitialIdx = i
                break
            }
        }
    }

    const skills = (r.skills?.categories || []).map((c) => ({
        name: c.name,
        items: Array.isArray(c.items) ? c.items.slice() : []
    }))

    const leadership = (r.leadership?.cards || []).map((c) => ({
        t: c.title || '',
        d: c.description || ''
    }))

    const articles = [...(r.openSource?.pinnedArticles || []), ...(r.openSource?.recentArticles || [])]
    const seen = new Set()
    const uniqueArticles = articles
        .filter((a) => {
            if (!a || !a.url || seen.has(a.url)) return false
            seen.add(a.url)
            return true
        })
        .sort((a, b) => {
            const da = new Date(a.date).getTime() || 0
            const db = new Date(b.date).getTime() || 0
            return db - da
        })
    const articleCount = uniqueArticles.length
    const writing = uniqueArticles.slice(0, 8).map((a) => ({
        date: formatMonthYear(a.date),
        title: a.title || '',
        url: a.url,
        desc: (a.description || '').slice(0, 140),
        tags: Array.isArray(a.tags) ? a.tags.slice(0, 3) : []
    }))

    const articlesPinned = (r.openSource?.pinnedArticles || []).filter((a) => a && a.url).map(normaliseArticle)
    const pinnedUrlSet = new Set(articlesPinned.map((a) => a.url))
    const articlesRecent = (r.openSource?.recentArticles || [])
        .filter((a) => a && a.url && !pinnedUrlSet.has(a.url))
        .map(normaliseArticle)

    const repoSource = [...(r.openSource?.repos?.recent || []), ...(r.openSource?.repos?.starred || [])]
    const repoSeen = new Set()
    const uniqueRepos = repoSource.filter((x) => {
        if (!x || !x.name || repoSeen.has(x.name)) return false
        repoSeen.add(x.name)
        return true
    })
    const repoCount = uniqueRepos.length
    const repos = uniqueRepos.slice(0, 6).map((x) => {
        const tagsFromTopics = Array.isArray(x.topics) && x.topics.length ? x.topics.slice(0, 3) : null
        const tags = tagsFromTopics || (x.language ? [x.language] : [])
        return {
            name: x.name,
            tagline: x.tagline || '',
            desc: x.description || '',
            tags,
            url: x.url,
            demo: x.hasPages && x.homepage ? x.homepage : undefined
        }
    })

    const reposStarredRaw = (r.openSource?.repos?.starred || []).filter((x) => x && x.name)
    const starredSeen = new Set()
    const reposStarred = reposStarredRaw
        .filter((x) => {
            if (starredSeen.has(x.name)) return false
            starredSeen.add(x.name)
            return true
        })
        .map(normaliseRepo)
    const reposRecent = (r.openSource?.repos?.recent || [])
        .filter((x) => x && x.name && !starredSeen.has(x.name))
        .filter((x, i, arr) => arr.findIndex((y) => y.name === x.name) === i)
        .map(normaliseRepo)

    const totalMediumPosts = Number.isFinite(r.openSource?.totalMediumPosts)
        ? r.openSource.totalMediumPosts
        : articleCount
    const publicRepoCount = Number.isFinite(r.openSource?.publicRepoCount) ? r.openSource.publicRepoCount : repoCount

    const certs = (r.certifications?.items || []).map((c) => ({
        name: c.name,
        issuer: c.issuer
    }))

    const suggestions = r.site?.ask?.suggestions || [
        "What's your AI adoption philosophy?",
        'Tell me about your work at TestGorilla',
        'How do you scale engineering teams?',
        'What open-source tools have you shipped?'
    ]

    return {
        personal: r.personal || {},
        site: r.site || {},
        career,
        careerStage,
        careerCompanies,
        careerCompaniesInitialIdx,
        skills,
        leadership,
        writing,
        articleCount,
        articlesPinned,
        articlesRecent,
        repos,
        repoCount,
        reposStarred,
        reposRecent,
        totalMediumPosts,
        publicRepoCount,
        certs,
        suggestions
    }
}

function normaliseRepo(x) {
    const topics = Array.isArray(x.topics) ? x.topics.slice(0, 6) : []
    const tags = topics.length ? topics : x.language ? [x.language] : []
    return {
        name: x.name,
        tagline: x.tagline || '',
        desc: x.description || '',
        tags,
        language: x.language || '',
        url: x.url || '',
        demo: x.hasPages && x.homepage ? x.homepage : '',
        thumbnail: x.thumbnail || ''
    }
}

function normaliseArticle(a) {
    return {
        date: formatMonthYear(a.date),
        title: a.title || '',
        url: a.url,
        desc: (a.description || '').slice(0, 280),
        tags: Array.isArray(a.tags) ? a.tags.slice(0, 4) : [],
        thumbnail: a.thumbnail || ''
    }
}

// ---------- HTML render helpers (used by prerender step) ----------

export function renderCareerHtml(career) {
    return career
        .map((c, i) => {
            const iconNum = String(i + 1).padStart(2, '0')
            const coHtml = c.url
                ? `at <a href="${escapeHtml(c.url)}" target="_blank" rel="noreferrer">${escapeHtml(c.co)}</a>`
                : 'at ' + escapeHtml(c.co)
            const tailAttr = c.isTail ? ' data-tail="true"' : ''
            const ctaLabel = c.isTail ? 'Before that' : 'Show more'
            return `
        <div class="stage-card stage-card--career" data-idx="${i}"${tailAttr}>
          <div class="icon">${escapeHtml(iconNum)}</div>
          <div class="stage-card__date">${escapeHtml(c.date)}</div>
          <h3>${escapeHtml(c.role)}</h3>
          <div class="stage-card__co">${coHtml}</div>
          <p>${escapeHtml(c.teaser)}</p>
          <button type="button" class="stage-card__more" data-career-idx="${i}">${escapeHtml(ctaLabel)} <span class="arr">→</span></button>
        </div>`
        })
        .join('')
}

export function renderCareerProgressHtml(career) {
    return career.map((_, i) => `<span class="${i === 0 ? 'active' : ''}"></span>`).join('')
}

export function renderLeadershipHtml(leadership) {
    return leadership
        .map(
            (l, i) => `
      <div class="lead-stage-card">
        <div class="lead-stage-card__num">${String(i + 1).padStart(2, '0')}</div>
        <h3 class="lead-stage-card__title">${escapeHtml(l.t)}</h3>
        <p class="lead-stage-card__desc">${escapeHtml(l.d)}</p>
      </div>`
        )
        .join('')
}

export function renderLeadershipProgressHtml(leadership) {
    return leadership.map((_, i) => `<span class="${i === 0 ? 'active' : ''}"></span>`).join('')
}

export function renderReposHtml(repos) {
    return repos
        .map((r) => {
            const tags = r.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')
            const metaTag = r.tags[0] || 'repo'
            const demo = r.demo
                ? `<a class="repo-card__link" href="${escapeHtml(r.demo)}" target="_blank" rel="noreferrer">demo ↗</a>`
                : ''
            return `
        <div class="repo-card">
          <div class="repo-card__top">
            <div class="repo-card__meta">OSS · ${escapeHtml(metaTag)}</div>
            <h3 class="repo-card__title">${escapeHtml(r.name)}</h3>
            <div class="repo-card__tagline">${escapeHtml(r.tagline)}</div>
          </div>
          <div class="repo-card__body">
            <p class="repo-card__desc">${escapeHtml(r.desc)}</p>
            <div class="repo-card__tags">${tags}</div>
          </div>
          <div class="repo-card__footer">
            <a class="repo-card__link" href="${escapeHtml(r.url)}" target="_blank" rel="noreferrer">source ↗</a>
            ${demo}
          </div>
        </div>`
        })
        .join('')
}

export function renderWritingHtml(writing) {
    return writing
        .map((w, i) => {
            const tag = (w.tags[0] || '').toUpperCase()
            return `
        <a class="writing-row" href="${escapeHtml(w.url)}" target="_blank" rel="noreferrer" style="--stagger: ${i * 80}ms">
          <div class="writing-row__meta">
            <span class="writing-row__date">${escapeHtml(w.date)}</span>
            <span class="writing-row__sep">·</span>
            <span class="writing-row__tag">${escapeHtml(tag)}</span>
          </div>
          <h3 class="writing-row__title">${escapeHtml(w.title)}</h3>
          <p class="writing-row__desc">${escapeHtml(w.desc)}</p>
          <span class="writing-row__arr">↗</span>
        </a>`
        })
        .join('')
}

export function renderCertsHtml(certs) {
    const pill = (c) =>
        `<span class="cert-pill"><span class="cert-pill__name">${escapeHtml(c.name)}</span><span class="cert-pill__sep">·</span><span class="cert-pill__issuer">${escapeHtml(c.issuer)}</span></span><span class="cert-pill__bullet">◇</span>`
    // duplicate the list for seamless marquee loop
    return certs.map(pill).join('') + certs.map(pill).join('')
}

export function renderRepoTermRows(repos, kind) {
    return repos
        .map((r, i) => {
            const tag = r.tags[0] || r.language || 'repo'
            return (
                `<div class="repo-term__row" style="--stagger: ${i * 70}ms">` +
                `<span class="prompt">❯</span>` +
                `<span class="name">${escapeHtml(r.name)}</span>` +
                `<span class="tag">${escapeHtml(tag)}</span>` +
                `<button type="button" class="repo-term__more" data-kind="${escapeHtml(kind)}" data-idx="${i}">show more →</button>` +
                `</div>`
            )
        })
        .join('')
}

export function renderScrollRows(articles, kind) {
    return articles
        .map((a, i) => {
            const tag = (a.tags[0] || '').toUpperCase()
            return (
                `<li class="scroll__row" style="--stagger: ${i * 70}ms">` +
                `<div class="scroll__main">` +
                `<a class="scroll__title-link" href="${escapeHtml(a.url)}" target="_blank" rel="noreferrer">${escapeHtml(a.title)}</a>` +
                `<div class="scroll__meta">${escapeHtml(a.date)}${tag ? ' · ' + escapeHtml(tag) : ''}</div>` +
                `</div>` +
                `<button type="button" class="scroll__more" data-kind="${escapeHtml(kind)}" data-idx="${i}">show more →</button>` +
                `</li>`
            )
        })
        .join('')
}

export function renderSkillsTerminalLines(skills) {
    const lines = [
        { k: 'cmd', text: 'naresh@stack ~/skills % cat stack.toml' },
        { k: 'blank', text: '' },
        { k: 'title', text: '# 11+ years. Teams grown. One toolkit.' },
        { k: 'blank', text: '' }
    ]
    skills.forEach((cat) => {
        lines.push({ k: 'key', text: '[' + cat.name.toLowerCase().replace(/\s+/g, '_') + ']' })
        lines.push({ k: 'val', text: '  = ' + JSON.stringify(cat.items).replace(/,/g, ', ') })
        lines.push({ k: 'blank', text: '' })
    })
    lines.push({ k: 'cmd', text: 'naresh@stack ~/skills % _', cursor: true })
    return lines
}

export function renderSkillsTerminalHtml(skills) {
    return renderSkillsTerminalLines(skills)
        .map((l) => `<div class="term-line term-line--${l.k}">${escapeHtml(l.text)}</div>`)
        .join('')
}
