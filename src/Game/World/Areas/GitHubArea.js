import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class GitHubArea extends BaseArea {
    constructor(game, config) {
        super(game, config)

        this._createSign(0, -6, 'GitHub', colors.mint.getHex())

        // Server rack - 3 stacked boxes
        const boxColor = 0x1a1a2e
        for (let i = 0; i < 3; i++) {
            const geo = new THREE.BoxGeometry(1.6, 0.8, 1)
            const mat = new THREE.MeshStandardMaterial({
                color: boxColor,
                roughness: 0.4,
                metalness: 0.2
            })
            const box = new THREE.Mesh(geo, mat)
            box.position.set(0, 0.4 + i * 0.85, 0)
            box.castShadow = true
            this.group.add(box)
            this.decorations.push(box)
        }

        // Accent strip on the rack
        const stripGeo = new THREE.BoxGeometry(1.7, 0.06, 1.05)
        const stripMat = new THREE.MeshStandardMaterial({
            color: colors.mint.getHex(),
            emissive: colors.mint.getHex(),
            emissiveIntensity: 0.3
        })
        const strip = new THREE.Mesh(stripGeo, stripMat)
        strip.position.set(0, 2.95, 0)
        this.group.add(strip)
        this.decorations.push(strip)

        // 6 orbiting repo nodes
        this.nodes = []
        const nodePositions = []
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2
            const x = Math.cos(angle) * 4
            const z = Math.sin(angle) * 4
            const orb = this._createFloatingOrb(x, 2, z, colors.mint.getHex(), 0.25)
            this.nodes.push({ mesh: orb, baseY: 2, index: i, angle })
            nodePositions.push(new THREE.Vector3(x, 2, z))
        }

        // Connecting lines between adjacent nodes
        const lineMat = new THREE.LineBasicMaterial({
            color: colors.mint.getHex(),
            transparent: true,
            opacity: 0.2
        })
        for (let i = 0; i < 6; i++) {
            const points = [nodePositions[i], nodePositions[(i + 1) % 6]]
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
            const line = new THREE.Line(lineGeo, lineMat)
            this.group.add(line)
            this.decorations.push(line)
        }
    }

    update(dt) {
        const t = performance.now() / 1000
        for (const node of this.nodes) {
            node.mesh.position.y = node.baseY + Math.sin(t * 0.6 + node.index * 1.05) * 0.3
        }
    }
}
