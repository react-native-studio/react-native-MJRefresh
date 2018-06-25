//
//  RCTMJRefreshHeader.m
//  RCTMJRefreshHeader
//
//  Created by Macbook on 2018/6/25.
//  Copyright © 2018年 Macbook. All rights reserved.
//

#import "RCTMJRefreshHeader.h"

@implementation RCTMJRefreshHeader
- (void)setState:(MJRefreshState)state
{
    MJRefreshCheckState;
    
    switch (state) {
        case MJRefreshStateIdle:
            if(self.reactTag)self.onMJRefreshIdle(@{@"target": self.reactTag});
            break;
        case MJRefreshStatePulling:
            if(self.reactTag)self.onMJReleaseToRefresh(@{@"target":self.reactTag});
            break;
        case MJRefreshStateRefreshing:
            if(self.reactTag)self.onMJRefresh(@{@"target":self.reactTag});
            break;
        default:
            break;
    }
}
- (void)setPullingPercent:(CGFloat)pullingPercent
{
    [super setPullingPercent:pullingPercent];
    if(self.reactTag)self.onMJPulling(@{@"target":self.reactTag,@"percent":[NSNumber numberWithFloat:pullingPercent]});
}

@end
