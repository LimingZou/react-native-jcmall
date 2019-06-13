package com.jckjmall.app.utils;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.location.LocationManager;
import android.net.Uri;
import android.provider.Settings;

import com.jckjmall.app.BuildConfig;
import com.jckjmall.app.app.Constants;


/**
 * 项目名称：app_android_buyer
 * 类描述：
 * 创建人：Administrator
 * 创建时间：2017-11-14
 *
 * @version ${VSERSION}
 */


public class SystemUtil {
    // 启动应用的设置
    public static void startAppSettings(Activity activity) {
        if (RomUtil.isMIUI()) {
            Intent intent = RomUtil.getSettingIntent(activity);
            if (RomUtil.isIntentAvailable(activity, intent)) {
                activity.startActivity(intent);
                return;
            }
        }

        if (RomUtil.isVivo()) {
            Intent vivoIntent = activity.getPackageManager().getLaunchIntentForPackage("com.iqoo.secure");
            if (vivoIntent != null) {
                activity.startActivity(vivoIntent);
                return;
            }
        }

        if (RomUtil.isFlyme()) {
            Intent flymeintent = new Intent("com.meizu.safe.security.SHOW_APPSEC");
            flymeintent.addCategory(Intent.CATEGORY_DEFAULT);
            flymeintent.putExtra("packageName", BuildConfig.APPLICATION_ID);
            activity.startActivity(flymeintent);
            return;
        }

        if (RomUtil.isEmui()) {
            Intent emuiIntent = new Intent();
            emuiIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            ComponentName comp = new ComponentName("com.huawei.systemmanager", "com.huawei.permissionmanager.ui.MainActivity");//华为权限管理
            emuiIntent.setComponent(comp);
            activity.startActivity(emuiIntent);
            return;
        }

        if (RomUtil.is360()) {
            Intent intent360 = new Intent("android.intent.action.MAIN");
            intent360.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent360.putExtra("packageName", BuildConfig.APPLICATION_ID);
            ComponentName comp = new ComponentName("com.qihoo360.mobilesafe", "com.qihoo360.mobilesafe.ui.index.AppEnterActivity");
            intent360.setComponent(comp);
            activity.startActivity(intent360);
            return;
        }

        try {
            Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                    .setData(Uri.parse("package:" + activity.getPackageName()));
            activity.startActivity(intent);
        } catch (ActivityNotFoundException e) {
            e.printStackTrace();
            try {
                Intent intent = new Intent(Settings.ACTION_MANAGE_APPLICATIONS_SETTINGS);
                activity.startActivity(intent);
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }
    }

    // 启动安全设置的设置
    public static void startSafeSettings(Activity activity) {
        /* Intent intent = new Intent();
           ComponentName component = new ComponentName("com.android.settings","com.android.settings.SecuritySettings");
           intent.setComponent(component);
           intent.setAction(Intent.ACTION_VIEW);
           startActivity(intent);
        */
        Intent intent = new Intent(Settings.ACTION_SECURITY_SETTINGS);
        activity.startActivity(intent);
    }

    /**
     * 判断GPS是否开启，GPS或者AGPS开启一个就认为是开启的
     *
     * @param context
     * @return true 表示开启
     */
    public static boolean isOpen(final Context context) {
        LocationManager locationManager
                = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        // 通过GPS卫星定位，定位级别可以精确到街（通过24颗卫星定位，在室外和空旷的地方定位准确、速度快）
        boolean gps = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        // 通过WLAN或移动网络(3G/2G)确定的位置（也称作AGPS，辅助GPS定位。主要用于在室内或遮盖物（建筑群或茂密的深林等）密集的地方定位）
        boolean network = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        if (gps || network) {
            return true;
        }
        return false;
    }

    /**
     * 强制帮用户打开GPS
     *
     * @param context
     */
    public static void openGPS(Context context) {
        Intent gPSIntent = new Intent();
        gPSIntent.setClassName("com.android.settings",
                "com.android.settings.widget.SettingsAppWidgetProvider");
        gPSIntent.addCategory("android.intent.category.ALTERNATIVE");
        gPSIntent.setData(Uri.parse("custom:3"));
        try {
            PendingIntent.getBroadcast(context, 0, gPSIntent, 0).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
