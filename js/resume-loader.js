/**
 * Populates profile.html from the centralized resume.json.
 * Runs before main.js so scroll observers bind to populated content.
 */

var RESUME_PATHS = [
    '/data/resume.json',
    '/resume.json',
    './data/resume.json',
    'resume.json',
    '/static/data/resume.json',
    'static/data/resume.json',
    '../data/resume.json'
]

function loadResume(paths, index) {
    if (index === undefined) index = 0
    if (index >= paths.length) {
        return Promise.reject(new Error('resume.json not found in known locations'))
    }

    return fetch(paths[index], { cache: 'no-store' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status)
            return res.json()
        })
        .catch(function () {
            return loadResume(paths, index + 1)
        })
}

function populate(r) {
    var site = r.site || {}
    var seo = site.seo || {}
    var nav = site.navigation || {}
    var hero = site.hero || {}
    var labels = site.labels || {}
    var contact = r.contact || {}
    var footer = site.footer || {}
    var contactConfig = site.contact || {}

    populateSeo(r, seo)
    populateNavigation(nav)
    populateHero(r, hero)

    // About
    setText('#about .section-title', r.about && r.about.title)
    setText('#about .section-subtitle', r.about && r.about.subtitle)
    setText('.about-mission', r.personal && r.personal.mission)

    var aboutCards = document.getElementById('about-cards')
    if (aboutCards && r.about && r.about.cards) {
        var aboutIcons = [
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        ]

        aboutCards.innerHTML = r.about.cards
            .map(function (card, i) {
                return (
                    '<div class="about-card reveal">' +
                    '<div class="about-card-icon">' +
                    (aboutIcons[i] || '') +
                    '</div>' +
                    '<h3>' +
                    esc(card.title) +
                    '</h3>' +
                    '<p>' +
                    esc(card.description) +
                    '</p>' +
                    '</div>'
                )
            })
            .join('')
    }

    // Career
    setText('#career .section-title', r.career && r.career.title)
    setText('#career .section-subtitle', r.career && r.career.subtitle)

    var detailsLabel = labels.viewDetails || 'View details'
    var careerGrid = document.getElementById('career-grid')
    if (careerGrid && r.career && r.career.positions) {
        var idx = 0
        careerGrid.innerHTML = r.career.positions
            .map(function (company) {
                return (company.roles || [])
                    .map(function (role) {
                        var detailId = 'detail-' + idx++
                        var roleSections = (role.sections || [])
                            .map(function (section) {
                                var titleHtml = section.title
                                    ? '<h4 class="timeline-section-title">' + esc(section.title) + '</h4>'
                                    : ''

                                var pointsHtml =
                                    '<ul class="timeline-achievements">' +
                                    (section.points || [])
                                        .map(function (point) {
                                            return '<li>' + esc(point) + '</li>'
                                        })
                                        .join('') +
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
            })
            .join('')

        bindTimelineDetails(careerGrid)
    }

    // Skills
    setText('#skills .section-title', r.skills && r.skills.title)
    setText('#skills .section-subtitle', r.skills && r.skills.subtitle)

    var skillsGrid = document.getElementById('skills-grid')
    if (skillsGrid && r.skills && r.skills.categories) {
        var skillIcons = [
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M8 6a4 4 0 018 0"/><path d="M5.2 11a8 8 0 0113.6 0"/><path d="M2 16a12 12 0 0120 0"/></svg>',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        ]

        skillsGrid.innerHTML = r.skills.categories
            .map(function (cat, i) {
                return (
                    '<div class="skill-category reveal">' +
                    '<h3>' +
                    (skillIcons[i] || '') +
                    ' ' +
                    esc(cat.name) +
                    '</h3>' +
                    (cat.items || [])
                        .map(function (item) {
                            return '<div class="skill-item"><span class="skill-name">' + esc(item) + '</span></div>'
                        })
                        .join('') +
                    '</div>'
                )
            })
            .join('')
    }

    // Leadership
    setText('#leadership .section-title', r.leadership && r.leadership.title)
    setText('#leadership .section-subtitle', r.leadership && r.leadership.subtitle)

    var leadershipGrid = document.getElementById('leadership-grid')
    if (leadershipGrid && r.leadership && r.leadership.cards) {
        var leaderIcons = [
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M8 6a4 4 0 018 0"/><path d="M5.2 11a8 8 0 0113.6 0"/></svg>',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
        ]

        leadershipGrid.innerHTML = r.leadership.cards
            .map(function (card, i) {
                return (
                    '<div class="leadership-card reveal">' +
                    '<div class="leadership-card-icon">' +
                    (leaderIcons[i] || '') +
                    '</div>' +
                    '<h3>' +
                    esc(card.title) +
                    '</h3>' +
                    '<p>' +
                    esc(card.description) +
                    '</p>' +
                    '</div>'
                )
            })
            .join('')
    }

    // Publications
    setText('#publications .section-title', r.publications && r.publications.title)
    setText('#publications .section-subtitle', r.publications && r.publications.subtitle)

    var pubContent = document.getElementById('pub-content')
    if (pubContent && r.publications && r.publications.book) {
        var book = r.publications.book
        var byline = formatTemplate(book.bylineTemplate || '', {
            author: book.author || '',
            publisher: book.publisher || ''
        })

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
            esc(labels.publicationsAmazonCta || '') +
            '</a>' +
            '<a href="' +
            esc(book.mediumUrl || '') +
            '" target="_blank" rel="noopener" class="btn-secondary">' +
            esc(labels.publicationsMediumCta || '') +
            '</a>' +
            '</div></div>'
    }

    // Certifications
    setText('#certifications .section-title', r.certifications && r.certifications.title)
    setText('#certifications .section-subtitle', r.certifications && r.certifications.subtitle)

    var certsGrid = document.getElementById('certs-grid')
    if (certsGrid && r.certifications && r.certifications.items) {
        certsGrid.innerHTML = r.certifications.items
            .map(function (cert) {
                return (
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
            })
            .join('')
    }

    // Education
    setText('#education-title', r.education && r.education.title)

    var eduCard = document.getElementById('edu-card')
    if (eduCard && r.education) {
        eduCard.innerHTML =
            '<div class="edu-degree">' +
            esc(r.education.degree) +
            '</div>' +
            '<div class="edu-school">' +
            esc(r.education.school) +
            '</div>' +
            '<div class="edu-meta">' +
            esc(r.education.period) +
            ' · ' +
            esc(r.education.location) +
            '</div>'
    }

    // Contact
    setText('#contact .section-title', contact.title)
    setText('#contact .section-subtitle', contact.subtitle)
    setText('#contact-intro', contact.intro)

    var contactEmail = document.getElementById('contact-email')
    if (contactEmail && r.personal) {
        contactEmail.href = 'mailto:' + (r.personal.email || '')
        contactEmail.textContent = r.personal.email || ''
    }

    var socialIcons = {
        linkedin:
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
        medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>'
    }

    var primarySocialKeys = contactConfig.primarySocialKeys || []
    var contactSocial = document.getElementById('contact-social')
    if (contactSocial && r.social) {
        contactSocial.innerHTML = primarySocialKeys
            .map(function (key) {
                var item = r.social[key]
                if (!item || !item.url) return ''
                var label = item.name || key
                return (
                    '<a href="' +
                    esc(item.url) +
                    '" target="_blank" rel="noopener" aria-label="' +
                    esc(label) +
                    '">' +
                    (socialIcons[key] || '') +
                    '</a>'
                )
            })
            .join('')
    }

    var extraSocialKeys = footer.extraSocialKeys || []
    var contactExtras = document.getElementById('contact-extras')
    if (contactExtras && r.social) {
        contactExtras.innerHTML = extraSocialKeys
            .map(function (key) {
                var item = r.social[key]
                if (!item || !item.url) return ''
                return (
                    '<a href="' + esc(item.url) + '" target="_blank" rel="noopener">' + esc(item.name || key) + '</a>'
                )
            })
            .join('')
    }

    // Footer
    setText('#footer-greeting', labels.footerGreeting)
    setText('#footer-tagline', labels.footerTagline)

    var footerCopy = document.querySelector('.footer-copy')
    if (footerCopy) {
        footerCopy.innerHTML = formatTemplate(labels.footerCopyrightTemplate || '', {
            year: String(new Date().getFullYear()),
            name: r.personal && r.personal.name ? r.personal.name : ''
        })
    }

    setAttr('#back-to-top', 'aria-label', labels.backToTopAriaLabel)

    triggerRevealObservers()
}

function populateSeo(r, seo) {
    var pageUrl = seo.ogUrl || seo.canonicalUrl || ''

    if (seo.title) {
        document.title = seo.title
        setText('#meta-title', seo.title)
        setAttr('#meta-twitter-title', 'content', seo.title)
        setAttr('#meta-og-title', 'content', seo.title)
    }

    setAttr('#meta-description', 'content', seo.description)
    setAttr('#meta-keywords', 'content', seo.keywords)
    setAttr('#meta-author', 'content', seo.author)
    setAttr('#meta-robots', 'content', seo.robots)
    setAttr('#meta-theme-color', 'content', seo.themeColor)
    setAttr('#meta-canonical', 'href', seo.canonicalUrl)

    setAttr('#meta-itemprop-name', 'content', seo.schemaProfileName)
    setAttr('#meta-itemprop-description', 'content', seo.description)
    setAttr('#meta-itemprop-image', 'content', seo.imageUrl)

    setAttr('#meta-twitter-card', 'content', seo.twitterCard)
    setAttr('#meta-twitter-description', 'content', seo.description)
    setAttr('#meta-twitter-image', 'content', seo.imageUrl)

    setAttr('#meta-og-type', 'content', seo.ogType)
    setAttr('#meta-og-site-name', 'content', seo.ogSiteName)
    setAttr('#meta-og-locale', 'content', seo.ogLocale)
    setAttr('#meta-og-description', 'content', seo.description)
    setAttr('#meta-og-url', 'content', pageUrl)
    setAttr('#meta-og-image', 'content', seo.imageUrl)

    var ogImageWidthEl = document.querySelector('meta[property="og:image:width"]')
    if (!ogImageWidthEl && seo.imageWidth) {
        var head = document.head
        var widthMeta = document.createElement('meta')
        widthMeta.setAttribute('property', 'og:image:width')
        widthMeta.setAttribute('content', seo.imageWidth)
        head.appendChild(widthMeta)

        var heightMeta = document.createElement('meta')
        heightMeta.setAttribute('property', 'og:image:height')
        heightMeta.setAttribute('content', seo.imageHeight || '')
        head.appendChild(heightMeta)

        var altMeta = document.createElement('meta')
        altMeta.setAttribute('property', 'og:image:alt')
        altMeta.setAttribute('content', seo.imageAlt || '')
        head.appendChild(altMeta)
    }

    var socialUrls = Object.keys(r.social || {})
        .map(function (key) {
            var social = r.social[key]
            return social && social.url ? social.url : null
        })
        .filter(Boolean)

    var personId = (pageUrl || '').replace(/\/$/, '') + '#naresh-sekar'
    var schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfilePage',
                name: seo.schemaProfileName || '',
                url: pageUrl,
                inLanguage: 'en-US',
                mainEntity: {
                    '@id': personId
                }
            },
            {
                '@type': 'Person',
                '@id': personId,
                name: r.personal && r.personal.name ? r.personal.name : '',
                jobTitle: seo.schemaJobTitle || (r.personal && r.personal.title ? r.personal.title : ''),
                url: pageUrl,
                sameAs: socialUrls,
                description: seo.schemaPersonDescription || (r.personal && r.personal.bio ? r.personal.bio : ''),
                knowsAbout: seo.schemaKnowsAbout || []
            }
        ]
    }

    setText('#meta-ldjson', JSON.stringify(schema, null, 2))
}

function populateNavigation(nav) {
    setAttr('#main-nav', 'aria-label', nav.mainAriaLabel)
    setAttr('#mobile-menu', 'aria-label', nav.mobileAriaLabel)

    setText('#nav-logo', nav.logoText)
    setAttr('#nav-logo', 'aria-label', nav.logoAriaLabel)
    setAttr('#nav-logo', 'href', nav.logoHref)

    setAttr('.hamburger', 'aria-label', nav.hamburgerAriaLabel)
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        if (nav.themeToggleAriaLabel) {
            btn.setAttribute('aria-label', nav.themeToggleAriaLabel)
        }
    })
    ;(nav.items || []).forEach(function (item) {
        var selector = '[data-nav-key="' + item.key + '"]'
        document.querySelectorAll(selector).forEach(function (link) {
            link.textContent = item.label || ''
            if (item.href) {
                link.setAttribute('href', item.href)
            }
        })
    })

    document.querySelectorAll('[data-nav-world]').forEach(function (link) {
        link.textContent = nav.worldLink && nav.worldLink.label ? nav.worldLink.label : ''
        if (nav.worldLink && nav.worldLink.href) {
            link.setAttribute('href', nav.worldLink.href)
        }
        if (nav.worldLink && nav.worldLink.ariaLabel) {
            link.setAttribute('aria-label', nav.worldLink.ariaLabel)
        }
    })
}

function populateHero(r, hero) {
    var photo = document.querySelector('.hero-photo')
    if (photo) {
        setAttr('.hero-photo', 'src', r.personal && r.personal.photo)
        photo.setAttribute('alt', r.personal && r.personal.name ? r.personal.name : 'Profile photo')
    }

    var firstName = r.personal && r.personal.firstName ? r.personal.firstName : ''
    setText('.hero-greeting', (hero.greetingPrefix || '') + firstName + (hero.greetingSuffix || ''))

    var heroHeading = document.querySelector('.hero-heading')
    if (heroHeading) {
        if (hero.headingHtml) {
            heroHeading.innerHTML = hero.headingHtml
        } else {
            heroHeading.textContent = r.personal && r.personal.tagline ? r.personal.tagline : ''
        }
    }
}

function triggerRevealObservers() {
    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                    if (entry.target.classList.contains('skill-category')) {
                        var pills = entry.target.querySelectorAll('.skill-item')
                        pills.forEach(function (pill, i) {
                            pill.style.transitionDelay = i * 0.06 + 's'
                        })
                    }
                    revealObserver.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
        revealObserver.observe(el)
    })
}

