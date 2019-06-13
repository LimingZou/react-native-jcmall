/**
 * 我关注的商家
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../../utils/style";
import LFlatList from "../../../../components/public/LFlatList";

import AttentionSellerItem from "../../../../components/local/user/AttentionSellerItem";
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";
import fa from "../../../../utils/fa";
import { Toast } from "../../../../utils/function";

let select = 0;
let watchID=''
export default class AttentionSellerOfMine extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      defaultDataSource:[],
      dataSource: [],
      rightFont: "编辑",
      checkedAll: false,
      selectShow: "全选",
      contentHeight: new Animated.Value(0),
      showCheckBox: false
    };
  }

  fetchNextData() {}

  //选择item
  checkedGood(item) {
    let temp = this.state.dataSource;
    let newArray = [];
    temp.forEach((element, index) => {
      if (item.merchantId == element.merchantId) {
        if (temp[index].checked){
          select--;
        } else {
          select++;
        }
        temp[index].checked = !temp[index].checked;
      }

      newArray.push(element);
    });
    let selectShow = "全选";
    let checkedAll = false;
    if (select > 0){
      selectShow = "已选（" + select + ")";
      checkedAll = true;
    }
    this.setState({
      dataSource: newArray,
      selectShow: selectShow,
      checkedAll: checkedAll
    });
  }

  //全选item
  selectAll() {
    let temp = this.state.dataSource;
    let checkedAll = this.state.checkedAll;
    let newArray = [];
    if (checkedAll){
      temp.forEach((element, index) => {
        temp[index].checked = false;
        select = 0;
      });
      this.setState({
        dataSource: temp,
        selectShow: "全选",
        checkedAll: false
      });
    } else {
      temp.forEach((element, index) => {
        temp[index].checked = true;
        select++;
      });
      if (select > 0){
        selectShow = "已选（" + select + ")";
        checkedAll = true;
      }
      this.setState({
        dataSource: temp,
        selectShow: selectShow,
        checkedAll: checkedAll
      });
    }
  }

  editCollect() {
    let rightFont = this.state.rightFont;
    if (rightFont == "完成") {
      this.setState({
        rightFont: "编辑",
        showCheckBox: false
      });
      Animated.parallel([this.createAnimation(0)]);
    } else {
      this.setState({
        rightFont: "完成",
        showCheckBox: true
      });
      Animated.parallel([this.createAnimation(49)]);
    }
  }

  delectCollect() {
    let temp = this.state.dataSource;
    let newArray = [];
    temp.forEach((element, index) => {
      if (!element.checked) {
        newArray.push(element);
      }
    });
    select = 0;
    this.setState({
      dataSource: newArray,
      selectShow: "完成",
      checkedAll: false
    });
    //处理删除的数据
    Array.prototype.remove = function(val) {
      let index = this.indexOf(val);
      if (index > -1) {
        return  this.splice(index, 1);
      }

    };
    let defaultArr=this.state.defaultDataSource
    if (newArray.length>0){
      newArray.map(function (item){
        defaultArr.forEach((element, index) => {
          if (item.merchantId===element.merchantId){
            defaultArr.remove(item);
          }
        })
      })
    }
    //获取删除的所有商家id
    let delIds=[]
    defaultArr.map(function (item){
      delIds.push(item.merchantId)
    })
    let delIdStr=delIds.join(',')
    this._favoriteRemove(delIdStr)
  }

  createAnimation = height => {
    return Animated.timing(this.state.contentHeight, {
      toValue: height,
      duration: 200
    }).start();
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let longitude = JSON.stringify(position.coords.longitude);
        let latitude = JSON.stringify(position.coords.latitude);
        this.setState({
          latitude:latitude,
          longitude:longitude,
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 60000, maximumAge: 60000}
    );
    watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
    this._requestfavoritelist()
  }
  componentWillUnmount() {
  navigator.geolocation.clearWatch(watchID);
  }
  //获取关注商家列表
  _requestfavoritelist = async () => {
    const params = {
    };
    console.log('获取关注商家列表参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.favorite_list,
      params
    });
    console.log('获取关注商家列表结果',e);
    if (fa.code.isSuccess(e.code)) {
      // if(e.obj.list.length>0){
        this.setState({
          dataSource:e.obj.list,
          defaultDataSource:e.obj.list,
        })
      // }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  //取消关注商家
  _favoriteRemove = async (delIds) => {
    const params = {
      merchantIds:delIds,
    };
    console.log('取消关注商家参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.favorite_remove,
      params
    });
    console.log('取消关注商家结果',e);
    if (fa.code.isSuccess(e.code)) {
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  render() {
    const {
      rightFont,
      checkedAll,
      selectShow,
      contentHeight,
      showCheckBox,
      selected
    } = this.state;
    let dataSource = this.state.dataSource;
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
    iconSrc = checkedAll ? "-checked" : "-circle";
    iconColor = checkedAll ? "#EE2A45" : "#cccccc";
    let buttonColor = checkedAll ? ["#FE7E69","#FD3D42"]: ["#D9D9D9","#D9D9D9"];

    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <LFlatList
          keyExtractor={e => String(e.merchantId)}
          dataSource={dataSource}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item,index }) => (
            <AttentionSellerItem
              currentLatitude={this.state.latitude}
              currentLongitude={this.state.longitude}
              collectData={item}
              showCheckBox={showCheckBox}
              onPressCheck={() => {
                this.checkedGood(item);
              }}
              onPressItem={() => {
                this.props.navigation.navigate("StoreDetail", { id:item.merchantId,
                  callback:(()=>{
                    this._requestfavoritelist()
                  })
                });
              }}
            />
          )}/>

        <Animated.View
          style={{
            width: windowWidth,
            height: contentHeight,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff",
              height: 49,
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={() => {
              this.selectAll();
            }}
          >
            <View
              style={{ marginLeft: 15, height: 49, justifyContent: "center" }}
            >
              <Icon name={iconSrc} size={18} color={iconColor} />
            </View>
            <Text style={{ color: "#7F7F7F", fontSize: 15, marginLeft: 10 }}>
              {selectShow}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.state.checkedAll===true?
              this.delectCollect():null
            }}
          >
            <LinearGradient
              style={styles.linearGradientStyle}
              colors={buttonColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>移除</Text>
            </LinearGradient>
          </TouchableOpacity>

        </Animated.View>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我关注的商家"}
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
            <Text
              style={{ color: "#333333", fontSize: 15 }}
              onPress={() => {
                this.editCollect();
              }}
            >
              {rightFont}
            </Text>
          }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  linearGradientStyle: {
    height: 49,
    width: 112,
    alignItems: "center",
    justifyContent:"center"
  }
});
