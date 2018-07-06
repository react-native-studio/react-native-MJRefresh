import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    requireNativeComponent,
    ViewPropTypes,
    findNodeHandle,
    UIManager,
} from 'react-native';
import PropTypes from 'prop-types'

const RCTMJRefreshView = requireNativeComponent('RCTMJRefreshView', MJRefresh);

class MJRefresh extends Component {
    _onMJRefresh=()=>{
        let {onRefresh} = this.props;
        onRefresh && onRefresh();
    }
    _onMJPulling=(e)=>{
        let {onPulling} = this.props;
        onPulling && onPulling(e);
    }
    _onMJReleaseToRefresh=()=>{
        let {onReleaseToRefresh} = this.props;
        onReleaseToRefresh && onReleaseToRefresh();
    }
    _onMJRefreshIdle=()=>{
        let {onRefreshIdle} = this.props;
        onRefreshIdle && onRefreshIdle();
    }
    finishRefresh=()=>{
        this.dispatchCommand('finishRefresh');
    }
    beginRefresh=()=>{
        this.dispatchCommand('beginRefresh')
    }
    dispatchCommand (commandName, params) {
        UIManager.dispatchViewManagerCommand(this.findNode(), UIManager.RCTMJRefreshView.Commands[commandName], params)
    }
    findNode=()=>{
        return findNodeHandle(this.refs.refreshView);
    }
    render() {
        let {style} = this.props;
        return (
            <RCTMJRefreshView
            ref='refreshView'
            {...this.props}
            onMJRefresh={this._onMJRefresh}
            onMJRefreshIdle={this._onMJRefreshIdle}
            onMJReleaseToRefresh={this._onMJReleaseToRefresh}
            onMJPulling={this._onMJPulling}
            style={[
                style,
                {
                    position:'absolute',
                    left:0,
                    right:0,
                }
            ]}
        />)
    }
}
MJRefresh.propTypes={
    onRefresh:PropTypes.func,
    onRefreshIdle:PropTypes.func,
    onReleaseToRefresh:PropTypes.func,
    onPulling:PropTypes.func,
    ...ViewPropTypes
}
export {default as ScrollView} from './MJScrollView'
export default MJRefresh;
