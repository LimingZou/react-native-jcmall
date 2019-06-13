import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../theme";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";

export default class ActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    surplusTime: PropTypes.string,
    joinNum: PropTypes.string,
    type: PropTypes.number
  };

  static defaultProps = {
    title: ""
  };

  render() {
    const { image, title, surplusTime, joinNum, type } = this.props;
    let status = "进行中";
    status = type == 1 ? "进行中" : "已结束";
    return (
      <View key={title} style={styles.itemView}>
        <NetworkImage
          style={{ height: 135, width: windowWidth - 30 }}
          source={{ uri: image }}
        />
        <Text style={{ margin: 15, color: "#333333", fontSize: 15 }}>
          {title}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15
          }}
        >
          <Text style={{ color: "#7F7F7F", fontSize: 10 }}>
            剩余时间：{surplusTime}
          </Text>
          <Text style={{ color: "#7F7F7F", fontSize: 10 }}>
            参与人数：{joinNum}
          </Text>
        </View>
        <View style={styles.topRightView}>
          <Text style={{ color: "#fff", fontSize: 10 }}>{status}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    height: 203,
    width: windowWidth - 30,
    backgroundColor: "#fff",
    marginLeft: 15,
    marginTop: 10,
    borderBottomLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  topRightView: {
    height: 15,
    width: 50,
    backgroundColor: "#00000077",
    position: "absolute",
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    top: 20,
    right: 0
  }
});
