import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image,
  ImageBackground
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth, ThemeStyle } from "../../../utils/style";
import Icon from "../../../config/iconFont";

export default class BankManageItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked || false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  static defaultProps = {
    onPress: () => {},
    children: null,
    style: {},
    titleStyle: {},
    linearGradientStyle: {},
    colors: [],
    bankName: "",
    bankType: "",
    bankNum: "",
    bankIcon: null,
    verifyed: false
  };

  static propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    colors: PropTypes.array,
    bankName: PropTypes.string,
    bankType: PropTypes.string,
    bankNum: PropTypes.string,
    bankIcon: PropTypes.element,
    bottomImage: PropTypes.element,
    checked: PropTypes.bool,
    verifyed: PropTypes.bool,
    veriyBankClick: PropTypes.func
  };

  onPressCheck() {
    const checked = !this.state.checked;
    if (this.state.checked) {
      return;
    }
    if (!(typeof this.props.checked === true)) {
      this.setState({
        checked
      });
    }
    if (this.props.onPressCheck) {
      this.props.onPressCheck(checked);
    }
  }

  render() {
    const checked = this.state.checked;
    let imgSrc;
    iconSrc = checked ? "-checked" : "-circle";
    iconColor = checked ? "#ffffff" : "#cccccc";

    let {
      style,
      onPress,
      colors,
      bankName,
      bankNum,
      bankIcon,
      bankType,
      bottomImage,
      verifyed,
      veriyBankClick
    } = this.props;
    return (
      <LinearGradient
        style={{
          width: windowWidth - 30,
          height: 125,
          borderRadius: 10,
          marginTop: 15,
          marginLeft: 15,
          marginRight: 15
        }}
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          style={{ width: windowWidth - 30, height: 125, flexDirection: "row" }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>{bankIcon}</View>
          <View style={{ flex: 4, marginLeft: 10 }}>
            <Text style={{ color: "#FBFBFB", fontSize: 15, marginTop: 20 }}>
              {bankName}
            </Text>
            <Text style={{ color: "#FBFBFB", fontSize: 12, marginTop: 10 }}>
              {bankType}
            </Text>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 30 }}>
              <Text style={{ color: "#FBFBFB", fontSize: 15 }}>****</Text>
              <Text style={{ color: "#FBFBFB", fontSize: 15, marginLeft: 30 }}>
                ****
              </Text>
              <Text style={{ color: "#FBFBFB", fontSize: 15, marginLeft: 30 }}>
                ****
              </Text>
              <Text style={{ color: "#FBFBFB", fontSize: 15, marginLeft: 30 }}>
                {bankNum}
              </Text>
            </View>
          </View>
          {bottomImage}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              position: "absolute",
              right: 0,
              justifyContent: "center",
              height: 125
            }}
          >
            {/* {verifyed&&verifyed?
                            <Text style={{color:'#fff',fontSize:12,marginTop:20,marginRight:15}}>
                                验证通过
                            </Text>
                            :
                            <TouchableOpacity style={{height:16,width:39,backgroundColor:'#fff',borderRadius:3,justifyContent:'center',alignItems:'center',marginTop:20,marginRight:15}}
                            onPress={veriyBankClick}>
                                <Text style={{color:'#000',fontSize:12}}>
                                    验证
                                </Text>
                            </TouchableOpacity>
                        } */}
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={this.onPressCheck.bind(this)}
            >
              <Icon name={iconSrc} size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  bottomImage: {
    height: 108,
    width: 106,
    position: "absolute",
    top: 17,
    right: 0
  }
});
