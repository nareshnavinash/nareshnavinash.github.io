import { areas } from '../Data/worldConfig.js'

const MINIMAP_SIZE = 140
const WORLD_RANGE = 60 // How much of the world to show (radius)

const colorMap = {
  mint: '#00ffaa',
  lavender: '#aa77ff',
  peach: '#ff7744',
  gold: '#ffcc33',
  blue: '#4488ff',
}

export default class Minimap {
  constructor(game) {
    this.game = game

    // Create canvas
    this.canvas = document.createElement('canvas')
    this.canvas.width = MINIMAP_SIZE
    this.canvas.height = MINIMAP_SIZE
    this.canvas.id = 'minimap'
    this.canvas.style.cssText = `
      position: fixed;
      bottom: 16px;
      left: 16px;
      width: ${MINIMAP_SIZE}px;
      height: ${MINIMAP_SIZE}px;
      border-radius: 50%;
      border: 2px solid rgba(100, 100, 180, 0.3);
      background: rgba(10, 10, 28, 0.7);
      backdrop-filter: blur(4px);
      z-index: 20;
      pointer-events: none;
    `
    document.body.appendChild(this.canvas)

    this.ctx = this.canvas.getContext('2d')
  }

  update(dt) {
    const ctx = this.ctx
    const size = MINIMAP_SIZE
    const half = size / 2

    // Clear
    ctx.clearRect(0, 0, size, size)

    // Clip to circle
    ctx.save()
    ctx.beginPath()
    ctx.arc(half, half, half - 2, 0, Math.PI * 2)
    ctx.clip()

    // Background
    ctx.fillStyle = 'rgba(10, 10, 28, 0.8)'
    ctx.fillRect(0, 0, size, size)

    // Draw areas
    Object.entries(areas).forEach(([key, config]) => {
      const x = half + (config.position.x / WORLD_RANGE) * half
      const y = half + (config.position.z / WORLD_RANGE) * half
      const r = (config.radius / WORLD_RANGE) * half

      ctx.beginPath()
      ctx.arc(x, y, Math.max(r, 3), 0, Math.PI * 2)
      ctx.fillStyle = (colorMap[config.color] || '#00ffaa') + '33'
      ctx.fill()
      ctx.strokeStyle = (colorMap[config.color] || '#00ffaa') + '66'
      ctx.lineWidth = 1
      ctx.stroke()

      // Label
      if (config.label) {
        ctx.fillStyle = 'rgba(224, 224, 240, 0.6)'
        ctx.font = '7px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(config.label, x, y + r + 8)
      }
    })

    // Draw character position
    const charPos = this.game.character?.position
    if (charPos) {
      const cx = half + (charPos.x / WORLD_RANGE) * half
      const cy = half + (charPos.z / WORLD_RANGE) * half

      // Glow
      ctx.beginPath()
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 255, 170, 0.3)'
      ctx.fill()

      // Dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#00ffaa'
      ctx.fill()
    }

    ctx.restore()

    // Border circle
    ctx.beginPath()
    ctx.arc(half, half, half - 1, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(100, 100, 180, 0.3)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  destroy() {
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
  }
}
