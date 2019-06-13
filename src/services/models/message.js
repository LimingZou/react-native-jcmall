import Model from "../../utils/model";
import { MessageApi } from "../api/message";
import Fetch from "../../utils/fetch";

export default class Message extends Model {

  async del(params) {
    try {
      await Fetch.request(MessageApi.del, { params });
      return true;
    } catch (e) {
      this.setException(e);
      return false;
    }
  }

}
