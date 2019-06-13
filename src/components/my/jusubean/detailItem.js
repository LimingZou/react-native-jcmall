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

export default class DetailItem extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    time: "",
    detail: ""
  };

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    time: PropTypes.string,
    detail: PropTypes.string,
    fontStyle: PropTypes.style,
    key: PropTypes.string
  };

  render() {
    let { style, title, onPress, time, detail, fontStyle,key} = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress} key={key} activeOpacity={1}>
        <View style={styles.item}>
          <View style={styles.leftTitle}>
            <Text style={styles.titleFont}>{title}</Text>
            <Text style={styles.titleTime}>{time}</Text>
          </View>
          <View style={styles.rightButton}>
            <Text style={[styles.addFont, fontStyle]}>
              {detail}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.5
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
