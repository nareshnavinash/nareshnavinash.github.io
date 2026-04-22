/* depth.js — Cinematic depth for Profile v2
   Replaces the old Three.js bubbles.
     1) Per-card mouse-follow glow (sets --mx/--my on hover)
     2) Tilt + inner parallax on cards
     3) Sticky diorama driver (About section)
     4) Sticky horizontal career driver
     5) Scroll reveal with depth
     6) Subtle nebula parallax
*/

(() => {
  'use strict';

  // ---------- 1. per-card mouse glow + tilt ----------
  function initCards() {
    const selector = [
      '.about-card', '.lead-card', '.write-card', '.skill-cat', '.cert',
      '.contact-card', '.book', '.impact__cell',
      '.stage-card', '.career-cine__track .career-item',
    ].join(',');

    document.querySelectorAll(selector).forEach((card) => {
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform, box-shadow';

      // float inner content toward viewer
      const innerLift = card.matches('.stage-card') ? 28 : 22;
      [...card.children].forEach((ch) => {
        ch.style.transform = `translateZ(${innerLift}px)`;
        ch.style.transformStyle = 'preserve-3d';
      });

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');

        // skip tilt for the big stage-cards (controlled by diorama driver)
        // and career cards (controlled by horizontal driver)
        if (card.matches('.stage-card, .career-cine__track .career-item')) return;
        const rx = (0.5 - py) * 8;
        const ry = (px - 0.5) * 10;
        card.style.transform =
          `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      };
      const onLeave = () => {
        if (card.matches('.stage-card, .career-cine__track .career-item')) return;
        card.style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  // ---------- 2. sticky diorama (About) ----------
  function initDiorama() {
    const dio = document.getElementById('diorama');
    if (!dio) return;
    const cards = [...dio.querySelectorAll('.stage-card')];
    const dots  = [...dio.querySelectorAll('.diorama__progress span')];
    if (!cards.length) return;

    const positionFor = (i, idx, frac) => {
      // returns {tx, ty, tz, rot, opacity, scale, z}
      if (i < idx) {
        // already left the stage (flown up + receded)
        return { tx: -90, ty: -180, tz: -500, rot: -35, opacity: 0, scale: 0.7, z: 1 };
      }
      if (i === idx) {
        // current — starts center, drifts out as frac→1
        return {
          tx: -frac * 80,
          ty: -frac * 140,
          tz: -frac * 300,
          rot: -frac * 30,
          opacity: 1 - frac * 0.95,
          scale: 1 - frac * 0.15,
          z: 30,
        };
      }
      if (i === idx + 1) {
        // incoming — arrives from below-right, recedes → centers
        return {
          tx: (1 - frac) * 90,
          ty: (1 - frac) * 200,
          tz: (1 - frac) * -500,
          rot: (1 - frac) * 38,
          opacity: frac,
          scale: 0.78 + frac * 0.22,
          z: 20,
        };
      }
      // still off-stage in the queue
      return { tx: 110, ty: 260, tz: -600, rot: 45, opacity: 0, scale: 0.7, z: 1 };
    };

    const update = () => {
      const r = dio.getBoundingClientRect();
      const total = dio.offsetHeight - innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      const step = p * cards.length;       // e.g. 0..3 for 3 cards
      const idx = Math.min(cards.length - 1, Math.floor(step));
      const frac = Math.min(1, step - idx);

      cards.forEach((c, i) => {
        const s = positionFor(i, idx, frac);
        c.style.zIndex = s.z;
        c.style.opacity = s.opacity;
        c.style.transform =
          `translate(-50%, -50%) ` +
          `translate3d(${s.tx}px, ${s.ty}px, ${s.tz}px) ` +
          `rotateY(${s.rot}deg) rotateX(${s.rot * 0.25}deg) ` +
          `scale(${s.scale})`;
      });

      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  // ---------- 2b. sticky diorama (Leadership) ----------
  function initLeadDio() {
    const dio = document.getElementById('lead-dio');
    if (!dio) return;
    const cards = [...dio.querySelectorAll('.lead-stage-card')];
    const dots  = [...dio.querySelectorAll('.lead-dio__progress span')];
    if (!cards.length) return;

    const positionFor = (i, idx, frac) => {
      if (i < idx) return { tx: -100, ty: -160, tz: -480, rot: -30, opacity: 0, scale: 0.72, z: 1 };
      if (i === idx) {
        return {
          tx: -frac * 80, ty: -frac * 130, tz: -frac * 280, rot: -frac * 26,
          opacity: 1 - frac * 0.95, scale: 1 - frac * 0.14, z: 30,
        };
      }
      if (i === idx + 1) {
        return {
          tx: (1 - frac) * 90, ty: (1 - frac) * 190, tz: (1 - frac) * -480, rot: (1 - frac) * 34,
          opacity: frac, scale: 0.8 + frac * 0.2, z: 20,
        };
      }
      return { tx: 110, ty: 250, tz: -580, rot: 42, opacity: 0, scale: 0.72, z: 1 };
    };

    const update = () => {
      const r = dio.getBoundingClientRect();
      const total = dio.offsetHeight - innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      const step = p * cards.length;
      const idx = Math.min(cards.length - 1, Math.floor(step));
      const frac = Math.min(1, step - idx);

      cards.forEach((c, i) => {
        const s = positionFor(i, idx, frac);
        c.style.zIndex = s.z;
        c.style.opacity = s.opacity;
        c.style.transform =
          `translate(-50%, -50%) ` +
          `translate3d(${s.tx}px, ${s.ty}px, ${s.tz}px) ` +
          `rotateY(${s.rot}deg) rotateX(${s.rot * 0.25}deg) ` +
          `scale(${s.scale})`;
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    // run after app.js populates cards
    setTimeout(update, 200);
  }

  // ---------- 3. sticky horizontal career ----------
  function initCareer() {
    const wrap  = document.getElementById('career-cine');
    const track = document.getElementById('career-list');
    const fill  = document.getElementById('career-fill');
    const nowEl = document.getElementById('career-now');
    if (!wrap || !track) return;

    const update = () => {
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      const max = Math.max(0, track.scrollWidth - innerWidth + 40);
      track.style.transform = `translate3d(${-p * max}px, 0, 0)`;
      if (fill) fill.style.width = (p * 100).toFixed(1) + '%';

      if (nowEl) {
        const cards = track.children;
        // pick the card whose center is closest to viewport center
        const vc = innerWidth / 2;
        let bestIdx = 0, bestDist = Infinity;
        for (let i = 0; i < cards.length; i++) {
          const cr = cards[i].getBoundingClientRect();
          const cc = cr.left + cr.width / 2;
          const d = Math.abs(cc - vc);
          if (d < bestDist) { bestDist = d; bestIdx = i; }
        }
        const role  = cards[bestIdx].querySelector('.career-item__role')?.textContent || '';
        const co    = cards[bestIdx].querySelector('.career-item__co')?.textContent.replace(/^at\s*/, '') || '';
        nowEl.textContent = role + (co ? ' · ' + co : '');
      }
    };

    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    // run after app.js has populated the cards
    setTimeout(update, 200);
  }

  // ---------- 4. depth scroll reveal ----------
  function initReveal() {
    const tag = (sel) => document.querySelectorAll(sel).forEach((n) => {
      if (!n.hasAttribute('data-depth-reveal')) n.setAttribute('data-depth-reveal', '');
    });
    tag('.section__eyebrow, .section__title, .section__sub, .about-card, .lead-card, .write-card, .skill-cat, .cert, .contact-card, .book, .impact__cell, .career-cine__head, .diorama__copy');

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('[data-depth-reveal]').forEach((n) => io.observe(n));
  }

  // ---------- 5. nebula parallax ----------
  function initNebula() {
    const n = document.querySelector('.nebula');
    if (!n) return;
    addEventListener('scroll', () => {
      n.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
    }, { passive: true });
  }

  // ---------- 6. repo-card mouse-tracked spotlight ----------
  function initRepoCards() {
    const cards = document.querySelectorAll('.repo-card');
    cards.forEach((c) => {
      c.addEventListener('mousemove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  // ---------- 7. writing column — rail progress + row reveal ----------
  function initWritingCol() {
    const col = document.querySelector('.writing-col');
    if (!col) return;
    const rows = col.querySelectorAll('.writing-row');

    // staggered fade-in on enter
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    rows.forEach((r) => io.observe(r));

    // rail progress tied to scroll through the column
    const updateRail = () => {
      const r = col.getBoundingClientRect();
      const h = col.offsetHeight;
      const vh = innerHeight;
      // progress is (viewport bottom - col top) / (col height + viewport)
      const p = Math.max(0, Math.min(1, (vh - r.top) / (h + vh * 0.5)));
      col.style.setProperty('--writing-progress', (p * 100).toFixed(1) + '%');
    };
    addEventListener('scroll', updateRail, { passive: true });
    addEventListener('resize', updateRail);
    updateRail();
  }

  // ---------- boot ----------
  // Static-content inits run as soon as the DOM is parsed.
  // Dynamic-content inits (cards/diorama/career/repos/writing) depend on
  // app.js having populated the DOM from resume.json — they wait for the
  // `resume-loaded` event it dispatches. A setTimeout fallback still runs
  // them if the event never fires (e.g. when prerendered HTML is all we have).
  let dynamicInited = false;
  const initDynamic = () => {
    if (dynamicInited) return;
    dynamicInited = true;
    initCards();
    initDiorama();
    initLeadDio();
    initCareer();
    initRepoCards();
    initWritingCol();
  };

  const onReady = () => {
    initNebula();
    initReveal();
    setTimeout(initDynamic, 800);
  };

  document.addEventListener('resume-loaded', initDynamic);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
