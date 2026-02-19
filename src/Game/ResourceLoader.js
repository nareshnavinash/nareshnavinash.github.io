import * as THREE from 'three'

/**
 * Resource loading manager.
 * Tracks loading progress and fires callbacks.
 */
export default class ResourceLoader {
  constructor() {
    this.manager = new THREE.LoadingManager()
    this.textureLoader = new THREE.TextureLoader(this.manager)

    this._onProgressCallbacks = []
    this._onCompleteCallbacks = []
    this._totalItems = 0
    this._loadedItems = 0

    this.manager.onProgress = (url, loaded, total) => {
      this._totalItems = total
      this._loadedItems = loaded
      const progress = total > 0 ? loaded / total : 1
      for (const cb of this._onProgressCallbacks) cb(progress)
    }

    this.manager.onLoad = () => {
      for (const cb of this._onCompleteCallbacks) cb()
    }
  }

  loadTexture(url) {
    return this.textureLoader.load(url)
  }

  onProgress(cb) {
    this._onProgressCallbacks.push(cb)
  }

  onComplete(cb) {
    this._onCompleteCallbacks.push(cb)
  }

  destroy() {
    this._onProgressCallbacks = []
    this._onCompleteCallbacks = []
  }
}
