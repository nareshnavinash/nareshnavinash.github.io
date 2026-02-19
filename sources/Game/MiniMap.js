import { clamp } from 'three/src/math/MathUtils.js'
import { Game } from './Game.js'

export class MiniMap
{
    constructor()
    {
        this.game = Game.getInstance()

        this.element = this.game.domElement.querySelector('.js-minimap')
        this.textureElement = this.element.querySelector('.js-minimap-texture')
        this.playerElement = this.element.querySelector('.js-minimap-player')
        this.roundedPosition = { x: 0, y: 0 }
        this.textureLoaded = false

        this.game.ticker.events.on('tick', () =>
        {
            this.update()
        }, 14)
    }

    loadTexture()
    {
        if(this.textureLoaded)
            return

        this.textureLoaded = true

        // Use day map by default
        let url = 'ui/map/map-day.webp'

        try
        {
            const nightInterval = this.game.dayCycles.intervalEvents.get('night')
            if(nightInterval && nightInterval.inInterval)
                url = 'ui/map/map-night.webp'
        }
        catch(e) {}

        this.textureElement.src = url

        this.textureElement.addEventListener('load', () =>
        {
            this.textureElement.classList.add('is-visible')
        })
    }

    worldToMap(coordinates)
    {
        let x = coordinates.x
        let y = typeof coordinates.z !== 'undefined' ? coordinates.z : coordinates.y

        x /= this.game.terrain.size
        y /= this.game.terrain.size

        x += 0.5
        y += 0.5

        x = clamp(x, 0, 1)
        y = clamp(y, 0, 1)

        return { x, y }
    }

    update()
    {
        if(!this.game.player)
            return

        // Lazy-load the texture on first update when terrain is ready
        if(!this.textureLoaded && this.game.terrain)
            this.loadTexture()

        const playerRoundedX = Math.round(this.game.player.position.x)
        const playerRoundedY = Math.round(this.game.player.position.z)

        if(playerRoundedX !== this.roundedPosition.x || playerRoundedY !== this.roundedPosition.y)
        {
            this.roundedPosition.x = playerRoundedX
            this.roundedPosition.y = playerRoundedY

            const playerCoordinates = this.worldToMap(this.roundedPosition)
            const x = Math.round(playerCoordinates.x * 1000) / 10
            const y = Math.round(playerCoordinates.y * 1000) / 10

            this.playerElement.style.left = `${x}%`
            this.playerElement.style.top = `${y}%`
            this.playerElement.style.transform = `rotate(${-this.game.physicalVehicle.yRotation}rad)`
        }
    }
}
