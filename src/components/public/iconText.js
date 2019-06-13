import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NetworkImage } from "../../components/theme";

export default class GroupWindow extends Component {
  static defaultProps = {
    title: "",
    icon: null,
    titleStyle: {},
    iconStyle: {}
  };
  render() {
    const { title, icon, titleStyle, iconStyle, style } = this.props;
    return (
      <View style={[styles.window, style]}>
        <NetworkImage style={[styles.img, iconStyle]} source={icon} />
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginBottom: 5
  },
  title: {
    color: "#333",
    fontSize: 12,
    fontFamily: "PingFangSC-Regular"
  }
});
