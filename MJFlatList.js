import React, {Component} from 'react';
import {VirtualizedList, FlatList,Platform} from 'react-native';
class MJFlatList extends FlatList {
    render() {
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

module.exports = Platform.OS === 'ios' ? MJFlatList : FlatList;