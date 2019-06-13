import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

export default class CreateButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };
  static defaultProps = {
    onClick: () => {},
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[{width:42, height:42}, {...this.props.style}]}
        onPress={this.props.onClick}
      >
        <Image
          source={require("../../images/discovery/fqhd.png")}
          style={{width:"100%", height:"100%"}}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
