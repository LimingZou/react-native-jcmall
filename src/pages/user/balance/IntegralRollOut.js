import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation,
  TextInput
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Button from "../../../components/category/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class IntegralRollOut extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      rollOutPonitNum:0,
      inputAccount:"",
      modalVisible: false,
    };
  }

  render() {
    const {inputAccount,modalVisible}  = this.state
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        <View style={styles.fristView}>
          <Text style={{ color: "#333333", fontSize: 15, marginTop: 30 }}>
            转入账号
          </Text>
          <View style={styles.passwordView}>
            <TextInput
              keyboardType="numeric"
              caretHidden={false}
              placeholder="           请输入对方账号"
              placeholderTextColor="#D9D9D9"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>{
                this.setState({
                  inputAccount:text
                })
              }}
              secureTextEntry={false}
              style={{ height: 44, width: 162, marginRight: 15 }}
            />
          </View>
        </View>

        <Button
          colors={["#FE7E69", "#FD3D42"]}
          title="下一步"
          linearGradientStyle={styles.button}
          titleStyle={styles.buttonStyle}
          onPress={() => {
            this.props.navigation.navigate("NextIntegraRollOut", {
              inputAccount:inputAccount
            });
          }}
        />
      
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"积分转账"}
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
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 40
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  },
  passwordView:{
    width: windowWidth - 30,
    height: 44,
    marginTop: 35,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  fristView:{
    height: 153,
    width: windowWidth,
    backgroundColor: "#fff",
    marginTop: 10,
    alignItems: "center"
  }
});
