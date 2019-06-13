#!/bin/bash

#读取properties文件中的某个属性
function readProperty() {
  #获取属性名,并将属性名的"."号替换为"\.",以便于后面在gsed中使用
  propertyName=`echo $1 | gsed 's/\./\\\./g'`
  #获取属性文件路径
  fileName=$2;
  #读取属性文件内容,然后使用gsed命令将前缀的空格去掉,删除注释行,选取匹配属性名的行,并将属性名去掉,最后取结果最后一个
  cat $fileName | gsed -n -e "s/^[ ]*//g;/^#/d;s/^$propertyName=//p" | tail -1
}

apk_name='jckj'
version_name='1.0.0'
build_type='all'
api_key='03abcad289907df3b0399943358ae075'
upload_url='https://www.pgyer.com/apiv2/app/upload'

if [ -n "$1" ]; then
  build_type=$1
fi

if !(command -v react-native > /dev/null 2>&1); then
  echo "react-native 命令不存在"
  echo "无法完成 react-native 构建"
  exit 1
fi

if !(command -v gsed > /dev/null 2>&1); then
  echo "gsed 命令不存在"
else
  if [ -f "android/app/app.properties" ]; then
    version_name=`readProperty "APP_VERSION_NAME" "android/app/app.properties"`
    version_code=`readProperty "APP_VERSION_CODE" "android/app/app.properties"`

    echo "Version Name is $version_name, Version Code is $version_code."
  else
    echo "android/app/app.properties 文件不存在"
  fi
fi

echo "清理构建缓存..."
if [ -d "node_modules" ]; then
  rm -rf node_modules/
fi
if [ -d "ios/Pods" ]; then
  rm -rf ios/Pods/
fi
echo "清理构建缓存完成"

echo "开始 npm install"
npm install
echo "npm install 完成"

echo "开始 pod install"
cd ios/
pod install
cd ../
echo "pod install 完成"

if [ -d "output" ]; then
  echo "清理旧版本文件..."
  rm -rf output/android/*
  rm -rf output/ios/*
  rm -rf output/all/
  echo "清理旧版本文件完成"
fi
if [ -d "android/app/src/main" ]; then
  echo "清理 android项目 react-native 包文件..."
  rm -rf android/app/src/main/assets/bundle.jsbundle
  rm -rf android/app/src/main/res/drawable-*
  echo "清理 android项目 react-native 包文件完成"
fi

if [ $build_type == 'all' -o $build_type == 'rn' ]; then
  echo "构建 react-native 包文件..."
  react-native bundle --platform android --dev false --entry-file index.js  --bundle-output output/android/bundle.jsbundle --assets-dest output/android/
  react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/bundle.jsbundle --assets-dest android/app/src/main/res/
  react-native bundle --platform ios --dev false --entry-file index.js  --bundle-output output/ios/bundle.jsbundle --assets-dest output/ios/

  if [ -d "output/android" ]; then
    cd output/android/
    zip -r -o android-update.zip bundle.jsbundle drawable-mdpi/
  fi

  if [ -d "../ios" ]; then
    cd ../ios/
    zip -r -o ios-update.zip bundle.jsbundle assets/
  fi

  cd ../
  if [ ! -d "all" ]; then
    mkdir all
  fi

  time=$(date "+%Y-%m-%d_%H%M%S")
  mv android/android-update.zip "all/android-update-$time.zip"
  mv ios/ios-update.zip "all/ios-update-$time.zip"
  echo "构建 react-native 包文件完成"
fi

if [ $build_type == 'all' ]; then
  echo "构建 android 原生包文件..."
  cd ../android/
  if !(command -v ./gradlew > /dev/null 2>&1); then
    echo "gradle 环境不存在"
    echo "无法完成 android 原生包构建"
  else
    ./gradlew clean
    ./gradlew build

    time=$(date "+%Y-%m-%d_%H%M%S")
    mv app/build/outputs/apk/debug/app-debug.apk "../output/all/${apk_name}_debug_V${version_name}.apk"
    mv app/build/outputs/apk/release/app-release.apk "../output/all/${apk_name}_V${version_name}.apk"

    ./gradlew clean
    echo "构建 android 原生包文件完成"

    echo "开始上传 Android 版本到 pgyer..."
    file_path="../output/all/${apk_name}_debug_V${version_name}.apk"
    curl -F "file=@${file_path}" -F "_api_key=${api_key}" "${upload_url}"
    echo "上传 Android 版本到 pgyer 完成"
  fi
fi

cd ../
echo "清理文件..."
rm -rf output/android/*
rm -rf output/ios/*
rm -rf android/app/src/main/assets/bundle.jsbundle
rm -rf android/app/src/main/res/drawable-*
echo "清理文件完成"

echo "自动构建脚本结束"
