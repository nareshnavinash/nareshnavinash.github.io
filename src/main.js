import Game from './Game/Game.js'

// Initialize the game when DOM is ready
const canvas = document.getElementById('game-canvas')
if (canvas) {
  const game = new Game(canvas)

  // Expose for debugging
  if (import.meta.env.DEV) {
    window.game = game
  }
}
