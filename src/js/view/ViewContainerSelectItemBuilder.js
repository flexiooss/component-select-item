import {ViewContainerSelectItem} from './ViewContainerSelectItem'

export class ViewContainerSelectItemBuilder {
  /**
   * @param {ComponentContext}context
   * @param {Element} node
   * @param action
   * @param item
   * @return {ViewContainerSelectItem}
   */
  build(context, node, action, item){
    return new ViewContainerSelectItem(this.__context, node, this.actionSelect(), item)
  }
}
