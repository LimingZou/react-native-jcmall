import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { formatMoney } from "../../../utils/function";

export default class OrderCostList extends Component {
  static propTypes = {
    goodsTotal: PropTypes.string,
    freight: PropTypes.string,
    totalCost: PropTypes.any
  };
  static defaultProps = {
    goodsTotal: null,
    freight: null,
    totalCost: null
  };

  render() {
    const { goodsTotal, freight, totalCost } = this.props;
    return (
      <View style={styles.orderCostList}>
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>实付款：</Text>
          <Text style={styles.footerText}>{formatMoney(totalCost)}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderCostList: {
    backgroundColor: "#fff",
    padding: 15
  },
  item: {},
  footer: {
    borderStyle: "solid",
    borderTopColor: "#F8F8F8",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  footerLabel: {
    fontSize: 15,
    color: "#e0324a"
  },
  footerText: {
    fontSize: 15,
    color: "#e0324a"
  }
});
