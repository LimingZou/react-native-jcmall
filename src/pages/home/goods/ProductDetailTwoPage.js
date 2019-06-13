import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,Platform,
  Image,StyleSheet,
  Modal,findNodeHandle,
  TouchableWithoutFeedback,
  UIManager,
  ImageBackground,
  DeviceEventEmitter
} from "react-native";

import Button from "../../../components/goods/button";
import Icon from "../../../config/iconFont";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import { Toast } from "antd-mobile-rn";
import CouponItem from "../../../components/goods/CouponItem";
import Overlay from "../../../components/@jcmall/overlay";
//重新部分
import NavigationBar from "../../../components/@jcmall/navbar";
import ProductDetailItemView from "../../../components/category/ProductDetailItemView";
import LineSpace from "../../../components/category/LineSpace";
import { windowWidth, PublicStyles, windowHeight } from "../../../utils/style";
import NumberSwiper from '../../../components/category/NumberSwiper';
import DetailPriceItem from '../../../components/goods/detailPriceItem';
import CommentItem from '../../../components/goods/CommentItem';
import WebImageItem from '../../../components/goods/webImageItem';
import GoodsItem from "../../../components/goods/goodsItem";

import FlatList from "../../../components/flatList";
import BottomShopCart from '../../../components/goods/bottomShopCart';
import ProductSkuDialog from "./ProductSkuDialog";
import { HomeApi } from "../../../services/api/home";
import {GoodsApi} from '../../../services/api/goods';
import Fetch from "../../../utils/fetch";

const width = (windowWidth - 36) / 2;
const pics = [
  "http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg",
  "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
  "http://img.zcool.cn/community/01c8dc56e1428e6ac72531cbaa5f2c.jpg"
];

const reviewList = [
  {
    message: "一直很喜欢这件宝贝，可惜这次买贵了",
    nickname: "青**草",
    pic: "http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg"
  }
];

const goodItems = {
  data: [
    {
      img: {
        url:
          "https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/24247/6/10471/200233/5c8898bfE625fce91/67a9427bfd1067c4.jpg"
      },
      link: "h5",
      title:
        "高姿 玻尿酸化妆品套装 补水保湿护肤套装水活奢享四件套套装女（洗面)",
      price: "115.00",
      market_price: "329.00"
    },
    {
      img: {
        url:
          "https://img11.360buyimg.com/mobilecms/s250x250_jfs/t1/17606/15/9215/107540/5c7c9d6eEb8f9120b/e8e08f5ba01d2fd9.jpg"
      },
      link: "h5",
      title:
        "intercrew短外套女2019春季新款商场同款韩版休闲时尚连帽可脱卸印花短",
      price: "139.5",
      market_price: "339.00"
    },
    {
      img: {
        url:
          "https://img12.360buyimg.com/mobilecms/s250x250_jfs/t1/32991/18/6096/95909/5c8b750bE6fc2e71e/405ef29ad778cba9.jpg"
      },
      link: "h5",
      title:
        "苏泊尔(SUPOR)破壁机 智能预约家用榨汁机 绞肉机搅拌研磨多功能可加热 可做辅食破壁料理机JP728",
      price: "998.00",
      market_price: "1599.00"
    },
    {
      img: {
        url:
          "https://img10.360buyimg.com/mobilecms/s250x250_jfs/t17863/210/2025837351/409648/43c5c703/5adf3551N5dd82c67.jpg"
      },
      link: "h5",
      title: "宣若（CIELO） 宣若染发霜日本原装进口遮白发无泡沫染发剂天然植物一",
      price: "64.80",
      market_price: "83.60"
    },
    {
      img: {
        url:
          "https://img14.360buyimg.com/mobilecms/s250x250_jfs/t1/29094/38/4096/183494/5c2dc7ffEc26787b8/da34b5bfec8d976b.jpg"
      },
      link: "h5",
      title: "读书郎 readboy G550A（DSL-G550S）学生平板电脑10.1英寸8核",
      price: "3697.00",
      market_price: "3998.00"
    }
  ]
};

