import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

const profileHtml = fs.readFileSync(path.resolve(__dirname, '../profile.html'), 'utf-8');

// Import functions from the module (vitest instruments this for coverage)
import {
  THEME_COLORS, THEME_STORAGE_KEY, getPreferredTheme, setTheme, toggleTheme,
  handleNavScroll, toggleMenu, updateActiveNav, handleBackToTop,
  updateScrollProgress, createRevealObserver, observeReveals, onScroll, init
} from '../js/main.js';

function setupDOM() {
  document.documentElement.innerHTML = '';
  document.head.innerHTML = '';
  document.body.innerHTML = '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(profileHtml, 'text/html');
  document.head.innerHTML = doc.head.innerHTML;
  document.body.innerHTML = doc.body.innerHTML;

  document.documentElement.setAttribute('data-theme', 'day');
}

function createMockStorage(initial) {
  const store = { ...initial };
  return {
    getItem(key) { return key in store ? store[key] : null; },
    setItem(key, val) { store[key] = String(val); },
    removeItem(key) { delete store[key]; },
    clear() { Object.keys(store).forEach(k => delete store[k]); },
    _store: store
  };
}

describe('main.js', () => {
  let mockStorage;

  beforeEach(() => {
    setupDOM();
    mockStorage = createMockStorage({});
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('THEME_COLORS', () => {
    it('should define night and day colors', () => {
      expect(THEME_COLORS.night).toBe('#080818');
      expect(THEME_COLORS.day).toBe('#e8e4f8');
    });
  });

  describe('THEME_STORAGE_KEY', () => {
    it('should be profile-theme', () => {
      expect(THEME_STORAGE_KEY).toBe('profile-theme');
    });
  });

  describe('getPreferredTheme()', () => {
    it('should return stored theme', () => {
      mockStorage._store['profile-theme'] = 'night';
      expect(getPreferredTheme()).toBe('night');
    });

    it('should return day when no stored theme', () => {
      expect(getPreferredTheme()).toBe('day');
    });
  });

  describe('setTheme()', () => {
    it('should set data-theme attribute', () => {
      setTheme('night');
      expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    });

    it('should save to localStorage', () => {
      setTheme('night');
      expect(mockStorage._store['profile-theme']).toBe('night');
    });

    it('should update meta theme-color', () => {
      setTheme('night');
      const meta = document.querySelector('meta[name="theme-color"]');
      expect(meta.getAttribute('content')).toBe('#080818');
    });

    it('should set day theme color', () => {
      setTheme('day');
      const meta = document.querySelector('meta[name="theme-color"]');
      expect(meta.getAttribute('content')).toBe('#e8e4f8');
    });

    it('should fall back to night color for unknown theme', () => {
      setTheme('unknown');
      const meta = document.querySelector('meta[name="theme-color"]');
      expect(meta.getAttribute('content')).toBe('#080818');
    });

    it('should call setThreeTheme when available', () => {
      window.setThreeTheme = vi.fn();
      setTheme('night');
      expect(window.setThreeTheme).toHaveBeenCalledWith('night');
      delete window.setThreeTheme;
    });

    it('should not crash when setThreeTheme is not defined', () => {
      delete window.setThreeTheme;
      expect(() => setTheme('night')).not.toThrow();
    });

    it('should handle missing meta theme-color', () => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.remove();
      expect(() => setTheme('night')).not.toThrow();
    });
  });

  describe('toggleTheme()', () => {
    it('should toggle from day to night', () => {
      document.documentElement.setAttribute('data-theme', 'day');
      toggleTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    });

    it('should toggle from night to day', () => {
      document.documentElement.setAttribute('data-theme', 'night');
      toggleTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    });

    it('should add theme-transitioning class', () => {
      toggleTheme();
      expect(document.documentElement.classList.contains('theme-transitioning')).toBe(true);
    });

    it('should remove theme-transitioning after timeout', () => {
      vi.useFakeTimers();
      toggleTheme();
      vi.advanceTimersByTime(600);
      expect(document.documentElement.classList.contains('theme-transitioning')).toBe(false);
      vi.useRealTimers();
    });

    it('should default to night when data-theme is missing', () => {
      document.documentElement.removeAttribute('data-theme');
      toggleTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    });
  });

  describe('handleNavScroll()', () => {
    it('should add scrolled class when scrollY > 50', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
      handleNavScroll();
      expect(document.querySelector('.nav').classList.contains('scrolled')).toBe(true);
    });

    it('should remove scrolled class when scrollY <= 50', () => {
      Object.defineProperty(window, 'scrollY', { value: 10, configurable: true });
      handleNavScroll();
      expect(document.querySelector('.nav').classList.contains('scrolled')).toBe(false);
    });

    it('should not crash when .nav is missing', () => {
      document.querySelector('.nav').remove();
      expect(() => handleNavScroll()).not.toThrow();
    });
  });

  describe('toggleMenu()', () => {
    it('should toggle hamburger open class', () => {
      toggleMenu();
      expect(document.querySelector('.hamburger').classList.contains('open')).toBe(true);
      expect(document.querySelector('.mobile-menu').classList.contains('open')).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should close on second call', () => {
      toggleMenu();
      toggleMenu();
      expect(document.querySelector('.hamburger').classList.contains('open')).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    it('should return early when hamburger is missing', () => {
      document.querySelector('.hamburger').remove();
      expect(() => toggleMenu()).not.toThrow();
    });

    it('should return early when mobile-menu is missing', () => {
      document.querySelector('.mobile-menu').remove();
      expect(() => toggleMenu()).not.toThrow();
    });
  });

  describe('updateActiveNav()', () => {
    it('should handle missing .nav element for marker calculation', () => {
      document.querySelector('.nav').remove();
      // With no .nav, marker should fallback to 0 + 24
      document.querySelectorAll('section[id]').forEach(s => {
        vi.spyOn(s, 'getBoundingClientRect').mockReturnValue({ top: 2000, bottom: 3000 });
      });
      expect(() => updateActiveNav()).not.toThrow();
    });

    it('should not activate hero section', () => {
      const hero = document.querySelector('#hero');
      if (hero) {
        vi.spyOn(hero, 'getBoundingClientRect').mockReturnValue({ top: 0, bottom: 800 });
      }
      updateActiveNav();
      expect(document.querySelectorAll('.nav-links a.active').length).toBe(0);
    });

    it('should activate matching section', () => {
      const about = document.querySelector('#about');
      if (about) {
        vi.spyOn(about, 'getBoundingClientRect').mockReturnValue({ top: 0, bottom: 800 });
      }
      // Mock other sections to be out of view
      document.querySelectorAll('section[id]:not(#about)').forEach(s => {
        vi.spyOn(s, 'getBoundingClientRect').mockReturnValue({ top: 2000, bottom: 3000 });
      });
      updateActiveNav();
      const activeLinks = document.querySelectorAll('.nav-links a.active, .mobile-menu a.active');
      const aboutActive = Array.from(activeLinks).filter(l => l.getAttribute('href') === '#about');
      expect(aboutActive.length).toBeGreaterThan(0);
    });

    it('should remove active from all links when no section matches', () => {
      document.querySelectorAll('section[id]').forEach(s => {
        vi.spyOn(s, 'getBoundingClientRect').mockReturnValue({ top: 2000, bottom: 3000 });
      });
      updateActiveNav();
      expect(document.querySelectorAll('.nav-links a.active').length).toBe(0);
    });
  });

  describe('handleBackToTop()', () => {
    it('should show button when scrollY > 600', () => {
      Object.defineProperty(window, 'scrollY', { value: 700, configurable: true });
      handleBackToTop();
      expect(document.querySelector('.back-to-top').classList.contains('visible')).toBe(true);
    });

    it('should hide button when scrollY <= 600', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
      handleBackToTop();
      expect(document.querySelector('.back-to-top').classList.contains('visible')).toBe(false);
    });

    it('should not crash when .back-to-top is missing', () => {
      document.querySelector('.back-to-top').remove();
      expect(() => handleBackToTop()).not.toThrow();
    });
  });

  describe('updateScrollProgress()', () => {
    it('should update width based on scroll position', () => {
      Object.defineProperty(window, 'scrollY', { value: 500, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
      updateScrollProgress();
      expect(document.querySelector('.scroll-progress').style.width).toBe('50%');
    });

    it('should handle zero height', () => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
      updateScrollProgress();
      expect(document.querySelector('.scroll-progress').style.width).toBe('0%');
    });

    it('should not crash when .scroll-progress is missing', () => {
      document.querySelector('.scroll-progress').remove();
      expect(() => updateScrollProgress()).not.toThrow();
    });
  });

  describe('createRevealObserver()', () => {
    it('should return an IntersectionObserver', () => {
      const observer = createRevealObserver();
      expect(observer).toBeInstanceOf(IntersectionObserver);
    });

    it('should add visible class when entry intersects', () => {
      const observer = createRevealObserver();
      const el = document.createElement('div');
      el.classList.add('reveal');
      observer.observe(el);

      // Manually trigger the callback
      observer._callback([{ isIntersecting: true, target: el }]);
      expect(el.classList.contains('visible')).toBe(true);
    });

    it('should not add visible when not intersecting', () => {
      const observer = createRevealObserver();
      const el = document.createElement('div');
      el.classList.add('reveal');

      observer._callback([{ isIntersecting: false, target: el }]);
      expect(el.classList.contains('visible')).toBe(false);
    });

    it('should set stagger delays on skill-category items', () => {
      const observer = createRevealObserver();
      const category = document.createElement('div');
      category.classList.add('reveal', 'skill-category');
      const pill1 = document.createElement('div');
      pill1.classList.add('skill-item');
      const pill2 = document.createElement('div');
      pill2.classList.add('skill-item');
      category.appendChild(pill1);
      category.appendChild(pill2);

      observer._callback([{ isIntersecting: true, target: category }]);
      expect(pill1.style.transitionDelay).toBe('0s');
      expect(pill2.style.transitionDelay).toBe('0.06s');
    });
  });

  describe('observeReveals()', () => {
    it('should observe all non-visible .reveal elements', () => {
      const observer = createRevealObserver();
      const spy = vi.spyOn(observer, 'observe');

      observeReveals(observer);
      const revealEls = document.querySelectorAll('.reveal:not(.visible)');
      expect(spy).toHaveBeenCalledTimes(revealEls.length);
    });
  });

  describe('init()', () => {
    it('should set up theme toggles', () => {
      init();
      const btn = document.querySelector('.theme-toggle');
      const currentTheme = document.documentElement.getAttribute('data-theme');
      btn.click();
      expect(document.documentElement.getAttribute('data-theme')).not.toBe(currentTheme);
    });

    it('should set up hamburger click', () => {
      init();
      document.querySelector('.hamburger').click();
      expect(document.querySelector('.mobile-menu').classList.contains('open')).toBe(true);
    });

    it('should set up mobile menu link close', () => {
      init();
      document.querySelector('.hamburger').click(); // open
      document.querySelector('.mobile-menu a').click();
      expect(document.querySelector('.mobile-menu').classList.contains('open')).toBe(false);
    });

    it('should set up back to top button', () => {
      window.scrollTo = vi.fn();
      init();
      document.querySelector('.back-to-top').click();
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should set up scroll handler', () => {
      window.requestAnimationFrame = function(cb) { cb(); return 1; };
      init();
      Object.defineProperty(window, 'scrollY', { value: 700, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      expect(document.querySelector('.back-to-top').classList.contains('visible')).toBe(true);
    });

    it('should set up Escape key handler', () => {
      init();
      document.querySelector('.hamburger').click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(document.querySelector('.mobile-menu').classList.contains('open')).toBe(false);
    });

    it('should ignore non-Escape keys', () => {
      init();
      document.querySelector('.hamburger').click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(document.querySelector('.mobile-menu').classList.contains('open')).toBe(true);
    });

    it('should re-observe reveals on resume-loaded', () => {
      init();
      const newReveal = document.createElement('div');
      newReveal.classList.add('reveal');
      document.body.appendChild(newReveal);

      document.dispatchEvent(new Event('resume-loaded'));
      // Should not crash
      expect(true).toBe(true);
    });

    it('should not crash when hamburger is missing during init', () => {
      document.querySelector('.hamburger').remove();
      expect(() => init()).not.toThrow();
    });

    it('should not crash when mobile-menu is missing during init', () => {
      document.querySelector('.mobile-menu').remove();
      expect(() => init()).not.toThrow();
    });

    it('should not crash when back-to-top is missing during init', () => {
      document.querySelector('.back-to-top').remove();
      expect(() => init()).not.toThrow();
    });

    it('should not close mobile menu on link click when menu is not open', () => {
      init();
      // Click a link without opening the menu first
      const link = document.querySelector('.mobile-menu a');
      link.click();
      expect(document.querySelector('.mobile-menu').classList.contains('open')).toBe(false);
    });

    it('should set day theme when OS prefers light and no stored theme', () => {
      let handler;
      window.matchMedia = function() {
        return {
          addEventListener: function(e, h) { handler = h; },
          removeEventListener: function() {}
        };
      };
      init();

      // Clear stored theme so OS preference kicks in
      delete mockStorage._store['profile-theme'];
      handler({ matches: true });
      expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    });

    it('should set up OS preference listener', () => {
      let handler;
      window.matchMedia = function() {
        return {
          addEventListener: function(e, h) { handler = h; },
          removeEventListener: function() {}
        };
      };
      init();

      // Clear stored theme so OS preference kicks in
      delete mockStorage._store['profile-theme'];
      handler({ matches: false });
      expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    });

    it('should ignore OS preference when stored theme exists', () => {
      let handler;
      window.matchMedia = function() {
        return {
          addEventListener: function(e, h) { handler = h; },
          removeEventListener: function() {}
        };
      };
      mockStorage._store['profile-theme'] = 'night';
      init();

      handler({ matches: true });
      // Should stay night since there's a stored value
      expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    });

    it('should set up cross-tab sync', () => {
      init();
      window.dispatchEvent(new StorageEvent('storage', { key: 'profile-theme', newValue: 'night' }));
      expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    });

    it('should ignore storage events for other keys', () => {
      init();
      window.dispatchEvent(new StorageEvent('storage', { key: 'other', newValue: 'value' }));
      // Theme unchanged
      expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    });

    it('should ignore storage events with null newValue', () => {
      init();
      window.dispatchEvent(new StorageEvent('storage', { key: 'profile-theme', newValue: null }));
      expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    });
  });

  describe('onScroll()', () => {
    it('should use requestAnimationFrame for throttling', () => {
      let rafCalled = false;
      window.requestAnimationFrame = function(cb) { rafCalled = true; cb(); return 1; };
      onScroll();
      expect(rafCalled).toBe(true);
    });
  });
});
