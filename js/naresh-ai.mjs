function nt(t) {
    const e = [],
        s = t.personal || {},
        n = t.site || {}
    if (s.name) {
        const u = s.mission || s.bio || ''
        e.push({
            id: 'bio',
            section: 'about',
            label: s.name,
            text: `${s.name} is an ${s.title || 'Engineering Manager'}. ${u}`
        })
    }
    const i = t.rawResume || {},
        o = i.about?.cards || []
    if (
        (o.forEach((u, y) => {
            e.push({
                id: `about:${y}`,
                section: 'about',
                label: `About - ${u.title}`,
                text: `About - ${u.title}: ${u.description}`
            })
        }),
        !o.length)
    ) {
        const u = n?.seo?.description || ''
        u &&
            e.push({
                id: 'about:summary',
                section: 'about',
                label: 'About',
                text: `About Naresh Sekar: ${u}`
            })
    }
    ;((t.career || []).forEach((u, y) => {
        if (u.isTail) return
        const E = it(u.desc || ''),
            w = `${s.name || 'Naresh Sekar'} worked as ${u.role} at ${u.co} (${u.date}). ${E}`
        e.push({
            id: `career:${y}`,
            section: 'career',
            label: `${u.role} at ${u.co}`,
            text: w,
            meta: { idx: y, co: u.co, role: u.role, date: u.date }
        })
    }),
        (t.skills || []).forEach((u, y) => {
            e.push({
                id: `skill:${y}`,
                section: 'skills',
                label: `Skills - ${u.name}`,
                text: `Skills - ${u.name}: ${u.items.join(', ')}`
            })
        }),
        (t.leadership || []).forEach((u, y) => {
            e.push({
                id: `leadership:${y}`,
                section: 'leadership',
                label: `Leadership - ${u.t}`,
                text: `Leadership - ${u.t}: ${u.d}`
            })
        }),
        (t.reposStarred || []).forEach((u, y) => {
            const E = u.tags?.join(', ') || ''
            e.push({
                id: `repo:starred:${y}`,
                section: 'repos',
                label: u.name,
                text: `Open source repo: ${u.name} - ${u.tagline || u.desc}. Language: ${u.language || 'N/A'}. Tags: ${E}`,
                meta: { kind: 'Starred', idx: y, name: u.name, url: u.url }
            })
        }),
        (t.reposRecent || []).forEach((u, y) => {
            const E = u.tags?.join(', ') || ''
            e.push({
                id: `repo:recent:${y}`,
                section: 'repos',
                label: u.name,
                text: `Recent project: ${u.name} - ${u.tagline || u.desc}. Language: ${u.language || 'N/A'}. Tags: ${E}`,
                meta: { kind: 'Recent', idx: y, name: u.name, url: u.url }
            })
        }),
        (t.articlesPinned || []).forEach((u, y) => {
            const E = u.tags?.join(', ') || ''
            e.push({
                id: `article:pinned:${y}`,
                section: 'writing',
                label: u.title,
                text: `Article: ${u.title} (${u.date}). ${u.desc} Tags: ${E}`,
                meta: { kind: 'Pinned', idx: y, title: u.title, url: u.url }
            })
        }),
        (t.articlesRecent || []).forEach((u, y) => {
            const E = u.tags?.join(', ') || ''
            e.push({
                id: `article:recent:${y}`,
                section: 'writing',
                label: u.title,
                text: `Article: ${u.title} (${u.date}). ${u.desc} Tags: ${E}`,
                meta: { kind: 'Recent', idx: y, title: u.title, url: u.url }
            })
        }))
    const h = t.certs || []
    if (h.length) {
        const u = h.map((y) => `${y.name} (${y.issuer})`).join(', ')
        e.push({
            id: 'certs',
            section: 'certs',
            label: 'Certifications',
            text: `Certifications: ${u}`
        })
    }
    const k = i.education
    k &&
        e.push({
            id: 'education',
            section: 'education',
            label: 'Education',
            text: `Education: ${k.degree || ''}, ${k.school || ''}, ${k.period || ''}, ${k.location || ''}`
        })
    const p = i.publications?.book
    return (
        p &&
            e.push({
                id: 'book',
                section: 'writing',
                label: p.title,
                text: `Book: ${p.title} by ${p.author || 'Naresh Sekar'}. ${p.description || ''} Published on ${p.publisher || 'Amazon Kindle'}.`
            }),
        e
    )
}
function it(t) {
    return t
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}
function B(t) {
    return Array.isArray ? Array.isArray(t) : je(t) === '[object Array]'
}
function rt(t) {
    if (typeof t == 'string') return t
    if (typeof t == 'bigint') return t.toString()
    const e = t + ''
    return e == '0' && 1 / t == -1 / 0 ? '-0' : e
}
function oe(t) {
    return t == null ? '' : rt(t)
}
function _(t) {
    return typeof t == 'string'
}
function G(t) {
    return typeof t == 'number'
}
function ot(t) {
    return t === !0 || t === !1 || (ct(t) && je(t) == '[object Boolean]')
}
function Pe(t) {
    return typeof t == 'object'
}
function ct(t) {
    return Pe(t) && t !== null
}
function v(t) {
    return t != null
}
function Y(t) {
    return !t.trim().length
}
function je(t) {
    return t == null ? (t === void 0 ? '[object Undefined]' : '[object Null]') : Object.prototype.toString.call(t)
}
const at = "Incorrect 'index' type",
    lt = (t) => `Invalid value for key ${t}`,
    ut = (t) => `Pattern length exceeds max of ${t}.`,
    ht = (t) => `Missing ${t} property in key`,
    dt = (t) => `Property 'weight' in key '${t}' must be a positive integer`,
    Ce = Object.prototype.hasOwnProperty
class ft {
    constructor(e) {
        ;((this._keys = []), (this._keyMap = {}))
        let s = 0
        ;(e.forEach((n) => {
            const i = ze(n)
            ;(this._keys.push(i), (this._keyMap[i.id] = i), (s += i.weight))
        }),
            this._keys.forEach((n) => {
                n.weight /= s
            }))
    }
    get(e) {
        return this._keyMap[e]
    }
    keys() {
        return this._keys
    }
    toJSON() {
        return JSON.stringify(this._keys)
    }
}
function ze(t) {
    let e = null,
        s = null,
        n = null,
        i = 1,
        o = null
    if (_(t) || B(t)) ((n = t), (e = Se(t)), (s = ce(t)))
    else {
        if (!Ce.call(t, 'name')) throw new Error(ht('name'))
        const a = t.name
        if (((n = a), Ce.call(t, 'weight') && ((i = t.weight), i <= 0))) throw new Error(dt(a))
        ;((e = Se(a)), (s = ce(a)), (o = t.getFn))
    }
    return {
        path: e,
        id: s,
        weight: i,
        src: n,
        getFn: o
    }
}
function Se(t) {
    return B(t) ? t : t.split('.')
}
function ce(t) {
    return B(t) ? t.join('.') : t
}
function gt(t, e) {
    const s = []
    let n = !1
    const i = (o, a, r, c) => {
        if (v(o))
            if (!a[r])
                s.push(
                    c !== void 0
                        ? {
                              v: o,
                              i: c
                          }
                        : o
                )
            else {
                const d = a[r],
                    l = o[d]
                if (!v(l)) return
                if (r === a.length - 1 && (_(l) || G(l) || ot(l) || typeof l == 'bigint'))
                    s.push(
                        c !== void 0
                            ? {
                                  v: oe(l),
                                  i: c
                              }
                            : oe(l)
                    )
                else if (B(l)) {
                    n = !0
                    for (let f = 0, g = l.length; f < g; f += 1) i(l[f], a, r + 1, f)
                } else a.length && i(l, a, r + 1, c)
            }
    }
    return (i(t, _(e) ? e.split('.') : e, 0), n ? s : s[0])
}
const pt = {
        includeMatches: !1,
        findAllMatches: !1,
        minMatchCharLength: 1
    },
    mt = {
        isCaseSensitive: !1,
        ignoreDiacritics: !1,
        includeScore: !1,
        keys: [],
        shouldSort: !0,
        sortFn: (t, e) => (t.score === e.score ? (t.idx < e.idx ? -1 : 1) : t.score < e.score ? -1 : 1)
    },
    yt = {
        location: 0,
        threshold: 0.6,
        distance: 100
    },
    kt = {
        useExtendedSearch: !1,
        useTokenSearch: !1,
        getFn: gt,
        ignoreLocation: !1,
        ignoreFieldNorm: !1,
        fieldNormWeight: 1
    },
    m = Object.freeze({
        ...mt,
        ...pt,
        ...yt,
        ...kt
    }),
    bt = /[^ ]+/g
