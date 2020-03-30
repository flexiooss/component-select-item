import {ActionsHandler} from './ActionsHandler'

export class ComponentSelectItem {
  constructor(application, parentNode, proxyStoreItems) {
    this.__application = application
    this.__parentNode = parentNode
    this.__proxyStoreItems = proxyStoreItems
    this.__context = this.__application.addComponentContext()

    this.__actions = new ActionsHandler(this.__context.dispatcher())
  }

  /**
   * @return {ActionDispatcher<ActionSelect, ActionSelectBuilder>}
   */
  actionSelect(){
    return this.__actions.actionSelect()
  }
}
