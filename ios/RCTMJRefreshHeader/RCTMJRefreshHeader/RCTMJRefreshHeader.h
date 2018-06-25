//
//  RCTMJRefreshHeader.h
//  RCTMJRefreshHeader
//
//  Created by Macbook on 2018/6/25.
//  Copyright © 2018年 Macbook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MJRefresh.h"

@interface RCTMJRefreshHeader : MJRefreshHeader
/** 普通闲置状态 */
//MJRefreshStateIdle = 1,
/** 松开就可以进行刷新的状态 */
//MJRefreshStatePulling,
/** 正在刷新中的状态 */
//MJRefreshStateRefreshing,
/** 即将刷新的状态 */
//MJRefreshStateWillRefresh,
@property (nonatomic, copy) RCTBubblingEventBlock onMJRefreshIdle;
@property (nonatomic, copy) RCTBubblingEventBlock onMJWillRefresh;
@property (nonatomic, copy) RCTBubblingEventBlock onMJRefresh;
@property (nonatomic, copy) RCTBubblingEventBlock onMJReleaseToRefresh;
@property (nonatomic, copy) RCTBubblingEventBlock onMJPulling;
@end
