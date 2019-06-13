import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View } from 'react-native-animatable';

export default class OrderCard extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <View animation="fadeIn" duration={400} delay={100} style={styles.orderCard}>{this.props.children}</View>;
  }
}
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#ffffff",
    marginBottom: 10
  }
});
