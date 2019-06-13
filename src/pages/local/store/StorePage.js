"use strict"
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  ScrollView,
  Platform,

} from "react-native";

import {
  windowWidth,
  PublicStyles,
  ThemeStyle,
  windowHeight
} from "../../../utils/style";

import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import TabSwiper from "../../../components/local/common/TabSwiper";
import FlatList from "../../../components/flatList";
import LineSpace from "../../../components/category/LineSpace";
import StoreItem from "../../../components/local/store/StoreItem";
import TabItem from "../../../components/local/store/TabItem";



import CommonUtils from "../utils/CommonUtils";
import { Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
import Fetch from "../../../utils/fetch";
import { LocalLifeApi } from "../../../services/api/localLife";
import { connect } from "react-redux";
import { updateArea } from "../../../redux/actions/local/store/city";
//底部tab
const tabJsons = [{ name: "门店", icon: "-mendian" }, { name: "我的", icon: "-user" }];

//筛选栏
const shiftJsons = [{ type: "all", name: "全部", icon: "" }, { type: "industry", name: "分类", icon: "-below", }, { type: "area", name: "地区", icon: "-below" }];

const banner1 = require("../../../images/local/banner1.png");
const banner2 = require("../../../images/local/banner2.png");
const banner3 = require("../../../images/local/banner3.png");
const banner4 = require("../../../images/local/banner4.png");

const pics = [
  banner1,
  banner2,
  banner3,
  banner4,
];

/**
 * 
 * 
 * addressComponent:{
 * adcode: "0"
city: "San Francisco"
city_level: 2
country: "United States"
country_code: 54003
country_code_iso: "USA"
country_code_iso2: "US"
direction: "附近"
distance: "37"
district: ""
province: "California"
street: "Ellis Street"
street_number: ""
town: ""
}

location: {lng: -122.40641699999992, lat: 37.78583401977729}
 * 
 * 
 */

const tempAreas = [
  { name: "静安区", icon: "", code: "", type: TYPE_AREA, },
  { name: "徐汇区", icon: "", code: "", type: TYPE_AREA, },
  { name: "杨浦区", icon: "", code: "", type: TYPE_AREA, },
  { name: "浦东新区", icon: "", code: "", type: TYPE_AREA, },
  { name: "闵行区", icon: "", code: "", type: TYPE_AREA, },
  { name: "金山区", icon: "", code: "", type: TYPE_AREA, },
  { name: "松江区", icon: "", code: "", type: TYPE_AREA, },
  { name: "长宁区", icon: "", code: "", type: TYPE_AREA, },
];

const TYPE_ALL = "all";
const TYPE_INDUSTRY = "industry";
const TYPE_AREA = "area";
const defaultIndustry = {
  type: TYPE_INDUSTRY,
  name: "分类",
  code: "",
  id: '',
  icon: "-below",
}

const defaultArea = {
  type: TYPE_AREA,
  name: '地区',
  code: "",
  id: '',
  icon: "-below",
}

// curLocation: {
//   longitude: 121.48789949,  //经度
//   latitude: 31.24916171,   //维度
//   provinceName: '上海市',
//   cityName: '上海市',
//   areaName: '黄浦区',
// },
const ITEM_HEIGHT = 148; //item的高度
const HEADER_HEIGHT = 0;  //分组头部的高度
const SEPARATOR_HEIGHT = 0;  //分割线的高度

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
export default class StorePage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    console.log('address=', props.address);
    this.state = {
      page: 1,
      resolve: false,
      scrollY: 0,
      scrollOpacity: 0,
      dataSource: [],
      currentPage: 1,
      pageSize: 15,
      totalPage: 0,
      totalRecord: 0,
      modalVisible: false,
      tabTop: 0,
      popHeight: 0,
      rootHeight: windowHeight,
      rootScrollY: 0,
      popHeightAnimate: new Animated.Value(0),
      fadeAnimate: new Animated.Value(0),
      params: {

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
      // curLocation: {
      //   longitude: 121.48789949,  //经度
      //   latitude: 31.24916171,   //维度
      //   provinceName: '上海市',
      //   cityName: '上海市',
      //   areaName: '黄浦区',
      // },
      curLocationCode: {
        areaCode: "310101",
      },
      industryTypeList: [],
      areaList: [],
      tabSelectedItem: {},
      selectedIndustry: shiftJsons[1],

      tabAll: {
        type: TYPE_ALL,
        name: '全部'
      },
      tabIndustry: defaultIndustry,
      tabArea: defaultArea,
      paramsList: {},
      popList: [],
      isIos: Platform.OS === "ios" ? true : false,
    };
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.timerIndustry && clearTimeout(this.timerIndustry);
    this.timerArea && clearTimeout(this.timerArea);
  }

  componentDidMount() {
    const { curLocation } = this.state;
    const { address,dispatch } = this.props;
    console.log('address=', address);
    console.log('curLocation地址信息', curLocation);
    let areaNames = curLocation.provinceName + ',' + curLocation.cityName;
    //推广员账号信息初始接口
    this._saveInitUserAccount();
    //根据当前省市获取对应的code
    this._requestCurAreaCode(areaNames);
    //行业分类
    this._requestIndustryTypeList();
    //市对应的区或者县
    this._requestAreaByCity(curLocation.cityName);
    //每次进入清空上次选定的城市
    dispatch(updateArea({}));
  }

  //获取当前省市对应的code
  _requestCurAreaCode = async (names) => {
    const params = {
      codeNames: names,
    };

    const e = await Fetch.fetch({
      api: LocalLifeApi.queryCityInfoByCityName,
      params
    });
    console.log('_requestCurAreaCode', e);
    if (fa.code.isSuccess(e.code)) {
      let dataObject = e.obj;

      if (dataObject) {
        this.setState({
          curLocationCode: {
            provinceCode: dataObject[0].codeId,
            cityCode: dataObject[1].codeId,
          },
          paramsList: {
            provinceCode: dataObject[0].codeId,
            cityCode: dataObject[1].codeId,
          },
        });
        //请求门店列表
        this.storeList.setFetchParams({
          provinceCode: dataObject[0].codeId,
          cityCode: dataObject[1].codeId,
        });
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //获取门店分类列表
  _requestIndustryTypeList = async () => {
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryIndustryTypeList,
    });
    if (fa.code.isSuccess(e.code)) {
      let dataObject = e.obj;
      if (dataObject) {
        let tempList = [];
        dataObject.map((item, index) => {
          let temp = {
            type: TYPE_INDUSTRY,
            icon: "-shangsanjiao",
            code: item.configItemCode,
            name: item.configItemCodeName,
          }
          tempList.push(temp);
        });
        console.log('tempList==', tempList);
        this.setState({
          industryTypeList: tempList,
        });
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //获取当前城市对应的区县
  _requestAreaByCity = async (cityName) => {
    const params = {
      codeName: cityName
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryAreaByCity,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      let dataObject = e.obj;
      if (dataObject) {
        let tempList = [{
          type: TYPE_AREA,
          icon: "-shangsanjiao",
          parentId: '',
          codeId: '',
          name: '附近',
        }];
        dataObject.map((item, index) => {
          let temp = {
            type: TYPE_AREA,
            icon: "-shangsanjiao",
            parentId: item.parentId,
            codeId: item.codeId,
            name: item.name,
          }
          tempList.push(temp);
        });
        console.info('temparea.list=====', tempList)
        this.setState({
          areaList: tempList,
        });
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //推广员账号信息初始接口
  _saveInitUserAccount = async () => {
    const e = await Fetch.fetch({
      api: LocalLifeApi.saveInitUserAccount,
    });
    if (fa.code.isSuccess(e.code)) {
      console.log(e.message);
    } else {
      console.log(fa.code.parse(e.code, e.message));
    }
  };

  //底部导航栏
  _renderTab = () => {
    return tabJsons.map((item, index) => {
      return (
        <TabItem
          key={index}
          selected={index == 0 ? true : false}
          tabText={item.name}
          tabIcon={item.icon}
          onTabClick={() => { this._onTabClick(index) }}
        />
      );
    });
  }

  //底部tab切换
  _onTabClick = (index) => {
    if (index == 1) {
      this.props.navigation.navigate("BuyerUser");
    }
  }

  //门店项点击
  _onStoreItemClick = (item, index) => {
    const { navigation, login } = this.props;
    if (login) {
      navigation.navigate("StoreDetail", { id: item.id });
    } else {
      Toast.warn('请先登录！');
      navigation.navigate("UserLogin")
    }
  }

  //门店页顶部条件筛选栏
  _onTopTabItemClick = (tabItem) => {
    const { areaList, industryTypeList, modalVisible,isIos } = this.state;
    console.log('tabItem：', tabItem);
    this.timerIndustry && clearTimeout(this.timerIndustry);
    if (tabItem.type == TYPE_ALL) {
      this.setState({
        modalVisible: false,
        paramsList: {},  //刷新门店列表到默认，无需参数
        tabSelectedItem: tabItem,
        tabIndustry: defaultIndustry,
        tabArea: defaultArea,
      });
      let allParams = {
        industryCode: '',
        areaCode: '',
      }
      //请求门店列表(全部)
      this.storeList.setFetchParams({ ...allParams });
    } else if (tabItem.type == TYPE_INDUSTRY) {
      console.log('modalVisible', modalVisible);
      this.setState({
        tabSelectedItem: tabItem,
        popList: industryTypeList,
      });
      if (!modalVisible) {
        if(isIos){
          this.scroll.scrollToOffset({ offset: 196, animated: true });
        }else{
          this.scrollView.scrollTo({ x: 0, y: 196, animated: true });
        }
        this.timerIndustry = setTimeout(
          () => {
            this.setState({
              modalVisible: true,
            });
            let heightPop = industryTypeList.length * 40;
            Animated.parallel([this._createAnimation(heightPop)]);
          },
          500
        );
      } else {
        this.setState({
          modalVisible: false,
        });
      }
    } if (tabItem.type == TYPE_AREA) {
      console.log('modalVisible', modalVisible);
      this.timerArea && clearTimeout(this.timerArea);
      this.setState({
        tabSelectedItem: tabItem,
        popList: areaList,
      });
      if (!modalVisible) {
        if(isIos){
          this.scroll.scrollToOffset({ offset: 196, animated: true });
        }else{
          this.scrollView.scrollTo({ x: 0, y: 196, animated: true });
        }
        this.timerArea = setTimeout(
          () => {
            this.setState({
              modalVisible: true,
            });
            let heightPop = areaList.length * 40;
            Animated.parallel([this._createAnimation(heightPop)]);
          },
          500
        );
      } else {
        this.setState({
          modalVisible: false,
        });
      }
    }
  }

  _createAnimation = height => {
    return Animated.timing(this.state.popHeightAnimate, {
      toValue: height,
      duration: 200,
    }).start();
  };

  // _createFadeAnimation = fadeValue => {
  //   return Animated.timing(this.state.fadeAnimate, {
  //     toValue: fadeValue,
  //     duration: 200,
  //   }).start();
  // };

  //顶部导航栏
  _renderShiftTab = () => {
    const { modalVisible } = this.state;
    return (
      <View style={[styles.shift_container, { backgroundColor: '#fff' }]}>
        <TouchableOpacity
          onPress={() => { this._onTopTabItemClick(this.state.tabAll) }}
          activeOpacity={0.2}
          style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
          <Text style={[PublicStyles.title, { fontSize: 15, marginLeft: 10, }]}>{this.state.tabAll.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this._onTopTabItemClick(this.state.tabIndustry) }}
          activeOpacity={0.2}
          style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
          <Text style={[PublicStyles.title, { fontSize: 15, marginLeft: 10, color: this.state.tabIndustry.name == '分类' ? '#333' : '#EE2A45' }]}>{this.state.tabIndustry.name}</Text>
          <Icon name={modalVisible ? '-shangsanjiao' : '-below'} size={6} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this._onTopTabItemClick(this.state.tabArea) }}
          activeOpacity={0.2}
          style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
          <Text style={[PublicStyles.title, { fontSize: 15, marginLeft: 10, color: this.state.tabArea.name == '地区' ? '#333' : '#EE2A45' }]}>{this.state.tabArea.name}</Text>
          <Icon name={modalVisible ? '-shangsanjiao' : '-below'} size={6} />
        </TouchableOpacity>
      </View>);
  }

  //轮播
  _renderSwipe = () => {
    return (
      <TabSwiper
        style={styles.swip_container}
        pics={pics}
        loop={true}
        autoplay={true}
        imageStyle={styles.swip_image}
        paginationStyle={styles.swip_points}
        selectView={<View style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', width: 25, height: 4, marginLeft: 8 }} />}
        unselectView={<View style={{ backgroundColor: 'rgba(143, 143, 143, 0.5)', width: 25, height: 4, marginLeft: 8 }} />}
        onPress={i => {
          this.setState({});
        }}
      />
    );
  }

  //列表项
  _renderItem = (item, index) => {
    const { address } = this.props;
    console.log('address android=', address);
    return (
      <StoreItem
        key={index}
        address={address}
        data={item}
        index={index}
        onItemClick={(data) => { this._onStoreItemClick(data) }}
      />
    );
  }

  //列表项
  _renderListHeader = () => {
    return (
      <View style={{ flex: 1, width: windowWidth }}>
        {this._renderSwipe()}
      </View>
    );
  }


  _onPopLayout = (event) => {
    //使用大括号是为了限制let结构赋值得到的变量的作用域，因为接来下还要结构解构赋值一次
    //获取根View的宽高，以及左上角的坐标值
    let { x, y, width, height } = event.nativeEvent.layout;
    console.log('popHeight高度：' + height);
    this.setState({
      popHeight: height,
    });
  }

  _onScrollViewLayout = (event) => {
    //使用大括号是为了限制let结构赋值得到的变量的作用域，因为接来下还要结构解构赋值一次
    //获取根View的宽高，以及左上角的坐标值
    let { x, y, width, height } = event.nativeEvent.layout;
    console.log('height===', height);
    this.setState({
      rootHeight: height,
    });
  }

  //条件筛选弹窗列表
  _renderPopMenue = () => {
    const { isIos, rootHeight } = this.state;
    return (
      this.state.modalVisible ?
        <View
          style={{
            position: 'absolute',
            top: isIos ? NavigationBar.Theme.contentHeight +45 : NavigationBar.Theme.contentHeight + 45,
            backgroundColor: 'transparent',
            width: windowWidth,
          }}>
          <Animated.View style={[styles.modal_container, { height: this.state.popHeightAnimate, }]}>
            {this._renderPopList()}
          </Animated.View >
          <TouchableOpacity
            onPress={() => { this._onModalClose(false) }}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: rootHeight + 292, width: windowWidth, }}
          >
          </TouchableOpacity>
        </View> : null
    );
  }

  //展出的筛选菜单列表
  _renderPopList = () => {
    const { tabSelectedItem, popList } = this.state;
    if (tabSelectedItem.type == TYPE_INDUSTRY) {
      return popList.map((item, index) => {
        return this._renderPopIndustryItem(item, index);
      });
    } else {
      return popList.map((item, index) => {
        return this._renderAreaPopItem(item, index);
      });
    }
  }

  //行业列表项
  _renderPopIndustryItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => { this._onIndustryItemPress(item, index, false) }}
        key={index}
        activeOpacity={0.2}
        style={{ flex: 1, height: 40, paddingHorizontal: 19, justifyContent: "center", }}>
        <Text style={[PublicStyles.title, { fontSize: 13, color: this.state.tabSelectedItem.type == TYPE_INDUSTRY && item.name == this.state.tabSelectedItem.name ? '#EE2A45' : '#333' }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  //区域列表项
  _renderAreaPopItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => { this._onAreaItemPress(item, index, false) }}
        key={index}
        activeOpacity={0.2}
        style={{ flex: 1, height: 40, paddingHorizontal: 19, justifyContent: "center", }}>
        <Text style={[PublicStyles.title, { fontSize: 13, color: this.state.tabSelectedItem.type == TYPE_AREA && item.name == this.state.tabSelectedItem.name ? '#EE2A45' : '#333' }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  //点击分类列表项
  _onIndustryItemPress = (item, index, visible) => {
    const {isIos}=this.state;
    console.log("industryitem====", item);
    let requestParams = { industryCode: item.code };
    console.log("industry requestParams====", requestParams);
    this.setState({
      tabSelectedItem: item,
      tabIndustry: item,
    });
    // if(!isIos){
    //   this.scrollView.scrollTo({ x: 0, y: 50, animated: true });
    // }
    //请求门店列表(+行业)
    this.storeList.setFetchParams({ ...requestParams });
    //关闭弹窗
    this._onModalClose(visible);
    
  }

  //点击附近
  _onAreaItemPress = (item, index, visible) => {
    let requestParams = { areaCode: item.codeId };
    console.log("area requestParams====", requestParams);
    this.setState({
      tabSelectedItem: item,
      tabArea: item,
    });
    if (index == 0) {
      let allParams = {
        industryCode: '',
        areaCode: '',
      }
      //附近，请求全部
      this.storeList.setFetchParams({ ...allParams });
    } else {
      //请求门店列表(+地区)
      this.storeList.setFetchParams({ ...requestParams });
    }
    this._onModalClose(visible);
  }

  _onModalClose = (visible) => {
    this.setState({
      modalVisible: visible
    });
  }

  /**
   * 选定城市后的回调
   */
  _areaSelectedCallBack = (selectedArea) => {
    console.log('_areaSelectedCallBack=', selectedArea);

    this.setState({
      curLocationCode: {
        provinceCode: selectedArea.province.codeId,
        cityCode: selectedArea.city.codeId,
        areaCode: selectedArea.area ? selectedArea.area.codeId : '',
      },
      paramsList: {
        provinceCode: selectedArea.province.codeId,
        cityCode: selectedArea.city.codeId,
        areaCode: selectedArea.area ? selectedArea.area.codeId : '',
      },
    });
    // console.log('this.storeList=',this.storeList);

    //请求门店列表
    this.storeList.setFetchParams({
      provinceCode: selectedArea.province.codeId,
      cityCode: selectedArea.city.codeId,
      areaCode:selectedArea.area?selectedArea.area.codeId:'',
    });
  }

  //使用该方法，会加载数据更流畅，但是家里，之后，列表后半部分变成空白了
  _getItemLayout = (data, index) => {
    let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
    return { length, offset: (length + separator) * index + header, index };
  }


  render() {
    const { navigation, selectedArea } = this.props;
    const { paramsList, curLocation, curLocationCode, isIos } = this.state;
    let selectedCity = selectedArea && selectedArea.city ? selectedArea.city.name : curLocation.cityName;
    return (
      <View
        style={styles.container}>
        <ScrollView
          onLayout={this._onScrollViewLayout}
          ref={e => { this.scrollView = e }}
          style={{ flex: 1 }}>
          <View style={styles.content}>
            {curLocationCode.provinceCode ?
              <FlatList
                style={{ flex: 1, paddingBottom: isIos ? 0 : 300 }}
                ref={e => { this.storeList = e }}
                listRef={e => (this.scroll = e)}
                fetchParams={{ ...paramsList }}
                api={LocalLifeApi.queryStoreList}
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderComponent={this._renderShiftTab()}
                getItemLayout={this._getItemLayout}
                ListHeaderComponent={this._renderListHeader}
                ItemSeparatorComponent={() => <LineSpace style={{ height: 1 }} />}
                renderItem={({ item, index }) => this._renderItem(item, index)}
              /> : null}
          </View>
        </ScrollView>
        {this._renderPopMenue()}
        <View style={styles.tab_container}>
          {this._renderTab()}
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          leftView={
            <View style={styles.leftview_container}>
              <NavigationBar.BackButton
                onPress={() => {
                  navigation.pop();
                }}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate("CityList", {selectedCity:selectedCity, callBack: this._areaSelectedCallBack });
                }}
                style={styles.location_container}
              >
                <Text style={styles.location_title}>{selectedCity}</Text>
                <Icon name={'-below'} size={6} style={{ marginLeft: 9 }} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: NavigationBar.Theme.contentHeight,
    flex: 1,
  },
  tab_container: {
    height: 50,
    borderTopColor: "#CDCDCD",
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    marginBottom: 50,
    width: windowWidth,
  },
  shift_container: {
    width: windowWidth,
    height: 46,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  shift_container_top: {
    width: windowWidth,
    height: 46,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
  },
  div_bold: {
    width: windowWidth,
    height: 10,
    backgroundColor: '#EAEAEA',
  },
  location_title: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  launchImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  buttonContainer: {
    position: "absolute",
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    right: 15,
    top: 15
  },
  buttonTitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    lineHeight: 30
  },
  modal_container: {
    width: windowWidth,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    backgroundColor: '#fff',
  },

  leftview_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  search: {
    flex: 1,
    width: 70,
    height: 40,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  swip_container: {
    width: windowWidth,
    height: 196,
    backgroundColor: "#fff"
  },
  swip_image: {
    width: windowWidth-26,
    height: 165,
    marginVertical: 15,
    marginHorizontal: 12,
    borderRadius: 5,
    resizeMode: "stretch"
  },
  swip_points: {
    paddingHorizontal: 15,
    width: windowWidth,
    height: 10,
    flexDirection: 'row',
    position: "absolute",
    left: 15,
    bottom: 25,
    alignItems: "center",
    backgroundColor: "#f00"
  },

});
