import React, { Component } from "react";
import { View } from "react-native";
import Placeholder from "../../../../components/@jcmall/placeholder";

export default class FetchLoading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Placeholder.Line
          style={{ borderRadius: 0, marginBottom: 5 }}
          textSize={18}
          animate={"shine"}
          width={"80%"}
        />
        <Placeholder.Line
          style={{ borderRadius: 0, marginBottom: 10 }}
          textSize={13}
          animate={"shine"}
          width={"60%"}
        />
        <Placeholder.Box
          style={{
            width: "100%",
            height: "88%"
          }}
          radius={5}
          animate={"fade"}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10
  },
  loaddingImage: {}
};