function Et(t = 1, e = 3) {
    const s = /* @__PURE__ */ new Map(),
        n = Math.pow(10, e)
    return {
        get(i) {
            const o = i.match(bt).length
            if (s.has(o)) return s.get(o)
            const a = 1 / Math.pow(o, 0.5 * t),
                r = parseFloat(Math.round(a * n) / n)
            return (s.set(o, r), r)
        },
        clear() {
            s.clear()
        }
    }
}
class Ee {
    constructor({ getFn: e = m.getFn, fieldNormWeight: s = m.fieldNormWeight } = {}) {
        ;((this.norm = Et(s, 3)),
            (this.getFn = e),
            (this.isCreated = !1),
            (this.docs = []),
            (this.keys = []),
            (this._keysMap = {}),
            this.setIndexRecords())
    }
    setSources(e = []) {
        this.docs = e
    }
    setIndexRecords(e = []) {
        this.records = e
    }
    setKeys(e = []) {
        ;((this.keys = e),
            (this._keysMap = {}),
            e.forEach((s, n) => {
                this._keysMap[s.id] = n
            }))
    }
    create() {
        this.isCreated ||
            !this.docs.length ||
            ((this.isCreated = !0),
            _(this.docs[0])
                ? this.docs.forEach((e, s) => {
                      this._addString(e, s)
                  })
                : this.docs.forEach((e, s) => {
                      this._addObject(e, s)
                  }),
            this.norm.clear())
    }
    // Adds a doc to the end of the index
    add(e) {
        const s = this.size()
        _(e) ? this._addString(e, s) : this._addObject(e, s)
    }
    // Removes the doc at the specified index of the index
    removeAt(e) {
        this.records.splice(e, 1)
        for (let s = e, n = this.size(); s < n; s += 1) this.records[s].i -= 1
    }
    // Removes docs at the specified indices (must be sorted ascending)
    removeAll(e) {
        for (let s = e.length - 1; s >= 0; s -= 1) this.records.splice(e[s], 1)
        for (let s = 0, n = this.records.length; s < n; s += 1) this.records[s].i = s
    }
    getValueForItemAtKeyId(e, s) {
        return e[this._keysMap[s]]
    }
    size() {
        return this.records.length
    }
    _addString(e, s) {
        if (!v(e) || Y(e)) return
        const n = {
            v: e,
            i: s,
            n: this.norm.get(e)
        }
        this.records.push(n)
    }
    _addObject(e, s) {
        const n = {
            i: s,
            $: {}
        }
        ;(this.keys.forEach((i, o) => {
            const a = i.getFn ? i.getFn(e) : this.getFn(e, i.path)
            if (v(a)) {
                if (B(a)) {
                    const r = []
                    for (let c = 0, d = a.length; c < d; c += 1) {
                        const l = a[c]
                        if (v(l)) {
                            if (_(l)) {
                                if (!Y(l)) {
                                    const f = {
                                        v: l,
                                        i: c,
                                        n: this.norm.get(l)
                                    }
                                    r.push(f)
                                }
                            } else if (v(l.v)) {
                                const f = _(l.v) ? l.v : oe(l.v)
                                if (!Y(f)) {
                                    const g = {
                                        v: f,
                                        i: l.i,
                                        n: this.norm.get(f)
                                    }
                                    r.push(g)
                                }
                            }
                        }
                    }
                    n.$[o] = r
                } else if (_(a) && !Y(a)) {
                    const r = {
                        v: a,
                        n: this.norm.get(a)
                    }
                    n.$[o] = r
                }
            }
        }),
            this.records.push(n))
    }
    toJSON() {
        return {
            // eslint-disable-next-line no-unused-vars
            keys: this.keys.map(({ getFn: e, ...s }) => s),
            records: this.records
        }
    }
}
function Ke(t, e, { getFn: s = m.getFn, fieldNormWeight: n = m.fieldNormWeight } = {}) {
    const i = new Ee({
        getFn: s,
        fieldNormWeight: n
    })
    return (i.setKeys(t.map(ze)), i.setSources(e), i.create(), i)
}
function wt(t, { getFn: e = m.getFn, fieldNormWeight: s = m.fieldNormWeight } = {}) {
    const { keys: n, records: i } = t,
        o = new Ee({
            getFn: e,
            fieldNormWeight: s
        })
    return (o.setKeys(n), o.setIndexRecords(i), o)
}
function At(t = [], e = m.minMatchCharLength) {
    const s = []
    let n = -1,
        i = -1,
        o = 0
    for (let a = t.length; o < a; o += 1) {
        const r = t[o]
        r && n === -1 ? (n = o) : !r && n !== -1 && ((i = o - 1), i - n + 1 >= e && s.push([n, i]), (n = -1))
    }
    return (t[o - 1] && o - n >= e && s.push([n, o - 1]), s)
}
const N = 32
function _t(
    t,
    e,
    s,
    {
        location: n = m.location,
        distance: i = m.distance,
        threshold: o = m.threshold,
        findAllMatches: a = m.findAllMatches,
        minMatchCharLength: r = m.minMatchCharLength,
        includeMatches: c = m.includeMatches,
        ignoreLocation: d = m.ignoreLocation
    } = {}
) {
    if (e.length > N) throw new Error(ut(N))
    const l = e.length,
        f = t.length,
        g = Math.max(0, Math.min(n, f))
    let h = o,
        k = g
    const p = (x, $) => {
            const C = x / l
            if (d) return C
            const z = Math.abs(g - $)
            return i ? C + z / i : z ? 1 : C
        },
        u = r > 1 || c,
        y = u ? Array(f) : []
    let E
    for (; (E = t.indexOf(e, k)) > -1; ) {
        const x = p(0, E)
        if (((h = Math.min(x, h)), (k = E + l), u)) {
            let $ = 0
            for (; $ < l; ) ((y[E + $] = 1), ($ += 1))
        }
    }
    k = -1
    let w = [],
        A = 1,
        I = l + f
    const st = 1 << (l - 1)
    for (let x = 0; x < l; x += 1) {
        let $ = 0,
            C = I
        for (; $ < C; ) (p(x, g + C) <= h ? ($ = C) : (I = C), (C = Math.floor((I - $) / 2 + $)))
        I = C
        let z = Math.max(1, g - C + 1)
        const ne = a ? f : Math.min(g + C, f) + l,
            P = Array(ne + 2)
        P[ne + 1] = (1 << x) - 1
        for (let M = ne; M >= z; M -= 1) {
            const W = M - 1,
                Ie = s[t[W]]
            if (
                (u && (y[W] = +!!Ie),
                (P[M] = ((P[M + 1] << 1) | 1) & Ie),
                x && (P[M] |= ((w[M + 1] | w[M]) << 1) | 1 | w[M + 1]),
                P[M] & st && ((A = p(x, W)), A <= h))
            ) {
                if (((h = A), (k = W), k <= g)) break
                z = Math.max(1, 2 * g - k)
            }
        }
        if (p(x + 1, g) > h) break
        w = P
    }
    const se = {
        isMatch: k >= 0,
        // Count exact matches (those with a score of 0) to be "almost" exact
        score: Math.max(1e-3, A)
    }
    if (u) {
        const x = At(y, r)
        x.length ? c && (se.indices = x) : (se.isMatch = !1)
    }
    return se
}
function xt(t) {
    const e = {}
    for (let s = 0, n = t.length; s < n; s += 1) {
        const i = t.charAt(s)
        e[i] = (e[i] || 0) | (1 << (n - s - 1))
    }
    return e
}
function we(t) {
    if (t.length <= 1) return t
    t.sort((s, n) => s[0] - n[0] || s[1] - n[1])
    const e = [t[0]]
    for (let s = 1, n = t.length; s < n; s += 1) {
        const i = e[e.length - 1],
            o = t[s]
        o[0] <= i[1] + 1 ? (i[1] = Math.max(i[1], o[1])) : e.push(o)
    }
    return e
}
const He = {
        ł: 'l',
        // ł
        Ł: 'L',
        // Ł
        đ: 'd',
        // đ
        Đ: 'D',
        // Đ
        ø: 'o',
        // ø
        Ø: 'O',
        // Ø
        ħ: 'h',
        // ħ
        Ħ: 'H',
        // Ħ
        ŧ: 't',
        // ŧ
        Ŧ: 'T',
        // Ŧ
        ı: 'i',
        // ı
        ß: 'ss'
        // ß
    },
    vt = new RegExp('[' + Object.keys(He).join('') + ']', 'g'),
    H = String.prototype.normalize
        ? (t) =>
              t
                  .normalize('NFD')
                  .replace(
                      /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g,
                      ''
                  )
                  .replace(vt, (e) => He[e])
        : (t) => t
