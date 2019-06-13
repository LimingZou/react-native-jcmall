import Interface from "../../utils/interface";
import Exception from "../../utils/exception";

const reasonList = require("./data/reason.json");
const logisticsList = require("./data/logistics.json");

export class RefundResonListInterface extends Interface {
  list;

  constructor(param) {
    super();
    try {
      param = reasonList.result;
      this.list = param.list.map(function(item) {
        return new RefundResonInfoInterface(item);
      });
    } catch (e) {
      throw new Exception(
        e,
        "RefundResonListInterface interface attribute error"
      );
    }
  }
}

export class RefundResonInfoInterface extends Interface {
  id;
  title;

  constructor(param) {
    super();
    try {
      this.id = param.id;
      this.title = param.title;
    } catch (e) {
      throw new Exception(
        e,
        "RefundResonInfoInterface interface attribute error"
      );
    }
  }
}

export class RefundLogisticsListInterface extends Interface {
  list;

  constructor(param) {
    super();
    try {
      param = logisticsList.result;
      this.list = param.list.map(function(item) {
        return new RefundLogisticsInfoInterface(item);
      });
    } catch (e) {
      throw new Exception(
        e,
        "RefundLogisticsListInterface interface attribute error"
      );
    }
  }
}

export class RefundLogisticsInfoInterface extends Interface {
  id;
  title;

  constructor(param) {
    super();
    try {
      this.id = param.id;
      this.title = param.title;
    } catch (e) {
      throw new Exception(
        e,
        "RefundLogisticsListInterface interface attribute error"
      );
    }
  }
}
