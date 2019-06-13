/**
 * 底部tab指示的swipe
 */
import React, { Component } from "react";
import { TouchableWithoutFeedback, Text, View, Image } from "react-native";
import Swiper from "react-native-swiper";
import Button from "./Button";
import { NetworkImage } from "../../theme";

type PropsType = {
  onPress?: () => void,
  pics?: Array<string>,
  autoplayTimeout?: number,
  loop?: boolean,
  autoplay?: boolean,
  style?: any,
  imageStyle?: any,
  paginationStyle?: any,
  selectView?: any,
  unselectView?: any
};

export default class TabSwiper extends Component {
  props: PropsType;

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
      imageStyle,
      selectView,
      unselectView,
    } = this.props || {};
    return (
      <View style={style}>
        <Swiper
          loop={loop}
          index={0}
          showsPagination={true}
          dot={unselectView}
          activeDot={selectView}
          autoplay={autoplay}
          removeClippedSubviews={false}
          autoplayTimeout={autoplayTimeout}
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
                {this._renderImage(item,imageStyle)}
              </TouchableWithoutFeedback>
            );
          })}
        </Swiper>
      </View>
    );
  }

  _renderImage = (item,imageStyle) => {
    if (typeof (item) == 'string') {
      return (
        <NetworkImage style={imageStyle} source={{ uri: item }} />
      );
    } else {
      return (
        <Image style={imageStyle} source={item } />
      );
    }



  }
}
