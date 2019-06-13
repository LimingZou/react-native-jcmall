import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../config/iconFont";
import { windowWidth } from "../../../utils/style";

export default class SureOrderAddress extends Component {
  static propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string
  };
  
  static defaultProps = {
    name: null,
    phone: null,
    address: null,
    onPress: PropTypes.func
  };

  render() {
    const { name, phone, address, onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: windowWidth, height: 89, backgroundColor: "#fff" }}
        onPress={onPress}
      >
        <View style={styles.orderAddress}>
          <View style={styles.user}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.phone}>{phone}</Text>
          </View>
          <View style={styles.info}>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <View style={{ width: windowWidth - 60 }}>
                <Text style={styles.address} numberOfLines={2}>
                  地址：{address}
                </Text>
              </View>
              <View style={styles.backButton}>
                <Icon name="-arrow-right" size={20} color="#333333" />
              </View>
            </View>
          </View>
        </View>
        <Image
          style={{ height: 3, width: "100%" }}
          source={require("../../../images/order/colorsLine.png")}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  orderAddress: {
    backgroundColor: "#FFFFFF",
    height: 86
  },
  info: {
    height: 86,
    width: windowWidth
  },
  user: {
    alignItems: "center",
    flexDirection: "row",
    margin: 15
  },
  name: {
    color: "#333333",
    fontSize: 15,
    marginRight: 50
  },
  phone: {
    color: "#333333",
    fontSize: 15,
    marginRight: 15
  },
  address: {
    fontSize: 13,
    color: "#7f7f7f"
  },
  backButton: {
    justifyContent: "center",
    width: 50,
    alignItems: "center"
  }
});
