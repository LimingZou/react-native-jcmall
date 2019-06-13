import { combineReducers } from "redux";
import { reducer as network } from 'react-native-offline';
import user from "./user";
import category from "./category";
import appInitial from "./app";
import wechat from "./app/wechat";
import location from "./app/location";
import home from "./home";
import my  from "./my";
import cart from "./cart";
import local from "./local";

const rootReducer = {
  network,
  app: combineReducers({
    user,
    initial: appInitial,
    wechat,
    location
  }),
  view: combineReducers({
    home,
    cart,
    my,
    local
  }),
  persistView: combineReducers({
    category
  }),
  // config: combineReducers({
  //
  // })
};

export default rootReducer;
