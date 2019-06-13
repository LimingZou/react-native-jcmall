import { StyleSheet, Text } from "react-native";
import { View } from 'react-native-animatable';
import { StackActions } from "react-navigation";
import fa from "../../../utils/fa";
import OrderModel from "../../../services/models/order";
import React, { Component } from "react";
import { Modal } from "antd-mobile-rn";
import NavigationBar from "../../../components/@jcmall/navbar/index";
import {
  OrderAddress,
  OrderGoodsList,
  OrderBaseInfo,
  OrderCostList,
  OrderCardFooter
} from "../../../components/index";
import FlatList from "../../../components/flatList";
import { connect } from "react-redux";
import { PublicStyles } from "../../../utils/style";
import GoodsItem, { Type } from "../../../components/goods/goodsItem";
import { HomeApi } from "../../../services/api/home";
import { wechatPay } from "../../../utils/function";
import * as Track from "../../../utils/track";

const orderModel = new OrderModel();

@connect(({ app: { user: { login, userInfo } } }) => ({
  login,
  userInfo
}))
export default class OrderDetail extends Component {
  state = {
    id: null,
    orderInfo: null
  };

  componentWillMount() {
    this.setState({ id: this.props.navigation.getParam("id") }, ()=>{
      this.props.navigation.addListener("willFocus", async () => {
        this.init();
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isStateChanged = U.isObjDiff(
      [nextState, this.state],
      [
        "id",
        "orderInfo",
      ]
    );
    if (isStateChanged) {
      return true;
    }
    return false;
  }

  async init() {
    const result = await orderModel.detail({
      orderDetailId:this.state.id
    });
    if (result) {
      this.setState({
        orderInfo: result
      });
    }
  }

  refresh = () => {
    this.init();
  };

  async onRemind() {
    fa.toast.show({
      title: "已提醒发货"
    });
  }

  onRefund(orderInfo, refund_type) {
    const { id } = this.state;
    // 1.根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
    // 2.直接跳转到申请发货(未发货)
    // 3.选择是退款还是退款并退货
    this.props.navigation.navigate("RefundServiceApply", {
      id,
      refund_type: refund_type,
      delta: 2,
      updateListRow:this.props.navigation.getParam("updateListRow")
    });
  }

  onRefundDetail(goodsInfo) {
    this.props.navigation.navigate("RefundDetail", {
      id: goodsInfo.refund_id
    });
  }

  onGoodsDetail(goodsInfo) {
    this.props.navigation.navigate("GoodsDetail", {
      id: goodsInfo.goods_id
    });
  }

  async onCancel() {
    Modal.alert("您确认取消吗？状态修改后不能变更", null, [
      { text: "取消", onPress: () => console.log("cancel"), style: "cancel" },
      {
        text: "确认",
        onPress: async () => {
          const { orderInfo } = this.state;
          const result = await orderModel.cancel({
            orderId: orderInfo.orderId
          });
          if (result) {
            this.init();
            this.updateListRow(orderInfo.orderId);
          } else {
            fa.toast.show({
              title: fa.code.parse(orderModel.getException().getCode())
            });
          }
        }
      }
    ]);
  }

  onDelete(orderInfo) {
    const { id } = orderInfo;
    Modal.alert("确认删除订单?", null, [
      { text: "取消", onPress: () => console.log("delete"), style: "delete" },
      {
        text: "确认",
        onPress: async () => {
          const result = await orderModel.delete({
            id
          });
          if (result === true) {
            this.updateListRow(id);
          } else {
            fa.toast.show({
              title: fa.code.parse(orderModel.getException().getCode())
            });
          }
        }
      }
    ]);
  }

  onEvaluate(orderInfo) {
    this.props.navigation.navigate("CommentPage", { id: this.state.id, spuId:orderInfo.orderDetailList[0].spuId });
  }

  async onLogistics(orderInfo) {
    const { expressNo, expressCompany } = orderInfo;
    this.props.navigation.navigate("Logistics", {
      expressNo,
      expressCompany
    });
  }

  async onReceive() {
    Modal.alert("您确认收货吗？状态修改后不能变更", null, [
      { text: "取消", onPress: () => console.log("cancel"), style: "cancel" },
      {
        text: "确认",
        onPress: async () => {
          const { orderInfo } = this.state;
          const result = await orderModel.confirmReceipt({
            id: orderInfo.orderId
          });
          if (result) {
            this.init();
            this.updateListRow(orderInfo.orderId);
          } else {
            fa.toast.show({
              title: fa.code.parse(orderModel.getException().getCode())
            });
          }
        }
      }
    ]);
  }

  async onBuyAgain(orderInfo) {
    const { orderDetailList } = orderInfo;
    this.props.navigation.navigate("ProductDetailPage",{spuId:orderDetailList[0].spuId, code:Track.TRACK_HOME_XINRENTEHUI});
  }

  async onPay() {
    const { orderInfo:{ weixinInfoMap } } = this.state;
    let timestamp = weixinInfoMap.timestamp
    let payData = {
      appId:weixinInfoMap.appid,
      partnerId:weixinInfoMap.partnerid,
      prepayId:weixinInfoMap.prepayid,
      nonceStr:weixinInfoMap.noncestr,
      timestamp: timestamp,
      packageSign:weixinInfoMap.package,
      sign:weixinInfoMap.sign
    }
    wechatPay(payData).then((response)=>{
      console.log(response)
      console.log("---response------")
      if(response&&response.errCode === 0){
        this.props.navigation.navigate('PaySuccess',{status:"success"})
      }else{
        this.props.navigation.navigate('payFail',{status:"fail"})
      }
      // Fetch.fetch({
      //   api: OrderApi.queryAndupdateOrderStatus,
      //   params: {id:}
      // }).then((result)=>{
      //
      // })
    }).catch((error)=>{
      this.props.navigation.navigate('payFail',{status:"fail"})
    })
  }

  updateListRow = () => {
    const { id } = this.state;
    if (id > 0) {
      this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
      const updateListRow = this.props.navigation.getParam("updateListRow");
      if (typeof updateListRow === "function") {
        updateListRow(id);
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { orderInfo } = this.state;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
          <FlatList
            ref={e => this.FlatList = e}
            api={HomeApi.itemsModule}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={16}
            numColumns={2}
            refresh={this.refresh.bind(this)}
            ListHeaderComponent={(
              <View animation="fadeIn" duration={400} delay={100} style={styles.main}>
                {orderInfo ? (
                  <View>
                    <View style={styles.item}>
                      <OrderAddress
                        name={orderInfo.linkMan}
                        phone={orderInfo.linkManMobile}
                        address={
                          orderInfo.province +
                          orderInfo.city +
                          orderInfo.area +
                          orderInfo.address
                        }
                      />
                    </View>
                    <View style={styles.item}>
                      <OrderGoodsList
                        orderInfo={orderInfo}
                        goodsList={orderInfo.orderDetailList}
                        onGoodsDetail={({ goodsInfo }) => {
                          this.onGoodsDetail(goodsInfo);
                        }}
                        onRefund={({ goodsInfo }) => {
                          this.onRefund(goodsInfo);
                        }}
                        onRefundDetail={({ goodsInfo }) => {
                          this.onRefundDetail(goodsInfo);
                        }}
                      />
                    </View>
                    <View style={styles.item}>
                      <OrderBaseInfo
                        orderInfo={orderInfo}
                        orderNumber={orderInfo.orderSn}
                        createTime={orderInfo.createTime}
                        payment="微信支付"
                        freight={orderInfo.freight}
                        payTime={orderInfo.createPayTime}
                        totalCost={orderInfo.totalFee}
                        offer={orderInfo.activDiscountFee}
                        jisudou={orderInfo.jisuPaidAmount}
                      />
                      <OrderCostList
                        goodsTotal={orderInfo.goods_amount}
                        freight={orderInfo.freight_fee}
                        totalCost={orderInfo.totalFee}
                      />
                    </View>
                    <View style={styles.item}>
                      <OrderCardFooter
                        orderInfo={orderInfo}
                        orderId={orderInfo.skuId}
                        state={orderInfo.orderStatus}
                        refondState={orderInfo.orderDetailList[0].orderRefondStatus}
                        endcount={()=>{
                          this.onCancel(item, false);
                        }}
                        onPay={() => {
                          this.onPay(orderInfo);
                        }}
                        onReceive={() => {
                          this.onReceive(orderInfo);
                        }}
                        onCancel={() => {
                          this.onCancel(orderInfo);
                        }}
                        onDelete={() => {
                          this.onDelete(orderInfo);
                        }}
                        onEvaluate={() => {
                          this.onEvaluate(orderInfo);
                        }}
                        onLogistics={() => {
                          this.onLogistics(orderInfo);
                        }}
                        onRefund={ (refundType) =>{
                          this.onRefund(orderInfo, refundType);
                        }}
                        onBuyAgain={ () =>{
                          this.onBuyAgain(orderInfo);
                        }}
                        onRemind={ () =>{
                          this.onRemind(orderInfo);
                        }}
                      />
                    </View>
                  </View>
                ):null}
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#333333" }}>猜你喜欢</Text>
                </View>
              </View>
            )}
            fetchParams={{
              moduleType:1000,
              moduleCode:"HOMEPAGE_JINGXUAN",
            }}
            renderItem={({item, index})=>(
              <GoodsItem
                type={Type.n}
                key={index}
                data={{
                  img: {
                    url:item.url
                  },
                  title:item.name,
                  price:item.salePrice,
                  market_price:item.marketPrice
                }}
                index={index}
                onPress={() => {
                  this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_ORDER_ORDERDETIL_CAINIXIHUAN});
                }}
              />
            )}
          />
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          style={{ backgroundColor: "#fff" }}
          title={"订单详情"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
  },
  item: {
    marginBottom:10
  }
});
