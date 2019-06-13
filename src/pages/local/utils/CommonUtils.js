'use strict';
import React, { Component } from 'react';
import {
    Platform,
    DeviceEventEmitter,
    NativeModules,
    Linking,
} from 'react-native';


import _ from 'lodash';
import { removeEmpty, Toast } from "../../../utils/function";
import coordtransform from 'coordtransform'


let EARTH_RADIUS = 6378.137;    //单位kM
let PI = Math.PI;
const isEmptyObject = (obj) => {
    for (var name in obj) {
        return false;
    }
    return true;
}

/* 判断一个日期是否有效
 示例：isValidDate('31/11/2012','dd-mm-yyyy') */
const isValidDate = (value, userFormat) => {
    // Set default format if format is not provided
    userFormat = userFormat || 'mm/dd/yyyy';

    // Find custom delimiter by excluding
    // month, day and year characters
    var delimiter = /[^mdy]/.exec(userFormat)[0];

    // Create an array with month, day and year
    // so we know the format order by index
    var theFormat = userFormat.split(delimiter);

    // Create array from user date
    var theDate = value.split(delimiter);

    function isDate(date, format) {
        var m, d, y, i = 0, len = format.length, f;
        for (i; i < len; i++) {
            f = format[i];
            if (/m/.test(f)) m = date[i];
            if (/d/.test(f)) d = date[i];
            if (/y/.test(f)) y = date[i];
        }
        return (
            m > 0 && m < 13 &&
            y && y.length === 4 &&
            d > 0 &&
            // Check if it's a valid day of the month
            d <= (new Date(y, m, 0)).getDate()
        );
    }

    return isDate(theDate, theFormat);
}

const formatPath = (path, cityCode, pathData) => {
    let city;
    if (cityCode == Constant.COOKIE_CITY_CODE_SH.cityCode) {
        city = Constant.COOKIE_CITY_CODE_SH.city;
    } else {
        city = Constant.COOKIE_CITY_CODE_HZ.city;
    }
    pathData.city = city;
    console.log('formatPath', pathData);
    let strCompiled = _.template(path);
    path = strCompiled(pathData);
    console.log('formatPath path', path);
    return path;
}

/*拨打电话*/
const callPhone = (phoneNum) => {
    let phoneUrl = 'tel:' + phoneNum;
    Linking.canOpenURL(phoneUrl).then(supported => {
        if (supported) {
            Linking.openURL(phoneUrl);
        } else {
            Toast.error('电话调用异常！');
        }
    })
}

//计算两个经纬度之间的距离
const getDistance = (pointFrom, pointTo) => {

    if (pointFrom.latitude) {
        let radLat1 = pointFrom.latitude * PI / 180.0;
        let radLat2 = pointTo.latitude * PI / 180.0;

        let a = radLat1 - radLat2;
        let b = pointFrom.longitude * PI / 180.0 - pointTo.longitude * PI / 180.0;

        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000.0;
        if (s < 1) {
            return (s * 1000).toFixed(2) + 'm';
        } else {
            return s.toFixed(2) + 'km';
        }
    } else {
        return ''
    }
}

const uniq = (array) => {
    var temp = [];
    var index = [];
    var l = array.length;
    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (array[i].letter === array[j].letter) {
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
        index.push(i);
    }
    console.log(index);
    return temp;
}

const isRightMobel = (value) => {
    if (value == "" || isNaN(value) || (value.length != 11)) {
        return false;
    } else if (/^(0|86|17951)?(1)[0-9]{10}$/.test(value)) {
        return true;
    } else {
        return false;
    }
};

const formatPhoneNum = (value) => {
    if (value && value.length > 10) {
        return value.substr(0, 3) + '****' + value.substr(value.length - 4, 4);
    } else {
        return '';
    }
};

const isEmail = function (val) {
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var domains = ["qq.com", "163.com", "vip.163.com", "263.net", "yeah.net", "sohu.com", "sina.cn", "sina.com", "eyou.com", "gmail.com", "hotmail.com", "42du.cn"];
    if (pattern.test(val)) {
        var domain = val.substring(val.indexOf("@") + 1);
        for (var i = 0; i < domains.length; i++) {
            if (domain == domains[i]) {
                return true;
            }
        }
    }
    return false;
}

const parseIntTime2Str = (time) => {
    console.log('parseIntTime2Str before=', time);
    let timeStr = String(time);
    if (0 < time && time < 10) {
        timeStr = "00:" + time + '0'
    } else if (10 <= time && time < 100) {
        timeStr = "00:" + time
    } else if (100 <= time && time < 1000) {
        timeStr = "0" + timeStr.substr(0, 1) + ':' + timeStr.substr(1, 2);
    } else {
        timeStr = timeStr.substr(0, 2) + ':' + timeStr.substr(2, 2)
    }
    console.log('parseIntTime2Str after=', timeStr);
    return timeStr;
}
const parseStrTime2Int = (time) => {
    let timeInt = parseInt(time.replace(':', ''));
    return timeInt;
}

const transformLoc = (latitude = 0, longitude = 0) => {
    let gcj02 = coordtransform.bd09togcj02(longitude, latitude);
    return {
        lng: gcj02[0],
        lat: gcj02[1],
    }
}

const isChinese = (temp) => {
    var re = /[^u4e00-u9fa5]/;
    if (re.test(temp)) {
        return false;
    }
    return true;
}

const isSearch = (s) => {
    var patrn = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;\'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;\'\,.<>?]{0,19}$/;
    if (!patrn.exec(s)) return false
    return true
}

const formateTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    return hour + ":" + (min>0?min:'0'+min);
}


export default {
    formatPath,
    isValidDate,
    isEmptyObject,
    callPhone,
    getDistance,
    uniq,
    isRightMobel,
    formatPhoneNum,
    isEmail,
    parseIntTime2Str,
    parseStrTime2Int,
    transformLoc,
    isChinese,
    isSearch,
    formateTime,
};

