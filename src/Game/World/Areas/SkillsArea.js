import * as THREE from 'three'
import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class SkillsArea extends BaseArea {
  constructor(game, config) {
    super(game, config)

    this._createSign(0, -6, 'Skills', colors.mint.getHex())

    // Floating skill orbs in a grid-like pattern
    this.orbs = []
    const positions = [
      { x: -3, y: 1.5, z: 0 },
      { x: 0, y: 2.0, z: 0 },
      { x: 3, y: 1.5, z: 0 },
      { x: -3, y: 1.5, z: 3 },
      { x: 0, y: 2.0, z: 3 },
      { x: 3, y: 1.5, z: 3 },
      { x: -1.5, y: 2.5, z: 1.5 },
      { x: 1.5, y: 2.5, z: 1.5 },
    ]

    positions.forEach((pos, i) => {
      const colorChoice = i % 2 === 0 ? colors.mint.getHex() : colors.blue.getHex()
      const orb = this._createFloatingOrb(pos.x, pos.y, pos.z, colorChoice, 0.25)
      this.orbs.push({ mesh: orb, baseY: pos.y, index: i })
    })

    // Wireframe rings around the area
    const ringGeo = new THREE.TorusGeometry(4, 0.03, 8, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color: colors.mint.getHex(),
      transparent: true,
      opacity: 0.2,
    })
    this.ring = new THREE.Mesh(ringGeo, ringMat)
    this.ring.position.y = 2
    this.ring.rotation.x = Math.PI / 2
    this.group.add(this.ring)
  }

  update(dt) {
    const t = performance.now() / 1000

    // Float orbs
    for (const orb of this.orbs) {
      orb.mesh.position.y = orb.baseY + Math.sin(t * 0.7 + orb.index * 0.8) * 0.4
      orb.mesh.rotation.y += dt * 0.5
    }

    // Rotate ring
    if (this.ring) {
      this.ring.rotation.z += dt * 0.2
    }
  }
}
