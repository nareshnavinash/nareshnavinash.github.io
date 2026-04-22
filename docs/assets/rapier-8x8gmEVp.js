import { B as Jt, __tla as __tla_0 } from "./MiniMap-CePJcjpb.js";
import "./three.core-RE2ucuTm.js";
import { __tla as __tla_1 } from "./Game-BYQM5Rfs.js";
import "./preload-helper-PPVm8Dsz.js";
import "./index-DDlvirwQ.js";
let Pt, Et, At, xe, Dr, kr, Ee, Vr, ht, ge, z, Kr, mt, Le, jt, je, He, Br, Or, Jr, Jh, at, Sr, Pr, Ir, Gr, le, ke, X, Ar, vr, Hr, ce, q, N, Ur, rt, _e, et, Mr, Lr, Wr, he, Xr, ut, bt, Fe, xr, zr, ae, ue, Xh, Nt, pt, gt, jr, Fr, oe, J, yr, V, Rr, v, Ne, It, Ie, De, ze, fr, se, Ae, de, k, ot, st, F, pe, Er, Tr, Cr, qr, Nr, Me, we, Pe, Re, Ce, mr, w, Te, Gt, ep, Kh, qh;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  const Yr = "" + new URL("rapier_wasm3d_bg-bb0TTxsO.wasm", import.meta.url).href, Zr = async (s = {}, t) => {
    let e;
    if (t.startsWith("data:")) {
      const r = t.replace(/^data:.*?base64,/, "");
      let a;
      if (typeof Jt == "function" && typeof Jt.from == "function") a = Jt.from(r, "base64");
      else if (typeof atob == "function") {
        const o = atob(r);
        a = new Uint8Array(o.length);
        for (let _ = 0; _ < o.length; _++) a[_] = o.charCodeAt(_);
      } else throw new Error("Cannot decode base64-encoded data URL");
      e = await WebAssembly.instantiate(a, s);
    } else {
      const r = await fetch(t), a = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && a.startsWith("application/wasm")) e = await WebAssembly.instantiateStreaming(r, s);
      else {
        const o = await r.arrayBuffer();
        e = await WebAssembly.instantiate(o, s);
      }
    }
    return e.instance.exports;
  }, We = globalThis || void 0 || self;
  let i;
  function $r(s) {
    i = s;
  }
  const x = new Array(128).fill(void 0);
  x.push(void 0, null, true, false);
  function R(s) {
    return x[s];
  }
  let lt = x.length;
  function I(s) {
    lt === x.length && x.push(x.length + 1);
    const t = lt;
    return lt = x[t], x[t] = s, t;
  }
  function zt(s, t) {
    try {
      return s.apply(this, t);
    } catch (e) {
      i.__wbindgen_export_0(I(e));
    }
  }
  const Qr = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let hr = new Qr("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  hr.decode();
  let yt = null;
  function ti() {
    return (yt === null || yt.byteLength === 0) && (yt = new Uint8Array(i.memory.buffer)), yt;
  }
  function be(s, t) {
    return s = s >>> 0, hr.decode(ti().subarray(s, s + t));
  }
  function y(s) {
    return s == null;
  }
  let nt = null;
  function T() {
    return (nt === null || nt.buffer.detached === true || nt.buffer.detached === void 0 && nt.buffer !== i.memory.buffer) && (nt = new DataView(i.memory.buffer)), nt;
  }
  function ei(s) {
    s < 132 || (x[s] = lt, lt = s);
  }
  function wt(s) {
    const t = R(s);
    return ei(s), t;
  }
  function ri() {
    let s, t;
    try {
      const a = i.__wbindgen_add_to_stack_pointer(-16);
      i.version(a);
      var e = T().getInt32(a + 0, true), r = T().getInt32(a + 4, true);
      return s = e, t = r, be(e, r);
    } finally {
      i.__wbindgen_add_to_stack_pointer(16), i.__wbindgen_export_1(s, t, 1);
    }
  }
  function ii(s) {
    i.reserve_memory(s);
  }
  function c(s, t) {
    if (!(s instanceof t)) throw new Error(`expected instance of ${t.name}`);
  }
  let j = 128;
  function A(s) {
    if (j == 1) throw new Error("out of js stack");
    return x[--j] = s, j;
  }
  let vt = null;
  function ni() {
    return (vt === null || vt.byteLength === 0) && (vt = new Int32Array(i.memory.buffer)), vt;
  }
  function ai(s, t) {
    return s = s >>> 0, ni().subarray(s / 4, s / 4 + t);
  }
  let St = null;
  function pr() {
    return (St === null || St.byteLength === 0) && (St = new Float32Array(i.memory.buffer)), St;
  }
  function Be(s, t) {
    return s = s >>> 0, pr().subarray(s / 4, s / 4 + t);
  }
  let Rt = null;
  function ur() {
    return (Rt === null || Rt.byteLength === 0) && (Rt = new Uint32Array(i.memory.buffer)), Rt;
  }
  function si(s, t) {
    return s = s >>> 0, ur().subarray(s / 4, s / 4 + t);
  }
  let W = 0;
  function ct(s, t) {
    const e = t(s.length * 4, 4) >>> 0;
    return ur().set(s, e / 4), W = s.length, e;
  }
  function tt(s, t) {
    const e = t(s.length * 4, 4) >>> 0;
    return pr().set(s, e / 4), W = s.length, e;
  }
  const Ft = Object.freeze({
    LinX: 0,
    0: "LinX",
    LinY: 1,
    1: "LinY",
    LinZ: 2,
    2: "LinZ",
    AngX: 3,
    3: "AngX",
    AngY: 4,
    4: "AngY",
    AngZ: 5,
    5: "AngZ"
  }), U = Object.freeze({
    Revolute: 0,
    0: "Revolute",
    Fixed: 1,
    1: "Fixed",
    Prismatic: 2,
    2: "Prismatic",
    Rope: 3,
    3: "Rope",
    Spring: 4,
    4: "Spring",
    Spherical: 5,
    5: "Spherical",
    Generic: 6,
    6: "Generic"
  }), D = Object.freeze({
    Ball: 0,
    0: "Ball",
    Cuboid: 1,
    1: "Cuboid",
    Capsule: 2,
    2: "Capsule",
    Segment: 3,
    3: "Segment",
    Polyline: 4,
    4: "Polyline",
    Triangle: 5,
    5: "Triangle",
    TriMesh: 6,
    6: "TriMesh",
    HeightField: 7,
    7: "HeightField",
    Compound: 8,
    8: "Compound",
    ConvexPolyhedron: 9,
    9: "ConvexPolyhedron",
    Cylinder: 10,
    10: "Cylinder",
    Cone: 11,
    11: "Cone",
    RoundCuboid: 12,
    12: "RoundCuboid",
    RoundTriangle: 13,
    13: "RoundTriangle",
    RoundCylinder: 14,
    14: "RoundCylinder",
    RoundCone: 15,
    15: "RoundCone",
    RoundConvexPolyhedron: 16,
    16: "RoundConvexPolyhedron",
    HalfSpace: 17,
    17: "HalfSpace",
    Voxels: 18,
    18: "Voxels"
  }), qt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawbroadphase_free(s >>> 0, 1));
  class K {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(K.prototype);
      return e.__wbg_ptr = t, qt.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qt.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawbroadphase_free(t, 0);
    }
    constructor() {
      const t = i.rawbroadphase_new();
      return this.__wbg_ptr = t >>> 0, qt.register(this, this.__wbg_ptr, this), this;
    }
    castRay(t, e, r, a, o, _, d, h, p, u, g, b) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, l);
        const m = i.rawbroadphase_castRay(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _, d, h, y(p) ? 4294967297 : p >>> 0, !y(u), y(u) ? 0 : u, !y(g), y(g) ? 0 : g, A(b));
        return m === 0 ? void 0 : Se.__wrap(m);
      } finally {
        x[j++] = void 0;
      }
    }
    castRayAndGetNormal(t, e, r, a, o, _, d, h, p, u, g, b) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, l);
        const m = i.rawbroadphase_castRayAndGetNormal(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _, d, h, y(p) ? 4294967297 : p >>> 0, !y(u), y(u) ? 0 : u, !y(g), y(g) ? 0 : g, A(b));
        return m === 0 ? void 0 : kt.__wrap(m);
      } finally {
        x[j++] = void 0;
      }
    }
    intersectionsWithRay(t, e, r, a, o, _, d, h, p, u, g, b, m) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, l), i.rawbroadphase_intersectionsWithRay(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _, d, A(h), p, y(u) ? 4294967297 : u >>> 0, !y(g), y(g) ? 0 : g, !y(b), y(b) ? 0 : b, A(m));
      } finally {
        x[j++] = void 0, x[j++] = void 0;
      }
    }
    intersectionWithShape(t, e, r, a, o, _, d, h, p, u, g) {
      try {
        const C = i.__wbindgen_add_to_stack_pointer(-16);
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, S), c(_, f), i.rawbroadphase_intersectionWithShape(C, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d, y(h) ? 4294967297 : h >>> 0, !y(p), y(p) ? 0 : p, !y(u), y(u) ? 0 : u, A(g));
        var b = T().getInt32(C + 0, true), m = T().getFloat64(C + 8, true);
        return b === 0 ? void 0 : m;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16), x[j++] = void 0;
      }
    }
    projectPoint(t, e, r, a, o, _, d, h, p, u) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l);
        const g = i.rawbroadphase_projectPoint(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o, _, y(d) ? 4294967297 : d >>> 0, !y(h), y(h) ? 0 : h, !y(p), y(p) ? 0 : p, A(u));
        return g === 0 ? void 0 : Ct.__wrap(g);
      } finally {
        x[j++] = void 0;
      }
    }
    projectPointAndGetFeature(t, e, r, a, o, _, d, h, p) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l);
        const u = i.rawbroadphase_projectPointAndGetFeature(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o, y(_) ? 4294967297 : _ >>> 0, !y(d), y(d) ? 0 : d, !y(h), y(h) ? 0 : h, A(p));
        return u === 0 ? void 0 : Ct.__wrap(u);
      } finally {
        x[j++] = void 0;
      }
    }
    intersectionsWithPoint(t, e, r, a, o, _, d, h, p, u) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), i.rawbroadphase_intersectionsWithPoint(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, A(o), _, y(d) ? 4294967297 : d >>> 0, !y(h), y(h) ? 0 : h, !y(p), y(p) ? 0 : p, A(u));
      } finally {
        x[j++] = void 0, x[j++] = void 0;
      }
    }
    castShape(t, e, r, a, o, _, d, h, p, u, g, b, m, C, H) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, S), c(_, l), c(d, f);
        const G = i.rawbroadphase_castShape(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d.__wbg_ptr, h, p, u, g, y(b) ? 4294967297 : b >>> 0, !y(m), y(m) ? 0 : m, !y(C), y(C) ? 0 : C, A(H));
        return G === 0 ? void 0 : Tt.__wrap(G);
      } finally {
        x[j++] = void 0;
      }
    }
    intersectionsWithShape(t, e, r, a, o, _, d, h, p, u, g, b) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, S), c(_, f), i.rawbroadphase_intersectionsWithShape(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, A(d), h, y(p) ? 4294967297 : p >>> 0, !y(u), y(u) ? 0 : u, !y(g), y(g) ? 0 : g, A(b));
      } finally {
        x[j++] = void 0, x[j++] = void 0;
      }
    }
    collidersWithAabbIntersectingAabb(t, e, r, a, o, _) {
      try {
        c(t, M), c(e, E), c(r, P), c(a, l), c(o, l), i.rawbroadphase_collidersWithAabbIntersectingAabb(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, A(_));
      } finally {
        x[j++] = void 0;
      }
    }
  }
  const Oe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawccdsolver_free(s >>> 0, 1));
  class ne {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Oe.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawccdsolver_free(t, 0);
    }
    constructor() {
      const t = i.rawccdsolver_new();
      return this.__wbg_ptr = t >>> 0, Oe.register(this, this.__wbg_ptr, this), this;
    }
  }
  const Ve = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawcharactercollision_free(s >>> 0, 1));
  class gr {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ve.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawcharactercollision_free(t, 0);
    }
    constructor() {
      const t = i.rawcharactercollision_new();
      return this.__wbg_ptr = t >>> 0, Ve.register(this, this.__wbg_ptr, this), this;
    }
    handle() {
      return i.rawcharactercollision_handle(this.__wbg_ptr);
    }
    translationDeltaApplied() {
      const t = i.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr);
      return l.__wrap(t);
    }
    translationDeltaRemaining() {
      const t = i.rawcharactercollision_translationDeltaRemaining(this.__wbg_ptr);
      return l.__wrap(t);
    }
    toi() {
      return i.rawcharactercollision_toi(this.__wbg_ptr);
    }
    worldWitness1() {
      const t = i.rawcharactercollision_worldWitness1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    worldWitness2() {
      const t = i.rawcharactercollision_worldWitness2(this.__wbg_ptr);
      return l.__wrap(t);
    }
    worldNormal1() {
      const t = i.rawcharactercollision_worldNormal1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    worldNormal2() {
      const t = i.rawcharactercollision_worldNormal2(this.__wbg_ptr);
      return l.__wrap(t);
    }
  }
  const Kt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawcolliderset_free(s >>> 0, 1));
  class P {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(P.prototype);
      return e.__wbg_ptr = t, Kt.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Kt.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawcolliderset_free(t, 0);
    }
    coTranslation(t) {
      const e = i.rawcolliderset_coTranslation(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    coRotation(t) {
      const e = i.rawcolliderset_coRotation(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    coTranslationWrtParent(t) {
      const e = i.rawcolliderset_coTranslationWrtParent(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    coRotationWrtParent(t) {
      const e = i.rawcolliderset_coRotationWrtParent(this.__wbg_ptr, t);
      return e === 0 ? void 0 : S.__wrap(e);
    }
    coSetTranslation(t, e, r, a) {
      i.rawcolliderset_coSetTranslation(this.__wbg_ptr, t, e, r, a);
    }
    coSetTranslationWrtParent(t, e, r, a) {
      i.rawcolliderset_coSetTranslationWrtParent(this.__wbg_ptr, t, e, r, a);
    }
    coSetRotation(t, e, r, a, o) {
      i.rawcolliderset_coSetRotation(this.__wbg_ptr, t, e, r, a, o);
    }
    coSetRotationWrtParent(t, e, r, a, o) {
      i.rawcolliderset_coSetRotationWrtParent(this.__wbg_ptr, t, e, r, a, o);
    }
    coIsSensor(t) {
      return i.rawcolliderset_coIsSensor(this.__wbg_ptr, t) !== 0;
    }
    coShapeType(t) {
      return i.rawcolliderset_coShapeType(this.__wbg_ptr, t);
    }
    coHalfspaceNormal(t) {
      const e = i.rawcolliderset_coHalfspaceNormal(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    coHalfExtents(t) {
      const e = i.rawcolliderset_coHalfExtents(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    coSetHalfExtents(t, e) {
      c(e, l), i.rawcolliderset_coSetHalfExtents(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    coRadius(t) {
      const e = i.rawcolliderset_coRadius(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coSetRadius(t, e) {
      i.rawcolliderset_coSetRadius(this.__wbg_ptr, t, e);
    }
    coHalfHeight(t) {
      const e = i.rawcolliderset_coHalfHeight(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coSetHalfHeight(t, e) {
      i.rawcolliderset_coSetHalfHeight(this.__wbg_ptr, t, e);
    }
    coRoundRadius(t) {
      const e = i.rawcolliderset_coRoundRadius(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coSetRoundRadius(t, e) {
      i.rawcolliderset_coSetRoundRadius(this.__wbg_ptr, t, e);
    }
    coVoxelData(t) {
      try {
        const a = i.__wbindgen_add_to_stack_pointer(-16);
        i.rawcolliderset_coVoxelData(a, this.__wbg_ptr, t);
        var e = T().getInt32(a + 0, true), r = T().getInt32(a + 4, true);
        let o;
        return e !== 0 && (o = ai(e, r).slice(), i.__wbindgen_export_1(e, r * 4, 4)), o;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
    coVoxelSize(t) {
      const e = i.rawcolliderset_coVoxelSize(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    coSetVoxel(t, e, r, a, o) {
      i.rawcolliderset_coSetVoxel(this.__wbg_ptr, t, e, r, a, o);
    }
    coPropagateVoxelChange(t, e, r, a, o, _, d, h) {
      i.rawcolliderset_coPropagateVoxelChange(this.__wbg_ptr, t, e, r, a, o, _, d, h);
    }
    coCombineVoxelStates(t, e, r, a, o) {
      i.rawcolliderset_coCombineVoxelStates(this.__wbg_ptr, t, e, r, a, o);
    }
    coVertices(t) {
      try {
        const a = i.__wbindgen_add_to_stack_pointer(-16);
        i.rawcolliderset_coVertices(a, this.__wbg_ptr, t);
        var e = T().getInt32(a + 0, true), r = T().getInt32(a + 4, true);
        let o;
        return e !== 0 && (o = Be(e, r).slice(), i.__wbindgen_export_1(e, r * 4, 4)), o;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
    coIndices(t) {
      try {
        const a = i.__wbindgen_add_to_stack_pointer(-16);
        i.rawcolliderset_coIndices(a, this.__wbg_ptr, t);
        var e = T().getInt32(a + 0, true), r = T().getInt32(a + 4, true);
        let o;
        return e !== 0 && (o = si(e, r).slice(), i.__wbindgen_export_1(e, r * 4, 4)), o;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
    coTriMeshFlags(t) {
      const e = i.rawcolliderset_coTriMeshFlags(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coHeightFieldFlags(t) {
      const e = i.rawcolliderset_coHeightFieldFlags(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coHeightfieldHeights(t) {
      try {
        const a = i.__wbindgen_add_to_stack_pointer(-16);
        i.rawcolliderset_coHeightfieldHeights(a, this.__wbg_ptr, t);
        var e = T().getInt32(a + 0, true), r = T().getInt32(a + 4, true);
        let o;
        return e !== 0 && (o = Be(e, r).slice(), i.__wbindgen_export_1(e, r * 4, 4)), o;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
    coHeightfieldScale(t) {
      const e = i.rawcolliderset_coHeightfieldScale(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    coHeightfieldNRows(t) {
      const e = i.rawcolliderset_coHeightfieldNRows(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coHeightfieldNCols(t) {
      const e = i.rawcolliderset_coHeightfieldNCols(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    coParent(t) {
      try {
        const a = i.__wbindgen_add_to_stack_pointer(-16);
        i.rawcolliderset_coParent(a, this.__wbg_ptr, t);
        var e = T().getInt32(a + 0, true), r = T().getFloat64(a + 8, true);
        return e === 0 ? void 0 : r;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
    coSetEnabled(t, e) {
      i.rawcolliderset_coSetEnabled(this.__wbg_ptr, t, e);
    }
    coIsEnabled(t) {
      return i.rawcolliderset_coIsEnabled(this.__wbg_ptr, t) !== 0;
    }
    coSetContactSkin(t, e) {
      i.rawcolliderset_coSetContactSkin(this.__wbg_ptr, t, e);
    }
    coContactSkin(t) {
      return i.rawcolliderset_coContactSkin(this.__wbg_ptr, t);
    }
    coFriction(t) {
      return i.rawcolliderset_coFriction(this.__wbg_ptr, t);
    }
    coRestitution(t) {
      return i.rawcolliderset_coRestitution(this.__wbg_ptr, t);
    }
    coDensity(t) {
      return i.rawcolliderset_coDensity(this.__wbg_ptr, t);
    }
    coMass(t) {
      return i.rawcolliderset_coMass(this.__wbg_ptr, t);
    }
    coVolume(t) {
      return i.rawcolliderset_coVolume(this.__wbg_ptr, t);
    }
    coCollisionGroups(t) {
      return i.rawcolliderset_coCollisionGroups(this.__wbg_ptr, t) >>> 0;
    }
    coSolverGroups(t) {
      return i.rawcolliderset_coSolverGroups(this.__wbg_ptr, t) >>> 0;
    }
    coActiveHooks(t) {
      return i.rawcolliderset_coActiveHooks(this.__wbg_ptr, t) >>> 0;
    }
    coActiveCollisionTypes(t) {
      return i.rawcolliderset_coActiveCollisionTypes(this.__wbg_ptr, t);
    }
    coActiveEvents(t) {
      return i.rawcolliderset_coActiveEvents(this.__wbg_ptr, t) >>> 0;
    }
    coContactForceEventThreshold(t) {
      return i.rawcolliderset_coContactForceEventThreshold(this.__wbg_ptr, t);
    }
    coContainsPoint(t, e) {
      return c(e, l), i.rawcolliderset_coContainsPoint(this.__wbg_ptr, t, e.__wbg_ptr) !== 0;
    }
    coCastShape(t, e, r, a, o, _, d, h, p) {
      c(e, l), c(r, f), c(a, l), c(o, S), c(_, l);
      const u = i.rawcolliderset_coCastShape(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d, h, p);
      return u === 0 ? void 0 : Dt.__wrap(u);
    }
    coCastCollider(t, e, r, a, o, _, d) {
      c(e, l), c(a, l);
      const h = i.rawcolliderset_coCastCollider(this.__wbg_ptr, t, e.__wbg_ptr, r, a.__wbg_ptr, o, _, d);
      return h === 0 ? void 0 : Tt.__wrap(h);
    }
    coIntersectsShape(t, e, r, a) {
      return c(e, f), c(r, l), c(a, S), i.rawcolliderset_coIntersectsShape(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr) !== 0;
    }
    coContactShape(t, e, r, a, o) {
      c(e, f), c(r, l), c(a, S);
      const _ = i.rawcolliderset_coContactShape(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o);
      return _ === 0 ? void 0 : dt.__wrap(_);
    }
    coContactCollider(t, e, r) {
      const a = i.rawcolliderset_coContactCollider(this.__wbg_ptr, t, e, r);
      return a === 0 ? void 0 : dt.__wrap(a);
    }
    coProjectPoint(t, e, r) {
      c(e, l);
      const a = i.rawcolliderset_coProjectPoint(this.__wbg_ptr, t, e.__wbg_ptr, r);
      return Mt.__wrap(a);
    }
    coIntersectsRay(t, e, r, a) {
      return c(e, l), c(r, l), i.rawcolliderset_coIntersectsRay(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a) !== 0;
    }
    coCastRay(t, e, r, a, o) {
      return c(e, l), c(r, l), i.rawcolliderset_coCastRay(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a, o);
    }
    coCastRayAndGetNormal(t, e, r, a, o) {
      c(e, l), c(r, l);
      const _ = i.rawcolliderset_coCastRayAndGetNormal(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a, o);
      return _ === 0 ? void 0 : Ht.__wrap(_);
    }
    coSetSensor(t, e) {
      i.rawcolliderset_coSetSensor(this.__wbg_ptr, t, e);
    }
    coSetRestitution(t, e) {
      i.rawcolliderset_coSetRestitution(this.__wbg_ptr, t, e);
    }
    coSetFriction(t, e) {
      i.rawcolliderset_coSetFriction(this.__wbg_ptr, t, e);
    }
    coFrictionCombineRule(t) {
      return i.rawcolliderset_coFrictionCombineRule(this.__wbg_ptr, t) >>> 0;
    }
    coSetFrictionCombineRule(t, e) {
      i.rawcolliderset_coSetFrictionCombineRule(this.__wbg_ptr, t, e);
    }
    coRestitutionCombineRule(t) {
      return i.rawcolliderset_coRestitutionCombineRule(this.__wbg_ptr, t) >>> 0;
    }
    coSetRestitutionCombineRule(t, e) {
      i.rawcolliderset_coSetRestitutionCombineRule(this.__wbg_ptr, t, e);
    }
    coSetCollisionGroups(t, e) {
      i.rawcolliderset_coSetCollisionGroups(this.__wbg_ptr, t, e);
    }
    coSetSolverGroups(t, e) {
      i.rawcolliderset_coSetSolverGroups(this.__wbg_ptr, t, e);
    }
    coSetActiveHooks(t, e) {
      i.rawcolliderset_coSetActiveHooks(this.__wbg_ptr, t, e);
    }
    coSetActiveEvents(t, e) {
      i.rawcolliderset_coSetActiveEvents(this.__wbg_ptr, t, e);
    }
    coSetActiveCollisionTypes(t, e) {
      i.rawcolliderset_coSetActiveCollisionTypes(this.__wbg_ptr, t, e);
    }
    coSetShape(t, e) {
      c(e, f), i.rawcolliderset_coSetShape(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    coSetContactForceEventThreshold(t, e) {
      i.rawcolliderset_coSetContactForceEventThreshold(this.__wbg_ptr, t, e);
    }
    coSetDensity(t, e) {
      i.rawcolliderset_coSetDensity(this.__wbg_ptr, t, e);
    }
    coSetMass(t, e) {
      i.rawcolliderset_coSetMass(this.__wbg_ptr, t, e);
    }
    coSetMassProperties(t, e, r, a, o) {
      c(r, l), c(a, l), c(o, S), i.rawcolliderset_coSetMassProperties(this.__wbg_ptr, t, e, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr);
    }
    constructor() {
      const t = i.rawcolliderset_new();
      return this.__wbg_ptr = t >>> 0, Kt.register(this, this.__wbg_ptr, this), this;
    }
    len() {
      return i.rawcolliderset_len(this.__wbg_ptr) >>> 0;
    }
    contains(t) {
      return i.rawcolliderset_contains(this.__wbg_ptr, t) !== 0;
    }
    createCollider(t, e, r, a, o, _, d, h, p, u, g, b, m, C, H, G, B, O, Q, _t, Wt, Bt, Ot, Vt, ft) {
      try {
        const Xt = i.__wbindgen_add_to_stack_pointer(-16);
        c(e, f), c(r, l), c(a, S), c(d, l), c(h, l), c(p, S), c(ft, E), i.rawcolliderset_createCollider(Xt, this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o, _, d.__wbg_ptr, h.__wbg_ptr, p.__wbg_ptr, u, g, b, m, C, H, G, B, O, Q, _t, Wt, Bt, Ot, Vt, ft.__wbg_ptr);
        var Ut = T().getInt32(Xt + 0, true), Ge = T().getFloat64(Xt + 8, true);
        return Ut === 0 ? void 0 : Ge;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
    remove(t, e, r, a) {
      c(e, Z), c(r, E), i.rawcolliderset_remove(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a);
    }
    isHandleValid(t) {
      return i.rawcolliderset_contains(this.__wbg_ptr, t) !== 0;
    }
    forEachColliderHandle(t) {
      try {
        i.rawcolliderset_forEachColliderHandle(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
  }
  const Ue = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawcollidershapecasthit_free(s >>> 0, 1));
  class Tt {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Tt.prototype);
      return e.__wbg_ptr = t, Ue.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ue.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawcollidershapecasthit_free(t, 0);
    }
    colliderHandle() {
      return i.rawcharactercollision_handle(this.__wbg_ptr);
    }
    time_of_impact() {
      return i.rawcollidershapecasthit_time_of_impact(this.__wbg_ptr);
    }
    witness1() {
      const t = i.rawcollidershapecasthit_witness1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    witness2() {
      const t = i.rawcollidershapecasthit_witness2(this.__wbg_ptr);
      return l.__wrap(t);
    }
    normal1() {
      const t = i.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr);
      return l.__wrap(t);
    }
    normal2() {
      const t = i.rawcharactercollision_translationDeltaRemaining(this.__wbg_ptr);
      return l.__wrap(t);
    }
  }
  const Xe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawcontactforceevent_free(s >>> 0, 1));
  class me {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(me.prototype);
      return e.__wbg_ptr = t, Xe.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xe.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawcontactforceevent_free(t, 0);
    }
    collider1() {
      return i.rawcharactercollision_handle(this.__wbg_ptr);
    }
    collider2() {
      return i.rawcontactforceevent_collider2(this.__wbg_ptr);
    }
    total_force() {
      const t = i.rawcontactforceevent_total_force(this.__wbg_ptr);
      return l.__wrap(t);
    }
    total_force_magnitude() {
      return i.rawcontactforceevent_total_force_magnitude(this.__wbg_ptr);
    }
    max_force_direction() {
      const t = i.rawcontactforceevent_max_force_direction(this.__wbg_ptr);
      return l.__wrap(t);
    }
    max_force_magnitude() {
      return i.rawcontactforceevent_max_force_magnitude(this.__wbg_ptr);
    }
  }
  const Je = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawcontactmanifold_free(s >>> 0, 1));
  class fe {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(fe.prototype);
      return e.__wbg_ptr = t, Je.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Je.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawcontactmanifold_free(t, 0);
    }
    normal() {
      const t = i.rawcontactmanifold_normal(this.__wbg_ptr);
      return l.__wrap(t);
    }
    local_n1() {
      const t = i.rawcontactmanifold_local_n1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    local_n2() {
      const t = i.rawcontactmanifold_local_n2(this.__wbg_ptr);
      return l.__wrap(t);
    }
    subshape1() {
      return i.rawcontactmanifold_subshape1(this.__wbg_ptr) >>> 0;
    }
    subshape2() {
      return i.rawcontactmanifold_subshape2(this.__wbg_ptr) >>> 0;
    }
    num_contacts() {
      return i.rawcontactmanifold_num_contacts(this.__wbg_ptr) >>> 0;
    }
    contact_local_p1(t) {
      const e = i.rawcontactmanifold_contact_local_p1(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    contact_local_p2(t) {
      const e = i.rawcontactmanifold_contact_local_p2(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    contact_dist(t) {
      return i.rawcontactmanifold_contact_dist(this.__wbg_ptr, t);
    }
    contact_fid1(t) {
      return i.rawcontactmanifold_contact_fid1(this.__wbg_ptr, t) >>> 0;
    }
    contact_fid2(t) {
      return i.rawcontactmanifold_contact_fid2(this.__wbg_ptr, t) >>> 0;
    }
    contact_impulse(t) {
      return i.rawcontactmanifold_contact_impulse(this.__wbg_ptr, t);
    }
    contact_tangent_impulse_x(t) {
      return i.rawcontactmanifold_contact_tangent_impulse_x(this.__wbg_ptr, t);
    }
    contact_tangent_impulse_y(t) {
      return i.rawcontactmanifold_contact_tangent_impulse_y(this.__wbg_ptr, t);
    }
    num_solver_contacts() {
      return i.rawcontactmanifold_num_solver_contacts(this.__wbg_ptr) >>> 0;
    }
    solver_contact_point(t) {
      const e = i.rawcontactmanifold_solver_contact_point(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    solver_contact_dist(t) {
      return i.rawcontactmanifold_solver_contact_dist(this.__wbg_ptr, t);
    }
    solver_contact_friction(t) {
      return i.rawcontactmanifold_solver_contact_friction(this.__wbg_ptr, t);
    }
    solver_contact_restitution(t) {
      return i.rawcontactmanifold_solver_contact_restitution(this.__wbg_ptr, t);
    }
    solver_contact_tangent_velocity(t) {
      const e = i.rawcontactmanifold_solver_contact_tangent_velocity(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
  }
  const qe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawcontactpair_free(s >>> 0, 1));
  class ye {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ye.prototype);
      return e.__wbg_ptr = t, qe.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qe.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawcontactpair_free(t, 0);
    }
    collider1() {
      return i.rawcontactpair_collider1(this.__wbg_ptr);
    }
    collider2() {
      return i.rawcontactpair_collider2(this.__wbg_ptr);
    }
    numContactManifolds() {
      return i.rawcontactpair_numContactManifolds(this.__wbg_ptr) >>> 0;
    }
    contactManifold(t) {
      const e = i.rawcontactpair_contactManifold(this.__wbg_ptr, t);
      return e === 0 ? void 0 : fe.__wrap(e);
    }
  }
  const Ke = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawdebugrenderpipeline_free(s >>> 0, 1));
  class oi {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ke.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawdebugrenderpipeline_free(t, 0);
    }
    constructor() {
      const t = i.rawdebugrenderpipeline_new();
      return this.__wbg_ptr = t >>> 0, Ke.register(this, this.__wbg_ptr, this), this;
    }
    vertices() {
      const t = i.rawdebugrenderpipeline_vertices(this.__wbg_ptr);
      return wt(t);
    }
    colors() {
      const t = i.rawdebugrenderpipeline_colors(this.__wbg_ptr);
      return wt(t);
    }
    render(t, e, r, a, o, _, d) {
      try {
        c(t, E), c(e, P), c(r, Y), c(a, $), c(o, M), i.rawdebugrenderpipeline_render(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _, A(d));
      } finally {
        x[j++] = void 0;
      }
    }
  }
  const Ye = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawdeserializedworld_free(s >>> 0, 1));
  class ve {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ve.prototype);
      return e.__wbg_ptr = t, Ye.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ye.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawdeserializedworld_free(t, 0);
    }
    takeGravity() {
      const t = i.rawdeserializedworld_takeGravity(this.__wbg_ptr);
      return t === 0 ? void 0 : l.__wrap(t);
    }
    takeIntegrationParameters() {
      const t = i.rawdeserializedworld_takeIntegrationParameters(this.__wbg_ptr);
      return t === 0 ? void 0 : it.__wrap(t);
    }
    takeIslandManager() {
      const t = i.rawdeserializedworld_takeIslandManager(this.__wbg_ptr);
      return t === 0 ? void 0 : Z.__wrap(t);
    }
    takeBroadPhase() {
      const t = i.rawdeserializedworld_takeBroadPhase(this.__wbg_ptr);
      return t === 0 ? void 0 : K.__wrap(t);
    }
    takeNarrowPhase() {
      const t = i.rawdeserializedworld_takeNarrowPhase(this.__wbg_ptr);
      return t === 0 ? void 0 : M.__wrap(t);
    }
    takeBodies() {
      const t = i.rawdeserializedworld_takeBodies(this.__wbg_ptr);
      return t === 0 ? void 0 : E.__wrap(t);
    }
    takeColliders() {
      const t = i.rawdeserializedworld_takeColliders(this.__wbg_ptr);
      return t === 0 ? void 0 : P.__wrap(t);
    }
    takeImpulseJoints() {
      const t = i.rawdeserializedworld_takeImpulseJoints(this.__wbg_ptr);
      return t === 0 ? void 0 : Y.__wrap(t);
    }
    takeMultibodyJoints() {
      const t = i.rawdeserializedworld_takeMultibodyJoints(this.__wbg_ptr);
      return t === 0 ? void 0 : $.__wrap(t);
    }
  }
  const Ze = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawdynamicraycastvehiclecontroller_free(s >>> 0, 1));
  class _i {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ze.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawdynamicraycastvehiclecontroller_free(t, 0);
    }
    constructor(t) {
      const e = i.rawdynamicraycastvehiclecontroller_new(t);
      return this.__wbg_ptr = e >>> 0, Ze.register(this, this.__wbg_ptr, this), this;
    }
    current_vehicle_speed() {
      return i.rawdynamicraycastvehiclecontroller_current_vehicle_speed(this.__wbg_ptr);
    }
    chassis() {
      return i.rawdynamicraycastvehiclecontroller_chassis(this.__wbg_ptr);
    }
    index_up_axis() {
      return i.rawdynamicraycastvehiclecontroller_index_up_axis(this.__wbg_ptr) >>> 0;
    }
    set_index_up_axis(t) {
      i.rawdynamicraycastvehiclecontroller_set_index_up_axis(this.__wbg_ptr, t);
    }
    index_forward_axis() {
      return i.rawdynamicraycastvehiclecontroller_index_forward_axis(this.__wbg_ptr) >>> 0;
    }
    set_index_forward_axis(t) {
      i.rawdynamicraycastvehiclecontroller_set_index_forward_axis(this.__wbg_ptr, t);
    }
    add_wheel(t, e, r, a, o) {
      c(t, l), c(e, l), c(r, l), i.rawdynamicraycastvehiclecontroller_add_wheel(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a, o);
    }
    num_wheels() {
      return i.rawdynamicraycastvehiclecontroller_num_wheels(this.__wbg_ptr) >>> 0;
    }
    update_vehicle(t, e, r, a, o, _, d, h) {
      try {
        c(e, K), c(r, M), c(a, E), c(o, P), i.rawdynamicraycastvehiclecontroller_update_vehicle(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _, y(d) ? 4294967297 : d >>> 0, A(h));
      } finally {
        x[j++] = void 0;
      }
    }
    wheel_chassis_connection_point_cs(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    set_wheel_chassis_connection_point_cs(t, e) {
      c(e, l), i.rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    wheel_suspension_rest_length(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_suspension_rest_length(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length(this.__wbg_ptr, t, e);
    }
    wheel_max_suspension_travel(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_max_suspension_travel(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel(this.__wbg_ptr, t, e);
    }
    wheel_radius(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_radius(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_radius(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_radius(this.__wbg_ptr, t, e);
    }
    wheel_suspension_stiffness(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_suspension_stiffness(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness(this.__wbg_ptr, t, e);
    }
    wheel_suspension_compression(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_suspension_compression(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_suspension_compression(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression(this.__wbg_ptr, t, e);
    }
    wheel_suspension_relaxation(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_suspension_relaxation(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation(this.__wbg_ptr, t, e);
    }
    wheel_max_suspension_force(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_max_suspension_force(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_max_suspension_force(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force(this.__wbg_ptr, t, e);
    }
    wheel_brake(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_brake(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_brake(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_brake(this.__wbg_ptr, t, e);
    }
    wheel_steering(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_steering(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_steering(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_steering(this.__wbg_ptr, t, e);
    }
    wheel_engine_force(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_engine_force(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_engine_force(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_engine_force(this.__wbg_ptr, t, e);
    }
    wheel_direction_cs(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_direction_cs(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    set_wheel_direction_cs(t, e) {
      c(e, l), i.rawdynamicraycastvehiclecontroller_set_wheel_direction_cs(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    wheel_axle_cs(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_axle_cs(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    set_wheel_axle_cs(t, e) {
      c(e, l), i.rawdynamicraycastvehiclecontroller_set_wheel_axle_cs(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    wheel_friction_slip(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_friction_slip(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_friction_slip(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_friction_slip(this.__wbg_ptr, t, e);
    }
    wheel_side_friction_stiffness(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    set_wheel_side_friction_stiffness(t, e) {
      i.rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness(this.__wbg_ptr, t, e);
    }
    wheel_rotation(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_rotation(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    wheel_forward_impulse(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_forward_impulse(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    wheel_side_impulse(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_side_impulse(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    wheel_suspension_force(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_suspension_force(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    wheel_contact_normal_ws(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    wheel_contact_point_ws(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_contact_point_ws(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    wheel_suspension_length(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_suspension_length(this.__wbg_ptr, t);
      return e === 4294967297 ? void 0 : e;
    }
    wheel_hard_point_ws(t) {
      const e = i.rawdynamicraycastvehiclecontroller_wheel_hard_point_ws(this.__wbg_ptr, t);
      return e === 0 ? void 0 : l.__wrap(e);
    }
    wheel_is_in_contact(t) {
      return i.rawdynamicraycastvehiclecontroller_wheel_is_in_contact(this.__wbg_ptr, t) !== 0;
    }
    wheel_ground_object(t) {
      try {
        const a = i.__wbindgen_add_to_stack_pointer(-16);
        i.rawdynamicraycastvehiclecontroller_wheel_ground_object(a, this.__wbg_ptr, t);
        var e = T().getInt32(a + 0, true), r = T().getFloat64(a + 8, true);
        return e === 0 ? void 0 : r;
      } finally {
        i.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const $e = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_raweventqueue_free(s >>> 0, 1));
  class br {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $e.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_raweventqueue_free(t, 0);
    }
    constructor(t) {
      const e = i.raweventqueue_new(t);
      return this.__wbg_ptr = e >>> 0, $e.register(this, this.__wbg_ptr, this), this;
    }
    drainCollisionEvents(t) {
      try {
        i.raweventqueue_drainCollisionEvents(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
    drainContactForceEvents(t) {
      try {
        i.raweventqueue_drainContactForceEvents(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
    clear() {
      i.raweventqueue_clear(this.__wbg_ptr);
    }
  }
  const Qe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawgenericjoint_free(s >>> 0, 1));
  class L {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(L.prototype);
      return e.__wbg_ptr = t, Qe.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qe.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawgenericjoint_free(t, 0);
    }
    static generic(t, e, r, a) {
      c(t, l), c(e, l), c(r, l);
      const o = i.rawgenericjoint_generic(t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a);
      return o === 0 ? void 0 : L.__wrap(o);
    }
    static spring(t, e, r, a, o) {
      c(a, l), c(o, l);
      const _ = i.rawgenericjoint_spring(t, e, r, a.__wbg_ptr, o.__wbg_ptr);
      return L.__wrap(_);
    }
    static rope(t, e, r) {
      c(e, l), c(r, l);
      const a = i.rawgenericjoint_rope(t, e.__wbg_ptr, r.__wbg_ptr);
      return L.__wrap(a);
    }
    static spherical(t, e) {
      c(t, l), c(e, l);
      const r = i.rawgenericjoint_spherical(t.__wbg_ptr, e.__wbg_ptr);
      return L.__wrap(r);
    }
    static prismatic(t, e, r, a, o, _) {
      c(t, l), c(e, l), c(r, l);
      const d = i.rawgenericjoint_prismatic(t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a, o, _);
      return d === 0 ? void 0 : L.__wrap(d);
    }
    static fixed(t, e, r, a) {
      c(t, l), c(e, S), c(r, l), c(a, S);
      const o = i.rawgenericjoint_fixed(t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr);
      return L.__wrap(o);
    }
    static revolute(t, e, r) {
      c(t, l), c(e, l), c(r, l);
      const a = i.rawgenericjoint_revolute(t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr);
      return a === 0 ? void 0 : L.__wrap(a);
    }
  }
  const Yt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawimpulsejointset_free(s >>> 0, 1));
  class Y {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Y.prototype);
      return e.__wbg_ptr = t, Yt.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Yt.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawimpulsejointset_free(t, 0);
    }
    jointType(t) {
      return i.rawimpulsejointset_jointType(this.__wbg_ptr, t);
    }
    jointBodyHandle1(t) {
      return i.rawimpulsejointset_jointBodyHandle1(this.__wbg_ptr, t);
    }
    jointBodyHandle2(t) {
      return i.rawimpulsejointset_jointBodyHandle2(this.__wbg_ptr, t);
    }
    jointFrameX1(t) {
      const e = i.rawimpulsejointset_jointFrameX1(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    jointFrameX2(t) {
      const e = i.rawimpulsejointset_jointFrameX2(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    jointAnchor1(t) {
      const e = i.rawimpulsejointset_jointAnchor1(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    jointAnchor2(t) {
      const e = i.rawimpulsejointset_jointAnchor2(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    jointSetAnchor1(t, e) {
      c(e, l), i.rawimpulsejointset_jointSetAnchor1(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    jointSetAnchor2(t, e) {
      c(e, l), i.rawimpulsejointset_jointSetAnchor2(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    jointContactsEnabled(t) {
      return i.rawimpulsejointset_jointContactsEnabled(this.__wbg_ptr, t) !== 0;
    }
    jointSetContactsEnabled(t, e) {
      i.rawimpulsejointset_jointSetContactsEnabled(this.__wbg_ptr, t, e);
    }
    jointLimitsEnabled(t, e) {
      return i.rawimpulsejointset_jointLimitsEnabled(this.__wbg_ptr, t, e) !== 0;
    }
    jointLimitsMin(t, e) {
      return i.rawimpulsejointset_jointLimitsMin(this.__wbg_ptr, t, e);
    }
    jointLimitsMax(t, e) {
      return i.rawimpulsejointset_jointLimitsMax(this.__wbg_ptr, t, e);
    }
    jointSetLimits(t, e, r, a) {
      i.rawimpulsejointset_jointSetLimits(this.__wbg_ptr, t, e, r, a);
    }
    jointConfigureMotorModel(t, e, r) {
      i.rawimpulsejointset_jointConfigureMotorModel(this.__wbg_ptr, t, e, r);
    }
    jointConfigureMotorVelocity(t, e, r, a) {
      i.rawimpulsejointset_jointConfigureMotorVelocity(this.__wbg_ptr, t, e, r, a);
    }
    jointConfigureMotorPosition(t, e, r, a, o) {
      i.rawimpulsejointset_jointConfigureMotorPosition(this.__wbg_ptr, t, e, r, a, o);
    }
    jointConfigureMotor(t, e, r, a, o, _) {
      i.rawimpulsejointset_jointConfigureMotor(this.__wbg_ptr, t, e, r, a, o, _);
    }
    constructor() {
      const t = i.rawimpulsejointset_new();
      return this.__wbg_ptr = t >>> 0, Yt.register(this, this.__wbg_ptr, this), this;
    }
    createJoint(t, e, r, a) {
      return c(t, L), i.rawimpulsejointset_createJoint(this.__wbg_ptr, t.__wbg_ptr, e, r, a);
    }
    remove(t, e) {
      i.rawimpulsejointset_remove(this.__wbg_ptr, t, e);
    }
    len() {
      return i.rawimpulsejointset_len(this.__wbg_ptr) >>> 0;
    }
    contains(t) {
      return i.rawimpulsejointset_contains(this.__wbg_ptr, t) !== 0;
    }
    forEachJointHandle(t) {
      try {
        i.rawimpulsejointset_forEachJointHandle(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
    forEachJointAttachedToRigidBody(t, e) {
      try {
        i.rawimpulsejointset_forEachJointAttachedToRigidBody(this.__wbg_ptr, t, A(e));
      } finally {
        x[j++] = void 0;
      }
    }
  }
  const Zt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawintegrationparameters_free(s >>> 0, 1));
  class it {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(it.prototype);
      return e.__wbg_ptr = t, Zt.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Zt.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawintegrationparameters_free(t, 0);
    }
    constructor() {
      const t = i.rawintegrationparameters_new();
      return this.__wbg_ptr = t >>> 0, Zt.register(this, this.__wbg_ptr, this), this;
    }
    get dt() {
      return i.rawintegrationparameters_dt(this.__wbg_ptr);
    }
    get contact_erp() {
      return i.rawintegrationparameters_contact_erp(this.__wbg_ptr);
    }
    get normalizedAllowedLinearError() {
      return i.rawintegrationparameters_normalizedAllowedLinearError(this.__wbg_ptr);
    }
    get normalizedPredictionDistance() {
      return i.rawintegrationparameters_normalizedPredictionDistance(this.__wbg_ptr);
    }
    get numSolverIterations() {
      return i.rawintegrationparameters_numSolverIterations(this.__wbg_ptr) >>> 0;
    }
    get numInternalPgsIterations() {
      return i.rawdynamicraycastvehiclecontroller_index_up_axis(this.__wbg_ptr) >>> 0;
    }
    get minIslandSize() {
      return i.rawintegrationparameters_minIslandSize(this.__wbg_ptr) >>> 0;
    }
    get maxCcdSubsteps() {
      return i.rawintegrationparameters_maxCcdSubsteps(this.__wbg_ptr) >>> 0;
    }
    get lengthUnit() {
      return i.rawcontactforceevent_total_force_magnitude(this.__wbg_ptr);
    }
    set dt(t) {
      i.rawintegrationparameters_set_dt(this.__wbg_ptr, t);
    }
    set contact_natural_frequency(t) {
      i.rawintegrationparameters_set_contact_natural_frequency(this.__wbg_ptr, t);
    }
    set normalizedAllowedLinearError(t) {
      i.rawintegrationparameters_set_normalizedAllowedLinearError(this.__wbg_ptr, t);
    }
    set normalizedPredictionDistance(t) {
      i.rawintegrationparameters_set_normalizedPredictionDistance(this.__wbg_ptr, t);
    }
    set numSolverIterations(t) {
      i.rawintegrationparameters_set_numSolverIterations(this.__wbg_ptr, t);
    }
    set numInternalPgsIterations(t) {
      i.rawdynamicraycastvehiclecontroller_set_index_up_axis(this.__wbg_ptr, t);
    }
    set minIslandSize(t) {
      i.rawintegrationparameters_set_minIslandSize(this.__wbg_ptr, t);
    }
    set maxCcdSubsteps(t) {
      i.rawintegrationparameters_set_maxCcdSubsteps(this.__wbg_ptr, t);
    }
    set lengthUnit(t) {
      i.rawintegrationparameters_set_lengthUnit(this.__wbg_ptr, t);
    }
  }
  const $t = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawislandmanager_free(s >>> 0, 1));
  class Z {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Z.prototype);
      return e.__wbg_ptr = t, $t.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $t.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawislandmanager_free(t, 0);
    }
    constructor() {
      const t = i.rawislandmanager_new();
      return this.__wbg_ptr = t >>> 0, $t.register(this, this.__wbg_ptr, this), this;
    }
    forEachActiveRigidBodyHandle(t) {
      try {
        i.rawislandmanager_forEachActiveRigidBodyHandle(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
  }
  const tr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawkinematiccharactercontroller_free(s >>> 0, 1));
  class ci {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, tr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawkinematiccharactercontroller_free(t, 0);
    }
    constructor(t) {
      const e = i.rawkinematiccharactercontroller_new(t);
      return this.__wbg_ptr = e >>> 0, tr.register(this, this.__wbg_ptr, this), this;
    }
    up() {
      const t = i.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr);
      return l.__wrap(t);
    }
    setUp(t) {
      c(t, l), i.rawkinematiccharactercontroller_setUp(this.__wbg_ptr, t.__wbg_ptr);
    }
    normalNudgeFactor() {
      return i.rawkinematiccharactercontroller_normalNudgeFactor(this.__wbg_ptr);
    }
    setNormalNudgeFactor(t) {
      i.rawkinematiccharactercontroller_setNormalNudgeFactor(this.__wbg_ptr, t);
    }
    offset() {
      return i.rawkinematiccharactercontroller_offset(this.__wbg_ptr);
    }
    setOffset(t) {
      i.rawkinematiccharactercontroller_setOffset(this.__wbg_ptr, t);
    }
    slideEnabled() {
      return i.rawkinematiccharactercontroller_slideEnabled(this.__wbg_ptr) !== 0;
    }
    setSlideEnabled(t) {
      i.rawkinematiccharactercontroller_setSlideEnabled(this.__wbg_ptr, t);
    }
    autostepMaxHeight() {
      const t = i.rawkinematiccharactercontroller_autostepMaxHeight(this.__wbg_ptr);
      return t === 4294967297 ? void 0 : t;
    }
    autostepMinWidth() {
      const t = i.rawkinematiccharactercontroller_autostepMinWidth(this.__wbg_ptr);
      return t === 4294967297 ? void 0 : t;
    }
    autostepIncludesDynamicBodies() {
      const t = i.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.__wbg_ptr);
      return t === 16777215 ? void 0 : t !== 0;
    }
    autostepEnabled() {
      return i.rawkinematiccharactercontroller_autostepEnabled(this.__wbg_ptr) !== 0;
    }
    enableAutostep(t, e, r) {
      i.rawkinematiccharactercontroller_enableAutostep(this.__wbg_ptr, t, e, r);
    }
    disableAutostep() {
      i.rawkinematiccharactercontroller_disableAutostep(this.__wbg_ptr);
    }
    maxSlopeClimbAngle() {
      return i.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.__wbg_ptr);
    }
    setMaxSlopeClimbAngle(t) {
      i.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.__wbg_ptr, t);
    }
    minSlopeSlideAngle() {
      return i.rawkinematiccharactercontroller_minSlopeSlideAngle(this.__wbg_ptr);
    }
    setMinSlopeSlideAngle(t) {
      i.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.__wbg_ptr, t);
    }
    snapToGroundDistance() {
      const t = i.rawkinematiccharactercontroller_snapToGroundDistance(this.__wbg_ptr);
      return t === 4294967297 ? void 0 : t;
    }
    enableSnapToGround(t) {
      i.rawkinematiccharactercontroller_enableSnapToGround(this.__wbg_ptr, t);
    }
    disableSnapToGround() {
      i.rawkinematiccharactercontroller_disableSnapToGround(this.__wbg_ptr);
    }
    snapToGroundEnabled() {
      return i.rawkinematiccharactercontroller_snapToGroundEnabled(this.__wbg_ptr) !== 0;
    }
    computeColliderMovement(t, e, r, a, o, _, d, h, p, u, g, b) {
      try {
        c(e, K), c(r, M), c(a, E), c(o, P), c(d, l), i.rawkinematiccharactercontroller_computeColliderMovement(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _, d.__wbg_ptr, h, y(p) ? 4294967297 : Math.fround(p), u, y(g) ? 4294967297 : g >>> 0, A(b));
      } finally {
        x[j++] = void 0;
      }
    }
    computedMovement() {
      const t = i.rawkinematiccharactercontroller_computedMovement(this.__wbg_ptr);
      return l.__wrap(t);
    }
    computedGrounded() {
      return i.rawkinematiccharactercontroller_computedGrounded(this.__wbg_ptr) !== 0;
    }
    numComputedCollisions() {
      return i.rawkinematiccharactercontroller_numComputedCollisions(this.__wbg_ptr) >>> 0;
    }
    computedCollision(t, e) {
      return c(e, gr), i.rawkinematiccharactercontroller_computedCollision(this.__wbg_ptr, t, e.__wbg_ptr) !== 0;
    }
  }
  const Qt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawmultibodyjointset_free(s >>> 0, 1));
  class $ {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create($.prototype);
      return e.__wbg_ptr = t, Qt.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qt.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawmultibodyjointset_free(t, 0);
    }
    jointType(t) {
      return i.rawmultibodyjointset_jointType(this.__wbg_ptr, t);
    }
    jointFrameX1(t) {
      const e = i.rawmultibodyjointset_jointFrameX1(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    jointFrameX2(t) {
      const e = i.rawmultibodyjointset_jointFrameX2(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    jointAnchor1(t) {
      const e = i.rawmultibodyjointset_jointAnchor1(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    jointAnchor2(t) {
      const e = i.rawmultibodyjointset_jointAnchor2(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    jointContactsEnabled(t) {
      return i.rawmultibodyjointset_jointContactsEnabled(this.__wbg_ptr, t) !== 0;
    }
    jointSetContactsEnabled(t, e) {
      i.rawmultibodyjointset_jointSetContactsEnabled(this.__wbg_ptr, t, e);
    }
    jointLimitsEnabled(t, e) {
      return i.rawmultibodyjointset_jointLimitsEnabled(this.__wbg_ptr, t, e) !== 0;
    }
    jointLimitsMin(t, e) {
      return i.rawmultibodyjointset_jointLimitsMin(this.__wbg_ptr, t, e);
    }
    jointLimitsMax(t, e) {
      return i.rawmultibodyjointset_jointLimitsMax(this.__wbg_ptr, t, e);
    }
    constructor() {
      const t = i.rawmultibodyjointset_new();
      return this.__wbg_ptr = t >>> 0, Qt.register(this, this.__wbg_ptr, this), this;
    }
    createJoint(t, e, r, a) {
      return c(t, L), i.rawmultibodyjointset_createJoint(this.__wbg_ptr, t.__wbg_ptr, e, r, a);
    }
    remove(t, e) {
      i.rawmultibodyjointset_remove(this.__wbg_ptr, t, e);
    }
    contains(t) {
      return i.rawmultibodyjointset_contains(this.__wbg_ptr, t) !== 0;
    }
    forEachJointHandle(t) {
      try {
        i.rawmultibodyjointset_forEachJointHandle(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
    forEachJointAttachedToRigidBody(t, e) {
      try {
        i.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.__wbg_ptr, t, A(e));
      } finally {
        x[j++] = void 0;
      }
    }
  }
  const te = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawnarrowphase_free(s >>> 0, 1));
  class M {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(M.prototype);
      return e.__wbg_ptr = t, te.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, te.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawnarrowphase_free(t, 0);
    }
    constructor() {
      const t = i.rawnarrowphase_new();
      return this.__wbg_ptr = t >>> 0, te.register(this, this.__wbg_ptr, this), this;
    }
    contact_pairs_with(t, e) {
      i.rawnarrowphase_contact_pairs_with(this.__wbg_ptr, t, I(e));
    }
    contact_pair(t, e) {
      const r = i.rawnarrowphase_contact_pair(this.__wbg_ptr, t, e);
      return r === 0 ? void 0 : ye.__wrap(r);
    }
    intersection_pairs_with(t, e) {
      i.rawnarrowphase_intersection_pairs_with(this.__wbg_ptr, t, I(e));
    }
    intersection_pair(t, e) {
      return i.rawnarrowphase_intersection_pair(this.__wbg_ptr, t, e) !== 0;
    }
  }
  const er = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawphysicspipeline_free(s >>> 0, 1));
  class li {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, er.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawphysicspipeline_free(t, 0);
    }
    constructor() {
      const t = i.rawphysicspipeline_new();
      return this.__wbg_ptr = t >>> 0, er.register(this, this.__wbg_ptr, this), this;
    }
    set_profiler_enabled(t) {
      i.rawphysicspipeline_set_profiler_enabled(this.__wbg_ptr, t);
    }
    is_profiler_enabled() {
      return i.rawphysicspipeline_is_profiler_enabled(this.__wbg_ptr) !== 0;
    }
    timing_step() {
      return i.rawphysicspipeline_timing_step(this.__wbg_ptr);
    }
    timing_collision_detection() {
      return i.rawphysicspipeline_timing_collision_detection(this.__wbg_ptr);
    }
    timing_broad_phase() {
      return i.rawphysicspipeline_timing_broad_phase(this.__wbg_ptr);
    }
    timing_narrow_phase() {
      return i.rawphysicspipeline_timing_narrow_phase(this.__wbg_ptr);
    }
    timing_solver() {
      return i.rawphysicspipeline_timing_solver(this.__wbg_ptr);
    }
    timing_velocity_assembly() {
      return i.rawphysicspipeline_timing_velocity_assembly(this.__wbg_ptr);
    }
    timing_velocity_resolution() {
      return i.rawphysicspipeline_timing_velocity_resolution(this.__wbg_ptr);
    }
    timing_velocity_update() {
      return i.rawphysicspipeline_timing_velocity_update(this.__wbg_ptr);
    }
    timing_velocity_writeback() {
      return i.rawphysicspipeline_timing_velocity_writeback(this.__wbg_ptr);
    }
    timing_ccd() {
      return i.rawphysicspipeline_timing_ccd(this.__wbg_ptr);
    }
    timing_ccd_toi_computation() {
      return i.rawphysicspipeline_timing_ccd_toi_computation(this.__wbg_ptr);
    }
    timing_ccd_broad_phase() {
      return i.rawphysicspipeline_timing_ccd_broad_phase(this.__wbg_ptr);
    }
    timing_ccd_narrow_phase() {
      return i.rawphysicspipeline_timing_ccd_narrow_phase(this.__wbg_ptr);
    }
    timing_ccd_solver() {
      return i.rawphysicspipeline_timing_ccd_solver(this.__wbg_ptr);
    }
    timing_island_construction() {
      return i.rawphysicspipeline_timing_island_construction(this.__wbg_ptr);
    }
    timing_user_changes() {
      return i.rawphysicspipeline_timing_user_changes(this.__wbg_ptr);
    }
    step(t, e, r, a, o, _, d, h, p, u) {
      c(t, l), c(e, it), c(r, Z), c(a, K), c(o, M), c(_, E), c(d, P), c(h, Y), c(p, $), c(u, ne), i.rawphysicspipeline_step(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d.__wbg_ptr, h.__wbg_ptr, p.__wbg_ptr, u.__wbg_ptr);
    }
    stepWithEvents(t, e, r, a, o, _, d, h, p, u, g, b, m, C) {
      c(t, l), c(e, it), c(r, Z), c(a, K), c(o, M), c(_, E), c(d, P), c(h, Y), c(p, $), c(u, ne), c(g, br), i.rawphysicspipeline_stepWithEvents(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d.__wbg_ptr, h.__wbg_ptr, p.__wbg_ptr, u.__wbg_ptr, g.__wbg_ptr, I(b), I(m), I(C));
    }
  }
  const rr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawpidcontroller_free(s >>> 0, 1));
  class wi {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, rr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawpidcontroller_free(t, 0);
    }
    constructor(t, e, r, a) {
      const o = i.rawpidcontroller_new(t, e, r, a);
      return this.__wbg_ptr = o >>> 0, rr.register(this, this.__wbg_ptr, this), this;
    }
    set_kp(t, e) {
      i.rawpidcontroller_set_kp(this.__wbg_ptr, t, e);
    }
    set_ki(t, e) {
      i.rawpidcontroller_set_ki(this.__wbg_ptr, t, e);
    }
    set_kd(t, e) {
      i.rawpidcontroller_set_kd(this.__wbg_ptr, t, e);
    }
    set_axes_mask(t) {
      i.rawpidcontroller_set_axes_mask(this.__wbg_ptr, t);
    }
    reset_integrals() {
      i.rawpidcontroller_reset_integrals(this.__wbg_ptr);
    }
    apply_linear_correction(t, e, r, a, o) {
      c(e, E), c(a, l), c(o, l), i.rawpidcontroller_apply_linear_correction(this.__wbg_ptr, t, e.__wbg_ptr, r, a.__wbg_ptr, o.__wbg_ptr);
    }
    apply_angular_correction(t, e, r, a, o) {
      c(e, E), c(a, S), c(o, l), i.rawpidcontroller_apply_angular_correction(this.__wbg_ptr, t, e.__wbg_ptr, r, a.__wbg_ptr, o.__wbg_ptr);
    }
    linear_correction(t, e, r, a, o) {
      c(e, E), c(a, l), c(o, l);
      const _ = i.rawpidcontroller_linear_correction(this.__wbg_ptr, t, e.__wbg_ptr, r, a.__wbg_ptr, o.__wbg_ptr);
      return l.__wrap(_);
    }
    angular_correction(t, e, r, a, o) {
      c(e, E), c(a, S), c(o, l);
      const _ = i.rawpidcontroller_angular_correction(this.__wbg_ptr, t, e.__wbg_ptr, r, a.__wbg_ptr, o.__wbg_ptr);
      return l.__wrap(_);
    }
  }
  const ir = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawpointcolliderprojection_free(s >>> 0, 1));
  class Ct {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ct.prototype);
      return e.__wbg_ptr = t, ir.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ir.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawpointcolliderprojection_free(t, 0);
    }
    colliderHandle() {
      return i.rawpointcolliderprojection_colliderHandle(this.__wbg_ptr);
    }
    point() {
      const t = i.rawpointcolliderprojection_point(this.__wbg_ptr);
      return l.__wrap(t);
    }
    isInside() {
      return i.rawpointcolliderprojection_isInside(this.__wbg_ptr) !== 0;
    }
    featureType() {
      return i.rawpointcolliderprojection_featureType(this.__wbg_ptr);
    }
    featureId() {
      const t = i.rawpointcolliderprojection_featureId(this.__wbg_ptr);
      return t === 4294967297 ? void 0 : t;
    }
  }
  const nr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawpointprojection_free(s >>> 0, 1));
  class Mt {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Mt.prototype);
      return e.__wbg_ptr = t, nr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, nr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawpointprojection_free(t, 0);
    }
    point() {
      const t = i.rawpointprojection_point(this.__wbg_ptr);
      return l.__wrap(t);
    }
    isInside() {
      return i.rawpointprojection_isInside(this.__wbg_ptr) !== 0;
    }
  }
  const ar = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawraycolliderhit_free(s >>> 0, 1));
  class Se {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Se.prototype);
      return e.__wbg_ptr = t, ar.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ar.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawraycolliderhit_free(t, 0);
    }
    colliderHandle() {
      return i.rawcharactercollision_handle(this.__wbg_ptr);
    }
    timeOfImpact() {
      return i.rawcollidershapecasthit_time_of_impact(this.__wbg_ptr);
    }
  }
  const sr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawraycolliderintersection_free(s >>> 0, 1));
  class kt {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(kt.prototype);
      return e.__wbg_ptr = t, sr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, sr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawraycolliderintersection_free(t, 0);
    }
    colliderHandle() {
      return i.rawpointcolliderprojection_colliderHandle(this.__wbg_ptr);
    }
    normal() {
      const t = i.rawcollidershapecasthit_witness1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    time_of_impact() {
      return i.rawcollidershapecasthit_time_of_impact(this.__wbg_ptr);
    }
    featureType() {
      return i.rawpointcolliderprojection_featureType(this.__wbg_ptr);
    }
    featureId() {
      const t = i.rawpointcolliderprojection_featureId(this.__wbg_ptr);
      return t === 4294967297 ? void 0 : t;
    }
  }
  const or = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawrayintersection_free(s >>> 0, 1));
  class Ht {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ht.prototype);
      return e.__wbg_ptr = t, or.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, or.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawrayintersection_free(t, 0);
    }
    normal() {
      const t = i.rawcollidershapecasthit_witness1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    time_of_impact() {
      return i.rawcollidershapecasthit_time_of_impact(this.__wbg_ptr);
    }
    featureType() {
      return i.rawpointcolliderprojection_featureType(this.__wbg_ptr);
    }
    featureId() {
      const t = i.rawpointcolliderprojection_featureId(this.__wbg_ptr);
      return t === 4294967297 ? void 0 : t;
    }
  }
  const ee = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawrigidbodyset_free(s >>> 0, 1));
  class E {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(E.prototype);
      return e.__wbg_ptr = t, ee.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ee.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawrigidbodyset_free(t, 0);
    }
    rbTranslation(t) {
      const e = i.rawrigidbodyset_rbTranslation(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbRotation(t) {
      const e = i.rawrigidbodyset_rbRotation(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    rbSleep(t) {
      i.rawrigidbodyset_rbSleep(this.__wbg_ptr, t);
    }
    rbIsSleeping(t) {
      return i.rawrigidbodyset_rbIsSleeping(this.__wbg_ptr, t) !== 0;
    }
    rbIsMoving(t) {
      return i.rawrigidbodyset_rbIsMoving(this.__wbg_ptr, t) !== 0;
    }
    rbNextTranslation(t) {
      const e = i.rawrigidbodyset_rbNextTranslation(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbNextRotation(t) {
      const e = i.rawrigidbodyset_rbNextRotation(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    rbSetTranslation(t, e, r, a, o) {
      i.rawrigidbodyset_rbSetTranslation(this.__wbg_ptr, t, e, r, a, o);
    }
    rbSetRotation(t, e, r, a, o, _) {
      i.rawrigidbodyset_rbSetRotation(this.__wbg_ptr, t, e, r, a, o, _);
    }
    rbSetLinvel(t, e, r) {
      c(e, l), i.rawrigidbodyset_rbSetLinvel(this.__wbg_ptr, t, e.__wbg_ptr, r);
    }
    rbSetAngvel(t, e, r) {
      c(e, l), i.rawrigidbodyset_rbSetAngvel(this.__wbg_ptr, t, e.__wbg_ptr, r);
    }
    rbSetNextKinematicTranslation(t, e, r, a) {
      i.rawrigidbodyset_rbSetNextKinematicTranslation(this.__wbg_ptr, t, e, r, a);
    }
    rbSetNextKinematicRotation(t, e, r, a, o) {
      i.rawrigidbodyset_rbSetNextKinematicRotation(this.__wbg_ptr, t, e, r, a, o);
    }
    rbRecomputeMassPropertiesFromColliders(t, e) {
      c(e, P), i.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.__wbg_ptr, t, e.__wbg_ptr);
    }
    rbSetAdditionalMass(t, e, r) {
      i.rawrigidbodyset_rbSetAdditionalMass(this.__wbg_ptr, t, e, r);
    }
    rbSetAdditionalMassProperties(t, e, r, a, o, _) {
      c(r, l), c(a, l), c(o, S), i.rawrigidbodyset_rbSetAdditionalMassProperties(this.__wbg_ptr, t, e, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _);
    }
    rbLinvel(t) {
      const e = i.rawrigidbodyset_rbLinvel(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbAngvel(t) {
      const e = i.rawrigidbodyset_rbAngvel(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbVelocityAtPoint(t, e) {
      c(e, l);
      const r = i.rawrigidbodyset_rbVelocityAtPoint(this.__wbg_ptr, t, e.__wbg_ptr);
      return l.__wrap(r);
    }
    rbLockTranslations(t, e, r) {
      i.rawrigidbodyset_rbLockTranslations(this.__wbg_ptr, t, e, r);
    }
    rbSetEnabledTranslations(t, e, r, a, o) {
      i.rawrigidbodyset_rbSetEnabledTranslations(this.__wbg_ptr, t, e, r, a, o);
    }
    rbLockRotations(t, e, r) {
      i.rawrigidbodyset_rbLockRotations(this.__wbg_ptr, t, e, r);
    }
    rbSetEnabledRotations(t, e, r, a, o) {
      i.rawrigidbodyset_rbSetEnabledRotations(this.__wbg_ptr, t, e, r, a, o);
    }
    rbDominanceGroup(t) {
      return i.rawrigidbodyset_rbDominanceGroup(this.__wbg_ptr, t);
    }
    rbSetDominanceGroup(t, e) {
      i.rawrigidbodyset_rbSetDominanceGroup(this.__wbg_ptr, t, e);
    }
    rbEnableCcd(t, e) {
      i.rawrigidbodyset_rbEnableCcd(this.__wbg_ptr, t, e);
    }
    rbSetSoftCcdPrediction(t, e) {
      i.rawrigidbodyset_rbSetSoftCcdPrediction(this.__wbg_ptr, t, e);
    }
    rbMass(t) {
      return i.rawrigidbodyset_rbMass(this.__wbg_ptr, t);
    }
    rbInvMass(t) {
      return i.rawrigidbodyset_rbInvMass(this.__wbg_ptr, t);
    }
    rbEffectiveInvMass(t) {
      const e = i.rawrigidbodyset_rbEffectiveInvMass(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbLocalCom(t) {
      const e = i.rawrigidbodyset_rbLocalCom(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbWorldCom(t) {
      const e = i.rawrigidbodyset_rbWorldCom(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbInvPrincipalInertia(t) {
      const e = i.rawrigidbodyset_rbInvPrincipalInertia(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbPrincipalInertiaLocalFrame(t) {
      const e = i.rawrigidbodyset_rbPrincipalInertiaLocalFrame(this.__wbg_ptr, t);
      return S.__wrap(e);
    }
    rbPrincipalInertia(t) {
      const e = i.rawrigidbodyset_rbPrincipalInertia(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbEffectiveWorldInvInertia(t) {
      const e = i.rawrigidbodyset_rbEffectiveWorldInvInertia(this.__wbg_ptr, t);
      return xt.__wrap(e);
    }
    rbEffectiveAngularInertia(t) {
      const e = i.rawrigidbodyset_rbEffectiveAngularInertia(this.__wbg_ptr, t);
      return xt.__wrap(e);
    }
    rbWakeUp(t) {
      i.rawrigidbodyset_rbWakeUp(this.__wbg_ptr, t);
    }
    rbIsCcdEnabled(t) {
      return i.rawrigidbodyset_rbIsCcdEnabled(this.__wbg_ptr, t) !== 0;
    }
    rbSoftCcdPrediction(t) {
      return i.rawrigidbodyset_rbSoftCcdPrediction(this.__wbg_ptr, t);
    }
    rbNumColliders(t) {
      return i.rawrigidbodyset_rbNumColliders(this.__wbg_ptr, t) >>> 0;
    }
    rbCollider(t, e) {
      return i.rawrigidbodyset_rbCollider(this.__wbg_ptr, t, e);
    }
    rbBodyType(t) {
      return i.rawrigidbodyset_rbBodyType(this.__wbg_ptr, t);
    }
    rbSetBodyType(t, e, r) {
      i.rawrigidbodyset_rbSetBodyType(this.__wbg_ptr, t, e, r);
    }
    rbIsFixed(t) {
      return i.rawrigidbodyset_rbIsFixed(this.__wbg_ptr, t) !== 0;
    }
    rbIsKinematic(t) {
      return i.rawrigidbodyset_rbIsKinematic(this.__wbg_ptr, t) !== 0;
    }
    rbIsDynamic(t) {
      return i.rawrigidbodyset_rbIsDynamic(this.__wbg_ptr, t) !== 0;
    }
    rbLinearDamping(t) {
      return i.rawrigidbodyset_rbLinearDamping(this.__wbg_ptr, t);
    }
    rbAngularDamping(t) {
      return i.rawrigidbodyset_rbAngularDamping(this.__wbg_ptr, t);
    }
    rbSetLinearDamping(t, e) {
      i.rawrigidbodyset_rbSetLinearDamping(this.__wbg_ptr, t, e);
    }
    rbSetAngularDamping(t, e) {
      i.rawrigidbodyset_rbSetAngularDamping(this.__wbg_ptr, t, e);
    }
    rbSetEnabled(t, e) {
      i.rawrigidbodyset_rbSetEnabled(this.__wbg_ptr, t, e);
    }
    rbIsEnabled(t) {
      return i.rawrigidbodyset_rbIsEnabled(this.__wbg_ptr, t) !== 0;
    }
    rbGravityScale(t) {
      return i.rawrigidbodyset_rbGravityScale(this.__wbg_ptr, t);
    }
    rbSetGravityScale(t, e, r) {
      i.rawrigidbodyset_rbSetGravityScale(this.__wbg_ptr, t, e, r);
    }
    rbResetForces(t, e) {
      i.rawrigidbodyset_rbResetForces(this.__wbg_ptr, t, e);
    }
    rbResetTorques(t, e) {
      i.rawrigidbodyset_rbResetTorques(this.__wbg_ptr, t, e);
    }
    rbAddForce(t, e, r) {
      c(e, l), i.rawrigidbodyset_rbAddForce(this.__wbg_ptr, t, e.__wbg_ptr, r);
    }
    rbApplyImpulse(t, e, r) {
      c(e, l), i.rawrigidbodyset_rbApplyImpulse(this.__wbg_ptr, t, e.__wbg_ptr, r);
    }
    rbAddTorque(t, e, r) {
      c(e, l), i.rawrigidbodyset_rbAddTorque(this.__wbg_ptr, t, e.__wbg_ptr, r);
    }
    rbApplyTorqueImpulse(t, e, r) {
      c(e, l), i.rawrigidbodyset_rbApplyTorqueImpulse(this.__wbg_ptr, t, e.__wbg_ptr, r);
    }
    rbAddForceAtPoint(t, e, r, a) {
      c(e, l), c(r, l), i.rawrigidbodyset_rbAddForceAtPoint(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a);
    }
    rbApplyImpulseAtPoint(t, e, r, a) {
      c(e, l), c(r, l), i.rawrigidbodyset_rbApplyImpulseAtPoint(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a);
    }
    rbAdditionalSolverIterations(t) {
      return i.rawrigidbodyset_rbAdditionalSolverIterations(this.__wbg_ptr, t) >>> 0;
    }
    rbSetAdditionalSolverIterations(t, e) {
      i.rawrigidbodyset_rbSetAdditionalSolverIterations(this.__wbg_ptr, t, e);
    }
    rbUserData(t) {
      return i.rawrigidbodyset_rbUserData(this.__wbg_ptr, t) >>> 0;
    }
    rbSetUserData(t, e) {
      i.rawrigidbodyset_rbSetUserData(this.__wbg_ptr, t, e);
    }
    rbUserForce(t) {
      const e = i.rawrigidbodyset_rbUserForce(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    rbUserTorque(t) {
      const e = i.rawrigidbodyset_rbUserTorque(this.__wbg_ptr, t);
      return l.__wrap(e);
    }
    constructor() {
      const t = i.rawrigidbodyset_new();
      return this.__wbg_ptr = t >>> 0, ee.register(this, this.__wbg_ptr, this), this;
    }
    createRigidBody(t, e, r, a, o, _, d, h, p, u, g, b, m, C, H, G, B, O, Q, _t, Wt, Bt, Ot, Vt, ft, Ut) {
      return c(e, l), c(r, S), c(d, l), c(h, l), c(p, l), c(u, l), c(g, S), i.rawrigidbodyset_createRigidBody(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a, o, _, d.__wbg_ptr, h.__wbg_ptr, p.__wbg_ptr, u.__wbg_ptr, g.__wbg_ptr, b, m, C, H, G, B, O, Q, _t, Wt, Bt, Ot, Vt, ft, Ut);
    }
    remove(t, e, r, a, o) {
      c(e, Z), c(r, P), c(a, Y), c(o, $), i.rawrigidbodyset_remove(this.__wbg_ptr, t, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr);
    }
    len() {
      return i.rawrigidbodyset_len(this.__wbg_ptr) >>> 0;
    }
    contains(t) {
      return i.rawrigidbodyset_contains(this.__wbg_ptr, t) !== 0;
    }
    forEachRigidBodyHandle(t) {
      try {
        i.rawrigidbodyset_forEachRigidBodyHandle(this.__wbg_ptr, A(t));
      } finally {
        x[j++] = void 0;
      }
    }
    propagateModifiedBodyPositionsToColliders(t) {
      c(t, P), i.rawrigidbodyset_propagateModifiedBodyPositionsToColliders(this.__wbg_ptr, t.__wbg_ptr);
    }
  }
  const re = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawrotation_free(s >>> 0, 1));
  class S {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(S.prototype);
      return e.__wbg_ptr = t, re.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, re.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawrotation_free(t, 0);
    }
    constructor(t, e, r, a) {
      const o = i.rawrotation_new(t, e, r, a);
      return this.__wbg_ptr = o >>> 0, re.register(this, this.__wbg_ptr, this), this;
    }
    static identity() {
      const t = i.rawrotation_identity();
      return S.__wrap(t);
    }
    get x() {
      return i.rawintegrationparameters_dt(this.__wbg_ptr);
    }
    get y() {
      return i.rawkinematiccharactercontroller_offset(this.__wbg_ptr);
    }
    get z() {
      return i.rawcollidershapecasthit_time_of_impact(this.__wbg_ptr);
    }
    get w() {
      return i.rawrotation_w(this.__wbg_ptr);
    }
  }
  const _r = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawsdpmatrix3_free(s >>> 0, 1));
  class xt {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(xt.prototype);
      return e.__wbg_ptr = t, _r.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _r.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawsdpmatrix3_free(t, 0);
    }
    elements() {
      const t = i.rawsdpmatrix3_elements(this.__wbg_ptr);
      return wt(t);
    }
  }
  const cr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawserializationpipeline_free(s >>> 0, 1));
  class di {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, cr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawserializationpipeline_free(t, 0);
    }
    constructor() {
      const t = i.rawccdsolver_new();
      return this.__wbg_ptr = t >>> 0, cr.register(this, this.__wbg_ptr, this), this;
    }
    serializeAll(t, e, r, a, o, _, d, h, p) {
      c(t, l), c(e, it), c(r, Z), c(a, K), c(o, M), c(_, E), c(d, P), c(h, Y), c(p, $);
      const u = i.rawserializationpipeline_serializeAll(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d.__wbg_ptr, h.__wbg_ptr, p.__wbg_ptr);
      return wt(u);
    }
    deserializeAll(t) {
      const e = i.rawserializationpipeline_deserializeAll(this.__wbg_ptr, I(t));
      return e === 0 ? void 0 : ve.__wrap(e);
    }
  }
  const lr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawshape_free(s >>> 0, 1));
  class f {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(f.prototype);
      return e.__wbg_ptr = t, lr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, lr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawshape_free(t, 0);
    }
    static cuboid(t, e, r) {
      const a = i.rawshape_cuboid(t, e, r);
      return f.__wrap(a);
    }
    static roundCuboid(t, e, r, a) {
      const o = i.rawshape_roundCuboid(t, e, r, a);
      return f.__wrap(o);
    }
    static ball(t) {
      const e = i.rawshape_ball(t);
      return f.__wrap(e);
    }
    static halfspace(t) {
      c(t, l);
      const e = i.rawshape_halfspace(t.__wbg_ptr);
      return f.__wrap(e);
    }
    static capsule(t, e) {
      const r = i.rawshape_capsule(t, e);
      return f.__wrap(r);
    }
    static cylinder(t, e) {
      const r = i.rawshape_cylinder(t, e);
      return f.__wrap(r);
    }
    static roundCylinder(t, e, r) {
      const a = i.rawshape_roundCylinder(t, e, r);
      return f.__wrap(a);
    }
    static cone(t, e) {
      const r = i.rawshape_cone(t, e);
      return f.__wrap(r);
    }
    static roundCone(t, e, r) {
      const a = i.rawshape_roundCone(t, e, r);
      return f.__wrap(a);
    }
    static voxels(t, e) {
      c(t, l);
      const r = ct(e, i.__wbindgen_export_2), a = W, o = i.rawshape_voxels(t.__wbg_ptr, r, a);
      return f.__wrap(o);
    }
    static voxelsFromPoints(t, e) {
      c(t, l);
      const r = tt(e, i.__wbindgen_export_2), a = W, o = i.rawshape_voxelsFromPoints(t.__wbg_ptr, r, a);
      return f.__wrap(o);
    }
    static polyline(t, e) {
      const r = tt(t, i.__wbindgen_export_2), a = W, o = ct(e, i.__wbindgen_export_2), _ = W, d = i.rawshape_polyline(r, a, o, _);
      return f.__wrap(d);
    }
    static trimesh(t, e, r) {
      const a = tt(t, i.__wbindgen_export_2), o = W, _ = ct(e, i.__wbindgen_export_2), d = W, h = i.rawshape_trimesh(a, o, _, d, r);
      return h === 0 ? void 0 : f.__wrap(h);
    }
    static heightfield(t, e, r, a, o) {
      const _ = tt(r, i.__wbindgen_export_2), d = W;
      c(a, l);
      const h = i.rawshape_heightfield(t, e, _, d, a.__wbg_ptr, o);
      return f.__wrap(h);
    }
    static segment(t, e) {
      c(t, l), c(e, l);
      const r = i.rawshape_segment(t.__wbg_ptr, e.__wbg_ptr);
      return f.__wrap(r);
    }
    static triangle(t, e, r) {
      c(t, l), c(e, l), c(r, l);
      const a = i.rawshape_triangle(t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr);
      return f.__wrap(a);
    }
    static roundTriangle(t, e, r, a) {
      c(t, l), c(e, l), c(r, l);
      const o = i.rawshape_roundTriangle(t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a);
      return f.__wrap(o);
    }
    static convexHull(t) {
      const e = tt(t, i.__wbindgen_export_2), r = W, a = i.rawshape_convexHull(e, r);
      return a === 0 ? void 0 : f.__wrap(a);
    }
    static roundConvexHull(t, e) {
      const r = tt(t, i.__wbindgen_export_2), a = W, o = i.rawshape_roundConvexHull(r, a, e);
      return o === 0 ? void 0 : f.__wrap(o);
    }
    static convexMesh(t, e) {
      const r = tt(t, i.__wbindgen_export_2), a = W, o = ct(e, i.__wbindgen_export_2), _ = W, d = i.rawshape_convexMesh(r, a, o, _);
      return d === 0 ? void 0 : f.__wrap(d);
    }
    static roundConvexMesh(t, e, r) {
      const a = tt(t, i.__wbindgen_export_2), o = W, _ = ct(e, i.__wbindgen_export_2), d = W, h = i.rawshape_roundConvexMesh(a, o, _, d, r);
      return h === 0 ? void 0 : f.__wrap(h);
    }
    castShape(t, e, r, a, o, _, d, h, p, u) {
      c(t, l), c(e, S), c(r, l), c(a, f), c(o, l), c(_, S), c(d, l);
      const g = i.rawshape_castShape(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _.__wbg_ptr, d.__wbg_ptr, h, p, u);
      return g === 0 ? void 0 : Dt.__wrap(g);
    }
    intersectsShape(t, e, r, a, o) {
      return c(t, l), c(e, S), c(r, f), c(a, l), c(o, S), i.rawshape_intersectsShape(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr) !== 0;
    }
    contactShape(t, e, r, a, o, _) {
      c(t, l), c(e, S), c(r, f), c(a, l), c(o, S);
      const d = i.rawshape_contactShape(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o.__wbg_ptr, _);
      return d === 0 ? void 0 : dt.__wrap(d);
    }
    containsPoint(t, e, r) {
      return c(t, l), c(e, S), c(r, l), i.rawshape_containsPoint(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr) !== 0;
    }
    projectPoint(t, e, r, a) {
      c(t, l), c(e, S), c(r, l);
      const o = i.rawshape_projectPoint(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a);
      return Mt.__wrap(o);
    }
    intersectsRay(t, e, r, a, o) {
      return c(t, l), c(e, S), c(r, l), c(a, l), i.rawshape_intersectsRay(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o) !== 0;
    }
    castRay(t, e, r, a, o, _) {
      return c(t, l), c(e, S), c(r, l), c(a, l), i.rawshape_castRay(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o, _);
    }
    castRayAndGetNormal(t, e, r, a, o, _) {
      c(t, l), c(e, S), c(r, l), c(a, l);
      const d = i.rawshape_castRayAndGetNormal(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, r.__wbg_ptr, a.__wbg_ptr, o, _);
      return d === 0 ? void 0 : Ht.__wrap(d);
    }
  }
  const wr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawshapecasthit_free(s >>> 0, 1));
  class Dt {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Dt.prototype);
      return e.__wbg_ptr = t, wr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawshapecasthit_free(t, 0);
    }
    time_of_impact() {
      return i.rawintegrationparameters_dt(this.__wbg_ptr);
    }
    witness1() {
      const t = i.rawshapecasthit_witness1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    witness2() {
      const t = i.rawcontactforceevent_total_force(this.__wbg_ptr);
      return l.__wrap(t);
    }
    normal1() {
      const t = i.rawshapecasthit_normal1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    normal2() {
      const t = i.rawshapecasthit_normal2(this.__wbg_ptr);
      return l.__wrap(t);
    }
  }
  const dr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawshapecontact_free(s >>> 0, 1));
  class dt {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(dt.prototype);
      return e.__wbg_ptr = t, dr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, dr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawshapecontact_free(t, 0);
    }
    distance() {
      return i.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.__wbg_ptr);
    }
    point1() {
      const t = i.rawpointprojection_point(this.__wbg_ptr);
      return l.__wrap(t);
    }
    point2() {
      const t = i.rawcollidershapecasthit_witness1(this.__wbg_ptr);
      return l.__wrap(t);
    }
    normal1() {
      const t = i.rawcollidershapecasthit_witness2(this.__wbg_ptr);
      return l.__wrap(t);
    }
    normal2() {
      const t = i.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr);
      return l.__wrap(t);
    }
  }
  const ie = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => i.__wbg_rawvector_free(s >>> 0, 1));
  class l {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(l.prototype);
      return e.__wbg_ptr = t, ie.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ie.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      i.__wbg_rawvector_free(t, 0);
    }
    static zero() {
      const t = i.rawvector_zero();
      return l.__wrap(t);
    }
    constructor(t, e, r) {
      const a = i.rawvector_new(t, e, r);
      return this.__wbg_ptr = a >>> 0, ie.register(this, this.__wbg_ptr, this), this;
    }
    get x() {
      return i.rawintegrationparameters_dt(this.__wbg_ptr);
    }
    set x(t) {
      i.rawintegrationparameters_set_dt(this.__wbg_ptr, t);
    }
    get y() {
      return i.rawkinematiccharactercontroller_offset(this.__wbg_ptr);
    }
    set y(t) {
      i.rawvector_set_y(this.__wbg_ptr, t);
    }
    get z() {
      return i.rawcollidershapecasthit_time_of_impact(this.__wbg_ptr);
    }
    set z(t) {
      i.rawvector_set_z(this.__wbg_ptr, t);
    }
    xyz() {
      const t = i.rawvector_xyz(this.__wbg_ptr);
      return l.__wrap(t);
    }
    yxz() {
      const t = i.rawvector_yxz(this.__wbg_ptr);
      return l.__wrap(t);
    }
    zxy() {
      const t = i.rawvector_zxy(this.__wbg_ptr);
      return l.__wrap(t);
    }
    xzy() {
      const t = i.rawvector_xzy(this.__wbg_ptr);
      return l.__wrap(t);
    }
    yzx() {
      const t = i.rawvector_yzx(this.__wbg_ptr);
      return l.__wrap(t);
    }
    zyx() {
      const t = i.rawvector_zyx(this.__wbg_ptr);
      return l.__wrap(t);
    }
  }
  function hi(s, t, e, r) {
    const a = R(s).bind(R(t), R(e), R(r));
    return I(a);
  }
  function pi(s) {
    const t = R(s).buffer;
    return I(t);
  }
  function ui() {
    return zt(function(s, t) {
      const e = R(s).call(R(t));
      return I(e);
    }, arguments);
  }
  function gi() {
    return zt(function(s, t, e) {
      const r = R(s).call(R(t), R(e));
      return I(r);
    }, arguments);
  }
  function bi() {
    return zt(function(s, t, e, r) {
      const a = R(s).call(R(t), R(e), R(r));
      return I(a);
    }, arguments);
  }
  function mi() {
    return zt(function(s, t, e, r, a) {
      const o = R(s).call(R(t), R(e), R(r), R(a));
      return I(o);
    }, arguments);
  }
  function fi(s) {
    return R(s).length;
  }
  function yi(s) {
    return R(s).length;
  }
  function vi(s) {
    const t = new Uint8Array(R(s));
    return I(t);
  }
  function Si(s, t) {
    const e = new Function(be(s, t));
    return I(e);
  }
  function Ri(s, t, e) {
    const r = new Uint8Array(R(s), t >>> 0, e >>> 0);
    return I(r);
  }
  function Ci(s, t, e) {
    const r = new Float32Array(R(s), t >>> 0, e >>> 0);
    return I(r);
  }
  function xi(s) {
    const t = new Float32Array(s >>> 0);
    return I(t);
  }
  function ji(s) {
    return R(s).now();
  }
  function Ii(s) {
    const t = R(s).performance;
    return I(t);
  }
  function Ei(s) {
    const t = me.__wrap(s);
    return I(t);
  }
  function Ai(s) {
    const t = kt.__wrap(s);
    return I(t);
  }
  function Pi(s, t, e) {
    R(s).set(R(t), e >>> 0);
  }
  function zi(s, t, e) {
    R(s).set(R(t), e >>> 0);
  }
  function Fi() {
    const s = typeof We > "u" ? null : We;
    return y(s) ? 0 : I(s);
  }
  function Ti() {
    const s = typeof globalThis > "u" ? null : globalThis;
    return y(s) ? 0 : I(s);
  }
  function Mi() {
    const s = typeof self > "u" ? null : self;
    return y(s) ? 0 : I(s);
  }
  function ki() {
    const s = typeof window > "u" ? null : window;
    return y(s) ? 0 : I(s);
  }
  function Hi(s) {
    const t = R(s);
    return typeof t == "boolean" ? t ? 1 : 0 : 2;
  }
  function Di(s) {
    return typeof R(s) == "function";
  }
  function Li(s) {
    return R(s) === void 0;
  }
  function Ni() {
    const s = i.memory;
    return I(s);
  }
  function Gi(s, t) {
    const e = R(t), r = typeof e == "number" ? e : void 0;
    T().setFloat64(s + 8, y(r) ? 0 : r, true), T().setInt32(s + 0, !y(r), true);
  }
  function Wi(s) {
    return I(s);
  }
  function Bi(s) {
    const t = R(s);
    return I(t);
  }
  function Oi(s) {
    wt(s);
  }
  function Vi(s, t) {
    throw new Error(be(s, t));
  }
  URL = globalThis.URL;
  const n = await Zr({
    "./rapier_wasm3d_bg.js": {
      __wbindgen_number_new: Wi,
      __wbindgen_boolean_get: Hi,
      __wbindgen_object_drop_ref: Oi,
      __wbindgen_number_get: Gi,
      __wbindgen_is_function: Di,
      __wbg_rawraycolliderintersection_new: Ai,
      __wbg_rawcontactforceevent_new: Ei,
      __wbg_performance_7a3ffd0b17f663ad: Ii,
      __wbindgen_is_undefined: Li,
      __wbg_now_2c95c9de01293173: ji,
      __wbindgen_object_clone_ref: Bi,
      __wbg_newnoargs_105ed471475aaf50: Si,
      __wbg_call_672a4d21634d4a24: ui,
      __wbg_call_7cccdd69e0791ae2: gi,
      __wbg_call_833bed5770ea2041: bi,
      __wbg_call_b8adc8b1d0a0d8eb: mi,
      __wbg_bind_c8359b1cba058168: hi,
      __wbg_buffer_609cc3eee51ed158: pi,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: Ti,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: Mi,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: ki,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: Fi,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: Ri,
      __wbg_new_a12002a7f91c75be: vi,
      __wbg_set_65595bdd868b3009: zi,
      __wbg_length_a446193dc22c12f8: yi,
      __wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354: Ci,
      __wbg_set_10bad9bee0e9c58b: Pi,
      __wbg_length_3b4f022188ae8db6: fi,
      __wbg_newwithlength_5a5efe313cfd59f1: xi,
      __wbindgen_throw: Vi,
      __wbindgen_memory: Ni
    }
  }, Yr), Ui = n.memory, Xi = n.version, Ji = n.__wbg_rawkinematiccharactercontroller_free, qi = n.rawkinematiccharactercontroller_new, Ki = n.rawkinematiccharactercontroller_setUp, Yi = n.rawkinematiccharactercontroller_normalNudgeFactor, Zi = n.rawkinematiccharactercontroller_setNormalNudgeFactor, $i = n.rawkinematiccharactercontroller_offset, Qi = n.rawkinematiccharactercontroller_setOffset, tn = n.rawkinematiccharactercontroller_slideEnabled, en = n.rawkinematiccharactercontroller_setSlideEnabled, rn = n.rawkinematiccharactercontroller_autostepMaxHeight, nn = n.rawkinematiccharactercontroller_autostepMinWidth, an = n.rawkinematiccharactercontroller_autostepIncludesDynamicBodies, sn = n.rawkinematiccharactercontroller_autostepEnabled, on = n.rawkinematiccharactercontroller_enableAutostep, _n = n.rawkinematiccharactercontroller_disableAutostep, cn = n.rawkinematiccharactercontroller_maxSlopeClimbAngle, ln = n.rawkinematiccharactercontroller_setMaxSlopeClimbAngle, wn = n.rawkinematiccharactercontroller_minSlopeSlideAngle, dn = n.rawkinematiccharactercontroller_setMinSlopeSlideAngle, hn = n.rawkinematiccharactercontroller_snapToGroundDistance, pn = n.rawkinematiccharactercontroller_enableSnapToGround, un = n.rawkinematiccharactercontroller_disableSnapToGround, gn = n.rawkinematiccharactercontroller_snapToGroundEnabled, bn = n.rawkinematiccharactercontroller_computeColliderMovement, mn = n.rawkinematiccharactercontroller_computedMovement, fn = n.rawkinematiccharactercontroller_computedGrounded, yn = n.rawkinematiccharactercontroller_numComputedCollisions, vn = n.rawkinematiccharactercontroller_computedCollision, Sn = n.__wbg_rawcharactercollision_free, Rn = n.rawcharactercollision_new, Cn = n.rawcharactercollision_handle, xn = n.rawcharactercollision_translationDeltaApplied, jn = n.rawcharactercollision_translationDeltaRemaining, In = n.rawcharactercollision_toi, En = n.rawcharactercollision_worldWitness1, An = n.rawcharactercollision_worldWitness2, Pn = n.rawcharactercollision_worldNormal1, zn = n.rawcharactercollision_worldNormal2, Fn = n.__wbg_rawpidcontroller_free, Tn = n.rawpidcontroller_new, Mn = n.rawpidcontroller_set_kp, kn = n.rawpidcontroller_set_ki, Hn = n.rawpidcontroller_set_kd, Dn = n.rawpidcontroller_set_axes_mask, Ln = n.rawpidcontroller_reset_integrals, Nn = n.rawpidcontroller_apply_linear_correction, Gn = n.rawpidcontroller_apply_angular_correction, Wn = n.rawpidcontroller_linear_correction, Bn = n.rawpidcontroller_angular_correction, On = n.__wbg_rawdynamicraycastvehiclecontroller_free, Vn = n.rawdynamicraycastvehiclecontroller_new, Un = n.rawdynamicraycastvehiclecontroller_current_vehicle_speed, Xn = n.rawdynamicraycastvehiclecontroller_chassis, Jn = n.rawdynamicraycastvehiclecontroller_index_up_axis, qn = n.rawdynamicraycastvehiclecontroller_set_index_up_axis, Kn = n.rawdynamicraycastvehiclecontroller_index_forward_axis, Yn = n.rawdynamicraycastvehiclecontroller_set_index_forward_axis, Zn = n.rawdynamicraycastvehiclecontroller_add_wheel, $n = n.rawdynamicraycastvehiclecontroller_num_wheels, Qn = n.rawdynamicraycastvehiclecontroller_update_vehicle, ta = n.rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs, ea = n.rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs, ra = n.rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length, ia = n.rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length, na = n.rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel, aa = n.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel, sa = n.rawdynamicraycastvehiclecontroller_wheel_radius, oa = n.rawdynamicraycastvehiclecontroller_set_wheel_radius, _a = n.rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness, ca = n.rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness, la = n.rawdynamicraycastvehiclecontroller_wheel_suspension_compression, wa = n.rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression, da = n.rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation, ha = n.rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation, pa = n.rawdynamicraycastvehiclecontroller_wheel_max_suspension_force, ua = n.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force, ga = n.rawdynamicraycastvehiclecontroller_wheel_brake, ba = n.rawdynamicraycastvehiclecontroller_set_wheel_brake, ma = n.rawdynamicraycastvehiclecontroller_wheel_steering, fa = n.rawdynamicraycastvehiclecontroller_set_wheel_steering, ya = n.rawdynamicraycastvehiclecontroller_wheel_engine_force, va = n.rawdynamicraycastvehiclecontroller_set_wheel_engine_force, Sa = n.rawdynamicraycastvehiclecontroller_wheel_direction_cs, Ra = n.rawdynamicraycastvehiclecontroller_set_wheel_direction_cs, Ca = n.rawdynamicraycastvehiclecontroller_wheel_axle_cs, xa = n.rawdynamicraycastvehiclecontroller_set_wheel_axle_cs, ja = n.rawdynamicraycastvehiclecontroller_wheel_friction_slip, Ia = n.rawdynamicraycastvehiclecontroller_set_wheel_friction_slip, Ea = n.rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness, Aa = n.rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness, Pa = n.rawdynamicraycastvehiclecontroller_wheel_rotation, za = n.rawdynamicraycastvehiclecontroller_wheel_forward_impulse, Fa = n.rawdynamicraycastvehiclecontroller_wheel_side_impulse, Ta = n.rawdynamicraycastvehiclecontroller_wheel_suspension_force, Ma = n.rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws, ka = n.rawdynamicraycastvehiclecontroller_wheel_contact_point_ws, Ha = n.rawdynamicraycastvehiclecontroller_wheel_suspension_length, Da = n.rawdynamicraycastvehiclecontroller_wheel_hard_point_ws, La = n.rawdynamicraycastvehiclecontroller_wheel_is_in_contact, Na = n.rawdynamicraycastvehiclecontroller_wheel_ground_object, Ga = n.__wbg_rawccdsolver_free, Wa = n.rawimpulsejointset_jointType, Ba = n.rawimpulsejointset_jointBodyHandle1, Oa = n.rawimpulsejointset_jointBodyHandle2, Va = n.rawimpulsejointset_jointFrameX1, Ua = n.rawimpulsejointset_jointFrameX2, Xa = n.rawimpulsejointset_jointAnchor1, Ja = n.rawimpulsejointset_jointAnchor2, qa = n.rawimpulsejointset_jointSetAnchor1, Ka = n.rawimpulsejointset_jointSetAnchor2, Ya = n.rawimpulsejointset_jointContactsEnabled, Za = n.rawimpulsejointset_jointSetContactsEnabled, $a = n.rawimpulsejointset_jointLimitsEnabled, Qa = n.rawimpulsejointset_jointLimitsMin, ts = n.rawimpulsejointset_jointLimitsMax, es = n.rawimpulsejointset_jointSetLimits, rs = n.rawimpulsejointset_jointConfigureMotorModel, is = n.rawimpulsejointset_jointConfigureMotorVelocity, ns = n.rawimpulsejointset_jointConfigureMotorPosition, as = n.rawimpulsejointset_jointConfigureMotor, ss = n.__wbg_rawimpulsejointset_free, os = n.rawimpulsejointset_new, _s = n.rawimpulsejointset_createJoint, cs = n.rawimpulsejointset_remove, ls = n.rawimpulsejointset_len, ws = n.rawimpulsejointset_contains, ds = n.rawimpulsejointset_forEachJointHandle, hs = n.rawimpulsejointset_forEachJointAttachedToRigidBody, ps = n.__wbg_rawintegrationparameters_free, us = n.rawintegrationparameters_new, gs = n.rawintegrationparameters_dt, bs = n.rawintegrationparameters_contact_erp, ms = n.rawintegrationparameters_normalizedAllowedLinearError, fs = n.rawintegrationparameters_normalizedPredictionDistance, ys = n.rawintegrationparameters_numSolverIterations, vs = n.rawintegrationparameters_minIslandSize, Ss = n.rawintegrationparameters_maxCcdSubsteps, Rs = n.rawintegrationparameters_set_dt, Cs = n.rawintegrationparameters_set_contact_natural_frequency, xs = n.rawintegrationparameters_set_normalizedAllowedLinearError, js = n.rawintegrationparameters_set_normalizedPredictionDistance, Is = n.rawintegrationparameters_set_numSolverIterations, Es = n.rawintegrationparameters_set_minIslandSize, As = n.rawintegrationparameters_set_maxCcdSubsteps, Ps = n.rawintegrationparameters_set_lengthUnit, zs = n.__wbg_rawislandmanager_free, Fs = n.rawislandmanager_new, Ts = n.rawislandmanager_forEachActiveRigidBodyHandle, Ms = n.__wbg_rawgenericjoint_free, ks = n.rawgenericjoint_generic, Hs = n.rawgenericjoint_spring, Ds = n.rawgenericjoint_rope, Ls = n.rawgenericjoint_spherical, Ns = n.rawgenericjoint_prismatic, Gs = n.rawgenericjoint_fixed, Ws = n.rawgenericjoint_revolute, Bs = n.rawmultibodyjointset_jointType, Os = n.rawmultibodyjointset_jointFrameX1, Vs = n.rawmultibodyjointset_jointFrameX2, Us = n.rawmultibodyjointset_jointAnchor1, Xs = n.rawmultibodyjointset_jointAnchor2, Js = n.rawmultibodyjointset_jointContactsEnabled, qs = n.rawmultibodyjointset_jointSetContactsEnabled, Ks = n.rawmultibodyjointset_jointLimitsEnabled, Ys = n.rawmultibodyjointset_jointLimitsMin, Zs = n.rawmultibodyjointset_jointLimitsMax, $s = n.__wbg_rawmultibodyjointset_free, Qs = n.rawmultibodyjointset_new, to = n.rawmultibodyjointset_createJoint, eo = n.rawmultibodyjointset_remove, ro = n.rawmultibodyjointset_contains, io = n.rawmultibodyjointset_forEachJointHandle, no = n.rawmultibodyjointset_forEachJointAttachedToRigidBody, ao = n.rawrigidbodyset_rbTranslation, so = n.rawrigidbodyset_rbRotation, oo = n.rawrigidbodyset_rbSleep, _o = n.rawrigidbodyset_rbIsSleeping, co = n.rawrigidbodyset_rbIsMoving, lo = n.rawrigidbodyset_rbNextTranslation, wo = n.rawrigidbodyset_rbNextRotation, ho = n.rawrigidbodyset_rbSetTranslation, po = n.rawrigidbodyset_rbSetRotation, uo = n.rawrigidbodyset_rbSetLinvel, go = n.rawrigidbodyset_rbSetAngvel, bo = n.rawrigidbodyset_rbSetNextKinematicTranslation, mo = n.rawrigidbodyset_rbSetNextKinematicRotation, fo = n.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders, yo = n.rawrigidbodyset_rbSetAdditionalMass, vo = n.rawrigidbodyset_rbSetAdditionalMassProperties, So = n.rawrigidbodyset_rbLinvel, Ro = n.rawrigidbodyset_rbAngvel, Co = n.rawrigidbodyset_rbVelocityAtPoint, xo = n.rawrigidbodyset_rbLockTranslations, jo = n.rawrigidbodyset_rbSetEnabledTranslations, Io = n.rawrigidbodyset_rbLockRotations, Eo = n.rawrigidbodyset_rbSetEnabledRotations, Ao = n.rawrigidbodyset_rbDominanceGroup, Po = n.rawrigidbodyset_rbSetDominanceGroup, zo = n.rawrigidbodyset_rbEnableCcd, Fo = n.rawrigidbodyset_rbSetSoftCcdPrediction, To = n.rawrigidbodyset_rbMass, Mo = n.rawrigidbodyset_rbInvMass, ko = n.rawrigidbodyset_rbEffectiveInvMass, Ho = n.rawrigidbodyset_rbLocalCom, Do = n.rawrigidbodyset_rbWorldCom, Lo = n.rawrigidbodyset_rbInvPrincipalInertia, No = n.rawrigidbodyset_rbPrincipalInertiaLocalFrame, Go = n.rawrigidbodyset_rbPrincipalInertia, Wo = n.rawrigidbodyset_rbEffectiveWorldInvInertia, Bo = n.rawrigidbodyset_rbEffectiveAngularInertia, Oo = n.rawrigidbodyset_rbWakeUp, Vo = n.rawrigidbodyset_rbIsCcdEnabled, Uo = n.rawrigidbodyset_rbSoftCcdPrediction, Xo = n.rawrigidbodyset_rbNumColliders, Jo = n.rawrigidbodyset_rbCollider, qo = n.rawrigidbodyset_rbBodyType, Ko = n.rawrigidbodyset_rbSetBodyType, Yo = n.rawrigidbodyset_rbIsFixed, Zo = n.rawrigidbodyset_rbIsKinematic, $o = n.rawrigidbodyset_rbIsDynamic, Qo = n.rawrigidbodyset_rbLinearDamping, t_ = n.rawrigidbodyset_rbAngularDamping, e_ = n.rawrigidbodyset_rbSetLinearDamping, r_ = n.rawrigidbodyset_rbSetAngularDamping, i_ = n.rawrigidbodyset_rbSetEnabled, n_ = n.rawrigidbodyset_rbIsEnabled, a_ = n.rawrigidbodyset_rbGravityScale, s_ = n.rawrigidbodyset_rbSetGravityScale, o_ = n.rawrigidbodyset_rbResetForces, __ = n.rawrigidbodyset_rbResetTorques, c_ = n.rawrigidbodyset_rbAddForce, l_ = n.rawrigidbodyset_rbApplyImpulse, w_ = n.rawrigidbodyset_rbAddTorque, d_ = n.rawrigidbodyset_rbApplyTorqueImpulse, h_ = n.rawrigidbodyset_rbAddForceAtPoint, p_ = n.rawrigidbodyset_rbApplyImpulseAtPoint, u_ = n.rawrigidbodyset_rbAdditionalSolverIterations, g_ = n.rawrigidbodyset_rbSetAdditionalSolverIterations, b_ = n.rawrigidbodyset_rbUserData, m_ = n.rawrigidbodyset_rbSetUserData, f_ = n.rawrigidbodyset_rbUserForce, y_ = n.rawrigidbodyset_rbUserTorque, v_ = n.__wbg_rawrigidbodyset_free, S_ = n.rawrigidbodyset_new, R_ = n.rawrigidbodyset_createRigidBody, C_ = n.rawrigidbodyset_remove, x_ = n.rawrigidbodyset_len, j_ = n.rawrigidbodyset_contains, I_ = n.rawrigidbodyset_forEachRigidBodyHandle, E_ = n.rawrigidbodyset_propagateModifiedBodyPositionsToColliders, A_ = n.__wbg_rawbroadphase_free, P_ = n.rawbroadphase_new, z_ = n.rawbroadphase_castRay, F_ = n.rawbroadphase_castRayAndGetNormal, T_ = n.rawbroadphase_intersectionsWithRay, M_ = n.rawbroadphase_intersectionWithShape, k_ = n.rawbroadphase_projectPoint, H_ = n.rawbroadphase_projectPointAndGetFeature, D_ = n.rawbroadphase_intersectionsWithPoint, L_ = n.rawbroadphase_castShape, N_ = n.rawbroadphase_intersectionsWithShape, G_ = n.rawbroadphase_collidersWithAabbIntersectingAabb, W_ = n.rawcolliderset_coTranslation, B_ = n.rawcolliderset_coRotation, O_ = n.rawcolliderset_coTranslationWrtParent, V_ = n.rawcolliderset_coRotationWrtParent, U_ = n.rawcolliderset_coSetTranslation, X_ = n.rawcolliderset_coSetTranslationWrtParent, J_ = n.rawcolliderset_coSetRotation, q_ = n.rawcolliderset_coSetRotationWrtParent, K_ = n.rawcolliderset_coIsSensor, Y_ = n.rawcolliderset_coShapeType, Z_ = n.rawcolliderset_coHalfspaceNormal, $_ = n.rawcolliderset_coHalfExtents, Q_ = n.rawcolliderset_coSetHalfExtents, tc = n.rawcolliderset_coRadius, ec = n.rawcolliderset_coSetRadius, rc = n.rawcolliderset_coHalfHeight, ic = n.rawcolliderset_coSetHalfHeight, nc = n.rawcolliderset_coRoundRadius, ac = n.rawcolliderset_coSetRoundRadius, sc = n.rawcolliderset_coVoxelData, oc = n.rawcolliderset_coVoxelSize, _c = n.rawcolliderset_coSetVoxel, cc = n.rawcolliderset_coPropagateVoxelChange, lc = n.rawcolliderset_coCombineVoxelStates, wc = n.rawcolliderset_coVertices, dc = n.rawcolliderset_coIndices, hc = n.rawcolliderset_coTriMeshFlags, pc = n.rawcolliderset_coHeightFieldFlags, uc = n.rawcolliderset_coHeightfieldHeights, gc = n.rawcolliderset_coHeightfieldScale, bc = n.rawcolliderset_coHeightfieldNRows, mc = n.rawcolliderset_coHeightfieldNCols, fc = n.rawcolliderset_coParent, yc = n.rawcolliderset_coSetEnabled, vc = n.rawcolliderset_coIsEnabled, Sc = n.rawcolliderset_coSetContactSkin, Rc = n.rawcolliderset_coContactSkin, Cc = n.rawcolliderset_coFriction, xc = n.rawcolliderset_coRestitution, jc = n.rawcolliderset_coDensity, Ic = n.rawcolliderset_coMass, Ec = n.rawcolliderset_coVolume, Ac = n.rawcolliderset_coCollisionGroups, Pc = n.rawcolliderset_coSolverGroups, zc = n.rawcolliderset_coActiveHooks, Fc = n.rawcolliderset_coActiveCollisionTypes, Tc = n.rawcolliderset_coActiveEvents, Mc = n.rawcolliderset_coContactForceEventThreshold, kc = n.rawcolliderset_coContainsPoint, Hc = n.rawcolliderset_coCastShape, Dc = n.rawcolliderset_coCastCollider, Lc = n.rawcolliderset_coIntersectsShape, Nc = n.rawcolliderset_coContactShape, Gc = n.rawcolliderset_coContactCollider, Wc = n.rawcolliderset_coProjectPoint, Bc = n.rawcolliderset_coIntersectsRay, Oc = n.rawcolliderset_coCastRay, Vc = n.rawcolliderset_coCastRayAndGetNormal, Uc = n.rawcolliderset_coSetSensor, Xc = n.rawcolliderset_coSetRestitution, Jc = n.rawcolliderset_coSetFriction, qc = n.rawcolliderset_coFrictionCombineRule, Kc = n.rawcolliderset_coSetFrictionCombineRule, Yc = n.rawcolliderset_coRestitutionCombineRule, Zc = n.rawcolliderset_coSetRestitutionCombineRule, $c = n.rawcolliderset_coSetCollisionGroups, Qc = n.rawcolliderset_coSetSolverGroups, tl = n.rawcolliderset_coSetActiveHooks, el = n.rawcolliderset_coSetActiveEvents, rl = n.rawcolliderset_coSetActiveCollisionTypes, il = n.rawcolliderset_coSetShape, nl = n.rawcolliderset_coSetContactForceEventThreshold, al = n.rawcolliderset_coSetDensity, sl = n.rawcolliderset_coSetMass, ol = n.rawcolliderset_coSetMassProperties, _l = n.__wbg_rawcolliderset_free, cl = n.rawcolliderset_new, ll = n.rawcolliderset_len, wl = n.rawcolliderset_contains, dl = n.rawcolliderset_createCollider, hl = n.rawcolliderset_remove, pl = n.rawcolliderset_forEachColliderHandle, ul = n.__wbg_rawshapecontact_free, gl = n.__wbg_rawnarrowphase_free, bl = n.rawnarrowphase_new, ml = n.rawnarrowphase_contact_pairs_with, fl = n.rawnarrowphase_contact_pair, yl = n.rawnarrowphase_intersection_pairs_with, vl = n.rawnarrowphase_intersection_pair, Sl = n.__wbg_rawcontactmanifold_free, Rl = n.rawcontactpair_collider1, Cl = n.rawcontactpair_collider2, xl = n.rawcontactpair_numContactManifolds, jl = n.rawcontactpair_contactManifold, Il = n.rawcontactmanifold_normal, El = n.rawcontactmanifold_local_n1, Al = n.rawcontactmanifold_local_n2, Pl = n.rawcontactmanifold_subshape1, zl = n.rawcontactmanifold_subshape2, Fl = n.rawcontactmanifold_num_contacts, Tl = n.rawcontactmanifold_contact_local_p1, Ml = n.rawcontactmanifold_contact_local_p2, kl = n.rawcontactmanifold_contact_dist, Hl = n.rawcontactmanifold_contact_fid1, Dl = n.rawcontactmanifold_contact_fid2, Ll = n.rawcontactmanifold_contact_impulse, Nl = n.rawcontactmanifold_contact_tangent_impulse_x, Gl = n.rawcontactmanifold_contact_tangent_impulse_y, Wl = n.rawcontactmanifold_num_solver_contacts, Bl = n.rawcontactmanifold_solver_contact_point, Ol = n.rawcontactmanifold_solver_contact_dist, Vl = n.rawcontactmanifold_solver_contact_friction, Ul = n.rawcontactmanifold_solver_contact_restitution, Xl = n.rawcontactmanifold_solver_contact_tangent_velocity, Jl = n.__wbg_rawpointprojection_free, ql = n.rawpointprojection_point, Kl = n.rawpointprojection_isInside, Yl = n.__wbg_rawpointcolliderprojection_free, Zl = n.rawpointcolliderprojection_colliderHandle, $l = n.rawpointcolliderprojection_point, Ql = n.rawpointcolliderprojection_isInside, tw = n.rawpointcolliderprojection_featureType, ew = n.rawpointcolliderprojection_featureId, rw = n.__wbg_rawrayintersection_free, iw = n.__wbg_rawraycolliderhit_free, nw = n.__wbg_rawshape_free, aw = n.rawshape_cuboid, sw = n.rawshape_roundCuboid, ow = n.rawshape_ball, _w = n.rawshape_halfspace, cw = n.rawshape_capsule, lw = n.rawshape_cylinder, ww = n.rawshape_roundCylinder, dw = n.rawshape_cone, hw = n.rawshape_roundCone, pw = n.rawshape_voxels, uw = n.rawshape_voxelsFromPoints, gw = n.rawshape_polyline, bw = n.rawshape_trimesh, mw = n.rawshape_heightfield, fw = n.rawshape_segment, yw = n.rawshape_triangle, vw = n.rawshape_roundTriangle, Sw = n.rawshape_convexHull, Rw = n.rawshape_roundConvexHull, Cw = n.rawshape_convexMesh, xw = n.rawshape_roundConvexMesh, jw = n.rawshape_castShape, Iw = n.rawshape_intersectsShape, Ew = n.rawshape_contactShape, Aw = n.rawshape_containsPoint, Pw = n.rawshape_projectPoint, zw = n.rawshape_intersectsRay, Fw = n.rawshape_castRay, Tw = n.rawshape_castRayAndGetNormal, Mw = n.__wbg_rawshapecasthit_free, kw = n.rawshapecasthit_witness1, Hw = n.rawshapecasthit_normal1, Dw = n.rawshapecasthit_normal2, Lw = n.__wbg_rawcollidershapecasthit_free, Nw = n.rawcollidershapecasthit_time_of_impact, Gw = n.rawcollidershapecasthit_witness1, Ww = n.rawcollidershapecasthit_witness2, Bw = n.rawrotation_new, Ow = n.rawrotation_identity, Vw = n.rawrotation_w, Uw = n.rawvector_zero, Xw = n.rawvector_new, Jw = n.rawvector_set_y, qw = n.rawvector_set_z, Kw = n.rawvector_xyz, Yw = n.rawvector_yxz, Zw = n.rawvector_zxy, $w = n.rawvector_xzy, Qw = n.rawvector_yzx, td = n.rawvector_zyx, ed = n.rawsdpmatrix3_elements, rd = n.__wbg_rawdebugrenderpipeline_free, id = n.rawdebugrenderpipeline_new, nd = n.rawdebugrenderpipeline_vertices, ad = n.rawdebugrenderpipeline_colors, sd = n.rawdebugrenderpipeline_render, od = n.__wbg_raweventqueue_free, _d = n.__wbg_rawcontactforceevent_free, cd = n.rawcontactforceevent_collider2, ld = n.rawcontactforceevent_total_force, wd = n.rawcontactforceevent_total_force_magnitude, dd = n.rawcontactforceevent_max_force_direction, hd = n.rawcontactforceevent_max_force_magnitude, pd = n.raweventqueue_new, ud = n.raweventqueue_drainCollisionEvents, gd = n.raweventqueue_drainContactForceEvents, bd = n.raweventqueue_clear, md = n.__wbg_rawphysicspipeline_free, fd = n.rawphysicspipeline_new, yd = n.rawphysicspipeline_set_profiler_enabled, vd = n.rawphysicspipeline_is_profiler_enabled, Sd = n.rawphysicspipeline_timing_step, Rd = n.rawphysicspipeline_timing_collision_detection, Cd = n.rawphysicspipeline_timing_broad_phase, xd = n.rawphysicspipeline_timing_narrow_phase, jd = n.rawphysicspipeline_timing_solver, Id = n.rawphysicspipeline_timing_velocity_assembly, Ed = n.rawphysicspipeline_timing_velocity_resolution, Ad = n.rawphysicspipeline_timing_velocity_update, Pd = n.rawphysicspipeline_timing_velocity_writeback, zd = n.rawphysicspipeline_timing_ccd, Fd = n.rawphysicspipeline_timing_ccd_toi_computation, Td = n.rawphysicspipeline_timing_ccd_broad_phase, Md = n.rawphysicspipeline_timing_ccd_narrow_phase, kd = n.rawphysicspipeline_timing_ccd_solver, Hd = n.rawphysicspipeline_timing_island_construction, Dd = n.rawphysicspipeline_timing_user_changes, Ld = n.rawphysicspipeline_step, Nd = n.rawphysicspipeline_stepWithEvents, Gd = n.__wbg_rawdeserializedworld_free, Wd = n.rawdeserializedworld_takeGravity, Bd = n.rawdeserializedworld_takeIntegrationParameters, Od = n.rawdeserializedworld_takeIslandManager, Vd = n.rawdeserializedworld_takeBroadPhase, Ud = n.rawdeserializedworld_takeNarrowPhase, Xd = n.rawdeserializedworld_takeBodies, Jd = n.rawdeserializedworld_takeColliders, qd = n.rawdeserializedworld_takeImpulseJoints, Kd = n.rawdeserializedworld_takeMultibodyJoints, Yd = n.rawserializationpipeline_serializeAll, Zd = n.rawserializationpipeline_deserializeAll, $d = n.rawcolliderset_isHandleValid, Qd = n.rawrayintersection_featureId, th = n.rawraycolliderintersection_featureId, eh = n.rawintegrationparameters_set_numInternalPgsIterations, rh = n.rawvector_set_x, ih = n.reserve_memory, nh = n.rawkinematiccharactercontroller_up, ah = n.rawshapecontact_normal2, sh = n.rawshapecontact_point1, oh = n.rawshapecontact_point2, _h = n.rawrayintersection_normal, ch = n.rawraycolliderintersection_normal, lh = n.rawshapecontact_normal1, wh = n.rawcollidershapecasthit_normal1, dh = n.rawcollidershapecasthit_normal2, hh = n.rawshapecasthit_witness2, ph = n.rawintegrationparameters_numInternalPgsIterations, uh = n.rawshapecontact_distance, gh = n.rawrayintersection_featureType, bh = n.rawraycolliderintersection_colliderHandle, mh = n.rawrayintersection_time_of_impact, fh = n.rawraycolliderintersection_featureType, yh = n.rawraycolliderhit_colliderHandle, vh = n.rawraycolliderintersection_time_of_impact, Sh = n.rawshapecasthit_time_of_impact, Rh = n.rawcollidershapecasthit_colliderHandle, Ch = n.rawraycolliderhit_timeOfImpact, xh = n.rawrotation_x, jh = n.rawrotation_y, Ih = n.rawrotation_z, Eh = n.rawvector_x, Ah = n.rawvector_y, Ph = n.rawvector_z, zh = n.rawcontactforceevent_collider1, Fh = n.rawintegrationparameters_lengthUnit, Th = n.__wbg_rawcontactpair_free, Mh = n.__wbg_rawraycolliderintersection_free, kh = n.__wbg_rawrotation_free, Hh = n.__wbg_rawvector_free, Dh = n.__wbg_rawsdpmatrix3_free, Lh = n.__wbg_rawserializationpipeline_free, Nh = n.rawccdsolver_new, Gh = n.rawserializationpipeline_new, Wh = n.__wbindgen_export_0, Bh = n.__wbindgen_add_to_stack_pointer, Oh = n.__wbindgen_export_1, Vh = n.__wbindgen_export_2, Uh = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_rawbroadphase_free: A_,
    __wbg_rawccdsolver_free: Ga,
    __wbg_rawcharactercollision_free: Sn,
    __wbg_rawcolliderset_free: _l,
    __wbg_rawcollidershapecasthit_free: Lw,
    __wbg_rawcontactforceevent_free: _d,
    __wbg_rawcontactmanifold_free: Sl,
    __wbg_rawcontactpair_free: Th,
    __wbg_rawdebugrenderpipeline_free: rd,
    __wbg_rawdeserializedworld_free: Gd,
    __wbg_rawdynamicraycastvehiclecontroller_free: On,
    __wbg_raweventqueue_free: od,
    __wbg_rawgenericjoint_free: Ms,
    __wbg_rawimpulsejointset_free: ss,
    __wbg_rawintegrationparameters_free: ps,
    __wbg_rawislandmanager_free: zs,
    __wbg_rawkinematiccharactercontroller_free: Ji,
    __wbg_rawmultibodyjointset_free: $s,
    __wbg_rawnarrowphase_free: gl,
    __wbg_rawphysicspipeline_free: md,
    __wbg_rawpidcontroller_free: Fn,
    __wbg_rawpointcolliderprojection_free: Yl,
    __wbg_rawpointprojection_free: Jl,
    __wbg_rawraycolliderhit_free: iw,
    __wbg_rawraycolliderintersection_free: Mh,
    __wbg_rawrayintersection_free: rw,
    __wbg_rawrigidbodyset_free: v_,
    __wbg_rawrotation_free: kh,
    __wbg_rawsdpmatrix3_free: Dh,
    __wbg_rawserializationpipeline_free: Lh,
    __wbg_rawshape_free: nw,
    __wbg_rawshapecasthit_free: Mw,
    __wbg_rawshapecontact_free: ul,
    __wbg_rawvector_free: Hh,
    __wbindgen_add_to_stack_pointer: Bh,
    __wbindgen_export_0: Wh,
    __wbindgen_export_1: Oh,
    __wbindgen_export_2: Vh,
    memory: Ui,
    rawbroadphase_castRay: z_,
    rawbroadphase_castRayAndGetNormal: F_,
    rawbroadphase_castShape: L_,
    rawbroadphase_collidersWithAabbIntersectingAabb: G_,
    rawbroadphase_intersectionWithShape: M_,
    rawbroadphase_intersectionsWithPoint: D_,
    rawbroadphase_intersectionsWithRay: T_,
    rawbroadphase_intersectionsWithShape: N_,
    rawbroadphase_new: P_,
    rawbroadphase_projectPoint: k_,
    rawbroadphase_projectPointAndGetFeature: H_,
    rawccdsolver_new: Nh,
    rawcharactercollision_handle: Cn,
    rawcharactercollision_new: Rn,
    rawcharactercollision_toi: In,
    rawcharactercollision_translationDeltaApplied: xn,
    rawcharactercollision_translationDeltaRemaining: jn,
    rawcharactercollision_worldNormal1: Pn,
    rawcharactercollision_worldNormal2: zn,
    rawcharactercollision_worldWitness1: En,
    rawcharactercollision_worldWitness2: An,
    rawcolliderset_coActiveCollisionTypes: Fc,
    rawcolliderset_coActiveEvents: Tc,
    rawcolliderset_coActiveHooks: zc,
    rawcolliderset_coCastCollider: Dc,
    rawcolliderset_coCastRay: Oc,
    rawcolliderset_coCastRayAndGetNormal: Vc,
    rawcolliderset_coCastShape: Hc,
    rawcolliderset_coCollisionGroups: Ac,
    rawcolliderset_coCombineVoxelStates: lc,
    rawcolliderset_coContactCollider: Gc,
    rawcolliderset_coContactForceEventThreshold: Mc,
    rawcolliderset_coContactShape: Nc,
    rawcolliderset_coContactSkin: Rc,
    rawcolliderset_coContainsPoint: kc,
    rawcolliderset_coDensity: jc,
    rawcolliderset_coFriction: Cc,
    rawcolliderset_coFrictionCombineRule: qc,
    rawcolliderset_coHalfExtents: $_,
    rawcolliderset_coHalfHeight: rc,
    rawcolliderset_coHalfspaceNormal: Z_,
    rawcolliderset_coHeightFieldFlags: pc,
    rawcolliderset_coHeightfieldHeights: uc,
    rawcolliderset_coHeightfieldNCols: mc,
    rawcolliderset_coHeightfieldNRows: bc,
    rawcolliderset_coHeightfieldScale: gc,
    rawcolliderset_coIndices: dc,
    rawcolliderset_coIntersectsRay: Bc,
    rawcolliderset_coIntersectsShape: Lc,
    rawcolliderset_coIsEnabled: vc,
    rawcolliderset_coIsSensor: K_,
    rawcolliderset_coMass: Ic,
    rawcolliderset_coParent: fc,
    rawcolliderset_coProjectPoint: Wc,
    rawcolliderset_coPropagateVoxelChange: cc,
    rawcolliderset_coRadius: tc,
    rawcolliderset_coRestitution: xc,
    rawcolliderset_coRestitutionCombineRule: Yc,
    rawcolliderset_coRotation: B_,
    rawcolliderset_coRotationWrtParent: V_,
    rawcolliderset_coRoundRadius: nc,
    rawcolliderset_coSetActiveCollisionTypes: rl,
    rawcolliderset_coSetActiveEvents: el,
    rawcolliderset_coSetActiveHooks: tl,
    rawcolliderset_coSetCollisionGroups: $c,
    rawcolliderset_coSetContactForceEventThreshold: nl,
    rawcolliderset_coSetContactSkin: Sc,
    rawcolliderset_coSetDensity: al,
    rawcolliderset_coSetEnabled: yc,
    rawcolliderset_coSetFriction: Jc,
    rawcolliderset_coSetFrictionCombineRule: Kc,
    rawcolliderset_coSetHalfExtents: Q_,
    rawcolliderset_coSetHalfHeight: ic,
    rawcolliderset_coSetMass: sl,
    rawcolliderset_coSetMassProperties: ol,
    rawcolliderset_coSetRadius: ec,
    rawcolliderset_coSetRestitution: Xc,
    rawcolliderset_coSetRestitutionCombineRule: Zc,
    rawcolliderset_coSetRotation: J_,
    rawcolliderset_coSetRotationWrtParent: q_,
    rawcolliderset_coSetRoundRadius: ac,
    rawcolliderset_coSetSensor: Uc,
    rawcolliderset_coSetShape: il,
    rawcolliderset_coSetSolverGroups: Qc,
    rawcolliderset_coSetTranslation: U_,
    rawcolliderset_coSetTranslationWrtParent: X_,
    rawcolliderset_coSetVoxel: _c,
    rawcolliderset_coShapeType: Y_,
    rawcolliderset_coSolverGroups: Pc,
    rawcolliderset_coTranslation: W_,
    rawcolliderset_coTranslationWrtParent: O_,
    rawcolliderset_coTriMeshFlags: hc,
    rawcolliderset_coVertices: wc,
    rawcolliderset_coVolume: Ec,
    rawcolliderset_coVoxelData: sc,
    rawcolliderset_coVoxelSize: oc,
    rawcolliderset_contains: wl,
    rawcolliderset_createCollider: dl,
    rawcolliderset_forEachColliderHandle: pl,
    rawcolliderset_isHandleValid: $d,
    rawcolliderset_len: ll,
    rawcolliderset_new: cl,
    rawcolliderset_remove: hl,
    rawcollidershapecasthit_colliderHandle: Rh,
    rawcollidershapecasthit_normal1: wh,
    rawcollidershapecasthit_normal2: dh,
    rawcollidershapecasthit_time_of_impact: Nw,
    rawcollidershapecasthit_witness1: Gw,
    rawcollidershapecasthit_witness2: Ww,
    rawcontactforceevent_collider1: zh,
    rawcontactforceevent_collider2: cd,
    rawcontactforceevent_max_force_direction: dd,
    rawcontactforceevent_max_force_magnitude: hd,
    rawcontactforceevent_total_force: ld,
    rawcontactforceevent_total_force_magnitude: wd,
    rawcontactmanifold_contact_dist: kl,
    rawcontactmanifold_contact_fid1: Hl,
    rawcontactmanifold_contact_fid2: Dl,
    rawcontactmanifold_contact_impulse: Ll,
    rawcontactmanifold_contact_local_p1: Tl,
    rawcontactmanifold_contact_local_p2: Ml,
    rawcontactmanifold_contact_tangent_impulse_x: Nl,
    rawcontactmanifold_contact_tangent_impulse_y: Gl,
    rawcontactmanifold_local_n1: El,
    rawcontactmanifold_local_n2: Al,
    rawcontactmanifold_normal: Il,
    rawcontactmanifold_num_contacts: Fl,
    rawcontactmanifold_num_solver_contacts: Wl,
    rawcontactmanifold_solver_contact_dist: Ol,
    rawcontactmanifold_solver_contact_friction: Vl,
    rawcontactmanifold_solver_contact_point: Bl,
    rawcontactmanifold_solver_contact_restitution: Ul,
    rawcontactmanifold_solver_contact_tangent_velocity: Xl,
    rawcontactmanifold_subshape1: Pl,
    rawcontactmanifold_subshape2: zl,
    rawcontactpair_collider1: Rl,
    rawcontactpair_collider2: Cl,
    rawcontactpair_contactManifold: jl,
    rawcontactpair_numContactManifolds: xl,
    rawdebugrenderpipeline_colors: ad,
    rawdebugrenderpipeline_new: id,
    rawdebugrenderpipeline_render: sd,
    rawdebugrenderpipeline_vertices: nd,
    rawdeserializedworld_takeBodies: Xd,
    rawdeserializedworld_takeBroadPhase: Vd,
    rawdeserializedworld_takeColliders: Jd,
    rawdeserializedworld_takeGravity: Wd,
    rawdeserializedworld_takeImpulseJoints: qd,
    rawdeserializedworld_takeIntegrationParameters: Bd,
    rawdeserializedworld_takeIslandManager: Od,
    rawdeserializedworld_takeMultibodyJoints: Kd,
    rawdeserializedworld_takeNarrowPhase: Ud,
    rawdynamicraycastvehiclecontroller_add_wheel: Zn,
    rawdynamicraycastvehiclecontroller_chassis: Xn,
    rawdynamicraycastvehiclecontroller_current_vehicle_speed: Un,
    rawdynamicraycastvehiclecontroller_index_forward_axis: Kn,
    rawdynamicraycastvehiclecontroller_index_up_axis: Jn,
    rawdynamicraycastvehiclecontroller_new: Vn,
    rawdynamicraycastvehiclecontroller_num_wheels: $n,
    rawdynamicraycastvehiclecontroller_set_index_forward_axis: Yn,
    rawdynamicraycastvehiclecontroller_set_index_up_axis: qn,
    rawdynamicraycastvehiclecontroller_set_wheel_axle_cs: xa,
    rawdynamicraycastvehiclecontroller_set_wheel_brake: ba,
    rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs: ea,
    rawdynamicraycastvehiclecontroller_set_wheel_direction_cs: Ra,
    rawdynamicraycastvehiclecontroller_set_wheel_engine_force: va,
    rawdynamicraycastvehiclecontroller_set_wheel_friction_slip: Ia,
    rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force: ua,
    rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel: aa,
    rawdynamicraycastvehiclecontroller_set_wheel_radius: oa,
    rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness: Aa,
    rawdynamicraycastvehiclecontroller_set_wheel_steering: fa,
    rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression: wa,
    rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation: ha,
    rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length: ia,
    rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness: ca,
    rawdynamicraycastvehiclecontroller_update_vehicle: Qn,
    rawdynamicraycastvehiclecontroller_wheel_axle_cs: Ca,
    rawdynamicraycastvehiclecontroller_wheel_brake: ga,
    rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs: ta,
    rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws: Ma,
    rawdynamicraycastvehiclecontroller_wheel_contact_point_ws: ka,
    rawdynamicraycastvehiclecontroller_wheel_direction_cs: Sa,
    rawdynamicraycastvehiclecontroller_wheel_engine_force: ya,
    rawdynamicraycastvehiclecontroller_wheel_forward_impulse: za,
    rawdynamicraycastvehiclecontroller_wheel_friction_slip: ja,
    rawdynamicraycastvehiclecontroller_wheel_ground_object: Na,
    rawdynamicraycastvehiclecontroller_wheel_hard_point_ws: Da,
    rawdynamicraycastvehiclecontroller_wheel_is_in_contact: La,
    rawdynamicraycastvehiclecontroller_wheel_max_suspension_force: pa,
    rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel: na,
    rawdynamicraycastvehiclecontroller_wheel_radius: sa,
    rawdynamicraycastvehiclecontroller_wheel_rotation: Pa,
    rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness: Ea,
    rawdynamicraycastvehiclecontroller_wheel_side_impulse: Fa,
    rawdynamicraycastvehiclecontroller_wheel_steering: ma,
    rawdynamicraycastvehiclecontroller_wheel_suspension_compression: la,
    rawdynamicraycastvehiclecontroller_wheel_suspension_force: Ta,
    rawdynamicraycastvehiclecontroller_wheel_suspension_length: Ha,
    rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation: da,
    rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length: ra,
    rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness: _a,
    raweventqueue_clear: bd,
    raweventqueue_drainCollisionEvents: ud,
    raweventqueue_drainContactForceEvents: gd,
    raweventqueue_new: pd,
    rawgenericjoint_fixed: Gs,
    rawgenericjoint_generic: ks,
    rawgenericjoint_prismatic: Ns,
    rawgenericjoint_revolute: Ws,
    rawgenericjoint_rope: Ds,
    rawgenericjoint_spherical: Ls,
    rawgenericjoint_spring: Hs,
    rawimpulsejointset_contains: ws,
    rawimpulsejointset_createJoint: _s,
    rawimpulsejointset_forEachJointAttachedToRigidBody: hs,
    rawimpulsejointset_forEachJointHandle: ds,
    rawimpulsejointset_jointAnchor1: Xa,
    rawimpulsejointset_jointAnchor2: Ja,
    rawimpulsejointset_jointBodyHandle1: Ba,
    rawimpulsejointset_jointBodyHandle2: Oa,
    rawimpulsejointset_jointConfigureMotor: as,
    rawimpulsejointset_jointConfigureMotorModel: rs,
    rawimpulsejointset_jointConfigureMotorPosition: ns,
    rawimpulsejointset_jointConfigureMotorVelocity: is,
    rawimpulsejointset_jointContactsEnabled: Ya,
    rawimpulsejointset_jointFrameX1: Va,
    rawimpulsejointset_jointFrameX2: Ua,
    rawimpulsejointset_jointLimitsEnabled: $a,
    rawimpulsejointset_jointLimitsMax: ts,
    rawimpulsejointset_jointLimitsMin: Qa,
    rawimpulsejointset_jointSetAnchor1: qa,
    rawimpulsejointset_jointSetAnchor2: Ka,
    rawimpulsejointset_jointSetContactsEnabled: Za,
    rawimpulsejointset_jointSetLimits: es,
    rawimpulsejointset_jointType: Wa,
    rawimpulsejointset_len: ls,
    rawimpulsejointset_new: os,
    rawimpulsejointset_remove: cs,
    rawintegrationparameters_contact_erp: bs,
    rawintegrationparameters_dt: gs,
    rawintegrationparameters_lengthUnit: Fh,
    rawintegrationparameters_maxCcdSubsteps: Ss,
    rawintegrationparameters_minIslandSize: vs,
    rawintegrationparameters_new: us,
    rawintegrationparameters_normalizedAllowedLinearError: ms,
    rawintegrationparameters_normalizedPredictionDistance: fs,
    rawintegrationparameters_numInternalPgsIterations: ph,
    rawintegrationparameters_numSolverIterations: ys,
    rawintegrationparameters_set_contact_natural_frequency: Cs,
    rawintegrationparameters_set_dt: Rs,
    rawintegrationparameters_set_lengthUnit: Ps,
    rawintegrationparameters_set_maxCcdSubsteps: As,
    rawintegrationparameters_set_minIslandSize: Es,
    rawintegrationparameters_set_normalizedAllowedLinearError: xs,
    rawintegrationparameters_set_normalizedPredictionDistance: js,
    rawintegrationparameters_set_numInternalPgsIterations: eh,
    rawintegrationparameters_set_numSolverIterations: Is,
    rawislandmanager_forEachActiveRigidBodyHandle: Ts,
    rawislandmanager_new: Fs,
    rawkinematiccharactercontroller_autostepEnabled: sn,
    rawkinematiccharactercontroller_autostepIncludesDynamicBodies: an,
    rawkinematiccharactercontroller_autostepMaxHeight: rn,
    rawkinematiccharactercontroller_autostepMinWidth: nn,
    rawkinematiccharactercontroller_computeColliderMovement: bn,
    rawkinematiccharactercontroller_computedCollision: vn,
    rawkinematiccharactercontroller_computedGrounded: fn,
    rawkinematiccharactercontroller_computedMovement: mn,
    rawkinematiccharactercontroller_disableAutostep: _n,
    rawkinematiccharactercontroller_disableSnapToGround: un,
    rawkinematiccharactercontroller_enableAutostep: on,
    rawkinematiccharactercontroller_enableSnapToGround: pn,
    rawkinematiccharactercontroller_maxSlopeClimbAngle: cn,
    rawkinematiccharactercontroller_minSlopeSlideAngle: wn,
    rawkinematiccharactercontroller_new: qi,
    rawkinematiccharactercontroller_normalNudgeFactor: Yi,
    rawkinematiccharactercontroller_numComputedCollisions: yn,
    rawkinematiccharactercontroller_offset: $i,
    rawkinematiccharactercontroller_setMaxSlopeClimbAngle: ln,
    rawkinematiccharactercontroller_setMinSlopeSlideAngle: dn,
    rawkinematiccharactercontroller_setNormalNudgeFactor: Zi,
    rawkinematiccharactercontroller_setOffset: Qi,
    rawkinematiccharactercontroller_setSlideEnabled: en,
    rawkinematiccharactercontroller_setUp: Ki,
    rawkinematiccharactercontroller_slideEnabled: tn,
    rawkinematiccharactercontroller_snapToGroundDistance: hn,
    rawkinematiccharactercontroller_snapToGroundEnabled: gn,
    rawkinematiccharactercontroller_up: nh,
    rawmultibodyjointset_contains: ro,
    rawmultibodyjointset_createJoint: to,
    rawmultibodyjointset_forEachJointAttachedToRigidBody: no,
    rawmultibodyjointset_forEachJointHandle: io,
    rawmultibodyjointset_jointAnchor1: Us,
    rawmultibodyjointset_jointAnchor2: Xs,
    rawmultibodyjointset_jointContactsEnabled: Js,
    rawmultibodyjointset_jointFrameX1: Os,
    rawmultibodyjointset_jointFrameX2: Vs,
    rawmultibodyjointset_jointLimitsEnabled: Ks,
    rawmultibodyjointset_jointLimitsMax: Zs,
    rawmultibodyjointset_jointLimitsMin: Ys,
    rawmultibodyjointset_jointSetContactsEnabled: qs,
    rawmultibodyjointset_jointType: Bs,
    rawmultibodyjointset_new: Qs,
    rawmultibodyjointset_remove: eo,
    rawnarrowphase_contact_pair: fl,
    rawnarrowphase_contact_pairs_with: ml,
    rawnarrowphase_intersection_pair: vl,
    rawnarrowphase_intersection_pairs_with: yl,
    rawnarrowphase_new: bl,
    rawphysicspipeline_is_profiler_enabled: vd,
    rawphysicspipeline_new: fd,
    rawphysicspipeline_set_profiler_enabled: yd,
    rawphysicspipeline_step: Ld,
    rawphysicspipeline_stepWithEvents: Nd,
    rawphysicspipeline_timing_broad_phase: Cd,
    rawphysicspipeline_timing_ccd: zd,
    rawphysicspipeline_timing_ccd_broad_phase: Td,
    rawphysicspipeline_timing_ccd_narrow_phase: Md,
    rawphysicspipeline_timing_ccd_solver: kd,
    rawphysicspipeline_timing_ccd_toi_computation: Fd,
    rawphysicspipeline_timing_collision_detection: Rd,
    rawphysicspipeline_timing_island_construction: Hd,
    rawphysicspipeline_timing_narrow_phase: xd,
    rawphysicspipeline_timing_solver: jd,
    rawphysicspipeline_timing_step: Sd,
    rawphysicspipeline_timing_user_changes: Dd,
    rawphysicspipeline_timing_velocity_assembly: Id,
    rawphysicspipeline_timing_velocity_resolution: Ed,
    rawphysicspipeline_timing_velocity_update: Ad,
    rawphysicspipeline_timing_velocity_writeback: Pd,
    rawpidcontroller_angular_correction: Bn,
    rawpidcontroller_apply_angular_correction: Gn,
    rawpidcontroller_apply_linear_correction: Nn,
    rawpidcontroller_linear_correction: Wn,
    rawpidcontroller_new: Tn,
    rawpidcontroller_reset_integrals: Ln,
    rawpidcontroller_set_axes_mask: Dn,
    rawpidcontroller_set_kd: Hn,
    rawpidcontroller_set_ki: kn,
    rawpidcontroller_set_kp: Mn,
    rawpointcolliderprojection_colliderHandle: Zl,
    rawpointcolliderprojection_featureId: ew,
    rawpointcolliderprojection_featureType: tw,
    rawpointcolliderprojection_isInside: Ql,
    rawpointcolliderprojection_point: $l,
    rawpointprojection_isInside: Kl,
    rawpointprojection_point: ql,
    rawraycolliderhit_colliderHandle: yh,
    rawraycolliderhit_timeOfImpact: Ch,
    rawraycolliderintersection_colliderHandle: bh,
    rawraycolliderintersection_featureId: th,
    rawraycolliderintersection_featureType: fh,
    rawraycolliderintersection_normal: ch,
    rawraycolliderintersection_time_of_impact: vh,
    rawrayintersection_featureId: Qd,
    rawrayintersection_featureType: gh,
    rawrayintersection_normal: _h,
    rawrayintersection_time_of_impact: mh,
    rawrigidbodyset_contains: j_,
    rawrigidbodyset_createRigidBody: R_,
    rawrigidbodyset_forEachRigidBodyHandle: I_,
    rawrigidbodyset_len: x_,
    rawrigidbodyset_new: S_,
    rawrigidbodyset_propagateModifiedBodyPositionsToColliders: E_,
    rawrigidbodyset_rbAddForce: c_,
    rawrigidbodyset_rbAddForceAtPoint: h_,
    rawrigidbodyset_rbAddTorque: w_,
    rawrigidbodyset_rbAdditionalSolverIterations: u_,
    rawrigidbodyset_rbAngularDamping: t_,
    rawrigidbodyset_rbAngvel: Ro,
    rawrigidbodyset_rbApplyImpulse: l_,
    rawrigidbodyset_rbApplyImpulseAtPoint: p_,
    rawrigidbodyset_rbApplyTorqueImpulse: d_,
    rawrigidbodyset_rbBodyType: qo,
    rawrigidbodyset_rbCollider: Jo,
    rawrigidbodyset_rbDominanceGroup: Ao,
    rawrigidbodyset_rbEffectiveAngularInertia: Bo,
    rawrigidbodyset_rbEffectiveInvMass: ko,
    rawrigidbodyset_rbEffectiveWorldInvInertia: Wo,
    rawrigidbodyset_rbEnableCcd: zo,
    rawrigidbodyset_rbGravityScale: a_,
    rawrigidbodyset_rbInvMass: Mo,
    rawrigidbodyset_rbInvPrincipalInertia: Lo,
    rawrigidbodyset_rbIsCcdEnabled: Vo,
    rawrigidbodyset_rbIsDynamic: $o,
    rawrigidbodyset_rbIsEnabled: n_,
    rawrigidbodyset_rbIsFixed: Yo,
    rawrigidbodyset_rbIsKinematic: Zo,
    rawrigidbodyset_rbIsMoving: co,
    rawrigidbodyset_rbIsSleeping: _o,
    rawrigidbodyset_rbLinearDamping: Qo,
    rawrigidbodyset_rbLinvel: So,
    rawrigidbodyset_rbLocalCom: Ho,
    rawrigidbodyset_rbLockRotations: Io,
    rawrigidbodyset_rbLockTranslations: xo,
    rawrigidbodyset_rbMass: To,
    rawrigidbodyset_rbNextRotation: wo,
    rawrigidbodyset_rbNextTranslation: lo,
    rawrigidbodyset_rbNumColliders: Xo,
    rawrigidbodyset_rbPrincipalInertia: Go,
    rawrigidbodyset_rbPrincipalInertiaLocalFrame: No,
    rawrigidbodyset_rbRecomputeMassPropertiesFromColliders: fo,
    rawrigidbodyset_rbResetForces: o_,
    rawrigidbodyset_rbResetTorques: __,
    rawrigidbodyset_rbRotation: so,
    rawrigidbodyset_rbSetAdditionalMass: yo,
    rawrigidbodyset_rbSetAdditionalMassProperties: vo,
    rawrigidbodyset_rbSetAdditionalSolverIterations: g_,
    rawrigidbodyset_rbSetAngularDamping: r_,
    rawrigidbodyset_rbSetAngvel: go,
    rawrigidbodyset_rbSetBodyType: Ko,
    rawrigidbodyset_rbSetDominanceGroup: Po,
    rawrigidbodyset_rbSetEnabled: i_,
    rawrigidbodyset_rbSetEnabledRotations: Eo,
    rawrigidbodyset_rbSetEnabledTranslations: jo,
    rawrigidbodyset_rbSetGravityScale: s_,
    rawrigidbodyset_rbSetLinearDamping: e_,
    rawrigidbodyset_rbSetLinvel: uo,
    rawrigidbodyset_rbSetNextKinematicRotation: mo,
    rawrigidbodyset_rbSetNextKinematicTranslation: bo,
    rawrigidbodyset_rbSetRotation: po,
    rawrigidbodyset_rbSetSoftCcdPrediction: Fo,
    rawrigidbodyset_rbSetTranslation: ho,
    rawrigidbodyset_rbSetUserData: m_,
    rawrigidbodyset_rbSleep: oo,
    rawrigidbodyset_rbSoftCcdPrediction: Uo,
    rawrigidbodyset_rbTranslation: ao,
    rawrigidbodyset_rbUserData: b_,
    rawrigidbodyset_rbUserForce: f_,
    rawrigidbodyset_rbUserTorque: y_,
    rawrigidbodyset_rbVelocityAtPoint: Co,
    rawrigidbodyset_rbWakeUp: Oo,
    rawrigidbodyset_rbWorldCom: Do,
    rawrigidbodyset_remove: C_,
    rawrotation_identity: Ow,
    rawrotation_new: Bw,
    rawrotation_w: Vw,
    rawrotation_x: xh,
    rawrotation_y: jh,
    rawrotation_z: Ih,
    rawsdpmatrix3_elements: ed,
    rawserializationpipeline_deserializeAll: Zd,
    rawserializationpipeline_new: Gh,
    rawserializationpipeline_serializeAll: Yd,
    rawshape_ball: ow,
    rawshape_capsule: cw,
    rawshape_castRay: Fw,
    rawshape_castRayAndGetNormal: Tw,
    rawshape_castShape: jw,
    rawshape_cone: dw,
    rawshape_contactShape: Ew,
    rawshape_containsPoint: Aw,
    rawshape_convexHull: Sw,
    rawshape_convexMesh: Cw,
    rawshape_cuboid: aw,
    rawshape_cylinder: lw,
    rawshape_halfspace: _w,
    rawshape_heightfield: mw,
    rawshape_intersectsRay: zw,
    rawshape_intersectsShape: Iw,
    rawshape_polyline: gw,
    rawshape_projectPoint: Pw,
    rawshape_roundCone: hw,
    rawshape_roundConvexHull: Rw,
    rawshape_roundConvexMesh: xw,
    rawshape_roundCuboid: sw,
    rawshape_roundCylinder: ww,
    rawshape_roundTriangle: vw,
    rawshape_segment: fw,
    rawshape_triangle: yw,
    rawshape_trimesh: bw,
    rawshape_voxels: pw,
    rawshape_voxelsFromPoints: uw,
    rawshapecasthit_normal1: Hw,
    rawshapecasthit_normal2: Dw,
    rawshapecasthit_time_of_impact: Sh,
    rawshapecasthit_witness1: kw,
    rawshapecasthit_witness2: hh,
    rawshapecontact_distance: uh,
    rawshapecontact_normal1: lh,
    rawshapecontact_normal2: ah,
    rawshapecontact_point1: sh,
    rawshapecontact_point2: oh,
    rawvector_new: Xw,
    rawvector_set_x: rh,
    rawvector_set_y: Jw,
    rawvector_set_z: qw,
    rawvector_x: Eh,
    rawvector_xyz: Kw,
    rawvector_xzy: $w,
    rawvector_y: Ah,
    rawvector_yxz: Yw,
    rawvector_yzx: Qw,
    rawvector_z: Ph,
    rawvector_zero: Uw,
    rawvector_zxy: Zw,
    rawvector_zyx: td,
    reserve_memory: ih,
    version: Xi
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  $r(Uh);
  mr = class {
    constructor(t, e, r) {
      this.x = t, this.y = e, this.z = r;
    }
  };
  w = class {
    static new(t, e, r) {
      return new mr(t, e, r);
    }
    static intoRaw(t) {
      return new l(t.x, t.y, t.z);
    }
    static zeros() {
      return w.new(0, 0, 0);
    }
    static fromRaw(t) {
      if (!t) return null;
      let e = w.new(t.x, t.y, t.z);
      return t.free(), e;
    }
    static copy(t, e) {
      t.x = e.x, t.y = e.y, t.z = e.z;
    }
  };
  ae = class {
    constructor(t, e, r, a) {
      this.x = t, this.y = e, this.z = r, this.w = a;
    }
  };
  v = class {
    static identity() {
      return new ae(0, 0, 0, 1);
    }
    static fromRaw(t) {
      if (!t) return null;
      let e = new ae(t.x, t.y, t.z, t.w);
      return t.free(), e;
    }
    static intoRaw(t) {
      return new S(t.x, t.y, t.z, t.w);
    }
    static copy(t, e) {
      t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w;
    }
  };
  fr = class {
    get m11() {
      return this.elements[0];
    }
    get m12() {
      return this.elements[1];
    }
    get m21() {
      return this.m12;
    }
    get m13() {
      return this.elements[2];
    }
    get m31() {
      return this.m13;
    }
    get m22() {
      return this.elements[3];
    }
    get m23() {
      return this.elements[4];
    }
    get m32() {
      return this.m23;
    }
    get m33() {
      return this.elements[5];
    }
    constructor(t) {
      this.elements = t;
    }
  };
  se = class {
    static fromRaw(t) {
      const e = new fr(t.elements());
      return t.free(), e;
    }
  };
  (function(s) {
    s[s.Dynamic = 0] = "Dynamic", s[s.Fixed = 1] = "Fixed", s[s.KinematicPositionBased = 2] = "KinematicPositionBased", s[s.KinematicVelocityBased = 3] = "KinematicVelocityBased";
  })(V || (V = {}));
  oe = class {
    constructor(t, e, r) {
      this.rawSet = t, this.colliderSet = e, this.handle = r;
    }
    finalizeDeserialization(t) {
      this.colliderSet = t;
    }
    isValid() {
      return this.rawSet.contains(this.handle);
    }
    lockTranslations(t, e) {
      return this.rawSet.rbLockTranslations(this.handle, t, e);
    }
    lockRotations(t, e) {
      return this.rawSet.rbLockRotations(this.handle, t, e);
    }
    setEnabledTranslations(t, e, r, a) {
      return this.rawSet.rbSetEnabledTranslations(this.handle, t, e, r, a);
    }
    restrictTranslations(t, e, r, a) {
      this.setEnabledTranslations(t, e, r, a);
    }
    setEnabledRotations(t, e, r, a) {
      return this.rawSet.rbSetEnabledRotations(this.handle, t, e, r, a);
    }
    restrictRotations(t, e, r, a) {
      this.setEnabledRotations(t, e, r, a);
    }
    dominanceGroup() {
      return this.rawSet.rbDominanceGroup(this.handle);
    }
    setDominanceGroup(t) {
      this.rawSet.rbSetDominanceGroup(this.handle, t);
    }
    additionalSolverIterations() {
      return this.rawSet.rbAdditionalSolverIterations(this.handle);
    }
    setAdditionalSolverIterations(t) {
      this.rawSet.rbSetAdditionalSolverIterations(this.handle, t);
    }
    enableCcd(t) {
      this.rawSet.rbEnableCcd(this.handle, t);
    }
    setSoftCcdPrediction(t) {
      this.rawSet.rbSetSoftCcdPrediction(this.handle, t);
    }
    softCcdPrediction() {
      return this.rawSet.rbSoftCcdPrediction(this.handle);
    }
    translation() {
      let t = this.rawSet.rbTranslation(this.handle);
      return w.fromRaw(t);
    }
    rotation() {
      let t = this.rawSet.rbRotation(this.handle);
      return v.fromRaw(t);
    }
    nextTranslation() {
      let t = this.rawSet.rbNextTranslation(this.handle);
      return w.fromRaw(t);
    }
    nextRotation() {
      let t = this.rawSet.rbNextRotation(this.handle);
      return v.fromRaw(t);
    }
    setTranslation(t, e) {
      this.rawSet.rbSetTranslation(this.handle, t.x, t.y, t.z, e);
    }
    setLinvel(t, e) {
      let r = w.intoRaw(t);
      this.rawSet.rbSetLinvel(this.handle, r, e), r.free();
    }
    gravityScale() {
      return this.rawSet.rbGravityScale(this.handle);
    }
    setGravityScale(t, e) {
      this.rawSet.rbSetGravityScale(this.handle, t, e);
    }
    setRotation(t, e) {
      this.rawSet.rbSetRotation(this.handle, t.x, t.y, t.z, t.w, e);
    }
    setAngvel(t, e) {
      let r = w.intoRaw(t);
      this.rawSet.rbSetAngvel(this.handle, r, e), r.free();
    }
    setNextKinematicTranslation(t) {
      this.rawSet.rbSetNextKinematicTranslation(this.handle, t.x, t.y, t.z);
    }
    setNextKinematicRotation(t) {
      this.rawSet.rbSetNextKinematicRotation(this.handle, t.x, t.y, t.z, t.w);
    }
    linvel() {
      return w.fromRaw(this.rawSet.rbLinvel(this.handle));
    }
    velocityAtPoint(t) {
      const e = w.intoRaw(t);
      let r = w.fromRaw(this.rawSet.rbVelocityAtPoint(this.handle, e));
      return e.free(), r;
    }
    angvel() {
      return w.fromRaw(this.rawSet.rbAngvel(this.handle));
    }
    mass() {
      return this.rawSet.rbMass(this.handle);
    }
    effectiveInvMass() {
      return w.fromRaw(this.rawSet.rbEffectiveInvMass(this.handle));
    }
    invMass() {
      return this.rawSet.rbInvMass(this.handle);
    }
    localCom() {
      return w.fromRaw(this.rawSet.rbLocalCom(this.handle));
    }
    worldCom() {
      return w.fromRaw(this.rawSet.rbWorldCom(this.handle));
    }
    invPrincipalInertia() {
      return w.fromRaw(this.rawSet.rbInvPrincipalInertia(this.handle));
    }
    principalInertia() {
      return w.fromRaw(this.rawSet.rbPrincipalInertia(this.handle));
    }
    principalInertiaLocalFrame() {
      return v.fromRaw(this.rawSet.rbPrincipalInertiaLocalFrame(this.handle));
    }
    effectiveWorldInvInertia() {
      return se.fromRaw(this.rawSet.rbEffectiveWorldInvInertia(this.handle));
    }
    effectiveAngularInertia() {
      return se.fromRaw(this.rawSet.rbEffectiveAngularInertia(this.handle));
    }
    sleep() {
      this.rawSet.rbSleep(this.handle);
    }
    wakeUp() {
      this.rawSet.rbWakeUp(this.handle);
    }
    isCcdEnabled() {
      return this.rawSet.rbIsCcdEnabled(this.handle);
    }
    numColliders() {
      return this.rawSet.rbNumColliders(this.handle);
    }
    collider(t) {
      return this.colliderSet.get(this.rawSet.rbCollider(this.handle, t));
    }
    setEnabled(t) {
      this.rawSet.rbSetEnabled(this.handle, t);
    }
    isEnabled() {
      return this.rawSet.rbIsEnabled(this.handle);
    }
    bodyType() {
      return this.rawSet.rbBodyType(this.handle);
    }
    setBodyType(t, e) {
      return this.rawSet.rbSetBodyType(this.handle, t, e);
    }
    isSleeping() {
      return this.rawSet.rbIsSleeping(this.handle);
    }
    isMoving() {
      return this.rawSet.rbIsMoving(this.handle);
    }
    isFixed() {
      return this.rawSet.rbIsFixed(this.handle);
    }
    isKinematic() {
      return this.rawSet.rbIsKinematic(this.handle);
    }
    isDynamic() {
      return this.rawSet.rbIsDynamic(this.handle);
    }
    linearDamping() {
      return this.rawSet.rbLinearDamping(this.handle);
    }
    angularDamping() {
      return this.rawSet.rbAngularDamping(this.handle);
    }
    setLinearDamping(t) {
      this.rawSet.rbSetLinearDamping(this.handle, t);
    }
    recomputeMassPropertiesFromColliders() {
      this.rawSet.rbRecomputeMassPropertiesFromColliders(this.handle, this.colliderSet.raw);
    }
    setAdditionalMass(t, e) {
      this.rawSet.rbSetAdditionalMass(this.handle, t, e);
    }
    setAdditionalMassProperties(t, e, r, a, o) {
      let _ = w.intoRaw(e), d = w.intoRaw(r), h = v.intoRaw(a);
      this.rawSet.rbSetAdditionalMassProperties(this.handle, t, _, d, h, o), _.free(), d.free(), h.free();
    }
    setAngularDamping(t) {
      this.rawSet.rbSetAngularDamping(this.handle, t);
    }
    resetForces(t) {
      this.rawSet.rbResetForces(this.handle, t);
    }
    resetTorques(t) {
      this.rawSet.rbResetTorques(this.handle, t);
    }
    addForce(t, e) {
      const r = w.intoRaw(t);
      this.rawSet.rbAddForce(this.handle, r, e), r.free();
    }
    applyImpulse(t, e) {
      const r = w.intoRaw(t);
      this.rawSet.rbApplyImpulse(this.handle, r, e), r.free();
    }
    addTorque(t, e) {
      const r = w.intoRaw(t);
      this.rawSet.rbAddTorque(this.handle, r, e), r.free();
    }
    applyTorqueImpulse(t, e) {
      const r = w.intoRaw(t);
      this.rawSet.rbApplyTorqueImpulse(this.handle, r, e), r.free();
    }
    addForceAtPoint(t, e, r) {
      const a = w.intoRaw(t), o = w.intoRaw(e);
      this.rawSet.rbAddForceAtPoint(this.handle, a, o, r), a.free(), o.free();
    }
    applyImpulseAtPoint(t, e, r) {
      const a = w.intoRaw(t), o = w.intoRaw(e);
      this.rawSet.rbApplyImpulseAtPoint(this.handle, a, o, r), a.free(), o.free();
    }
    userForce() {
      return w.fromRaw(this.rawSet.rbUserForce(this.handle));
    }
    userTorque() {
      return w.fromRaw(this.rawSet.rbUserTorque(this.handle));
    }
  };
  J = class {
    constructor(t) {
      this.enabled = true, this.status = t, this.translation = w.zeros(), this.rotation = v.identity(), this.gravityScale = 1, this.linvel = w.zeros(), this.mass = 0, this.massOnly = false, this.centerOfMass = w.zeros(), this.translationsEnabledX = true, this.translationsEnabledY = true, this.angvel = w.zeros(), this.principalAngularInertia = w.zeros(), this.angularInertiaLocalFrame = v.identity(), this.translationsEnabledZ = true, this.rotationsEnabledX = true, this.rotationsEnabledY = true, this.rotationsEnabledZ = true, this.linearDamping = 0, this.angularDamping = 0, this.canSleep = true, this.sleeping = false, this.ccdEnabled = false, this.softCcdPrediction = 0, this.dominanceGroup = 0, this.additionalSolverIterations = 0;
    }
    static dynamic() {
      return new J(V.Dynamic);
    }
    static kinematicPositionBased() {
      return new J(V.KinematicPositionBased);
    }
    static kinematicVelocityBased() {
      return new J(V.KinematicVelocityBased);
    }
    static fixed() {
      return new J(V.Fixed);
    }
    static newDynamic() {
      return new J(V.Dynamic);
    }
    static newKinematicPositionBased() {
      return new J(V.KinematicPositionBased);
    }
    static newKinematicVelocityBased() {
      return new J(V.KinematicVelocityBased);
    }
    static newStatic() {
      return new J(V.Fixed);
    }
    setDominanceGroup(t) {
      return this.dominanceGroup = t, this;
    }
    setAdditionalSolverIterations(t) {
      return this.additionalSolverIterations = t, this;
    }
    setEnabled(t) {
      return this.enabled = t, this;
    }
    setTranslation(t, e, r) {
      if (typeof t != "number" || typeof e != "number" || typeof r != "number") throw TypeError("The translation components must be numbers.");
      return this.translation = {
        x: t,
        y: e,
        z: r
      }, this;
    }
    setRotation(t) {
      return v.copy(this.rotation, t), this;
    }
    setGravityScale(t) {
      return this.gravityScale = t, this;
    }
    setAdditionalMass(t) {
      return this.mass = t, this.massOnly = true, this;
    }
    setLinvel(t, e, r) {
      if (typeof t != "number" || typeof e != "number" || typeof r != "number") throw TypeError("The linvel components must be numbers.");
      return this.linvel = {
        x: t,
        y: e,
        z: r
      }, this;
    }
    setAngvel(t) {
      return w.copy(this.angvel, t), this;
    }
    setAdditionalMassProperties(t, e, r, a) {
      return this.mass = t, w.copy(this.centerOfMass, e), w.copy(this.principalAngularInertia, r), v.copy(this.angularInertiaLocalFrame, a), this.massOnly = false, this;
    }
    enabledTranslations(t, e, r) {
      return this.translationsEnabledX = t, this.translationsEnabledY = e, this.translationsEnabledZ = r, this;
    }
    restrictTranslations(t, e, r) {
      return this.enabledTranslations(t, e, r);
    }
    lockTranslations() {
      return this.enabledTranslations(false, false, false);
    }
    enabledRotations(t, e, r) {
      return this.rotationsEnabledX = t, this.rotationsEnabledY = e, this.rotationsEnabledZ = r, this;
    }
    restrictRotations(t, e, r) {
      return this.enabledRotations(t, e, r);
    }
    lockRotations() {
      return this.restrictRotations(false, false, false);
    }
    setLinearDamping(t) {
      return this.linearDamping = t, this;
    }
    setAngularDamping(t) {
      return this.angularDamping = t, this;
    }
    setCanSleep(t) {
      return this.canSleep = t, this;
    }
    setSleeping(t) {
      return this.sleeping = t, this;
    }
    setCcdEnabled(t) {
      return this.ccdEnabled = t, this;
    }
    setSoftCcdPrediction(t) {
      return this.softCcdPrediction = t, this;
    }
    setUserData(t) {
      return this.userData = t, this;
    }
  };
  class Lt {
    constructor() {
      this.fconv = new Float64Array(1), this.uconv = new Uint32Array(this.fconv.buffer), this.data = new Array(), this.size = 0;
    }
    set(t, e) {
      let r = this.index(t);
      for (; this.data.length <= r; ) this.data.push(null);
      this.data[r] == null && (this.size += 1), this.data[r] = e;
    }
    len() {
      return this.size;
    }
    delete(t) {
      let e = this.index(t);
      e < this.data.length && (this.data[e] != null && (this.size -= 1), this.data[e] = null);
    }
    clear() {
      this.data = new Array();
    }
    get(t) {
      let e = this.index(t);
      return e < this.data.length ? this.data[e] : null;
    }
    forEach(t) {
      for (const e of this.data) e != null && t(e);
    }
    getAll() {
      return this.data.filter((t) => t != null);
    }
    index(t) {
      return this.fconv[0] = t, this.uconv[0];
    }
  }
  yr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
    constructor(t) {
      this.raw = t || new E(), this.map = new Lt(), t && t.forEachRigidBodyHandle((e) => {
        this.map.set(e, new oe(t, null, e));
      });
    }
    finalizeDeserialization(t) {
      this.map.forEach((e) => e.finalizeDeserialization(t));
    }
    createRigidBody(t, e) {
      let r = w.intoRaw(e.translation), a = v.intoRaw(e.rotation), o = w.intoRaw(e.linvel), _ = w.intoRaw(e.centerOfMass), d = w.intoRaw(e.angvel), h = w.intoRaw(e.principalAngularInertia), p = v.intoRaw(e.angularInertiaLocalFrame), u = this.raw.createRigidBody(e.enabled, r, a, e.gravityScale, e.mass, e.massOnly, _, o, d, h, p, e.translationsEnabledX, e.translationsEnabledY, e.translationsEnabledZ, e.rotationsEnabledX, e.rotationsEnabledY, e.rotationsEnabledZ, e.linearDamping, e.angularDamping, e.status, e.canSleep, e.sleeping, e.softCcdPrediction, e.ccdEnabled, e.dominanceGroup, e.additionalSolverIterations);
      r.free(), a.free(), o.free(), _.free(), d.free(), h.free(), p.free();
      const g = new oe(this.raw, t, u);
      return g.userData = e.userData, this.map.set(u, g), g;
    }
    remove(t, e, r, a, o) {
      for (let _ = 0; _ < this.raw.rbNumColliders(t); _ += 1) r.unmap(this.raw.rbCollider(t, _));
      a.forEachJointHandleAttachedToRigidBody(t, (_) => a.unmap(_)), o.forEachJointHandleAttachedToRigidBody(t, (_) => o.unmap(_)), this.raw.remove(t, e.raw, r.raw, a.raw, o.raw), this.map.delete(t);
    }
    len() {
      return this.map.len();
    }
    contains(t) {
      return this.get(t) != null;
    }
    get(t) {
      return this.map.get(t);
    }
    forEach(t) {
      this.map.forEach(t);
    }
    forEachActiveRigidBody(t, e) {
      t.forEachActiveRigidBodyHandle((r) => {
        e(this.get(r));
      });
    }
    getAll() {
      return this.map.getAll();
    }
  };
  vr = class {
    constructor(t) {
      this.raw = t || new it();
    }
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    get dt() {
      return this.raw.dt;
    }
    get contact_erp() {
      return this.raw.contact_erp;
    }
    get lengthUnit() {
      return this.raw.lengthUnit;
    }
    get normalizedAllowedLinearError() {
      return this.raw.normalizedAllowedLinearError;
    }
    get normalizedPredictionDistance() {
      return this.raw.normalizedPredictionDistance;
    }
    get numSolverIterations() {
      return this.raw.numSolverIterations;
    }
    get numInternalPgsIterations() {
      return this.raw.numInternalPgsIterations;
    }
    get minIslandSize() {
      return this.raw.minIslandSize;
    }
    get maxCcdSubsteps() {
      return this.raw.maxCcdSubsteps;
    }
    set dt(t) {
      this.raw.dt = t;
    }
    set contact_natural_frequency(t) {
      this.raw.contact_natural_frequency = t;
    }
    set lengthUnit(t) {
      this.raw.lengthUnit = t;
    }
    set normalizedAllowedLinearError(t) {
      this.raw.normalizedAllowedLinearError = t;
    }
    set normalizedPredictionDistance(t) {
      this.raw.normalizedPredictionDistance = t;
    }
    set numSolverIterations(t) {
      this.raw.numSolverIterations = t;
    }
    set numInternalPgsIterations(t) {
      this.raw.numInternalPgsIterations = t;
    }
    set minIslandSize(t) {
      this.raw.minIslandSize = t;
    }
    set maxCcdSubsteps(t) {
      this.raw.maxCcdSubsteps = t;
    }
  };
  (function(s) {
    s[s.Revolute = 0] = "Revolute", s[s.Fixed = 1] = "Fixed", s[s.Prismatic = 2] = "Prismatic", s[s.Rope = 3] = "Rope", s[s.Spring = 4] = "Spring", s[s.Spherical = 5] = "Spherical", s[s.Generic = 6] = "Generic";
  })(N || (N = {}));
  (function(s) {
    s[s.AccelerationBased = 0] = "AccelerationBased", s[s.ForceBased = 1] = "ForceBased";
  })(_e || (_e = {}));
  (function(s) {
    s[s.LinX = 1] = "LinX", s[s.LinY = 2] = "LinY", s[s.LinZ = 4] = "LinZ", s[s.AngX = 8] = "AngX", s[s.AngY = 16] = "AngY", s[s.AngZ = 32] = "AngZ";
  })(ce || (ce = {}));
  X = class {
    constructor(t, e, r) {
      this.rawSet = t, this.bodySet = e, this.handle = r;
    }
    static newTyped(t, e, r) {
      switch (t.jointType(r)) {
        case U.Revolute:
          return new jr(t, e, r);
        case U.Prismatic:
          return new xr(t, e, r);
        case U.Fixed:
          return new Sr(t, e, r);
        case U.Spring:
          return new Cr(t, e, r);
        case U.Rope:
          return new Rr(t, e, r);
        case U.Spherical:
          return new Er(t, e, r);
        case U.Generic:
          return new Ir(t, e, r);
        default:
          return new X(t, e, r);
      }
    }
    finalizeDeserialization(t) {
      this.bodySet = t;
    }
    isValid() {
      return this.rawSet.contains(this.handle);
    }
    body1() {
      return this.bodySet.get(this.rawSet.jointBodyHandle1(this.handle));
    }
    body2() {
      return this.bodySet.get(this.rawSet.jointBodyHandle2(this.handle));
    }
    type() {
      return this.rawSet.jointType(this.handle);
    }
    frameX1() {
      return v.fromRaw(this.rawSet.jointFrameX1(this.handle));
    }
    frameX2() {
      return v.fromRaw(this.rawSet.jointFrameX2(this.handle));
    }
    anchor1() {
      return w.fromRaw(this.rawSet.jointAnchor1(this.handle));
    }
    anchor2() {
      return w.fromRaw(this.rawSet.jointAnchor2(this.handle));
    }
    setAnchor1(t) {
      const e = w.intoRaw(t);
      this.rawSet.jointSetAnchor1(this.handle, e), e.free();
    }
    setAnchor2(t) {
      const e = w.intoRaw(t);
      this.rawSet.jointSetAnchor2(this.handle, e), e.free();
    }
    setContactsEnabled(t) {
      this.rawSet.jointSetContactsEnabled(this.handle, t);
    }
    contactsEnabled() {
      return this.rawSet.jointContactsEnabled(this.handle);
    }
  };
  Re = class extends X {
    limitsEnabled() {
      return this.rawSet.jointLimitsEnabled(this.handle, this.rawAxis());
    }
    limitsMin() {
      return this.rawSet.jointLimitsMin(this.handle, this.rawAxis());
    }
    limitsMax() {
      return this.rawSet.jointLimitsMax(this.handle, this.rawAxis());
    }
    setLimits(t, e) {
      this.rawSet.jointSetLimits(this.handle, this.rawAxis(), t, e);
    }
    configureMotorModel(t) {
      this.rawSet.jointConfigureMotorModel(this.handle, this.rawAxis(), t);
    }
    configureMotorVelocity(t, e) {
      this.rawSet.jointConfigureMotorVelocity(this.handle, this.rawAxis(), t, e);
    }
    configureMotorPosition(t, e, r) {
      this.rawSet.jointConfigureMotorPosition(this.handle, this.rawAxis(), t, e, r);
    }
    configureMotor(t, e, r, a) {
      this.rawSet.jointConfigureMotor(this.handle, this.rawAxis(), t, e, r, a);
    }
  };
  Sr = class extends X {
  };
  Rr = class extends X {
  };
  Cr = class extends X {
  };
  xr = class extends Re {
    rawAxis() {
      return Ft.LinX;
    }
  };
  jr = class extends Re {
    rawAxis() {
      return Ft.AngX;
    }
  };
  Ir = class extends X {
  };
  Er = class extends X {
  };
  q = class {
    constructor() {
    }
    static fixed(t, e, r, a) {
      let o = new q();
      return o.anchor1 = t, o.anchor2 = r, o.frame1 = e, o.frame2 = a, o.jointType = N.Fixed, o;
    }
    static spring(t, e, r, a, o) {
      let _ = new q();
      return _.anchor1 = a, _.anchor2 = o, _.length = t, _.stiffness = e, _.damping = r, _.jointType = N.Spring, _;
    }
    static rope(t, e, r) {
      let a = new q();
      return a.anchor1 = e, a.anchor2 = r, a.length = t, a.jointType = N.Rope, a;
    }
    static generic(t, e, r, a) {
      let o = new q();
      return o.anchor1 = t, o.anchor2 = e, o.axis = r, o.axesMask = a, o.jointType = N.Generic, o;
    }
    static spherical(t, e) {
      let r = new q();
      return r.anchor1 = t, r.anchor2 = e, r.jointType = N.Spherical, r;
    }
    static prismatic(t, e, r) {
      let a = new q();
      return a.anchor1 = t, a.anchor2 = e, a.axis = r, a.jointType = N.Prismatic, a;
    }
    static revolute(t, e, r) {
      let a = new q();
      return a.anchor1 = t, a.anchor2 = e, a.axis = r, a.jointType = N.Revolute, a;
    }
    intoRaw() {
      let t = w.intoRaw(this.anchor1), e = w.intoRaw(this.anchor2), r, a, o = false, _ = 0, d = 0;
      switch (this.jointType) {
        case N.Fixed:
          let h = v.intoRaw(this.frame1), p = v.intoRaw(this.frame2);
          a = L.fixed(t, h, e, p), h.free(), p.free();
          break;
        case N.Spring:
          a = L.spring(this.length, this.stiffness, this.damping, t, e);
          break;
        case N.Rope:
          a = L.rope(this.length, t, e);
          break;
        case N.Prismatic:
          r = w.intoRaw(this.axis), this.limitsEnabled && (o = true, _ = this.limits[0], d = this.limits[1]), a = L.prismatic(t, e, r, o, _, d), r.free();
          break;
        case N.Generic:
          r = w.intoRaw(this.axis);
          let u = this.axesMask;
          a = L.generic(t, e, r, u);
          break;
        case N.Spherical:
          a = L.spherical(t, e);
          break;
        case N.Revolute:
          r = w.intoRaw(this.axis), a = L.revolute(t, e, r), r.free();
          break;
      }
      return t.free(), e.free(), a;
    }
  };
  Ar = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
    constructor(t) {
      this.raw = t || new Y(), this.map = new Lt(), t && t.forEachJointHandle((e) => {
        this.map.set(e, X.newTyped(t, null, e));
      });
    }
    finalizeDeserialization(t) {
      this.map.forEach((e) => e.finalizeDeserialization(t));
    }
    createJoint(t, e, r, a, o) {
      const _ = e.intoRaw(), d = this.raw.createJoint(_, r, a, o);
      _.free();
      let h = X.newTyped(this.raw, t, d);
      return this.map.set(d, h), h;
    }
    remove(t, e) {
      this.raw.remove(t, e), this.unmap(t);
    }
    forEachJointHandleAttachedToRigidBody(t, e) {
      this.raw.forEachJointAttachedToRigidBody(t, e);
    }
    unmap(t) {
      this.map.delete(t);
    }
    len() {
      return this.map.len();
    }
    contains(t) {
      return this.get(t) != null;
    }
    get(t) {
      return this.map.get(t);
    }
    forEach(t) {
      this.map.forEach(t);
    }
    getAll() {
      return this.map.getAll();
    }
  };
  et = class {
    constructor(t, e) {
      this.rawSet = t, this.handle = e;
    }
    static newTyped(t, e) {
      switch (t.jointType(e)) {
        case U.Revolute:
          return new Fr(t, e);
        case U.Prismatic:
          return new zr(t, e);
        case U.Fixed:
          return new Pr(t, e);
        case U.Spherical:
          return new Tr(t, e);
        default:
          return new et(t, e);
      }
    }
    isValid() {
      return this.rawSet.contains(this.handle);
    }
    setContactsEnabled(t) {
      this.rawSet.jointSetContactsEnabled(this.handle, t);
    }
    contactsEnabled() {
      return this.rawSet.jointContactsEnabled(this.handle);
    }
  };
  Ce = class extends et {
  };
  Pr = class extends et {
  };
  zr = class extends Ce {
    rawAxis() {
      return Ft.LinX;
    }
  };
  Fr = class extends Ce {
    rawAxis() {
      return Ft.AngX;
    }
  };
  Tr = class extends et {
  };
  Mr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
    constructor(t) {
      this.raw = t || new $(), this.map = new Lt(), t && t.forEachJointHandle((e) => {
        this.map.set(e, et.newTyped(this.raw, e));
      });
    }
    createJoint(t, e, r, a) {
      const o = t.intoRaw(), _ = this.raw.createJoint(o, e, r, a);
      o.free();
      let d = et.newTyped(this.raw, _);
      return this.map.set(_, d), d;
    }
    remove(t, e) {
      this.raw.remove(t, e), this.map.delete(t);
    }
    unmap(t) {
      this.map.delete(t);
    }
    len() {
      return this.map.len();
    }
    contains(t) {
      return this.get(t) != null;
    }
    get(t) {
      return this.map.get(t);
    }
    forEach(t) {
      this.map.forEach(t);
    }
    forEachJointHandleAttachedToRigidBody(t, e) {
      this.raw.forEachJointAttachedToRigidBody(t, e);
    }
    getAll() {
      return this.map.getAll();
    }
  };
  (function(s) {
    s[s.Average = 0] = "Average", s[s.Min = 1] = "Min", s[s.Multiply = 2] = "Multiply", s[s.Max = 3] = "Max";
  })(ht || (ht = {}));
  kr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t || new ne();
    }
  };
  Hr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t || new Z();
    }
    forEachActiveRigidBodyHandle(t) {
      this.raw.forEachActiveRigidBodyHandle(t);
    }
  };
  (function(s) {
    s[s.Vertex = 0] = "Vertex", s[s.Edge = 1] = "Edge", s[s.Face = 2] = "Face", s[s.Unknown = 3] = "Unknown";
  })(at || (at = {}));
  Xh = class {
    constructor(t, e) {
      this.origin = t, this.dir = e;
    }
    pointAt(t) {
      return {
        x: this.origin.x + this.dir.x * t,
        y: this.origin.y + this.dir.y * t,
        z: this.origin.z + this.dir.z * t
      };
    }
  };
  gt = class {
    constructor(t, e, r, a) {
      this.featureType = at.Unknown, this.featureId = void 0, this.timeOfImpact = t, this.normal = e, a !== void 0 && (this.featureId = a), r !== void 0 && (this.featureType = r);
    }
    static fromRaw(t) {
      if (!t) return null;
      const e = new gt(t.time_of_impact(), w.fromRaw(t.normal()), t.featureType(), t.featureId());
      return t.free(), e;
    }
  };
  pt = class {
    constructor(t, e, r, a, o) {
      this.featureType = at.Unknown, this.featureId = void 0, this.collider = t, this.timeOfImpact = e, this.normal = r, o !== void 0 && (this.featureId = o), a !== void 0 && (this.featureType = a);
    }
    static fromRaw(t, e) {
      if (!e) return null;
      const r = new pt(t.get(e.colliderHandle()), e.time_of_impact(), w.fromRaw(e.normal()), e.featureType(), e.featureId());
      return e.free(), r;
    }
  };
  Nt = class {
    constructor(t, e) {
      this.collider = t, this.timeOfImpact = e;
    }
    static fromRaw(t, e) {
      if (!e) return null;
      const r = new Nt(t.get(e.colliderHandle()), e.timeOfImpact());
      return e.free(), r;
    }
  };
  bt = class {
    constructor(t, e) {
      this.point = t, this.isInside = e;
    }
    static fromRaw(t) {
      if (!t) return null;
      const e = new bt(w.fromRaw(t.point()), t.isInside());
      return t.free(), e;
    }
  };
  ut = class {
    constructor(t, e, r, a, o) {
      this.featureType = at.Unknown, this.featureId = void 0, this.collider = t, this.point = e, this.isInside = r, o !== void 0 && (this.featureId = o), a !== void 0 && (this.featureType = a);
    }
    static fromRaw(t, e) {
      if (!e) return null;
      const r = new ut(t.get(e.colliderHandle()), w.fromRaw(e.point()), e.isInside(), e.featureType(), e.featureId());
      return e.free(), r;
    }
  };
  ot = class {
    constructor(t, e, r, a, o) {
      this.time_of_impact = t, this.witness1 = e, this.witness2 = r, this.normal1 = a, this.normal2 = o;
    }
    static fromRaw(t, e) {
      if (!e) return null;
      const r = new ot(e.time_of_impact(), w.fromRaw(e.witness1()), w.fromRaw(e.witness2()), w.fromRaw(e.normal1()), w.fromRaw(e.normal2()));
      return e.free(), r;
    }
  };
  mt = class extends ot {
    constructor(t, e, r, a, o, _) {
      super(e, r, a, o, _), this.collider = t;
    }
    static fromRaw(t, e) {
      if (!e) return null;
      const r = new mt(t.get(e.colliderHandle()), e.time_of_impact(), w.fromRaw(e.witness1()), w.fromRaw(e.witness2()), w.fromRaw(e.normal1()), w.fromRaw(e.normal2()));
      return e.free(), r;
    }
  };
  Dr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t || new K();
    }
    castRay(t, e, r, a, o, _, d, h, p, u, g) {
      let b = w.intoRaw(a.origin), m = w.intoRaw(a.dir), C = Nt.fromRaw(r, this.raw.castRay(t.raw, e.raw, r.raw, b, m, o, _, d, h, p, u, g));
      return b.free(), m.free(), C;
    }
    castRayAndGetNormal(t, e, r, a, o, _, d, h, p, u, g) {
      let b = w.intoRaw(a.origin), m = w.intoRaw(a.dir), C = pt.fromRaw(r, this.raw.castRayAndGetNormal(t.raw, e.raw, r.raw, b, m, o, _, d, h, p, u, g));
      return b.free(), m.free(), C;
    }
    intersectionsWithRay(t, e, r, a, o, _, d, h, p, u, g, b) {
      let m = w.intoRaw(a.origin), C = w.intoRaw(a.dir), H = (G) => d(pt.fromRaw(r, G));
      this.raw.intersectionsWithRay(t.raw, e.raw, r.raw, m, C, o, _, H, h, p, u, g, b), m.free(), C.free();
    }
    intersectionWithShape(t, e, r, a, o, _, d, h, p, u, g) {
      let b = w.intoRaw(a), m = v.intoRaw(o), C = _.intoRaw(), H = this.raw.intersectionWithShape(t.raw, e.raw, r.raw, b, m, C, d, h, p, u, g);
      return b.free(), m.free(), C.free(), H;
    }
    projectPoint(t, e, r, a, o, _, d, h, p, u) {
      let g = w.intoRaw(a), b = ut.fromRaw(r, this.raw.projectPoint(t.raw, e.raw, r.raw, g, o, _, d, h, p, u));
      return g.free(), b;
    }
    projectPointAndGetFeature(t, e, r, a, o, _, d, h, p) {
      let u = w.intoRaw(a), g = ut.fromRaw(r, this.raw.projectPointAndGetFeature(t.raw, e.raw, r.raw, u, o, _, d, h, p));
      return u.free(), g;
    }
    intersectionsWithPoint(t, e, r, a, o, _, d, h, p, u) {
      let g = w.intoRaw(a);
      this.raw.intersectionsWithPoint(t.raw, e.raw, r.raw, g, o, _, d, h, p, u), g.free();
    }
    castShape(t, e, r, a, o, _, d, h, p, u, g, b, m, C, H) {
      let G = w.intoRaw(a), B = v.intoRaw(o), O = w.intoRaw(_), Q = d.intoRaw(), _t = mt.fromRaw(r, this.raw.castShape(t.raw, e.raw, r.raw, G, B, O, Q, h, p, u, g, b, m, C, H));
      return G.free(), B.free(), O.free(), Q.free(), _t;
    }
    intersectionsWithShape(t, e, r, a, o, _, d, h, p, u, g, b) {
      let m = w.intoRaw(a), C = v.intoRaw(o), H = _.intoRaw();
      this.raw.intersectionsWithShape(t.raw, e.raw, r.raw, m, C, H, d, h, p, u, g, b), m.free(), C.free(), H.free();
    }
    collidersWithAabbIntersectingAabb(t, e, r, a, o, _) {
      let d = w.intoRaw(a), h = w.intoRaw(o);
      this.raw.collidersWithAabbIntersectingAabb(t.raw, e.raw, r.raw, d, h, _), d.free(), h.free();
    }
  };
  Lr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t || new M(), this.tempManifold = new Nr(null);
    }
    contactPairsWith(t, e) {
      this.raw.contact_pairs_with(t, e);
    }
    intersectionPairsWith(t, e) {
      this.raw.intersection_pairs_with(t, e);
    }
    contactPair(t, e, r) {
      const a = this.raw.contact_pair(t, e);
      if (a) {
        const o = a.collider1() != t;
        let _;
        for (_ = 0; _ < a.numContactManifolds(); ++_) this.tempManifold.raw = a.contactManifold(_), this.tempManifold.raw && r(this.tempManifold, o), this.tempManifold.free();
        a.free();
      }
    }
    intersectionPair(t, e) {
      return this.raw.intersection_pair(t, e);
    }
  };
  Nr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t;
    }
    normal() {
      return w.fromRaw(this.raw.normal());
    }
    localNormal1() {
      return w.fromRaw(this.raw.local_n1());
    }
    localNormal2() {
      return w.fromRaw(this.raw.local_n2());
    }
    subshape1() {
      return this.raw.subshape1();
    }
    subshape2() {
      return this.raw.subshape2();
    }
    numContacts() {
      return this.raw.num_contacts();
    }
    localContactPoint1(t) {
      return w.fromRaw(this.raw.contact_local_p1(t));
    }
    localContactPoint2(t) {
      return w.fromRaw(this.raw.contact_local_p2(t));
    }
    contactDist(t) {
      return this.raw.contact_dist(t);
    }
    contactFid1(t) {
      return this.raw.contact_fid1(t);
    }
    contactFid2(t) {
      return this.raw.contact_fid2(t);
    }
    contactImpulse(t) {
      return this.raw.contact_impulse(t);
    }
    contactTangentImpulseX(t) {
      return this.raw.contact_tangent_impulse_x(t);
    }
    contactTangentImpulseY(t) {
      return this.raw.contact_tangent_impulse_y(t);
    }
    numSolverContacts() {
      return this.raw.num_solver_contacts();
    }
    solverContactPoint(t) {
      return w.fromRaw(this.raw.solver_contact_point(t));
    }
    solverContactDist(t) {
      return this.raw.solver_contact_dist(t);
    }
    solverContactFriction(t) {
      return this.raw.solver_contact_friction(t);
    }
    solverContactRestitution(t) {
      return this.raw.solver_contact_restitution(t);
    }
    solverContactTangentVelocity(t) {
      return w.fromRaw(this.raw.solver_contact_tangent_velocity(t));
    }
  };
  st = class {
    constructor(t, e, r, a, o) {
      this.distance = t, this.point1 = e, this.point2 = r, this.normal1 = a, this.normal2 = o;
    }
    static fromRaw(t) {
      if (!t) return null;
      const e = new st(t.distance(), w.fromRaw(t.point1()), w.fromRaw(t.point2()), w.fromRaw(t.normal1()), w.fromRaw(t.normal2()));
      return t.free(), e;
    }
  };
  k = class {
    static fromRaw(t, e) {
      const r = t.coShapeType(e);
      let a, o, _, d, h, p, u;
      switch (r) {
        case D.Ball:
          return new xe(t.coRadius(e));
        case D.Cuboid:
          return a = t.coHalfExtents(e), new je(a.x, a.y, a.z);
        case D.RoundCuboid:
          return a = t.coHalfExtents(e), o = t.coRoundRadius(e), new Ie(a.x, a.y, a.z, o);
        case D.Capsule:
          return h = t.coHalfHeight(e), p = t.coRadius(e), new Ee(h, p);
        case D.Segment:
          return _ = t.coVertices(e), new Ae(w.new(_[0], _[1], _[2]), w.new(_[3], _[4], _[5]));
        case D.Polyline:
          return _ = t.coVertices(e), d = t.coIndices(e), new Fe(_, d);
        case D.Triangle:
          return _ = t.coVertices(e), new Pe(w.new(_[0], _[1], _[2]), w.new(_[3], _[4], _[5]), w.new(_[6], _[7], _[8]));
        case D.RoundTriangle:
          return _ = t.coVertices(e), o = t.coRoundRadius(e), new ze(w.new(_[0], _[1], _[2]), w.new(_[3], _[4], _[5]), w.new(_[6], _[7], _[8]), o);
        case D.HalfSpace:
          return u = w.fromRaw(t.coHalfspaceNormal(e)), new Gr(u);
        case D.Voxels:
          const g = t.coVoxelData(e), b = t.coVoxelSize(e);
          return new Te(g, b);
        case D.TriMesh:
          _ = t.coVertices(e), d = t.coIndices(e);
          const m = t.coTriMeshFlags(e);
          return new Me(_, d, m);
        case D.HeightField:
          const C = t.coHeightfieldScale(e), H = t.coHeightfieldHeights(e), G = t.coHeightfieldNRows(e), B = t.coHeightfieldNCols(e), O = t.coHeightFieldFlags(e);
          return new ke(G, B, H, C, O);
        case D.ConvexPolyhedron:
          return _ = t.coVertices(e), d = t.coIndices(e), new jt(_, d);
        case D.RoundConvexPolyhedron:
          return _ = t.coVertices(e), d = t.coIndices(e), o = t.coRoundRadius(e), new It(_, d, o);
        case D.Cylinder:
          return h = t.coHalfHeight(e), p = t.coRadius(e), new He(h, p);
        case D.RoundCylinder:
          return h = t.coHalfHeight(e), p = t.coRadius(e), o = t.coRoundRadius(e), new De(h, p, o);
        case D.Cone:
          return h = t.coHalfHeight(e), p = t.coRadius(e), new Le(h, p);
        case D.RoundCone:
          return h = t.coHalfHeight(e), p = t.coRadius(e), o = t.coRoundRadius(e), new Ne(h, p, o);
        default:
          throw new Error("unknown shape type: " + r);
      }
    }
    castShape(t, e, r, a, o, _, d, h, p, u) {
      let g = w.intoRaw(t), b = v.intoRaw(e), m = w.intoRaw(r), C = w.intoRaw(o), H = v.intoRaw(_), G = w.intoRaw(d), B = this.intoRaw(), O = a.intoRaw(), Q = ot.fromRaw(null, B.castShape(g, b, m, O, C, H, G, h, p, u));
      return g.free(), b.free(), m.free(), C.free(), H.free(), G.free(), B.free(), O.free(), Q;
    }
    intersectsShape(t, e, r, a, o) {
      let _ = w.intoRaw(t), d = v.intoRaw(e), h = w.intoRaw(a), p = v.intoRaw(o), u = this.intoRaw(), g = r.intoRaw(), b = u.intersectsShape(_, d, g, h, p);
      return _.free(), d.free(), h.free(), p.free(), u.free(), g.free(), b;
    }
    contactShape(t, e, r, a, o, _) {
      let d = w.intoRaw(t), h = v.intoRaw(e), p = w.intoRaw(a), u = v.intoRaw(o), g = this.intoRaw(), b = r.intoRaw(), m = st.fromRaw(g.contactShape(d, h, b, p, u, _));
      return d.free(), h.free(), p.free(), u.free(), g.free(), b.free(), m;
    }
    containsPoint(t, e, r) {
      let a = w.intoRaw(t), o = v.intoRaw(e), _ = w.intoRaw(r), d = this.intoRaw(), h = d.containsPoint(a, o, _);
      return a.free(), o.free(), _.free(), d.free(), h;
    }
    projectPoint(t, e, r, a) {
      let o = w.intoRaw(t), _ = v.intoRaw(e), d = w.intoRaw(r), h = this.intoRaw(), p = bt.fromRaw(h.projectPoint(o, _, d, a));
      return o.free(), _.free(), d.free(), h.free(), p;
    }
    intersectsRay(t, e, r, a) {
      let o = w.intoRaw(e), _ = v.intoRaw(r), d = w.intoRaw(t.origin), h = w.intoRaw(t.dir), p = this.intoRaw(), u = p.intersectsRay(o, _, d, h, a);
      return o.free(), _.free(), d.free(), h.free(), p.free(), u;
    }
    castRay(t, e, r, a, o) {
      let _ = w.intoRaw(e), d = v.intoRaw(r), h = w.intoRaw(t.origin), p = w.intoRaw(t.dir), u = this.intoRaw(), g = u.castRay(_, d, h, p, a, o);
      return _.free(), d.free(), h.free(), p.free(), u.free(), g;
    }
    castRayAndGetNormal(t, e, r, a, o) {
      let _ = w.intoRaw(e), d = v.intoRaw(r), h = w.intoRaw(t.origin), p = w.intoRaw(t.dir), u = this.intoRaw(), g = gt.fromRaw(u.castRayAndGetNormal(_, d, h, p, a, o));
      return _.free(), d.free(), h.free(), p.free(), u.free(), g;
    }
  };
  (function(s) {
    s[s.Ball = 0] = "Ball", s[s.Cuboid = 1] = "Cuboid", s[s.Capsule = 2] = "Capsule", s[s.Segment = 3] = "Segment", s[s.Polyline = 4] = "Polyline", s[s.Triangle = 5] = "Triangle", s[s.TriMesh = 6] = "TriMesh", s[s.HeightField = 7] = "HeightField", s[s.ConvexPolyhedron = 9] = "ConvexPolyhedron", s[s.Cylinder = 10] = "Cylinder", s[s.Cone = 11] = "Cone", s[s.RoundCuboid = 12] = "RoundCuboid", s[s.RoundTriangle = 13] = "RoundTriangle", s[s.RoundCylinder = 14] = "RoundCylinder", s[s.RoundCone = 15] = "RoundCone", s[s.RoundConvexPolyhedron = 16] = "RoundConvexPolyhedron", s[s.HalfSpace = 17] = "HalfSpace", s[s.Voxels = 18] = "Voxels";
  })(F || (F = {}));
  (function(s) {
    s[s.FIX_INTERNAL_EDGES = 1] = "FIX_INTERNAL_EDGES";
  })(le || (le = {}));
  (function(s) {
    s[s.DELETE_BAD_TOPOLOGY_TRIANGLES = 4] = "DELETE_BAD_TOPOLOGY_TRIANGLES", s[s.ORIENTED = 8] = "ORIENTED", s[s.MERGE_DUPLICATE_VERTICES = 16] = "MERGE_DUPLICATE_VERTICES", s[s.DELETE_DEGENERATE_TRIANGLES = 32] = "DELETE_DEGENERATE_TRIANGLES", s[s.DELETE_DUPLICATE_TRIANGLES = 64] = "DELETE_DUPLICATE_TRIANGLES", s[s.FIX_INTERNAL_EDGES = 144] = "FIX_INTERNAL_EDGES";
  })(we || (we = {}));
  xe = class extends k {
    constructor(t) {
      super(), this.type = F.Ball, this.radius = t;
    }
    intoRaw() {
      return f.ball(this.radius);
    }
  };
  Gr = class extends k {
    constructor(t) {
      super(), this.type = F.HalfSpace, this.normal = t;
    }
    intoRaw() {
      let t = w.intoRaw(this.normal), e = f.halfspace(t);
      return t.free(), e;
    }
  };
  je = class extends k {
    constructor(t, e, r) {
      super(), this.type = F.Cuboid, this.halfExtents = w.new(t, e, r);
    }
    intoRaw() {
      return f.cuboid(this.halfExtents.x, this.halfExtents.y, this.halfExtents.z);
    }
  };
  Ie = class extends k {
    constructor(t, e, r, a) {
      super(), this.type = F.RoundCuboid, this.halfExtents = w.new(t, e, r), this.borderRadius = a;
    }
    intoRaw() {
      return f.roundCuboid(this.halfExtents.x, this.halfExtents.y, this.halfExtents.z, this.borderRadius);
    }
  };
  Ee = class extends k {
    constructor(t, e) {
      super(), this.type = F.Capsule, this.halfHeight = t, this.radius = e;
    }
    intoRaw() {
      return f.capsule(this.halfHeight, this.radius);
    }
  };
  Ae = class extends k {
    constructor(t, e) {
      super(), this.type = F.Segment, this.a = t, this.b = e;
    }
    intoRaw() {
      let t = w.intoRaw(this.a), e = w.intoRaw(this.b), r = f.segment(t, e);
      return t.free(), e.free(), r;
    }
  };
  Pe = class extends k {
    constructor(t, e, r) {
      super(), this.type = F.Triangle, this.a = t, this.b = e, this.c = r;
    }
    intoRaw() {
      let t = w.intoRaw(this.a), e = w.intoRaw(this.b), r = w.intoRaw(this.c), a = f.triangle(t, e, r);
      return t.free(), e.free(), r.free(), a;
    }
  };
  ze = class extends k {
    constructor(t, e, r, a) {
      super(), this.type = F.RoundTriangle, this.a = t, this.b = e, this.c = r, this.borderRadius = a;
    }
    intoRaw() {
      let t = w.intoRaw(this.a), e = w.intoRaw(this.b), r = w.intoRaw(this.c), a = f.roundTriangle(t, e, r, this.borderRadius);
      return t.free(), e.free(), r.free(), a;
    }
  };
  Fe = class extends k {
    constructor(t, e) {
      super(), this.type = F.Polyline, this.vertices = t, this.indices = e ?? new Uint32Array(0);
    }
    intoRaw() {
      return f.polyline(this.vertices, this.indices);
    }
  };
  Te = class extends k {
    constructor(t, e) {
      super(), this.type = F.Voxels, this.data = t, this.voxelSize = e;
    }
    intoRaw() {
      let t = w.intoRaw(this.voxelSize), e;
      return this.data instanceof Int32Array ? e = f.voxels(t, this.data) : e = f.voxelsFromPoints(t, this.data), t.free(), e;
    }
  };
  Me = class extends k {
    constructor(t, e, r) {
      super(), this.type = F.TriMesh, this.vertices = t, this.indices = e, this.flags = r;
    }
    intoRaw() {
      return f.trimesh(this.vertices, this.indices, this.flags);
    }
  };
  jt = class extends k {
    constructor(t, e) {
      super(), this.type = F.ConvexPolyhedron, this.vertices = t, this.indices = e;
    }
    intoRaw() {
      return this.indices ? f.convexMesh(this.vertices, this.indices) : f.convexHull(this.vertices);
    }
  };
  It = class extends k {
    constructor(t, e, r) {
      super(), this.type = F.RoundConvexPolyhedron, this.vertices = t, this.indices = e, this.borderRadius = r;
    }
    intoRaw() {
      return this.indices ? f.roundConvexMesh(this.vertices, this.indices, this.borderRadius) : f.roundConvexHull(this.vertices, this.borderRadius);
    }
  };
  ke = class extends k {
    constructor(t, e, r, a, o) {
      super(), this.type = F.HeightField, this.nrows = t, this.ncols = e, this.heights = r, this.scale = a, this.flags = o;
    }
    intoRaw() {
      let t = w.intoRaw(this.scale), e = f.heightfield(this.nrows, this.ncols, this.heights, t, this.flags);
      return t.free(), e;
    }
  };
  He = class extends k {
    constructor(t, e) {
      super(), this.type = F.Cylinder, this.halfHeight = t, this.radius = e;
    }
    intoRaw() {
      return f.cylinder(this.halfHeight, this.radius);
    }
  };
  De = class extends k {
    constructor(t, e, r) {
      super(), this.type = F.RoundCylinder, this.borderRadius = r, this.halfHeight = t, this.radius = e;
    }
    intoRaw() {
      return f.roundCylinder(this.halfHeight, this.radius, this.borderRadius);
    }
  };
  Le = class extends k {
    constructor(t, e) {
      super(), this.type = F.Cone, this.halfHeight = t, this.radius = e;
    }
    intoRaw() {
      return f.cone(this.halfHeight, this.radius);
    }
  };
  Ne = class extends k {
    constructor(t, e, r) {
      super(), this.type = F.RoundCone, this.halfHeight = t, this.radius = e, this.borderRadius = r;
    }
    intoRaw() {
      return f.roundCone(this.halfHeight, this.radius, this.borderRadius);
    }
  };
  Wr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t || new li();
    }
    step(t, e, r, a, o, _, d, h, p, u, g, b) {
      let m = w.intoRaw(t);
      g ? this.raw.stepWithEvents(m, e.raw, r.raw, a.raw, o.raw, _.raw, d.raw, h.raw, p.raw, u.raw, g.raw, b, b ? b.filterContactPair : null, b ? b.filterIntersectionPair : null) : this.raw.step(m, e.raw, r.raw, a.raw, o.raw, _.raw, d.raw, h.raw, p.raw, u.raw), m.free();
    }
  };
  de = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    constructor(t) {
      this.raw = t || new di();
    }
    serializeAll(t, e, r, a, o, _, d, h, p) {
      let u = w.intoRaw(t);
      const g = this.raw.serializeAll(u, e.raw, r.raw, a.raw, o.raw, _.raw, d.raw, h.raw, p.raw);
      return u.free(), g;
    }
    deserializeAll(t) {
      return Gt.fromRaw(this.raw.deserializeAll(t));
    }
  };
  Br = class {
    constructor(t, e) {
      this.vertices = t, this.colors = e;
    }
  };
  Or = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0, this.vertices = void 0, this.colors = void 0;
    }
    constructor(t) {
      this.raw = t || new oi();
    }
    render(t, e, r, a, o, _, d) {
      this.raw.render(t.raw, e.raw, r.raw, a.raw, o.raw, _, e.castClosure(d)), this.vertices = this.raw.vertices(), this.colors = this.raw.colors();
    }
  };
  Vr = class {
  };
  Ur = class {
    constructor(t, e, r, a, o, _) {
      this.params = e, this.bodies = o, this.colliders = _, this.broadPhase = r, this.narrowPhase = a, this.raw = new ci(t), this.rawCharacterCollision = new gr(), this._applyImpulsesToDynamicBodies = false, this._characterMass = null;
    }
    free() {
      this.raw && (this.raw.free(), this.rawCharacterCollision.free()), this.raw = void 0, this.rawCharacterCollision = void 0;
    }
    up() {
      return this.raw.up();
    }
    setUp(t) {
      let e = w.intoRaw(t);
      return this.raw.setUp(e);
    }
    applyImpulsesToDynamicBodies() {
      return this._applyImpulsesToDynamicBodies;
    }
    setApplyImpulsesToDynamicBodies(t) {
      this._applyImpulsesToDynamicBodies = t;
    }
    characterMass() {
      return this._characterMass;
    }
    setCharacterMass(t) {
      this._characterMass = t;
    }
    offset() {
      return this.raw.offset();
    }
    setOffset(t) {
      this.raw.setOffset(t);
    }
    normalNudgeFactor() {
      return this.raw.normalNudgeFactor();
    }
    setNormalNudgeFactor(t) {
      this.raw.setNormalNudgeFactor(t);
    }
    slideEnabled() {
      return this.raw.slideEnabled();
    }
    setSlideEnabled(t) {
      this.raw.setSlideEnabled(t);
    }
    autostepMaxHeight() {
      return this.raw.autostepMaxHeight();
    }
    autostepMinWidth() {
      return this.raw.autostepMinWidth();
    }
    autostepIncludesDynamicBodies() {
      return this.raw.autostepIncludesDynamicBodies();
    }
    autostepEnabled() {
      return this.raw.autostepEnabled();
    }
    enableAutostep(t, e, r) {
      this.raw.enableAutostep(t, e, r);
    }
    disableAutostep() {
      return this.raw.disableAutostep();
    }
    maxSlopeClimbAngle() {
      return this.raw.maxSlopeClimbAngle();
    }
    setMaxSlopeClimbAngle(t) {
      this.raw.setMaxSlopeClimbAngle(t);
    }
    minSlopeSlideAngle() {
      return this.raw.minSlopeSlideAngle();
    }
    setMinSlopeSlideAngle(t) {
      this.raw.setMinSlopeSlideAngle(t);
    }
    snapToGroundDistance() {
      return this.raw.snapToGroundDistance();
    }
    enableSnapToGround(t) {
      this.raw.enableSnapToGround(t);
    }
    disableSnapToGround() {
      this.raw.disableSnapToGround();
    }
    snapToGroundEnabled() {
      return this.raw.snapToGroundEnabled();
    }
    computeColliderMovement(t, e, r, a, o) {
      let _ = w.intoRaw(e);
      this.raw.computeColliderMovement(this.params.dt, this.broadPhase.raw, this.narrowPhase.raw, this.bodies.raw, this.colliders.raw, t.handle, _, this._applyImpulsesToDynamicBodies, this._characterMass, r, a, this.colliders.castClosure(o)), _.free();
    }
    computedMovement() {
      return w.fromRaw(this.raw.computedMovement());
    }
    computedGrounded() {
      return this.raw.computedGrounded();
    }
    numComputedCollisions() {
      return this.raw.numComputedCollisions();
    }
    computedCollision(t, e) {
      if (this.raw.computedCollision(t, this.rawCharacterCollision)) {
        let r = this.rawCharacterCollision;
        return e = e ?? new Vr(), e.translationDeltaApplied = w.fromRaw(r.translationDeltaApplied()), e.translationDeltaRemaining = w.fromRaw(r.translationDeltaRemaining()), e.toi = r.toi(), e.witness1 = w.fromRaw(r.worldWitness1()), e.witness2 = w.fromRaw(r.worldWitness2()), e.normal1 = w.fromRaw(r.worldNormal1()), e.normal2 = w.fromRaw(r.worldNormal2()), e.collider = this.colliders.get(r.handle()), e;
      } else return null;
    }
  };
  (function(s) {
    s[s.None = 0] = "None", s[s.LinX = 1] = "LinX", s[s.LinY = 2] = "LinY", s[s.LinZ = 4] = "LinZ", s[s.AngX = 8] = "AngX", s[s.AngY = 16] = "AngY", s[s.AngZ = 32] = "AngZ", s[s.AllLin = 7] = "AllLin", s[s.AllAng = 56] = "AllAng", s[s.All = 63] = "All";
  })(he || (he = {}));
  Xr = class {
    constructor(t, e, r, a, o, _) {
      this.params = t, this.bodies = e, this.raw = new wi(r, a, o, _);
    }
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    setKp(t, e) {
      this.raw.set_kp(t, e);
    }
    setKi(t, e) {
      this.raw.set_kp(t, e);
    }
    setKd(t, e) {
      this.raw.set_kp(t, e);
    }
    setAxes(t) {
      this.raw.set_axes_mask(t);
    }
    resetIntegrals() {
      this.raw.reset_integrals();
    }
    applyLinearCorrection(t, e, r) {
      let a = w.intoRaw(e), o = w.intoRaw(r);
      this.raw.apply_linear_correction(this.params.dt, this.bodies.raw, t.handle, a, o), a.free(), o.free();
    }
    applyAngularCorrection(t, e, r) {
      let a = v.intoRaw(e), o = w.intoRaw(r);
      this.raw.apply_angular_correction(this.params.dt, this.bodies.raw, t.handle, a, o), a.free(), o.free();
    }
    linearCorrection(t, e, r) {
      let a = w.intoRaw(e), o = w.intoRaw(r), _ = this.raw.linear_correction(this.params.dt, this.bodies.raw, t.handle, a, o);
      return a.free(), o.free(), w.fromRaw(_);
    }
    angularCorrection(t, e, r) {
      let a = v.intoRaw(e), o = w.intoRaw(r), _ = this.raw.angular_correction(this.params.dt, this.bodies.raw, t.handle, a, o);
      return a.free(), o.free(), w.fromRaw(_);
    }
  };
  Jr = class {
    constructor(t, e, r, a, o) {
      this.raw = new _i(t.handle), this.broadPhase = e, this.narrowPhase = r, this.bodies = a, this.colliders = o, this._chassis = t;
    }
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    updateVehicle(t, e, r, a) {
      this.raw.update_vehicle(t, this.broadPhase.raw, this.narrowPhase.raw, this.bodies.raw, this.colliders.raw, e, r, this.colliders.castClosure(a));
    }
    currentVehicleSpeed() {
      return this.raw.current_vehicle_speed();
    }
    chassis() {
      return this._chassis;
    }
    get indexUpAxis() {
      return this.raw.index_up_axis();
    }
    set indexUpAxis(t) {
      this.raw.set_index_up_axis(t);
    }
    get indexForwardAxis() {
      return this.raw.index_forward_axis();
    }
    set setIndexForwardAxis(t) {
      this.raw.set_index_forward_axis(t);
    }
    addWheel(t, e, r, a, o) {
      let _ = w.intoRaw(t), d = w.intoRaw(e), h = w.intoRaw(r);
      this.raw.add_wheel(_, d, h, a, o), _.free(), d.free(), h.free();
    }
    numWheels() {
      return this.raw.num_wheels();
    }
    wheelChassisConnectionPointCs(t) {
      return w.fromRaw(this.raw.wheel_chassis_connection_point_cs(t));
    }
    setWheelChassisConnectionPointCs(t, e) {
      let r = w.intoRaw(e);
      this.raw.set_wheel_chassis_connection_point_cs(t, r), r.free();
    }
    wheelSuspensionRestLength(t) {
      return this.raw.wheel_suspension_rest_length(t);
    }
    setWheelSuspensionRestLength(t, e) {
      this.raw.set_wheel_suspension_rest_length(t, e);
    }
    wheelMaxSuspensionTravel(t) {
      return this.raw.wheel_max_suspension_travel(t);
    }
    setWheelMaxSuspensionTravel(t, e) {
      this.raw.set_wheel_max_suspension_travel(t, e);
    }
    wheelRadius(t) {
      return this.raw.wheel_radius(t);
    }
    setWheelRadius(t, e) {
      this.raw.set_wheel_radius(t, e);
    }
    wheelSuspensionStiffness(t) {
      return this.raw.wheel_suspension_stiffness(t);
    }
    setWheelSuspensionStiffness(t, e) {
      this.raw.set_wheel_suspension_stiffness(t, e);
    }
    wheelSuspensionCompression(t) {
      return this.raw.wheel_suspension_compression(t);
    }
    setWheelSuspensionCompression(t, e) {
      this.raw.set_wheel_suspension_compression(t, e);
    }
    wheelSuspensionRelaxation(t) {
      return this.raw.wheel_suspension_relaxation(t);
    }
    setWheelSuspensionRelaxation(t, e) {
      this.raw.set_wheel_suspension_relaxation(t, e);
    }
    wheelMaxSuspensionForce(t) {
      return this.raw.wheel_max_suspension_force(t);
    }
    setWheelMaxSuspensionForce(t, e) {
      this.raw.set_wheel_max_suspension_force(t, e);
    }
    wheelBrake(t) {
      return this.raw.wheel_brake(t);
    }
    setWheelBrake(t, e) {
      this.raw.set_wheel_brake(t, e);
    }
    wheelSteering(t) {
      return this.raw.wheel_steering(t);
    }
    setWheelSteering(t, e) {
      this.raw.set_wheel_steering(t, e);
    }
    wheelEngineForce(t) {
      return this.raw.wheel_engine_force(t);
    }
    setWheelEngineForce(t, e) {
      this.raw.set_wheel_engine_force(t, e);
    }
    wheelDirectionCs(t) {
      return w.fromRaw(this.raw.wheel_direction_cs(t));
    }
    setWheelDirectionCs(t, e) {
      let r = w.intoRaw(e);
      this.raw.set_wheel_direction_cs(t, r), r.free();
    }
    wheelAxleCs(t) {
      return w.fromRaw(this.raw.wheel_axle_cs(t));
    }
    setWheelAxleCs(t, e) {
      let r = w.intoRaw(e);
      this.raw.set_wheel_axle_cs(t, r), r.free();
    }
    wheelFrictionSlip(t) {
      return this.raw.wheel_friction_slip(t);
    }
    setWheelFrictionSlip(t, e) {
      this.raw.set_wheel_friction_slip(t, e);
    }
    wheelSideFrictionStiffness(t) {
      return this.raw.wheel_side_friction_stiffness(t);
    }
    setWheelSideFrictionStiffness(t, e) {
      this.raw.set_wheel_side_friction_stiffness(t, e);
    }
    wheelRotation(t) {
      return this.raw.wheel_rotation(t);
    }
    wheelForwardImpulse(t) {
      return this.raw.wheel_forward_impulse(t);
    }
    wheelSideImpulse(t) {
      return this.raw.wheel_side_impulse(t);
    }
    wheelSuspensionForce(t) {
      return this.raw.wheel_suspension_force(t);
    }
    wheelContactNormal(t) {
      return w.fromRaw(this.raw.wheel_contact_normal_ws(t));
    }
    wheelContactPoint(t) {
      return w.fromRaw(this.raw.wheel_contact_point_ws(t));
    }
    wheelSuspensionLength(t) {
      return this.raw.wheel_suspension_length(t);
    }
    wheelHardPoint(t) {
      return w.fromRaw(this.raw.wheel_hard_point_ws(t));
    }
    wheelIsInContact(t) {
      return this.raw.wheel_is_in_contact(t);
    }
    wheelGroundObject(t) {
      return this.colliders.get(this.raw.wheel_ground_object(t));
    }
  };
  Gt = class {
    free() {
      this.integrationParameters.free(), this.islands.free(), this.broadPhase.free(), this.narrowPhase.free(), this.bodies.free(), this.colliders.free(), this.impulseJoints.free(), this.multibodyJoints.free(), this.ccdSolver.free(), this.physicsPipeline.free(), this.serializationPipeline.free(), this.debugRenderPipeline.free(), this.characterControllers.forEach((t) => t.free()), this.pidControllers.forEach((t) => t.free()), this.vehicleControllers.forEach((t) => t.free()), this.integrationParameters = void 0, this.islands = void 0, this.broadPhase = void 0, this.narrowPhase = void 0, this.bodies = void 0, this.colliders = void 0, this.ccdSolver = void 0, this.impulseJoints = void 0, this.multibodyJoints = void 0, this.physicsPipeline = void 0, this.serializationPipeline = void 0, this.debugRenderPipeline = void 0, this.characterControllers = void 0, this.pidControllers = void 0, this.vehicleControllers = void 0;
    }
    constructor(t, e, r, a, o, _, d, h, p, u, g, b, m) {
      this.gravity = t, this.integrationParameters = new vr(e), this.islands = new Hr(r), this.broadPhase = new Dr(a), this.narrowPhase = new Lr(o), this.bodies = new yr(_), this.colliders = new Kr(d), this.impulseJoints = new Ar(h), this.multibodyJoints = new Mr(p), this.ccdSolver = new kr(u), this.physicsPipeline = new Wr(g), this.serializationPipeline = new de(b), this.debugRenderPipeline = new Or(m), this.characterControllers = /* @__PURE__ */ new Set(), this.pidControllers = /* @__PURE__ */ new Set(), this.vehicleControllers = /* @__PURE__ */ new Set(), this.impulseJoints.finalizeDeserialization(this.bodies), this.bodies.finalizeDeserialization(this.colliders), this.colliders.finalizeDeserialization(this.bodies);
    }
    static fromRaw(t) {
      return t ? new Gt(w.fromRaw(t.takeGravity()), t.takeIntegrationParameters(), t.takeIslandManager(), t.takeBroadPhase(), t.takeNarrowPhase(), t.takeBodies(), t.takeColliders(), t.takeImpulseJoints(), t.takeMultibodyJoints()) : null;
    }
    takeSnapshot() {
      return this.serializationPipeline.serializeAll(this.gravity, this.integrationParameters, this.islands, this.broadPhase, this.narrowPhase, this.bodies, this.colliders, this.impulseJoints, this.multibodyJoints);
    }
    static restoreSnapshot(t) {
      return new de().deserializeAll(t);
    }
    debugRender(t, e) {
      return this.debugRenderPipeline.render(this.bodies, this.colliders, this.impulseJoints, this.multibodyJoints, this.narrowPhase, t, e), new Br(this.debugRenderPipeline.vertices, this.debugRenderPipeline.colors);
    }
    step(t, e) {
      this.physicsPipeline.step(this.gravity, this.integrationParameters, this.islands, this.broadPhase, this.narrowPhase, this.bodies, this.colliders, this.impulseJoints, this.multibodyJoints, this.ccdSolver, t, e);
    }
    propagateModifiedBodyPositionsToColliders() {
      this.bodies.raw.propagateModifiedBodyPositionsToColliders(this.colliders.raw);
    }
    get timestep() {
      return this.integrationParameters.dt;
    }
    set timestep(t) {
      this.integrationParameters.dt = t;
    }
    get lengthUnit() {
      return this.integrationParameters.lengthUnit;
    }
    set lengthUnit(t) {
      this.integrationParameters.lengthUnit = t;
    }
    get numSolverIterations() {
      return this.integrationParameters.numSolverIterations;
    }
    set numSolverIterations(t) {
      this.integrationParameters.numSolverIterations = t;
    }
    get numInternalPgsIterations() {
      return this.integrationParameters.numInternalPgsIterations;
    }
    set numInternalPgsIterations(t) {
      this.integrationParameters.numInternalPgsIterations = t;
    }
    get maxCcdSubsteps() {
      return this.integrationParameters.maxCcdSubsteps;
    }
    set maxCcdSubsteps(t) {
      this.integrationParameters.maxCcdSubsteps = t;
    }
    createRigidBody(t) {
      return this.bodies.createRigidBody(this.colliders, t);
    }
    createCharacterController(t) {
      let e = new Ur(t, this.integrationParameters, this.broadPhase, this.narrowPhase, this.bodies, this.colliders);
      return this.characterControllers.add(e), e;
    }
    removeCharacterController(t) {
      this.characterControllers.delete(t), t.free();
    }
    createPidController(t, e, r, a) {
      let o = new Xr(this.integrationParameters, this.bodies, t, e, r, a);
      return this.pidControllers.add(o), o;
    }
    removePidController(t) {
      this.pidControllers.delete(t), t.free();
    }
    createVehicleController(t) {
      let e = new Jr(t, this.broadPhase, this.narrowPhase, this.bodies, this.colliders);
      return this.vehicleControllers.add(e), e;
    }
    removeVehicleController(t) {
      this.vehicleControllers.delete(t), t.free();
    }
    createCollider(t, e) {
      let r = e ? e.handle : void 0;
      return this.colliders.createCollider(this.bodies, t, r);
    }
    createImpulseJoint(t, e, r, a) {
      return this.impulseJoints.createJoint(this.bodies, t, e.handle, r.handle, a);
    }
    createMultibodyJoint(t, e, r, a) {
      return this.multibodyJoints.createJoint(t, e.handle, r.handle, a);
    }
    getRigidBody(t) {
      return this.bodies.get(t);
    }
    getCollider(t) {
      return this.colliders.get(t);
    }
    getImpulseJoint(t) {
      return this.impulseJoints.get(t);
    }
    getMultibodyJoint(t) {
      return this.multibodyJoints.get(t);
    }
    removeRigidBody(t) {
      this.bodies && this.bodies.remove(t.handle, this.islands, this.colliders, this.impulseJoints, this.multibodyJoints);
    }
    removeCollider(t, e) {
      this.colliders && this.colliders.remove(t.handle, this.islands, this.bodies, e);
    }
    removeImpulseJoint(t, e) {
      this.impulseJoints && this.impulseJoints.remove(t.handle, e);
    }
    removeMultibodyJoint(t, e) {
      this.impulseJoints && this.multibodyJoints.remove(t.handle, e);
    }
    forEachCollider(t) {
      this.colliders.forEach(t);
    }
    forEachRigidBody(t) {
      this.bodies.forEach(t);
    }
    forEachActiveRigidBody(t) {
      this.bodies.forEachActiveRigidBody(this.islands, t);
    }
    castRay(t, e, r, a, o, _, d, h) {
      return this.broadPhase.castRay(this.narrowPhase, this.bodies, this.colliders, t, e, r, a, o, _ ? _.handle : null, d ? d.handle : null, this.colliders.castClosure(h));
    }
    castRayAndGetNormal(t, e, r, a, o, _, d, h) {
      return this.broadPhase.castRayAndGetNormal(this.narrowPhase, this.bodies, this.colliders, t, e, r, a, o, _ ? _.handle : null, d ? d.handle : null, this.colliders.castClosure(h));
    }
    intersectionsWithRay(t, e, r, a, o, _, d, h, p) {
      this.broadPhase.intersectionsWithRay(this.narrowPhase, this.bodies, this.colliders, t, e, r, a, o, _, d ? d.handle : null, h ? h.handle : null, this.colliders.castClosure(p));
    }
    intersectionWithShape(t, e, r, a, o, _, d, h) {
      let p = this.broadPhase.intersectionWithShape(this.narrowPhase, this.bodies, this.colliders, t, e, r, a, o, _ ? _.handle : null, d ? d.handle : null, this.colliders.castClosure(h));
      return p != null ? this.colliders.get(p) : null;
    }
    projectPoint(t, e, r, a, o, _, d) {
      return this.broadPhase.projectPoint(this.narrowPhase, this.bodies, this.colliders, t, e, r, a, o ? o.handle : null, _ ? _.handle : null, this.colliders.castClosure(d));
    }
    projectPointAndGetFeature(t, e, r, a, o, _) {
      return this.broadPhase.projectPointAndGetFeature(this.narrowPhase, this.bodies, this.colliders, t, e, r, a ? a.handle : null, o ? o.handle : null, this.colliders.castClosure(_));
    }
    intersectionsWithPoint(t, e, r, a, o, _, d) {
      this.broadPhase.intersectionsWithPoint(this.narrowPhase, this.bodies, this.colliders, t, this.colliders.castClosure(e), r, a, o ? o.handle : null, _ ? _.handle : null, this.colliders.castClosure(d));
    }
    castShape(t, e, r, a, o, _, d, h, p, u, g, b) {
      return this.broadPhase.castShape(this.narrowPhase, this.bodies, this.colliders, t, e, r, a, o, _, d, h, p, u ? u.handle : null, g ? g.handle : null, this.colliders.castClosure(b));
    }
    intersectionsWithShape(t, e, r, a, o, _, d, h, p) {
      this.broadPhase.intersectionsWithShape(this.narrowPhase, this.bodies, this.colliders, t, e, r, this.colliders.castClosure(a), o, _, d ? d.handle : null, h ? h.handle : null, this.colliders.castClosure(p));
    }
    collidersWithAabbIntersectingAabb(t, e, r) {
      this.broadPhase.collidersWithAabbIntersectingAabb(this.narrowPhase, this.bodies, this.colliders, t, e, this.colliders.castClosure(r));
    }
    contactPairsWith(t, e) {
      this.narrowPhase.contactPairsWith(t.handle, this.colliders.castClosure(e));
    }
    intersectionPairsWith(t, e) {
      this.narrowPhase.intersectionPairsWith(t.handle, this.colliders.castClosure(e));
    }
    contactPair(t, e, r) {
      this.narrowPhase.contactPair(t.handle, e.handle, r);
    }
    intersectionPair(t, e) {
      return this.narrowPhase.intersectionPair(t.handle, e.handle);
    }
    set profilerEnabled(t) {
      this.physicsPipeline.raw.set_profiler_enabled(t);
    }
    get profilerEnabled() {
      return this.physicsPipeline.raw.is_profiler_enabled();
    }
    timingStep() {
      return this.physicsPipeline.raw.timing_step();
    }
    timingCollisionDetection() {
      return this.physicsPipeline.raw.timing_collision_detection();
    }
    timingBroadPhase() {
      return this.physicsPipeline.raw.timing_broad_phase();
    }
    timingNarrowPhase() {
      return this.physicsPipeline.raw.timing_narrow_phase();
    }
    timingSolver() {
      return this.physicsPipeline.raw.timing_solver();
    }
    timingVelocityAssembly() {
      return this.physicsPipeline.raw.timing_velocity_assembly();
    }
    timingVelocityResolution() {
      return this.physicsPipeline.raw.timing_velocity_resolution();
    }
    timingVelocityUpdate() {
      return this.physicsPipeline.raw.timing_velocity_update();
    }
    timingVelocityWriteback() {
      return this.physicsPipeline.raw.timing_velocity_writeback();
    }
    timingCcd() {
      return this.physicsPipeline.raw.timing_ccd();
    }
    timingCcdToiComputation() {
      return this.physicsPipeline.raw.timing_ccd_toi_computation();
    }
    timingCcdBroadPhase() {
      return this.physicsPipeline.raw.timing_ccd_broad_phase();
    }
    timingCcdNarrowPhase() {
      return this.physicsPipeline.raw.timing_ccd_narrow_phase();
    }
    timingCcdSolver() {
      return this.physicsPipeline.raw.timing_ccd_solver();
    }
    timingIslandConstruction() {
      return this.physicsPipeline.raw.timing_island_construction();
    }
    timingUserChanges() {
      return this.physicsPipeline.raw.timing_user_changes();
    }
  };
  (function(s) {
    s[s.NONE = 0] = "NONE", s[s.COLLISION_EVENTS = 1] = "COLLISION_EVENTS", s[s.CONTACT_FORCE_EVENTS = 2] = "CONTACT_FORCE_EVENTS";
  })(Et || (Et = {}));
  qr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    collider1() {
      return this.raw.collider1();
    }
    collider2() {
      return this.raw.collider2();
    }
    totalForce() {
      return w.fromRaw(this.raw.total_force());
    }
    totalForceMagnitude() {
      return this.raw.total_force_magnitude();
    }
    maxForceDirection() {
      return w.fromRaw(this.raw.max_force_direction());
    }
    maxForceMagnitude() {
      return this.raw.max_force_magnitude();
    }
  };
  Jh = class {
    constructor(t, e) {
      this.raw = e || new br(t);
    }
    free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
    drainCollisionEvents(t) {
      this.raw.drainCollisionEvents(t);
    }
    drainContactForceEvents(t) {
      let e = new qr();
      this.raw.drainContactForceEvents((r) => {
        e.raw = r, t(e), e.free();
      });
    }
    clear() {
      this.raw.clear();
    }
  };
  (function(s) {
    s[s.NONE = 0] = "NONE", s[s.FILTER_CONTACT_PAIRS = 1] = "FILTER_CONTACT_PAIRS", s[s.FILTER_INTERSECTION_PAIRS = 2] = "FILTER_INTERSECTION_PAIRS";
  })(At || (At = {}));
  (function(s) {
    s[s.EMPTY = 0] = "EMPTY", s[s.COMPUTE_IMPULSE = 1] = "COMPUTE_IMPULSE";
  })(pe || (pe = {}));
  (function(s) {
    s[s.EXCLUDE_FIXED = 1] = "EXCLUDE_FIXED", s[s.EXCLUDE_KINEMATIC = 2] = "EXCLUDE_KINEMATIC", s[s.EXCLUDE_DYNAMIC = 4] = "EXCLUDE_DYNAMIC", s[s.EXCLUDE_SENSORS = 8] = "EXCLUDE_SENSORS", s[s.EXCLUDE_SOLIDS = 16] = "EXCLUDE_SOLIDS", s[s.ONLY_DYNAMIC = 3] = "ONLY_DYNAMIC", s[s.ONLY_KINEMATIC = 5] = "ONLY_KINEMATIC", s[s.ONLY_FIXED = 6] = "ONLY_FIXED";
  })(ue || (ue = {}));
  (function(s) {
    s[s.DYNAMIC_DYNAMIC = 1] = "DYNAMIC_DYNAMIC", s[s.DYNAMIC_KINEMATIC = 12] = "DYNAMIC_KINEMATIC", s[s.DYNAMIC_FIXED = 2] = "DYNAMIC_FIXED", s[s.KINEMATIC_KINEMATIC = 52224] = "KINEMATIC_KINEMATIC", s[s.KINEMATIC_FIXED = 8704] = "KINEMATIC_FIXED", s[s.FIXED_FIXED = 32] = "FIXED_FIXED", s[s.DEFAULT = 15] = "DEFAULT", s[s.ALL = 60943] = "ALL";
  })(Pt || (Pt = {}));
  ge = class {
    constructor(t, e, r, a) {
      this.colliderSet = t, this.handle = e, this._parent = r, this._shape = a;
    }
    finalizeDeserialization(t) {
      this.handle != null && (this._parent = t.get(this.colliderSet.raw.coParent(this.handle)));
    }
    ensureShapeIsCached() {
      this._shape || (this._shape = k.fromRaw(this.colliderSet.raw, this.handle));
    }
    get shape() {
      return this.ensureShapeIsCached(), this._shape;
    }
    clearShapeCache() {
      this._shape = null;
    }
    isValid() {
      return this.colliderSet.raw.contains(this.handle);
    }
    translation() {
      return w.fromRaw(this.colliderSet.raw.coTranslation(this.handle));
    }
    translationWrtParent() {
      return w.fromRaw(this.colliderSet.raw.coTranslationWrtParent(this.handle));
    }
    rotation() {
      return v.fromRaw(this.colliderSet.raw.coRotation(this.handle));
    }
    rotationWrtParent() {
      return v.fromRaw(this.colliderSet.raw.coRotationWrtParent(this.handle));
    }
    isSensor() {
      return this.colliderSet.raw.coIsSensor(this.handle);
    }
    setSensor(t) {
      this.colliderSet.raw.coSetSensor(this.handle, t);
    }
    setShape(t) {
      let e = t.intoRaw();
      this.colliderSet.raw.coSetShape(this.handle, e), e.free(), this._shape = t;
    }
    setEnabled(t) {
      this.colliderSet.raw.coSetEnabled(this.handle, t);
    }
    isEnabled() {
      return this.colliderSet.raw.coIsEnabled(this.handle);
    }
    setRestitution(t) {
      this.colliderSet.raw.coSetRestitution(this.handle, t);
    }
    setFriction(t) {
      this.colliderSet.raw.coSetFriction(this.handle, t);
    }
    frictionCombineRule() {
      return this.colliderSet.raw.coFrictionCombineRule(this.handle);
    }
    setFrictionCombineRule(t) {
      this.colliderSet.raw.coSetFrictionCombineRule(this.handle, t);
    }
    restitutionCombineRule() {
      return this.colliderSet.raw.coRestitutionCombineRule(this.handle);
    }
    setRestitutionCombineRule(t) {
      this.colliderSet.raw.coSetRestitutionCombineRule(this.handle, t);
    }
    setCollisionGroups(t) {
      this.colliderSet.raw.coSetCollisionGroups(this.handle, t);
    }
    setSolverGroups(t) {
      this.colliderSet.raw.coSetSolverGroups(this.handle, t);
    }
    contactSkin() {
      return this.colliderSet.raw.coContactSkin(this.handle);
    }
    setContactSkin(t) {
      return this.colliderSet.raw.coSetContactSkin(this.handle, t);
    }
    activeHooks() {
      return this.colliderSet.raw.coActiveHooks(this.handle);
    }
    setActiveHooks(t) {
      this.colliderSet.raw.coSetActiveHooks(this.handle, t);
    }
    activeEvents() {
      return this.colliderSet.raw.coActiveEvents(this.handle);
    }
    setActiveEvents(t) {
      this.colliderSet.raw.coSetActiveEvents(this.handle, t);
    }
    activeCollisionTypes() {
      return this.colliderSet.raw.coActiveCollisionTypes(this.handle);
    }
    setContactForceEventThreshold(t) {
      return this.colliderSet.raw.coSetContactForceEventThreshold(this.handle, t);
    }
    contactForceEventThreshold() {
      return this.colliderSet.raw.coContactForceEventThreshold(this.handle);
    }
    setActiveCollisionTypes(t) {
      this.colliderSet.raw.coSetActiveCollisionTypes(this.handle, t);
    }
    setDensity(t) {
      this.colliderSet.raw.coSetDensity(this.handle, t);
    }
    setMass(t) {
      this.colliderSet.raw.coSetMass(this.handle, t);
    }
    setMassProperties(t, e, r, a) {
      let o = w.intoRaw(e), _ = w.intoRaw(r), d = v.intoRaw(a);
      this.colliderSet.raw.coSetMassProperties(this.handle, t, o, _, d), o.free(), _.free(), d.free();
    }
    setTranslation(t) {
      this.colliderSet.raw.coSetTranslation(this.handle, t.x, t.y, t.z);
    }
    setTranslationWrtParent(t) {
      this.colliderSet.raw.coSetTranslationWrtParent(this.handle, t.x, t.y, t.z);
    }
    setRotation(t) {
      this.colliderSet.raw.coSetRotation(this.handle, t.x, t.y, t.z, t.w);
    }
    setRotationWrtParent(t) {
      this.colliderSet.raw.coSetRotationWrtParent(this.handle, t.x, t.y, t.z, t.w);
    }
    shapeType() {
      return this.colliderSet.raw.coShapeType(this.handle);
    }
    halfExtents() {
      return w.fromRaw(this.colliderSet.raw.coHalfExtents(this.handle));
    }
    setHalfExtents(t) {
      const e = w.intoRaw(t);
      this.colliderSet.raw.coSetHalfExtents(this.handle, e);
    }
    radius() {
      return this.colliderSet.raw.coRadius(this.handle);
    }
    setRadius(t) {
      this.colliderSet.raw.coSetRadius(this.handle, t);
    }
    roundRadius() {
      return this.colliderSet.raw.coRoundRadius(this.handle);
    }
    setRoundRadius(t) {
      this.colliderSet.raw.coSetRoundRadius(this.handle, t);
    }
    halfHeight() {
      return this.colliderSet.raw.coHalfHeight(this.handle);
    }
    setHalfHeight(t) {
      this.colliderSet.raw.coSetHalfHeight(this.handle, t);
    }
    setVoxel(t, e, r, a) {
      this.colliderSet.raw.coSetVoxel(this.handle, t, e, r, a), this._shape = null;
    }
    propagateVoxelChange(t, e, r, a, o, _, d) {
      this.colliderSet.raw.coPropagateVoxelChange(this.handle, t.handle, e, r, a, o, _, d), this._shape = null;
    }
    combineVoxelStates(t, e, r, a) {
      this.colliderSet.raw.coCombineVoxelStates(this.handle, t.handle, e, r, a), this._shape = null;
    }
    vertices() {
      return this.colliderSet.raw.coVertices(this.handle);
    }
    indices() {
      return this.colliderSet.raw.coIndices(this.handle);
    }
    heightfieldHeights() {
      return this.colliderSet.raw.coHeightfieldHeights(this.handle);
    }
    heightfieldScale() {
      let t = this.colliderSet.raw.coHeightfieldScale(this.handle);
      return w.fromRaw(t);
    }
    heightfieldNRows() {
      return this.colliderSet.raw.coHeightfieldNRows(this.handle);
    }
    heightfieldNCols() {
      return this.colliderSet.raw.coHeightfieldNCols(this.handle);
    }
    parent() {
      return this._parent;
    }
    friction() {
      return this.colliderSet.raw.coFriction(this.handle);
    }
    restitution() {
      return this.colliderSet.raw.coRestitution(this.handle);
    }
    density() {
      return this.colliderSet.raw.coDensity(this.handle);
    }
    mass() {
      return this.colliderSet.raw.coMass(this.handle);
    }
    volume() {
      return this.colliderSet.raw.coVolume(this.handle);
    }
    collisionGroups() {
      return this.colliderSet.raw.coCollisionGroups(this.handle);
    }
    solverGroups() {
      return this.colliderSet.raw.coSolverGroups(this.handle);
    }
    containsPoint(t) {
      let e = w.intoRaw(t), r = this.colliderSet.raw.coContainsPoint(this.handle, e);
      return e.free(), r;
    }
    projectPoint(t, e) {
      let r = w.intoRaw(t), a = bt.fromRaw(this.colliderSet.raw.coProjectPoint(this.handle, r, e));
      return r.free(), a;
    }
    intersectsRay(t, e) {
      let r = w.intoRaw(t.origin), a = w.intoRaw(t.dir), o = this.colliderSet.raw.coIntersectsRay(this.handle, r, a, e);
      return r.free(), a.free(), o;
    }
    castShape(t, e, r, a, o, _, d, h) {
      let p = w.intoRaw(t), u = w.intoRaw(r), g = v.intoRaw(a), b = w.intoRaw(o), m = e.intoRaw(), C = ot.fromRaw(this.colliderSet, this.colliderSet.raw.coCastShape(this.handle, p, m, u, g, b, _, d, h));
      return p.free(), u.free(), g.free(), b.free(), m.free(), C;
    }
    castCollider(t, e, r, a, o, _) {
      let d = w.intoRaw(t), h = w.intoRaw(r), p = mt.fromRaw(this.colliderSet, this.colliderSet.raw.coCastCollider(this.handle, d, e.handle, h, a, o, _));
      return d.free(), h.free(), p;
    }
    intersectsShape(t, e, r) {
      let a = w.intoRaw(e), o = v.intoRaw(r), _ = t.intoRaw(), d = this.colliderSet.raw.coIntersectsShape(this.handle, _, a, o);
      return a.free(), o.free(), _.free(), d;
    }
    contactShape(t, e, r, a) {
      let o = w.intoRaw(e), _ = v.intoRaw(r), d = t.intoRaw(), h = st.fromRaw(this.colliderSet.raw.coContactShape(this.handle, d, o, _, a));
      return o.free(), _.free(), d.free(), h;
    }
    contactCollider(t, e) {
      return st.fromRaw(this.colliderSet.raw.coContactCollider(this.handle, t.handle, e));
    }
    castRay(t, e, r) {
      let a = w.intoRaw(t.origin), o = w.intoRaw(t.dir), _ = this.colliderSet.raw.coCastRay(this.handle, a, o, e, r);
      return a.free(), o.free(), _;
    }
    castRayAndGetNormal(t, e, r) {
      let a = w.intoRaw(t.origin), o = w.intoRaw(t.dir), _ = gt.fromRaw(this.colliderSet.raw.coCastRayAndGetNormal(this.handle, a, o, e, r));
      return a.free(), o.free(), _;
    }
  };
  (function(s) {
    s[s.Density = 0] = "Density", s[s.Mass = 1] = "Mass", s[s.MassProps = 2] = "MassProps";
  })(rt || (rt = {}));
  z = class {
    constructor(t) {
      this.enabled = true, this.shape = t, this.massPropsMode = rt.Density, this.density = 1, this.friction = 0.5, this.restitution = 0, this.rotation = v.identity(), this.translation = w.zeros(), this.isSensor = false, this.collisionGroups = 4294967295, this.solverGroups = 4294967295, this.frictionCombineRule = ht.Average, this.restitutionCombineRule = ht.Average, this.activeCollisionTypes = Pt.DEFAULT, this.activeEvents = Et.NONE, this.activeHooks = At.NONE, this.mass = 0, this.centerOfMass = w.zeros(), this.contactForceEventThreshold = 0, this.contactSkin = 0, this.principalAngularInertia = w.zeros(), this.angularInertiaLocalFrame = v.identity();
    }
    static ball(t) {
      const e = new xe(t);
      return new z(e);
    }
    static capsule(t, e) {
      const r = new Ee(t, e);
      return new z(r);
    }
    static segment(t, e) {
      const r = new Ae(t, e);
      return new z(r);
    }
    static triangle(t, e, r) {
      const a = new Pe(t, e, r);
      return new z(a);
    }
    static roundTriangle(t, e, r, a) {
      const o = new ze(t, e, r, a);
      return new z(o);
    }
    static polyline(t, e) {
      const r = new Fe(t, e);
      return new z(r);
    }
    static voxels(t, e) {
      const r = new Te(t, e);
      return new z(r);
    }
    static trimesh(t, e, r) {
      const a = new Me(t, e, r);
      return new z(a);
    }
    static cuboid(t, e, r) {
      const a = new je(t, e, r);
      return new z(a);
    }
    static roundCuboid(t, e, r, a) {
      const o = new Ie(t, e, r, a);
      return new z(o);
    }
    static heightfield(t, e, r, a, o) {
      const _ = new ke(t, e, r, a, o);
      return new z(_);
    }
    static cylinder(t, e) {
      const r = new He(t, e);
      return new z(r);
    }
    static roundCylinder(t, e, r) {
      const a = new De(t, e, r);
      return new z(a);
    }
    static cone(t, e) {
      const r = new Le(t, e);
      return new z(r);
    }
    static roundCone(t, e, r) {
      const a = new Ne(t, e, r);
      return new z(a);
    }
    static convexHull(t) {
      const e = new jt(t, null);
      return new z(e);
    }
    static convexMesh(t, e) {
      const r = new jt(t, e);
      return new z(r);
    }
    static roundConvexHull(t, e) {
      const r = new It(t, null, e);
      return new z(r);
    }
    static roundConvexMesh(t, e, r) {
      const a = new It(t, e, r);
      return new z(a);
    }
    setTranslation(t, e, r) {
      if (typeof t != "number" || typeof e != "number" || typeof r != "number") throw TypeError("The translation components must be numbers.");
      return this.translation = {
        x: t,
        y: e,
        z: r
      }, this;
    }
    setRotation(t) {
      return v.copy(this.rotation, t), this;
    }
    setSensor(t) {
      return this.isSensor = t, this;
    }
    setEnabled(t) {
      return this.enabled = t, this;
    }
    setContactSkin(t) {
      return this.contactSkin = t, this;
    }
    setDensity(t) {
      return this.massPropsMode = rt.Density, this.density = t, this;
    }
    setMass(t) {
      return this.massPropsMode = rt.Mass, this.mass = t, this;
    }
    setMassProperties(t, e, r, a) {
      return this.massPropsMode = rt.MassProps, this.mass = t, w.copy(this.centerOfMass, e), w.copy(this.principalAngularInertia, r), v.copy(this.angularInertiaLocalFrame, a), this;
    }
    setRestitution(t) {
      return this.restitution = t, this;
    }
    setFriction(t) {
      return this.friction = t, this;
    }
    setFrictionCombineRule(t) {
      return this.frictionCombineRule = t, this;
    }
    setRestitutionCombineRule(t) {
      return this.restitutionCombineRule = t, this;
    }
    setCollisionGroups(t) {
      return this.collisionGroups = t, this;
    }
    setSolverGroups(t) {
      return this.solverGroups = t, this;
    }
    setActiveHooks(t) {
      return this.activeHooks = t, this;
    }
    setActiveEvents(t) {
      return this.activeEvents = t, this;
    }
    setActiveCollisionTypes(t) {
      return this.activeCollisionTypes = t, this;
    }
    setContactForceEventThreshold(t) {
      return this.contactForceEventThreshold = t, this;
    }
  };
  Kr = class {
    free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
    constructor(t) {
      this.raw = t || new P(), this.map = new Lt(), t && t.forEachColliderHandle((e) => {
        this.map.set(e, new ge(this, e, null));
      });
    }
    castClosure(t) {
      return (e) => {
        if (t) return t(this.get(e));
      };
    }
    finalizeDeserialization(t) {
      this.map.forEach((e) => e.finalizeDeserialization(t));
    }
    createCollider(t, e, r) {
      let a = r != null && r != null;
      if (a && isNaN(r)) throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");
      let o = e.shape.intoRaw(), _ = w.intoRaw(e.translation), d = v.intoRaw(e.rotation), h = w.intoRaw(e.centerOfMass), p = w.intoRaw(e.principalAngularInertia), u = v.intoRaw(e.angularInertiaLocalFrame), g = this.raw.createCollider(e.enabled, o, _, d, e.massPropsMode, e.mass, h, p, u, e.density, e.friction, e.restitution, e.frictionCombineRule, e.restitutionCombineRule, e.isSensor, e.collisionGroups, e.solverGroups, e.activeCollisionTypes, e.activeHooks, e.activeEvents, e.contactForceEventThreshold, e.contactSkin, a, a ? r : 0, t.raw);
      o.free(), _.free(), d.free(), h.free(), p.free(), u.free();
      let b = a ? t.get(r) : null, m = new ge(this, g, b, e.shape);
      return this.map.set(g, m), m;
    }
    remove(t, e, r, a) {
      this.raw.remove(t, e.raw, r.raw, a), this.unmap(t);
    }
    unmap(t) {
      this.map.delete(t);
    }
    get(t) {
      return this.map.get(t);
    }
    len() {
      return this.map.len();
    }
    contains(t) {
      return this.get(t) != null;
    }
    forEach(t) {
      this.map.forEach(t);
    }
    getAll() {
      return this.map.getAll();
    }
  };
  qh = function() {
    return ri();
  };
  Kh = function(s) {
    ii(s);
  };
  ep = Object.freeze(Object.defineProperty({
    __proto__: null,
    get ActiveCollisionTypes() {
      return Pt;
    },
    get ActiveEvents() {
      return Et;
    },
    get ActiveHooks() {
      return At;
    },
    Ball: xe,
    BroadPhase: Dr,
    CCDSolver: kr,
    Capsule: Ee,
    CharacterCollision: Vr,
    get CoefficientCombineRule() {
      return ht;
    },
    Collider: ge,
    ColliderDesc: z,
    ColliderSet: Kr,
    ColliderShapeCastHit: mt,
    Cone: Le,
    ConvexPolyhedron: jt,
    Cuboid: je,
    Cylinder: He,
    DebugRenderBuffers: Br,
    DebugRenderPipeline: Or,
    DynamicRayCastVehicleController: Jr,
    EventQueue: Jh,
    get FeatureType() {
      return at;
    },
    FixedImpulseJoint: Sr,
    FixedMultibodyJoint: Pr,
    GenericImpulseJoint: Ir,
    HalfSpace: Gr,
    get HeightFieldFlags() {
      return le;
    },
    Heightfield: ke,
    ImpulseJoint: X,
    ImpulseJointSet: Ar,
    IntegrationParameters: vr,
    IslandManager: Hr,
    get JointAxesMask() {
      return ce;
    },
    JointData: q,
    get JointType() {
      return N;
    },
    KinematicCharacterController: Ur,
    get MassPropsMode() {
      return rt;
    },
    get MotorModel() {
      return _e;
    },
    MultibodyJoint: et,
    MultibodyJointSet: Mr,
    NarrowPhase: Lr,
    PhysicsPipeline: Wr,
    get PidAxesMask() {
      return he;
    },
    PidController: Xr,
    PointColliderProjection: ut,
    PointProjection: bt,
    Polyline: Fe,
    PrismaticImpulseJoint: xr,
    PrismaticMultibodyJoint: zr,
    Quaternion: ae,
    get QueryFilterFlags() {
      return ue;
    },
    Ray: Xh,
    RayColliderHit: Nt,
    RayColliderIntersection: pt,
    RayIntersection: gt,
    RevoluteImpulseJoint: jr,
    RevoluteMultibodyJoint: Fr,
    RigidBody: oe,
    RigidBodyDesc: J,
    RigidBodySet: yr,
    get RigidBodyType() {
      return V;
    },
    RopeImpulseJoint: Rr,
    RotationOps: v,
    RoundCone: Ne,
    RoundConvexPolyhedron: It,
    RoundCuboid: Ie,
    RoundCylinder: De,
    RoundTriangle: ze,
    SdpMatrix3: fr,
    SdpMatrix3Ops: se,
    Segment: Ae,
    SerializationPipeline: de,
    Shape: k,
    ShapeCastHit: ot,
    ShapeContact: st,
    get ShapeType() {
      return F;
    },
    get SolverFlags() {
      return pe;
    },
    SphericalImpulseJoint: Er,
    SphericalMultibodyJoint: Tr,
    SpringImpulseJoint: Cr,
    TempContactForceEvent: qr,
    TempContactManifold: Nr,
    TriMesh: Me,
    get TriMeshFlags() {
      return we;
    },
    Triangle: Pe,
    UnitImpulseJoint: Re,
    UnitMultibodyJoint: Ce,
    Vector3: mr,
    VectorOps: w,
    Voxels: Te,
    World: Gt,
    reserveMemory: Kh,
    version: qh
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  Pt as ActiveCollisionTypes,
  Et as ActiveEvents,
  At as ActiveHooks,
  xe as Ball,
  Dr as BroadPhase,
  kr as CCDSolver,
  Ee as Capsule,
  Vr as CharacterCollision,
  ht as CoefficientCombineRule,
  ge as Collider,
  z as ColliderDesc,
  Kr as ColliderSet,
  mt as ColliderShapeCastHit,
  Le as Cone,
  jt as ConvexPolyhedron,
  je as Cuboid,
  He as Cylinder,
  Br as DebugRenderBuffers,
  Or as DebugRenderPipeline,
  Jr as DynamicRayCastVehicleController,
  Jh as EventQueue,
  at as FeatureType,
  Sr as FixedImpulseJoint,
  Pr as FixedMultibodyJoint,
  Ir as GenericImpulseJoint,
  Gr as HalfSpace,
  le as HeightFieldFlags,
  ke as Heightfield,
  X as ImpulseJoint,
  Ar as ImpulseJointSet,
  vr as IntegrationParameters,
  Hr as IslandManager,
  ce as JointAxesMask,
  q as JointData,
  N as JointType,
  Ur as KinematicCharacterController,
  rt as MassPropsMode,
  _e as MotorModel,
  et as MultibodyJoint,
  Mr as MultibodyJointSet,
  Lr as NarrowPhase,
  Wr as PhysicsPipeline,
  he as PidAxesMask,
  Xr as PidController,
  ut as PointColliderProjection,
  bt as PointProjection,
  Fe as Polyline,
  xr as PrismaticImpulseJoint,
  zr as PrismaticMultibodyJoint,
  ae as Quaternion,
  ue as QueryFilterFlags,
  Xh as Ray,
  Nt as RayColliderHit,
  pt as RayColliderIntersection,
  gt as RayIntersection,
  jr as RevoluteImpulseJoint,
  Fr as RevoluteMultibodyJoint,
  oe as RigidBody,
  J as RigidBodyDesc,
  yr as RigidBodySet,
  V as RigidBodyType,
  Rr as RopeImpulseJoint,
  v as RotationOps,
  Ne as RoundCone,
  It as RoundConvexPolyhedron,
  Ie as RoundCuboid,
  De as RoundCylinder,
  ze as RoundTriangle,
  fr as SdpMatrix3,
  se as SdpMatrix3Ops,
  Ae as Segment,
  de as SerializationPipeline,
  k as Shape,
  ot as ShapeCastHit,
  st as ShapeContact,
  F as ShapeType,
  pe as SolverFlags,
  Er as SphericalImpulseJoint,
  Tr as SphericalMultibodyJoint,
  Cr as SpringImpulseJoint,
  qr as TempContactForceEvent,
  Nr as TempContactManifold,
  Me as TriMesh,
  we as TriMeshFlags,
  Pe as Triangle,
  Re as UnitImpulseJoint,
  Ce as UnitMultibodyJoint,
  mr as Vector3,
  w as VectorOps,
  Te as Voxels,
  Gt as World,
  __tla,
  ep as default,
  Kh as reserveMemory,
  qh as version
};
