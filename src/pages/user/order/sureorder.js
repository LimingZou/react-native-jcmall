import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import OrderModel from "../../../services/models/order";
import { Modal } from "antd-mobile-rn";
import {
  OrderStateCard,
  OrderAddress,
  OrderGoodsList,
  OrderBaseInfo,
  OrderCostList,
  OrderFooterAction,
  SureOrderAddress
} from "../../../components/index";
import OrderGoodItem from "../../../components/my/order/orderGoodItem";
import SelectCoupon from "../../../components/my/order/selectCoupon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CouponItem from "../../../components/goods/CouponItem";
import LineSpace from "../../../components/category/LineSpace";
import {Others} from '../../../services/api/others';
import Fetch from "../../../utils/fetch";
import {OrderApi} from '../../../services/api/order';
import {MyApi} from '../../../services/api/my';
import {CouponApi} from '../../../services/api/coupon';
import { Toast,formatMoney ,wechatPay} from "../../../utils/function";
import ListRow from "../../../components/@jcmall/listRow";
import fa from "../../../utils/fa";
import WeChat from '@yyyyu/react-native-wechat';
import { AppPlatform } from "../../../services";
import InputPassword from "../../../components/my/balance/inputpassword";
import {StackActions,NavigationActions} from 'react-navigation';

let key = null;
import Overlay from "../../../components/@jcmall/overlay";

const orderModel = new OrderModel();

