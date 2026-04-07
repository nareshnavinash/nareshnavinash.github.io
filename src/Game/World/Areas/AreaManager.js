import * as THREE from 'three'
import { areas } from '../../../Data/worldConfig.js'
import { colors } from '../../../Data/colorPalette.js'
import HeroArea from './HeroArea.js'
import AboutArea from './AboutArea.js'
import CareerArea from './CareerArea.js'
import SkillsArea from './SkillsArea.js'
import LeadershipArea from './LeadershipArea.js'
import PublicationsArea from './PublicationsArea.js'
import CertificationsArea from './CertificationsArea.js'
import ContactArea from './ContactArea.js'
import GitHubArea from './GitHubArea.js'
import MediumArea from './MediumArea.js'

export default class AreaManager {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene
        this.currentArea = null
        this.previousArea = null

        // HUD reference
        this.hudAreaName = document.getElementById('hud-area-name')

        // Create area instances
        this.areas = {
            hero: new HeroArea(game, areas.hero),
            about: new AboutArea(game, areas.about),
            career: new CareerArea(game, areas.career),
            skills: new SkillsArea(game, areas.skills),
            leadership: new LeadershipArea(game, areas.leadership),
            publications: new PublicationsArea(game, areas.publications),
            certifications: new CertificationsArea(game, areas.certifications),
            contact: new ContactArea(game, areas.contact),
            github: new GitHubArea(game, areas.github),
            medium: new MediumArea(game, areas.medium)
        }

        // Create ground markers for each area
        this._createAreaMarkers()
    }

    _createAreaMarkers() {
        Object.entries(areas).forEach(([key, config]) => {
            // Ground circle to mark area boundary
            const ringGeo = new THREE.RingGeometry(config.radius - 0.5, config.radius, 48)
            ringGeo.rotateX(-Math.PI / 2)
            const color = colors[config.color] || colors.mint
            const ringMat = new THREE.MeshBasicMaterial({
                color: color.getHex(),
                transparent: true,
                opacity: 0.15,
                side: THREE.DoubleSide,
                depthWrite: false
            })
            const ring = new THREE.Mesh(ringGeo, ringMat)
            ring.position.set(config.position.x, 0.05, config.position.z)
            this.scene.add(ring)

            // Inner glow disc
            const discGeo = new THREE.CircleGeometry(config.radius, 48)
            discGeo.rotateX(-Math.PI / 2)
            const discMat = new THREE.MeshBasicMaterial({
                color: color.getHex(),
                transparent: true,
                opacity: 0.03,
                side: THREE.DoubleSide,
                depthWrite: false
            })
            const disc = new THREE.Mesh(discGeo, discMat)
            disc.position.set(config.position.x, 0.02, config.position.z)
            this.scene.add(disc)
        })
    }

    update(dt, characterPosition) {
        // Detect which area the character is in
        let detectedArea = null
        let minDist = Infinity

        Object.entries(areas).forEach(([key, config]) => {
            const dx = characterPosition.x - config.position.x
            const dz = characterPosition.z - config.position.z
            const dist = Math.sqrt(dx * dx + dz * dz)

            if (dist < config.radius && dist < minDist) {
                detectedArea = key
                minDist = dist
            }
        })

        // Area changed
        if (detectedArea !== this.currentArea) {
            this.previousArea = this.currentArea
            this.currentArea = detectedArea

            // Update HUD
            if (this.hudAreaName) {
                if (detectedArea && areas[detectedArea].label) {
                    this.hudAreaName.textContent = areas[detectedArea].label
                    this.hudAreaName.classList.add('visible')
                } else {
                    this.hudAreaName.classList.remove('visible')
                }
            }
        }

        // Update area decorations
        Object.values(this.areas).forEach((area) => {
            if (area.update) area.update(dt)
        })
    }

    destroy() {
        Object.values(this.areas).forEach((area) => {
            if (area.destroy) area.destroy()
        })
    }
}
