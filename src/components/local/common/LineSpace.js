import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";

const styles = StyleSheet.create({
  LineView: {
    height: 0.5,
    backgroundColor: "#f2f2f2"
  }
});

function handleStyle(params: {
  top?: number,
  bottom?: number,
  right?: number,
  left?: number
}) {
  const absolute = _.filter(
    Object.values(params),
    (value?: number) => !_.isUndefined(value)
  );
  if (absolute.length >= 3) {
    return {
      position: "absolute",
      ...params
    };
  }
  return null;
}

type Props = {
  style?: any,
  top?: number,
  bottom?: number,
  right?: number,
  left?: number
};

export default function LineSpace(props: Props) {
  const { style, top, bottom, right, left } = props;
  const absolute = handleStyle({
    top,
    bottom,
    right,
    left
  });
  return <View style={[styles.LineView, style, absolute]} />;
}
