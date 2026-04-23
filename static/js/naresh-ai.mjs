function Ue(s) {
  const e = [], t = s.personal || {}, n = s.site || {};
  if (t.name) {
    const l = t.mission || t.bio || "";
    e.push({
      id: "bio",
      section: "about",
      label: t.name,
      text: `${t.name} is an ${t.title || "Engineering Manager"}. ${l}`
    });
  }
  const i = s.rawResume || {}, o = i.about?.cards || [];
  if (o.forEach((l, y) => {
    e.push({
      id: `about:${y}`,
      section: "about",
      label: `About - ${l.title}`,
      text: `About - ${l.title}: ${l.description}`
    });
  }), !o.length) {
    const l = n?.seo?.description || "";
    l && e.push({
      id: "about:summary",
      section: "about",
      label: "About",
      text: `About Naresh Sekar: ${l}`
    });
  }
  (s.career || []).forEach((l, y) => {
    if (l.isTail) return;
    const E = Ge(l.desc || ""), C = `${t.name || "Naresh Sekar"} worked as ${l.role} at ${l.co} (${l.date}). ${E}`;
    e.push({
      id: `career:${y}`,
      section: "career",
      label: `${l.role} at ${l.co}`,
      text: C,
      meta: { idx: y, co: l.co, role: l.role, date: l.date }
    });
  }), (s.skills || []).forEach((l, y) => {
    e.push({
      id: `skill:${y}`,
      section: "skills",
      label: `Skills - ${l.name}`,
      text: `Skills - ${l.name}: ${l.items.join(", ")}`
    });
  }), (s.leadership || []).forEach((l, y) => {
    e.push({
      id: `leadership:${y}`,
      section: "leadership",
      label: `Leadership - ${l.t}`,
      text: `Leadership - ${l.t}: ${l.d}`
    });
  }), (s.reposStarred || []).forEach((l, y) => {
    const E = l.tags?.join(", ") || "";
    e.push({
      id: `repo:starred:${y}`,
      section: "repos",
      label: l.name,
      text: `Open source repo: ${l.name} - ${l.tagline || l.desc}. Language: ${l.language || "N/A"}. Tags: ${E}`,
      meta: { kind: "Starred", idx: y, name: l.name, url: l.url }
    });
  }), (s.reposRecent || []).forEach((l, y) => {
    const E = l.tags?.join(", ") || "";
    e.push({
      id: `repo:recent:${y}`,
      section: "repos",
      label: l.name,
      text: `Recent project: ${l.name} - ${l.tagline || l.desc}. Language: ${l.language || "N/A"}. Tags: ${E}`,
      meta: { kind: "Recent", idx: y, name: l.name, url: l.url }
    });
  }), (s.articlesPinned || []).forEach((l, y) => {
    const E = l.tags?.join(", ") || "";
    e.push({
      id: `article:pinned:${y}`,
      section: "writing",
      label: l.title,
      text: `Article: ${l.title} (${l.date}). ${l.desc} Tags: ${E}`,
      meta: { kind: "Pinned", idx: y, title: l.title, url: l.url }
    });
  }), (s.articlesRecent || []).forEach((l, y) => {
    const E = l.tags?.join(", ") || "";
    e.push({
      id: `article:recent:${y}`,
      section: "writing",
      label: l.title,
      text: `Article: ${l.title} (${l.date}). ${l.desc} Tags: ${E}`,
      meta: { kind: "Recent", idx: y, title: l.title, url: l.url }
    });
  });
  const h = s.certs || [];
  if (h.length) {
    const l = h.map((y) => `${y.name} (${y.issuer})`).join(", ");
    e.push({
      id: "certs",
      section: "certs",
      label: "Certifications",
      text: `Certifications: ${l}`
    });
  }
  const k = i.education;
  k && e.push({
    id: "education",
    section: "education",
    label: "Education",
    text: `Education: ${k.degree || ""}, ${k.school || ""}, ${k.period || ""}, ${k.location || ""}`
  });
  const m = i.publications?.book;
  return m && e.push({
    id: "book",
    section: "writing",
    label: m.title,
    text: `Book: ${m.title} by ${m.author || "Naresh Sekar"}. ${m.description || ""} Published on ${m.publisher || "Amazon Kindle"}.`
  }), e;
}
function Ge(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function B(s) {
  return Array.isArray ? Array.isArray(s) : Fe(s) === "[object Array]";
}
function Ye(s) {
  if (typeof s == "string")
    return s;
  if (typeof s == "bigint")
    return s.toString();
  const e = s + "";
  return e == "0" && 1 / s == -1 / 0 ? "-0" : e;
}
function ne(s) {
  return s == null ? "" : Ye(s);
}
function A(s) {
  return typeof s == "string";
}
function Y(s) {
  return typeof s == "number";
}
function qe(s) {
  return s === !0 || s === !1 || Qe(s) && Fe(s) == "[object Boolean]";
}
function $e(s) {
  return typeof s == "object";
}
function Qe(s) {
  return $e(s) && s !== null;
}
function x(s) {
  return s != null;
}
function U(s) {
  return !s.trim().length;
}
function Fe(s) {
  return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const Ve = "Incorrect 'index' type", Xe = (s) => `Invalid value for key ${s}`, Je = (s) => `Pattern length exceeds max of ${s}.`, Ze = (s) => `Missing ${s} property in key`, et = (s) => `Property 'weight' in key '${s}' must be a positive integer`, be = Object.prototype.hasOwnProperty;
class tt {
  constructor(e) {
    this._keys = [], this._keyMap = {};
    let t = 0;
    e.forEach((n) => {
      const i = Be(n);
      this._keys.push(i), this._keyMap[i.id] = i, t += i.weight;
    }), this._keys.forEach((n) => {
      n.weight /= t;
    });
  }
  get(e) {
    return this._keyMap[e];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function Be(s) {
  let e = null, t = null, n = null, i = 1, o = null;
  if (A(s) || B(s))
    n = s, e = Ae(s), t = ie(s);
  else {
    if (!be.call(s, "name"))
      throw new Error(Ze("name"));
    const a = s.name;
    if (n = a, be.call(s, "weight") && (i = s.weight, i <= 0))
      throw new Error(et(a));
    e = Ae(a), t = ie(a), o = s.getFn;
  }
  return {
    path: e,
    id: t,
    weight: i,
    src: n,
    getFn: o
  };
}
function Ae(s) {
  return B(s) ? s : s.split(".");
}
function ie(s) {
  return B(s) ? s.join(".") : s;
}
function st(s, e) {
  const t = [];
  let n = !1;
  const i = (o, a, r, c) => {
    if (x(o))
      if (!a[r])
        t.push(c !== void 0 ? {
          v: o,
          i: c
        } : o);
      else {
        const d = a[r], u = o[d];
        if (!x(u))
          return;
        if (r === a.length - 1 && (A(u) || Y(u) || qe(u) || typeof u == "bigint"))
          t.push(c !== void 0 ? {
            v: ne(u),
            i: c
          } : ne(u));
        else if (B(u)) {
          n = !0;
          for (let f = 0, p = u.length; f < p; f += 1)
            i(u[f], a, r + 1, f);
        } else a.length && i(u, a, r + 1, c);
      }
  };
  return i(s, A(e) ? e.split(".") : e, 0), n ? t : t[0];
}
const nt = {
  includeMatches: !1,
  findAllMatches: !1,
  minMatchCharLength: 1
}, it = {
  isCaseSensitive: !1,
  ignoreDiacritics: !1,
  includeScore: !1,
  keys: [],
  shouldSort: !0,
  sortFn: (s, e) => s.score === e.score ? s.idx < e.idx ? -1 : 1 : s.score < e.score ? -1 : 1
}, rt = {
  location: 0,
  threshold: 0.6,
  distance: 100
}, ot = {
  useExtendedSearch: !1,
  useTokenSearch: !1,
  getFn: st,
  ignoreLocation: !1,
  ignoreFieldNorm: !1,
  fieldNormWeight: 1
}, g = Object.freeze({
  ...it,
  ...nt,
  ...rt,
  ...ot
}), ct = /[^ ]+/g;
function at(s = 1, e = 3) {
  const t = /* @__PURE__ */ new Map(), n = Math.pow(10, e);
  return {
    get(i) {
      const o = i.match(ct).length;
      if (t.has(o))
        return t.get(o);
      const a = 1 / Math.pow(o, 0.5 * s), r = parseFloat(Math.round(a * n) / n);
      return t.set(o, r), r;
    },
    clear() {
      t.clear();
    }
  };
}
class fe {
  constructor({
    getFn: e = g.getFn,
    fieldNormWeight: t = g.fieldNormWeight
  } = {}) {
    this.norm = at(t, 3), this.getFn = e, this.isCreated = !1, this.docs = [], this.keys = [], this._keysMap = {}, this.setIndexRecords();
  }
  setSources(e = []) {
    this.docs = e;
  }
  setIndexRecords(e = []) {
    this.records = e;
  }
  setKeys(e = []) {
    this.keys = e, this._keysMap = {}, e.forEach((t, n) => {
      this._keysMap[t.id] = n;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, A(this.docs[0]) ? this.docs.forEach((e, t) => {
      this._addString(e, t);
    }) : this.docs.forEach((e, t) => {
      this._addObject(e, t);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(e) {
    const t = this.size();
    A(e) ? this._addString(e, t) : this._addObject(e, t);
  }
  // Removes the doc at the specified index of the index
  removeAt(e) {
    this.records.splice(e, 1);
    for (let t = e, n = this.size(); t < n; t += 1)
      this.records[t].i -= 1;
  }
  // Removes docs at the specified indices (must be sorted ascending)
  removeAll(e) {
    for (let t = e.length - 1; t >= 0; t -= 1)
      this.records.splice(e[t], 1);
    for (let t = 0, n = this.records.length; t < n; t += 1)
      this.records[t].i = t;
  }
  getValueForItemAtKeyId(e, t) {
    return e[this._keysMap[t]];
  }
  size() {
    return this.records.length;
  }
  _addString(e, t) {
    if (!x(e) || U(e))
      return;
    const n = {
      v: e,
      i: t,
      n: this.norm.get(e)
    };
    this.records.push(n);
  }
  _addObject(e, t) {
    const n = {
      i: t,
      $: {}
    };
    this.keys.forEach((i, o) => {
      const a = i.getFn ? i.getFn(e) : this.getFn(e, i.path);
      if (x(a)) {
        if (B(a)) {
          const r = [];
          for (let c = 0, d = a.length; c < d; c += 1) {
            const u = a[c];
            if (x(u)) {
              if (A(u)) {
                if (!U(u)) {
                  const f = {
                    v: u,
                    i: c,
                    n: this.norm.get(u)
                  };
                  r.push(f);
                }
              } else if (x(u.v)) {
                const f = A(u.v) ? u.v : ne(u.v);
                if (!U(f)) {
                  const p = {
                    v: f,
                    i: u.i,
                    n: this.norm.get(f)
                  };
                  r.push(p);
                }
              }
            }
          }
          n.$[o] = r;
        } else if (A(a) && !U(a)) {
          const r = {
            v: a,
            n: this.norm.get(a)
          };
          n.$[o] = r;
        }
      }
    }), this.records.push(n);
  }
  toJSON() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      keys: this.keys.map(({
        getFn: e,
        ...t
      }) => t),
      records: this.records
    };
  }
}
function Le(s, e, {
  getFn: t = g.getFn,
  fieldNormWeight: n = g.fieldNormWeight
} = {}) {
  const i = new fe({
    getFn: t,
    fieldNormWeight: n
  });
  return i.setKeys(s.map(Be)), i.setSources(e), i.create(), i;
}
function ut(s, {
  getFn: e = g.getFn,
  fieldNormWeight: t = g.fieldNormWeight
} = {}) {
  const {
    keys: n,
    records: i
  } = s, o = new fe({
    getFn: e,
    fieldNormWeight: t
  });
  return o.setKeys(n), o.setIndexRecords(i), o;
}
function lt(s = [], e = g.minMatchCharLength) {
  const t = [];
  let n = -1, i = -1, o = 0;
  for (let a = s.length; o < a; o += 1) {
    const r = s[o];
    r && n === -1 ? n = o : !r && n !== -1 && (i = o - 1, i - n + 1 >= e && t.push([n, i]), n = -1);
  }
  return s[o - 1] && o - n >= e && t.push([n, o - 1]), t;
}
const N = 32;
function ht(s, e, t, {
  location: n = g.location,
  distance: i = g.distance,
  threshold: o = g.threshold,
  findAllMatches: a = g.findAllMatches,
  minMatchCharLength: r = g.minMatchCharLength,
  includeMatches: c = g.includeMatches,
  ignoreLocation: d = g.ignoreLocation
} = {}) {
  if (e.length > N)
    throw new Error(Je(N));
  const u = e.length, f = s.length, p = Math.max(0, Math.min(n, f));
  let h = o, k = p;
  const m = (w, M) => {
    const _ = w / u;
    if (d) return _;
    const j = Math.abs(p - M);
    return i ? _ + j / i : j ? 1 : _;
  }, l = r > 1 || c, y = l ? Array(f) : [];
  let E;
  for (; (E = s.indexOf(e, k)) > -1; ) {
    const w = m(0, E);
    if (h = Math.min(w, h), k = E + u, l) {
      let M = 0;
      for (; M < u; )
        y[E + M] = 1, M += 1;
    }
  }
  k = -1;
  let C = [], T = 1, W = u + f;
  const Ke = 1 << u - 1;
  for (let w = 0; w < u; w += 1) {
    let M = 0, _ = W;
    for (; M < _; )
      m(w, p + _) <= h ? M = _ : W = _, _ = Math.floor((W - M) / 2 + M);
    W = _;
    let j = Math.max(1, p - _ + 1);
    const ee = a ? f : Math.min(p + _, f) + u, O = Array(ee + 2);
    O[ee + 1] = (1 << w) - 1;
    for (let I = ee; I >= j; I -= 1) {
      const K = I - 1, Ee = t[s[K]];
      if (l && (y[K] = +!!Ee), O[I] = (O[I + 1] << 1 | 1) & Ee, w && (O[I] |= (C[I + 1] | C[I]) << 1 | 1 | C[I + 1]), O[I] & Ke && (T = m(w, K), T <= h)) {
        if (h = T, k = K, k <= p)
          break;
        j = Math.max(1, 2 * p - k);
      }
    }
    if (m(w + 1, p) > h)
      break;
    C = O;
  }
  const Z = {
    isMatch: k >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, T)
  };
  if (l) {
    const w = lt(y, r);
    w.length ? c && (Z.indices = w) : Z.isMatch = !1;
  }
  return Z;
}
function dt(s) {
  const e = {};
  for (let t = 0, n = s.length; t < n; t += 1) {
    const i = s.charAt(t);
    e[i] = (e[i] || 0) | 1 << n - t - 1;
  }
  return e;
}
function pe(s) {
  if (s.length <= 1) return s;
  s.sort((t, n) => t[0] - n[0] || t[1] - n[1]);
  const e = [s[0]];
  for (let t = 1, n = s.length; t < n; t += 1) {
    const i = e[e.length - 1], o = s[t];
    o[0] <= i[1] + 1 ? i[1] = Math.max(i[1], o[1]) : e.push(o);
  }
  return e;
}
const Te = {
  ł: "l",
  // ł
  Ł: "L",
  // Ł
  đ: "d",
  // đ
  Đ: "D",
  // Đ
  ø: "o",
  // ø
  Ø: "O",
  // Ø
  ħ: "h",
  // ħ
  Ħ: "H",
  // Ħ
  ŧ: "t",
  // ŧ
  Ŧ: "T",
  // Ŧ
  ı: "i",
  // ı
  ß: "ss"
  // ß
}, ft = new RegExp("[" + Object.keys(Te).join("") + "]", "g"), H = String.prototype.normalize ? (s) => s.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(ft, (e) => Te[e]) : (s) => s;
class ge {
  constructor(e, {
    location: t = g.location,
    threshold: n = g.threshold,
    distance: i = g.distance,
    includeMatches: o = g.includeMatches,
    findAllMatches: a = g.findAllMatches,
    minMatchCharLength: r = g.minMatchCharLength,
    isCaseSensitive: c = g.isCaseSensitive,
    ignoreDiacritics: d = g.ignoreDiacritics,
    ignoreLocation: u = g.ignoreLocation
  } = {}) {
    if (this.options = {
      location: t,
      threshold: n,
      distance: i,
      includeMatches: o,
      findAllMatches: a,
      minMatchCharLength: r,
      isCaseSensitive: c,
      ignoreDiacritics: d,
      ignoreLocation: u
    }, e = c ? e : e.toLowerCase(), e = d ? H(e) : e, this.pattern = e, this.chunks = [], !this.pattern.length)
      return;
    const f = (h, k) => {
      this.chunks.push({
        pattern: h,
        alphabet: dt(h),
        startIndex: k
      });
    }, p = this.pattern.length;
    if (p > N) {
      let h = 0;
      const k = p % N, m = p - k;
      for (; h < m; )
        f(this.pattern.substr(h, N), h), h += N;
      if (k) {
        const l = p - N;
        f(this.pattern.substr(l), l);
      }
    } else
      f(this.pattern, 0);
  }
  searchIn(e) {
    const {
      isCaseSensitive: t,
      ignoreDiacritics: n,
      includeMatches: i
    } = this.options;
    if (e = t ? e : e.toLowerCase(), e = n ? H(e) : e, this.pattern === e) {
      const m = {
        isMatch: !0,
        score: 0
      };
      return i && (m.indices = [[0, e.length - 1]]), m;
    }
    const {
      location: o,
      distance: a,
      threshold: r,
      findAllMatches: c,
      minMatchCharLength: d,
      ignoreLocation: u
    } = this.options, f = [];
    let p = 0, h = !1;
    this.chunks.forEach(({
      pattern: m,
      alphabet: l,
      startIndex: y
    }) => {
      const {
        isMatch: E,
        score: C,
        indices: T
      } = ht(e, m, l, {
        location: o + y,
        distance: a,
        threshold: r,
        findAllMatches: c,
        minMatchCharLength: d,
        includeMatches: i,
        ignoreLocation: u
      });
      E && (h = !0), p += C, E && T && f.push(...T);
    });
    const k = {
      isMatch: h,
      score: h ? p / this.chunks.length : 1
    };
    return h && i && (k.indices = pe(f)), k;
  }
}
class L {
  constructor(e) {
    this.pattern = e;
  }
  static isMultiMatch(e) {
    return we(e, this.multiRegex);
  }
  static isSingleMatch(e) {
    return we(e, this.singleRegex);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(e) {
    return {
      isMatch: !1,
      score: 1
    };
  }
}
function we(s, e) {
  const t = s.match(e);
  return t ? t[1] : null;
}
class pt extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(e) {
    const t = e === this.pattern;
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class gt extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(e) {
    const n = e.indexOf(this.pattern) === -1;
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class mt extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(e) {
    const t = e.startsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class yt extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(e) {
    const t = !e.startsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class kt extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(e) {
    const t = e.endsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [e.length - this.pattern.length, e.length - 1]
    };
  }
}
class Et extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(e) {
    const t = !e.endsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class Ne extends L {
  constructor(e, {
    location: t = g.location,
    threshold: n = g.threshold,
    distance: i = g.distance,
    includeMatches: o = g.includeMatches,
    findAllMatches: a = g.findAllMatches,
    minMatchCharLength: r = g.minMatchCharLength,
    isCaseSensitive: c = g.isCaseSensitive,
    ignoreDiacritics: d = g.ignoreDiacritics,
    ignoreLocation: u = g.ignoreLocation
  } = {}) {
    super(e), this._bitapSearch = new ge(e, {
      location: t,
      threshold: n,
      distance: i,
      includeMatches: o,
      findAllMatches: a,
      minMatchCharLength: r,
      isCaseSensitive: c,
      ignoreDiacritics: d,
      ignoreLocation: u
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(e) {
    return this._bitapSearch.searchIn(e);
  }
}
class Re extends L {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(e) {
    let t = 0, n;
    const i = [], o = this.pattern.length;
    for (; (n = e.indexOf(this.pattern, t)) > -1; )
      t = n + o, i.push([n, t - 1]);
    const a = !!i.length;
    return {
      isMatch: a,
      score: a ? 0 : 1,
      indices: i
    };
  }
}
const re = [pt, Re, mt, yt, Et, kt, gt, Ne], xe = re.length, bt = "\0", At = "|";
function wt(s) {
  const e = [], t = s.length;
  let n = 0;
  for (; n < t; ) {
    for (; n < t && s[n] === " "; ) n++;
    if (n >= t) break;
    let i = n;
    for (; i < t && s[i] !== " " && s[i] !== '"'; ) i++;
    if (i < t && s[i] === '"') {
      for (i++; i < t; ) {
        if (s[i] === '"') {
          const o = i + 1;
          if (o >= t || s[o] === " ") {
            i++;
            break;
          }
          if (s[o] === "$" && (o + 1 >= t || s[o + 1] === " ")) {
            i += 2;
            break;
          }
        }
        i++;
      }
      e.push(s.substring(n, i)), n = i;
    } else {
      for (; i < t && s[i] !== " "; ) i++;
      e.push(s.substring(n, i)), n = i;
    }
  }
  return e;
}
function xt(s, e = {}) {
  return s.replace(/\\\|/g, bt).split(At).map((n) => {
    const i = n.replace(/\u0000/g, "|"), o = wt(i.trim()).filter((r) => r && !!r.trim()), a = [];
    for (let r = 0, c = o.length; r < c; r += 1) {
      const d = o[r];
      let u = !1, f = -1;
      for (; !u && ++f < xe; ) {
        const p = re[f], h = p.isMultiMatch(d);
        h && (a.push(new p(h, e)), u = !0);
      }
      if (!u)
        for (f = -1; ++f < xe; ) {
          const p = re[f], h = p.isSingleMatch(d);
          if (h) {
            a.push(new p(h, e));
            break;
          }
        }
    }
    return a;
  });
}
const _t = /* @__PURE__ */ new Set([Ne.type, Re.type]);
class vt {
  constructor(e, {
    isCaseSensitive: t = g.isCaseSensitive,
    ignoreDiacritics: n = g.ignoreDiacritics,
    includeMatches: i = g.includeMatches,
    minMatchCharLength: o = g.minMatchCharLength,
    ignoreLocation: a = g.ignoreLocation,
    findAllMatches: r = g.findAllMatches,
    location: c = g.location,
    threshold: d = g.threshold,
    distance: u = g.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: t,
      ignoreDiacritics: n,
      includeMatches: i,
      minMatchCharLength: o,
      findAllMatches: r,
      ignoreLocation: a,
      location: c,
      threshold: d,
      distance: u
    }, e = t ? e : e.toLowerCase(), e = n ? H(e) : e, this.pattern = e, this.query = xt(this.pattern, this.options);
  }
  static condition(e, t) {
    return t.useExtendedSearch;
  }
  // Note: searchIn operates on a single text value and sets hasInverse on the
  // result when inverse patterns are involved. _searchObjectList uses this to
  // switch from "ANY key" to "ALL keys" aggregation. See #712.
  searchIn(e) {
    const t = this.query;
    if (!t)
      return {
        isMatch: !1,
        score: 1
      };
    const {
      includeMatches: n,
      isCaseSensitive: i,
      ignoreDiacritics: o
    } = this.options;
    e = i ? e : e.toLowerCase(), e = o ? H(e) : e;
    let a = 0;
    const r = [];
    let c = 0, d = !1;
    for (let u = 0, f = t.length; u < f; u += 1) {
      const p = t[u];
      r.length = 0, a = 0, d = !1;
      for (let h = 0, k = p.length; h < k; h += 1) {
        const m = p[h], {
          isMatch: l,
          indices: y,
          score: E
        } = m.search(e);
        if (l) {
          a += 1, c += E;
          const C = m.constructor.type;
          C.startsWith("inverse") && (d = !0), n && (_t.has(C) ? r.push(...y) : r.push(y));
        } else {
          c = 0, a = 0, r.length = 0, d = !1;
          break;
        }
      }
      if (a) {
        const h = {
          isMatch: !0,
          score: c / a
        };
        return d && (h.hasInverse = !0), n && (h.indices = pe(r)), h;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const oe = [];
function me(...s) {
  oe.push(...s);
}
function Q(s, e) {
  for (let t = 0, n = oe.length; t < n; t += 1) {
    const i = oe[t];
    if (i.condition(s, e))
      return new i(s, e);
  }
  return new ge(s, e);
}
const V = {
  AND: "$and",
  OR: "$or"
}, ce = {
  PATH: "$path",
  PATTERN: "$val"
}, ae = (s) => !!(s[V.AND] || s[V.OR]), Ct = (s) => !!s[ce.PATH], It = (s) => !B(s) && $e(s) && !ae(s), _e = (s) => ({
  [V.AND]: Object.keys(s).map((e) => ({
    [e]: s[e]
  }))
});
function Oe(s, e, {
  auto: t = !0
} = {}) {
  const n = (i) => {
    if (A(i)) {
      const c = {
        keyId: null,
        pattern: i
      };
      return t && (c.searcher = Q(i, e)), c;
    }
    const o = Object.keys(i), a = Ct(i);
    if (!a && o.length > 1 && !ae(i))
      return n(_e(i));
    if (It(i)) {
      const c = a ? i[ce.PATH] : o[0], d = a ? i[ce.PATTERN] : i[c];
      if (!A(d))
        throw new Error(Xe(c));
      const u = {
        keyId: ie(c),
        pattern: d
      };
      return t && (u.searcher = Q(d, e)), u;
    }
    const r = {
      children: [],
      operator: o[0]
    };
    return o.forEach((c) => {
      const d = i[c];
      B(d) && d.forEach((u) => {
        r.children.push(n(u));
      });
    }), r;
  };
  return ae(s) || (s = _e(s)), n(s);
}
function ue(s, {
  ignoreFieldNorm: e = g.ignoreFieldNorm
}) {
  let t = 1;
  return s.forEach(({
    key: n,
    norm: i,
    score: o
  }) => {
    const a = n ? n.weight : null;
    t *= Math.pow(o === 0 && a ? Number.EPSILON : o, (a || 1) * (e ? 1 : i));
  }), t;
}
function Mt(s, {
  ignoreFieldNorm: e = g.ignoreFieldNorm
}) {
  s.forEach((t) => {
    t.score = ue(t.matches, {
      ignoreFieldNorm: e
    });
  });
}
class St {
  constructor(e) {
    this.limit = e, this.heap = [];
  }
  get size() {
    return this.heap.length;
  }
  shouldInsert(e) {
    return this.size < this.limit || e < this.heap[0].score;
  }
  insert(e) {
    this.size < this.limit ? (this.heap.push(e), this._bubbleUp(this.size - 1)) : e.score < this.heap[0].score && (this.heap[0] = e, this._sinkDown(0));
  }
  extractSorted(e) {
    return this.heap.sort(e);
  }
  _bubbleUp(e) {
    const t = this.heap;
    for (; e > 0; ) {
      const n = e - 1 >> 1;
      if (t[e].score <= t[n].score) break;
      const i = t[e];
      t[e] = t[n], t[n] = i, e = n;
    }
  }
  _sinkDown(e) {
    const t = this.heap, n = t.length;
    let i = e;
    do {
      e = i;
      const o = 2 * e + 1, a = 2 * e + 2;
      if (o < n && t[o].score > t[i].score && (i = o), a < n && t[a].score > t[i].score && (i = a), i !== e) {
        const r = t[e];
        t[e] = t[i], t[i] = r;
      }
    } while (i !== e);
  }
}
function Dt(s, e) {
  const t = s.matches;
  e.matches = [], x(t) && t.forEach((n) => {
    if (!x(n.indices) || !n.indices.length)
      return;
    const {
      indices: i,
      value: o
    } = n, a = {
      indices: i,
      value: o
    };
    n.key && (a.key = n.key.src), n.idx > -1 && (a.refIndex = n.idx), e.matches.push(a);
  });
}
function $t(s, e) {
  e.score = s.score;
}
function Ft(s, e, {
  includeMatches: t = g.includeMatches,
  includeScore: n = g.includeScore
} = {}) {
  const i = [];
  return t && i.push(Dt), n && i.push($t), s.map((o) => {
    const {
      idx: a
    } = o, r = {
      item: e[a],
      refIndex: a
    };
    return i.length && i.forEach((c) => {
      c(o, r);
    }), r;
  });
}
const Bt = /\b\w+\b/g;
function le({
  isCaseSensitive: s = !1,
  ignoreDiacritics: e = !1
} = {}) {
  return {
    tokenize(t) {
      return s || (t = t.toLowerCase()), e && (t = H(t)), t.match(Bt) || [];
    }
  };
}
function Lt(s, e, t) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = 0;
  function a(r, c, d, u) {
    const f = t.tokenize(r);
    if (!f.length) return;
    o++;
    const p = /* @__PURE__ */ new Map();
    for (const h of f)
      p.set(h, (p.get(h) || 0) + 1);
    for (const [h, k] of p) {
      const m = {
        docIdx: c,
        keyIdx: d,
        subIdx: u,
        tf: k
      };
      let l = n.get(h);
      l || (l = [], n.set(h, l)), l.push(m), i.set(h, (i.get(h) || 0) + 1);
    }
  }
  for (const r of s) {
    const {
      i: c,
      v: d,
      $: u
    } = r;
    if (d !== void 0) {
      a(d, c, -1, -1);
      continue;
    }
    if (u)
      for (let f = 0; f < e; f++) {
        const p = u[f];
        if (p)
          if (Array.isArray(p))
            for (const h of p)
              a(h.v, c, f, h.i ?? -1);
          else
            a(p.v, c, f, -1);
      }
  }
  return {
    terms: n,
    fieldCount: o,
    df: i
  };
}
function Tt(s, e, t, n) {
  const {
    i,
    v: o,
    $: a
  } = e;
  function r(c, d, u) {
    const f = n.tokenize(c);
    if (!f.length) return;
    s.fieldCount++;
    const p = /* @__PURE__ */ new Map();
    for (const h of f)
      p.set(h, (p.get(h) || 0) + 1);
    for (const [h, k] of p) {
      const m = {
        docIdx: i,
        keyIdx: d,
        subIdx: u,
        tf: k
      };
      let l = s.terms.get(h);
      l || (l = [], s.terms.set(h, l)), l.push(m), s.df.set(h, (s.df.get(h) || 0) + 1);
    }
  }
  if (o !== void 0) {
    r(o, -1, -1);
    return;
  }
  if (a)
    for (let c = 0; c < t; c++) {
      const d = a[c];
      if (d)
        if (Array.isArray(d))
          for (const u of d)
            r(u.v, c, u.i ?? -1);
        else
          r(d.v, c, -1);
    }
}
function ve(s, e) {
  for (const [t, n] of s.terms) {
    const i = n.filter((a) => a.docIdx !== e), o = n.length - i.length;
    o > 0 && (s.fieldCount -= o, s.df.set(t, (s.df.get(t) || 0) - o), i.length === 0 ? (s.terms.delete(t), s.df.delete(t)) : s.terms.set(t, i));
  }
}
class S {
  // Statics are assigned in entry.ts
  constructor(e, t, n) {
    this.options = {
      ...g,
      ...t
    }, this.options.useExtendedSearch, this.options.useTokenSearch, this._keyStore = new tt(this.options.keys), this._docs = e, this._myIndex = null, this._invertedIndex = null, this.setCollection(e, n), this._lastQuery = null, this._lastSearcher = null;
  }
  _getSearcher(e) {
    if (this._lastQuery === e)
      return this._lastSearcher;
    const t = this._invertedIndex ? {
      ...this.options,
      _invertedIndex: this._invertedIndex
    } : this.options, n = Q(e, t);
    return this._lastQuery = e, this._lastSearcher = n, n;
  }
  setCollection(e, t) {
    if (this._docs = e, t && !(t instanceof fe))
      throw new Error(Ve);
    if (this._myIndex = t || Le(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    }), this.options.useTokenSearch) {
      const n = le({
        isCaseSensitive: this.options.isCaseSensitive,
        ignoreDiacritics: this.options.ignoreDiacritics
      });
      this._invertedIndex = Lt(this._myIndex.records, this._myIndex.keys.length, n);
    }
  }
  add(e) {
    if (x(e) && (this._docs.push(e), this._myIndex.add(e), this._invertedIndex)) {
      const t = this._myIndex.records[this._myIndex.records.length - 1], n = le({
        isCaseSensitive: this.options.isCaseSensitive,
        ignoreDiacritics: this.options.ignoreDiacritics
      });
      Tt(this._invertedIndex, t, this._myIndex.keys.length, n);
    }
  }
  remove(e = () => !1) {
    const t = [], n = [];
    for (let i = 0, o = this._docs.length; i < o; i += 1)
      e(this._docs[i], i) && (t.push(this._docs[i]), n.push(i));
    if (n.length) {
      if (this._invertedIndex)
        for (const i of n)
          ve(this._invertedIndex, i);
      for (let i = n.length - 1; i >= 0; i -= 1)
        this._docs.splice(n[i], 1);
      this._myIndex.removeAll(n);
    }
    return t;
  }
  removeAt(e) {
    this._invertedIndex && ve(this._invertedIndex, e);
    const t = this._docs.splice(e, 1)[0];
    return this._myIndex.removeAt(e), t;
  }
  getIndex() {
    return this._myIndex;
  }
  search(e, t) {
    const {
      limit: n = -1
    } = t || {}, {
      includeMatches: i,
      includeScore: o,
      shouldSort: a,
      sortFn: r,
      ignoreFieldNorm: c
    } = this.options;
    if (A(e) && !e.trim()) {
      let f = this._docs.map((p, h) => ({
        item: p,
        refIndex: h
      }));
      return Y(n) && n > -1 && (f = f.slice(0, n)), f;
    }
    const d = Y(n) && n > 0 && A(e);
    let u;
    if (d) {
      const f = new St(n);
      A(this._docs[0]) ? this._searchStringList(e, {
        heap: f,
        ignoreFieldNorm: c
      }) : this._searchObjectList(e, {
        heap: f,
        ignoreFieldNorm: c
      }), u = f.extractSorted(r);
    } else
      u = A(e) ? A(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e), Mt(u, {
        ignoreFieldNorm: c
      }), a && u.sort(r), Y(n) && n > -1 && (u = u.slice(0, n));
    return Ft(u, this._docs, {
      includeMatches: i,
      includeScore: o
    });
  }
  _searchStringList(e, {
    heap: t,
    ignoreFieldNorm: n
  } = {}) {
    const i = this._getSearcher(e), {
      records: o
    } = this._myIndex, a = t ? null : [];
    return o.forEach(({
      v: r,
      i: c,
      n: d
    }) => {
      if (!x(r))
        return;
      const {
        isMatch: u,
        score: f,
        indices: p
      } = i.searchIn(r);
      if (u) {
        const h = {
          item: r,
          idx: c,
          matches: [{
            score: f,
            value: r,
            norm: d,
            indices: p
          }]
        };
        t ? (h.score = ue(h.matches, {
          ignoreFieldNorm: n
        }), t.shouldInsert(h.score) && t.insert(h)) : a.push(h);
      }
    }), a;
  }
  _searchLogical(e) {
    const t = Oe(e, this.options), n = (r, c, d) => {
      if (!("children" in r)) {
        const {
          keyId: h,
          searcher: k
        } = r;
        let m;
        return h === null ? (m = [], this._myIndex.keys.forEach((l, y) => {
          m.push(...this._findMatches({
            key: l,
            value: c[y],
            searcher: k
          }));
        })) : m = this._findMatches({
          key: this._keyStore.get(h),
          value: this._myIndex.getValueForItemAtKeyId(c, h),
          searcher: k
        }), m && m.length ? [{
          idx: d,
          item: c,
          matches: m
        }] : [];
      }
      const {
        children: u,
        operator: f
      } = r, p = [];
      for (let h = 0, k = u.length; h < k; h += 1) {
        const m = u[h], l = n(m, c, d);
        if (l.length)
          p.push(...l);
        else if (f === V.AND)
          return [];
      }
      return p;
    }, i = this._myIndex.records, o = /* @__PURE__ */ new Map(), a = [];
    return i.forEach(({
      $: r,
      i: c
    }) => {
      if (x(r)) {
        const d = n(t, r, c);
        d.length && (o.has(c) || (o.set(c, {
          idx: c,
          item: r,
          matches: []
        }), a.push(o.get(c))), d.forEach(({
          matches: u
        }) => {
          o.get(c).matches.push(...u);
        }));
      }
    }), a;
  }
  // When a search involves inverse patterns (e.g. !Syrup), the aggregation
  // across keys switches from "ANY key matches" to "ALL keys must match."
  // This is signaled by hasInverse on the SearchResult from ExtendedSearch.
  //
  // For mixed patterns like "^hello !Syrup", a key failure is ambiguous —
  // it could be the positive or inverse term that failed. In that case we
  // conservatively exclude the item, which is strictly better than the old
  // behavior of including it. See: https://github.com/krisk/Fuse/issues/712
  _searchObjectList(e, {
    heap: t,
    ignoreFieldNorm: n
  } = {}) {
    const i = this._getSearcher(e), {
      keys: o,
      records: a
    } = this._myIndex, r = t ? null : [];
    return a.forEach(({
      $: c,
      i: d
    }) => {
      if (!x(c))
        return;
      const u = [];
      let f = !1, p = !1;
      if (o.forEach((h, k) => {
        const m = this._findMatches({
          key: h,
          value: c[k],
          searcher: i
        });
        m.length ? (u.push(...m), m[0].hasInverse && (p = !0)) : f = !0;
      }), !(p && f) && u.length) {
        const h = {
          idx: d,
          item: c,
          matches: u
        };
        t ? (h.score = ue(h.matches, {
          ignoreFieldNorm: n
        }), t.shouldInsert(h.score) && t.insert(h)) : r.push(h);
      }
    }), r;
  }
  _findMatches({
    key: e,
    value: t,
    searcher: n
  }) {
    if (!x(t))
      return [];
    const i = [];
    if (B(t))
      t.forEach(({
        v: o,
        i: a,
        n: r
      }) => {
        if (!x(o))
          return;
        const {
          isMatch: c,
          score: d,
          indices: u,
          hasInverse: f
        } = n.searchIn(o);
        c && i.push({
          score: d,
          key: e,
          value: o,
          idx: a,
          norm: r,
          indices: u,
          hasInverse: f
        });
      });
    else {
      const {
        v: o,
        n: a
      } = t, {
        isMatch: r,
        score: c,
        indices: d,
        hasInverse: u
      } = n.searchIn(o);
      r && i.push({
        score: c,
        key: e,
        value: o,
        norm: a,
        indices: d,
        hasInverse: u
      });
    }
    return i;
  }
}
class Nt {
  static condition(e, t) {
    return t.useTokenSearch;
  }
  constructor(e, t) {
    this.options = t, this.analyzer = le({
      isCaseSensitive: t.isCaseSensitive,
      ignoreDiacritics: t.ignoreDiacritics
    });
    const n = this.analyzer.tokenize(e), i = t._invertedIndex, {
      df: o,
      fieldCount: a
    } = i;
    this.termSearchers = [], this.idfWeights = [];
    for (const r of n) {
      this.termSearchers.push(new ge(r, {
        location: t.location,
        threshold: t.threshold,
        distance: t.distance,
        includeMatches: t.includeMatches,
        findAllMatches: t.findAllMatches,
        minMatchCharLength: t.minMatchCharLength,
        isCaseSensitive: t.isCaseSensitive,
        ignoreDiacritics: t.ignoreDiacritics,
        ignoreLocation: !0
      }));
      const c = o.get(r) || 0, d = Math.log(1 + (a - c + 0.5) / (c + 0.5));
      this.idfWeights.push(d);
    }
  }
  searchIn(e) {
    if (!this.termSearchers.length)
      return {
        isMatch: !1,
        score: 1
      };
    const t = [];
    let n = 0, i = 0, o = 0;
    for (let c = 0; c < this.termSearchers.length; c++) {
      const d = this.termSearchers[c].searchIn(e), u = this.idfWeights[c];
      i += u, d.isMatch && (o++, n += u * (1 - d.score), d.indices && t.push(...d.indices));
    }
    if (o === 0)
      return {
        isMatch: !1,
        score: 1
      };
    const a = i > 0 ? 1 - n / i : 0, r = {
      isMatch: !0,
      score: Math.max(1e-3, a)
    };
    return this.options.includeMatches && t.length && (r.indices = pe(t)), r;
  }
}
S.version = "7.3.0";
S.createIndex = Le;
S.parseIndex = ut;
S.config = g;
S.match = function(s, e, t) {
  return Q(s, {
    ...g,
    ...t
  }).searchIn(e);
};
S.parseQuery = Oe;
me(vt);
me(Nt);
S.use = function(...s) {
  s.forEach((e) => me(e));
};
function Rt(s) {
  const e = new S(s, {
    keys: [
      { name: "text", weight: 0.6 },
      { name: "label", weight: 0.3 },
      { name: "section", weight: 0.1 }
    ],
    threshold: 0.4,
    includeScore: !0,
    ignoreLocation: !0,
    minMatchCharLength: 2
  });
  return {
    search(t, n = 5) {
      return !t || !t.trim() ? [] : e.search(t.trim(), { limit: n }).map((o) => ({
        ...o.item,
        score: o.score
      }));
    },
    getAllDocs() {
      return s;
    }
  };
}
const Pe = [
  {
    id: "nav.about",
    type: "navigate",
    target: "#about",
    keywords: ["about", "who are you", "introduce", "yourself", "tell me about yourself", "bio", "background"],
    examples: ["tell me about yourself", "who are you", "about section", "your background"]
  },
  {
    id: "nav.career",
    type: "navigate",
    target: "#career",
    keywords: ["career", "experience", "work history", "resume", "jobs", "positions", "roles"],
    examples: ["show your experience", "career history", "work history", "your jobs", "go to experience"]
  },
  {
    id: "nav.skills",
    type: "navigate",
    target: "#skills",
    keywords: ["skills", "tech stack", "technologies", "stack", "tools", "languages"],
    examples: ["what's your tech stack", "skills section", "technologies you use", "programming languages"]
  },
  {
    id: "nav.leadership",
    type: "navigate",
    target: "#leadership",
    keywords: ["leadership", "management style", "lead", "principles"],
    examples: ["leadership style", "management principles", "how do you lead"]
  },
  {
    id: "nav.repos",
    type: "navigate",
    target: "#open-source",
    keywords: ["repos", "repositories", "open source", "github", "projects", "oss", "code"],
    examples: ["open source projects", "github repos", "your projects", "show repos"]
  },
  {
    id: "nav.writing",
    type: "navigate",
    target: "#writing",
    keywords: ["articles", "blog", "medium", "writing", "posts", "publications", "book"],
    examples: ["your articles", "blog posts", "medium articles", "what have you written"]
  },
  {
    id: "nav.certs",
    type: "navigate",
    target: "#certs",
    keywords: ["certifications", "certificates", "certified", "credentials"],
    examples: ["certifications", "your certificates", "are you certified"]
  },
  {
    id: "nav.contact",
    type: "navigate",
    target: "#contact",
    keywords: ["contact", "email", "reach", "connect", "hire", "linkedin", "social", "say hello"],
    examples: ["how to contact you", "your email", "linkedin", "reach out", "say hello"]
  },
  {
    id: "nav.3d",
    type: "navigate",
    target: "/world.html",
    keywords: ["3d", "world", "game", "explore", "interactive", "drive"],
    examples: ["3d portfolio", "explore the world", "interactive version", "play the game"]
  }
], he = [
  {
    id: "qa.career_detail",
    type: "query",
    keywords: [
      "testgorilla",
      "hopin",
      "vue.ai",
      "weinvest",
      "freshworks",
      "cognizant",
      "what did you do at",
      "role at",
      "work at"
    ],
    examples: [
      "what did you do at TestGorilla",
      "tell me about your Hopin role",
      "describe your work at Freshworks",
      "TestGorilla experience"
    ]
  },
  {
    id: "qa.skills_fit",
    type: "query",
    keywords: [
      "do you know",
      "experience with",
      "proficient",
      "familiar with",
      "python",
      "typescript",
      "aws",
      "kubernetes",
      "docker",
      "playwright",
      "cypress",
      "ai",
      "claude",
      "llm",
      "rag"
    ],
    examples: [
      "do you know Python",
      "what's your AI experience",
      "are you familiar with Kubernetes",
      "have you used Playwright"
    ]
  },
  {
    id: "qa.leadership",
    type: "query",
    keywords: [
      "how do you lead",
      "team building",
      "management approach",
      "mentorship",
      "scale teams",
      "team size",
      "culture"
    ],
    examples: [
      "how do you scale teams",
      "your management approach",
      "mentorship philosophy",
      "how do you build engineering culture"
    ]
  },
  {
    id: "qa.recruiter",
    type: "query",
    keywords: [
      "fit for",
      "good candidate",
      "hire",
      "vp engineering",
      "director",
      "startup experience",
      "remote",
      "team size",
      "years of experience",
      "why should we"
    ],
    examples: [
      "is Naresh a good fit for VP Engineering",
      "how large are his teams",
      "startup vs scale-up experience",
      "why should we hire you"
    ]
  },
  {
    id: "qa.general",
    type: "query",
    keywords: [],
    examples: ["summarize your experience", "tell me about yourself", "what makes you unique"]
  }
], de = {
  id: "meta.about_ai",
  type: "meta",
  keywords: ["how does this work", "what model", "are you ai", "who are you", "naresh.ai", "what powers you"],
  response: "I'm naresh.ai — a lightweight AI assistant built into this portfolio. I use Fuse.js to search through Naresh's resume data and Gemini Flash to generate natural language answers. Everything runs client-side except the Gemini API call. Try asking about his career, skills, or leadership philosophy!"
}, je = [...Pe, ...he, de], Ot = je.flatMap((s) => [
  ...s.keywords.map((e) => ({ text: e, intentId: s.id })),
  ...(s.examples || []).map((e) => ({ text: e, intentId: s.id }))
]), Pt = new S(Ot, {
  keys: ["text"],
  threshold: 0.35,
  includeScore: !0,
  ignoreLocation: !0
});
function jt(s, e, t) {
  const n = s.trim().toLowerCase();
  if (!n) return null;
  if (de.keywords.some((r) => n.includes(r)))
    return { intent: de, confidence: 1 };
  for (const r of Pe)
    if (r.keywords.some((d) => {
      const u = d.toLowerCase();
      return n === u || n.includes(u);
    }) && (n.split(/\s+/).length <= 4 || !Ce(n)))
      return { intent: r, confidence: 0.9 };
  const o = ["testgorilla", "hopin", "vue.ai", "weinvest", "freshworks", "cognizant"].find((r) => n.includes(r));
  if (o && Ce(n))
    return {
      intent: he.find((r) => r.id === "qa.career_detail"),
      confidence: 0.85,
      params: { company: o }
    };
  const a = Pt.search(n, { limit: 5 });
  if (a.length) {
    const r = a[0], c = 1 - r.score, d = r.item.intentId, u = je.find((f) => f.id === d);
    if (u && c > 0.7)
      return u.type === "navigate" ? { intent: u, confidence: c } : { intent: u, confidence: c };
    if (u && c > 0.4)
      return { intent: u, confidence: c };
  }
  return {
    intent: he.find((r) => r.id === "qa.general"),
    confidence: 0.3
  };
}
function Ce(s) {
  const e = ["what", "how", "why", "when", "where", "who", "tell", "describe", "explain", "show", "can", "do", "does", "is", "are", "have", "has"], t = s.split(/\s+/)[0];
  return s.includes("?") || e.includes(t);
}
const zt = `You are naresh.ai, a concise AI assistant for Naresh Sekar's professional portfolio.

Rules:
- Answer ONLY from the provided context. If the context doesn't contain the answer, say so honestly.
- Use first person ("I", "my") when speaking as Naresh.
- Keep answers under 3 short paragraphs. Be specific: include company names, technologies, and dates when available.
- For recruiter-style questions, be honest and factual. Don't oversell.
- If asked about something not in the context, suggest which section of the portfolio might help.
- Do not use markdown formatting. Use plain text only.
- Be conversational and natural, not robotic.`;
function Ht(s, e) {
  const t = e.map((n) => `[Section: ${n.label || n.section}]
${n.text}`).join(`
---
`);
  return {
    system: zt,
    user: `CONTEXT:
---
${t}
---

QUESTION: ${s}`
  };
}
const Wt = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", ze = "AIzaSyA3aU6zaCvV1gOEXDDHxybDMJsvEjtX0Zo";
let Ie = 0, te = 0;
const Kt = 30, Me = 1500;
function Ut() {
  return ze.length > 0;
}
async function Gt(s, e) {
  if (Ie++, Ie > Kt)
    throw new Error("SESSION_LIMIT");
  const t = Date.now();
  t - te < Me && await new Promise((r) => setTimeout(r, Me - (t - te))), te = Date.now();
  const n = {
    system_instruction: {
      parts: [{ text: s }]
    },
    contents: [
      {
        parts: [{ text: e }]
      }
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 512
    }
  }, i = await fetch(`${Wt}?key=${ze}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
  });
  if (i.status === 429)
    throw new Error("RATE_LIMITED");
  if (!i.ok)
    throw new Error(`API_ERROR_${i.status}`);
  const a = (await i.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!a)
    throw new Error("EMPTY_RESPONSE");
  return a;
}
async function Yt(s, e, t) {
  const n = e.search(s, 5), i = n.length ? n : t.slice(0, 3), o = i.map((c) => ({
    id: c.id,
    section: c.section,
    label: c.label,
    meta: c.meta
  }));
  if (!Ut())
    return {
      type: "fallback",
      text: "Here's what I found in the resume:",
      sources: o,
      chunks: i
    };
  const { system: a, user: r } = Ht(s, i);
  try {
    return {
      type: "answer",
      text: await Gt(a, r),
      sources: o
    };
  } catch (c) {
    const d = c.message || "UNKNOWN";
    let u = "I couldn't reach the AI. Here's what I found locally:";
    return d === "RATE_LIMITED" ? u = "naresh.ai is popular today — I've hit the rate limit. Here's what I found locally:" : d === "SESSION_LIMIT" ? u = "You've asked a lot of great questions! I've reached the session limit. Here's what I found locally:" : d === "NO_API_KEY" && (u = "AI answers aren't configured. Here's what I found in the resume:"), {
      type: "fallback",
      text: u,
      sources: o,
      chunks: i,
      error: d
    };
  }
}
let b = null;
function qt(s) {
  const { logEl: e, inputEl: t, sendEl: n, suggEl: i, search: o, chunks: a, handlers: r, suggestions: c, queryRAG: d } = s;
  if (!e || !t || !n) return;
  const u = e.closest(".ask")?.querySelector(".ask__head-l");
  let f = null;
  if (u) {
    const k = u.querySelector("span:last-child");
    k && (k.innerHTML = 'naresh.ai · <span class="ask__status" data-state="ready">ready</span>', f = k.querySelector(".ask__status"));
  }
  const p = [
    {
      role: "a",
      text: "Hi! Ask me anything about Naresh's work, leadership, or projects. I'll answer from his resume."
    }
  ];
  b = { logEl: e, inputEl: t, sendEl: n, suggEl: i, statusEl: f, messages: p, search: o, chunks: a, handlers: r, suggestions: c, queryRAG: d };
  const h = async (k) => {
    const m = (k || t.value || "").trim();
    if (m) {
      t.value = "", p.push({ role: "u", text: m }), D(), z("thinking"), p.push({ role: "t", stage: "searching resume..." }), D();
      try {
        const l = jt(m, o, r);
        if (l?.intent?.type === "meta") {
          G(), p.push({ role: "a", text: l.intent.response }), D(), z("ready");
          return;
        }
        if (l?.intent?.type === "navigate" && l.confidence >= 0.7) {
          const E = l.intent.target;
          if (G(), E.startsWith("/")) {
            p.push({ role: "a", text: "Taking you to the 3D world..." }), D(), z("ready"), setTimeout(() => {
              window.location.href = E;
            }, 600);
            return;
          }
          p.push({ role: "a", text: `Scrolling to ${l.intent.id.replace("nav.", "")} section...` }), D(), z("ready"), r.scrollTo?.(E);
          return;
        }
        Vt("generating answer...");
        const y = await d(m);
        G(), y.type === "answer" ? (p.push({ role: "a", text: y.text }), y.sources?.length && p.push({ role: "sources", items: y.sources })) : (p.push({ role: "a", text: y.text, variant: y.error ? "error" : void 0 }), y.chunks?.length && p.push({
          role: "sources",
          items: y.chunks.map((E) => ({
            id: E.id,
            section: E.section,
            label: E.label,
            meta: E.meta
          }))
        })), D(), Jt(l?.intent?.id);
      } catch {
        G(), p.push({
          role: "a",
          text: "Something went wrong. Try asking in a different way.",
          variant: "error"
        }), D();
      }
      z("ready");
    }
  };
  return n.addEventListener("click", () => h()), t.addEventListener("keydown", (k) => {
    k.key === "Enter" && h();
  }), Xt(c, h), D(), { send: h };
}
function D() {
  if (!b) return;
  const { logEl: s, messages: e, handlers: t } = b;
  s.innerHTML = "", e.forEach((n) => {
    if (n.role === "a") {
      const i = document.createElement("div");
      i.className = "msg__tag", i.textContent = "NARESH.AI";
      const o = document.createElement("div");
      o.textContent = n.text;
      const a = document.createElement("div");
      a.className = `msg msg--a${n.variant === "error" ? " msg--error" : ""}`, a.append(i, o), s.append(a);
    } else if (n.role === "u") {
      const i = document.createElement("div");
      i.className = "msg msg--u", i.textContent = n.text, s.append(i);
    } else if (n.role === "t") {
      const i = document.createElement("div");
      i.className = "msg msg--think", i.innerHTML = `<span class="thinking-dots"><span></span><span></span><span></span></span> <span class="thinking-label">${n.stage || "thinking..."}</span>`, s.append(i);
    } else if (n.role === "sources") {
      const i = document.createElement("div");
      i.className = "msg__sources", (n.items || []).forEach((o) => {
        const a = document.createElement("button");
        a.className = "msg__src", a.textContent = o.label || o.section, a.addEventListener("click", () => Qt(o, t)), i.append(a);
      }), s.append(i);
    }
  }), s.scrollTop = s.scrollHeight;
}
function Qt(s, e) {
  const t = {
    about: "#about",
    career: "#career",
    skills: "#skills",
    leadership: "#leadership",
    repos: "#open-source",
    writing: "#writing",
    certs: "#certs",
    education: "#contact",
    contact: "#contact"
  };
  if (s.section === "career" && s.meta?.idx !== void 0) {
    e.openCareerModal?.(s.meta.idx);
    return;
  }
  if (s.section === "repos" && s.meta) {
    e.openDetailModal?.("repo", s.meta.kind, s.meta.idx);
    return;
  }
  if (s.section === "writing" && s.meta) {
    e.openDetailModal?.("article", s.meta.kind, s.meta.idx);
    return;
  }
  const n = t[s.section];
  n && e.scrollTo?.(n);
}
function z(s) {
  b?.statusEl && (b.statusEl.dataset.state = s, b.statusEl.textContent = s === "ready" ? "ready" : s === "thinking" ? "thinking..." : s);
}
function G() {
  if (!b) return;
  const s = b.messages.findIndex((e) => e.role === "t");
  s !== -1 && b.messages.splice(s, 1);
}
function Vt(s) {
  if (!b) return;
  const e = b.messages.find((t) => t.role === "t");
  e && (e.stage = s, D());
}
function Xt(s, e) {
  b?.suggEl && (b.suggEl.innerHTML = "", (s || []).forEach((t) => {
    const n = document.createElement("button");
    n.className = "sugg", n.textContent = t, n.addEventListener("click", () => {
      b.suggEl.innerHTML = "", e(t);
    }), b.suggEl.append(n);
  }));
}
const Se = {
  "qa.career_detail": ["What technologies were used?", "How large was the team?", "What about the previous role?"],
  "qa.skills_fit": ["Show me related projects", "Where was this used?"],
  "qa.leadership": ["How do you handle conflict?", "Tell me about team growth"],
  "qa.recruiter": ["What certifications does he have?", "Tell me about his AI experience"],
  "qa.general": ["Show leadership principles", "What are his top projects?"]
};
function Jt(s) {
  if (!b?.suggEl) return;
  const e = Se[s] || Se["qa.general"];
  b.suggEl.innerHTML = "", e.forEach((t) => {
    const n = document.createElement("button");
    n.className = "sugg", n.textContent = t, n.addEventListener("click", () => {
      b.suggEl.innerHTML = "";
      const i = b.inputEl?.closest(".ask")?.querySelector("#ask-send");
      i && (b.inputEl.value = t, i.click());
    }), b.suggEl.append(n);
  });
}
let F = null, R = null, $ = null, v = 0, ye = [], ke = null, q = null, P = null;
function Zt({ resumeData: s, search: e, handlers: t }) {
  const n = es(s);
  ke = new S(n, {
    keys: [
      { name: "label", weight: 0.5 },
      { name: "subtitle", weight: 0.3 },
      { name: "searchText", weight: 0.2 }
    ],
    threshold: 0.4,
    includeScore: !0,
    ignoreLocation: !0
  }), ye = n, ts(), ss(t);
}
function es(s) {
  const e = [];
  return [
    { id: "#about", label: "About", subtitle: "Who is Naresh" },
    { id: "#career", label: "Career", subtitle: "Experience & work history" },
    { id: "#skills", label: "Skills", subtitle: "Tech stack & tools" },
    { id: "#leadership", label: "Leadership", subtitle: "Management principles" },
    { id: "#open-source", label: "Open Source", subtitle: "GitHub repos & projects" },
    { id: "#writing", label: "Writing", subtitle: "Articles & publications" },
    { id: "#certs", label: "Certifications", subtitle: "AWS, Reforge, Cisco..." },
    { id: "#contact", label: "Contact", subtitle: "Email, LinkedIn, social" }
  ].forEach((r) => {
    e.push({
      category: "Sections",
      icon: "#",
      label: r.label,
      subtitle: r.subtitle,
      searchText: `${r.label} ${r.subtitle}`,
      action: { type: "scroll", target: r.id }
    });
  }), (s.career || []).forEach((r, c) => {
    r.isTail || e.push({
      category: "Career",
      icon: r.role?.includes("Manager") ? "EM" : r.role?.substring(0, 2) || ">>",
      label: `${r.role} at ${r.co}`,
      subtitle: r.date,
      searchText: `${r.role} ${r.co} ${r.date} ${r.teaser}`,
      action: { type: "career", idx: c }
    });
  }), [
    ...(s.reposStarred || []).map((r, c) => ({ ...r, __kind: "Starred", __idx: c })),
    ...(s.reposRecent || []).map((r, c) => ({ ...r, __kind: "Recent", __idx: c }))
  ].forEach((r) => {
    e.push({
      category: "Repos",
      icon: "</>",
      label: r.name,
      subtitle: r.tagline || r.desc?.slice(0, 60) || "",
      searchText: `${r.name} ${r.tagline} ${r.desc} ${r.tags?.join(" ") || ""} ${r.language}`,
      action: { type: "repo", kind: r.__kind, idx: r.__idx }
    });
  }), [
    ...(s.articlesPinned || []).map((r, c) => ({ ...r, __kind: "Pinned", __idx: c })),
    ...(s.articlesRecent || []).map((r, c) => ({ ...r, __kind: "Recent", __idx: c }))
  ].forEach((r) => {
    e.push({
      category: "Articles",
      icon: "✎",
      label: r.title,
      subtitle: `${r.date} · ${(r.tags?.[0] || "").toUpperCase()}`,
      searchText: `${r.title} ${r.date} ${r.tags?.join(" ") || ""} ${r.desc}`,
      action: { type: "article", kind: r.__kind, idx: r.__idx }
    });
  }), (s.skills || []).forEach((r) => {
    r.items.forEach((c) => {
      e.push({
        category: "Skills",
        icon: "[S]",
        label: c,
        subtitle: r.name,
        searchText: `${c} ${r.name} skill`,
        action: { type: "scroll", target: "#skills" }
      });
    });
  }), e;
}
function ts() {
  if (document.getElementById("cmdk-overlay")) return;
  document.body.insertAdjacentHTML("beforeend", `
        <div id="cmdk-overlay" class="cmdk" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Quick search">
            <div class="cmdk__backdrop"></div>
            <div class="cmdk__panel">
                <div class="cmdk__input-wrap">
                    <span class="cmdk__icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                    </span>
                    <input id="cmdk-input" type="text" placeholder="Search resume, ask a question..." autocomplete="off" />
                    <kbd class="cmdk__kbd">esc</kbd>
                </div>
                <div id="cmdk-results" class="cmdk__results" role="listbox" aria-label="Search results"></div>
                <div class="cmdk__footer">
                    <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                    <span><kbd>↵</kbd> select</span>
                    <span><kbd>esc</kbd> close</span>
                </div>
            </div>
        </div>`), F = document.getElementById("cmdk-overlay"), R = document.getElementById("cmdk-input"), $ = document.getElementById("cmdk-results"), F.querySelector(".cmdk__backdrop").addEventListener("click", X);
  let e = null;
  R.addEventListener("input", () => {
    clearTimeout(e), e = setTimeout(() => {
      v = 0, He(R.value.trim());
    }, 80);
  }), R.addEventListener("keydown", (t) => {
    const n = $.querySelectorAll(".cmdk__item").length;
    t.key === "ArrowDown" ? (t.preventDefault(), v = (v + 1) % Math.max(n, 1), J()) : t.key === "ArrowUp" ? (t.preventDefault(), v = (v - 1 + Math.max(n, 1)) % Math.max(n, 1), J()) : t.key === "Enter" ? (t.preventDefault(), ns()) : t.key === "Escape" && (t.preventDefault(), X());
  });
}
function ss(s) {
  P = s, document.addEventListener("keydown", (t) => {
    (t.metaKey || t.ctrlKey) && t.key === "k" && (t.preventDefault(), F?.classList.contains("open") ? X() : De());
  });
  const e = document.getElementById("search-btn");
  e && e.addEventListener("click", () => De());
}
function De() {
  F && (q = document.activeElement, F.classList.add("open"), F.setAttribute("aria-hidden", "false"), document.body.classList.add("cmdk-open"), R.value = "", v = 0, He(""), setTimeout(() => R.focus(), 50));
}
function X() {
  F && (F.classList.remove("open"), F.setAttribute("aria-hidden", "true"), document.body.classList.remove("cmdk-open"), q && (q.focus(), q = null));
}
function He(s) {
  if (!$) return;
  $.innerHTML = "";
  let e;
  s ? (e = ke.search(s, { limit: 8 }).map((o) => o.item), s.length >= 3 && e.push({
    category: "Ask AI",
    icon: "✦",
    label: `Ask naresh.ai: "${s}"`,
    subtitle: "Get an AI-powered answer",
    action: { type: "ask", query: s }
  })) : e = ye.filter((i) => i.category === "Sections" || i.category === "Career");
  const t = /* @__PURE__ */ new Map();
  e.forEach((i) => {
    t.has(i.category) || t.set(i.category, []), t.get(i.category).push(i);
  });
  let n = 0;
  t.forEach((i, o) => {
    const a = document.createElement("div");
    a.className = "cmdk__group-label", a.textContent = o, $.append(a), i.forEach((r) => {
      const c = document.createElement("div");
      c.className = "cmdk__item", c.setAttribute("role", "option"), c.dataset.idx = n, c.innerHTML = `
                <span class="cmdk__item-icon">${se(r.icon)}</span>
                <div class="cmdk__item-text">
                    <div class="cmdk__item-title">${se(r.label)}</div>
                    <div class="cmdk__item-subtitle">${se(r.subtitle)}</div>
                </div>`, c.addEventListener("click", () => We(r.action)), c.addEventListener("mouseenter", () => {
        v = parseInt(c.dataset.idx, 10), J();
      }), $.append(c), n++;
    });
  }), J();
}
function J() {
  if (!$) return;
  const s = $.querySelectorAll(".cmdk__item");
  s.forEach((t, n) => {
    t.setAttribute("aria-selected", n === v ? "true" : "false");
  });
  const e = s[v];
  e && e.scrollIntoView({ block: "nearest" });
}
function ns() {
  if (!$.querySelectorAll(".cmdk__item")[v]) return;
  const e = R.value.trim();
  let t;
  e ? (t = ke.search(e, { limit: 8 }).map((n) => n.item), e.length >= 3 && t.push({ action: { type: "ask", query: e } })) : t = ye.filter((n) => n.category === "Sections" || n.category === "Career"), t[v] && We(t[v].action);
}
function We(s) {
  if (!(!s || !P))
    switch (X(), s.type) {
      case "scroll":
        P.scrollTo?.(s.target);
        break;
      case "career":
        P.openCareerModal?.(s.idx);
        break;
      case "repo":
        P.openDetailModal?.("repo", s.kind, s.idx);
        break;
      case "article":
        P.openDetailModal?.("article", s.kind, s.idx);
        break;
      case "ask":
        is(s.query);
        break;
    }
}
function is(s) {
  const e = document.getElementById("chat-panel"), t = document.getElementById("chat-fab"), n = document.getElementById("ask-input"), i = document.getElementById("ask-send");
  e && !e.classList.contains("is-open") && (e.classList.add("is-open"), e.setAttribute("aria-hidden", "false"), t && t.setAttribute("aria-expanded", "true"), document.body.classList.add("chat-open")), n && i && (n.value = s, setTimeout(() => i.click(), 100));
}
function se(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function os({ resumeData: s, chatRoot: e, handlers: t, suggestions: n }) {
  const i = Ue(s), o = Rt(i);
  qt({
    ...e,
    search: o,
    chunks: i,
    handlers: t,
    suggestions: n,
    queryRAG: (a) => Yt(a, o, i)
  }), Zt({
    resumeData: s,
    search: o,
    handlers: t
  });
}
function cs() {
}
export {
  cs as destroy,
  os as init
};
