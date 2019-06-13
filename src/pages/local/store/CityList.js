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
import { updateArea } from "../../../redux/actions/local/store/city";
import { connect } from "react-redux";

const hotCitys = [
  { name: '上海', codeId: '310100', parentName: '上海市', parentId: '310000' },
  { name: '苏州', codeId: '320500', parentName: '江苏省', parentId: '320000' },
  { name: '杭州', codeId: '330100', parentName: '浙江省', parentId: '330000' },
  { name: '无锡', codeId: '320200', parentName: '江苏省', parentId: '320000' },
  { name: '南京', codeId: '320100', parentName: '江苏省', parentId: '320000' },
];

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
export default class CityList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      curCity: '上海',
      provinceList: [],
      cityList: [],
      areaList: [],
      selectedItem: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this._requestProvinceList();
  }


  //获取城市省份列表
  _requestProvinceList = async () => {
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryProvinceAll,
    });
    if (fa.code.isSuccess(e.code)) {
      this.setState({
        provinceList: e.obj,

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
    let callBack = navigation.state.params.callBack;
    navigation.navigate("AreaList", { province: item.item, callBack: callBack });
  }

  //列表分组头部渲染
  _renderSectionHeader = (section) => {
    return (

      <View style={{ height: 30, justifyContent: "center", width: windowWidth, backgroundColor: '#E5E5E5', paddingLeft: 15 }}>
        <Text style={[PublicStyles.title, { fontSize: 15 }]}>{section.section.key}</Text>
      </View>
    );
  }

  //列表项
  _renderListHeader = () => {
    const { navigation } = this.props;
    let selectedCity = navigation.state.params.selectedCity;
    return (
      <View style={{ width: windowWidth, height: 147, backgroundColor: '#fff', paddingTop: 26 }}>
        <Text style={[PublicStyles.title, { fontSize: 15, marginStart: 15 }]}>热门城市</Text>
        <View style={{
          height: 30, width: windowWidth, marginTop: 10, marginBottom: 17,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginStart: -5
        }}>
          {this._renderHotTab()}
        </View>
        <View style={{ height: 50, width: windowWidth, alignItems: 'center', backgroundColor: '#F3F3F3',flexDirection:'row' }}>
          <Text style={[PublicStyles.title, { fontSize: 15, marginStart: 15 }]}>当前城市: {selectedCity}</Text>
        </View>
      </View>
    );
  }

  //热门城市
  _renderHotTab = () => {
    return hotCitys.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
          onPress={() => { this._onHotCityPress(item) }}
        >
          <Text style={PublicStyles.title}>{item.name}</Text>
        </TouchableOpacity>

      );
    });
  }

  _onHotCityPress = (item) => {
    const { navigation } = this.props;
    let callBack = navigation.state.params.callBack;
    let selectArea = {
      province: { codeId: item.parentId, name: item.parentName },
      city: { codeId: item.codeId, name: item.name },
    }
    this.props.dispatch(updateArea(selectArea));
    //返回到门店首页
    navigation.pop();
    //回调
    callBack && callBack(selectArea);
  }

  render() {
    const { navigation } = this.props;
    const { provinceList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            ref={(list) => { this._list = list }}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderListHeader}
            ItemSeparatorComponent={() => <LineSpace style={{ height: 1, marginLeft: 15, }} />}
            data={provinceList}
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
    paddingTop: NavigationBar.Theme.contentHeight,
  },

  content: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: "center",
  },

});
