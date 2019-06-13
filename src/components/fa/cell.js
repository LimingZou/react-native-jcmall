import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import ListRow from "../@jcmall/listRow";
import Icon from "../../config/iconFont";
export default class Cell extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    arrow: PropTypes.string,
    icon: PropTypes.bool,
    url: PropTypes.bool,
    titleStyle: PropTypes.object,
    labelStyle: PropTypes.object
  };
  static defaultProps = {
    type: null, // 左侧标题
    title: null, // 左侧标题
    label: null, // 标题下方的描述信息
    extra: null, // 右侧内容
    arrow: "empty", // horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
    icon: null,
    url: null,
    titleStyle: {},
    labelStyle: {}
  };

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { title, label, icon, titleStyle, labelStyle } = this.props;

    return (
      <ListRow
        {...this.props}
        icon={icon}
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 15, color: "#333" }}>{title}</Text>
            <Text style={{ fontSize: 14, color: "#7f7f7f", marginLeft: 5 }}>
              {label}
            </Text>
          </View>
        }
        titlePlace="left"
        titleStyle={titleStyle}
        detailStyle={labelStyle}
        bottomSeparator="full"
        accessory={"indicator"}
        activeOpacity={0.8}
      />
    );
  }
}

const styles = StyleSheet.create({});
