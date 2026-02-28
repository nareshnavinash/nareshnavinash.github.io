import * as THREE from 'three'

const LEAF_COUNT = 60

/**
 * Floating leaf particles - always present, density affected by wind.
 * Uses Points with custom positioning (no GLSL shader needed for small count).
 */
export default class LeafParticles {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene

        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(LEAF_COUNT * 3)
        this._velocities = []
        this._phases = []

        for (let i = 0; i < LEAF_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 80
            positions[i * 3 + 1] = 1 + Math.random() * 8
            positions[i * 3 + 2] = (Math.random() - 0.5) * 80

            this._velocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: -0.2 - Math.random() * 0.3,
                z: (Math.random() - 0.5) * 0.5
            })
            this._phases.push(Math.random() * Math.PI * 2)
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const leafColors = [0x4a7a2f, 0x6a8a3a, 0x8a6a2a, 0xaa7a3a]
        const colors = new Float32Array(LEAF_COUNT * 3)
        for (let i = 0; i < LEAF_COUNT; i++) {
            const c = new THREE.Color(leafColors[Math.floor(Math.random() * leafColors.length)])
            colors[i * 3] = c.r
            colors[i * 3 + 1] = c.g
            colors[i * 3 + 2] = c.b
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        this.material = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
            sizeAttenuation: true
        })

        this.points = new THREE.Points(geometry, this.material)
        this.points.frustumCulled = false
        this.scene.add(this.points)
    }

    update(dt, wind) {
        const positions = this.points.geometry.attributes.position.array
        const time = performance.now() / 1000

        for (let i = 0; i < LEAF_COUNT; i++) {
            const vel = this._velocities[i]
            const phase = this._phases[i]

            // Wind influence
            const windX = wind.direction.x * wind.strength * 2
            const windZ = wind.direction.y * wind.strength * 2

            // Spiral/flutter motion
            positions[i * 3] += (vel.x + windX + Math.sin(time * 2 + phase) * 0.3) * dt
            positions[i * 3 + 1] += (vel.y + Math.sin(time + phase) * 0.1) * dt
            positions[i * 3 + 2] += (vel.z + windZ + Math.cos(time * 1.5 + phase) * 0.3) * dt

            // Reset if too low or too far
            if (positions[i * 3 + 1] < 0 || Math.abs(positions[i * 3]) > 50 || Math.abs(positions[i * 3 + 2]) > 50) {
                positions[i * 3] = (Math.random() - 0.5) * 60
                positions[i * 3 + 1] = 4 + Math.random() * 6
                positions[i * 3 + 2] = (Math.random() - 0.5) * 60
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
