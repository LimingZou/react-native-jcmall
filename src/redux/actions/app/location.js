import types from "../../types";
import Fetch from "../../../utils/fetch";
import {
  PermissionsAndroid,
  NativeModules,
  Platform,
} from 'react-native';

import { LocationApi } from "../../../services/api/location";
import { Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
import coordtransform from 'coordtransform'
import PermissionUtils from '../../../pages/local/utils/PermissionUtils'

const defaultLocation = {
  areaName: "闵行区",
  cityName: "上海市",
  formatted_address: "上海市闵行区舟虹路",
  latitude: 31.191548802370495,
  longitude: 121.31519948571423,
  provinceName: "上海市",
  street: "舟虹路",
};

export const initLocation = () => {
  return async dispatch => {
    dispatch(getLocation());
  };
};

export const updatePosition = () => {
  return async dispatch => {
    try {
      navigator.geolocation.getCurrentPosition(async location => {
        console.log('location action=', location);
        const { coords: { longitude, latitude } } = location;
        const e = await Fetch.fetch({
          api: LocationApi.geocoder,
          params: {
            location: _.join([latitude, longitude], ','),
            output: "json",
            ak: "cHXE0YZcv1USvcWqezNwTwMkyFN0fMGQ"
          }
        });
        if (e.status === 0) {
          dispatch(changeAddress(e.result));
        } else {
          Toast.warn(fa.code.parse(e.code, e.message));
        }
      });
    } catch (err) {

    }
  };
};

export const getLocation = () => {
  //console.log('ccccc', "getCityLocation");
  return async dispatch => {
    try {
      let getPositionSuccess = position => {
        if (position) {
          let gcj02 = coordtransform.wgs84togcj02(position.coords.longitude, position.coords.latitude);
          let bd09 = coordtransform.gcj02tobd09(gcj02[0], gcj02[1]);
          position.coords.longitude = bd09[0];
          position.coords.latitude = bd09[1];
        }
        var coor = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        //console.log('当前定位经纬度coor：', coor);
        //获取经纬度成功后，获取城市
        _gecodeLocation({ coords: coor, dispatch: dispatch })
      };
      let getPositionError = error => {
        console.log('error==', error);
        dispatch(changeAddress(defaultLocation));
        Toast.warn('定位出错');
      };
      let getPositionOptions = {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 600000
      };
      if (Platform.OS === "ios") {
        navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, getPositionOptions);
        navigator.geolocation.watchPosition(getPositionSuccess, getPositionError, getPositionOptions);
      } else {
        NativeModules.SettingModule.isGpsOpen().then((gpsInfo) => {
          console.log('定位GSP是否打开', gpsInfo.isGpsOpen);
          if (gpsInfo.isGpsOpen) {
            //权限检查
            PermissionUtils.requestMultiplePermission([PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION], (data, permission) => {
              if (data) {
                //同意了权限，则直接进行定位
                navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, getPositionOptions);
                navigator.geolocation.watchPosition(getPositionSuccess, getPositionError, getPositionOptions);
              } else {
                //没同意权限，则进行申请
                PermissionUtils.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  '当前应用需要定位权限', '没有该权限将影响您的正常使用，同意就好了',
                  (granted, permission) => {
                    console.log('granted=', granted);
                    console.log('permission=', permission);
                    navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, getPositionOptions);
                    navigator.geolocation.watchPosition(getPositionSuccess, getPositionError, getPositionOptions);
                  },
                  (error) => {
                    console.log('定位权限被拒绝，原因为：\n' + error);
                    //打开系统设置页面
                    NativeModules.SettingModule.openPermissionSettings((msg) => {
                      console.log('打开系统设置出错：' + msg);
                      dispatch(changeAddress(defaultLocation));
                    });
                  }
                );
              }
            }, (error) => {
              console.log('定位权限获取失败，原因为：\n' + error);
              dispatch(changeAddress(defaultLocation));
            });
          }
        });
      }
    } catch (error) {
      // Toast.warn('定位失败，原因为：\n' + error);
      console.log('定位失败，原因为：\n' + error);
      dispatch(changeAddress(defaultLocation));
    }
  }
};

const _gecodeLocation = async ({ coords, dispatch }) => {
  const longitude = coords.lng;
  const latitude = coords.lat;
  const e = await Fetch.fetch({
    api: LocationApi.geocoder,
    params: {
      location: _.join([latitude, longitude], ','),
      output: "json",
      ak: "cHXE0YZcv1USvcWqezNwTwMkyFN0fMGQ"
    }
  });
  if (e.status === 0) {
    dispatch(changeAddress(e.result));
  } else {
    Toast.warn(fa.code.parse(e.code, e.message));
  }
}

export const searchPlaceList = ({ region, query } = {}) => {
  return async dispatch => {
    try {
      const e = await Fetch.fetch({
        api: LocationApi.place,
        params: {
          query,
          region,
          city_limit: true,
          output: "json",
          ak: "cHXE0YZcv1USvcWqezNwTwMkyFN0fMGQ"
        }
      });
      if (e.status === 0) {
        dispatch(changePlaceList(e.result));
      } else {
        Toast.warn(fa.code.parse(e.code, e.message));
      }
    } catch (err) {

    }
  };
};

export const changeAddress = address => {
  return dispatch => {
    dispatch({
      type: types.location.SET_ADDRESS_INFO,
      address
    });
  };
};

export const changePlaceList = list => {
  return dispatch => {
    dispatch({
      type: types.location.GET_SERCH_PLACE_LIST,
      list
    });
  };
};



