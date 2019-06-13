import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View } from "react-native";
import {
  ThemeStyle,
  windowWidth,
  FontStyle,
  PublicStylesString
} from "../../utils/style";
import { NetworkImage } from "../theme";

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
            <Text style={styles.price}>￥{data.crownPrice}</Text>
            <ImageBackground
                resizeMode="stretch"
                style={styles.priceTag}
                source={require("../../images/specialOffer/xrzx.png")}
            >
              <Text style={styles.tagText}>新人专享</Text>
            </ImageBackground>
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
    paddingHorizontal: 6
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
    marginRight: 6,
    width: 15,
    height: 15,
    backgroundColor: "red"
  },
  price: {
    fontSize: 15,
    color: "#E0324A"
  },
  priceTag:{
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 13,
    paddingLeft: 5,
    marginBottom: 5
  },
  tagText: {
    fontSize: 11,
    color: "white"
  },
  market_price: {
    textDecorationLine: "line-through",
    fontSize: 13,
    color: "#999999",
    marginLeft: 14
  }
});
