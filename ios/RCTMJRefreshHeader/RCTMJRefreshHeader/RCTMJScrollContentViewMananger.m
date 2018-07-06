//
//  RCTMJScrollContentViewMananger.m
//  RCTMJRefreshHeader
//
//  Created by Macbook on 2018/7/6.
//  Copyright © 2018年 Macbook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

#import "RCTMJScrollContentShadowView.h"
#import "RCTMJScrollContentView.h"

@interface RCTMJScrollContentViewManager : RCTViewManager

@end


@implementation RCTMJScrollContentViewManager

RCT_EXPORT_MODULE()

- (RCTMJScrollContentView *)view
{
    return [RCTMJScrollContentView new];
}

- (RCTShadowView *)shadowView
{
    return [RCTMJScrollContentShadowView new];
}

@end
