import types from "../../types";
import { Toast } from "../../../utils/function";
import { CartApi } from "../../../services/api/cart";
import { fetchStatus } from "../../../utils";
import Fetch from "../../../utils/fetch";
import fa from '../../../utils/fa'
import { getCartTotalNum } from '../user'

export const requestCartList = ({
  params = {},
  options: { lastFetchStatus = fetchStatus.l, useCache = false }
}) => {
  /*
     lastFetchStatus: 控制使用缓存时机(非缓存无需使用)
     useCache: 网络错误或失败的情况下优先使用缓存, 如果无缓存默认处理
   */
  return async dispatch => {
    try {
      (lastFetchStatus === fetchStatus.s && useCache) ||
      dispatch(updateCartList(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: CartApi.list
      });
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateCartList(e.obj, fetchStatus.s));
      } else {
        (lastFetchStatus === fetchStatus.s && useCache) ||
        dispatch(updateCartList(null, fetchStatus.e));
      }
    } catch (err) {
      (lastFetchStatus === fetchStatus.s && useCache) ||
        dispatch(updateCartList(null, fetchStatus.f));
    }
  };
};

export const requestAdd = (cartId, count, addType = 2) => {

  return async dispatch => {
    const e = await Fetch.fetch({
      api: CartApi.add,
      params: {
        addType,
        skuId:cartId,
        skuCount:count,
        orderSource:"app"
      }
    });

    if (fa.code.isSuccess(e.code)) {
      dispatch(getCartTotalNum());
      dispatch(updateCartCount(cartId, count));
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
};

export const requestDel = (cartId) => {
  return async dispatch => {
    const e = await Fetch.fetch({
      api: CartApi.del,
      params: {
        deleteAllFlag:0,
        shopCartsSkus:`${cartId}`,
      }
    });
    if (fa.code.isSuccess(e.code)) {
      dispatch(getCartTotalNum());
      dispatch(removeItem(cartId));
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
};

export const requestDels = (cartIds) => {
  return async dispatch => {
    const e = await Fetch.fetch({
      api: CartApi.del,
      params: {
        deleteAllFlag:0,
        shopCartsSkus:cartIds,
      }
    });
    if (fa.code.isSuccess(e.code)) {
      dispatch(getCartTotalNum());
      dispatch(removeItems(cartIds));
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
};

// export const addShopCard = (params) => {
//   return async dispatch => {
//     const e = await Fetch.fetch({
//       api: CartApi.add,
//       params: params
//     });
//     if (fa.code.isSuccess(e.code)) {
//         dispatch(requestCartList({params:{}, options:{}}))
//     } else {
//       Toast.warn(fa.code.parse(e.code, e.message));
//     }
//   };
// }

const updateCartList = (data, fetchStatus) => {
  return {
    type: types.cart.GET_CART_LIST,
    data,
    fetchStatus
  };
};

export const updateCartCount = (cartId, count) => {
  return {
    type: types.cart.UPDATE_COUNT,
    cartId,
    count
  };
};

export const removeItem = (cartId) => {
  return {
    type: types.cart.REMOVE_ITEM,
    cartId
  };
};

export const removeItems = (cartIds) => {
  return {
    type: types.cart.REMOVE_ITEMS,
    cartIds
  };
};

export const selectAll = (isAllSelected) => {
  return {
    type: types.cart.SELECT_ALL,
    isAllSelected
  };
};

export const selectItem = (cartId) => {
  return {
    type: types.cart.SELECT_ITEM,
    cartId
  };
};
