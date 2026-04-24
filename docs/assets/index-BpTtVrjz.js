import "./modulepreload-polyfill-B5Qt9EMX.js";
const y = "/world.html", l = "/profile.html";
function x() {
  const e = new URLSearchParams(location.search).get("go");
  return e === "world" ? (location.assign(y), true) : e === "profile" ? (location.assign(l), true) : false;
}
function g() {
  const e = document.getElementById("boot-chooser");
  e && (e.classList.add("is-ready"), e.removeAttribute("aria-hidden"), k());
}
function m(e, t, i) {
  document.body.classList.add("is-entering"), i.classList.add("is-fading"), t === l && sessionStorage.setItem("seen-intro-v2", "1");
  const o = document.createElement("div");
  Object.assign(o.style, { position: "fixed", inset: "0", zIndex: "9999", background: "#080818", opacity: "0", transition: "opacity 0.3s ease", pointerEvents: "none" }), document.body.appendChild(o), requestAnimationFrame(() => {
    o.style.opacity = "1";
  }), setTimeout(() => location.assign(t), 320);
}
let u = false;
function k() {
  if (u) return;
  u = true;
  const e = document.getElementById("boot-panel-world"), t = document.getElementById("boot-panel-profile"), i = () => m(e, y, t), o = () => m(t, l, e), a = (s) => (n) => {
    n.target instanceof HTMLElement && n.target.closest("a.boot-chooser__cta") && n.preventDefault(), s();
  };
  e.addEventListener("click", a(i)), t.addEventListener("click", a(o));
  const r = (s) => (n) => {
    (n.key === "Enter" || n.key === " ") && (n.preventDefault(), s());
  };
  e.addEventListener("keydown", r(i)), t.addEventListener("keydown", r(o));
}
function h() {
  if (document.getElementById("boot-splash-styles")) return;
  const e = document.createElement("style");
  e.id = "boot-splash-styles", e.textContent = `
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
    `, document.head.appendChild(e);
}
function b() {
  const e = "Naresh Sekar", t = document.createElement("div");
  return t.className = "intro-splash", t.innerHTML = `
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
    `, document.body.appendChild(t), new Promise((i) => {
    const o = document.getElementById("boot-typed"), a = document.getElementById("boot-tag"), r = document.getElementById("boot-hint"), s = document.getElementById("boot-skip");
    let n = false, c = 0;
    const d = () => {
      n || (n = true, t.classList.add("gone"), sessionStorage.setItem("seen-intro-v2", "1"), setTimeout(() => {
        t.remove(), i();
      }, 800));
    }, p = () => {
      n || (c <= e.length ? (o.textContent = e.slice(0, c), c++, setTimeout(p, 90)) : (a.classList.add("on"), setTimeout(() => r.classList.add("on"), 400), setTimeout(d, 1600)));
    };
    setTimeout(p, 200), s.addEventListener("click", d), window.addEventListener("keydown", (v) => {
      v.target.matches("input,textarea") || d();
    }, { once: true });
  });
}
function f() {
  x() || (h(), b().then(() => g()));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", f) : f();
window.addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  document.querySelectorAll("body > div").forEach((o) => {
    o.style.zIndex === "9999" && o.style.position === "fixed" && o.remove();
  }), document.body.classList.remove("is-entering"), document.querySelectorAll(".boot-chooser__panel").forEach((o) => o.classList.remove("is-fading"));
  const t = document.getElementById("boot-chooser");
  t && (t.classList.remove("is-ready"), t.setAttribute("aria-hidden", "true"));
  const i = document.querySelector(".intro-splash");
  i && i.remove(), sessionStorage.removeItem("seen-intro-v2"), h(), b().then(() => g());
});
