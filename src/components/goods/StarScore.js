import React, { Component } from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import PropsType from "prop-types";

let { width, height } = Dimensions.get("window");

type Props = {
  selectIndex: PropsType.func
};

export default class StarScore extends Component {
  props: Props;
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      totalScore: 5, // 总分值
      currentScore: 0 // 分值
    };
  }

  render() {
    return <View style={{ flexDirection: "row" }}>{this._renderBody()}</View>;
  }

  _renderBody() {
    let images = [];
    for (let i = 1; i <= this.state.totalScore; i++) {
      let currentCount = i;
      images.push(
        <View key={"i" + i}>
          <TouchableOpacity onPress={i => {this._score(currentCount);}}>
            <Image
              style={{
                width: 20,
                height: 20,
                marginLeft: 3,
                backgroundColor: "#A2A2A2"
              }}
            />
            {this._renderYellowStart(i)}
          </TouchableOpacity>
        </View>
      );
    }
    return images;
  }

  _renderYellowStart(count) {
    if (count <= this.state.currentScore) {
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            marginLeft: 3,
            position: "absolute",
            backgroundColor: "#FE6C00"
          }}
        />
      );
    }
  }

  _score(i) {
    this.setState({
      currentScore: i
    });
    this.props.selectIndex(i);
  }
}
