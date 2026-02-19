import * as THREE from 'three'

const DUST_COUNT = 100

/**
 * Ambient dust motes - small particles that drift through the air,
 * more visible in light shafts (near areas).
 */
export default class DustParticles {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(DUST_COUNT * 3)
    this._phases = new Float32Array(DUST_COUNT)

    for (let i = 0; i < DUST_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = 0.5 + Math.random() * 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      this._phases[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    this.material = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xffffee,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    this.points = new THREE.Points(geometry, this.material)
    this.points.frustumCulled = false
    this.scene.add(this.points)
  }

  update(dt, playerPosition, wind) {
    const positions = this.points.geometry.attributes.position.array
    const time = performance.now() / 1000

    for (let i = 0; i < DUST_COUNT; i++) {
      const phase = this._phases[i]

      // Slow drifting motion
      positions[i * 3] += (Math.sin(time * 0.3 + phase) * 0.1 + wind.direction.x * wind.strength * 0.3) * dt
      positions[i * 3 + 1] += Math.sin(time * 0.5 + phase * 2) * 0.05 * dt
      positions[i * 3 + 2] += (Math.cos(time * 0.25 + phase) * 0.1 + wind.direction.y * wind.strength * 0.3) * dt

      // Keep near player
      if (playerPosition) {
        const dx = positions[i * 3] - playerPosition.x
        const dz = positions[i * 3 + 2] - playerPosition.z
        if (dx * dx + dz * dz > 400) {
          positions[i * 3] = playerPosition.x + (Math.random() - 0.5) * 30
          positions[i * 3 + 1] = 0.5 + Math.random() * 4
          positions[i * 3 + 2] = playerPosition.z + (Math.random() - 0.5) * 30
        }
      }
    }

    this.points.geometry.attributes.position.needsUpdate = true
  }

  destroy() {
    this.scene.remove(this.points)
    this.points.geometry.dispose()
    this.material.dispose()
  }
}
