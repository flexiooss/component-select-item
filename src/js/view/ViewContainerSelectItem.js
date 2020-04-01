import {ViewContainer, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewSelectItem} from './ViewSelectItem'

export class ViewContainerSelectItem extends ViewContainer {
  /**
   * @param {ComponentContext} context
   * @param {Element} parentNode
   * @param {ActionDispatcher<ActionSelect, ActionSelectBuilder>} actionSelect
   * @param {string} id
   */
  constructor(context, node, actionSelect, id) {
    const parameters = new ViewContainerParameters(context, `select-item-container-${id}`, node)
    super(parameters)

    this.__actionSelect = actionSelect

    this.__view = this.addView(new ViewSelectItem(this, id))

    this.__listen()
  }

  __listen() {
    this.__view.on().selectItem(id => {
      this.__actionSelect.dispatch(
        this.__actionSelect.payloadBuilder().id(id).build()
      )
    })
  }

  /**
   * @return {Element}
   */
  getNode() {
    return this.__view.getNode()
  }
}
