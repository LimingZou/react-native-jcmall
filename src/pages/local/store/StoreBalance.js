/**
 * 门店---门店详情---结算页
 *  */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";

import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";

import {
  PublicStyles,
  windowWidth,
} from "../../../utils/style";

import LineSpace from "../../../components/local/common/LineSpace";
import ClickImage from "../../../components/local/common/ClickImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Overlay from "../../../components/@jcmall/overlay";
import Button from '../../../components/local/common/Button';
import { Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
import Fetch from "../../../utils/fetch";
import { LocalLifeApi } from "../../../services/api/localLife";


const commonLists = [
  { lefttext: '优惠商品支付金额', righttext: '', type: '6' },
  { lefttext: '非优惠商品支付金额', righttext: '', type: '7' },
  { lefttext: '集速豆抵现', righttext: '', type: '2', extra: { type: '1', money: 0, jsbell: 80 } },
];

const defaultLists = [
  { lefttext: '实际支付金额', righttext: '查看明细', type: '3', extra: { type: '2', money: 100, jsbell: 0 } },
];


const detailLists = [
  { key: 0, lefttext: '支付金额', righttext: '', type: '5', extra: { type: '2', jsbell: 0 } },
  { key: 1, lefttext: '优惠商品金额：', righttext: '', type: '1' },
  { key: 2, lefttext: '非优惠商品金额：', righttext: '', type: '1' },
  { key: 3, lefttext: '集速豆抵现：', righttext: '', type: '1' },
  { key: 4, lefttext: '总计：', righttext: '', type: '4', extra: { type: '3', jsbell: 0 } },
];


export default class StoreBalance extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      chooseCouponed: true,
      wechat: true,
      detailIsShow: false,
      defaultLists: defaultLists,
      items: commonLists.concat(defaultLists),
      contentHeight: new Animated.Value(0),
      balanceInfo: {},
      preferenceMoney: '',
      unpreferenceMoney: '',
      preferenceAfterMoney: {},
      totalMoney: 0,
      haveUserforDou: true,
      detailDataLists: detailLists,
      deleteItems: [],
      orderId:'',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    let id = navigation.state.params.id;
    //可用集速豆接口
    this._requestBalances(id);
  }


  //获取结算信息
  _requestBalances = async (id) => {
    const params = {
      merchantId: id
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryStoreBalance,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      let datas = e.obj;
      console.log("balanceInfo======", datas);
      this.setState({
        balanceInfo: datas,
      });
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  //获取优惠后的金额 
  _requestCalDiscounts = async (id, money) => {
    const { chooseCouponed } = this.state;
    const params = {
      merchantId: id,
      preferenceMoney: parseFloat(money) * 100,
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryCalDiscounts,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      let datas = e.obj;
      //优惠信息
      console.log("requestCalDiscounts======", datas);
      this.setState({
        preferenceAfterMoney: datas,  //后台返回的优惠后的金额
      });
      //计算明细
      this.caculatePreMoney(chooseCouponed, datas);
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  /**
   * 计算明细金额(优惠输入项后计算)
   * 
   * balanceInfo：可以用的集速豆数目
   */
  caculatePreMoney = (chooseCouponed, serverData) => {
    const { balanceInfo, detailDataLists, items, preferenceMoney,
      unpreferenceMoney, deleteItems } = this.state;
    //设置是否有可用的豆
    let haveUserforDou = balanceInfo.userDouAmount > serverData.jisuDouAmount;
    let preferenceMoneyServer = serverData.preferenceMoney ? serverData.preferenceMoney : 0;
    if (chooseCouponed) {
      totalMoney = preferenceMoneyServer + (unpreferenceMoney ? parseFloat(unpreferenceMoney) * 100 : 0);
    } else {
      totalMoney = (preferenceMoney ? parseFloat(preferenceMoney) * 100 : 0) +
        (unpreferenceMoney ? parseFloat(unpreferenceMoney) * 100 : 0);
    }

    console.log('detailDataLists=', detailDataLists);
    let tempDetailList = [];
    let deleteItemsTemp = {};
    //展开的详情项
    detailDataLists.map((item, index) => {
      let tempItem = {};
      if (item.key == 0) {
        tempItem = item;
        tempDetailList.push(tempItem);
      } else if (item.key == 1) {
        tempItem = Object.assign(item, { righttext: '¥' + (preferenceMoney ? preferenceMoney : 0) });
        tempDetailList.push(tempItem);
      } else if (item.key == 2) {
        tempItem = Object.assign(item, { righttext: unpreferenceMoney ? unpreferenceMoney : 0 });
        tempDetailList.push(tempItem);
      } else if (item.key == 3) {
        //集速豆是否打开
        if (chooseCouponed) {
          tempItem = Object.assign(item, { righttext: '-¥' + (serverData.jisuDouMoney / 100).toFixed(0) });
          tempDetailList.push(tempItem);
        }
      } else {
        //总计
        tempItem = Object.assign(item, { righttext: '¥' + (totalMoney / 100).toFixed(0) });
        tempDetailList.push(tempItem);
      }
    });
    console.log('tempDetailList=', tempDetailList);
    this.setState({
      haveUserforDou: haveUserforDou,
      totalMoney: totalMoney,  //总计金额
      detailDataLists: tempDetailList,
      chooseCouponed: haveUserforDou,
      deleteItems: deleteItemsTemp,
    });
  }


  /**
 * 计算明细金额(优惠输入项后计算)
 * 
 * balanceInfo：可以用的集速豆数目
 */
  _caculateUnpreMoney = (unpreferenceMoney) => {
    const { haveUserforDou, detailDataLists, preferenceMoney, preferenceAfterMoney,
      chooseCouponed } = this.state;
    if (!preferenceAfterMoney.preferenceMoney) {
      Toast.warn('请输入优惠金额!');
    }
    let preferenceMoneyServer = preferenceAfterMoney.preferenceMoney ? preferenceAfterMoney.preferenceMoney : 0;
    if (chooseCouponed) {
      totalMoney = preferenceMoneyServer + (unpreferenceMoney ? parseFloat(unpreferenceMoney) * 100 : 0);
    } else {
      totalMoney = (preferenceMoney ? parseFloat(preferenceMoney) * 100 : 0) +
        (unpreferenceMoney ? parseFloat(unpreferenceMoney) * 100 : 0);
    }

    let tempDetailList = [];
    //展开的详情项
    detailDataLists.map((item, index) => {
      let tempItem = {};
      if (item.key == 0) {
        tempItem = item;
        tempDetailList.push(tempItem);
      } else if (item.key == 1) {
        tempItem = Object.assign(item, { righttext: '¥' + preferenceMoney ? preferenceMoney : 0 });
        tempDetailList.push(tempItem);
      } else if (item.key == 2) {
        tempItem = Object.assign(item, { righttext: unpreferenceMoney ? unpreferenceMoney : 0 });
        tempDetailList.push(tempItem);
      } else if (item.key == 3) {
        //集速豆是否打开
        if (chooseCouponed) {
          tempItem = Object.assign(item, { righttext: '-¥' + (preferenceAfterMoney.jisuDouMoney / 100).toFixed(0) });
          tempDetailList.push(tempItem);
        }
      } else {
        //总计
        tempItem = Object.assign(item, { righttext: '¥' + ((totalMoney / 100).toFixed(0)) });
        tempDetailList.push(tempItem);
      }
    });

    this.setState({
      totalMoney: totalMoney,  //总计金额
      detailDataLists: tempDetailList,
    });
  }

  //提交订单
  _commitStoreOrder = async () => {
    const { preferenceMoney, unpreferenceMoney, preferenceAfterMoney, totalMoney } = this.state;
    const { navigation } = this.props;
    let id = navigation.state.params.id;
    console.log("pay preferenceMoney======", preferenceMoney);
    console.log("pay unpreferenceMoney======", unpreferenceMoney);
    const params = {
      merchantId: id,
      preferenceMoney: parseInt(preferenceMoney) * 100,
      unpreferenceMoney: parseInt(unpreferenceMoney) * 100,
      jisuAmount: preferenceAfterMoney.jisuDouAmount?preferenceAfterMoney.jisuDouAmount:0,
      payType: 1,
      totalFee: totalMoney
    };
    console.log("pay params======", params);

    //关闭弹窗
    Overlay.hide(this.payModal);
    fa.toast.show({
      title: "提交中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryStoreCommitOrder,
      params,
    });
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide();
      let datas = e.obj;
      console.log("commitorder======", datas);
      this.setState({
        orderId:datas.orderId,
      });
      navigation.navigate("LocalPaySuccess", { orderId: orderId,merchantId:id });
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  // 每一项渲染
  _readerCommonItem = (item, index) => {
    const { preferenceAfterMoney, haveUserforDou } = this.state;
    let switchImage = this.state.chooseCouponed ? require("../../../images/mine/kai.png") : require("../../../images/mine/guan.png");
    let totalColor = item.extra && item.extra.type == '3' ? '#FD3E42' : '#333';
    //是否显示明细
    if (item.type == '2') {
      return (
        <TouchableOpacity
          key={index}
          style={{ height: 50, width: windowWidth, backgroundColor: '#fff', marginVertical: 10, }}
          onPress={() => { }}
          disabled={true}
          activeOpacity={0.5}
        >
          <View style={{ flex: 1, alignItems: 'center', }}>
            <View style={styles.item_switch_container}>
              <View style={styles.item_switch_container_in}>
                <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.lefttext}</Text>
                {this._renderDouMoney(item)}
              </View>
              <ClickImage
                containerStyle={{ width: 36, height: 50, justifyContent: 'center', alignItems: 'center' }}
                style={{ width: 26, height: 15, }}
                source={switchImage}
                onPress={() => { this._switchBell() }}
              />
            </View>
            <LineSpace style={{ height: 1, width: windowWidth }} />
          </View>
        </TouchableOpacity>
      );
    } else if (item.type == '1' || item.type == '4') {
      return (
        <TouchableOpacity
          key={index}
          style={{ height: 50, width: windowWidth, backgroundColor: '#fff' }}
          onPress={() => { }}
          disabled={true}
          activeOpacity={0.5}
        >
          <View style={{ flex: 1, alignItems: 'center', }}>
            <View style={styles.item_container}>
              <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.lefttext}</Text>
              <Text style={[PublicStyles.title, { fontSize: 15, color: totalColor }]}>{item.righttext}</Text>
            </View>
            <LineSpace style={{ height: 1, width: windowWidth }} />
          </View>
        </TouchableOpacity>
      );
    } else if (item.type == '6') {
      return (
        <TouchableOpacity
          key={index}
          style={{ height: 50, width: windowWidth, backgroundColor: '#fff' }}
          onPress={() => { }}
          disabled={true}
          activeOpacity={0.5}
        >
          <View style={{ flex: 1, alignItems: 'center', }}>
            <View style={styles.item_container}>
              <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.lefttext}</Text>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <TextInput
                  ref={(input) => this.inputSale = input}
                  style={styles.input}
                  multiline={false}
                  placeholder={''}
                  keyboardType='numeric'
                  value={this.state.preferenceMoney}
                  placeholderTextColor='#dddddd'
                  underlineColorAndroid='transparent'
                  onEndEditing={() => { this._onEndPreEdit() }}
                  onChangeText={(text) => this._onPreferenceMoneyChange(text)}
                />
                <Text style={[PublicStyles.title, { fontSize: 15 }]}> 元</Text>
              </View>

            </View>
            <LineSpace style={{ height: 1, width: windowWidth }} />
          </View>
        </TouchableOpacity>
      );
    } else if (item.type == '7') {
      return (
        <TouchableOpacity
          key={index}
          style={{ height: 50, width: windowWidth, backgroundColor: '#fff' }}
          onPress={() => { }}
          disabled={true}
          activeOpacity={0.5}
        >
          <View style={{ flex: 1, alignItems: 'center', }}>
            <View style={styles.item_container}>
              <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.lefttext}</Text>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <TextInput
                  ref={(input) => this.inputSaleun = input}
                  style={styles.input}
                  multiline={false}
                  keyboardType='numeric'
                  onEndEditing={() => { this._onEndUnpreEdit() }}
                  value={this.state.unpreferenceMoney}
                  placeholderTextColor='#dddddd'
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this._onUnpreferenceMoneyChange(text)}
                />
                <Text style={[PublicStyles.title, { fontSize: 15 }]}> 元</Text>
              </View>
            </View>
            <LineSpace style={{ height: 1, width: windowWidth }} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return this._readerDefaultItem(item, index);
    }
  }

  //实际支付金额
  _readerDefaultItem = (item, index) => {
    const { preferenceAfterMoney, totalMoney, chooseCouponed } = this.state;
    if (item.type == '3' || item.type == '5') {
      return (
        <TouchableOpacity
          key={index}
          style={{ height: 50, width: windowWidth, backgroundColor: '#fff', }}
          onPress={() => { this._showDetail() }}
          activeOpacity={0.9}
        >
          <View style={{ flex: 1, alignItems: 'center', }}>
            <View style={styles.item_switch_container}>
              <View style={styles.item_switch_container_in}>
                <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.lefttext}</Text>
                {this._renderTrueMoney(item)}
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', }}>
                {item.type == '3' ? <Text style={{ fontSize: 13, color: "#8C8C8C", textAlign: 'center', marginRight: 5 }}>{item.righttext}</Text> : null}
                <Icon name={item.type == '3' ? '-arrow-down' : '-arrow-up'} size={12} color={"#7E7E7F"} />
              </View>
            </View>
            <LineSpace style={{ height: 1, width: windowWidth }} />
          </View>
        </TouchableOpacity>
      );
    }
  }

  _renderTrueMoney = (item) => {
    const { totalMoney, chooseCouponed, preferenceMoney } = this.state;
    if (preferenceMoney && parseFloat(preferenceMoney) > 0 && item.type == '3') {
      return (
        <Text style={{ fontSize: 18, color: "#FD3E42", textAlign: 'center', marginLeft: 20 }}>¥{(totalMoney / 100).toFixed(0)}</Text>
      );
    } else {
      return null;
    }
  }

  _renderDouMoney = (item) => {
    const { preferenceAfterMoney, chooseCouponed, haveUserforDou } = this.state;
    if (haveUserforDou) {
      return (
        chooseCouponed ?
          <View style={styles.item_switch_text}>
            {preferenceAfterMoney.jisuDouMoney ? <Text style={[PublicStyles.title, styles.bell_text]}>-{(preferenceAfterMoney.jisuDouMoney) / 100}</Text> : null}
            {preferenceAfterMoney.jisuDouAmount ? <Text style={[PublicStyles.title, { fontSize: 13, color: '#9E9E9E' }]}>（已用{preferenceAfterMoney.jisuDouAmount}豆）</Text> : null}
          </View> : null
      );
    } else {
      return (
        <Text style={[PublicStyles.title, { fontSize: 13, color: "#9E9E9E", textAlign: 'center', marginLeft: 38 }]}>暂无可使用的豆</Text>
      );
    }
  }

  /**
   * 优惠金额
   */
  _onPreferenceMoneyChange = (text) => {
    let temp = '';
    //控制小数点2位
    if (text && text.length > 0 && text.indexOf('.') !== -1) {
      let index = text.indexOf('.');
      temp = text.substring(0, index) + '.' + text.substr(index + 1, 2);
    } else {
      temp = text;
    }
    this.setState({
      preferenceMoney: temp,
    });
  }

  _onEndPreEdit = () => {
    const { navigation } = this.props;
    let id = navigation.state.params.id;
    const { preferenceMoney } = this.state;
    if (!preferenceMoney || parseFloat(preferenceMoney) <= 0) {
      this.setState({
        preferenceMoney: ''
      });
    }
    //计算优惠金额
    this._requestCalDiscounts(id, preferenceMoney);
  }

  _onEndUnpreEdit = () => {
    const { unpreferenceMoney } = this.state;
    if (!unpreferenceMoney || parseFloat(unpreferenceMoney) <= 0) {
      this.setState({
        unpreferenceMoney: '',
      });
    }
    this._caculateUnpreMoney(unpreferenceMoney);
  }

  /**
  * 非优惠金额
  */
  _onUnpreferenceMoneyChange = (text) => {
    const { preferenceAfterMoney } = this.state;
    let temp = '';
    if (text && text.length > 0 && text.indexOf('.') !== -1) {
      let index = text.indexOf('.');
      temp = text.substring(0, index) + '.' + text.substr(index + 1, 2);
    } else {
      temp = text;
    }

    this.setState({
      unpreferenceMoney: temp,
    });
  }

  _showDetail = () => {
    const { unpreferenceMoney, preferenceMoney, detailIsShow, items,
      defaultLists, detailDataLists } = this.state;
    if (!preferenceMoney) {
      Toast.warn('请输入优惠金额!');
      return;
    } else if (parseFloat(preferenceMoney) <= 0) {
      Toast.warn('请输入优惠金额!');
      return;
    }

    // if (!unpreferenceMoney) {
    //   Toast.warn('请输入非优惠金额!');
    //   return;
    // } else if (parseFloat(unpreferenceMoney) <= 0) {
    //   Toast.warn('请输入非优惠金额!');
    //   return;
    // }
    this.setState({
      detailIsShow: !detailIsShow,
    });

    console.log('++++++++++', detailDataLists)

    if (detailIsShow) {
      //已展开明细,
      items.splice(3, 5, ...defaultLists);
    } else {
      //未展开明细,
      items.splice(3, 1, ...detailDataLists);
    }
  }

  renderWechat = () => {
    return (
      <View style={styles.item_wx_container}>
        <View style={styles.item_wx_left}>
          <Icon name="-weixin-pay" size={26} color="#1afa29" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#333333", fontSize: 15 }}>微信支付</Text>
          <Text style={{ color: "#9E9E9E", fontSize: 13, marginTop: 8 }}>微信安全支付</Text>
        </View>
        <TouchableOpacity
          style={styles.item_right}
          onPress={() => { this._onPayWayChecked() }}>
          {this.state.wechat ? <Icon name="-checked" size={20} color="#FD3E42" />
            : <Icon name="-circle" size={20} color="#878787" />}
        </TouchableOpacity>
      </View>
    );
  }

  _onPayWayChecked = () => {
    this.setState({
      wechat: true,  //只有微信支付时，写死
    })
  }

  //提交订单
  _commitOrder = () => {
    const { navigation } = this.props;
    let id = navigation.state.params.id;
    const { preferenceMoney, unpreferenceMoney, preferenceAfterMoney, totalMoney } = this.state;
    if (this.state.wechat) {
      if (!preferenceMoney) {
        Toast.warn('请输入优惠金额!');
        return;
      } else if (parseFloat(preferenceMoney) <= 0) {
        Toast.warn('请输入优惠金额!');
        return;
      }

      // if (!unpreferenceMoney) {
      //   Toast.warn('请输入非优惠金额!');
      //   return;
      // } else if (parseFloat(unpreferenceMoney) <= 0) {
      //   Toast.warn('请输入非优惠金额!');
      //   return;
      // }
      // this._showOverlay();
      this._commitStoreOrder();
    } else {
      Toast.info('请选择支付方式！');
    }
  }

  //弹出支付弹窗
  _showOverlay() {
    const { totalMoney } = this.state;
    this.payModal = Overlay.show(
      <Overlay.PullView
        modal={false}
        containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={styles.overlay_container}>
          <View style={{ alignItems: "center", marginBottom: 14, marginTop: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 15, color: "#333333", textAlign: 'center' }}>确认付款</Text>
            <Button
              style={{ padding: 5, }}
              onPress={() => Overlay.hide(this.payModal)}>
              <Icon name={"-close"} size={10} color={"#7E7E7F"} />
            </Button>
          </View>
          <View style={{ width: windowWidth - 26, height: 0.5, backgroundColor: '#D9D9D9', }}></View>
          <View style={styles.card_main}>
            <Text style={{ fontSize: 24, color: "#333333", textAlign: 'center' }}>¥
              <Text style={{ fontSize: 45, color: "#333333", textAlign: 'center' }}>{(totalMoney / 100).toFixed(2)}</Text>
            </Text>
          </View>
          <View style={styles.card_container}>
            <Text style={{ fontSize: 15, color: "#9A9A9A", textAlign: 'center' }}>微信账号</Text>
            <Text style={{ fontSize: 15, color: "#333333", textAlign: 'center' }}>133******99</Text>
          </View>
          <View style={{ width: windowWidth - 26, height: 0.5, backgroundColor: '#D9D9D9', }}></View>
          <View style={styles.card_container}>
            <Text style={{ fontSize: 15, color: "#9A9A9A", textAlign: 'center' }}>支付方式</Text>
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => Overlay.hide(this.payModal)}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: "#333333", textAlign: 'center' }}>微信支付 </Text>
            </TouchableOpacity>

          </View>
          <Button
            style={{ marginTop: 52, height: 50, backgroundColor: '#FD3E42', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => { this._commitStoreOrder() }}>
            <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center' }}>立即付款</Text>
          </Button>
        </View>
      </Overlay.PullView>
    );
  }

  //相同项
  _renderCommonItems = () => {
    return this.state.items.map((item, index) => {
      return this._readerCommonItem(item, index);
    });
  }

  _switchBell = () => {
    const { haveUserforDou, preferenceAfterMoney, defaultLists,
      items, chooseCouponed, deleteItems, preferenceMoney,
      unpreferenceMoney, detailDataLists } = this.state;
    if (haveUserforDou) {
      if (chooseCouponed) {
        let totalMoneyTemp = (preferenceMoney ? parseFloat(preferenceMoney) * 100 : 0) +
          (unpreferenceMoney ? parseFloat(unpreferenceMoney) * 100 : 0);
        if (preferenceAfterMoney.jisuDouAmount) {
          this.caculatePreMoney(false, preferenceAfterMoney);
        }

        let deleteItemsTemp = items.splice(6, 1);
        this.setState({
          chooseCouponed: false,
          deleteItems: deleteItemsTemp,
          totalMoney: totalMoneyTemp,
        });
      } else {
        let preferenceMoneyServer = preferenceAfterMoney.preferenceMoney ? preferenceAfterMoney.preferenceMoney : 0;
        let totalMoneyTemp = preferenceMoneyServer + (unpreferenceMoney ? parseFloat(unpreferenceMoney) * 100 : 0);

        console.log('deleteItem=', deleteItems);
        if (preferenceAfterMoney.jisuDouAmount) {
          this.caculatePreMoney(true, preferenceAfterMoney);
        }
        items.splice(6, 0, ...deleteItems);
        console.log('items=', items);
        this.setState({
          chooseCouponed: true,
          totalMoney: totalMoneyTemp,
        });
      }
    } else {
      Toast.warn('暂无可使用的豆');
      //无可用豆
      this.setState({
        chooseCouponed: false,
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { preferenceAfterMoney, totalMoney, haveUserforDou, chooseCouponed } = this.state;
    let finalMoney = ''
    if (preferenceAfterMoney.jisuDouMoney) {
      finalMoney = haveUserforDou && chooseCouponed ? '￥' + (totalMoney / 100).toFixed(2) + '+'
        + preferenceAfterMoney.jisuDouAmount + '豆' : '￥' + (totalMoney / 100).toFixed(2);
    } else {
      finalMoney = (totalMoney / 100).toFixed(2);
    }

    //商铺地址
    let address = navigation.state.params.address;
    return (
      <View style={[styles.container, { paddingTop: NavigationBar.Theme.contentHeight }]}>
        <KeyboardAwareScrollView>
          <ScrollView style={styles.main}>
            <View style={styles.loc_container}>
              <Text style={styles.loc_text}>{address}</Text>
            </View>
            {this._renderCommonItems()}
            {this.renderWechat()}
          </ScrollView>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.bottom_container}
          onPress={() => { this._commitOrder() }}
        >
          {!preferenceAfterMoney.preferenceMoney ? <View style={styles.bottom_left}></View> :
            <View style={styles.bottom_left}>
              <Text style={{ color: "#323333", fontSize: 13, marginLeft: 15 }}>
                总计:
            </Text>
              <Text style={{ color: "#FD3E42", fontSize: 15, marginLeft: 10 }}>
                {finalMoney}
              </Text>
            </View>}


          <View style={styles.bottom_right} >
            <Text style={{ color: "#fff", fontSize: 15 }}>提交订单</Text>
          </View>
        </TouchableOpacity>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"结算"}
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
  content_top: {
    width: windowWidth,
    backgroundColor: "#fff",
    marginTop: 10
  },
  bottom_container: {
    width: windowWidth,
    height: 49,
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  bottom_left: {
    width: windowWidth - 135,
    height: 49,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  bottom_right: {
    width: 135,
    height: 49,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FD3E42",
    justifyContent: "center"
  },
  loc_text: {
    color: "#8C8C8C",
    fontSize: 15,
    textAlign: 'center',
  },
  loc_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: windowWidth,
  },
  text: {
    fontSize: 15,
    color: '#2C2C2C',
    fontWeight: 'bold'
  },
  item_container: {
    flexDirection: 'row',
    width: windowWidth,
    height: 49,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  item_switch_container: {
    flexDirection: 'row',
    width: windowWidth,
    height: 49,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  item_switch_container_in: {
    flexDirection: 'row',
    width: windowWidth,
    flex: 1,
    alignItems: 'center',
  },
  bell_text: {
    color: "#FD3E42",
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 38,
  },
  item_wx_container: {
    width: windowWidth,
    height: 59,
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  item_wx_left: {
    width: 64,
    height: 59,
    justifyContent: "center",
    marginLeft: 20
  },
  item_right: {
    height: 59,
    justifyContent: "center",
    marginRight: 15
  },
  overlay_container: {
    height: 420,
    paddingHorizontal: 13,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#fff"
  },
  card_main: {
    marginTop: 44,
    marginBottom: 42,
    alignItems: "center"
  },

  card_container: {
    flexDirection: 'row',
    height: 54,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    textAlign: 'right',
    width: 100,
    fontSize: 18,
    color: '#333',
  },
  item_switch_text: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
