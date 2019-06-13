import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class FieldCell extends Component {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    prefix: PropTypes.string,
    right: PropTypes.element,
    onPress: PropTypes.func
  };
  static defaultProps = {
    title: null,
    desc: null,
    prefix: null,
    right: null
  };

  render() {
    const { title, prefix,desc, right, children, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.cell} activeOpacity={1} onPress={onPress}>
        {title || desc || right ? (
          <View style={[styles.item, { backgroundColor: "#fff" }]}>
            {title || desc ? (
              <View style={styles.left}>
                {prefix?<Text style={{ color: "#FD3E42", fontSize: 13,marginRight:5,textAlign:'center' }}>{prefix}</Text>:null}
                <Text style={{ color: "#333", fontSize: 13,marginRight:5 }}>{title}</Text>
                {desc ? <Text style={styles.desc}>{desc}</Text> : null}
              </View>
            ) : null}
            {right ? <View style={styles.right}>{right}</View> : null}
          </View>
        ) : null}
        {children ? <View style={{ marginTop: 10 }}>{children}</View> : null}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  cell: {
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  right: {
    flex:1,
    marginLeft:15,
    alignItems:'flex-end'
  },
  desc: {
    marginLeft: 5,
    fontSize: 13,
    color: "#999"
  },
  itemNum: {},
  itemSymbol: {}
});
