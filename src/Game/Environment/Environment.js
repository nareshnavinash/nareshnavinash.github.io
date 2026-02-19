import DayNightCycle from './DayNightCycle.js'
import Lighting from './Lighting.js'
import Weather from './Weather.js'
import Wind from './Wind.js'
import Fog from './Fog.js'
import Sky from './Sky.js'
import RainParticles from './Particles/RainParticles.js'
import SnowParticles from './Particles/SnowParticles.js'
import LeafParticles from './Particles/LeafParticles.js'
import DustParticles from './Particles/DustParticles.js'
import PetalParticles from './Particles/PetalParticles.js'

/**
 * Environment orchestrator.
 * Coordinates day/night cycle, weather, wind, lighting, fog, sky,
 * and all particle systems.
 *
 * Locked to beautiful sunlight mode with clear weather and cherry blossom petals.
 */
export default class Environment {
  constructor(game) {
    this.game = game

    // Core systems
    this.dayNightCycle = new DayNightCycle(game)
    this.weather = new Weather()
    this.wind = new Wind()
    this.fog = new Fog(game)
    this.lighting = new Lighting(game)
    this.sky = new Sky(game)

    // Lock to beautiful bright sunlight
    this.dayNightCycle.lock(0.45) // Warm bright afternoon

    // Lock weather to clear
    this.weather.lock('clear')

    // Particle systems
    this.rain = new RainParticles(game)
    this.snow = new SnowParticles(game)
    this.leaves = new LeafParticles(game)
    this.dust = new DustParticles(game)
    this.petals = new PetalParticles(game)

    // Remove the static background color (sky dome replaces it)
    game.rendering.scene.background = null
  }

  update(dt) {
    // Update day/night cycle -> produces lighting state
    const dayNightState = this.dayNightCycle.update(dt)

    // Update weather -> produces weather modifiers
    this.weather.update(dt)

    // Update wind (influenced by weather)
    this.wind.setWeatherWind(this.weather.windStrength)
    this.wind.update(dt)

    // Apply day/night state to lighting
    this.lighting.update(dayNightState)

    // Apply fog (day/night base * weather multiplier)
    this.fog.setColor(dayNightState.fogColor)
    this.fog.setDensity(dayNightState.fogDensity * this.weather.fogDensityMult)

    // Update sky dome
    this.sky.update(dayNightState, this.weather.cloudCover)

    // Update grass wind strength
    const grass = this.game.world?.grass
    if (grass) {
      grass.material.uniforms.uWindStrength.value = this.wind.strength
    }

    // Update particles
    const charPos = this.game.character?.position
    this.rain.update(dt, this.weather.rainIntensity, charPos, this.wind)
    this.snow.update(dt, this.weather.snowIntensity, charPos, this.wind)
    this.leaves.update(dt, this.wind)
    this.dust.update(dt, charPos, this.wind)
    this.petals.update(dt, this.wind)
  }

  destroy() {
    this.dayNightCycle.destroy()
    this.weather.destroy()
    this.wind.destroy()
    this.fog.destroy()
    this.lighting.destroy()
    this.sky.destroy()
    this.rain.destroy()
    this.snow.destroy()
    this.leaves.destroy()
    this.dust.destroy()
    this.petals.destroy()
  }
}
