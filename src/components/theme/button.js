import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes } from "react-native";
import { Button } from "antd-mobile-rn";
import LinearGradient from "react-native-linear-gradient";

export default class ThemeButton extends Component {
  static propTypes = {
    activeStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    type: PropTypes.string,
    onClick: PropTypes.func,
    colors: PropTypes.array
  };
  static defaultProps = {
    style: {},
    activeStyle: {},
    type: "default",
    onClick: () => {},
    colors: [],
    start: {},
    end: {},
    locations: []
  };
  render() {
    return (
      <LinearGradient
        style={{ ...this.props.style }}
        start={this.props.start}
        end={this.props.end}
        locations={this.props.locations}
        colors={[...this.props.colors]}
      >
        <Button
          {...this.props}
          onClick={this.props.onClick}
          style={[
            {
              backgroundColor: null,
              borderWidth: 0,
              width: this.props.style.width,
              height: this.props.style.height
            }
          ]}
          activeStyle={[{ backgroundColor: null }, this.props.activeStyle]}
          type="primary"
        >
          {this.props.children}
        </Button>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({});
