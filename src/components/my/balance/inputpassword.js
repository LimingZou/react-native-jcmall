import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image,
  Modal,
  TextInput
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Button from "../../../components/category/Button";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import Icon from "../../../config/iconFont";

export default class InputPassword extends Component {
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
    colors: PropTypes.array,
    modalVisible: PropTypes.bool,
    closeModal: PropTypes.func
  };

  render() {
    let { style, title, onPress, modalVisible, surePressButton ,closeModal,passwordContent} = this.props;
    return (
        <TouchableOpacity
          onPress={closeModal}
          activeOpacity={1}
          style={{
            width: windowWidth,
            height: windowHeight,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)"
          }}>
          <TouchableOpacity style={styles.modalView} activeOpacity={1}>
            <TextInput
              keyboardType="numeric"
              placeholder="请输入安全密码"
              placeholderTextColor="#7F7F7F"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>{passwordContent(text)}}
              secureTextEntry={true}
              style={styles.inputStyle}
            />
            <View style={styles.inputView}/>
            <Button
              colors={["#FE7E69", "#FD3D42"]}
              title="确定"
              linearGradientStyle={styles.surePayButton}
              titleStyle={styles.sureButtonFont}
              onPress={surePressButton}
            />
          </TouchableOpacity>
        </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  sureButtonFont: {
    color: "#fff",
    fontSize: 17
  },
  surePayButton: {
    height: 44,
    width: windowWidth - 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 15
  },
  modalView: {
    height: 175,
    width: windowWidth - 30,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 6
  },
  inputStyle:{
    height: 26,
    width: windowWidth - 90,
    backgroundColor: "#fff",
    marginTop: 57,
    padding:0
  },
  inputView:{
    height: 1,
    width: windowWidth - 60,
    marginLeft: 15,
    backgroundColor: "#D9D9D9"
  }
});
