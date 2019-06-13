import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../theme/index";
import { formatMoney } from "../../../utils/function";

export default class RefundGoodsInfo extends Component {
  static propTypes = {
    refundInfo: PropTypes.object
  };
  static defaultProps = {
    refundInfo: null
  };

  onGoods() {
    if (this.props.onGoods) {
      this.props.onGoods();
    }
  }

  render() {
    const { refundInfo } = this.props;
    return (
      <View style={styles.refundGoodsInfo}>
        <View style={styles.header}>
          <Text>退款信息</Text>
        </View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            this.onGoods();
          }}
        >
          <View style={styles.content}>
            <View style={styles.image}>
              <NetworkImage
                source={{ uri: refundInfo.productImg }}
                resizeMode={"cover"}
                style={{
                  width: 80,
                  height: 80
                }}
              />
            </View>
            <View style={styles.body}>
              <View>
                <Text style={styles.bodyText} numberOfLines={1}>
                  {refundInfo.spuName}
                </Text>
                <Text style={styles.spec} numberOfLines={1}>
                  {refundInfo.skuName}
                </Text>
              </View>
              <View style={styles.end}>
                <Text style={styles.price}>{formatMoney(refundInfo.skuPrice)}</Text>
                <Text style={styles.number}>x{refundInfo.skuQuantity}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  refundGoodsInfo: {
    backgroundColor: "#ffffff"
  },
  header: {
    fontSize: 14,
    fontWeight: "400",
    padding: 15
  },
  item: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#F8F8F8"
  },
  content: {
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  body: {
    flex: 1,
    justifyContent: "space-between"
  },
  bodyText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 10
  },
  spec: {
    color: "#7f7f7f",
    fontSize: 12
  },
  end: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  price: {
    color: "#333333",
    fontSize: 14
  },
  number: {
    fontSize: 13,
    color: "#7f7f7f"
  }
});
