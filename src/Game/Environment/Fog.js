import * as THREE from 'three'
import { colors } from '../../Data/colorPalette.js'

export default class Fog {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene

        // Already set in Game.js, but we manage it here for day/night
        if (!this.scene.fog) {
            this.scene.fog = new THREE.FogExp2(colors.fogColor.getHex(), 0.008)
        }
        this.fog = this.scene.fog
    }

    setColor(color) {
        this.fog.color.copy(color)
    }

    setDensity(density) {
        this.fog.density = density
    }

    destroy() {}
}
