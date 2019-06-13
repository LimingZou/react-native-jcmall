import { env } from "..";

const ROOT_URL = `${env.apiHost}/`;
export const GoodsApi = {
  getGoods: {
    url: `${ROOT_URL}index/like`,
    method: "GET"
  },
  searchGood: {
    url: `${ROOT_URL}`,
    service: "product_fuzzyQueryProductSpuListByNameOrPlatform",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  goodDetail:{
    url: `${ROOT_URL}`, 
    service: "product_queryProductSpuInfoById",
    method: "POST",
    showLoading: true,
    needLogin: false
  },
  secondLevelSearch:{
    url: `${ROOT_URL}`,
    service: "product_queryProductSpuBySecondLevel",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  limitedTimeGoods:{
    url: `${ROOT_URL}`,
    service: "product_selectProductActivityTimeLimitSpuByDetail",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  addProductFavorite:{
    url: `${ROOT_URL}`,
    service: "favorite_addProductFavorite",
    method: "POST",
    showLoading: true,
    needLogin: true
  },
  selectFavoriteCount:{
    url: `${ROOT_URL}`,
    service: "favorite_selectUserFavoriteCount",
    method: "POST",
    showLoading: true,
    needLogin: false
  },
  addProductEvaluate:{
    url: `${ROOT_URL}`,
    service: "productController_addProductEvaluate",
    method: "POST",
    showLoading: true,
    needLogin: false
  },
  queryProductEvaluateList:{
    url: `${ROOT_URL}`,
    service: "productController_queryProductEvaluateList",
    method: "POST",
    showLoading: true,
    needLogin: false
  },
  cancelMany:{
    url: `${ROOT_URL}`,
    service: "favorite_cancelMany",
    method: "POST",
    showLoading: true,
    needLogin: false
  }
  
};
