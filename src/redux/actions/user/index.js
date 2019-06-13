import types from "../../types/index";
import Fetch from "../../../utils/fetch";
import { storageModule } from "moji-react-native-utils";
import { Toast } from "../../../utils/function";
import { UserApi } from "../../../services/api/user";
import { CartApi } from "../../../services/api/cart";
import { MessageApi } from "../../../services/api/message";
import { OrderApi } from "../../../services/api/order";
import { RefundApi } from "../../../services/api/refund";
import NavigationService from "../../../containers/navigationService";
import fa from "../../../utils/fa";
import { AppPlatform, AppVersion } from "../../../services";
import CookieManager from 'react-native-cookies';
import Time from "../../../utils/time";

/**
 * 登录方法
 **/
export const userLogin = ({ user_token } = {}) => {
  return async dispatch => {
    //登录后需要处理的方法
    await dispatch(setUserToken(true, user_token));
    userLoginSuccessAfter({ dispatch, user_token });
  };
};

/**
 * 退出登录方法
 **/
export const userLogout = () => {
  return async dispatch => {
    //设置退出登录状态
    dispatch(setUserStatus(false, null));
    dispatch(setUserToken(false, null));
    //退出登录后需要处理的方法
    userLogoutAfter({ dispatch });
  };
};

/**
 * 初始化检查用户登录
 **/
export const initUserInfoStorage = () => {
  let { requestCartList } = require('../../actions/cart');
  return async dispatch => {

    //获取本地缓存用户信息数据
    const userInfoCache = await storageModule.getUserInfo();
    const userTokenCache = await storageModule.get("user_token");
    if (userInfoCache || userTokenCache) {
      const userInfo = JSON.parse(userInfoCache);
      const userToken = JSON.parse(userTokenCache);

      await dispatch(setUserStatus(true, userInfo));
      await dispatch(setUserToken(true, userToken));
      await dispatch(getOrderStateNum());
      await dispatch(getMessageStateNum());
      await dispatch(requestCartList({params:{}, options:{}}));
      await dispatch(getCartTotalNum());
      let nowDate = new Date();
      let expir = nowDate.getTime() + 30*24*60*60*1000;
      console.log('cookies', `${Time.format("Y-M-DTh:m:s", expir/1000)}.000Z`)
      if(AppPlatform == "ios"){
        CookieManager.set({
          name: 'user_token',
          value: `${userToken}`,
          domain: '.baidu.com',
          origin: '',
          path: '/',
          version: AppVersion,
          expiration: `${Time.format("Y-M-DTh:m:s", expir/1000)}.000Z`
        });
      }

    } else {
      //没有用户信息缓存
      //未来邀请注册什么的放在这里写逻辑
    }
    dispatch({
      type: types.app.INIT_USERINFO_STORAGE,
      data: true
    });
  };
};

/**
 * 更新用户信息
 **/
export const updateUserInfo = () => {
  return dispatch => {
    dispatch({
      type: types.user.UPDATE_USER_INFO_LOADING,
      refreshing: true
    });
    Fetch.fetch({
      api: UserApi.self
    }).then(e => {
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateUserInfoFunc(e.obj));
      } else {
        Toast.warn("获取用户最新数据异常");
        dispatch({
          type: types.user.UPDATE_USER_INFO_LOADING,
          refreshing: false
        });
      }
    });
  };
};

/**
 * 修改用户信息
 **/
export const modifyUserInfo = ({ params }) => {
  return dispatch => {
    Fetch.fetch({
      api: UserApi.editProfile,
      params
    }).then(e => {
      if (e.code === 0) {
        Toast.info("保存成功");
        dispatch(updateUserInfo());
        // dispatch(updateUserInfoFunc(e.data))
      } else {
        Toast.error(e.errmsg);
      }
    });
  };
};

/**
 * 被动修改用户信息
 **/
export const passiveModifyUserInfo = ({ data, callback }) => {
  return dispatch => {
    dispatch(updateUserInfoFunc(data));
    callback && callback();
  };
};

//登录后需要处理的方法
const userLoginSuccessAfter = ({ dispatch, user_token }) => {
  let { requestCartList } = require('../../actions/cart');
  storageModule.set("user_token", JSON.stringify(user_token)).then(async () => {
    await dispatch(updateUserInfo());
    await dispatch(getOrderStateNum()); // 获取订单状态
    await dispatch(getMessageStateNum()); // 获取消息状态
    await dispatch(requestCartList({params:{}, options:{}}));
    await dispatch(getCartTotalNum()); //获取购物车数量
    NavigationService.goBack();
  });
  let nowDate = new Date();
  let expir = nowDate.getTime() + 30*24*60*60*1000;
  if(AppPlatform == "ios"){
    CookieManager.set({
      name: 'user_token',
      value: `${user_token}`,
      domain: '.baidu.com',
      origin: '',
      path: '/',
      version: AppVersion,
      expiration: `${Time.format("Y-M-DTh:m:s", expir/1000)}.000Z`
    });
  }

};

