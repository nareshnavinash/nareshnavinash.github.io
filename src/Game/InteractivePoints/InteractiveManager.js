import InteractivePoint from './InteractivePoint.js'
import { areas, interactivePoints } from '../../Data/worldConfig.js'

export default class InteractiveManager {
  constructor(game) {
    this.game = game
    this.points = []
    this.nearestInner = null

    // Create all interactive points
    Object.entries(interactivePoints).forEach(([areaKey, pointConfigs]) => {
      const areaConfig = areas[areaKey]
      pointConfigs.forEach((pointConfig) => {
        const point = new InteractivePoint(game, pointConfig, areaConfig.position)
        this.points.push(point)
      })
    })

    // UI references
    this.interactPrompt = document.getElementById('interact-prompt')
  }

  update(dt, characterPosition, camera) {
    this.nearestInner = null
    let closestInnerDist = Infinity

    for (const point of this.points) {
      point.update(dt, characterPosition, camera)

      // Track nearest interactive point within inner radius
      if (point.isPlayerInInner) {
        const dx = characterPosition.x - point.worldPosition.x
        const dz = characterPosition.z - point.worldPosition.z
        const dist = Math.sqrt(dx * dx + dz * dz)
        if (dist < closestInnerDist) {
          closestInnerDist = dist
          this.nearestInner = point
        }
      }
    }

    // Show/hide interact prompt
    if (this.interactPrompt) {
      if (this.nearestInner) {
        this.interactPrompt.classList.add('visible')
        this.interactPrompt.classList.remove('hidden')
      } else {
        this.interactPrompt.classList.remove('visible')
        this.interactPrompt.classList.add('hidden')
      }
    }
  }

  /**
   * Called when player presses interact key.
   * Returns the content key of the nearest interactable, or null.
   */
  tryInteract() {
    if (this.nearestInner) {
      return this.nearestInner.contentKey
    }
    return null
  }

  destroy() {
    for (const point of this.points) {
      point.destroy()
    }
  }
}
