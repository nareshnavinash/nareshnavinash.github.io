import * as THREE from 'three'
import skyVertexShader from '../Shaders/skyVertex.glsl'
import skyFragmentShader from '../Shaders/skyFragment.glsl'

/**
 * Sky dome - large sphere with custom shader for gradient sky,
 * sun glow, and cloud cover.
 */
export default class Sky {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene

    const geometry = new THREE.SphereGeometry(120, 32, 16)

    this.material = new THREE.ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      uniforms: {
        uSkyTopColor: { value: new THREE.Color(0x87CEEB) },
        uSkyBottomColor: { value: new THREE.Color(0xb4d7e8) },
        uSunPosition: { value: new THREE.Vector3(50, 80, 30) },
        uSunIntensity: { value: 1.0 },
        uCloudCover: { value: 0 },
        uTime: { value: 0 },
      },
      side: THREE.BackSide,
      depthWrite: false,
    })

    this.mesh = new THREE.Mesh(geometry, this.material)
    this.scene.add(this.mesh)
  }

  update(dayNightState, cloudCover) {
    this.material.uniforms.uSkyTopColor.value.copy(dayNightState.skyTopColor)
    this.material.uniforms.uSkyBottomColor.value.copy(dayNightState.skyBottomColor)
    this.material.uniforms.uSunPosition.value.set(
      dayNightState.sunPosition.x,
      dayNightState.sunPosition.y,
      dayNightState.sunPosition.z
    )
    this.material.uniforms.uSunIntensity.value = dayNightState.sunIntensity
    this.material.uniforms.uCloudCover.value = cloudCover
    this.material.uniforms.uTime.value = performance.now() / 1000
  }

  destroy() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.material.dispose()
  }
}
