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
import Icon from "../../../config/iconFont";

export default class AddBankItem extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    titleStyle: {},
    leftstyle:{},
    rightstyle:{},
    linearGradientStyle: {},
    colors: [],
    keyboardType: "default"
  };

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    leftstyle: ViewPropTypes.style,
    rightstyle: ViewPropTypes.style,
    colors: PropTypes.array,
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func
  };

  render() {
    let { style, title, onPress, keyboardType, placeholder,onChangeText,
      leftstyle,rightstyle,value,onBlur} = this.props;
    return (
      <View style={style} onPress={onPress}>
        <View style={styles.item}>
          <View style={[styles.leftTitle,leftstyle]}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
          <View style={[{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',paddingRight:15,},rightstyle]}>
            <TextInput
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor="#D9D9D9"
              underlineColorAndroid="transparent"
              onChangeText={onChangeText}
              onBlur={onBlur}
              writingDirection="rtl"
              style={{height: 44,textAlign: 'right',fontSize: 13}}
            />
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  leftTitle: {
    width: windowWidth / 3,
    height: 44,
    justifyContent: "center"
  },
  titleFont: {
    color: "#333333",
    fontSize: 15,
    marginLeft: 16
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10
  }
});
