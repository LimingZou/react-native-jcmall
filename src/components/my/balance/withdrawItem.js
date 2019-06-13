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

export default class WithDraw extends Component {
  static defaultProps = {
    onPress: () => {},
    children: null,
    style: {},
    titleStyle: {},
    linearGradientStyle: {},
    colors: [],
    bankName: "",
    bankNum: "",
    bankIcon: null,
    backColor: ""
  };

  static propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    colors: PropTypes.array,
    bankName: PropTypes.string,
    bankNum: PropTypes.string,
    bankIcon: PropTypes.element,
    backColor: ""
  };

  render() {
    let {
      style,
      onPress,
      colors,
      bankName,
      bankNum,
      bankIcon,
      backColor
    } = this.props;
    return (
      <LinearGradient
        style={{
          width: windowWidth - 30,
          height: 100,
          borderRadius: 10,
          margin: 15
        }}
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          style={{ width: windowWidth - 30, height: 100, flexDirection: "row" }}
        >
          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {bankIcon}
          </View>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text style={{ color: "#FBFBFB", fontSize: 15 }}>{bankName}</Text>

            <Text style={{ color: "#FBFBFB", fontSize: 13, marginTop: 10 }}>
              {bankNum}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.8,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={onPress}
          >
            <Icon name={"-arrow-right"} size={20} color={backColor} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({});
