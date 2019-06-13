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
    data: PropTypes.object
  };

  render() {
    let { style, title, onPress, time, detail, data } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <View
          style={{
            height: 204,
            width: windowWidth,
            backgroundColor: "#fff",
            marginTop: 20
          }}
        >
          <View
            style={{
              height: 40,
              width: windowWidth,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: "#f2f2f2",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
              {data.time}
            </Text>
            <Text style={{ color: "#E0324A", fontSize: 13, marginRight: 15 }}>
              {data.allMoney}
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: windowWidth,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: "#f2f2f2",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 15
            }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
              推荐奖
            </Text>
            <Text style={{ color: "#E0324A", fontSize: 13, marginRight: 15 }}>
              {data.tuijian}
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: windowWidth,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: "#f2f2f2",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 15
            }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
              市场管理奖
            </Text>
            <Text style={{ color: "#E0324A", fontSize: 13, marginRight: 15 }}>
              {data.shichang}
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: windowWidth,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: "#f2f2f2",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 15
            }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
              销售利润奖
            </Text>
            <Text style={{ color: "#E0324A", fontSize: 13, marginRight: 15 }}>
              {data.xiaoshou}
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: windowWidth,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
              培育奖
            </Text>
            <Text style={{ color: "#E0324A", fontSize: 13, marginRight: 15 }}>
              {data.peiyu}
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
