# JCMALL
react-native+redux+redux-persist+redux-actions+redux-thunk+react-navigation V2

#=====极光账号信息=====
oftenfull_develop@163.com/oftenfull_jpush
AppKey：  4735822ba4a8b3bd839204be
Master Secret： 1cdef874db37c2c0a3260108
#====百度统计====
安卓 appkey:d16c975852
iOS appkey:2c05a5aee4
#====微信app支付====
appid=wxb19cc5375284d291
secret=0911066dc105f67a4127bfdf1c57422f

svn地址：http://39.108.106.233/svn/jicheng/app
测试环境H5地址：http://47.106.111.77/html/jmall/index.html
测试环境后台地址：http://47.106.111.77/admin/login.jsp rnAdmin rn@666 admin 123456
测试环境接口请求地址：http://47.106.111.77:80
接口文档地址：http://47.106.111.77/html/jicheng.html
测试环境注册邀请码：12k7k4
设计图地址：https://lanhuapp.com/web/#/item/board?pid=93083d59-b7fc-4bdb-bf13-e0f62f8fb408
禅道：http://39.108.106.233:8090/zentao/bug-browse-8.htmlme

正式环境后台地址：http://www.jckj.shop
### android 运行命令:
react-native run-android

## 打包前 创建好 output/android/  output/ios/ 两个文件夹

### android 打包命令:
### 将bundle js 和资源文件打包到output中
react-native bundle --platform android --dev false --entry-file index.js  --bundle-output output/android/bundle.jsbundle --assets-dest output/android/

### 将bundle js 和 资源文件打包到android 工程中
react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/bundle.jsbundle --assets-dest android/app/src/main/res/

### ios 运行命令:
react-native run-ios

### ios 打包命令:
react-native bundle --platform ios --dev false --entry-file index.js  --bundle-output output/ios/bundle.jsbundle --assets-dest output/ios/

### 一键打包 打包完成文件输出到 output/all/ (里面包括 android RN 热更包, ios RN 包, android 原生包(开发,正式环境) )
./build_package.sh 或者 ./build_package.sh all 打包 RN 包 + 原生 anroid 包
./build_package.sh rn 只打包 RN 包

### 一键打Android ios rn包
./build_rn.sh

### 一键同步Image ,将编辑好名字的图片放入resources 运行脚本将自动将引入写入Image.js文件
./build_image.sh

