//
//  RCTMJScrollViewManager.m
//  React
//
//  Created by Macbook on 2018/6/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <React/RCTScrollViewManager.h>
#import <Foundation/Foundation.h>
#import "RCTMJScrollView.h"
@interface RCTMJScrollViewManager:RCTScrollViewManager
@end
@implementation RCTMJScrollViewManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[RCTMJScrollView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
