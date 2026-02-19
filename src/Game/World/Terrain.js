import * as THREE from 'three'
import { colors } from '../../Data/colorPalette.js'

export default class Terrain {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene

    // Ground plane
    const geometry = new THREE.PlaneGeometry(200, 200, 64, 64)
    geometry.rotateX(-Math.PI / 2)

    const material = new THREE.MeshStandardMaterial({
      color: colors.terrainGreen,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: true,
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.receiveShadow = true
    this.mesh.position.y = 0
    this.scene.add(this.mesh)

    // Add subtle height variation
    this._addHeightVariation()

    // Edge fade - circular boundary
    this._addEdgeFade()
  }

  _addHeightVariation() {
    const positions = this.mesh.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      // Gentle rolling hills
      const height =
        Math.sin(x * 0.03) * 0.5 +
        Math.cos(z * 0.04) * 0.4 +
        Math.sin(x * 0.08 + z * 0.06) * 0.2
      positions[i + 1] = height
    }
    this.mesh.geometry.attributes.position.needsUpdate = true
    this.mesh.geometry.computeVertexNormals()
  }

  _addEdgeFade() {
    // Add a ring of fog/mist at edges using a large ring
    const ringGeometry = new THREE.RingGeometry(85, 105, 64)
    ringGeometry.rotateX(-Math.PI / 2)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: colors.fogColor,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.y = 0.1
    this.scene.add(ring)
    this.edgeRing = ring
  }

  destroy() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    if (this.edgeRing) {
      this.scene.remove(this.edgeRing)
      this.edgeRing.geometry.dispose()
      this.edgeRing.material.dispose()
    }
  }
}
