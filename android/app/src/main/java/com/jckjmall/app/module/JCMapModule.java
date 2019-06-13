package com.jckjmall.app.module;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.jckjmall.app.MainApplication;
import java.util.List;

public class JCMapModule extends ReactContextBaseJavaModule {

    public JCMapModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {

        return "JCMapModule";
    }

    /**
     * 检测程序是否安装
     *
     * @param packageName
     * @return
     */
    private boolean isInstalled(String packageName) {
       PackageManager manager = getReactApplicationContext().getPackageManager();
       //获取所有已安装程序的包信息
       List<PackageInfo> installedPackages = manager.getInstalledPackages(0);
       if (installedPackages != null) {
           for (PackageInfo info : installedPackages) {
               if (info.packageName.equals(packageName))
                   return true;
           }
       }
        return false;
    }


    @ReactMethod
    public void ToastTest() {
        Toast.makeText(getReactApplicationContext(), "方法测试",Toast.LENGTH_SHORT).show();
    }

    /**
     * 跳转高德地图
     */
    @ReactMethod
    public void goToGaodeMap(ReadableMap map) {
       try {
           double latitude = map.getDouble("latitude");
           double longitude = map.getDouble("longitude");
           String address = map.getString("address");
           if (!isInstalled("com.autonavi.minimap")) {
               Toast.makeText(getReactApplicationContext(), "请先安装高德地图客户端",Toast.LENGTH_SHORT).show();
               return;
           }

           StringBuffer stringBuffer = new StringBuffer("androidamap://navi?sourceApplication=").append("amap");
           stringBuffer.append("&lat=").append(latitude)
                   .append("&lon=").append(longitude).append("&keywords=" + address)
                   .append("&dev=").append(0)
                   .append("&style=").append(2);
           Intent intent = new Intent("android.intent.action.VIEW", Uri.parse(stringBuffer.toString()));
           intent.setPackage("com.autonavi.minimap");
           Activity activity = getCurrentActivity();
           if(activity != null){
               activity.startActivity(intent);
           }
       }catch (Exception e){
           e.printStackTrace();
       }
    }


    @ReactMethod
    public void goToBaiduMap(ReadableMap map){
        try {
//            LatLng startLatLng = new LatLng(39.940387, 116.29446);
//            LatLng endLatLng = new LatLng(39.87397, 116.529025);
            double latitude = map.getDouble("latitude");
            double longitude = map.getDouble("longitude");

            String uri = String.format("baidumap://map/direction?origin=%s,%s&destination=" +
                            "%s,%s&mode=driving&src=com.34xian.demo", latitude, longitude,
                    latitude, longitude);
            Intent intent = new Intent("android.intent.action.VIEW", Uri.parse(uri));
            intent.setPackage("com.autonavi.minimap");
            Activity activity = getCurrentActivity();
            if(activity != null){
                activity.startActivity(intent);
            }
        }
        catch (ActivityNotFoundException e) {
            Toast.makeText(getReactApplicationContext(), "请安装百度地图",Toast.LENGTH_SHORT).show();
        }
    }

}
