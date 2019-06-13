import React, { Component } from "react";
import { View } from "react-native";
import Placeholder from "../../../components/@jcmall/placeholder";
import { windowWidth } from "../../../utils/style";

export default class FetchLoading extends Component {
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
        <Placeholder.Box
          animate={"fade"}
          width={windowWidth}
          height={height}
          onReady={false}
        />
      </View>
    );
  }
}

const styles = {
  loaddingView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  loaddingImage: {}
};
