import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "../../config/iconFont";

export default class PageGoodsSearch extends Component {
  render() {
    const { goGoodsList } = this.props;
    return (
      <TouchableOpacity
        style={[styles.warp, { backgroundColor: "rgba(51, 51, 51, 0.2)" }]}
        activeOpacity={0.8}
        onPress={goGoodsList}
      >
        <View style={[styles.inputView]}>
          <Icon name={"-search"} size={15} color={"#fff"} />
          <View style={styles.input}>
            <Text style={{ color: "#fff" }}>{"搜索商品"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  warp: {
    flex: 1,
    borderRadius: 5
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "flex-start"
  },
  img: {
    marginRight: 10
  },
  input: {
    marginLeft: 5,
    height: 32,
    justifyContent: "center",
    paddingVertical: 0
  }
});
