import React, {Component} from 'react';
import {StyleSheet, View, Text,Animated,Easing,Dimensions,Image,TouchableWithoutFeedback} from 'react-native';
import MJRefresh from 'react-native-mjrefresh';
import LottieView from 'lottie-react-native'
export default class LottieRefreshControl extends Component {
    state = {
        scale: new Animated.Value(0.1)
    }
    _onRefresh = () => {
        let {onRefresh} = this.props;
        onRefresh && onRefresh();
        this.lottieView.play(this.state.scale.__getValue())
    }
    _onPulling=(event)=>{
        let {percent} = event.nativeEvent;
        if(percent<=1) {
            this.state.scale.setValue(event.nativeEvent.percent);
        }
    }
    finishRefresh=()=>{
        this._mjrefresh && this._mjrefresh.finishRefresh();
        this.lottieView.reset();
    }
    beginRefresh=()=>{
        this._mjrefresh && this._mjrefresh.beginRefresh();
    }
    render() {
        return (
            <MJRefresh
                ref={ref=>this._mjrefresh = ref}
                onRefresh={this._onRefresh}
                onPulling={this._onPulling}
               // style={{backgroundColor:'transparent'}}
            >
                <View style={{
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Animated.View style={{height:100,justifyContent:'center',alignItems:'center',transform: [{
                            scale:this.state.scale.interpolate({
                                inputRange: [0,1,2],
                                outputRange: [0.1,1,1],
                            })
                        }]}}>
                        <LottieView speed={2} ref={obj =>this.lottieView = obj} style={{width:100,height:100}} hardwareAccelerationAndroid  progress={this.state.scale} source={require('./cycle_animation.json')} />
                    </Animated.View>
                </View>
            </MJRefresh>
        )
    }
}