import Model from "../../utils/model";
import { DiscoveryApi } from "../api/discovery";
import Fetch from "../../utils/fetch";

export default class Discovery extends Model {

  async create(params) {
    try {
      await Fetch.request(DiscoveryApi.createActivity, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

}
