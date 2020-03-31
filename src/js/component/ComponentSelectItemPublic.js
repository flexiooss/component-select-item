import {ComponentSelectItem} from './ComponentSelectItem'
import {assertType} from '@flexio-oss/assert'

const __component = Symbol('__component-select-item')

export class ComponentSelectItemPublic {
  constructor(component) {
    assertType(
      component instanceof ComponentSelectItem,
      'ComponentSelectItemPublic:constructor `ComponentSelectItem` argument should be an instance of ComponentSelectItem'
    )
    this[__component] = component
  }

  /**
   * @return {ActionDispatcher<ActionSelect, ActionSelectBuilder>}
   */
  actionSelect() {
    return this[__component].actionSelect()
  }

  remove(){
    this[__component].remove()
  }
}
