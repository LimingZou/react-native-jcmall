import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Icon from "../../../config/iconFont";

export default class GetBeanItem extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    time: "",
    detail: "",
    content: ""
  };

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    style: ViewPropTypes.style,
    time: PropTypes.string,
    detail: PropTypes.string
  };

  render() {
    let { style, title, onPress, time, detail, content } = this.props;
    return (
      <View
        style={{
          height: 148,
          width: windowWidth - 30,
          marginTop: 15,
          borderRadius: 10,
          backgroundColor: "#fff",
          marginLeft: 15
        }}
      >
        <Text
          style={{ color: "#000", fontSize: 15, margin: 20 }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#333333",
            fontSize: 13,
            marginLeft: 20,
            marginRight: 62
          }}
          numberOfLines={2}
        >
          {content}
        </Text>
        <View
          style={{
            height: 1,
            width: windowWidth - 70,
            marginLeft: 20,
            backgroundColor: "#D9D9D9",
            marginTop: 15
          }}
        />
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <View
            style={{
              height: 30,
              width: 80,
              backgroundColor: "#E0324A",
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              marginRight: 15
            }}
          >
            <TouchableOpacity onPress={onPress}>
              <Text style={{ color: "#fff", fontSize: 12 }}>立即前往</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    height: 68,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1
  },
  leftTitle: {
    width: windowWidth / 2,
    height: 68,
    // justifyContent:'space-around',
    marginLeft: 15
  },
  titleTime: {
    color: "#7F7F7F",
    fontSize: 12,
    marginTop: 15
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginTop: 16
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 16
  },
  addFont: {
    color: "#E0324A",
    fontSize: 17
  }
});
