package com.jckjmall.app.app;

import android.content.Context;
import android.os.Environment;

import com.jckjmall.app.BuildConfig;

public class Constants {
//    public static String API = (BuildConfig.DEBUG?BuildConfig.DEV_API_HOST: BuildConfig.API_HOST) + "/api/";

//    public static void setAPI(String API) {
//        Constants.API = API + "/api/";
//    }
    /**
     * 全局DEBUG开关
     */
    public static final boolean DEBUG = BuildConfig.DEBUG;
    //sp key
    public static final String SP_KEY_SETTING_COUNT = "goSettingCount";
    public static final String KEY_ID = "KEY_ID";
    public static final String KEY_FLAG = "KEY_FLAG";
    public static final String KEY_EXT = "KEY_EXT";
    public static final String KEY_MUSIC = "KEY_DATA";
    public static final String KEY_RN_RUN_LOCAL_SERVER = "KEY_RN_RUN_LOCAL_SERVER";

    public static final String KEY_START_FROM_PUSH = "KEY_START_FROM_PUSH";
    public static final String KEY_RN_COMPONENT_NAME = "KEY_RN_COMPONENT_NAME";
    public static final String KEY_JPUSH_ALERT = "KEY_JPUSH_ALERT";
    public static final String KEY_JPUSH_NOTIFICATION_ID = "KEY_JPUSH_NOTIFICATION_ID";
    public static final String KEY_JPUSH_EXTRA = "KEY_JPUSH_EXTRA";


    public static String WECHAT_APP_ID = "wxb19cc5375284d291";
    public static final String ACTION_WECHAT_PAY_SUCCESS = "ACTION_WECHAT_PAY_SUCCESS";
    public static final String ACTION_WECHAT_PAY_USER_CANCEL = "ACTION_WECHAT_PAY_USER_CANCEL";
    public static final String ACTION_WECHAT_PAY_SIGN_ERROR = "ACTION_WECHAT_PAY_SIGN_ERROR";


    public static String DOWNLOAD_IMAGE_FILEPATH = "";

//    public static void init(Context context){
//        DOWNLOAD_IMAGE_FILEPATH = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getPath() + "/jcmall/";
//        FileUtil.createFolder(DOWNLOAD_IMAGE_FILEPATH);
//
//    }
}
