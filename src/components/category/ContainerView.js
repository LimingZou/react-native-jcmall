import React, { Element, Component } from "react";
import { StyleSheet, View } from "react-native";

type PropsType = {
  icon?: Element<*>,
  titleView?: Element<*>,
  tipView?: Element<*>,
  children?: Element<*>,
  style?: any
};

export default class ContainerView extends Component {
  props: PropsType;
  render() {
    const { children, style } = this.props || {};
    return (
      <View style={[style, styles.container]}>
        <View style={styles.typesView}>
          {this.props.icon}
          {this.props.titleView}
          {this.props.tipView}
        </View>
        {children && React.Children.map(children, (child: *) => child)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  typesView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  }
});
