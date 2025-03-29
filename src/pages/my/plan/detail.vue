<template>
  <view class="plan-detail-container">
    <view class="page-header">
      <view class="header-title">计划详情</view>
    </view>
    
    <view class="plan-info">
      <view class="plan-title">{{ planDetail.title }}</view>
      <view class="plan-meta">
        <text class="meta-item">{{ planDetail.duration }}周</text>
        <text class="meta-item">{{ planDetail.frequency }}次/周</text>
        <text class="meta-item">{{ planDetail.type }}</text>
      </view>
      
      <view class="plan-progress">
        <view class="progress-header">
          <text>完成进度</text>
          <text>{{ planDetail.progress }}%</text>
        </view>
        <nut-progress percentage="planDetail.progress" stroke-color="#2196f3"></nut-progress>
      </view>
      
      <view class="plan-date">
        <text>开始日期: {{ planDetail.startDate }}</text>
        <text>结束日期: {{ planDetail.endDate }}</text>
      </view>
      
      <view class="plan-status">
        <text>状态: {{ planDetail.active ? '进行中' : '已完成' }}</text>
        <nut-switch v-model="planDetail.active" @change="togglePlanStatus"></nut-switch>
      </view>
    </view>
    
    <view class="plan-schedule">
      <view class="section-title">训练安排</view>
      
      <view class="week-tabs">
        <nut-tabs v-model="activeWeek">
          <nut-tab-pane 
            v-for="week in planDetail.weeks" 
            :key="week.weekNumber" 
            :title="'第' + week.weekNumber + '周'" 
            :pane-key="week.weekNumber"
          ></nut-tab-pane>
        </nut-tabs>
      </view>
      
      <view class="day-schedule">
        <view 
          v-for="(day, index) in currentWeekSchedule" 
          :key="index" 
          class="day-item"
          :class="{'completed': day.completed}"
        >
          <view class="day-header">
            <view class="day-title">{{ '星期' + day.dayOfWeek }}</view>
            <view class="day-status">
              <nut-checkbox v-model="day.completed" @change="updateDayStatus(day)">完成</nut-checkbox>
            </view>
          </view>
          
          <view class="workout-list">
            <view v-if="day.rest" class="rest-day">
              <text>休息日</text>
            </view>
            <view v-else-if="day.workouts.length === 0" class="no-workout">
              <text>暂无训练安排</text>
            </view>
            <view v-else>
              <view 
                v-for="(workout, wIndex) in day.workouts" 
                :key="wIndex" 
                class="workout-item"
              >
                <view class="workout-name">{{ workout.name }}</view>
                <view class="workout-exercises">
                  <text 
                    v-for="(exercise, eIndex) in workout.exercises" 
                    :key="eIndex" 
                    class="exercise-tag"
                  >{{ exercise.name }} {{ exercise.sets }}组×{{ exercise.reps }}次</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="plan-notes" v-if="planDetail.notes">
      <view class="section-title">计划备注</view>
      <view class="notes-content">{{ planDetail.notes }}</view>
    </view>
    
    <view class="action-buttons">
      <nut-button type="primary" @click="editPlan">编辑计划</nut-button>
      <nut-button type="danger" @click="deletePlan">删除计划</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const planId = router?.params?.id || '';

// 当前选中的周
const activeWeek = ref(1);

// 计划详情数据
const planDetail = ref({
  id: '',
  title: '',
  type: '',
  duration: 0,
  frequency: 0,
  startDate: '',
  endDate: '',
  progress: 0,
  active: true,
  notes: '',
  weeks: []
});

// 计算当前周的训练安排
const currentWeekSchedule = computed(() => {
  const week = planDetail.value.weeks.find(w => w.weekNumber === activeWeek.value);
  return week ? week.days : [];
});

