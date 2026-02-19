import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class PublicationsArea extends BaseArea {
  constructor(game, config) {
    super(game, config)

    this._createSign(0, -5, 'Publications', colors.blue.getHex())

    // Book-shaped structure
    const bookGeo = new THREE.BoxGeometry(2, 3, 0.4)
    const bookMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a3e,
      roughness: 0.4,
      metalness: 0.2,
    })
    this.book = new THREE.Mesh(bookGeo, bookMat)
    this.book.position.set(0, 1.5, 0)
    this.book.rotation.y = 0.2
    this.book.castShadow = true
    this.group.add(this.book)
    this.decorations.push(this.book)

    // Book spine accent
    const spineGeo = new THREE.BoxGeometry(0.1, 3, 0.45)
    const spineMat = new THREE.MeshStandardMaterial({
      color: colors.blue.getHex(),
      emissive: colors.blue.getHex(),
      emissiveIntensity: 0.3,
    })
    const spine = new THREE.Mesh(spineGeo, spineMat)
    spine.position.set(-1.05, 1.5, 0)
    spine.rotation.y = 0.2
    this.group.add(spine)
    this.decorations.push(spine)

    // Floating pages
    this.pages = []
    for (let i = 0; i < 3; i++) {
      const pageGeo = new THREE.PlaneGeometry(1, 1.2)
      const pageMat = new THREE.MeshStandardMaterial({
        color: 0xeeeedd,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      })
      const page = new THREE.Mesh(pageGeo, pageMat)
      page.position.set(2 + i * 0.5, 2 + i * 0.3, i * 0.3)
      page.rotation.set(0.1 * i, 0.3, 0.1)
      this.group.add(page)
      this.pages.push({ mesh: page, baseY: page.position.y, index: i })
      this.decorations.push(page)
    }
  }

  update(dt) {
    const t = performance.now() / 1000

    // Float pages
    for (const page of this.pages) {
      page.mesh.position.y = page.baseY + Math.sin(t * 0.5 + page.index) * 0.3
      page.mesh.rotation.z = 0.1 + Math.sin(t * 0.3 + page.index) * 0.1
    }
  }
}
