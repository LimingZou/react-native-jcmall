import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import CartCheckbox from "./checkbox";
import { NetworkImage } from "../theme";
import Stepper from "../@jcmall/stepper";
import { SwipeAction } from "antd-mobile-rn";
import { formatMoney } from "../../utils/function";
import Button from "../../components/theme/button";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  onCheckboxClick = (checked) => {
    if (this.props.disabled) {
      return;
    }
    if (this.props.onCheckboxClick) {
      this.props.onCheckboxClick(checked);
    }
  };
  onStepperChange = value => {
    if (this.props.onStepperChange) {
      this.props.onStepperChange(value);
    }
  };
  onImageClick = () => {
    if (this.props.onImageClick) {
      this.props.onImageClick();
    }
  };
  onTitleClick = () => {
    if (this.props.onTitleClick) {
      this.props.onTitleClick();
    }
  };
  delete = () => {
    if (this.props.delete) {
      this.props.delete();
    }
  };

  render() {
    const { title, price, spec, number, cover, checked, other: { hasAllJisuBuy, hasHalfJisuBuy, jisuPrice, effectFlag, inventoryFlag} } = this.props;
    return (
      <SwipeAction
        autoClose
        style={{ backgroundColor: "transparent" }}
        right={[
          {
            text: "删除",
            onPress: () => this.delete(),
            style: { backgroundColor: "red", color: "white" }
          }
        ]}
      >
        <View style={styles.cartCardItem}>
          {effectFlag === 1? (
            <CartCheckbox
              onClick={this.onCheckboxClick}
              checked={checked}
              style={styles.cartCardCheck}
            />
            ):(
            <TouchableOpacity
              style={{
                borderRadius: 8,
                backgroundColor:'#d9d9d9',
                alignItems:'center',
                justifyContent: 'center',
                paddingHorizontal:8,
                height:16
              }}
            >
              <Text style={{ fontSize: 10, color: "#fff" }}>
                失效
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.cartCard}>
            <TouchableOpacity onPress={this.onImageClick} activeOpacity={0.5}>
              <NetworkImage
                style={styles.cartCardImage}
                source={{ uri: cover }}
              />
            </TouchableOpacity>
            <View style={styles.cartCardTitleSpec}>
              <View>
                <TouchableOpacity onPress={this.onTitleClick} activeOpacity={0.5}>
                  <Text style={styles.cartCardTitle} numberOfLines={1}>
                    {title}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.cartCardSpec} numberOfLines={1}>
                  {"规格: " + spec}
                </Text>
              </View>
              <View style={styles.cartCardFooter}>
                {inventoryFlag === 0?(
                  <Text style={{ fontSize: 14, color: "#333333" }}>
                    库存不足
                  </Text>
                ):null}
                {hasHalfJisuBuy === 1 && inventoryFlag === 1? (
                  <Text style={styles.cartCardPrice}>
                    {formatMoney(price)}
                    <Text style={styles.cartCardPrice}>
                      +{jisuPrice}豆
                    </Text>
                  </Text>
                ):null}
                {hasAllJisuBuy === 1 && inventoryFlag === 1? (
                  <Text style={styles.cartCardPrice}>{jisuPrice}豆</Text>
                ):null}
                {hasHalfJisuBuy !== 1 && hasAllJisuBuy !== 1 && inventoryFlag === 1? (
                  <Text style={styles.cartCardPrice}>{formatMoney(price)}</Text>
                ):null}
                <View style={styles.cartCardStepper}>
                  {effectFlag === 1? (
                    <Stepper
                      style={{width: 100}}
                      key="1"
                      defaultValue={1}
                      min={1}
                      max={999}
                      value={number}
                      onChange={this.onStepperChange}
                    />
                  ):(
                    <TouchableOpacity
                      style={{
                        borderColor:'#e0324a',
                        borderWidth: 0.5,
                        alignItems:'center',
                        paddingHorizontal:10,
                        paddingVertical:5
                      }}
                      onPress={this.delete}
                    >
                      <Text style={{ fontSize: 13, color: "#e0324a" }}>
                        清除失效宝贝
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </SwipeAction>
    );
  }
}

const styles = StyleSheet.create({
  cartCardItem: {
    height: 110,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1
  },
  cartCard: {
    flex: 1,
    marginLeft: 15,
    flexDirection: "row"
  },
  cartCardImage: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  cartCardCheck: {
    width: 20,
    height: 20
  },
  cartCardTitleSpec: {
    justifyContent: "space-between",
    flex: 1
  },
  cartCardTitle: {
    color: "#333333",
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "PingFangSC-Regular"
  },
  cartCardSpec: {
    fontSize: 11,
    justifyContent: "space-between",
    color: "#999"
  },
  cartCardSpecCanSkuSelect: {
    alignItems: "center",
    padding: 5
  },
  cartCardSpecText: {
    color: "#999",
    lineHeight: 11,
    height: 11,
    fontSize: 11,
    marginRight: 5
  },
  cartCardPriceSpecImage: {
    width: 6,
    height: 6
  },
  cartCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cartCardPrice: {
    color: "#333333",
    fontSize: 14,
    fontFamily: "PingFangSC-Regular"
  },
  cartCardStepper: {

  }
});
