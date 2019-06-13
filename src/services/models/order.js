import Model from "../../utils/model";
import {
  OrderStateNumInterface,
  OrderListInterface,
  OrderGoodsInfoInterface
} from "../interface/order";
import { OrderApi } from "../../services/api/order";
import Fetch from "../../utils/fetch";

export default class Order extends Model {

  // 订单详情
  async detail(params) {
    try {
      const { obj } = await Fetch.request(OrderApi.detail,{
        params
      });
      return obj;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  // 取消订单
  async cancel(params) {
    try {
      await Fetch.request(OrderApi.cancel, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  // 删除订单
  async delete(params) {
    try {
      await Fetch.request(OrderApi.delete, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  // 模拟支付成功
  async pay(params) {
    try {
      await Fetch.request(OrderApi.pay, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  // 确认收货
  async confirmReceipt(params) {
    try {
      await Fetch.request(OrderApi.confirmReceipt, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async deliverInfo(params) {
    try {
      const { result } = await Fetch.request(OrderApi.deliverInfo, { params });
      return result;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async logistics(params) {
    try {
      const { obj } = await Fetch.request(OrderApi.logistics, { params });
      return obj;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async goodsList(params) {
    try {
      const { result } = await Fetch.request(OrderApi.goodsList, { params });
      return new OrderGoodsListInterface(result);
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  // 获取单个商品信息
  async goodsInfo(params) {
    try {
      const { obj } = await Fetch.request(OrderApi.goodsInfo, { params });
      return obj;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  // 退款详情页
  async applyInfo(params) {
    try {
      const { obj } = await Fetch.request(OrderApi.applyInfo, { params });
      return obj;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }
}
