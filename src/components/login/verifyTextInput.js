import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import { Toast } from "../../utils/function";
import { CountdownButton } from "../../utils/view";
import fa from "../../utils/fa";
export default class VerifyTextInput extends Component {
  // type: phoneNumber, text, password, code
  static defaultProps = {
    type: "text",
    icon: null,
    verifyCode: {
      api: {},
      params: {}
    }
  };
  state = {
    secureTextEntry: true
  };
  render() {
    const { secureTextEntry } = this.state;
    const { type, icon, verifyCode } = this.props;
    return (
      <View style={styles.window}>
        <View style={styles.icon}>{icon}</View>
        <TextInput
          keyboardType={type === "phoneNumber" ? "number-pad" : type === "code" ? "number-pad":"default"}
          maxLength={
            type === "phoneNumber"
              ? 11
              : type === "code"
              ? 4
              : type === "password" || type === "text"
              ? 20
              : 20
          }
          secureTextEntry={type === "password" ? secureTextEntry : false}
          style={styles.textInput}
          {...this.props}
        />
        {type === "code" ? (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              alignSelf: "center",
              alignItems: "center",
              right: 10
            }}
          >
            <View
              style={{
                height: 22,
                width: 1,
                backgroundColor: "#333333",
                marginRight: 10
              }}
            />
            <TouchableOpacity onPress={() => {}}>
              <CountdownButton
                api={verifyCode.api}
                getParams={() => {
                  return {
                    ...verifyCode.params
                  };
                }}
                verify={(resolve)=>{
                  if (!verifyCode.verify) {
                    return Toast.warn("请输入手机号");
                  }
                  if (!fa.isPhone(verifyCode.verify)){
                    return Toast.warn("请输入正确的手机号");
                  }
                  resolve()
                }}
                getData={e => {
                  if (fa.code.isSuccess(e.code)) {
                    Toast.success("验证码已发送");
                  } else {
                    Toast.warn(fa.code.parse(e.code, e.message));
                  }
                }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {type === "password" ? (
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              paddingRight: 10,
              alignItems: "flex-end",
              justifyContent: "center",
              position: "absolute",
              alignSelf: "center",
              right: 0
            }}
            onPress={() => {
              this.setState({
                secureTextEntry: !secureTextEntry
              });
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../images/yan.png")}
              style={{
                width: 20,
                height: 20,
                transform: [{ rotateX: secureTextEntry ? "0deg" : "180deg" }]
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eaeaea",
    marginBottom: 15
  },
  icon: {
    marginHorizontal: 10
  },
  textInput: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    color: "#333",
    height: 45
  }
});
