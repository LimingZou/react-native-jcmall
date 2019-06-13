package com.jckjmall.app.BaseReactPackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.jckjmall.app.module.SettingModule;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 项目名称：buyer
 * 类描述：打开系统设置对应的package
 * 创建人：Administrator
 * 创建时间：2018-01-15
 *
 * @version ${VSERSION}
 */


public class SettingPackge implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SettingModule(reactContext));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
