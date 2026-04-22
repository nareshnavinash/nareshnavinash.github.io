/* ==========================================================================
   enhancements.js — Profile v2 additions
   Intro splash · hero fly-in · magnetic buttons · end-card
   Reduced-motion awareness
   ========================================================================== */

(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    kids.flat().forEach(k => k != null && n.append(k.nodeType ? k : document.createTextNode(k)));
    return n;
  };

  // ---------- 1. Intro splash ----------
  function mountIntro() {
    if (reduced || sessionStorage.getItem('seen-intro-v2')) return Promise.resolve();

    const NAME = 'Naresh Sekar';
    const splash = el('div', { class: 'intro-splash' },
      el('div', { class: 'intro-content' },
        el('div', { class: 'intro-bar' }, 'naresh.ai · booting'),
        el('h1', { class: 'intro-name' },
          el('span', { class: 'typed', id: 'intro-typed' }, ''),
          el('span', { class: 'cursor-pipe' })
        ),
        el('p', { class: 'intro-tag', id: 'intro-tag' }, 'engineering manager · ai adoption'),
        el('p', { class: 'intro-hint', id: 'intro-hint' }, 'press any key or wait'),
      ),
      el('button', { class: 'intro-skip', onclick: () => dismiss() }, 'skip →')
    );
    document.body.appendChild(splash);

    return new Promise(resolve => {
      const typed = $('#intro-typed');
      const tag = $('#intro-tag');
      const hint = $('#intro-hint');
      let i = 0;
      const typeNext = () => {
        if (i <= NAME.length) {
          typed.textContent = NAME.slice(0, i);
          i++;
          setTimeout(typeNext, 90);
        } else {
          tag.classList.add('on');
          setTimeout(() => hint.classList.add('on'), 400);
          setTimeout(dismiss, 1600);
        }
      };
      setTimeout(typeNext, 200);

      const dismiss = () => {
        splash.classList.add('gone');
        sessionStorage.setItem('seen-intro-v2', '1');
        setTimeout(() => { splash.remove(); resolve(); }, 800);
      };
      const onKey = (e) => { if (!e.target.matches('input,textarea')) { dismiss(); window.removeEventListener('keydown', onKey); } };
      window.addEventListener('keydown', onKey, { once: true });
    });
  }

  // ---------- 2. Hero title fly-in ----------
  function mountHeroFlyIn() {
    const title = $('.hero__title');
    if (!title) return;

    // Wrap each word/char in spans for individual animation
    const wrap = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach(word => {
          if (/^\s+$/.test(word)) { frag.appendChild(document.createTextNode(word)); return; }
          const wSpan = document.createElement('span');
          wSpan.className = 'word';
          [...word].forEach(ch => {
            const cSpan = document.createElement('span');
            cSpan.className = 'char';
            cSpan.textContent = ch;
            wSpan.appendChild(cSpan);
          });
          frag.appendChild(wSpan);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        [...node.childNodes].forEach(wrap);
      }
    };
    [...title.childNodes].forEach(wrap);

    // Stagger reveal
    const chars = $$('.char', title);
    chars.forEach((c, i) => { c.style.transitionDelay = `${Math.min(i * 22, 1500)}ms`; });
    requestAnimationFrame(() => {
      setTimeout(() => title.classList.add('revealed'), 60);
    });
  }

  // ---------- 3. Magnetic links ----------
  function mountMagnetic() {
    if (reduced) return;
    const selectors = [
      '.nav__cta',
      '.ask__input button',
      '.scroll-btn',
      '.footer-end__socials a',
      '.book__info a',
      '#theme-btn',
    ];
    selectors.forEach(sel => $$(sel).forEach(node => {
      node.classList.add('magnetic');
      const strength = 0.35;
      node.addEventListener('mousemove', (e) => {
        const r = node.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        node.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      node.addEventListener('mouseleave', () => { node.style.transform = 'translate(0,0)'; });
    }));
  }

  // ---------- 4. End card footer ----------
  function mountEndCard() {
    const existing = $('.footer');
    if (!existing) return;

    const bootTime = new Date();
    const end = el('div', { class: 'footer-end', id: 'contact' },
      el('h2', { class: 'footer-end__name' }, 'Naresh Sekar'),
      el('div', { class: 'footer-end__run' },
        el('span', { class: 'dot' }),
        el('span', { html: `runtime · <span id="runtime">0:00</span>` }),
      ),
      el('div', { class: 'footer-end__socials' },
        el('a', { href: 'mailto:nareshnavinash@gmail.com' }, 'email'),
        el('a', { href: 'https://www.linkedin.com/in/nareshnavinash/', target: '_blank', rel: 'noreferrer' }, 'linkedin'),
        el('a', { href: 'https://github.com/nareshnavinash', target: '_blank', rel: 'noreferrer' }, 'github'),
        el('a', { href: 'https://medium.com/@nareshnavinash', target: '_blank', rel: 'noreferrer' }, 'medium'),
        el('a', { href: 'https://x.com/navinashnaresh', target: '_blank', rel: 'noreferrer' }, 'x'),
      ),
      el('div', { class: 'footer-end__meta' },
        el('span', {}, `© ${new Date().getFullYear()} · built with vanilla html, css & a sprinkle of AI`),
      )
    );
    existing.replaceWith(end);

    // live runtime counter
    setInterval(() => {
      const elp = $('#runtime'); if (!elp) return;
      const sec = Math.floor((Date.now() - bootTime) / 1000);
      const m = Math.floor(sec / 60); const s = sec % 60;
      elp.textContent = `${m}:${String(s).padStart(2, '0')}`;
    }, 1000);
  }

  // ---------- boot ----------
  document.addEventListener('DOMContentLoaded', async () => {
    const embedded = document.documentElement.classList.contains('is-embedded');

    mountEndCard();
    mountMagnetic();

    if (embedded) {
      // In embed mode (boot chooser iframe) skip the intro splash and hero
      // fly-in — we are a blurred preview, not the interactive page.
      return;
    }

    // Intro splash; once done, run hero fly-in
    await mountIntro();
    mountHeroFlyIn();
  });
})();