// 页面加载时获取计划详情
onMounted(() => {
  if (planId) {
    fetchPlanDetail(planId);
  } else {
    Taro.showToast({
      title: '计划ID不存在',
      icon: 'none'
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }
});

// 获取计划详情
const fetchPlanDetail = (id) => {
  // 这里应该从服务器获取计划详情，暂时使用模拟数据
  setTimeout(() => {
    // 模拟计划详情数据
    planDetail.value = {
      id: id,
      title: '增肌计划',
      type: '力量训练',
      duration: 8,
      frequency: 4,
      startDate: '2023-04-01',
      endDate: '2023-05-26',
      progress: 65,
      active: true,
      notes: '这是一个为期8周的增肌计划，每周训练4次，主要针对全身肌肉群进行训练。',
      weeks: [
        {
          weekNumber: 1,
          days: [
            {
              dayOfWeek: '一',
              completed: true,
              rest: false,
              workouts: [
                {
                  name: '胸部和三头肌',
                  exercises: [
                    { name: '杠铃卧推', sets: 4, reps: '8-10' },
                    { name: '哑铃飞鸟', sets: 3, reps: '12-15' },
                    { name: '绳索下压', sets: 3, reps: '12-15' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '二',
              completed: true,
              rest: false,
              workouts: [
                {
                  name: '背部和二头肌',
                  exercises: [
                    { name: '引体向上', sets: 4, reps: '6-8' },
                    { name: '杠铃划船', sets: 3, reps: '8-10' },
                    { name: '哑铃弯举', sets: 3, reps: '10-12' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '三',
              completed: true,
              rest: true,
              workouts: []
            },
            {
              dayOfWeek: '四',
              completed: true,
              rest: false,
              workouts: [
                {
                  name: '腿部',
                  exercises: [
                    { name: '杠铃深蹲', sets: 4, reps: '8-10' },
                    { name: '腿举', sets: 3, reps: '10-12' },
                    { name: '小腿提踵', sets: 3, reps: '15-20' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '五',
              completed: true,
              rest: false,
              workouts: [
                {
                  name: '肩部和腹肌',
                  exercises: [
                    { name: '杠铃肩推', sets: 4, reps: '8-10' },
                    { name: '侧平举', sets: 3, reps: '12-15' },
                    { name: '卷腹', sets: 3, reps: '15-20' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '六',
              completed: false,
              rest: true,
              workouts: []
            },
            {
              dayOfWeek: '日',
              completed: false,
              rest: true,
              workouts: []
            }
          ]
        },
        {
          weekNumber: 2,
          days: [
            {
              dayOfWeek: '一',
              completed: false,
              rest: false,
              workouts: [
                {
                  name: '胸部和三头肌',
                  exercises: [
                    { name: '哑铃卧推', sets: 4, reps: '8-10' },
                    { name: '上斜卧推', sets: 3, reps: '10-12' },
                    { name: '窄距卧推', sets: 3, reps: '10-12' }
                  ]
                }
              ]
            },
            // 其他天的数据省略...
            {
              dayOfWeek: '二',
              completed: false,
              rest: false,
              workouts: [
                {
                  name: '背部和二头肌',
                  exercises: [
                    { name: '杠铃划船', sets: 4, reps: '8-10' },
                    { name: '单臂哑铃划船', sets: 3, reps: '10-12' },
                    { name: '锤式弯举', sets: 3, reps: '10-12' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '三',
              completed: false,
              rest: true,
              workouts: []
            },
            {
              dayOfWeek: '四',
              completed: false,
              rest: false,
              workouts: [
                {
                  name: '腿部',
                  exercises: [
                    { name: '保加利亚深蹲', sets: 3, reps: '10-12' },
                    { name: '腿弯举', sets: 3, reps: '10-12' },
                    { name: '坐姿小腿提踵', sets: 3, reps: '15-20' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '五',
              completed: false,
              rest: false,
              workouts: [
                {
                  name: '肩部和腹肌',
                  exercises: [
                    { name: '阿诺德推举', sets: 3, reps: '10-12' },
                    { name: '前平举', sets: 3, reps: '12-15' },
                    { name: '俄罗斯转体', sets: 3, reps: '15-20' }
                  ]
                }
              ]
            },
            {
              dayOfWeek: '六',
              completed: false,
              rest: true,
              workouts: []
            },
            {
              dayOfWeek: '日',
              completed: false,
              rest: true,
              workouts: []
            }
          ]
        }
        // 其他周的数据省略...
      ]
    };
  }, 500);
};

// 切换计划状态
const togglePlanStatus = () => {
  // 这里应该发送请求到服务器更新计划状态
  Taro.showToast({
    title: planDetail.value.active ? '计划已激活' : '计划已暂停',
    icon: 'success'
  });
};

// 更新训练日状态
const updateDayStatus = (day) => {
  // 这里应该发送请求到服务器更新训练日状态
  // 更新进度
  calculateProgress();
};

// 计算进度
const calculateProgress = () => {
  let totalDays = 0;
  let completedDays = 0;
  
  planDetail.value.weeks.forEach(week => {
    week.days.forEach(day => {
      if (!day.rest) {
        totalDays++;
        if (day.completed) {
          completedDays++;
        }
      }
    });
  });
  
  planDetail.value.progress = Math.round((completedDays / totalDays) * 100);
};

// 编辑计划
const editPlan = () => {
  Taro.navigateTo({
    url: `/pages/my/plan/edit?id=${planId}`
  });
};

// 删除计划
const deletePlan = () => {
  Taro.showModal({
    title: '提示',
    content: '确定要删除这个健身计划吗？',
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
.plan-detail-container {
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

.plan-info {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .plan-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
  
  .plan-meta {
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
  
  .plan-progress {
    margin-bottom: 20px;
    
    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 14px;
      color: #666;
    }
  }
  
  .plan-date {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    
    text {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }
  }
  
  .plan-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    text {
      font-size: 14px;
      color: #666;
    }
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.plan-schedule {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .week-tabs {
    margin-bottom: 20px;
  }
  
  .day-schedule {
    .day-item {
      margin-bottom: 20px;
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 15px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &.completed {
        border-left: 4px solid #4caf50;
      }
      
      .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        
        .day-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
      }
      
      .workout-list {
        .rest-day, .no-workout {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #999;
        }
        
        .workout-item {
          margin-bottom: 15px;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .workout-name {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }
          
          .workout-exercises {
            display: flex;
            flex-wrap: wrap;
            
            .exercise-tag {
              font-size: 12px;
              color: #666;
              background-color: #e6f7ff;
              padding: 4px 8px;
              border-radius: 4px;
              margin-right: 8px;
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}

.plan-notes {
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