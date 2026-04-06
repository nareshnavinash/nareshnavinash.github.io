/**
 * Pre-renders profile.html with resume.json data at build time.
 * Ensures crawlers see full content even without JavaScript execution.
 * Runs after sync-profile copies files to static/.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const htmlPath = resolve(root, 'static/profile.html')
const jsonPath = resolve(root, 'static/data/resume.json')

const html = readFileSync(htmlPath, 'utf-8')
const resume = JSON.parse(readFileSync(jsonPath, 'utf-8'))

const dom = new JSDOM(html)
const document = dom.window.document

function esc(str) {
    if (!str) return ''
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function setText(selector, text) {
    var el = document.querySelector(selector)
    if (el && text) el.textContent = text
}

// Hero
var hero = resume.site?.hero || {}
var firstName = resume.personal?.firstName || ''

setText('.hero-name', resume.personal?.name || '')
setText('.hero-greeting', (hero.greetingPrefix || '') + firstName + (hero.greetingSuffix || ''))

var heroHeading = document.querySelector('.hero-heading')
if (heroHeading && hero.headingHtml) {
    heroHeading.innerHTML = hero.headingHtml
}

// About
setText('#about .section-title', resume.about?.title)
setText('#about .section-subtitle', resume.about?.subtitle)
setText('.about-mission', resume.personal?.mission)

var aboutCards = document.getElementById('about-cards')
if (aboutCards && resume.about?.cards) {
    aboutCards.innerHTML = resume.about.cards
        .map(
            (card) =>
                '<div class="about-card reveal">' +
                '<h3>' +
                esc(card.title) +
                '</h3>' +
                '<p>' +
                esc(card.description) +
                '</p>' +
                '</div>'
        )
        .join('')
}

// Career
setText('#career .section-title', resume.career?.title)
setText('#career .section-subtitle', resume.career?.subtitle)

var labels = resume.site?.labels || {}
var detailsLabel = labels.viewDetails || 'View details'
var careerGrid = document.getElementById('career-grid')
if (careerGrid && resume.career?.positions) {
    var idx = 0
    careerGrid.innerHTML = resume.career.positions
        .map((company) =>
            (company.roles || [])
                .map((role) => {
                    var detailId = 'detail-' + idx++
                    var roleSections = (role.sections || [])
                        .map((section) => {
                            var titleHtml = section.title
                                ? '<h4 class="timeline-section-title">' + esc(section.title) + '</h4>'
                                : ''
                            var pointsHtml =
                                '<ul class="timeline-achievements">' +
                                (section.points || []).map((point) => '<li>' + esc(point) + '</li>').join('') +
                                '</ul>'
                            return '<div class="timeline-section">' + titleHtml + pointsHtml + '</div>'
                        })
                        .join('')

                    return (
                        '<div class="timeline-item reveal">' +
                        '<div class="timeline-card"><div class="timeline-card-body">' +
                        '<div class="timeline-date">' +
                        esc(role.date) +
                        '</div>' +
                        '<div class="timeline-role">' +
                        esc(role.shortRole || role.role || '') +
                        '</div>' +
                        '<div class="timeline-company">' +
                        esc(company.company) +
                        '</div>' +
                        '<div class="timeline-location">' +
                        esc(role.location) +
                        '</div>' +
                        '<button class="timeline-expand-btn" aria-expanded="false" aria-controls="' +
                        detailId +
                        '">' +
                        '<span>' +
                        esc(detailsLabel) +
                        '</span>' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
                        '</button>' +
                        '<div class="timeline-details" id="' +
                        detailId +
                        '">' +
                        '<div class="timeline-details-inner">' +
                        roleSections +
                        '</div></div>' +
                        '</div></div></div>'
                    )
                })
                .join('')
        )
        .join('')
}

// Skills
setText('#skills .section-title', resume.skills?.title)
setText('#skills .section-subtitle', resume.skills?.subtitle)

var skillsGrid = document.getElementById('skills-grid')
if (skillsGrid && resume.skills?.categories) {
    skillsGrid.innerHTML = resume.skills.categories
        .map(
            (cat) =>
                '<div class="skill-category reveal">' +
                '<h3>' +
                esc(cat.name) +
                '</h3>' +
                (cat.items || [])
                    .map((item) => '<div class="skill-item"><span class="skill-name">' + esc(item) + '</span></div>')
                    .join('') +
                '</div>'
        )
        .join('')
}

// Leadership
setText('#leadership .section-title', resume.leadership?.title)
setText('#leadership .section-subtitle', resume.leadership?.subtitle)

var leadershipGrid = document.getElementById('leadership-grid')
if (leadershipGrid && resume.leadership?.cards) {
    leadershipGrid.innerHTML = resume.leadership.cards
        .map(
            (card) =>
                '<div class="leadership-card reveal">' +
                '<h3>' +
                esc(card.title) +
                '</h3>' +
                '<p>' +
                esc(card.description) +
                '</p>' +
                '</div>'
        )
        .join('')
}

// Publications
setText('#publications .section-title', resume.publications?.title)
setText('#publications .section-subtitle', resume.publications?.subtitle)

var pubContent = document.getElementById('pub-content')
if (pubContent && resume.publications?.book) {
    var book = resume.publications.book
    var byline = (book.bylineTemplate || '')
        .replace('{author}', book.author || '')
        .replace('{publisher}', book.publisher || '')

    pubContent.innerHTML =
        '<div class="book-card">' +
        '<div class="book-card-title">' +
        esc(book.title || '').replace(' ', '<br>') +
        '</div>' +
        '<div class="book-card-author">' +
        esc(book.author || '') +
        '</div>' +
        '</div>' +
        '<div class="pub-info">' +
        '<h3>' +
        esc(book.title || '') +
        '</h3>' +
        '<p class="pub-author">' +
        esc(byline) +
        '</p>' +
        '<p class="pub-desc">' +
        esc(book.description || '') +
        '</p>' +
        '<div class="pub-links">' +
        '<a href="' +
        esc(book.amazonUrl || '') +
        '" target="_blank" rel="noopener" class="btn-primary">' +
        esc(labels.publicationsAmazonCta || 'View on Amazon') +
        '</a>' +
        '<a href="' +
        esc(book.mediumUrl || '') +
        '" target="_blank" rel="noopener" class="btn-secondary">' +
        esc(labels.publicationsMediumCta || 'Read on Medium') +
        '</a>' +
        '</div></div>'
}

// Open Source
var starSvg =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'

function renderRepoCard(repo) {
    var starHtml = repo.stars ? '<span>' + starSvg + ' ' + esc(String(repo.stars)) + '</span>' : ''
    var langHtml = repo.language ? '<span>' + esc(repo.language) + '</span>' : ''
    var metaHtml = starHtml || langHtml ? '<div class="opensource-card-meta">' + langHtml + starHtml + '</div>' : ''
    var exploreHtml = repo.homepage
        ? '<a href="' + esc(repo.homepage) + '" target="_blank" rel="noopener" class="btn-demo">Explore</a>'
        : ''
    var linksHtml =
        '<div class="opensource-card-links">' +
        exploreHtml +
        '<a href="' +
        esc(repo.url) +
        '" target="_blank" rel="noopener" class="btn-source">Source</a>' +
        '</div>'
    return (
        '<div class="opensource-card reveal">' +
        '<h3><a href="' +
        esc(repo.url) +
        '" target="_blank" rel="noopener">' +
        esc(repo.name) +
        '</a></h3>' +
        '<p>' +
        esc(repo.description) +
        '</p>' +
        metaHtml +
        linksHtml +
        '</div>'
    )
}

var reposData = resume.openSource?.repos || {}
var recentRepos = reposData.recent || []
var starredRepos = reposData.starred || []

var recentGrid = document.getElementById('opensource-recent')
if (recentGrid && recentRepos.length > 0) {
    recentGrid.innerHTML = recentRepos.map((repo) => renderRepoCard(repo)).join('')
}

var starredGrid = document.getElementById('opensource-starred')
if (starredGrid && starredRepos.length > 0) {
    starredGrid.innerHTML = starredRepos.map((repo) => renderRepoCard(repo)).join('')
}

// Certifications
setText('#certifications .section-title', resume.certifications?.title)
setText('#certifications .section-subtitle', resume.certifications?.subtitle)

var certsGrid = document.getElementById('certs-grid')
if (certsGrid && resume.certifications?.items) {
    certsGrid.innerHTML = resume.certifications.items
        .map(
            (cert) =>
                '<div class="cert-card reveal">' +
                '<div class="cert-accent"></div>' +
                '<div class="cert-info">' +
                '<h3>' +
                esc(cert.name) +
                '</h3>' +
                '<p>' +
                esc(cert.issuer) +
                '</p>' +
                '</div></div>'
        )
        .join('')
}

// Education
setText('#education-title', resume.education?.title)

var eduCard = document.getElementById('edu-card')
if (eduCard && resume.education) {
    eduCard.innerHTML =
        '<div class="edu-degree">' +
        esc(resume.education.degree) +
        '</div>' +
        '<div class="edu-school">' +
        esc(resume.education.school) +
        '</div>' +
        '<div class="edu-meta">' +
        esc(resume.education.period) +
        ' &middot; ' +
        esc(resume.education.location) +
        '</div>'
}

// Contact
var contact = resume.contact || {}
setText('#contact .section-title', contact.title)
setText('#contact .section-subtitle', contact.subtitle)
setText('#contact-intro', contact.intro)

var contactEmail = document.getElementById('contact-email')
if (contactEmail && resume.personal?.email) {
    contactEmail.href = 'mailto:' + resume.personal.email
    contactEmail.textContent = resume.personal.email
}

// Footer
setText('#footer-greeting', labels.footerGreeting)
setText('#footer-tagline', labels.footerTagline)

var footerCopy = document.querySelector('.footer-copy')
if (footerCopy) {
    footerCopy.innerHTML = (labels.footerCopyrightTemplate || '')
        .replace('{year}', String(new Date().getFullYear()))
        .replace('{name}', resume.personal?.name || '')
}

// Write pre-rendered HTML
writeFileSync(htmlPath, dom.serialize(), 'utf-8')
console.log('Pre-rendered profile.html with resume.json data')
