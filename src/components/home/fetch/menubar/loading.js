import React, { Component } from "react";
import { View } from "react-native";
import Placeholder from "../../../@jcmall/placeholder/index";
import HorizontalWindow from "../../../page/horizontalWindow";

export default class FetchLoading extends Component {
  render() {
    return (
      <HorizontalWindow
        debug={false}
        style={{
          backgroundColor: "#fff"
        }}
        windowSpacingHorizontal={20}
        data={{ data: _.fill(Array(16), 0) }}
        rows={2}
        eachRowDisplay={5}
        renderItem={() => (
          <View style={styles.item}>
            <Placeholder.Box
              animate={"shine"}
              width={40}
              height={40}
              radius={20}
            />
            <View style={{ marginTop: 5 }}>
              <Placeholder.Line
                style={{ borderRadius: 0 }}
                animate={"shine"}
                width={50}
              />
            </View>
          </View>
        )}
      />
    );
  }
}

const styles = {
  loaddingView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  loaddingImage: {},
  item: {
    alignItems: "center",
    justifyContent: "center"
  }
};
