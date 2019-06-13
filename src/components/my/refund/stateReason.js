import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import OrderButton from "../order/button";
import RefundStateSteps from "./stateSteps";
import ListRow from "../../@jcmall/listRow/index";
import { formatMoney } from "../../../utils/function";

export default class RefundStateReason extends Component {
  static propTypes = {
    refundInfo: PropTypes.object
  };
  static defaultProps = {
    refundInfo: null
  };

  onUndo() {
    if (this.props.onUndo) {
      this.props.onUndo();
    }
  }

  onTrack() {
    if (this.props.onTrack) {
      this.props.onTrack();
    }
  }

  render() {
    const { refundInfo } = this.props;
    return (
      <View style={styles.orderStateReason}>
        {refundInfo.status === 20 ? (
          <View style={styles.header}>
            <Text style={styles.state}>您已经成功发起退款申请，请耐心等待商家处理。</Text>
          </View>
        ):null}
        {refundInfo.status === 70 ? (
          <View style={styles.header}>
            <Text style={styles.state}>由于没有在规定时间内收到您的货物。您的退款申请被驳回!</Text>
          </View>
        ):null}
        {refundInfo.status === 40 || refundInfo.status === 50? (
          <View style={styles.header}>
            <Text style={styles.state}>您已成功发起退款申请，请耐心等待商家收货。</Text>
          </View>
        ):null}
        {refundInfo.status === 30 ? (
          <View style={styles.body}>
            <Text style={styles.name}>物流公司：{refundInfo.supplierFullAddress}</Text>
            <Text style={[styles.phone, {marginTop:5}]}>联系电话：{refundInfo.supplierMobile}</Text>
            <Text style={[styles.user, {marginTop:5}]}>联系人：{refundInfo.supplierName}</Text>
          </View>
        ) : null}
        {refundInfo.status === 60 ? (
          <View>
            <ListRow
              title={"退款总金额"}
              detail={`${formatMoney(refundInfo.refundAmount)}`}
              detailStyle={{
                color: "#e0324a",
                fontFamily: "PingFangSC-Regular"
              }}
              bottomSeparator={"full"}
            />
            <ListRow
              title={"退回微信"}
              detail={`${formatMoney(refundInfo.refundAmount)}`}
              detailStyle={{
                color: "#333",
                fontFamily: "PingFangSC-Regular"
              }}
              bottomSeparator={"full"}
            />
          </View>
        ):null}
        {refundInfo.handle_state === 51 ? (
          <View>
            <View style={styles.header}>
              <Text style={styles.state}>确认收货，自动关闭退款申请</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderStateReason: {},
  header: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF"
  },
  state: {
    fontSize: 12,
    color: "#333333"
  },
  body: {
    fontSize: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8"
  },
  span: {
    fontSize: 14,
    color: "#999",
    lineHeight: 18,
    marginBottom: 8
  },
  footer: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8",
    padding: 15,
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  address: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "800"
  },
  success: {
    paddingLeft: 15,
    paddingBottom: 15,
    backgroundColor: "#ffffff"
  },
  info: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8"
  },
  user: {
    color:"#7f7f7f"
  },
  name: {
    color:"#7f7f7f"
  },
  phone: {
    color:"#7f7f7f"
  },
  stateSteps: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15
  },
  item: {
    flexDirection: "row"
  },
  label: {
    fontWeight: "800",
    marginRight: 10,
    color: "#333333",
    fontSize: 14
  },
  text: {
    color: "#333333",
    fontSize: 14
  }
});
