/**
 * 修改登录密码
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import Icon from "../../../config/iconFont";
import { connect } from "react-redux";
import { UserApi } from "../../../services/api/user";
import Fetch from "../../../utils/fetch";
import fa from "../../../utils/fa";
import { Toast } from "../../../utils/function";
import { CountdownButton } from "../../../utils/view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

@connect()

export default class ChangeLoginPwd extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      pw1: "",
      pw2: "",
      captcha: "",
      headerText:"修改密码",
      getCodeApi:UserApi.editPasswordVerifyCode,
      changePassawordApi: UserApi.changeUserPwdBySms
    };
  }

  componentWillMount(){
    if(this.props.navigation.state.params&&this.props.navigation.state.params.passwordType){
      let passwordType = this.props.navigation.state.params.passwordType
      if(passwordType=="payPassword"){
        this.setState({
          headerText:"设置支付密码",
          getCodeApi:UserApi.editPayPasswordVerifyCode,
          changePassawordApi: UserApi.updatePayPasswordBySms
        })
      }
    }
  }


  //确认修改登录密码
  _changePwdSubmit = async () => {
    const { dispatch } = this.props;
    const { mobile, captcha, pw1, pw2,changePassawordApi,headerText } = this.state;
    if (!mobile) {
      return Toast.warn("请输入手机号");
    }
    if (!fa.isPhone(mobile)){
      return Toast.warn("请输入正确的手机号");
    }
    if (!captcha) {
      return Toast.warn("请输入验证码");
    }
    if (!pw1||!pw2) {
      return Toast.warn("请输入密码");
    }
    if(!(pw1===pw2)){
      return Toast.warn("两次密码输入不一致");
    }
    let params = {
      userMobile:mobile,
      identityCode: captcha,
      password:pw2
    };

    if(headerText == "设置支付密码"){
      params = {
        userMobile:mobile,
        identityCode:captcha,
        userPayPassword: pw2
      }
    }
    console.log('修改登录密码参数',params);
    const e = await Fetch.fetch({
      api: changePassawordApi,
      params
    });
    console.log('修改登录密码结果',e);
    if (fa.code.isSuccess(e.code)) {
      Toast.success(e.message);
      this.props.navigation.pop();
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  render() {
    const {headerText,getCodeApi} = this.state
    return (
      <View style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}>
        <KeyboardAwareScrollView>
        <View style={styles.itemContainer1}>
            <View style={styles.leftIcon}>
              <Icon name={"-shoujihao"} size={21} color={"#aeb3b9"} />
            </View>
            <TextInput
              style={styles.textInput}
              keyboardType={"numeric"}
              maxLength={11}
              placeholderTextColor={"#D9D9D9"}
              underlineColorAndroid={"transparent"}
              placeholder={"请输入手机号"}
              editable={true}
              onChangeText={mobile => {
                this.setState({ mobile });
              }}
              value={this.state.mobile}
            />
        </View>

          <View style={styles.itemContainer2}>
            <View style={styles.leftIcon}>
              <Icon name={"-yanzhengma"} size={21} color={"#aeb3b9"} />
            </View>
            <TextInput
              style={styles.textInput}
              maxLength={4}
              placeholderTextColor={"#D9D9D9"}
              keyboardType={"numeric"}
              underlineColorAndroid={"transparent"}
              placeholder={"输入验证码"}
              onChangeText={captcha => {
                this.setState({ captcha });
              }}
              value={this.state.captcha}
            />
            <View style={styles.sendCodeView}>
              <CountdownButton
                style={{width:70,height:13}}
                textStyle={{color:'#E0324A',fontSize:12}}
                api={getCodeApi}
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

          <View style={styles.itemContainer1}>
            <View style={styles.leftIcon}>
              <Icon name={"-mima"} size={21} color={"#aeb3b9"} />
            </View>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              placeholder={"请输入6-20位新密码"}
              maxLength={20}
              secureTextEntry={true}
              placeholderTextColor={"#D9D9D9"}
              onChangeText={pw1 => {
                this.setState({ pw1 });
              }}
              value={this.state.pw1}
            />
          </View>

          <View style={styles.itemContainer2}>
            <View style={styles.leftIcon}>
              <Icon name={"-querenmima"} size={21} color={"#aeb3b9"} />
            </View>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              placeholder={"请确认您的密码"}
              maxLength={20}
              secureTextEntry={true}
              placeholderTextColor={"#D9D9D9"}
              onChangeText={pw2 => {
                this.setState({ pw2 });
              }}
              value={this.state.pw2}
            />
          </View>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => this._changePwdSubmit()}>
          <Text style={{ fontSize: 17, color: "#333333" }}>确认修改</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
        
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={headerText}
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
  itemContainer1: {
    height: 45,
    width: windowWidth,
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  itemContainer2: {
    height: 45,
    width: windowWidth,
    backgroundColor: "white",
    flexDirection: "row"
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
  }
});
