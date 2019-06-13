//门店--商家---商家管理
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import ImagePicker from "react-native-image-picker";
import Picker from "react-native-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import LineSpace from "../../../../components/local/common/LineSpace";
import { Toast } from "../../../../utils/function";
import fa from "../../../../utils/fa";
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";
import { Field } from "../../../../components";
import { asynImagePicker } from "../../../../utils/asynImagePicker";
import { NetworkImage } from "../../../../components/theme";
import CommonUtils from "../../../local/utils/CommonUtils";

import { connect } from "react-redux";
const datas = [
  { key: 'storename', title: '商家名称', placeholder: '请输入商家名称' },
  { key: 'selectCategory', title: '选择行业', placeholder: '' },
  { key: 'storephone', title: '商家电话', placeholder: '请输入商家电话' },
  { key: 'storelocation', title: '商家地址', placeholder: '选择商铺地址' },
  { key: 'storeAddress', title: '', placeholder: '详细地址：如道路、门牌号、小区、楼栋号、单元室等' },
  { key: 'storetime', title: '营业时间设置', placeholder: ['开始时间', '结束时间'] },
];

@connect(
  ({
    view: {
      local: {
        selectedArea,
      }
    },
    app: {
      user: {
        login,
      },
      location: {
        address
      }
    }
  }) => ({
    selectedArea,
    login,
    address,
  })
)
export default class StoreManager extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      storeAddress: '',
      storePhone: '',
      storeDes: '',
      logoSource: '',
      startTime: '20:00',
      endTime: '20:00',
      desvalue: '',
      facePic: {},
      industryList: [],
      industryShowList: [],
      industrySelected: '',
      industrySelectedArray: [],
      industrySelectedIndex: -1,
      selectedTimeArray: [],
      images: [],
      uploaderMaxNum: 8,
      uploaderButtonDes: "(最多添加8张)",
      uploaderButtonText: "添加图片",
      date: "",
      reasonList: [],
      reason: "",
      saleAccount: '',
      businessType: {
        value: '',
        label: ''
      },
      curLocation: {
        longitude: props.address.gaode_location.lng,  //经度
        latitude: props.address.gaode_location.lat,   //维度
        provinceName: props.address.addressComponent.province,
        cityName: props.address.addressComponent.city,
        areaName: props.address.addressComponent.district,
        street: props.address.addressComponent.street,
        formatted_address: props.address.formatted_address,
      },
      areaInfoCode: [],
      inputDisable: false,
      detail: {},
      businessStatus: 0,
      storeDes: '',
      locationAddress: '',
      isAddressFocus: true,
    };

  }

  componentDidMount() {
    const { curLocation } = this.state;
    const { navigation, address } = this.props;
    let info = navigation.state.params.info;  //商家认证基本信息字段
    let status = info.status;
    console.log("address======&&&&&&", address);
    this.setState({
      businessStatus: status,
      inputDisable: status == 100 ? true : false,
      locationAddress: curLocation.formatted_address,
    });

    //行业分类列表
    this._requestIndustryTypeList();
    let names = curLocation.provinceName + ',' + curLocation.cityName + ',' + curLocation.areaName;
    //省市区数据code
    this._queryAreaCode(names);
  }

  //获取门店详情
  _requestStoreDetail = async (id, industryList) => {

    console.log("storeInfo id======", id);
    const params = {
      id,
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryStoreDetail,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      console.log("storedetail======", e);
      let datas = e.obj;
      let industryName = '';
      industryList.map((item, index) => {
        if (item.value == datas.industryCode) {
          industryName = item.label;
        }
      });
      //地址
      let addresses = datas.address.split(' ');
      let imageArray = datas && datas.detailList || [];
      let tempImages = [];
      imageArray.map((item, index) => {
        tempImages.push({
          url: item.detailUrl,
          id: item.detailImageId,
        });
      });

      console.log('--------', typeof (datas.generousDiscounts));
      console.log('-----generousDiscounts---', datas.generousDiscounts);
      //初始化信息，
      // 封面图id:id:datas.imageId
      // 描述图ids:datas.imageIds
      let openTime = CommonUtils.parseIntTime2Str(datas.openTime);
      let closeTime = CommonUtils.parseIntTime2Str(datas.closeTime);

      this.setState({
        detail: datas,
        images: tempImages,
        facePic: { url: datas.imageUrl, id: datas.imageId },
        storeName: datas.merchantName,
        businessType: {
          value: datas.industryCode,
          label: industryName,
        },
        storePhone: datas.merchantPhone,
        storeAddress: addresses[1],
        isAddressFocus: addresses[1] && addresses[1].length > 0 ? false : true,
        saleAccount: String(datas.generousDiscounts),
        startTime: openTime,
        endTime: closeTime,
        storeDes: datas.description,
        locationAddress: addresses[0]
      });

    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //获取门店分类列表
  _requestIndustryTypeList = async () => {
    const { navigation } = this.props;
    let info = navigation.state.params.info;  //商家认证基本信息字段
    let status = info.status;
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryIndustryTypeList,
    });
    if (fa.code.isSuccess(e.code)) {
      let dataObject = e.obj;
      if (dataObject) {
        console.info('tempList.list=====', dataObject);
        let tempList = [];
        dataObject.map((data, index) => {
          tempList.push({
            label: data.configItemCodeName,
            value: data.configItemCode,
          });
        });

        this.setState({
          industryList: dataObject,
          industryShowList: tempList,
        });
        //status==0表示无店铺信息
        if (status !== 0) {
          this._requestStoreDetail(info.merchantInfoId, tempList);
        }
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //获取所有省市区code
  _queryAreaCode = async (names) => {
    const params = {
      codeNames: names,
    };
    console.log('获取codes参数', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryCityInfoByCityName,
      params
    });
    console.log('获取codes结果', e);
    if (fa.code.isSuccess(e.code)) {
      this.setState({
        areaInfoCode: e.obj,
      })
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //添加或修改店铺
  _commitStoreUpdate = async (params) => {
    const { navigation } = this.props;
    let info = navigation.state.params.info;  //商家认证基本信息字段
    let callBack = navigation.state.params.callBack;
    let status = info.status;
    //status==0表示无店铺信息
    console.log("storeInfo add params======", params);
    const e = await Fetch.fetch({
      api: status == 0 ? LocalLifeApi.updateMerchantAdd : LocalLifeApi.updateMerchantUpdate,
      params: status == 0 ? params : Object.assign(params, { id: info.merchantInfoId }),
    });
    let api = status == 0 ? LocalLifeApi.updateMerchantAdd : LocalLifeApi.updateMerchantUpdate;
    console.log("storeInfo api updateMerchantAdd======", api);
    console.log("storeInfo add======", e);
    if (fa.code.isSuccess(e.code)) {
      Toast.warn(e.message);
      callBack && callBack();
      navigation.pop();
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  /**
   * 提交店铺信息
   */
  _commitStoreInfo = () => {
    const { storeName, businessType, storePhone, storeAddress, areaInfoCode,
      curLocation, startTime, endTime, storeDes, locationAddress, facePic,
      images, saleAccount,
    } = this.state;
    if (!facePic || !facePic.url) {
      Toast.warn('请选择封面图片');
      return;
    }
    if (!storeName) {
      Toast.warn('请输入商家名称');
      return;
    }
    if (!businessType.label) {
      Toast.warn('请选择行业！');
      return;
    }
    if (!storePhone) {
      Toast.warn('请输入商家电话！');
      return;
    }
    if (!locationAddress) {
      Toast.warn('选择商铺地址！');
      return;
    }
    if (!storeAddress) {
      Toast.warn('请输入详细地址！');
      return;
    }
    if (!startTime) {
      Toast.warn('请选择开始时间！');
      return;
    }
    if (parseFloat(saleAccount) <= 0) {
      Toast.warn('请填写折扣！');
      return;
    } else if (parseFloat(saleAccount) > 10) {
      Toast.warn('请填写1-10的正确折扣值！');
    }
    if (!endTime) {
      Toast.warn('请选择结束时间！');
      return;
    }
    if (!storeDes) {
      Toast.warn('请输入商铺介绍！');
      return;
    }
    if (!images || images.length == 0) {
      Toast.warn('请添加商品图片！');
      return;
    }
    //图片多张时
    let imageUrls = [];
    images.map((image, index) => {
      imageUrls.push(image.id);
    });
    //数组拼接成字符串
    let imageUrlStr = imageUrls.join();
    //请求参数
    let requstParams = {
      merchantName: storeName,
      merchantPhone: storePhone,
      industryCode: businessType.value,
      imageUrl: facePic.id ? facePic.id : '',  //测试
      provinceCode: areaInfoCode[0].codeId,
      provinceName: areaInfoCode[0].name,
      cityCode: areaInfoCode[1].codeId,
      cityName: areaInfoCode[1].name,
      areaCode: areaInfoCode[2].codeId,
      areaName: areaInfoCode[2].name,
      address: locationAddress + ' ' + storeAddress,
      localX: curLocation.latitude,
      localY: curLocation.longitude,
      openTime: CommonUtils.parseStrTime2Int(startTime),
      closeTime: CommonUtils.parseStrTime2Int(endTime),
      description: storeDes,
      generousDiscounts: saleAccount,
      detailsId: imageUrlStr ? imageUrlStr : '',   // 测试
    }
    console.log('add store parmas=', requstParams);
    this._commitStoreUpdate(requstParams);
  }

  //输入框
  _onInputChange = (text, index) => {
    if (index == 0) {
      this.setState({
        storeName: text,
      });
    } else if (index == 2) {
      this.setState({
        storePhone: text,
      });
    } else if (index == 4) {
      this.setState({
        storeAddress: text,
      });
    }
  }

  //折扣设置输入框
  _onSaleInputChange = (text) => {
    this.setState({
      saleAccount: text,
    });
  }

  //商铺介绍
  _onDesChange = (e) => {
    this.setState({
      storeDes: e,
    });
  }

  onBusinessTypeChange = (e) => {
    console.log('onBusinessTypeChange=', e);
    this.setState({
      businessType: e.data,
    });
  }

  _renderManagerItem = (item, index) => {
    const { storeName, storeAddress, storePhone, businessType, industryShowList,
      inputDisable, startTime, endTime, locationAddress, isAddressFocus } = this.state;
    if (index == 0 || index == 2) {
      return (
        <View
          key={index}
          style={styles.input_container}>
          <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.title}</Text>
          <TextInput
            ref={(input) => this.inputName = input}
            style={styles.input}
            editable={!inputDisable}
            multiline={false}
            keyboardType={index == 2 ? 'numeric' : 'default'}
            value={index == 0 ? storeName : storePhone}
            maxLength={index == 0 ? 100 : 11}
            placeholder={item.placeholder}
            placeholderTextColor='#D9D9D9'
            underlineColorAndroid='transparent'
            onChangeText={(text) => this._onInputChange(text, index)}
          />
        </View>
      );
    } else if (index == 1) {
      return (
        <Field
          key={index}
          rightIcon={'-arrow-down'}
          disabled={inputDisable}
          type={"picker-text"}
          title="选择行业"
          pickerTilte=""
          placeholder={'请选择'}
          value={businessType.label}
          data={industryShowList}
          onChange={e => {
            this.onBusinessTypeChange(e);
          }}
        />
      );
    } else if (index == 3) {
      let placeColor = '#D9D9D9';
      let iconColor = '#00A8FF';
      let icon = '-dingwei';
      let iconSize = 16;
      return (
        <View style={styles.input_container} key={index}>
          <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.title}</Text>
          <TouchableOpacity
            disabled={inputDisable}
            onPress={() => { this._onMapAddressPress() }}
            style={{ width: windowWidth - 120, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={[PublicStyles.title, { fontSize: 13, color: placeColor }]}>{locationAddress}</Text>
              <Icon name={icon} size={iconSize} color={iconColor} style={{ marginLeft: 5, }} />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (index == 4) {
      return (
        <View style={styles.input_single} key={index} >
          <TextInput
            editable={!inputDisable}
            ref={(input) => this.inputArea = input}
            style={[styles.input_left, { textAlign: isAddressFocus ? 'left' : 'right' }]}
            multiline={false}
            value={storeAddress}
            placeholder={item.placeholder}
            placeholderTextColor='#D9D9D9'
            underlineColorAndroid='transparent'
            onChangeText={(text) => this._onInputChange(text, index)}
            onFocus={value => {
              this.handleAddressFocus(value);
            }}
            onBlur={value => {
              this.handleAddressBlur(value);
            }}
          />
        </View>
      );
    } else if (index == 5) {
      return (
        <Field
          key={index}
          disabled={inputDisable}
          type={"picker-time"}
          title="营业时间设置"
          startPlaceHold='开始时间'
          endPlaceHold='结束时间'
          value={{ beginTime: startTime, endTime: endTime }}
          onChange={e => {
            this.onDateChange(e);
          }}
        />
      );
    }
  }

  /**
   * 定位选取定位坐标信息
   * 
   */
  _onMapAddressPress = () => {
    const { curLocation } = this.state;
    const { navigation, } = this.props;
    navigation.navigate("MapWebView", { location: curLocation, callBack: this._selectAreAddress });
  }

  /**
   * 地图选点后的回调数据
   */
  _selectAreAddress = (location) => {
    if (location.name) {
      let address = location.province + location.city + location.district + location.name;
      this.setState({
        locationAddress: address,
        curLocation: {
          longitude: location.location.lng,  //经度
          latitude: location.location.lat,   //维度
          provinceName: location.location.province,
          cityName: location.location.city,
          areaName: location.location.district,
          street: '',
          formatted_address: address,
        },
      });
    }

  }

  handleAddressFocus = () => {
    this.setState({
      isAddressFocus: true
    });
  }

  handleAddressBlur = () => {
    this.setState({
      isAddressFocus: false,
    });
  }

  _renderWorkTimeDes = () => {
    return (
      <View style={styles.input_des_container}>
        <Text style={[PublicStyles.title, { fontSize: 10, color: '#7F7F7F' }]}>此处设置好时间后，用户会在商铺列表里看到当前商铺的营业状态。</Text>
      </View>
    );
  }

  //折扣设置
  _renderSaleSetting = () => {
    const { inputDisable, saleAccount } = this.state;

    console.log('++++++', this.state);
    console.log('++++++saleAccount', saleAccount);
    const { navigation } = this.props;
    let info = navigation.state.params.info;  //商家认证基本信息字段
    return (
      <View
        style={styles.input_container}>
        <Text style={[PublicStyles.title, { fontSize: 15 }]}>折扣比例设置</Text>
        <View style={styles.input_right}>
          <TextInput
            disabled={inputDisable}
            style={styles.input}
            keyboardType={'numeric'}
            value={saleAccount}
            maxLength={10}
            placeholder={'7.5'}
            placeholderTextColor='#D9D9D9'
            underlineColorAndroid='transparent'
            onChangeText={(text) => this._onSaleInputChange(text)}
          />
          <Text style={[PublicStyles.title, { fontSize: 15 }]}>折</Text>
        </View>
      </View>
    );
  }

  //输入框项
  _renderItems = () => {
    return datas.map((item, index) => {
      return this._renderManagerItem(item, index);
    });
  }

  //拍照图片
  _renderPicItem = (item, index) => {
    return (
      <Image
        style={styles.pic_container}
        key={index}
        source={{ uri: item }}
      />
    );
  }

  //textarea
  _renderTextArea = () => {
    const { inputDisable, storeDes } = this.state;
    return (
      <View style={styles.des_container}>
        <View style={styles.des_title_container}>
          <Text style={[PublicStyles.title, { fontSize: 13, }]}>商铺介绍</Text>
        </View>
        <View style={styles.des_area_container}>
          <TextInput
            editable={!inputDisable}
            ref={(input) => this.inputSale = input}
            style={styles.textarea_container}
            multiline={true}
            value={storeDes}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this._onDesChange(text)}
          />
        </View>
      </View>
    );
  }

  _handleFieldChange = (value) => {

  }

  _createDateData = () => {
    let date = [];
    let mins = [];
    let hours = [];
    for (let m = 0; m <= 60; m++) {
      mins.push(m < 10 ? '0' + m : '' + m);
    }
    for (let h = 0; h < 24; h++) {
      hours.push(h);
    }
    for (let d = 0, len = hours.length; d < len; d++) {
      let _date = {};
      _date[d < 10 ? '0' + d : '' + d] = mins;
      date.push(_date);
    }

    return date;
  }

  //封面图
  _renderFacePic = () => {
    const { inputDisable } = this.state;
    if (this.state.facePic.url) {
      return (
        <TouchableOpacity
          disabled={inputDisable}
          activeOpacity={0.2}
          onPress={this.selectPhotoTapped.bind(this)}>
          <NetworkImage
            source={{ uri: this.state.facePic.url }}
            style={styles.face_pic_container}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.2}
          disabled={inputDisable}
          style={styles.content_top_inner}
          onPress={this.selectPhotoTapped.bind(this)}>
          <View style={styles.take_pic}>
            <Icon name="tianjiazhaopian" size={25} color={'#D9D9D9'} />
            <Text style={[PublicStyles.title, styles.takepic]}>添加封面图片</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  //封面图
  selectPhotoTapped = () => {
    asynImagePicker({
      options: {
        imageCount: 1,
      },
      getResult: newImages => {
        console.log('faceimage==', newImages);
        this.setState({
          facePic: newImages[0],
        });
      }
    });
  }

  //详情图
  onImagesChange({ value }) {
    console.log('newImages==', value);
    this.setState({
      images: value
    });
  }

  onDateChange({ value }) {
    console.log('picktime=', value);

    this.setState({
      startTime: value.beginTime,
      endTime: value.endTime,
    });
  }

  onResonChange({ value }) {
    this.setState({
      reason: value
    });
  }

  render() {
    const {
      images,
      uploaderMaxNum,
      uploaderButtonDes,
      uploaderButtonText,
      inputDisable,
    } = this.state;

    return (
      <View
        style={styles.container}>
        <KeyboardAwareScrollView
          keyboardDismissMode={"on-drag"}
        >
          <ScrollView style={styles.content}>
            <View style={styles.content_top}>
              {this._renderFacePic()}
            </View>
            {this._renderItems()}
            {this._renderSaleSetting()}
            {this._renderWorkTimeDes()}
            {this._renderTextArea()}
            <LineSpace style={styles.line_s} />
            <Field
              disabled={inputDisable}
              title={uploaderButtonText}
              desc={uploaderButtonDes}
              type={"uploader"}
              value={images}
              uploaderMaxNum={uploaderMaxNum}
              onChange={e => {
                this.onImagesChange(e);
              }}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"商铺管理"}
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

          rightView={
            inputDisable ? <Text
              style={[PublicStyles.title, { fontSize: 15, padding: 10 }]}
              onPress={() => { this._commitStoreInfo() }}
            >保存</Text> :
              <Text
                style={[PublicStyles.title, { fontSize: 15, padding: 10 }]}
                onPress={() => { this._commitStoreInfo() }}
              >保存</Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9e9e9",
    paddingTop: NavigationBar.Theme.contentHeight
  },
  content: {
    flex: 1,
    height: windowHeight,
  },
  content_top: {
    width: windowWidth,
    marginBottom: 10,
    height: 175,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content_top_inner: {
    flex: 1,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: windowWidth - 30,
  },
  face_pic_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: windowWidth - 30,
  },
  take_pic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  takepic: {
    fontSize: 13,
    marginTop: 10,
  },
  input_container: {
    width: windowWidth,
    height: 44,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input_single: {
    width: windowWidth,
    height: 44,
    paddingHorizontal: 15,
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlign: 'right',
    width: 150,
    marginRight: 10,
    fontSize: 15,
    color: '#333',
  },
  input_left: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  input_des_container: {
    width: windowWidth,
    height: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  time_container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  upload_container: {
    width: windowWidth,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pic_container: {
    width: (windowWidth - 76) / 3,
    height: (windowWidth - 76) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  pic_add: {
    color: '#B2B2B2',
    fontSize: 50,
    textAlign: 'center',
  },
  des_area_container: {
    width: windowWidth - 30,
    padding: 15,
    height: 100,
    borderRadius: 5,
    marginBottom: 25,
    backgroundColor: '#F7F7F7',
  },
  des_container: {
    height: 160,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  des_title_container: {
    width: windowWidth,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  pic_list: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 35,
    width: windowWidth,
    paddingHorizontal: 23
  },
  line_s: {
    height: 0.5,
  },
  textarea_container: {
    width: windowWidth - 64,
    height: 67,
    backgroundColor: '#F7F7F7',
    fontSize: 12,
    color: '#333',
  },
});
