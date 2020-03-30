import {ViewContainer, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewSelectItem} from './ViewSelectItem'

export class ViewContainerSelectItem extends ViewContainer {
  /**
   * @param {ComponentContext} context
   * @param {Element} parentNode
   * @param {ActionDispatcher<ActionSelect, ActionSelectBuilder>} actionSelect
   * @param {string} id
   * @param {Element} node
   */
  constructor(context, parentNode, actionSelect, id, node) {
    const parameters = new ViewContainerParameters(context, `select-item-container-${id}`, parentNode)
    super(parameters)

    this.__actionSelect = actionSelect

    this.__view.on().selectItem(id => {
      this.__actionSelect.dispatch(
        this.__actionSelect.payloadBuilder().id(id).build()
      )
    })
    this.__view = this.addView(new ViewSelectItem(this, node))
  }
}