class Ae {
    constructor(
        e,
        {
            location: s = m.location,
            threshold: n = m.threshold,
            distance: i = m.distance,
            includeMatches: o = m.includeMatches,
            findAllMatches: a = m.findAllMatches,
            minMatchCharLength: r = m.minMatchCharLength,
            isCaseSensitive: c = m.isCaseSensitive,
            ignoreDiacritics: d = m.ignoreDiacritics,
            ignoreLocation: l = m.ignoreLocation
        } = {}
    ) {
        if (
            ((this.options = {
                location: s,
                threshold: n,
                distance: i,
                includeMatches: o,
                findAllMatches: a,
                minMatchCharLength: r,
                isCaseSensitive: c,
                ignoreDiacritics: d,
                ignoreLocation: l
            }),
            (e = c ? e : e.toLowerCase()),
            (e = d ? H(e) : e),
            (this.pattern = e),
            (this.chunks = []),
            !this.pattern.length)
        )
            return
        const f = (h, k) => {
                this.chunks.push({
                    pattern: h,
                    alphabet: xt(h),
                    startIndex: k
                })
            },
            g = this.pattern.length
        if (g > N) {
            let h = 0
            const k = g % N,
                p = g - k
            for (; h < p; ) (f(this.pattern.substr(h, N), h), (h += N))
            if (k) {
                const u = g - N
                f(this.pattern.substr(u), u)
            }
        } else f(this.pattern, 0)
    }
    searchIn(e) {
        const { isCaseSensitive: s, ignoreDiacritics: n, includeMatches: i } = this.options
        if (((e = s ? e : e.toLowerCase()), (e = n ? H(e) : e), this.pattern === e)) {
            const p = {
                isMatch: !0,
                score: 0
            }
            return (i && (p.indices = [[0, e.length - 1]]), p)
        }
        const {
                location: o,
                distance: a,
                threshold: r,
                findAllMatches: c,
                minMatchCharLength: d,
                ignoreLocation: l
            } = this.options,
            f = []
        let g = 0,
            h = !1
        this.chunks.forEach(({ pattern: p, alphabet: u, startIndex: y }) => {
            const {
                isMatch: E,
                score: w,
                indices: A
            } = _t(e, p, u, {
                location: o + y,
                distance: a,
                threshold: r,
                findAllMatches: c,
                minMatchCharLength: d,
                includeMatches: i,
                ignoreLocation: l
            })
            ;(E && (h = !0), (g += w), E && A && f.push(...A))
        })
        const k = {
            isMatch: h,
            score: h ? g / this.chunks.length : 1
        }
        return (h && i && (k.indices = we(f)), k)
    }
}
class R {
    constructor(e) {
        this.pattern = e
    }
    static isMultiMatch(e) {
        return Me(e, this.multiRegex)
    }
    static isSingleMatch(e) {
        return Me(e, this.singleRegex)
    }
    // eslint-disable-next-line no-unused-vars
    search(e) {
        return {
            isMatch: !1,
            score: 1
        }
    }
}
function Me(t, e) {
    const s = t.match(e)
    return s ? s[1] : null
}
class It extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'exact'
    }
    static get multiRegex() {
        return /^="(.*)"$/
    }
    static get singleRegex() {
        return /^=(.*)$/
    }
    search(e) {
        const s = e === this.pattern
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        }
    }
}
class Ct extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'inverse-exact'
    }
    static get multiRegex() {
        return /^!"(.*)"$/
    }
    static get singleRegex() {
        return /^!(.*)$/
    }
    search(e) {
        const n = e.indexOf(this.pattern) === -1
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [0, e.length - 1]
        }
    }
}
class St extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'prefix-exact'
    }
    static get multiRegex() {
        return /^\^"(.*)"$/
    }
    static get singleRegex() {
        return /^\^(.*)$/
    }
    search(e) {
        const s = e.startsWith(this.pattern)
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        }
    }
}
class Mt extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'inverse-prefix-exact'
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/
    }
    static get singleRegex() {
        return /^!\^(.*)$/
    }
    search(e) {
        const s = !e.startsWith(this.pattern)
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [0, e.length - 1]
        }
    }
}
class $t extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'suffix-exact'
    }
    static get multiRegex() {
        return /^"(.*)"\$$/
    }
    static get singleRegex() {
        return /^(.*)\$$/
    }
    search(e) {
        const s = e.endsWith(this.pattern)
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [e.length - this.pattern.length, e.length - 1]
        }
    }
}
class Dt extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'inverse-suffix-exact'
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/
    }
    static get singleRegex() {
        return /^!(.*)\$$/
    }
    search(e) {
        const s = !e.endsWith(this.pattern)
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [0, e.length - 1]
        }
    }
}
class We extends R {
    constructor(
        e,
        {
            location: s = m.location,
            threshold: n = m.threshold,
            distance: i = m.distance,
            includeMatches: o = m.includeMatches,
            findAllMatches: a = m.findAllMatches,
            minMatchCharLength: r = m.minMatchCharLength,
            isCaseSensitive: c = m.isCaseSensitive,
            ignoreDiacritics: d = m.ignoreDiacritics,
            ignoreLocation: l = m.ignoreLocation
        } = {}
    ) {
        ;(super(e),
            (this._bitapSearch = new Ae(e, {
                location: s,
                threshold: n,
                distance: i,
                includeMatches: o,
                findAllMatches: a,
                minMatchCharLength: r,
                isCaseSensitive: c,
                ignoreDiacritics: d,
                ignoreLocation: l
            })))
    }
    static get type() {
        return 'fuzzy'
    }
    static get multiRegex() {
        return /^"(.*)"$/
    }
    static get singleRegex() {
        return /^(.*)$/
    }
    search(e) {
        return this._bitapSearch.searchIn(e)
    }
}
class Ye extends R {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'include'
    }
    static get multiRegex() {
        return /^'"(.*)"$/
    }
    static get singleRegex() {
        return /^'(.*)$/
    }
    search(e) {
        let s = 0,
            n
        const i = [],
            o = this.pattern.length
        for (; (n = e.indexOf(this.pattern, s)) > -1; ) ((s = n + o), i.push([n, s - 1]))
        const a = !!i.length
        return {
            isMatch: a,
            score: a ? 0 : 1,
            indices: i
        }
    }
}
const ae = [It, Ye, St, Mt, Dt, $t, Ct, We],
    $e = ae.length,
    Lt = '\0',
    Ft = '|'
function Tt(t) {
    const e = [],
        s = t.length
    let n = 0
    for (; n < s; ) {
        for (; n < s && t[n] === ' '; ) n++
        if (n >= s) break
        let i = n
        for (; i < s && t[i] !== ' ' && t[i] !== '"'; ) i++
        if (i < s && t[i] === '"') {
            for (i++; i < s; ) {
                if (t[i] === '"') {
                    const o = i + 1
                    if (o >= s || t[o] === ' ') {
                        i++
                        break
                    }
                    if (t[o] === '$' && (o + 1 >= s || t[o + 1] === ' ')) {
                        i += 2
                        break
                    }
                }
                i++
            }
            ;(e.push(t.substring(n, i)), (n = i))
        } else {
            for (; i < s && t[i] !== ' '; ) i++
            ;(e.push(t.substring(n, i)), (n = i))
        }
    }
    return e
}
function Bt(t, e = {}) {
    return t
        .replace(/\\\|/g, Lt)
        .split(Ft)
        .map((n) => {
            // eslint-disable-next-line no-control-regex
            const i = n.replace(/\u0000/g, '|'),
                o = Tt(i.trim()).filter((r) => r && !!r.trim()),
                a = []
            for (let r = 0, c = o.length; r < c; r += 1) {
                const d = o[r]
                let l = !1,
                    f = -1
                for (; !l && ++f < $e; ) {
                    const g = ae[f],
                        h = g.isMultiMatch(d)
                    h && (a.push(new g(h, e)), (l = !0))
                }
                if (!l)
                    for (f = -1; ++f < $e; ) {
                        const g = ae[f],
                            h = g.isSingleMatch(d)
                        if (h) {
                            a.push(new g(h, e))
                            break
                        }
                    }
            }
            return a
        })
}
const Rt = /* @__PURE__ */ new Set([We.type, Ye.type])
class Nt {
    constructor(
        e,
        {
            isCaseSensitive: s = m.isCaseSensitive,
            ignoreDiacritics: n = m.ignoreDiacritics,
            includeMatches: i = m.includeMatches,
            minMatchCharLength: o = m.minMatchCharLength,
            ignoreLocation: a = m.ignoreLocation,
            findAllMatches: r = m.findAllMatches,
            location: c = m.location,
            threshold: d = m.threshold,
            distance: l = m.distance
        } = {}
    ) {
        ;((this.query = null),
            (this.options = {
                isCaseSensitive: s,
                ignoreDiacritics: n,
                includeMatches: i,
                minMatchCharLength: o,
                findAllMatches: r,
                ignoreLocation: a,
                location: c,
                threshold: d,
                distance: l
            }),
            (e = s ? e : e.toLowerCase()),
            (e = n ? H(e) : e),
            (this.pattern = e),
            (this.query = Bt(this.pattern, this.options)))
    }
    static condition(e, s) {
        return s.useExtendedSearch
    }
    // Note: searchIn operates on a single text value and sets hasInverse on the
    // result when inverse patterns are involved. _searchObjectList uses this to
    // switch from "ANY key" to "ALL keys" aggregation. See #712.
    searchIn(e) {
        const s = this.query
        if (!s)
            return {
                isMatch: !1,
                score: 1
            }
        const { includeMatches: n, isCaseSensitive: i, ignoreDiacritics: o } = this.options
        ;((e = i ? e : e.toLowerCase()), (e = o ? H(e) : e))
        let a = 0
        const r = []
        let c = 0,
            d = !1
        for (let l = 0, f = s.length; l < f; l += 1) {
            const g = s[l]
            ;((r.length = 0), (a = 0), (d = !1))
            for (let h = 0, k = g.length; h < k; h += 1) {
                const p = g[h],
                    { isMatch: u, indices: y, score: E } = p.search(e)
                if (u) {
                    ;((a += 1), (c += E))
                    const w = p.constructor.type
                    ;(w.startsWith('inverse') && (d = !0), n && (Rt.has(w) ? r.push(...y) : r.push(y)))
                } else {
                    ;((c = 0), (a = 0), (r.length = 0), (d = !1))
                    break
                }
            }
            if (a) {
                const h = {
                    isMatch: !0,
                    score: c / a
                }
                return (d && (h.hasInverse = !0), n && (h.indices = we(r)), h)
            }
        }
        return {
            isMatch: !1,
            score: 1
        }
    }
}
const le = []
function _e(...t) {
    le.push(...t)
}
function J(t, e) {
    for (let s = 0, n = le.length; s < n; s += 1) {
        const i = le[s]
        if (i.condition(t, e)) return new i(t, e)
    }
    return new Ae(t, e)
}
const X = {
        AND: '$and',
        OR: '$or'
    },
    ue = {
        PATH: '$path',
        PATTERN: '$val'
    },
    he = (t) => !!(t[X.AND] || t[X.OR]),
    Ot = (t) => !!t[ue.PATH],
    Pt = (t) => !B(t) && Pe(t) && !he(t),
    De = (t) => ({
        [X.AND]: Object.keys(t).map((e) => ({
            [e]: t[e]
        }))
    })
