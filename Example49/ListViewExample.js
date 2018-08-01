import React, {Component} from 'react';
import {StyleSheet, View, Text,ListView} from 'react-native';
import PropTypes from 'prop-types';
import HuaWeiRefreshControl from './HuaWeiRefreshControl';
import {ScrollView} from 'react-native-mjrefresh-lower'

export default class ListViewExample extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8']),
        };
    }
    _onRefresh=()=>{
        setTimeout(()=>{
            this._hw && this._hw.finishRefresh()
        },1000)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ListView//注意需修改ListView的var RCTScrollViewManager = require('NativeModules').ScrollViewManager;为var RCTScrollViewManager = require('NativeModules').MJScrollViewManager;
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text onPress={()=>alert(111)} style={{height:100}}>{rowData}</Text>}
                    renderScrollComponent={props=><ScrollView
                        refreshControl={
                            <HuaWeiRefreshControl
                                ref={ref=>this._hw = ref}
                                onRefresh={this._onRefresh}
                                {...props}
                            />
                        }
                    />}
                />
            </View>
        )
    }
}