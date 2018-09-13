import React, {Component} from 'react';
import {VirtualizedList, FlatList,Platform} from 'react-native';
import MJMetroListView from './MJMetroListView'

class MJFlatList extends FlatList {
    render() {
        if (this.props.legacyImplementation) {
            return (
                <MJMetroListView
                    {...this.props}
                    items={this.props.data}
                    ref={this._captureRef}
                />
            );
        } else {
            return (
                <VirtualizedList
                    {...this.props}
                    renderItem={this._renderItem}
                    getItem={this._getItem}
                    getItemCount={this._getItemCount}
                    keyExtractor={this._keyExtractor}
                    ref={this._captureRef}
                    onViewableItemsChanged={
                        this.props.onViewableItemsChanged && this._onViewableItemsChanged
                    }
                />
            );
        }
    }
}

module.exports = Platform.OS === 'ios' ? MJFlatList : FlatList;