function qe(t, e, { auto: s = !0 } = {}) {
    const n = (i) => {
        if (_(i)) {
            const c = {
                keyId: null,
                pattern: i
            }
            return (s && (c.searcher = J(i, e)), c)
        }
        const o = Object.keys(i),
            a = Ot(i)
        if (!a && o.length > 1 && !he(i)) return n(De(i))
        if (Pt(i)) {
            const c = a ? i[ue.PATH] : o[0],
                d = a ? i[ue.PATTERN] : i[c]
            if (!_(d)) throw new Error(lt(c))
            const l = {
                keyId: ce(c),
                pattern: d
            }
            return (s && (l.searcher = J(d, e)), l)
        }
        const r = {
            children: [],
            operator: o[0]
        }
        return (
            o.forEach((c) => {
                const d = i[c]
                B(d) &&
                    d.forEach((l) => {
                        r.children.push(n(l))
                    })
            }),
            r
        )
    }
    return (he(t) || (t = De(t)), n(t))
}
function de(t, { ignoreFieldNorm: e = m.ignoreFieldNorm }) {
    let s = 1
    return (
        t.forEach(({ key: n, norm: i, score: o }) => {
            const a = n ? n.weight : null
            s *= Math.pow(o === 0 && a ? Number.EPSILON : o, (a || 1) * (e ? 1 : i))
        }),
        s
    )
}
function jt(t, { ignoreFieldNorm: e = m.ignoreFieldNorm }) {
    t.forEach((s) => {
        s.score = de(s.matches, {
            ignoreFieldNorm: e
        })
    })
}
class zt {
    constructor(e) {
        ;((this.limit = e), (this.heap = []))
    }
    get size() {
        return this.heap.length
    }
    shouldInsert(e) {
        return this.size < this.limit || e < this.heap[0].score
    }
    insert(e) {
        this.size < this.limit
            ? (this.heap.push(e), this._bubbleUp(this.size - 1))
            : e.score < this.heap[0].score && ((this.heap[0] = e), this._sinkDown(0))
    }
    extractSorted(e) {
        return this.heap.sort(e)
    }
    _bubbleUp(e) {
        const s = this.heap
        for (; e > 0; ) {
            const n = (e - 1) >> 1
            if (s[e].score <= s[n].score) break
            const i = s[e]
            ;((s[e] = s[n]), (s[n] = i), (e = n))
        }
    }
    _sinkDown(e) {
        const s = this.heap,
            n = s.length
        let i = e
        do {
            e = i
            const o = 2 * e + 1,
                a = 2 * e + 2
            if ((o < n && s[o].score > s[i].score && (i = o), a < n && s[a].score > s[i].score && (i = a), i !== e)) {
                const r = s[e]
                ;((s[e] = s[i]), (s[i] = r))
            }
        } while (i !== e)
    }
}
function Kt(t, e) {
    const s = t.matches
    ;((e.matches = []),
        v(s) &&
            s.forEach((n) => {
                if (!v(n.indices) || !n.indices.length) return
                const { indices: i, value: o } = n,
                    a = {
                        indices: i,
                        value: o
                    }
                ;(n.key && (a.key = n.key.src), n.idx > -1 && (a.refIndex = n.idx), e.matches.push(a))
            }))
}
function Ht(t, e) {
    e.score = t.score
}
function Wt(t, e, { includeMatches: s = m.includeMatches, includeScore: n = m.includeScore } = {}) {
    const i = []
    return (
        s && i.push(Kt),
        n && i.push(Ht),
        t.map((o) => {
            const { idx: a } = o,
                r = {
                    item: e[a],
                    refIndex: a
                }
            return (
                i.length &&
                    i.forEach((c) => {
                        c(o, r)
                    }),
                r
            )
        })
    )
}
const Yt = /\b\w+\b/g
function fe({ isCaseSensitive: t = !1, ignoreDiacritics: e = !1 } = {}) {
    return {
        tokenize(s) {
            return (t || (s = s.toLowerCase()), e && (s = H(s)), s.match(Yt) || [])
        }
    }
}
function qt(t, e, s) {
    const n = /* @__PURE__ */ new Map(),
        i = /* @__PURE__ */ new Map()
    let o = 0
    function a(r, c, d, l) {
        const f = s.tokenize(r)
        if (!f.length) return
        o++
        const g = /* @__PURE__ */ new Map()
        for (const h of f) g.set(h, (g.get(h) || 0) + 1)
        for (const [h, k] of g) {
            const p = {
                docIdx: c,
                keyIdx: d,
                subIdx: l,
                tf: k
            }
            let u = n.get(h)
            ;(u || ((u = []), n.set(h, u)), u.push(p), i.set(h, (i.get(h) || 0) + 1))
        }
    }
    for (const r of t) {
        const { i: c, v: d, $: l } = r
        if (d !== void 0) {
            a(d, c, -1, -1)
            continue
        }
        if (l)
            for (let f = 0; f < e; f++) {
                const g = l[f]
                if (g)
                    if (Array.isArray(g)) for (const h of g) a(h.v, c, f, h.i ?? -1)
                    else a(g.v, c, f, -1)
            }
    }
    return {
        terms: n,
        fieldCount: o,
        df: i
    }
}
function Gt(t, e, s, n) {
    const { i, v: o, $: a } = e
    function r(c, d, l) {
        const f = n.tokenize(c)
        if (!f.length) return
        t.fieldCount++
        const g = /* @__PURE__ */ new Map()
        for (const h of f) g.set(h, (g.get(h) || 0) + 1)
        for (const [h, k] of g) {
            const p = {
                docIdx: i,
                keyIdx: d,
                subIdx: l,
                tf: k
            }
            let u = t.terms.get(h)
            ;(u || ((u = []), t.terms.set(h, u)), u.push(p), t.df.set(h, (t.df.get(h) || 0) + 1))
        }
    }
    if (o !== void 0) {
        r(o, -1, -1)
        return
    }
    if (a)
        for (let c = 0; c < s; c++) {
            const d = a[c]
            if (d)
                if (Array.isArray(d)) for (const l of d) r(l.v, c, l.i ?? -1)
                else r(d.v, c, -1)
        }
}
function Le(t, e) {
    for (const [s, n] of t.terms) {
        const i = n.filter((a) => a.docIdx !== e),
            o = n.length - i.length
        o > 0 &&
            ((t.fieldCount -= o),
            t.df.set(s, (t.df.get(s) || 0) - o),
            i.length === 0 ? (t.terms.delete(s), t.df.delete(s)) : t.terms.set(s, i))
    }
}
class L {
    // Statics are assigned in entry.ts
    constructor(e, s, n) {
        ;((this.options = {
            ...m,
            ...s
        }),
            this.options.useExtendedSearch,
            this.options.useTokenSearch,
            (this._keyStore = new ft(this.options.keys)),
            (this._docs = e),
            (this._myIndex = null),
            (this._invertedIndex = null),
            this.setCollection(e, n),
            (this._lastQuery = null),
            (this._lastSearcher = null))
    }
    _getSearcher(e) {
        if (this._lastQuery === e) return this._lastSearcher
        const s = this._invertedIndex
                ? {
                      ...this.options,
                      _invertedIndex: this._invertedIndex
                  }
                : this.options,
            n = J(e, s)
        return ((this._lastQuery = e), (this._lastSearcher = n), n)
    }
    setCollection(e, s) {
        if (((this._docs = e), s && !(s instanceof Ee))) throw new Error(at)
        if (
            ((this._myIndex =
                s ||
                Ke(this.options.keys, this._docs, {
                    getFn: this.options.getFn,
                    fieldNormWeight: this.options.fieldNormWeight
                })),
            this.options.useTokenSearch)
        ) {
            const n = fe({
                isCaseSensitive: this.options.isCaseSensitive,
                ignoreDiacritics: this.options.ignoreDiacritics
            })
            this._invertedIndex = qt(this._myIndex.records, this._myIndex.keys.length, n)
        }
    }
    add(e) {
        if (v(e) && (this._docs.push(e), this._myIndex.add(e), this._invertedIndex)) {
            const s = this._myIndex.records[this._myIndex.records.length - 1],
                n = fe({
                    isCaseSensitive: this.options.isCaseSensitive,
                    ignoreDiacritics: this.options.ignoreDiacritics
                })
            Gt(this._invertedIndex, s, this._myIndex.keys.length, n)
        }
    }
    remove(e = () => !1) {
        const s = [],
            n = []
        for (let i = 0, o = this._docs.length; i < o; i += 1) e(this._docs[i], i) && (s.push(this._docs[i]), n.push(i))
        if (n.length) {
            if (this._invertedIndex) for (const i of n) Le(this._invertedIndex, i)
            for (let i = n.length - 1; i >= 0; i -= 1) this._docs.splice(n[i], 1)
            this._myIndex.removeAll(n)
        }
        return s
    }
    removeAt(e) {
        this._invertedIndex && Le(this._invertedIndex, e)
        const s = this._docs.splice(e, 1)[0]
        return (this._myIndex.removeAt(e), s)
    }
    getIndex() {
        return this._myIndex
    }
    search(e, s) {
        const { limit: n = -1 } = s || {},
            { includeMatches: i, includeScore: o, shouldSort: a, sortFn: r, ignoreFieldNorm: c } = this.options
        if (_(e) && !e.trim()) {
            let f = this._docs.map((g, h) => ({
                item: g,
                refIndex: h
            }))
            return (G(n) && n > -1 && (f = f.slice(0, n)), f)
        }
        const d = G(n) && n > 0 && _(e)
        let l
        if (d) {
            const f = new zt(n)
            ;(_(this._docs[0])
                ? this._searchStringList(e, {
                      heap: f,
                      ignoreFieldNorm: c
                  })
                : this._searchObjectList(e, {
                      heap: f,
                      ignoreFieldNorm: c
                  }),
                (l = f.extractSorted(r)))
        } else
            ((l = _(e)
                ? _(this._docs[0])
                    ? this._searchStringList(e)
                    : this._searchObjectList(e)
                : this._searchLogical(e)),
                jt(l, {
                    ignoreFieldNorm: c
                }),
                a && l.sort(r),
                G(n) && n > -1 && (l = l.slice(0, n)))
        return Wt(l, this._docs, {
            includeMatches: i,
            includeScore: o
        })
    }
    _searchStringList(e, { heap: s, ignoreFieldNorm: n } = {}) {
        const i = this._getSearcher(e),
            { records: o } = this._myIndex,
            a = s ? null : []
        return (
            o.forEach(({ v: r, i: c, n: d }) => {
                if (!v(r)) return
                const { isMatch: l, score: f, indices: g } = i.searchIn(r)
                if (l) {
                    const h = {
                        item: r,
                        idx: c,
                        matches: [
                            {
                                score: f,
                                value: r,
                                norm: d,
                                indices: g
                            }
                        ]
                    }
                    s
                        ? ((h.score = de(h.matches, {
                              ignoreFieldNorm: n
                          })),
                          s.shouldInsert(h.score) && s.insert(h))
                        : a.push(h)
                }
            }),
            a
        )
    }
    _searchLogical(e) {
        const s = qe(e, this.options),
            n = (r, c, d) => {
                if (!('children' in r)) {
                    const { keyId: h, searcher: k } = r
                    let p
                    return (
                        h === null
                            ? ((p = []),
                              this._myIndex.keys.forEach((u, y) => {
                                  p.push(
                                      ...this._findMatches({
                                          key: u,
                                          value: c[y],
                                          searcher: k
                                      })
                                  )
                              }))
                            : (p = this._findMatches({
                                  key: this._keyStore.get(h),
                                  value: this._myIndex.getValueForItemAtKeyId(c, h),
                                  searcher: k
                              })),
                        p && p.length
                            ? [
                                  {
                                      idx: d,
                                      item: c,
                                      matches: p
                                  }
                              ]
                            : []
                    )
                }
                const { children: l, operator: f } = r,
                    g = []
                for (let h = 0, k = l.length; h < k; h += 1) {
                    const p = l[h],
                        u = n(p, c, d)
                    if (u.length) g.push(...u)
                    else if (f === X.AND) return []
                }
                return g
            },
            i = this._myIndex.records,
            o = /* @__PURE__ */ new Map(),
            a = []
        return (
            i.forEach(({ $: r, i: c }) => {
                if (v(r)) {
                    const d = n(s, r, c)
                    d.length &&
                        (o.has(c) ||
                            (o.set(c, {
                                idx: c,
                                item: r,
                                matches: []
                            }),
                            a.push(o.get(c))),
                        d.forEach(({ matches: l }) => {
                            o.get(c).matches.push(...l)
                        }))
                }
            }),
            a
        )
    }
    // When a search involves inverse patterns (e.g. !Syrup), the aggregation
    // across keys switches from "ANY key matches" to "ALL keys must match."
    // This is signaled by hasInverse on the SearchResult from ExtendedSearch.
    //
    // For mixed patterns like "^hello !Syrup", a key failure is ambiguous —
    // it could be the positive or inverse term that failed. In that case we
    // conservatively exclude the item, which is strictly better than the old
    // behavior of including it. See: https://github.com/krisk/Fuse/issues/712
    _searchObjectList(e, { heap: s, ignoreFieldNorm: n } = {}) {
        const i = this._getSearcher(e),
            { keys: o, records: a } = this._myIndex,
            r = s ? null : []
        return (
            a.forEach(({ $: c, i: d }) => {
                if (!v(c)) return
                const l = []
                let f = !1,
                    g = !1
                if (
                    (o.forEach((h, k) => {
                        const p = this._findMatches({
                            key: h,
                            value: c[k],
                            searcher: i
                        })
                        p.length ? (l.push(...p), p[0].hasInverse && (g = !0)) : (f = !0)
                    }),
                    !(g && f) && l.length)
                ) {
                    const h = {
                        idx: d,
                        item: c,
                        matches: l
                    }
                    s
                        ? ((h.score = de(h.matches, {
                              ignoreFieldNorm: n
                          })),
                          s.shouldInsert(h.score) && s.insert(h))
                        : r.push(h)
                }
            }),
            r
        )
    }
    _findMatches({ key: e, value: s, searcher: n }) {
        if (!v(s)) return []
        const i = []
        if (B(s))
            s.forEach(({ v: o, i: a, n: r }) => {
                if (!v(o)) return
                const { isMatch: c, score: d, indices: l, hasInverse: f } = n.searchIn(o)
                c &&
                    i.push({
                        score: d,
                        key: e,
                        value: o,
                        idx: a,
                        norm: r,
                        indices: l,
                        hasInverse: f
                    })
            })
        else {
            const { v: o, n: a } = s,
                { isMatch: r, score: c, indices: d, hasInverse: l } = n.searchIn(o)
            r &&
                i.push({
                    score: c,
                    key: e,
                    value: o,
                    norm: a,
                    indices: d,
                    hasInverse: l
                })
        }
        return i
    }
}
class Ut {
    static condition(e, s) {
        return s.useTokenSearch
    }
    constructor(e, s) {
        ;((this.options = s),
            (this.analyzer = fe({
                isCaseSensitive: s.isCaseSensitive,
                ignoreDiacritics: s.ignoreDiacritics
            })))
        const n = this.analyzer.tokenize(e),
            i = s._invertedIndex,
            { df: o, fieldCount: a } = i
        ;((this.termSearchers = []), (this.idfWeights = []))
        for (const r of n) {
            this.termSearchers.push(
                new Ae(r, {
                    location: s.location,
                    threshold: s.threshold,
                    distance: s.distance,
                    includeMatches: s.includeMatches,
                    findAllMatches: s.findAllMatches,
                    minMatchCharLength: s.minMatchCharLength,
                    isCaseSensitive: s.isCaseSensitive,
                    ignoreDiacritics: s.ignoreDiacritics,
                    ignoreLocation: !0
                })
            )
            const c = o.get(r) || 0,
                d = Math.log(1 + (a - c + 0.5) / (c + 0.5))
            this.idfWeights.push(d)
        }
    }
    searchIn(e) {
        if (!this.termSearchers.length)
            return {
                isMatch: !1,
                score: 1
            }
        const s = []
        let n = 0,
            i = 0,
            o = 0
        for (let c = 0; c < this.termSearchers.length; c++) {
            const d = this.termSearchers[c].searchIn(e),
                l = this.idfWeights[c]
            ;((i += l), d.isMatch && (o++, (n += l * (1 - d.score)), d.indices && s.push(...d.indices)))
        }
        if (o === 0)
            return {
                isMatch: !1,
                score: 1
            }
        const a = i > 0 ? 1 - n / i : 0,
            r = {
                isMatch: !0,
                score: Math.max(1e-3, a)
            }
        return (this.options.includeMatches && s.length && (r.indices = we(s)), r)
    }
}
L.version = '7.3.0'
L.createIndex = Ke
L.parseIndex = wt
L.config = m
L.match = function (t, e, s) {
    return J(t, {
        ...m,
        ...s
    }).searchIn(e)
}
L.parseQuery = qe
_e(Nt)
_e(Ut)
L.use = function (...t) {
    t.forEach((e) => _e(e))
}
const Qt = /* @__PURE__ */ new Set([
    'what',
    'which',
    'who',
    'how',
    'does',
    'did',
    'do',
    'is',
    'are',
    'was',
    'were',
    'the',
    'a',
    'an',
    'and',
    'or',
    'of',
    'in',
    'to',
    'for',
    'on',
    'at',
    'has',
    'have',
    'had',
    'you',
    'your',
    'his',
    'her',
    'can',
    'could',
    'would',
    'should',
    'tell',
    'me',
    'about',
    'show',
    'give',
    'please',
    'i',
    'my',
    'he',
    'she',
    'it',
    'they',
    'them',
    'this',
    'that',
    'with',
    'from',
    'be',
    'been',
    'being'
])
function Vt(t) {
    const e = t
        .toLowerCase()
        .split(/\s+/)
        .filter((s) => !Qt.has(s.replace(/[?!.,]/g, '')))
    return e.length ? e.join(' ') : t
}
function Jt(t) {
    const e = new L(t, {
        keys: [
            { name: 'text', weight: 0.6 },
            { name: 'label', weight: 0.3 },
            { name: 'section', weight: 0.1 }
        ],
        threshold: 0.5,
        includeScore: !0,
        ignoreLocation: !0,
        minMatchCharLength: 2
    })
    return {
        search(s, n = 5) {
            if (!s || !s.trim()) return []
            const i = Vt(s.trim())
            return e.search(i, { limit: n }).map((a) => ({
                ...a.item,
                score: a.score
            }))
        },
        getAllDocs() {
            return t
        }
    }
}
const Ge = [
        {
            id: 'nav.about',
            type: 'navigate',
            target: '#about',
            keywords: ['about', 'who are you', 'introduce', 'yourself', 'tell me about yourself', 'bio', 'background'],
            examples: ['tell me about yourself', 'who are you', 'about section', 'your background']
        },
        {
            id: 'nav.career',
            type: 'navigate',
            target: '#career',
            keywords: ['career', 'experience', 'work history', 'resume', 'jobs', 'positions', 'roles'],
            examples: ['show your experience', 'career history', 'work history', 'your jobs', 'go to experience']
        },
        {
            id: 'nav.skills',
            type: 'navigate',
            target: '#skills',
            keywords: ['skills', 'tech stack', 'technologies', 'stack', 'tools', 'languages'],
            examples: ["what's your tech stack", 'skills section', 'technologies you use', 'programming languages']
        },
        {
            id: 'nav.leadership',
            type: 'navigate',
            target: '#leadership',
            keywords: ['leadership', 'management style', 'lead', 'principles'],
            examples: ['leadership style', 'management principles', 'how do you lead']
        },
        {
            id: 'nav.repos',
            type: 'navigate',
            target: '#repos',
            keywords: ['repos', 'repositories', 'open source', 'github', 'projects', 'oss', 'code'],
            examples: ['open source projects', 'github repos', 'your projects', 'show repos']
        },
        {
            id: 'nav.writing',
            type: 'navigate',
            target: '#writing',
            keywords: ['articles', 'blog', 'medium', 'writing', 'posts', 'publications', 'book'],
            examples: ['your articles', 'blog posts', 'medium articles', 'what have you written']
        },
        {
            id: 'nav.certs',
            type: 'navigate',
            target: '#certs',
            keywords: ['certifications', 'certificates', 'certified', 'credentials'],
            examples: ['certifications', 'your certificates', 'are you certified']
        },
        {
            id: 'nav.contact',
            type: 'navigate',
            target: '#contact',
            keywords: ['contact', 'email', 'reach', 'connect', 'hire', 'linkedin', 'social', 'say hello'],
            examples: ['how to contact you', 'your email', 'linkedin', 'reach out', 'say hello']
        },
        {
            id: 'nav.3d',
            type: 'navigate',
            target: '/world.html',
            keywords: ['3d', 'world', 'game', 'explore', 'interactive', 'drive'],
            examples: ['3d portfolio', 'explore the world', 'interactive version', 'play the game']
        }
    ],
    ge = [
        {
            id: 'qa.career_detail',
            type: 'query',
            keywords: [
                'testgorilla',
                'hopin',
                'vue.ai',
                'weinvest',
                'freshworks',
                'cognizant',
                'what did you do at',
                'role at',
                'work at'
            ],
            examples: [
                'what did you do at TestGorilla',
                'tell me about your Hopin role',
                'describe your work at Freshworks',
                'TestGorilla experience'
            ]
        },
        {
            id: 'qa.skills_fit',
            type: 'query',
            keywords: [
                'do you know',
                'experience with',
                'proficient',
                'familiar with',
                'python',
                'typescript',
                'aws',
                'kubernetes',
                'docker',
                'playwright',
                'cypress',
                'ai',
                'claude',
                'llm',
                'rag'
            ],
            examples: [
                'do you know Python',
                "what's your AI experience",
                'are you familiar with Kubernetes',
                'have you used Playwright'
            ]
        },
        {
            id: 'qa.leadership',
            type: 'query',
            keywords: [
                'how do you lead',
                'team building',
                'management approach',
                'mentorship',
                'scale teams',
                'team size',
                'culture'
            ],
            examples: [
                'how do you scale teams',
                'your management approach',
                'mentorship philosophy',
                'how do you build engineering culture'
            ]
        },
        {
            id: 'qa.recruiter',
            type: 'query',
            keywords: [
                'fit for',
                'good candidate',
                'hire',
                'vp engineering',
                'director',
                'startup experience',
                'remote',
                'team size',
                'years of experience',
                'why should we'
            ],
            examples: [
                'is Naresh a good fit for VP Engineering',
                'how large are his teams',
                'startup vs scale-up experience',
                'why should we hire you'
            ]
        },
        {
            id: 'qa.general',
            type: 'query',
            keywords: [],
            examples: ['summarize your experience', 'tell me about yourself', 'what makes you unique']
        }
    ],
    pe = {
        id: 'meta.about_ai',
        type: 'meta',
        keywords: ['how does this work', 'what model', 'are you ai', 'who are you', 'naresh.ai', 'what powers you'],
        response:
            "I'm naresh.ai — a lightweight AI assistant built into this portfolio. I use Fuse.js to search through Naresh's resume data and LLM providers (Groq and Gemini as fallback) to generate natural language answers. Everything runs client-side except the API calls. You get 10 AI queries per day. Try asking about his career, skills, or leadership philosophy!"
    },
    Ue = [...Ge, ...ge, pe],
    Xt = Ue.flatMap((t) => [
        ...t.keywords.map((e) => ({ text: e, intentId: t.id })),
        ...(t.examples || []).map((e) => ({ text: e, intentId: t.id }))
    ]),
    Zt = new L(Xt, {
        keys: ['text'],
        threshold: 0.35,
        includeScore: !0,
        ignoreLocation: !0
    })
