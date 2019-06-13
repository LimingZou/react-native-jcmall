/**
 * Created by k186 on 2019-03-12.
 */
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

type PropsType = {
  style?: any
};

export default class LogisticsItem extends Component {
  props: PropsType;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style, data, index, length } = this.props;
    let backgroundColor = index === 0 ? "#E0324A" : "#D9D9D9";
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: backgroundColor
              }}
            />
            {length - 1 === index ? null : (
              <View
                style={{ width: 1, height: 70, backgroundColor: "#D9D9D9" }}
              />
            )}
          </View>
          <View style={{ flexDirection: "column", marginLeft: 15 }}>
            <Text style={{ fontSize: 12, color: "#7F7F7F" }}>{data.time}</Text>
            <Text style={{ fontSize: 13, marginTop: 5, color: "#333333" }}>
              {data.context}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: "white"
  }
});
