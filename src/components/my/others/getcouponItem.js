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
import DateUtil from "../../../pages/user/setUp/DateUtil";

export default class CetCouponItem extends Component {
  static defaultProps = {
    onPress: () => {},
    children: null,
    style: {},
    money: "",
    moneyoff: "",
    time: "",
    describe: "",
    type: 0,
    // typedescribe: ""
  };

  static propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    moneyoff: PropTypes.string,
    time: PropTypes.string,
    describe: PropTypes.string,
    type: PropTypes.number,
    typedescribe: PropTypes.string
  };

  rightTopView(type) {
    const { onPress } = this.props;
    if (type == 1) {
      return (
        <TouchableOpacity
          style={{
            width: 65,
            height: 25,
            backgroundColor: "#FFF5F6",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            position: "absolute",
            top: 35,
            right: 25
          }}
          onPress={() => {
            this.props.getCoupon(type);
          }}
        >
          <Text style={{ color: ThemeStyle.PriceColor, fontSize: 13 }}>
            立即领取
          </Text>
        </TouchableOpacity>
      );
    } else if (type == 2) {
      return (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 35,
            right: 25
          }}
          // onPress={() => {
          //   this.props.getCoupon(type);
          // }}
        >
          <LinearGradient
            style={styles.couponView}
            colors={["#FD3D42", "#FE7E69"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: "#fff", fontSize: 13 }}>立即使用</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={{ position: "absolute", top: 35, right: 5 }}>
          <Text style={{ color: "#fff", fontSize: 12, letterSpacing: 10 }}>
            领券倒计时
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={styles.daojishi}
            >
              <Text style={{ color: "#fff", fontSize: 13 }}>00</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 13, marginTop: 5 }}>:</Text>
            <View
              style={styles.timeView}>
              <Text style={{ color: "#fff", fontSize: 13 }}>00</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 13, marginTop: 5 }}>:</Text>
            <View
              style={styles.daojishi}
            >
              <Text style={{ color: "#fff", fontSize: 13 }}>00</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    let {
      style,
      onPress,
      moneyoff,
      time,
      describe,
      typedescribe,
      startTime,
      endTime,
      sendStartTime,
      sendEndTime,
    } = this.props;
    let type;
    let currentDate = parseInt(new Date().getTime())
    if (currentDate>sendStartTime&&currentDate<sendEndTime) {
      type=1
    }else {
      type=3
    }
    let startTime1=DateUtil.formatDate(startTime, "yyyy.MM.dd")
    let endTime1=DateUtil.formatDate(endTime, "yyyy.MM.dd")
    time=startTime1+'~'+endTime1
    return (
      <LinearGradient
        style={styles.itemStyle}
        colors={["#FD3D42", "#FE7E69"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          style={{ width: windowWidth - 30, height: 97, flexDirection: "row" }}
        >
          <View style={{ flex: 2, marginLeft: 26 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                marginTop: 27
              }}
            >
              {moneyoff}
            </Text>
            <Text style={{ color: "#fff", fontSize: 12, marginTop: 15 }}>
              {'有效期：'+time}
            </Text>
            <Text style={{ color: "#fff", fontSize: 12, marginTop: 10 }}>
               {typedescribe}
            </Text>
          </View>
        </View>
        {this.rightTopView(type)}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle:{
    width: windowWidth - 30,
    height: 125,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 4
  },
  timeView:{
    width: 20,
    height: 20,
    backgroundColor: "#535353",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  daojishi:{
    width: 20,
    height: 20,
    backgroundColor: "#535353",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  couponView:{
    width: 65,
    height: 25,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "#fff",
    borderWidth: 1
  }
});
