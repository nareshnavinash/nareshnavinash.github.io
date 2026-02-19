import * as THREE from 'three'
import { areas } from '../../Data/worldConfig.js'

const TREE_COUNT_DESKTOP = 200
const TREE_COUNT_MOBILE = 80

export default class Trees {
  constructor(game) {
    this.game = game
    this.scene = game.rendering.scene
    this.isMobile = game.viewport.isMobile
    this.treeGroup = new THREE.Group()
    this.treePositions = [] // Store positions for petal spawning

    const count = this.isMobile ? TREE_COUNT_MOBILE : TREE_COUNT_DESKTOP

    // Area centers to avoid
    const areaCenters = Object.values(areas).map((a) => ({
      x: a.position.x,
      z: a.position.z,
      r: a.radius + 3,
    }))

    let placed = 0
    let attempts = 0

    while (placed < count && attempts < count * 4) {
      attempts++
      const x = (Math.random() - 0.5) * 160
      const z = (Math.random() - 0.5) * 160

      // Skip if too close to center
      const distFromCenter = Math.sqrt(x * x + z * z)
      if (distFromCenter > 85) continue

      // Skip if inside an area
      let skip = false
      for (const a of areaCenters) {
        const dx = x - a.x
        const dz = z - a.z
        if (dx * dx + dz * dz < a.r * a.r) {
          skip = true
          break
        }
      }
      if (skip) continue

      const scale = 0.7 + Math.random() * 0.6
      const treeType = Math.random()

      if (treeType < 0.6) {
        // Cherry blossom tree
        this._createCherryBlossomTree(x, z, scale)
      } else if (treeType < 0.85) {
        // Rounded green tree
        this._createRoundedTree(x, z, scale)
      } else {
        // Tall elegant tree
        this._createTallTree(x, z, scale)
      }

      this.treePositions.push({ x, z, scale })
      placed++
    }

    this.scene.add(this.treeGroup)
  }

  _createCherryBlossomTree(x, z, scale) {
    // Trunk - slightly curved, warm brown
    const trunkGeo = new THREE.CylinderGeometry(0.12 * scale, 0.22 * scale, 2.2 * scale, 7)
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x6b4226,
      roughness: 0.85,
      flatShading: true,
    })
    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.set(x, scale * 1.1, z)
    trunk.castShadow = true
    this.treeGroup.add(trunk)

    // Cherry blossom canopy - multiple overlapping spheres for organic look
    const blossomColors = [0xffb7c5, 0xffc4d6, 0xffd1dc, 0xffe0e6, 0xffa8b8]
    const canopyBaseY = scale * 2.4

    // Main canopy cluster
    const clusterCount = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < clusterCount; i++) {
      const radius = (0.6 + Math.random() * 0.5) * scale
      const canopyGeo = new THREE.SphereGeometry(radius, 8, 6)
      const color = blossomColors[Math.floor(Math.random() * blossomColors.length)]
      const canopyMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.7,
        flatShading: true,
        transparent: true,
        opacity: 0.92,
      })
      const canopy = new THREE.Mesh(canopyGeo, canopyMat)

      const offsetX = (Math.random() - 0.5) * scale * 0.8
      const offsetY = (Math.random() - 0.3) * scale * 0.6
      const offsetZ = (Math.random() - 0.5) * scale * 0.8

      canopy.position.set(x + offsetX, canopyBaseY + offsetY, z + offsetZ)
      canopy.castShadow = true
      canopy.receiveShadow = true
      this.treeGroup.add(canopy)
    }

    // Small branch extensions
    if (Math.random() > 0.4) {
      const branchGeo = new THREE.CylinderGeometry(0.03 * scale, 0.06 * scale, 1.0 * scale, 4)
      const branchMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.85 })
      const branch = new THREE.Mesh(branchGeo, branchMat)
      branch.position.set(x + scale * 0.4, canopyBaseY - scale * 0.3, z)
      branch.rotation.z = -0.5
      this.treeGroup.add(branch)
    }
  }

  _createRoundedTree(x, z, scale) {
    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.1 * scale, 0.2 * scale, 2.0 * scale, 6)
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x5c3a1e,
      roughness: 0.9,
      flatShading: true,
    })
    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.set(x, scale * 1.0, z)
    trunk.castShadow = true
    this.treeGroup.add(trunk)

    // Round green canopy
    const leafColors = [0x3a8a35, 0x4a9a42, 0x2d7a28, 0x55aa50]
    const canopyGeo = new THREE.SphereGeometry(1.1 * scale, 8, 6)
    const color = leafColors[Math.floor(Math.random() * leafColors.length)]
    const canopyMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.75,
      flatShading: true,
    })
    const canopy = new THREE.Mesh(canopyGeo, canopyMat)
    canopy.position.set(x, scale * 2.6, z)
    canopy.castShadow = true
    canopy.receiveShadow = true
    this.treeGroup.add(canopy)

    // Second smaller layer on top
    if (Math.random() > 0.4) {
      const topGeo = new THREE.SphereGeometry(0.7 * scale, 7, 5)
      const topMat = new THREE.MeshStandardMaterial({
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        roughness: 0.75,
        flatShading: true,
      })
      const top = new THREE.Mesh(topGeo, topMat)
      top.position.set(x + (Math.random() - 0.5) * scale * 0.3, scale * 3.3, z + (Math.random() - 0.5) * scale * 0.3)
      top.castShadow = true
      this.treeGroup.add(top)
    }
  }

  _createTallTree(x, z, scale) {
    // Tall slim trunk
    const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.16 * scale, 3.0 * scale, 6)
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.85,
      flatShading: true,
    })
    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.set(x, scale * 1.5, z)
    trunk.castShadow = true
    this.treeGroup.add(trunk)

    // Layered canopy with warm autumn tones mixed with green
    const colors = [0x6aaa55, 0x88bb66, 0xccaa44, 0xdd9944]
    const layers = 2 + Math.floor(Math.random() * 2)
    for (let i = 0; i < layers; i++) {
      const layerScale = (1.0 - i * 0.25) * scale
      const layerGeo = new THREE.SphereGeometry(0.7 * layerScale, 7, 5)
      const layerMat = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.7,
        flatShading: true,
      })
      const layer = new THREE.Mesh(layerGeo, layerMat)
      layer.position.set(x, scale * 3.0 + i * scale * 0.7, z)
      layer.castShadow = true
      this.treeGroup.add(layer)
    }
  }

  destroy() {
    this.scene.remove(this.treeGroup)
    this.treeGroup.traverse((child) => {
      if (child.geometry) child.geometry.dispose()
      if (child.material) child.material.dispose()
    })
  }
}
