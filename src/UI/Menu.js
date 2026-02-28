/**
 * Settings menu overlay.
 * Controls: quality, sound, day/night lock, weather lock.
 */
export default class Menu {
    constructor(game) {
        this.game = game
        this.isOpen = false

        this._createDOM()
        this._bindEvents()
    }

    _createDOM() {
        // Toggle button
        this.toggleBtn = document.createElement('button')
        this.toggleBtn.id = 'menu-toggle'
        this.toggleBtn.innerHTML = '&#9881;' // gear icon
        this.toggleBtn.title = 'Settings'
        document.body.appendChild(this.toggleBtn)

        // Menu panel
        this.panel = document.createElement('div')
        this.panel.id = 'settings-panel'
        this.panel.classList.add('hidden')
        this.panel.innerHTML = `
      <h3>Settings</h3>
      <div class="setting-row">
        <label>Quality</label>
        <select id="setting-quality">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high" selected>High</option>
        </select>
      </div>
      <div class="setting-row">
        <label>Sound</label>
        <input type="range" id="setting-volume" min="0" max="100" value="50">
      </div>
      <div class="setting-row">
        <label>Lock Time</label>
        <select id="setting-time">
          <option value="auto">Auto Cycle</option>
          <option value="0.35">Morning</option>
          <option value="0.45" selected>Afternoon</option>
          <option value="0.5">Noon</option>
          <option value="0.75">Sunset</option>
          <option value="0.0">Midnight</option>
        </select>
      </div>
      <div class="setting-row">
        <label>Weather</label>
        <select id="setting-weather">
          <option value="auto">Auto</option>
          <option value="clear" selected>Clear</option>
          <option value="cloudy">Cloudy</option>
          <option value="rain">Rain</option>
          <option value="snow">Snow</option>
        </select>
      </div>
    `
        document.body.appendChild(this.panel)

        this._addStyles()
    }

    _addStyles() {
        const style = document.createElement('style')
        style.textContent = `
      #menu-toggle {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 200;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(8, 8, 24, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #e0e0f0;
        font-size: 1.2rem;
        cursor: pointer;
        backdrop-filter: blur(8px);
        transition: all 0.2s ease;
      }
      #menu-toggle:hover {
        background: rgba(0, 255, 170, 0.15);
        border-color: rgba(0, 255, 170, 0.4);
      }
      #settings-panel {
        position: fixed;
        top: 64px;
        right: 16px;
        z-index: 200;
        width: 260px;
        padding: 20px;
        background: rgba(8, 8, 24, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        backdrop-filter: blur(12px);
        color: #e0e0f0;
        font-family: 'Poppins', sans-serif;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      #settings-panel.hidden {
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
      }
      #settings-panel h3 {
        margin: 0 0 16px;
        font-size: 1rem;
        color: #00ffaa;
      }
      .setting-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      .setting-row label {
        font-size: 0.85rem;
        color: #8888aa;
      }
      .setting-row select,
      .setting-row input[type="range"] {
        width: 120px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 4px;
        color: #e0e0f0;
        padding: 4px 6px;
        font-size: 0.8rem;
        font-family: 'Poppins', sans-serif;
      }
      .setting-row input[type="range"] {
        -webkit-appearance: none;
        height: 4px;
        background: rgba(255,255,255,0.15);
        border: none;
        border-radius: 2px;
        padding: 0;
      }
      .setting-row input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #00ffaa;
        cursor: pointer;
      }
    `
        document.head.appendChild(style)
        this._style = style
    }

    _bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggle())

        // Quality
        this.panel.querySelector('#setting-quality').addEventListener('change', (e) => {
            this.game.options.setQuality(e.target.value)
        })

        // Volume
        this.panel.querySelector('#setting-volume').addEventListener('input', (e) => {
            this.game.options.soundVolume = parseInt(e.target.value) / 100
        })

        // Time lock
        this.panel.querySelector('#setting-time').addEventListener('change', (e) => {
            const env = this.game.environment
            if (e.target.value === 'auto') {
                env.dayNightCycle.unlock()
            } else {
                env.dayNightCycle.lock(parseFloat(e.target.value))
            }
        })

        // Weather lock
        this.panel.querySelector('#setting-weather').addEventListener('change', (e) => {
            const env = this.game.environment
            if (e.target.value === 'auto') {
                env.weather.unlock()
            } else {
                env.weather.lock(e.target.value)
            }
        })
    }

    toggle() {
        this.isOpen = !this.isOpen
        this.panel.classList.toggle('hidden', !this.isOpen)
    }

    destroy() {
        this.toggleBtn.remove()
        this.panel.remove()
        this._style.remove()
    }
}
