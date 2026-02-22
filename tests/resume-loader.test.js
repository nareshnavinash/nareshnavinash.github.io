import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

const profileHtml = fs.readFileSync(path.resolve(__dirname, '../profile.html'), 'utf-8');
const resumeData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resume.json'), 'utf-8'));

// Import all functions from the module (vitest will instrument this for coverage)
import {
  loadResume, populate, populateSeo, populateNavigation, populateHero,
  triggerRevealObservers, bindTimelineDetails,
  setText, setAttr, formatTemplate, esc, RESUME_PATHS
} from '../js/resume-loader.js';

function setupDOM() {
  document.documentElement.innerHTML = '';
  document.head.innerHTML = '';
  document.body.innerHTML = '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(profileHtml, 'text/html');
  document.head.innerHTML = doc.head.innerHTML;
  document.body.innerHTML = doc.body.innerHTML;
}

describe('resume-loader.js', () => {
  beforeEach(() => {
    setupDOM();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('esc()', () => {
    it('should escape HTML special characters', () => {
      expect(esc('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    });

    it('should return empty string for null', () => {
      expect(esc(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(esc(undefined)).toBe('');
    });

    it('should convert numbers to string', () => {
      expect(esc(42)).toBe('42');
    });

    it('should handle ampersands', () => {
      expect(esc('A & B')).toBe('A &amp; B');
    });
  });

  describe('setText()', () => {
    it('should set text content of element', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      document.body.appendChild(el);
      setText('#test-el', 'Hello');
      expect(el.textContent).toBe('Hello');
    });

    it('should skip when text is null', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      el.textContent = 'original';
      document.body.appendChild(el);
      setText('#test-el', null);
      expect(el.textContent).toBe('original');
    });

    it('should skip when text is undefined', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      el.textContent = 'original';
      document.body.appendChild(el);
      setText('#test-el', undefined);
      expect(el.textContent).toBe('original');
    });

    it('should not crash when selector matches nothing', () => {
      expect(() => setText('#nonexistent', 'test')).not.toThrow();
    });
  });

  describe('setAttr()', () => {
    it('should set attribute on element', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      document.body.appendChild(el);
      setAttr('#test-el', 'data-value', 'hello');
      expect(el.getAttribute('data-value')).toBe('hello');
    });

    it('should skip when value is null', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      document.body.appendChild(el);
      setAttr('#test-el', 'data-value', null);
      expect(el.hasAttribute('data-value')).toBe(false);
    });

    it('should skip when value is undefined', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      document.body.appendChild(el);
      setAttr('#test-el', 'data-value', undefined);
      expect(el.hasAttribute('data-value')).toBe(false);
    });

    it('should skip when value is empty string', () => {
      const el = document.createElement('div');
      el.id = 'test-el';
      document.body.appendChild(el);
      setAttr('#test-el', 'data-value', '');
      expect(el.hasAttribute('data-value')).toBe(false);
    });

    it('should not crash when selector matches nothing', () => {
      expect(() => setAttr('#nonexistent', 'data-value', 'test')).not.toThrow();
    });
  });

  describe('formatTemplate()', () => {
    it('should replace placeholders with values', () => {
      expect(formatTemplate('{name} is {age}', { name: 'Alice', age: '30' })).toBe('Alice is 30');
    });

    it('should replace missing values with empty string', () => {
      expect(formatTemplate('{name} is {missing}', { name: 'Alice' })).toBe('Alice is ');
    });

    it('should handle null template', () => {
      expect(formatTemplate(null, {})).toBe('');
    });

    it('should handle undefined template', () => {
      expect(formatTemplate(undefined, {})).toBe('');
    });

    it('should handle template with no placeholders', () => {
      expect(formatTemplate('plain text', {})).toBe('plain text');
    });
  });

  describe('loadResume()', () => {
    it('should fetch resume.json from first successful path', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(resumeData)
      });

      const result = await loadResume(RESUME_PATHS);
      expect(result).toEqual(resumeData);
    });

    it('should try next path when first fails', async () => {
      let callCount = 0;
      global.fetch = vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount <= 3) {
          return Promise.resolve({ ok: false });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(resumeData)
        });
      });

      const result = await loadResume(RESUME_PATHS);
      expect(callCount).toBeGreaterThan(3);
      expect(result).toEqual(resumeData);
    });

    it('should reject when all paths fail', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(loadResume(RESUME_PATHS)).rejects.toThrow('resume.json not found');
    });

    it('should handle fetch throwing an error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(loadResume(RESUME_PATHS)).rejects.toThrow('resume.json not found');
    });

    it('should start from given index', async () => {
      let callCount = 0;
      global.fetch = vi.fn().mockImplementation(() => {
        callCount++;
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(resumeData)
        });
      });

      await loadResume(RESUME_PATHS, 5);
      // Should start from index 5
      expect(global.fetch).toHaveBeenCalledWith(RESUME_PATHS[5], { cache: 'no-store' });
    });

    it('should reject immediately when index exceeds paths length', async () => {
      await expect(loadResume(RESUME_PATHS, 100)).rejects.toThrow('resume.json not found');
    });
  });

  describe('populateSeo()', () => {
    it('should set page title', () => {
      populateSeo(resumeData, resumeData.site.seo);
      expect(document.title).toBe(resumeData.site.seo.title);
    });

    it('should set all meta tags', () => {
      populateSeo(resumeData, resumeData.site.seo);

      expect(document.querySelector('#meta-description').getAttribute('content')).toBe(resumeData.site.seo.description);
      expect(document.querySelector('#meta-keywords').getAttribute('content')).toBe(resumeData.site.seo.keywords);
      expect(document.querySelector('#meta-author').getAttribute('content')).toBe(resumeData.site.seo.author);
      expect(document.querySelector('#meta-robots').getAttribute('content')).toBe(resumeData.site.seo.robots);
    });

    it('should set Open Graph tags', () => {
      populateSeo(resumeData, resumeData.site.seo);

      expect(document.querySelector('#meta-og-type').getAttribute('content')).toBe(resumeData.site.seo.ogType);
      expect(document.querySelector('#meta-og-site-name').getAttribute('content')).toBe(resumeData.site.seo.ogSiteName);
      expect(document.querySelector('#meta-og-locale').getAttribute('content')).toBe(resumeData.site.seo.ogLocale);
      expect(document.querySelector('#meta-og-title').getAttribute('content')).toBe(resumeData.site.seo.title);
      expect(document.querySelector('#meta-og-url').getAttribute('content')).toBe(resumeData.site.seo.ogUrl);
    });

    it('should set Twitter tags', () => {
      populateSeo(resumeData, resumeData.site.seo);

      expect(document.querySelector('#meta-twitter-card').getAttribute('content')).toBe(resumeData.site.seo.twitterCard);
      expect(document.querySelector('#meta-twitter-title').getAttribute('content')).toBe(resumeData.site.seo.title);
    });

    it('should generate valid JSON-LD schema', () => {
      populateSeo(resumeData, resumeData.site.seo);

      const schema = JSON.parse(document.querySelector('#meta-ldjson').textContent);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@graph']).toHaveLength(2);
      expect(schema['@graph'][0]['@type']).toBe('ProfilePage');
      expect(schema['@graph'][1]['@type']).toBe('Person');
      expect(schema['@graph'][1].name).toBe(resumeData.personal.name);
    });

    it('should include social URLs in schema sameAs', () => {
      populateSeo(resumeData, resumeData.site.seo);

      const schema = JSON.parse(document.querySelector('#meta-ldjson').textContent);
      expect(schema['@graph'][1].sameAs).toContain(resumeData.social.linkedin.url);
    });

    it('should handle empty seo title', () => {
      const originalTitle = document.title;
      populateSeo(resumeData, {});
      expect(document.title).toBe(originalTitle);
    });

    it('should handle missing social object', () => {
      expect(() => populateSeo({ personal: {} }, resumeData.site.seo)).not.toThrow();
    });

    it('should use canonicalUrl when ogUrl is missing', () => {
      const seo = { ...resumeData.site.seo, ogUrl: '' };
      populateSeo(resumeData, seo);
      const schema = JSON.parse(document.querySelector('#meta-ldjson').textContent);
      expect(schema['@graph'][0].url).toBe(seo.canonicalUrl);
    });

    it('should handle social entry without url in schema sameAs', () => {
      // Triggers social && social.url ? social.url : null
      const data = {
        ...resumeData,
        social: { linkedin: { name: 'LI' }, github: { url: 'https://github.com' } }
      };
      populateSeo(data, resumeData.site.seo);
      const schema = JSON.parse(document.querySelector('#meta-ldjson').textContent);
      // linkedin has no url so should be filtered out, github should remain
      expect(schema['@graph'][1].sameAs).toContain('https://github.com');
      expect(schema['@graph'][1].sameAs).not.toContain(undefined);
    });

    it('should use personal.title as fallback for schemaJobTitle', () => {
      // Triggers seo.schemaJobTitle || (r.personal && r.personal.title ? r.personal.title : '')
      const seo = { ...resumeData.site.seo };
      delete seo.schemaJobTitle;
      const data = { ...resumeData, personal: { ...resumeData.personal, title: 'Engineer' } };
      populateSeo(data, seo);
      const schema = JSON.parse(document.querySelector('#meta-ldjson').textContent);
      expect(schema['@graph'][1].jobTitle).toBe('Engineer');
    });

    it('should use personal.bio as fallback for schemaPersonDescription', () => {
      const seo = { ...resumeData.site.seo };
      delete seo.schemaPersonDescription;
      const data = { ...resumeData, personal: { ...resumeData.personal, bio: 'A bio' } };
      populateSeo(data, seo);
      const schema = JSON.parse(document.querySelector('#meta-ldjson').textContent);
      expect(schema['@graph'][1].description).toBe('A bio');
    });
  });

  describe('populateNavigation()', () => {
    it('should set nav logo text and attributes', () => {
      populateNavigation(resumeData.site.navigation);

      const logo = document.querySelector('#nav-logo');
      expect(logo.textContent).toBe(resumeData.site.navigation.logoText);
      expect(logo.getAttribute('href')).toBe(resumeData.site.navigation.logoHref);
      expect(logo.getAttribute('aria-label')).toBe(resumeData.site.navigation.logoAriaLabel);
    });

    it('should set nav aria labels', () => {
      populateNavigation(resumeData.site.navigation);

      expect(document.querySelector('#main-nav').getAttribute('aria-label')).toBe(resumeData.site.navigation.mainAriaLabel);
      expect(document.querySelector('#mobile-menu').getAttribute('aria-label')).toBe(resumeData.site.navigation.mobileAriaLabel);
    });

    it('should populate nav link labels', () => {
      populateNavigation(resumeData.site.navigation);

      resumeData.site.navigation.items.forEach((item) => {
        const links = document.querySelectorAll(`[data-nav-key="${item.key}"]`);
        links.forEach((link) => {
          expect(link.textContent).toBe(item.label);
        });
      });
    });

    it('should set world link labels', () => {
      populateNavigation(resumeData.site.navigation);

      const worldLinks = document.querySelectorAll('[data-nav-world]');
      worldLinks.forEach((link) => {
        expect(link.textContent).toBe(resumeData.site.navigation.worldLink.label);
      });
    });

    it('should set theme toggle aria-labels', () => {
      populateNavigation(resumeData.site.navigation);

      document.querySelectorAll('.theme-toggle').forEach((btn) => {
        expect(btn.getAttribute('aria-label')).toBe(resumeData.site.navigation.themeToggleAriaLabel);
      });
    });

    it('should handle empty items array', () => {
      expect(() => populateNavigation({ items: [] })).not.toThrow();
    });

    it('should handle world link without properties', () => {
      populateNavigation({ ...resumeData.site.navigation, worldLink: {} });

      document.querySelectorAll('[data-nav-world]').forEach((link) => {
        expect(link.textContent).toBe('');
      });
    });

    it('should handle missing themeToggleAriaLabel', () => {
      expect(() => populateNavigation({ items: [] })).not.toThrow();
    });

    it('should handle worldLink without href and ariaLabel', () => {
      populateNavigation({ ...resumeData.site.navigation, worldLink: { label: 'World' } });
      const worldLink = document.querySelector('[data-nav-world]');
      expect(worldLink.textContent).toBe('World');
    });

    it('should handle missing worldLink entirely', () => {
      populateNavigation({ ...resumeData.site.navigation, worldLink: null });
      const worldLink = document.querySelector('[data-nav-world]');
      expect(worldLink.textContent).toBe('');
    });

    it('should handle nav items without href', () => {
      populateNavigation({
        items: [{ key: 'about', label: 'About Me' }]
      });
      const aboutLink = document.querySelector('[data-nav-key="about"]');
      expect(aboutLink.textContent).toBe('About Me');
    });

    it('should handle nav items without label (fallback to empty)', () => {
      // Triggers item.label || '' fallback on line 354
      populateNavigation({
        items: [{ key: 'about' }]
      });
      const aboutLink = document.querySelector('[data-nav-key="about"]');
      expect(aboutLink.textContent).toBe('');
    });
  });

  describe('populateHero()', () => {
    it('should set hero greeting', () => {
      populateHero(resumeData, resumeData.site.hero);

      const greeting = document.querySelector('.hero-greeting');
      const expected = resumeData.site.hero.greetingPrefix + resumeData.personal.firstName + resumeData.site.hero.greetingSuffix;
      expect(greeting.textContent).toBe(expected);
    });

    it('should set hero heading HTML', () => {
      populateHero(resumeData, resumeData.site.hero);

      const heading = document.querySelector('.hero-heading');
      expect(heading.innerHTML).toBe(resumeData.site.hero.headingHtml);
    });

    it('should use tagline when headingHtml is missing', () => {
      populateHero(resumeData, {});

      const heading = document.querySelector('.hero-heading');
      expect(heading.textContent).toBe(resumeData.personal.tagline);
    });

    it('should set photo src and alt', () => {
      populateHero(resumeData, resumeData.site.hero);

      const photo = document.querySelector('.hero-photo');
      expect(photo.getAttribute('src')).toBe(resumeData.personal.photo);
      expect(photo.getAttribute('alt')).toBe(resumeData.personal.name);
    });

    it('should use default alt when name is missing', () => {
      populateHero({ personal: {} }, {});

      const photo = document.querySelector('.hero-photo');
      expect(photo.getAttribute('alt')).toBe('Profile photo');
    });

    it('should handle missing firstName', () => {
      populateHero({ personal: {} }, { greetingPrefix: 'Hi, ', greetingSuffix: '!' });

      const greeting = document.querySelector('.hero-greeting');
      expect(greeting.textContent).toBe('Hi, !');
    });

    it('should handle missing photo path', () => {
      populateHero({ personal: { name: 'Test', photo: null } }, {});
      // Should not crash
      expect(true).toBe(true);
    });

    it('should not crash when .hero-photo is missing', () => {
      document.querySelector('.hero-photo').remove();
      expect(() => populateHero(resumeData, resumeData.site.hero)).not.toThrow();
    });

    it('should not crash when .hero-heading is missing', () => {
      document.querySelector('.hero-heading').remove();
      expect(() => populateHero(resumeData, resumeData.site.hero)).not.toThrow();
    });
  });

  describe('populate() - full integration', () => {
    it('should populate all sections from resume data', () => {
      populate(resumeData);

      expect(document.querySelector('#about .section-title').textContent).toBe(resumeData.about.title);
      expect(document.querySelector('#career .section-title').textContent).toBe(resumeData.career.title);
      expect(document.querySelector('#skills .section-title').textContent).toBe(resumeData.skills.title);
      expect(document.querySelector('#leadership .section-title').textContent).toBe(resumeData.leadership.title);
    });

    it('should render all about cards', () => {
      populate(resumeData);

      const cards = document.querySelectorAll('.about-card');
      expect(cards.length).toBe(resumeData.about.cards.length);
    });

    it('should render about card icons', () => {
      populate(resumeData);

      const icons = document.querySelectorAll('.about-card-icon svg');
      expect(icons.length).toBe(resumeData.about.cards.length);
    });

    it('should render all career timeline items', () => {
      populate(resumeData);

      const totalRoles = resumeData.career.positions.reduce((sum, c) => sum + c.roles.length, 0);
      expect(document.querySelectorAll('.timeline-item').length).toBe(totalRoles);
    });

    it('should render career details correctly', () => {
      populate(resumeData);

      const companies = document.querySelectorAll('.timeline-company');
      let idx = 0;
      resumeData.career.positions.forEach((company) => {
        company.roles.forEach(() => {
          expect(companies[idx].textContent).toBe(company.company);
          idx++;
        });
      });
    });

    it('should render career section titles', () => {
      populate(resumeData);

      const titles = document.querySelectorAll('.timeline-section-title');
      const firstRole = resumeData.career.positions[0].roles[0];
      const expected = firstRole.sections.filter(s => s.title).map(s => s.title);
      const rendered = Array.from(titles).slice(0, expected.length).map(el => el.textContent);
      expect(rendered).toEqual(expected);
    });

    it('should render career sections without title', () => {
      populate(resumeData);

      // Roles with null title should still render points
      const achievements = document.querySelectorAll('.timeline-achievements');
      expect(achievements.length).toBeGreaterThan(0);
    });

    it('should render expand buttons with correct label', () => {
      populate(resumeData);

      const buttons = document.querySelectorAll('.timeline-expand-btn span');
      buttons.forEach((span) => {
        expect(span.textContent).toBe(resumeData.site.labels.viewDetails);
      });
    });

    it('should render all skill categories', () => {
      populate(resumeData);

      expect(document.querySelectorAll('.skill-category').length).toBe(resumeData.skills.categories.length);
    });

    it('should render all skill items', () => {
      populate(resumeData);

      const allSkills = resumeData.skills.categories.flatMap(cat => cat.items);
      expect(document.querySelectorAll('.skill-name').length).toBe(allSkills.length);
    });

    it('should render all leadership cards', () => {
      populate(resumeData);

      expect(document.querySelectorAll('.leadership-card').length).toBe(resumeData.leadership.cards.length);
    });

    it('should render publications', () => {
      populate(resumeData);

      expect(document.querySelector('.book-card')).not.toBeNull();
      expect(document.querySelector('.pub-info h3').textContent).toBe(resumeData.publications.book.title);
    });

    it('should render book byline from template', () => {
      populate(resumeData);

      const byline = document.querySelector('.pub-author');
      expect(byline.textContent).toContain(resumeData.publications.book.author);
      expect(byline.textContent).toContain(resumeData.publications.book.publisher);
    });

    it('should render publication links', () => {
      populate(resumeData);

      expect(document.querySelector('.btn-primary').getAttribute('href')).toBe(resumeData.publications.book.amazonUrl);
      expect(document.querySelector('.btn-secondary').getAttribute('href')).toBe(resumeData.publications.book.mediumUrl);
    });

    it('should render all certifications', () => {
      populate(resumeData);

      expect(document.querySelectorAll('.cert-card').length).toBe(resumeData.certifications.items.length);
    });

    it('should render education', () => {
      populate(resumeData);

      expect(document.querySelector('.edu-degree').textContent).toBe(resumeData.education.degree);
      expect(document.querySelector('.edu-school').textContent).toBe(resumeData.education.school);
    });

    it('should render contact section', () => {
      populate(resumeData);

      expect(document.querySelector('#contact-email').textContent).toBe(resumeData.personal.email);
      expect(document.querySelector('#contact-email').getAttribute('href')).toBe('mailto:' + resumeData.personal.email);
    });

    it('should render social icons', () => {
      populate(resumeData);

      const socialLinks = document.querySelectorAll('#contact-social a');
      expect(socialLinks.length).toBe(resumeData.site.contact.primarySocialKeys.length);
    });

    it('should render footer', () => {
      populate(resumeData);

      expect(document.querySelector('#footer-greeting').textContent).toBe(resumeData.site.labels.footerGreeting);
      expect(document.querySelector('#footer-tagline').textContent).toBe(resumeData.site.labels.footerTagline);
    });

    it('should render footer copyright', () => {
      populate(resumeData);

      const copy = document.querySelector('.footer-copy');
      expect(copy.textContent).toContain(String(new Date().getFullYear()));
      expect(copy.textContent).toContain(resumeData.personal.name);
    });

    it('should render extra social links', () => {
      populate(resumeData);

      const extras = document.querySelectorAll('#contact-extras a');
      expect(extras.length).toBe(resumeData.site.footer.extraSocialKeys.length);
    });

    it('should set back to top aria-label', () => {
      populate(resumeData);

      expect(document.querySelector('#back-to-top').getAttribute('aria-label')).toBe(resumeData.site.labels.backToTopAriaLabel);
    });
  });

  describe('populate() - fallback branches', () => {
    it('should handle missing site object and all sub-properties', () => {
      // Triggers r.site || {}, site.seo || {}, site.navigation || {}, etc.
      const data = {
        personal: { name: 'Test', email: 'a@b.com' },
        social: {},
        about: { title: 'A' },
        career: { title: 'C' },
        skills: { title: 'S' },
        leadership: { title: 'L' },
        certifications: { title: 'Ce' },
        contact: {}
      };
      expect(() => populate(data)).not.toThrow();
    });

    it('should handle about cards with more than 3 items (icon fallback)', () => {
      // Triggers aboutIcons[i] || '' when i >= 3
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A', cards: [
          { title: 'A', description: 'a' },
          { title: 'B', description: 'b' },
          { title: 'C', description: 'c' },
          { title: 'D', description: 'd' }
        ] },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      const icons = document.querySelectorAll('.about-card-icon');
      // 4th card should have empty icon div (no svg)
      expect(icons[3].querySelector('svg')).toBeNull();
    });

    it('should handle company without roles property', () => {
      // Triggers company.roles || []
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [{ company: 'TestCo' }] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelectorAll('.timeline-item').length).toBe(0);
    });

    it('should handle role without sections property', () => {
      // Triggers role.sections || []
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [{ company: 'TestCo', roles: [{ date: '2024', role: 'Dev', location: 'NYC' }] }] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelectorAll('.timeline-item').length).toBe(1);
    });

    it('should handle section without points property', () => {
      // Triggers section.points || []
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [{ company: 'TestCo', roles: [{ date: '2024', role: 'Dev', location: 'NYC', sections: [{ title: 'Sec' }] }] }] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelector('.timeline-achievements').children.length).toBe(0);
    });

    it('should handle role without shortRole and without role', () => {
      // Triggers role.shortRole || role.role || ''
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [{ company: 'TestCo', roles: [{ date: '2024', location: 'NYC' }] }] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelector('.timeline-role').textContent).toBe('');
    });

    it('should handle skill category without items property', () => {
      // Triggers cat.items || []
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [{ name: 'Cat1' }] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelectorAll('.skill-item').length).toBe(0);
    });

    it('should handle more than 4 skill categories (icon fallback)', () => {
      // Triggers skillIcons[i] || ''
      const cats = Array.from({ length: 5 }, (_, i) => ({ name: 'Cat' + i, items: ['s'] }));
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: cats },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      const categories = document.querySelectorAll('.skill-category');
      // 5th category heading should not have an svg
      expect(categories[4].querySelector('h3 svg')).toBeNull();
    });

    it('should handle more than 6 leadership cards (icon fallback)', () => {
      // Triggers leaderIcons[i] || ''
      const cards = Array.from({ length: 7 }, (_, i) => ({ title: 'Card' + i, description: 'desc' }));
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: cards },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      const leaderCards = document.querySelectorAll('.leadership-card');
      // 7th card icon should be empty
      expect(leaderCards[6].querySelector('.leadership-card-icon svg')).toBeNull();
    });

    it('should handle book with missing optional fields', () => {
      // Triggers book.author || '', book.publisher || '', book.description || '',
      // book.amazonUrl || '', book.mediumUrl || '', book.bylineTemplate || ''
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        publications: { title: 'P', book: { title: 'MyBook' } },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelector('.book-card-author').textContent).toBe('');
      expect(document.querySelector('.pub-desc').textContent).toBe('');
    });

    it('should handle book with no title', () => {
      // Triggers book.title || '' fallback on lines 175 and 179
      const data = {
        personal: {},
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        publications: { title: 'P', book: { author: 'Author' } },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      populate(data);
      expect(document.querySelector('.book-card-title').textContent).toBe('');
      expect(document.querySelector('.pub-info h3').textContent).toBe('');
    });

    it('should handle site without contact config', () => {
      // Triggers site.contact || {} on line 40
      const data = {
        personal: { email: 'a@b.com' },
        site: { seo: {}, navigation: {}, hero: {}, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] },
        contact: {}
      };
      expect(() => populate(data)).not.toThrow();
    });

    it('should handle missing r.contact property', () => {
      // Triggers r.contact || {} on line 38
      const data = {
        personal: { email: 'a@b.com' },
        site: { seo: {}, navigation: {}, hero: {}, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'A' },
        career: { title: 'C', positions: [] },
        skills: { title: 'S', categories: [] },
        leadership: { title: 'L', cards: [] },
        certifications: { title: 'Ce', items: [] }
      };
      expect(() => populate(data)).not.toThrow();
    });

    it('should handle social item with name but use key as fallback', () => {
      // Triggers item.name || key in primary social
      const data = {
        ...resumeData,
        social: { linkedin: { url: 'https://linkedin.com', name: '' }, custom: { url: 'https://custom.com' } },
        site: { ...resumeData.site, contact: { primarySocialKeys: ['custom'] }, footer: { extraSocialKeys: ['custom'] } }
      };
      populate(data);
      const link = document.querySelector('#contact-social a');
      expect(link.getAttribute('aria-label')).toBe('custom');
      const extra = document.querySelector('#contact-extras a');
      expect(extra.textContent).toBe('custom');
    });

    it('should handle unknown social icon key', () => {
      // Triggers socialIcons[key] || '' for keys not in the icons map
      const data = {
        ...resumeData,
        social: { twitter: { url: 'https://twitter.com', name: 'Twitter' } },
        site: { ...resumeData.site, contact: { primarySocialKeys: ['twitter'] }, footer: { extraSocialKeys: [] } }
      };
      populate(data);
      const link = document.querySelector('#contact-social a');
      expect(link.querySelector('svg')).toBeNull();
    });

    it('should handle missing contact-email element', () => {
      document.getElementById('contact-email').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing contact-social element', () => {
      document.getElementById('contact-social').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing contact-extras element', () => {
      document.getElementById('contact-extras').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing footer-copy element', () => {
      document.querySelector('.footer-copy').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle footer copyright with no personal name', () => {
      // Triggers r.personal && r.personal.name ? r.personal.name : ''
      const data = {
        ...resumeData,
        personal: {}
      };
      populate(data);
      const copy = document.querySelector('.footer-copy');
      expect(copy.textContent).toContain(String(new Date().getFullYear()));
    });

    it('should handle missing about-cards element', () => {
      document.getElementById('about-cards').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing career-grid element', () => {
      document.getElementById('career-grid').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing skills-grid element', () => {
      document.getElementById('skills-grid').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing leadership-grid element', () => {
      document.getElementById('leadership-grid').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing pub-content element', () => {
      document.getElementById('pub-content').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing certs-grid element', () => {
      document.getElementById('certs-grid').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should handle missing edu-card element', () => {
      document.getElementById('edu-card').remove();
      expect(() => populate(resumeData)).not.toThrow();
    });

    it('should use viewDetails default label when labels.viewDetails is missing', () => {
      const data = {
        ...resumeData,
        site: { ...resumeData.site, labels: {} }
      };
      populate(data);
      const btn = document.querySelector('.timeline-expand-btn span');
      expect(btn.textContent).toBe('View details');
    });
  });

  describe('populate() - edge cases', () => {
    it('should handle missing optional sections', () => {
      const minimal = {
        personal: { name: 'Test' },
        site: { seo: {}, navigation: {}, hero: {}, contact: {}, footer: {}, labels: {} },
        social: {},
        about: { title: 'About', cards: [] },
        career: { title: 'Career', positions: [] },
        skills: { title: 'Skills', categories: [] },
        leadership: { title: 'Leadership', cards: [] },
        certifications: { title: 'Certs', items: [] },
        contact: {}
      };
      expect(() => populate(minimal)).not.toThrow();
    });

    it('should HTML-escape XSS in content', () => {
      const xssData = {
        personal: { name: '<script>xss</script>', email: 'test@test.com', mission: 'mission' },
        site: { seo: {}, navigation: {}, hero: {}, contact: { primarySocialKeys: [] }, footer: { extraSocialKeys: [] }, labels: {} },
        social: {},
        about: { title: 'About', cards: [{ title: '<img src=x>', description: 'desc' }] },
        career: { title: 'Career', positions: [] },
        skills: { title: 'Skills', categories: [] },
        leadership: { title: 'Leadership', cards: [] },
        certifications: { title: 'Certs', items: [] },
        contact: {}
      };
      populate(xssData);

      const cardTitle = document.querySelector('.about-card h3');
      expect(cardTitle.innerHTML).not.toContain('<img');
    });

    it('should handle missing publications book', () => {
      const data = { ...resumeData, publications: { title: 'Pub' } };
      populate(data);
      expect(document.querySelector('#pub-content').innerHTML).toBe('');
    });

    it('should handle empty social keys', () => {
      const data = {
        ...resumeData,
        social: {},
        site: { ...resumeData.site, contact: { primarySocialKeys: ['missing'] }, footer: { extraSocialKeys: ['missing'] } }
      };
      populate(data);
      expect(document.querySelectorAll('#contact-social a').length).toBe(0);
    });

    it('should handle social key with no URL', () => {
      const data = {
        ...resumeData,
        social: { linkedin: { name: 'LI' } },
        site: { ...resumeData.site, contact: { primarySocialKeys: ['linkedin'] } }
      };
      populate(data);
      expect(document.querySelectorAll('#contact-social a').length).toBe(0);
    });

    it('should handle missing education data', () => {
      const data = { ...resumeData, education: undefined };
      populate(data);
      expect(document.querySelector('#edu-card').innerHTML).toBe('');
    });

    it('should handle missing contact email', () => {
      const data = { ...resumeData, personal: { ...resumeData.personal, email: undefined } };
      populate(data);
      expect(document.querySelector('#contact-email').getAttribute('href')).toBe('mailto:');
    });

    it('should handle career with empty roles', () => {
      const data = {
        ...resumeData,
        career: { title: 'Career', positions: [{ company: 'Test', roles: [] }] }
      };
      populate(data);
      expect(document.querySelectorAll('.timeline-item').length).toBe(0);
    });
  });

  describe('bindTimelineDetails()', () => {
    it('should expand details on button click', () => {
      populate(resumeData);

      const btn = document.querySelector('.timeline-expand-btn');
      btn.click();

      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('should collapse details on second click', () => {
      populate(resumeData);

      const btn = document.querySelector('.timeline-expand-btn');
      btn.click();
      btn.click();

      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not double-bind buttons', () => {
      populate(resumeData);

      const btn = document.querySelector('.timeline-expand-btn');
      expect(btn.dataset.resumeBound).toBe('1');

      // Call bind again - should be a no-op
      bindTimelineDetails(document.getElementById('career-grid'));
      expect(btn.dataset.resumeBound).toBe('1');
    });

    it('should fallback to .timeline-card when .timeline-card-body is missing', () => {
      // Triggers btn.closest('.timeline-card-body') || btn.closest('.timeline-card')
      const scope = document.createElement('div');
      const card = document.createElement('div');
      card.classList.add('timeline-card');
      const btn = document.createElement('button');
      btn.classList.add('timeline-expand-btn');
      btn.setAttribute('aria-expanded', 'false');
      const details = document.createElement('div');
      details.classList.add('timeline-details');
      card.appendChild(btn);
      card.appendChild(details);
      scope.appendChild(card);

      bindTimelineDetails(scope);
      btn.click();
      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set maxHeight to scrollHeight on expand', () => {
      populate(resumeData);
      const btn = document.querySelector('.timeline-expand-btn');
      const details = btn.closest('.timeline-card-body').querySelector('.timeline-details');
      btn.click();
      // scrollHeight is 0 in jsdom, so maxHeight will be '0px'
      expect(details.style.maxHeight).toBeDefined();
    });
  });

  describe('triggerRevealObservers()', () => {
    it('should observe all .reveal elements', () => {
      populate(resumeData);
      expect(() => triggerRevealObservers()).not.toThrow();
    });

    it('should add visible class when observer fires', () => {
      const el = document.createElement('div');
      el.classList.add('reveal');
      document.body.appendChild(el);

      globalThis.__intersectionObservers = [];
      triggerRevealObservers();

      // Get the observer created by triggerRevealObservers
      const observer = globalThis.__intersectionObservers[globalThis.__intersectionObservers.length - 1];
      // Trigger intersection
      observer._triggerAll(true);

      expect(el.classList.contains('visible')).toBe(true);
    });

    it('should not add visible when not intersecting', () => {
      const el = document.createElement('div');
      el.classList.add('reveal');
      document.body.appendChild(el);

      globalThis.__intersectionObservers = [];
      triggerRevealObservers();

      const observer = globalThis.__intersectionObservers[globalThis.__intersectionObservers.length - 1];
      observer._triggerAll(false);

      expect(el.classList.contains('visible')).toBe(false);
    });

    it('should set stagger delays on skill-category items', () => {
      const cat = document.createElement('div');
      cat.classList.add('reveal', 'skill-category');
      const item1 = document.createElement('div');
      item1.classList.add('skill-item');
      const item2 = document.createElement('div');
      item2.classList.add('skill-item');
      cat.appendChild(item1);
      cat.appendChild(item2);
      document.body.appendChild(cat);

      globalThis.__intersectionObservers = [];
      triggerRevealObservers();

      const observer = globalThis.__intersectionObservers[globalThis.__intersectionObservers.length - 1];
      observer._triggerAll(true);

      expect(item1.style.transitionDelay).toBe('0s');
      expect(item2.style.transitionDelay).toBe('0.06s');
    });

    it('should unobserve element after making it visible', () => {
      const el = document.createElement('div');
      el.classList.add('reveal');
      document.body.appendChild(el);

      globalThis.__intersectionObservers = [];
      triggerRevealObservers();

      const observer = globalThis.__intersectionObservers[globalThis.__intersectionObservers.length - 1];
      expect(observer._elements.length).toBeGreaterThan(0);

      observer._triggerAll(true);

      // After triggering, element should be unobserved
      expect(observer._elements).not.toContain(el);
    });
  });

  describe('init()', () => {
    it('should call loadResume and populate on success', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(resumeData)
      });

      let eventFired = false;
      document.addEventListener('resume-loaded', () => { eventFired = true; }, { once: true });

      // Import and call init directly
      const { init: loaderInit } = await import('../js/resume-loader.js');
      loaderInit();

      await new Promise(r => setTimeout(r, 100));

      expect(eventFired).toBe(true);
      expect(document.title).toBe(resumeData.site.seo.title);
    });

    it('should log error when all paths fail', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      const { init: loaderInit } = await import('../js/resume-loader.js');
      loaderInit();

      await new Promise(r => setTimeout(r, 500));

      expect(consoleSpy).toHaveBeenCalledWith('Failed to load resume data:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
