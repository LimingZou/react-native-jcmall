import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

type PropsType = {
  price?: string,
  color?: string,
  priceSize?: number,
  priceTagSize?: number,
  discount?: boolean,
  style?: any
};

export default class PriceView extends Component {
  props: PropsType;
  render() {
    const { price, color, priceSize, priceTagSize, discount, style } =
      this.props || {};
    return (
      <View style={[styles.container, style]}>
        <Text style={{textDecorationLine: discount ? "line-through" : null}}>
          <Text style={{fontSize: priceTagSize,color: color}}>
            <Text style={{ fontSize: priceSize, color: color }}>{price}</Text>
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  }
});
