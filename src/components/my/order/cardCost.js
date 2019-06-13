import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { formatMoney } from "../../../utils/function";

export default class OrderCardCost extends Component {
  static propTypes = {
    goodsNumber: PropTypes.number,
    totalCost: PropTypes.any,
  };
  static defaultProps = {
    goodsNumber: null,
    totalCost: null,
  };


  render() {
    const {
      goodsNumber,
      totalCost,
    } = this.props;

    return (
      <View style={styles.orderCardFooter}>
        <View style={styles.header}>
          <Text style={styles.number}>共{goodsNumber}件商品</Text>
          <Text style={styles.priceDesc}>合计：</Text>
          <Text style={styles.price}>{formatMoney(totalCost)}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderCardFooter: {
    paddingVertical: 0,
    borderTopColor: "#f8f8f8",
    borderTopWidth: 1
  },
  header: {
    textAlign: "right",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  number: {
    fontSize: 12,
    color: "#333333"
  },
  priceDesc: {
    fontSize: 12,
    color: "#333333",
    marginLeft: 10
  },
  price: {
    fontSize: 14,
    color: "#333333"
  },
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: "#d9d9d9",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row"
  }
});
