function ot(t) {
  const e = [], s = t.personal || {}, n = t.site || {};
  if (s.name) {
    const u = s.mission || s.bio || "";
    e.push({
      id: "bio",
      section: "about",
      label: s.name,
      text: `${s.name} is an ${s.title || "Engineering Manager"}. ${u}`
    });
  }
  const i = t.rawResume || {}, o = i.about?.cards || [];
  if (o.forEach((u, y) => {
    e.push({
      id: `about:${y}`,
      section: "about",
      label: `About - ${u.title}`,
      text: `About - ${u.title}: ${u.description}`
    });
  }), !o.length) {
    const u = n?.seo?.description || "";
    u && e.push({
      id: "about:summary",
      section: "about",
      label: "About",
      text: `About Naresh Sekar: ${u}`
    });
  }
  (t.career || []).forEach((u, y) => {
    if (u.isTail) return;
    const b = ct(u.desc || ""), E = `${s.name || "Naresh Sekar"} worked as ${u.role} at ${u.co} (${u.date}). ${b}`;
    e.push({
      id: `career:${y}`,
      section: "career",
      label: `${u.role} at ${u.co}`,
      text: E,
      meta: { idx: y, co: u.co, role: u.role, date: u.date }
    });
  }), (t.skills || []).forEach((u, y) => {
    e.push({
      id: `skill:${y}`,
      section: "skills",
      label: `Skills - ${u.name}`,
      text: `Skills - ${u.name}: ${u.items.join(", ")}`
    });
  }), (t.leadership || []).forEach((u, y) => {
    e.push({
      id: `leadership:${y}`,
      section: "leadership",
      label: `Leadership - ${u.t}`,
      text: `Leadership - ${u.t}: ${u.d}`
    });
  }), (t.reposStarred || []).forEach((u, y) => {
    const b = u.tags?.join(", ") || "";
    e.push({
      id: `repo:starred:${y}`,
      section: "repos",
      label: u.name,
      text: `Open source repo: ${u.name} - ${u.tagline || u.desc}. Language: ${u.language || "N/A"}. Tags: ${b}`,
      meta: { kind: "Starred", idx: y, name: u.name, url: u.url }
    });
  }), (t.reposRecent || []).forEach((u, y) => {
    const b = u.tags?.join(", ") || "";
    e.push({
      id: `repo:recent:${y}`,
      section: "repos",
      label: u.name,
      text: `Recent project: ${u.name} - ${u.tagline || u.desc}. Language: ${u.language || "N/A"}. Tags: ${b}`,
      meta: { kind: "Recent", idx: y, name: u.name, url: u.url }
    });
  }), (t.articlesPinned || []).forEach((u, y) => {
    const b = u.tags?.join(", ") || "";
    e.push({
      id: `article:pinned:${y}`,
      section: "writing",
      label: u.title,
      text: `Article: ${u.title} (${u.date}). ${u.desc} Tags: ${b}`,
      meta: { kind: "Pinned", idx: y, title: u.title, url: u.url }
    });
  }), (t.articlesRecent || []).forEach((u, y) => {
    const b = u.tags?.join(", ") || "";
    e.push({
      id: `article:recent:${y}`,
      section: "writing",
      label: u.title,
      text: `Article: ${u.title} (${u.date}). ${u.desc} Tags: ${b}`,
      meta: { kind: "Recent", idx: y, title: u.title, url: u.url }
    });
  });
  const h = t.certs || [];
  if (h.length) {
    const u = h.map((y) => `${y.name} (${y.issuer})`).join(", ");
    e.push({
      id: "certs",
      section: "certs",
      label: "Certifications",
      text: `Certifications: ${u}`
    });
  }
  const k = i.education;
  k && e.push({
    id: "education",
    section: "education",
    label: "Education",
    text: `Education: ${k.degree || ""}, ${k.school || ""}, ${k.period || ""}, ${k.location || ""}`
  });
  const p = i.publications?.book;
  return p && e.push({
    id: "book",
    section: "writing",
    label: p.title,
    text: `Book: ${p.title} by ${p.author || "Naresh Sekar"}. ${p.description || ""} Published on ${p.publisher || "Amazon Kindle"}.`
  }), e;
}
function ct(t) {
  return t.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function B(t) {
  return Array.isArray ? Array.isArray(t) : We(t) === "[object Array]";
}
function at(t) {
  if (typeof t == "string")
    return t;
  if (typeof t == "bigint")
    return t.toString();
  const e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function le(t) {
  return t == null ? "" : at(t);
}
function _(t) {
  return typeof t == "string";
}
function Q(t) {
  return typeof t == "number";
}
function lt(t) {
  return t === !0 || t === !1 || ut(t) && We(t) == "[object Boolean]";
}
function He(t) {
  return typeof t == "object";
}
function ut(t) {
  return He(t) && t !== null;
}
function v(t) {
  return t != null;
}
function q(t) {
  return !t.trim().length;
}
function We(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const ht = "Incorrect 'index' type", dt = (t) => `Invalid value for key ${t}`, ft = (t) => `Pattern length exceeds max of ${t}.`, gt = (t) => `Missing ${t} property in key`, pt = (t) => `Property 'weight' in key '${t}' must be a positive integer`, $e = Object.prototype.hasOwnProperty;
class mt {
  constructor(e) {
    this._keys = [], this._keyMap = {};
    let s = 0;
    e.forEach((n) => {
      const i = Ke(n);
      this._keys.push(i), this._keyMap[i.id] = i, s += i.weight;
    }), this._keys.forEach((n) => {
      n.weight /= s;
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
function Ke(t) {
  let e = null, s = null, n = null, i = 1, o = null;
  if (_(t) || B(t))
    n = t, e = De(t), s = ue(t);
  else {
    if (!$e.call(t, "name"))
      throw new Error(gt("name"));
    const c = t.name;
    if (n = c, $e.call(t, "weight") && (i = t.weight, i <= 0))
      throw new Error(pt(c));
    e = De(c), s = ue(c), o = t.getFn;
  }
  return {
    path: e,
    id: s,
    weight: i,
    src: n,
    getFn: o
  };
}
function De(t) {
  return B(t) ? t : t.split(".");
}
function ue(t) {
  return B(t) ? t.join(".") : t;
}
function yt(t, e) {
  const s = [];
  let n = !1;
  const i = (o, c, r, a) => {
    if (v(o))
      if (!c[r])
        s.push(a !== void 0 ? {
          v: o,
          i: a
        } : o);
      else {
        const d = c[r], l = o[d];
        if (!v(l))
          return;
        if (r === c.length - 1 && (_(l) || Q(l) || lt(l) || typeof l == "bigint"))
          s.push(a !== void 0 ? {
            v: le(l),
            i: a
          } : le(l));
        else if (B(l)) {
          n = !0;
          for (let f = 0, g = l.length; f < g; f += 1)
            i(l[f], c, r + 1, f);
        } else c.length && i(l, c, r + 1, a);
      }
  };
  return i(t, _(e) ? e.split(".") : e, 0), n ? s : s[0];
}
const kt = {
  includeMatches: !1,
  findAllMatches: !1,
  minMatchCharLength: 1
}, wt = {
  isCaseSensitive: !1,
  ignoreDiacritics: !1,
  includeScore: !1,
  keys: [],
  shouldSort: !0,
  sortFn: (t, e) => t.score === e.score ? t.idx < e.idx ? -1 : 1 : t.score < e.score ? -1 : 1
}, bt = {
  location: 0,
  threshold: 0.6,
  distance: 100
}, Et = {
  useExtendedSearch: !1,
  useTokenSearch: !1,
  getFn: yt,
  ignoreLocation: !1,
  ignoreFieldNorm: !1,
  fieldNormWeight: 1
}, m = Object.freeze({
  ...wt,
  ...kt,
  ...bt,
  ...Et
}), At = /[^ ]+/g;
function _t(t = 1, e = 3) {
  const s = /* @__PURE__ */ new Map(), n = Math.pow(10, e);
  return {
    get(i) {
      const o = i.match(At).length;
      if (s.has(o))
        return s.get(o);
      const c = 1 / Math.pow(o, 0.5 * t), r = parseFloat(Math.round(c * n) / n);
      return s.set(o, r), r;
    },
    clear() {
      s.clear();
    }
  };
}
class _e {
  constructor({
    getFn: e = m.getFn,
    fieldNormWeight: s = m.fieldNormWeight
  } = {}) {
    this.norm = _t(s, 3), this.getFn = e, this.isCreated = !1, this.docs = [], this.keys = [], this._keysMap = {}, this.setIndexRecords();
  }
  setSources(e = []) {
    this.docs = e;
  }
  setIndexRecords(e = []) {
    this.records = e;
  }
  setKeys(e = []) {
    this.keys = e, this._keysMap = {}, e.forEach((s, n) => {
      this._keysMap[s.id] = n;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, _(this.docs[0]) ? this.docs.forEach((e, s) => {
      this._addString(e, s);
    }) : this.docs.forEach((e, s) => {
      this._addObject(e, s);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(e) {
    const s = this.size();
    _(e) ? this._addString(e, s) : this._addObject(e, s);
  }
  // Removes the doc at the specified index of the index
  removeAt(e) {
    this.records.splice(e, 1);
    for (let s = e, n = this.size(); s < n; s += 1)
      this.records[s].i -= 1;
  }
  // Removes docs at the specified indices (must be sorted ascending)
  removeAll(e) {
    for (let s = e.length - 1; s >= 0; s -= 1)
      this.records.splice(e[s], 1);
    for (let s = 0, n = this.records.length; s < n; s += 1)
      this.records[s].i = s;
  }
  getValueForItemAtKeyId(e, s) {
    return e[this._keysMap[s]];
  }
  size() {
    return this.records.length;
  }
  _addString(e, s) {
    if (!v(e) || q(e))
      return;
    const n = {
      v: e,
      i: s,
      n: this.norm.get(e)
    };
    this.records.push(n);
  }
  _addObject(e, s) {
    const n = {
      i: s,
      $: {}
    };
    this.keys.forEach((i, o) => {
      const c = i.getFn ? i.getFn(e) : this.getFn(e, i.path);
      if (v(c)) {
        if (B(c)) {
          const r = [];
          for (let a = 0, d = c.length; a < d; a += 1) {
            const l = c[a];
            if (v(l)) {
              if (_(l)) {
                if (!q(l)) {
                  const f = {
                    v: l,
                    i: a,
                    n: this.norm.get(l)
                  };
                  r.push(f);
                }
              } else if (v(l.v)) {
                const f = _(l.v) ? l.v : le(l.v);
                if (!q(f)) {
                  const g = {
                    v: f,
                    i: l.i,
                    n: this.norm.get(f)
                  };
                  r.push(g);
                }
              }
            }
          }
          n.$[o] = r;
        } else if (_(c) && !q(c)) {
          const r = {
            v: c,
            n: this.norm.get(c)
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
        ...s
      }) => s),
      records: this.records
    };
  }
}
function Ye(t, e, {
  getFn: s = m.getFn,
  fieldNormWeight: n = m.fieldNormWeight
} = {}) {
  const i = new _e({
    getFn: s,
    fieldNormWeight: n
  });
  return i.setKeys(t.map(Ke)), i.setSources(e), i.create(), i;
}
function xt(t, {
  getFn: e = m.getFn,
  fieldNormWeight: s = m.fieldNormWeight
} = {}) {
  const {
    keys: n,
    records: i
  } = t, o = new _e({
    getFn: e,
    fieldNormWeight: s
  });
  return o.setKeys(n), o.setIndexRecords(i), o;
}
function vt(t = [], e = m.minMatchCharLength) {
  const s = [];
  let n = -1, i = -1, o = 0;
  for (let c = t.length; o < c; o += 1) {
    const r = t[o];
    r && n === -1 ? n = o : !r && n !== -1 && (i = o - 1, i - n + 1 >= e && s.push([n, i]), n = -1);
  }
  return t[o - 1] && o - n >= e && s.push([n, o - 1]), s;
}
const N = 32;
function Ct(t, e, s, {
  location: n = m.location,
  distance: i = m.distance,
  threshold: o = m.threshold,
  findAllMatches: c = m.findAllMatches,
  minMatchCharLength: r = m.minMatchCharLength,
  includeMatches: a = m.includeMatches,
  ignoreLocation: d = m.ignoreLocation
} = {}) {
  if (e.length > N)
    throw new Error(ft(N));
  const l = e.length, f = t.length, g = Math.max(0, Math.min(n, f));
  let h = o, k = g;
  const p = (x, $) => {
    const S = x / l;
    if (d) return S;
    const z = Math.abs(g - $);
    return i ? S + z / i : z ? 1 : S;
  }, u = r > 1 || a, y = u ? Array(f) : [];
  let b;
  for (; (b = t.indexOf(e, k)) > -1; ) {
    const x = p(0, b);
    if (h = Math.min(x, h), k = b + l, u) {
      let $ = 0;
      for (; $ < l; )
        y[b + $] = 1, $ += 1;
    }
  }
  k = -1;
  let E = [], A = 1, C = l + f;
  const rt = 1 << l - 1;
  for (let x = 0; x < l; x += 1) {
    let $ = 0, S = C;
    for (; $ < S; )
      p(x, g + S) <= h ? $ = S : C = S, S = Math.floor((C - $) / 2 + $);
    C = S;
    let z = Math.max(1, g - S + 1);
    const re = c ? f : Math.min(g + S, f) + l, P = Array(re + 2);
    P[re + 1] = (1 << x) - 1;
    for (let M = re; M >= z; M -= 1) {
      const Y = M - 1, Me = s[t[Y]];
      if (u && (y[Y] = +!!Me), P[M] = (P[M + 1] << 1 | 1) & Me, x && (P[M] |= (E[M + 1] | E[M]) << 1 | 1 | E[M + 1]), P[M] & rt && (A = p(x, Y), A <= h)) {
        if (h = A, k = Y, k <= g)
          break;
        z = Math.max(1, 2 * g - k);
      }
    }
    if (p(x + 1, g) > h)
      break;
    E = P;
  }
  const ie = {
    isMatch: k >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, A)
  };
  if (u) {
    const x = vt(y, r);
    x.length ? a && (ie.indices = x) : ie.isMatch = !1;
  }
  return ie;
}
function St(t) {
  const e = {};
  for (let s = 0, n = t.length; s < n; s += 1) {
    const i = t.charAt(s);
    e[i] = (e[i] || 0) | 1 << n - s - 1;
  }
  return e;
}
function xe(t) {
  if (t.length <= 1) return t;
  t.sort((s, n) => s[0] - n[0] || s[1] - n[1]);
  const e = [t[0]];
  for (let s = 1, n = t.length; s < n; s += 1) {
    const i = e[e.length - 1], o = t[s];
    o[0] <= i[1] + 1 ? i[1] = Math.max(i[1], o[1]) : e.push(o);
  }
  return e;
}
const qe = {
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
}, It = new RegExp("[" + Object.keys(qe).join("") + "]", "g"), K = String.prototype.normalize ? (t) => t.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(It, (e) => qe[e]) : (t) => t;
class ve {
  constructor(e, {
    location: s = m.location,
    threshold: n = m.threshold,
    distance: i = m.distance,
    includeMatches: o = m.includeMatches,
    findAllMatches: c = m.findAllMatches,
    minMatchCharLength: r = m.minMatchCharLength,
    isCaseSensitive: a = m.isCaseSensitive,
    ignoreDiacritics: d = m.ignoreDiacritics,
    ignoreLocation: l = m.ignoreLocation
  } = {}) {
    if (this.options = {
      location: s,
      threshold: n,
      distance: i,
      includeMatches: o,
      findAllMatches: c,
      minMatchCharLength: r,
      isCaseSensitive: a,
      ignoreDiacritics: d,
      ignoreLocation: l
    }, e = a ? e : e.toLowerCase(), e = d ? K(e) : e, this.pattern = e, this.chunks = [], !this.pattern.length)
      return;
    const f = (h, k) => {
      this.chunks.push({
        pattern: h,
        alphabet: St(h),
        startIndex: k
      });
    }, g = this.pattern.length;
    if (g > N) {
      let h = 0;
      const k = g % N, p = g - k;
      for (; h < p; )
        f(this.pattern.substr(h, N), h), h += N;
      if (k) {
        const u = g - N;
        f(this.pattern.substr(u), u);
      }
    } else
      f(this.pattern, 0);
  }
  searchIn(e) {
    const {
      isCaseSensitive: s,
      ignoreDiacritics: n,
      includeMatches: i
    } = this.options;
    if (e = s ? e : e.toLowerCase(), e = n ? K(e) : e, this.pattern === e) {
      const p = {
        isMatch: !0,
        score: 0
      };
      return i && (p.indices = [[0, e.length - 1]]), p;
    }
    const {
      location: o,
      distance: c,
      threshold: r,
      findAllMatches: a,
      minMatchCharLength: d,
      ignoreLocation: l
    } = this.options, f = [];
    let g = 0, h = !1;
    this.chunks.forEach(({
      pattern: p,
      alphabet: u,
      startIndex: y
    }) => {
      const {
        isMatch: b,
        score: E,
        indices: A
      } = Ct(e, p, u, {
        location: o + y,
        distance: c,
        threshold: r,
        findAllMatches: a,
        minMatchCharLength: d,
        includeMatches: i,
        ignoreLocation: l
      });
      b && (h = !0), g += E, b && A && f.push(...A);
    });
    const k = {
      isMatch: h,
      score: h ? g / this.chunks.length : 1
    };
    return h && i && (k.indices = xe(f)), k;
  }
}
class R {
  constructor(e) {
    this.pattern = e;
  }
  static isMultiMatch(e) {
    return Le(e, this.multiRegex);
  }
  static isSingleMatch(e) {
    return Le(e, this.singleRegex);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(e) {
    return {
      isMatch: !1,
      score: 1
    };
  }
}
function Le(t, e) {
  const s = t.match(e);
  return s ? s[1] : null;
}
class Mt extends R {
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
    const s = e === this.pattern;
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class $t extends R {
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
class Dt extends R {
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
    const s = e.startsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class Lt extends R {
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
    const s = !e.startsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class Ft extends R {
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
    const s = e.endsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [e.length - this.pattern.length, e.length - 1]
    };
  }
}
class Tt extends R {
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
    const s = !e.endsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class Ue extends R {
  constructor(e, {
    location: s = m.location,
    threshold: n = m.threshold,
    distance: i = m.distance,
    includeMatches: o = m.includeMatches,
    findAllMatches: c = m.findAllMatches,
    minMatchCharLength: r = m.minMatchCharLength,
    isCaseSensitive: a = m.isCaseSensitive,
    ignoreDiacritics: d = m.ignoreDiacritics,
    ignoreLocation: l = m.ignoreLocation
  } = {}) {
    super(e), this._bitapSearch = new ve(e, {
      location: s,
      threshold: n,
      distance: i,
      includeMatches: o,
      findAllMatches: c,
      minMatchCharLength: r,
      isCaseSensitive: a,
      ignoreDiacritics: d,
      ignoreLocation: l
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
class Ge extends R {
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
    let s = 0, n;
    const i = [], o = this.pattern.length;
    for (; (n = e.indexOf(this.pattern, s)) > -1; )
      s = n + o, i.push([n, s - 1]);
    const c = !!i.length;
    return {
      isMatch: c,
      score: c ? 0 : 1,
      indices: i
    };
  }
}
const he = [Mt, Ge, Dt, Lt, Tt, Ft, $t, Ue], Fe = he.length, Bt = "\0", Rt = "|";
function Nt(t) {
  const e = [], s = t.length;
  let n = 0;
  for (; n < s; ) {
    for (; n < s && t[n] === " "; ) n++;
    if (n >= s) break;
    let i = n;
    for (; i < s && t[i] !== " " && t[i] !== '"'; ) i++;
    if (i < s && t[i] === '"') {
      for (i++; i < s; ) {
        if (t[i] === '"') {
          const o = i + 1;
          if (o >= s || t[o] === " ") {
            i++;
            break;
          }
          if (t[o] === "$" && (o + 1 >= s || t[o + 1] === " ")) {
            i += 2;
            break;
          }
        }
        i++;
      }
      e.push(t.substring(n, i)), n = i;
    } else {
      for (; i < s && t[i] !== " "; ) i++;
      e.push(t.substring(n, i)), n = i;
    }
  }
  return e;
}
function Ot(t, e = {}) {
  return t.replace(/\\\|/g, Bt).split(Rt).map((n) => {
    const i = n.replace(/\u0000/g, "|"), o = Nt(i.trim()).filter((r) => r && !!r.trim()), c = [];
    for (let r = 0, a = o.length; r < a; r += 1) {
      const d = o[r];
      let l = !1, f = -1;
      for (; !l && ++f < Fe; ) {
        const g = he[f], h = g.isMultiMatch(d);
        h && (c.push(new g(h, e)), l = !0);
      }
      if (!l)
        for (f = -1; ++f < Fe; ) {
          const g = he[f], h = g.isSingleMatch(d);
          if (h) {
            c.push(new g(h, e));
            break;
          }
        }
    }
    return c;
  });
}
const Pt = /* @__PURE__ */ new Set([Ue.type, Ge.type]);
class jt {
  constructor(e, {
    isCaseSensitive: s = m.isCaseSensitive,
    ignoreDiacritics: n = m.ignoreDiacritics,
    includeMatches: i = m.includeMatches,
    minMatchCharLength: o = m.minMatchCharLength,
    ignoreLocation: c = m.ignoreLocation,
    findAllMatches: r = m.findAllMatches,
    location: a = m.location,
    threshold: d = m.threshold,
    distance: l = m.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: s,
      ignoreDiacritics: n,
      includeMatches: i,
      minMatchCharLength: o,
      findAllMatches: r,
      ignoreLocation: c,
      location: a,
      threshold: d,
      distance: l
    }, e = s ? e : e.toLowerCase(), e = n ? K(e) : e, this.pattern = e, this.query = Ot(this.pattern, this.options);
  }
  static condition(e, s) {
    return s.useExtendedSearch;
  }
  // Note: searchIn operates on a single text value and sets hasInverse on the
  // result when inverse patterns are involved. _searchObjectList uses this to
  // switch from "ANY key" to "ALL keys" aggregation. See #712.
  searchIn(e) {
    const s = this.query;
    if (!s)
      return {
        isMatch: !1,
        score: 1
      };
    const {
      includeMatches: n,
      isCaseSensitive: i,
      ignoreDiacritics: o
    } = this.options;
    e = i ? e : e.toLowerCase(), e = o ? K(e) : e;
    let c = 0;
    const r = [];
    let a = 0, d = !1;
    for (let l = 0, f = s.length; l < f; l += 1) {
      const g = s[l];
      r.length = 0, c = 0, d = !1;
      for (let h = 0, k = g.length; h < k; h += 1) {
        const p = g[h], {
          isMatch: u,
          indices: y,
          score: b
        } = p.search(e);
        if (u) {
          c += 1, a += b;
          const E = p.constructor.type;
          E.startsWith("inverse") && (d = !0), n && (Pt.has(E) ? r.push(...y) : r.push(y));
        } else {
          a = 0, c = 0, r.length = 0, d = !1;
          break;
        }
      }
      if (c) {
        const h = {
          isMatch: !0,
          score: a / c
        };
        return d && (h.hasInverse = !0), n && (h.indices = xe(r)), h;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const de = [];
function Ce(...t) {
  de.push(...t);
}
function Z(t, e) {
  for (let s = 0, n = de.length; s < n; s += 1) {
    const i = de[s];
    if (i.condition(t, e))
      return new i(t, e);
  }
  return new ve(t, e);
}
const ee = {
  AND: "$and",
  OR: "$or"
}, fe = {
  PATH: "$path",
  PATTERN: "$val"
}, ge = (t) => !!(t[ee.AND] || t[ee.OR]), zt = (t) => !!t[fe.PATH], Ht = (t) => !B(t) && He(t) && !ge(t), Te = (t) => ({
  [ee.AND]: Object.keys(t).map((e) => ({
    [e]: t[e]
  }))
});
function Qe(t, e, {
  auto: s = !0
} = {}) {
  const n = (i) => {
    if (_(i)) {
      const a = {
        keyId: null,
        pattern: i
      };
      return s && (a.searcher = Z(i, e)), a;
    }
    const o = Object.keys(i), c = zt(i);
    if (!c && o.length > 1 && !ge(i))
      return n(Te(i));
    if (Ht(i)) {
      const a = c ? i[fe.PATH] : o[0], d = c ? i[fe.PATTERN] : i[a];
      if (!_(d))
        throw new Error(dt(a));
      const l = {
        keyId: ue(a),
        pattern: d
      };
      return s && (l.searcher = Z(d, e)), l;
    }
    const r = {
      children: [],
      operator: o[0]
    };
    return o.forEach((a) => {
      const d = i[a];
      B(d) && d.forEach((l) => {
        r.children.push(n(l));
      });
    }), r;
  };
  return ge(t) || (t = Te(t)), n(t);
}
function pe(t, {
  ignoreFieldNorm: e = m.ignoreFieldNorm
}) {
  let s = 1;
  return t.forEach(({
    key: n,
    norm: i,
    score: o
  }) => {
    const c = n ? n.weight : null;
    s *= Math.pow(o === 0 && c ? Number.EPSILON : o, (c || 1) * (e ? 1 : i));
  }), s;
}
function Wt(t, {
  ignoreFieldNorm: e = m.ignoreFieldNorm
}) {
  t.forEach((s) => {
    s.score = pe(s.matches, {
      ignoreFieldNorm: e
    });
  });
}
class Kt {
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
    const s = this.heap;
    for (; e > 0; ) {
      const n = e - 1 >> 1;
      if (s[e].score <= s[n].score) break;
      const i = s[e];
      s[e] = s[n], s[n] = i, e = n;
    }
  }
  _sinkDown(e) {
    const s = this.heap, n = s.length;
    let i = e;
    do {
      e = i;
      const o = 2 * e + 1, c = 2 * e + 2;
      if (o < n && s[o].score > s[i].score && (i = o), c < n && s[c].score > s[i].score && (i = c), i !== e) {
        const r = s[e];
        s[e] = s[i], s[i] = r;
      }
    } while (i !== e);
  }
}
function Yt(t, e) {
  const s = t.matches;
  e.matches = [], v(s) && s.forEach((n) => {
    if (!v(n.indices) || !n.indices.length)
      return;
    const {
      indices: i,
      value: o
    } = n, c = {
      indices: i,
      value: o
    };
    n.key && (c.key = n.key.src), n.idx > -1 && (c.refIndex = n.idx), e.matches.push(c);
  });
}
function qt(t, e) {
  e.score = t.score;
}
function Ut(t, e, {
  includeMatches: s = m.includeMatches,
  includeScore: n = m.includeScore
} = {}) {
  const i = [];
  return s && i.push(Yt), n && i.push(qt), t.map((o) => {
    const {
      idx: c
    } = o, r = {
      item: e[c],
      refIndex: c
    };
    return i.length && i.forEach((a) => {
      a(o, r);
    }), r;
  });
}
const Gt = /\b\w+\b/g;
function me({
  isCaseSensitive: t = !1,
  ignoreDiacritics: e = !1
} = {}) {
  return {
    tokenize(s) {
      return t || (s = s.toLowerCase()), e && (s = K(s)), s.match(Gt) || [];
    }
  };
}
function Qt(t, e, s) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = 0;
  function c(r, a, d, l) {
    const f = s.tokenize(r);
    if (!f.length) return;
    o++;
    const g = /* @__PURE__ */ new Map();
    for (const h of f)
      g.set(h, (g.get(h) || 0) + 1);
    for (const [h, k] of g) {
      const p = {
        docIdx: a,
        keyIdx: d,
        subIdx: l,
        tf: k
      };
      let u = n.get(h);
      u || (u = [], n.set(h, u)), u.push(p), i.set(h, (i.get(h) || 0) + 1);
    }
  }
  for (const r of t) {
    const {
      i: a,
      v: d,
      $: l
    } = r;
    if (d !== void 0) {
      c(d, a, -1, -1);
      continue;
    }
    if (l)
      for (let f = 0; f < e; f++) {
        const g = l[f];
        if (g)
          if (Array.isArray(g))
            for (const h of g)
              c(h.v, a, f, h.i ?? -1);
          else
            c(g.v, a, f, -1);
      }
  }
  return {
    terms: n,
    fieldCount: o,
    df: i
  };
}
function Vt(t, e, s, n) {
  const {
    i,
    v: o,
    $: c
  } = e;
  function r(a, d, l) {
    const f = n.tokenize(a);
    if (!f.length) return;
    t.fieldCount++;
    const g = /* @__PURE__ */ new Map();
    for (const h of f)
      g.set(h, (g.get(h) || 0) + 1);
    for (const [h, k] of g) {
      const p = {
        docIdx: i,
        keyIdx: d,
        subIdx: l,
        tf: k
      };
      let u = t.terms.get(h);
      u || (u = [], t.terms.set(h, u)), u.push(p), t.df.set(h, (t.df.get(h) || 0) + 1);
    }
  }
  if (o !== void 0) {
    r(o, -1, -1);
    return;
  }
  if (c)
    for (let a = 0; a < s; a++) {
      const d = c[a];
      if (d)
        if (Array.isArray(d))
          for (const l of d)
            r(l.v, a, l.i ?? -1);
        else
          r(d.v, a, -1);
    }
}
function Be(t, e) {
  for (const [s, n] of t.terms) {
    const i = n.filter((c) => c.docIdx !== e), o = n.length - i.length;
    o > 0 && (t.fieldCount -= o, t.df.set(s, (t.df.get(s) || 0) - o), i.length === 0 ? (t.terms.delete(s), t.df.delete(s)) : t.terms.set(s, i));
  }
}
class L {
  // Statics are assigned in entry.ts
  constructor(e, s, n) {
    this.options = {
      ...m,
      ...s
    }, this.options.useExtendedSearch, this.options.useTokenSearch, this._keyStore = new mt(this.options.keys), this._docs = e, this._myIndex = null, this._invertedIndex = null, this.setCollection(e, n), this._lastQuery = null, this._lastSearcher = null;
  }
  _getSearcher(e) {
    if (this._lastQuery === e)
      return this._lastSearcher;
    const s = this._invertedIndex ? {
      ...this.options,
      _invertedIndex: this._invertedIndex
    } : this.options, n = Z(e, s);
    return this._lastQuery = e, this._lastSearcher = n, n;
  }
  setCollection(e, s) {
    if (this._docs = e, s && !(s instanceof _e))
      throw new Error(ht);
    if (this._myIndex = s || Ye(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    }), this.options.useTokenSearch) {
      const n = me({
        isCaseSensitive: this.options.isCaseSensitive,
        ignoreDiacritics: this.options.ignoreDiacritics
      });
      this._invertedIndex = Qt(this._myIndex.records, this._myIndex.keys.length, n);
    }
  }
  add(e) {
    if (v(e) && (this._docs.push(e), this._myIndex.add(e), this._invertedIndex)) {
      const s = this._myIndex.records[this._myIndex.records.length - 1], n = me({
        isCaseSensitive: this.options.isCaseSensitive,
        ignoreDiacritics: this.options.ignoreDiacritics
      });
      Vt(this._invertedIndex, s, this._myIndex.keys.length, n);
    }
  }
  remove(e = () => !1) {
    const s = [], n = [];
    for (let i = 0, o = this._docs.length; i < o; i += 1)
      e(this._docs[i], i) && (s.push(this._docs[i]), n.push(i));
    if (n.length) {
      if (this._invertedIndex)
        for (const i of n)
          Be(this._invertedIndex, i);
      for (let i = n.length - 1; i >= 0; i -= 1)
        this._docs.splice(n[i], 1);
      this._myIndex.removeAll(n);
    }
    return s;
  }
  removeAt(e) {
    this._invertedIndex && Be(this._invertedIndex, e);
    const s = this._docs.splice(e, 1)[0];
    return this._myIndex.removeAt(e), s;
  }
  getIndex() {
    return this._myIndex;
  }
  search(e, s) {
    const {
      limit: n = -1
    } = s || {}, {
      includeMatches: i,
      includeScore: o,
      shouldSort: c,
      sortFn: r,
      ignoreFieldNorm: a
    } = this.options;
    if (_(e) && !e.trim()) {
      let f = this._docs.map((g, h) => ({
        item: g,
        refIndex: h
      }));
      return Q(n) && n > -1 && (f = f.slice(0, n)), f;
    }
    const d = Q(n) && n > 0 && _(e);
    let l;
    if (d) {
      const f = new Kt(n);
      _(this._docs[0]) ? this._searchStringList(e, {
        heap: f,
        ignoreFieldNorm: a
      }) : this._searchObjectList(e, {
        heap: f,
        ignoreFieldNorm: a
      }), l = f.extractSorted(r);
    } else
      l = _(e) ? _(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e), Wt(l, {
        ignoreFieldNorm: a
      }), c && l.sort(r), Q(n) && n > -1 && (l = l.slice(0, n));
    return Ut(l, this._docs, {
      includeMatches: i,
      includeScore: o
    });
  }
  _searchStringList(e, {
    heap: s,
    ignoreFieldNorm: n
  } = {}) {
    const i = this._getSearcher(e), {
      records: o
    } = this._myIndex, c = s ? null : [];
    return o.forEach(({
      v: r,
      i: a,
      n: d
    }) => {
      if (!v(r))
        return;
      const {
        isMatch: l,
        score: f,
        indices: g
      } = i.searchIn(r);
      if (l) {
        const h = {
          item: r,
          idx: a,
          matches: [{
            score: f,
            value: r,
            norm: d,
            indices: g
          }]
        };
        s ? (h.score = pe(h.matches, {
          ignoreFieldNorm: n
        }), s.shouldInsert(h.score) && s.insert(h)) : c.push(h);
      }
    }), c;
  }
  _searchLogical(e) {
    const s = Qe(e, this.options), n = (r, a, d) => {
      if (!("children" in r)) {
        const {
          keyId: h,
          searcher: k
        } = r;
        let p;
        return h === null ? (p = [], this._myIndex.keys.forEach((u, y) => {
          p.push(...this._findMatches({
            key: u,
            value: a[y],
            searcher: k
          }));
        })) : p = this._findMatches({
          key: this._keyStore.get(h),
          value: this._myIndex.getValueForItemAtKeyId(a, h),
          searcher: k
        }), p && p.length ? [{
          idx: d,
          item: a,
          matches: p
        }] : [];
      }
      const {
        children: l,
        operator: f
      } = r, g = [];
      for (let h = 0, k = l.length; h < k; h += 1) {
        const p = l[h], u = n(p, a, d);
        if (u.length)
          g.push(...u);
        else if (f === ee.AND)
          return [];
      }
      return g;
    }, i = this._myIndex.records, o = /* @__PURE__ */ new Map(), c = [];
    return i.forEach(({
      $: r,
      i: a
    }) => {
      if (v(r)) {
        const d = n(s, r, a);
        d.length && (o.has(a) || (o.set(a, {
          idx: a,
          item: r,
          matches: []
        }), c.push(o.get(a))), d.forEach(({
          matches: l
        }) => {
          o.get(a).matches.push(...l);
        }));
      }
    }), c;
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
    heap: s,
    ignoreFieldNorm: n
  } = {}) {
    const i = this._getSearcher(e), {
      keys: o,
      records: c
    } = this._myIndex, r = s ? null : [];
    return c.forEach(({
      $: a,
      i: d
    }) => {
      if (!v(a))
        return;
      const l = [];
      let f = !1, g = !1;
      if (o.forEach((h, k) => {
        const p = this._findMatches({
          key: h,
          value: a[k],
          searcher: i
        });
        p.length ? (l.push(...p), p[0].hasInverse && (g = !0)) : f = !0;
      }), !(g && f) && l.length) {
        const h = {
          idx: d,
          item: a,
          matches: l
        };
        s ? (h.score = pe(h.matches, {
          ignoreFieldNorm: n
        }), s.shouldInsert(h.score) && s.insert(h)) : r.push(h);
      }
    }), r;
  }
  _findMatches({
    key: e,
    value: s,
    searcher: n
  }) {
    if (!v(s))
      return [];
    const i = [];
    if (B(s))
      s.forEach(({
        v: o,
        i: c,
        n: r
      }) => {
        if (!v(o))
          return;
        const {
          isMatch: a,
          score: d,
          indices: l,
          hasInverse: f
        } = n.searchIn(o);
        a && i.push({
          score: d,
          key: e,
          value: o,
          idx: c,
          norm: r,
          indices: l,
          hasInverse: f
        });
      });
    else {
      const {
        v: o,
        n: c
      } = s, {
        isMatch: r,
        score: a,
        indices: d,
        hasInverse: l
      } = n.searchIn(o);
      r && i.push({
        score: a,
        key: e,
        value: o,
        norm: c,
        indices: d,
        hasInverse: l
      });
    }
    return i;
  }
}
class Jt {
  static condition(e, s) {
    return s.useTokenSearch;
  }
  constructor(e, s) {
    this.options = s, this.analyzer = me({
      isCaseSensitive: s.isCaseSensitive,
      ignoreDiacritics: s.ignoreDiacritics
    });
    const n = this.analyzer.tokenize(e), i = s._invertedIndex, {
      df: o,
      fieldCount: c
    } = i;
    this.termSearchers = [], this.idfWeights = [];
    for (const r of n) {
      this.termSearchers.push(new ve(r, {
        location: s.location,
        threshold: s.threshold,
        distance: s.distance,
        includeMatches: s.includeMatches,
        findAllMatches: s.findAllMatches,
        minMatchCharLength: s.minMatchCharLength,
        isCaseSensitive: s.isCaseSensitive,
        ignoreDiacritics: s.ignoreDiacritics,
        ignoreLocation: !0
      }));
      const a = o.get(r) || 0, d = Math.log(1 + (c - a + 0.5) / (a + 0.5));
      this.idfWeights.push(d);
    }
  }
  searchIn(e) {
    if (!this.termSearchers.length)
      return {
        isMatch: !1,
        score: 1
      };
    const s = [];
    let n = 0, i = 0, o = 0;
    for (let a = 0; a < this.termSearchers.length; a++) {
      const d = this.termSearchers[a].searchIn(e), l = this.idfWeights[a];
      i += l, d.isMatch && (o++, n += l * (1 - d.score), d.indices && s.push(...d.indices));
    }
    if (o === 0)
      return {
        isMatch: !1,
        score: 1
      };
    const c = i > 0 ? 1 - n / i : 0, r = {
      isMatch: !0,
      score: Math.max(1e-3, c)
    };
    return this.options.includeMatches && s.length && (r.indices = xe(s)), r;
  }
}
L.version = "7.3.0";
L.createIndex = Ye;
L.parseIndex = xt;
L.config = m;
L.match = function(t, e, s) {
  return Z(t, {
    ...m,
    ...s
  }).searchIn(e);
};
L.parseQuery = Qe;
Ce(jt);
Ce(Jt);
L.use = function(...t) {
  t.forEach((e) => Ce(e));
};
const Xt = /* @__PURE__ */ new Set([
  "what",
  "which",
  "who",
  "how",
  "does",
  "did",
  "do",
  "is",
  "are",
  "was",
  "were",
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "in",
  "to",
  "for",
  "on",
  "at",
  "has",
  "have",
  "had",
  "you",
  "your",
  "his",
  "her",
  "can",
  "could",
  "would",
  "should",
  "tell",
  "me",
  "about",
  "show",
  "give",
  "please",
  "i",
  "my",
  "he",
  "she",
  "it",
  "they",
  "them",
  "this",
  "that",
  "with",
  "from",
  "be",
  "been",
  "being"
]);
function Zt(t) {
  const e = t.toLowerCase().split(/\s+/).filter((s) => !Xt.has(s.replace(/[?!.,]/g, "")));
  return e.length ? e.join(" ") : t;
}
function es(t) {
  const e = new L(t, {
    keys: [
      { name: "text", weight: 0.6 },
      { name: "label", weight: 0.3 },
      { name: "section", weight: 0.1 }
    ],
    threshold: 0.5,
    includeScore: !0,
    ignoreLocation: !0,
    minMatchCharLength: 2
  });
  return {
    search(s, n = 5) {
      if (!s || !s.trim()) return [];
      const i = Zt(s.trim());
      return e.search(i, { limit: n }).map((c) => ({
        ...c.item,
        score: c.score
      }));
    },
    getAllDocs() {
      return t;
    }
  };
}
const Ve = [
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
    target: "#repos",
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
], ye = [
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
], ke = {
  id: "meta.about_ai",
  type: "meta",
  keywords: ["how does this work", "what model", "are you ai", "who are you", "naresh.ai", "what powers you"],
  response: "I'm naresh.ai — a lightweight AI assistant built into this portfolio. I use Fuse.js to search through Naresh's resume data and LLM providers (Groq and Gemini as fallback) to generate natural language answers. Everything runs client-side except the API calls. You get 10 AI queries per day. Try asking about his career, skills, or leadership philosophy!"
}, Je = [...Ve, ...ye, ke], ts = Je.flatMap((t) => [
  ...t.keywords.map((e) => ({ text: e, intentId: t.id })),
  ...(t.examples || []).map((e) => ({ text: e, intentId: t.id }))
]), ss = new L(ts, {
  keys: ["text"],
  threshold: 0.35,
  includeScore: !0,
  ignoreLocation: !0
});
function ns(t, e, s) {
  const n = t.trim().toLowerCase();
  if (!n) return null;
  if (ke.keywords.some((r) => n.includes(r)))
    return { intent: ke, confidence: 1 };
  for (const r of Ve)
    if (r.keywords.some((d) => {
      const l = d.toLowerCase();
      return n === l || n.includes(l);
    }) && (n.split(/\s+/).length <= 4 || !Re(n)))
      return { intent: r, confidence: 0.9 };
  const o = ["testgorilla", "hopin", "vue.ai", "weinvest", "freshworks", "cognizant"].find((r) => n.includes(r));
  if (o && Re(n))
    return {
      intent: ye.find((r) => r.id === "qa.career_detail"),
      confidence: 0.85,
      params: { company: o }
    };
  const c = ss.search(n, { limit: 5 });
  if (c.length) {
    const r = c[0], a = 1 - r.score, d = r.item.intentId, l = Je.find((f) => f.id === d);
    if (l && a > 0.7)
      return l.type === "navigate" ? { intent: l, confidence: a } : { intent: l, confidence: a };
    if (l && a > 0.4)
      return { intent: l, confidence: a };
  }
  return {
    intent: ye.find((r) => r.id === "qa.general"),
    confidence: 0.3
  };
}
function Re(t) {
  const e = [
    "what",
    "how",
    "why",
    "when",
    "where",
    "who",
    "tell",
    "describe",
    "explain",
    "show",
    "can",
    "do",
    "does",
    "is",
    "are",
    "have",
    "has"
  ], s = t.split(/\s+/)[0];
  return t.includes("?") || e.includes(s);
}
const is = `You are naresh.ai, a concise AI assistant for Naresh Sekar's professional portfolio.

Rules:
- Answer ONLY from the provided context. If the context doesn't contain the answer, say so honestly.
- Use first person ("I", "my") when speaking as Naresh.
- Keep answers under 3 short paragraphs. Be specific: include company names, technologies, and dates when available.
- For recruiter-style questions, be honest and factual. Don't oversell.
- If asked about something not in the context, suggest which section of the portfolio might help.
- Format with **bold** for emphasis and bullet points (using -) for lists. Use short paragraphs separated by blank lines.
- Be conversational and natural, not robotic.`;
function rs(t, e) {
  const s = e.map((n) => `[Section: ${n.label || n.section}]
${n.text}`).join(`
---
`);
  return {
    system: is,
    user: `CONTEXT:
---
${s}
---

QUESTION: ${t}`
  };
}
const Xe = "https://naresh-ai-proxy.nareshnavinash.workers.dev", os = "openai/gpt-oss-20b", cs = "gpt-oss-20b";
function as() {
  return Xe.length > 0;
}
async function ls(t, e) {
  const s = {
    model: os,
    messages: [
      { role: "system", content: t },
      { role: "user", content: e }
    ],
    temperature: 0.4,
    max_tokens: 512
  }, n = await fetch(`${Xe}/api/groq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(s)
  });
  if (n.status === 429)
    throw new Error("RATE_LIMITED");
  if (!n.ok)
    throw new Error(`API_ERROR_${n.status}`);
  const o = (await n.json())?.choices?.[0]?.message?.content;
  if (!o)
    throw new Error("EMPTY_RESPONSE");
  return { text: o, model: cs };
}
const us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: ls,
  hasProxy: as
}, Symbol.toStringTag, { value: "Module" })), Ze = "https://naresh-ai-proxy.nareshnavinash.workers.dev", hs = "gemini-flash";
function ds() {
  return Ze.length > 0;
}
async function fs(t, e) {
  const s = {
    system_instruction: {
      parts: [{ text: t }]
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
  }, n = await fetch(`${Ze}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(s)
  });
  if (n.status === 429)
    throw new Error("RATE_LIMITED");
  if (!n.ok)
    throw new Error(`API_ERROR_${n.status}`);
  const o = (await n.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!o)
    throw new Error("EMPTY_RESPONSE");
  return { text: o, model: hs };
}
const gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: fs,
  hasProxy: ds
}, Symbol.toStringTag, { value: "Module" })), et = "naresh_ai_rate", te = 10;
let V = null;
function we() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function ps() {
  try {
    const t = localStorage.getItem(et);
    if (t) {
      const e = JSON.parse(t);
      if (e.date === we()) return e;
    }
  } catch {
  }
  return { date: we(), count: 0 };
}
function ms(t) {
  try {
    localStorage.setItem(et, JSON.stringify(t));
  } catch {
    V = t;
  }
}
function tt() {
  return V && V.date === we() ? V : ps();
}
function ys() {
  const t = tt();
  return t.count >= te ? { remaining: 0, allowed: !1 } : (t.count++, ms(t), { remaining: te - t.count, allowed: !0 });
}
function be() {
  return te - tt().count;
}
function Ee() {
  return te;
}
const Ne = 1500;
let oe = 0;
const st = [
  { name: "groq", client: us },
  { name: "gemini", client: gs }
];
function ks() {
  return st.some((t) => t.client.hasProxy());
}
async function ws(t, e) {
  if (!ys().allowed)
    throw new Error("DAILY_LIMIT");
  const n = Date.now();
  n - oe < Ne && await new Promise((o) => setTimeout(o, Ne - (n - oe))), oe = Date.now();
  let i = null;
  for (const { name: o, client: c } of st)
    if (c.hasProxy())
      try {
        return { ...await c.generate(t, e), provider: o };
      } catch (r) {
        i = r;
        continue;
      }
  throw i || new Error("NO_API_KEY");
}
let U = null, H = null;
async function bs() {
  return U || H || (H = fetch("data/ai-cache.json").then((t) => t.ok ? t.json() : []).catch(() => []).then((t) => (U = t, H = null, U)), H);
}
function ce(t) {
  return t.toLowerCase().replace(/[?!.,;:'"]/g, "").replace(/\s+/g, " ").trim();
}
function Es(t, e) {
  if (!e || !e.length) return null;
  const s = ce(t);
  for (const c of e)
    if (ce(c.q) === s) return c;
  const n = s.split(" ").filter((c) => c.length > 2);
  if (!n.length) return null;
  let i = null, o = 0;
  for (const c of e) {
    const r = ce(c.q);
    let a = 0;
    for (const l of n)
      r.includes(l) && a++;
    const d = a / Math.max(n.length, r.split(" ").filter((l) => l.length > 2).length);
    d > o && (o = d, i = c);
  }
  return o >= 0.7 ? i : null;
}
function Oe(t) {
  const e = /* @__PURE__ */ new Set(), s = [];
  for (const n of t)
    if (!e.has(n.section) && (e.add(n.section), s.push(n), s.length >= 5))
      break;
  return s;
}
async function As(t, e, s) {
  const n = e.search(t, 5), i = n.length >= 3 ? n : n.length ? [...n, ...Oe(s).filter((l) => !n.some((f) => f.id === l.id))].slice(0, 5) : Oe(s), o = i.map((l) => ({
    id: l.id,
    section: l.section,
    label: l.label,
    meta: l.meta
  })), c = await bs(), r = Es(t, c);
  if (r)
    return {
      type: "answer",
      text: r.a,
      sources: r.sources || o,
      model: r.model || "cached"
    };
  if (!ks())
    return {
      type: "fallback",
      text: "Here's what I found in the resume:",
      sources: o,
      chunks: i,
      model: null
    };
  const { system: a, user: d } = rs(t, i);
  try {
    const l = await ws(a, d);
    return {
      type: "answer",
      text: l.text,
      sources: o,
      model: l.model
    };
  } catch (l) {
    const f = l.message || "UNKNOWN";
    let g = "I couldn't reach the AI. Here's what I found locally:";
    return f === "DAILY_LIMIT" ? g = `You've reached the daily limit (${be()}/${Ee()}). Come back tomorrow! Here's what I found locally:` : f === "RATE_LIMITED" ? g = "naresh.ai is popular today — I've hit the rate limit. Here's what I found locally:" : f === "NO_API_KEY" && (g = "AI answers aren't configured. Here's what I found in the resume:"), {
      type: "fallback",
      text: g,
      sources: o,
      chunks: i,
      error: f,
      model: null
    };
  }
}
let w = null;
function _s(t) {
  const { logEl: e, inputEl: s, sendEl: n, suggEl: i, search: o, chunks: c, handlers: r, suggestions: a, queryRAG: d, getRemaining: l, getMax: f } = t;
  if (!e || !s || !n) return;
  const g = e.closest(".ask")?.querySelector(".ask__head-l");
  let h = null, k = null;
  if (g) {
    const y = g.querySelector("span:last-child");
    y && (y.innerHTML = 'naresh.ai · <span class="ask__status" data-state="ready">ready</span> · <span class="ask__rate"></span>', h = y.querySelector(".ask__status"), k = y.querySelector(".ask__rate"), k && l && (k.textContent = `${l()}/${f()}`));
  }
  const p = [
    {
      role: "a",
      text: "Hi! Ask me anything about Naresh's work, leadership, or projects. I'll answer from his resume."
    }
  ];
  w = {
    logEl: e,
    inputEl: s,
    sendEl: n,
    suggEl: i,
    statusEl: h,
    rateEl: k,
    messages: p,
    search: o,
    chunks: c,
    handlers: r,
    suggestions: a,
    queryRAG: d,
    getRemaining: l,
    getMax: f
  };
  const u = async (y) => {
    const b = (y || s.value || "").trim();
    if (b) {
      s.value = "", p.push({ role: "u", text: b }), F(), W("thinking"), p.push({ role: "t", stage: "searching resume..." }), F();
      try {
        const E = ns(b, o, r);
        if (E?.intent?.type === "meta") {
          G(), p.push({ role: "a", text: E.intent.response }), F(), W("ready");
          return;
        }
        if (E?.intent?.type === "navigate" && E.confidence >= 0.7) {
          const C = E.intent.target;
          if (G(), C.startsWith("/")) {
            p.push({ role: "a", text: "Taking you to the 3D world..." }), F(), W("ready"), setTimeout(() => {
              window.location.href = C;
            }, 600);
            return;
          }
          p.push({
            role: "a",
            text: `Scrolling to ${E.intent.id.replace("nav.", "")} section...`
          }), F(), W("ready"), r.scrollTo?.(C);
          return;
        }
        vs("generating answer...");
        const A = await d(b);
        G(), A.type === "answer" ? (p.push({ role: "a", text: A.text, model: A.model }), A.sources?.length && p.push({ role: "sources", items: A.sources })) : (p.push({
          role: "a",
          text: A.text,
          model: A.model,
          variant: A.error ? "error" : void 0
        }), A.chunks?.length && p.push({
          role: "sources",
          items: A.chunks.map((C) => ({
            id: C.id,
            section: C.section,
            label: C.label,
            meta: C.meta
          }))
        })), F(), Pe(), Is(E?.intent?.id);
      } catch {
        G(), p.push({
          role: "a",
          text: "Something went wrong. Try asking in a different way.",
          variant: "error"
        }), F(), Pe();
      }
      W("ready");
    }
  };
  return n.addEventListener("click", () => u()), s.addEventListener("keydown", (y) => {
    y.key === "Enter" && u();
  }), Cs(a, u), F(), { send: u };
}
function F() {
  if (!w) return;
  const { logEl: t, messages: e, handlers: s } = w;
  t.innerHTML = "", e.forEach((n) => {
    if (n.role === "a") {
      const i = document.createElement("div");
      i.className = "msg__tag", i.textContent = n.model ? `NARESH.AI · via ${n.model}` : "NARESH.AI";
      const o = document.createElement("div");
      o.innerHTML = Ss(n.text);
      const c = document.createElement("div");
      c.className = `msg msg--a${n.variant === "error" ? " msg--error" : ""}`, c.append(i, o), t.append(c);
    } else if (n.role === "u") {
      const i = document.createElement("div");
      i.className = "msg msg--u", i.textContent = n.text, t.append(i);
    } else if (n.role === "t") {
      const i = document.createElement("div");
      i.className = "msg msg--think", i.innerHTML = `<span class="thinking-dots"><span></span><span></span><span></span></span> <span class="thinking-label">${n.stage || "thinking..."}</span>`, t.append(i);
    } else if (n.role === "sources") {
      const i = document.createElement("div");
      i.className = "msg__sources", (n.items || []).forEach((o) => {
        const c = document.createElement("button");
        c.className = "msg__src", c.textContent = o.label || o.section, c.addEventListener("click", () => xs(o, s)), i.append(c);
      }), t.append(i);
    }
  }), t.scrollTop = t.scrollHeight;
}
function xs(t, e) {
  const s = {
    about: "#about",
    career: "#career",
    skills: "#skills",
    leadership: "#leadership",
    repos: "#repos",
    writing: "#writing",
    certs: "#certs",
    education: "#contact",
    contact: "#contact"
  };
  if (t.section === "career" && t.meta?.idx !== void 0) {
    e.openCareerModal?.(t.meta.idx);
    return;
  }
  if (t.section === "repos" && t.meta) {
    e.openDetailModal?.("repo", (t.meta.kind || "").toLowerCase(), t.meta.idx);
    return;
  }
  if (t.section === "writing" && t.meta) {
    e.openDetailModal?.("article", (t.meta.kind || "").toLowerCase(), t.meta.idx);
    return;
  }
  const n = s[t.section];
  n && e.scrollTo?.(n);
}
function W(t) {
  w?.statusEl && (w.statusEl.dataset.state = t, w.statusEl.textContent = t === "ready" ? "ready" : t === "thinking" ? "thinking..." : t);
}
function Pe() {
  !w?.rateEl || !w.getRemaining || (w.rateEl.textContent = `${w.getRemaining()}/${w.getMax()}`);
}
function G() {
  if (!w) return;
  const t = w.messages.findIndex((e) => e.role === "t");
  t !== -1 && w.messages.splice(t, 1);
}
function vs(t) {
  if (!w) return;
  const e = w.messages.find((s) => s.role === "t");
  e && (e.stage = t, F());
}
function Cs(t, e) {
  w?.suggEl && (w.suggEl.innerHTML = "", (t || []).forEach((s) => {
    const n = document.createElement("button");
    n.className = "sugg", n.textContent = s, n.addEventListener("click", () => {
      w.suggEl.innerHTML = "", e(s);
    }), w.suggEl.append(n);
  }));
}
function Ss(t) {
  let e = String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return e = e.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), e.split(/\n{2,}/).map((n) => {
    const i = n.split(`
`);
    return i.every((o) => /^[-•]\s/.test(o.trim()) || !o.trim()) ? `<ul>${i.filter((c) => c.trim()).map((c) => `<li>${c.replace(/^[-•]\s+/, "")}</li>`).join("")}</ul>` : `<p>${i.join("<br>")}</p>`;
  }).join("");
}
const je = {
  "qa.career_detail": ["What technologies were used?", "How large was the team?", "What about the previous role?"],
  "qa.skills_fit": ["Show me related projects", "Where was this used?"],
  "qa.leadership": ["How do you handle conflict?", "Tell me about team growth"],
  "qa.recruiter": ["What certifications does he have?", "Tell me about his AI experience"],
  "qa.general": ["Show leadership principles", "What are his top projects?"]
};
function Is(t) {
  if (!w?.suggEl) return;
  const e = je[t] || je["qa.general"];
  w.suggEl.innerHTML = "", e.forEach((s) => {
    const n = document.createElement("button");
    n.className = "sugg", n.textContent = s, n.addEventListener("click", () => {
      w.suggEl.innerHTML = "";
      const i = w.inputEl?.closest(".ask")?.querySelector("#ask-send");
      i && (w.inputEl.value = s, i.click());
    }), w.suggEl.append(n);
  });
}
let D = null, O = null, T = null, Ae = null, I = 0, Se = [], Ie = null, J = null, j = null, X = null;
function Ms({ resumeData: t, search: e, handlers: s, getRemaining: n, getMax: i }) {
  X = { getRemaining: n, getMax: i };
  const o = $s(t);
  Ie = new L(o, {
    keys: [
      { name: "label", weight: 0.5 },
      { name: "subtitle", weight: 0.3 },
      { name: "searchText", weight: 0.2 }
    ],
    threshold: 0.4,
    includeScore: !0,
    ignoreLocation: !0
  }), Se = o, Ds(), Ls(s);
}
function $s(t) {
  const e = [];
  return [
    { id: "#about", label: "About", subtitle: "Who is Naresh" },
    { id: "#career", label: "Career", subtitle: "Experience & work history" },
    { id: "#skills", label: "Skills", subtitle: "Tech stack & tools" },
    { id: "#leadership", label: "Leadership", subtitle: "Management principles" },
    { id: "#repos", label: "Open Source", subtitle: "GitHub repos & projects" },
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
  }), (t.career || []).forEach((r, a) => {
    r.isTail || e.push({
      category: "Career",
      icon: r.role?.includes("Manager") ? "EM" : r.role?.substring(0, 2) || ">>",
      label: `${r.role} at ${r.co}`,
      subtitle: r.date,
      searchText: `${r.role} ${r.co} ${r.date} ${r.teaser}`,
      action: { type: "career", idx: a }
    });
  }), [
    ...(t.reposStarred || []).map((r, a) => ({ ...r, __kind: "Starred", __idx: a })),
    ...(t.reposRecent || []).map((r, a) => ({ ...r, __kind: "Recent", __idx: a }))
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
    ...(t.articlesPinned || []).map((r, a) => ({ ...r, __kind: "Pinned", __idx: a })),
    ...(t.articlesRecent || []).map((r, a) => ({ ...r, __kind: "Recent", __idx: a }))
  ].forEach((r) => {
    e.push({
      category: "Articles",
      icon: "✎",
      label: r.title,
      subtitle: `${r.date} · ${(r.tags?.[0] || "").toUpperCase()}`,
      searchText: `${r.title} ${r.date} ${r.tags?.join(" ") || ""} ${r.desc}`,
      action: { type: "article", kind: r.__kind, idx: r.__idx }
    });
  }), (t.skills || []).forEach((r) => {
    r.items.forEach((a) => {
      e.push({
        category: "Skills",
        icon: "[S]",
        label: a,
        subtitle: r.name,
        searchText: `${a} ${r.name} skill`,
        action: { type: "scroll", target: "#skills" }
      });
    });
  }), e;
}
function Ds() {
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
                    <span class="cmdk__rate"></span>
                </div>
            </div>
        </div>`), D = document.getElementById("cmdk-overlay"), O = document.getElementById("cmdk-input"), T = document.getElementById("cmdk-results"), Ae = D.querySelector(".cmdk__rate"), D.querySelector(".cmdk__backdrop").addEventListener("click", se);
  let e = null;
  O.addEventListener("input", () => {
    clearTimeout(e), e = setTimeout(() => {
      I = 0, nt(O.value.trim());
    }, 80);
  }), O.addEventListener("keydown", (s) => {
    const n = T.querySelectorAll(".cmdk__item").length;
    s.key === "ArrowDown" ? (s.preventDefault(), I = (I + 1) % Math.max(n, 1), ne()) : s.key === "ArrowUp" ? (s.preventDefault(), I = (I - 1 + Math.max(n, 1)) % Math.max(n, 1), ne()) : s.key === "Enter" ? (s.preventDefault(), Fs()) : s.key === "Escape" && (s.preventDefault(), se());
  });
}
function Ls(t) {
  j = t, document.addEventListener("keydown", (s) => {
    (s.metaKey || s.ctrlKey) && s.key === "k" && (s.preventDefault(), D?.classList.contains("open") ? se() : ze());
  });
  const e = document.getElementById("search-btn");
  e && e.addEventListener("click", () => ze());
}
function ze() {
  D && (J = document.activeElement, D.classList.add("open"), D.setAttribute("aria-hidden", "false"), document.body.classList.add("cmdk-open"), O.value = "", I = 0, nt(""), Ae && X?.getRemaining && (Ae.textContent = `${X.getRemaining()}/${X.getMax()} AI queries today`), setTimeout(() => O.focus(), 50));
}
function se() {
  D && (D.classList.remove("open"), D.setAttribute("aria-hidden", "true"), document.body.classList.remove("cmdk-open"), J && (J.focus(), J = null));
}
function nt(t) {
  if (!T) return;
  T.innerHTML = "";
  let e;
  t ? (e = Ie.search(t, { limit: 8 }).map((o) => o.item), t.length >= 3 && e.push({
    category: "Ask AI",
    icon: "✦",
    label: `Ask naresh.ai: "${t}"`,
    subtitle: "Get an AI-powered answer",
    action: { type: "ask", query: t }
  })) : e = Se.filter((i) => i.category === "Sections" || i.category === "Career");
  const s = /* @__PURE__ */ new Map();
  e.forEach((i) => {
    s.has(i.category) || s.set(i.category, []), s.get(i.category).push(i);
  });
  let n = 0;
  s.forEach((i, o) => {
    const c = document.createElement("div");
    c.className = "cmdk__group-label", c.textContent = o, T.append(c), i.forEach((r) => {
      const a = document.createElement("div");
      a.className = "cmdk__item", a.setAttribute("role", "option"), a.dataset.idx = n, a.innerHTML = `
                <span class="cmdk__item-icon">${ae(r.icon)}</span>
                <div class="cmdk__item-text">
                    <div class="cmdk__item-title">${ae(r.label)}</div>
                    <div class="cmdk__item-subtitle">${ae(r.subtitle)}</div>
                </div>`, a.addEventListener("click", () => it(r.action)), a.addEventListener("mouseenter", () => {
        I = parseInt(a.dataset.idx, 10), ne();
      }), T.append(a), n++;
    });
  }), ne();
}
function ne() {
  if (!T) return;
  const t = T.querySelectorAll(".cmdk__item");
  t.forEach((s, n) => {
    s.setAttribute("aria-selected", n === I ? "true" : "false");
  });
  const e = t[I];
  e && e.scrollIntoView({ block: "nearest" });
}
function Fs() {
  if (!T.querySelectorAll(".cmdk__item")[I]) return;
  const e = O.value.trim();
  let s;
  e ? (s = Ie.search(e, { limit: 8 }).map((n) => n.item), e.length >= 3 && s.push({ action: { type: "ask", query: e } })) : s = Se.filter((n) => n.category === "Sections" || n.category === "Career"), s[I] && it(s[I].action);
}
function it(t) {
  if (!(!t || !j))
    switch (se(), t.type) {
      case "scroll":
        j.scrollTo?.(t.target);
        break;
      case "career":
        j.openCareerModal?.(t.idx);
        break;
      case "repo":
        j.openDetailModal?.("repo", (t.kind || "").toLowerCase(), t.idx);
        break;
      case "article":
        j.openDetailModal?.("article", (t.kind || "").toLowerCase(), t.idx);
        break;
      case "ask":
        Ts(t.query);
        break;
    }
}
function Ts(t) {
  const e = document.getElementById("chat-panel"), s = document.getElementById("chat-fab"), n = document.getElementById("ask-input"), i = document.getElementById("ask-send");
  e && !e.classList.contains("is-open") && (e.classList.add("is-open"), e.setAttribute("aria-hidden", "false"), s && s.setAttribute("aria-expanded", "true"), document.body.classList.add("chat-open")), n && i && (n.value = t, setTimeout(() => i.click(), 100));
}
function ae(t) {
  return String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Rs({ resumeData: t, chatRoot: e, handlers: s, suggestions: n }) {
  const i = ot(t), o = es(i);
  _s({
    ...e,
    search: o,
    chunks: i,
    handlers: s,
    suggestions: n,
    queryRAG: (c) => As(c, o, i),
    getRemaining: be,
    getMax: Ee
  }), Ms({
    resumeData: t,
    search: o,
    handlers: s,
    getRemaining: be,
    getMax: Ee
  });
}
function Ns() {
}
export {
  Ns as destroy,
  Rs as init
};
