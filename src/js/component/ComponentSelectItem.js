import {ActionsHandler} from './ActionsHandler'
import {ComponentListHandlerBuilder} from '@flexio-oss/component-list-handler/src/js/component/ComponentListHandlerBuilder'

export class ComponentSelectItem {
  /**
   * @param {HotBalloonApplication} application
   * @param {Element} parentNode
   * @param {StoreInterface<ItemCollection, ItemCollectionBuilder>} storeItems
   * @param {ViewListHandlerMounter} viewListHandlerMounter
   * @param {Function(ComponentContext, Element[])} onCreateItems
   * @param {ViewContainerSelectItemBuilder} viewContainerSelectItemBuilder
   */
  constructor(application, parentNode, storeItems, viewListHandlerMounter, onCreateItems, viewContainerSelectItemBuilder) {
    this.__application = application
    this.__parentNode = parentNode
    this.__storeItems = storeItems
    this.__viewListHandlerMounter = viewListHandlerMounter
    this.__onCreateItems = onCreateItems
    this.__viewContainerSelectItemBuilder = viewContainerSelectItemBuilder

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
      .storeItems(this.__storeItems)
      .idPrefix('select_item')
      .viewListHandlerMounter(this.__viewListHandlerMounter)
      .reconcile(false)
      .build()
  }

  __setup() {
    this.__componentList.onCreateItem(items => {
      const nodes = []
      for (let item of items.elements()) {
        const node = this.__componentList.nodeByID(item)
        const viewContainer = this.__viewContainerSelectItemBuilder.build(this.__context, node, this.actionSelect(), item)
        viewContainer.renderAndMount()
        this.__itemViewContainers.set(item, viewContainer)
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
