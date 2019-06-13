import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import fa from "../../../utils/fa";
import OrderModel from "../../../services/models/order";
import { OrderApi } from "../../../services/api/order";
import { Modal } from "antd-mobile-rn";
import { PublicStyles } from "../../../utils/style";
import {
  OrderCard,
  OrderCardHeader,
  OrderCardGoods,
  OrderCardCost,
  OrderCardFooter
} from "../../../components/index";
import FlatList from "../../../components/flatList";
import SegmentedBar from "../../../components/@jcmall/segmentedBar/index";
import NavigationBar from "../../../components/@jcmall/navbar/index";
import { connect } from "react-redux";
import * as Track from "../../../utils/track";

const orderModel = new OrderModel();
const tabList = [
  {
    state_type: "all",
    state_value: 0,
    tabLabel: "全部"
  },
  {
    state_type: "state_new",
    state_value: 1000,
    tabLabel: "待付款"
  },
  {
    state_type: "state_pay",
    state_value: 2000,
    tabLabel: "待发货"
  },
  {
    state_type: "state_send",
    state_value: 3000,
    tabLabel: "待收货"
  },
  {
    state_type: "state_unevaluate",
    state_value: 4000,
    tabLabel: "待评价"
  }
];

@connect(({ app: { user: { login, userInfo } } }) => ({
  login,
  userInfo
}))
export default class OrderList extends Component {
  state = {
    state_value: null,
    state_type: null,
    dataSource: []
  };

  async componentWillMount() {
    const state_type = this.props.navigation.getParam("state_type");
    if (state_type) {
      this.setState({
        state_type,
        state_value: tabList[_.findIndex(tabList, ["state_type", state_type])].state_value
      });
    }
  }

  goDetail(id) {
    this.props.navigation.navigate("OrderDetail", { id, updateListRow:this.updateListRow });
  }

  async onCancel(orderInfo, needRemind = true) {
    const { orderId } = orderInfo;
    const cancel = async () => {
      const result = await orderModel.cancel({
        orderId
      });
      if (result === true) {
        this.updateListRow(orderId);
      } else {
        fa.toast.show({
          title: fa.code.parse(orderModel.getException().getCode())
        });
      }
    }
    if (needRemind){
      Modal.alert("确认取消订单?", null, [
        { text: "取消", onPress: () => console.log("cancel"), style: "cancel" },
        {
          text: "确认",
          onPress: cancel
        }
      ]);
    }else {
      cancel()
    }
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
    this.props.navigation.navigate("CommentPage", { id: orderInfo.id, spuId:orderInfo.spuId });
  }

