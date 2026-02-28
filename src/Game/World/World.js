import Terrain from './Terrain.js'
import Floor from './Floor.js'
import Grass from './Grass.js'
import Water from './Water.js'
import Trees from './Trees.js'
import Foliage from './Foliage.js'
import AreaManager from './Areas/AreaManager.js'

export default class World {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene

        // Create terrain
        this.terrain = new Terrain(game)

        // Water (below terrain)
        this.water = new Water(game)

        // Create paths between areas
        this.floor = new Floor(game)

        // Trees
        this.trees = new Trees(game)

        // Foliage (bushes, flowers)
        this.foliage = new Foliage(game)

        // Grass (instanced, rendered last for transparency)
        this.grass = new Grass(game)

        // Create area decorations and zone detection
        this.areaManager = new AreaManager(game)
    }

    update(dt) {
        const charPos = this.game.character?.position
        if (charPos) {
            this.areaManager.update(dt, charPos)
            this.grass.update(dt, charPos)
        }
        this.water.update(dt)
    }

    destroy() {
        this.terrain.destroy()
        this.water.destroy()
        this.floor.destroy()
        this.trees.destroy()
        this.foliage.destroy()
        this.grass.destroy()
        this.areaManager.destroy()
    }
}
