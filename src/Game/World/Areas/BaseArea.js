import * as THREE from 'three'
import { colors } from '../../../Data/colorPalette.js'

/**
 * Base class for all area decorations.
 * Each area creates themed 3D objects around its center.
 */
export default class BaseArea {
  constructor(game, config) {
    this.game = game
    this.scene = game.rendering.scene
    this.config = config
    this.group = new THREE.Group()
    this.group.position.set(config.position.x, 0, config.position.z)
    this.scene.add(this.group)
    this.decorations = []
  }

  _createPillar(x, z, height, color) {
    const geo = new THREE.CylinderGeometry(0.3, 0.4, height, 8)
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.6,
      metalness: 0.2,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, height / 2, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.group.add(mesh)
    this.decorations.push(mesh)
    return mesh
  }

  _createFloatingOrb(x, y, z, color, size = 0.3) {
    const geo = new THREE.SphereGeometry(size, 12, 8)
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.3,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    this.group.add(mesh)
    this.decorations.push(mesh)
    return mesh
  }

  _createSign(x, z, text, color) {
    // Simple sign post
    const postGeo = new THREE.CylinderGeometry(0.05, 0.05, 2, 6)
    const postMat = new THREE.MeshStandardMaterial({ color: 0x8b6b3d, roughness: 0.9 })
    const post = new THREE.Mesh(postGeo, postMat)
    post.position.set(x, 1, z)
    post.castShadow = true
    this.group.add(post)

    // Sign board
    const boardGeo = new THREE.BoxGeometry(2, 0.8, 0.1)
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      roughness: 0.4,
      metalness: 0.1,
    })
    const board = new THREE.Mesh(boardGeo, boardMat)
    board.position.set(x, 2.2, z)
    board.castShadow = true
    this.group.add(board)

    // Accent stripe on sign
    const stripeGeo = new THREE.BoxGeometry(2.1, 0.1, 0.12)
    const stripeMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
    })
    const stripe = new THREE.Mesh(stripeGeo, stripeMat)
    stripe.position.set(x, 2.6, z)
    this.group.add(stripe)

    this.decorations.push(post, board, stripe)
  }

  update(dt) {
    // Override in subclasses for animations
  }

  destroy() {
    this.scene.remove(this.group)
    this.decorations.forEach((d) => {
      if (d.geometry) d.geometry.dispose()
      if (d.material) d.material.dispose()
    })
  }
}
