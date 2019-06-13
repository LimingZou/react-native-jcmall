//
//  JCPositionModule.h
//  jcmall
//
//  Created by juweitu on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface JCMapModule : RCTEventEmitter<RCTBridgeModule>

+ (instancetype)defaultSingleton;
@end
