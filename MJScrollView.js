import React,{Component} from 'react';
import {
  requireNativeComponent,
  ScrollView,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
const warning = require('fbjs/lib/warning');
const flattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');
const invariant = require('fbjs/lib/invariant');
const ScrollViewStickyHeader = require('react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader');
const processDecelerationRate = require('react-native/Libraries/Components/ScrollView/processDecelerationRate');
const RCTMJScrollView = requireNativeComponent('RCTMJScrollView', MJScrollView, {
  nativeOnly: {
    onMomentumScrollBegin: true,
    onMomentumScrollEnd : true,
    onScrollBeginDrag: true,
    onScrollEndDrag: true,
  }
})

const RCTMJScrollContentView = requireNativeComponent('RCTMJScrollContentView', View)

class MJScrollView extends ScrollView {
  render() {
        let ScrollViewClass = RCTMJScrollView;
        let ScrollContentContainerViewClass = RCTMJScrollContentView;
          warning(
              !this.props.snapToInterval || !this.props.pagingEnabled,
              'snapToInterval is currently ignored when pagingEnabled is true.'
          );
      invariant(
          ScrollViewClass !== undefined,
          'ScrollViewClass must not be undefined'
      );
      invariant(
          ScrollContentContainerViewClass !== undefined,
          'ScrollContentContainerViewClass must not be undefined'
      );
      const contentContainerStyle = [
          this.props.horizontal && styles.contentContainerHorizontal,
          this.props.contentContainerStyle,
      ];
      let style, childLayoutProps;
      if (__DEV__ && this.props.style) {
          style = flattenStyle(this.props.style);
          childLayoutProps = ['alignItems', 'justifyContent']
              .filter((prop) => style && style[prop] !== undefined);
          invariant(
              childLayoutProps.length === 0,
              'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
              ') must be applied through the contentContainerStyle prop.'
          );
      }

      let contentSizeChangeProps = {};
      if (this.props.onContentSizeChange) {
          contentSizeChangeProps = {
              onLayout: this._handleContentOnLayout,
          };
      }

      const {stickyHeaderIndices} = this.props;
      const hasStickyHeaders = stickyHeaderIndices && stickyHeaderIndices.length > 0;
      /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This comment
       * suppresses an error when upgrading Flow's support for React. To see the
       * error delete this comment and run Flow. */
      const childArray = hasStickyHeaders && React.Children.toArray(this.props.children);
      const children = hasStickyHeaders ?
          /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
           * comment suppresses an error when upgrading Flow's support for React.
           * To see the error delete this comment and run Flow. */
          childArray.map((child, index) => {
              /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
               * comment suppresses an error when upgrading Flow's support for React.
               * To see the error delete this comment and run Flow. */
              const indexOfIndex = child ? stickyHeaderIndices.indexOf(index) : -1;
              if (indexOfIndex > -1) {
                  const key = child.key;
                  /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
                   * comment suppresses an error when upgrading Flow's support for
                   * React. To see the error delete this comment and run Flow. */
                  const nextIndex = stickyHeaderIndices[indexOfIndex + 1];
                  return (
                      <ScrollViewStickyHeader
                          key={key}
                          ref={(ref) => this._setStickyHeaderRef(key, ref)}
                          nextHeaderLayoutY={
                              /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss)
                               * This comment suppresses an error when upgrading Flow's
                               * support for React. To see the error delete this comment and
                               * run Flow. */
                              this._headerLayoutYs.get(this._getKeyForIndex(nextIndex, childArray))
                          }
                          onLayout={(event) => this._onStickyHeaderLayout(index, event, key)}
                          scrollAnimatedValue={this._scrollAnimatedValue}>
                          {child}
                      </ScrollViewStickyHeader>
                  );
              } else {
                  return child;
              }
          }) :
          /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
           * comment suppresses an error when upgrading Flow's support for React.
           * To see the error delete this comment and run Flow. */
          this.props.children;
      const contentContainer =
          <ScrollContentContainerViewClass
              {...contentSizeChangeProps}
              /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
               * comment suppresses an error when upgrading Flow's support for React.
               * To see the error delete this comment and run Flow. */
              ref={this._setInnerViewRef}
              style={contentContainerStyle}
              removeClippedSubviews={
                  // Subview clipping causes issues with sticky headers on Android and
                  // would be hard to fix properly in a performant way.
                  Platform.OS === 'android' && hasStickyHeaders ?
                      false :
                      this.props.removeClippedSubviews
              }
              collapsable={false}>
              {children}
          </ScrollContentContainerViewClass>;

      const alwaysBounceHorizontal =
          this.props.alwaysBounceHorizontal !== undefined ?
              this.props.alwaysBounceHorizontal :
              this.props.horizontal;

      const alwaysBounceVertical =
          this.props.alwaysBounceVertical !== undefined ?
              this.props.alwaysBounceVertical :
              !this.props.horizontal;

      const DEPRECATED_sendUpdatedChildFrames =
          !!this.props.DEPRECATED_sendUpdatedChildFrames;

      const baseStyle = this.props.horizontal ? styles.baseHorizontal : styles.baseVertical;
      const props = {
          ...this.props,
          alwaysBounceHorizontal,
          alwaysBounceVertical,
          style: [baseStyle, this.props.style],
          // Override the onContentSizeChange from props, since this event can
          // bubble up from TextInputs
          onContentSizeChange: null,
          onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
          onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
          onResponderGrant: this.scrollResponderHandleResponderGrant,
          onResponderReject: this.scrollResponderHandleResponderReject,
          onResponderRelease: this.scrollResponderHandleResponderRelease,
          /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
           * comment suppresses an error when upgrading Flow's support for React.
           * To see the error delete this comment and run Flow. */
          onResponderTerminate: this.scrollResponderHandleTerminate,
          onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
          onScroll: this._handleScroll,
          onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
          onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
          onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
          onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
          onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
          onTouchEnd: this.scrollResponderHandleTouchEnd,
          onTouchMove: this.scrollResponderHandleTouchMove,
          onTouchStart: this.scrollResponderHandleTouchStart,
          scrollEventThrottle: hasStickyHeaders ? 1 : this.props.scrollEventThrottle,
          sendMomentumEvents: (this.props.onMomentumScrollBegin || this.props.onMomentumScrollEnd) ?
              true : false,
          DEPRECATED_sendUpdatedChildFrames,
      };

      const { decelerationRate } = this.props;
      if (decelerationRate) {
          props.decelerationRate = processDecelerationRate(decelerationRate);
      }

      const refreshControl = this.props.refreshControl;

      if (refreshControl) {
              // On iOS the RefreshControl is a child of the ScrollView.
              // tvOS lacks native support for RefreshControl, so don't include it in that case
              return (
                  /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
                   * comment suppresses an error when upgrading Flow's support for
                   * React. To see the error delete this comment and run Flow. */
                  <ScrollViewClass {...props} ref={this._setScrollViewRef}>
                      {Platform.isTVOS ? null : refreshControl}
                      {contentContainer}
                  </ScrollViewClass>
              );
      }
      return (
          /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
           * comment suppresses an error when upgrading Flow's support for React.
           * To see the error delete this comment and run Flow. */
          <ScrollViewClass {...props} ref={this._setScrollViewRef}>
              {contentContainer}
          </ScrollViewClass>
      );
  }
}

const styles = StyleSheet.create({
    baseVertical: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
        overflow: 'scroll',
    },
    baseHorizontal: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'row',
        overflow: 'scroll',
    },
    contentContainerHorizontal: {
        flexDirection: 'row',
    },
});

module.exports = Platform.OS === 'ios' ? MJScrollView : ScrollView
