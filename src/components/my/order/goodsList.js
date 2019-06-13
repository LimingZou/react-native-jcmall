import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import OrderButton from "./button";
import { NetworkImage } from "../../theme/index";
import ListRow from "../../@jcmall/listRow/index";
import { formatMoney } from "../../../utils/function";

const orderStateMapping = {
  1000: {
    title: "等待付款",
    color: "#e0324a"
  },
  1001: {
    title: "已取消",
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


const orderRefondMapping = {
  10: {
    title: "",
    color: "#fe951a"
  },
  20: {
    title: "请等待商家处理",
    color: "#fe951a"
  },
  30: {
    title: "请退货并填写物流信息",
    color: "#fe951a"
  },
  40: {
    title: "等待商家确认收货",
    color: "#fe951a"
  },
  50: {
    title: "供应商确认收货",
    color: "#fe951a"
  },
  60: {
    title: "退款成功",
    color: "#fe951a"
  },
  70: {
    title: "退款申请失败",
    color: "#fe951a"
  },
};

export default class OrderGoodsList extends Component {
  static propTypes = {
    goodsList: PropTypes.array
  };
  static defaultProps = {
    goodsList: null
  };

  onRefund(goodsInfo) {
    if (this.props.onRefund) {
      this.props.onRefund({ goodsInfo });
    }
  }

  onRefundDetail(goodsInfo) {
    if (this.props.onRefundDetail) {
      this.props.onRefundDetail({ goodsInfo });
    }
  }

  onGoodsDetail(goodsInfo) {
    if (this.props.onGoodsDetail) {
      this.props.onGoodsDetail({ goodsInfo });
    }
  }

  render() {

    const {
      goodsList,
      orderInfo: { orderStatus }
    } = this.props;
    return (
      <View style={styles.orderGoodsList}>
        <ListRow
          title={"商品信息"}
          detail={orderStateMapping[orderStatus].title}
          detailStyle={{
            color: orderStateMapping[orderStatus].color,
            fontFamily: "PingFang-SC-Medium"
          }}
          bottomSeparator={"none"}
        />
        {goodsList.length > 0
          ? goodsList.map((item, index) => (
              <View style={styles.item} key={index}>
                <TouchableOpacity
                  style={styles.content}
                  onPress={() => {
                    this.onGoodsDetail(item);
                  }}
                >
                  <NetworkImage
                    style={styles.image}
                    source={{ uri: item.img }}
                    resizeMode={"cover"}
                  />
                  <View style={styles.body}>
                    <Text style={styles.bodyText} numberOfLines={2}>
                      {item.spuName}
                    </Text>
                    <View style={styles.desc}>
                      <Text style={styles.descLabel} numberOfLines={1}>
                        {item.skuName}
                      </Text>
                      <Text style={[
                        styles.descLabel,
                        {
                          color: orderRefondMapping[item.orderRefondStatus].color,
                          textAlign:'right'
                        }
                        ]} numberOfLines={1}>
                        {orderRefondMapping[item.orderRefondStatus].title}
                      </Text>
                    </View>
                    <View style={styles.end}>
                      {item.hasHalfJisuBuy === 1 ? (
                        <Text style={styles.price}>
                          {formatMoney(item.marketPrice)}
                          <Text style={styles.price}>
                            +{item.jisuPrice}豆
                          </Text>
                        </Text>
                      ):null}
                      {item.hasAllJisuBuy === 1 ? (
                        <Text style={styles.price}>{item.jisuPrice}豆</Text>
                      ):null}
                      {item.hasHalfJisuBuy !== 1 && item.hasAllJisuBuy !== 1 ? (
                        <Text style={styles.price}>{formatMoney(item.marketPrice)}</Text>
                      ):null}
                      <Text style={styles.number}>x{item.skuCount}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  orderGoodsList: {
    paddingBottom: 15,
    backgroundColor: "#fff"
  },
  item: {
    padding: 15,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#fff"
  },
  content: {
    flexDirection: "row"
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  body: {
    flex: 1,
    color: "#333",
    position: "relative"
  },
  bodyText: {
    fontSize: 15,
    justifyContent: "space-between",
    lineHeight: 18
  },
  desc: {
    flex: 1,
    fontSize: 12,
    color: "#999",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 5
  },
  descLabel: {
    fontSize: 12,
    color: "#999"
  },
  end: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  price: {
    color: "#333333",
    fontSize: 14
  },
  number: {
    fontSize: 12,
    color: "#999"
  },
  footer: {
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});
