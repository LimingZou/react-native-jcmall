import { fetchData } from "moji-react-native-utils";
import { publicParamsConfig, dynamicConfig } from "../services";
import exceptionUtil from "../utils/exception";
import { store } from "../redux/store";

export default class Fetch {
  static fetch({ api, params = {} }) {
    return fetchData
      .fetch({
        api:Object.assign(api,{url:dynamicConfig().apiHost}),
        params: {
          service: api.service,
          ...publicParamsConfig,
          ...params
        }
      })
      .then(e => {
        console.log(api.service, params, e)
        if(e.code === "9002"){
          let { userLogout } = require('../redux/actions/user');
          store.dispatch(userLogout())
        }
        return e;
      });
  }

  static async externalLinkFetch(...e) {
    const res = await fetch(...e);
    return res.json();
  }

  static upFetch({ api, params = {} }) {
    return fetchData
      .fetch({
        api,
        params: {
          ...params
        }
      })
      .then(e => {
        console.log(api.service, params, e)
        if(e.code === "9002"){
          let { userLogout } = require('../redux/actions/user');
          store.dispatch(userLogout())
        }
        return e;
      });
  }

  static async externalLinkFetch(...e) {
    const res = await fetch(...e);
    return res.json();
  }


  /**
   * 请求
   * 注意：当返回code就抛出错误是为了日后完善错误编码国际化
   * @param api
   * @param options
   * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
   */
  static request(api, options = { params: {} }) {
    const { params } = options;
    return fetchData
      .fetch({
        api,
        params: {
          service: api.service,
          ...publicParamsConfig,
          ...params
        }
      })
      .then(e => {
        console.log(api.service, params, e)
        if (e.code === "0000") {
          return e;
        } else if(e.code === "9002"){
          let { userLogout } = require('../redux/actions/user');
          store.dispatch(userLogout())
        }else {
          console.log(`接口：${api.url} 请求fail`);
          throw new exceptionUtil(e.message, e.code);
        }
      });
  }
}
