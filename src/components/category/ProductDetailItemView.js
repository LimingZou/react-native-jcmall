import React, { Component, Element } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

type PropsType = {
  onPress?: () => void,
  left?: Element<*>,
  right?: Element<*>,
  style?: any
};

export default class ProductDetailItemView extends Component {
  props: PropsType;

  render() {
    const { onPress, left, middle, right, style ,showIcon} = this.props || {};
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]} activeOpacity={1}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {left}
          {middle}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {right}
          {showIcon?
            <Image
            source={require("../../images/ic_arrow_right.png")}
            style={{
              width: 17,
              height: 28,
              marginLeft: 10
            }}
          />:null
          }
          
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  }
});
