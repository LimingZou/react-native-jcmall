import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;
export const CartApi = {
  list: {
    url: `${ROOT_URL}`,
    service:"ShopCarts_shopCartsDetail",
    method: 'POST',
    showLoading: false
  },
  add: {
    url: `${ROOT_URL}`,
    service:"ShopCarts_addCart",
    method: "POST",
    showLoading: true

  },
  del: {
    url: `${ROOT_URL}`,
    service:"ShopCarts_deleteCart",
    method: "POST",
    showLoading: true
  }

  
};
