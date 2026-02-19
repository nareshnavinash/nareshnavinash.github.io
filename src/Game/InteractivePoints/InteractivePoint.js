import * as THREE from 'three'
import { colors } from '../../Data/colorPalette.js'

export default class InteractivePoint {
  constructor(game, config, areaPosition) {
    this.game = game
    this.scene = game.rendering.scene
    this.config = config
    this.id = config.id
    this.contentKey = config.contentKey
    this.innerRadius = config.innerRadius
    this.outerRadius = config.outerRadius

    // World position = area position + offset
    this.worldPosition = new THREE.Vector3(
      areaPosition.x + config.offset.x,
      0.5,
      areaPosition.z + config.offset.z
    )

    this.isPlayerInOuter = false
    this.isPlayerInInner = false
    this.isActive = false

    // 3D Marker
    this._createMarker()

    // HTML label
    this._createLabel(config.label)
  }

  _createMarker() {
    // Diamond-shaped marker
    const geo = new THREE.OctahedronGeometry(0.4, 0)
    const mat = new THREE.MeshStandardMaterial({
      color: colors.mint.getHex(),
      emissive: colors.mint.getHex(),
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9,
    })
    this.marker = new THREE.Mesh(geo, mat)
    this.marker.position.copy(this.worldPosition)
    this.marker.position.y = 2.5
    this.scene.add(this.marker)

    // Ring below marker
    const ringGeo = new THREE.TorusGeometry(0.6, 0.03, 8, 24)
    const ringMat = new THREE.MeshBasicMaterial({
      color: colors.mint.getHex(),
      transparent: true,
      opacity: 0.4,
    })
    this.ring = new THREE.Mesh(ringGeo, ringMat)
    this.ring.position.copy(this.worldPosition)
    this.ring.position.y = 0.1
    this.ring.rotation.x = -Math.PI / 2
    this.scene.add(this.ring)
  }

  _createLabel(text) {
    // We use the HTML overlay for labels instead of CSS2DObject
    // Labels are managed by InteractiveManager via screen-space projection
    this.label = text
  }

  update(dt, characterPosition, camera) {
    const dx = characterPosition.x - this.worldPosition.x
    const dz = characterPosition.z - this.worldPosition.z
    const dist = Math.sqrt(dx * dx + dz * dz)

    this.isPlayerInOuter = dist < this.outerRadius
    this.isPlayerInInner = dist < this.innerRadius

    // Animate marker
    const t = performance.now() / 1000
    this.marker.rotation.y += dt * 1.5
    this.marker.position.y = 2.5 + Math.sin(t * 2) * 0.2

    // Pulse when player is near
    if (this.isPlayerInOuter) {
      this.marker.material.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.3
      this.ring.material.opacity = 0.6 + Math.sin(t * 3) * 0.2
    } else {
      this.marker.material.emissiveIntensity = 0.5
      this.ring.material.opacity = 0.2
    }

    // Scale ring when in inner radius
    if (this.isPlayerInInner) {
      this.ring.scale.setScalar(1.2 + Math.sin(t * 4) * 0.1)
    } else {
      this.ring.scale.setScalar(1.0)
    }
  }

  getScreenPosition(camera) {
    const pos = this.marker.position.clone()
    pos.y += 0.8
    pos.project(camera.instance)
    return {
      x: (pos.x * 0.5 + 0.5) * window.innerWidth,
      y: (-pos.y * 0.5 + 0.5) * window.innerHeight,
      z: pos.z, // For depth testing
    }
  }

  destroy() {
    this.scene.remove(this.marker)
    this.scene.remove(this.ring)
    this.marker.geometry.dispose()
    this.marker.material.dispose()
    this.ring.geometry.dispose()
    this.ring.material.dispose()
  }
}
