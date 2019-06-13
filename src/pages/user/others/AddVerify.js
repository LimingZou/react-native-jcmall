import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import Button from "../../../components/category/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-picker";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import { connect } from "react-redux";
import { Toast } from "../../../utils/function";
import Verify from "../../../utils/verify";
@connect(({ app: { user: {userInfo } } }) => ({
  userInfo
}))

export default class AddVerify extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      setDefault: false,
      frontage:"",
      reverse:"",
      realName:"",
      idCard:"",
      userId:" "

    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  uploadImage() {}

  setDefault() {
    let setDefault = !this.state.setDefault;
    this.setState({
      setDefault
    });
  }


  selectPhotoTapped(type) {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      title: "",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "我的相册",
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        if(type=="reverse"){
          this.setState({
            reverse: source
          });
        }else{
          this.setState({
            frontage: source
          });
        }
        
      }
    });
  }

  addRealName(){
    const {realName,idCard} = this.state
    const {userInfo} = this.props
    if(realName.length<2){
      return  Toast.warn("请输入真实姓名")
    }
    if(!Verify.IdentityCodeValid(idCard)){
      return Toast.warn("请输入正确的身份证号");
    }

    console.log(userInfo.id)

    Fetch.fetch({
      api: MyApi.addRealName,
      params: {
        realName:realName,
        idCard:idCard,
        userId:userInfo.id
      }
    }).then((result)=>{
      if(result.code == "0000"){
        if(this.props.navigation.state.params&&this.props.navigation.state.params.addRealNameCallback){
          this.props.navigation.state.params.addRealNameCallback()
        }
        Toast.info(result.message)
        this.props.navigation.pop()
      }else{
        Toast.warn(fa.code.parse(result.code, result.message));
      }
    })

  }


  render() {
    const { setDefault,frontage,reverse } = this.state;
    let couponed = setDefault
      ? require("../../../images/mine/kai.png")
      : require("../../../images/mine/guan.png");
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <KeyboardAwareScrollView>
          <View style={styles.topView}>
            <View style={{ flexDirection: "row", marginTop: 34 }}>
              <Text style={{ color: "#333333", fontSize: 18 }}>
                个人信息认证
              </Text>
              <Text style={{ color: "#FD3D42", fontSize: 18 }}>（必填）</Text>
            </View>

            <View style={{ flex: 1, width: windowWidth, marginTop: 10 }}>
              <View style={styles.inputView}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ color: "#333333", fontSize: 15 }}>姓名</Text>
                </View>
                <View style={{ flex: 3, justifyContent: "center" }}>
                  <TextInput
                    ref={textInput1 => {
                      this.textInput1 = textInput1;
                    }}
                    placeholder="请填写真实姓名"
                    keyboardType="default"
                    onChangeText={text => {
                      this.setState({
                        realName:text
                      })
                    }}
                    placeholderTextColor="#D9D9D9"
                    underlineColorAndroid="transparent"
                    secureTextEntry={false}
                    style={{ flex: 1, backgroundColor: "#fff" }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: windowWidth,
                  height: 0.5,
                  backgroundColor: "#D9D9D9"
                }}
              />
              <View style={styles.idCardInputView}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ color: "#333333", fontSize: 15 }}>
                    身份证号
                  </Text>
                </View>
                <View style={{ flex: 3, justifyContent: "center" }}>
                  <TextInput
                    ref={textInput1 => {
                      this.textInput1 = textInput1;
                    }}
                    placeholder="请填写正确身份证号（将加密保存）"
                    keyboardType="default"
                    onChangeText={text => {
                      this.setState({
                        idCard:text
                      })
                    }}
                    placeholderTextColor="#D9D9D9"
                    underlineColorAndroid="transparent"
                    secureTextEntry={false}
                    style={{ flex: 1, backgroundColor: "#fff" }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.centerView}>
            <View style={{ flexDirection: "row", marginTop: 34 }}>
              <Text style={{ color: "#333333", fontSize: 18 }}>
                身份证正反面照片
              </Text>
              <Text style={{ color: "#D9D9D9", fontSize: 18 }}>（选填）</Text>
            </View>

            <Text
              style={{
                color: "#8E8E8E",
                fontSize: 12,
                margin: 20,
                marginTop: 30
              }}
            >
              温馨提示：请上传原始比例的身份证正反面，请勿裁剪涂改，保证身份信息清晰显示，否则无法通过审核
            </Text>

            <View
              style={{
                height: 110,
                width: windowWidth,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={{
                  height: 115,
                  width: 145,
                  backgroundColor: "#fff",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.selectPhotoTapped("frontage");
                }}
              >
                <ImageBackground
                  style={{
                    height: 95,
                    width: 145,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  source={require("../../../images/mine/zhengmian.png")}
                >
                <Image  style={styles.frontageImage} source={frontage}/>
                <Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />
                </ImageBackground>
                <Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>
                  正面
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity   onPress={() => {
                  this.selectPhotoTapped("reverse");
                }}
                style={{
                  height: 115,
                  width: 145,
                  backgroundColor: "#fff",
                  alignItems: "center"
                }}
              >
                <ImageBackground
                  style={{
                    height: 95,
                    width: 145,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  source={require("../../../images/mine/beimian.png")}
                >
                 <Image  style={styles.frontageImage} source={reverse}/>
                  <Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />
                </ImageBackground>

                <Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>
                  反面
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
            <View style={{ width: windowWidth }}>
              <Text style={{ color: "#8E8E8E", fontSize: 12, margin: 20 }}>
                为什么需要上传身份信息？
              </Text>
            </View>

            <Text
              style={{ color: "#8E8E8E", fontSize: 12, marginHorizontal: 20 }}
            >
              订单中包含海外购商品，海关要求必须提供真实姓名和身份证号进行实名认证，且实名人与支付人必须一致，错误信息可能导致无法清关。平台保证您的信息安全，绝不对外泄漏！
            </Text>
            <View />
          </View>

          {/* <View style={styles.bottomView}>
            <Text style={{ color: "#333333", fontSize: 15, marginLeft: 15 }}>
              设置为默认实名人
              <Text style={{ color: "#9E9E9E", fontSize: 13, marginLeft: 15 }}>
                （每次下单时默认使用）
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setDefault();
              }}
            >
              <Image
                style={{ width: 27, height: 16, marginRight: 15 }}
                source={couponed}
              />
            </TouchableOpacity>
          </View> */}
          <Button
            colors={["#FE7E69", "#FD3D42"]}
            title="保存"
            linearGradientStyle={styles.surePayButton}
            titleStyle={styles.sureButtonFont}
            onPress={() => {this.addRealName()}}
          />
        </KeyboardAwareScrollView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"实名认证"}
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
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  topView: {
    width: windowWidth,
    height: 160,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5
  },
  inputView: {
    flex: 1,
    marginHorizontal: 17,
    flexDirection: "row"
  },
  idCardInputView: {
    flex: 1,
    marginHorizontal: 17,
    flexDirection: "row"
  },
  centerView: {
    width: windowWidth,
    height: 384,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5
  },
  bottomView: {
    height: 49,
    width: windowWidth,
    backgroundColor: "#fff",
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sureButtonFont: {
    color: "#fff",
    fontSize: 17
  },
  surePayButton: {
    height: 44,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 15
  },
  frontageImage:{
    height: 95,width: 145,
    position:'absolute'
  }
});
