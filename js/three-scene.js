/* ============================================
   THREE.JS SCENE — Futuristic Tech Portfolio
   Starfield · Connected Particles · Morphing Wireframe
   Floating Shapes · Grid · Bloom · Parallax
   ============================================ */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

/* ---- CONFIG ---- */
const ACCENT = {
  mint: new THREE.Color(0x00ffaa),
  lavender: new THREE.Color(0xaa77ff),
  peach: new THREE.Color(0xff7744),
  gold: new THREE.Color(0xffcc33),
  blue: new THREE.Color(0x4488ff),
};
const accentArr = Object.values(ACCENT);

/* ---- THEME COLOR MAPS (Night = default, Day = from 3D world Day preset) ---- */
const THEME = {
  night: {
    ico:     new THREE.Color(0x00ffaa),
    ring:    new THREE.Color(0xaa77ff),
    ring2:   new THREE.Color(0x4488ff),
    net:     new THREE.Color(0x4488ff),
    grid:    new THREE.Color(0x1a1a5e),
    ambient: new THREE.Color(0x222244),
    bloomStrength: 0.7,
  },
  day: {
    ico:     new THREE.Color(0x00b880),
    ring:    new THREE.Color(0x9b89ff),
    ring2:   new THREE.Color(0x5f7dff),
    net:     new THREE.Color(0x5f7dff),
    grid:    new THREE.Color(0x9b89ff),
    ambient: new THREE.Color(0xffd2c2),
    bloomStrength: 0.3,
  },
};

let currentThemeColors = { ...THEME.night };
let targetThemeColors  = { ...THEME.night };
let themeLerp = 1; // 0..1  — 1 = arrived

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const STAR_COUNT = isMobile ? 2500 : 6000;
const NET_COUNT = isMobile ? 60 : 120;
const NET_MAX_DIST = isMobile ? 5 : 4;
const SHAPE_COUNT = isMobile ? 8 : 22;

/* ---- RENDERER SETUP ---- */
const container = document.getElementById('three-bg');
if (!container) { console.warn('Missing #three-bg container — skipping Three.js scene'); }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 250);
camera.position.set(0, 0, 30);

const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
container.appendChild(renderer.domElement);

/* ---- POST-PROCESSING ---- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  isMobile ? 0.4 : 0.7, // strength
  0.4,                    // radius
  0.72                    // threshold
);
composer.addPass(bloom);

/* ============================================
   1. STARFIELD
   ============================================ */
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(STAR_COUNT * 3);
const starCol = new Float32Array(STAR_COUNT * 3);

for (let i = 0; i < STAR_COUNT; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = 40 + Math.random() * 100;
  starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
  starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  starPos[i * 3 + 2] = r * Math.cos(phi);

  const c = Math.random() > 0.88
    ? accentArr[Math.floor(Math.random() * accentArr.length)]
    : new THREE.Color(0x6666aa);
  starCol[i * 3] = c.r;
  starCol[i * 3 + 1] = c.g;
  starCol[i * 3 + 2] = c.b;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
  size: 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
}));
scene.add(stars);

/* ============================================
   2. CONNECTED PARTICLE NETWORK
   ============================================ */
const netGeo = new THREE.BufferGeometry();
const netPos = new Float32Array(NET_COUNT * 3);
const netVel = [];

for (let i = 0; i < NET_COUNT; i++) {
  netPos[i * 3]     = (Math.random() - 0.5) * 30;
  netPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
  netPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
  netVel.push(new THREE.Vector3(
    (Math.random() - 0.5) * 0.008,
    (Math.random() - 0.5) * 0.008,
    (Math.random() - 0.5) * 0.006
  ));
}

netGeo.setAttribute('position', new THREE.BufferAttribute(netPos, 3));
const netPoints = new THREE.Points(netGeo, new THREE.PointsMaterial({
  size: 0.12,
  color: ACCENT.blue.getHex(),
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
}));
scene.add(netPoints);

// Pre-allocate line buffer for connected particles
const maxLineVerts = NET_COUNT * (NET_COUNT - 1);
const lineBuffer = new Float32Array(maxLineVerts * 3);
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(lineBuffer, 3));
lineGeo.setDrawRange(0, 0);

