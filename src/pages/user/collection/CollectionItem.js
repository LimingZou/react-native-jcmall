import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import CartCheckbox from "../../../components/cart/checkbox";
import { NetworkImage } from "../../../components/theme";

export default class CollectionItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked || false,
      title: props.title || "",
      spec: props.spec || "",
      price: props.price || 0,
      number: props.number || 1,
      cover: props.cover || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  onCheckboxClick = () => {
    if (this.props.disabled) {
      return;
    }
    const checked = !this.state.checked;
    if (!(typeof this.props.checked === true)) {
      this.setState({
        checked
      });
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

  render() {
    const checked = this.state.checked;
    const { title, price, spec, edit, cover } = this.props;
    return (
      <View style={styles.cartCardItem}>
        {edit ? (
          <CartCheckbox
            onClick={this.onCheckboxClick}
            checked={checked}
            style={styles.cartCardCheck}
          />
        ) : null}
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
              <Text style={styles.cartCardPrice}>¥ {price}</Text>
            </View>
          </View>
        </View>
      </View>
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
    alignItems: "flex-end"
  },
  cartCardPrice: {
    color: "#333333",
    fontSize: 14,
    fontFamily: "PingFangSC-Regular"
  },
  cartCardStepper: {
    width: 100
  }
});
