import Model from "../../utils/model";
import { RefundListInterface, RefundInfoInterface } from "../interface/refund";
import { RefundResonListInterface, RefundLogisticsListInterface } from "../interface/refundReson";
import { RefundApi } from "../api/refund";
import Fetch from "../../utils/fetch";

export default class Refund extends Model {
  async reasonList(params) {
    try {
      // const { result } = await Fetch.request(RefundApi.reasonList, { params })
      // return new RefundResonListInterface(result)
      const result = await new Promise((resolve, reject) => {
        const data = new RefundResonListInterface(result);
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      });
      return result;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async logisticsList(params) {
    try {
      // const { result } = await Fetch.request(RefundApi.reasonList, { params })
      // return new RefundResonListInterface(result)
      const result = await new Promise((resolve, reject) => {
        const data = new RefundLogisticsListInterface(result);
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      });
      return result;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async logisticsStateList(params) {
    try {
      // const { result } = await Fetch.request(RefundApi.reasonList, { params })
      // return new RefundResonListInterface(result)
      try {
        const { obj } = await Fetch.request(RefundApi.logisticsStateList, { params })
        return obj;
      } catch (e) {
        this.setException(e);
        return false;
      }
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async list(params) {
    try {
      const { result } = await Fetch.request(RefundApi.list, { params })
      return result;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async info(params) {
    try {
      const { obj } = await Fetch.request(RefundApi.info, { params })
      return obj;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async revoke(params) {
    try {
      const { obj } = await Fetch.request(RefundApi.revoke, { params })
      return obj;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async apply(params) {
    try {
      await Fetch.request(RefundApi.apply, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }
  async continueApply(params){
    try {
      await Fetch.request(RefundApi.continueApply, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async setTrackingNo(params) {
    try {
      await Fetch.request(RefundApi.setTrackingNo, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

  async revoke(params) {
    try {
      await Fetch.request(RefundApi.revoke, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }
}
