import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Button from "../category/Button";
import PriceView from "../category/PriceView";

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      received: false
    };
  }

  render() {
    const {
      item: { received, money, total, message, endDate },
      receive
    } = this.props;
    return (
      <ImageBackground
        resizeMode="stretch"
        style={{
          width: "100%",
          height: 95,
          marginVertical: 7
        }}
        source={require("../../images/goodsDetail/yhqbg.png")}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 18,
            paddingRight: 11
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <PriceView
                price={money}
                color={"#EE2A45"}
                discount={false}
                priceSize={30}
                priceTagSize={15}
              />
              <Button
                style={{
                  width: 76,
                  height: 25,
                  borderRadius: 25,
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(238,42,69,0.1)"
                }}
                title={`满${total}使用`}
                titleStyle={{ fontSize: 12, color: "#EE2A45" }}
                onPress={() => {}}
              />
            </View>
            <Text style={{ fontSize: 12, color: "#595959" }}>{message}</Text>
            <Text style={{ fontSize: 12, color: "#595959" }}>{endDate}</Text>
          </View>
          {this.state.received ? (
            <Image
              resizeMode="contain"
              style={{
                height: 78,
                width: 78,
                position: "absolute",
                top: -10,
                right: -10
              }}
              source={require("../../images/goodsDetail/ylingqu.png")}
            />
          ) : (
            <Button
              style={{
                width: 66,
                height: 25,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EE2A45"
              }}
              title={"立即领取"}
              titleStyle={{ fontSize: 12, color: "white" }}
              onPress={() => {
                receive;
                this.setState({ received: true });
              }}
            />
          )}
        </View>
      </ImageBackground>
    );
  }
}
