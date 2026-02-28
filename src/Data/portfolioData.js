/**
 * All portfolio content loaded from the centralized resume.json.
 * No content lives in the 3D code — everything renders from here.
 */

const res = await fetch('/data/resume.json')
const r = await res.json()
const site = r.site || {}
const heroConfig = site.hero || {}

export const hero = {
    greeting: `${heroConfig.greetingPrefix || ''}${r.personal.firstName || ''}${heroConfig.greetingSuffix || ''}`,
    heading: r.personal.tagline,
    photo: r.personal.photo
}

export const about = {
    title: r.about.title,
    subtitle: r.about.subtitle,
    mission: r.personal.mission,
    cards: r.about.cards
}

export const career = {
    title: r.career.title,
    subtitle: r.career.subtitle,
    positions: r.career.positions.flatMap((company) =>
        company.roles.map((role) => ({
            date: role.date,
            role: role.role,
            company: company.company,
            location: role.location,
            sections: role.sections
        }))
    )
}

export const skills = {
    title: r.skills.title,
    subtitle: r.skills.subtitle,
    categories: r.skills.categories
}

export const leadership = {
    title: r.leadership.title,
    subtitle: r.leadership.subtitle,
    cards: r.leadership.cards
}

export const publications = {
    title: r.publications.title,
    subtitle: r.publications.subtitle,
    book: r.publications.book
}

export const certifications = {
    title: r.certifications.title,
    subtitle: r.certifications.subtitle,
    items: r.certifications.items
}

export const education = {
    degree: r.education.degree,
    school: r.education.school,
    period: r.education.period,
    location: r.education.location
}

export const contact = {
    title: r.contact.title,
    subtitle: r.contact.subtitle,
    email: r.personal.email,
    social: {
        linkedin: r.social.linkedin.url,
        github: r.social.github.url,
        medium: r.social.medium.url
    },
    extras: {
        npm: r.social.npm.url,
        pypi: r.social.pypi.url,
        rubygems: r.social.rubygems.url
    }
}
