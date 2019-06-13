/**
 * Created by k186 on 2019-03-22.
 */
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import {
  ThemeStyle,
  windowWidth,
  FontStyle,
  PublicStylesString
} from "../../../utils/style";
import { NetworkImage } from "../../theme/index";

const itemWidth = (windowWidth - 10 - 2 * 10) / 2;

export default class LogisticsGoodsItem extends Component {
  render() {
    const {
      data: {
        img: { url },
        title,
        price,
        market_price
      },
      index,
      onPress,
      style
    } = this.props;
    // const { imgHeight } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[
          styles.item,
          style,
          {
            marginLeft: index % 2 === 0 ? 0 : 10
          }
        ]}
      >
        <View style={{ padding: 20, backgroundColor: "#F4F4F4" }}>
          <NetworkImage
            roundAsCircle={true}
            style={[
              styles.img,
              {
                width: itemWidth - 40,
                height: itemWidth - 40
              }
            ]}
            source={{ uri: url }}
          />
        </View>
        <View style={styles.bot}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.bot1}>
            <Image
              style={styles.vip}
              source={require("../../../images/home/sy_hyj.png")}
            />
            <Text style={styles.price}>￥{price}</Text>
            <Text style={styles.market_price}>￥{market_price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    overflow: "hidden",
    backgroundColor: "#fff",
    width: itemWidth,
    marginTop: 0,
    borderRadius: 0
  },
  img: {
    width: itemWidth,
    height: itemWidth
  },
  bot: {
    paddingHorizontal: 10
  },
  bot1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  title: {
    marginVertical: 15,
    color: "#333",
    fontSize: 15,
    fontFamily: "PingFangSC-Regular",
    fontWeight: "400",
    lineHeight: 20
  },
  vip: {
    marginRight: 6,
    width: 16,
    height: 16
  },
  price: {
    marginRight: 15,
    fontSize: 15,
    color: ThemeStyle.PriceColor
  },
  market_price: {
    // textDecorationLine: "line-through",
    fontSize: 13,
    color: "#2C2C2C"
  }
});
