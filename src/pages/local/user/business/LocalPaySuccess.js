//门店---结算---结算成功
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Animated,
} from "react-native";
import { NetworkImage } from "../../../../components/theme";

import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";

import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import Fetch from "../../../../utils/fetch";
import fa from "../../../../utils/fa";
import time from "../../../../utils/time";
import { LocalLifeApi } from "../../../../services/api/localLife";

export default class LocalPaySuccess extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {
        image: 'http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg',
        merchantName: '多伦多海鲜自助餐厅',
        address: '龙湖虹桥天街A馆402号',
        orderNo: '20190304001',
        payTime: '2019-03-04 15:45',
        money: 198,
        trueMoney: 158.4,
        dou: 40,
      },
      orderDetail: {
        orderSn:'',
        payDate:'',
        preferenceMoney:10,
        totalFee:10,
        jisuAmount:0,
      },
      merchantInfo: {
        imageUrl:'',
        merchantName:'',
        address:'',
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // let orderId = navigation.state.params.orderId;
    // let merchantId = navigation.state.params.merchantId;
    let orderId = 81;
    let merchantId = 1;
    //订单详情
    this._requestOrderDetail(merchantId,orderId);
  }

  //获取订单详情
  _requestOrderDetail = async (merchantId, orderId) => {
    const params = {
      merchantId, orderId,
    };
    console.log('_requestOrderDetail params', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryOrderSuccess,
      params
    });
    console.log('_requestOrderDetail', e);
    if (fa.code.isSuccess(e.code)) {
      let dataObject = e.obj;
      if (dataObject) {
        this.setState({
          orderDetail: dataObject.orderDetail,
          merchantInfo: dataObject.merchantInfo,
        });
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };


  _onItemClick = () => {
    const { navigation } = this.props;
    let merchantId = navigation.state.params.merchantId;
    navigation.navigate("StoreDetail", { id: merchantId });
  }


  render() {
    const { orderDetail, merchantInfo,data } = this.state;
    console.log('orderDetail=',orderDetail);
    console.log('merchantInfo=',merchantInfo);
    let formatTime=time.format('yyyy-MM-dd HH:mm',orderDetail.payDate);
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.top}>
            <View style={styles.top_view}>
              <Icon name="-checked" size={20} color="#FD3E42" />
              <Text style={styles.top_text}>支付成功</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => { this._onItemClick() }}
            activeOpacity={1}>
            <NetworkImage
              resizeMode={"stretch"}
              style={styles.store_image}
              source={{ uri: merchantInfo.imageUrl}}
            />
            <View style={styles.mid}>
              <Text style={styles.name}>
              {merchantInfo.merchantName}
              </Text>
              <Text style={styles.info}>
                {merchantInfo.address}
              </Text>
            </View>
            <View style={styles.right}>
              <Icon name="-arrow-right" size={14} color={'#262626'} />
            </View>
          </TouchableOpacity>
          <View style={styles.detail_container}>
            <View style={styles.detail_line}></View>
            <Text style={styles.title_text}>订单详情</Text>
            <View style={styles.detail_line}></View>
          </View>
          <View style={styles.bottom}>
            <View style={[styles.detail_item, { marginTop: 15 }]}>
              <Text style={styles.detail_title}>订单号</Text>
              <Text style={styles.detail_title}>{orderDetail.orderSn}</Text>
            </View>
            <View style={styles.detail_item}>
              <Text style={styles.detail_title}>付款时间</Text>
              <Text style={styles.detail_title}>{formatTime}</Text>
            </View>
            <View style={styles.detail_item}>
              <Text style={styles.detail_title}>应付金额</Text>
              <Text style={styles.detail_title}>￥{orderDetail.preferenceMoney}</Text>
            </View>
            <View style={styles.detail_item}>
              <Text style={styles.detail_title}>应付金额</Text>
              <Text style={[styles.detail_title, { color: '#E75850' }]}>￥{orderDetail.totalFee}</Text>
            </View>
            {orderDetail.jisuAmount > 0 ? <View style={[styles.detail_item, { marginBottom: 15 }]}>
              <Text style={styles.detail_title}>实付集速豆</Text>
              <Text style={[styles.detail_title, { color: '#E75850' }]}>{orderDetail.jisuAmount}豆</Text>
            </View> : null
            }
          </View>
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"支付结果"}
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
    height: windowHeight,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: NavigationBar.Theme.contentHeight
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    width: windowWidth,
    marginVertical: 36,
    alignItems: 'center',
  },
  top_view: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  top_text: {
    textAlign: 'center',
    color: '#262626',
    fontSize: 15,
    marginLeft: 10,
  },
  item: {
    height: 98,
    width: windowWidth - 30,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
  },
  store_image: {
    width: 119,
    height: 78,
    borderRadius: 5,
    marginRight: 11,
  },
  mid: {
    flex: 1,
    height: 78,
    justifyContent: 'flex-start'
  },
  right: {
    width: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title_text: {
    textAlign: 'center',
    color: '#262626',
    fontSize: 13,
    marginHorizontal: 10,
  },
  detail_container: {
    width: windowWidth,
    height: 53,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  detail_line: {
    width: 34,
    height: 1,
    backgroundColor: '#BDBDBD'
  },
  bottom: {
    width: windowWidth - 30,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
  },
  detail_item: {
    width: windowWidth - 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detail_title: {
    textAlign: 'center',
    color: '#262626',
    fontSize: 12,
  },
  name: {
    fontSize: 13,
    color: '#262626',
  },
  info: {
    fontSize: 10,
    color: '#999999',
    marginTop: 10,
  },



});
