package com.jckjmall.app;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import java.io.IOException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Response;
//import okhttp3.logging.HttpLoggingInterceptor;

/*
 * 一个允许所有证书的 OkHttpClientFactory 用于react native 请求
 * 解决 TypeError Network request failed
 */
public class AllowAllCertificatesOkHttpClientFactory implements OkHttpClientFactory {
    private OkHttpClient.Builder mOkHttpClient;

    private static final int TIMEOUT = 20;

    public AllowAllCertificatesOkHttpClientFactory() {

    }

    @Override
    public OkHttpClient createNewNetworkModuleClient() {
        //double check 双向锁
        if (mOkHttpClient == null) {
            synchronized (AllowAllCertificatesOkHttpClientFactory.class) {
                if (mOkHttpClient == null) {
                    X509TrustManager trustManager = createInsecureTrustManager();
                    SSLSocketFactory sslSocketFactory = createInsecureSslSocketFactory(trustManager);
                    mOkHttpClient = new OkHttpClient.Builder()
                            .connectTimeout(TIMEOUT, TimeUnit.SECONDS)
                            .readTimeout(TIMEOUT, TimeUnit.SECONDS)
                            .writeTimeout(TIMEOUT, TimeUnit.SECONDS)
                            .cookieJar(new ReactCookieJarContainer())
                            .sslSocketFactory(sslSocketFactory, trustManager)
                            .hostnameVerifier(createInsecureHostnameVerifier());
                }
            }
        }
        return mOkHttpClient.build();
    }

    /**
     * 打开或关闭日志
     *
     * @param isOpenLog
     */
    public void setOpenLog(boolean isOpenLog) {
//        mOpenLog = isOpenLog;
    }

    private static HostnameVerifier createInsecureHostnameVerifier() {
        return new HostnameVerifier() {
            @Override
            public boolean verify(String s, SSLSession sslSession) {
                return true;
            }
        };
    }

    private static SSLSocketFactory createInsecureSslSocketFactory(TrustManager trustManager) {
        try {
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(null, new TrustManager[]{trustManager}, new SecureRandom());
            return context.getSocketFactory();
        } catch (Exception e) {
            throw new AssertionError(e);
        }
    }

    /**
     * 信任所有证书
     */
    private static X509TrustManager createInsecureTrustManager() {
        return new X509TrustManager() {
            @Override
            public void checkClientTrusted(X509Certificate[] chain, String authType) {

            }

            @Override
            public void checkServerTrusted(X509Certificate[] chain, String authType) {

            }

            @Override
            public X509Certificate[] getAcceptedIssuers() {
                return new X509Certificate[0];
            }

        };
    }


}
