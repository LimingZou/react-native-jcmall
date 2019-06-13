import React from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import StackViewStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";

import Index from "../pages/index";
import PhotoGallery from "../utils/photoGallery";
import FullScreenVideo from "../utils/fullScreenVideo";
import Ad from "../pages/ad";
//
import CreateActivity from "../pages/discovery/activity/create";
import ActivityDetail from "../pages/discovery/activity/detail";
import recDetail from "../pages/discovery/information/detail";

//
import SpecialOffer from "../pages/home/specialOffer"; // 新人特惠
import NewsPage from "../pages/home/news"; // 消息通知
import LimitedTimeBuy from "../pages/home/limitedTimeBuy"; // 限时抢购
import Category from "../pages/home/category";
import ProductDetailPage from "../pages/home/goods/ProductDetailPage";
import Comment from "../pages/home/comment";

//
import RefundDetail from "../pages/user/refund/detail";
import RefundList from "../pages/user/refund/index";
import RefundLogisticsFill from "../pages/user/refund/logisticsFill";
import RefundServiceApply from "../pages/user/refund/serviceApply";
import RefundServiceType from "../pages/user/refund/serviceType";

import OrderList from "../pages/user/order";
import OrderDetail from "../pages/user/order/detail";

//
import UserLogin from "../pages/user/login";
import CommentPage from "../pages/home/comment/CommentPage";
import CommentResultPage from "../pages/home/comment/CommentResultPage";
import Collection from "../pages/user/collection";

import Qr from '../pages/home/qr';//扫描二维码
import JiSuBean from "../pages/user/jisubean"; // 极速豆首页
import JusuBeanIntroduce from "../pages/user/jisubean/Introduce"; //极速豆介绍
import JisuBeanDetail from "../pages/user/jisubean/Detail"; //极速豆明细
import JisuBeanRollOut from "../pages/user/jisubean/RollOut"; //极速豆
import GetJisuBean from "../pages/user/jisubean/GetjisuBean"; //获取集速豆
//优惠券
import Coupon from "../pages/user/coupon/index"; //优惠券首页
import Balance from "../pages/user/balance/index"; //余额首页
import Logistics from "../pages/user/order/logistics"; //查看物流
//余额
import IntegralDetail from "../pages/user/balance/IntegralDetail"; //积分明细
import BalanceDetail from "../pages/user/balance/BalanceDetail"; //余额明细
import NoToBalanceDetail from "../pages/user/balance/NoToBalanceDetail";//未到账余额明细

import Withdraw from "../pages/user/balance/Withdraw"; //余额提现
import BankCardManage from "../pages/user/balance/BankcardManage"; //银行卡管理
import AddBankCard from "../pages/user/balance/AddBankCard"; //添加银行卡
import IntegraRollOut from "../pages/user/balance/IntegralRollOut"; //积分转出
import NextIntegraRollOut from "../pages/user/balance/NextIntergralRollOut"; //下一步转积分
import MyBonus from "../pages/user/balance/MyBonus"; //我的奖金
import SetUpPage from "../pages/user/setUp";
import AbountUs from "../pages/user/setUp/AbountUs";
import PersonInformation from "../pages/user/setUp/PersonInformation";
import ChangeLoginPwd from "../pages/user/setUp/ChangeLoginPwd";
import PayPwd from "../pages/user/setUp/PayPwd";
import NOPayPwd from "../pages/user/setUp/NOPayPwd";
import AlreadyPayPwd from "../pages/user/setUp/AlreadyPayPwd";
import ChangePayPwd from "../pages/user/setUp/ChangePayPwd";
//奖金明细

import NewsTotalPage from "../pages/home/news/NewsTotalPage"; //奖金明细

import BonusDetail from "../pages/user/balance/BonusDetail"; //奖金明细
import SearchPage from "../pages/home/search/SearchPage"; //搜索页面

import CategoryDetail from "../pages/home/category/CategoryDetail"; //分类详情
import SureOrder from "../pages/user/order/sureorder"; //确认订单
import ManageAddress from "../pages/user/order/ManageAddress"; //收货地址管理
import EditAddress from "../pages/user/order/EditAddress"; //编辑收货地址页面
import AddAddress from '../pages/user/order/AddAddress';//添加收货地址

