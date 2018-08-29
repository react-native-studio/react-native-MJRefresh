import React from 'react'
import {
  requireNativeComponent,
  ScrollView,
  View,
} from 'react-native'

const RCTMJScrollView = requireNativeComponent('RCTMJScrollView', MJScrollView, {
  nativeOnly: {
    onMomentumScrollBegin: true,
    onMomentumScrollEnd : true,
    onScrollBeginDrag: true,
    onScrollEndDrag: true,
  }
})

const RCTMJScrollContentView = requireNativeComponent('RCTMJScrollContentView', View)

export default class MJScrollView extends ScrollView {
  render() {
    const scrollView = super.render()
    const children = scrollView.props.children
    const hasRefreshControl = React.Children.count(children) > 1
    const refreshControl = hasRefreshControl ? children[0] : null
    const scrollViewContent = hasRefreshControl ? children[1] : children

    return (
      <RCTMJScrollView {...scrollView.props} ref={scrollView.ref}>
        {refreshControl}
        <RCTMJScrollContentView {...scrollViewContent.props} ref={scrollViewContent.ref} />
      </RCTMJScrollView>
    )
  }
}
