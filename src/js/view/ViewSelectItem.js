import {View, ViewPublicEventHandler} from '@flexio-oss/hotballoon'
import {UIEventBuilder} from '@flexio-oss/hotballoon/src/js/HotballoonNodeElement/UIEventBuilder'

const SELECT = 'SELECT_ITEM'

export class ViewSelectItem extends View {
  constructor(viewContainer, id, node) {
    super(viewContainer)
    this.__id = id
    this.__node = node
  }

  /**
   * @return {ViewSelectItemEvent}
   */
  on() {
    return new ViewSelectItemEvent((a) => {
      return this._on(a)
    })
  }

  template() {
    return this.html(
      this.__node
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
