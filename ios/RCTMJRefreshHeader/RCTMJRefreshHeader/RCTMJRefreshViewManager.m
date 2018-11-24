//
//  RCTMJRefreshViewManager.m
//  React
//
//  Created by Macbook on 2018/6/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import "MJRefresh.h"
#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
#import "RCTMJRefreshHeader.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/UIView+React.h>

@interface RCTMJRefreshViewManager:RCTViewManager
@end

@implementation RCTMJRefreshViewManager
{
  RCTMJRefreshHeader *header;
}

RCT_EXPORT_MODULE()

-(UIView *)view
{
  header=[RCTMJRefreshHeader headerWithRefreshingTarget:self refreshingAction:@selector(loadNewData)];
  return header;
}
- (NSArray *)customDirectEventTypes
{
  return @[
           @"onMJRefresh",
           @"onMJReleaseToRefresh",
           @"onMJRefreshIdle",
           @"onMJPulling"
           ];
}
RCT_EXPORT_VIEW_PROPERTY(onMJRefresh, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onMJRefreshIdle, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onMJReleaseToRefresh, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onMJPulling, RCTBubblingEventBlock);

RCT_EXPORT_METHOD(finishRefresh:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RCTMJRefreshHeader *> *viewRegistry) {
    RCTMJRefreshHeader *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RCTMJRefreshHeader class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RCTBarrage, got: %@", view);
    } else {
      [view endRefreshing];
    }
  }];
}
RCT_EXPORT_METHOD(beginRefresh:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RCTMJRefreshHeader *> *viewRegistry) {
        RCTMJRefreshHeader *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[RCTMJRefreshHeader class]]) {
            RCTLogError(@"Invalid view returned from registry, expecting RCTBarrage, got: %@", view);
        } else {
            [view beginRefreshing];
        }
    }];
}
-(void)loadNewData
{
  
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
@end
