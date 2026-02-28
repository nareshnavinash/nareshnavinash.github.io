import * as THREE from 'three'
import Time from './Time.js'
import Viewport from './Viewport.js'
import Inputs from './Inputs.js'
import Rendering from './Rendering/Rendering.js'
import PostProcessing from './Rendering/PostProcessing.js'
import Options from './Options.js'
import Camera from './Camera/Camera.js'
import Character from './Character/Character.js'
import CharacterController from './Character/CharacterController.js'
import World from './World/World.js'
import Environment from './Environment/Environment.js'
import InteractiveManager from './InteractivePoints/InteractiveManager.js'
import UI from '../UI/UI.js'
import LoadingScreen from '../UI/LoadingScreen.js'
import MobileControls from '../UI/MobileControls.js'
import Menu from '../UI/Menu.js'
import { colors } from '../Data/colorPalette.js'

let instance = null

export default class Game {
    constructor(canvas) {
        // Singleton
        if (instance) return instance
        instance = this

        this.canvas = canvas

        // Fetch resume data early (used by LoadingScreen and other UI)
        this.resumeData = null
        fetch('/data/resume.json')
            .then((r) => r.json())
            .then((data) => {
                this.resumeData = data
            })
            .catch(() => {})

        // Core systems
        this.time = new Time()
        this.viewport = new Viewport()
        this.inputs = new Inputs(canvas)

        // Options (quality presets)
        this.options = new Options(this)

        // Rendering
        this.rendering = new Rendering(this)

        // Lighting
        this._setupLighting()

        // Fog
        this.rendering.scene.fog = new THREE.FogExp2(colors.fogColor.getHex(), 0.008)
        this.rendering.scene.background = colors.skyTop.clone()

        // World (terrain, floor, areas)
        this.world = new World(this)

        // Environment (day/night, weather, particles, lighting)
        this.environment = new Environment(this)

        // Camera
        this.camera = new Camera(this)

        // Post-processing (needs camera)
        this.postProcessing = new PostProcessing(this)
        this.options.setQuality(this.options.quality)

        // Character
        this.character = new Character(this)
        this.characterController = new CharacterController(this)

        // Interactive points
        this.interactiveManager = new InteractiveManager(this)

        // UI
        this.ui = new UI(this)

        // Mobile controls
        this.mobileControls = new MobileControls(this)

        // Settings menu
        this.menu = new Menu(this)

        // Loading screen (shown on top, removed after click)
        this.loadingScreen = new LoadingScreen(this)

        // Start game loop
        this._update = this._update.bind(this)
        this.time.on(this._update)
    }

    _setupLighting() {
        const scene = this.rendering.scene

        // Hemisphere light (sky/ground)
        const hemiLight = new THREE.HemisphereLight(colors.skyTop.getHex(), colors.terrainDarkGreen.getHex(), 0.6)
        scene.add(hemiLight)
        this.hemiLight = hemiLight

        // Directional light (sun)
        const sunLight = new THREE.DirectionalLight(colors.sunColor.getHex(), 1.5)
        sunLight.position.set(50, 80, 30)
        sunLight.castShadow = true
        sunLight.shadow.mapSize.width = 2048
        sunLight.shadow.mapSize.height = 2048
        sunLight.shadow.camera.near = 1
        sunLight.shadow.camera.far = 200
        sunLight.shadow.camera.left = -60
        sunLight.shadow.camera.right = 60
        sunLight.shadow.camera.top = 60
        sunLight.shadow.camera.bottom = -60
        sunLight.shadow.normalBias = 0.02
        scene.add(sunLight)
        this.sunLight = sunLight

        // Ambient fill
        const ambientLight = new THREE.AmbientLight(colors.ambientColor.getHex(), 0.3)
        scene.add(ambientLight)
        this.ambientLight = ambientLight
    }

    _update(dt, elapsed) {
        // Don't update character while panel is open
        if (!this.ui.isPanelOpen) {
            // Update character
            this.characterController.update(dt)
            this.character.update(dt)
        }

        // Update world
        this.world.update(dt)

        // Update environment (day/night, weather, particles)
        this.environment.update(dt)

        // Update interactive points
        this.interactiveManager.update(dt, this.character.position, this.camera)

        // Handle interaction
        if (this.inputs.interact && !this.ui.isPanelOpen) {
            const contentKey = this.interactiveManager.tryInteract()
            if (contentKey) {
                this.ui.openContent(contentKey)
            }
        }

        // Update camera
        this.camera.update(dt, this.character.position)

        // Update UI
        this.ui.update(dt)

        // Render (post-processing or fallback)
        const rendered = this.postProcessing.render(this.camera.instance)
        if (!rendered) {
            this.rendering.render(this.camera.instance)
        }

        // Reset input frame state
        this.inputs.resetFrame()
    }

    destroy() {
        this.time.off(this._update)
        this.time.destroy()
        this.viewport.destroy()
        this.inputs.destroy()
        this.options.destroy()
        this.characterController.destroy()
        this.character.destroy()
        this.camera.destroy()
        this.world.destroy()
        this.environment.destroy()
        this.interactiveManager.destroy()
        this.postProcessing.destroy()
        this.ui.destroy()
        this.mobileControls.destroy()
        this.menu.destroy()
        this.loadingScreen.destroy()
        this.rendering.destroy()
        instance = null
    }
}
