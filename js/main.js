/* ============================================
   PORTFOLIO -  Naresh Sekar
   Pure JS · Zero Dependencies
   ============================================ */

(function () {
  'use strict';

  // --- DOM Cache ---
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.querySelector('.back-to-top');
  const skillFills = document.querySelectorAll('.skill-fill');
  const heroShapes = document.querySelectorAll('.shape');

  // --- 1. Navigation scroll effect ---
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  // --- 2. Hamburger toggle ---
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

  // --- 3. Active section tracking ---
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

  // --- 4. Scroll reveal (Intersection Observer) ---
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

  // --- 5. Typing effect ---
  var typingEl = document.querySelector('.typing-text');
  var phrases = [
    'Engineering Manager × AI Adoption',
    'Building Teams That Ship Quality at Scale',
    'Author · Speaker · Open Source Contributor',
    'From Code to Culture -  Leading with Impact'
  ];
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 50;

  function typeEffect() {
    if (!typingEl) return;

    var current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? 30 : typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  // Start typing after hero animations complete
  setTimeout(typeEffect, 1600);

  // --- 6. Counter animation ---
  function animateCounters() {
    document.querySelectorAll('.hero-stat-number').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  // Trigger counters when hero is visible
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  var heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  // --- 7. Skill bar animation ---
  var skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fills = entry.target.querySelectorAll('.skill-fill');
          fills.forEach(function (fill) {
            var width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
            fill.classList.add('animated');
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.skill-category').forEach(function (cat) {
    skillObserver.observe(cat);
  });

  // --- 8. Timeline expand/collapse ---
  document.querySelectorAll('.timeline-expand-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var details = btn.closest('.timeline-card').querySelector('.timeline-details');
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        details.style.maxHeight = '0';
      } else {
        details.style.maxHeight = details.scrollHeight + 'px';
      }
    });
  });

  // --- 9. Back to top ---
  function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 10. Parallax floating shapes ---
  function handleParallax() {
    var scrollY = window.scrollY;
    heroShapes.forEach(function (shape, i) {
      var speed = (i + 1) * 0.03;
      shape.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
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
        handleParallax();
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
