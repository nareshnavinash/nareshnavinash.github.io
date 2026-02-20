/**
 * Populates profile.html from the centralized resume.json.
 * Runs before main.js so scroll observers bind to populated content.
 */
(function () {
  'use strict';

  fetch('/data/resume.json')
    .then(function (res) { return res.json(); })
    .then(function (r) {
      populate(r);
      document.dispatchEvent(new Event('resume-loaded'));
    })
    .catch(function (err) { console.error('Failed to load resume data:', err); });

  function populate(r) {
    // --- Hero ---
    setText('.hero-greeting', "Hey there, I'm " + r.personal.firstName + ' -');
    var heroHeading = document.querySelector('.hero-heading');
    if (heroHeading) {
      heroHeading.innerHTML = 'I build <span class="text-outline">teams</span> that ship quality software, powered by <span class="text-outline">AI.</span>';
    }

    // --- About ---
    setText('#about .section-title', r.about.title);
    setText('#about .section-subtitle', r.about.subtitle);
    setText('.about-mission', r.personal.mission);

    var aboutCards = document.getElementById('about-cards');
    if (aboutCards) {
      var aboutIcons = [
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      ];
      aboutCards.innerHTML = r.about.cards.map(function (card, i) {
        return '<div class="about-card reveal">' +
          '<div class="about-card-icon">' + (aboutIcons[i] || '') + '</div>' +
          '<h3>' + esc(card.title) + '</h3>' +
          '<p>' + esc(card.description) + '</p>' +
          '</div>';
      }).join('');
    }

    // --- Career ---
    setText('#career .section-title', r.career.title);
    setText('#career .section-subtitle', r.career.subtitle);

    var careerGrid = document.getElementById('career-grid');
    if (careerGrid) {
      var idx = 0;
      careerGrid.innerHTML = r.career.positions.map(function (company) {
        return company.roles.map(function (role) {
          var detailId = 'detail-' + (idx++);
          var points = role.sections.flatMap(function (s) { return s.points; });
          return '<div class="timeline-item reveal">' +
            '<div class="timeline-card"><div class="timeline-card-body">' +
            '<div class="timeline-date">' + esc(role.date) + '</div>' +
            '<div class="timeline-role">' + esc(role.shortRole) + '</div>' +
            '<div class="timeline-company">' + esc(company.company) + '</div>' +
            '<div class="timeline-location">' + esc(role.location) + '</div>' +
            '<button class="timeline-expand-btn" aria-expanded="false" aria-controls="' + detailId + '">' +
            '<span>View details</span>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
            '</button>' +
            '<div class="timeline-details" id="' + detailId + '">' +
            '<div class="timeline-details-inner">' +
            '<ul class="timeline-achievements">' +
            points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
            '</ul></div></div>' +
            '</div></div></div>';
        }).join('');
      }).join('');

      // Re-bind expand/collapse after dynamic rendering
      careerGrid.querySelectorAll('.timeline-expand-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var card = btn.closest('.timeline-card-body') || btn.closest('.timeline-card');
          var details = card.querySelector('.timeline-details');
          var isExpanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !isExpanded);
          if (isExpanded) {
            details.style.maxHeight = '0';
          } else {
            details.style.maxHeight = details.scrollHeight + 'px';
          }
        });
      });
    }

    // --- Skills ---
    setText('#skills .section-title', r.skills.title);
    setText('#skills .section-subtitle', r.skills.subtitle);

    var skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      var skillIcons = [
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M8 6a4 4 0 018 0"/><path d="M5.2 11a8 8 0 0113.6 0"/><path d="M2 16a12 12 0 0120 0"/></svg>',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      ];
      skillsGrid.innerHTML = r.skills.categories.map(function (cat, i) {
        return '<div class="skill-category reveal">' +
          '<h3>' + (skillIcons[i] || '') + ' ' + esc(cat.name) + '</h3>' +
          cat.items.map(function (item) {
            return '<div class="skill-item"><span class="skill-name">' + esc(item) + '</span></div>';
          }).join('') +
          '</div>';
      }).join('');
    }

    // --- Leadership ---
    setText('#leadership .section-title', r.leadership.title);
    setText('#leadership .section-subtitle', r.leadership.subtitle);

    var leadershipGrid = document.getElementById('leadership-grid');
    if (leadershipGrid) {
      var leaderIcons = [
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M8 6a4 4 0 018 0"/><path d="M5.2 11a8 8 0 0113.6 0"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
      ];
      leadershipGrid.innerHTML = r.leadership.cards.map(function (card, i) {
        return '<div class="leadership-card reveal">' +
          '<div class="leadership-card-icon">' + (leaderIcons[i] || '') + '</div>' +
          '<h3>' + esc(card.title) + '</h3>' +
          '<p>' + esc(card.description) + '</p>' +
          '</div>';
      }).join('');
    }

    // --- Publications ---
    setText('#publications .section-title', r.publications.title);
    setText('#publications .section-subtitle', r.publications.subtitle);

    var pubContent = document.getElementById('pub-content');
    if (pubContent) {
      pubContent.innerHTML =
        '<div class="book-card">' +
        '<div class="book-card-title">' + esc(r.publications.book.title).replace(' ', '<br>') + '</div>' +
        '<div class="book-card-author">' + esc(r.publications.book.author) + '</div>' +
        '</div>' +
        '<div class="pub-info">' +
        '<h3>' + esc(r.publications.book.title) + '</h3>' +
        '<p class="pub-author">by ' + esc(r.publications.book.author) + ' · Published on ' + esc(r.publications.book.publisher) + '</p>' +
        '<p class="pub-desc">' + esc(r.publications.book.description) + '</p>' +
        '<div class="pub-links">' +
        '<a href="' + esc(r.publications.book.amazonUrl) + '" target="_blank" rel="noopener" class="btn-primary">View on Amazon</a>' +
        '<a href="' + esc(r.publications.book.mediumUrl) + '" target="_blank" rel="noopener" class="btn-secondary">Read on Medium</a>' +
        '</div></div>';
    }

    // --- Certifications ---
    setText('#certifications .section-title', r.certifications.title);
    setText('#certifications .section-subtitle', r.certifications.subtitle);

    var certsGrid = document.getElementById('certs-grid');
    if (certsGrid) {
      certsGrid.innerHTML = r.certifications.items.map(function (cert) {
        return '<div class="cert-card reveal">' +
          '<div class="cert-accent"></div>' +
          '<div class="cert-info">' +
          '<h3>' + esc(cert.name) + '</h3>' +
          '<p>' + esc(cert.issuer) + '</p>' +
          '</div></div>';
      }).join('');
    }

    // --- Education ---
    var eduCard = document.getElementById('edu-card');
    if (eduCard) {
      eduCard.innerHTML =
        '<div class="edu-degree">' + esc(r.education.degree) + '</div>' +
        '<div class="edu-school">' + esc(r.education.school) + '</div>' +
        '<div class="edu-meta">' + esc(r.education.period) + ' · ' + esc(r.education.location) + '</div>';
    }

    // --- Contact ---
    setText('#contact .section-title', "Let\u2019s connect.");
    setText('#contact .section-subtitle', 'Open to conversations about engineering leadership, AI, and collaboration.');

    var contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
      contactEmail.href = 'mailto:' + r.personal.email;
      contactEmail.textContent = r.personal.email;
    }

    var contactSocial = document.getElementById('contact-social');
    if (contactSocial) {
      var socialIcons = {
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
        medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>'
      };
      contactSocial.innerHTML = [
        { key: 'linkedin', url: r.social.linkedin.url, label: 'LinkedIn' },
        { key: 'github', url: r.social.github.url, label: 'GitHub' },
        { key: 'medium', url: r.social.medium.url, label: 'Medium' }
      ].map(function (s) {
        return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + socialIcons[s.key] + '</a>';
      }).join('');
    }

    var contactExtras = document.getElementById('contact-extras');
    if (contactExtras) {
      contactExtras.innerHTML =
        '<a href="' + esc(r.social.npm.url) + '" target="_blank" rel="noopener">npm</a>' +
        '<a href="' + esc(r.social.pypi.url) + '" target="_blank" rel="noopener">PyPI</a>' +
        '<a href="' + esc(r.social.rubygems.url) + '" target="_blank" rel="noopener">RubyGems</a>';
    }

    // --- Footer ---
    var footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      footerCopy.innerHTML = '&copy; ' + new Date().getFullYear() + ' ' + esc(r.personal.name) + '. All rights reserved.';
    }

    // --- Trigger reveal observers for dynamically added elements ---
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-category')) {
              var pills = entry.target.querySelectorAll('.skill-item');
              pills.forEach(function (pill, i) {
                pill.style.transitionDelay = (i * 0.06) + 's';
              });
            }
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  function setText(selector, text) {
    var el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
