import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;
export const RefundApi = {
  reasonList: {
    url: `${ROOT_URL}orderrefund/reasonList`,
    method: "GET"
  },
  apply: {
    url: `${ROOT_URL}`,
    service:"After_afterServiceRefund",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  continueApply: {
    url: `${ROOT_URL}`,
    service:"After_afterSaleExpressInfo",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  logisticsStateList: {
    url: `${ROOT_URL}`,
    service:"UserAddress_queryExpressInfo",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  list: {
    url: `${ROOT_URL}`,
    service:"After_afterApplyList",
    method: 'POST',
    showLoading: false,
    needLogin: false
  },
  info: {
    url: `${ROOT_URL}`,
    service:"After_afterApplyDetail",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  setTrackingNo: {
    url: `${ROOT_URL}orderrefund/setTrackingNo`,
    method: "POST"
  },
  revoke: {
    url: `${ROOT_URL}`,
    service:"After_closeAfterSaleApply",
    method: 'POST',
    showLoading: true,
    needLogin: false
  }
};
