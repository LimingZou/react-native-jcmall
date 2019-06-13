import React, { Component } from "react";
import { StyleSheet, View, Text, Clipboard } from "react-native";
import PropTypes from "prop-types";
import TimeFormat from "../../fa/timeFormat";
import OrderButton from "./button";
import fa from "../../../utils/fa";
import CountDown from "../../../components/fa/countDown";

import { formatMoney } from "../../../utils/function";

export default class OrderBaseInfo extends Component {
  static propTypes = {
    orderNumber: PropTypes.string,
    createTime: PropTypes.string,
    payTime: PropTypes.number,
    payment: PropTypes.string
  };
  static defaultProps = {
    orderNumber: null,
    createTime: null,
    payTime: null,
    payment: null
  };

  setClipboardData() {
    const { orderNumber } = this.props;
    Clipboard.setString(`${orderNumber}`);
    fa.toast.show({ title: "已复制", type: "warn" });
  }

  render() {
    const {
      orderInfo:{nowDate, orderEndPayTime, orderStatus},
      orderNumber,
      createTime,
      payTime,
      payment,
      freight,
      totalCost,
      offer,
      jisudou
    } = this.props;
    console.log('失效时间',nowDate, orderEndPayTime);
    return (
      <View style={styles.orderBaseInfo}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.label}>订单编号：</Text>
            <Text style={styles.text}>{orderNumber}</Text>
            <OrderButton
              text="复制"
              size="small"
              onClick={() => {
                this.setClipboardData();
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>下单时间：</Text>
            {/*<TimeFormat style={styles.time} value={createTime} />*/}
            <Text>{createTime}</Text>
          </View>
          {orderStatus === 1000 ? (
            <View style={styles.row}>
              <Text style={styles.label}>失效时间：</Text>
              <CountDown
                numStyle={{color:"#000", fontSize:14}}
                symbolStyle={{color:"#000", fontSize:14}}
                endcount={()=>{}}
                format={"hh:mm:ss"}
                countdown={(orderEndPayTime-nowDate)/1000}
              />
            </View>
          ):null}
        </View>
        {
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.label}>支付方式：</Text>
              <Text style={styles.text}>{payment}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>商品金额：</Text>
              <Text style={styles.text}>{formatMoney(totalCost)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>支付时间：</Text>
              <TimeFormat style={styles.time} value={payTime/1000} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>优惠金额：</Text>
              <Text style={styles.text}>-{formatMoney(offer)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>集速豆抵扣：</Text>
              <Text style={styles.text}>-{jisudou}个</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>运费：</Text>
              <Text style={styles.text}>{formatMoney(freight)}</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderBaseInfo: {
    backgroundColor: "#FFFFFF"
  },
  item: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
    paddingVertical: 10
  },
  row: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  label: {
    fontSize: 14,
    lineHeight: 14,
    color: "#7f7f7f"
  },
  text: {
    fontSize: 14,
    color: "#333"
  },
  time: {
    fontSize: 14,
    lineHeight: 14,
    color: "#333"
  }
});
