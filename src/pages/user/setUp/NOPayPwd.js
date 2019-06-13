/**
 * 未设置支付密码
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
import { UserApi } from "../../../services/api/user";
import Fetch from "../../../utils/fetch";

export default class NOPayPwd extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      passwordDescript:'启用支付密码'
    };
  }

  componentDidMount(){
    Fetch.fetch({
      api: UserApi.isHasUserPayPassword,
      params:{}
    }).then((e)=>{
      if(e.obj&&e.obj==1){
        this.setState({
          passwordDescript:'修改支付密码'
        })
      }
      console.log('是否设置过密码',e);
    });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ImageBackground
          style={{
            width: 110,
            height: 130,
            marginTop: 50,
            marginLeft: (windowWidth - 110) / 2,
            marginRight: (windowWidth - 110) / 2
          }}
          source={require("../../../images/mine/NoPayPwd.png")}
          resizeMode={"contain"}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            width: 200,
            marginLeft: (windowWidth - 200) / 2,
            marginRight: (windowWidth - 200) / 2,
            marginTop: 20,
            backgroundColor: "white",
            borderRadius: 5
          }}
          onPress={() => {
            this.props.navigation.navigate("ChangeLoginPwd", {passwordType:"payPassword"});
          }}>
          <Text style={{ color: "#333333", fontSize: 17 }}>
            {this.state.passwordDescript}
          </Text>
        </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
