import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  UIManager
} from "react-native";
import { Toast } from "../../utils/function";
import {
  PublicStyles,
  windowWidth,
  windowHeight
} from "../../utils/style";
import { connect } from "react-redux";
import { userLogin } from "../../redux/actions/user";
import { UserApi } from "../../services/api/user";
import Fetch from "../../utils/fetch";
import {
  sendWechatAuthRequest,
  wechatLogin
} from "../../redux/actions/app/wechat";
import { Button } from "../../components/theme";
import fa from "../../utils/fa";
import NavigationBar from "../../components/@jcmall/navbar";
import NationalCodeListDialog from "./nationalCodes";
import LinearGradient from "react-native-linear-gradient";
import Icon from "../../config/iconFont";
import VerifyTextInput from "../../components/login/verifyTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

@connect(({ app: { wechat: { isWXAppInstalled } } }) => ({
  isWXAppInstalled
}))

export default class UserLogin extends Component {

  static defaultProps = {
    isRegister: false
  };

  static navigationOptions = ({navigation}) => {
    return {
      header: null,
      gesturesEnabled: false,
    };
  };

  Mode = {
    register: {
      type: "register",
      title: "注册",
      styles: {
        logoPaddingTop: 30,
        logo: {
          width: 125,
          height: 39
        },
        contentPaddingTop: 100
      },
      buttonTitle: "注册",
      hideBottom: true,
      inpoutViews: []
    },
    login: {
      type: "login",
      title: "密码登录",
      styles: {
        logoPaddingTop: 81,
        logo: {
          width: 185,
          height: 59
        },
        contentPaddingTop: 193
      },
      buttonTitle: "登录",
      hideBottom: false,
      inpoutViews: []
    },
    codeLogin: {
      type: "codeLogin",
      title: "短信登录",
      styles: {
        logoPaddingTop: 81,
        logo: {
          width: 185,
          height: 59
        },
        contentPaddingTop: 193
      },
      logoPaddingTop: 81,
      buttonTitle: "登录",
      hideBottom: false,
      inpoutViews: []
    },
    reset: {
      type: "reset",
      title: "重置密码",
      styles: {
        logoPaddingTop: 81,
        logo: {
          width: 185,
          height: 59
        },
        contentPaddingTop: 193
      },
      logoPaddingTop: 81,
      buttonTitle: "完成",
      hideBottom: true,
      inpoutViews: []
    }
  };

