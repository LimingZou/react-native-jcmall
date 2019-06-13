import React, { Component } from "react";
import { StyleSheet, View, Text, Easing, Animated } from "react-native";

import CartCheckbox from "../../components/cart/checkbox";
import Button from "../../components/theme/button";
import PropTypes from "prop-types";
import { ThemeStyle } from "../../utils/style";
import { formatMoney } from "../../utils/function";

export default class Bottom extends Component {

  static propTypes = {
    onAllChecked: PropTypes.func,
    onRemove: PropTypes.func,
    onSettle: PropTypes.func,
    totalNum: PropTypes.number,
    total: PropTypes.number,
    selected: PropTypes.bool
  };

  static defaultProps = {
    onAllChecked: () => {},
    onRemove: () => {},
    onSettle: () => {},
    totalNum: 0,
    total: 0,
    selected: false
  };

  constructor(props){
    super(props);
    this.state = {
      edit:false,
      translateYValue: new Animated.Value(0)
    }
  }

  setEdit(state){
    this.setState({
      edit:state
    },()=>{
      this.startAnimation();
    })
  }

  startAnimation() {
    this.state.translateYValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.state.translateYValue, {
        toValue: -styles.footer.height,
        duration: 250,
        easing: Easing.linear
      }),
      Animated.timing(this.state.translateYValue, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear
      })
    ]).start(() => {});
  }

  render() {
    const {
      edit,
      translateYValue
    } = this.state;
    const {
      onAllChecked,
      onRemove,
      onSettle,
      totalNum,
      selected,
      total
    } = this.props;
    const colors = totalNum > 0 ? ["#fe6c5a", "#fd363b"] : ["#d4d4d4", "#d4d4d4"];
    const locations = totalNum > 0 ? [0, 1] : [0, 1];
    return (
      <Animated.View style={[styles.footer, { marginBottom: translateYValue }]}>
        <View style={styles.footerLeft}>
          <View style={styles.footerAllAction}>
            <CartCheckbox
              checked={selected}
              onClick={() => {
                onAllChecked && onAllChecked();
              }}
            />
            <Text style={styles.footerAllActionText}>全选</Text>
          </View>
        </View>
        <View style={styles.footerRight}>
          {!edit ? (
            <View style={styles.footerTotal}>
              <Text style={styles.footerTotalText}>合计：
                <Text style={styles.footerTotalPrice}>{formatMoney(total)}</Text>
              </Text>
            </View>
          ) : null}
          <Button
            style={{
              marginLeft: 10,
              width: 110,
              height: styles.footer.height,
              borderRadius: 0,
              borderWidth: 0
            }}
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={locations}
            onClick={() => {
              edit ? (totalNum > 0 && onRemove && onRemove()) : (totalNum > 0 && onSettle && onSettle());
            }}
          >
            <Text style={{ fontSize: 15, color: "#fff" }}>
              {`${edit ? "移除" : "结算"}${totalNum > 0 ? `(${totalNum}件)` : ""}`}
            </Text>
          </Button>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    backgroundColor: "#FFF"
  },
  footerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15
  },
  footerRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  footerAllAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerAllActionText: {
    marginRight: 20,
    marginLeft: 5,
    fontSize: 14,
    color: "#7F7F7F"
  },
  footerTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerTotalText: {
    fontSize: 14,
    color: "#999"
  },
  footerTotalPrice: {
    fontSize: 14,
    color: ThemeStyle.ThemeColor
  }
});
