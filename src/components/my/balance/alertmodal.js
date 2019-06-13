import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image,
  Modal
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import Icon from "../../../config/iconFont";
import NavigationBar from "../../../components/@jcmall/navbar";

export default class AlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  static defaultProps = {
    onPress: () => {},
    style: {},
    modalVisible: false
  };

  static propTypes = {
    onPress: PropTypes.func,
    buttomText: "",
    content: PropTypes.element,
    modalVisible: PropTypes.bool,
    sureButtonClick: PropTypes.func
  };

  render() {
    let {
      style,
      buttomText,
      content,
      modalVisible,
      sureButtonClick
    } = this.props;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)"
          }}
        >
          <View
            style={{
              height: 200,
              width: 300,
              backgroundColor: "#fff",
              borderRadius: 5,
              marginTop: 143 + NavigationBar.Theme.contentHeight
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {content}
            </View>
            <View
              style={{ width: 300, height: 1, backgroundColor: "#BFBFBF" }}
            />
            <TouchableOpacity
              style={{
                width: 300,
                height: 53,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={sureButtonClick}
            >
              <Text style={{ color: "#333333", fontSize: 13 }}>
                {buttomText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
