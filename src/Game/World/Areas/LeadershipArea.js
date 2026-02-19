import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class LeadershipArea extends BaseArea {
  constructor(game, config) {
    super(game, config)

    this._createSign(0, -6, 'Leadership', colors.gold.getHex())

    // Hexagonal arrangement of pillars
    this.pillars = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const r = 4
      const pillar = this._createPillar(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        2.0,
        colors.gold.getHex()
      )
      this.pillars.push(pillar)
    }

    // Central tall pillar
    this._createPillar(0, 0, 3.0, colors.gold.getHex())

    // Star shape on top
    const starGeo = new THREE.OctahedronGeometry(0.4, 0)
    const starMat = new THREE.MeshStandardMaterial({
      color: colors.gold.getHex(),
      emissive: colors.gold.getHex(),
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.5,
    })
    this.star = new THREE.Mesh(starGeo, starMat)
    this.star.position.set(0, 3.8, 0)
    this.group.add(this.star)
    this.decorations.push(this.star)
  }

  update(dt) {
    const t = performance.now() / 1000
    if (this.star) {
      this.star.rotation.y += dt * 0.8
      this.star.position.y = 3.8 + Math.sin(t * 1.2) * 0.2
    }
  }
}
