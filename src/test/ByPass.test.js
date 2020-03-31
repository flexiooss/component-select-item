/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {ComponentSelectItemBuilder} from '../../index'
import {ViewListHandlerMounter} from '@flexio-oss/component-list-handler'

const assert = require('assert')

export class ByPass extends TestCase {

  test() {
    const select = ComponentSelectItemBuilder.builder()
      .application(application)
      .parentNode(node)
      .storeItems(store)
      .viewListHandlerMounter(new ViewListHandlerMounter())
      .onCreateItems((context, nodes) => {
        nodes.forEach(node =>{
          createViewContainer(context, node)
            ... DO INTELLIGENT THINGS ...
        })
      })
      .viewContainerSelectItemBuilder(new ViewContainerSelectItemBuilder())
      .build()

    select.actionSelect().listenWithCallback(action =>{
      const id = action.id()
    }, myContext)
  }
}

runTest(ByPass)
