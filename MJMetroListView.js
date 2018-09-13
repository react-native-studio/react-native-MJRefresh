import React, {Component} from 'react';
import {RefreshControl} from 'react-native';

const MetroList = require('react-native/Libraries/Lists/MetroListView')
const MJListView = require('./MJListView');
const MJScrollView = require('./MJScrollView');

export default class MJMetroListView extends MetroList {
    static defaultProps = {
        keyExtractor: (item, index) => item.key || String(index),
        renderScrollComponent: (props) => {
            if (props.onRefresh) {
                return (
                    /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
                     * comment suppresses an error when upgrading Flow's support for
                     * React. To see the error delete this comment and run Flow. */
                    <MJScrollView
                        {...props}
                        refreshControl={
                            /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss)
                             * This comment suppresses an error when upgrading Flow's support
                             * for React. To see the error delete this comment and run Flow.
                             */
                            <RefreshControl
                                refreshing={props.refreshing}
                                onRefresh={props.onRefresh}
                            />
                        }
                    />
                );
            } else {
                /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
                 * comment suppresses an error when upgrading Flow's support for React.
                 * To see the error delete this comment and run Flow. */
                return <MJScrollView {...props} />;
            }
        },
    }

    render() {
        return (
            /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
             * comment suppresses an error when upgrading Flow's support for React.
             * To see the error delete this comment and run Flow. */
            <MJListView
                {...this.props}
                dataSource={this.state.ds}
                ref={this._captureRef}
                renderRow={this._renderRow}
                renderFooter={this.props.FooterComponent && this._renderFooter}
                renderSectionHeader={this.props.sections && this._renderSectionHeader}
                renderSeparator={this.props.SeparatorComponent && this._renderSeparator}
            />
        );
    }
}