import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { View } from 'react-native-animatable';
import {
  ThemeStyle,
  windowWidth,
  FontStyle,
  PublicStylesString
} from "../../utils/style";
import PropTypes from "prop-types";
import { NetworkImage } from "../theme";
import { formatMoney } from "../../utils/function";

const itemWidth = (windowWidth - 10 * 3) / 2;

export const Type = {
  n : 'normal', // 默认/会员福利/主创区
  f : 'fullbean', // 全豆
  h : 'halfbean', // 半豆
  s : 'specials', // 新人特惠
}
export default class GoodsItem extends Component {
  static defaultProps = {
    type:Type.n
  };

  static propTypes = {
    type: PropTypes.string
  };
  // state={
  //   imgHeight:itemWidth
  // }

  // componentDidMount(){
  //   const { data:{img:{url} } }= this.props;
  //   Image.getSize(url,(width,height) => {
  //     height = itemWidth * height / width;
  //     this.setState({imgHeight:height})
  //   })
  // }

  render() {
    const {
      data: {
        img: { url },
        title,
        price,
        market_price,
        jisu_price
      },
      index,
      onPress,
      style,
      type
    } = this.props;
    // const { imgHeight } = this.state;
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
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
          style={[
            styles.img,
            {
              width: itemWidth,
              height: itemWidth
            }
          ]}
          source={{ uri: url }}
        />
        <View animation="fadeIn" duration={400} delay={100} style={styles.bot}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.bot1}>
            {type === Type.n?(
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image
                  style={styles.vip}
                  source={require("../../images/home/sy_hyj.png")}
                />
                <Text style={styles.price}>{formatMoney(price)}</Text>
              </View>
            ):null}
            {type === Type.h?(
              <Text style={styles.price}>{formatMoney(price)}+{jisu_price}豆</Text>
            ):type === Type.f?(
              <Text style={[styles.price, {fontSize:15}]}>
                {jisu_price}
                <Text style={[styles.price, {fontSize:12}]}>豆</Text>
              </Text>
            ):null}
            {type === Type.s?(
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.price}>{formatMoney(price)}</Text>
                <ImageBackground
                  resizeMode="stretch"
                  style={styles.priceTag}
                  source={require("../../images/specialOffer/xrzx.png")}>
                  <Text style={styles.tagText}>新人专享</Text>
                </ImageBackground>
              </View>
            ):null}
            <Text style={styles.market_price}>{formatMoney(market_price)}</Text>
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
    marginTop: 12,
    borderRadius: 5,
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
    justifyContent:'space-between',
    alignItems: "flex-end",
    marginBottom: 15
  },
  title: {
    marginVertical: 10,
    color: "#333",
    fontSize: 15,
    fontFamily: FontStyle.PingFangSC_R,
    fontWeight: "400",
    lineHeight: 20
  },
  vip: {
    marginRight: 6,
    width: 16,
    height: 16
  },
  price: {
    fontSize: 12,
    color: ThemeStyle.PriceColor,
    fontFamily:FontStyle.PingFangSC_R,
    fontWeight:"bold"
  },
  market_price: {
    textDecorationLine: "line-through",
    fontSize: 10,
    fontFamily:FontStyle.PingFangSC_R,
    fontWeight: "400",
    color: "#999"
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
  }
});
