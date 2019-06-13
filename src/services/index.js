import { Platform } from "react-native";
import { EnvironmentInfo } from "react-native-debug-panel";
import DeviceInfo from "react-native-device-info"
const AppName = "jcmall"; // 项目名称
const AppVersion = DeviceInfo.getVersion(); // 项目版本
const AppPlatform = Platform.OS; // 项目平台
const AppStorageName = "jcmall-client"; // 项目存储前缀名称
const errorCollectApi = ""; // 错误收集接口地址
const mobileWebDomain = ""; // mobile Web域名
const AppIcon = require("../images/logo.png"); // 项目图标
const AppEnv = __DEV__ ? "debug" : "release"; // 项目环境

EnvironmentInfo.init();

// 开发环境基础配置
const developmentConfig = {
  apiHost: "https://devm.jckjclub.com/gateway", // api地址
  uploadUrl: "https://devm.jckjclub.com/file/uploadFile",//图片上传路径
  log: true, // 是否开启输出日志
  showLog: true, // 是否显示输出日志
  showNetWorkErrorInfo: true, // 是否显示接口错误信息
  defaultUploadNetWorkErrorInfo: false, // 是否静默提交接口错误信息
  dev: __DEV__,
  mockDomain: "" // mock域名
};


// 生产环境基础配置
const productionConfig = {
  apiHost: "https://devm.jckjclub.com/gateway", // api地址
  uploadUrl: "http://47.103.34.3:9104/file/uploadFile",//图片上传路径
  log: false, // 是否开启输出日志
  showLog: false, // 是否显示输出日志
  showNetWorkErrorInfo: false, // 是否显示接口错误信息
  defaultUploadNetWorkErrorInfo: true, // 是否静默提交接口错误信息
  dev: __DEV__,
  mockDomain: "" // mock域名
};

const dynamicConfig = () => {
  return {
    host: EnvironmentInfo.getCurrentEnv().host,
    apiHost: EnvironmentInfo.getCurrentEnv().apiHost,
    uploadUrl: EnvironmentInfo.getCurrentEnv().uploadUrl
  }
};
// 公参
const publicParamsConfig = {
  source:"",
  version: AppVersion,
  os: AppPlatform,
  sign: "",
  order_no: "",
  imei: "",
  sourceType:"app"
};

console.ignoredYellowBox = ["Warning: isMounted"];
// 系统环境配置
const env = (() => {
  if (__DEV__) {
    //开发环境
    return developmentConfig;
  } else {
    //生产环境
    return productionConfig;
  }
})();

const closeLogger = () => {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {}
  };
};
const closeShowLogger = () => {
  console.disableYellowBox = true;
};

if (!env.showLog) {
  closeShowLogger();
}
if (!env.log) {
  closeLogger();
}

export {
  AppName,
  AppPlatform,
  AppIcon,
  AppVersion,
  AppEnv,
  AppStorageName,
  errorCollectApi,
  developmentConfig,
  dynamicConfig,
  productionConfig,
  publicParamsConfig,
  env,
  mobileWebDomain
};
