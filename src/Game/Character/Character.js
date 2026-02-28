import * as THREE from 'three'
import { colors } from '../../Data/colorPalette.js'

export default class Character {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene

        // Character group
        this.group = new THREE.Group()
        this.group.position.set(0, 0, 0)

        // Build capsule character
        this._buildMesh()

        this.scene.add(this.group)
    }

    _buildMesh() {
        // Body - capsule shape (cylinder + two spheres)
        const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.35, 1.0, 12)
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: colors.mint.clone().multiplyScalar(0.7),
            roughness: 0.4,
            metalness: 0.1
        })
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        body.position.y = 0.8
        body.castShadow = true
        this.group.add(body)

        // Head sphere
        const headGeometry = new THREE.SphereGeometry(0.3, 16, 12)
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0xffccaa,
            roughness: 0.5,
            metalness: 0.0
        })
        const head = new THREE.Mesh(headGeometry, headMaterial)
        head.position.y = 1.6
        head.castShadow = true
        this.group.add(head)

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.06, 8, 6)
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x222233 })

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
        leftEye.position.set(-0.1, 1.65, 0.25)
        this.group.add(leftEye)

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
        rightEye.position.set(0.1, 1.65, 0.25)
        this.group.add(rightEye)

        // Small glow indicator on top (like a beacon)
        const glowGeometry = new THREE.SphereGeometry(0.08, 8, 6)
        const glowMaterial = new THREE.MeshStandardMaterial({
            color: colors.mint,
            emissive: colors.mint,
            emissiveIntensity: 2
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        glow.position.y = 1.95
        this.group.add(glow)
        this.glowMesh = glow
    }

    get position() {
        return this.group.position
    }

    setPosition(x, y, z) {
        this.group.position.set(x, y, z)
    }

    setRotationY(angle) {
        this.group.rotation.y = angle
    }

    update(dt) {
        // Pulse the glow
        if (this.glowMesh) {
            const t = performance.now() / 1000
            this.glowMesh.material.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5
        }
    }

    destroy() {
        this.scene.remove(this.group)
        this.group.traverse((child) => {
            if (child.geometry) child.geometry.dispose()
            if (child.material) child.material.dispose()
        })
    }
}
