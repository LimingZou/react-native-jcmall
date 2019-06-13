import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import TimeFormat from "../../fa/timeFormat";
import { formatMoney } from "../../../utils/function";

export default class RefundBaseInfo extends Component {
  static propTypes = {
    reason: PropTypes.string,
    amount: PropTypes.number,
    num: PropTypes.number,
    createTime: PropTypes.string,
    refundNumber: PropTypes.string
  };
  static defaultProps = {
    reason: null,
    amount: null,
    num: null,
    createTime: null,
    refundNumber: null
  };

  render() {
    const { reason, amount, num, createTime, refundNumber } = this.props;
    return (
      <View style={styles.refundBaseInfo}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.label}>退款原因：      </Text>
            <Text style={styles.text}>{reason}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>退款金额：      </Text>
            <Text style={styles.text}>{formatMoney(amount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>申请时间：      </Text>
            {/*<TimeFormat style={styles.time} value={createTime} />*/}
            <Text>{createTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>退款编号：      </Text>
            <Text style={styles.text}>{refundNumber}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  refundBaseInfo: {
    backgroundColor: "#ffffff"
  },
  item: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8",
    paddingVertical: 10
  },
  row: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  label: {
    fontSize: 14,
    color: "#7f7f7f"
  },
  text: {
    fontSize: 14,
    color: "#333"
  },
  time: {
    fontSize: 14,
    color: "#666"
  }
});
