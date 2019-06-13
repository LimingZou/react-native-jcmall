import React, { Component } from "react";
import {
  ScrollView,
  Text,StatusBar,
  TouchableOpacity,
  View,Platform,
  Image,StyleSheet,
  Modal,findNodeHandle,
  TouchableWithoutFeedback,
  UIManager,NativeModules,
  ImageBackground,SafeAreaView,
  DeviceEventEmitter,InteractionManager
} from "react-native";

import Button from "../../../components/goods/button";
import Icon from "../../../config/iconFont";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import CouponItem from "../../../components/goods/CouponItem";
//重新部分
import NavigationBar from "../../../components/@jcmall/navbar";
import ProductDetailItemView from "../../../components/category/ProductDetailItemView";
import LineSpace from "../../../components/category/LineSpace";
import { windowWidth, PublicStyles, windowHeight } from "../../../utils/style";
import NumberSwiper from '../../../components/category/NumberSwiper';
import DetailPriceItem from '../../../components/goods/detailPriceItem';
import WebImageItem from '../../../components/goods/webImageItem';
import GoodsItem from "../../../components/goods/goodsItem";
import CommentItem from "../../../components/goods/CommentItem";

import FlatList from "../../../components/flatList";
import BottomShopCart from '../../../components/goods/bottomShopCart';
import ProductSkuDialog from "./ProductSkuDialog";
import { HomeApi } from "../../../services/api/home";
import {GoodsApi} from '../../../services/api/goods';
import Fetch from "../../../utils/fetch";
import { StackNavigator, TabNavigator ,NavigationActions} from 'react-navigation';
import { connect } from "react-redux";
import Banner from "./banner";
import { formatMoney,shareWechat,Toast } from "../../../utils/function";
const width = (windowWidth - 36) / 2;
import ParamsDialog from './ParamsDialog';
import ServeDialog from './ServeDialog';
import * as Track from "../../../utils/track";
let key = null;
import Overlay from "../../../components/@jcmall/overlay";
import ShareModal from '../../../components/@jcmall/shareModal';
import wechat from "@yyyyu/react-native-wechat";

let commentHeight = 0
let recommendHeight = 0
let _this = null

@connect(({ app: { user: { login, userInfo, orderNum } } }) => ({
  login,
  userInfo,
  orderNum
}))

