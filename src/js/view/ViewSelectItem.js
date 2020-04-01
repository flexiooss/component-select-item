import {e, View, ViewPublicEventHandler} from '@flexio-oss/hotballoon'
import {UIEventBuilder} from '@flexio-oss/hotballoon/src/js/HotballoonNodeElement/UIEventBuilder'

const SELECT = 'SELECT_ITEM'

export class ViewSelectItem extends View {
  constructor(viewContainer, id) {
    super(viewContainer)
    this.__id = id
    this.__nodeId = `item-${this.__id}`
  }

  /**
   * @return {ViewSelectItemEvent}
   */
  on() {
    return new ViewSelectItemEvent((a) => {
      return this._on(a)
    })
  }

  /**
   * @return {Element}
   */
  getNode() {
    return this.nodeRef(this.__nodeId)
  }

  template() {
    return this.html(
      e(`div#${this.__nodeId}`)
        .listenEvent(
          UIEventBuilder
            .mouseEvent()
            .click(() => {
              this.dispatch(SELECT, this.__id)
            })
        )
    )
  }
}

class ViewSelectItemEvent extends ViewPublicEventHandler {
  selectItem(clb) {
    return this._subscribeTo(SELECT, clb)
  }
}
