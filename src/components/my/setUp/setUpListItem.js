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

export default class SetUpListItem extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    rightTitle: "",
    children: null,
    style: {},
    titleStyle: {},
    linearGradientStyle: {},
    colors: []
  };

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    rightTitle: PropTypes.string,
    style: ViewPropTypes.style,
    colors: PropTypes.array
  };

  render() {
    let { style, title, rightTitle, onPress } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <View style={styles.item}>
          <View style={styles.leftTitle}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
          <View style={styles.rightButton}>
            <Text style={styles.rightTitleFont}>{rightTitle}</Text>
            <Icon name={"-arrow-right"} size={20} color={"#333333"} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftTitle: {
    width: windowWidth / 2,
    height: 44,
    justifyContent: "center"
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginLeft: 16
  },
  rightTitleFont: {
    color: "#7F7F7F",
    fontSize: 13,
    marginRight: 10
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10
  }
});
