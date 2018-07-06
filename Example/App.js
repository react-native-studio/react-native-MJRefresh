/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Button,
} from 'react-native';
import HuaWeiRefreshControl from './HuaWeiRefreshControl'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import {ScrollView} from 'react-native-mjrefresh'
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <View style={{flex:1}}>
        <ScrollView
            //contentContainerStyle={{paddingVertical:50}}
            style={{flex:1}}
            scrollEventThrottle={16}
            onScroll={e=>console.log(e.nativeEvent)}
            refreshControl={<HuaWeiRefreshControl
                ref={ref=>this._hw = ref}
                onRefresh={()=>{
                    setTimeout(()=>{
                        this._hw.finishRefresh();
                    },1000)
                }}
            />}
        >

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button title='beginRefresh' onPress={()=>{
          this._hw.beginRefresh()
        }}/>
      </View>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
      height:1000
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
