import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { updateUserInfo } from "../../../../redux/actions/user";
import { PublicStyles, windowWidth } from "../../../../utils/style";
import Avatar from "../../../../components/public/avatar";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import UserItem from '../../../../components/local/user/UserItem';
import LineSpace from "../../../../components/local/common/LineSpace";
import { Toast } from "../../../../utils/function";
import fa from "../../../../utils/fa";
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";



const storeUserDatas = [
  { key: '00', name: '收款', icon: '-arrow-right', path: '', status: '' },
  { key: '01', name: '我的订单', icon: '-arrow-right', path: '', status: '' },
  { key: '03', name: '商铺管理', icon: '-arrow-right', path: '', status: '' },
];

const setting = { key: '02', name: '折扣设置', icon: '-arrow-right', path: '', status: '' };

//个人背景色
const storeBgColors = ["#FE7E69", "#FD3D42"];
// const baseInfos= {
//   "userDouAmount": 1,
//   "nickName": "倔强的青铜",
//   "userBalanceAmount": 265,
//   "status": 0,
//   "merchantInfoId":1,
//   "headPic":"http://luolipublic2.oss-cn-hangzhou.aliyuncs.com/img/22/1"
// }

@connect(({ app: { user: { login, userInfo, orderNum } } }) => ({
  login,
  userInfo,
  orderNum
}))