function es(t, e, s) {
    const n = t.trim().toLowerCase()
    if (!n) return null
    if (pe.keywords.some((r) => n.includes(r))) return { intent: pe, confidence: 1 }
    for (const r of Ge)
        if (
            r.keywords.some((d) => {
                const l = d.toLowerCase()
                return n === l || n.includes(l)
            }) &&
            (n.split(/\s+/).length <= 4 || !Fe(n))
        )
            return { intent: r, confidence: 0.9 }
    const o = ['testgorilla', 'hopin', 'vue.ai', 'weinvest', 'freshworks', 'cognizant'].find((r) => n.includes(r))
    if (o && Fe(n))
        return {
            intent: ge.find((r) => r.id === 'qa.career_detail'),
            confidence: 0.85,
            params: { company: o }
        }
    const a = Zt.search(n, { limit: 5 })
    if (a.length) {
        const r = a[0],
            c = 1 - r.score,
            d = r.item.intentId,
            l = Ue.find((f) => f.id === d)
        if (l && c > 0.7) return l.type === 'navigate' ? { intent: l, confidence: c } : { intent: l, confidence: c }
        if (l && c > 0.4) return { intent: l, confidence: c }
    }
    return {
        intent: ge.find((r) => r.id === 'qa.general'),
        confidence: 0.3
    }
}
function Fe(t) {
    const e = [
            'what',
            'how',
            'why',
            'when',
            'where',
            'who',
            'tell',
            'describe',
            'explain',
            'show',
            'can',
            'do',
            'does',
            'is',
            'are',
            'have',
            'has'
        ],
        s = t.split(/\s+/)[0]
    return t.includes('?') || e.includes(s)
}
const ts = `You are naresh.ai, a concise AI assistant for Naresh Sekar's professional portfolio.

Rules:
- Answer ONLY from the provided context. If the context doesn't contain the answer, say so honestly.
- Use first person ("I", "my") when speaking as Naresh.
- Keep answers under 3 short paragraphs. Be specific: include company names, technologies, and dates when available.
- For recruiter-style questions, be honest and factual. Don't oversell.
- If asked about something not in the context, suggest which section of the portfolio might help.
- Format with **bold** for emphasis and bullet points (using -) for lists. Use short paragraphs separated by blank lines.
- Be conversational and natural, not robotic.`
function ss(t, e) {
    const s = e.map(
        (n) => `[Section: ${n.label || n.section}]
${n.text}`
    ).join(`
---
`)
    return {
        system: ts,
        user: `CONTEXT:
---
${s}
---

QUESTION: ${t}`
    }
}
const ns = 'https://api.groq.com/openai/v1/chat/completions',
    is = 'openai/gpt-oss-20b',
    rs = 'gpt-oss-20b',
    Qe = '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'
