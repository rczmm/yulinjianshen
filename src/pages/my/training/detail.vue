<template>
  <view class="training-detail-container">
    <view class="page-header">
      <view class="header-title">训练详情</view>
    </view>
    
    <view class="training-info">
      <view class="training-title">{{ trainingDetail.title }}</view>
      <view class="training-meta">
        <text class="meta-item">{{ trainingDetail.date }}</text>
        <text class="meta-item">{{ trainingDetail.duration }}分钟</text>
        <text class="meta-item">{{ trainingDetail.type }}</text>
      </view>
      
      <view class="training-stats">
        <view class="stats-card">
          <view class="stats-value">{{ trainingDetail.exercises.length }}</view>
          <view class="stats-label">训练动作</view>
        </view>
        <view class="stats-card">
          <view class="stats-value">{{ totalSets }}</view>
          <view class="stats-label">总组数</view>
        </view>
        <view class="stats-card">
          <view class="stats-value">{{ trainingDetail.calories }}</view>
          <view class="stats-label">消耗(千卡)</view>
        </view>
      </view>
    </view>
    
    <view class="exercise-list">
      <view class="section-title">训练内容</view>
      
      <view v-for="(exercise, index) in trainingDetail.exercises" :key="index" class="exercise-item">
        <view class="exercise-header">
          <view class="exercise-name">{{ exercise.name }}</view>
          <view class="exercise-sets">{{ exercise.setDetails.length }}组</view>
        </view>
        
        <view class="set-list">
          <view class="set-header">
            <text class="set-header-item">组数</text>
            <text class="set-header-item">重量(kg)</text>
            <text class="set-header-item">次数</text>
            <text class="set-header-item">休息(秒)</text>
          </view>
          
          <view 
            v-for="(set, setIndex) in exercise.setDetails" 
            :key="setIndex" 
            class="set-item"
          >
            <text class="set-item-value">{{ setIndex + 1 }}</text>
            <text class="set-item-value">{{ set.weight }}</text>
            <text class="set-item-value">{{ set.reps }}</text>
            <text class="set-item-value">{{ set.rest || '-' }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view v-if="trainingDetail.notes" class="notes-section">
      <view class="section-title">训练笔记</view>
      <view class="notes-content">{{ trainingDetail.notes }}</view>
    </view>
    
    <view class="action-buttons">
      <nut-button type="primary" @click="editTraining">编辑记录</nut-button>
      <nut-button type="danger" @click="deleteTraining">删除记录</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const trainingId = router?.params?.id || '';

// 训练详情数据
const trainingDetail = ref({
  id: '',
  title: '',
  type: '',
  date: '',
  duration: 0,
  calories: 0,
  exercises: [],
  notes: ''
});

// 计算总组数
const totalSets = computed(() => {
  let count = 0;
  trainingDetail.value.exercises.forEach(exercise => {
    count += exercise.setDetails.length;
  });
  return count;
});

// 页面加载时获取训练详情
onMounted(() => {
  if (trainingId) {
    fetchTrainingDetail(trainingId);
  } else {
    Taro.showToast({
      title: '训练记录ID不存在',
      icon: 'none'
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }
});

// 获取训练详情
const fetchTrainingDetail = (id) => {
  // 这里应该从服务器获取训练详情，暂时使用模拟数据
  setTimeout(() => {
    // 模拟训练详情数据
    trainingDetail.value = {
      id: id,
      title: '上肢力量训练',
      type: '力量训练',
      date: '2023-04-15',
      duration: 60,
      calories: 320,
      exercises: [
        {
          name: '哑铃卧推',
          setDetails: [
            { weight: '20', reps: '12', rest: '60' },
            { weight: '25', reps: '10', rest: '60' },
            { weight: '30', reps: '8', rest: '60' }
          ]
        },
        {
          name: '引体向上',
          setDetails: [
            { weight: '体重', reps: '8', rest: '90' },
            { weight: '体重', reps: '6', rest: '90' },
            { weight: '体重', reps: '5', rest: '0' }
          ]
        },
        {
          name: '肱二头肌弯举',
          setDetails: [
            { weight: '10', reps: '15', rest: '45' },
            { weight: '12', reps: '12', rest: '45' },
            { weight: '15', reps: '10', rest: '0' }
          ]
        }
      ],
      notes: '今天感觉状态不错，卧推比上次增加了5kg，引体向上也比上次多做了2个。下次可以尝试增加重量。'
    };
  }, 500);
};

// 编辑训练记录
const editTraining = () => {
  Taro.navigateTo({
    url: `/pages/my/training/edit?id=${trainingId}`
  });
};

// 删除训练记录
const deleteTraining = () => {
  Taro.showModal({
    title: '提示',
    content: '确定要删除这条训练记录吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里应该发送删除请求到服务器
        Taro.showLoading({ title: '删除中...' });
        
        // 模拟网络请求
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          });
          
          // 返回上一页
          setTimeout(() => {
            Taro.navigateBack();
          }, 2000);
        }, 1500);
      }
    }
  });
};
</script>

<style lang="scss">
.training-detail-container {
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

.training-info {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .training-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .training-meta {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
    .meta-item {
      font-size: 14px;
      color: #666;
      margin-right: 15px;
      margin-bottom: 5px;
      background-color: #f0f0f0;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
  
  .training-stats {
    display: flex;
    justify-content: space-between;
    
    .stats-card {
      flex: 1;
      text-align: center;
      padding: 10px;
      
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
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.exercise-list {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .exercise-item {
    margin-bottom: 25px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .exercise-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      
      .exercise-name {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
      
      .exercise-sets {
        font-size: 14px;
        color: #666;
        background-color: #f0f0f0;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
    
    .set-list {
      background-color: #f8f8f8;
      border-radius: 8px;
      overflow: hidden;
      
      .set-header {
        display: flex;
        background-color: #eee;
        padding: 10px;
        
        .set-header-item {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          color: #666;
          text-align: center;
        }
      }
      
      .set-item {
        display: flex;
        padding: 12px 10px;
        border-bottom: 1px solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
        
        .set-item-value {
          flex: 1;
          font-size: 14px;
          color: #333;
          text-align: center;
        }
      }
    }
  }
}

.notes-section {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .notes-content {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  
  .nut-button {
    flex: 1;
  }
}
</style>