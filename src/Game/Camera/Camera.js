import * as THREE from 'three'
import { dampedLerp } from '../../Utils/math.js'

export default class Camera {
  constructor(game) {
    this.game = game
    this.viewport = game.viewport
    this.inputs = game.inputs

    // PerspectiveCamera
    this.instance = new THREE.PerspectiveCamera(
      55,
      this.viewport.aspect,
      0.1,
      500
    )

    // Third-person offset from character
    this.offset = new THREE.Vector3(0, 8, 12)
    this.lookAtOffset = new THREE.Vector3(0, 1.5, 0)

    // Smoothing
    this.smoothPosition = new THREE.Vector3()
    this.smoothLookAt = new THREE.Vector3()
    this.followDamping = 5 // Higher = snappier
    this.rotateDamping = 3

    // Camera orbit angle (mouse controls)
    this.orbitAngle = 0 // Horizontal rotation around character
    this.orbitPitch = 0.3 // Slight downward pitch
    this.mouseSensitivity = 0.003

    // Initialize
    this.instance.position.set(0, 8, 12)
    this.smoothPosition.copy(this.instance.position)

    // Resize
    this.viewport.on(() => this._onResize())
  }

  _onResize() {
    this.instance.aspect = this.viewport.aspect
    this.instance.updateProjectionMatrix()
  }

  update(dt, characterPosition) {
    if (!characterPosition) return

    // Update orbit angle from mouse delta
    if (this.inputs.isPointerLocked) {
      this.orbitAngle -= this.inputs.mouseDelta.x * this.mouseSensitivity
      this.orbitPitch -= this.inputs.mouseDelta.y * this.mouseSensitivity * 0.5
      this.orbitPitch = Math.max(-0.2, Math.min(0.8, this.orbitPitch))
    }

    // Calculate camera position based on orbit
    const distance = this.offset.length()
    const height = 4 + this.orbitPitch * 10
    const horizontalDist = Math.sqrt(Math.max(0, distance * distance - height * height)) || distance * 0.8

    const targetPosition = new THREE.Vector3(
      characterPosition.x + Math.sin(this.orbitAngle) * horizontalDist,
      characterPosition.y + height,
      characterPosition.z + Math.cos(this.orbitAngle) * horizontalDist
    )

    // Look-at target
    const targetLookAt = new THREE.Vector3(
      characterPosition.x + this.lookAtOffset.x,
      characterPosition.y + this.lookAtOffset.y,
      characterPosition.z + this.lookAtOffset.z
    )

    // Smooth follow
    this.smoothPosition.x = dampedLerp(this.smoothPosition.x, targetPosition.x, this.followDamping, dt)
    this.smoothPosition.y = dampedLerp(this.smoothPosition.y, targetPosition.y, this.followDamping, dt)
    this.smoothPosition.z = dampedLerp(this.smoothPosition.z, targetPosition.z, this.followDamping, dt)

    this.smoothLookAt.x = dampedLerp(this.smoothLookAt.x, targetLookAt.x, this.followDamping, dt)
    this.smoothLookAt.y = dampedLerp(this.smoothLookAt.y, targetLookAt.y, this.followDamping, dt)
    this.smoothLookAt.z = dampedLerp(this.smoothLookAt.z, targetLookAt.z, this.followDamping, dt)

    this.instance.position.copy(this.smoothPosition)
    this.instance.lookAt(this.smoothLookAt)
  }

  destroy() {}
}
