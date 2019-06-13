import React, { Component } from "react";
import { View, Text } from "react-native";

export default class FetchNullData extends Component {
  render() {
    const { autoLayout, height } = this.props;
    return (
      <View
        style={Object.assign(
          {},
          styles.nullView,
          autoLayout
            ? {
                flex: 1
              }
            : {
                height
              }
        )}
      >
        <Text style={{ color: "#999" }}>暂无数据</Text>
      </View>
    );
  }
}

const styles = {
  nullView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
};
