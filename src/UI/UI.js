import ContentPanel from './ContentPanel.js'
import HUD from './HUD.js'
import Minimap from './Minimap.js'

export default class UI {
  constructor(game) {
    this.game = game
    this.contentPanel = new ContentPanel(game)
    this.hud = new HUD(game)
    this.minimap = new Minimap(game)
  }

  update(dt) {
    this.minimap.update(dt)
  }

  openContent(contentKey) {
    this.contentPanel.open(contentKey)
  }

  closeContent() {
    this.contentPanel.close()
  }

  get isPanelOpen() {
    return this.contentPanel.isOpen
  }

  destroy() {
    this.contentPanel.destroy()
    this.hud.destroy()
    this.minimap.destroy()
  }
}
