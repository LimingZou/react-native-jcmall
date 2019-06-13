import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import TimeFormat from "../../fa/timeFormat";
import LinearGradient from "react-native-linear-gradient";

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
    title: "抱歉您的退款申请被驳回",
    color: "#e0324a"
  },
};

export default class RefundStateCard extends Component {
  static propTypes = {
    refundInfo: PropTypes.object
  };
  static defaultProps = {
    refundInfo: null
  };

  render() {
    const { refundInfo } = this.props;
    return (
      <LinearGradient
        style={{
          flexDirection:'row',
          justifyContent:"space-between",
          alignItems:'center',
          paddingRight:40
        }}
        locations={[0.0, 0.5, 1.0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#fe9b1b", "#f8633a", "#db2b41"]}
      >
        <View style={styles.orderStateCard}>
          <Text style={styles.stateText}>
            {refundStateMapping[refundInfo.status].title}
          </Text>
          {/*<TimeFormat*/}
            {/*style={styles.rightText}*/}
            {/*value={refundInfo.handle_time}*/}
            {/*format={"Y年M月D日 h:m:s"}*/}
          {/*/>*/}
          <Text style={styles.rightText}>{refundInfo.createTime}</Text>
        </View>
        <Image
          style={{
            width:80,
            height:80
          }}
          source={require("../../../images/refund/tkxq-bg.png")}
        />
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  orderStateCard: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    color: "#fff"
  },

  stateText: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 10,
    fontFamily: "PingFangSC-Regular"
  },
  rightText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "PingFangSC-Regular"
  }
});
