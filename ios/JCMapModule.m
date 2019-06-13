//
//  JCPositionModule.m
//  jcmall
//
//  Created by juweitu on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "JCMapModule.h"
#import <React/RCTEventDispatcher.h>
#import <CoreLocation/CLLocationManager.h>

@interface JCMapModule ()

@end

@implementation JCMapModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(JCMapModule);

+ (instancetype)defaultSingleton
{
  static JCMapModule *singleton;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    singleton = [[self alloc] init];
  });
  return singleton;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"PositionModule"];
}

//跳转地图开始导航
RCT_EXPORT_METHOD(goToGaodeMap:(NSDictionary *)dict)
{
//  JC_WEAK;
  NSString *urlString = [NSString stringWithFormat:@"iosamap://navi?sourceApplication=%@&backScheme=%@&lat=%@&lon=%@&dev=0&style=2",@"jc",@"www.jckjclub.com",dict[@"latitude"], dict[@"longitude"]];
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]];
    
    if ([[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]])
    {
      [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]];
    } else
    {
      UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"" message:@"导航功能需要安装高德地图"
                                                    delegate:nil cancelButtonTitle:@"好的" otherButtonTitles: nil];
      [alert show];
    }
  });
}

//查看是否有定位权限
RCT_EXPORT_METHOD(isPermissionsForIOS)
{
  if ([CLLocationManager locationServicesEnabled] && ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedWhenInUse || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusNotDetermined || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedAlways))
  {
    //定位功能可用
  }
  else if ([CLLocationManager authorizationStatus] ==kCLAuthorizationStatusDenied)
  {
    dispatch_async(dispatch_get_main_queue(), ^{
      
      UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"" message:@"请打开定位功能"
                                                    delegate:nil cancelButtonTitle:@"确定" otherButtonTitles: nil];
      [alert show];
    });
   
    //定位不能用
  }
}

@end
