/**
 * 动态权限申请
 */
import React, {Component} from 'react';
import{
    StyleSheet,
    View,
    StatusBar,
    DeviceEventEmitter,
    TouchableOpacity,
    PermissionsAndroid,
    Text,
    Alert,
    Image
}from'react-native';


async function requestPermission(permission, perTitle, perMsg, cbSuccess, cbFail) {
    try {
        const granted = await PermissionsAndroid.request(
            permission,
            {
                //提示的标题及内容
                'title': perTitle,
                'message': perMsg
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            if (cbSuccess) {
                cbSuccess(granted, permission);
            }
        } else {
            if (cbFail) {
                cbFail('权限拒绝'+granted);
            }
        }
    } catch (err) {
        if (cbFail) {
            cbFail(err);
        }
    }
}

/*
* granted.then((data)=>{
 this.show("????????????"+data)
 }).catch((err)=>{
 this.show(err.toString())
 })
*
* */
function checkPermission(permission, cbSuccess, cbFail) {
    try {
        const granted = PermissionsAndroid.check(permission);
        granted.then((data)=> {
            if (cbSuccess) {
                cbSuccess(data, permission);
            }
        }).catch((err)=> {
            if (cbFail) {
                cbFail(err);
            }
        })
    } catch (err) {
        if (cbFail) {
            cbFail(err);
        }
    }
}
 
async function requestMultiplePermission(permissions, cbSuccess, cbFail) {
    try {
        const granteds = await PermissionsAndroid.requestMultiple(permissions);
        if (cbSuccess) {
            cbSuccess(granteds, permissions);
        }
    } catch (err) {
        if (cbFail) {
            cbFail(err, permissions);
        }
    }
}


export default {
    requestPermission,
    checkPermission,
    requestMultiplePermission,
};
