import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class CareerArea extends BaseArea {
    constructor(game, config) {
        super(game, config)

        this._createSign(0, -8, 'Experience', colors.peach.getHex())

        // Timeline pillars - 7 pillars of increasing height
        this.pillars = []
        for (let i = 0; i < 7; i++) {
            const angle = (i / 7) * Math.PI * 1.5 - Math.PI * 0.5
            const r = 6
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r
            const height = 1.0 + i * 0.4
            const pillar = this._createPillar(x, z, height, colors.peach.getHex())
            this.pillars.push(pillar)
        }

        // Connecting lines between pillars (timeline effect)
        const lineGeo = new THREE.BufferGeometry()
        const points = this.pillars.map(
            (p) => new THREE.Vector3(p.position.x, p.position.y + p.geometry.parameters.height / 2, p.position.z)
        )
        lineGeo.setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({
            color: colors.peach.getHex(),
            transparent: true,
            opacity: 0.4
        })
        const line = new THREE.Line(lineGeo, lineMat)
        this.group.add(line)
    }

    update(dt) {
        // Subtle pulse on pillars
        const t = performance.now() / 1000
        this.pillars.forEach((p, i) => {
            p.material.emissive = colors.peach
            p.material.emissiveIntensity = 0.05 + Math.sin(t + i * 0.5) * 0.03
        })
    }
}