import EverySignin from "../pages/home/signin/EverySignin"; //签到首页
import SignInDetail from "../pages/home/signin/SignInDetail"; //签到详情

import Qrresult from '../pages/home/qrresult';//扫描结果
import MainCreate from "../pages/home/goods/MainCreate"; //主创区
import MyCollect from "../pages/user/others/MyCollect"; //我的收藏
import MyArticle from "../pages/user/others/MyArticle"; //我的文章
import MyPresent from "../pages/user/others/present/MyPresent"; //我的礼品
import PresentDetail from "../pages/user/others/present/PresentDetail"; //礼品详情
import Exchange from "../pages/user/others/present/Exchange"; //礼品兑换
import EvaluateOfMine from "../pages/user/setUp/EvaluateOfMine"; //我的评价
import EvaluateSuccess from "../pages/user/setUp/EvaluateSuccess";//评价成功

import PaySuccess from '../pages/user/order/paySuccess';//支付成功
import payFail from '../pages/user/order/payFail';//支付失败
import WithdrawList from "../pages/user/balance/WithdrawList";//提现记录
import WithdrawResult  from "../pages/user/balance/WithdrawResult";//提现受理

import InviteFriend from "../pages/user/others/invite/InviteFriend"; //邀请好友
import InviteList from "../pages/user/others/invite/InviteList"; //好友列表
import FriendDetail from "../pages/user/others/invite/FriendDetail"; //好友详情

import GetCoupon from "../pages/user/others/OtherCoupon"; //优惠券
import MyActivity from "../pages/user/others/MyActivity"; //我的活动
import IdentityVerify from "../pages/user/others/IdentityVerify"; //身份验证
import AddVerify from "../pages/user/others/AddVerify"; //新增实名认证

import HelpCenter from "../pages/user/others/help/HelpCenter"; //帮助中心
import QuestionList from "../pages/user/others/help/QuestionList";//问题列表
import AnswerPage from '../pages/user/others/help/AnswerPage';//问题答案页面

import Complain from '../pages/user/others/Complain';//投诉建议

import StorePage from '../pages/local/store/StorePage';//本地生活
import CityList from '../pages/local/store/CityList';//本地城市列表
import BuyerUser from '../pages/local/user/buyer/BuyerUser';//本地我的---买家角色
import BusinessUser from '../pages/local/user/business/BusinessUser';//本地我的---商家角色
import StoreDetail from '../pages/local/store/StoreDetail';//门店详情
import StoreBalance from '../pages/local/store/StoreBalance';//门店结算
import PayCodeShow from '../pages/local/user/business/PayCodeShow';//商家收款
import SaleSetting from '../pages/local/user/business/SaleSetting';//商家---折扣设置
import StoreOrder from '../pages/local/user/business/StoreOrder';//商家---本店订单
import StoreManager from '../pages/local/user/business/StoreManager';//商家---本店订单
import MyConsumeRecord from '../pages/local/user/buyer/MyConsumeRecord';//用户---我的消费记录
import PersonalCommission from '../pages/local/user/buyer/PersonalCommission';//门店--用户---个人佣金
import MyWithdraw from '../pages/local/user/buyer/balance/MyWithdraw';//门店--用户---余额提现
import MyCommission from '../pages/local/user/buyer/balance/MyCommission';//门店--用户---佣金明细
import LocalAddBankCard from '../pages/local/user/buyer/balance/LocalAddBankCard';//门店--用户---佣金明细
import LBankcardManage from '../pages/local/user/buyer/balance/LBankcardManage';//门店--用户---佣金明细
import MyBelongings from '../pages/local/user/business/belongings/MyBelongings';//门店--商户资产
import MyBelongingDetail from '../pages/local/user/business/belongings/MyBelongingDetail';//门店--商户资产明细
import BusinessBankManage from '../pages/local/user/business/belongings/BusinessBankManage';//门店--商户---银行卡管理
import BusinessAddBank from '../pages/local/user/business/belongings/BusinessAddBank';//门店--商户---添加银行卡
import BusinessWithdraw from '../pages/local/user/business/belongings/BusinessWithdraw';//门店--商户---余额提现
import PopularizeSellerOfMine from '../pages/local/user/buyer/PopularizeSellerOfMine';//门店--用户--我推广的商家
import AttentionSellerOfMine from '../pages/local/user/buyer/AttentionSellerOfMine';//门店--用户--我关注的商家
import BecomeSellerMessage from '../pages/local/user/buyer/sellerCertify/BecomeSellerMessage';//门店--用户--成为商家认证信息
import AreaList from '../pages/local/store/AreaList';//门店--用户--成为商家认证信息
import MapWebView from '../pages/local/store/MapWebView';//门店--商铺管理---地图标注
import LocalPaySuccess from '../pages/local/user/business/LocalPaySuccess';//门店--商铺管理---结算成功
import LocalPayStatus from '../pages/local/user/business/LocalPayStatus';//门店--提现受理



