import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import { PublicStyles } from "../../utils/style";
import { connect } from "react-redux";
import Badge from "@react-native-component/react-native-smart-badge";
import LinearGradient from "react-native-linear-gradient";
import NavigationBar from "../../components/@jcmall/navbar";
import Icon from "../../config/iconFont";
import ListRow from '../../components/@jcmall/listRow';
import IdCard from '../../components/user/idCard';
import { getOrderStateNum } from "../../redux/actions/user";

@connect(({ app: { user: { login, userInfo, orderNum }, location: { address } } }) => ({
  login,
  userInfo,
  orderNum,
  address
}))
export default class User extends Component {


  componentWillMount() {
    this.props.navigation.addListener("willFocus", async () => {
      this.props.dispatch(getOrderStateNum());
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      ["login", "userInfo", "orderNum"]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  _onScroll = (event, bannerHeight) => {
    let scrollY = event.nativeEvent.contentOffset.y;
    let currentOpacity;

    if (scrollY < bannerHeight) {
      currentOpacity = scrollY * (1 / bannerHeight);
    } else {
      currentOpacity = 1;
    }
    this._refHeader.setNativeProps({
      backgroundColor: `rgba(251, 87, 69, ${currentOpacity})`
    });
  };

  renderHeader() {
    const assetsList = [
      {
        img: require("../../images/mine/wdjsd.png"),
        title: "集速豆",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_new"
        }
      },
      {
        img: require("../../images/mine/wdyhq.png"),
        title: "优惠券",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_pay"
        }
      },
      {
        img: require("../../images/mine/wdye.png"),
        title: "余额",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_success"
        }
      }
    ];
    const { login, userInfo } = this.props;
    return (
      <View>
        <LinearGradient
          locations={[0.0, 1]}
          colors={["#fb7a28", "#f8633a", "#db2b41"]}
          style={[styles.header]}>
          <IdCard
            avatarPress={() => {
              if (login) {
                this.props.navigation.navigate("PersonInformation")
              } else {
                this.props.navigation.navigate("UserLogin")
              }
            }}
          />
        </LinearGradient>
        <View style={styles.midList}>
          {
            assetsList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.midItem, { borderRightWidth: index === assetsList.length - 1 ? 0 : 0.5, borderColor: "#d9d9d9" }]}
                activeOpacity={0.5}
                onPress={() => { this.tempPush(index) }}>
                {item.num ? (
                  <Badge
                    textStyle={{
                      color: "#fff",
                      fontSize: 10,
                      paddingHorizontal: 2
                    }}
                    style={{ position: "absolute", right: 10, top: -10 }}
                  >
                    {item.num}
                  </Badge>
                ) : null}
                <Image style={styles.botImg} source={item.img} />
                <Text style={{ fontSize: 10, color: "#333", marginTop: 5 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }

  tempPush(index) {
    const { login } = this.props
    if (login) {
      if (index == 0) {
        this.props.navigation.navigate('JiSuBean', {})
      }
      if (index == 1) {
        this.props.navigation.navigate('Coupon', {})
      }
      if (index == 2) {
        this.props.navigation.navigate('Balance', {})
      }
    } else {
      this.props.navigation.navigate('UserLogin', {})
    }
  }

  overrideRenderOrderItem() {
    const { navigation, login, orderNum } = this.props;
    const orderList = [
      {
        img: "-daifukuan",
        title: "待付款",
        num: orderNum.state_new,
        path: "OrderList",
        params: {
          state_type: "state_new"
        }
      },
      {
        img: "-daifahuo",
        title: "待发货",
        num: orderNum.state_pay,
        path: "OrderList",
        params: {
          state_type: "state_pay"
        }
      },
      {
        img: "-daishouhuo",
        title: "待收货",
        num: orderNum.state_send,
        path: "OrderList",
        params: {
          state_type: "state_send"
        }
      },
      {
        img: "-daipingjia",
        title: "待评价",
        num: orderNum.state_unevaluate,
        path: "OrderList",
        params: {
          state_type: "state_unevaluate"
        }
      },
      {
        img: "-tuikuan",
        title: "退款售后",
        num: orderNum.state_refund,
        path: "RefundList"
      }
    ];
    return (
      <View style={[styles.cell, { marginTop: 10 }]}>
        <ListRow
          style={{ minHeight: 35 }}
          bottomSeparator={"full"}
          title={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LinearGradient
                locations={[0.5, 1.0]}
                colors={["#fcc55b", "#fe6c00"]}
                style={{ width: 3, height: 15, marginRight: 10 }}
              />
              <Text style={{ fontSize: 12, color: "#000" }}>我的订单</Text>
            </View>
          }
          detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
          detail={"查看全部"}
          accessory={"auto"}
          activeOpacity={0.8}
          onPress={() => login ? navigation.navigate("OrderList") : navigation.navigate("UserLogin")}
        />
        <View style={[styles.midList, { paddingTop: 27, paddingBottom: 15 }]}>
          {orderList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.midItem}
              activeOpacity={0.5}
              onPress={() => {
                login ? navigation.navigate(item.path, item.params) : navigation.navigate("UserLogin")
              }}
            >
              {item.num ? (
                <Badge
                  textStyle={{
                    color: "#fff",
                    fontSize: 10,
                    paddingHorizontal: 2
                  }}
                  style={{ position: "absolute", right: 10, top: -10 }}
                >
                  {item.num}
                </Badge>
              ) : null}
              <Icon name={item.img} size={20} color={"#333"} />
              <Text style={{ fontSize: 10, color: "#333", marginTop: 10 }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  overrideRenderFucItem() {
    const { navigation, login } = this.props;
    const fucList = [
      {
        img: require("../../images/mine/wdspsc.png"),
        title: "商品收藏",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_new"
        }
      },
      {
        img: require("../../images/mine/wdwzgl.png"),
        title: "文章管理",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_pay"
        }
      },
      {
        img: require("../../images/mine/wdlp.png"),
        title: "我的礼品",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_success"
        }
      },
      {
        img: require("../../images/mine/wdshdz.png"),
        title: "收货地址",
        num: 0,
        path: "EvaluateList"
      },
      {
        img: require("../../images/mine/wdhyyq.png"),
        title: "邀请好友",
        num: 0,
        path: "RefundList"
      },
      {
        img: require("../../images/mine/wdlqzx.png"),
        title: "领券中心",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_new"
        }
      },
      {
        img: require("../../images/mine/wdhd.png"),
        title: "我的活动",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_pay"
        }
      },
      {
        img: require("../../images/mine/wdsfrz.png"),
        title: "身份认证",
        num: 0,
        path: "OrderList",
        params: {
          state_type: "state_success"
        }
      },
      {
        img: require("../../images/mine/wdbzzx.png"),
        title: "帮助中心",
        num: 0,
        path: "HelpCenter"
      },
      {
        img: require("../../images/mine/wdtsjy.png"),
        title: "投诉建议",
        num: 0,
        path: "RefundList"
      },
      {
        img: require("../../images/mine/wdpj.png"),
        title: "我的评价",
        num: 0,
        path: "EvaluateList"
      },
      {},
      {},
      {},
      {}
    ];
    return (
      <View style={[styles.cell, { paddingVertical: 12 }]}>
        {_.chunk(fucList, 5).map((item, index) => (
          <View key={index} style={[styles.midList, { paddingVertical: 8 }]}>
            {item.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.midItem}
                activeOpacity={0.5}
                onPress={() => {
                  if (item.title == "帮助中心") {
                    return navigation.navigate("HelpCenter");
                  }
                  if (item.title == "投诉建议") {
                    return navigation.navigate("Complain");
                  }
                  if (login) {
                    if (item.title == "商品收藏") {
                      return navigation.navigate("MyCollect");
                    }
                    if (item.title == "文章管理") {
                      return navigation.navigate("MyArticle");
                    }
                    if (item.title == "我的礼品") {
                      //我的礼品 暂时搞成每日签到
                      // this.props.navigation.navigate("MyPresent");
                      return navigation.navigate("EverySignin");
                    }
                    if (item.title == "收货地址") {
                      return navigation.navigate("ManageAddress");
                    }
                    if (item.title == "邀请好友") {
                      return navigation.navigate("InviteFriend");
                    }
                    if (item.title == "领券中心") {
                      return navigation.navigate("GetCoupon");
                    }
                    if (item.title == "我的活动") {
                      return navigation.navigate("MyActivity");
                    }
                    if (item.title == "身份认证") {
                      return navigation.navigate("IdentityVerify");
                    }
                    if (item.title == "我的评价") {
                      return navigation.navigate("EvaluateOfMine");
                    }
                  } else {
                    navigation.navigate("UserLogin")
                  }

                }}
              >
                {item.num ? (
                  <Badge
                    textStyle={{
                      color: "#fff",
                      fontSize: 10,
                      paddingHorizontal: 2
                    }}
                    style={{ position: "absolute", right: 10, top: -10 }}
                  >
                    {item.num}
                  </Badge>
                ) : null}
                <Image style={styles.botImg} source={item.img} />
                <Text style={{ fontSize: 10, color: "#333", marginTop: 10 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { navigation, login } = this.props;
    return (
      <View style={[PublicStyles.ViewMax, { backgroundColor: "#ebeae8" }]}>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          bounces={true}
          scrollEventThrottle={16}
          onScroll={event => {
            this._onScroll(event, NavigationBar.Theme.contentHeight);
          }}
          data={[
            { key: this.overrideRenderOrderItem },
            { key: this.overrideRenderFucItem }
          ]}
          renderItem={({ item }) => item.key.bind(this)()}
          ListHeaderComponent={this.renderHeader.bind(this)}
        />
        <NavigationBar
          navRef={c => (this._refHeader = c)}
          leftView={
            <TouchableOpacity
              onPress={() => {
                this.jumpToLocal()
              }}
            >
              <Icon name={"-scan"} size={20} color={"#fff"} />
            </TouchableOpacity>

          }
          style={{
            backgroundColor: "rgba(251, 87, 69, 0)",
            borderBottomWidth: 0
          }}
          title={""}
          rightView={
            <TouchableOpacity
              onPress={() => {
                if (login) {
                  navigation.navigate("SetUpPage");
                } else {
                  navigation.navigate('UserLogin', {})
                }
              }}
            >
              <Icon name={"-setting"} size={20} color={"#fff"} />
            </TouchableOpacity>
          }
          titleStyle={{ color: "black" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }

  /**
   * 跳转到本地生活
   */
  jumpToLocal = () => {
    const { navigation, login, address, dispatch } = this.props;
    if (login) {
      //定位失败时，重新定位
      if (address.location.lng == 0&&address.location.lat == 0) {
        dispatch(initLocation());//获取定位信息
      } else {
        navigation.navigate("Store");
      }
    } else {
      navigation.navigate('UserLogin', {})
    }
  }
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 15,
    paddingTop: NavigationBar.Theme.contentHeight,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  midList: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff"
  },
  midItem: {
    flex: 1,
    alignItems: "center"
  },
  botImg: {
    width: 20,
    height: 20
  },
  cell: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden"
  }
});
