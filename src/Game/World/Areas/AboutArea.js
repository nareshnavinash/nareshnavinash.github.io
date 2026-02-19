import BaseArea from './BaseArea.js'
import { colors } from '../../../Data/colorPalette.js'

export default class AboutArea extends BaseArea {
  constructor(game, config) {
    super(game, config)

    this._createSign(0, -6, 'About', colors.lavender.getHex())

    // Three card-like structures representing the about cards
    const cardPositions = [
      { x: -3, z: 2 },
      { x: 0, z: 4 },
      { x: 3, z: 2 },
    ]

    this.cards = []
    cardPositions.forEach((pos, i) => {
      const pillar = this._createPillar(pos.x, pos.z, 1.5 + i * 0.3, colors.lavender.getHex())
      this.cards.push({ mesh: pillar, baseY: pillar.position.y })
    })

    // Floating orbs above each card
    this.orbs = []
    cardPositions.forEach((pos, i) => {
      const orb = this._createFloatingOrb(
        pos.x,
        2.5 + i * 0.3,
        pos.z,
        colors.lavender.getHex(),
        0.2
      )
      this.orbs.push({ mesh: orb, baseY: orb.position.y, index: i })
    })
  }

  update(dt) {
    const t = performance.now() / 1000
    for (const orb of this.orbs) {
      orb.mesh.position.y = orb.baseY + Math.sin(t + orb.index) * 0.3
    }
  }
}
