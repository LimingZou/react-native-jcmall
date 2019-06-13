import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity, TouchableHighlight, Picker, Modal
} from "react-native";

import { updateUserInfo } from "../../../../redux/actions/user";
import { PublicStyles, windowWidth, windowHeight } from "../../../../utils/style";
import Avatar from "../../../../components/public/avatar";
import { connect } from "react-redux";
import Badge from "@react-native-component/react-native-smart-badge";
import LinearGradient from "react-native-linear-gradient";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import UserItem from '../../../../components/local/user/UserItem';
import Button from '../../../../components/local/common/Button';
import LineSpace from "../../../../components/local/common/LineSpace";
import Overlay from "../../../../components/@jcmall/overlay";
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";
import fa from "../../../../utils/fa";
import { Toast } from "../../../../utils/function";
import Popover from '../../../../components/@jcmall/popover';

const isEmptyObject = (obj) => {
  for (let id in obj) {
    return false;
  }
  return true;
}
//个人背景色
const userBgColors = ["#FDA83E", "#FE6C00"];

@connect(({ app: { user: { login, userInfo, orderNum } } }) => ({
  login,
  userInfo,
  orderNum
}))




export default class BuyerUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickName: '碎碎的芋头',
      headPicUrl: '',
      userLevel: '普通会员',
      roleId: '',
      totalCommissionAmt: '',//佣金总额
      totalBalanceAmt: '9990000',//可用余额
      isMerchant: false,
      userDatas: [
        { key: 0, name: '消费记录', icon: '-arrow-right', path: '', status: '' },
        { key: 1, name: '分享赚钱', icon: '-arrow-right', path: '', status: '' },
        { key: 2, name: '我推广的商家', icon: '-arrow-right', path: '', status: '' },
        { key: 3, name: '成为商家', icon: '-arrow-right', path: '', status: '' },
        { key: 4, name: '我关注的商家', icon: '-arrow-right', path: '', status: '' },
      ],
      registerStatus: 0,//商家认证状态：0:未提交信息、1:审核中、2:审核通过、3:审核未通过
      registerMesType: 0,//10:企业认证、20：个体工商户、30：个人认证
      registerMesData: {},
      subAccountStatus: 0,//开户（虚拟账户）状态 10待审核 20成功 30失败
      modalVisible: false,

    };
  }
  renderVpic() {
    if (this.state.roleId === 0) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V0.png')}
        />
      )
    } else if (this.state.roleId === 1) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V1.png')}
        />
      )
    } else if (this.state.roleId === 2) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V2.png')}
        />
      )
    } else if (this.state.roleId === 3) {
      return (
        <Image
          style={{ width: 25, height: 25, marginRight: -0 }}
          source={require('../../../../images/local/V3.png')}
        />
      )
    } else if (this.state.roleId === 4) {
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
    let bgColors = userBgColors;
    let userDes = '我的佣金';

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
                        avatar={this.state.headPicUrl}
                        size={45}
                        otherStyle={{ borderWidth: 1, borderColor: "#fff" }}
                      />
                      <View style={styles.level}>
                        <Text style={{ color: "#7b3b00", fontSize: 9, textAlign: "center" }}>{this.state.userLevel}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[{ marginTop: 12, fontSize: 14, textAlign: 'center', marginLeft: 25 }]}>{this.state.nickName}</Text>
                </View>
                {
                  this.state.registerStatus === 2 ?
                    <TouchableOpacity
                      style={styles.switch}
                      onPress={() => { this._onUserSwitch() }}>
                      <Icon name={'-weibiaoti--'} size={8} color={'#A95912'} />
                      <Text style={{ color: "#A95912", fontSize: 9, }}> 商家账号</Text>
                    </TouchableOpacity> : null
                }
              </ImageBackground>
            </View>
          </LinearGradient>
          <View style={styles.charge_container}>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => { this._jumpToPersonal() }}
              style={styles.charge_inner}>
              <View></View>
              <View style={styles.charge_info}>
                <View style={styles.charge_info_container}>
                  <Text style={[PublicStyles.titleStyle, { fontSize: 24 }]}>
                    <Text style={[PublicStyles.titleStyle, { fontSize: 15 }]}>¥</Text>
                    {this.state.totalCommissionAmt}
                  </Text>
                  {
                    this.state.subAccountStatus === 20 ? null :
                      <Popover
                        style={{
                          position: 'absolute',
                          width: 70,
                          // height:24,
                          left: 35,
                          bottom: 6,
                          borderRadius: 3,
                          paddingVertical: 2,
                          backgroundColor: '#e3b188',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        arrow='left'
                        colors={["#FFCC00", "#FFCC00"]}
                      >
                        <Text style={{ color: "#7b3b00", fontSize: 9, fontWeight: "500" }}>开户拿佣金</Text>
                      </Popover>
                  }
                </View>
                <Text style={[PublicStyles.titleStyle, { fontSize: 12, marginTop: 8 }]}>{userDes}</Text>
              </View>


              <Icon name={'-arrow-right'} size={10} color='#7F7F7F' />
            </TouchableOpacity>
          </View>
        </View>
        <LineSpace style={{ height: 10, backgroundColor: '#EEEEEC' }} />

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000077",
              paddingHorizontal:(windowWidth-300)/2,
              paddingVertical:(windowHeight-158)/2,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <TouchableOpacity activeOpacity={1} style={{ alignItems: "center", backgroundColor: 'white', height: 160, width: 300, borderRadius: 5 }}>
              <Text style={{ color: '#333333', fontSize: 15, marginTop: 40, textAlign: 'center' }}>
                为保障您的账户资金安全
              </Text>
              <Text style={{ color: '#333333', fontSize: 15, marginTop: 10, marginBottom: 30, textAlign: 'center' }}>
                申请成为商家前，请先去开户哦～
              </Text>
              <View style={{ backgroundColor: '#D9D9D9', width: 300, height: 1 }}></View>
              <View style={{ flexDirection: 'row', width: 300, height: 50 }}>
                <TouchableOpacity style={{ width: 149, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '800' }}>取消</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#D9D9D9', width: 2, height: 30, marginTop: 10 }}></View>
                <TouchableOpacity style={{ width: 149, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.setModalVisible(false);
                    this.props.navigation.navigate('OpenAccount', { id: this.state.id,callback:(()=>{
                        this._requestPersonalInfo()
                      })
                    });
                  }}
                >
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '800' }}>去开户</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //商家角色切换
  _onUserSwitch = () => {
    this.props.navigation.navigate("BusinessUser", {});
  }

  //根据是否开户成功跳转不同页面
  _jumpToPersonal = () => {
    if (this.state.subAccountStatus === 20) {
      //开户成功，进入个人佣金
      this.props.navigation.navigate("PersonalCommission", { totalBalanceAmt: this.state.totalBalanceAmt });
    } else {
      if (this.state.subAccountStatus === 30) {
        //开户失败,进行开户申请
        // this.setModalVisible(true);
        this.props.navigation.navigate('OpenAccount', { id: this.state.id,callback:(()=>{
            this._requestPersonalInfo()
          })
        });
      } else if (this.state.subAccountStatus === 10) {
        //审核中
        // Toast.success('开户审核中...')
        // this.setModalVisible(true);
        this.props.navigation.navigate('OpenAccount', { id: this.state.id,callback:(()=>{
            this._requestPersonalInfo()
          })
        });
      }
    }
  }

  //点击跳转
  _tempPush = (item, index) => {
    const { navigation } = this.props;
    //console.log('item========', item)
    if (item.item.key == 0) {
      //消费记录
      navigation.navigate('MyConsumeRecord', {})
    } else if (item.item.key == 1) {
      //分享赚钱
      navigation.navigate("InviteFriend");
    } else if (item.item.key == 2) {
      //我推广的商家
      navigation.navigate('PopularizeSellerOfMine', {})
    } else if (item.item.key == 3) {
      if (this.state.subAccountStatus === 20) {
        //开户成功，进入申请商家
        //成为商家
        if (this.state.registerStatus === 0) {
          //未提交申请信息
          this._showOverlay();
        } else if (this.state.registerStatus === 1) {
          //跳转到审核中页面，此页面内容只可查看
          // if(this.state.registerMesType===10){
          //   //10:企业认证
          //   navigation.navigate("BusinessAuth",{registerStatus:this.state.registerStatus,registerMesData:this.state.registerMesData,});
          // }else if(this.state.registerMesType===20){
          //   //20：个体工商户
          //   navigation.navigate("PersonalBuinessAuth",{registerStatus:this.state.registerStatus,registerMesData:this.state.registerMesData,});
          // }else {
          //   //30：个人认证
          //   this.props.navigation.navigate("BecomeSellerAlreadyMessage", {registerMesData:this.state.registerMesData});
          // }
          this.props.navigation.navigate("BecomeSellerAlreadyMessage", { registerMesData: this.state.registerMesData });
        } else if (this.state.registerStatus === 3) {
          //跳转到审核不通过页面，此页面内容可查看、可修改
          // if(this.state.registerMesType===10){
          //   navigation.navigate("BusinessAuth",{registerStatus:this.state.registerStatus,registerMesData:this.state.registerMesData,callback:this.registerCallBack});
          //   //10:企业认证
          // }else if(this.state.registerMesType===20){
          //   //20：个体工商户
          //   navigation.navigate("PersonalBuinessAuth",{registerStatus:this.state.registerStatus,registerMesData:this.state.registerMesData,callback:this.registerCallBack});
          // }else {
          //   //30：个人认证
          //   this.props.navigation.navigate("BecomeSellerMessage", {registerMesData:this.state.registerMesData,registerStatus:this.state.registerStatus,callback:this.registerCallBack
          //   });
          // }
          this.props.navigation.navigate("BecomeSellerMessage", {
            registerMesData: this.state.registerMesData, registerStatus: this.state.registerStatus, callback: this.registerCallBack
          });
        } else {
          //
        }
      } else {
        if (this.state.subAccountStatus === 30) {
          //开户失败,进行开户申请
          this.setModalVisible(true);
        } else if (this.state.subAccountStatus === 10) {
          //审核中
          // Toast.success('开户审核中...')
          this.setModalVisible(true);
        }
      }

      // this._showOverlay();

    } else if (item.item.key == 4) {
      //我关注的商家
      navigation.navigate('AttentionSellerOfMine', {})
    }
  }

  registerCallBack = () => {
    this._personfindRegisterInfor()
  }


  //列表项
  _renderItem = (item, index) => {
    return (
      <UserItem
        item={item.item}
        onItemClick={() => { this._tempPush(item, index) }}
      />
    );
  }

  _showOverlay() {
    let key = Overlay.show(
      <Overlay.PullView
        modal={false}
        containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={styles.overlay_container}>
          <View style={{ alignItems: "center", marginBottom: 15, marginTop: 25, }}>
            <Text style={{ fontSize: 15, color: "#333333", textAlign: 'center' }}>请您进行认证</Text>
            <Button style={{ position: 'absolute', padding: 5, right: 10 }} onPress={() => Overlay.hide(key)}>
              <Icon name={"-close"} size={10} color={"#7E7E7F"} />
            </Button>
          </View>
          <View style={{ width: windowWidth - 13 * 2, height: 0.5, backgroundColor: '#D9D9D9', }}></View>

          <View style={styles.card_main}>
            <View style={styles.card_container}>
              {this.renderVpic()}
              <View style={styles.card_userInfo}>
                <Avatar
                  avatar={this.state.headPicUrl}
                  size={45}
                  otherStyle={{ borderWidth: 1, borderColor: "#fff" }}
                />
                <View style={styles.level}>
                  <Text style={{ color: "#7b3b00", fontSize: 9, textAlign: "center" }}>{this.state.userLevel}</Text>
                </View>
              </View>
            </View>
            <Text style={[{ marginTop: 12, fontSize: 14, textAlign: 'center', marginLeft: 25 }]}>{this.state.nickName}</Text>
          </View>
          <Text style={{ color: '#333333', fontSize: 15, marginTop: 50, textAlign: 'center' }}>为了共同保证商家的真实性，请先完成认证</Text>
          <TouchableOpacity style={styles.bottomButton}
            onPress={() => {
              Overlay.hide(key)
              this.props.navigation.navigate("BecomeSellerMessage", { registerMesData: {}, registerStatus: this.state.registerStatus, callback: this.registerCallBack });
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 15 }}>立即认证</Text>
          </TouchableOpacity>
        </View>
      </Overlay.PullView>
    );
  }
  componentDidMount() {
    this._personfindRegisterInfor()
    this._requestPersonalInfo()
  }

  //获取我的主页信息
  _requestPersonalInfo = async () => {
    const params = {
    };
    console.log('获取我的主页信息参数', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.personalInfo,
      params
    });
    console.log('获取我的主页信息结果', e);
    if (fa.code.isSuccess(e.code)) {
      let dic=e.obj
      this.setState({
        nickName: dic.nickName,
        headPicUrl:dic.headPicUrl,
        userLevel:dic.userLevel,
        roleId:dic.roleId,
        id:dic.id,//用户id
        totalCommissionAmt:dic.totalCommissionAmt,//佣金总额
        totalBalanceAmt:dic.totalBalanceAmt,//可用余额
        isMerchant:true,//是否是商家
        subAccountStatus:dic.subAccountStatus,//开户状态
      })
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  //获取申请成为企业状态
  _personfindRegisterInfor = async () => {
    const params = {
    };
    console.log('获取申请成为企业状态参数', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.personfindRegisterInfor,
      params
    });
    console.log('获取申请成为企业状态结果', e);
    if (fa.code.isSuccess(e.code)) {
      if (isEmptyObject(e.obj)) {
        this.setState({
          registerStatus: 0,
        })
      } else {
        if (e.obj.auditStatus === 1) {
          this.setState({
            userDatas: [
              { key: 0, name: '消费记录', icon: '-arrow-right', path: '', status: '' },
              { key: 1, name: '分享赚钱', icon: '-arrow-right', path: '', status: '' },
              { key: 2, name: '我推广的商家', icon: '-arrow-right', path: '', status: '' },
              { key: 3, name: '成为商家', icon: '-arrow-right', path: '', status: 100 },
              { key: 4, name: '我关注的商家', icon: '-arrow-right', path: '', status: '' },
            ],
            /**
             * 
             * 
             * 打开商家入口registerStatus:2,正常是registerStatus:1,
             * 
             * 
             */
            registerStatus: 1,
          })
          this._findRegisterObj()
        } else if (e.obj.auditStatus === 2) {
          this.setState({
            userDatas: [
              { key: 0, name: '消费记录', icon: '-arrow-right', path: '', status: '' },
              { key: 1, name: '分享赚钱', icon: '-arrow-right', path: '', status: '' },
              { key: 2, name: '我推广的商家', icon: '-arrow-right', path: '', status: '' },
              { key: 4, name: '我关注的商家', icon: '-arrow-right', path: '', status: '' },
            ],
            registerStatus: 2,
          })
        } else if (e.obj.auditStatus === 3) {
          this.setState({
            userDatas: [
              { key: 0, name: '消费记录', icon: '-arrow-right', path: '', status: '' },
              { key: 1, name: '分享赚钱', icon: '-arrow-right', path: '', status: '' },
              { key: 2, name: '我推广的商家', icon: '-arrow-right', path: '', status: '' },
              { key: 3, name: '成为商家', icon: '-arrow-right', path: '', status: 300 },
              { key: 4, name: '我关注的商家', icon: '-arrow-right', path: '', status: '' },
            ],
            registerStatus: 3,
          })
          this._findRegisterObj()
        }
      }
    } else {
      Toast.warn(e.message);
    }
  };
  //查询商家申请注册信息
  _findRegisterObj = async () => {
    const params = {
    };
    console.log('查询商家申请注册信息参数', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.findRegisterObj,
      params
    });
    console.log('查询商家申请注册信息结果', e);
    if (fa.code.isSuccess(e.code)) {
      if (isEmptyObject(e.obj)) {
      } else {
        this.setState({
          registerMesType: e.obj.type,
          registerMesData: e.obj.obj,
        })
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  render() {
    const { navigation } = this.props;
    let titleText = '我的';
    return (
      <View style={[PublicStyles.ViewMax, { backgroundColor: "#ebeae8" }]}>
        <FlatList
          bounces={true}
          scrollEventThrottle={16}
          onScroll={event => { }}
          data={this.state.userDatas}
          ItemSeparatorComponent={() => <LineSpace style={{ height: 0.5 }} />}
          renderItem={this._renderItem}
          ListHeaderComponent={this.renderHeader.bind(this)}
        />
        <NavigationBar
          navRef={c => (this._refHeader = c)}
          title={titleText}
          style={{
            backgroundColor: "rgba(251, 87, 69, 0)",
            borderBottomWidth: 0
          }}
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
  overlay_container: {
    height: 356,
    paddingHorizontal: 13,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "white"
  },
  level: {
    width: 100,
    height: 12,
    justifyContent: 'center',
    backgroundColor: "#e0ae80",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
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
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD3E42',
    borderRadius: 5,
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,
    height: 50,
  },

});
