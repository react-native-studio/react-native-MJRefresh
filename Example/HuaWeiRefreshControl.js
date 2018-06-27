import React, {Component} from 'react';
import {StyleSheet, View, Text,Animated,Easing,Dimensions,Image,TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import MJRefresh from 'react-native-mjrefresh';
import {SkypeIndicator} from 'react-native-indicators'
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const {width} = Dimensions.get('window');
export default class HuaWeiRefreshControl extends Component {
    state = {
        text: '下拉刷新',
        rotate: new Animated.Value(0),
        refreshing: false
    }
    _onReleaseToRefresh = () => {
        this.setState({
            text: '释放刷新'
        })
        Animated.timing(this.state.rotate, {
            toValue: 1,
            duration: 197,
            useNativeDriver: true,
            easing: Easing.linear()
        }).start()
    }
    _onRefresh = () => {
        let {onRefresh} = this.props;
        this.setState({
            refreshing:true,
            text:'正在刷新'
        })
        onRefresh && onRefresh();
    }
    _onPulling=(e)=>{
        console.log(e.nativeEvent)
       if(e.nativeEvent.percent == 0){
           this.setState({
               text: '下拉刷新',
               refreshing: false
           })
           Animated.timing(this.state.rotate, {
               toValue: 0,
               duration: 197,
               useNativeDriver: true,
               easing: Easing.linear()
           }).start()
       }
    }
    _onRefeshIdle=()=>{

    }
    finishRefresh=()=>{
        this._mjrefresh && this._mjrefresh.finishRefresh();
    }
    beginRefresh=()=>{
        this._mjrefresh && this._mjrefresh.beginRefresh();
    }
    render() {
        return (
            <MJRefresh
                onRefreshIdle={this._onRefeshIdle}
                ref={ref=>this._mjrefresh = ref}
                onReleaseToRefresh={this._onReleaseToRefresh}
                onRefresh={this._onRefresh}
                onPulling={this._onPulling}
            >
                <View style={{
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                        <Image style={{
                            position:'absolute',
                            width,
                            left:0,right:0,bottom:0,height:width*1436/1024,
                        }}
                               source={require('./93K58PICGPs_1024.jpg')}
                        />
                    {this.state.refreshing ? <SkypeIndicator style={{flex: 0}} size={24} color={'#2783cf'}/> :
                        <AnimatedIcon style={{
                            transform: [{
                                rotate: this.state.rotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['180deg', '0deg']
                                })
                            }]
                        }} name="md-arrow-up" color="#2783cf" size={24}/>}
                    <Text style={{marginLeft: 15}}>{this.state.text}</Text>
                </View>
            </MJRefresh>
        )
    }
}