const lineMat = new THREE.LineBasicMaterial({
  color: ACCENT.blue.getHex(),
  transparent: true,
  opacity: 0.12,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
scene.add(lineSegments);

function updateNetwork() {
  const pos = netGeo.attributes.position.array;
  let idx = 0;

  for (let i = 0; i < NET_COUNT; i++) {
    pos[i * 3]     += netVel[i].x;
    pos[i * 3 + 1] += netVel[i].y;
    pos[i * 3 + 2] += netVel[i].z;

    if (Math.abs(pos[i * 3])     > 15) netVel[i].x *= -1;
    if (Math.abs(pos[i * 3 + 1]) > 10) netVel[i].y *= -1;
    if (Math.abs(pos[i * 3 + 2]) > 8)  netVel[i].z *= -1;

    for (let j = i + 1; j < NET_COUNT; j++) {
      const dx = pos[i * 3]     - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < NET_MAX_DIST * NET_MAX_DIST) {
        lineBuffer[idx++] = pos[i * 3];
        lineBuffer[idx++] = pos[i * 3 + 1];
        lineBuffer[idx++] = pos[i * 3 + 2];
        lineBuffer[idx++] = pos[j * 3];
        lineBuffer[idx++] = pos[j * 3 + 1];
        lineBuffer[idx++] = pos[j * 3 + 2];
      }
    }
  }

  netGeo.attributes.position.needsUpdate = true;
  lineGeo.attributes.position.needsUpdate = true;
  lineGeo.setDrawRange(0, idx / 3);
}

/* ============================================
   3. MORPHING WIREFRAME ICOSAHEDRON (Hero)
   ============================================ */
const icoDetail = isMobile ? 2 : 3;
const icoGeo = new THREE.IcosahedronGeometry(5, icoDetail);
const icoMat = new THREE.MeshBasicMaterial({
  color: ACCENT.mint.getHex(),
  wireframe: true,
  transparent: true,
  opacity: 0.25,
  blending: THREE.AdditiveBlending,
});
const ico = new THREE.Mesh(icoGeo, icoMat);
scene.add(ico);

const icoOriginalPos = icoGeo.attributes.position.array.slice();

function updateIcoMorph(t) {
  const positions = icoGeo.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    const ox = icoOriginalPos[i];
    const oy = icoOriginalPos[i + 1];
    const oz = icoOriginalPos[i + 2];
    const noise =
      Math.sin(ox * 1.5 + t * 0.7) * 0.18 +
      Math.sin(oy * 2.0 + t * 0.9) * 0.14 +
      Math.sin(oz * 1.2 + t * 0.5) * 0.16;
    const scale = 1 + noise * 0.12;
    positions[i]     = ox * scale;
    positions[i + 1] = oy * scale;
    positions[i + 2] = oz * scale;
  }
  icoGeo.attributes.position.needsUpdate = true;
}

// Second ring: outer glow ring
const ringGeo = new THREE.TorusGeometry(7, 0.03, 8, 80);
const ringMat = new THREE.MeshBasicMaterial({
  color: ACCENT.lavender.getHex(),
  transparent: true,
  opacity: 0.2,
  blending: THREE.AdditiveBlending,
});
const ring = new THREE.Mesh(ringGeo, ringMat);
scene.add(ring);

const ring2Geo = new THREE.TorusGeometry(8.5, 0.02, 8, 100);
const ring2Mat = new THREE.MeshBasicMaterial({
  color: ACCENT.blue.getHex(),
  transparent: true,
  opacity: 0.12,
  blending: THREE.AdditiveBlending,
});
const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
scene.add(ring2);

/* ============================================
   4. FLOATING WIREFRAME SHAPES
   ============================================ */
const shapeGeometries = [
  new THREE.IcosahedronGeometry(0.5, 0),
  new THREE.OctahedronGeometry(0.5, 0),
  new THREE.TetrahedronGeometry(0.5, 0),
  new THREE.DodecahedronGeometry(0.4, 0),
  new THREE.TorusGeometry(0.4, 0.15, 6, 12),
  new THREE.BoxGeometry(0.6, 0.6, 0.6),
];

const shapes = [];
for (let i = 0; i < SHAPE_COUNT; i++) {
  const geo = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
  const edgeGeo = new THREE.EdgesGeometry(geo);
  const color = accentArr[Math.floor(Math.random() * accentArr.length)];
  const mat = new THREE.LineBasicMaterial({
    color: color.getHex(),
    transparent: true,
    opacity: 0.3 + Math.random() * 0.25,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.LineSegments(edgeGeo, mat);
  mesh.position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 30 - 10
  );
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  const scale = 0.6 + Math.random() * 1.8;
  mesh.scale.setScalar(scale);
  scene.add(mesh);

  shapes.push({
    mesh,
    rotX: (Math.random() - 0.5) * 0.006,
    rotY: (Math.random() - 0.5) * 0.006,
    floatSpeed: 0.2 + Math.random() * 0.4,
    floatAmp: 0.3 + Math.random() * 1.0,
    baseY: mesh.position.y,
  });
}

/* ============================================
   5. PERSPECTIVE GRID FLOOR
   ============================================ */
const gridGeo = new THREE.PlaneGeometry(200, 200, 60, 60);
gridGeo.rotateX(-Math.PI / 2);
const gridMat = new THREE.MeshBasicMaterial({
  color: 0x1a1a5e,
  wireframe: true,
  transparent: true,
  opacity: 0.06,
});
const grid = new THREE.Mesh(gridGeo, gridMat);
grid.position.y = -14;
scene.add(grid);

/* ============================================
   6. AMBIENT LIGHTS (for subtle material lighting)
   ============================================ */
const ambientLight = new THREE.AmbientLight(0x222244, 0.3);
scene.add(ambientLight);

/* ============================================
   INTERACTION: Mouse & Scroll
   ============================================ */
const mouse = { x: 0, y: 0 };
const smoothMouse = { x: 0, y: 0 };

if (!isMobile) {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  });
}

