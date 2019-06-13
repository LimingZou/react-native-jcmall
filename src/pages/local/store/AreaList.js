/**
 * 省--市/直辖市---区
 */

"use strict"
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { windowWidth, PublicStyles, ThemeStyle, windowHeight } from "../../../utils/style";

import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LineSpace from "../../../components/local/common/LineSpace";
import { Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
import Fetch from "../../../utils/fetch";
import { LocalLifeApi } from "../../../services/api/localLife";
import CommonUtils from "../utils/CommonUtils";
import { connect } from "react-redux";


import { updateArea } from "../../../redux/actions/local/store/city";


@connect(
  ({
    view: {
      local: {
        selectedArea,
      }
    }
  }) => ({
    selectedArea,
  })
)
export default class AreaList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      selectedCity: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    let locs = navigation.state.params.province;
    this._requestCityList(locs);
  }


  //获取城市列表
  _requestCityList = async (loc, index) => {

    console.log("loc======", loc);
    let isDirProvince = false;
    if (loc.name.charAt(loc.name.length - 1) == '市') {
      isDirProvince = true;
    } else if (loc.name === '香港特别行政区' || loc.name === '澳门特别行政区') {
      isDirProvince = true;
    }
    const params = {
      codeId: loc.codeId
    };
    const e = await Fetch.fetch({
      api: loc.name.charAt(loc.name.length - 1) == '市' ? LocalLifeApi.queryCountyByCity : LocalLifeApi.queryCityByProvince,
      params,
    });
    if (fa.code.isSuccess(e.code)) {

      let citys = e.obj;
      this.setState({
        areaList: citys
      });

    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //列表项
  _renderItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => { this._clickItemOpen(item, index) }}
        style={{ height: 40, justifyContent: "center", width: windowWidth, backgroundColor: '#fff', paddingLeft: 15 }}>
        <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  }

  //点击添加县市
  _clickItemOpen = (item, index) => {
    const { navigation } = this.props; 
    console.log("------", this.props);
    let province = navigation.state.params.province;
    let callBack = navigation.state.params.callBack;
    let isDirProvince = province.name.charAt(province.name.length - 1) == '市' ||
      province.name.charAt(province.name.length - 1) == '香港特别行政区' ||
      province.name.charAt(province.name.length - 1) == '澳门特别行政区';
    let selectArea = {};
    if (isDirProvince) {
      //直辖市（市-市-区已选）
      selectArea = {
        province: province,
        city: { codeId: item.item.parentId, name: province.name },
        area: item.item,
      }
    } else {
      //省（省市已选，区待选）
      selectArea = {
        province: province,
        city: item.item,
      }
    }
    this.props.dispatch(updateArea(selectArea));
    //返回到门店首页
    navigation.pop(2);
    //回调
    callBack && callBack(selectArea);
  }


  render() {

    const { navigation } = this.props;
    const { areaList } = this.state;
    return (
      <View style={[
        styles.container, { paddingTop: NavigationBar.Theme.contentHeight }]}>
        <View style={styles.content}>
          <FlatList
            ref={(list) => { this._list = list }}
            renderItem={this._renderItem}
            ItemSeparatorComponent={() => <LineSpace style={{ height: 1, marginLeft: 15, }} />}
            data={areaList}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={10}
          />
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"城市列表"}
          titleStyle={{ fontSize: 18, color: "#333333" }}
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
    width: windowWidth,
    paddingTop: NavigationBar.Theme.contentHeight
  },

  content: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: "center",
  },

});
