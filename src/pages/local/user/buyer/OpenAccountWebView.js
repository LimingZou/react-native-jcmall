/**
 * Created by k186 on 2019-04-28.
 */
import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, WebView, Image } from "react-native";
import { windowHeight, windowWidth } from "../../../../utils/style";
import NavigationBar from "../../../../components/@jcmall/navbar";
export default class OpenAccountWebView extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {   
    super(props);
    let  htmlContent=this.props.navigation.state.params.obj
    this.state = {
      isCustomUI:false,
      title:'',
      htmlContent:htmlContent,
    }; 
  }
  renderCustomUI(){
    return(
      <View style={{flex:1,backgroundColor:'white',alignItems: 'center'}}>
        <Image style={{width:165,height:125,marginTop:60+NavigationBar.Theme.contentHeight}}
               source={require("../../../../images/local/shenhezhong.png")}
        />
        <Text style={{marginTop: 25,textAlign:'center',fontSize:18,color:'#333333'}}>资料审核中</Text>
        <Text style={{marginTop: 40,textAlign:'center',fontSize:14,color:'#999999',width:240,marginLeft: (windowWidth-240)/2,marginRight:(windowWidth-240)/2 }} numberOfLines={2}>平台将于1~2个工作日内完成资料审核，
          请耐心等待！</Text>
      </View>
    )
  }
   
  render() {   
    return (
      <View style={{flex:1,paddingTop: NavigationBar.Theme.contentHeight}}>
        {
          this.state.isCustomUI===true?this.renderCustomUI():
              <WebView
                ref={'webview'}
                source={{html:this.state.htmlContent}}
                style={{width: windowWidth}}
                onMessage={(e) => {
                  // this.handleMessage(e)
                }}
                onNavigationStateChange={(obj)=>{
                  console.log('obj==',obj)
                  // let isCustom=false
                  if(obj.url==='https://eacloud.testpnr.com/api/forward/checkAddAcctSmsCode'){
                    // isCustom=true
                  }
                  // this.setState({
                  //   isCustomUI:isCustom,
                  //   title:obj.title,
                  // })
                }}


              />
        }
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={this.state.title}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop(2)
                if (this.props.navigation.state.params.callback) {
                  this.props.navigation.state.params.callback()
                }
              }}
            />
          }
        />
      </View>


    )}
}