const couponList = [
  {
    received: false,
    money: 30,
    total: 300,
    message: "蛋黄酥仅限新人特惠专区使用",
    endDate: "2019.03.26 10:00 - 2019.03.28 10:00"
  },
  {
    received: false,
    money: 50,
    total: 500,
    message: "蛋黄酥仅限新人特惠专区使用",
    endDate: "2019.03.26 10:00 - 2019.03.28 10:00"
  },
  {
    received: false,
    money: 30,
    total: 300,
    message: "蛋黄酥仅限新人特惠专区使用",
    endDate: "2019.03.26 10:00 - 2019.03.28 10:00"
  },
  {
    received: false,
    money: 50,
    total: 500,
    message: "蛋黄酥仅限新人特惠专区使用",
    endDate: "2019.03.26 10:00 - 2019.03.28 10:00"
  }
];

let commentHeight = 0
let recommendHeight = 0
export default class ProductDetailTwoPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bgColor: "rgba(255, 255, 255, 0)",
      goodData: null,

    };
    this._onScroll = this._onScroll.bind(this);
    this.getGoodDetail = this.getGoodDetail.bind(this);
  }

  componentDidMount(){
    let spuId = ""
    if(this.props.navigation.state.params.goods&&this.props.navigation.state.params.goods.spuId){
      spuId = this.props.navigation.state.params.goods.spuId
    }
    console.log(this.props.navigation.state.params)
    console.log("---- 商品详情----")
    this.getGoodDetail(spuId)
  }

  getGoodDetail(spuId){
    Fetch.fetch({
      api: GoodsApi.goodDetail,
      params: {
        id: spuId
      }
    }).then((result)=>{
      
      console.log(result)

      if(result&&result.obj){
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
      if(productEvaluateVoList.length>3){
        productEvaluateVoList = productEvaluateVoList.splice(0,3)
      }
    }
    let commentArray = []
    
    productEvaluateVoList.forEach((element,index) => {
      commentArray.push(
      <View key={index} >
        <View style={{ padding: 12 }} ref='commentView'  >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg" }}
              style={{width: 21,height: 21,borderRadius: 10}}
            />
            <Text style={{ fontSize: 13, color: "#5A5A5A", marginLeft: 5 }}>
              {element.nickName}
            </Text>
          </View>

          <Text style={{ fontSize: 13, color: "#323031", marginTop: 6 }}>
            {element.commentText}
          </Text>
        </View>
        <View style={{height:0.5,backgroundColor:'#D9D9D9',width:windowWidth}}/>
      </View>
      )
    });

    return commentArray
  }

  _getItem(item, index){
    let key = "00" + index    
    console.log(key)
    return(
      <GoodsItem
        key={key}
        data={{
          img: {
            url:item.url
          },
          title:item.name,
          price:item.salePrice,
          market_price:item.marketPrice
        }}
        index={index + "1"}
        onPress={() => {
          
        }}
      />
    )
  }

  loadingFooterView(){
    return  <FlatList
              api={HomeApi.itemsModule}
              fetchParams={{
                pageId:1,
                moduleType:1000,
                moduleCode:"HOMEPAGE_JINGXUAN",
              }}
              api={ GoodsApi.searchGood}
              keyExtractor={(item, index) => index.toString()}
              scrollEventThrottle={16}
              style={{ paddingHorizontal: 12 }}
              ListHeaderComponent={()=>
                  <View style={{paddingTop: 20,paddingBottom: 10,justifyContent: "center",alignItems: "center"}}>
                      <Text style={{ fontSize: 14, color: "#333333" }}>猜你喜欢</Text>
                  </View>
              }
              numColumns={2}
              renderItem={({ item, index }) => this._getItem(item, index)}
            />
  }

  _onScroll = (event) => {
    const bannerHeight = NavigationBar.Theme.contentHeight
    let scrollY = event.nativeEvent.contentOffset.y;
    let currentOpacity;

    if (scrollY < bannerHeight) {
      currentOpacity = scrollY * (1 / bannerHeight);

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
    let {goodData } = this.state;
    let specVoList =[]
    let productSkuVoList = []
        if(goodData&&goodData.specVoList){
          console.log(goodData.specVoList)
          specVoList = goodData.specVoList
        }
        if(goodData&&goodData.productSkuVoList){productSkuVoList = goodData.productSkuVoList}
    return (
      <ProductSkuDialog
        ref={ref => (this.productSkuDialog = ref)}
        specVoList={specVoList}
        productSkuVoList = {productSkuVoList}
        salePrice={goodData&&goodData.salePrice ? goodData.salePrice: 0}
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

  render() {
    let { productDetail, pageNum, resolve, empty,goodData } = this.state;
    let bannerList = []
    let salePrice = 0
        if(goodData){
          if(goodData.bannerList){
            bannerList = goodData.bannerList
          }
        }
        
    let data = { 
                  pic:"http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
                  nickname:"张三",
                  message:"这个衣服不错"
                };
              // NavigationBar.Theme.contentHeight
    return (
      <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
        <ScrollView 
            ref={(ScrollView) => { this.myScrollView = ScrollView }}
            style={{ paddingTop: 0}}
            showsVerticalScrollIndicator={false}
            onScroll={this._onScroll}
          >
          <NumberSwiper
            style={{ width: windowWidth, height: 350 }}
            pics={bannerList}
            loop={true}
            imageStyle={styles.swiperStyle}
            paginationStyle={styles.paginationStyle}
            titleStyle={{ fontSize: 12, color: "#333333" }}
            onPress={i => {}}
          />
          <View style={{height:164}}>
            <DetailPriceItem
              crownPrice={goodData&&goodData.salePrice ? goodData.salePrice: 0}
              originalPrice={goodData&&goodData.evaluateCount?goodData.evaluateCount:0}
              salesCount={1990}
              productName={goodData&&goodData.spuName ? goodData.spuName: ""}
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
            style={{height: 50,paddingHorizontal: 12}}
            left={<Text style={{ fontSize: 15, color: "#727272" }}>参数</Text>}
            middle={
              <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
                品牌 适用年龄段…
              </Text>
            }
          />
          <LineSpace style={styles.lineStyle}/>
          <ProductDetailItemView
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
                100%好评
              </Text>
            }
            onPress={() => this.props.navigation.navigate("Comment")}
          />
          <View style={{height:0.5,width:windowWidth-24,backgroundColor:'#D9D9D9',marginLeft:12}}/>
          <View style={{width:windowWidth,backgroundColor:'#fff'}} onLayout={this._commentLayout}>
            {this._getCommentItem()}
          </View>
          <View style={styles.textImage}>
            <Text style={{ fontSize: 18, color: "#424242" }}>图文详情</Text>
          </View>
          
          <View onLayout={this._recommendLaypit}>
            <WebImageItem imageData={pics} />
          </View>

          {this.loadingFooterView()}

        </ScrollView>

        <BottomShopCart
          addCartPress={()=>{
            this.productSkuDialog.show()
          }}
          buyAtOncePress={()=>{
            this.productSkuDialog.show()
          }}
        />

        {this._getProductSkuDialog()}
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
              ref={ref => (this.segmentedBar = ref)}
              style={{ width: 200, backgroundColor: null }}
              indicatorType={"itemWidth"}
              indicatorLineColor={"#E0324A"}
              activeIndex={this.state.activeTabIndex}
              onChange={index => {
                let cHeight = Platform.OS=="ios"? 590 :610
                let dHeight = Platform.OS=="ios"? 630 :660
                let rHeight = dHeight + commentHeight + 60
                if (index===0) {
                  this.myScrollView.scrollTo({ x: 0, y: 0, animated: true})
                }
                if (index===1) {
                  this.myScrollView.scrollTo({ x: 0, y: cHeight, animated: true})
                }
                if(index === 2){
                  this.myScrollView.scrollTo({ x: 0, y: dHeight + commentHeight  , animated: true})
                }
                if(index === 3){
                  this.myScrollView.scrollTo({ x: 0, y: rHeight + recommendHeight  , animated: true})
                }

              }}
            >
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
