import consoleLog from './data/consoleLog.js'

if (import.meta.env.VITE_LOG) console.log(...consoleLog)

if (window.__embed) {
    // Embedded as a preview iframe (blurred behind boot chooser). Don't boot the
    // full Three.js WebGPU + Rapier pipeline - it pegs the main thread for
    // seconds and the user never sees the result crisply through the CSS blur.
    document.documentElement.classList.add('is-embedded')
} else {
    const { Game } = await import('./Game/Game.js')
    await import('./threejs-override.js')
    if (import.meta.env.VITE_GAME_PUBLIC) window.game = new Game()
    else new Game()
}
