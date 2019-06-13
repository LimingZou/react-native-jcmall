import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import fa from "../../../utils/fa";
import RefundModel from "../../../services/models/refund";
import OrderModel from "../../../services/models/order";
import { Field, OrderCardHeader, OrderCardGoods } from "../../../components";
import { StackActions } from "react-navigation";
import { Button } from "../../../components/theme";
import { PublicStyles } from "../../../utils/style";
import NavigationBar from "../../../components/@jcmall/navbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { formatMoney } from "../../../utils/function";
const refundModel = new RefundModel();
const orderModel = new OrderModel();
export default class ServiceApply extends Component {
  state = {
    delta: 1,
    noMoreThan: 0,
    id: 0,
    goodsInfo: null,
    applyInfo: null,

    refundType: 1,
    reasonList: [],
    receiveStateList: [
      {
        value: "未收到货",
        label: "未收到货"
      },
      {
        value: "已收到货",
        label: "已收到货"
      }
    ],
    sn:"",
    reason: "",
    userReceive: null,
    refundAmount: "",
    userExplain: "",

    images: [],
    uploaderMaxNum: 9,
    uploaderButtonText: "上传凭证"
  };

  async componentWillMount() {
    const goodsInfo = await orderModel.goodsInfo({
      orderDetailId:this.props.navigation.getParam("id")
    });
    const applyInfo = await orderModel.applyInfo({
      orderDetailId:this.props.navigation.getParam("id")
    });
    const refund_type = this.props.navigation.getParam("refund_type");
    const delta = this.props.navigation.getParam("delta", 1);

    const refundType = parseInt(refund_type) !== 1 ? 2 : 1;
    const result = await refundModel.reasonList({
      refund_type: refundType
    });
    const reasonList = result.list.map((item)=>{
      return {
        value: item.title,
        label: item.title
      };
    });
    const noMoreThan =
      parseFloat(applyInfo.totalFee);
    this.setState({
      refundType,
      delta: parseInt(delta),
      refundAmount: noMoreThan,
      id:this.props.navigation.getParam("id"),
      noMoreThan,
      goodsInfo,
      applyInfo,
      reasonList
    });
  }

  onRefundAmountChange({ value }) {
    this.setState({
      refundAmount: parseFloat(isNaN(value) || !value ? 0 : value).toFixed(2)
    });
  }

  onSnStateChange({ value }) {
    this.setState({
      sn: value
    });
  }

  onResonChange({ value }) {
    this.setState({
      reason: value
    });
  }

  onUserExplainChange({ value }) {
    this.setState({
      userExplain: value
    });
  }

  onImagesChange({ value }) {
    this.setState({
      images: value
    });
  }

  async onSubmit() {
    const {
      reason,
      refundAmount,
      noMoreThan,
      userExplain,
      refundType,
      userReceive,
      images,
      delta,
      id,
    } = this.state;
    if (!reason) {
      return fa.toast.show({ title: "请选择退款原因" });
    }
    if (!refundAmount) {
      return fa.toast.show({ title: "请输入退款金额" });
    }
    if (parseFloat(refundAmount) > noMoreThan) {
      return fa.toast.show({
        title: "退款金额不得超过¥" + this.state.noMoreThan
      });
    }
    if (!userExplain) {
      return fa.toast.show({ title: "请填写退款说明" });
    }
    if (!refundType === 2 && typeof userReceive !== "number") {
      return fa.toast.show({ title: "请选择货物状态" });
    }
    let data = {
      orderDetailId:id,
      refundMode: refundType,
      reason,
      refundAmount,
      refundRemark: userExplain
    };
    if (images.length > 0) {
      data.images = _.join(images.map(({id})=>id), ',');
    }
    console.log('退款提交',data);
    const result = await refundModel.apply(data);
    if (result === false) {
      fa.toast.show({
        title: refundModel.getException().getMessage()
      });
    } else {
      console.log('退款提交结果',result);
      this.props.navigation.dispatch(StackActions.pop({ n: delta }));
      const updateListRow = this.props.navigation.getParam("updateListRow");
      if (typeof updateListRow === "function") {
        updateListRow(id);
      }
    }
  }

