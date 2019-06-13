import React, { Component } from "react";
import { windowWidth } from "../../../utils/style";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";

export default class FetchNullData extends Component {
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
          source={require("../../../images/cart/empty.png")}
          style={{width:windowWidth/2, height:windowWidth/2}}
        />
        <Text style={styles.emptyText}>未加入商品，再逛逛吧</Text>
      </View>
    );
  }
}

const styles = {
  loaddingView: {
    justifyContent: "center",
    alignItems: "center"
  },
  loaddingImage: {},
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333"
  }
};
