export function chunkResume(adapted) {
    const docs = []

    // Personal / bio
    const personal = adapted.personal || {}
    const site = adapted.site || {}
    if (personal.name) {
        const bio = personal.mission || personal.bio || ''
        docs.push({
            id: 'bio',
            section: 'about',
            label: personal.name,
            text: `${personal.name} is an ${personal.title || 'Engineering Manager'}. ${bio}`
        })
    }

    // About cards (from raw resume data)
    const raw = adapted.rawResume || {}
    const aboutCards = raw.about?.cards || []
    aboutCards.forEach((card, i) => {
        docs.push({
            id: `about:${i}`,
            section: 'about',
            label: `About - ${card.title}`,
            text: `About - ${card.title}: ${card.description}`
        })
    })
    if (!aboutCards.length) {
        const aboutSub = site?.seo?.description || ''
        if (aboutSub) {
            docs.push({
                id: 'about:summary',
                section: 'about',
                label: 'About',
                text: `About Naresh Sekar: ${aboutSub}`
            })
        }
    }

    // Career roles
    const career = adapted.career || []
    career.forEach((role, i) => {
        if (role.isTail) return
        const plainDesc = stripHtml(role.desc || '')
        const text = `${personal.name || 'Naresh Sekar'} worked as ${role.role} at ${role.co} (${role.date}). ${plainDesc}`
        docs.push({
            id: `career:${i}`,
            section: 'career',
            label: `${role.role} at ${role.co}`,
            text,
            meta: { idx: i, co: role.co, role: role.role, date: role.date }
        })
    })

    // Skills
    const skills = adapted.skills || []
    skills.forEach((cat, i) => {
        docs.push({
            id: `skill:${i}`,
            section: 'skills',
            label: `Skills - ${cat.name}`,
            text: `Skills - ${cat.name}: ${cat.items.join(', ')}`
        })
    })

    // Leadership cards
    const leadership = adapted.leadership || []
    leadership.forEach((card, i) => {
        docs.push({
            id: `leadership:${i}`,
            section: 'leadership',
            label: `Leadership - ${card.t}`,
            text: `Leadership - ${card.t}: ${card.d}`
        })
    })

    // Repos (starred)
    const reposStarred = adapted.reposStarred || []
    reposStarred.forEach((r, i) => {
        const tags = r.tags?.join(', ') || ''
        docs.push({
            id: `repo:starred:${i}`,
            section: 'repos',
            label: r.name,
            text: `Open source repo: ${r.name} - ${r.tagline || r.desc}. Language: ${r.language || 'N/A'}. Tags: ${tags}`,
            meta: { kind: 'Starred', idx: i, name: r.name, url: r.url }
        })
    })

    // Repos (recent)
    const reposRecent = adapted.reposRecent || []
    reposRecent.forEach((r, i) => {
        const tags = r.tags?.join(', ') || ''
        docs.push({
            id: `repo:recent:${i}`,
            section: 'repos',
            label: r.name,
            text: `Recent project: ${r.name} - ${r.tagline || r.desc}. Language: ${r.language || 'N/A'}. Tags: ${tags}`,
            meta: { kind: 'Recent', idx: i, name: r.name, url: r.url }
        })
    })

    // Articles (pinned)
    const articlesPinned = adapted.articlesPinned || []
    articlesPinned.forEach((a, i) => {
        const tags = a.tags?.join(', ') || ''
        docs.push({
            id: `article:pinned:${i}`,
            section: 'writing',
            label: a.title,
            text: `Article: ${a.title} (${a.date}). ${a.desc} Tags: ${tags}`,
            meta: { kind: 'Pinned', idx: i, title: a.title, url: a.url }
        })
    })

    // Articles (recent)
    const articlesRecent = adapted.articlesRecent || []
    articlesRecent.forEach((a, i) => {
        const tags = a.tags?.join(', ') || ''
        docs.push({
            id: `article:recent:${i}`,
            section: 'writing',
            label: a.title,
            text: `Article: ${a.title} (${a.date}). ${a.desc} Tags: ${tags}`,
            meta: { kind: 'Recent', idx: i, title: a.title, url: a.url }
        })
    })

    // Certifications
    const certs = adapted.certs || []
    if (certs.length) {
        const certText = certs.map((c) => `${c.name} (${c.issuer})`).join(', ')
        docs.push({
            id: 'certs',
            section: 'certs',
            label: 'Certifications',
            text: `Certifications: ${certText}`
        })
    }

    // Education
    const edu = raw.education
    if (edu) {
        docs.push({
            id: 'education',
            section: 'education',
            label: 'Education',
            text: `Education: ${edu.degree || ''}, ${edu.school || ''}, ${edu.period || ''}, ${edu.location || ''}`
        })
    }

    // Publications / book
    const pub = raw.publications?.book
    if (pub) {
        docs.push({
            id: 'book',
            section: 'writing',
            label: pub.title,
            text: `Book: ${pub.title} by ${pub.author || 'Naresh Sekar'}. ${pub.description || ''} Published on ${pub.publisher || 'Amazon Kindle'}.`
        })
    }

    return docs
}

function stripHtml(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}