//退出登录后需要处理的方法
const userLogoutAfter = ({ dispatch }) => {
  storageModule.removeUserInfo();
  storageModule.remove("user_token");
  dispatch(
    changeOrderStateNum({
      state_new: 0,
      state_pay: 0,
      state_send: 0,
      state_unevaluate: 0,
      state_refund: 0
    })
  );
  dispatch(changeMessageStateNum(
    [
      {
        id: 14,
        isRedDot: 0,
        lastTime: 1556027557000,
        msgType: 100
      },
      {
        id: 15,
        isRedDot: 0,
        lastTime: 1556027556000,
        msgType: 200
      },
      {
        id: 16,
        isRedDot: 0,
        lastTime: 1556027557000,
        msgType: 300
      },
    ]
    )
  );
  dispatch(changeCartTotalNum(0));
  CookieManager.clearAll();
  // NavigationService.goBack();
};

// 设置用户信息
const setUserStatus = (login, userInfo) => {
  return dispatch => {
    return new Promise(resolve => {
      dispatch({
        type: types.user.USER_STATUS_CHANGE,
        login,
        userInfo
      });
      resolve();
    });
  };
};

// 设置用户token
const setUserToken = (login, userToken) => {
  return dispatch => {
    return new Promise(resolve => {
      dispatch({
        type: types.user.USER_TOKEN_CHANGE,
        userToken,
        login
      });
      resolve();
    });
  };
};

// 更新用户信息方法
export const updateUserInfoFunc = e => {
  storageModule.setUserInfo(e);
  return {
    type: types.user.UPDATE_USER_INFO,
    userInfo: e,
    refreshing: false
  };
};

// 更新订单状态数量
export const getOrderStateNum = () => {
  return dispatch => {

    const promise_new = Fetch.fetch({ api: OrderApi.list, params:{orderStatus:1000} }).then(e=>{return {state_value:1000, total:e.obj.totalRecord || 0}});
    const promise_pay = Fetch.fetch({ api: OrderApi.list, params:{orderStatus:2000} }).then(e=>{return {state_value:2000, total:e.obj.totalRecord || 0}});
    const promise_send = Fetch.fetch({ api: OrderApi.list, params:{orderStatus:3000} }).then(e=>{return {state_value:3000, total:e.obj.totalRecord || 0}});
    const promise_unevaluate = Fetch.fetch({ api: OrderApi.list, params:{orderStatus:4000} }).then(e=>{return {state_value:4000, total:e.obj.totalRecord || 0}});
    const promise_refund = Fetch.fetch({ api: RefundApi.list }).then(e=>{return {state_value:8001, total:e.obj.totalRecord || 0}});

    Promise.all([promise_new, promise_pay, promise_send, promise_unevaluate, promise_refund]).then((values)=>{
      dispatch(changeOrderStateNum({
        state_new: _.find(values, ["state_value", 1000]).total,
        state_pay: _.find(values, ["state_value", 2000]).total,
        state_send: _.find(values, ["state_value", 3000]).total,
        state_unevaluate: _.find(values, ["state_value", 4000]).total,
        state_refund: _.find(values, ["state_value", 8001]).total
      }));
    });
  };
};

export const changeOrderStateNum = orderNum => {
  return dispatch => {
    dispatch({
      type: types.user.GET_ORDER_STATE_NUM,
      orderNum
    });
  };
};

// 更新消息状态数量
export const getMessageStateNum = () => {
  return dispatch => {
    Fetch.fetch({
      api: MessageApi.listRead
    }).then(e => {
      if (e.code === "0000") {
        dispatch(changeMessageStateNum(e.obj));
      } else {
        Toast.warn(e.message);
      }
    });
  };
};

export const updateMessageStateNum = ({ msgType } = {}) => {
  const state_mapping = {
    state_support: 200,
    state_system: 300,
    state_offer: 100,
  };
  return async dispatch => {
    const e = await Fetch.fetch({
      api: MessageApi.updateRead,
      params: {
        msgType:state_mapping[msgType]
      }
    });
    if (e.code === "0000") {
     dispatch(setMessageStateNum(msgType));
    } else {
      Toast.warn(e.message);
    }
  };
};

export const setMessageStateNum = msgType => {
  return dispatch => {
    dispatch({
      type: types.user.SET_UNREAD_MESSAGE_NUMBER,
      msgType
    });
  };
};

export const changeMessageStateNum = messageNum => {
  return dispatch => {
    dispatch({
      type: types.user.GET_UNREAD_ALL_COUNT,
      messageNum
    });
  };
};

// 更新购物车商品数量
export const getCartTotalNum = () => {
  return dispatch => {
    Fetch.fetch({
      api: CartApi.list
    }).then(e => {
      if (e.code === "0000") {
        let number = 0;
        e.obj && e.obj.map((item)=>{
          number+= item.skuCount;
        });
        dispatch(changeCartTotalNum(number));
      }
    });
  };
};

export const changeCartTotalNum = cartNum => {
  return dispatch => {
    dispatch({
      type: types.user.GET_CART_TOTAL_NUM,
      cartNum
    });
  };
};
