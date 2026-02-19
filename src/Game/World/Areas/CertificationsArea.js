import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class CertificationsArea extends BaseArea {
  constructor(game, config) {
    super(game, config)

    this._createSign(0, -5, 'Certs', colors.lavender.getHex())

    // Badge-like structures - 6 hovering shields
    this.badges = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const r = 3.5
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r

      const badgeGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 6)
      const badgeMat = new THREE.MeshStandardMaterial({
        color: colors.lavender.getHex(),
        emissive: colors.lavender.getHex(),
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.5,
      })
      const badge = new THREE.Mesh(badgeGeo, badgeMat)
      badge.position.set(x, 1.5, z)
      badge.rotation.x = Math.PI / 2
      badge.castShadow = true
      this.group.add(badge)
      this.badges.push({ mesh: badge, baseY: 1.5, angle })
      this.decorations.push(badge)
    }
  }

  update(dt) {
    const t = performance.now() / 1000
    for (const badge of this.badges) {
      badge.mesh.position.y = badge.baseY + Math.sin(t * 0.6 + badge.angle) * 0.3
      badge.mesh.rotation.z += dt * 0.3
    }
  }
}
