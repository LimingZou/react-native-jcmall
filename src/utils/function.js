import React from "react";
import { CameraRoll, Platform ,NativeModules} from "react-native";
import { Linking } from "react-native";
import RootSiblings from "react-native-root-siblings";
import JCToast from "../components/@jcmall/toast"
import { ThemeStyle } from "./style";
import RNFS from "react-native-fs";
import moment from "moment";
import _ from "lodash";
import accounting from "accounting";
import WeChat from '@yyyyu/react-native-wechat';

export const isObjDiff = (objArr = [], keysArr = [], debugMode = false) => {
  return keysArr.some(i => {
    const tmpArr = objArr.map(obj => {
      return _.get(obj, i);
    });
    if (!_.isEqual(tmpArr[0], tmpArr[1])) {
      //不同
      if (debugMode) {
        console.log("param diffrent " + i, tmpArr[0], tmpArr[1]);
      }
      return true;
    }
    return false;
  });
};

/**
 * 格式化钱，增加千分位,保留两位小数
 * @param money
 * @param hasSymbol
 */
export function formatMoney(money,hasSymbol = true ,defPrecision = 2,thousand = ',') {

  let newMoney = String(money/100);

  let pointIndex = newMoney.indexOf('.');
  if(pointIndex>-1){//存在小数点
    if(newMoney.length - 1 - pointIndex > 2){//多余两位
      newMoney = newMoney.substr(0,pointIndex +3);
    }
    defPrecision = 2;
  }

  if(pointIndex === -1 && defPrecision === 0){
    return accounting.formatMoney(newMoney, hasSymbol?'￥':'', defPrecision, thousand, '.');
  }
  return accounting.formatMoney(newMoney, hasSymbol?'￥':'', defPrecision, thousand, '.');

}

// import RNFS from "react-native-fs";
export const getPickerText = (list, values) => {
  const one = list.find(e => e.value === values[0]);
  const two = one.children.find(e => e.value === values[1]);
  const three = two.children.find(e => e.value === values[2]);
  return `${one.label},${two.label},${three.label}`;
};

export const getPickerValue = (list, values) => {
  const one = list.find(e => e.label === values[0]);
  const two = one.children.find(e => e.label === values[1]);
  const three = two.children.find(e => e.label === values[2]);
  return [one.value, two.value, three.value];
};

export const timeBefore = time => {
  let result = "";
  const timeFormat = moment(time, "X").format("YYYY-MM-DD HH:mm:ss");
  let difMinutes = moment(timeFormat).diff(moment(), "minutes");
  let difHours = moment(timeFormat).diff(moment(), "hours");
  let difDays = moment(timeFormat).diff(moment(), "days");
  if (difMinutes === 0) {
    result = "刚刚";
  } else if (-difMinutes < 60) {
    result = `${-difMinutes}分钟前`;
  } else if (-difMinutes === 60) {
    result = "1小时前";
  } else if (-difHours < 24) {
    result = `${-difHours}小时前`;
  } else if (-difHours === 24) {
    result = "1天前";
  } else if (-difDays < 3) {
    result = `${-difDays}天前`;
  } else {
    result = moment(time, "X").format("YYYY-MM-DD");
  }

  return result;
};

// /**
//  * 保存图片到相册
//  * @param ImageUrl  图片地址
//  * @returns {*}
//  */
// export const downloadLocalImage = (ImageUrl) => {
//     if (!ImageUrl) return null;
//     return new Promise((resolve, reject) => {
//         try {
//             CameraRoll.saveToCameraRoll(ImageUrl)
//             .then((result) => {
//                 resolve({ statusCode: 200 });
//                 alert('保存成功！地址如下：\n' + result);
//             })
//             .catch((error) => {
//                 alert('保存失败！\n' + error);
//             });
//         } catch (e) {
//             reject(new Error(e))
//         }

//     })
// }

// /**
//  * 下载网页图片
//  * @param uri  图片地址
//  * @returns {*}
//  */
// export const downloadImage = (saveImageUrl) => {
//     const storeLocation = `${RNFS.DocumentDirectoryPath}`;
//     let pathName = new Date().getTime() + "qrcode.png"
//     let downloadDest = `${storeLocation}/${pathName}`;
//     const ret = RNFS.downloadFile({ fromUrl: saveImageUrl, toFile: downloadDest });
//     ret.promise.then(res => {
//         if (res && res.statusCode === 200) {
//             downloadLocalImage("file://" + downloadDest);
//         }
//     })
// }

