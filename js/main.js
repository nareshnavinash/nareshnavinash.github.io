/* ============================================
   PORTFOLIO — Naresh Sekar
   Pure JS · Zero Dependencies
   ============================================ */

(function () {
  'use strict';

  // --- DOM Cache ---
  var nav = document.querySelector('.nav');
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  var sections = document.querySelectorAll('section[id]');
  var backToTop = document.querySelector('.back-to-top');
  var themeToggle = document.querySelector('.theme-toggle');

  // --- 1. Dark Mode Toggle ---
  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // localStorage not available
    }
  }

  // Apply saved theme on load
  var savedTheme = getStoredTheme();
  if (savedTheme) {
    setTheme(savedTheme);
  }

  function toggleThemeAction() {
    var current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleThemeAction);
  }

  // --- 2. Navigation scroll effect ---
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  // --- 3. Hamburger toggle ---
  function toggleMenu() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // --- 4. Active section tracking ---
  function updateActiveNav() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- 5. Scroll reveal (Intersection Observer) ---
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- 6. Timeline expand/collapse ---
  document.querySelectorAll('.timeline-expand-btn').forEach(function (btn) {
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

  // --- 7. Back to top ---
  function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Unified scroll handler ---
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleNavScroll();
        updateActiveNav();
        handleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Init ---
  handleNavScroll();
  handleBackToTop();

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  });
})();
