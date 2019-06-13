package com.jckjmall.app;

import android.app.Application;
import android.content.Context;

import com.facebook.react.ReactApplication;
import com.jckjmall.app.BaseReactPackage.SettingPackge;
import com.microsoft.codepush.react.CodePush;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.rnlib.wechat.RNWechatPackage;

import fr.greweb.reactnativeviewshot.RNViewShotPackage;

import org.reactnative.camera.RNCameraPackage;

import com.jckjmall.app.BaseReactPackage.BaseReactPackage;
import com.lewin.qrcode.QRScanReaderPackage;
import com.beefe.picker.PickerViewPackage;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.horcrux.svg.SvgPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNSyanImagePickerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.lmy.smartrefreshlayout.SmartRefreshLayoutPackage;
import com.imagepicker.ImagePickerPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.security.Security;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {

            return com.jckjmall.app.BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
                    new CookieManagerPackage(),
                    new WebViewBridgePackage(),
                    new RNWechatPackage(),
                    new RNViewShotPackage(),
                    new RNCameraPackage(),
                    new QRScanReaderPackage(),
                    new PickerViewPackage(),
                    new RNFSPackage(),
                    new RNDeviceInfo(),
                    new RNI18nPackage(),
                    new LinearGradientPackage(),
                    new SvgPackage(),
                    new ReactVideoPackage(),
                    new VectorIconsPackage(),
                    new RNSyanImagePickerPackage(),
                    new SplashScreenReactPackage(),
                    new SmartRefreshLayoutPackage(),
                    new ImagePickerPackage(),
                    new LottiePackage(),
                    new BaseReactPackage(),
                    new SettingPackge()
            );
        }

        @Override
        protected String getJSMainModuleName() {

            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {

        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        //设置新的定义自己的OkHttpClientFactory 允许所有证书通过
        // OkHttpClientProvider.setOkHttpClientFactory(new AllowAllCertificatesOkHttpClientFactory());
        SoLoader.init(this, /* native exopackage */ false);
    }

}
