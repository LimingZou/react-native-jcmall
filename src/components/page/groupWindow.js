import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes } from "react-native";
import { windowWidth } from "../../utils/style";
import { FontStyle, PublicStylesString } from "../../utils/style";
import PropTypes from "prop-types";
import Icon from "../../config/iconFont";

let currentWindowWidth = windowWidth;
export default class GroupWindow extends Component {
  static propTypes = {
    ...ViewPropTypes,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.oneOfType([PropTypes.number, PropTypes.element]),
    tip: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    titleStyle: Text.propTypes.style,
    tipStyle: Text.propTypes.style
  };

  static defaultProps = {
    iconStyle: {
      width: 20,
      height: 20
    },
    titleStyle: {
      fontFamily: FontStyle.PingFangSC_B,
      fontSize: 18,
      color: PublicStylesString.BlackColor
    },
    tipStyle: {
      fontFamily: FontStyle.PingFangSC_R,
      fontSize: 15,
      color: PublicStylesString.GrayColor
    },
    childrenStyle: {},
    tip: "",
    title: "",
    icon: null
  };

  renderIcon() {
    let { icon, iconStyle } = this.props;
    if (typeof icon === "number") {
      icon = <Image style={iconStyle} resizeMode={"cover"} source={icon} />;
    }
    return <View style={{ marginRight: 10 }}>{icon}</View>;
  }

  renderTitle() {
    let { title, titleStyle } = this.props;
    if (typeof title === "string") {
      title = <Text style={titleStyle}>{title}</Text>;
    }
    return <View>{title}</View>;
  }

  renderTip() {
    let { tip, tipStyle, onPress } = this.props;
    if (typeof tip === "string") {
      tip = tip.length > 0 ? <Text style={tipStyle}>{tip}</Text> : null;
    }
    return <View style={{ marginLeft: 24 }}>{tip}</View>;
  }

  renderTouch() {
    let { onPress } = this.props;
    return onPress ?(
      <View style={{
        width:20,
        height:20,
        marginLeft: 15,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fe7e69'
      }}
      >
        <Icon name={"-arrow-right"} size={10} color={"#fff"} />
      </View>
    ):null;
  }

  render() {
    const { style, children, childrenStyle, onPress } = this.props;
    return (
      <View style={[styles.window, style]}>
        <TouchableOpacity
          style={[styles.bot, { alignItems: "center" }]}
          activeOpacity={0.8}
          onPress={onPress}
        >
          {this.renderIcon()}
          <View style={styles.bot}>
            {this.renderTitle()}
            {this.renderTip()}
            {this.renderTouch()}
          </View>
        </TouchableOpacity>
        <View style={childrenStyle}>{children && children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    padding: 10,
    paddingBottom: 0
  },
  bot: {
    flexDirection: "row",
    alignItems: "center"
  }
});
