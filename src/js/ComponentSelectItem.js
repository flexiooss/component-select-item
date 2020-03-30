import {ActionsHandler} from './ActionsHandler'
import {ComponentListHandlerBuilder} from '@flexio-oss/component-list-handler/src/js/component/ComponentListHandlerBuilder'
import {ViewContainerSelectItem} from './view/ViewContainerSelectItem'

export class ComponentSelectItem {
  constructor(application, parentNode, proxyStoreItems, viewListHandlerMounter) {
    this.__application = application
    this.__parentNode = parentNode
    this.__proxyStoreItems = proxyStoreItems
    this.__viewListHandlerMounter = viewListHandlerMounter
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
      .build()
  }

  __setup() {
    this.__componentList.onCreateItem(items => {
      items.elements().forEach(item => {
        const node = this.__componentList.nodeByID(item)
        const viewContainer = new ViewContainerSelectItem(this.__context, this.__parentNode, this.actionSelect(), item, node)
        this.__itemViewContainers.set(item, viewContainer)
        viewContainer.renderAndMount()
      })
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
}
