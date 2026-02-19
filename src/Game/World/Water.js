import * as THREE from 'three'
import { colors } from '../../Data/colorPalette.js'

export default class Water {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene

    // Water plane at the edges/low areas
    const geometry = new THREE.PlaneGeometry(250, 250, 32, 32)
    geometry.rotateX(-Math.PI / 2)

    this.material = new THREE.MeshStandardMaterial({
      color: colors.waterBlue,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.75,
      envMapIntensity: 1.0,
    })

    this.mesh = new THREE.Mesh(geometry, this.material)
    this.mesh.position.y = -0.8
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)

    // Store original positions for wave animation
    this.originalPositions = geometry.attributes.position.array.slice()
  }

  update(dt) {
    const time = performance.now() / 1000
    const positions = this.mesh.geometry.attributes.position.array

    for (let i = 0; i < positions.length; i += 3) {
      const x = this.originalPositions[i]
      const z = this.originalPositions[i + 2]

      // Gentle waves
      positions[i + 1] =
        this.originalPositions[i + 1] +
        Math.sin(x * 0.1 + time * 0.8) * 0.15 +
        Math.cos(z * 0.08 + time * 0.6) * 0.1
    }

    this.mesh.geometry.attributes.position.needsUpdate = true
    this.mesh.geometry.computeVertexNormals()
  }

  destroy() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.material.dispose()
  }
}
