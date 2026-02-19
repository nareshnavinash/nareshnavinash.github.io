import * as THREE from 'three'
import grassVertexShader from '../Shaders/grassVertex.glsl'
import grassFragmentShader from '../Shaders/grassFragment.glsl'
import { areas } from '../../Data/worldConfig.js'

const BLADE_COUNT_DESKTOP = 50000
const BLADE_COUNT_MOBILE = 15000
const SPREAD = 80

export default class Grass {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene
    this.isMobile = game.viewport.isMobile

    const bladeCount = this.isMobile ? BLADE_COUNT_MOBILE : BLADE_COUNT_DESKTOP

    // Blade geometry (a simple triangle strip)
    const bladeGeo = new THREE.BufferGeometry()
    const bladeWidth = 0.06
    const bladeHeight = 0.6

    // Single blade: 3 vertices forming a thin triangle
    const bladeVerts = new Float32Array([
      -bladeWidth / 2, 0, 0,
       bladeWidth / 2, 0, 0,
       0, bladeHeight, 0,
    ])

    bladeGeo.setAttribute('position', new THREE.BufferAttribute(bladeVerts, 3))

    // Instance attributes
    const offsets = new Float32Array(bladeCount * 3)
    const bladeHeights = new Float32Array(bladeCount)
    const phases = new Float32Array(bladeCount)

    // Area centers to avoid placing grass on top of
    const areaCenters = Object.values(areas).map((a) => ({
      x: a.position.x,
      z: a.position.z,
      r: a.radius * 0.6,
    }))

    let placed = 0
    let attempts = 0
    const maxAttempts = bladeCount * 3

    while (placed < bladeCount && attempts < maxAttempts) {
      attempts++
      const x = (Math.random() - 0.5) * SPREAD * 2
      const z = (Math.random() - 0.5) * SPREAD * 2

      // Skip if too far from center
      const distFromCenter = Math.sqrt(x * x + z * z)
      if (distFromCenter > SPREAD) continue

      // Skip if inside area inner zone (paths/structures)
      let skip = false
      for (const a of areaCenters) {
        const dx = x - a.x
        const dz = z - a.z
        if (dx * dx + dz * dz < a.r * a.r) {
          skip = true
          break
        }
      }
      if (skip) continue

      const i = placed
      offsets[i * 3] = x
      offsets[i * 3 + 1] = 0
      offsets[i * 3 + 2] = z
      bladeHeights[i] = bladeHeight * (0.7 + Math.random() * 0.6)
      phases[i] = Math.random() * Math.PI * 2
      placed++
    }

    // Trim arrays if we placed fewer than expected
    const finalOffsets = placed < bladeCount ? offsets.slice(0, placed * 3) : offsets
    const finalHeights = placed < bladeCount ? bladeHeights.slice(0, placed) : bladeHeights
    const finalPhases = placed < bladeCount ? phases.slice(0, placed) : phases

    bladeGeo.setAttribute('offset', new THREE.InstancedBufferAttribute(finalOffsets, 3))
    bladeGeo.setAttribute('bladeHeight', new THREE.InstancedBufferAttribute(finalHeights, 1))
    bladeGeo.setAttribute('phase', new THREE.InstancedBufferAttribute(finalPhases, 1))

    // Shader material
    this.material = new THREE.ShaderMaterial({
      vertexShader: grassVertexShader,
      fragmentShader: grassFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWindStrength: { value: 0.3 },
        uPlayerPosition: { value: new THREE.Vector3() },
        uColorBase: { value: new THREE.Color(0x3d8830) },
        uColorTip: { value: new THREE.Color(0x7acc55) },
      },
      side: THREE.DoubleSide,
    })

    // Instanced mesh
    this.mesh = new THREE.InstancedMesh(bladeGeo, this.material, placed)
    this.mesh.frustumCulled = false
    this.scene.add(this.mesh)
  }

  update(dt, playerPosition) {
    this.material.uniforms.uTime.value = performance.now() / 1000
    if (playerPosition) {
      this.material.uniforms.uPlayerPosition.value.copy(playerPosition)
    }
  }

  destroy() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.material.dispose()
  }
}
