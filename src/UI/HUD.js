export default class HUD {
    constructor(game) {
        this.game = game
        this.controlsHint = document.getElementById('hud-controls')

        // Show controls hint initially, fade after a few seconds
        if (this.controlsHint) {
            setTimeout(() => {
                this.controlsHint.style.transition = 'opacity 2s ease'
                this.controlsHint.style.opacity = '0'
            }, 8000)
        }
    }

    destroy() {}
}
