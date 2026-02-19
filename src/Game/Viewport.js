export default class Viewport {
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.aspect = this.width / this.height
    this.callbacks = []

    this._onResize = this._onResize.bind(this)
    window.addEventListener('resize', this._onResize)
  }

  _onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.aspect = this.width / this.height

    for (let i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i]()
    }
  }

  on(callback) {
    this.callbacks.push(callback)
  }

  off(callback) {
    const idx = this.callbacks.indexOf(callback)
    if (idx !== -1) this.callbacks.splice(idx, 1)
  }

  get isMobile() {
    return this.width < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  destroy() {
    window.removeEventListener('resize', this._onResize)
    this.callbacks = []
  }
}
