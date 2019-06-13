import { env } from "../index";

const ROOT_URL = `${env.apiHost}/server/`;
export const BuyApi = {
  calculate: {
    url: `${ROOT_URL}buy/calculate`,
    method: "POST"
  },
  create: {
    url: `${ROOT_URL}`,
    method: "POST"
  },
  info: {
    url: `${ROOT_URL}`,
    service:"Order_orderPayDetail",
    method: "POST",
    showLoading: false,
    needLogin: true
  },
  pay: {
    url: `${ROOT_URL}buy/pay`,
    method: "POST"
  }
};
