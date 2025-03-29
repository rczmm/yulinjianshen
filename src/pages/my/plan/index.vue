<template>
  <view class="plan-container">
    <view class="page-header">
      <view class="header-title">我的健身计划</view>
      <nut-button type="primary" size="small" @click="createNewPlan">新建计划</nut-button>
    </view>
    
    <view class="plan-list">
      <view v-if="planList.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">暂无健身计划</view>
        <nut-button type="primary" size="small" @click="createNewPlan">立即创建</nut-button>
      </view>
      
      <view v-else>
        <view v-for="(plan, index) in planList" :key="index" class="plan-item" @click="viewPlanDetail(plan.id)">
          <view class="plan-header">
            <view class="plan-title">{{ plan.title }}</view>
            <view class="plan-status" :class="{'active': plan.active, 'completed': !plan.active}">
              {{ plan.active ? '进行中' : '已完成' }}
            </view>
          </view>
          
          <view class="plan-content">
            <view class="plan-info">
              <text class="info-item">{{ plan.duration }}周</text>
              <text class="info-item">{{ plan.frequency }}次/周</text>
              <text class="info-item">{{ plan.type }}</text>
            </view>
            
            <view class="plan-progress">
              <view class="progress-header">
                <text>完成进度</text>
                <text>{{ plan.progress }}%</text>
              </view>
              <nut-progress :percentage="plan.progress" stroke-color="#2196f3"></nut-progress>
            </view>
            
            <view class="plan-date">
              <text>{{ plan.startDate }} ~ {{ plan.endDate }}</text>
            </view>
          </view>
          
          <view class="plan-footer">
            <view class="plan-tags">
              <text v-for="(tag, tagIndex) in plan.tags" :key="tagIndex" class="tag-item">{{ tag }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      planList: []
    }
  },
  onLoad() {
    this.getPlanList()
  },
  methods: {
    // 获取计划列表
    getPlanList() {
      // 模拟数据，实际项目中应该从API获取
      this.planList = [
        {
          id: 1,
          title: '增肌计划',
          active: true,
          duration: 12,
          frequency: 5,
          type: '增肌',
          progress: 45,
          startDate: '2023-04-01',
          endDate: '2023-06-30',
          tags: ['胸肌', '背部', '腿部']
        },
        {
          id: 2,
          title: '减脂计划',
          active: false,
          duration: 8,
          frequency: 4,
          type: '减脂',
          progress: 100,
          startDate: '2023-01-15',
          endDate: '2023-03-15',
          tags: ['有氧', 'HIIT', '全身']
        },
        {
          id: 3,
          title: '力量训练',
          active: true,
          duration: 10,
          frequency: 3,
          type: '力量',
          progress: 30,
          startDate: '2023-03-20',
          endDate: '2023-05-28',
          tags: ['哑铃', '杠铃', '器械']
        }
      ]
    },
    // 查看计划详情
    viewPlanDetail(planId) {
      uni.navigateTo({
        url: `/pages/my/plan/detail?id=${planId}`
      })
    },
    // 创建新计划
    createNewPlan() {
      uni.navigateTo({
        url: '/pages/my/plan/create'
      })
    }
  }
}
</script>

<style lang="scss">
.plan-container {
  padding: 20rpx;
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .header-title {
      font-size: 36rpx;
      font-weight: bold;
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    
    .empty-image {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 20rpx;
    }
    
    .empty-text {
      font-size: 28rpx;
      color: #999;
      margin-bottom: 30rpx;
    }
  }
  
  .plan-item {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .plan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .plan-title {
        font-size: 32rpx;
        font-weight: bold;
      }
      
      .plan-status {
        font-size: 24rpx;
        padding: 6rpx 16rpx;
        border-radius: 20rpx;
        
        &.active {
          background-color: #e6f7ff;
          color: #2196f3;
        }
        
        &.completed {
          background-color: #f6ffed;
          color: #52c41a;
        }
      }
    }
    
    .plan-content {
      margin-bottom: 20rpx;
      
      .plan-info {
        display: flex;
        margin-bottom: 20rpx;
        
        .info-item {
          font-size: 26rpx;
          color: #666;
          margin-right: 20rpx;
          background-color: #f5f5f5;
          padding: 4rpx 16rpx;
          border-radius: 8rpx;
        }
      }
      
      .plan-progress {
        margin-bottom: 16rpx;
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 24rpx;
          color: #666;
          margin-bottom: 8rpx;
        }
      }
      
      .plan-date {
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .plan-footer {
      .plan-tags {
        display: flex;
        flex-wrap: wrap;
        
        .tag-item {
          font-size: 22rpx;
          color: #ff6b00;
          background-color: #fff7e6;
          padding: 4rpx 12rpx;
          border-radius: 6rpx;
          margin-right: 12rpx;
          margin-bottom: 8rpx;
        }
      }
    }
  }
}
</style>