/**
 * 门店详情
 */
"use strict"
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import {
  windowWidth,
  PublicStyles,
  PublicStylesString,
  ThemeStyle,
  windowHeight,
  FontStyle
} from "../../../utils/style";

import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import NumberSwiper from "../../../components/category/NumberSwiper";
import Button from "../../../components/goods/button";
import LineSpace from "../../../components/local/common/LineSpace";
import LinearGradientButton from "../../../components/local/common/LinearGradientButton";
import MapListDialog from "../../../components/local/store/MapListDialog";
import CommonUtils from "../utils/CommonUtils";
import { Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
import time from "../../../utils/time";
import Fetch from "../../../utils/fetch";
import { LocalLifeApi } from "../../../services/api/localLife";

import { connect } from "react-redux";

const tempList = [
  "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
  "http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg",
  "http://img.zcool.cn/community/01c8dc56e1428e6ac72531cbaa5f2c.jpg",
  "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
  "http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg",
];

const tempInfoLists = [
  { key: 'phone', icon: "-tel", value: '0512-65886998' },
  { key: 'location', icon: "-dingwei", value: '虹桥天街B栋2层 | 400m' },
  { key: 'time', icon: "-clock", value: '营业时间：08:00-21:00(节假日不休）' },
];

const bottonTexts = [
  '一键导航', '一键拨号', '关注商家'
];

const des = '上海万岛料理（虹桥万科店）是集呈专门为集呈家人挑选的金牌服务商家，使用集速豆付款可以享受8折优惠哦～！';

@connect(
  (
    {
      app: {
        user: {
          login
        },
        location: {
          address
        }
      }
    }) => ({
      login,
      address
    })
)
export default class StoreDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      resolve: false,
      dataSource: [],
      opacity: 0,
      detail: {},
      isFocued: 0,
      curLocation: {
        longitude: props.address.gaode_location.lng,  //经度
        latitude: props.address.gaode_location.lat,   //维度
        provinceName: props.address.addressComponent.province,
        cityName: props.address.addressComponent.city,
        areaName: props.address.addressComponent.district,
        street: props.address.addressComponent.street,
        formatted_address: props.address.formatted_address,
      },
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    console.log("navigation======", navigation);
    let id = navigation.state.params.id;
    this._requestStoreDetail(id);
  }

  //获取门店详情
  _requestStoreDetail = async (id) => {
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
      this.setState({
        detail: datas,
        dataSource: datas && datas.detailList,
        isFocued: datas.favoriteStatus,
      });

    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //关注商家
  _requestStoreFouce = async (id) => {
    const params = {
      merchantId: id
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.personStoreFouce,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      console.log("fouce======", e);
      this.setState({
        isFocued: 1,
      });

    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //取消关注商家
  _removeStoreFouce = async (id) => {
    const params = {
      merchantIds: id + "",
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.favorite_remove,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      console.log("removefouce======", e);
      this.setState({
        isFocued: 0,
      });
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //列表项
  _renderItem = (item, index) => {
    return (
      <Image
        resizeMode="stretch"
        style={{ width: windowWidth, height: 240, }}
        source={{ uri: item.item.detailUrl }}
      />
    );
  }

  //商户信息
  _renderInfoItem = (detail) => {
    const { address } = this.props;
    let pointFrom = { latitude: address.location.lat, longitude: address.location.lng };
    let pointTo = { latitude: detail.localX, longitude: detail.localY };
    let distance = CommonUtils.getDistance(pointFrom, pointTo);
    let tempOpenTime = CommonUtils.parseIntTime2Str(detail.openTime);
    let tempCloseTime = CommonUtils.parseIntTime2Str(detail.closeTime);
    return (
      <View style={styles.header_info_top}>
        <View
          style={styles.info_item}>
          <Icon name={'-tel'} size={15} />
          <Text style={[PublicStyles.title, { marginLeft: 19, fontSize: 15, }]}>{detail.merchantPhone}</Text>
        </View>
        <View
          style={styles.info_item}>
          <Icon name={'-dingwei'} size={15} />
          <Text style={[PublicStyles.title, { marginLeft: 19, fontSize: 15, }]}>{detail.address} | {distance}</Text>
        </View>
        <View
          style={styles.info_item}>
          <Icon name={'-clock'} size={15} />
          <Text style={[PublicStyles.title, { marginLeft: 19, fontSize: 15, }]}>营业时间：{tempOpenTime}-{tempCloseTime}</Text>
        </View>
      </View>
    );
  }

  //商户信息
  _renderInfoBotton = () => {
    const { isFocued } = this.state;
    return bottonTexts.map((item, index) => {
      let colorCur = index == 0 ? '#0072FF' : index == 1 ? '#399800' : '#FFA8B4';
      let colorText = index == 0 ? '#0072FF' : index == 1 ? '#399800' : '#E0324A';
      let colorBg = index == 0 ? '#F2F8FF' : index == 1 ? '#F5FAF2' : '#FDF5F6';
      let marginLeftNum = index == 0 ? 0 : 27;
      return (
        <Button
          key={index}
          style={[styles.botton, {
            backgroundColor: index < 2 ? colorBg : isFocued == 1 ? '#E0324A' : colorBg,
            borderColor: index < 2 ? colorCur : isFocued == 1 ? '#E0324A' : colorCur,
            marginLeft: marginLeftNum,
          }]}
          onPress={() => { this._listenOnBtnClick(item, index) }}>
          <Text style={[styles.top_light_text, { color: index < 2 ? colorText : isFocued == 1 ? '#fff' : colorText }]}>{index < 2 ? item : isFocued == 1 ? '已关注' : item}</Text>
        </Button>
      );
    });
  }

  //按钮点击监听
  _listenOnBtnClick = (item, index) => {
    const { navigation, login } = this.props;
    const { curLocation, isFocued } = this.state;
    let id = navigation.state.params.id;
    if (index == 0) {
      this.mapListDialog.show(curLocation.latitude, curLocation.longitude, curLocation.cityName);
    } else if (index == 1) {
      CommonUtils.callPhone(this.state.detail.merchantPhone);
    } else {
      if (login) {
        if (isFocued == 0) {
          this._requestStoreFouce(id);
        } else {
          this._removeStoreFouce(id);
        }
      } else {
        navigation.navigate("UserLogin", {});   //加回调
      }
    }
  }

  //描述信息
  _renderDesItem = () => {
    const { detail } = this.state;
    return (
      <View style={styles.header_des}>
        <LineSpace style={styles.line} />
        <Text style={[PublicStyles.title, { fontSize: 13, marginTop: 20, marginBottom: 30, marginHorizontal: 14, textAlign: 'left', width: windowWidth, paddingLeft: 15 }]}>{detail.description}</Text>
        <LineSpace style={styles.line} />
        <View style={styles.header_des_title}>
          <LineSpace style={styles.line_s} />
          <Text style={[PublicStyles.title, { fontSize: 15, textAlign: 'left', marginHorizontal: 5 }]}>商家简介</Text>
          <LineSpace style={styles.line_s} />
        </View>
      </View>

    );
  }

  //列表项
  _renderListHeader = () => {
    const { detail } = this.state;
    return (
      <View style={styles.header}>
        <Image
          resizeMode="stretch"
          style={styles.top_image}
          source={{ uri: detail.imageUrl }}
        />
        <View style={styles.header_info}>
          <View style={styles.header_top}>
            <Text style={styles.top_text}>{detail.merchantName}</Text>
            <Text style={styles.top_light_text}>{detail.industryName}</Text>
          </View>
          {this._renderInfoItem(detail)}
          <View style={styles.header_botton_container}>
            <View style={styles.header_info_botton}>
              {this._renderInfoBotton()}
            </View>
          </View>
          {this._renderDesItem()}
        </View>
      </View>
    );
  }

  //热门城市
  _renderHotTab = () => {
    return hotCitys.map((item, index) => {
      return (
        <Text style={PublicStyles.title}>{item}</Text>
      );
    });
  }

  _fetchNextData = () => {

  }

  //点击教程
  _onCoursePress = () => {
    alert("教程。。。");
  }

  /*ScrollView 滚动时，控制顶部标题显示*/
  _scrollViewDidScroll = (event) => {
    var y_offset = event.nativeEvent.contentOffset.y;
    var rate = y_offset / 120;
    this.setState({
      opacity: rate
    });
  };


  render() {
    const { detail } = this.state;
    const { navigation } = this.props;
    var number = 255 - 255 * this.state.opacity;
    var changeColor = 'rgba(' + number + ',' + number + ',' + number + ',' + 1.0 + ')';
    var bgColor = 'rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + 255 * this.state.opacity + ')';


    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            style={{ flex: 1, width: windowWidth }}
            ref={(scroll) => this._scroll = scroll}
            onScroll={(e) => { this._scrollViewDidScroll(e) }}
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this._renderListHeader}
            ItemSeparatorComponent={() => <LineSpace style={{ height: 5, backgroundColor: '#fff' }} />}
            renderItem={this._renderItem}
          />
        </View>
        <MapListDialog ref={dialog => this.mapListDialog = dialog} />
        <NavigationBar
          style={{ backgroundColor: bgColor, borderBottomWidth: 0 }}
          statusBarStyle={"dark-content"}
          title={detail.merchantName}
          titleStyle={{ fontSize: 18, color: changeColor }}
          leftView={
            <NavigationBar.BackButton
              tintColor={changeColor}
              onPress={() => {
                this.props.navigation.pop();
                if (this.props.navigation.state.params.callback) {
                  this.props.navigation.state.params.callback()
                }
              }}
            />
          }
        // rightView={
        //   <TouchableOpacity
        //     onPress={() => { this._onCoursePress() }}
        //     activeOpacity={0.2}
        //     style={styles.course}
        //   >
        //     <Text style={{ fontSize: 12, color: changeColor }}>教程</Text>
        //   </TouchableOpacity>
        // }
        />
        <LinearGradientButton
          containerStyle={styles.btn_container}
          text='结算'
          style={styles.btn_text}
          onPress={() => this.props.navigation.navigate("StoreBalance", { id: detail.id, address: detail.address })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 50,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  header: {
    flex: 1,
    width: windowWidth,
    alignItems: "center",
  },
  top_image: {
    height: 158,
    width: windowWidth,
  },
  header_info: {
    width: windowWidth,
    alignItems: "center",
    marginTop: -23,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff',
    borderTopColor: '#ff0',
  },
  header_top: {
    paddingLeft: 13,
    paddingRight: 13,
    marginTop: 29,
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
  },
  header_top_bold: {

  },
  top_text: {
    color: PublicStylesString.BlackColor,
    fontFamily: FontStyle.PingFangSC_B,
    fontSize: 15,
  },
  top_light_text: {
    color: '#8F8F8F',
    fontSize: 13,
    textAlign: 'center',
  },
  info_item: {
    marginTop: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: "center"
  },
  header_info_top: {
    marginBottom: 10,
    marginTop: 5,
    width: windowWidth,
  },
  header_info_botton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_botton_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 15,
  },
  botton: {
    width: 75,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  line: {
    height: 1,
    width: windowWidth - 30,
  },
  line_s: {
    height: 1,
    backgroundColor: '#333',
    width: 40,
  },
  header_des: {
    flex: 1,
    width: windowWidth,
    alignItems: "center",
  },
  header_des_title: {
    width: windowWidth,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  btn_container: {
    height: 50,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: "center"
  },
  btn_text: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  course: {
    flex: 1,
    width: 30,
    height: 40,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center',
  },
});
