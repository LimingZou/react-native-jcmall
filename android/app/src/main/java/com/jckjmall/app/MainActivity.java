package com.jckjmall.app;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static final int WRITE_EXTERNAL_STORAGE = 1;
    public static boolean isActivityCreated;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        getPermission();
        isActivityCreated = true;
    }

    //读取内存权限
    private void getPermission() {
        String[] permissions;
        //权限还没有授予，需要在这里写申请权限的代码
//        permissions = new String[]{
//                Manifest.permission.READ_EXTERNAL_STORAGE,
//                Manifest.permission.WRITE_EXTERNAL_STORAGE
//        };
//        //申请权限图片保存权限
//        ActivityCompat.requestPermissions(
//                this,
//                permissions,
//                WRITE_EXTERNAL_STORAGE);

        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED)
        {
            //权限还没有授予，需要在这里写申请权限的代码
            permissions = new String[]{
                    Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    Manifest.permission.READ_EXTERNAL_STORAGE,
            };
            //申请权限图片保存权限
            ActivityCompat.requestPermissions(
                    this,
                    permissions,
                    WRITE_EXTERNAL_STORAGE);
        }else {
            //权限已经被授予，在这里直接写要执行的相应方法即可
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {

        return "jcmall";
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        isActivityCreated = false;
    }

}
