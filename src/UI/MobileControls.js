/**
 * Virtual joystick and interact button for mobile devices.
 * Feeds into game.inputs.
 */
export default class MobileControls {
  constructor(game) {
    this.game = game
    this.active = false

    if (!game.viewport.isMobile) return

    this.active = true
    this._createControls()
    this._bindEvents()
  }

  _createControls() {
    // Container
    this.container = document.createElement('div')
    this.container.id = 'mobile-controls'

    // Joystick area (left side)
    this.joystickArea = document.createElement('div')
    this.joystickArea.className = 'joystick-area'

    this.joystickBase = document.createElement('div')
    this.joystickBase.className = 'joystick-base'

    this.joystickKnob = document.createElement('div')
    this.joystickKnob.className = 'joystick-knob'

    this.joystickBase.appendChild(this.joystickKnob)
    this.joystickArea.appendChild(this.joystickBase)

    // Interact button (right side)
    this.interactBtn = document.createElement('button')
    this.interactBtn.className = 'mobile-interact-btn'
    this.interactBtn.textContent = 'E'

    this.container.appendChild(this.joystickArea)
    this.container.appendChild(this.interactBtn)
    document.body.appendChild(this.container)

    // Add styles
    this._addStyles()

    // State
    this._touchId = null
    this._centerX = 0
    this._centerY = 0
    this._maxRadius = 40
  }

  _addStyles() {
    const style = document.createElement('style')
    style.textContent = `
      #mobile-controls {
        position: fixed;
        inset: 0;
        z-index: 100;
        pointer-events: none;
      }
      .joystick-area {
        position: absolute;
        bottom: 30px;
        left: 30px;
        width: 120px;
        height: 120px;
        pointer-events: auto;
        touch-action: none;
      }
      .joystick-base {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .joystick-knob {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(0, 255, 170, 0.3);
        border: 1px solid rgba(0, 255, 170, 0.5);
        transition: transform 0.05s ease;
      }
      .mobile-interact-btn {
        position: absolute;
        bottom: 50px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(0, 255, 170, 0.15);
        border: 1px solid rgba(0, 255, 170, 0.4);
        color: #00ffaa;
        font-size: 1.2rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        pointer-events: auto;
        touch-action: none;
        cursor: pointer;
      }
      .mobile-interact-btn:active {
        background: rgba(0, 255, 170, 0.3);
      }
    `
    document.head.appendChild(style)
    this._style = style
  }

  _bindEvents() {
    // Joystick touch
    this.joystickArea.addEventListener('touchstart', (e) => this._onJoystickStart(e), { passive: false })
    this.joystickArea.addEventListener('touchmove', (e) => this._onJoystickMove(e), { passive: false })
    this.joystickArea.addEventListener('touchend', (e) => this._onJoystickEnd(e))
    this.joystickArea.addEventListener('touchcancel', (e) => this._onJoystickEnd(e))

    // Interact button
    this.interactBtn.addEventListener('touchstart', (e) => {
      e.preventDefault()
      this.game.inputs.keysJustPressed['KeyE'] = true
      this.game.inputs.keys['KeyE'] = true
    })
    this.interactBtn.addEventListener('touchend', () => {
      this.game.inputs.keys['KeyE'] = false
    })
  }

  _onJoystickStart(e) {
    e.preventDefault()
    const touch = e.changedTouches[0]
    this._touchId = touch.identifier
    const rect = this.joystickBase.getBoundingClientRect()
    this._centerX = rect.left + rect.width / 2
    this._centerY = rect.top + rect.height / 2
  }

  _onJoystickMove(e) {
    e.preventDefault()
    for (const touch of e.changedTouches) {
      if (touch.identifier !== this._touchId) continue

      let dx = touch.clientX - this._centerX
      let dy = touch.clientY - this._centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > this._maxRadius) {
        dx = (dx / dist) * this._maxRadius
        dy = (dy / dist) * this._maxRadius
      }

      // Move knob visually
      this.joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`

      // Feed into inputs (normalized -1 to 1)
      const normX = dx / this._maxRadius
      const normY = dy / this._maxRadius

      // Map to WASD keys
      const inputs = this.game.inputs
      inputs.keys['KeyW'] = false
      inputs.keys['KeyS'] = false
      inputs.keys['KeyA'] = false
      inputs.keys['KeyD'] = false

      if (normY < -0.3) inputs.keys['KeyW'] = true
      if (normY > 0.3) inputs.keys['KeyS'] = true
      if (normX < -0.3) inputs.keys['KeyA'] = true
      if (normX > 0.3) inputs.keys['KeyD'] = true
    }
  }

  _onJoystickEnd(e) {
    for (const touch of e.changedTouches) {
      if (touch.identifier !== this._touchId) continue
      this._touchId = null
      this.joystickKnob.style.transform = 'translate(0, 0)'

      // Release all movement keys
      const inputs = this.game.inputs
      inputs.keys['KeyW'] = false
      inputs.keys['KeyS'] = false
      inputs.keys['KeyA'] = false
      inputs.keys['KeyD'] = false
    }
  }

  destroy() {
    if (!this.active) return
    this.container.remove()
    this._style.remove()
  }
}