import CategorySearchDetail from '../pages/home/category/CategorySearchDetail';
import ProductDetailTwoPage from "../pages/home/goods/ProductDetailTwoPage"
import SellerCertifyType from "../pages/local/user/buyer/sellerCertify/SellerCertifyType";
import BusinessAuth from "../pages/local/user/buyer/sellerCertify/BusinessAuth";
import BusinessRang from "../pages/local/user/buyer/sellerCertify/BusinessRang";
import PersonalBuinessAuth from "../pages/local/user/buyer/sellerCertify/PersonalBuinessAuth";
import BankList from "../pages/local/user/buyer/sellerCertify/BankList";
import BecomeSellerAlreadyMessage from "../pages/local/user/buyer/sellerCertify/BecomeSellerAlreadyMessage";
import OpenAccount from "../pages/local/user/buyer/OpenAccount";
import OpenAccountAlreadyMes from "../pages/local/user/buyer/OpenAccountAlreadyMes";
import OpenAccountWebView from "../pages/local/user/buyer/OpenAccountWebView";
import MyWithdrawBankList from "../pages/local/user/buyer/balance/MyWithdrawBankList";
import MyWithdrawRecord from "../pages/local/user/buyer/balance/MyWithdrawRecord";

//第二个详情

const modalStyleStackNames = ["UserLogin", "FullScreenVideo", "SearchPage"];

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const indexNavigationOptions = ({ navigation, screenProps }) => ({
  Home: {
    title: screenProps.homeTitle,
    header: null
  },
  Discovery: {
    title: "发现",
    header: null
  },
  Cart: {
    title: "购物车",
    header: null
  },
  User: {
    title: "我的",
    header: null
  }
});

