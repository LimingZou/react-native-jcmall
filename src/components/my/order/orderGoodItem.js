import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../theme/index";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";

export default class OrderGoodItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    payStatus: PropTypes.string,
    goodImage: PropTypes.string,
    goodAttribute: PropTypes.string,
    price: PropTypes.string,
    number: PropTypes.string
  };
  static defaultProps = {
    title: "",
    payStatus: "",
    goodImage: "",
    goodAttribute: "",
    price: "",
    number: ""
  };

  render() {
    const {
      title,
      payStatus,
      goodImage,
      goodAttribute,
      price,
      number
    } = this.props;
    return (
      <View
        style={{ width: windowWidth, height: 155, backgroundColor: "#fff" }}
      >
        <View
          style={{
            height: 40,
            width: windowWidth,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
            商品信息
          </Text>
          <Text style={{ color: "#E0324A", fontSize: 13, marginRight: 15 }}>
            {payStatus}
          </Text>
        </View>
        <View
          style={{
            height: 100,
            width: windowWidth,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F7F7F7"
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <NetworkImage
              source={{ uri: goodImage }}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 3, height: 100, marginLeft: 10 }}>
            <Text
              style={{
                color: "#333333",
                fontSize: 15,
                marginTop: 12,
                marginRight: 30
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{ color: "#7F7F7F", fontSize: 12, marginTop: 10 }}
              numberOfLines={1}
            >
              {goodAttribute}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginRight: 18,
                marginTop: 20
              }}
            >
              <Text style={{ color: "#333333", fontSize: 14 }}>{price}</Text>
              <Text style={{ color: "#7F7F7F", fontSize: 13 }}>x{number}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
