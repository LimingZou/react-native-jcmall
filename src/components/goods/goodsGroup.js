import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View
} from "react-native";
import {
  ThemeStyle,
  windowWidth,
  FontStyle,
  PublicStylesString
} from "../../utils/style";
import { NetworkImage } from "../theme";
import { formatMoney } from "../../utils/function";

const itemWidth = (windowWidth - 40 - 3*10)/3;

export default class goodsGroup extends Component {
  render() {
    const {
      data: {
        img: { url },
        price,
        market_price,
        title
      },
      onPress,
      options
    } = this.props;
    const { layout_style } = options;
    return layout_style === 1
      ? this.small({ url, price, market_price, title, onPress })
      : this.big({ url, price, market_price, title, onPress });
  }

  small({ url, price, market_price, title, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[
          styles.item,
          {
            padding: 10,
            borderRadius: 5,
            overflow: "hidden",
            backgroundColor: "#fdc8c7"
          }
        ]}
      >
        <NetworkImage
          style={[
            styles.img,
            {
              width: styles.img.height - 20,
              height: styles.img.height - 20,
              backgroundColor: "#fff0ee",
              borderRadius: 5
            }
          ]}
          source={{ uri: url }}
        />
        <ImageBackground
          source={require("../../images/home/shelters.png")}
          style={{
            height: itemWidth / 2,
            width: itemWidth,
            position: "absolute",
            bottom: 0,
            justifyContent: "flex-end",
            paddingHorizontal: 5
          }}
        >
          <Text style={[styles.title, { color: "#fff" }]} numberOfLines={2}>
            {`${title.substring(0, 10)}  ${formatMoney(price)}`}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  big({ url, price, market_price, title, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.item]}
      >
        <NetworkImage style={styles.img} source={{ uri: url }} />
        <View style={styles.bot}>
          <Text
            style={[styles.title, { textAlign: "center" }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={styles.bot1}>
            <Text style={styles.price}>{formatMoney(price)}</Text>
            <Text style={styles.market_price}>{formatMoney(market_price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: itemWidth
    // borderWidth: 1,
    // borderColor: "#e2e2e2"
  },
  img: {
    width: itemWidth,
    height: itemWidth
  },
  bot: {
    backgroundColor: "#fff",
    paddingHorizontal: 5
  },
  bot1: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  title: {
    marginVertical: 5,
    color: "#2C2C2C",
    fontSize: 12,
    fontFamily: FontStyle.PingFangSC_R,
    fontWeight: "400",
    lineHeight: 15
  },
  price: {
    fontSize: 14,
    color: ThemeStyle.PriceColor
  },
  market_price: {
    textDecorationLine: "line-through",
    fontSize: 10,
    color: "#727272"
  }
});
