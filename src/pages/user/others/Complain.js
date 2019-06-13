import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,TextInput,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Fetch from "../../../utils/fetch";
import { Others } from "../../../services/api/others";
import { Toast } from "../../../utils/function";
import Verify from "../../../utils/verify";
import fa from "../../../utils/fa";

export default class Complain extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
        height: 30,
        fontNum:0,
      complainContent:'',
      complainPhone:'',
    };
    this.inputComplain = this.inputComplain.bind(this)
  }

  cauculateHeight(e) {
      const height = e.nativeEvent.contentSize.height > 30 ? e.nativeEvent.contentSize.height : this.state.height;
      this.setState({height});
  }

  inputComplain(text){
      let fontNum = text.length
      this.setState({
        complainContent:text,
          fontNum
      })
  }

  commitComplain(){
    const {complainContent,complainPhone} = this.state
    if(complainContent.length<1){
      return Toast.info("投诉内容不能为空")
    }

    if(!Verify.verifyPhone(complainPhone)){
      return Toast.info("请输入正确的手机号")
    }

    Fetch.fetch({
      api: Others.commitComplain,
      params:{
        complainContent:complainContent,
        complainPhone:complainPhone,
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        Toast.info(e.message);
        this.props.navigation.pop()
      } else {
        Toast.warn(fa.code.parse(e.code, e.message));
      }
    });
  }

  render() {
    const barItems = this.barItems;
    const { fontNum } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <KeyboardAwareScrollView>
        <View style={styles.topView}>
            <View style={styles.centerView}>
                <TextInput
                    ref={textInput => {
                      this.textInput = textInput
                    }}
                    placeholder="请输入您宝贵的意见!"
                    keyboardType="default"
                    onChangeText={text => {this.inputComplain(text)}}
                    placeholderTextColor="#D9D9D9"
                    underlineColorAndroid="transparent"
                    multiline = {true}
                    ref = {textInput => this.TextInput = textInput}
                    style={{ flex: 1, backgroundColor: "#f2f2f2",borderRadius:5,margin:10 }}
                  />
                  <Text style={{color:'#D9D9D9',fontSize:10,position:'absolute',bottom:10,right:10}}>
                        {fontNum}/500字
                  </Text>
            </View>
            <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9',marginTop:20}}/>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'#333333',fontSize:13,marginLeft:15}}>
                    联系方式：
                </Text>
                <TextInput
                    ref={textInput => {
                      this.textInput = textInput
                    }}
                    placeholder="请填写可以联系到您的手机号!"
                    keyboardType="phone-pad"
                    onChangeText={text => {
                      this.setState({
                        complainPhone:text,
                      })
                    }}
                    placeholderTextColor="#D9D9D9"
                    underlineColorAndroid="transparent"
                    secureTextEntry={false}
                    style={{ flex: 1, backgroundColor: "#fff",}}
                  />
            </View>
        </View>

        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.commitComplain()
            }}
          >
            <LinearGradient
              style={styles.sureButton}
              colors={["#FE7E69", "#FD3D42"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#fff", fontSize: 17}}>提交</Text>
            </LinearGradient>
        </TouchableOpacity>
        
        </KeyboardAwareScrollView>
        
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"投诉建议"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  topView:{
    height:234,width:windowWidth,backgroundColor:'#fff',alignItems:'center'
  },
  centerView:{
    height:150,width:windowWidth-30,marginHorizontal:15,marginTop:20,
    backgroundColor:'#f2f2f2',borderRadius:5
  },
  buttomView: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15
  },
  sureButton: {
    height: 49,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
    marginTop: 30
  },
  linearGradientStyle: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
