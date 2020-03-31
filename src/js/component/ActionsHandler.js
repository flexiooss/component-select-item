import {assertType} from '@flexio-oss/assert'
import {TypeCheck, ActionDispatcherBuilder} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class ActionsHandler {
  constructor(dispatcher) {
    assertType(
      TypeCheck.isDispatcher(dispatcher),
      'Component_related_record:ActionsHandler: `dispatcher` should be a Dispatcher'
    )

    this.__actionSelect = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.component_select_item.actions.ActionSelect)
      .dispatcher(dispatcher)
      .build()
  }

  /**
   * @return {ActionDispatcher<ActionSelect, ActionSelectBuilder>}
   */
  actionSelect(){
    return this.__actionSelect
  }
}
