import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
  DeviceEventEmitter
} from "react-native";
import ProductDetailItemView from "../../../components/category/ProductDetailItemView";
import LineSpace from "../../../components/category/LineSpace";
import NumberSwiper from "../../../components/category/NumberSwiper";
import { windowWidth, PublicStyles, windowHeight } from "../../../utils/style";
import LimitedTimeBuyView from "../../../components/category/LimitedTimeBuyView";
import PriceView from "../../../components/category/PriceView";
import Button from "../../../components/goods/button";
import Icon from "../../../config/iconFont";
import WebHtmlView from "../../../components/public/webHtmlView";
import ImageViewer from "react-native-image-zoom-viewer";

import ProductSkuDialog from "./ProductSkuDialog";
import NavigationBar from "../../../components/@jcmall/navbar";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import RefreshableSectionList from "./RefreshableSectionList";
import getGoods from "../../../services/models/goods";

import { Toast } from "antd-mobile-rn";
import CouponItem from "../../../components/goods/CouponItem";
import Overlay from "../../../components/@jcmall/overlay";
import LineSpace from "../../../components/category/LineSpace";


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

const specData = {
  title: "11",
  spec_list: [
    {
      id: 2,
      name: "型号",
      value_list: [{ id: 231, name: "aaa" }, { id: 254, name: "荣耀10" }]
    },
    {
      id: 3,
      name: "尺码",
      value_list: [{ id: 178, name: "小尺码" }, { id: 240, name: "aaaa" }]
    }
  ],
  skus: [
    {
      id: 177,
      delete_time: null,
      goods_id: 48,
      spec: [
        { id: 2, name: "型号", value_id: 254, value_name: "荣耀10" },
        { id: 3, name: "尺码", value_id: 240, value_name: "aaaa" }
      ],
      price: "10.00",
      stock: 11,
      code: "12",
      img: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
      weight: 0,
      title: "11 荣耀10 aaaa",
      sale_num: 0,
      create_time: 1551527938,
      update_time: null,
      spec_value_sign: "[240,254]",
      spec_sign: "[2,3]"
    },
    {
      id: 176,
      delete_time: null,
      goods_id: 48,
      spec: [
        { id: 2, name: "型号", value_id: 231, value_name: "aaa" },
        { id: 3, name: "尺码", value_id: 240, value_name: "aaaa" }
      ],
      price: "7.00",
      stock: 8,
      code: "9",
      img: "http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg",
      weight: 0,
      title: "11 aaa aaaa",
      sale_num: 0,
      create_time: 1551527938,
      update_time: null,
      spec_value_sign: "[231,240]",
      spec_sign: "[2,3]"
    },
    {
      id: 175,
      delete_time: null,
      goods_id: 48,
      spec: [
        { id: 2, name: "型号", value_id: 254, value_name: "荣耀10" },
        { id: 3, name: "尺码", value_id: 178, value_name: "小尺码" }
      ],
      price: "4.00",
      stock: 5,
      code: "6",
      img: "http://img.zcool.cn/community/01c8dc56e1428e6ac72531cbaa5f2c.jpg",
      weight: 0,
      title: "11 荣耀10 小尺码",
      sale_num: 0,
      create_time: 1551527938,
      update_time: null,
      spec_value_sign: "[178,254]",
      spec_sign: "[2,3]"
    },
    {
      id: 174,
      delete_time: null,
      goods_id: 48,
      spec: [
        { id: 2, name: "型号", value_id: 231, value_name: "aaa" },
        { id: 3, name: "尺码", value_id: 178, value_name: "小尺码" }
      ],
      price: "1.00",
      stock: 2,
      code: "3",
      img: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
      weight: 0,
      title: "11 aaa 小尺码",
      sale_num: 0,
      create_time: 1551527938,
      update_time: null,
      spec_value_sign: "[178,231]",
      spec_sign: "[2,3]"
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

export default class ProductDetailPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowFind: false,
      btnText: "立刻购买",
      isLoading: true,
      productDetail: {
        pics: [],
        crownPrice: 0,
        originalPrice: 0,
        salesCount: 0,
        productName: "",
        reviewCount: 0,
        rate: 0,
        reviewList: [],
        details: [],
        couponList: couponList
      },
      focusIndex: 0,
      activeTabIndex: 0,
      bigImageModalVisible: false,
      endTime: 0,
      timeTip: "",
      dataSource: [],
      fetchAllow: true,
      pageNum: 1,
      resolve: false,
      empty: true,
      collected: false,
      bgColor: "rgba(255, 255, 255, 0)"

    };
  }

  getProductDetail() {
    const { from, data } = this.props.navigation.state.params;
    const { productDetail } = this.state;
    if (from === "Home") {
      productDetail.pics = [].concat(data.img.url).concat(pics);
      productDetail.crownPrice = data.price;
      productDetail.originalPrice = data.market_price;
      productDetail.salesCount = 1998;
      productDetail.productName = data.title;
      productDetail.reviewCount = 365;
      productDetail.rate = 100;
      productDetail.reviewList = [].concat(reviewList);
      productDetail.details = [].concat(pics);
    } else {
      productDetail.pics = [].concat(data.midPic).concat(pics);
      productDetail.crownPrice = data.crownPrice;
      productDetail.originalPrice = data.originalPrice;
      productDetail.salesCount = 1995;
      productDetail.productName = data.productName;
      productDetail.reviewCount = 365;
      productDetail.rate = 100;
      productDetail.reviewList = [].concat(reviewList);
      productDetail.details = [].concat(pics);
    }
    this.setState({ productDetail });
  }

  componentDidMount() {
    // this.getProductDetail();
    // this.fetchNextData(1);
    // //收到监听
    // this.listener = DeviceEventEmitter.addListener('moveTo',(data)=>{
    //   this.setState({
    //     activeTabIndex: data.index
    //   })
    // });
  }

  componentWillUnmount() {
    // this.listener.remove();
  }

  showOverlay() {
    const { productDetail } = this.state;
    let key = Overlay.show(
      <Overlay.PullView
        modal={false}
        containerStyle={{ backgroundColor: null }}
      >
        <View
          style={{
            height: 356,
            paddingHorizontal: 13,
            paddingTop: 13,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 13,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 15, color: "#333333" }}>领取优惠券</Text>
            <Button style={{ padding: 5 }} onPress={() => Overlay.hide(key)}>
              <Icon name={"-close"} size={10} color={"#7E7E7F"} />
            </Button>
          </View>
          <LineSpace style={{marginBottom: 14 }} />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 13 }}
            showsVerticalScrollIndicator={false}
          >
            {productDetail.couponList.map((item, index) => (
              <CouponItem
                key={index}
                item={item}
                receive={(item, index) => this.receiveCoupon(item, index)}
              />
            ))}
          </ScrollView>
        </View>
      </Overlay.PullView>
    );
  }

  /**
   * 获取图文详情的html
   * @param {*} details
   */
  _getDetailImageHtml(details) {
    let detailImageHtml = "";
    details.map((item, index) => {
      detailImageHtml +=
        '<img src="' + item + '" style="width: 100%;display: block">';
    });
    return `<html>
                    <body style="width: 100%;height: 100%;padding: 0;margin: 0">
                        <div>
                            ${detailImageHtml}
                        </div>
                    </body>
                </html>`;
    }






  _getProductDetailInfo() {
    let { pics } = this.state.productDetail;
    const { data, from, until } = this.props.navigation.state.params;
    let bigImageUrlArr = [];
    if (pics) {
      pics.map(item => bigImageUrlArr.push({ url: item }));
    }
    let {
      productName,
      salesCount,
      originalPrice,
      crownPrice
    } = this.state.productDetail;
    return (
      <View style={{ backgroundColor: "white" }}>
        <NumberSwiper
          style={{ width: windowWidth, height: 350 }}
          pics={pics}
          loop={true}
          imageStyle={{
            width: windowWidth,
            height: 350,
            resizeMode: "stretch"
          }}
          paginationStyle={{
            width: 38,
            height: 20,
            borderRadius: 10,
            position: "absolute",
            bottom: 15,
            right: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
          titleStyle={{ fontSize: 12, color: "#333333" }}
          onPress={i => {
            this.setState({
              bigImageModalVisible: true,
              focusIndex: i
            });
          }}
        />
        <Modal
          visible={this.state.bigImageModalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ bigImageModalVisible: false })}
        >
          <ImageViewer
            imageUrls={bigImageUrlArr}
            flipThreshold={0}
            saveToLocalByLongPress={false}
            onCancel={() => this.setState({ bigImageModalVisible: false })}
            onClick={onCancel => onCancel()}
            index={this.state.focusIndex}
          />
        </Modal>


        {from === "LimitedTimeBuy" ? (
          <LimitedTimeBuyView
            crownPrice={data.crownPrice}
            originalPrice={data.originalPrice}
            until={until}
          />
        ) : (
          <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
            <View>
              <PriceView
                price={crownPrice}
                color={"#E0324A"}
                discount={false}
                priceSize={24}
                priceTagSize={11}
              />
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <Text style={{ fontSize: 12, color: "#444444" }}>
                  {"原价: "}
                  <Text
                    style={{
                      color: "#444444",
                      fontSize: 10
                    }}
                  >
                    ¥
                    <Text style={{ fontSize: 15, color: "#444444" }}>
                      {originalPrice}
                    </Text>
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
        <View
          style={{ paddingHorizontal: 12, paddingTop: 20, paddingBottom: 13 }}
        >
          <Text style={{ fontSize: 15, color: "#444444" }}>{productName}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 13, color: "#727272" }}>
              已售{salesCount}笔
            </Text>
            <Button
              style={{
                width: 75,
                height: 25,
                backgroundColor: "#F3F3F3",
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15
              }}
            >
              <Icon name={"-share"} size={16} color={"#444444"} />
              <Text style={{ fontSize: 13, color: "#444444", marginLeft: 8 }}>
                分享
              </Text>
            </Button>
          </View>
        </View>
        
        <LineSpace style={{ height: 11, backgroundColor: "#F2F2F2" }} />
        <ProductDetailItemView
          style={{
            height: 50,
            paddingHorizontal: 12
          }}
          onPress={() => this.showOverlay()}
          left={<Text style={{ fontSize: 15, color: "#727272" }}>优惠</Text>}
          middle={
            <View style={{ flexDirection: "row" }}>
              <ImageBackground
                resizeMode={"contain"}
                style={{
                  marginLeft: 22,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 9,
                  paddingVertical: 4
                }}
                source={require("../../../images/goodsDetail/yhq.png")}
              >
                <Text style={{ fontSize: 12, color: "#FD3E43" }}>
                  满300减30
                </Text>
              </ImageBackground>
              <ImageBackground
                resizeMode={"contain"}
                style={{
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 9,
                  paddingVertical: 4
                }}
                source={require("../../../images/goodsDetail/yhq.png")}
              >
                <Text style={{ fontSize: 12, color: "#FD3E43" }}>
                  满500减50
                </Text>
              </ImageBackground>
            </View>
          }
          right={<Text style={{ fontSize: 15, color: "#727272" }}>领券</Text>}
        />
        <LineSpace
          style={{
            height: 0.5,
            marginHorizontal: 12,
            backgroundColor: "#D9D9D9"
          }}
        />
        <ProductDetailItemView
          style={{
            height: 50,
            paddingHorizontal: 12
          }}
          left={<Text style={{ fontSize: 15, color: "#727272" }}>规格</Text>}
          middle={
            <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
              选择颜色分类尺码
            </Text>
          }
        />
        <LineSpace
          style={{
            height: 0.5,
            marginHorizontal: 12,
            backgroundColor: "#D9D9D9"
          }}
        />
        <ProductDetailItemView
          style={{
            height: 50,
            paddingHorizontal: 12
          }}
          left={<Text style={{ fontSize: 15, color: "#727272" }}>参数</Text>}
          middle={
            <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
              品牌 适用年龄段…
            </Text>
          }
        />
        <LineSpace
          style={{
            height: 0.5,
            marginHorizontal: 12,
            backgroundColor: "#D9D9D9"
          }}
        />
        <ProductDetailItemView
          style={{
            height: 50,
            paddingHorizontal: 12
          }}
          left={<Text style={{ fontSize: 15, color: "#727272" }}>服务</Text>}
          middle={
            <Text style={{ fontSize: 15, color: "#444444", marginLeft: 22 }}>
              极速退货·正品保证·极速退款
            </Text>
          }
        />
      </View>
    );
  }

  _getComment(reviewList) {
    // if(this.isBeanProduct || this.isMixPayProduct)return;
    return (
      <View style={{ backgroundColor: "white" }}>
        {reviewList.map((item, index) => {
          return this._getCommentItem(
            item,
            index,
            reviewList.length === index + 1
          );
        })}
      </View>
    );
  }

  _getCommentItem(data, index, isLast) {
    let { message, nickname, pic, score, sku, date } = data;
    return (
      <View key={index} style={{ padding: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: pic }}
            style={{
              width: 21,
              height: 21,
              borderRadius: 10
            }}
          />
          <Text style={{ fontSize: 13, color: "#5A5A5A", marginLeft: 5 }}>
            {nickname}
          </Text>
        </View>
        <Text style={{ fontSize: 13, color: "#323031", marginTop: 6 }}>
          {message}
        </Text>
      </View>
    );
  }

  /**
   * 获取底部操作栏
   */
  _getBottomView() {
    let dialogView = this._getProductSkuDialog();
    let bottomView = this._getCustomerServiceShoppingCartBuyNowBottomView();
    return (
      <View>
        {bottomView}
        <View>{dialogView}</View>
        {/*<IPhoneXBottom/>*/}
      </View>
    );
  }

  _getFavor() {
    // alert(this.state.dataSource)
    return (
      <FlatList
        style={{ paddingHorizontal: 12 }}
        ref={e => (this.FlatList = e)}
        keyExtractor={e => String(e.id)}
        data={this.state.dataSource}
        numColumns={2}
        renderItem={({ item, index }) => this._getRecommendItem(item, index)}
        // renderItem={({ item, index }) => <Text>1111====</Text>}
      />
    );
  }

  _getRecommendItem(item, index) {
    let { id, productName, midPic, originalPrice, tag, crownPrice } = item;
    let tagArr = tag ? tag.split(",") : [];
    return (
      <TouchableOpacity
        key={index}
        style={{
          width: width,
          backgroundColor: "white",
          marginBottom: 12,
          paddingBottom: 14,
          overflow: "hidden",
          marginLeft: index % 2 === 0 ? 0 : 12
        }}
        activeOpacity={0.7} //点击时的透明度
        onPress={() => {
          // this.props.navigation.navigate("ProductDetailPage", { productId: id, data: item });
          this.props.navigation.navigate("ProductDetailPage", {
            productId: id,
            data: item
          });
        }}
      >
        <Image
          source={{ uri: midPic }}
          style={{ width: width, height: width }}
        />
        <Text
          style={{
            color: "#2C2C2C",
            marginRight: 10,
            marginLeft: 10,
            textAlign: "left",
            marginTop: 20,
            fontSize: 14
          }}
          numberOfLines={2}
        >
          {productName}
        </Text>
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 14,
            marginTop: 14,
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: 15,
              height: 15,
              resizeMode: "stretch"
            }}
            source={require("../../../images/home/sy_hyj.png")}
          />
          <PriceView
            style={{
              marginLeft: 5
            }}
            price={crownPrice}
            color={"#E0324A"}
            discount={false}
            priceSize={15}
            priceTagSize={15}
          />
          <PriceView
            style={{
              marginLeft: 10
            }}
            price={originalPrice}
            color={"#2C2C2C"}
            discount={false}
            priceSize={13}
            priceTagSize={13}
          />
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 选择商品规格的dialog
   */
  _getProductSkuDialog() {
    return (
      <ProductSkuDialog
        ref={ref => (this.productSkuDialog = ref)}
        spec_list={specData.spec_list ? specData.spec_list : []}
        skus={specData.skus ? specData.skus : []}
        navigation={this.props.navigation}
        dispatch={this.props.dispatch}
        title={specData.title}
        login={true}
        closeModal={() => {
          this.productSkuDialog.dismiss();
        }}
      />
    );
  }

  /**
   * 获取有客服，加入购物车和立刻购买的底部操作栏
   */
  _getCustomerServiceShoppingCartBuyNowBottomView() {
    let { collected } = this.state;
    return (
      <View
        style={[
          {
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white"
          },
          PublicStyles.shadow
        ]}
      >
        <Button
          style={{
            marginLeft: 20,
            height: 60,
            alignItems: "center",
            justifyContent: "center"
          }}
          activeOpacity={0.7}
          onPress={() => {
            // this.props.dispatch(showCsfDialog(false));
            this.props.navigation.navigate("CommonWebView", {
              url: "https://jckj.udesk.cn/im_client/?web_plugin_id=59633",
              tencentX5Support: true
            });
          }}
        >
          <Icon name={"-message"} size={22} color={"#333333"} />
          <Text style={{ fontSize: 13, marginTop: 4, color: "#333333" }}>
            客服
          </Text>
          <View
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              top: 3,
              left: 16,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FE4646"
            }}
          >
            <Text style={{ fontSize: 10, color: "#FFFFFF" }}>1</Text>
          </View>
        </Button>
        <Button
          style={{
            marginLeft: 30,
            height: 60,
            alignItems: "center",
            justifyContent: "center"
          }}
          activeOpacity={0.7}
          onPress={() => {
            this.setState({
              collected: !collected
            });
          }}
        >
          <Icon
            name={collected ? "-star" : "-star-outline"}
            size={22}
            color={collected ? "#FD4245" : "#333333"}
          />
          <Text
            style={{
              fontSize: 13,
              marginTop: 4,
              color: collected ? "#FD4245" : "#333333"
            }}
          >
            收藏
          </Text>
        </Button>
        <Button
          linearGradientStyle={{ flex: 1, borderRadius: 5, marginLeft: 20 }}
          colors={["#FCC55B", "#FE6C00"]}
          style={{
            height: 42,
            justifyContent: "center",
            alignItems: "center"
          }}
          title={"加入购物车"}
          titleStyle={{ fontSize: 13, color: "white" }}
          onPress={() => {
            this.productSkuDialog.show();
          }}
        />

        <Button
          linearGradientStyle={{ flex: 1, borderRadius: 5, marginLeft: 10, marginRight: 15 }}
          colors={["#FE7E69", "#FD3D42"]}
          style={{
            height: 42,
            justifyContent: "center",
            alignItems: "center"
          }}
          title={"立即购买"}
          titleStyle={{ fontSize: 13, color: "white" }}
          onPress={() => {
            this.productSkuDialog.show();
          }}
        />
      </View>
    );
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

  receiveCoupon(item, index) {
    
  }

  renderGoodsSection = ({
    item: { type, source },
    index,
    section: { title, data }
  }) => {
    if (type === "header") {
      // return this._getProductDetailInfo();
    }
    return null;
  };

  renderCommentSection = ({
    item: { type, source },
    index,
    section: { title, data }
  }) => {
    const { productDetail } = this.state;
    return this._getComment(productDetail.reviewList);
  };

  renderDetailSection = ({
    item: { type, source },
    index,
    section: { title, data }
  }) => {
    const { productDetail } = this.state;
    return productDetail.details ? (
      <WebHtmlView
        source={{ html: this._getDetailImageHtml(productDetail.details) }}
      />
    ) : null;
  };

  renderRecommendSection = ({
    item: { type, source },
    index,
    section: { title, data }
  }) => {
    return this._getFavor();
  };

  fetchNextData = async pageNum => {
    const { dataSource } = this.state;
    const callback = newData => {
      const list = newData.data.plist;
      // alert("list="+JSON.stringify(list))
      this.setState({
        pageNum: pageNum,
        resolve: list.length < 10,
        dataSource: pageNum === 1 ? [].concat(list) : dataSource.concat(list)
      });
      if (pageNum === 1) {
        this.setState({
          empty: newData.data.plist.length === 0
        });
      }
    };
    await getGoods({ pageNum, pageSize: 10 }, callback);
  };

  render() {
    let sections = [
      {
        section: "商品",
        data: [{ type: "header", source: {} }],
        renderItem: this.renderGoodsSection
      },
      {
        section: "评价",
        data: [{ type: "", source: {} }],
        renderItem: this.renderCommentSection
      },
      {
        section: "详情",
        data: [{ type: "", source: {} }],
        renderItem: this.renderDetailSection
      },
      {
        section: "推荐",
        data: [{ type: "", source: {} }],
        renderItem: this.renderRecommendSection
      }
    ];

    let { productDetail, pageNum, resolve, empty } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      
        <RefreshableSectionList
          ref={ref => (this.sectionList = ref)}
          sections={sections}
          productDetail={productDetail}
          refreshable={true}
          resolve={resolve}
          page={pageNum}
          empty={empty}
          loadMoreable={!resolve}
          onScroll={this._onScroll}
          navigation={this.props.navigation}
          fetchNextData={this.fetchNextData}
        />

        {this._getBottomView()}
        {this.state.isShowFind ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 12,
              bottom: 80
            }}
            onPress={() => {
              this.sectionList.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0,
                viewOffset: 120
              }),
                this._refHeader.setNativeProps({
                  opacity: 0
                });
            }}
          >
            <Icon name={"fenxiangcopy"} size={20} color={"#424242"} />
          </TouchableOpacity>
        ) : null}

        <NavigationBar
          leftView={
            <Button
              style={{
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 34,
                backgroundColor: "white"
              }}
              onPress={() => this.props.navigation.pop()}
            >
              <Icon name={"-arrow-left"} size={20} color={"#333333"} />
            </Button>
          }
          rightView={
            <Button
              style={{
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 34,
                backgroundColor: "white"
              }}
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <Icon
                name={"-shopping-car-outline"}
                size={20}
                color={"#333333"}
              />
            </Button>
          }
          style={{
            opacity: 1,
            backgroundColor: "transparent",
            borderBottomWidth: 0
          }}
          statusBarStyle={"dark-content"}
        />
 
        <NavigationBar
          navRef={c => (this._refHeader = c)}
          style={{opacity: 1, backgroundColor: "#fff", borderBottomWidth: 0 }}
          leftView={
            <Button
              style={{
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 34,
                backgroundColor: "white"
              }}
              onPress={() => this.props.navigation.pop()}
            >
              <Icon name={"-arrow-left"} size={20} color={"#333333"} />
            </Button>
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
                if (index != this.state.activeTabIndex) {
                  this.state.activeTabIndex = index;
                }
                DeviceEventEmitter.emit("scrollToIndex", {
                  sectionIndex: index,
                  itemIndex: 0,
                  viewOffset: 120
                });
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
            <Button
              style={{
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 34,
                backgroundColor: "white"
              }}
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <Icon
                name={"-shopping-car-outline"}
                size={20}
                color={"#333333"}
              />
            </Button>
          }
          titleStyle={{ color: "black" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
