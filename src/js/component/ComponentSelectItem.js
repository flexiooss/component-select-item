import {ActionsHandler} from './ActionsHandler'
import {ComponentListHandlerBuilder} from '@flexio-oss/component-list-handler/src/js/component/ComponentListHandlerBuilder'
import {ViewContainerSelectItem} from '../view/ViewContainerSelectItem'

export class ComponentSelectItem {
  /**
   * @param {HotBalloonApplication} application
   * @param {Element} parentNode
   * @param {ProxyStore<STORE_TYPE, STORE_TYPE_BUILDER, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @param {ViewListHandlerMounter} viewListHandlerMounter
   * @param {Function(ComponentContext, Element[])} onCreateItems
   */
  constructor(application, parentNode, proxyStoreItems, viewListHandlerMounter, onCreateItems) {
    this.__application = application
    this.__parentNode = parentNode
    this.__proxyStoreItems = proxyStoreItems
    this.__viewListHandlerMounter = viewListHandlerMounter
    this.__onCreateItems = onCreateItems

    this.__context = this.__application.addComponentContext()
    this.__actions = new ActionsHandler(this.__context.dispatcher())

    this.__itemViewContainers = new Map()

    this.__buildComponentList()
    this.__setup()
  }

  __buildComponentList() {
    this.__componentList = new ComponentListHandlerBuilder()
      .application(this.__application)
      .parentNode(this.__parentNode)
      .proxyStoreItems(this.__proxyStoreItems)
      .idPrefix('select_item')
      .viewListHandlerMounter(this.__viewListHandlerMounter)
      .reconcile(false)
      .build()
  }

  __setup() {
    this.__componentList.onCreateItem(items => {
      const nodes = []
      for (let item of items.elements) {
        const node = this.__componentList.nodeByID(item)
        const viewContainer = new ViewContainerSelectItem(this.__context, node, this.actionSelect(), item)
        this.__itemViewContainers.set(item, viewContainer)
        viewContainer.renderAndMount()
        nodes.push(viewContainer.getNode())
      }
      this.__onCreateItems(this.__context, nodes)
    })

    this.__componentList.onDeleteItem(items => {
      items.elements().forEach(item => {
        const viewContainer = this.__itemViewContainers.get(item)
        if (viewContainer) {
          viewContainer.remove()
        }
      })
    })
  }

  /**
   * @return {ActionDispatcher<ActionSelect, ActionSelectBuilder>}
   */
  actionSelect() {
    return this.__actions.actionSelect()
  }

  /**
   * @param {Function(ComponentContext, Element[])} onCreateItems
   */
  onCreateItems(onCreateItems) {
    this.__onCreateItems = onCreateItems
  }

  remove() {
    this.__context.remove()
  }
}
