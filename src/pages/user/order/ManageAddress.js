import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import CButton from "../../../components/category/Button";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import ManageAddressItem from "../../../components/my/order/manageAddressItem";
import {Others} from '../../../services/api/others';
import Fetch from "../../../utils/fetch";
import { Toast } from "../../../utils/function";
let _this = null;
import  GetCityCode from '../../../components/@jcmall/selectaddress/getcitycode';
const  GetCode = new GetCityCode();

export default class ManageAddress extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      address: []
    };
    _this = this;
  }

  componentDidMount(){
    // GetCode.gitCityCode();
    // console.log("----city--00000---")
    this.getAddress()
  }

  async getAddress(){
    Fetch.fetch({
      api: Others.addess,
      params:{
        
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        console.log(e)
        this.setState({
          address:e.obj,
        })
      } else {
        Toast.error(e.code);
      }
    });
  }

  async addessSetDefault(id){
    Fetch.fetch({
      api: Others.addessSetDefault,
      params:{
        userAddressId:id
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        this.getAddress()
        if(this.props.navigation.state.params&&this.props.navigation.state.params.sureOrderCallback){
          this.props.navigation.state.params.sureOrderCallback()
        }
      } else {
        console.log(e);
      }
    });
  }

  checkedAddress(item) {
    let temp = this.state.address;
    let newArray = [];
    this.addessSetDefault(item.id)
  }

  addressItem(item) {
    let checked =  false
        if(item.isDefault == 1){
          checked = true
        }
    return (
      <ManageAddressItem
        key={item.id}
        name={item.memberName}
        phone={item.memberMobile}
        address={item.provinceName+item.cityName+item.areaName+' '+item.address}
        checked={checked}
        onPressCheck={() => {
          this.checkedAddress(item);
        }}
        editPress={() => {
          this.props.navigation.navigate("EditAddress", {
            addressdata: item,
            callback: (() => { //回调函数
              this.getAddress()
              if(this.props.navigation.state.params&&this.props.navigation.state.params.sureOrderCallback){
                this.props.navigation.state.params.sureOrderCallback()
              }
            })
          },
        );
        }}
      />
    );
  }

  addressList() {
    let data = this.state.address;
    let tempArray = [];
    data.forEach(item => {
      tempArray.push(this.addressItem(item));
    });
    return tempArray;
  }

  render() {
    const {address} = this.state
    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
        {address&&address.length===0?
            <View style={{alignItems: 'center'}}>
              <ImageBackground
                style={{
                  width: 125,
                  height: 125,
                  marginTop: 66,
                }}
                source={require("../../../images/mine/shdz-kong.png")}
                resizeMode={"contain"}
              />
              <Text style={{color:'#7F7F7F',fontSize:15,marginTop:15}}>你还没有添加收货地址</Text>
              <TouchableOpacity activeOpacity={1}
                                onPress={() => {
                                  this.props.navigation.navigate("AddAddress", {
                                    callback: (() => { //回调函数
                                        this.getAddress()
                                        if(this.props.navigation.state.params&&this.props.navigation.state.params.sureOrderCallback){
                                          this.props.navigation.state.params.sureOrderCallback()
                                        }
                                    })
                                  });
                                }}
                style={{width:130,height:45,marginTop:40,borderRadius:5,borderColor:'#E0324A',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:15,color:'#E0324A'}}>添加收货地址</Text>
              </TouchableOpacity>
            </View>:

            <View style={{flex: 1}}>
              <ScrollView>
                {this.addressList()}
                <CButton
                  colors={["#FE7E69", "#FD3D42"]}
                  title="新增地址"
                  linearGradientStyle={styles.button}
                  titleStyle={styles.buttonStyle}
                  onPress={() => {
                    this.props.navigation.navigate("AddAddress", {
                      callback: (() => { //回调函数
                        this.getAddress()
                        if(this.props.navigation.state.params&&this.props.navigation.state.params.sureOrderCallback){
                          this.props.navigation.state.params.sureOrderCallback()
                        }
                      })
                    });
                  }}
                />
              </ScrollView>
            </View>
        }
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
  },
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
    marginLeft: 15,
    marginRight: 15,
    marginTop:40
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  }
});