function os() {
    return Qe.length > 0
}
async function cs(t, e) {
    const s = {
            model: is,
            messages: [
                { role: 'system', content: t },
                { role: 'user', content: e }
            ],
            temperature: 0.4,
            max_tokens: 512
        },
        n = await fetch(ns, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Qe}`
            },
            body: JSON.stringify(s)
        })
    if (n.status === 429) throw new Error('RATE_LIMITED')
    if (!n.ok) throw new Error(`API_ERROR_${n.status}`)
    const o = (await n.json())?.choices?.[0]?.message?.content
    if (!o) throw new Error('EMPTY_RESPONSE')
    return { text: o, model: rs }
}
const as = /* @__PURE__ */ Object.freeze(
        /* @__PURE__ */ Object.defineProperty(
            {
                __proto__: null,
                generate: cs,
                hasApiKey: os
            },
            Symbol.toStringTag,
            { value: 'Module' }
        )
    ),
    ls = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
    us = 'gemini-flash',
    Ve = 'AIzaSyCRViJoYFLh8f0BvKnbelmeQgyudUC8Gdo'
function hs() {
    return Ve.length > 0
}
async function ds(t, e) {
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
        },
        n = await fetch(`${ls}?key=${Ve}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        })
    if (n.status === 429) throw new Error('RATE_LIMITED')
    if (!n.ok) throw new Error(`API_ERROR_${n.status}`)
    const o = (await n.json())?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!o) throw new Error('EMPTY_RESPONSE')
    return { text: o, model: us }
}
const fs = /* @__PURE__ */ Object.freeze(
        /* @__PURE__ */ Object.defineProperty(
            {
                __proto__: null,
                generate: ds,
                hasApiKey: hs
            },
            Symbol.toStringTag,
            { value: 'Module' }
        )
    ),
    Je = 'naresh_ai_rate',
    Z = 10
