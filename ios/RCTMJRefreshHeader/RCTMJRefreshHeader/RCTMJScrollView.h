//
//  RCTMJScrollView.h
//  React
//
//  Created by Macbook on 2018/6/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <React/RCTScrollView.h>

@interface RCTMJScrollView:RCTScrollView
- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;
@end