const AppStack = createStackNavigator(
  {
    Index: {
      screen: Index,
      navigationOptions: ({ navigation, screenProps }) => {
        return indexNavigationOptions({ navigation, screenProps })[
          getCurrentRouteName(navigation.state)
        ];
      }
    },
    // 点击查看大图
    PhotoGallery: {
      screen: PhotoGallery,
      navigationOptions: {
        header: null
      }
    },
    FullScreenVideo: {
      screen: FullScreenVideo
    },
    SpecialOffer: {
      screen: SpecialOffer
    },
    NewsPage: {
      screen: NewsPage
    },
    LimitedTimeBuy: {
      screen: LimitedTimeBuy
    },
    Category: {
      screen: Category,
      path: 'category',
      navigationOptions: {
        title: "分类",
        header: null
      }
    },
    CreateActivity: {
      screen: CreateActivity,
      navigationOptions: {
        title: "创建活动",
        header: null
      }
    },
    ActivityDetail: {
      screen: ActivityDetail,
      navigationOptions: {
        title: "活动详情",
        header: null
      }
    },
    recDetail: {
      screen: recDetail,
      navigationOptions: {
        title: "动态详情",
        header: null
      }
    },
    ProductDetailPage: {
      screen: ProductDetailPage
    },
    Comment: {
      screen: Comment
    },

    CommentPage: {
      screen: CommentPage
    },
    CommentResultPage: {
      screen: CommentResultPage
    },
    UserLogin: {
      screen: UserLogin,
      navigationOptions: {
        title: "登录",
        header: null
      }
    },
    // order
    OrderList: {
      screen: OrderList,
      navigationOptions: {
        title: "我的订单",
        header: null
      }
    },
    OrderDetail: {
      screen: OrderDetail,
      navigationOptions: {
        title: "订单详情",
        header: null
      }
    },
    // other
    Collection: {
      screen: Collection,
      navigationOptions: {
        header: null
      }
    },
    JiSuBean: {
      screen: JiSuBean
    },
    JusuBeanIntroduce: {
      screen: JusuBeanIntroduce
    },
    JisuBeanDetail: {
      screen: JisuBeanDetail
    },
    JisuBeanRollOut: {
      screen: JisuBeanRollOut
    },
    GetJisuBean: {
      screen: GetJisuBean
    },
    Coupon: {
      screen: Coupon
    },
    Balance: {
      screen: Balance
    },
    Logistics: {
      screen: Logistics
    },
    IntegralDetail: {
      screen: IntegralDetail
    },
    BalanceDetail: {
      screen: BalanceDetail
    },
    NoToBalanceDetail: {
      screen: NoToBalanceDetail
    },
    Withdraw: {
      screen: Withdraw
    },
    BankCardManage: {
      screen: BankCardManage
    },
    AddBankCard: {
      screen: AddBankCard
    },
    IntegraRollOut: {
      screen: IntegraRollOut
    },
    MyBonus: {
      screen: MyBonus
    },
    NextIntegraRollOut: {
      screen: NextIntegraRollOut
    },
    BonusDetail: {
      screen: BonusDetail
    },
    SetUpPage: {
      screen: SetUpPage
    },
    AbountUs: {
      screen: AbountUs
    },
    PersonInformation: {
      screen: PersonInformation
    },
    ChangeLoginPwd: {
      screen: ChangeLoginPwd
    },
    PayPwd: {
      screen: PayPwd
    },
    NOPayPwd: {
      screen: NOPayPwd
    },
    AlreadyPayPwd: {
      screen: AlreadyPayPwd
    },
    ChangePayPwd: {
      screen: ChangePayPwd
    },
    EvaluateSuccess: {
      screen: EvaluateSuccess
    },
    EvaluateOfMine: {
      screen: EvaluateOfMine
    },
    CategoryDetail: {
      screen: CategoryDetail,
    },
    // refund
    RefundList: {
      screen: RefundList,
      navigationOptions: {
        title: "退款/售后",
        header: null
      }
    },
    RefundDetail: {
      screen: RefundDetail,
      navigationOptions: {
        title: "退款详情",
        header: null
      }
    },
    RefundLogisticsFill: {
      screen: RefundLogisticsFill,
      navigationOptions: {
        title: "填写退款物流信息",
        header: null
      }
    },
    RefundServiceApply: {
      screen: RefundServiceApply,
      navigationOptions: {
        title: "退款申请",
        header: null
      }
    },
    RefundServiceType: {
      screen: RefundServiceType,
      navigationOptions: {
        title: "选择售后服务",
        header: null
      }
    },
    NewsTotalPage: {
      screen: NewsTotalPage,
      navigationOptions: {
        header: null
      }
    },
    SearchPage: {
      screen: SearchPage
    },
    SureOrder: {
      screen: SureOrder
    },
    ManageAddress: {
      screen: ManageAddress
    },
    EditAddress: {
      screen: EditAddress
    },
    EverySignin: {
      screen: EverySignin
    },
    SignInDetail: {
      screen: SignInDetail
    },
    MainCreate: {
      screen: MainCreate
    },
    MyCollect: {
      screen: MyCollect
    },
    MyArticle: {
      screen: MyArticle
    },
    MyPresent: {
      screen: MyPresent
    },
    PresentDetail: {
      screen: PresentDetail
    },
    Exchange: {
      screen: Exchange
    },
    InviteFriend: {
      screen: InviteFriend
    },
    InviteList: {
      screen: InviteList
    },
    FriendDetail: {
      screen: FriendDetail
    },
    GetCoupon: {
      screen: GetCoupon
    },
    MyActivity: {
      screen: MyActivity
    },
    IdentityVerify: {
      screen: IdentityVerify
    },
    AddVerify: {
      screen: AddVerify
    },
    HelpCenter: {
      screen: HelpCenter
    },
    QuestionList: {
      screen: QuestionList
    },
    AnswerPage: {
      screen: AnswerPage
    },
    Complain: {
      screen: Complain,
    },
    Store: {
      screen: StorePage,
      navigationOptions: {
        header: null
      }
    },
    CityList: {
      screen: CityList,
      navigationOptions: {
        header: null
      }
    },
    BuyerUser: {
      screen: BuyerUser,
      navigationOptions: {
        header: null
      }
    },
    StoreDetail: {
      screen: StoreDetail,
    },
    StoreBalance: {
      screen: StoreBalance,
    },
    PayCodeShow: {
      screen: PayCodeShow,
    },
    SaleSetting: {
      screen: SaleSetting,
    },
    MyConsumeRecord: {
      screen: MyConsumeRecord,
    },
    StoreOrder: {
      screen: StoreOrder,
    },
    StoreManager: {
      screen: StoreManager,
    },
    BusinessUser: {
      screen: BusinessUser,
      navigationOptions: {
        header: null
      }
    },
    PersonalCommission: {
      screen: PersonalCommission,
    },
    MyWithdraw: {
      screen: MyWithdraw,
    },
    MyWithdrawRecord: {
      screen: MyWithdrawRecord,
    },
    MyCommission: {
      screen: MyCommission,
    },
    LocalAddBankCard: {
      screen: LocalAddBankCard,
    },
    LBankcardManage: {
      screen: LBankcardManage,
    },
    MyBelongings: {
      screen: MyBelongings,
    },
    MyBelongingDetail: {
      screen: MyBelongingDetail,
    },
    BusinessBankManage: {
      screen: BusinessBankManage,
    },
    BusinessAddBank: {
      screen: BusinessAddBank,
    },
    BusinessWithdraw: {
      screen: BusinessWithdraw,
    },
    PopularizeSellerOfMine: {
      screen: PopularizeSellerOfMine,
    },
    AttentionSellerOfMine: {
      screen: AttentionSellerOfMine,
    },
    BecomeSellerMessage: {
      screen: BecomeSellerMessage,
    },
    BecomeSellerAlreadyMessage: {
      screen: BecomeSellerAlreadyMessage,
    },
    OpenAccount: {
      screen: OpenAccount,
    },
    OpenAccountAlreadyMes: {
      screen: OpenAccountAlreadyMes,
    },

    OpenAccountWebView: {
      screen: OpenAccountWebView,
    },
    AddAddress: {
      screen: AddAddress
    },
    ProductDetailTwoPage: {
      screen: ProductDetailTwoPage
    },
    CategorySearchDetail: {
      screen: CategorySearchDetail
    },
    AreaList: {
      screen: AreaList
    },
    SellerCertifyType: {
      screen: SellerCertifyType
    },
    Qr: {
      screen: Qr,
      header: null
    },
    Qrresult: {
      screen: Qrresult,
      header: null
    },
    BusinessAuth: {
      screen: BusinessAuth
    },
    BusinessRang: {
      screen: BusinessRang
    },
    PersonalBuinessAuth: {
      screen: PersonalBuinessAuth
    },
    BankList: {
      screen: BankList
    },
    MyWithdrawBankList: {
      screen: MyWithdrawBankList
    },
    PaySuccess: {
      screen: PaySuccess
    },
    payFail: {
      screen: payFail
    },
    MapWebView: {
      screen: MapWebView
    },
    LocalPaySuccess: {
      screen: LocalPaySuccess
    },
    WithdrawList: {
      screen: WithdrawList
    },
    WithdrawResult:{
      screen: WithdrawResult
    },
    LocalPayStatus: {
      screen: LocalPayStatus
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      gesturesEnabled: true,
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 0, //去掉安卓阴影
        borderBottomWidth: 0.5,
        borderBottomColor: "#dcdcdc"
      },
      headerTintColor: "#000"
    }),
    headerTransitionPreset: "uikit",
    mode: "card",
    transitionConfig: e => ({
      screenInterpolator: sceneProps => {
        const { scene } = sceneProps;
        const { route } = scene;
        if (modalStyleStackNames.includes(route.routeName)) {
          return StackViewStyleInterpolator.forVertical(sceneProps);
        }
        return StackViewStyleInterpolator.forHorizontal(sceneProps);
      }
    })
  }
);

const AdStack = createStackNavigator({
  Ad: {
    screen: Ad,
    navigationOptions: {
      header: null
    }
  }
});

export default createSwitchNavigator(
  {
    Ad: AdStack,
    App: AppStack
  },
  {
    initialRouteName: "App"
  }
);