export default class SureOder extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      wechat: true,
      alipay: false,
      yinlian: false,
      showrealname: false,
      showSelectCoupon: false,
      selectAddress:null,
      opened: false,
      userCouponList:[],
      contentHeight: new Animated.Value(0),
      formType:"goods",
      jisuPaidAmount: 0,
      jisuPaidMoney: 0,
      freight: 0,
      userDouAmount: 0,
      hasCrossBorder: 0,
      allPrice:0,
      useDouNum:0,
      jisuPrice:0,
      useCouponNum:0,
      couponId:0,
      payMoney:0,
      skuId:0,
      spuId:0,
      addessId:null,
      skuQuantity:0,
      isUseJisu:0,
      payType:1,
      shopCartsSkus:"",
      orderDetailList:[],
      skus:"",
      memoDetail:"",
      abroadIdCard: null,
      abroadRealName: null,
      abroadRealNameId: null,
      useJiSuDoued: false,
      code: "",
      payPassword:"",
      state_type:"",
      haveMoneyAndDou:false
    };
    this.getRealName = this.getRealName.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
    this.inputItem = this.inputItem.bind(this)
  }

  componentDidMount(){      
    if(this.props.navigation.state.params.type&&this.props.navigation.state.params.type=="goods"){
      let goodsOrder = this.props.navigation.state.params.orderGoods
      let code =  this.props.navigation.state.params.code
      let state_type = this.props.navigation.state.params.state_type
      let useJiSuDoued = false
          if(state_type == "fullbean"){
            useJiSuDoued = true
          }
      this.getOrderDetail(goodsOrder,code)
      this.setState({
        formType:"goods",
        code,
        state_type,
        useJiSuDoued
      })
    }else{
      if(this.props.navigation.state.params.skus){
        let skus = this.props.navigation.state.params.skus
        let code = "shoppingcar"
        this.getCarOrderDetail(skus,code)
        this.setState({
          formType:"car",
          skus,
          code
        })
      }
    }
    this.getAddress()
  }

  getCarOrderDetail(carSkus,code){
    console.log(carSkus)
    Fetch.fetch({
      api: OrderApi.orderPayDetail,
      params: {
        isShopCarts:1,
        shopCartsSkus:carSkus,
        orderSource:code
      }
    }).then((result)=>{
      if(result.code == -1){
        Toast.error(result.message)
        this.props.navigation.pop()
        return
      }
      if(result&&result.obj){
        let userCouponList = result.obj.userCouponList
        let orderDetailList = result.obj.orderDetailList

        this.formateCoupon(userCouponList)
        let tempallPrice = 0
        let goods_type = ""
        let useJiSuDoued = false
        orderDetailList.forEach((element)=>{
          let tempPrice = element.salePrice*element.skuCount
          tempallPrice = tempallPrice + tempPrice
          if(element.hasAllJisuBuy == 1){
            this.setState({
              state_type: "fullbean",
              useJiSuDoued: true
            })
          }
          if(element.hasAllJisuBuy !==1){
            this.setState({
              haveMoneyAndDou:true
            })
          }
        })
        let jisuPaidMoney = result.obj.jisuPaidMoney ?  result.obj.jisuPaidMoney : 0

        let allPrice = tempallPrice + result.obj.freight 
        this.setState({
          freight: result.obj.freight,
          userDouAmount: result.obj.userDouAmount,
          hasCrossBorder: result.obj.hasCrossBorder,
          orderDetailList:orderDetailList,
          allPrice: allPrice ,
          jisuPaidMoney:jisuPaidMoney,
          abroadIdCard: result.obj.abroadIdCard,
          abroadRealName: result.obj.abroadRealName,
          abroadRealNameId: result.obj.abroadRealNameId,
          jisuPaidAmount:result.obj.jisuPaidAmount
        })
      }
    });
  }

  getOrderDetail(goodsOrder,code){
    const {state_type} = this.state
    Fetch.fetch({
      api: OrderApi.orderPayDetail,
      params: {
        isShopCarts:0,
        productSpuId:goodsOrder[0].spuId,
        productSkuId:goodsOrder[0].skuId,
        skuQuantity:goodsOrder[0].shopCarNum,
        orderSource:code
      }
    }).then((result)=>{
      console.log(goodsOrder)
      console.log(result)
      console.log("---result---商品确定---")
      if(result&&result.code == "0000"&&result.obj){
        let userCouponList = result.obj.userCouponList
        let orderDetailList = result.obj.orderDetailList
        let jisuPaidMoney = result.obj.jisuPaidMoney ? result.obj.jisuPaidMoney : 0
        let allPrice = result.obj.totalPrice + result.obj.freight + jisuPaidMoney
            // if(state_type&&state_type == "fullbean"){
            //   allPrice = result.obj.freight + "+" + result.obj.jisuPaidAmount
            // }
            // if(state_type&&state_type == "halfbean"){
            //   salePrice = formatMoney(goodData.salePrice) +"+"+  goodData.jisuPrice + "豆"
            // }
        this.setState({
          freight: result.obj.freight,
          userDouAmount: result.obj.userDouAmount,
          hasCrossBorder: result.obj.hasCrossBorder,
          jisuPrice:orderDetailList[0].jisuPrice,
          jisuPaidAmount:result.obj.jisuPaidAmount,
          jisuPaidMoney:jisuPaidMoney,
          allPrice:allPrice,
          orderDetailList:orderDetailList,
          abroadIdCard: result.obj.abroadIdCard,
          abroadRealName: result.obj.abroadRealName,
          abroadRealNameId: result.obj.abroadRealNameId

        })
        this.formateCoupon(userCouponList)
      }else{
        Toast.error(fa.code.parse(result.code, result.message));
        return  this.props.navigation.pop()
      }
    });
  }

  formateCoupon(CouponList) {
      CouponList.forEach((element, index) => {
          CouponList[index].checked = false
      });
      console.log(CouponList)
      this.setState({ userCouponList: CouponList });
  }

  inPutPassword(){
    Modal.alert("支付密码错误", null, [
      { text: "取消", onPress: () =>{}},
      {
        text: "去设置",
        onPress: async () => {
          this.props.navigation.navigate("ChangePayPwd")
        }
      }
    ]);
  }

  _showInputPasswordOverlay() {
    const {payPassword,state_type,isUseJisu,useJiSuDoued} = this.state
    let password = ""
    if(state_type=="fullbean" || isUseJisu || useJiSuDoued){
      key = Overlay.show(
        <InputPassword
          passwordContent={(text)=>{
            this.setState({
              payPassword:text
            })
            password = text
          }}
          closeModal={()=>Overlay.hide(key)}
          surePressButton={() => {
            if(password.length<1){
              return Toast.warn("请输入支付密码")
            }
            Overlay.hide(key)
            this.submitOrder()
          }}
        />
      )
    }else{
      this.submitOrder()
    }
  }

  async submitOrder(){
    const {formType,orderDetailList,couponId,addessId,skus,memoDetail,useJiSuDoued,abroadRealNameId,code,payPassword,state_type,freight,haveMoneyAndDou} = this.state
    let isUseJisu = useJiSuDoued ? 1 : 0
    console.log(memoDetail)
    console.log("--memoDetail-----")
    if(formType == "goods"){
      let params = {
            isShopCarts: 0,
            productSpuId: orderDetailList[0].spuId,
            productSkuId: orderDetailList[0].skuId,
            skuQuantity: orderDetailList[0].skuCount,
            isUseJisu: isUseJisu,
            userAddressId: addessId,
            payType:1,
            memoDetail:memoDetail,
            abroadRealNameId:abroadRealNameId,
            orderSource:code,
            userPayPassword:payPassword
          }
      let coupon = {}
          if(couponId&&couponId>0){
            coupon = {userCouponId:couponId}
          }
      await  Fetch.fetch({
          api: OrderApi.submitOrder,
          params:  Object.assign(params,coupon)
        }).then((result)=>{
            console.log(result)
            console.log("提交订单返回-------");
          if(result&&result.code=="0000"){
            if(state_type=="fullbean"&&freight==0){
              this.props.navigation.navigate('PaySuccess',{status:"success"})
            }else{
              let timestamp = result.obj.timestamp
              let orderId = result.obj.orderId
              let payData = {
                    appId:result.obj.appid,
                    partnerId:result.obj.partnerid,
                    prepayId:result.obj.prepayid,
                    nonceStr:result.obj.noncestr,
                    timestamp: timestamp,
                    packageSign:result.obj.package,
                    sign:result.obj.sign
                  }
                  wechatPay(payData).then((response)=>{
                      if(response&&response.errCode == 0){
                        this.props.navigation.navigate('PaySuccess',{status:"success",orderId:orderId})
                      }else{
                        this.props.navigation.navigate('payFail',{status:"fail"})    
                      }
                  }).catch((error)=>{
                    this.props.navigation.navigate('payFail',{status:"fail"})
              })
            }
          }else{
            if(result.code == "10018"){
              this.inPutPassword()
            }
            Toast.warn(fa.code.parse(result.code, result.message));
          }
        });
    }else{
      let params = {
              isShopCarts: 1,
              shopCartsSkus:skus,
              isUseJisu: isUseJisu,
              userAddressId: addessId,
              payType:1,
              memoDetail:memoDetail,
              abroadRealNameId: abroadRealNameId,
              orderSource:code,
              userPayPassword:payPassword
          }
      let coupon = {}
          if(couponId&&couponId>0){
            coupon = {userCouponId:couponId}
          }
        Fetch.fetch({
          api: OrderApi.submitOrder,
          params:  Object.assign(params,coupon)
        }).then((result)=>{
          if(result&&result.code=="0000"){
            if(state_type=="fullbean"&&freight==0&&!haveMoneyAndDou){
              this.props.navigation.navigate('PaySuccess',{status:"success"})
            }else{
              let timestamp = result.obj.timestamp
              let orderId = result.obj.orderId
              let payData = {
                    appId:result.obj.appid,
                    partnerId:result.obj.partnerid,
                    prepayId:result.obj.prepayid,
                    nonceStr:result.obj.noncestr,
                    timestamp: timestamp,
                    packageSign:result.obj.package,
                    sign:result.obj.sign
                  }
                  wechatPay(payData).then((response)=>{
                      if(response&&response.errCode == 0){
                        this.props.navigation.navigate('PaySuccess',{status:"success",orderId:orderId})
                      }else{
                        this.props.navigation.navigate('payFail',{status:"fail"})    
                      }
                  }).catch((error)=>{
                    this.props.navigation.navigate('payFail',{status:"fail"})
              })
            }
          }else{
            console.log(result)
            console.log("---result-----pay----")
            if(result.code == "10019"){
              this.inPutPassword()
            }
            Toast.warn(fa.code.parse(result.code, result.message));
          }
        });
    }

  }

  async getAddress(){
    Fetch.fetch({
      api: Others.addess
    }).then(e => {
      let selectAddress = null
      if (e.code === 0||e.code==='0000') {
        if(e.obj&&e.obj.length>0){
          selectAddress = e.obj[0]
          this.setState({
            selectAddress,
            addessId:selectAddress.id
          })
        }else{
          selectAddress
        }
      } else {
        Toast.error(e.code);
      }
    });
  }

  inputItem(title, placeholder) {
    return (
      <View style={styles.commentView}>
        <View style={{ width: 121, height: 49, justifyContent: "center" }}>
          <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            ref={textInput1 => {this.textInput1 = textInput1}}
            placeholder={placeholder}
            onChangeText={(text)=>{
              this.setState({memoDetail:text})
            }}
            placeholderTextColor="#D9D9D9"
            underlineColorAndroid="transparent"
            secureTextEntry={false}
            style={{ height: 49, backgroundColor: "#fff" }}
          />
        </View>
      </View>
    );
  }

  useJisuDou() {
    const {userDouAmount,jisuPaidMoney,allPrice,jisuPaidAmount,state_type} = this.state
    
    if(state_type != "fullbean"){
      let useJiSuDoued = !this.state.useJiSuDoued;
      if(jisuPaidAmount>0&&userDouAmount>jisuPaidAmount&&useJiSuDoued){
        this.setState({
          useJiSuDoued,
          allPrice: allPrice - jisuPaidMoney
        });
      }

      if(jisuPaidAmount>0&&userDouAmount>jisuPaidAmount&&!useJiSuDoued){
        this.setState({
          useJiSuDoued,
          allPrice: allPrice + jisuPaidMoney
        });
      }
    }
  }

  seletCoupon(item) {
    const {userCouponList,allPrice,useCouponNum} = this.state
    userCouponList.forEach((element, index) => {
      if(item.id == element.id){
        if(item.checked){
          userCouponList[index].checked = false
          this.setState({
            useCouponNum: 0,
            couponId:item.id,
            allPrice: allPrice + item.money
          })
        }else{
          userCouponList[index].checked = true
          this.setState({
            useCouponNum: item.money,
            couponId:item.id,
            allPrice: allPrice - item.money + useCouponNum
          })
        }
      }else{
        userCouponList[index].checked = false
      }
    });

    Overlay.hide(key)
    console.log(userCouponList)
    console.log("执行完毕-----")
    this.setState({userCouponList:userCouponList});
  }

  openContent() {
    let opened = this.state.opened;
    if (opened) {
      this.setState({ opened: false });
      Animated.parallel([this.createAnimation(0)]);
    } else {
      this.setState({ opened: true });
      Animated.parallel([this.createAnimation(250)]);
    }
  }

  createAnimation = height => {
    return Animated.timing(this.state.contentHeight, {
      toValue: height,
      duration: 250
    }).start();
  };

  showOverlay() {
    const { userCouponList } = this.state;
    key = Overlay.show(
      <Overlay.PullView
        modal={false}
        containerStyle={{ backgroundColor: null }}>
        <View
          style={{height: 356,paddingHorizontal: 13,paddingTop: 13,borderTopLeftRadius: 5,
            borderTopRightRadius: 5,backgroundColor: "white"}}>
          <View style={{flexDirection: "row",alignItems: "center",marginBottom: 13,justifyContent: "space-between"}}          >
            <Text style={{ fontSize: 15, color: "#333333" }}>领取优惠券</Text>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => Overlay.hide(key)}>
              <Icon name={"-close"} size={10} color={"#7E7E7F"} />
            </TouchableOpacity>
          </View>
          <LineSpace style={{marginBottom: 14 }} />
          <CouponItem
              userCouponList={userCouponList}
              selectCoupon={(item) => this.seletCoupon(item)}
          />
        </View>
      </Overlay.PullView>
    );
  }

  receiveCoupon(item, index) {

  }

  goAddressManage(){//回调函数
    this.props.navigation.navigate("ManageAddress", {
      sureOrderCallback: (() => {
        this.getAddress()
      })
    });
  }

  getRealName(){
    Fetch.fetch({
      api: MyApi.realNameList,
      params: {}
    }).then((result)=>{
      console.log(result)
      console.log("--result---真实姓名")
      if(result&&result.obj){
        let abroadRealName  = null ,abroadIdCard = null , abroadRealNameId = null
        let realList = result.obj
        if(realList.length>0){
          realList.forEach((element)=>{
            if(element.isDefault ==1){
              abroadRealName = element.realName
              abroadIdCard = element.idCard,
              abroadRealNameId = element.id
            }
          })
        }
        this.setState({
          abroadRealName:abroadRealName,
          abroadIdCard:abroadIdCard,
          abroadRealNameId: abroadRealNameId
        })
      }
    })
  }

  orderGoods(){
    const {orderDetailList,state_type} = this.state
    console.log(orderDetailList)
    console.log(state_type)
    console.log("---state_type---1-2-3-4---")

    let  goods = []
      if(orderDetailList.length>0){
        orderDetailList.forEach((element,index)=>{
          let salePrice = 0
          if(element.salePrice){
            salePrice = formatMoney(element.salePrice)
          }
          if(element.jisuPrice){
            if(state_type == "fullbean" || element.hasAllJisuBuy == 1){
              salePrice = element.jisuPrice + "豆"
            }
            if(state_type == "halfbean" || element.hasHalfJisuBuy == 1){
              salePrice = formatMoney(element.salePrice) +"+"+  element.jisuPrice + "豆"
            }
          }

          goods.push(
            <OrderGoodItem
              key={index}
              title={element.spuName?element.spuName:""}
              payStatus="待付款"
              goodImage={element.img?element.img:""}
              goodAttribute={""}
              price={salePrice}
              number={element.skuCount ? element.skuCount: 1}
            />
          )
        })
      }
    return goods
  }

  overseasBuy(){
    const {hasCrossBorder,showrealname,abroadIdCard,abroadRealName,abroadRealNameId} = this.state
    if(hasCrossBorder&&hasCrossBorder == 1){
      return(
        <View style={{width: windowWidth,backgroundColor: "#fff",marginTop: 10}}>
          <Text style={{ color: "#EF4042", fontSize: 11, margin: 15 }}>
            根据海关要求，购买跨境商品需要提供订购人身份信息（请与支付账号实名信息相同）本信息仅用于海关清关，集呈保证信息安全。
          </Text>
            {abroadRealName&&abroadRealNameId?
              <View style={{height:97,width:windowWidth,backgroundColor:'#fff'}}>
                <TouchableOpacity style={{height:48,width:windowWidth,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}
                  onPress={()=>{
                    this.props.navigation.navigate("IdentityVerify",{
                      realNameCallBack: (() => {
                          this.getRealName()
                      })
                    })
                  }}>
                  <View style={{width:100,height:48,justifyContent:'center'}}>
                      <Text style={{color:'#333333',fontSize:15,marginLeft:15}}>
                          订购人
                      </Text>
                  </View>
                  <View style={{flex:1,height:48,justifyContent:'center'}}>
                    <Text style={{color:'#333333',fontSize:15}}>
                      {abroadRealName}
                    </Text>
                  </View>
                  <View style={{height:48,justifyContent:'center',marginRight:15}}>
                    <Icon name={"-arrow-right"} size={15} color={"#7F7F7F"} />
                  </View>
                </TouchableOpacity>

                <View style={styles.line}/>
                <View style={{height:48,width:windowWidth,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <View style={{width:100,height:48,justifyContent:'center'}}>
                      <Text style={{color:'#333333',fontSize:15,marginLeft:15}}>
                      身份证号
                      </Text>
                  </View>
                  <View style={{flex:1,height:48,justifyContent:'center'}}>
                    <Text style={{color:'#333333',fontSize:15}}>
                      {abroadIdCard}
                    </Text>
                  </View>
                </View>
              </View>
                :
              <TouchableOpacity style={styles.showRealName}
                onPress={() => { //回调函数
                  this.props.navigation.navigate("IdentityVerify",{
                    realNameCallBack: (() => {
                        this.getRealName()
                    })
                  })
                }}>
                <Text style={{ color: "#333333", fontSize: 18 }}>+</Text>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 10 }}>
                  新增订购人信息
                </Text>
            </TouchableOpacity>
            }
        </View>
      )
    }else{
      return null
    }
  }

  render() {
    const {wechat,alipay,yinlian,showrealname,useJiSuDoued,showSelectCoupon,userCouponList,jisuPaidAmount,state_type,haveMoneyAndDou,
      freight,selectAddress,goodsOrder,allPrice,useCouponNum,hasCrossBorder,userDouAmount,jisuPrice,jisuPaidMoney} = this.state;
    let couponed = useJiSuDoued ? require("../../../images/mine/kai.png") :require("../../../images/mine/guan.png");
    let detailAddress = ""

    if(selectAddress&&selectAddress.provinceName){
      detailAddress = selectAddress.provinceName + selectAddress.cityName + selectAddress.areaName + selectAddress.address
    }

    let useCouponDescript = ""
    let couponDescript = "您当前没有可用优惠券"
        if(userCouponList.length>0){couponDescript = "有优惠券可用"}
    let  useCouponText = "￥0"
      if(useCouponNum>0){
        useCouponDescript = "-" + formatMoney(useCouponNum)
        useCouponText = "-" + formatMoney(useCouponNum)
        couponDescript = "（已使用一张优惠券）"
      }

    let realPayMoney = formatMoney(allPrice)

        if(jisuPaidAmount&&jisuPaidAmount>0&&useJiSuDoued){
          realPayMoney = realPayMoney + "+" + jisuPaidAmount + "豆"
        }
        if(state_type&&state_type == "fullbean"){
          realPayMoney = formatMoney(freight) + "+" + jisuPaidAmount + "豆"
          if(freight == 0){
            realPayMoney = jisuPaidAmount + "豆"
          }
        }

        if(state_type&&state_type == "fullbean"&&haveMoneyAndDou){
          realPayMoney = formatMoney(allPrice) + "+" + jisuPaidAmount + "豆"
        }

        if(state_type&&state_type == "halfbean"){
          salePrice = formatMoney(allPrice) +"+"+  jisuPaidAmount + "豆"
        }

        

    let  jindouDescript = ""
    let  jindouTitle = "集速豆:"
    if(jisuPaidMoney&&jisuPaidMoney>0){
        jindouDescript  = formatMoney(jisuPaidMoney)
        jindouTitle = "现金抵豆"
        if(useJiSuDoued){
          jindouTitle = "集速豆"
          jindouDescript = jisuPaidAmount + "豆"
        }
        if(state_type&&state_type == "fullbean"){
          jindouTitle = "集速豆"
          jindouDescript = jisuPaidAmount + "豆"
        }
        
    }
    let  useDouDescript = "该商品不可用豆"
    if(userDouAmount>jisuPaidAmount&&jisuPaidAmount>0){
      useDouDescript = "当前商品可用集速豆"
    }
    if(useJiSuDoued){
      useDouDescript = jisuPaidAmount + "豆"+"(已使用)"+jisuPaidAmount + "豆"
    }

    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
        <KeyboardAwareScrollView>
          <ScrollView style={styles.main}>
            {selectAddress ?
              <SureOrderAddress
                name={selectAddress&&selectAddress.memberName?selectAddress.memberName:""}
                phone={selectAddress.memberMobile?selectAddress.memberMobile:""}
                address={detailAddress}
                onPress={this.goAddressManage.bind(this)}
              />:
              <TouchableOpacity style={[styles.showRealName,{marginTop:10}]}
                  onPress={this.goAddressManage.bind(this)}>
                  <Text style={{ color: "#FD3E42", fontSize: 18 }}>+</Text>
                  <Text style={{ color: "#FD3E42", fontSize: 15, marginLeft: 10 }}>
                    新增收货地址
                  </Text>
                </TouchableOpacity>
              }
              {this.overseasBuy()}
            <View style={{ marginTop: 10 }}>
              {this.orderGoods()}
            </View>

            <View style={styles.commentView}>
              <View style={{ width: 121, height: 49, justifyContent: "center" }}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  使用集速豆
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#9E9E9E", fontSize: 13 }}>
                    {useDouDescript}
                </Text>
              </View>
              <TouchableOpacity style={{ marginRight: 15 }} activeOpacity={1}
                onPress={() => {
                  this.useJisuDou();
                }}>
                <Image style={{ width: 27, height: 16 }} source={couponed} />
              </TouchableOpacity>
            </View>

            <View style={styles.listItem}/>
              <View style={styles.commentView}>
              <View style={{ width: 121, height: 49, justifyContent: "center" }}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  使用优惠券
                </Text>
              </View>
              <View style={{ flex: 1 ,flexDirection:'row',height:49,alignItems:'center'}}>
                <Text style={{ color: "#FD3E42", fontSize: 18 }}>
                  {useCouponDescript}
                </Text>
                <Text style={{ color: "#9E9E9E", fontSize: 13 ,marginLeft:2}}>
                  {couponDescript}
                </Text>
              </View>
              <TouchableOpacity style={{height: 49,justifyContent: "center",marginRight: 15}}
                onPress={() => {
                  if(userCouponList.length>0){
                    this.showOverlay()
                  }else{
                    Toast.info("无可用优惠券")
                  }
                }}>
                <Icon name="-arrow-down" size={20} color="#333333" />
              </TouchableOpacity>
            </View>

            <View style={styles.line}/>
            {this.inputItem("订单备注", "选填，请先和商家协商一致")}
            <View style={[styles.commentView,{marginTop:10}]}>
              <View style={{ width: 121, height: 49, justifyContent: "center" }}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  实际支付金额
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#FD3E42", fontSize: 18, marginLeft: 17 }}>
                  {realPayMoney}
                </Text>
              </View>
              <TouchableOpacity style={styles.openDetail}
                onPress={() => {this.openContent()}}>
                <Text style={{ color: "#8C8C8C", fontSize: 13, marginRight: 5 }}>
                  查看明细
                </Text>
                <Icon name="-arrow-down" size={15} color="#7E7E7F" />
              </TouchableOpacity>
            </View>

            <Animated.View style={{height: this.state.contentHeight,width: windowWidth,marginVertical: 10}}>
              <View style={styles.listItem}/>
                <View style={styles.commentView}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  商品金额：
                </Text>
                <Text style={{ color: "#333333", fontSize: 18, marginRight: 17 }}>
                  {realPayMoney}
                </Text>
              </View>
              <View style={styles.listItem}/>
              <View style={styles.commentView}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  优惠券：
                </Text>
                <Text style={{ color: "#333333", fontSize: 18, marginRight: 17 }}>
                  {useCouponText}
                </Text>
              </View>
              <View style={styles.listItem}/>
              <View style={styles.commentView}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  {jindouTitle}
                </Text>
                <Text style={{ color: "#333333", fontSize: 18, marginRight: 17 }}>
                  {jindouDescript}
                </Text>
              </View>
              <View style={styles.listItem}/>
              <View style={styles.commentView}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  运费：
                </Text>
                <Text style={{ color: "#333333", fontSize: 18, marginRight: 17 }}>
                  {formatMoney(freight)}
                </Text>
              </View>
              <View style={styles.listItem}/>
              <View style={styles.commentView}>
                <Text style={{ color: "#333333", fontSize: 15, marginLeft: 17 }}>
                  总计：
                </Text>
                <Text style={{ color: "#FD3E42", fontSize: 18, marginRight: 17 }}>
                  {realPayMoney}
                </Text>
              </View>
            </Animated.View>

            <View style={styles.payItem}>
              <View style={styles.payIcon}>
                <Icon name="-weixin-pay" size={26} color="#1afa29" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#333333", fontSize: 15 }}>微信支付</Text>
                <Text style={{ color: "#9E9E9E", fontSize: 13, marginTop: 8 }}>
                  微信安全支付
                </Text>
              </View>
              <TouchableOpacity style={styles.checkedStyle}
                onPress={() => {
                  this.setState({wechat: true,alipay: false,yinlian: false});
                }}>
                {wechat ? (
                  <Icon name="-checked" size={20} color="#FD3E42" />
                ) : (
                  <Icon name="-circle" size={20} color="#878787" />
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>

        <View style={styles.orderView}>
          <View style={styles.payView}>
            <Text style={{ color: "#323333", fontSize: 13, marginLeft: 15 }}>
              总计:
            </Text>
            <Text style={{ color: "#FD3E42", fontSize: 15, marginLeft: 10 }}>
              {realPayMoney}
            </Text>
          </View>

          <TouchableOpacity style={styles.orderSty} onPress={()=>{
            // this.submitOrder()
            this._showInputPasswordOverlay()
          }}>
            <Text style={{ color: "#fff", fontSize: 15 }}>提交订单</Text>
          </TouchableOpacity>
        </View>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"确认订单"}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  main: {
    backgroundColor: "#e9e9e9"
  },
  item: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 10
  },
  payItem:{
    width: windowWidth,
    height: 59,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  payIcon:{
    width: 64,
    height: 59,
    justifyContent: "center",
    marginLeft: 20
  },
  checkedStyle:{
    height: 59,
    justifyContent: "center",
    marginRight: 15
  },
  commentView:{
    width: windowWidth,
    height: 49,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listItem:{
    width: windowWidth,
    height: 1,
    backgroundColor: "#D9D9D9"
  },
  orderSty:{
    width: 135,
    height: 49,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FD3E42",
    justifyContent: "center"
  },
  payView:{
    width: windowWidth - 135,
    height: 49,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  openDetail:{
    height: 49,
    justifyContent: "center",
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  line:{
    height: 1,
    width: windowWidth,
    backgroundColor: "#e9e9e9"
  },
  showRealName:{
    height: 48,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor:'#fff'
  },
  orderView:{
    width: windowWidth,
    height: 49,
    backgroundColor: "#fff",
    flexDirection: "row"
  }

});
