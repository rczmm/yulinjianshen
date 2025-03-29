<template>
  <view class="training-container">
    <view class="page-header">
      <view class="header-title">训练记录</view>
    </view>
    
    <view class="training-stats">
      <view class="stats-card">
        <view class="stats-value">{{ stats.totalSessions }}</view>
        <view class="stats-label">总训练次数</view>
      </view>
      <view class="stats-card">
        <view class="stats-value">{{ stats.totalHours }}h</view>
        <view class="stats-label">总训练时长</view>
      </view>
      <view class="stats-card">
        <view class="stats-value">{{ stats.weeklyAverage }}次</view>
        <view class="stats-label">周平均</view>
      </view>
    </view>
    
    <view class="training-filter">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="全部" pane-key="all"></nut-tab-pane>
        <nut-tab-pane title="力量训练" pane-key="strength"></nut-tab-pane>
        <nut-tab-pane title="有氧训练" pane-key="cardio"></nut-tab-pane>
        <nut-tab-pane title="拉伸放松" pane-key="stretch"></nut-tab-pane>
      </nut-tabs>
    </view>
    
    <view class="training-list">
      <view v-if="trainingRecords.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">暂无训练记录</view>
        <nut-button type="primary" size="small" @click="startNewTraining">开始训练</nut-button>
      </view>
      
      <view v-else>
        <view v-for="(record, index) in trainingRecords" :key="index" class="record-item" @click="viewTrainingDetail(record.id)">
          <view class="record-date">
            <view class="date-day">{{ record.date.day }}</view>
            <view class="date-month">{{ record.date.month }}月</view>
          </view>
          
          <view class="record-content">
            <view class="record-title">{{ record.title }}</view>
            <view class="record-stats">
              <text class="record-duration">{{ record.duration }}分钟</text>
              <text class="record-type">{{ record.type }}</text>
            </view>
            <view class="record-exercises">
              <text v-for="(exercise, idx) in record.exercises" :key="idx" class="exercise-tag">{{ exercise }}</text>
            </view>
          </view>
          
          <view class="record-action">
            <nut-icon name="right"></nut-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Taro from '@tarojs/taro';

// 活动标签页
const activeTab = ref('all');

// 训练统计数据
const stats = ref({
  totalSessions: 0,
  totalHours: 0,
  weeklyAverage: 0
});

// 训练记录列表
const trainingRecords = ref([]);

// 页面加载时获取训练记录
onMounted(() => {
  // 这里应该从服务器获取训练记录，暂时使用模拟数据
  fetchTrainingRecords();
});

// 获取训练记录
const fetchTrainingRecords = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟训练统计数据
    stats.value = {
      totalSessions: 28,
      totalHours: 42,
      weeklyAverage: 3.5
    };
    
    // 模拟训练记录数据
    trainingRecords.value = [
      {
        id: '1',
        title: '上肢力量训练',
        date: { day: '15', month: '4' },
        duration: 60,
        type: '力量训练',
        exercises: ['哑铃卧推', '引体向上', '肱二头肌弯举']
      },
      {
        id: '2',
        title: '下肢力量训练',
        date: { day: '13', month: '4' },
        duration: 45,
        type: '力量训练',
        exercises: ['深蹲', '腿举', '小腿提踵']
      },
      {
        id: '3',
        title: '有氧跑步',
        date: { day: '10', month: '4' },
        duration: 30,
        type: '有氧训练',
        exercises: ['跑步', '间歇冲刺']
      },
      {
        id: '4',
        title: '全身拉伸',
        date: { day: '8', month: '4' },
        duration: 20,
        type: '拉伸放松',
        exercises: ['肩部拉伸', '腿部拉伸', '背部拉伸']
      },
    ];
  }, 500);
};

// 查看训练详情
const viewTrainingDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/my/training/detail?id=${id}`
  });
};

// 开始新训练
const startNewTraining = () => {
  Taro.navigateTo({
    url: '/pages/my/training/new'
  });
};
</script>

<style lang="scss">
.training-container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
  
  .header-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}

.training-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  
  .stats-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    flex: 1;
    margin: 0 5px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
    
    .stats-value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    
    .stats-label {
      font-size: 14px;
      color: #666;
    }
  }
}

.training-filter {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.training-list {
  .empty-state {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .empty-image {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
    }
    
    .empty-text {
      font-size: 16px;
      color: #999;
      margin-bottom: 20px;
    }
  }
  
  .record-item {
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    .record-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 60px;
      margin-right: 15px;
      
      .date-day {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      
      .date-month {
        font-size: 14px;
        color: #666;
      }
    }
    
    .record-content {
      flex: 1;
      
      .record-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
      
      .record-stats {
        display: flex;
        margin-bottom: 10px;
        
        .record-duration {
          font-size: 14px;
          color: #666;
          margin-right: 10px;
        }
        
        .record-type {
          font-size: 14px;
          color: #666;
        }
      }
      
      .record-exercises {
        display: flex;
        flex-wrap: wrap;
        
        .exercise-tag {
          font-size: 12px;
          color: #666;
          background-color: #f0f0f0;
          padding: 4px 8px;
          border-radius: 4px;
          margin-right: 8px;
          margin-bottom: 8px;
        }
      }
    }
    
    .record-action {
      display: flex;
      align-items: center;
    }
  }
}
</style>