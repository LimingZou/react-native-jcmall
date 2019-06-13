"use strict";
import { createStore, applyMiddleware } from "redux";
import {
  createMigrate,
  persistCombineReducers,
  persistStore
} from "redux-persist";
import {
  createNetworkMiddleware
} from 'react-native-offline';

import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/index";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import storage from "redux-persist/es/storage";

//白名单 在这里添加的reducers的state都将加入Store存储
// const whiteList = ["config", "persistview"];
const whiteList = ["config"];

const NOW_VERSION = 11;

const migrations = {
  // 8: (state) => {
  // console.warn(JSON.stringify(state));
  // return {...state.userStore}
  // },
};

//缓存配置
const config = {
  key: "root",
  storage,
  whitelist: whiteList,
  version: NOW_VERSION,
  migrate: createMigrate(migrations)
};

const networkMiddleware = createNetworkMiddleware();

const logger = store => next => action => {
  if (typeof action === "function") {
    console.log("=====dispatching a function");
  } else {
    console.log("=====dispatching", action);
  }
  let result = next(action);
  console.log("=====next state", store.getState());
  return result;
};

const middleware = [
  createReactNavigationReduxMiddleware("root", state => state.nav),
  thunkMiddleware, // 允许我们 dispatch() 函数
  networkMiddleware, // 在线/离线模式下侦听针对API调用的特定操作。
  // logger // loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
];

export const store = createStore(
  persistCombineReducers(config, rootReducer),
  applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
