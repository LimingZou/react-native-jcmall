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
import { formatMoney } from "../../../utils/function";

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
    status: PropTypes.string
  };

  render() {
    let { style, title, onPress, time, detail, fontStyle,status,key } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress} key={key}>
        <View style={styles.item}>
          <View style={styles.leftTitle}>
            <Text style={styles.titleFont}>{title}</Text>
            <Text style={styles.titleTime}>{time}</Text>
          </View>

          <View style={styles.rightButton}>
            <Text style={{color:'#333333',fontSize:15}}>
              {formatMoney(detail)}
            </Text>
            <Text style={{color:'#7F7F7F',fontSize:12,marginTop:10}}>
              状态: {status}
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
    // height: 68,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.5
  },
  leftTitle: {
    width: windowWidth / 2,
    // height: 68,
    marginLeft: 15
  },
  titleTime: {
    color: "#7F7F7F",
    fontSize: 12,
    marginTop: 15,
    marginBottom:10
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginTop: 16
  },
  rightButton: {
    height:68,
    marginRight: 16,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  addFont: {
    color: "#E0324A",
    fontSize: 17
  }
});