  render() {
    const { navigation } = this.props;
    const {
      noMoreThan,
      refundType,
      reasonList,
      reason,
      sn,
      refundAmount,
      userExplain,
      goodsInfo,
      applyInfo,
      uploaderMaxNum,
      uploaderButtonText
    } = this.state;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        {goodsInfo && applyInfo ? (
          <KeyboardAwareScrollView
            keyboardDismissMode={"on-drag"}
            style={{ backgroundColor: "#eaeaea" }}
          >
            <View>
              <View style={styles.card}>
                <OrderCardHeader orderId={applyInfo.id} state={applyInfo.orderStatus} sn={applyInfo.orderDetailSn} />
                <OrderCardGoods
                  orderId={applyInfo.id}
                  goodsList={[{
                    goods_img:goodsInfo.productImg,
                    goods_title:goodsInfo.spuName,
                    goods_spec:goodsInfo.skuName,
                    goods_num:goodsInfo.skuQuantity,
                    goods_price:goodsInfo.skuSalePrice,
                    orderRefondStatus:10
                  }]}
                  onClick={() => {}}
                />
                <View style={styles.card_footer}>
                  <Text style={styles.number}>共{applyInfo.skuQuantity}件商品, 实付:</Text>
                  <Text style={styles.price}>
                    {formatMoney(applyInfo.totalFee)}
                  </Text>
                </View>
              </View>
              {refundType === 2 ? (
                <Field
                  title="物流单号"
                  placeholder="请输入物流单号"
                  value={sn}
                  onChange={e => {
                    this.onSnStateChange(e);
                  }}
                  right={true}
                />
              ) : null}
              <Field
                type={"picker"}
                title="退款原因"
                pickerTilte="退款原因"
                placeholder="请选择"
                value={reason}
                data={reasonList}
                onChange={e => {
                  this.onResonChange(e);
                }}
              />
              <View style={{ height: 10 }} />
              <Field
                type={"input"}
                inputType="decimal-pad"
                title="退款金额"
                disabled={true}
                placeholder={formatMoney(noMoreThan)}
                value={refundAmount ? formatMoney(refundAmount) : formatMoney(noMoreThan)}
              />
              <View
                style={{
                  height: 40,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 15
                }}
              >
                <Text
                  style={{ color: "#d9d9d9", fontSize: 15 }}
                >{`最大退款金额¥${noMoreThan}，含发货邮费`}</Text>
              </View>
              <Field
                title="退款说明"
                placeholder="选填"
                value={userExplain}
                onChange={e => {
                  this.onUserExplainChange(e);
                }}
                right={true}
              />
              <View style={{ height: 10 }} />
              <Field
                title={uploaderButtonText}
                type={"uploader"}
                value={[]}
                uploaderMaxNum={uploaderMaxNum}
                onChange={e => {
                  this.onImagesChange(e);
                }}
              />
            </View>
            <SafeAreaView>
              <View style={styles.footer}>
                <Button
                  style={{
                    width: 345,
                    height: 45,
                    borderRadius: 5,
                    alignSelf: "center"
                  }}
                  colors={["#fe7e69", "#fd3d42"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.5, y: 0 }}
                  locations={[0, 1]}
                  onClick={() => {
                    this.onSubmit();
                  }}
                >
                  提交申请
                </Button>
              </View>
            </SafeAreaView>
          </KeyboardAwareScrollView>
        ) : null}
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          style={{ backgroundColor: "#fff" }}
          title={"申请退款"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  refundGoodsCard: {},
  card: {
    backgroundColor: "#fff",
    marginVertical: 10
  },
  card_footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingRight: 15
  },
  number: {
    color: "#333333",
    fontSize: 12
  },
  price: {
    color: "#333333",
    fontSize: 15
  },
  item: {
    borderBottomWidth: 10
  },
  footer: {
    padding: 15
  }
});
