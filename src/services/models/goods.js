import Model from "../../utils/model";
import Fetch from "../../utils/fetch";
import { GoodsApi } from "../api/goods";

export default async function getGoods(params, callback) {
  try {
    const result = await Fetch.request(GoodsApi.getGoods, { params });
    if (callback) {
      callback(result);
    }
  } catch (e) {
    this.setException(e);
    return false;
  }
}