export default class ProductDetailPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bgColor: "rgba(255, 255, 255, 0)",
      goodData: null,
      bannerList: [],
      richList:[],
      spuId:"",
      isCollected: false,
      code:"",
      state_type:""
    };
    this._onScroll = this._onScroll.bind(this);
    this.getGoodDetail = this.getGoodDetail.bind(this);
    _this = this
  }

  componentDidMount(){
    let spuId = ""
    let code = ""
    let state_type = ""
    if(this.props.navigation.state.params&&this.props.navigation.state.params.spuId){
      spuId = this.props.navigation.state.params.spuId
      if(this.props.navigation.state.params.code){
        code = this.props.navigation.state.params.code
      }
      if(this.props.navigation.state.params.state_type){
        state_type = this.props.navigation.state.params.state_type
      }
    }
    console.log(spuId)
    console.log("---spuId-----")
    this.setState({
      spuId,
      code,
      state_type
    })
    // InteractionManager.runAfterInteractions(() => {
      this.getGoodDetail(spuId)
      this.getImageText(spuId)
      this.searchCollect(spuId)
    // })
  }

  addGoodToCar(){

  }

  getImageText(spuId){
    Fetch.fetch({
      api: HomeApi.banners,
      params: {
        code:"JC_PRODUCT_SPU",
        codeId:spuId,
        type:"RICHTEXT"
      }
    }).then((result)=>{
      let richTexts = []
      if(result&&result.obj){
        result.obj.forEach((element,index)=>{
          richTexts.push(element.url)
        })
        this.setState({
          richList:richTexts
        })
      }
    });
  }

  getGoodDetail(spuId){
    Fetch.fetch({
      api: GoodsApi.goodDetail,
      params: {
        id: spuId
      }
    }).then((result)=>{
      console.log(result)
      console.log("---result--商品详情---")
      if(result&&result.obj){
        let state_type = ""
        if(result.obj.hasHalfJisuBuy&&result.obj.hasHalfJisuBuy ==1){
          state_type = "halfbean"
          this.setState({
            state_type
          })
        }
        if(result.obj.hasAllJisuBuy&&result.obj.hasAllJisuBuy ==1){
          state_type = "fullbean"
          this.setState({
            state_type
          })
        }
        this.setState({
          goodData: result.obj
        })
      }
    });
  }

  _commentLayout(event){
    commentHeight = event.nativeEvent.layout.height
  }

  _recommendLaypit(event){
    recommendHeight = event.nativeEvent.layout.height
  }

  _getCommentItem() {
    const {goodData} = this.state
    let productEvaluateVoList = []
    if(goodData&&goodData.productEvaluateVoList){
      productEvaluateVoList = goodData.productEvaluateVoList
    }
    let commentArray = []
    productEvaluateVoList.forEach((element,index) => {
      let evaluateFileList = []
      let score = 5
      let commentImage = []
      if(element.spuCommentLevel&&element.spuCommentLevel==0){score=5}
      if(element.spuCommentLevel&&element.spuCommentLevel==1){score=3}
      if(element.spuCommentLevel&&element.spuCommentLevel==2){score=2}
      evaluateFileList = element.evaluateFileList
      evaluateFileList.forEach((element)=>{
        commentImage.push(element.url)
      })
      commentArray.push(
        <CommentItem
          key={index}
          nickname={element.nickName?element.nickName:""}
          message={element.commentText?element.commentText:""}
          images={commentImage}
          date={element.createTime?element.createTime:""}
          pic={element.headFileUrl?element.headFileUrl:""}
          score={score}
        />
      )
    });
    return commentArray
  }

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
          this.props.navigation.push("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_GOODDETAIL_CAINIXIHUAN})
        }}
      />
    )
  }

  _onScroll = (event, bannerHeight) => {
    let scrollY = event.nativeEvent.contentOffset.y;
    let currentOpacity;
    if (scrollY < bannerHeight) {
      currentOpacity = scrollY / bannerHeight;
    } else {
      currentOpacity = 1;
    }
    this._refHeader.setNativeProps({
      opacity: currentOpacity
    });
  };

   /**
   * 选择商品规格的dialog
   */
  _getProductSkuDialog() {
    let {goodData ,spuId,code,state_type} = this.state;
    let specVoList =[]
    let productSkuVoList = []
        if(goodData&&goodData.specVoList){
          specVoList = goodData.specVoList
        }
        if(goodData&&goodData.productSkuVoList){productSkuVoList = goodData.productSkuVoList}
        let showSalePrice = ""
        if(goodData){
          if(goodData.salePrice){
            showSalePrice = formatMoney(goodData.salePrice)
          }
          if(state_type == "fullbean"){
            showSalePrice = goodData.jisuPrice + "豆"
          }
          if(state_type == "halfbean"){
            showSalePrice = formatMoney(goodData.salePrice) +"+"+  goodData.jisuPrice + "豆"
          }
        }

    return (
      <ProductSkuDialog
        ref={ref => (this.productSkuDialog = ref)}
        specVoList={specVoList}
        code={code}
        state_type={state_type}
        spuId={spuId}
        productSkuVoList = {productSkuVoList}
        salePrice={showSalePrice}
        navigation={this.props.navigation}
        dispatch={this.props.dispatch}
        title=""
        login={true}
        closeModal={() => {
          this.productSkuDialog.dismiss();
        }}
      />
    );

  }

  //添加购物车和立即购买
  buyAtOncePress(){
    const {login} = this.props
    if(login){
      this.productSkuDialog.show()
    }else{
        this.props.navigation.navigate("UserLogin")
    }
  }

  //查询是否已经点过赞
  searchCollect(spuId){
    // const {spuId} = this.state
    Fetch.fetch({
      api: GoodsApi.selectFavoriteCount,
      params: {
        businessId: spuId,
        collectType:1000,
        userOpType:1000
      }
    }).then((result)=>{
      console.log(result)
      console.log("---result--查询商品点赞---")
      if(result&&result.code =="0000"&&result.obj==1){
        this.setState({
          isCollected: true
        })
      }
    });
  }


  //点击收藏或取消收藏
  collectPress(){
    const {spuId,isCollected} = this.state
    const {login} = this.props
    let favoriteStatus = 1
    console.log(isCollected)
    console.log("--isCollected---")
    if(isCollected){
      favoriteStatus = 0
    }
    if(login){
      Fetch.fetch({
        api: GoodsApi.addProductFavorite,
        params: {
          businessId: spuId,
          collectType:1000,
          userOpType:1000,
          favoriteStatus:favoriteStatus
        }
      }).then((result)=>{
        console.log(result)
        console.log("---result--取消商品点赞---")
        if(result&&result.code =="0000"){
          this.setState({
            isCollected: !isCollected
          })
        }
      });
    }else{
        this.props.navigation.navigate("UserLogin")
    }

  }

  shareMyFriend(type){
      const {goodData,spuId} = this.state
      let goodName = goodData.spuName? goodData.spuName:"标题测试"
      let url  = "https://devh5.jckjclub.com/#/goods-detail?id=" + spuId
      let data = {
            link: url, // 链接地址
            title: '商品标题', // 标题
            desc: goodName, // 描述
            thumb: " ", // 缩略图
            scene: type // 发送场景 optional('session')
          }
          shareWechat(data,"Link")
            .then((response)=>{
              if(response&&response.errCode == 0){
                Toast.info("分享成功")
              }else{
                Toast.info("分享取消")
              }
          }).catch((error)=>{
            Toast.info("分享失败")
        })
        Overlay.hide(key)
  }


  _showOverlay() {
    const {userInfo} = this.props
    key = Overlay.show(
      <View style={{flex:1}}>
        <TouchableOpacity style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}
        activeOpacity={1} onPress={() => {Overlay.hide(key)}}/>
        <ShareModal cancelPress={()=>{Overlay.hide(key)}}
          wxPress={()=>{this.shareMyFriend("session")}}
          pyqPress={()=>{this.shareMyFriend('timeline')}}
        />
      </View>
    )
  }

  render() {
    let { productDetail, pageNum, resolve, empty,goodData ,spuId,richList,isCollected,state_type} = this.state;
    let salePrice = 0
    if(goodData&&goodData){
      salePrice = formatMoney(goodData.salePrice)
      if(state_type&&state_type == "fullbean"){
        salePrice = goodData.jisuPrice + "豆"
      }
      if(state_type&&state_type == "halfbean"){
        salePrice = formatMoney(goodData.salePrice) +"+"+  goodData.jisuPrice + "豆"
      }
    }
    let favorableRate = 100
    if(goodData&&goodData.favorableRate){
      favorableRate = goodData.favorableRate
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
        <View
          style={{
            backgroundColor:"#fff",
            height: NavigationBar.Theme.statusBarHeight
          }}
        />
          <FlatList
              listRef={(FlatList) => {this.myFlatList = FlatList }}
              fetchParams={{
                moduleType:1000,
                moduleCode:"CAINIXIHUAN"
              }}
              api={HomeApi.itemsModule}
              onScroll={event => {
                this._onScroll(event, NavigationBar.Theme.contentHeight * 2);
              }}
              floating={true}
              keyExtractor={(item, index) => index}
              scrollEventThrottle={16}
              numColumns={2}
              ListHeaderComponent={(
                <View style={{flex:1}}>
                  <Banner
                    ref="goodBanner"
                    codeId={spuId}
                    handelLink={link=>{}}/>
                    
                  <View style={{height:165,marginBottom:10}}>
                    <DetailPriceItem
                      crownPrice={salePrice}
                      state_type={state_type}
                      beginDate={goodData&&goodData.beginDate?goodData.beginDate:0}
                      endDate={goodData&&goodData.endDate?goodData.endDate:0}
                      nowDate={goodData&&goodData.nowDate?goodData.nowDate:0}
                      limitSaleId={goodData&&goodData.limitSaleId?goodData.limitSaleId:null}
                      
                      originalPrice={goodData&&goodData.marketPrice?formatMoney(goodData.marketPrice):""}
                      salesCount={goodData&&goodData.fictitiousSalesVolume?goodData.fictitiousSalesVolume:0 }
                      productName={goodData&&goodData.spuName ? goodData.spuName: ""}
                      shareWechat={()=>{this._showOverlay()}}
                    />
                  </View>
                  <ProductDetailItemView
                    onPress={()=>{this.productSkuDialog.show()}}
                    style={{height: 50,paddingHorizontal: 12}}
                    showIcon={true}
                    left={<Text style={{ fontSize: 15, color: "#727272" }}>规格</Text>}
                    middle={
                      <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
                        选择颜色分类尺码
                      </Text>
                    }
                  />
                  <LineSpace style={styles.lineStyle}/>
                  <ProductDetailItemView
                    onPress={()=>{
                      this.refs.serveDialog.showModal()
                    }}
                    style={{height: 50,paddingHorizontal: 12}}
                    left={<Text style={{ fontSize: 15, color: "#727272" }}>参数</Text>}
                    middle={
                      <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
                        品牌 适用年龄段
                      </Text>
                    }
                  />
                  <LineSpace style={styles.lineStyle}/>
                  <ProductDetailItemView
                    onPress={()=>{
                      this.refs.paramsDialog.showModal()
                    }}
                    style={{height: 50,paddingHorizontal: 12}}
                    left={<Text style={{ fontSize: 15, color: "#727272" }}>服务</Text>}
                    middle={
                      <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
                        极速退货·正品保证·极速退款
                      </Text>
                    }
                  />
                  <ProductDetailItemView
                    onLayout={event=>{this.layoutX = event.nativeEvent.layout.x}}
                    showIcon={true}
                    style={{height: 50,paddingHorizontal: 12,marginTop:10}}
                    left={<Text style={{ fontSize: 18, color: "#424242" }}>
                      用户评价（{goodData&&goodData.evaluateCount?goodData.evaluateCount:0})
                    </Text>}
                    right={
                      <Text style={{ fontSize: 13, color: "#727272" }}>
                        {/* {goodData.favorableRate?goodData.favorableRate:100}%好评 */}
                        {favorableRate}%好评
                      </Text>
                    }
                    onPress={() => this.props.navigation.navigate("Comment",{favorableRate:favorableRate,spuId:spuId})}
                  />
                  <View style={{height:0.5,width:windowWidth-24,backgroundColor:'#D9D9D9',marginLeft:12}}/>
                  <View style={{width:windowWidth,backgroundColor:'#fff'}} onLayout={this._commentLayout}>
                    {this._getCommentItem()}
                  </View>
                  <View style={styles.textImage}>
                    <Text style={{ fontSize: 18, color: "#424242" }}>图文详情</Text>
                  </View>
                  <View onLayout={this._recommendLaypit}>
                    <WebImageItem imageData={richList} />
                  </View>
                  <View style={{paddingTop: 20,paddingBottom: 10,justifyContent: "center",alignItems: "center",flexDirection:'row'}}>
                    <View style={{width:140,height:1,backgroundColor:'#D9D9D9'}}/>
                    <Text style={{ fontSize: 14, color: "#333333",marginHorizontal:10 }}>猜你喜欢</Text>
                    <View style={{width:140,height:1,backgroundColor:'#D9D9D9'}}/>
                  </View>
              </View>)}
              renderItem={({ item, index }) => this._getItem(item, index)}
            />
            <SafeAreaView style={{backgroundColor:'#fff'}}>
              <BottomShopCart
                  isCollected={isCollected}
                  addCartPress={()=>{
                    this.buyAtOncePress()
                  }}
                  buyAtOncePress={()=>{
                    this.buyAtOncePress()
                  }}
                  collectPress={()=>{
                    this.collectPress()
                  }}
              />
            </SafeAreaView>
          {this._getProductSkuDialog()}
          <ParamsDialog
            ref="paramsDialog"
          />
          <ServeDialog  ref="serveDialog"/>
        <NavigationBar
          leftView={
            <TouchableOpacity style={styles.backButton}
              onPress={() => this.props.navigation.pop()}>
              <Icon name={"-arrow-left"} size={20} color={"#333333"} />
            </TouchableOpacity>
          }
          rightView={
            <TouchableOpacity style={styles.topButton}
              onPress={() => this.props.navigation.navigate("Cart")}>
              <Icon
                name={"-shopping-car-outline"}
                size={20}
                color={"#333333"}
              />
            </TouchableOpacity>
          }
          style={{opacity: 1,backgroundColor: "transparent",borderBottomWidth: 0}}
          statusBarStyle={"dark-content"}
        />

        <NavigationBar
          navRef={c => (this._refHeader = c)}
          style={{opacity: 0, backgroundColor: "#fff", borderBottomWidth: 0 }}
          leftView={
            <TouchableOpacity style={styles.backButton}
              onPress={() => this.props.navigation.pop()}>
              <Icon name={"-arrow-left"} size={20} color={"#333333"} />
            </TouchableOpacity>
          }
          title={
            <SegmentedBar
              animated={false}
              style={{ width: 200, backgroundColor: null }}
              indicatorType={"itemWidth"}
              indicatorLineColor={"#E0324A"}
              activeIndex={this.state.activeTabIndex}
              onChange={index => {
                let cHeight = Platform.OS=="ios"? 610 + NavigationBar.Theme.statusBarHeight : 620 + NavigationBar.Theme.statusBarHeight
                let dHeight = Platform.OS=="ios"? 650  + NavigationBar.Theme.statusBarHeight : 680 + NavigationBar.Theme.statusBarHeight
                let rHeight = dHeight + commentHeight + 70 
                if (index===0) {
                  this.myFlatList.scrollToOffset({animated: true, offset: 0})
                }
                if (index===1) {
                  this.myFlatList.scrollToOffset({animated: true, offset: cHeight})
                }
                if(index === 2){
                  this.myFlatList.scrollToOffset({animated: true, offset: dHeight + commentHeight})
                }
                if(index === 3){
                  this.myFlatList.scrollToOffset({animated: true, offset: rHeight + recommendHeight})
                }
              }}>
              {["商品", "评价", "详情", "推荐"].map((item, index) => (
                <SegmentedBar.Item
                  key={"item" + index}
                  title={item}
                  titleStyle={{ color: "#333333" }}
                  activeTitleStyle={{ color: "#E0324A" }}
                />
              ))}
            </SegmentedBar>
          }
          rightView={
            <TouchableOpacity style={styles.topButton}
              onPress={() => this.props.navigation.navigate("Cart")}>
              <Icon
                name={"-shopping-car-outline"}
                size={20}
                color={"#333333"}
              />
            </TouchableOpacity>
          }
          titleStyle={{ color: "black" }}
          statusBarStyle={"dark-content"}
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
  backButton:{
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    backgroundColor: "white"
  },
  swiperStyle:{
    width: windowWidth,
    height: 350,
    resizeMode: "contain"
  },
  paginationStyle: {
    width: 38,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 15,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  lineStyle:{
    height: 0.5,
    marginHorizontal: 12,
    backgroundColor: "#D9D9D9"
  },
  textImage:{
    borderBottomWidth: 0.5,
    borderBottomColor: "#D9D9D9",
    marginTop: 10,
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  topButton:{
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    backgroundColor: "white"
  }

});
