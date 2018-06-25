//
//  RCTMJScrollView.m
//  React
//
//  Created by Macbook on 2018/6/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTRefreshControl.h>
#import "MJRefresh.h"
#import <React/RCTAssert.h>
#import "RCTMJScrollView.h"

@implementation RCTMJScrollView
{
  UIScrollView *_scrollView;
}
- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  return [super initWithEventDispatcher:eventDispatcher];
}
static inline void RCTApplyTransformationAccordingLayoutDirection(UIView *view, UIUserInterfaceLayoutDirection layoutDirection) {
  view.transform =
  layoutDirection == UIUserInterfaceLayoutDirectionLeftToRight ?
  CGAffineTransformIdentity :
  CGAffineTransformMakeScale(-1, 1);
}
- (void)insertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex
{
  UIScrollView *_scrollView = [self scrollView];
  UIView *_contentView = [self contentView];
#if !TARGET_OS_TV
  if ([view isKindOfClass:[RCTRefreshControl class]]) {
    [_scrollView setRefreshControl:(UIRefreshControl * _Nullable)view];
    //自己加的
  } else if([view isKindOfClass:[MJRefreshHeader class]]){
    [self scrollView].mj_header = (MJRefreshHeader *)view;
  } else
#endif
  {
    RCTAssert(_contentView == nil, @"RCTScrollView may only contain a single subview");
    _contentView = view;
    RCTApplyTransformationAccordingLayoutDirection(_contentView, self.reactLayoutDirection);
    [_scrollView addSubview:view];
  }
}

- (void)removeReactSubview:(UIView *)subview
{
  UIScrollView *_scrollView = [self scrollView];
  UIView *_contentView = [self contentView];
  [super removeReactSubview:subview];
#if !TARGET_OS_TV
  if ([subview isKindOfClass:[RCTRefreshControl class]]) {
    [_scrollView setRefreshControl:nil];
  } else  if([subview isKindOfClass:[MJRefreshHeader class]]){
    _scrollView.mj_header = nil;
  } else
#endif
  {
    RCTAssert(_contentView == subview, @"Attempted to remove non-existent subview");
    _contentView = nil;
  }
}
@end
