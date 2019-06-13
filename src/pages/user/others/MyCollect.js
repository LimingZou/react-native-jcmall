import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  RefreshControl,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth, ThemeStyle } from "../../../utils/style";
import FlatList from "../../../components/flatList";
import Button from "../../../components/category/Button";
import CollectItem from "../../../components/my/others/collectItem";

import Fetch from "../../../utils/fetch";
import {OrderApi} from '../../../services/api/order';
import {MyApi} from '../../../services/api/my';

import GoodsItem from "../../../components/goods/goodsItem";

import { HomeApi } from "../../../services/api/home";
import { GoodsApi } from "../../../services/api/goods";
import * as Track from "../../../utils/track";

import NoDataItem  from '../../../components/@jcmall/noData'

let select = 0;
export default class MyCollect extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      rightFont: "编辑",
      checkedAll: false,
      selectShow: "全选",
      contentHeight: new Animated.Value(0),
      showCheckBox: false,
      collectList:[]

    };
    this.collectView = this.collectView.bind(this)
  }

  componentDidMount(){
    this.getCollectList()

  }

  getCollectList(){
    Fetch.fetch({
      api: MyApi.selectUserFavoriteByType,
      params: {
        collectType:1000,
        userOpType:1000
      }
    }).then((response)=>{
      console.log(response)
      console.log("---商品点赞列表---")
      if(response&&response.obj&&response.obj.list){
        this.setState({
          collectList:response.obj.list
        })
      }
    })
  }

  fetchNextData() {}

  checkedGood(item) {
    let temp = this.state.collectList;
    let newArray = [];
    temp.forEach((element, index) => {
      if (item.id == element.id) {
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
      selectShow = "已选（" + select + ")"
      checkedAll = true
    }

    this.setState({
      collectList: newArray,
      selectShow: selectShow,
      checkedAll: checkedAll
    });
  }

  selectAll() {
    let temp = this.state.collectList;
    let checkedAll = this.state.checkedAll;
    let newArray = [];
    let selectShow = "全选";
    if (checkedAll){
      temp.forEach((element, index) => {
        temp[index].checked = false;
        select = 0;
      });
      this.setState({
        collectList: temp,
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
        collectList: temp,
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
    let temp = this.state.collectList;
    let newArray = [];
    let businessId = ""
    temp.forEach((element, index) => {
      if (element.checked) {
        console.log(businessId.indexOf(','))
        if(businessId.length>0){
          businessId = businessId + "," + element.businessId
        }else{
          businessId = element.businessId
        }
      }
    });
    this.delectCollectApi(businessId)
    select = 0;
    this.setState({
      selectShow: "完成",
      checkedAll: false
    });
  }

  delectCollectApi(spuId){
    Fetch.fetch({
      api: GoodsApi.cancelMany,
      params: {
        businessIds: spuId,
        collectType:1000,
        userOpType:1000
      }
    }).then((result)=>{
      console.log(result)
      console.log("---result--取消商品收藏---")
      if(result&&result.code =="0000"){
        this.getCollectList()
      }
    });
  }

  createAnimation = height => {
    return Animated.timing(this.state.contentHeight, {
      toValue: height,
      duration: 200
    }).start();
  };


  _getItem(item, index){
    let key = "00" + index
    return(
      <GoodsItem
        key={key}
        data={{
          img: {url:item.url},
          title:item.name,
          price:item.salePrice,
          market_price:item.marketPrice
        }}
        index={index}
        onPress={() => {
          this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_MY_COLLECT});
        }}
      />
    )
  }

  collectView(){
    const {collectList,showCheckBox} = this.state
    // alert(collectList.length)
    if(collectList&&collectList.length>0){
      return(
        collectList.map((item, index) =>{
          return (
            <CollectItem
              collectData={item}
              showCheckBox={showCheckBox}
              goProductDetail={()=>{
                this.props.navigation.navigate("ProductDetailPage",{spuId:item.businessId})
              }}
              onPressCheck={() => {
                this.checkedGood(item);
              }}/>
          )
        })
      )
    }else{
      let imageUrl = require("../../../images/mine/nocolloect.png")
      let iconName = "-wodeshoucangweikong"
      return (
        <NoDataItem  describe="您的收藏夹为空～" imageUrl={imageUrl} iconName={iconName}/>
      )
    }
  }

  render() {
    const {
      rightFont,
      checkedAll,
      selectShow,
      contentHeight,
      showCheckBox,
      selected,
      refreshing,
      collectList
    } = this.state;
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
    iconSrc = checkedAll ? "-checked" : "-circle";
    iconColor = checkedAll ? "#EE2A45" : "#cccccc";
    let buttonColor = checkedAll ? ["#FE7E69","#FD3D42"]: ["#D9D9D9","#D9D9D9"];

    return (
      <View style={[styles.container,{paddingTop: NavigationBar.Theme.contentHeight }]}>
          <FlatList
            ref="flatList"
            api={HomeApi.itemsModule}
            fetchParams={{
              moduleType:1000,
              moduleCode:"CAINIXIHUAN",
            }}
            // keyExtractor={(item, index) => index}
            scrollEventThrottle={16}
            numColumns={2}
            ListHeaderComponent={(
              <View style={{flex:1}}>
                {this.collectView()}
                <View style={{paddingTop: 20,paddingBottom: 10,justifyContent: "center",alignItems: "center",flexDirection:'row'}}>
                    <View style={{width:140,height:1,backgroundColor:'#D9D9D9'}}/>
                    <Text style={{ fontSize: 14, color: "#333333",marginHorizontal:10 }}>猜你喜欢</Text>
                    <View style={{width:140,height:1,backgroundColor:'#D9D9D9'}}/>
                </View>
              </View>
            )}
            renderItem={({ item, index }) => this._getItem(item, index)}
        />
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
              this.delectCollect();
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
          title={"我的收藏"}
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
    alignItems:"center",
    justifyContent: "center"
  },
  likeView:{
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
