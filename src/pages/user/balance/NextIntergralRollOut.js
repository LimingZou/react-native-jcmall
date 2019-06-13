import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation,
  TextInput
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import Button from "../../../components/category/Button";
const dataSource = require("../../../pages/discovery/recommended/data.json");
import InputPassword from "../../../components/my/balance/inputpassword";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import { Toast } from "antd-mobile-rn";
import { requestAmount } from "../../../redux/actions/my";
import { connect } from "react-redux";
let key = null;
import Overlay from "../../../components/@jcmall/overlay";

@connect(({
  view: {
    my: {
      Amount,
      AmountFetchStatus,
    }
  }
}) => ({
  Amount,
  fetchStatus: AmountFetchStatus,
}))

export default class NextIntegralRollOut extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      inputAccount:"",
      qty:0,
      payPassword:""

    };
  }

  componentDidMount(){
    let inputAccount = 0
    if(this.props.navigation.state.params.inputAccount){
      inputAccount = this.props.navigation.state.params.inputAccount
      this.setState({
        inputAccount
      })
    }
  }

  RollOutNumber(){
    const {payPassword,qty} = this.state
    if(qty<1){
      return  Toast.info("请输入转豆的个数")
    }
    
    this._showOverlay();
  }

  async sureRollOut(){
    const {inputAccount,qty,payPassword} = this.state
    const e = await Fetch.fetch({
      api: MyApi.intergralRollOut,
      params: {
        qty:qty,
        transferUserName:inputAccount,
        payPassword:payPassword
      }
    });
    Overlay.hide(key)
    Toast.info(e.message)
    this.props.dispatch(requestAmount());
  }

  _showOverlay() {
    key = Overlay.show(
      <Overlay.PullView
        modal={false}
        containerStyle={{ backgroundColor: null }}>
         <KeyboardAwareScrollView>
            <TouchableOpacity
              style={{
                width: windowWidth,
                height: windowHeight,
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
              activeOpacity={1}
              onPress={() => Overlay.hide(key)}
            >
              <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                <TextInput
                  keyboardType="default"
                  placeholder="请输入安全密码"
                  placeholderTextColor="#7F7F7F"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  onChangeText={text=>{
                    this.setState({
                      payPassword: text
                    })
                  }}
                  style={{
                    height: 26,
                    width: windowWidth - 90,
                    backgroundColor: "#fff",
                    marginTop: 57,padding:0
                  }}
                />
                <View
                  style={{
                    height: 1,
                    width: windowWidth - 60,
                    marginLeft: 15,
                    backgroundColor: "#D9D9D9"
                  }}
                />
                <Button
                  colors={["#FE7E69", "#FD3D42"]}
                  title="确定"
                  linearGradientStyle={styles.surePayButton}
                  titleStyle={styles.sureButtonFont}
                  onPress={() => {
                    this.sureRollOut()
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
      </Overlay.PullView>
    )
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        <View style={styles.topView}>
          <Image style={styles.headerImage} source={require("../../../images/mine/jsd.png")}/>
          <Text style={{ color: "#333333", fontSize: 13, marginTop: 15 }}>
              DSY655655
          </Text>
          <Text style={{ color: "#7F7F7F", fontSize: 10 }}>DSY655655</Text>
          <TextInput
            keyboardType="numeric"
            caretHidden={false}
            placeholder="          转账注册积分数量"
            placeholderTextColor="#D9D9D9"
            underlineColorAndroid="transparent"
            secureTextEntry={false}
            onChangeText={(text)=>{
              this.setState({
                qty:text
              })
            }}
            style={{ height: 44, width: 162, marginTop: 40 }}
          />
          <View style={{height: 1,width: windowWidth - 60,backgroundColor: "#D9D9D9"}}/>
        </View>

        <Button
          colors={["#FE7E69", "#FD3D42"]}
          title="转账"
          linearGradientStyle={styles.button}
          titleStyle={styles.buttonStyle}
          onPress={() => {
           this.RollOutNumber()
          }}
        />
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"积分转账"}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 40
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  },
  headerImage: {
    width: 60,
    height: 60,
    marginTop: 38,
    resizeMode: "contain"
  },
  topView:{
    height: 249,
    width: windowWidth,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  sureButton: {
    height: 49,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    marginLeft: 15
  },
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
    borderRadius: 6,
    marginTop:183+NavigationBar.Theme.contentHeight
  },
  cardView:{
    height: 44,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10
  },
  hintView:{
    height: 1,
    width: windowWidth - 30,
    marginLeft: 15,
    backgroundColor: "#D9D9D9"
  },
  hintFontSize:{
    color: "#7F7F7F",
    fontSize: 10,
    marginLeft: 18,
    marginTop: 10
  },
  allView:{
    height: 30,
    width: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  inputFont:{
    color: "#333333",
    fontSize: 15,
    marginLeft: 15,
    marginTop: 15
  }
  
});