export const removeEmpty = value => {
  for (let key in value) {
    if (
      (String(value[key]) === "[object Object]" &&
        !Object.keys(value[key]).length) ||
      String(value[key]) === "][" ||
      String(value[key]) === "null" ||
      String(value[key]) === "undefined" ||
      String(value[key]) === ""
    ) {
      delete value[key];
    }
  }
  return value;
};

export class Toast {
  static info(e) {
    JCToast.info(e);
  }
  static warn(e) {
    JCToast.message(e);
  }
  static error(e) {
    JCToast.fail(e);
  }
  static success(e) {
    JCToast.success(e);
  }

  static loading(e) {
    JCToast.success(e);
  }
}

export class LinkingFunc {
  static openTel(e) {
    let url = `tel:${e}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Toast.info("不能拨打电话!", 1);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }
}

// 方法定义 lat,lng
export const getDistance = (lat1, lng1, lat2, lng2) => {
  let radLat1 = (lat1 * Math.PI) / 180.0;
  let radLat2 = (lat2 * Math.PI) / 180.0;
  let a = radLat1 - radLat2;
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
};
// 调用 return 的距离单位为km
// GetDistance(10.0,113.0,12.0,114.0)

// 楼盘自定义数据
export const estateListByArea = ({ areaList, newData, oldData }) => {
  if (!areaList.length) {
    return null;
  }
  let result = oldData;
  newData.map((item, index) => {
    let resultIndex = result.findIndex((ritem, index) => {
      return ritem.area_id === item.area_id;
    });
    let areaIndex = areaList[0].child.findIndex((aitem, index) => {
      return aitem.id === item.area_id;
    });
    if (resultIndex === -1) {
      result.push({
        area_id: item.area_id,
        area_name: areaList[0].child[areaIndex].name,
        list: [
          {
            id: item.id,
            title: item.title
          }
        ]
      });
    } else {
      result[resultIndex].list.push({
        id: item.id,
        title: item.title
      });
    }
  });
  return result;
};

//保存截图到本地相册
export const saveImage = data => {
  let promise = CameraRoll.saveToCameraRoll(data);
      promise.then(function(result) {
        Toast.info("保存成功")
      }).catch(function(error) {
        Toast.info("保存失败")
      });
};

//分享图片和连接好友
//scene 发送场景类型有 session (会话、聊天) timeline (朋友圈) favorite (收藏)，默认 session
export const shareWechat = (data,sendType) => {
  return new Promise(function(resolve,reject){
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
          if (isInstalled) {
            //分享文字
            if(sendType=="text"){
              WeChat.sendText(data).then((result)=>{
                resolve(result)
              }).catch((error)=>{
                reject(error)
              })
            }
            //分享图片
            if(sendType=="Image"){
              WeChat.sendImage(data).then((result)=>{
                // alert(JSON.stringify(result))
                resolve(result)
              }).catch((error)=>{
                reject(error)
              })
            }
            //分享音乐
            if(sendType=="Music"){
              WeChat.sendMusic(data).then((result)=>{
                resolve(result)
              }).catch((error)=>{
                reject(error)
              })
            }
            //分享视频
            if(sendType=="Video"){
              WeChat.sendVideo(data).then((result)=>{
                resolve(result)
              }).catch((error)=>{
                reject(error)
              })
            }
            //分享链接
            if(sendType=="Link"){
              WeChat.sendLink(data).then((result)=>{
                resolve(result)
              }).catch((error)=>{
                reject(error)
              })
            }
            //分享小程序
            if(sendType=="MiniProgram"){
                WeChat.sendMiniProgram(data).then((result)=>{
                  resolve(result)
                }).catch((error)=>{
                  reject(error)
                })
            }
          } else {
            Toast.info('没有安装微信软件，请您安装微信之后再试')
          }
      });
  })
};

//微信支付
export const wechatPay = (data) =>{
  return new Promise(function(resolve,reject){
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
          if (isInstalled) {
            WeChat.pay(data).then((result)=>{
              console.log(result)
              console.log("--result---支付成功")
              resolve(result)
            }).catch((error)=>{
              reject(error)
              console.log("--result---支付失败")
            })
          }else{
            Toast.info('没有安装微信软件，请您安装微信之后再试')
          }
      })
  })
}


