import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Icon from "../../../config/iconFont";

export default class MySuBean extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    titleStyle: {},
    linearGradientStyle: {},
    colors: [],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 }
  };

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    style: ViewPropTypes.style,
    titleStyle: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    rightImage: PropTypes.element,
    rightTopButton: PropTypes.element,
    linearGradientStyle: ViewPropTypes.style,
    colors: PropTypes.array,
    start: PropTypes.object,
    end: PropTypes.object,
    showLi: PropTypes.bool,
    imagePath: PropTypes.string,
    rightTopElement: PropTypes.element
  };

  renderContent() {
    let {
      title,
      titleStyle,
      children,
      content,
      showLi,
      imagePath,
      rightImage,
      onPress,
      contentStyle,
      rightTopElement
    } = this.props || {};
    if (
      !React.isValidElement(title) &&
      (title || title === "" || title === 0)
    ) {
      title = (
        <View style={contentStyle}>
          <View style={styles.leftContent}>
            <Text style={styles.titleFont}>{title}</Text>
            <View style={styles.num}>
              <Text style={styles.contentFont}>
                {content}
              </Text>
              <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                {showLi ? (
                  <Text style={{ color: "#fff", fontSize: 13, margin: 10 }}>
                    粒
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <View style={styles.rightContent}>
            {rightImage}
            {rightTopElement}
          </View>
        </View>
      );
    }
    return title ? title : children;
  }

  render() {
    let {
      style,
      linearGradientStyle,
      colors,
      start,
      end,
      onPress
    } = this.props;
    return (
      <View style={style}>
        <LinearGradient
          style={linearGradientStyle}
          colors={colors}
          start={start}
          end={end}
        >
          {this.renderContent()}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    width: windowWidth - 30,
    height: 125,
    flexDirection: "row"
  },
  leftContent: {},
  titleFont: {
    color: "#fff",
    fontSize: 13,
    margin: 20
  },
  num: {
    flexDirection: "row",
    marginLeft: 22
  },
  contentFont: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "400",
  },
  rightContent: {
    flex: 1,
    flexDirection: "row-reverse"
  },
  image: {
    width: 120,
    height: 97,
    margin: 20
  },
  rightQr: {
    position: "absolute",
    left: 20,
    top: 20
  }
});
