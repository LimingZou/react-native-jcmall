import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../config/iconFont";
import GoodsSearch from "../../components/page/goodsSearch";
import NavigationBar from "../../components/@jcmall/navbar";
import { Badge } from "antd-mobile-rn";

export default class SearchNavbar extends Component {
  state = {
    buttonColor: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 255, 255, 0)"
  };

  setOpacity(opacity) {
    this.setState({
      buttonColor: `rgba(${(1 - opacity) * 255}, ${(1 - opacity) * 255}, ${(1 -
        opacity) *
        255}, 1)`,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`
    });
  }

  render() {
    const { buttonColor, backgroundColor } = this.state;
    const { onScan, onNews, onSearch, dot } = this.props;
    return (
      <NavigationBar
        navRef={c => (this._refHeader = c)}
        leftView={
          <TouchableOpacity onPress={() => onScan && onScan()}>
            <Icon name={"-scan"} size={20} color={buttonColor} />
          </TouchableOpacity>
        }
        style={{ backgroundColor, borderBottomWidth: 0 }}
        title={<GoodsSearch goGoodsList={() => onSearch && onSearch()} />}
        rightView={
          <TouchableOpacity onPress={() => onNews && onNews()}>
            <Badge
              dot={dot}
            >
              <Icon name={"-xiaoxi"} size={20} color={buttonColor} />
            </Badge>
          </TouchableOpacity>
        }
        titleStyle={{ color: "black" }}
        statusBarStyle={"dark-content"}
      />
    );
  }
}

const styles = StyleSheet.create({});