let scrollProgress = 0;
window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - innerHeight;
  scrollProgress = max > 0 ? window.scrollY / max : 0;
}, { passive: true });

/* ============================================
   THEME API
   ============================================ */
window.setThreeTheme = function (mode) {
  const target = THEME[mode] || THEME.night;
  for (const key in target) {
    if (target[key] instanceof THREE.Color) {
      targetThemeColors[key] = target[key].clone();
    } else {
      targetThemeColors[key] = target[key];
    }
  }
  themeLerp = 0;
};

// Read initial theme from DOM
(function () {
  const initial = document.documentElement.getAttribute('data-theme') || 'night';
  const src = THEME[initial] || THEME.night;
  for (const key in src) {
    if (src[key] instanceof THREE.Color) {
      currentThemeColors[key] = src[key].clone();
      targetThemeColors[key]  = src[key].clone();
    } else {
      currentThemeColors[key] = src[key];
      targetThemeColors[key]  = src[key];
    }
  }
  // Apply immediately
  icoMat.color.copy(currentThemeColors.ico);
  ringMat.color.copy(currentThemeColors.ring);
  ring2Mat.color.copy(currentThemeColors.ring2);
  netPoints.material.color.copy(currentThemeColors.net);
  lineMat.color.copy(currentThemeColors.net);
  gridMat.color.copy(currentThemeColors.grid);
  ambientLight.color.copy(currentThemeColors.ambient);
  bloom.strength = isMobile ? Math.min(currentThemeColors.bloomStrength, 0.4) : currentThemeColors.bloomStrength;
})();

/* ============================================
   ANIMATION LOOP
   ============================================ */
const clock = new THREE.Clock();
const _lerpColor = new THREE.Color();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Theme color lerp
  if (themeLerp < 1) {
    themeLerp = Math.min(1, themeLerp + 0.02); // ~50 frames
    const a = themeLerp;
    for (const key in targetThemeColors) {
      if (targetThemeColors[key] instanceof THREE.Color) {
        currentThemeColors[key].lerp(targetThemeColors[key], a * 0.08 + 0.02);
      } else {
        currentThemeColors[key] += (targetThemeColors[key] - currentThemeColors[key]) * 0.05;
      }
    }
    icoMat.color.copy(currentThemeColors.ico);
    ringMat.color.copy(currentThemeColors.ring);
    ring2Mat.color.copy(currentThemeColors.ring2);
    netPoints.material.color.copy(currentThemeColors.net);
    lineMat.color.copy(currentThemeColors.net);
    gridMat.color.copy(currentThemeColors.grid);
    ambientLight.color.copy(currentThemeColors.ambient);
    bloom.strength = isMobile ? Math.min(currentThemeColors.bloomStrength, 0.4) : currentThemeColors.bloomStrength;
  }

  // Mouse parallax (smooth)
  smoothMouse.x += (mouse.x * 3 - smoothMouse.x) * 0.025;
  smoothMouse.y += (mouse.y * 2 - smoothMouse.y) * 0.025;
  camera.position.x = smoothMouse.x;
  camera.position.y = smoothMouse.y + scrollProgress * -2;
  camera.lookAt(0, scrollProgress * -2, 0);

  // 1. Starfield rotation
  stars.rotation.y = t * 0.012;
  stars.rotation.x = t * 0.006;

  // 2. Connected particles
  updateNetwork();

  // 3. Morphing icosahedron
  ico.rotation.x = t * 0.08;
  ico.rotation.y = t * 0.12;
  updateIcoMorph(t);

  // Rings orbit
  ring.rotation.x = t * 0.15 + 0.5;
  ring.rotation.y = t * 0.1;
  ring2.rotation.x = -t * 0.1 + 1.2;
  ring2.rotation.z = t * 0.08;

  // 4. Floating shapes
  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    s.mesh.rotation.x += s.rotX;
    s.mesh.rotation.y += s.rotY;
    s.mesh.position.y = s.baseY + Math.sin(t * s.floatSpeed + i) * s.floatAmp;
  }

  // 5. Grid scroll
  grid.position.z = -(t * 0.3) % 3.33;

  // Scroll-driven fade: hero objects fade as you scroll past hero
  const heroFade = THREE.MathUtils.clamp(1 - scrollProgress * 6, 0, 1);
  ico.material.opacity = 0.25 * heroFade;
  ring.material.opacity = 0.2 * heroFade;
  ring2.material.opacity = 0.12 * heroFade;

  // Network stays partially visible
  const netFade = 0.25 + 0.75 * heroFade;
  netPoints.material.opacity = 0.7 * netFade;
  lineMat.opacity = 0.12 * netFade;

  // Stars are always full
  // Shapes fade slightly with scroll
  const shapeFade = 0.5 + 0.5 * (1 - scrollProgress * 0.5);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].mesh.material.opacity = (0.3 + Math.random() * 0.01) * shapeFade;
  }

  composer.render();
}

animate();

/* ============================================
   RESIZE HANDLER
   ============================================ */
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});
