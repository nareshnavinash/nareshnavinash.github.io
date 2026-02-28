export default class Inputs {
    constructor(canvas) {
        this.canvas = canvas

        // Keyboard state
        this.keys = {}
        this.keysJustPressed = {}

        // Mouse state
        this.mouse = { x: 0, y: 0 }
        this.mouseDelta = { x: 0, y: 0 }
        this.isPointerLocked = false

        this._onKeyDown = this._onKeyDown.bind(this)
        this._onKeyUp = this._onKeyUp.bind(this)
        this._onMouseMove = this._onMouseMove.bind(this)
        this._onPointerLockChange = this._onPointerLockChange.bind(this)
        this._onClick = this._onClick.bind(this)

        window.addEventListener('keydown', this._onKeyDown)
        window.addEventListener('keyup', this._onKeyUp)
        document.addEventListener('mousemove', this._onMouseMove)
        document.addEventListener('pointerlockchange', this._onPointerLockChange)
        canvas.addEventListener('click', this._onClick)
    }

    _onKeyDown(e) {
        const key = e.code
        if (!this.keys[key]) {
            this.keysJustPressed[key] = true
        }
        this.keys[key] = true
    }

    _onKeyUp(e) {
        this.keys[e.code] = false
    }

    _onMouseMove(e) {
        if (this.isPointerLocked) {
            this.mouseDelta.x += e.movementX
            this.mouseDelta.y += e.movementY
        }
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    _onPointerLockChange() {
        this.isPointerLocked = document.pointerLockElement === this.canvas
    }

    _onClick() {
        if (!this.isPointerLocked) {
            this.canvas.requestPointerLock()
        }
    }

    // Movement axes (-1 to 1)
    get forward() {
        let val = 0
        if (this.keys['KeyW'] || this.keys['ArrowUp']) val -= 1
        if (this.keys['KeyS'] || this.keys['ArrowDown']) val += 1
        return val
    }

    get right() {
        let val = 0
        if (this.keys['KeyD'] || this.keys['ArrowRight']) val += 1
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) val -= 1
        return val
    }

    get interact() {
        return this.keysJustPressed['KeyE'] || false
    }

    // Call at end of each frame
    resetFrame() {
        this.mouseDelta.x = 0
        this.mouseDelta.y = 0
        this.keysJustPressed = {}
    }

    destroy() {
        window.removeEventListener('keydown', this._onKeyDown)
        window.removeEventListener('keyup', this._onKeyUp)
        document.removeEventListener('mousemove', this._onMouseMove)
        document.removeEventListener('pointerlockchange', this._onPointerLockChange)
        this.canvas.removeEventListener('click', this._onClick)
    }
}
