/**
 * 个人认证商家-审核中页面（只可查看）
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground, TouchableHighlight, Picker, Modal, FlatList
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../../../utils/style";
import Icon from "../../../../../config/iconFont";
import ListRow from '../../../../../components/@jcmall/listRow';
import LinearGradient from "../../../../user";
import Fetch from "../../../../../utils/fetch";
import { LocalLifeApi } from "../../../../../services/api/localLife";
import fa from "../../../../../utils/fa";
import { Toast } from "../../../../../utils/function";


export default class BecomeSellerAlreadyMessage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let registerMesData=this.props.navigation.state.params.registerMesData
    let url= "http://jckj-cloud-test.oss-cn-shanghai.aliyuncs.com/img/2019-04-29/4837364270357910.png"
    let arr=registerMesData.cardPicUrls.split(',')
    this.state = {
      name: registerMesData.userName,
      idCard: registerMesData.certId,
      mobile: registerMesData.userMobile,
      province:'',
      provinceCode:registerMesData.custProv,
      city:'',
      cityCode:registerMesData.custArea,
      registerNum: "",
      modalVisible:false,
      cityModelVisible:false,
      provinceData:'',
      cityData:'',
      frontage:arr[0],//身份证正面
      reverse:arr[1],//身份证反面
      licence:registerMesData.businessPicUrl,//营业执照
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setCityModalVisible(visible) {
    this.setState({ cityModelVisible: visible });
  }
  //省列表项
  _renderProvinceItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onProvinceShiftClick(item.item,this.state.provinceCodeData[item.index],item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{flex:1,height:50,width:(windowWidth-30)/5,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize: 13, color: '#333333',textAlign:'left',width:(windowWidth-30)/5}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击省item
  _onProvinceShiftClick = (provinceText,provinceCode,index) => {
    this.setState({
      province:provinceText,
      provinceCode:provinceCode,
    });
    this.setModalVisible(false)
  }
  //城市列表项
  _renderCityItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onCityShiftClick(item.item,this.state.cityCodeData[item.index],item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{height:50,width:(windowWidth-30)/5,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize: 13, color: '#333333',textAlign:'left',width:(windowWidth-30)/5}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击城市item
  _onCityShiftClick = (cityText,cityCode,index) => {
    this.setState({
      city:cityText,
      cityCode:cityCode,
    });
    this.setCityModalVisible(false)
  }
  componentDidMount() {
    this._huifuArea()
  }

  //查询商家注册开户银行省市
  _huifuArea = async () => {
    const params = {
    };
    console.log('查询商家注册开户银行省市参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.huifuArea,
      params
    });
    console.log('查询商家注册开户银行省市结果',e);
    fa.toast.show({
      title: "加载中...",
      type:"loading"
    });
    let provinceArr=[];
    let provinceCodeArr=[];
    let provinceName='';
    let cityArr=[];
    let cityCodeArr=[];
    let cityName='';
    let cityData=[];
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      if (e.obj.proivceList.length>0) {
        e.obj.proivceList.map((item,index)=> {
          provinceArr.push(item.name)
          provinceCodeArr.push(item.id)
          if(item.id===this.state.provinceCode){
            provinceName=item.name
            cityData=e.obj['city'+index]
          }
        })
        cityData.map((item,index)=> {
          cityArr.push(item.name)
          cityCodeArr.push(item.id)
          if(item.id===this.state.cityCode){
            cityName=item.name
          }
        })
        this.setState({
          provinceData:provinceArr,
          provinceCodeData:provinceCodeArr,
          province:provinceName,
          cityData:cityArr,
          cityCodeData:cityCodeArr,
          city:cityName,
          totalData:e.obj,
        })
      }
    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight,flex:1 }
        ]}
      >

        <ListRow
          style={{ minHeight: 45,marginTop:10,height:45 }}
          bottomSeparator={"full"}
          title={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>
              <Text style={{ fontSize: 13, color: "#333333",marginLeft:5 }}>用户省份</Text>
            </View>
          }
          detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
          detail={
            <Text style={{ fontSize: 13, color: this.state.province===''?'#D9D9D9':'#333333' }}>{this.state.province===''?'请选择':this.state.province}</Text>
          }
          accessory={"auto"}
          activeOpacity={0.8}
          onPress={() =>{
            // this.setModalVisible(true)
          }}
        />
        <ListRow
          style={{ minHeight: 45,height:45 }}
          bottomSeparator={"full"}
          title={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>
              <Text style={{ fontSize: 13, color: "#333333",marginLeft:5 }}>用户地区</Text>
            </View>
          }
          detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
          detail={
            <Text style={{ fontSize: 13, color: this.state.city===''?'#D9D9D9':'#333333' }}>{this.state.city===''?'请选择':this.state.city}</Text>
          }
          accessory={"auto"}
          activeOpacity={0.8}
          onPress={() =>{
            // this.state.province===''?alert('请先选择省份'):
            //   this.setCityModalVisible(true)
          }}
        />
        <View style={styles.centerView}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#333333", fontSize: 18 }}>
              身份证正反面照片
            </Text>
            <Text style={{ color: "#FD3E42", fontSize: 18 }}>（必填）</Text>
          </View>

          <Text
            style={{
              color: "#8E8E8E",
              fontSize: 12,
              margin: 20,
              marginTop: 30
            }}
          >
            温馨提示：请上传原始比例的身份证正反面，请勿裁剪涂改，保证身份信息清晰可辨。大小：小于800kb
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
                // this.selectPhotoTapped("frontage");
              }}
            >
              <ImageBackground
                style={{
                  height: 95,
                  width: 145,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                source={require("../../../../../images/mine/zhengmian.png")}
              >
                <Image  style={styles.frontageImage} source={{uri:this.state.frontage}}/>
                {/*<Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />*/}
              </ImageBackground>
              <Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>
                正面
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity   onPress={() => {
              // this.selectPhotoTapped("reverse");
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
                source={require("../../../../../images/mine/beimian.png")}
              >
                <Image  style={styles.frontageImage} source={{uri:this.state.reverse}}/>
                {/*<Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />*/}
              </ImageBackground>

              <Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>
                反面
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
        </View>

        <View style={styles.yyzzView}>
          <View style={{ flexDirection: "row",backgroundColor:'white' }}>
            <Text style={{ color: "#333333", fontSize: 18 }}>
              营业执照
            </Text>
            <Text style={{ color: "#FD3E42", fontSize: 18 }}>（必填）</Text>
          </View>

          <Text
            style={{
              color: "#8E8E8E",
              fontSize: 12,
              margin: 20,
              marginTop: 20
            }}
          >温馨提示：请上传营业执照元件，请勿裁剪涂改，保证信息清晰可辨。大小：小于800kb

          </Text>
          <TouchableOpacity   onPress={() => {
            // this.selectPhotoTapped("licence");
          }}
                              style={{
                                height: 115,
                                width: 145,
                                backgroundColor: "#fff",
                                alignItems: "center",
                              }}
          >
            <ImageBackground
              style={{
                height: 95,
                width: 145,
                alignItems: "center",
                justifyContent: "center"
              }}
              resizeMode={'contain'}
              source={require("../../../../../images/mine/yyzz.png")}
            >
              <Image  style={styles.frontageImage} source={{uri:this.state.licence}} resizeMode={'contain'}/>
              {/*<Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />*/}
            </ImageBackground>

            {/*<Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>*/}
            {/*反面*/}
            {/*</Text>*/}
          </TouchableOpacity>
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"个人认证"}
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
    backgroundColor: "#EAEAEA"
  },
  itemContainer1: {
    height: 45,
    width: windowWidth,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems:'center',
    justifyContent:'space-between',
  },
  leftIcon: {
    marginLeft: 15,
    flexDirection:'row',
  },
  textInput: {
    marginLeft: 20,
    marginTop: 3,
    fontSize: 14,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 15,
    height: 42,
    color: "#A3A3A3",
    flex: 1,
    textAlign: 'right',
  },
  selectedTextInput: {
    marginLeft: 20,
    // marginTop: 3,
    fontSize: 14,
    // borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 5,
    height: 42,
    color: "#A3A3A3",
    flex: 1,
    textAlign: 'right',
  },
  bottomButton: {
    flex:1,
    position:'absolute',
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth - 15 * 2,
    left:15,
    right:15,
    bottom:35,
    height: 45,
  },
  centerView: {
    width: windowWidth,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5,
    paddingVertical:20,
  },
  yyzzView: {
    width: windowWidth,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5,
    paddingTop:20,
    paddingBottom:0,
  },
  frontageImage:{
    height: 95,width: 145,
    position:'absolute'
  },
});
