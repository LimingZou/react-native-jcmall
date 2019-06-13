import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Image, StyleSheet, Animated, Text } from "react-native";
export default class ExpandableText extends Component {
  static propTypes = {
    style: PropTypes.style,
    expandTextStyle: PropTypes.style,
    numberOfLines: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.state = {
      /** 文本是否展开 */
      expanded: true,
      numberOfLines: null,
      /** 展开收起文字是否处于显示状态 */
      showExpandText: false,
      /** 是否处于测量阶段 */
      measureFlag: true
    };
    this.numberOfLines = props.numberOfLines;
    this.expandText = props.expandText;
    /** 文本是否需要展开收起功能：（实际文字内容是否超出numberOfLines限制） */
    this.needExpand = true;
    this.measureFlag = true;
  }

  _onTextLayout(event) {
    if (this.measureFlag) {
      if (this.state.expanded) {
        this.maxHeight = event.nativeEvent.layout.height;
        this.setState({ expanded: false, numberOfLines: this.numberOfLines });
      } else {
        this.mixHeight = event.nativeEvent.layout.height;
        if (this.mixHeight == this.maxHeight) {
          this.needExpand = false;
        } else {
          this.needExpand = true;
          this.setState({ showExpandText: true });
        }
        this.measureFlag = false;
      }
    }
  }

  _onPressExpand() {
    if (!this.state.expanded) {
      this.setState({
        numberOfLines: null,
        expanded: true,
        showExpandText: false
      });
    } else {
      this.setState({
        numberOfLines: this.numberOfLines,
        expanded: false,
        showExpandText: true
      });
    }
  }

  render() {
    const { numberOfLines, onLayout, expandTextStyle, ...rest } = this.props;
    let expandText = this.state.showExpandText ? (
      <Text
        style={[this.props.style, styles.expandText, expandTextStyle]}
        onPress={this._onPressExpand.bind(this)}
      >
        {this.expandText}
      </Text>
    ) : null;
    return (
      <View>
        <Text
          numberOfLines={this.state.numberOfLines}
          onLayout={this._onTextLayout.bind(this)}
          {...rest}
        >
          {this.props.children}
        </Text>
        {expandText}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expandText: {
    color: "blue",
    marginTop: 0
  }
});
