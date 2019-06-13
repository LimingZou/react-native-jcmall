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
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import ListItem from "../../../components/my/jusubean/listItem";

export default class MyBonus extends Component {
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
        <ListItem
          style={{ marginTop: 10 }}
          title="推荐奖"
          onPress={() => {
            this.props.navigation.navigate("BonusDetail", {
              title: "推荐奖明细"
            });
          }}
        />
        <View
          style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}
        />
        <ListItem
          title="市场管理奖"
          onPress={() => {
            this.props.navigation.navigate("BonusDetail", {
              title: "市场管理奖明细"
            });
          }}
        />
        <View
          style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}
        />
        <ListItem
          title="销售奖"
          onPress={() => {
            this.props.navigation.navigate("BonusDetail", {
              title: "销售奖明细"
            });
          }}
        />
        {/* <View
          style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}
        />
        <ListItem
          title="销售利润奖"
          onPress={() => {
            this.props.navigation.navigate("BonusDetail", {
              title: "销售利润奖明细"
            });
          }}
        /> */}

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我的奖金"}
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
    marginTop: 100
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  }
});
