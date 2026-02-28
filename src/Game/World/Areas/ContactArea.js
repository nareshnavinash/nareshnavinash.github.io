import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class ContactArea extends BaseArea {
    constructor(game, config) {
        super(game, config)

        this._createSign(0, -5, 'Contact', colors.mint.getHex())

        // Mailbox-like structure
        const boxGeo = new THREE.BoxGeometry(1.2, 1.5, 0.8)
        const boxMat = new THREE.MeshStandardMaterial({
            color: 0x1a2a3a,
            roughness: 0.5,
            metalness: 0.3
        })
        const mailbox = new THREE.Mesh(boxGeo, boxMat)
        mailbox.position.set(0, 0.75, 0)
        mailbox.castShadow = true
        this.group.add(mailbox)
        this.decorations.push(mailbox)

        // Antenna/beacon on top
        const antennaGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6)
        const antennaMat = new THREE.MeshStandardMaterial({ color: 0x666688 })
        const antenna = new THREE.Mesh(antennaGeo, antennaMat)
        antenna.position.set(0, 2.25, 0)
        this.group.add(antenna)
        this.decorations.push(antenna)

        // Pulsing beacon
        this.beacon = this._createFloatingOrb(0, 3.1, 0, colors.mint.getHex(), 0.15)

        // Signal rings
        this.rings = []
        for (let i = 0; i < 3; i++) {
            const ringGeo = new THREE.TorusGeometry(0.3 + i * 0.4, 0.02, 8, 24)
            const ringMat = new THREE.MeshBasicMaterial({
                color: colors.mint.getHex(),
                transparent: true,
                opacity: 0.3 - i * 0.08
            })
            const ring = new THREE.Mesh(ringGeo, ringMat)
            ring.position.set(0, 3.1, 0)
            ring.rotation.x = Math.PI / 2
            this.group.add(ring)
            this.rings.push({ mesh: ring, baseScale: 1 + i * 0.5, index: i })
            this.decorations.push(ring)
        }
    }

    update(dt) {
        const t = performance.now() / 1000

        // Pulse beacon
        if (this.beacon) {
            this.beacon.material.emissiveIntensity = 0.5 + Math.sin(t * 3) * 0.3
        }

        // Animate signal rings
        for (const ring of this.rings) {
            const pulse = (Math.sin(t * 1.5 - ring.index * 0.5) + 1) * 0.5
            ring.mesh.scale.setScalar(ring.baseScale + pulse * 0.3)
            ring.mesh.material.opacity = 0.3 * (1 - pulse * 0.6)
        }
    }
}
