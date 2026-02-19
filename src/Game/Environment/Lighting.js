import * as THREE from 'three'
import { colors } from '../../Data/colorPalette.js'
import { areas } from '../../Data/worldConfig.js'

/**
 * Manages all scene lighting.
 * Takes ownership of lights created in Game._setupLighting() and
 * adds area accent lights + night-time lanterns.
 */
export default class Lighting {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene

    // Grab existing lights from Game
    this.sunLight = game.sunLight
    this.hemiLight = game.hemiLight
    this.ambientLight = game.ambientLight

    // Area accent point lights (subtle colored glow per area)
    this.areaLights = []
    for (const [key, area] of Object.entries(areas)) {
      if (key === 'hero') continue
      const color = colors[area.color] || colors.mint
      const light = new THREE.PointLight(color.getHex(), 0.4, area.radius * 2)
      light.position.set(area.position.x, 3, area.position.z)
      light.castShadow = false
      this.scene.add(light)
      this.areaLights.push(light)
    }

    // Lantern lights (appear brighter at night)
    this.lanterns = []
    const lanternPositions = [
      { x: 0, z: 0 },      // Hero center
      { x: 15, z: -7 },     // Path to about
      { x: -5, z: -20 },    // Path to career
      { x: -20, z: -3 },    // Path to skills
      { x: -15, z: 15 },    // Path to leadership
      { x: 5, z: 17 },      // Path to publications
      { x: 20, z: 7 },      // Path to certifications
      { x: 17, z: -17 },    // Path to contact
    ]

    for (const pos of lanternPositions) {
      const light = new THREE.PointLight(0xffaa44, 0, 15)
      light.position.set(pos.x, 2.5, pos.z)
      this.scene.add(light)

      // Visual lantern post
      const postGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.5, 5)
      const postMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.9 })
      const post = new THREE.Mesh(postGeo, postMat)
      post.position.set(pos.x, 1.25, pos.z)
      this.scene.add(post)

      const lampGeo = new THREE.SphereGeometry(0.2, 6, 4)
      const lampMat = new THREE.MeshStandardMaterial({
        color: 0xffcc66,
        emissive: 0xffaa44,
        emissiveIntensity: 0,
        roughness: 0.3,
      })
      const lamp = new THREE.Mesh(lampGeo, lampMat)
      lamp.position.set(pos.x, 2.6, pos.z)
      this.scene.add(lamp)

      this.lanterns.push({ light, post, lamp, lampMat })
    }

    this._meshes = this.lanterns.flatMap(l => [l.post, l.lamp])
  }

  update(dayNightState) {
    const { sunColor, sunIntensity, sunPosition, ambientIntensity, hemiIntensity, isNight } = dayNightState

    // Update sun
    this.sunLight.color.copy(sunColor)
    this.sunLight.intensity = sunIntensity
    this.sunLight.position.set(sunPosition.x, sunPosition.y, sunPosition.z)

    // Update hemisphere
    this.hemiLight.intensity = hemiIntensity

    // Update ambient
    this.ambientLight.intensity = ambientIntensity

    // Lanterns: bright at night, off during day
    const lanternIntensity = isNight ? 1.2 : 0
    const emissiveIntensity = isNight ? 0.8 : 0
    for (const lantern of this.lanterns) {
      lantern.light.intensity = lanternIntensity
      lantern.lampMat.emissiveIntensity = emissiveIntensity
    }

    // Area lights dim during day, brighter at night
    const areaIntensity = isNight ? 0.8 : 0.3
    for (const light of this.areaLights) {
      light.intensity = areaIntensity
    }
  }

  destroy() {
    for (const lantern of this.lanterns) {
      this.scene.remove(lantern.light)
      this.scene.remove(lantern.post)
      this.scene.remove(lantern.lamp)
      lantern.post.geometry.dispose()
      lantern.post.material.dispose()
      lantern.lamp.geometry.dispose()
      lantern.lamp.material.dispose()
    }
    for (const light of this.areaLights) {
      this.scene.remove(light)
    }
  }
}
