/**
 * Quality presets and game options.
 */

const QUALITY_PRESETS = {
  low: {
    shadows: false,
    postProcessing: false,
    grassCount: 10000,
    treeCount: 80,
    particleScale: 0.3,
    shadowMapSize: 1024,
  },
  medium: {
    shadows: true,
    postProcessing: true,
    grassCount: 30000,
    treeCount: 200,
    particleScale: 0.6,
    shadowMapSize: 1024,
  },
  high: {
    shadows: true,
    postProcessing: true,
    grassCount: 50000,
    treeCount: 300,
    particleScale: 1.0,
    shadowMapSize: 2048,
  },
}

export default class Options {
  constructor(game) {
    this.game = game

    // Detect initial quality
    this.quality = game.viewport.isMobile ? 'low' : 'high'
    this.soundEnabled = true
    this.soundVolume = 0.5

    // Day/night lock
    this.dayNightLocked = false
    this.lockedTimeOfDay = 0.35

    // Weather lock
    this.weatherLocked = false
    this.lockedWeather = 'clear'
  }

  getPreset() {
    return QUALITY_PRESETS[this.quality]
  }

  setQuality(level) {
    if (!QUALITY_PRESETS[level]) return
    this.quality = level

    // Apply shadow settings
    this.game.rendering.renderer.shadowMap.enabled = QUALITY_PRESETS[level].shadows

    // Apply post-processing
    if (this.game.postProcessing) {
      this.game.postProcessing.enabled = QUALITY_PRESETS[level].postProcessing
      this.game.postProcessing.setQuality(level)
    }
  }

  destroy() {}
}
