/* ============================================
   PORTFOLIO - Naresh Sekar
   Pure JS · Zero Dependencies
   ============================================ */

(function () {
  'use strict';

  // --- DOM Cache ---
  var nav = document.querySelector('.nav');
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');
  var backToTop = document.querySelector('.back-to-top');
  var scrollProgress = document.querySelector('.scroll-progress');
  var careerZone = document.querySelector('.career-scroll-zone');
  var careerGrid = document.querySelector('.career-grid');
  var careerProgressTrack = document.querySelector('.career-progress-track');
  var themeToggles = document.querySelectorAll('.theme-toggle');
  var metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // --- Theme toggle ---
  var THEME_COLORS = { night: '#080818', day: '#e8e4f8' };
  var THEME_STORAGE_KEY = 'profile-theme';

  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored;
    return 'day';
  }

  function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    if (metaThemeColor) metaThemeColor.setAttribute('content', THEME_COLORS[mode] || THEME_COLORS.night);
    if (typeof window.setThreeTheme === 'function') window.setThreeTheme(mode);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'night';
    var next = current === 'night' ? 'day' : 'night';
    document.documentElement.classList.add('theme-transitioning');
    setTheme(next);
    setTimeout(function () {
      document.documentElement.classList.remove('theme-transitioning');
    }, 600);
  }

  themeToggles.forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });

  // OS preference change listener
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      setTheme(e.matches ? 'day' : 'night');
    }
  });

  // Cross-tab sync
  window.addEventListener('storage', function (e) {
    if (e.key === THEME_STORAGE_KEY && e.newValue) {
      setTheme(e.newValue);
    }
  });

  // Apply theme on load (already set by FOUC script, but sync meta/three)
  setTheme(getPreferredTheme());

  // --- 1. Navigation scroll effect ---
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
    var marker = (nav ? nav.offsetHeight : 0) + 24;
    var activeId = null;

    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) {
        activeId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
    });

    if (!activeId || activeId === 'hero') return;

    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + activeId) {
        link.classList.add('active');
      }
    });
  }

  // --- 5. Scroll reveal (Intersection Observer) ---
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Skill pill stagger: dynamically set transition delays
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

  // --- 8. Scroll progress bar ---
  function updateScrollProgress() {
    if (!scrollProgress) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  // --- 9. Career horizontal scroll carousel ---
  var careerZoneFlowTop = 0;

  function setupCareerCarousel() {
    if (!careerZone || !careerGrid) return;

    // Disable on mobile
    if (window.innerWidth <= 768) {
      careerZone.style.height = '';
      careerGrid.style.transform = '';
      return;
    }

    // Make all career items visible immediately (horizontal scroll reveals them)
    careerGrid.querySelectorAll('.timeline-item.reveal').forEach(function (item) {
      item.classList.add('visible');
      revealObserver.unobserve(item);
    });

    // Measure flow position: temporarily un-stick so we get the real
    // document-flow top, not the visual "stuck at 0" position.
    careerZone.style.position = 'relative';
    careerZoneFlowTop = careerZone.getBoundingClientRect().top + window.scrollY;
    careerZone.style.position = '';  // restore CSS sticky

    var gridWidth = careerGrid.scrollWidth;
    var containerWidth = careerGrid.parentElement.offsetWidth;
    var scrollDistance = gridWidth - containerWidth;

    if (scrollDistance <= 0) {
      careerZone.style.height = '';
      return;
    }

    // Wrapper height = viewport + horizontal scroll distance
    careerZone.style.height = (window.innerHeight + scrollDistance) + 'px';
  }

  function updateCareerCarousel() {
    if (!careerZone || !careerGrid || window.innerWidth <= 768) return;

    var scrollRoom = careerZone.offsetHeight - window.innerHeight;

    if (scrollRoom <= 0) return;

    var scrolled = window.scrollY - careerZoneFlowTop;
    var progress = Math.max(0, Math.min(1, scrolled / scrollRoom));

    var gridWidth = careerGrid.scrollWidth;
    var containerWidth = careerGrid.parentElement.offsetWidth;
    var maxTranslate = gridWidth - containerWidth;

    careerGrid.style.transform = 'translateX(' + (-progress * maxTranslate) + 'px)';

    if (careerProgressTrack) {
      careerProgressTrack.style.width = (progress * 100) + '%';
    }
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
        updateScrollProgress();
        updateCareerCarousel();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Init ---
  handleNavScroll();
  handleBackToTop();
  setupCareerCarousel();

  document.addEventListener('resume-loaded', function () {
    navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');
    sections = document.querySelectorAll('section[id]');
    careerZone = document.querySelector('.career-scroll-zone');
    careerGrid = document.querySelector('.career-grid');
    careerProgressTrack = document.querySelector('.career-progress-track');

    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      revealObserver.observe(el);
    });

    setupCareerCarousel();
    onScroll();
  });

  // Recalculate career carousel on resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupCareerCarousel, 150);
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  });
})();
