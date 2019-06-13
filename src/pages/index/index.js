import React, { Component } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { ThemeStyle } from "../../utils/style";
import { createBottomTabNavigator } from "react-navigation";
import Badge from "@react-native-component/react-native-smart-badge";
import Icon from "../../config/iconFont";

import Home from "../home";
import Discovery from "../discovery";
import Cart from "../cart";
import User from "../user";

class TabBarItem extends Component {
  render() {
    return (
      <Image
        source={
          this.props.focused ? this.props.selectedImage : this.props.normalImage
        }
        style={[
          {
            width: 22,
            height: 22
          }
        ]}
      />
    );
  }
}

class BadgeItem extends Component {
  render() {
    const { screenProps, icon, tintColor } = this.props;
    const { cartNum } = screenProps;
    return (
      <View style={[{ width: 20, height: 20 }, this.props.style]}>
        <Icon name={icon} size={20} color={tintColor} />
        {cartNum ? (
          <Badge
            textStyle={{ color: "#fff", fontSize: 10, paddingHorizontal: 2 }}
            style={{ position: "absolute", right: -20, top: -6 }}
          >
            {cartNum}
          </Badge>
        ) : null}
      </View>
    );
  }
}

class CenterItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            width: 58,
            height: 58,
            backgroundColor: "red",
            justifyContent: "space-between",
            alignItems: "center"
          }
        ]}
      >
        <Image style={{ backgroundColor: "green", width: 40, height: 40 }} />
        <Text style={{ fontSize: 10 }}>领取集速豆</Text>
      </TouchableOpacity>
    );
  }
}

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "首页",
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={"-home"} size={20} color={tintColor} />
        )
      })
    },
    Discovery: {
      screen: Discovery,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "发现",
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={"-discover"} size={20} color={tintColor} />
        )
      })
    },
    // centerBar: {
    //   screen: Category,
    //   navigationOptions: ({ navigation, screenProps }) => ({
    //     tabBarLabel: " ",
    //     tabBarIcon: ({ focused, tintColor }) => (
    //       <CenterItem
    //         screenProps={screenProps}
    //         tintColor={tintColor}
    //         focused={focused}
    //         normalImage={require("../../images/tab/tab3.png")}
    //         selectedImage={require("../../images/tab/tabActive3.png")}
    //       />
    //     )
    //   })
    // },
    Cart: {
      screen: Cart,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarLabel: "购物车",
        tabBarIcon: ({ focused, tintColor }) => (
          <BadgeItem
            screenProps={screenProps}
            tintColor={tintColor}
            focused={focused}
            icon={"-shopping-car"}
          />
        )
      })
    },
    User: {
      screen: User,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "我的",
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={"-user"} size={20} color={tintColor} />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: ThemeStyle.ThemeColor,
      inactiveTintColor: "#cdcdcd",
      style: {
        backgroundColor: "#fff",
        borderTopColor: "#eaeaea",
        borderTopWidth: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#7a7a7a",
        shadowOpacity: 0.2,
        shadowRadius: 5
      },
      tabStyle: {
        marginTop: 10
      },
      labelStyle: {
        marginBottom: 5,
        fontSize: 10
      }
    }
  }
);
