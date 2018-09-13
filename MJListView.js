import React,{Component} from 'react';
import {
    findNodeHandle,
    NativeModules,
    Platform,
    ListView,
} from 'react-native';
import MJScrollView from './MJScrollView'
const RCTMJScrollViewManager = NativeModules.MJScrollViewManager;
var DEFAULT_PAGE_SIZE = 1;
var DEFAULT_INITIAL_ROWS = 10;
var DEFAULT_SCROLL_RENDER_AHEAD = 1000;
var DEFAULT_END_REACHED_THRESHOLD = 1000;

class MJListView extends ListView {
    static defaultProps = {
        initialListSize: DEFAULT_INITIAL_ROWS,
        pageSize: DEFAULT_PAGE_SIZE,
        renderScrollComponent: props => <MJScrollView {...props} />,
        scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
        onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
        stickySectionHeadersEnabled: Platform.OS === 'ios',
        stickyHeaderIndices: [],
    }

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

module.exports = Platform.OS === 'ios' ? MJListView : ListView;
