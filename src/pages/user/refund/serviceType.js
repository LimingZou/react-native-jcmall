import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import OrderModel from "../../../services/models/order";
import { List } from "antd-mobile-rn";
import { Cell } from "../../../components";
import { NetworkImage } from "../../../components/theme";
import { PublicStyles } from "../../../utils/style";
import NavigationBar from "../../../components/@jcmall/navbar";
import { formatMoney } from "../../../utils/function";

const orderModel = new OrderModel();

export default class ServiceType extends Component {
  state = {
    goodsInfo: null
  };

  async componentWillMount() {
    const result = await orderModel.goodsInfo({
      orderDetailId:this.props.navigation.getParam("id")
    });
    this.setState({
      goodsInfo: result
    });
  }

  onClick(refundType) {
    this.props.navigation.navigate("RefundServiceApply", {
      id: this.props.navigation.getParam("id"),
      refund_type: refundType,
      delta: 2
    });
  }

  render() {
    const { goodsInfo } = this.state;
    const { navigation } = this.props;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
          <ScrollView>
            <View style={styles.refundGoodsCard}>
              {goodsInfo ? (
                <View style={styles.item}>
                  <View style={styles.content}>
                    <NetworkImage
                      source={{ uri: goodsInfo.productImg }}
                      resizeMode={"cover"}
                      style={styles.image}
                    />
                    <View style={styles.body}>
                      <View>
                        <Text style={styles.bodyText} numberOfLines={1}>
                          {goodsInfo.spuName}
                        </Text>
                        <Text style={styles.spec}>
                          {goodsInfo.skuName}
                        </Text>
                      </View>
                      <View style={styles.end}>
                        <Text style={styles.price}>
                          {formatMoney(goodsInfo.skuSalePrice)}
                        </Text>
                        <Text style={styles.number}>x {goodsInfo.skuQuantity}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ):null}
            </View>
            <View>
              <Cell
                titleStyle={{ fontSize: 14 }}
                title="仅退款"
                label="(未收到货)"
                onPress={() => {
                  this.onClick(1);
                }}
              />
              <Cell
                titleStyle={{ fontSize: 14 }}
                title="退货退款"
                label="(已收到货)"
                onPress={() => {
                  this.onClick(2);
                }}
              />
            </View>
          </ScrollView>
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          style={{ backgroundColor: "#fff" }}
          title={"选择售后服务"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    marginRight: 15
  },
  refundGoodsCard: {
    backgroundColor: "#fff"
  },
  item: {
    padding: 15,
    borderBottomWidth: 8,
    borderStyle: "solid",
    borderBottomColor: "#f8f8f8"
  },
  content: {
    flexDirection: "row"
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20
  },
  body: {
    flex: 1,
    justifyContent: "space-between"
  },
  bodyText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10
  },
  end: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  spec: {
    fontSize: 12,
    color: "#7f7f7f"
  },
  price: {
    color: "#333333",
    fontSize: 14
  },
  number: {
    marginTop: 5,
    fontSize: 12,
    color: "#333333"
  }
});
