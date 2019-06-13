import React, { Component } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { windowWidth } from "../../../utils/style";
import { NetworkImage } from "../../../components/theme";
import PriceView from "../../../components/category/PriceView";

const itemWidth = (windowWidth - 10 - 2 * 10) / 2;

export default class GoodsItemView extends Component {
  render() {
    let {
      data: { productName, midPic, originalPrice, crownPrice },
      index,
      onPress
    } = this.props;
    return (
      <TouchableOpacity
        style={{
          width: itemWidth,
          backgroundColor: "white",
          marginBottom: 12,
          paddingBottom: 14,
          overflow: "hidden",
          marginLeft: index % 2 === 0 ? 0 : 12
        }}
        activeOpacity={0.7} //点击时的透明度
        onPress={onPress}
      >
        <NetworkImage
          source={{ uri: midPic }}
          style={{ width: itemWidth, height: itemWidth }}
        />
        <Text
          style={{
            color: "#2C2C2C",
            marginRight: 10,
            marginLeft: 10,
            textAlign: "left",
            marginTop: 20,
            fontSize: 14
          }}
          numberOfLines={2}
        >
          {productName}
        </Text>
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 14,
            marginTop: 14,
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: 15,
              height: 15,
              resizeMode: "stretch",
              backgroundColor: "#D9A371"
            }}
          />
          <PriceView
            style={{
              marginLeft: 5
            }}
            price={crownPrice}
            color={"#E0324A"}
            discount={false}
            priceSize={15}
            priceTagSize={15}
          />
          <PriceView
            style={{
              marginLeft: 10
            }}
            price={originalPrice}
            color={"#2C2C2C"}
            discount={false}
            priceSize={13}
            priceTagSize={13}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
