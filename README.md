# React Native MJRefresh[![npm version](https://badge.fury.io/js/react-native-mjrefresh.svg)](https://badge.fury.io/js/react-native-mjrefresh)

>React-Native-MJRefresh可完成使用React Native对IOS进行自定义下拉刷新设置
>
>onPulling参数为{nativeEvent:percent},结合lottie-react-native可以获得绝佳的下拉刷新效果
>
>自定义详情可见Example:[HuaWeiRefreshControl.js](https://github.com/react-native-studio/react-native-MJRefresh/blob/master/Example/HuaWeiRefreshControl.js)
>
>ListView使用见：[ListViewExample](https://github.com/react-native-studio/react-native-MJRefresh/blob/master/Example49/ListViewExample.js)
>
>FlatList使用见：[FlatListExample](https://github.com/react-native-studio/react-native-MJRefresh/blob/master/Example49/FlatListExample.js)
>
>Android自定义下拉刷新组件见[React-Native-SmartRefreshLayout](https://github.com/react-native-studio/react-native-SmartRefreshLayout)
>

## 安装
### 第一步
工程目录下运行：<br>
 ```bash
 npm install --save react-native-mjrefresh (rn>=0.55.0)

 npm install --save react-native-mjrefresh-lower (rn<=0.54)
```
or(已经安装了yarn)<br>
```bash
 yarn add react-native-mjrefresh (rn>=0.55)

 yarn add react-native-mjrefresh-lower (rn<=0.54)
```

### 第二步

#### 使用link添加：
工程目录下运行:
 ```bash
 react-native link react-native-mjrefresh （rn>=0.55)

 react-native link react-native-mjrefresh-lower（rn<=0.54）
 ```

#### 使用CocoaPods添加:
podfile添加：
```bash
  pod 'RCTMJRefreshHeader', :path => '../node_modules/react-native-mjrefresh'
```

执行：
```bash
  pod install
```

### 第三部使用

在工程中导入：
```js
import MJRefresh,{ScrollView} from 'react-native-mjrefresh'//rn>=0.55
//import MJRefresh,{ScrollView} from 'react-native-mjrefresh-lower'//rn<=0.54

//该ScrollView兼容官方所有的属性和方法，refreshControl也可以使用官方的RefreshControl
  state={
        text:'下拉刷新'
    }
  render() {
    return (
        <ScrollView
            refreshControl={
              <MJRefresh
                  ref={ref=>this._mjrefresh = ref}
                  onRefresh={
                  ()=>{
                      this.setState({
                          text:'正在刷新'
                      })
                      console.log('onRefresh')
                      setTimeout(()=>{
                          this._mjrefresh && this._mjrefresh.finishRefresh();
                      },1000)
                  }
                  }
                  onRefreshIdle={()=>console.log('onRefreshIdle')}
                  onReleaseToRefresh={()=>{
                      this.setState({
                          text:'释放刷新'
                      })
                  }}
                  onPulling={e=>{
                      if(e.nativeEvent.percent<0.1){
                          this.setState({
                              text:'下拉刷新'
                          })
                      }
                  }}
              >
                <View style={{height:100,backgroundColor:'red',
                    justifyContent:'center',
                    alignItems:'center',flexDirection:'row'
                }}>
                  <Text>{this.state.text}</Text>
                </View>
              </MJRefresh>
            }
        >
          <View style={{flex:1,height:1000,backgroundColor:'#ddd'}}>
          </View>
        </ScrollView>
    );
  }
```
## 组件
### MJRefresh
#### 属性表格
|属性名|类型|描述|
|:---:|:---:|:---:|
|onRefresh|func|刷新触发|
|onRefreshIdle|func|刷新空闲状态|
|onReleaseToRefresh|func|可释放刷新时触发|
|onPulling|func|header下拉过程触发|

#### 方法表格
|方法名|参数|描述|
|:---:|:---:|:---:|
|finishRefresh|无|完成刷新|
|beginRefresh|无|开始刷新|

自定义详情可见Example:[HuaWeiRefreshControl.js](https://github.com/react-native-studio/react-native-MJRefresh/blob/master/Example/HuaWeiRefreshControl.js)

## 示例
<img src="https://github.com/react-native-studio/react-native-MJRefresh/blob/master/screen_shot.gif" width = "300"  alt="图片名称" align=center />
<img src="https://github.com/react-native-studio/react-native-MJRefresh/blob/master/1530090339829.gif" width = "300"  alt="图片名称" align=center />