let U = null
function me() {
    return /* @__PURE__ */ new Date().toISOString().slice(0, 10)
}
function gs() {
    try {
        const t = localStorage.getItem(Je)
        if (t) {
            const e = JSON.parse(t)
            if (e.date === me()) return e
        }
    } catch {}
    return { date: me(), count: 0 }
}
function ps(t) {
    try {
        localStorage.setItem(Je, JSON.stringify(t))
    } catch {
        U = t
    }
}
function Xe() {
    return U && U.date === me() ? U : gs()
}
function ms() {
    const t = Xe()
    return t.count >= Z ? { remaining: 0, allowed: !1 } : (t.count++, ps(t), { remaining: Z - t.count, allowed: !0 })
}
function ye() {
    return Z - Xe().count
}
function ke() {
    return Z
}
const Te = 1500
let ie = 0
const Ze = [
    { name: 'groq', client: as },
    { name: 'gemini', client: fs }
]
function ys() {
    return Ze.some((t) => t.client.hasApiKey())
}
async function ks(t, e) {
    if (!ms().allowed) throw new Error('DAILY_LIMIT')
    const n = Date.now()
    ;(n - ie < Te && (await new Promise((o) => setTimeout(o, Te - (n - ie)))), (ie = Date.now()))
    let i = null
    for (const { name: o, client: a } of Ze)
        if (a.hasApiKey())
            try {
                return { ...(await a.generate(t, e)), provider: o }
            } catch (r) {
                i = r
                continue
            }
    throw i || new Error('NO_API_KEY')
}
function Be(t) {
    const e = /* @__PURE__ */ new Set(),
        s = []
    for (const n of t) if (!e.has(n.section) && (e.add(n.section), s.push(n), s.length >= 5)) break
    return s
}
async function bs(t, e, s) {
    const n = e.search(t, 5),
        i =
            n.length >= 3
                ? n
                : n.length
                  ? [...n, ...Be(s).filter((c) => !n.some((d) => d.id === c.id))].slice(0, 5)
                  : Be(s),
        o = i.map((c) => ({
            id: c.id,
            section: c.section,
            label: c.label,
            meta: c.meta
        }))
    if (!ys())
        return {
            type: 'fallback',
            text: "Here's what I found in the resume:",
            sources: o,
            chunks: i,
            model: null
        }
    const { system: a, user: r } = ss(t, i)
    try {
        const c = await ks(a, r)
        return {
            type: 'answer',
            text: c.text,
            sources: o,
            model: c.model
        }
    } catch (c) {
        const d = c.message || 'UNKNOWN'
        let l = "I couldn't reach the AI. Here's what I found locally:"
        return (
            d === 'DAILY_LIMIT'
                ? (l = `You've reached the daily limit (${ye()}/${ke()}). Come back tomorrow! Here's what I found locally:`)
                : d === 'RATE_LIMITED'
                  ? (l = "naresh.ai is popular today — I've hit the rate limit. Here's what I found locally:")
                  : d === 'NO_API_KEY' && (l = "AI answers aren't configured. Here's what I found in the resume:"),
            {
                type: 'fallback',
                text: l,
                sources: o,
                chunks: i,
                error: d,
                model: null
            }
        )
    }
}
let b = null
function Es(t) {
    const {
        logEl: e,
        inputEl: s,
        sendEl: n,
        suggEl: i,
        search: o,
        chunks: a,
        handlers: r,
        suggestions: c,
        queryRAG: d,
        getRemaining: l,
        getMax: f
    } = t
    if (!e || !s || !n) return
    const g = e.closest('.ask')?.querySelector('.ask__head-l')
    let h = null,
        k = null
    if (g) {
        const y = g.querySelector('span:last-child')
        y &&
            ((y.innerHTML =
                'naresh.ai · <span class="ask__status" data-state="ready">ready</span> · <span class="ask__rate"></span>'),
            (h = y.querySelector('.ask__status')),
            (k = y.querySelector('.ask__rate')),
            k && l && (k.textContent = `${l()}/${f()}`))
    }
    const p = [
        {
            role: 'a',
            text: "Hi! Ask me anything about Naresh's work, leadership, or projects. I'll answer from his resume."
        }
    ]
    b = {
        logEl: e,
        inputEl: s,
        sendEl: n,
        suggEl: i,
        statusEl: h,
        rateEl: k,
        messages: p,
        search: o,
        chunks: a,
        handlers: r,
        suggestions: c,
        queryRAG: d,
        getRemaining: l,
        getMax: f
    }
    const u = async (y) => {
        const E = (y || s.value || '').trim()
        if (E) {
            ;((s.value = ''),
                p.push({ role: 'u', text: E }),
                F(),
                K('thinking'),
                p.push({ role: 't', stage: 'searching resume...' }),
                F())
            try {
                const w = es(E, o, r)
                if (w?.intent?.type === 'meta') {
                    ;(q(), p.push({ role: 'a', text: w.intent.response }), F(), K('ready'))
                    return
                }
                if (w?.intent?.type === 'navigate' && w.confidence >= 0.7) {
                    const I = w.intent.target
                    if ((q(), I.startsWith('/'))) {
                        ;(p.push({ role: 'a', text: 'Taking you to the 3D world...' }),
                            F(),
                            K('ready'),
                            setTimeout(() => {
                                window.location.href = I
                            }, 600))
                        return
                    }
                    ;(p.push({ role: 'a', text: `Scrolling to ${w.intent.id.replace('nav.', '')} section...` }),
                        F(),
                        K('ready'),
                        r.scrollTo?.(I))
                    return
                }
                As('generating answer...')
                const A = await d(E)
                ;(q(),
                    A.type === 'answer'
                        ? (p.push({ role: 'a', text: A.text, model: A.model }),
                          A.sources?.length && p.push({ role: 'sources', items: A.sources }))
                        : (p.push({ role: 'a', text: A.text, model: A.model, variant: A.error ? 'error' : void 0 }),
                          A.chunks?.length &&
                              p.push({
                                  role: 'sources',
                                  items: A.chunks.map((I) => ({
                                      id: I.id,
                                      section: I.section,
                                      label: I.label,
                                      meta: I.meta
                                  }))
                              })),
                    F(),
                    Re(),
                    vs(w?.intent?.id))
            } catch {
                ;(q(),
                    p.push({
                        role: 'a',
                        text: 'Something went wrong. Try asking in a different way.',
                        variant: 'error'
                    }),
                    F(),
                    Re())
            }
            K('ready')
        }
    }
    return (
        n.addEventListener('click', () => u()),
        s.addEventListener('keydown', (y) => {
            y.key === 'Enter' && u()
        }),
        _s(c, u),
        F(),
        { send: u }
    )
}
function F() {
    if (!b) return
    const { logEl: t, messages: e, handlers: s } = b
    ;((t.innerHTML = ''),
        e.forEach((n) => {
            if (n.role === 'a') {
                const i = document.createElement('div')
                ;((i.className = 'msg__tag'), (i.textContent = n.model ? `NARESH.AI · via ${n.model}` : 'NARESH.AI'))
                const o = document.createElement('div')
                o.innerHTML = xs(n.text)
                const a = document.createElement('div')
                ;((a.className = `msg msg--a${n.variant === 'error' ? ' msg--error' : ''}`),
                    a.append(i, o),
                    t.append(a))
            } else if (n.role === 'u') {
                const i = document.createElement('div')
                ;((i.className = 'msg msg--u'), (i.textContent = n.text), t.append(i))
            } else if (n.role === 't') {
                const i = document.createElement('div')
                ;((i.className = 'msg msg--think'),
                    (i.innerHTML = `<span class="thinking-dots"><span></span><span></span><span></span></span> <span class="thinking-label">${n.stage || 'thinking...'}</span>`),
                    t.append(i))
            } else if (n.role === 'sources') {
                const i = document.createElement('div')
                ;((i.className = 'msg__sources'),
                    (n.items || []).forEach((o) => {
                        const a = document.createElement('button')
                        ;((a.className = 'msg__src'),
                            (a.textContent = o.label || o.section),
                            a.addEventListener('click', () => ws(o, s)),
                            i.append(a))
                    }),
                    t.append(i))
            }
        }),
        (t.scrollTop = t.scrollHeight))
}
function ws(t, e) {
    const s = {
        about: '#about',
        career: '#career',
        skills: '#skills',
        leadership: '#leadership',
        repos: '#repos',
        writing: '#writing',
        certs: '#certs',
        education: '#contact',
        contact: '#contact'
    }
    if (t.section === 'career' && t.meta?.idx !== void 0) {
        e.openCareerModal?.(t.meta.idx)
        return
    }
    if (t.section === 'repos' && t.meta) {
        e.openDetailModal?.('repo', (t.meta.kind || '').toLowerCase(), t.meta.idx)
        return
    }
    if (t.section === 'writing' && t.meta) {
        e.openDetailModal?.('article', (t.meta.kind || '').toLowerCase(), t.meta.idx)
        return
    }
    const n = s[t.section]
    n && e.scrollTo?.(n)
}
function K(t) {
    b?.statusEl &&
        ((b.statusEl.dataset.state = t),
        (b.statusEl.textContent = t === 'ready' ? 'ready' : t === 'thinking' ? 'thinking...' : t))
}
function Re() {
    !b?.rateEl || !b.getRemaining || (b.rateEl.textContent = `${b.getRemaining()}/${b.getMax()}`)
}
function q() {
    if (!b) return
    const t = b.messages.findIndex((e) => e.role === 't')
    t !== -1 && b.messages.splice(t, 1)
}
function As(t) {
    if (!b) return
    const e = b.messages.find((s) => s.role === 't')
    e && ((e.stage = t), F())
}
function _s(t, e) {
    b?.suggEl &&
        ((b.suggEl.innerHTML = ''),
        (t || []).forEach((s) => {
            const n = document.createElement('button')
            ;((n.className = 'sugg'),
                (n.textContent = s),
                n.addEventListener('click', () => {
                    ;((b.suggEl.innerHTML = ''), e(s))
                }),
                b.suggEl.append(n))
        }))
}
function xs(t) {
    let e = String(t ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    return (
        (e = e.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')),
        e
            .split(/\n{2,}/)
            .map((n) => {
                const i = n.split(`
`)
                return i.every((o) => /^[-•]\s/.test(o.trim()) || !o.trim())
                    ? `<ul>${i
                          .filter((a) => a.trim())
                          .map((a) => `<li>${a.replace(/^[-•]\s+/, '')}</li>`)
                          .join('')}</ul>`
                    : `<p>${i.join('<br>')}</p>`
            })
            .join('')
    )
}
const Ne = {
    'qa.career_detail': ['What technologies were used?', 'How large was the team?', 'What about the previous role?'],
    'qa.skills_fit': ['Show me related projects', 'Where was this used?'],
    'qa.leadership': ['How do you handle conflict?', 'Tell me about team growth'],
    'qa.recruiter': ['What certifications does he have?', 'Tell me about his AI experience'],
    'qa.general': ['Show leadership principles', 'What are his top projects?']
}
function vs(t) {
    if (!b?.suggEl) return
    const e = Ne[t] || Ne['qa.general']
    ;((b.suggEl.innerHTML = ''),
        e.forEach((s) => {
            const n = document.createElement('button')
            ;((n.className = 'sugg'),
                (n.textContent = s),
                n.addEventListener('click', () => {
                    b.suggEl.innerHTML = ''
                    const i = b.inputEl?.closest('.ask')?.querySelector('#ask-send')
                    i && ((b.inputEl.value = s), i.click())
                }),
                b.suggEl.append(n))
        }))
}
let D = null,
    O = null,
    T = null,
    be = null,
    S = 0,
    xe = [],
    ve = null,
    Q = null,
    j = null,
    V = null
function Is({ resumeData: t, search: e, handlers: s, getRemaining: n, getMax: i }) {
    V = { getRemaining: n, getMax: i }
    const o = Cs(t)
    ;((ve = new L(o, {
        keys: [
            { name: 'label', weight: 0.5 },
            { name: 'subtitle', weight: 0.3 },
            { name: 'searchText', weight: 0.2 }
        ],
        threshold: 0.4,
        includeScore: !0,
        ignoreLocation: !0
    })),
        (xe = o),
        Ss(),
        Ms(s))
}
function Cs(t) {
    const e = []
    return (
        [
            { id: '#about', label: 'About', subtitle: 'Who is Naresh' },
            { id: '#career', label: 'Career', subtitle: 'Experience & work history' },
            { id: '#skills', label: 'Skills', subtitle: 'Tech stack & tools' },
            { id: '#leadership', label: 'Leadership', subtitle: 'Management principles' },
            { id: '#repos', label: 'Open Source', subtitle: 'GitHub repos & projects' },
            { id: '#writing', label: 'Writing', subtitle: 'Articles & publications' },
            { id: '#certs', label: 'Certifications', subtitle: 'AWS, Reforge, Cisco...' },
            { id: '#contact', label: 'Contact', subtitle: 'Email, LinkedIn, social' }
        ].forEach((r) => {
            e.push({
                category: 'Sections',
                icon: '#',
                label: r.label,
                subtitle: r.subtitle,
                searchText: `${r.label} ${r.subtitle}`,
                action: { type: 'scroll', target: r.id }
            })
        }),
        (t.career || []).forEach((r, c) => {
            r.isTail ||
                e.push({
                    category: 'Career',
                    icon: r.role?.includes('Manager') ? 'EM' : r.role?.substring(0, 2) || '>>',
                    label: `${r.role} at ${r.co}`,
                    subtitle: r.date,
                    searchText: `${r.role} ${r.co} ${r.date} ${r.teaser}`,
                    action: { type: 'career', idx: c }
                })
        }),
        [
            ...(t.reposStarred || []).map((r, c) => ({ ...r, __kind: 'Starred', __idx: c })),
            ...(t.reposRecent || []).map((r, c) => ({ ...r, __kind: 'Recent', __idx: c }))
        ].forEach((r) => {
            e.push({
                category: 'Repos',
                icon: '</>',
                label: r.name,
                subtitle: r.tagline || r.desc?.slice(0, 60) || '',
                searchText: `${r.name} ${r.tagline} ${r.desc} ${r.tags?.join(' ') || ''} ${r.language}`,
                action: { type: 'repo', kind: r.__kind, idx: r.__idx }
            })
        }),
        [
            ...(t.articlesPinned || []).map((r, c) => ({ ...r, __kind: 'Pinned', __idx: c })),
            ...(t.articlesRecent || []).map((r, c) => ({ ...r, __kind: 'Recent', __idx: c }))
        ].forEach((r) => {
            e.push({
                category: 'Articles',
                icon: '✎',
                label: r.title,
                subtitle: `${r.date} · ${(r.tags?.[0] || '').toUpperCase()}`,
                searchText: `${r.title} ${r.date} ${r.tags?.join(' ') || ''} ${r.desc}`,
                action: { type: 'article', kind: r.__kind, idx: r.__idx }
            })
        }),
        (t.skills || []).forEach((r) => {
            r.items.forEach((c) => {
                e.push({
                    category: 'Skills',
                    icon: '[S]',
                    label: c,
                    subtitle: r.name,
                    searchText: `${c} ${r.name} skill`,
                    action: { type: 'scroll', target: '#skills' }
                })
            })
        }),
        e
    )
}
function Ss() {
    if (document.getElementById('cmdk-overlay')) return
    ;(document.body.insertAdjacentHTML(
        'beforeend',
        `
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
        </div>`
    ),
        (D = document.getElementById('cmdk-overlay')),
        (O = document.getElementById('cmdk-input')),
        (T = document.getElementById('cmdk-results')),
        (be = D.querySelector('.cmdk__rate')),
        D.querySelector('.cmdk__backdrop').addEventListener('click', ee))
    let e = null
    ;(O.addEventListener('input', () => {
        ;(clearTimeout(e),
            (e = setTimeout(() => {
                ;((S = 0), et(O.value.trim()))
            }, 80)))
    }),
        O.addEventListener('keydown', (s) => {
            const n = T.querySelectorAll('.cmdk__item').length
            s.key === 'ArrowDown'
                ? (s.preventDefault(), (S = (S + 1) % Math.max(n, 1)), te())
                : s.key === 'ArrowUp'
                  ? (s.preventDefault(), (S = (S - 1 + Math.max(n, 1)) % Math.max(n, 1)), te())
                  : s.key === 'Enter'
                    ? (s.preventDefault(), $s())
                    : s.key === 'Escape' && (s.preventDefault(), ee())
        }))
}
function Ms(t) {
    ;((j = t),
        document.addEventListener('keydown', (s) => {
            ;(s.metaKey || s.ctrlKey) &&
                s.key === 'k' &&
                (s.preventDefault(), D?.classList.contains('open') ? ee() : Oe())
        }))
    const e = document.getElementById('search-btn')
    e && e.addEventListener('click', () => Oe())
}
function Oe() {
    D &&
        ((Q = document.activeElement),
        D.classList.add('open'),
        D.setAttribute('aria-hidden', 'false'),
        document.body.classList.add('cmdk-open'),
        (O.value = ''),
        (S = 0),
        et(''),
        be && V?.getRemaining && (be.textContent = `${V.getRemaining()}/${V.getMax()} AI queries today`),
        setTimeout(() => O.focus(), 50))
}
function ee() {
    D &&
        (D.classList.remove('open'),
        D.setAttribute('aria-hidden', 'true'),
        document.body.classList.remove('cmdk-open'),
        Q && (Q.focus(), (Q = null)))
}
function et(t) {
    if (!T) return
    T.innerHTML = ''
    let e
    t
        ? ((e = ve.search(t, { limit: 8 }).map((o) => o.item)),
          t.length >= 3 &&
              e.push({
                  category: 'Ask AI',
                  icon: '✦',
                  label: `Ask naresh.ai: "${t}"`,
                  subtitle: 'Get an AI-powered answer',
                  action: { type: 'ask', query: t }
              }))
        : (e = xe.filter((i) => i.category === 'Sections' || i.category === 'Career'))
    const s = /* @__PURE__ */ new Map()
    e.forEach((i) => {
        ;(s.has(i.category) || s.set(i.category, []), s.get(i.category).push(i))
    })
    let n = 0
    ;(s.forEach((i, o) => {
        const a = document.createElement('div')
        ;((a.className = 'cmdk__group-label'),
            (a.textContent = o),
            T.append(a),
            i.forEach((r) => {
                const c = document.createElement('div')
                ;((c.className = 'cmdk__item'),
                    c.setAttribute('role', 'option'),
                    (c.dataset.idx = n),
                    (c.innerHTML = `
                <span class="cmdk__item-icon">${re(r.icon)}</span>
                <div class="cmdk__item-text">
                    <div class="cmdk__item-title">${re(r.label)}</div>
                    <div class="cmdk__item-subtitle">${re(r.subtitle)}</div>
                </div>`),
                    c.addEventListener('click', () => tt(r.action)),
                    c.addEventListener('mouseenter', () => {
                        ;((S = parseInt(c.dataset.idx, 10)), te())
                    }),
                    T.append(c),
                    n++)
            }))
    }),
        te())
}
function te() {
    if (!T) return
    const t = T.querySelectorAll('.cmdk__item')
    t.forEach((s, n) => {
        s.setAttribute('aria-selected', n === S ? 'true' : 'false')
    })
    const e = t[S]
    e && e.scrollIntoView({ block: 'nearest' })
}
function $s() {
    if (!T.querySelectorAll('.cmdk__item')[S]) return
    const e = O.value.trim()
    let s
    ;(e
        ? ((s = ve.search(e, { limit: 8 }).map((n) => n.item)),
          e.length >= 3 && s.push({ action: { type: 'ask', query: e } }))
        : (s = xe.filter((n) => n.category === 'Sections' || n.category === 'Career')),
        s[S] && tt(s[S].action))
}
function tt(t) {
    if (!(!t || !j))
        switch ((ee(), t.type)) {
            case 'scroll':
                j.scrollTo?.(t.target)
                break
            case 'career':
                j.openCareerModal?.(t.idx)
                break
            case 'repo':
                j.openDetailModal?.('repo', (t.kind || '').toLowerCase(), t.idx)
                break
            case 'article':
                j.openDetailModal?.('article', (t.kind || '').toLowerCase(), t.idx)
                break
            case 'ask':
                Ds(t.query)
                break
        }
}
function Ds(t) {
    const e = document.getElementById('chat-panel'),
        s = document.getElementById('chat-fab'),
        n = document.getElementById('ask-input'),
        i = document.getElementById('ask-send')
    ;(e &&
        !e.classList.contains('is-open') &&
        (e.classList.add('is-open'),
        e.setAttribute('aria-hidden', 'false'),
        s && s.setAttribute('aria-expanded', 'true'),
        document.body.classList.add('chat-open')),
        n && i && ((n.value = t), setTimeout(() => i.click(), 100)))
}
function re(t) {
    return String(t ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}
function Fs({ resumeData: t, chatRoot: e, handlers: s, suggestions: n }) {
    const i = nt(t),
        o = Jt(i)
    ;(Es({
        ...e,
        search: o,
        chunks: i,
        handlers: s,
        suggestions: n,
        queryRAG: (a) => bs(a, o, i),
        getRemaining: ye,
        getMax: ke
    }),
        Is({
            resumeData: t,
            search: o,
            handlers: s,
            getRemaining: ye,
            getMax: ke
        }))
}
function Ts() {}
export { Ts as destroy, Fs as init }
