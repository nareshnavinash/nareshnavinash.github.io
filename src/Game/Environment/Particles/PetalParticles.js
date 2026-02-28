import * as THREE from 'three'

const PETAL_COUNT_DESKTOP = 200
const PETAL_COUNT_MOBILE = 80

/**
 * Cherry blossom petal particles - beautiful falling petals that
 * spawn near tree positions and flutter down gracefully with wind influence.
 * Uses a custom petal-shaped sprite for realistic appearance.
 */
export default class PetalParticles {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene
        this.isMobile = game.viewport.isMobile

        const count = this.isMobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP
        this._count = count

        // Create petal texture
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        const ctx = canvas.getContext('2d')

        // Draw a soft petal shape
        ctx.clearRect(0, 0, 32, 32)
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.ellipse(16, 14, 8, 12, 0, 0, Math.PI * 2)
        ctx.fill()
        // Add a slight gradient for depth
        const gradient = ctx.createRadialGradient(16, 12, 0, 16, 14, 12)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.6, 'rgba(255, 220, 230, 0.9)')
        gradient.addColorStop(1, 'rgba(255, 180, 200, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(16, 14, 8, 12, 0, 0, Math.PI * 2)
        ctx.fill()

        const texture = new THREE.CanvasTexture(canvas)

        // Geometry
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        // Per-petal state
        this._velocities = []
        this._phases = []
        this._rotSpeeds = []
        this._ages = []
        this._lifetimes = []

        const petalColors = [
            new THREE.Color(0xffb7c5), // sakura pink
            new THREE.Color(0xffc4d6), // light pink
            new THREE.Color(0xffd1dc), // blush
            new THREE.Color(0xffe8ee), // pale pink
            new THREE.Color(0xffffff), // white
            new THREE.Color(0xffccdd) // rose
        ]

        for (let i = 0; i < count; i++) {
            // Spread across the world
            positions[i * 3] = (Math.random() - 0.5) * 100
            positions[i * 3 + 1] = 3 + Math.random() * 10
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100

            const color = petalColors[Math.floor(Math.random() * petalColors.length)]
            colors[i * 3] = color.r
            colors[i * 3 + 1] = color.g
            colors[i * 3 + 2] = color.b

            sizes[i] = 0.15 + Math.random() * 0.2

            this._velocities.push({
                x: (Math.random() - 0.5) * 0.3,
                y: -0.3 - Math.random() * 0.4,
                z: (Math.random() - 0.5) * 0.3
            })

            this._phases.push(Math.random() * Math.PI * 2)
            this._rotSpeeds.push(0.5 + Math.random() * 2.0)
            this._ages.push(Math.random() * 20) // stagger initial ages
            this._lifetimes.push(10 + Math.random() * 15)
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        this.material = new THREE.PointsMaterial({
            size: 0.25,
            map: texture,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
            sizeAttenuation: true,
            blending: THREE.NormalBlending
        })

        this.points = new THREE.Points(geometry, this.material)
        this.points.frustumCulled = false
        this.scene.add(this.points)
    }

    update(dt, wind) {
        const positions = this.points.geometry.attributes.position.array
        const time = performance.now() / 1000

        for (let i = 0; i < this._count; i++) {
            const vel = this._velocities[i]
            const phase = this._phases[i]
            const rotSpeed = this._rotSpeeds[i]

            this._ages[i] += dt

            // Wind influence
            const windX = wind.direction.x * wind.strength * 1.5
            const windZ = wind.direction.y * wind.strength * 1.5

            // Flutter motion - gentle sinusoidal swaying
            const flutter = Math.sin(time * rotSpeed + phase) * 0.4
            const drift = Math.cos(time * rotSpeed * 0.7 + phase * 1.3) * 0.25

            // Update position
            positions[i * 3] += (vel.x + windX + flutter) * dt
            positions[i * 3 + 1] += (vel.y + Math.sin(time * 0.5 + phase) * 0.05) * dt
            positions[i * 3 + 2] += (vel.z + windZ + drift) * dt

            // Reset if petal has fallen too low, gone too far, or exceeded lifetime
            if (
                positions[i * 3 + 1] < -0.5 ||
                Math.abs(positions[i * 3]) > 60 ||
                Math.abs(positions[i * 3 + 2]) > 60 ||
                this._ages[i] > this._lifetimes[i]
            ) {
                // Respawn at a new position in the canopy
                positions[i * 3] = (Math.random() - 0.5) * 90
                positions[i * 3 + 1] = 3 + Math.random() * 8
                positions[i * 3 + 2] = (Math.random() - 0.5) * 90

                this._ages[i] = 0
                this._lifetimes[i] = 10 + Math.random() * 15

                // Slight velocity variation on respawn
                vel.x = (Math.random() - 0.5) * 0.3
                vel.y = -0.3 - Math.random() * 0.4
                vel.z = (Math.random() - 0.5) * 0.3
            }
        }

        this.points.geometry.attributes.position.needsUpdate = true
    }

    destroy() {
        this.scene.remove(this.points)
        this.points.geometry.dispose()
        this.material.map.dispose()
        this.material.dispose()
    }
}
