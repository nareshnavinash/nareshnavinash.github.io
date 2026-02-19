import * as THREE from 'three'
import { lerp } from '../../Utils/math.js'

/**
 * Day/Night cycle manager.
 * Full cycle: 5 minutes (300 seconds).
 * Phases: midnight -> dawn -> noon -> dusk -> midnight
 * timeOfDay: 0 = midnight, 0.25 = dawn, 0.5 = noon, 0.75 = dusk
 */

// Color stops for sky, fog, and ambient
const SKY_COLORS = {
  midnight: { top: new THREE.Color(0x0a0a2e), bottom: new THREE.Color(0x101035) },
  dawn:     { top: new THREE.Color(0x6a80c0), bottom: new THREE.Color(0xf0a870) },
  noon:     { top: new THREE.Color(0x5eaadd), bottom: new THREE.Color(0xc8e0f0) },
  dusk:     { top: new THREE.Color(0x5a2040), bottom: new THREE.Color(0xd06030) },
}

const FOG_COLORS = {
  midnight: new THREE.Color(0x0a0a20),
  dawn:     new THREE.Color(0xc8a890),
  noon:     new THREE.Color(0xc8dde8),
  dusk:     new THREE.Color(0x7a4040),
}

const SUN_COLORS = {
  midnight: new THREE.Color(0x2222aa),
  dawn:     new THREE.Color(0xffaa66),
  noon:     new THREE.Color(0xfff8e8),
  dusk:     new THREE.Color(0xff6622),
}

const AMBIENT_INTENSITIES = {
  midnight: 0.08,
  dawn: 0.3,
  noon: 0.5,
  dusk: 0.15,
}

const SUN_INTENSITIES = {
  midnight: 0.05,
  dawn: 1.0,
  noon: 2.0,
  dusk: 0.5,
}

const HEMI_INTENSITIES = {
  midnight: 0.1,
  dawn: 0.5,
  noon: 0.9,
  dusk: 0.3,
}

const FOG_DENSITIES = {
  midnight: 0.012,
  dawn: 0.007,
  noon: 0.005,
  dusk: 0.01,
}

const CYCLE_DURATION = 300 // seconds

export default class DayNightCycle {
  constructor(game) {
    this.game = game
    // Start at early morning (0.35 = between dawn and noon)
    this.timeOfDay = 0.35
    this.locked = false

    // Working colors (avoid allocations per frame)
    this._skyTop = new THREE.Color()
    this._skyBottom = new THREE.Color()
    this._fogColor = new THREE.Color()
    this._sunColor = new THREE.Color()
  }

  /** Lock/unlock cycle progression */
  lock(time) {
    this.locked = true
    if (time !== undefined) this.timeOfDay = time
  }

  unlock() {
    this.locked = false
  }

  update(dt) {
    if (!this.locked) {
      this.timeOfDay += dt / CYCLE_DURATION
      if (this.timeOfDay >= 1) this.timeOfDay -= 1
    }

    return this._computeState()
  }

  _computeState() {
    const t = this.timeOfDay

    // Determine which two phases we're between and the blend factor
    let phase1, phase2, blend
    if (t < 0.25) {
      phase1 = 'midnight'; phase2 = 'dawn'; blend = t / 0.25
    } else if (t < 0.5) {
      phase1 = 'dawn'; phase2 = 'noon'; blend = (t - 0.25) / 0.25
    } else if (t < 0.75) {
      phase1 = 'noon'; phase2 = 'dusk'; blend = (t - 0.5) / 0.25
    } else {
      phase1 = 'dusk'; phase2 = 'midnight'; blend = (t - 0.75) / 0.25
    }

    // Smooth blend with ease in-out
    const s = blend * blend * (3 - 2 * blend)

    // Sky
    this._skyTop.copy(SKY_COLORS[phase1].top).lerp(SKY_COLORS[phase2].top, s)
    this._skyBottom.copy(SKY_COLORS[phase1].bottom).lerp(SKY_COLORS[phase2].bottom, s)

    // Fog
    this._fogColor.copy(FOG_COLORS[phase1]).lerp(FOG_COLORS[phase2], s)

    // Sun
    this._sunColor.copy(SUN_COLORS[phase1]).lerp(SUN_COLORS[phase2], s)

    // Sun position (arc across the sky)
    const sunAngle = t * Math.PI * 2 - Math.PI / 2
    const sunX = Math.cos(sunAngle) * 60
    const sunY = Math.sin(sunAngle) * 80
    const sunZ = 30

    return {
      skyTopColor: this._skyTop,
      skyBottomColor: this._skyBottom,
      fogColor: this._fogColor,
      fogDensity: lerp(FOG_DENSITIES[phase1], FOG_DENSITIES[phase2], s),
      sunColor: this._sunColor,
      sunIntensity: lerp(SUN_INTENSITIES[phase1], SUN_INTENSITIES[phase2], s),
      sunPosition: { x: sunX, y: Math.max(sunY, -10), z: sunZ },
      ambientIntensity: lerp(AMBIENT_INTENSITIES[phase1], AMBIENT_INTENSITIES[phase2], s),
      hemiIntensity: lerp(HEMI_INTENSITIES[phase1], HEMI_INTENSITIES[phase2], s),
      timeOfDay: t,
      isNight: t < 0.2 || t > 0.8,
      isDawn: t >= 0.2 && t < 0.35,
      isDusk: t >= 0.65 && t < 0.8,
    }
  }

  destroy() {}
}