function bindTimelineDetails(scope) {
    scope.querySelectorAll('.timeline-expand-btn').forEach(function (btn) {
        if (btn.dataset.resumeBound === '1') return
        btn.dataset.resumeBound = '1'

        btn.addEventListener('click', function () {
            var card = btn.closest('.timeline-card-body') || btn.closest('.timeline-card')
            var details = card.querySelector('.timeline-details')
            var isExpanded = btn.getAttribute('aria-expanded') === 'true'
            btn.setAttribute('aria-expanded', !isExpanded)
            details.style.maxHeight = isExpanded ? '0' : details.scrollHeight + 'px'
        })
    })
}

function setText(selector, text) {
    if (text === undefined || text === null) return
    var el = document.querySelector(selector)
    if (el) el.textContent = text
}

function setAttr(selector, attr, value) {
    if (value === undefined || value === null || value === '') return
    var el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
}

function formatTemplate(template, values) {
    return String(template || '').replace(/\{(\w+)\}/g, function (match, key) {
        return values[key] !== undefined ? values[key] : ''
    })
}

function esc(str) {
    if (str === undefined || str === null) return ''
    var div = document.createElement('div')
    div.textContent = String(str)
    return div.innerHTML
}

// Auto-init: load and populate when running in a page context
function init() {
    loadResume(RESUME_PATHS)
        .then(function (resume) {
            populate(resume)
            document.dispatchEvent(new Event('resume-loaded'))
        })
        .catch(function (err) {
            console.error('Failed to load resume data:', err)
        })
}

// Only auto-init when loaded as a script in a page (not when imported in tests)
/* v8 ignore next 3 */
if (typeof document !== 'undefined' && document.getElementById('hero')) {
    init()
}

// Export for testing
export {
    RESUME_PATHS,
    loadResume,
    populate,
    populateSeo,
    populateNavigation,
    populateHero,
    triggerRevealObservers,
    bindTimelineDetails,
    setText,
    setAttr,
    formatTemplate,
    esc,
    init
}
