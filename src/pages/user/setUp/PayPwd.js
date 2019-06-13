/**
 * 启用，找回支付密码
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import Icon from "../../../config/iconFont";
import InputSetPwd from "./PwdInputCustom";
import { InputSurePwd, InputSureOriginal } from "./PwdInputCustom";
import { connect } from "react-redux";
import { UserApi } from "../../../services/api/user";
import Fetch from "../../../utils/fetch";
import fa from "../../../utils/fa";
import { Toast } from "../../../utils/function";
import { CountdownButton } from "../../../utils/view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import VerifyTextInput from "../../../components/login/verifyTextInput";

@connect()

export default class PayPwd extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      flags1: true,
      flags2: false,
      flags3: false
    };
  }

  //确认设置支付密码按钮事件
  _submitButton(array) {
    //传给子组件的函数
    if (array[0] === true) {
      this.setState({
        flags1: false,
        flags2: true,
        flags3: false
      });
    }
    if (array[1] === true) {
      this.setState({
        flags1: false,
        flags2: false,
        flags3: true
      });
    }
    if (array[2] === true) {
      let paramsDic=array[3]
      this._setPayPassword(paramsDic)
    }
  }
  
  //确认设置支付密码接口
  _setPayPassword = async (paramsDic) => {
    const { dispatch } = this.props;
    const params = {
      userMobile:paramsDic.mobile,
      userPayPassword:paramsDic.setPwdText,
    };
    console.log('设置支付密码参数',params);
    const e = await Fetch.fetch({
      api: UserApi.setPayPassword,
      params
    });
    console.log('设置支付密码结果',e);
    if (fa.code.isSuccess(e.code)) {
      Toast.success(e.message);
      AsyncStorage.setItem("isSetPayPwd", "1", error => {
        if (!error) {
          alert("保存数据成功");
        } else {
          alert("保存数据失败");
        }
      });
      this.props.navigation.pop();
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        {/**顶部导航条**/}
        <View style={styles.topContainer}>
          <View
            style={{
              marginTop: 30,
              width: 13,
              height: 13,
              borderRadius: 6.5,
              borderColor: "#D9D9D9",
              borderWidth: 1,
              backgroundColor:
                this.state.flags1 === true ? "#E0324A" : "#D9D9D9"
            }}
          />
          <View
            style={{
              marginTop: 34.5,
              width: 110,
              height: 2,
              backgroundColor: "#D9D9D9"
            }}
          />
          <View
            style={{
              marginTop: 30,
              width: 13,
              height: 13,
              borderRadius: 6.5,
              borderColor: "#D9D9D9",
              borderWidth: 1,
              backgroundColor:
                this.state.flags2 === true ? "#E0324A" : "#D9D9D9"
            }}
          />
          <View
            style={{
              marginTop: 34.5,
              width: 110,
              height: 2,
              backgroundColor: "#D9D9D9"
            }}
          />
          <View
            style={{
              marginTop: 30,
              width: 13,
              height: 13,
              borderRadius: 6.5,
              borderColor: "#D9D9D9",
              borderWidth: 1,
              backgroundColor:
                this.state.flags3 === true ? "#E0324A" : "#D9D9D9"
            }}
          />
        </View>
        <View style={styles.topContainer1}>
          <Text
            style={{
              color: this.state.flags1 === true ? "#E0324A" : "#333333",
              fontSize: 13,
              marginTop: 10
            }}
          >
            验证身份
          </Text>
          <Text
            style={{
              color: this.state.flags2 === true ? "#E0324A" : "#333333",
              fontSize: 13,
              marginTop: 10
            }}
          >
            设置密码
          </Text>
          <Text
            style={{
              color: this.state.flags3 === true ? "#E0324A" : "#333333",
              fontSize: 13,
              marginTop: 10
            }}
          >
            确认密码
          </Text>
        </View>
        {/**底部操作视图**/}
        <BottomView
          // getVerifyCode={() => this._getVerifyCode()}
          callback={this._submitButton.bind(this)}
        />
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"支付密码"}
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

class BottomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstSuccess: false,
      isSecondSuccess: false,
      isThirdSuccess: false,
      setPwdText: "",
    };
  }

  _updatePassword(captcha) {
    let { mobile, pw1, pw2 } = this.state;
    if (!fa.isPhone(mobile)){
      alert("请输入正确的手机号");
    }
    if (!captcha) {
      alert("请输入验证码");
    }


    /**
     * 验证码之后跳转下一步
     */
    this.setState({
      isFirstSuccess: true
    });
    setTimeout(() => {
      //使用setTimeout使改变的值立即生效
      // this.setState({ a: 444 }),
      let array = [this.state.isFirstSuccess, false, false,,{}];
      this.props.callback(array);
    });
  }

  
  _setPwd(value) {
    /**
     * 设置密码之后跳转下一步
     */
    this.setState({
      isSecondSuccess: true
    });
    setTimeout(() => {
      //使用setTimeout使改变的值立即生效
      // this.setState({ a: 444 }),
      let array = [false, this.state.isSecondSuccess, false,,{}];
      this.props.callback(array);
    });
  }
  _surePwd() {
    /**
     * 确认密码之后跳转下一步
     */
    this.setState({
      isThirdSuccess: true
    });
    setTimeout(() => {
      //使用setTimeout使改变的值立即生效
      // this.setState({ a: 444 }),
      let array = [
        false,
        false,
        this.state.isThirdSuccess,
        {
          mobile:this.state.mobile,
          setPwdText:this.state.setPwdText,
        }
        ];
      this.props.callback(array);
    });
  }
  render() {
    let {
      style,
      mobile,
      captcha,
    } = this.props;
    return (
      <View style={{ marginTop: 20 }}>
        {this.state.isSecondSuccess === true ? (
          <View>
            <Text
              style={{
                color: "#333333",
                fontSize: 15,
                marginTop: 10,
                textAlign: "center"
              }}
            >
              确认6位支付密码
            </Text>
            <InputSurePwd
              style={{ marginTop: 20 }}
              onChange={text => {
                if (text.length === 6) {
                  // this.onEnd(text);
                  if (this.state.setPwdText === text) {
                  } else {
                    Toast.warn("两次支付密码输入不一致");
                  }
                }
              }}
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: windowWidth - 30,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 20,
                backgroundColor: "#FD3D42",
                borderRadius: 5
              }}
              onPress={() => {
                // this.props.navigation.pop()
                this._surePwd();
              }}
            >
              <Text style={{ color: "white", fontSize: 17 }}>确定</Text>
            </TouchableOpacity>
          </View>
        ) : this.state.isFirstSuccess === true ? (
          <View>
            <Text
              style={{
                color: "#333333",
                fontSize: 15,
                marginTop: 10,
                textAlign: "center"
              }}
            >
              输入6位支付密码
            </Text>
            <InputSetPwd
              style={{ marginTop: 20 }}
              onChange={text => {
                if (text.length === 6) {
                  // this.onEnd(text);
                  this.setState({ setPwdText: text });
                  this._setPwd(text);
                }
              }}
            />
          </View>
        ) : (
          <View>
            <View style={styles.itemContainer1}>
              <View style={styles.leftIcon}>
                <Icon name={"-shoujihao"} size={21} color={"#aeb3b9"} />
              </View>
              <TextInput
                style={styles.textInput}
                keyboardType={"numeric"}
                maxLength={11}
                placeholderTextColor={"#7F7F7F"}
                underlineColorAndroid={"transparent"}
                placeholder={"请输入手机号"}
                editable={true}
                onChangeText={mobile => {
                  this.setState({ mobile });
                }}
                color={"#333333"}
                value={mobile}
              />
            </View>
              <View style={styles.itemContainer2}>
                <View style={styles.leftIcon}>
                  <Icon name={"-yanzhengma"} size={21} color={"#aeb3b9"} />
                </View>
                <TextInput style={styles.textInput}
                           maxLength={4}
                           placeholderTextColor={'#7F7F7F'}
                           keyboardType={'numeric'}
                           underlineColorAndroid={'transparent'}
                           placeholder={'输入验证码'}
                           onChangeText={(captcha) => {
                             if (captcha.length===4){
                               // alert(captcha)
                               this.setState({captcha:captcha})
                               this._updatePassword(captcha)
                             }
                           }}
                           color={'#333333'}
                           value={captcha}/>
                <View style={styles.sendCodeView}>
                  <CountdownButton
                    style={{width:70,height:13}}
                    textStyle={{color:'#E0324A',fontSize:12}}
                    api={UserApi.editPayPasswordVerifyCode}
                    getParams={() => {
                      return {
                        userMobile: this.state.mobile,
                      };
                    }}
                    getData={e => {
                      if (fa.code.isSuccess(e.code)) {
                        Toast.success("验证码已发送");
                      } else {
                        Toast.warn(fa.code.parse(e.code, e.message));
                      }
                    }}
                  />
                </View>
              </View>
            </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  itemContainer1: {
    height: 45,
    width: windowWidth - 30,
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15
  },
  itemContainer2: {
    height: 45,
    width: windowWidth - 30,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  leftIcon: {
    marginLeft: 16,
    marginTop: 13,
    width: 20,
    height: 21
  },
  textInput: {
    marginLeft: 20,
    marginTop: 3,
    fontSize: 14,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 15,
    height: 42,
    color: "#A3A3A3",
    flex: 1
  },
  bottomButton: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    width: windowWidth - 15 * 2,
    marginRight: 15,
    height: 50
  },
  topContainer: {
    // alignItems:'center',
    justifyContent: "center",
    flexDirection: "row"
  },
  sendCodeView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#D9D9D9',
    borderRadius:5,
    width:80,
    height:30,
    marginTop:7,
    marginRight: 15,
  },
  topContainer1: {
    justifyContent: "space-between",
    flexDirection: "row",
    // marginLeft:35,
    // marginRight:35,
    // width:windowWidth-35*2,
    marginLeft: (windowWidth - (110 * 2 + 13 * 3)) / 2 - (26 - 6.5),
    marginRight: (windowWidth - (110 * 2 + 13 * 3)) / 2 - (26 - 6.5),
    width:
      windowWidth - ((windowWidth - (110 * 2 + 13 * 3)) / 2 - (26 - 6.5)) * 2
  }
});
