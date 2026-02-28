export default class Time {
    constructor() {
        this.elapsed = 0
        this.delta = 16
        this.clock = performance.now()
        this.callbacks = []

        this._tick = this._tick.bind(this)
        this._rafId = requestAnimationFrame(this._tick)
    }

    _tick(now) {
        this._rafId = requestAnimationFrame(this._tick)

        const delta = now - this.clock
        this.clock = now
        this.delta = Math.min(delta, 100) // Cap at 100ms to avoid spiral
        this.elapsed += this.delta

        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i](this.delta / 1000, this.elapsed / 1000)
        }
    }

    on(callback) {
        this.callbacks.push(callback)
    }

    off(callback) {
        const idx = this.callbacks.indexOf(callback)
        if (idx !== -1) this.callbacks.splice(idx, 1)
    }

    destroy() {
        cancelAnimationFrame(this._rafId)
        this.callbacks = []
    }
}
