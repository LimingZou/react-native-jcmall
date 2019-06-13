#!/bin/bash

if [ -d output ]
then
   echo "output文件夹已存在"
else
   mkdir output/
fi

cd output

if [ -d android ]
then
   echo "android文件夹已存在"
else
   mkdir android/
fi

if [ -d ios ]
then
   echo "ios文件夹已存在"
else
   mkdir ios/
fi

cd ../
rm -rf output/android/*
rm -rf output/ios/*

react-native bundle --platform android --dev false --entry-file index.js  --bundle-output output/android/bundle.jsbundle --assets-dest output/android/
react-native bundle --platform ios --dev false --entry-file index.js  --bundle-output output/ios/bundle.jsbundle --assets-dest output/ios/

cd output/android
zip -r -o rn-android.zip bundle.jsbundle drawable-mdpi/
rm -rf bundle.jsbundle
rm -rf drawable-*

cd ../ios
zip -r -o rn-ios.zip bundle.jsbundle assets/
rm -rf bundle.jsbundle
rm -rf assets

echo "android ios rn 打包完成"


