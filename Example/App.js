/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 注意：需要修改react-native/Libraries/Components/ScrollView/ScrollView.js
 * 否则会报错
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    ScrollView,
    Button
} from 'react-native';
import HuaWeiRefreshControl from './HuaWeiRefreshControl'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <ScrollView
            refreshControl={
              <HuaWeiRefreshControl
                  ref={ref=>this._hw = ref}
                  onRefresh={()=>{
                    setTimeout(()=>{
                      this._hw.finishRefresh();
                    },1000)
                  }}
              />
            }
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
