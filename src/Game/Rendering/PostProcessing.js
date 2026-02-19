import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

/**
 * Post-processing pipeline: bloom, FXAA, vignette.
 */
export default class PostProcessing {
  constructor(game) {
    this.game = game
    this.renderer = game.rendering.renderer
    this.scene = game.rendering.scene
    this.enabled = true

    const { width, height } = game.viewport
    const pixelRatio = game.viewport.pixelRatio

    // Composer
    this.composer = new EffectComposer(this.renderer)

    // Render pass
    this.renderPass = new RenderPass(this.scene, game.camera.instance)
    this.composer.addPass(this.renderPass)

    // Bloom - warm sunlight glow
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      game.viewport.isMobile ? 0.35 : 0.5,  // strength
      0.5,   // radius
      0.7    // threshold
    )
    this.composer.addPass(this.bloomPass)

    // FXAA
    this.fxaaPass = new ShaderPass(FXAAShader)
    this.fxaaPass.uniforms['resolution'].value.set(
      1 / (width * pixelRatio),
      1 / (height * pixelRatio)
    )
    this.composer.addPass(this.fxaaPass)

    // Vignette (custom shader pass)
    this.vignettePass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uDarkness: { value: 0.4 },
        uOffset: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uDarkness;
        uniform float uOffset;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          vec2 uv = (vUv - vec2(0.5)) * vec2(uOffset);
          float vignette = 1.0 - dot(uv, uv);
          texel.rgb *= mix(1.0 - uDarkness, 1.0, smoothstep(0.0, 1.0, vignette));
          gl_FragColor = texel;
        }
      `,
    })
    this.composer.addPass(this.vignettePass)

    // Listen for resize
    game.viewport.on(() => this._onResize())
  }

  _onResize() {
    const { width, height, pixelRatio } = this.game.viewport
    this.composer.setSize(width, height)
    this.composer.setPixelRatio(pixelRatio)
    this.bloomPass.resolution.set(width, height)
    this.fxaaPass.uniforms['resolution'].value.set(
      1 / (width * pixelRatio),
      1 / (height * pixelRatio)
    )
  }

  render(camera) {
    if (!this.enabled) return false
    this.renderPass.camera = camera
    this.composer.render()
    return true
  }

  setQuality(level) {
    if (level === 'low') {
      this.bloomPass.strength = 0.2
      this.fxaaPass.enabled = false
      this.vignettePass.enabled = false
    } else if (level === 'medium') {
      this.bloomPass.strength = 0.4
      this.fxaaPass.enabled = true
      this.vignettePass.enabled = true
    } else {
      this.bloomPass.strength = 0.6
      this.fxaaPass.enabled = true
      this.vignettePass.enabled = true
    }
  }

  destroy() {
    this.composer.dispose()
  }
}
