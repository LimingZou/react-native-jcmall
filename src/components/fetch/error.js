import React, { Component } from "react";
import { windowWidth } from "../../utils/style";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";

export default class FetchError extends Component {
  static propTypes = {
    height: PropTypes.number,
    autoLayout: PropTypes.bool
  };
  static defaultProps = {
    height: windowWidth * 0.4,
    autoLayout: false
  };
  render() {
    const { autoLayout, height } = this.props;
    return (
      <View
        style={Object.assign(
          {},
          styles.loaddingView,
          autoLayout
            ? {
                flex: 1
              }
            : {
                height
              }
        )}
      >
        <Image
          source={require("../../images/fetchStatus/error.png")}
          resizeMode={"contain"}
          style={Object.assign(
            {},
            styles.loaddingImage,
            autoLayout
              ? {
                  width: windowWidth * 0.5
                }
              : {
                  height: height,
                  width: height
                }
          )}
        />
        <Text style={{ color: "#999" }}>网络出错了，刷新试试</Text>
      </View>
    );
  }
}

const styles = {
  loaddingView: {
    justifyContent: "center",
    alignItems: "center"
  },
  loaddingImage: {}
};