export default class BusinessUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '碎碎的芋头',
      charge: '13456.00',
      baseInfos: {},
      items: storeUserDatas,
      businessStatus: 0,
    };
  }

  componentDidMount = () => {
    this._requestBusinessUserInfos();
  }

  //获取商家后台基本信息
  _requestBusinessUserInfos = async () => {
    const e = await Fetch.fetch({
      api: LocalLifeApi.businessUserInfos,
    });
    console.log('商家信息==', e);
    if (fa.code.isSuccess(e.code)) {
      let data = e.obj;
      //修改商铺申请状态
      let tempItems = storeUserDatas;
      if (data.status == 200&&tempItems.length==3) {
        //审核通过
        tempItems.splice(2, 0, setting);  //删除索引为2的一个元素
      }
      //商铺管理
      tempItems[tempItems.length - 1].status = data.status

      this.setState({
        baseInfos: data,
        items: tempItems,
        businessStatus: data.status,

        //0:无店铺信息、100:待审核、200:审核通过、300:审核未通过
      });
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };


  renderVpic() {
    if (this.state.baseInfos.roleId === 0) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V0.png')}
        />
      )
    } else if (this.state.baseInfos.roleId === 1) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V1.png')}
        />
      )
    } else if (this.state.baseInfos.roleId === 2) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V2.png')}
        />
      )
    } else if (this.state.baseInfos.roleId === 3) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V3.png')}
        />
      )
    } else if (this.state.baseInfos.roleId === 4) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V4.png')}
        />
      )
    } else {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V5.png')}
        />
      )
    }
  }
  renderHeader() {
    const { width: bgWidth, height: bgHeight } = Image.resolveAssetSource(
      require("../../../../images/mine/wd-bg.png")
    );
    const { baseInfos } = this.state;
    let bgColors = storeBgColors;
    let userDes = '我的资产';
    return (
      <View>
        <View style={{ flex: 1, width: windowWidth }}>
          <LinearGradient
            locations={[0.1, 0.9]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={bgColors}
            style={styles.header}
          >
            <View
              style={{
                width: "100%",
                shadowColor: "#000",
                shadowOffset: { width: -2, height: -4 },
                shadowOpacity: 0.2
              }}
            >
              <ImageBackground
                resizeMode="cover"
                source={require("../../../../images/local/bdsh-wd-bg.png")}
                style={[
                  styles.card,
                  {
                    height: 123,
                    width: "100%"
                  }
                ]}
              >
                <View style={styles.card_main}>
                  <View style={styles.card_container}>
                    {this.renderVpic()}
                    <View style={styles.card_userInfo}>
                      <Avatar
                        avatar={baseInfos.headPic}
                        size={45}
                        otherStyle={{ borderWidth: 1, borderColor: "#fff" }}
                      />
                      <View style={styles.level}>
                        <Text style={{ color: "#7b3b00", fontSize: 9, textAlign: "center" }}>{baseInfos.userLevel}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[{ marginTop: 12, fontSize: 14, textAlign: 'center', marginLeft: 25 }]}>{baseInfos.nickName}</Text>
                </View>
                <TouchableOpacity
                  style={styles.switch}
                  onPress={() => { this._onUserSwitch() }}>
                  <Icon name={'-weibiaoti--'} size={8} color={'#A95912'} />
                  <Text style={{ color: "#A95912", fontSize: 9, }}> 个人账号</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => { this._jumpToMyBelongings() }}
            activeOpacity={1.0}
            style={styles.charge_container}>
            <View style={styles.charge_inner}>
              <View></View>
              <View style={styles.charge_info}>
                <View style={styles.charge_info_container}>
                  <Text style={[PublicStyles.titleStyle, { fontSize: 24 }]}>
                    <Text style={[PublicStyles.titleStyle, { fontSize: 15 }]}>¥</Text>
                    {baseInfos.userBalanceAmount * 0.01.toFixed(2)}
                  </Text>
                  {this._renderBellInfo()}
                </View>
                <Text style={[PublicStyles.titleStyle, { fontSize: 12, marginTop: 8 }]}>{userDes}</Text>
              </View>
              <Icon name={'-arrow-right'} size={10} color={"#7F7F7F"} />
            </View>
          </TouchableOpacity>
        </View>
        <LineSpace style={{ height: 10, backgroundColor: '#EEEEEC' }} />
      </View>);
  }

  //商家角色切换
  _onUserSwitch = () => {
    this.props.navigation.pop();
  }

  //渲染个人用户的集速豆
  _renderBellInfo = () => {
    const { baseInfos } = this.state;
    let bellImg = require("../../../../images/local/lqjsd.png");
    return (
      <View style={styles.bell_container}>
        <Image
          style={{ width: 21, height: 16, }}
          source={bellImg}
        />
        <Text style={[PublicStyles.titleStyle, { fontSize: 15 }]}>{baseInfos.userDouAmount}豆</Text>
      </View>
    );
  }

  _tempPush = (item, index) => {
    const { baseInfos, businessStatus } = this.state;
    const { navigation } = this.props;
    if (item.key == '00') {
      navigation.navigate('PayCodeShow', { info: baseInfos })
    } else if (item.key == '01') {
      navigation.navigate('StoreOrder', { info: baseInfos })
    } else if (item.key == '02') {
      navigation.navigate('SaleSetting', { id: baseInfos.merchantInfoId })
    } else if (item.key == '03') {
      navigation.navigate('StoreManager', { info: baseInfos, callBack: this._storeManageCallback })
    }
  }

  //店铺管理后的回调
  _storeManageCallback = () => {
    this._requestBusinessUserInfos();
  }

  //列表项
  _renderItem = (item, index) => {
    return (
      <UserItem
        item={item.item}
        onItemClick={() => { this._tempPush(item.item, index) }}
      />
    );
  }

  //列表项
  _jumpToMyBelongings = () => {
    const {baseInfos}=this.state;
    this.props.navigation.navigate('MyBelongings', { userBalanceAmount:baseInfos.userBalanceAmount, 
      userDouAmount: baseInfos.userDouAmount, merchantInfoId: baseInfos.merchantInfoId })
  }

  render() {
    return (
      <View style={[PublicStyles.ViewMax, { backgroundColor: "#ebeae8" }]}>
        <FlatList
          bounces={true}
          scrollEventThrottle={16}
          onScroll={event => { }}
          data={this.state.items}
          ItemSeparatorComponent={() => <LineSpace style={{ height: 0.5 }} />}
          renderItem={this._renderItem}
          ListHeaderComponent={this.renderHeader.bind(this)}
        />
        <NavigationBar
          navRef={c => (this._refHeader = c)}
          style={{
            backgroundColor: "rgba(251, 87, 69, 0)",
            borderBottomWidth: 0
          }}
          title={'商家后台'}
          titleStyle={{ color: "#fff", fontSize: 18, }}
          statusBarStyle={"light-content"}
          leftView={
            <NavigationBar.BackButton
              tintColor='#fff'
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
  header: {
    paddingTop: NavigationBar.Theme.contentHeight,
    paddingHorizontal: 15,
    alignItems: "center"
  },
  card: {
    height: 197,
    width: "100%",
    overflow: "hidden"
  },
  card_container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  card_main: {
    marginTop: 22,
    alignItems: "center"
  },
  card_userInfo: {
    alignItems: "center",
  },
  level: {
    width: 100,
    height: 12,
    justifyContent: 'center',
    backgroundColor: "#e0ae80",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },
  charge_container: {
    height: 94,
    backgroundColor: '#fff',
    width: windowWidth,
    padding: 15,
  },
  charge_inner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  charge_info: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  charge_info_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bell_container: {
    flexDirection: 'row',
    marginLeft: 13,
    alignItems: 'center'
  },
  switch: {
    width: 62,
    height: 15,
    right: 0,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#E0AE80",
    justifyContent: 'center',
    alignItems: 'center',
    top: 29,
    borderTopLeftRadius: 7.5,
    borderBottomLeftRadius: 7.5
  },
  level: {
    width: 100,
    height: 12,
    justifyContent: 'center',
    backgroundColor: "#e0ae80",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },
});
