import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class HeroArea extends BaseArea {
    constructor(game, config) {
        super(game, config)

        // Central monument - a glowing column
        const columnGeo = new THREE.CylinderGeometry(0.6, 0.8, 4, 12)
        const columnMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a3e,
            roughness: 0.3,
            metalness: 0.4
        })
        this.column = new THREE.Mesh(columnGeo, columnMat)
        this.column.position.set(0, 2, -3)
        this.column.castShadow = true
        this.group.add(this.column)

        // Glowing top orb
        this.orb = this._createFloatingOrb(0, 4.8, -3, colors.mint.getHex(), 0.5)

        // Surrounding smaller orbs in a circle
        this.floatingOrbs = []
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2
            const r = 5
            const orb = this._createFloatingOrb(
                Math.cos(angle) * r,
                1.5 + Math.sin(i * 1.5) * 0.5,
                Math.sin(angle) * r,
                colors.lavender.getHex(),
                0.15
            )
            this.floatingOrbs.push({ mesh: orb, angle, baseY: orb.position.y })
        }
    }

    update(dt) {
        const t = performance.now() / 1000

        // Pulse main orb
        if (this.orb) {
            this.orb.position.y = 4.8 + Math.sin(t * 1.5) * 0.3
            this.orb.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.3
        }

        // Float surrounding orbs
        for (const orb of this.floatingOrbs) {
            orb.mesh.position.y = orb.baseY + Math.sin(t * 0.8 + orb.angle) * 0.4
        }
    }
}
