import {
  findNodeHandle,
  NativeModules,
} from 'react-native'

const ListView = require('react-native/Libraries/Lists/ListView/ListView')

const RCTMJScrollViewManager = NativeModules.MJScrollViewManager

module.exports = class MJListView extends ListView {
  _measureAndUpdateScrollProps = () => {
    var scrollComponent = this.getScrollResponder();
    if (!scrollComponent || !scrollComponent.getInnerViewNode) {
      return;
    }

    RCTMJScrollViewManager &&
      RCTMJScrollViewManager.calculateChildFrames &&
      RCTMJScrollViewManager.calculateChildFrames(
        findNodeHandle(scrollComponent),
        this._updateVisibleRows,
      )
  }
}
