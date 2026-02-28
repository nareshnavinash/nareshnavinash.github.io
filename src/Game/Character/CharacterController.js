import * as THREE from 'three'
import { dampedLerp } from '../../Utils/math.js'

export default class CharacterController {
    constructor(game) {
        this.game = game
        this.character = game.character
        this.inputs = game.inputs
        this.camera = game.camera

        // Movement
        this.moveSpeed = 8
        this.rotationSpeed = 10
        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()
        this.targetRotation = 0
        this.currentRotation = 0

        // Ground
        this.groundY = 0
        this.gravity = -20
        this.verticalVelocity = 0
        this.isGrounded = true

        // Raycaster for ground detection
        this.raycaster = new THREE.Raycaster()
        this.raycaster.far = 50
        this._rayOrigin = new THREE.Vector3()
        this._rayDir = new THREE.Vector3(0, -1, 0)
    }

    update(dt) {
        const forward = this.inputs.forward
        const right = this.inputs.right

        const hasInput = forward !== 0 || right !== 0

        if (hasInput) {
            // Get camera-relative direction
            const cameraAngle = this.camera.orbitAngle

            // Calculate movement direction relative to camera
            this.direction.set(0, 0, 0)
            this.direction.x = right
            this.direction.z = forward

            // Rotate direction by camera angle
            const cos = Math.cos(cameraAngle)
            const sin = Math.sin(cameraAngle)
            const dx = this.direction.x * cos - this.direction.z * sin
            const dz = this.direction.x * sin + this.direction.z * cos
            this.direction.x = dx
            this.direction.z = dz

            this.direction.normalize()

            // Set velocity
            this.velocity.x = this.direction.x * this.moveSpeed
            this.velocity.z = this.direction.z * this.moveSpeed

            // Calculate target rotation (face movement direction)
            this.targetRotation = Math.atan2(this.direction.x, this.direction.z)
        } else {
            // Decelerate
            this.velocity.x *= 0.85
            this.velocity.z *= 0.85
            if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0
            if (Math.abs(this.velocity.z) < 0.01) this.velocity.z = 0
        }

        // Apply movement
        const pos = this.character.position
        pos.x += this.velocity.x * dt
        pos.z += this.velocity.z * dt

        // Ground raycast
        this._updateGround(dt)

        // Smooth rotation
        if (hasInput) {
            // Shortest angle rotation
            let angleDiff = this.targetRotation - this.currentRotation
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
            this.currentRotation += angleDiff * Math.min(1, this.rotationSpeed * dt)
        }
        this.character.setRotationY(this.currentRotation)

        // Clamp to world bounds
        const bound = 100
        pos.x = Math.max(-bound, Math.min(bound, pos.x))
        pos.z = Math.max(-bound, Math.min(bound, pos.z))
    }

    _updateGround(dt) {
        const pos = this.character.position

        // Cast ray downward from above character
        this._rayOrigin.set(pos.x, pos.y + 5, pos.z)
        this.raycaster.set(this._rayOrigin, this._rayDir)

        const terrain = this.game.world?.terrain?.mesh
        if (terrain) {
            const intersects = this.raycaster.intersectObject(terrain)
            if (intersects.length > 0) {
                this.groundY = intersects[0].point.y
            }
        }

        // Simple gravity
        if (pos.y > this.groundY) {
            this.verticalVelocity += this.gravity * dt
            pos.y += this.verticalVelocity * dt
            if (pos.y <= this.groundY) {
                pos.y = this.groundY
                this.verticalVelocity = 0
                this.isGrounded = true
            }
        } else {
            pos.y = this.groundY
            this.verticalVelocity = 0
            this.isGrounded = true
        }
    }

    destroy() {}
}
