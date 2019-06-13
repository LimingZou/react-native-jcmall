import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import {
  ThemeStyle,
  windowWidth,
  FontStyle,
  PublicStylesString
} from "../../../utils/style";
import { NetworkImage } from "../../theme";

export default class SpecialofferItem extends Component {
  render() {
    const { data, index, onPress, style } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.item,
          style,
          {
            marginLeft: index % 2 === 0 ? 10 : 0
          }
        ]}
      >
        <NetworkImage
          roundAsCircle={true}
          style={styles.img}
          source={{ uri: data.midPic }}
        />
        <View style={styles.bot}>
          <Text style={styles.title} numberOfLines={2}>
            {data.productName}
          </Text>
          <View style={styles.bot1}>
            <Image
              style={styles.vip}
              source={require("../../../images/home/sy_hyj.png")}
            />
            <Text style={styles.price}>￥{data.crownPrice}</Text>
            <Text style={styles.market_price}>￥{data.originalPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const itemWidth = (windowWidth - 10 - 2 * 10) / 2;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    width: itemWidth,
    marginTop: 12,
    marginRight: 10
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
    color: PublicStylesString.BlackColor,
    fontSize: 15,
    fontFamily: FontStyle.PingFangSC_R,
    fontWeight: "400",
    lineHeight: 20
  },
  vip: {
    width: 15,
    height: 15,
  },
  price: {
    fontSize: 15,
    color: ThemeStyle.PriceColor,
    marginLeft:-5
  },
  market_price: {
    // textDecorationLine: "line-through",
    fontSize: 13,
    color: '#2C2C2C',
    marginLeft:18
  },
  vip: {
    marginRight: 6,
    width: 16,
    height: 16
  },
});
