import * as THREE from 'three'
import snowVertexShader from '../../Shaders/snowVertex.glsl'
import snowFragmentShader from '../../Shaders/snowFragment.glsl'

const SNOW_COUNT_DESKTOP = 5000
const SNOW_COUNT_MOBILE = 2000
const SPREAD = 40

export default class SnowParticles {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene
        const count = game.viewport.isMobile ? SNOW_COUNT_MOBILE : SNOW_COUNT_DESKTOP

        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const speeds = new Float32Array(count)
        const offsets = new Float32Array(count)
        const startPositions = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * SPREAD * 2
            const y = Math.random() * 20
            const z = (Math.random() - 0.5) * SPREAD * 2

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            startPositions[i * 3] = x
            startPositions[i * 3 + 1] = y
            startPositions[i * 3 + 2] = z

            sizes[i] = 0.5 + Math.random() * 1.0
            speeds[i] = 0.5 + Math.random() * 0.5
            offsets[i] = Math.random()
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
        geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
        geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1))
        geometry.setAttribute('aStartPosition', new THREE.BufferAttribute(startPositions, 3))

        this.material = new THREE.ShaderMaterial({
            vertexShader: snowVertexShader,
            fragmentShader: snowFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uIntensity: { value: 0 },
                uPlayerPosition: { value: new THREE.Vector3() },
                uWindDirection: { value: new THREE.Vector2(1, 0) },
                uWindStrength: { value: 0.2 }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        this.points = new THREE.Points(geometry, this.material)
        this.points.frustumCulled = false
        this.points.visible = false
        this.scene.add(this.points)
    }

    update(dt, intensity, playerPosition, wind) {
        const visible = intensity > 0.01
        this.points.visible = visible
        if (!visible) return

        this.material.uniforms.uTime.value = performance.now() / 1000
        this.material.uniforms.uIntensity.value = intensity
        if (playerPosition) {
            this.material.uniforms.uPlayerPosition.value.copy(playerPosition)
        }
        this.material.uniforms.uWindDirection.value.copy(wind.direction)
        this.material.uniforms.uWindStrength.value = wind.strength
    }

    destroy() {
        this.scene.remove(this.points)
        this.points.geometry.dispose()
        this.material.dispose()
    }
}
