import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

export default class OrderCardHeader extends Component {
  static propTypes = {
    state: PropTypes.number,
    sn: PropTypes.string,
    isRefund: PropTypes.bool
  };
  static defaultProps = {
    state: null,
    sn: null,
    isRefund: false
  };

  render() {
    // 订单: 平台处理状态
    // 退款: 平台处理状态
    const refundStateMapping = {
      10: {
        title: "初始化",
        color: "#e0324a"
      },
      20: {
        title: "请等待商家处理",
        color: "#e0324a"
      },
      30: {
        title: "请退货并填写物流信息",
        color: "#e0324a"
      },
      40: {
        title: "等待商家确认收货",
        color: "#e0324a"
      },
      50: {
        title: "供应商确认收货",
        color: "#e0324a"
      },
      60: {
        title: "退款成功",
        color: "#1f9cf4"
      },
      70: {
        title: "退款申请失败",
        color: "#e0324a"
      },
    };
    const orderStateMapping = {
      1000: {
        title: "等待付款",
        color: "#e0324a"
      },
      1001: {
        title: "已关闭",
        color: "#e0324a"
      },
      2000: {
        title: "待发货",
        color: "#e0324a"
      },
      3000: {
        title: "待收货",
        color: "#e0324a"
      },
      4000: {
        title: "待评价",
        color: "#1f9cf4"
      },
      5000: {
        title: "已完成",
        color: "#1f9cf4"
      },
    };
    const { state, sn, isRefund } = this.props;
    return (
      <View style={styles.orderCardHeader}>
        <View style={styles.left}>
          <Text style={styles.leftText}>订单编号：{sn}</Text>
        </View>
        {isRefund ? (
          <View style={styles.right}>
            <Text
              style={[styles.state, { color: refundStateMapping[state].color }]}
            >
              {refundStateMapping[state].title}
            </Text>
          </View>
        ) : (
          <View style={styles.right}>
            <Text
              style={[styles.state, { color: orderStateMapping[state].color }]}
            >
              {orderStateMapping[state].title}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderCardHeader: {
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F8F8F8",
    flexDirection: "row"
  },
  left: {
    alignItems: "center"
  },
  leftText: {
    fontSize: 13,
    color: "#333333"
  },
  right: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  state: {
    fontSize: 13,
    color: "#333"
  },
  delIcon: {
    width: 20,
    height: 20,
    marginLeft: 10
  }
});
