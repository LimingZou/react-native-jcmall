import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;
export const OrderApi = {
  stateNum: {
    url: `${ROOT_URL}order/stateNum`,
    method: "GET"
  },
  list: {
    url: `${ROOT_URL}`,
    service:"Order_queryOrderList",
    method: 'POST',
    showLoading: false,
    needLogin: false
  },
  detail: {
    url: `${ROOT_URL}`,
    service:"Order_orderCommitDetail",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  pay: {
    url: `${ROOT_URL}`,
    service:"Order_notifyOrderPayHandel",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  cancel: {
    url: `${ROOT_URL}`,
    service:"Order_cancelOrder",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  delete: {
    url: `${ROOT_URL}`,
    service:"Order_delete",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  confirmReceipt: {
    url: `${ROOT_URL}`,
    service:"Order_updateOrderDetailToAwaitEvaluate",
    method: "POST",
    showLoading: false,
    needLogin: true
  },
  deliverInfo: {
    url: `${ROOT_URL}order/deliverInfo`,
    method: "GET"
  },
  logistics: {
    url: `${ROOT_URL}`,
    service:"UserAddress_queryExpressInfo",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  goodsList: {
    url: `${ROOT_URL}order/goodsList`,
    method: "GET"
  },
  goodsInfo: {
    url: `${ROOT_URL}`,
    service:"After_afterApplyChoosePage",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  applyInfo: {
    url: `${ROOT_URL}`,
    service:"After_afterApplyPage",
    method: "POST",
    showLoading: false,
    needLogin: true
  },
  submitOrder: {
    url: `${ROOT_URL}`,
    service:"Order_takeOrderAction",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  orderPayDetail: {
    url: `${ROOT_URL}`,
    service:"Order_orderPayDetail",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  queryAndupdateOrderStatus:{
    url: `${ROOT_URL}`,
    service:"Order_queryAndupdateOrderStatus",
    method: "POST",
    showLoading: true,
    needLogin: true
  }


};
