import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image,
  Animated
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Icon from "../../../config/iconFont";
import ListRow from "../../../components/@jcmall/listRow";

export default class IntroduceItme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: new Animated.Value(0),
      opened: false
    };
  }

  openContent(title) {
    let opened = this.state.opened;
    let height = title.length / 2;
    if (opened) {
      this.setState({ opened: false });
      Animated.parallel([this.createAnimation(0)]);
    } else {
      this.setState({ opened: true });
      Animated.parallel([this.createAnimation(height)]);
    }
  }

  createAnimation = height => {
    return Animated.timing(this.state.contentHeight, {
      toValue: height,
      duration: 250
    }).start();
  };

  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    titleStyle: {},
    linearGradientStyle: {},
    colors: []
  };

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    colors: PropTypes.array
  };

  render() {
    let { style, title, onPress } = this.props;
    let iconName = this.state.opened ? "-arrow-up" : "-arrow-down";
    return (
      <View style={[styles.cell, { marginTop: 10 }]}>
        <ListRow
          bottomSeparator={"full"}
          title="标题"
          detailMultiLine={false}
          accessory={
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                this.openContent(title);
              }}
            >
              <Icon name={iconName} size={15} color={"#7F7F7F"} />
            </TouchableOpacity>
          }
        />
        <Animated.View
          style={{ height: this.state.contentHeight, width: windowWidth }}
        >
          <View>
            <Text>{title}</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    marginVertical: 5,
    overflow: "hidden"
  }
});
