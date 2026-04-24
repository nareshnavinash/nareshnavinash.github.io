import "./modulepreload-polyfill-B5Qt9EMX.js";
const h = "/world.html", p = "/profile.html";
function k() {
  const t = new URLSearchParams(location.search).get("go");
  return t === "world" ? (location.assign(h), true) : t === "profile" ? (location.assign(p), true) : false;
}
function y() {
  const t = document.getElementById("boot-chooser");
  t && (t.classList.add("is-ready"), t.removeAttribute("aria-hidden"), E());
}
function u(t, o, n) {
  document.body.classList.add("is-entering"), n.classList.add("is-fading"), o === p && sessionStorage.setItem("seen-intro-v2", "1");
  const e = document.createElement("div");
  Object.assign(e.style, { position: "fixed", inset: "0", zIndex: "9999", background: "#080818", opacity: "0", transition: "opacity 0.3s ease", pointerEvents: "none" }), document.body.appendChild(e), requestAnimationFrame(() => {
    e.style.opacity = "1";
  }), setTimeout(() => location.assign(o), 320);
}
let f = false;
function E() {
  if (f) return;
  f = true;
  const t = document.getElementById("boot-panel-world"), o = document.getElementById("boot-panel-profile"), n = () => u(t, h, o), e = () => u(o, p, t), s = (a) => (i) => {
    i.target instanceof HTMLElement && i.target.closest("a.boot-chooser__cta") && i.preventDefault(), a();
  };
  t.addEventListener("click", s(n)), o.addEventListener("click", s(e));
  const r = (a) => (i) => {
    (i.key === "Enter" || i.key === " ") && (i.preventDefault(), a());
  };
  t.addEventListener("keydown", r(n)), o.addEventListener("keydown", r(e));
}
function b() {
  if (document.getElementById("boot-splash-styles")) return;
  const t = document.createElement("style");
  t.id = "boot-splash-styles", t.textContent = `
        .intro-splash {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: #0b0820;
            display: grid;
            place-items: center;
            color: #f0eafa;
            transition: opacity 0.7s ease, visibility 0.7s;
        }
        .intro-splash.gone {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
        .intro-content {
            text-align: center;
            max-width: 80ch;
            padding: 0 40px;
        }
        .intro-bar {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'VT323', monospace;
            font-size: 16px;
            letter-spacing: 0.08em;
            color: rgba(240, 234, 250, 0.6);
            margin-bottom: 32px;
        }
        .intro-bar::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #2fe0a9;
            box-shadow: 0 0 14px #2fe0a9;
            animation: boot-pulse 1.4s ease-in-out infinite;
        }
        .intro-name {
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-size: clamp(48px, 9vw, 120px);
            letter-spacing: -0.03em;
            line-height: 0.95;
            margin: 0 0 18px;
            min-height: 1.1em;
        }
        .intro-name .cursor-pipe {
            display: inline-block;
            width: 0.08em;
            height: 0.85em;
            background: #2fe0a9;
            margin-left: 0.04em;
            vertical-align: -0.08em;
            animation: boot-blink 0.9s steps(2) infinite;
        }
        .intro-tag {
            font-family: 'Caveat', cursive;
            font-size: clamp(22px, 3vw, 34px);
            color: #2fe0a9;
            margin: 0 0 40px;
            opacity: 0;
            transition: opacity 0.5s 0.4s ease;
        }
        .intro-tag.on { opacity: 1; }
        .intro-hint {
            font-family: 'VT323', monospace;
            font-size: 15px;
            color: rgba(240, 234, 250, 0.45);
            opacity: 0;
            transition: opacity 0.5s 0.8s ease;
        }
        .intro-hint.on { opacity: 1; }
        .intro-skip {
            position: absolute;
            bottom: 30px;
            right: 40px;
            background: transparent;
            border: 1px solid rgba(240, 234, 250, 0.2);
            color: rgba(240, 234, 250, 0.7);
            padding: 8px 16px;
            border-radius: 20px;
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .intro-skip:hover {
            border-color: #2fe0a9;
            color: #2fe0a9;
        }
        @keyframes boot-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
        }
        @keyframes boot-blink {
            50% { opacity: 0; }
        }
    `, document.head.appendChild(t);
}
function v() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const e = document.createElement("div");
    return e.className = "intro-splash", e.innerHTML = `
            <div class="intro-content">
                <div class="intro-bar">naresh.ai \xB7 booting</div>
                <h1 class="intro-name">Naresh Sekar</h1>
                <p class="intro-tag on">engineering manager \xB7 ai adoption</p>
            </div>
        `, document.body.appendChild(e), new Promise((s) => {
      setTimeout(() => {
        e.classList.add("gone"), setTimeout(() => {
          e.remove(), s();
        }, 700);
      }, 1200);
    });
  }
  const o = "Naresh Sekar", n = document.createElement("div");
  return n.className = "intro-splash", n.innerHTML = `
        <div class="intro-content">
            <div class="intro-bar">naresh.ai \xB7 booting</div>
            <h1 class="intro-name">
                <span class="typed" id="boot-typed"></span>
                <span class="cursor-pipe"></span>
            </h1>
            <p class="intro-tag" id="boot-tag">engineering manager \xB7 ai adoption</p>
            <p class="intro-hint" id="boot-hint">press any key or wait</p>
        </div>
        <button class="intro-skip" id="boot-skip">skip \u2192</button>
    `, document.body.appendChild(n), new Promise((e) => {
    const s = document.getElementById("boot-typed"), r = document.getElementById("boot-tag"), a = document.getElementById("boot-hint"), i = document.getElementById("boot-skip");
    let c = false, d = 0;
    const l = () => {
      c || (c = true, n.classList.add("gone"), sessionStorage.setItem("seen-intro-v2", "1"), setTimeout(() => {
        n.remove(), e();
      }, 800));
    }, m = () => {
      c || (d <= o.length ? (s.textContent = o.slice(0, d), d++, setTimeout(m, 90)) : (r.classList.add("on"), setTimeout(() => a.classList.add("on"), 400), setTimeout(l, 1600)));
    };
    setTimeout(m, 200), i.addEventListener("click", l), window.addEventListener("keydown", (x) => {
      x.target.matches("input,textarea") || l();
    }, { once: true });
  });
}
function g() {
  k() || (b(), v().then(() => y()));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", g) : g();
window.addEventListener("pageshow", (t) => {
  if (!t.persisted) return;
  document.querySelectorAll("body > div").forEach((e) => {
    e.style.zIndex === "9999" && e.style.position === "fixed" && e.remove();
  }), document.body.classList.remove("is-entering"), document.querySelectorAll(".boot-chooser__panel").forEach((e) => e.classList.remove("is-fading"));
  const o = document.getElementById("boot-chooser");
  o && (o.classList.remove("is-ready"), o.setAttribute("aria-hidden", "true"));
  const n = document.querySelector(".intro-splash");
  n && n.remove(), sessionStorage.removeItem("seen-intro-v2"), b(), v().then(() => y());
});
