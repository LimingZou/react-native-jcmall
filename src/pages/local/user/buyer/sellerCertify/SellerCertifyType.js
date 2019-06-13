/**
 * 选择商家认证类型
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
  PixelRatio
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../../../utils/style";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";


export default class SellerCertifyType extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      sex: 0,
      isFirst: true,
      isSecond: false,
      isThird: false,
      selectedValue: '1',
    };
  }
  selectedItem(value) {
    if (value === '1') {
      this.setState({
        isFirst: true,
        isSecond: false,
        isThird: false,
        selectedValue: value,
      })
    } else if (value === '2') {
      this.setState({
        isFirst: false,
        isSecond: true,
        isThird: false,
        selectedValue: value,
      })
    } else {
      this.setState({
        isFirst: false,
        isSecond: false,
        isThird: true,
        selectedValue: value,
      })
    }
  }
  stepToNextButton = () => {
    const { navigation } = this.props;
    //注册成为商家申请的状态
    let registerStatus = navigation.state.params.registerStatus;
    //已注册（审核中、审核不通过）的注册信息
    let registerMesData = navigation.state.params.registerMesData;
    //回调函数
    let callback = navigation.state.params.callback;

    if (this.state.selectedValue === '1') {
      this.props.navigation.navigate("BusinessAuth", { registerMesData, registerStatus, callback });
      //跳转到企业认证
    } else if (this.state.selectedValue === '2') {
      //跳转到个体商户认证
      this.props.navigation.navigate("PersonalBuinessAuth", { registerMesData, registerStatus, callback });
    } else {
      //跳转到个人认证
      this.props.navigation.navigate("BecomeSellerMessage", { registerMesData, registerStatus, callback });
    }
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >

        <View
          style={{
            backgroundColor: "white",
            width: windowWidth,
            marginTop: 10,
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity style={{ width: windowWidth, height: 45, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}
            onPress={() => { this.selectedItem('1') }}
          >
            <View style={{ marginLeft: 10, width: 12, height: 12, borderRadius: 6, backgroundColor: 'white', borderColor: this.state.isFirst === true ? '#FD3E43' : '#8A8A8A', borderWidth: 2 }}>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>企业</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: '#D9D9D9', width: windowWidth - 30, height: 0.5 }}></View>
          <TouchableOpacity style={{ width: windowWidth, height: 45, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}
            onPress={() => { this.selectedItem('2') }}
          >
            <View style={{ marginLeft: 10, width: 12, height: 12, borderRadius: 6, backgroundColor: 'white', borderColor: this.state.isSecond === true ? '#FD3E43' : '#8A8A8A', borderWidth: 2 }}>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>个体商户</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: '#D9D9D9', width: windowWidth - 30, height: 0.5 }}></View>
          <TouchableOpacity style={{ width: windowWidth, height: 45, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}
            onPress={() => { this.selectedItem('3') }}
          >
            <View style={{ marginLeft: 10, width: 12, height: 12, borderRadius: 6, backgroundColor: 'white', borderColor: this.state.isThird === true ? '#FD3E43' : '#8A8A8A', borderWidth: 2 }}>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>个人</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: 70, width: windowWidth - 30, height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 5 }}
          onPress={() => { this.stepToNextButton() }}
        >
          <Text style={{ color: '#333333', fontSize: 15 }}>下一步</Text>
        </TouchableOpacity>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"选择认证类型"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
        />
      </View>
    );
  }
}

class InformationItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { style, title, rightTitle, onPress, rightView } = this.props;
    return (
      <View style={style} onPress={onPress}>
        <View style={styles.item}>
          <View style={styles.leftTitle}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
          <View style={styles.rightButton}>{rightView}</View>
        </View>
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
  topView: {
    marginTop: 118,
    width: 180,
    height: 54,
    marginLeft: (windowWidth - 180) / 2,
    marginRight: (windowWidth - 180) / 2,
    backgroundColor: "#FE9B1B"
  },
  copyRight: {
    bottom: 56,
    fontSize: 11,
    color: "#333333",
    position: "absolute"
  },
  edition: {
    bottom: 56 + 20 + 10,
    fontSize: 18,
    color: "#010101",
    position: "absolute"
  },
  bottomView: {
    width: 106,
    height: 30,
    marginLeft: (windowWidth - 106) / 2,
    marginRight: (windowWidth - 106) / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333333",
    bottom: 56 + 20 + 10 + 15 + 30,
    position: "absolute"
  },
  textView: {
    color: "#000000",
    fontSize: 15
  },
  item: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftTitle: {
    width: windowWidth / 2,
    height: 44,
    justifyContent: "center"
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginLeft: 16
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 16
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    borderRadius: 35,
    width: 70,
    height: 70
  },
  headImage: {
    backgroundColor: "#EEEEEE",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginTop: 25,
    marginLeft: (windowWidth - 70) / 2
  },
  headImageText: {
    color: "#7F7F7F",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center"
  },
  lineView: {
    height: 1,
    width: windowWidth,
    backgroundColor: "#f2f2f2"
  },
  itemContainer1: {
    height: 45,
    width: windowWidth,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    marginLeft: 16,
    flexDirection: 'row',
  },
  textInput: {
    marginLeft: 20,
    marginTop: 3,
    fontSize: 14,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 16,
    height: 42,
    color: "#7F7F7F",
    textAlign: 'right',
    flex: 1,
  },
});
