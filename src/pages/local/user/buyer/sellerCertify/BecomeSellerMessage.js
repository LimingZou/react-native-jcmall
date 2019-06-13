/**
 * 认证信息
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
import ImagePicker from "react-native-image-picker";
import { asynImagePicker } from "../../../../../utils/asynImagePicker";


export default class BecomeSellerMessage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let registerMesData = {}
    let arr = []
    let arrIds = []
    let registerStatus = this.props.navigation.state.params.registerStatus
    if (registerStatus === 3) {
      registerMesData = this.props.navigation.state.params.registerMesData
      arr = registerMesData.cardPicUrls.split(',')
      arrIds = registerMesData.cardPicIds.split(',')
    }
    this.state = {
      name: registerMesData.userName,
      idCard: registerMesData.certId,
      mobile: registerMesData.userMobile,
      province: '',
      provinceCode: registerMesData.custProv,
      provinceIndex: '',
      city: '',
      cityCode: registerMesData.custArea,
      registerNum: "",
      modalVisible: false,
      cityModelVisible: false,
      provinceData: '',
      cityData: '',
      registerStatus: registerStatus,
      id: registerMesData.id,
      totalData: {},
      frontage: arr[0],
      frontageFileId: arrIds[0],//身份证正面ID
      reverse: arr[1],
      reverseFileId: arrIds[1],//身份证反面ID
      licence: registerMesData.businessPicId,
      licenceFileId: registerMesData.businessPicUrl,//营业执照ID

    };
  }
  _submitButtonClick() {
    let { province, city } = this.state;
    if (!province) {
      alert("您还没有选择省份");
      return;
    }
    if (!city) {
      alert("您还没有选择地区");
      return;
    }

    /**
     * 请求接口
     */
    if (this.state.registerStatus === 3) {
      //更新提交
      this._updatePersonalRegister()
    } else {
      this._merchantPersonalRegister()
    }
  }
  //个人申请成为商家
  _merchantPersonalRegister = async () => {
    let cardPicIds = this.state.frontageFileId + ',' + this.state.reverseFileId
    let businessPicIdStr = this.state.licenceFileId.toString()
    const params = {
      businessPicId: businessPicIdStr,//营业执照id
      cardPicIds: cardPicIds,//身份证id
      custProv: this.state.provinceCode,
      custProvName: this.state.province,
      custArea: this.state.cityCode,
      custAreaName: this.state.city,
    };
    console.log('个人申请成为商家参数', params);
    fa.toast.show({
      title: "提交中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: LocalLifeApi.merchantPersonalRegister,
      params
    });
    console.log('个人申请成为商家结果', e);
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      Toast.success(e.message)
      this.props.navigation.pop()
      if (this.props.navigation.state.params.callback) {
        this.props.navigation.state.params.callback()
      }
    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  //更新个人申请成为商家信息
  _updatePersonalRegister = async () => {
    let cardPicIds = this.state.frontageFileId + ',' + this.state.reverseFileId
    let businessPicIdStr = this.state.licenceFileId.toString()
    const params = {
      id: this.state.id,
      businessPicId: businessPicIdStr,//营业执照id
      cardPicIds: cardPicIds,//身份证id
      custProv: this.state.provinceCode,
      custProvName: this.state.province,
      custArea: this.state.cityCode,
      custAreaName: this.state.city,
    };
    console.log('更新个人申请成为商家信息参数', params);
    fa.toast.show({
      title: "提交中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: LocalLifeApi.updatePersonalRegister,
      params
    });
    console.log('更新个人申请成为商家信息结果', e);
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      Toast.success(e.message)
      this.props.navigation.pop()
      if (this.props.navigation.state.params.callback) {
        this.props.navigation.state.params.callback()
      }
    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setCityModalVisible(visible) {
    if (visible === true) {
      this._queryCityByProvince(this.state.provinceIndex)
    }
    this.setState({ cityModelVisible: visible });
  }
  //省列表项
  _renderProvinceItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onProvinceShiftClick(item.item, this.state.provinceCodeData[item.index], item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{ height: 50, width: (windowWidth - 30) / 5, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 13, color: '#333333', textAlign: 'left', width: (windowWidth - 30) / 5 }}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击省item
  _onProvinceShiftClick = (provinceText, provinceCode, index) => {
    this.setState({
      province: provinceText,
      provinceCode: provinceCode,
      provinceIndex: index,
    });
    this.setModalVisible(false)
  }
  //城市列表项
  _renderCityItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onCityShiftClick(item.item, this.state.cityCodeData[item.index], item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{ height: 50, width: (windowWidth - 30) / 5, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 13, color: '#333333', textAlign: 'left', width: (windowWidth - 30) / 5 }}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击城市item
  _onCityShiftClick = (cityText, cityCode, index) => {
    this.setState({
      city: cityText,
      cityCode: cityCode,
    });
    this.setCityModalVisible(false)
  }
  //根据省ID获取所有城市
  _queryCityByProvince = async (provinceIndex) => {
    let totalData = this.state.totalData
    let cityArr = [];
    let cityCodeArr = [];
    let cityName = ''
    let cityIndex = 'city' + provinceIndex
    totalData[cityIndex].map((item) => {
      cityArr.push(item.name)
      cityCodeArr.push(item.id)
    })
    this.setState({
      cityData: cityArr,
      cityCodeData: cityCodeArr,
    })
  };
  //查询商家注册开户银行省市
  _huifuArea = async () => {
    const params = {
    };
    console.log('查询商家注册开户银行省市参数', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.huifuArea,
      params
    });
    console.log('查询商家注册开户银行省市结果', e);
    fa.toast.show({
      title: "加载中...",
      type:"loading"
    });
    let provinceArr = [];
    let provinceCodeArr = [];
    let provinceName = '';
    let cityArr = [];
    let cityCodeArr = [];
    let cityName = '';
    let cityData = [];
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      if (e.obj.proivceList.length > 0) {
        e.obj.proivceList.map((item, index) => {
          provinceArr.push(item.name)
          provinceCodeArr.push(item.id)
          if (item.id === this.state.provinceCode) {
            provinceName = item.name
            if (this.state.registerStatus === 3) {
              cityData = e.obj['city' + index]
            }
          }
        })
        if (this.state.registerStatus === 3) {
          cityData.map((item, index) => {
            cityArr.push(item.name)
            cityCodeArr.push(item.id)
            if (item.id === this.state.cityCode) {
              cityName = item.name
            }
          })
        }
        this.setState({
          provinceData: provinceArr,
          provinceCodeData: provinceCodeArr,
          province: provinceName,
          cityData: cityArr,
          cityCodeData: cityCodeArr,
          city: cityName,
          totalData: e.obj,
        })
      }
    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  componentDidMount() {
    this._huifuArea()
  }

  selectPhotoTapped(type) {
    // const options = {
    //   quality: 1.0,
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   title: "",
    //   cancelButtonTitle: "取消",
    //   takePhotoButtonTitle: "拍照",
    //   chooseFromLibraryButtonTitle: "我的相册",
    //   storageOptions: {
    //     skipBackup: true
    //   }
    // };
    //
    // ImagePicker.showImagePicker(options, response => {
    //   console.log("Response = ", response);
    //   if (response.didCancel) {
    //     console.log("User cancelled photo picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else if (response.customButton) {
    //     console.log("User tapped custom button: ", response.customButton);
    //   } else {
    //     let source = { uri: response.uri };
    //     if(type==="reverse"){
    //       this.setState({
    //         reverse: source
    //       });
    //     }else if(type==="frontage"){
    //       this.setState({
    //         frontage: source
    //       });
    //     } else{
    //       this.setState({
    //         licence: source
    //       });
    //     }
    //
    //   }
    // });
    asynImagePicker({
      options: {
        imageCount: 1
      },
      getResult: newImages => {
        console.log(newImages[0])
        if (type === "reverse") {
          this.setState({
            reverseFileKey: newImages[0].key,
            reverse: newImages[0].url,
            reverseFileId: newImages[0].id,
          });
        } else if (type === "frontage") {
          this.setState({
            frontageFileKey: newImages[0].key,
            frontage: newImages[0].url,
            frontageFileId: newImages[0].id,
          });
        } else {
          this.setState({
            licenceFileKey: newImages[0].key,
            licence: newImages[0].url,
            licenceFileId: newImages[0].id,
          });
        }
      }
    });
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight, flex: 1 }
        ]}
      >
        <ScrollView style={{ flex:1,marginBottom:80 }}>
          <ListRow
            style={{ minHeight: 45, marginTop: 10, height: 45 }}
            bottomSeparator={"full"}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>
                <Text style={{ fontSize: 13, color: "#333333", marginLeft: 5 }}>用户省份</Text>
              </View>
            }
            detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
            detail={
              <Text style={{ fontSize: 13, color: this.state.province === '' ? '#D9D9D9' : '#333333' }}>{this.state.province === '' ? '请选择' : this.state.province}</Text>
            }
            accessory={"auto"}
            activeOpacity={0.8}
            onPress={() => {
              this.setModalVisible(true)
            }}
          />
          <ListRow
            style={{ minHeight: 45, height: 45 }}
            bottomSeparator={"full"}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>
                <Text style={{ fontSize: 13, color: "#333333", marginLeft: 5 }}>用户地区</Text>
              </View>
            }
            detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
            detail={
              <Text style={{ fontSize: 13, color: this.state.city === '' ? '#D9D9D9' : '#333333' }}>{this.state.city === '' ? '请选择' : this.state.city}</Text>
            }
            accessory={"auto"}
            activeOpacity={0.8}
            onPress={() => {
              this.state.province === '' ? alert('请先选择省份') :
                this.setCityModalVisible(true)
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
                  source={require("../../../../../images/mine/zhengmian.png")}
                >
                  <Image style={styles.frontageImage} source={{ uri: this.state.frontage }} />
                  <Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />
                </ImageBackground>
                <Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>
                  正面
              </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={() => {
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
                  source={require("../../../../../images/mine/beimian.png")}
                >
                  <Image style={styles.frontageImage} source={{ uri: this.state.reverse }} />
                  <Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />
                </ImageBackground>

                <Text style={{ color: "#333333", fontSize: 12, marginTop: 10 }}>
                  反面
              </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
          </View>

          <View style={styles.yyzzView}>
            <View style={{ flexDirection: "row", backgroundColor: 'white' }}>
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
            <TouchableOpacity onPress={() => {
              this.selectPhotoTapped("licence");
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
                <Image style={styles.frontageImage} source={{ uri: this.state.licence }} resizeMode={'contain'} />
                <Icon name={"tianjiazhaopian"} size={30} color={"#63ADFF"} />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => this._submitButtonClick()}
        >
          <Text style={{ fontSize: 17, color: "#333333" }}>提交</Text>
        </TouchableOpacity>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000077",
              paddingTop: windowHeight - 345,
              paddingHorizontal: 0,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={{ width: windowWidth, height: 345, paddingHorizontal: 15, paddingTop: 20, backgroundColor: 'white' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30 }}>
                <Text style={{ color: '#242424', fontSize: 15, fontWeight: '800' }}>选择省份</Text>
                <Icon name={"-close"} size={10} color={"#7E7E7F"} />
              </View>
              <FlatList
                style={{ backgroundColor: '#fff', marginTop: 20, marginBottom: 20 }}
                numColumns={5}
                data={this.state.provinceData}
                renderItem={this._renderProvinceItem}
              />
            </View>
          </TouchableHighlight>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.cityModelVisible}
          onRequestClose={() => {
            this.setCityModalVisible(false);
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000077",
              paddingTop: windowHeight - 345,
              paddingHorizontal: 0,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setCityModalVisible(false);
            }}
          >
            <View style={{ width: windowWidth, height: 345, paddingHorizontal: 15, paddingTop: 20, backgroundColor: 'white' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30 }}>
                <Text style={{ color: '#242424', fontSize: 15, fontWeight: '800' }}>{this.state.province}</Text>
                <Icon name={"-close"} size={10} color={"#7E7E7F"} />
              </View>
              <FlatList
                style={{ backgroundColor: '#fff', marginTop: 20, marginBottom: 20 }}
                numColumns={5}
                data={this.state.cityData}
                renderItem={this._renderCityItem}
              />
            </View>
          </TouchableHighlight>
        </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    marginLeft: 15,
    flexDirection: 'row',
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
    flex: 1,
    position: 'absolute',
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth - 15 * 2,
    left: 15,
    right: 15,
    bottom: 15,
    height: 45,
  },
  centerView: {
    width: windowWidth,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 20,
  },
  yyzzView: {
    width: windowWidth,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5,
    paddingTop: 20,
    paddingBottom: 0,
  },
  frontageImage: {
    height: 95, width: 145,
    position: 'absolute'
  },
});
