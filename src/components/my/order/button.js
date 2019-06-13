import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class OrderButton extends Component {
  static propTypes = {
    size: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    active: PropTypes.bool
  };
  static defaultProps = {
    size: null,
    text: null,
    type: null,
    active: false
  };

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { size, text, type, active, textColor, children } = this.props;
    return (
      <TouchableOpacity
        style={[styles.orderButton, type === "danger" ? styles.danger : null, size === "small" && styles.small ]}
        onPress={() => {
          this.onClick();
        }}
      >
        <Text
          style={[{...styles.title, color:textColor}, type === "danger" ? styles.dangerTitle : null, size === "small" && {fontSize:12}]}
        >
          {text}
        </Text>
        {children}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    color: "#333333"
  },
  dangerTitle: {
    fontSize: 13,
    color: "#fff"
  },
  orderButton: {
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 0.5,
    borderColor: "#d9d9d9",
    fontSize: 14,
    borderRadius: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginLeft: 10
  },
  active: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0324a",
    color: "#e0324a"
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 12
  },
  danger: {
    backgroundColor: "#e0324a",
    fontSize: 14,
    borderRadius: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginLeft: 10
  }
});
