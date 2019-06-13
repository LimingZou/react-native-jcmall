import { NativeModules, Platform } from "react-native";

/**
 * 回调原生方法
 * @param moduleName 模块名
 * @param funcName 方法名
 * @param params 参数
 */
export function call2NativeMethod(moduleName,funcName,params) {
    if(NativeModules[moduleName]){
        if(NativeModules[moduleName][funcName]){
            if(params){
                NativeModules[moduleName][funcName](params);
            }else{
                NativeModules[moduleName][funcName]();
            }
        }else{
            console.log(`找不到[${moduleName}]模块中的[${funcName}]方法`);
        }
    }else{
        console.log(`找不到[${moduleName}]module`);
    }
}

let canTap = true;

export function gotoNativePage(pageName = {android: null, ios: null},ext = {}) {
    if(NativeModules.NativeControlModule) {
        if(canTap) {
            canTap = false;
            NativeModules.NativeControlModule.gotoNativePage(Platform.OS === 'android' ? pageName.android : pageName.ios, JSON.stringify(ext));
            setTimeout(() => {
                canTap = true;
            }, 1000);
        }
    }


}

/**
 * 清除用户token
 */
export function clearNativeToken() {
    call2NativeMethod('NativeControlModule','clearToken')
}

/**
 * 报错token到原生
 * @param token
 */
export function saveToken2Native(token) {
    call2NativeMethod('NativeControlModule','saveToken',token)
}

/**
 * 调起微信支付
 * @param token
 */
export function nativeWechatPay(json) {
    call2NativeMethod('PayModule','wechatPay',json)
}