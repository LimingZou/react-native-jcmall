import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image,
  ImageBackground
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth, ThemeStyle } from "../../../utils/style";
import Icon from "../../../config/iconFont";

export default class CouponItem extends Component {
  static defaultProps = {
    onPress: () => {},
    children: null,
    style: {},
    titleStyle: {},
    linearGradientStyle: {},
    colors: [],
    money: "",
    moneyoff: "",
    time: "",
    describe: "",
    type: 0,
    showUseButton: false,
    typedescribe: ""
  };

  static propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    colors: PropTypes.array,
    money: PropTypes.number,
    moneyoff: PropTypes.string,
    time: PropTypes.string,
    describe: PropTypes.string,
    showUseButton: PropTypes.bool,
    type: PropTypes.number,
    typedescribe: PropTypes.string
  };

  showBottomImage(describe, type) {
    //   alert(type)
    if (type && type == 0) {
      return (
        <ImageBackground
          source={require("../../../images/mine/yhq-hbl.png")}
          style={{ width: windowWidth - 30, height: 38,position:'absolute',bottom:0}}
        >
          <Text style={styles.bottomView}>
            {describe}
          </Text>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={require("../../../images/mine/yhq-hbl2.png")}
          style={{ width: windowWidth - 30, height: 38,position:'absolute',bottom:0}}
        >
         <Text style={styles.bottomView}>
            {describe}
          </Text>
        </ImageBackground>
      );
    }
  }

  render() {
    let {
      style,
      onPress,
      colors,
      money,
      moneyoff,
      time,
      describe,
      showUseButton,
      type,
      typedescribe
    } = this.props;
    let moneyFlex = 1
    let moneyFontSize = 30
    if(money>1000){
      moneyFlex= 1.5
      moneyFontSize = 20
    }
    return (
      <LinearGradient
        style={{
          height: 125,
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 4,
          marginTop: 10,
        }}
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          style={{ width: windowWidth - 30, height: 97, flexDirection: "row" }}
        >
          <View
            style={{
              flex: moneyFlex,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={{ color: "#fff", fontSize: moneyFontSize }}>{money}</Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                marginTop: 5,
                marginLeft: 5
              }}
            >
              元
            </Text>
          </View>
          
          <View style={{ flex: 1.6, justifyContent: "center" }}>
            <Text style={{ color: "#fff", fontSize: 15 }}>{moneyoff}</Text>
            <Text style={{ color: "#fff", fontSize: 12, marginTop: 5 }}>
              {time} {typedescribe}
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {showUseButton ? (
              <TouchableOpacity
                style={{
                  width: 63,
                  height: 24,
                  backgroundColor: "#FFF5F6",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4
                }}
                onPress={onPress}
              >
                <Text style={{ color: ThemeStyle.PriceColor, fontSize: 13 }}>
                  去使用
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {this.showBottomImage(describe, type)}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  bottomView:{
    color: "#fff",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 9
  }
});
