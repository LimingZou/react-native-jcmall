import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../theme/index";
import { formatMoney } from "../../../utils/function";

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
  51: {
    title: "打款中",
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

export default class OrderCardGoods extends Component {
  static propTypes = {
    goodsList: PropTypes.array
  };
  static defaultProps = {
    goodsList: []
  };

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { goodsList } = this.props;
    return (
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            this.onClick();
          }}
        >
          {goodsList.map((item, index) => {
            console.log('orderRefondStatus',item.orderRefondStatus);
            return (
              <View style={styles.content} key={index}>
                <NetworkImage
                  style={styles.image}
                  source={{ uri: item.goods_img }}
                  resizeMode={"cover"}
                />
                <View style={styles.body}>
                  <View>
                    <Text style={styles.bodyText} numberOfLines={1}>
                      {item.goods_title}
                    </Text>
                    <View style={styles.desc}>
                      <Text style={styles.spec} numberOfLines={1}>
                        {item.goods_spec}
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
                  </View>
                  <View style={styles.end}>
                    {item.hasHalfJisuBuy === 1 ? (
                      <Text style={styles.price}>
                        {formatMoney(item.goods_price)}
                        <Text style={styles.price}>
                          +{item.skuJisuPrice}豆
                        </Text>
                      </Text>
                    ):null}
                    {item.hasAllJisuBuy === 1 ? (
                      <Text style={styles.price}>{item.skuJisuPrice}豆</Text>
                    ):null}
                    {item.hasHalfJisuBuy !== 1 && item.hasAllJisuBuy !== 1 ? (
                      <Text style={styles.price}>{formatMoney(item.goods_price)}</Text>
                    ):null}
                    <Text style={styles.number}>x{item.goods_num}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  desc: {
    flex: 1,
    fontSize: 12,
    color: "#999",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spec: {
    width:150,
    color: "#7f7f7f",
    fontSize: 12
  },
  descLabel: {
    fontSize: 12,
    color: "#999"
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
