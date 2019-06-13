import React, { Component } from "react";
import { View } from "react-native";
import Placeholder from "../../../../components/@jcmall/placeholder";

export default class FetchLoading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Placeholder.Box
            style={{
              width: "100%",
              height: "100%"
            }}
            radius={5}
            animate={"fade"}
          />
        </View>
        <View style={{ marginBottom: 5 }}>
          <Placeholder.Line
            style={{ borderRadius: 0, marginBottom: 5 }}
            textSize={18}
            animate={"shine"}
            width={"60%"}
          />
          <Placeholder.Line
            style={{ borderRadius: 0 }}
            textSize={13}
            animate={"shine"}
            width={"40%"}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginLeft: 5,
    marginTop: 5
  },
  imgContainer: {
    position: "absolute",
    width: "60%",
    height: "60%",
    right: 0,
    bottom: 0
  },
  loaddingImage: {}
};
