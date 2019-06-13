import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
    windowWidth,
    PublicStyles,
    ThemeStyle,
  } from "../../../utils/style";
  import Icon from "../../../config/iconFont";

export default class TabItem extends Component {
    render() {
      const { containerStyle = {}, selected, tabText, tabIcon, onTabClick } = this.props;
      let selectColor = selected ? ThemeStyle.ThemeLocalColor : '#C2C2C2';
      return (
        <TouchableOpacity
          onPress={() => { onTabClick() }}
          activeOpacity={0.2}
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }, containerStyle
          ]}
        >
          <Icon name={tabIcon} size={22} color={selectColor} />
          <Text style={{ fontSize: 11, color: selectColor, textAlign: 'center' }}>{tabText}</Text>
        </TouchableOpacity>
      );
    }
  }