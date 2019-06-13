package com.jckjmall.app.module;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.jckjmall.app.R;
import com.jckjmall.app.app.Constants;
import com.jckjmall.app.utils.LogUtil;
import com.jckjmall.app.utils.RomUtil;
import com.jckjmall.app.utils.SpUtils;
import com.jckjmall.app.utils.SystemUtil;
import com.jckjmall.app.widget.PermissonSetDialog;


/**
 * 项目名称：buyer
 * 类描述：本地方法打开设置页面
 * 创建人：Administrator
 * 创建时间：2018-01-15
 *
 * @version ${VSERSION}
 */


public class SettingModule extends ReactContextBaseJavaModule {
    private int goSettingCount = 0;
    private Context mContext;

    public SettingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    //注意：记住getName方法中的命名名称，JS中调用需要
    @Override
    public String getName() {
        return "SettingModule";
    }


    @ReactMethod
    public void openPermissionSettings(Callback cb) {
        final Activity currentActivity =getCurrentActivity();
        if (currentActivity == null) {
            cb.invoke(false);
            return;
        }
        PermissonSetDialog.Builder builder = new PermissonSetDialog.Builder(currentActivity);
        LogUtil.d("Rom.isOppo()=" + RomUtil.isOppo());
        if (RomUtil.isOppo()) {
            goSettingCount = (int) SpUtils.getParam(currentActivity, Constants.SP_KEY_SETTING_COUNT, 0);
            if (goSettingCount <= 0) {
                builder.setMessage(R.string.permission_dialog_msg);
                builder.setTitle(R.string.permission_dialog_title);
            } else {
                builder.setMessage(R.string.permission_location_msg);
            }
        } else {
            builder.setTitle(R.string.permission_dialog_title);
            builder.setMessage(R.string.permission_dialog_msg);
        }

        // 拒绝, 退出弹窗
        builder.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        builder.setPositiveButton(R.string.go_settings, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                if (RomUtil.isOppo()) {
                    if (goSettingCount == 0) {
                        goSettingCount++;
                        SpUtils.setParam(currentActivity, Constants.SP_KEY_SETTING_COUNT, goSettingCount);
                        SystemUtil.startAppSettings(currentActivity);
                    } else {
                        SystemUtil.startSafeSettings(currentActivity);
                    }
                    LogUtil.d("goSettingCount=" + goSettingCount);
                } else {
                    SystemUtil.startAppSettings(currentActivity);
                }
            }
        });
        builder.create().show();
    }

    @ReactMethod
    public void isGpsOpen(Promise promise) {
        boolean isOpen = SystemUtil.isOpen(mContext);
        if (isOpen) {
            if (promise != null) {
                WritableMap map = Arguments.createMap();
                map.putBoolean("isGpsOpen", isOpen);
                promise.resolve(map);
            }
        } else {
            //强制打开GPS
            SystemUtil.openGPS(mContext);
            isOpen = SystemUtil.isOpen(mContext);
            if (promise != null) {
                WritableMap map = Arguments.createMap();
                map.putBoolean("isGpsOpen", isOpen);
                promise.resolve(map);
            }
        }

    }
}
