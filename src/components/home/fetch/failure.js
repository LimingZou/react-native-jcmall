import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "../../../config/iconFont";

export default class FetchFailure extends Component {
  render() {
    const { autoLayout, height, refresh } = this.props;
    return (
      <TouchableOpacity
        style={Object.assign(
          {},
          styles.failureView,
          autoLayout
            ? {
                flex: 1
              }
            : {
                height
              }
        )}
        activeOpacity={0.5}
        onPress={() => {
          refresh && refresh();
        }}
      >
        <Text style={{ color: "#676767", fontSize: 15 }}>网络走丢了~</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <Icon name={"shuaxin"} size={15} color={"#999"} />
          <Text style={{ color: "#999", marginLeft: 5 }}>点击重新刷新</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  failureView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
};
