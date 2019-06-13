import React, { Component } from "react";
import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import PropTypes from "prop-types";
import {
  SmartRefreshControl,
  AnyHeader
} from "react-native-smartrefreshlayout";
import Icon from "react-native-vector-icons/Ionicons";
import { SkypeIndicator } from "react-native-indicators";
import { ThemeStyle } from "../../utils/style";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class NomalRefreshControl extends Component {
  state = {
    text: "下拉刷新",
    rotate: new Animated.Value(0),
    refreshing: false
  };
  _onPullDownToRefresh = () => {
    this.setState({
      text: "下拉刷新",
      refreshing: false
    });
    Animated.timing(this.state.rotate, {
      toValue: 0,
      duration: 197,
      useNativeDriver: true,
      easing: Easing.linear()
    }).start();
  };
  _onReleased = () => {
    this.setState({
      refreshing: true,
      text: "正在刷新"
    });
  };
  _onReleaseToRefresh = () => {
    this.setState({
      text: "释放刷新"
    });
    Animated.timing(this.state.rotate, {
      toValue: 1,
      duration: 197,
      useNativeDriver: true,
      easing: Easing.linear()
    }).start();
  };
  _onRefresh = () => {
    let { onRefresh } = this.props;
    onRefresh && onRefresh();
  };
  finishRefresh = params => {
    this._refreshc && this._refreshc.finishRefresh(params);
  };
  render() {
    return (
      <SmartRefreshControl
        primaryColor="rgba(0,0,0,0)"
        style={{ flex: 1 }}
        ref={ref => (this._refreshc = ref)}
        children={this.props.children}
        onRefresh={this._onRefresh}
        onPullDownToRefresh={this._onPullDownToRefresh}
        onHeaderReleased={this._onReleased}
        onReleaseToRefresh={this._onReleaseToRefresh}
        headerHeight={100}
        HeaderComponent={
          <AnyHeader
            style={{
              height: 99,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.state.refreshing ? (
              <SkypeIndicator
                style={{ flex: 0 }}
                size={24}
                color={ThemeStyle.ThemeColor}
              />
            ) : (
              <AnimatedIcon
                style={{
                  transform: [
                    {
                      rotate: this.state.rotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["180deg", "0deg"]
                      })
                    }
                  ]
                }}
                name="md-arrow-up"
                color={ThemeStyle.ThemeColor}
                size={24}
              />
            )}
            <Text style={{ marginLeft: 15 }}>{this.state.text}</Text>
          </AnyHeader>
        }
      />
    );
  }
}
