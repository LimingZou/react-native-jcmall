import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { View } from 'react-native-animatable';
import fa from "../../../utils/fa";
import RefundModel from "../../../services/models/refund";
import { Modal } from "antd-mobile-rn";
import {
  RefundStateCard,
  RefundStateReason,
  RefundGoodsInfo,
  RefundBaseInfo,
  Field
} from "../../../components";
import { PublicStyles } from "../../../utils/style";
import { StackActions } from "react-navigation";
import NavigationBar from "../../../components/@jcmall/navbar";
import Menu from "../../../components/@jcmall/menu";
import { Button } from "../../../components/theme";
import Icon from "../../../config/iconFont";

const refundModel = new RefundModel();

export default class RefundDetail extends Component {
  state = {
    id: null,
    sn:"",
    logistics:"",
    logisticsList: [],
    refundInfo: null
  };

  componentWillMount() {
    this.setState(
      {
        id: this.props.navigation.getParam("id")
      },
      () => {
        this.props.navigation.addListener("willFocus", async () => {
          this.init();
        });
      }
    );
  }

  async init() {
    const refundInfo = await refundModel.info({ afterApplyId: this.state.id });
    const logisticsInfo = await refundModel.logisticsList();
    const logisticsList = logisticsInfo.list.map((item)=>{
      return {
        value: item.title,
        label: item.title
      };
    });
    console.log('退款详情',refundInfo)
    if (refundInfo && logisticsList) {
      this.setState({
        refundInfo,
        logisticsList
      });
    }
  }

  showMenu(view, align) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: '联系客服', icon: <View style={{marginRight:5}}><Icon name={"-kefu"} size={15} color={"#fff"} /></View>, onPress: () => {

        }},
        {title: '撤销申请', icon: <View style={{marginRight:5}}><Icon name={"-chexiao"} size={15} color={"#fff"} /></View>, onPress: async () => {
            const result = await refundModel.revoke({ afterApplyId: this.state.id });
            if (result) {
              this.init();
              this.updateListRow();
            } else {
              fa.toast.show({
                title: fa.code.parse(refundModel.getException().getCode())
              });
            }
        }},
      ];
      Menu.show({x: pageX, y: pageY, width, height}, items, {align});
    });
  }

  onGoods() {
    const { goods_id } = this.state.refundInfo;
    this.props.navigation.navigate("GoodsDetail", { id: goods_id });
  }

  onTrack() {
    this.props.navigation.navigate("RefundLogisticsFill", {
      id: this.state.id,
      order_goods_id: this.state.refundInfo.order_goods_id
    });
  }

  onLogisticsChange({ value }) {
    this.setState({
      logistics: value
    });
  }

  onSnStateChange({ value }) {
    this.setState({
      sn: value
    });
  }

  async onSubmit() {
    const {
      id,
      logistics,
      sn
    } = this.state;
    if (!logistics) {
      return fa.toast.show({ title: "请选择物流公司" });
    }
    if (!sn) {
      return fa.toast.show({ title: "请输入物流单号" });
    }
    let data = {
      afterApplyId:id,
      expressCode: logistics,
      expressNo:sn
    };

    console.log('继续退款提交',data);
    const result = await refundModel.continueApply(data);
    if (result === false) {
      fa.toast.show({
        title: refundModel.getException().getMessage()
      });
    } else {
      console.log('继续退款提交结果',result);
      this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
    }
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
    const { refundInfo, logisticsList, logistics,sn } = this.state;
    const { navigation } = this.props;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        {refundInfo ? (
          <View animation="fadeIn" duration={400} delay={100} style={[PublicStyles.ViewMax]}>
            <ScrollView>
              <View style={{ marginBottom: 10 }}>
                <RefundStateCard refundInfo={refundInfo} />
                <RefundStateReason
                  refundInfo={refundInfo}
                  onUndo={() => {
                    this.onUndo();
                  }}
                  onTrack={() => {
                    this.onTrack();
                  }}
                />
              </View>
              <View>
                <RefundGoodsInfo
                  refundInfo={refundInfo}
                  onGoods={() => {
                    this.onGoods();
                  }}
                />
              </View>
              <View>
                <RefundBaseInfo
                  reason={refundInfo.reason}
                  amount={refundInfo.refundAmount}
                  num={refundInfo.skuQuantity}
                  createTime={refundInfo.createTime}
                  refundNumber={refundInfo.afterSaleNo}
                />
              </View>
              {refundInfo.status === 30?(
                <View style={{ marginTop: 5 }}>
                  <Field
                    type={"picker"}
                    title="物流公司"
                    pickerTilte="物流公司"
                    placeholder="请选择物流公司"
                    value={logistics}
                    data={logisticsList}
                    onChange={e => {
                      this.onLogisticsChange(e);
                    }}
                  />
                  <Field
                    title="物流单号"
                    placeholder="请输入物流单号"
                    value={sn}
                    onChange={e => {
                      this.onSnStateChange(e);
                    }}
                    right={true}
                  />
                </View>
              ):null}
              {refundInfo.status === 30?(
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
              ):null}
            </ScrollView>
          </View>
        ) : null}
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          rightView={
            <TouchableOpacity
              ref='btn'
              onPress={()=>{
                this.showMenu(this.refs['btn'], 'end')
              }}
            >
              <Icon name={"gengduo"} size={15} color={"#333333"} />
            </TouchableOpacity>
          }
          style={{ backgroundColor: "#fff" }}
          title={"退款详情"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footer: {
    paddingTop:50,
    padding: 15
  }
});
