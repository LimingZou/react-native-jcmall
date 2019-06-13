import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import SegmentedBar from "../../../../components/@jcmall/segmentedBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import LinearGradient from "react-native-linear-gradient";
import ListItem from "../../../../components/my/jusubean/listItem";
import Picker from "react-native-picker";
import SelectAddress from "../../../../components/@jcmall/selectaddress/selectaddress";
const mSelectAddress = new SelectAddress();
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let _this = null;
export default class Exchange extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      province: "",
      city: "",
      district: ""
    };
    this.inputItem = this.inputItem.bind(this);
    _this = this;
  }

  atOnceExchange() {
    alert("立即兑换");
  }

  _showAreaPicker() {
    Picker.init({
      pickerData: mSelectAddress._createAreaData(),
      selectedValue: ["上海", "上海市", "闵行区"],
      pickerCancelBtnText: "取消",
      pickerConfirmBtnText: "确定",
      pickerTitleText: "请选择城市",
      pickerConfirmBtnColor: [255, 83, 42, 100],
      pickerCancelBtnColor: [255, 83, 42, 100],
      onPickerConfirm: pickedValue => {
        this.setState({
          province: pickedValue[0],
          city: pickedValue[1],
          district: pickedValue[2]
        });
        console.log(pickedValue);
      },
      onPickerCancel: pickedValue => {
        console.log("area", pickedValue);
      },
      onPickerSelect: pickedValue => {
        console.log("area", pickedValue);
      }
    });
    Picker.show();
  }

  selectAddressItem(_this_) {
    const { province, city, district } = this.state;
    let select1 = province.length > 0 ? province : "请选择";
    let select1Color = province.length > 0 ? "#333333" : "#D9D9D9";
    let select2 = city.length > 0 ? city : "请选择";
    let select2Color = city.length > 0 ? "#333333" : "#D9D9D9";
    let select3 = district.length > 0 ? district : "请选择";
    let select3Color = district.length > 0 ? "#333333" : "#D9D9D9";
    return (
      <View
        style={{
          width: windowWidth,
          height: 44,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{ width: 80, height: 44, justifyContent: "center" }}>
          <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
            所在地区
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: windowWidth - 95,
            height: 44,
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={() => {
            this._showAreaPicker();
          }}
        >
          <Text style={{ color: select1Color, fontSize: 13, marginLeft: 13 }}>
            {select1}
          </Text>
          <Text style={{ color: "#333333", fontSize: 13 }}>省</Text>
          <Text style={{ color: select2Color, fontSize: 13 }}>{select2}</Text>
          <Text style={{ color: "#333333", fontSize: 13 }}>市</Text>
          <Text style={{ color: select3Color, fontSize: 13 }}>{select3}</Text>
          <Text style={{ color: "#333333", fontSize: 13 }}>区</Text>
        </TouchableOpacity>
      </View>
    );
  }

  inputItem(title, placeholder, type, keyboardType) {
    return (
      <View
        style={{
          width: windowWidth,
          height: 44,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 80,
            height: 44,
            justifyContent: "center",
            marginRight: 20
          }}
        >
          <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
            {title}
          </Text>
        </View>
        <TextInput
          ref={textInput1 => {
            this.textInput1 = textInput1;
          }}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={text => {
            // this.inputTextChange(text);
          }}
          placeholderTextColor="#D9D9D9"
          underlineColorAndroid="transparent"
          secureTextEntry={false}
          //   value={content}
          style={{
            height: 43,
            backgroundColor: "#fff",
            width: windowWidth - 100
          }}
        />
      </View>
    );
  }

  render() {
    const barItems = this.barItems;
    const { sindex } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        <TouchableOpacity
          style={{
            width: windowWidth,
            height: 90,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            this.props.navigation.navigate("ManageAddress");
          }}
        >
          <View
            style={{
              width: windowWidth,
              height: 40,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
              从收货地址选择收货人
            </Text>
            <View style={{ marginRight: 15 }}>
              <Icon name={"-arrow-right"} size={12} color={"#333333"} />
            </View>
          </View>
          <View
            style={{
              width: windowWidth,
              height: 50,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                height: 0.5,
                width: windowWidth / 2.5,
                backgroundColor: "#D9D9D9"
              }}
            />
            <Text
              style={{ color: "#333333", fontSize: 15, marginHorizontal: 10 }}
            >
              或
            </Text>
            <View
              style={{
                height: 0.5,
                width: windowWidth / 2.5,
                backgroundColor: "#D9D9D9"
              }}
            />
          </View>
        </TouchableOpacity>
        {this.inputItem("收货人", "请填写收货人姓名", "name", "default")}
        <View
          style={{ width: windowWidth, height: 0.5, backgroundColor: "#D9D9D9" }}
        />
        {this.inputItem(
          "手机号码",
          "请填写收货人手机号",
          "phone",
          "numeric"
        )}
        <View
          style={{ width: windowWidth, height: 0.5, backgroundColor: "#D9D9D9" }}
        />
        {this.selectAddressItem(this)}
        <View
          style={{ width: windowWidth, height: 0.5, backgroundColor: "#D9D9D9" }}
        />
        {this.inputItem(
          "详细地址",
          "请输入详细地址，如街道、门牌号等",
          "preciseaddress",
          "default"
        )}

        <TouchableOpacity
          style={styles.linearGradientStyle}
          onPress={() => {
            this.atOnceExchange();
          }}
        >
          <LinearGradient
            style={styles.linearGradientStyle}
            colors={["#FE7E69", "#FD3D42"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>立即兑换</Text>
          </LinearGradient>
        </TouchableOpacity>
        </KeyboardAwareScrollView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"兑换"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
                Picker.hide();
              }}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  linearGradientStyle: {
    height: 49,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  }
});
