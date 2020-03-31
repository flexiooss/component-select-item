import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType, isFunction, isNode, isNull} from '@flexio-oss/assert'
import {ComponentSelectItemPublic} from './ComponentSelectItemPublic'
import {ComponentSelectItem} from './ComponentSelectItem'

export class ComponentSelectItemBuilder {
  /**
   * @return {ComponentSelectItemBuilder}
   */
  static builder() {
    return new ComponentSelectItemBuilder()
  }

  /**
   * @param {HotBalloonApplication} application
   * @return {ComponentSelectItemBuilder}
   */
  application(application) {
    assertType(TypeCheck.isHotballoonApplication(application), 'ComponentSelectItemBuilder:application: argument should be a HotballoonApplication')
    this.__application = application
    return this
  }

  /**
   * @param {Element} parentNode
   * @return {ComponentSelectItemBuilder}
   */
  parentNode(parentNode) {
    assertType(isNode(parentNode), 'ComponentSelectItemBuilder:parentNode: argument should be a node')
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {ProxyStore<STORE_TYPE, STORE_TYPE_BUILDER, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @returns {ComponentSelectItemBuilder}
   */
  proxyStoreItems(proxyStoreItems) {
    this.__proxyStoreItems = proxyStoreItems
    return this
  }

  /**
   * @param {ViewListHandlerMounter} viewListHandlerMounter
   * @returns {ComponentSelectItemBuilder}
   */
  viewListHandlerMounter(viewListHandlerMounter) {
    this.__viewListHandlerMounter = viewListHandlerMounter
    return this
  }

  /**
   * @param {Function(ComponentContext, Element[])} onCreateItems
   * @returns {ComponentSelectItemBuilder}
   */
  onCreateItems(onCreateItems) {
    assertType(isFunction(onCreateItems), 'ComponentSelectItemBuilder:parentNode: argument should be a function')
    this.__onCreateItems = onCreateItems
    return this
  }

  /**
   * @return {ComponentSelectItemPublic}
   */
  build() {
    assertType(!isNull(this.__application), 'componentContext should be set')
    assertType(!isNull(this.__parentNode), 'parentNode should be set')
    assertType(!isNull(this.__proxyStoreItems), 'proxyStoreItems should be set')
    assertType(!isNull(this.__viewListHandlerMounter), 'viewListHandlerMounter should be set')
    assertType(!isNull(this.__onCreateItems), 'onCreateItems should be set')

    return new ComponentSelectItemPublic(
      new ComponentSelectItem(
        this.__application,
        this.__parentNode,
        this.__proxyStoreItems,
        this.__viewListHandlerMounter,
        this.__onCreateItems
      )
    )
  }
}
