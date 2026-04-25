import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class MediumArea extends BaseArea {
    constructor(game, config) {
        super(game, config)

        this._createSign(0, -6, 'Medium', colors.blue.getHex())

        // Open book - two tilted pages
        const pageMat = new THREE.MeshStandardMaterial({
            color: 0xeeeedd,
            side: THREE.DoubleSide,
            roughness: 0.8
        })
        const leftPage = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.5), pageMat)
        leftPage.position.set(-1.1, 1.5, 0)
        leftPage.rotation.set(0, 0.3, 0)
        this.group.add(leftPage)
        this.decorations.push(leftPage)

        const rightPage = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.5), pageMat)
        rightPage.position.set(1.1, 1.5, 0)
        rightPage.rotation.set(0, -0.3, 0)
        this.group.add(rightPage)
        this.decorations.push(rightPage)

        // Blue-emissive spine
        const spineGeo = new THREE.BoxGeometry(0.1, 2.5, 0.5)
        const spineMat = new THREE.MeshStandardMaterial({
            color: colors.blue.getHex(),
            emissive: colors.blue.getHex(),
            emissiveIntensity: 0.3
        })
        const spine = new THREE.Mesh(spineGeo, spineMat)
        spine.position.set(0, 1.5, 0)
        this.group.add(spine)
        this.decorations.push(spine)

        // 4 floating article planes
        this.articles = []
        const articleMat = new THREE.MeshStandardMaterial({
            color: 0xddddcc,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        })
        for (let i = 0; i < 4; i++) {
            const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.8), articleMat)
            const angle = (i / 4) * Math.PI * 2 + 0.5
            plane.position.set(Math.cos(angle) * 3, 2.5 + i * 0.3, Math.sin(angle) * 3)
            plane.rotation.set(0.1 * i, angle + 0.5, 0.05)
            this.group.add(plane)
            this.articles.push({ mesh: plane, baseY: plane.position.y, index: i })
            this.decorations.push(plane)
        }

        // Rotating pen above the book
        const penGeo = new THREE.CylinderGeometry(0.03, 0.08, 1.5, 6)
        const penMat = new THREE.MeshStandardMaterial({
            color: colors.blue.getHex(),
            emissive: colors.blue.getHex(),
            emissiveIntensity: 0.4,
            metalness: 0.5,
            roughness: 0.3
        })
        this.pen = new THREE.Mesh(penGeo, penMat)
        this.pen.position.set(0, 3.5, 0)
        this.pen.rotation.set(0, 0, Math.PI / 6)
        this.group.add(this.pen)
        this.decorations.push(this.pen)
    }

    update(dt) {
        const t = performance.now() / 1000

        for (const article of this.articles) {
            article.mesh.position.y = article.baseY + Math.sin(t * 0.5 + article.index) * 0.25
            article.mesh.rotation.z = 0.05 + Math.sin(t * 0.3 + article.index) * 0.08
        }

        this.pen.rotation.y = t * 0.4
    }
}
