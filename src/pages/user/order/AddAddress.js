import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import CButton from "../../../components/category/Button";
import LinearGradient from "react-native-linear-gradient";
import Picker from "react-native-picker";
import SelectAddress from "../../../components/@jcmall/selectaddress/selectaddress";
const mSelectAddress = new SelectAddress();
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Modal } from "antd-mobile-rn";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import Fetch from "../../../utils/fetch";
import { Others } from "../../../services/api/others";
import { HelpCenterApi } from "../../../services/api/helpCenter";
import { Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
import Verify from "../../../utils/verify";
import  GetCityCode from '../../../components/@jcmall/selectaddress/getcitycode';
const  GetCode = new GetCityCode();

let _this = null;
export default class AddAddress extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      address: "",
      province: "",
      city: "",
      district: "",
      name: "",
      phone: "",
      preciseaddress: "",
      edit: false,
      id: "",
      provinceId:"",
      cityId:"",
      areaId:"",
      provinceId:"",
      cityId:"",
      areaId:""
    };
    this.inputItem = this.inputItem.bind(this);
    this.selectAddressItem = this.selectAddressItem.bind(this);
    this.inputChange = this.inputChange.bind(this);
    _this = this;
  
  }

  componentDidMount(){

  }

  selectAddressItem(address) {
    const { province, city, district, preciseaddress } = this.state;
    let select1 = province.length > 0 ? province : "请选择";
    let select1Color = province.length > 0 ? "#333333" : "#D9D9D9";
    let select2 = city.length > 0 ? city : "请选择";
    let select2Color = city.length > 0 ? "#333333" : "#D9D9D9";
    let select3 = district.length > 0 ? district : "请选择";
    let select3Color = district.length > 0 ? "#333333" : "#D9D9D9";

    return (
      <View style={styles.inputItemSt}>
        <View style={{ width: 80, height: 44, justifyContent: "center" }}>
          <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
            所在地区
          </Text>
        </View>
        <TouchableOpacity style={styles.selectAddress}
          onPress={() => {
            this._showAreaPicker();
          }}>
          <Text style={{ color: select1Color, fontSize: 13, marginLeft: 13 }}>
            {select1}
          </Text>
          {select1!="请选择"? null:
            <Text style={{ color: "#333333", fontSize: 13 }}>省</Text>
          }
          <Text style={{ color: select2Color, fontSize: 13 }}>{select2}</Text>
          {select2!="请选择"? null:
            <Text style={{ color: "#333333", fontSize: 13 }}>市</Text>
          }
          <Text style={{ color: select3Color, fontSize: 13 }}>{select3}</Text>
          {select3!="请选择">0? null:
            <Text style={{ color: "#333333", fontSize: 13 }}>区</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }

  inputItem(title, placeholder, type, keyboardType) {
    return (
      <View style={styles.inputItemSt}>
        <View style={{width: 80,height: 44,justifyContent: "center",marginRight: 20}}>
          <Text style={{ color: "#333333", fontSize: 13, marginLeft: 15 }}>
            {title}
          </Text>
        </View>
        <TextInput
          ref={textInput1 => {this.textInput1 = textInput1;}}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={text => {
            this.inputChange(text,type)
          }}
          placeholderTextColor="#D9D9D9"
          underlineColorAndroid="transparent"
          secureTextEntry={false}
          style={{
            height: 43,
            backgroundColor: "#fff",
            width: windowWidth - 100
          }}
        />
      </View>
    );
  }
  

  inputChange(text,type){
    if(type == "name"){this.setState({name: text})}
    if(type == "phone"){this.setState({phone: text})}
    if(type == "preciseaddress"){this.setState({preciseaddress: text})}
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
          district: pickedValue[2],
          address: pickedValue[0] + pickedValue[1] + pickedValue[2]
        });

        GetCode.gitCityCode(pickedValue[0],pickedValue[1],pickedValue[2]).then((response)=>{
            if(response&&response.length>0){
              this.setState({
                provinceId: response[0] ,
                cityId: response[1] ,
                areaId: response[2] 
              })
            }
          console.log(response)
          console.log("--response---code-")
        })
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

  saveAddress() {
    const { name, phone, address, preciseaddress,id } = this.state;
    if (name.length < 1) {
      return  Toast.info("姓名不能为空");
    }
    if (!Verify.verifyPhone(phone)) {
      return  Toast.info("请输入正确的手机号");
    }
    if (address.length<1) {
      return  Toast.info("请输入收货地址");
    }
    if (preciseaddress.length < 1) {
      return  Toast.info("请输入详细地址");
    }
    this.addessSave()
  }

  async addessSave(){
    const { name, phone, address, preciseaddress,id,provinceId ,cityId,areaId} = this.state;
    Fetch.fetch({
      api: Others.addessSave,
      params:{
        provinceId:provinceId,
        cityId:cityId,
        areaId:areaId,
        address:preciseaddress,
        memberName:name,
        memberMobile:phone,
      }
    }).then(e => {
      console.log(e)
      console.log("----添加地址-----")
      if (e.code === 0||e.code==='0000') {
        if (this.props.navigation.state.params&&this.props.navigation.state.params.callback()) {
          this.props.navigation.state.params.callback()
        }
        Toast.info(e.message)
        this.props.navigation.pop();
      } else {
        Toast.error(fa.code.parse(e.code, e.message));
      }
    });
  }

  render() {
    const { name, phone, address, preciseaddress, edit } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <KeyboardAwareScrollView>
          <View style={{ marginTop: 20 }}>
            {this.inputItem("收货人","请填写收货人姓名","name","default")}
            <View style={styles.lineView}/>
            {this.inputItem("手机号码","请填写收货人手机号","phone","numeric")}
            <View style={styles.lineView}/>
             {this.selectAddressItem(address)}
            <View style={styles.lineView}/>
            {this.inputItem("详细地址","请输入详细地址，如街道、门牌号等",
              "preciseaddress","default")}
          </View>

          <CButton
            colors={["#FE7E69", "#FD3D42"]}
            title="保存"
            style={{ marginTop: 100 }}
            linearGradientStyle={styles.button}
            titleStyle={styles.buttonStyle}
            onPress={() => {
              this.saveAddress();
            }}
          />
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"收货地址"}
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
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    borderRadius:5,
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  },
  selectAddressView:{
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  selectAddress:{
    width: windowWidth - 95,
    height: 44,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center"
  },
  lineView:{
    width: windowWidth,height: 0.5,backgroundColor: "#D9D9D9"
  },
  inputItemSt:{
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  }
});
