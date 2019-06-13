import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import OrderButton from "./button";
import CountDown from "../../../components/fa/countDown";
const buttons = {
  1000: {
    title: "等待付款",
    showEvaluateBtn:false, //评价
    showPayBtn:true, //去支付
    showReceiveBtn:false, //确认收货
    showLogisticsBtn:false, //查看物流
    showCancelBtn:true, // 取消订单
    showDeleteBtn:false, // 删除订单
    showRefundBtn:false, // 申请售后
    showBuyAgainBtn:false, // 再次购买
    showRemindBtn:false // 提醒发货
  },
  1001: {
    title: "已关闭",
    showEvaluateBtn:false,
    showPayBtn:false,
    showReceiveBtn:false,
    showLogisticsBtn:false,
    showCancelBtn:false,
    showDeleteBtn:true,
    showRefundBtn:false,
    showBuyAgainBtn:false,
    showRemindBtn:false
  },
  2000: {
    title: "待发货",
    refundType: 1,
    showEvaluateBtn:false,
    showPayBtn:false,
    showReceiveBtn:false,
    showLogisticsBtn:false,
    showCancelBtn:false,
    showDeleteBtn:false,
    showRefundBtn:true,
    showBuyAgainBtn:false,
    showRemindBtn:true
  },
  3000: {
    title: "待收货",
    showEvaluateBtn:false,
    showPayBtn:false,
    showReceiveBtn:true,
    showLogisticsBtn:true,
    showCancelBtn:false,
    showDeleteBtn:false,
    showRefundBtn:false,
    showBuyAgainBtn:false,
    showRemindBtn:false
  },
  4000: {
    title: "待评价",
    refundType: 2,
    showEvaluateBtn:true,
    showPayBtn:false,
    showReceiveBtn:false,
    showLogisticsBtn:false,
    showCancelBtn:false,
    showDeleteBtn:false,
    showRefundBtn:true,
    showBuyAgainBtn:false,
    showRemindBtn:false
  },
  5000: {
    title: "已完成",
    showEvaluateBtn:false,
    showPayBtn:false,
    showReceiveBtn:false,
    showLogisticsBtn:false,
    showCancelBtn:false,
    showDeleteBtn:true,
    showRefundBtn:false,
    showBuyAgainBtn:true,
    showRemindBtn:false
  },
};

export default class OrderCardFooter extends Component {
  static propTypes = {
    state: PropTypes.number,
    refondState: PropTypes.number,
    orderInfo: PropTypes.object,
    endcount: PropTypes.func
  };
  static defaultProps = {
    state: null,
    refondState: null,
    orderInfo: null,
    endcount: ()=>{}
  };

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onDelete() {
    if (this.props.onCancel) {
      this.props.onDelete();
    }
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onReceive() {
    if (this.props.onReceive) {
      this.props.onReceive();
    }
  }
  onRefund(refundType) {
    if (this.props.onRefund) {
      this.props.onRefund(refundType);
    }
  }
  onPay() {
    if (this.props.onPay) {
      this.props.onPay();
    }
  }

  onRemind() {
    if (this.props.onRemind) {
      this.props.onRemind();
    }
  }

  onEvaluate() {
    if (this.props.onEvaluate) {
      this.props.onEvaluate();
    }
  }

  onLogistics() {
    if (this.props.onLogistics) {
      this.props.onLogistics();
    }
  }

  render() {
    const {
      orderInfo:{nowDate, orderEndPayTime},
      state,
      refondState,
      endcount
    } = this.props;

    return (
      <View style={styles.orderCardFooter}>
        <View style={styles.footer}>
          {buttons[state].showCancelBtn === true ? (
            <OrderButton
              text="取消订单"
              onClick={() => {
                this.onCancel();
              }}
            />
          ) : null}
          {buttons[state].showBuyAgainBtn === true ? (
            <OrderButton
              text="再次购买"
              onClick={() => {
                this.onCancel();
              }}
            />
          ) : null}
          {buttons[state].showRemindBtn === true && refondState === 10 ? (
            <OrderButton
              text="提醒发货"
              onClick={() => {
                this.onRemind();
              }}
            />
          ) : null}
          {buttons[state].showDeleteBtn === true ? (
            <OrderButton
              text="删除订单"
              onClick={() => {
                this.onDelete();
              }}
            />
          ) : null}
          {buttons[state].showRefundBtn === true && refondState === 10 ? (
            <OrderButton
              text="申请售后"
              onClick={() => {
                this.onRefund(buttons[state].refundType);
              }}
            />
          ) : null}
          {buttons[state].showRefundBtn === true && refondState !== 10 ? (
            <OrderButton
              textColor={"#fe6e02"}
              text="售后处理中"
              onClick={() => {

              }}
            />
          ) : null}
          {buttons[state].showPayBtn === true ? (
            <OrderButton
              text="付款"
              type="danger"
              onClick={() => {
                this.onPay();
              }}
            >
              <CountDown
                endcount={endcount}
                format={"hh:mm:ss"}
                countdown={(orderEndPayTime-nowDate)/1000}
              />
            </OrderButton>
          ) : null}
          {buttons[state].showReceiveBtn === true ? (
            <OrderButton
              text="确认收货"
              type="danger"
              onClick={() => {
                this.onReceive();
              }}
            />
          ) : null}
          {buttons[state].showEvaluateBtn === true ? (
            <OrderButton
              text="评价"
              onClick={() => {
                this.onEvaluate();
              }}
            />
          ) : null}
          {buttons[state].showLogisticsBtn === true ? (
            <OrderButton
              text="查看物流"
              type="danger"
              onClick={() => {
                this.onLogistics();
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderCardFooter: {
    backgroundColor:"#fff",
    paddingVertical: 0,
    borderTopColor: "#f8f8f8",
    borderTopWidth: 0
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
