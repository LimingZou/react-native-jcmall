import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import MySuBean from "../../../components/my/jusubean/mySubean";
import ListItem from "../../../components/my/jusubean/listItem";
import ParsedText from "react-native-parsed-text";

import Button from "../../../components/category/Button";
import ListRow from "../../../components/@jcmall/listRow";
import Badge from "@react-native-component/react-native-smart-badge";
const dataSource = require("../../../pages/discovery/recommended/data.json");

import DetailItme from "../../../components/my/jusubean/detailItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import { Toast } from "../../../utils/function";
import { requestAmount } from "../../../redux/actions/my";
let key = null;
import Overlay from "../../../components/@jcmall/overlay";
@connect(({
  view: {
    my: {
      Amount,
      AmountFetchStatus,
    }
  }
}) => ({
  Amount,
  fetchStatus: AmountFetchStatus,
}))

export default class RollOut extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      canUseDou: "",
      useDou: "",
      modalVisible: false,
      payPassword: "",
      transferUserName:""

    };
  }

  componentDidMount(){
    this.props.dispatch(requestAmount());
  }

  sureRollOut(){
    const {payPassword,useDou,transferUserName} = this.state
    if(useDou<1){
      return  Toast.info("请输入转豆的个数")
    }
    if(transferUserName.length<1){
      return  Toast.info("请输入接受者账号")
    }
    this._showOverlay();
  }

  rollDouToOther(){
    const {payPassword,useDou,transferUserName} = this.state
    if(payPassword.length<1){
      return  Toast.info("请输入支付密码")
    }
    
    Fetch.fetch({
      api: MyApi.rollOutDou,
      params: {
        qty:useDou,
        transferUserName:transferUserName,
        payPassword:payPassword
      }
    }).then((response)=>{
      Toast.info(response.message)
      if(response.code == "0000"){
        this.props.dispatch(requestAmount());
        Overlay.hide(key)
      }
    })
  }

  _showOverlay() {
    key = Overlay.show(
      <Overlay.PullView
        modal={false}
        containerStyle={{ backgroundColor: null }}>
         <KeyboardAwareScrollView>
            <TouchableOpacity
              style={{
                width: windowWidth,
                height: windowHeight,
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
              activeOpacity={1}
              onPress={() => Overlay.hide(key)}
            >
              <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                <TextInput
                  keyboardType="default"
                  placeholder="请输入安全密码"
                  placeholderTextColor="#7F7F7F"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  onChangeText={text=>{
                    this.setState({
                      payPassword: text
                    })
                  }}
                  style={{
                    height: 26,
                    width: windowWidth - 90,
                    backgroundColor: "#fff",
                    marginTop: 57,padding:0
                  }}
                />
                <View
                  style={{
                    height: 1,
                    width: windowWidth - 60,
                    marginLeft: 15,
                    backgroundColor: "#D9D9D9"
                  }}
                />
                <Button
                  colors={["#FE7E69", "#FD3D42"]}
                  title="确定"
                  linearGradientStyle={styles.surePayButton}
                  titleStyle={styles.sureButtonFont}
                  onPress={() => {
                    this.rollDouToOther()
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
      </Overlay.PullView>
    )
  }

  render() {
    let canUseDou = 0
    const {Amount} = this.props
    if(Amount&&Amount.userDouAmount){
      canUseDou = Amount.userDouAmount
    }
    return (
      <View
        style={[styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        <View style={styles.canusejidou}>
          <View style={{ flex: 1 }}>
            <Image style={styles.douSize} source={require("../../../images/mine/jsd.png")}/>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.douFont}>{canUseDou}</Text>
            <Text style={styles.canUse}>可用集速豆(粒）</Text>
          </View>
        </View>
        <View style={{height: 116,width: windowWidth,marginTop: 10,backgroundColor: "#fff"}}>
          <Text style={styles.inputFont}>
            输入集速豆
          </Text>
          <View style={styles.topView}>
            <TextInput
              keyboardType="numeric"
              placeholder="只能输入整数"
              placeholderTextColor="#D9D9D9"
              underlineColorAndroid="transparent"
              secureTextEntry={false}
              onChangeText={(text)=>{
                this.setState({
                  useDou:text
                })
              }}
              value={this.state.useDou}
              style={{
                height: 30,
                width: windowWidth - 80,
                backgroundColor: "#fff",
                padding:0
              }}
            />
            <TouchableOpacity style={styles.allView}
              onPress={() => {
                this.setState({
                  useDou: canUseDou + ""
                });
              }}>
              <Text style={{ color: "#333333", fontSize: 13 }}>全部</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hintView}/>
          <Text style={styles.hintFontSize}>
            转出接收集速豆不可撤回，请谨慎考虑
          </Text>
        </View>

        <View style={styles.cardView}>
            <Text style={{ color: "#333333", fontSize: 15, margin: 15 }}>
              卡号
            </Text>
            <TextInput
              keyboardType="numeric"
              placeholder="请输入接收集速豆者卡号"
              placeholderTextColor="#D9D9D9"
              underlineColorAndroid="transparent"
              secureTextEntry={false}
              onChangeText={text=>{
                this.setState({
                  transferUserName:text
                })
              }}
              style={{height: 30,width: 162,backgroundColor: "#fff",marginRight: 15,padding:0}}
            />
        </View>

        <Button
            colors={["#FE7E69", "#FD3D42"]}
            title="确定"
            linearGradientStyle={[styles.sureButton]}
            titleStyle={styles.sureButtonFont}
            onPress={() => {this.sureRollOut()}}
          />

        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"转出集速豆"}
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
    backgroundColor: "#f2f2f2"
  },
  canusejidou: {
    height: 85,
    width: windowWidth,
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  douSize: {
    height: 36,
    width: 35,
    margin: 25
  },
  topView: {
    flexDirection: "row",
    height: 30,
    width: windowWidth - 30,
    marginTop: 15,
    marginLeft: 15
  },
  rightView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  douFont: {
    color: "#E0324A",
    fontSize: 25,
    marginRight: 24
  },
  canUse: {
    color: "#333333",
    fontSize: 12,
    marginRight: 20,
    marginTop: 10
  },
  numberInput: {
    
  },
  sureButton: {
    height: 49,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    marginLeft: 15
  },
  sureButtonFont: {
    color: "#fff",
    fontSize: 17
  },
  surePayButton: {
    height: 44,
    width: windowWidth - 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 15
  },
  modalView: {
    height: 175,
    width: windowWidth - 30,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 6,
    marginTop:183+NavigationBar.Theme.contentHeight
  },
  cardView:{
    height: 44,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10
  },
  hintView:{
    height: 1,
    width: windowWidth - 30,
    marginLeft: 15,
    backgroundColor: "#D9D9D9"
  },
  hintFontSize:{
    color: "#7F7F7F",
    fontSize: 10,
    marginLeft: 18,
    marginTop: 10
  },
  allView:{
    height: 30,
    width: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  inputFont:{
    color: "#333333",
    fontSize: 15,
    marginLeft: 15,
    marginTop: 15
  }
  


  
});
