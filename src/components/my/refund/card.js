import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import StaticCountdown from "../../fa/staticCountdown";
import RefundGoodsCard from "./goodsCard";

import OrderCard from "../order/card";
import OrderCardHeader from "../order/cardHeader";
import OrderCardGoods from "../order/cardGoods";
import OrderButton from "../order/button";

export default class RefundCard extends Component {
  static propTypes = {
    refundInfo: PropTypes.object
  };
  static defaultProps = {
    refundInfo: null
  };

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { refundInfo } = this.props;
    return (
      <OrderCard>
        <OrderCardHeader
          isRefund={true}
          orderId={refundInfo.id}
          state={refundInfo.status}
          sn={refundInfo.orderDetailNo}
        />
        <OrderCardGoods
          orderId={refundInfo.id}
          goodsList={[{
            goods_img:refundInfo.productImg,
            goods_title:refundInfo.spuName,
            goods_spec:refundInfo.skuName,
            goods_num:refundInfo.skuQuantity,
            goods_price:refundInfo.skuPrice,
            skuJisuPrice:refundInfo.skuJisuPrice,
            orderRefondStatus:10
          }]}
          onClick={() => {
            this.onClick();
          }}
        />
        <View style={styles.footer}>
          <OrderButton
            text="查看详情"
            onClick={() => {
              this.onClick();
            }}
          />
        </View>
      </OrderCard>
    );
  }
}
const styles = StyleSheet.create({
  header: {},
  body: {
    padding: 15,
    fontSize: 14,
    color: "#333333",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  icon: {
    backgroundColor: "#ff8855",
    color: "#FFFFFF",
    marginRight: 5,
    width: 14,
    height: 14
  },
  iconImage: {
    width: 14,
    height: 14
  },
  bodyText: {
    marginRight: 10
  },
  bodyLabel: {},
  footer: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});
