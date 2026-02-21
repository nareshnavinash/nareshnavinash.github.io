const res = await fetch('/data/resume.json')
const resume = await res.json()

// Display-only metadata per company (3D world visual config)
const companyDisplay = {
    'TestGorilla': { titleSmall: ['Test', 'Gorilla'], images: ['tg-em-ai', 'tg-em-devex', 'tg-em-lead', 'tg-lead-sdet'] },
    'Hopin':       { titleSmall: ['Hopin'], images: ['hopin-1'] },
    'Vue.ai':      { titleSmall: ['Vue.ai'], images: ['vueai-1'] },
    'WeInvest':    { titleSmall: ['WeInvest'], images: ['weinvest-1'] },
    'Freshworks':  { titleSmall: ['Fresh', 'works'], images: ['freshworks-1'] },
    'Cognizant':   { titleSmall: ['Cogni', 'zant'], images: ['cognizant-1'] },
}

// Build company entries from career positions
const companyEntries = resume.career.positions.map(company => {
    const display = companyDisplay[company.company] || { titleSmall: [company.company], images: [] }
    const roles = company.roles

    // Build pages from all roles and their sections
    const pages = roles.flatMap(role =>
        role.sections.map(section => ({
            header: role.role,
            role: role.shortRole || role.role,
            subheader: `${company.company}  |  ${role.date}  |  ${role.location}`,
            section: section.title,
            points: section.points,
        }))
    )

    // Default role shown before page-level role swapping (latest role first)
    const roleAttrs = roles[0]?.shortRole || roles[0]?.role || ''

    return {
        title: company.company,
        titleSmall: display.titleSmall,
        url: company.url,
        attributes: { role: roleAttrs },
        distinctions: [],
        images: display.images,
        pages,
    }
})

// Open Source entry
const openSourceEntry = {
    title: 'Open Source',
    titleSmall: ['Open', 'Source'],
    url: resume.openSource.url,
    attributes: { role: resume.openSource.platforms.filter(p => p !== 'GitHub') },
    distinctions: [],
    images: ['oss-1'],
    pages: [
        {
            header: 'Open Source Contributor',
            role: 'Open Source Contributor',
            subheader: resume.openSource.platforms.join('  |  '),
            section: resume.openSource.section,
            points: resume.openSource.points,
        },
    ],
}

// Blog entry
const blogEntry = {
    title: 'Medium Blog',
    titleSmall: ['Medium', 'Blog'],
    url: resume.blog.url,
    attributes: { role: ['Writer', 'Author'] },
    distinctions: [],
    images: ['blog-1'],
    pages: [
        {
            header: 'Writer & Author',
            role: 'Writer & Author',
            subheader: `${resume.publications.book.publisher}  |  Medium`,
            section: resume.blog.section,
            points: resume.blog.points,
        },
    ],
}

export default [...companyEntries, openSourceEntry, blogEntry]
