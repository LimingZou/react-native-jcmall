/*
 * Copyright (C) 2014 Credoo Inc. All rights reserved.
 */
package com.jckjmall.app.utils;

import android.content.Context;
import android.content.SharedPreferences;

import static android.content.Context.MODE_PRIVATE;

/**
 * SharedPreferences的一个工具类，
 * 调用setParam就能保存String, Integer, Boolean, Float, Long类型的参数
 * 同样调用getParam就能获取到保存在手机里面的数据
 *
 * @author yulei
 * @since 2014/3/26
 */
public final class SpUtils {
    private static final String DEFAULT_SP_NAME = "hmc_rn_buyer";
    private static final String TYPE_STRING = "String";
    private static final String TYPE_LONG = "Long";
    private static final String TYPE_INTEGER = "Integer";
    private static final String TYPE_FLOAT = "Float";
    private static final String TYPE_BOOLEAN = "Boolean";
    private static SharedPreferences sp;
    private static SharedPreferences.Editor editor;

    private SpUtils() {

    }

    /**
     * 保存数据的方法，没有SP名字的，将取默认名称
     *
     * @param context context
     * @param key     key
     * @param object  value
     */
    public static void setParam(Context context, String key, Object object) {
        setParam(context, DEFAULT_SP_NAME, key, object);
    }

    /**
     * 保存数据的方法，我们需要拿到保存数据的具体类型，然后根据类型调用不同的保存方法
     *
     * @param context        context
     * @param preferenceName preferenceName
     * @param key            key
     * @param object         value
     */
    public static void setParam(Context context, String preferenceName, String key, Object object) {

        String type = object.getClass().getSimpleName();
        if (sp == null) {
            sp = context.getSharedPreferences(preferenceName, MODE_PRIVATE);
        }
        editor = sp.edit();

        if (TYPE_STRING.equals(type)) {
            editor.putString(key, (String) object);
        } else if (TYPE_INTEGER.equals(type)) {
            editor.putInt(key, (Integer) object);
        } else if (TYPE_BOOLEAN.equals(type)) {
            editor.putBoolean(key, (Boolean) object);
        } else if (TYPE_FLOAT.equals(type)) {
            editor.putFloat(key, (Float) object);
        } else if (TYPE_LONG.equals(type)) {
            editor.putLong(key, (Long) object);
        }

        editor.commit();
    }

    /**
     * 得到保存数据的方法，我们根据默认值得到保存的数据的具体类型，然后调用相对于的方法获取值
     *
     * @param context       context
     * @param key           key
     * @param defaultObject 默认值
     * @return value
     */
    public static Object getParam(Context context, String key, Object defaultObject) {
        return getParam(context, DEFAULT_SP_NAME, key, defaultObject);
    }

    /**
     * 得到保存数据的方法，我们根据默认值得到保存的数据的具体类型，然后调用相对于的方法获取值
     *
     * @param context        context
     * @param preferenceName preferenceName
     * @param key            key
     * @param defaultObject  默认值
     * @return value
     */
    public static Object getParam(Context context, String preferenceName, String key, Object defaultObject) {
        String type = defaultObject.getClass().getSimpleName();
        if (sp == null) {
            sp = context.getSharedPreferences(preferenceName, MODE_PRIVATE);
        }

        if (TYPE_STRING.equals(type)) {
            return sp.getString(key, (String) defaultObject);
        } else if (TYPE_INTEGER.equals(type)) {
            return sp.getInt(key, (Integer) defaultObject);
        } else if (TYPE_BOOLEAN.equals(type)) {
            return sp.getBoolean(key, (Boolean) defaultObject);
        } else if (TYPE_FLOAT.equals(type)) {
            return sp.getFloat(key, (Float) defaultObject);
        } else if (TYPE_LONG.equals(type)) {
            return sp.getLong(key, (Long) defaultObject);
        }

        return null;
    }

    public static void clearSpData() {
        if (sp != null)
            sp.edit().clear().commit();
    }

    public static void clearSpData(Context context, String spName) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(spName, MODE_PRIVATE);
        if (sharedPreferences != null)
            sharedPreferences.edit().clear().commit();
    }
}
