import React, { Component } from "react";
import { TouchableWithoutFeedback, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import Button from "./Button";
import { NetworkImage } from "../../components/theme";

type PropsType = {
  onPress?: () => void,
  pics?: Array<string>,
  autoplayTimeout?: number,
  loop?: boolean,
  autoplay?: boolean,
  style?: any,
  imageStyle?: any,
  paginationStyle?: any,
  titleStyle?: any
};

export default class NumberSwiper extends Component {
  props: PropsType;

  renderPagination = (index, total) => {
    return (
      <View style={this.props.paginationStyle}>
        <Text style={this.props.titleStyle}>{index + 1 + "/" + total}</Text>
      </View>
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "pics"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }


  render() {
    const {
      onPress,
      pics,
      autoplayTimeout,
      loop,
      autoplay,
      style,
      imageStyle
    } = this.props || {};
    return (
      <View style={style}>
        <Swiper
          loop={loop}
          autoplay={autoplay}
          removeClippedSubviews={false}
          autoplayTimeout={autoplayTimeout}
          renderPagination={this.renderPagination}
        >
          {pics.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                key={index}
                onPress={() => (onPress ? onPress(index) : {})}
              >
                <NetworkImage style={imageStyle} source={{ uri: item }} />
              </TouchableWithoutFeedback>
            );
          })}
        </Swiper>
      </View>
    );
  }
}
