import * as THREE from 'three'

/**
 * Wind system - provides direction and strength fed to grass, tree, and particle shaders.
 * Gradually shifts direction and gusts.
 */
export default class Wind {
  constructor() {
    this.direction = new THREE.Vector2(1, 0) // normalized XZ direction
    this.strength = 0.3
    this.gustStrength = 0
    this.baseStrength = 0.3

    // Internal
    this._angle = 0
    this._targetAngle = 0
    this._gustTimer = 0
    this._nextGustTime = 5 + Math.random() * 10
    this._gustDuration = 0
    this._gustElapsed = 0
  }

  /** Set wind parameters from weather state */
  setWeatherWind(baseStrength) {
    this.baseStrength = baseStrength
  }

  update(dt) {
    // Slowly drift wind direction
    this._angle += (this._targetAngle - this._angle) * dt * 0.5

    // Periodically pick a new target angle
    this._gustTimer += dt
    if (this._gustTimer > this._nextGustTime) {
      this._targetAngle += (Math.random() - 0.5) * Math.PI * 0.5
      this._gustDuration = 1 + Math.random() * 3
      this._gustElapsed = 0
      this._gustTimer = 0
      this._nextGustTime = 5 + Math.random() * 15
    }

    // Gust effect
    if (this._gustElapsed < this._gustDuration) {
      this._gustElapsed += dt
      const gustProgress = this._gustElapsed / this._gustDuration
      // Bell curve for gust
      this.gustStrength = Math.sin(gustProgress * Math.PI) * 0.3
    } else {
      this.gustStrength = 0
    }

    this.strength = this.baseStrength + this.gustStrength
    this.direction.set(Math.cos(this._angle), Math.sin(this._angle))
  }

  destroy() {}
}
