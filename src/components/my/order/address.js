import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

export default class OrderAddress extends Component {
  static propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string
  };
  
  static defaultProps = {
    name: null,
    phone: null,
    address: null
  };

  render() {
    const { name, phone, address } = this.props;
    return (
      <View>
        <View style={styles.orderAddress}>
          <View style={styles.info}>
            <View style={styles.user}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.phone}>{phone}</Text>
            </View>
            <View>
              <Text style={styles.address} numberOfLines={2}>
                地址：{address}
              </Text>
            </View>
          </View>
        </View>
        <Image
          style={{ height: 3, width: "100%" }}
          source={require("../../../images/order/colorsLine.png")}
          resizeMode="stretch"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderAddress: {
    padding: 15,
    backgroundColor: "#FFFFFF"
  },
  image: {
    width: 15,
    height: 15,
    marginRight: 10
  },
  info: {},
  user: {
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row"
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
  }
});