  state = {
    // phoneNumber: '13502176003',
    // password: '123456',
    mode: this.Mode.login,

    phoneNumber: null,
    password: null,
    realName: null,
    passwordAgain: null,
    verifyCode: null,
    inviteCode: null,

    nationalName: "中国",
    nationalCode: "86",
    nationalId: 1
  };
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillUpdate(){
    LayoutAnimation.easeInEaseOut();
  }
  // 注册
  _registerSubmit = async () => {
    const { dispatch } = this.props;
    const {
      phoneNumber,
      verifyCode,
      password,
      passwordAgain,
      inviteCode,
      nationalCode,
      realName
    } = this.state;
    if (!phoneNumber) {
      return Toast.warn("请输入手机号");
    }
    if (!fa.isPhone(phoneNumber)){
      return Toast.warn("请输入正确的手机号");
    }
    if (!verifyCode) {
      return Toast.warn("请输入验证码");
    }
    if (!password) {
      return Toast.warn("请输入密码");
    }
    if (!passwordAgain) {
      return Toast.warn("请再次输入密码");
    }
    if (!_.isEqual(password, passwordAgain)) {
      return Toast.warn("两次密码输入不一样");
    }
    if (!fa.isPassword(password)){
      return Toast.warn("请输入数字、字母两者组合6-20位密码");
    }
    const params = {
      userMobile:phoneNumber,
      identityCode:verifyCode,
      password,
      repeatPassword:passwordAgain,
      inviteCode: inviteCode,
      globalCode: nationalCode,
      realName:realName
    };
    console.log('注册参数',params);
    const e = await Fetch.fetch({
      api: UserApi.register,
      params
    });
    console.log('注册结果',e);
    if (fa.code.isSuccess(e.code)) {
      Toast.success(e.message);
      this._changeMode(this.Mode.login)
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //登陆(手机号+密码)
  _loginSubmit = async () => {
    const { phoneNumber, password } = this.state;

    if (!phoneNumber) {
      return Toast.warn("请输入手机号");
    }
    if (!fa.isPhone(phoneNumber)){
      return Toast.warn("请输入正确的手机号");
    }
    if (!password) {
      return Toast.warn("请输入密码");
    }
    const params = {
      userName:phoneNumber,
      password,
    };
    console.log('密码登陆参数',params);
    const e = await Fetch.fetch({
      api: UserApi.login,
      params
    });
    console.log('密码登陆结果',e);
    if (fa.code.isSuccess(e.code)) {

      const { dispatch } = this.props;
      await dispatch(
        userLogin({
          user_token: e.obj
        })
      );
      Toast.success(e.message);
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  //登陆(手机号+验证码)
  _loginVerifyCodeSubmit = async () => {
    const { phoneNumber, verifyCode } = this.state;

    if (!phoneNumber) {
      return Toast.warn("请输入手机号");
    }
    if (!fa.isPhone(phoneNumber)){
      return Toast.warn("请输入正确的手机号");
    }
    if (!verifyCode) {
      return Toast.warn("请输入验证码");
    }
    const params = {
      userMobile:phoneNumber,
      identityCode:verifyCode
    };
    console.log('验证码登陆参数',params);
    const e = await Fetch.fetch({
      api: UserApi.loginBySms,
      params
    });
    console.log('验证码登陆结果',e);
    if (fa.code.isSuccess(e.code)) {
      const { dispatch } = this.props;
      await dispatch(
        userLogin({
          user_token: e.obj
        })
      );
      Toast.success(e.message);
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //重置密码
  _resetSubmit = async () => {
    const { dispatch } = this.props;
    const { phoneNumber, verifyCode, password } = this.state;
    if (!phoneNumber) {
      return Toast.warn("请输入手机号");
    }
    if (!fa.isPhone(phoneNumber)){
      return Toast.warn("请输入正确的手机号");
    }
    if (!verifyCode) {
      return Toast.warn("请输入验证码");
    }
    if (!password) {
      return Toast.warn("请输入密码");
    }
    if (!fa.isPassword(password)){
      return Toast.warn("请输入数字、字母两者组合6-20位密码");
    }
    const params = {
      userMobile:phoneNumber,
      password,
      identityCode: verifyCode
    };
    console.log('重置密码参数',params);
    const e = await Fetch.fetch({
      api: UserApi.resetPassword,
      params
    });
    console.log('重置密码结果',e);
    if (fa.code.isSuccess(e.code)) {
      Toast.success(e.message);
      this._changeMode(this.Mode.login)
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };


  _changeMode(mode) {
    this.setState({
      mode: mode,

      phoneNumber: "",
      password: "",
      realName: "",
      passwordAgain: "",
      verifyCode: "",
      inviteCode: ""

      // nationalName:'中国',
      // nationalCode:86,
      // nationalId:1,
    });
  }

  _renderRegister() {
    return (
      <View>
        <VerifyTextInput
          type={"code"}
          placeholder={"输入验证码"}
          verifyCode={{
            api: UserApi.registerVerifyCode,
            verify: this.state.phoneNumber,
            params: {
              userMobile: this.state.phoneNumber
            }
          }}
          onChangeText={e => {
            this.setState({ verifyCode: e });
          }}
          value={this.state.verifyCode}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
        <VerifyTextInput
          type={"text"}
          icon={<Icon name={"-xingming"} size={20} color={"#aeb3b9"} />}
          placeholder={"输入真实姓名"}
          onChangeText={e => {
            this.setState({ realName: e });
          }}
          value={this.state.realName}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
        <VerifyTextInput
          type={"password"}
          icon={<Icon name={"-lock"} size={20} color={"#aeb3b9"} />}
          placeholder={"请输入您的登陆密码"}
          onChangeText={e => {
            this.setState({ password: e });
          }}
          value={this.state.password}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
        <VerifyTextInput
          type={"password"}
          icon={<Icon name={"-lock"} size={20} color={"#aeb3b9"} />}
          placeholder={"请再次确认一遍密码"}
          onChangeText={e => {
            this.setState({ passwordAgain: e });
          }}
          value={this.state.passwordAgain}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
        <VerifyTextInput
          type={"text"}
          icon={<Icon name={"yaoqingma"} size={20} color={"#aeb3b9"} />}
          placeholder={"输入您的邀请码(可选)"}
          onChangeText={e => {
            this.setState({ inviteCode: e });
          }}
          value={this.state.inviteCode}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
      </View>
    );
  }

  _renderLogin() {
    return (
      <View>
        <VerifyTextInput
          type={"password"}
          icon={<Icon name={"-lock"} size={20} color={"#aeb3b9"} />}
          placeholder={"密码"}
          onChangeText={e => {
            this.setState({ password: e });
          }}
          value={this.state.password}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
      </View>
    );
  }

  _renderCodeLogin() {
    return (
      <View>
        <VerifyTextInput
          type={"code"}
          placeholder={"输入验证码"}
          verifyCode={{
            api: UserApi.loginVerifyCode,
            verify: this.state.phoneNumber,
            params: {
              userMobile: this.state.phoneNumber
            }
          }}
          onChangeText={e => {
            this.setState({ verifyCode: e });
          }}
          value={this.state.verifyCode}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
      </View>
    );
  }

  _renderResetPassword() {
    return (
      <View>
        <VerifyTextInput
          type={"code"}
          placeholder={"输入验证码"}
          verifyCode={{
            api: UserApi.resetPasswordVerifyCode,
            verify: this.state.phoneNumber,
            params: {
              userMobile: this.state.phoneNumber
            }
          }}
          onChangeText={e => {
            this.setState({ verifyCode: e });
          }}
          value={this.state.verifyCode}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
        <VerifyTextInput
          type={"password"}
          icon={<Icon name={"-lock"} size={20} color={"#aeb3b9"} />}
          placeholder={"请重新设置6-20位密码"}
          onChangeText={e => {
            this.setState({ password: e });
          }}
          value={this.state.password}
          underlineColorAndroid={"transparent"}
          placeholderTextColor={"#CCCCCC"}
        />
      </View>
    );
  }

  render() {
    const { navigation, isWXAppInstalled, dispatch } = this.props;
    const { mode, nationalCode, nationalName } = this.state;
    return (
      <View
        style={[
          PublicStyles.ViewOut
        ]}
      >
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            width: windowWidth,
            height: windowHeight
          }}
        >
          <LinearGradient
            style={[
              styles.logoView,
              { paddingTop: mode.styles.logoPaddingTop }
            ]}
            colors={["#fcc55b", "#fe6c00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.5]}
          >
            <Image
              source={require("../../images/login/logo.png")}
              style={[styles.logo, { ...mode.styles.logo }]}
            />
          </LinearGradient>
        </View>
        <KeyboardAwareScrollView
          bounces={false}
          keyboardDismissMode={"on-drag"}
          style={{ paddingTop: mode.styles.contentPaddingTop}}
        >
          <View
            style={{
              opacity: 1,
              marginHorizontal: 25,
              padding: 25,
              paddingBottom: 0,
              backgroundColor: "#fff",
              borderRadius: 5,
              shadowColor: "rgba(253, 69, 71, 0.2)",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 1,
              shadowRadius: 19,
              cornerRadius: 5
            }}
          >
            <View
              style={{
                fontFamily: "PingFangSC-Regular",
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 20
              }}
            >
              <Text style={{ flex: 1, fontSize: 24 }}>{mode.title}</Text>
            </View>
            <VerifyTextInput
              type={"phoneNumber"}
              icon={
                <TouchableOpacity
                  style={{
                    flexDirection:'row',
                    alignItems:'flex-end'
                  }}
                  activeOpacity={1}
                  // onPress={() => this.nationalCodeListDialog.show()}
                >
                  <Text style={{ fontSize: 14, marginLeft: 5, marginRight: 5, color: "#333" }}>
                    {`+${nationalCode}`}
                  </Text>
                  {/*<Icon name={"-arrow-down"} size={14} color={"#333"} />*/}
                </TouchableOpacity>
              }
              placeholder={"请输入手机号"}
              onChangeText={e => {
                this.setState({ phoneNumber: e });
              }}
              value={this.state.phoneNumber}
              underlineColorAndroid={"transparent"}
              placeholderTextColor={"#CCCCCC"}
            />
            {mode.type === "login"
              ? this._renderLogin()
              : mode.type === "codeLogin"
                ? this._renderCodeLogin()
                : mode.type === "reset"
                  ? this._renderResetPassword()
                  : mode.type === "register"
                    ? this._renderRegister()
                    : null}
            {mode.type !== "reset" && mode.type !== "register" ? (
              <View style={[styles.View5, { justifyContent: "center" }]}>
                <Text
                  style={styles.text4}
                  onPress={() => {
                    this._changeMode(
                      mode.type === "login"
                        ? this.Mode.codeLogin
                        : this.Mode.login
                    );
                  }}
                >
                  {mode.type === "login" ? "短信登录" : "密码登录"}
                </Text>
                <Text
                  style={[styles.text5, { position: "absolute", right: 0 }]}
                  onPress={() => {
                    this._changeMode(this.Mode.reset);
                  }}
                >
                  忘记密码?
                </Text>
              </View>
            ) : null}
            <Button
              style={{
                width: 240,
                height: 40,
                borderRadius: 20,
                marginBottom:Platform.OS === 'ios'?-20:10,
                alignSelf: "center"
              }}
              colors={["#fe7e69", "#fd3d42"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              onClick={() => {
                if (mode.type === "register") {
                  this._registerSubmit()
                } else if (mode.type === "login") {
                  this._loginSubmit()
                } else if (mode.type === "codeLogin") {
                  this._loginVerifyCodeSubmit()
                } else if (mode.type === "reset") {
                  this._resetSubmit()
                }
              }}
            >
              {mode.buttonTitle}
            </Button>
          </View>
          <Text
            style={[styles.text6, { alignSelf: "center", marginTop: 35 }]}
            onPress={() => {
              this._changeMode(
                mode.type === "reset" || mode.type === "register"
                  ? this.Mode.login
                  : this.Mode.register
              );
            }}
          >
            {mode.type === "reset" || mode.type === "register"
              ? "返回登录"
              : "注册"}
          </Text>
          <View
            style={{
              width: windowWidth,
              position: "absolute",
              bottom: 0
            }}
          >
            {isWXAppInstalled && (
              <View style={{ marginBottom: 23 }}>
                <View style={styles.view3}>
                  <View
                    style={{ flex: 1, height: 0.5, backgroundColor: "#aeb3b9" }}
                  />
                  <Text
                    style={[
                      styles.text3,
                      { textAlign: "center", paddingHorizontal: 20 }
                    ]}
                  >
                    第三方登录
                  </Text>
                  <View
                    style={{ flex: 1, height: 0.5, backgroundColor: "#aeb3b9" }}
                  />
                </View>
                <View style={styles.View4}>
                  <TouchableOpacity
                    style={styles.weiViewcss}
                    activeOpacity={1}
                    onPress={async () => {
                      try {
                        const {
                          tokenData,
                          userData
                        } = await sendWechatAuthRequest();
                        dispatch(
                          wechatLogin({
                            tokenData,
                            userData
                          })
                        );
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    <Icon name={"_weixin"} size={30} color={"#3eb135"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        {mode.type === "register" ? (
          <SafeAreaView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <Text style={{ color: "#999" }}>点击注册即表示接受集呈的</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PublicWebView", {
                  title: "用户协议",
                  url: "https://www.fashop.cn/agreement.html"
                });
              }}
            >
              <Text style={{ color: "#2850f0" }}>《用户协议》</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : null}
        <NavigationBar
          leftView={
            <NavigationBar.BackButton tintColor={'white'} onPress={() => navigation.pop()} />
          }
          title={""}
          rightView={
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                paddingTop: 2,
                paddingLeft: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {

              }}
            >
              <Icon name={"-kefu"} size={23} color={"#fff"} />
            </TouchableOpacity>
          }
          style={{ backgroundColor: "rgba(1, 1, 1, 0)", borderBottomWidth: 0 }}
          titleStyle={{ color: "black" }}
          statusBarStyle={"light-content"}
        />
        <NationalCodeListDialog
          ref={ref => (this.nationalCodeListDialog = ref)}
          onClickItem={({ nationalId, nationalName, nationalCode }) => {
            this.setState({ nationalId, nationalName, nationalCode });
          }}
        />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  textInput1: {
    flex: 1,
    padding: 0,
    fontSize: 16,
    color: "#333",
    height: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eaeaea"
  },
  view2: {
    justifyContent: "center",
    marginTop: 40
  },
  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30
  },
  text3: {
    fontSize: 14,
    color: "#aeb3b9"
  },
  logoView: {
    alignItems: "center",
    width: windowWidth,
    height: 220
  },
  logo: {
    width: 185,
    height: 59
  },
  criclecss: {
    width: 60,
    height: 60,
    backgroundColor: "#F4F4F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: {
    height: 44,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#FF7541",
    borderWidth: 0
  },
  logintext: {
    color: "#fff"
  },
  View4: {
    alignItems: "center",
    marginTop: 20
  },
  weiViewcss: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    paddingTop: 2,
    paddingLeft: 2,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 9
  },
  View5: {
    flexDirection: "row",
    marginVertical: 10
  },
  text4: {
    color: "#333333",
    fontSize: 13,
    fontFamily: "PingFangSC-Regular"
  },
  text5: {
    color: "#aeb3b9",
    fontSize: 12,
    fontFamily: "PingFangSC-Medium"
  },
  text6: {
    color: "#333333",
    fontSize: 15,
    fontFamily: "PingFangSC-Regular"
  }
});
