import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image,
  TextInput
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Picker from "react-native-picker";
import area from "./area.json";
export default class SelectAddress extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {}
  };

  static propTypes = {
    title: PropTypes.string,
    style: ViewPropTypes.style,
    onPickerConfirm: PropTypes.func
  };

  _createAreaData() {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
      let city = [];
      for (let j = 0, cityLen = area[i].city.length; j < cityLen; j++) {
        let _city = {};
        _city[area[i].city[j].name] = area[i].city[j].area;

        city.push(_city);
      }

      let _data = {};
      _data[area[i].name] = city;
      
      data.push(_data);
    }
    return data;
  }

  render() {
    let { style, title, selectedValue } = this.props;
    return null;
  }
}

const styles = StyleSheet.create({});
