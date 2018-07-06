//
//  RCTMJScrollContentView.m
//  RCTMJRefreshHeader
//
//  Created by Macbook on 2018/7/6.
//  Copyright © 2018年 Macbook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTView.h>
#import <React/RCTAssert.h>
#import <React/UIView+React.h>

#import "RCTMJScrollView.h"
#import "RCTMJScrollContentView.h"


@implementation RCTMJScrollContentView

- (void)reactSetFrame:(CGRect)frame
{
    [super reactSetFrame:frame];
    
    RCTMJScrollView *scrollView = (RCTMJScrollView *)self.superview.superview;
    
    if (!scrollView) {
        return;
    }
    
    RCTAssert([scrollView isKindOfClass:[RCTMJScrollView class]],
              @"Unexpected view hierarchy of RCTScrollView component.");
    
    [scrollView updateContentOffsetIfNeeded];
}

@end
