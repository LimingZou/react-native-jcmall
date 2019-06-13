/*
 * Copyright (C) 2013 Credoo Inc. All rights reserved.
 */
package com.jckjmall.app.utils;

import android.os.Environment;
import android.os.Process;
import android.text.TextUtils;
import android.util.Log;

import com.jckjmall.app.app.Constants;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author zhanghaiyun
 * @since 2013-4-25
 */
public final class LogUtil {

    private static final String TAG = "LogUtil";
    private static final boolean LOGV = Constants.DEBUG;
    private static final boolean LOGD = Constants.DEBUG;
    private static final boolean LOGI = Constants.DEBUG;
    private static final boolean LOGW = Constants.DEBUG;
    private static final boolean LOGE = Constants.DEBUG;
    /**
     * Debug开关
     */
    public static final boolean DEBUG = Constants.DEBUG;

    /**
     * default constructor
     */
    private LogUtil() {
    }

    /**
     * log for berbose
     *
     * @param tag log tag
     * @param msg log msg
     */
    public static void v(String tag, String msg) { // NO_UCD (use default)
        if (LOGV) {
            if (TextUtils.isEmpty(tag)) {
                Log.v(TAG, msg);
            } else {
                Log.v(tag, msg);
            }
        }
    }

    /**
     * log for debug
     *
     * @param tag log tag
     * @param msg log msg
     */
    public static void d(String tag, String msg) {
        if (LOGD) {
            if (TextUtils.isEmpty(tag)) {
                Log.d(TAG, msg);
            } else {
                Log.d(tag, msg);
            }
        }
    }

    /**
     * log for debug
     *
     * @param msg log msg
     */
    public static void d(String msg) {
        d(TAG, msg);
    }

    /**
     * log for information
     *
     * @param tag log tag
     * @param msg log msg
     */
    public static void i(String tag, String msg) {
        if (LOGI) {
            if (TextUtils.isEmpty(tag)) {
                Log.i(TAG, msg);
            } else {
                Log.i(tag, msg);
            }
        }
    }

    /**
     * log for warning
     *
     * @param tag log tag
     * @param msg log msg
     */
    public static void w(String tag, String msg) { // NO_UCD (unused code)
        if (LOGW) {
            if (TextUtils.isEmpty(tag)) {
                Log.w(TAG, msg);
            } else {
                Log.w(tag, msg);
            }
        }
    }

    /**
     * log for error
     *
     * @param tag log tag
     * @param msg log msg
     * @param tr  {@linkplain }
     */
    public static void e(String tag, String msg, Throwable tr) {
        if (LOGE) {
            if (TextUtils.isEmpty(tag)) {
                Log.e(TAG, msg, tr);
            } else {
                Log.e(tag, msg, tr);
            }
        }
    }

    /**
     * cf
     *
     * @param str msg
     */
    public static void logd(String str) {
        if (Constants.DEBUG) {
            Log.i(TAG, getTAG() + "---" + str + "#pid=" + Process.myPid());
        }
    }

    /**
     * cf
     *
     * @param tag log tag
     * @param str msg
     */
    public static void logd(String tag, String str) { // NO_UCD (unused code)
        if (Constants.DEBUG) {
            Log.i(tag, getTAG() + "---" + str);
        }
    }

    /**
     * cf
     *
     * @param str msg
     */
    public static void errord(String str) {
        if (Constants.DEBUG) {
            Log.e(TAG, getTAG() + "---" + str);
        }
    }

    /**
     * cf
     *
     * @param tag log tag
     * @param str msg
     */
    public static void errord(String tag, String str) { // NO_UCD (unused code)
        if (Constants.DEBUG) {
            Log.e(tag, getTAG() + "---" + str);
        }
    }

    /**
     * cf
     */
    public static void mark() {
        if (Constants.DEBUG) {
            Log.w(TAG, getTAG());
        }
    }

    /**
     * cf
     *
     * @param str msg
     */
    public static void mark(String str) { // NO_UCD (unused code)
        if (Constants.DEBUG) {
            Log.w(TAG, getTAG() + "---" + str);
        }
    }

    /**
     * cf
     */
    public static void traces() {
        if (Constants.DEBUG) {
            StackTraceElement[] stacks = Thread.currentThread().getStackTrace();
            StringBuilder sb = new StringBuilder();
            if (stacks != null) {
                final int NUMBER_3 = 3;
                final int NUMBER_4 = 4;
                final int NUMBER_15 = 15;
                StackTraceElement ste = stacks[NUMBER_3];
                sb.append(ste.getClassName() + "." + ste.getMethodName() + "#line=" + ste.getLineNumber() + "的调用：\n");
                for (int i = NUMBER_4; i < stacks.length && i < NUMBER_15; i++) {
                    ste = stacks[i];
                    sb.append((i - NUMBER_4)
                            + "--"
                            + ste.getClassName()
                            + "."
                            + ste.getMethodName()
                            + "(...)#line:"
                            + ste.getLineNumber()
                            + "\n");
                }
            }
            Log.w(TAG, getTAG() + "--" + sb.toString());
        }
    }

    /**
     * cf
     *
     * @return tag
     */
    public static String getTAG() { // NO_UCD (use private)
        // XXX this not work with proguard, maybe we cannot get the line number
        // with a proguarded jar file.
        // I add a try/catch as a quick fixing.
        try {
            final int NUMBER_4 = 4;
            final int NUMBER_5 = 5;
            StackTraceElement[] stacks = Thread.currentThread().getStackTrace();
            StringBuilder sb = new StringBuilder();
            if (stacks != null) {
                StackTraceElement ste = stacks[NUMBER_4];
                sb.append(ste.getFileName().subSequence(0, ste.getFileName().length() - NUMBER_5)
                        + "."
                        + ste.getMethodName()
                        + "#"
                        + ste.getLineNumber());
            }
            return sb.toString();
        } catch (NullPointerException e) {
            return "PROGUARDED";
        }
    }

    /**
     * 保存log到文件
     *
     * @param message 要保存的数据
     */
    public static void saveLog(String message) {
        if (LOGD) {
            String log = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS    ").format(new Date()) + message + "\n";
            try {
                String sdcard = String.valueOf(Environment.getExternalStorageDirectory());
                File f = new File(sdcard + "/credoo.log");
                FileOutputStream fos = new FileOutputStream(f, true);
                fos.write(log.getBytes());
                fos.close();
                fos = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
