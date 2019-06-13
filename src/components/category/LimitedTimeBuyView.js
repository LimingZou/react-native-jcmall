import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground
} from "react-native";
import PriceView from "./PriceView";
import CountDown from "../@jcmall/countDown";

export default class LimitedTimeBuyView extends Component {
  render() {
    const { originalPrice, crownPrice, until } = this.props || {};
    return (
      <View style={styles.container}>
        <View style={styles.priceView}>
          <Image
            style={{ width: 85, height: 39, marginLeft: 7 }}
            source={require("../../images/goodsDetail/xsg.png")}
          />
          <View style={{ marginLeft: 12 }}>
            <PriceView
              style={{marginTop: -4 }}
              price={crownPrice}
              color={"white"}
              discount={false}
              priceSize={24}
              priceTagSize={15}
            />
            <PriceView
              style={{ marginTop: -2 }}
              price={originalPrice}
              color={"white"}
              discount={true}
              priceSize={12}
              priceTagSize={12}
            />
          </View>
        </View>
        <View style={styles.countDownView}>
          <Text style={{ fontSize: 10, color: "#333333" }}>距离结束还有</Text>
          <CountDown
            style={{ marginLeft: -6 }}
            until={until}
            onFinish={() => {}}
            digitStyle={{
              width: 20,
              height: 20,
              backgroundColor: "#333333",
              borderRadius: 3
            }}
            digitTxtStyle={{ color: "#ffffff", fontSize: 10 }}
            separatorStyle={{ color: "#333333" }}
            timeToShow={["H", "M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: "row",
    alignItems: "center"
  },
  priceView: {
    flex: 1,
    height: 55,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#FD3E43"
  },
  countDownView: {
    width: 100,
    height: 55,
    paddingLeft: 15,
    paddingTop: 11,
    backgroundColor: "#FFE7A5"
  },
  time: {
    color: "#fff",
    fontSize: 10
  },
  //冒号
  colon: {
    fontSize: 15,
    color: "#333333",
    textAlign: "center"
  },
  tip: {
    color: "#333333",
    textAlign: "center",
    fontSize: 15
  },
  digit: {
    width: 20,
    height: 20,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333"
  }
});
