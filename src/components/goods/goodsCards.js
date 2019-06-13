import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { windowWidth, ThemeStyle } from "../../utils/style";
import { NetworkImage } from "../theme";
import CountDown from "../@jcmall/countDown";

export default class GoodsCards extends Component {
  render() {
    const { data, index } = this.props;
    // 显示内容：商品名称title、商品销售价price、商品原价market_price
    // 展示形式：大图1、中图2、两小图3
    switch (index) {
      case 0:
        return this.big(data);
      case 1:
        return this.mid(data);
      default:
        return this.twoSmall(data);
    }
  }
  big({ title, describe, img: { url } }) {
    return (
      <View style={styles.bigWarp}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={[{ width: 20, height: 20 }, { marginRight: 5 }]}
            resizeMode={"cover"}
            source={require("../../images/home/sy_xsg.png")}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.bigTitle} numberOfLines={1}>
                {title}
              </Text>
              <CountDown
                size={8}
                until={1000}
                onFinish={() => alert("Finished")}
                digitStyle={{ backgroundColor: "#fd4748", borderRadius: 3 }}
                digitTxtStyle={{ color: "#ffffff", fontSize: 10 }}
                separatorStyle={{ color: "#2c2c2c" }}
                timeToShow={["H", "M", "S"]}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />
            </View>
            <Text style={styles.bigDescribeText} numberOfLines={1}>
              {describe}
            </Text>
          </View>
        </View>
        <NetworkImage style={styles.bigImg} source={{ uri: url }} />
      </View>
    );
  }
  mid({ title, describe, img: { url } }) {
    const width = (windowWidth - 10 * 2 - 5) / 2;
    const height = (windowWidth / (5 / 3) - 5) / 2;
    return (
      <NetworkImage
        resizeMode={"stretch"}
        style={[styles.smallImg, { width, height }]}
        source={{ uri: url }}
      />
    );
  }
  twoSmall({ title, describe, img: { url } }) {
    const width = ((windowWidth - 10 * 2) / 2 - 7.5) / 2;
    const height = (windowWidth / (5 / 3) - 5) / 2;
    return (
      <NetworkImage
        resizeMode={"cover"}
        style={[styles.smallImg, { width, height }]}
        source={{ uri: url }}
      />
    );
  }
}

const styles = StyleSheet.create({
  // warp
  goodsListWarp: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10
  },
  // list
  listWarp: {
    width: windowWidth - 10 * 2,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eaeaea"
  },
  listImg: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  listRight: {
    flex: 1,
    justifyContent: "space-around"
  },
  listTitle: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16
  },
  listMarketPriceText: {
    fontSize: 12,
    marginRight: 6,
    color: "#ccc",
    textDecorationLine: "line-through"
  },
  listPriceText: {
    color: ThemeStyle.ThemeColor
  },

  // big
  bigWarp: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10
  },
  bigImg: {
    width: (windowWidth - 10 * 2 - 5) / 2 - 10 * 2,
    height: (windowWidth - 10 * 2 - 5) / 2 - 10 * 2
  },
  bigBot: {
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  bigTitle: {
    fontSize: 18,
    color: "#2c2c2c"
  },
  bigDescribeText: {
    marginTop: 5,
    fontSize: 13,
    color: "#9f9f9f"
  },
  bigPriceText: {
    color: ThemeStyle.ThemeColor,
    marginBottom: 10
  },
  // small
  smallImg: {
    width: (windowWidth - 10 - 10 * 2) / 2,
    height: (windowWidth - 10 - 10 * 2) / 2
  },
  smallBot: {
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  smallTitle: {
    marginVertical: 6,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    height: 40
  },
  smallMarketPriceText: {
    marginRight: 6,
    color: "#ccc",
    textDecorationLine: "line-through"
  },
  smallPriceText: {
    color: ThemeStyle.ThemeColor,
    marginBottom: 10
  }
});
