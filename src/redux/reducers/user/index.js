import types from "../../types/index";

const initialState = {
  login: false,
  userInfo: null,
  userToken: null,
  couponNum: 0,
  refreshing: false,
  orderNum: {
    state_new: 0,
    state_pay: 0,
    state_send: 0,
    state_unevaluate: 0,
    state_refund: 0
  },
  cartNum: 0,
  cardList: [],
  unreadMessageNumber: {
    state_support: false,
    state_system: false,
    state_offer: false,
    state_all: false
  },
  myDemandHallDetail: {},
  myDemandDetailFetchstatus: {},
  pointsSigninfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.user.USER_TOKEN_CHANGE:
      return Object.assign({}, state, {
        userToken: action.userToken,
        login: action.login
      });
    case types.user.USER_STATUS_CHANGE:
      return Object.assign({}, state, {
        login: action.login,
        userInfo: action.userInfo
      });
    case types.user.UPDATE_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo,
        refreshing: action.refreshing
      });
    case types.user.GET_ORDER_STATE_NUM:
      return Object.assign({}, state, {
        orderNum: action.orderNum
      });
    case types.user.GET_CART_TOTAL_NUM:
      return Object.assign({}, state, {
        cartNum: action.cartNum
      });
    case types.user.UPDATE_USER_INFO_LOADING:
      return Object.assign({}, state, {
        refreshing: action.refreshing
      });
    case types.user.GET_USER_CARD_LIST:
      return Object.assign({}, state, {
        cardList: action.cardList
      });
    case types.user.GET_UNREAD_ALL_COUNT:
    {
      const unreadMessageNumber = action.messageNum ? {
        state_support: !!_.find(action.messageNum, ["msgType", 200]).redDot,
        state_system: !!_.find(action.messageNum, ["msgType", 300]).redDot,
        state_offer: !!_.find(action.messageNum, ["msgType", 100]).redDot
      } : state.messageNum;
      unreadMessageNumber.state_all = _.filter(unreadMessageNumber, (o)=>o).length > 0;
      console.log('读取 unreadMessageNumber',unreadMessageNumber, _.filter(unreadMessageNumber, (o)=>o));
      return Object.assign({}, state, {
        unreadMessageNumber
      });
    }
    case types.user.SET_UNREAD_MESSAGE_NUMBER:
    {
      const unreadMessageNumber = Object.assign({...state.unreadMessageNumber});
      unreadMessageNumber[action.msgType] = false;
      unreadMessageNumber.state_all = _.filter(unreadMessageNumber, (o)=>o).length > 0;
      console.log('更新 unreadMessageNumber',unreadMessageNumber, _.filter(unreadMessageNumber, (o)=>o));
      return Object.assign({}, state, {
        unreadMessageNumber:unreadMessageNumber
      });
    }
    case types.user.GET_USER_POINTS_SIGNINFO:
      return Object.assign({}, state, {
        pointsSigninfo: action.pointsSigninfo
      });
    case types.user.GET_USER_MYDEMANDDETAIL:
      return Object.assign({}, state, {
        myDemandHallDetail: action.myDemandDetailData,
        myDemandDetailFetchstatus: action.myDemandDetailStatus
      });
    default:
      return state;
  }
};
