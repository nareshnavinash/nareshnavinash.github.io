import * as THREE from 'three'
import { areas } from '../../Data/worldConfig.js'

const BUSH_COUNT = 80
const FLOWER_COUNT = 80

export default class Foliage {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene
        this.group = new THREE.Group()

        this._createBushes()
        this._createFlowers()

        this.scene.add(this.group)
    }

    _createBushes() {
        const bushGeo = new THREE.SphereGeometry(1, 6, 5)
        const bushColors = [0x2a6a22, 0x3a7a2f, 0x1a5a18, 0x4a8a40]
        const areaCenters = Object.values(areas).map((a) => ({
            x: a.position.x,
            z: a.position.z,
            r: a.radius + 2
        }))

        let placed = 0
        let attempts = 0
        while (placed < BUSH_COUNT && attempts < BUSH_COUNT * 4) {
            attempts++
            const x = (Math.random() - 0.5) * 140
            const z = (Math.random() - 0.5) * 140
            if (Math.sqrt(x * x + z * z) > 75) continue

            let skip = false
            for (const a of areaCenters) {
                if ((x - a.x) ** 2 + (z - a.z) ** 2 < a.r * a.r) {
                    skip = true
                    break
                }
            }
            if (skip) continue

            const scale = 0.3 + Math.random() * 0.5
            const mat = new THREE.MeshStandardMaterial({
                color: bushColors[Math.floor(Math.random() * bushColors.length)],
                roughness: 0.8,
                flatShading: true
            })
            const bush = new THREE.Mesh(bushGeo, mat)
            bush.position.set(x, scale * 0.5, z)
            bush.scale.set(scale * (0.8 + Math.random() * 0.4), scale, scale * (0.8 + Math.random() * 0.4))
            bush.castShadow = true
            this.group.add(bush)
            placed++
        }
    }

    _createFlowers() {
        // Mix of cherry blossom-inspired and colorful wildflowers
        const flowerColors = [0xffb7c5, 0xffc4d6, 0xff88aa, 0xffaa44, 0xaaaaff, 0xffff66, 0xff88cc, 0xffd1dc]
        const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4)
        const petalGeo = new THREE.SphereGeometry(0.1, 6, 4)

        const areaCenters = Object.values(areas).map((a) => ({
            x: a.position.x,
            z: a.position.z,
            r: a.radius
        }))

        let placed = 0
        let attempts = 0
        while (placed < FLOWER_COUNT && attempts < FLOWER_COUNT * 4) {
            attempts++
            const x = (Math.random() - 0.5) * 120
            const z = (Math.random() - 0.5) * 120
            if (Math.sqrt(x * x + z * z) > 65) continue

            let skip = false
            for (const a of areaCenters) {
                if ((x - a.x) ** 2 + (z - a.z) ** 2 < (a.r * 0.5) ** 2) {
                    skip = true
                    break
                }
            }
            if (skip) continue

            const stemMat = new THREE.MeshStandardMaterial({ color: 0x3a7a2f, roughness: 0.9 })
            const stem = new THREE.Mesh(stemGeo, stemMat)
            stem.position.set(x, 0.2, z)
            this.group.add(stem)

            const color = flowerColors[Math.floor(Math.random() * flowerColors.length)]
            const petalMat = new THREE.MeshStandardMaterial({
                color,
                emissive: color,
                emissiveIntensity: 0.15,
                roughness: 0.5
            })
            const petal = new THREE.Mesh(petalGeo, petalMat)
            petal.position.set(x, 0.45, z)
            this.group.add(petal)
            placed++
        }
    }

    destroy() {
        this.scene.remove(this.group)
        this.group.traverse((child) => {
            if (child.geometry) child.geometry.dispose()
            if (child.material) child.material.dispose()
        })
    }
}
