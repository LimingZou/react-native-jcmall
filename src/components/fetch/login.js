import React, { Component } from "react";
import { windowWidth } from "../../utils/style";
import PropTypes from "prop-types";
import { View, Image, AppState } from "react-native";
import { Button } from "antd-mobile-rn";
import LottieView from "lottie-react-native";

export default class FetchLogin extends Component {
  static propTypes = {
    height: PropTypes.number,
    autoLayout: PropTypes.bool
  };
  static defaultProps = {
    height: windowWidth * 0.4,
    autoLayout: false
  };
  componentDidMount() {
    this.animation && this.animation.play();
    AppState.addEventListener("change", e => {
      if (e === "active") {
        this.animation && this.animation.play();
      }
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", e => {});
  }
  render() {
    const { autoLayout, height, pushLogin } = this.props;
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
        <Button
          type={"primary"}
          onClick={() => {
            pushLogin();
          }}
        >
          登录后查看
        </Button>
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