  async onReceive(orderInfo) {
    Modal.alert("您确认收货吗？状态修改后不能变更", null, [
      { text: "取消", onPress: () => console.log("cancel"), style: "cancel" },
      {
        text: "确认",
        onPress: async () => {
          const result = await orderModel.confirmReceipt({
            id: orderInfo.id
          });
          if (result) {
            this.updateListRow(orderInfo.id);
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

  async onPay(orderInfo) {
    this.props.navigation.navigate("OrderDetail", { id:orderInfo.id });
    // 暂时模拟
    // const result = await orderModel.pay({
    //   status:3000,
    //   orderSn: orderInfo.orderSn
    // });
    // if (result) {
    //   this.updateListRow(orderInfo.id);
    // } else {
    //   fa.toast.show({
    //     title: fa.code.parse(orderModel.getException().getCode())
    //   });
    // }
  }
  async onRemind(orderInfo) {
    fa.toast.show({
      title: "已提醒发货"
    });
  }

  async onRefund(orderInfo, refund_type) {
    const { id } = orderInfo;
    // 1.根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
    // 2.直接跳转到申请发货(未发货)
    // 3.选择是退款还是退款并退货
    this.props.navigation.navigate("RefundServiceApply", {
      id,
      refund_type: refund_type,
      delta: 2,
      updateListRow:this.updateListRow
    });
  }

  async onLogistics(orderInfo) {
    const { expressNo, expressCompany } = orderInfo;
    this.props.navigation.navigate("Logistics", {
      expressNo,
      expressCompany
    });
  }

  updateListRow = async id => {
    this.FlatList.manuallyRefresh();
  };

  render() {
    const { navigation } = this.props;
    const { state_type, state_value } = this.state;
    let params = {};
    if (state_value) {
      params["orderStatus"] = state_value;
    }
    const findResult = tabList.findIndex(row => row.state_type === state_type);
    const tabIndex = findResult > -1 ? findResult : 0;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <SegmentedBar
          style={{
            height: 44,
            paddingBottom: 4,
            borderBottomWidth: 0.5,
            borderBottomColor: "#dedede"
          }}
          animated={false}
          indicatorType={"itemWidth"}
          activeIndex={tabIndex}
          indicatorLineColor={"#E0324A"}
          indicatorLineWidth={2}
          onChange={index => {
            this.setState({
              state_type:tabList[index].state_type,
              state_vaalue:tabList[index].state_vaalue
            },()=>{
              this.FlatList.setFetchParams({
                orderStatus: index===0 ? null : tabList[index].state_value,
              })
            });
          }}
        >
          {tabList.map((item, index) => (
            <SegmentedBar.Item
              activeTitleStyle={{ color: "#E0324A" }}
              titleStyle={{ color: "#333333" }}
              key={"item" + index}
              title={item.tabLabel}
            />
          ))}
        </SegmentedBar>
        <FlatList
          style={{ flex: 1 }}
          api={OrderApi.list}
          ref={e => (this.FlatList = e)}
          fetchParams={params}
          renderItem={({ item }) => {
            return (
              (
                <OrderCard key={`card_${item.id}`}>
                  <OrderCardHeader
                    orderId={item.skuId}
                    state={item.orderStatus}
                    sn={item.orderSn}
                  />
                  <OrderCardGoods
                    orderId={item.skuId}
                    goodsList={[{
                      goods_img:item.productImg,
                      goods_title:item.spuName,
                      goods_spec:item.skuName,
                      goods_num:item.skuQuantity,
                      goods_price:item.skuSalePrice,
                      hasAllJisuBuy:item.hasAllJisuBuy,
                      hasHalfJisuBuy:item.hasHalfJisuBuy,
                      skuJisuPrice:item.skuJisuPrice,
                      orderRefondStatus:item.orderRefondStatus
                    }]}
                    onClick={() => {
                      this.goDetail(item.id);
                    }}
                  />
                  <OrderCardCost
                    goodsNumber={item.skuQuantity}
                    totalCost={parseFloat(item.totalFee)}
                  />
                  <OrderCardFooter
                    orderInfo={item}
                    orderId={item.skuId}
                    state={item.orderStatus}
                    refondState={item.orderRefondStatus}
                    endcount={()=>{
                      this.onCancel(item, false);
                    }}
                    onPay={() => {
                      this.onPay(item);
                    }}
                    onReceive={() => {
                      this.onReceive(item);
                    }}
                    onCancel={() => {
                      this.onCancel(item);
                    }}
                    onDelete={() => {
                      this.onDelete(item);
                    }}
                    onEvaluate={() => {
                      this.onEvaluate(item);
                    }}
                    onLogistics={() => {
                      this.onLogistics(item);
                    }}
                    onRefund={ (refundType) =>{
                      this.onRefund(item, refundType);
                    }}
                    onBuyAgain={ () =>{
                      this.onBuyAgain(item);
                    }}
                    onRemind={ () =>{
                      this.onRemind(item);
                    }}
                  />
                </OrderCard>
              )
            )
          }}
          footerEmptyDataComponent={(
            <View style={{
              alignItems:'center',
              paddingTop:77
            }}>
              <Image
                source={require("../../../images/order/shouhou-kong.png")}
              />
              <Text style={{
                marginTop:15,
                fontSize:14,
                color:"#7f7f7f",
                fontWeight:"400"
              }}>
                暂无订单
              </Text>
            </View>
          )}
        />
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          style={{ backgroundColor: "#fff" }}
          title={"我的订单"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({});
