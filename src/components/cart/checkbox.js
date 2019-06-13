import React, { Component } from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import Icon from "../../config/iconFont";

export default class CartCheckbox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked || false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  onClick = () => {
    if (this.props.disabled) {
      return;
    }
    const checked = !this.state.checked;
    if (!(typeof this.props.checked === true)) {
      this.setState({
        checked
      });
    }
    if (this.props.onClick) {
      this.props.onClick(checked);
    }
  };

  render() {
    const checked = this.state.checked;
    let imgSrc;
    iconSrc = checked ? "-checked" : "-circle";
    iconColor = checked ? "#dc2b41" : "#cccccc";
    return (
      <TouchableWithoutFeedback onPress={this.onClick}>
        <Icon name={iconSrc} size={20} color={iconColor} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cartCardCheck: {
    width: 18,
    height: 18
  }
});
