/**
 * 已设置支付密码
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
import SetUpListItem from "../../../components/my/setUp/setUpListItem";

export default class AlreadyPayPwd extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <SetUpListItem
          title="修改支付密码"
          onPress={() => {
            this.props.navigation.navigate("ChangePayPwd", {});
          }}
          style={{ marginTop: 10 }}
        />

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
