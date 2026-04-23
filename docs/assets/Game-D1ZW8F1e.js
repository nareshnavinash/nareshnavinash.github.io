const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./rapier-Djdf5Dys.js","./MiniMap-zzNa36af.js","./three.core-RE2ucuTm.js","./preload-helper-PPVm8Dsz.js"])))=>i.map(i=>d[i]);
import { _ as c } from "./preload-helper-PPVm8Dsz.js";
import { D as m, R as w, Q as f, S as x, T, a as b, b as M, Y as y, I as F, A as v, N as u, c as k, V as S, M as P, d as R, e as K, O as C, f as I, g as L, h as E, i as V, W as G, j as W, k as A, L as U, F as Y, l as j, m as N, n as O, E as q, o as D, p as z, P as B, q as _, r as H, Z as Q, s as Z, C as J, t as X, K as $, u as ee, v as te, w as se, x as ae, y as ie, z as re, B as ne, __tla as __tla_0 } from "./MiniMap-zzNa36af.js";
import { S as le, a as n, N as s, R as i, L as t, C as a } from "./three.core-RE2ucuTm.js";
import { __tla as __tla_1 } from "./Game-D1ZW8F1e.js";
let r;
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
  r = class {
    static getInstance() {
      return r.instance;
    }
    constructor() {
      if (r.instance) return r.instance;
      r.instance = this, this.init();
    }
    async init() {
      this.domElement = document.querySelector(".game"), this.canvasElement = this.domElement.querySelector(".js-canvas"), document.documentElement.classList.add("is-started"), this.scene = new le(), this.debug = new m(), this.resourcesLoader = new w(), this.quality = new f(), this.server = new x(), this.ticker = new T(), this.time = new b(), this.dayCycles = new M(), this.yearCycles = new y(), this.inputs = new F([], [
        "intro"
      ]), this.audio = new v(), this.notifications = new u(), this.rayCursor = new k(), this.viewport = new S(this.domElement), this.modals = new P(), this.menu = new R(), this.rendering = new K(), await this.rendering.setRenderer(), this.resources = await this.resourcesLoader.load([
        [
          "respawnsReferencesModel",
          "respawns/respawnsReferences-compressed.glb",
          "gltf"
        ],
        [
          "behindTheSceneStarsTexture",
          "behindTheScene/stars.ktx",
          "textureKtx",
          (e) => {
            e.colorSpace = n, e.minFilter = s, e.magFilter = s, e.generateMipmaps = false, e.wrapS = i, e.wrapT = i;
          }
        ],
        [
          "soundTexture",
          "intro/sound.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.repeat.x = 0.5;
          }
        ],
        [
          "paletteTexture",
          "palette.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false, e.colorSpace = n;
          }
        ]
      ]), this.options = new C(), this.respawns = new I("landing"), this.view = new L(), this.rendering.setPostprocessing(), this.rendering.start(), this.reveal = new E(), this.noises = new V(), this.weather = new G(), this.wind = new W(), this.tracks = new A(), this.lighting = new U(), this.fog = new Y(), this.water = new j(), this.materials = new N(), this.objects = new O(), this.explosions = new q(), this.world = new D();
      const l = c(() => import("./rapier-Djdf5Dys.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }), __vite__mapDeps([0,1,2,3]), import.meta.url), o = this.resourcesLoader.load([
        [
          "foliageTexture",
          "foliage/foliageSDF.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false;
          }
        ],
        [
          "bushesReferences",
          "bushes/bushesReferences-compressed.glb",
          "gltf"
        ],
        [
          "vehicle",
          "vehicle/default-compressed.glb",
          "gltf"
        ],
        [
          "playgroundVisual",
          "playground/playgroundVisual-compressed.glb",
          "gltf"
        ],
        [
          "playgroundPhysical",
          "playground/playgroundPhysical-compressed.glb",
          "gltf"
        ],
        [
          "flowersReferencesModel",
          "flowers/flowersReferences-compressed.glb",
          "gltf"
        ],
        [
          "bricksModel",
          "bricks/bricks-compressed.glb",
          "gltf"
        ],
        [
          "fencesModel",
          "fences/fences-compressed.glb",
          "gltf"
        ],
        [
          "benchesModel",
          "benches/benches-compressed.glb",
          "gltf"
        ],
        [
          "explosiveCratesModel",
          "explosiveCrates/explosiveCrates-compressed.glb",
          "gltf"
        ],
        [
          "lanternsModel",
          "lanterns/lanterns-compressed.glb",
          "gltf"
        ],
        [
          "terrainTexture",
          "terrain/terrain.ktx",
          "textureKtx",
          (e) => {
            e.flipY = false;
          }
        ],
        [
          "terrainModel",
          "terrain/terrain-compressed.glb",
          "gltf"
        ],
        [
          "floorSlabsTexture",
          "floor/slabs.ktx",
          "textureKtx",
          (e) => {
            e.wrapS = i, e.wrapT = i, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false;
          }
        ],
        [
          "birchTreesVisualModel",
          "birchTrees/birchTreesVisual-compressed.glb",
          "gltf"
        ],
        [
          "birchTreesReferencesModel",
          "birchTrees/birchTreesReferences-compressed.glb",
          "gltf"
        ],
        [
          "oakTreesVisualModel",
          "oakTrees/oakTreesVisual-compressed.glb",
          "gltf"
        ],
        [
          "oakTreesReferencesModel",
          "oakTrees/oakTreesReferences.glb",
          "gltf"
        ],
        [
          "cherryTreesVisualModel",
          "cherryTrees/cherryTreesVisual-compressed.glb",
          "gltf"
        ],
        [
          "cherryTreesReferencesModel",
          "cherryTrees/cherryTreesReferences-compressed.glb",
          "gltf"
        ],
        [
          "sceneryModel",
          "scenery/scenery-compressed.glb",
          "gltf"
        ],
        [
          "areasModel",
          "areas/areas-compressed.glb",
          "gltf"
        ],
        [
          "poleLightsModel",
          "poleLights/poleLights-compressed.glb",
          "gltf"
        ],
        [
          "whisperFlameTexture",
          "whispers/whisperFlame.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = t, e.magFilter = t, e.generateMipmaps = false;
          }
        ],
        [
          "satanStarTexture",
          "areas/satanStar.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = t, e.magFilter = t, e.generateMipmaps = false;
          }
        ],
        [
          "tornadoPathReferencesModel",
          "tornado/tornadoPathReferences-compressed.glb",
          "gltf"
        ],
        [
          "overlayPatternTexture",
          "overlay/overlayPattern.ktx",
          "textureKtx",
          (e) => {
            e.wrapS = i, e.wrapT = i, e.magFilter = s, e.minFilter = s, e.generateMipmaps = false;
          }
        ],
        [
          "interactivePointsKeyIconCrossTexture",
          "interactivePoints/interactivePointsKeyIconCross.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false;
          }
        ],
        [
          "interactivePointsKeyIconEnterTexture",
          "interactivePoints/interactivePointsKeyIconEnter.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false;
          }
        ],
        [
          "interactivePointsKeyIconATexture",
          "interactivePoints/interactivePointsKeyIconA.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false;
          }
        ],
        [
          "jukeboxMusicNotes",
          "jukebox/jukeboxMusicNotes.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = t, e.magFilter = t, e.generateMipmaps = false;
          }
        ],
        [
          "achievementsGlyphsTexture",
          "achievements/glyphs.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = i;
          }
        ],
        [
          "careerFreelancerTexture",
          "career/careerFreelancer.png",
          "texture",
          (e) => {
            e.flipY = false, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a;
          }
        ],
        [
          "careerHeticTexture",
          "career/careerHetic.png",
          "texture",
          (e) => {
            e.flipY = false, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a;
          }
        ],
        [
          "careerImmersiveGardenTexture",
          "career/careerImmersiveGarden.png",
          "texture",
          (e) => {
            e.flipY = false, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a;
          }
        ],
        [
          "careerIRLTeacherTexture",
          "career/careerIRLTeacher.png",
          "texture",
          (e) => {
            e.flipY = false, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a;
          }
        ],
        [
          "careerOnlineTeacherTexture",
          "career/careerOnlineTeacher.png",
          "texture",
          (e) => {
            e.flipY = false, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a;
          }
        ],
        [
          "careerUzikTexture",
          "career/careerUzik.png",
          "texture",
          (e) => {
            e.flipY = false, e.minFilter = t, e.magFilter = t, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a;
          }
        ],
        [
          "timeMachineScreenMGSTexture",
          "timeMachine/timeMachineScreenMGS.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a, e.colorSpace = n;
          }
        ],
        [
          "timeMachineScreenFolioTexture",
          "timeMachine/timeMachineScreenFolio.ktx",
          "textureKtx",
          (e) => {
            e.minFilter = s, e.magFilter = s, e.generateMipmaps = false, e.wrapS = a, e.wrapT = a, e.colorSpace = n;
          }
        ]
      ], (e, d) => {
        const g = 1 - e / d;
        this.world.intro.updateProgress(g);
      }), [p, h] = await Promise.all([
        o,
        l
      ]);
      this.RAPIER = h, this.resources = {
        ...p,
        ...this.resources
      }, this.terrain = new z(), this.physics = new B(), this.wireframe = new _(), this.physicalVehicle = new H(), this.zones = new Q(), this.player = new Z(), this.closingManager = new J(), this.interactivePoints = new X(), this.konamiCode = new $(), this.achievements = new ee(), this.tornado = new te(), this.map = new se(), this.miniMap = new ae(), this.world.step(1), this.overlay = new ie(), this.quality.level === 0 && this.rendering.renderer.backend.isWebGPUBackend && re.render(), await this.world.intro.loadingComplete, this.reveal.updateStep(0), this.debug.active && this.achievements.setProgress("debug", 1);
    }
    reset() {
      this.inputs.interactiveButtons.clearItems(), this.player.respawn(null, () => {
        this.objects.resetAll(), this.world.explosiveCrates && this.world.explosiveCrates.reset(), this.world.areas.bowling && this.world.areas.bowling.restart(), this.world.areas.cookie && (this.world.areas.cookie.cookies.instancedGroup.needsUpdate = true), this.world.areas.toilet && (this.world.areas.toilet.cabin.down = false), this.world.areas.social && (this.world.areas.social.statue.down = false, this.world.areas.social.fans.instancedGroup.needsUpdate = true), this.world.benches && (this.world.benches.instancedGroup.needsUpdate = true), this.world.fences && (this.world.fences.instancedGroup.needsUpdate = true), this.world.bricks && (this.world.bricks.instancedGroup.needsUpdate = true), this.world.lanterns && (this.world.lanterns.instancedGroup.needsUpdate = true), ne.delayedCall(2, () => {
          this.achievements.setProgress("reset", 1);
        });
      });
    }
  };
});
export {
  r as Game,
  __tla
};
