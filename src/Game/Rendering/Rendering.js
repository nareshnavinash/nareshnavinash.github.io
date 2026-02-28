import * as THREE from 'three'

export default class Rendering {
    constructor(game) {
        this.game = game
        this.canvas = game.canvas
        this.viewport = game.viewport

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: !this.viewport.isMobile,
            alpha: false
        })
        this.renderer.setSize(this.viewport.width, this.viewport.height)
        this.renderer.setPixelRatio(this.viewport.pixelRatio)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 1.6
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.outputColorSpace = THREE.SRGBColorSpace

        // Scene
        this.scene = new THREE.Scene()

        // Resize
        this.viewport.on(() => this._onResize())
    }

    _onResize() {
        this.renderer.setSize(this.viewport.width, this.viewport.height)
        this.renderer.setPixelRatio(this.viewport.pixelRatio)
    }

    render(camera) {
        this.renderer.render(this.scene, camera)
    }

    destroy() {
        this.renderer.dispose()
    }
}
