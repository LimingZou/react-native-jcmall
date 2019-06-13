import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,InteractionManager
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import { windowHeight, windowWidth } from "../../../utils/style";
import NumberSwiper from "../../../components/category/NumberSwiper";
import LimitedTimeBuyItemView from "../../../components/category/LimitedTimeBuyItemView";
import Time from "../../../utils/time";
import CountDownView from "../../../components/limitedTimeBuy/CountDownView";
import { HomeApi } from "../../../services/api/home";
import Fetch from "../../../utils/fetch";
import FlatList from "../../../components/flatList";
import { GoodsApi } from "../../../services/api/goods";
import * as Track from "../../../utils/track";
import { formatMoney } from "../../../utils/function";
import Banner from './banner';

let limitedId = 0
export default class LimitedTimeBuy extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.dates = [];
    this.state = {
      page: 0,
      resolve: false,
      banners:[],
      dates:[],
      limitedId:0,
      describe:"抢购中"
    };
    this.activeIndex = 0
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // ...耗时较长的同步执行的任务...
      this.getToadyRule()
    });
  }

  getToadyRule(){
    Fetch.fetch({
      api: HomeApi.limitedTimeBuyTodayRule,
      params: {}
    }).then((response)=>{
      if(response&&response.obj){
        this.getNewData(response.obj)
      }
    })
  }

  //重新组装数据
  getNewData(times){
      let newDates = []
      let currentTimestamp = new Date().getTime();
      let nowId = times.nowId ? times.nowId : 0
      let activeIndex = 0
      let limitedId = 0
      let residue = null
      if(times.newDate){
        currentTimestamp = times.newDate
      }

      if(times.list&&times.list.length>0){
        times.list.forEach((element,index)=>{
            if(element.endTime>currentTimestamp){
                if(element.id == nowId ){
                  residue = element.endTime - currentTimestamp
                  element.residue = residue
                  element.describe = "抢购中"
                  activeIndex = index
                  console.log("查询限时购列表",element.id)
                  this.refs.flatList.setFetchParams(
                    {limitSaleId:element.id}
                  );
                }else{
                  if(currentTimestamp<element.beginDate){
                    element.describe = "即将开抢"
                  }else{
                    element.describe = "已结束"
                  }
                }
            }else{
                element.describe = "已结束"
            }
            newDates.push(element)
        })
      }
      this.setState({
          dates:newDates,
          activeIndex: activeIndex
      });
  }

  _selectIndex(index,id){
    const {dates} = this.state
    this.setState({
      activeIndex:index,
      describe: dates[index].describe
    })
    console.log(dates[index])
    console.log("---dates[index]----")
    this.refs.flatList.setFetchParams(
      {limitSaleId:id}
    );
  }

  _onPress(item) {
    this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_XIANSHIQIANGGOU_LIST});
  }

  _getItem(item, index) {
    const {describe} = this.state
    console.log(describe)
    console.log("---describe----")
    return (
      <LimitedTimeBuyItemView
        style={{paddingVertical: 25,backgroundColor: "white",width:windowWidth,height:148,borderBottomWidth:1,borderBottomColor:'#D9D9D9'}}
        index={index}
        describe={describe}
        key={index}
        item={item}
        src={item.url ?item.url:""}
        title={item.name ? item.name : ""}
        count={item.userLimitAmount ?item.userLimitAmount:""}
        progress={item.fictitiousSalesVolume/(item.userLimitAmount + item.fictitiousSalesVolume)}
        pbWidth={120}
        pbHeight={7}
        borderWidth={0}
        nowPrice={item.salePrice ? formatMoney(item.salePrice) : ""}
        originalPrice={item.marketPrice ? formatMoney(item.salePrice) : ""}
        color={"#FD3D42"}
        unfilledColor={"#EAEAEA"}
        fontSize={13}
        textColor={"#2C2C2C"}
        onPress={item => this._onPress(item)}
      />
    );
  }


  render() {
    const {banners,dates,activeIndex,until} = this.state
    let pics = banners.map(item => item.url)
    let fetchParams = {limitSaleId:0}
    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
         <FlatList
            ref="flatList"
            api={GoodsApi.limitedTimeGoods}
            fetchParams={fetchParams}
            keyExtractor={(item, index) => index}
            scrollEventThrottle={16}
            numColumns={1}
            ListHeaderComponent={(
              <View style={{flex:1}}>
                <View style={{ width: windowWidth, height: 0.5, color: "#cccccc" }} />
                <Banner
                  ref="goodBanner"
                  handelLink={link=>{}}/>

                <CountDownView
                    dates={dates}
                    until={until}
                    activeIndex={activeIndex}
                    select={(index,id) => this._selectIndex(index,id)}
                />

            </View>)}
            renderItem={({ item, index }) => this._getItem(item, index)}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"限时抢购"}
          titleStyle={{fontSize: 18,color: "#333333"}}
          leftView={
            <NavigationBar.BackButton
              onPress={() => this.props.navigation.pop()}
            />
          }
          rightView={<Icon name={"-share"} size={16} color={"#333333"} />}
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
  //时间文字
  hours: {
    marginLeft: 5,
    fontSize: 15,
    color: "#333333",
    textAlign: "center"
  },
  time: {
    paddingHorizontal: 2,
    fontSize: 15,
    color: "#333333",
    textAlign: "center"
  },
  //冒号
  colon: {
    fontSize: 15,
    color: "#333333",
    textAlign: "center"
  },
  tip: {
    color: "#333333",
    textAlign: "center",
    fontSize: 15
  },
  paginationStyle:{
    width: 38,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 25,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  imageStyle:{
    width: windowWidth - 24,
    height: 170,
    marginHorizontal: 12,
    marginVertical: 15,
    borderRadius: 5,
    resizeMode: "stretch"
  }
});
