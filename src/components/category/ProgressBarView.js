import React, { Element, Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";

type PropsType = {
  count?: number,
  progress?: number,
  pbWidth?: number,
  pbHeight?: number,
  borderWidth?: number,
  color?: string,
  unfilledColor?: string,
  fontSize?: number,
  textColor?: string,
  style?: any
};

export default class ProgressBarView extends Component {
  props: PropsType;
  render() {
    const {
      count,
      progress,
      pbWidth,
      pbHeight,
      borderWidth,
      color,
      unfilledColor,
      fontSize,
      textColor,
      style
    } = this.props || {};
    return (
      <View style={[style, styles.container]}>
        <Progress.Bar
          progress={progress}
          width={pbWidth}
          height={pbHeight}
          color={color}
          borderWidth={borderWidth}
          unfilledColor={unfilledColor}
        />
        <Text style={{ fontSize: fontSize, color: textColor }}>
          {count === 0 ? "已售罄" : `仅剩${count}件`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
