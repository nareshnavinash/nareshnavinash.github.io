import * as THREE from 'three'
import { areas, paths } from '../../Data/worldConfig.js'

/**
 * Creates paths (walkways) between area centers.
 */
export default class Floor {
    constructor(game) {
        this.game = game
        this.scene = game.rendering.scene
        this.meshes = []

        this._createPaths()
    }

    _createPaths() {
        const pathMaterial = new THREE.MeshStandardMaterial({
            color: 0x6b5a3d,
            roughness: 0.95,
            metalness: 0.0,
            flatShading: true
        })

        paths.forEach(([fromKey, toKey]) => {
            const from = areas[fromKey].position
            const to = areas[toKey].position

            const dx = to.x - from.x
            const dz = to.z - from.z
            const length = Math.sqrt(dx * dx + dz * dz)
            const angle = Math.atan2(dx, dz)

            // Path as a flat box
            const width = 1.5
            const geo = new THREE.PlaneGeometry(width, length)
            geo.rotateX(-Math.PI / 2)

            const mesh = new THREE.Mesh(geo, pathMaterial)
            mesh.position.set(from.x + dx * 0.5, 0.02, from.z + dz * 0.5)
            mesh.rotation.y = -angle
            mesh.receiveShadow = true

            this.scene.add(mesh)
            this.meshes.push(mesh)
        })
    }

    destroy() {
        this.meshes.forEach((m) => {
            this.scene.remove(m)
            m.geometry.dispose()
        })
    }
}
