<template>
  <view class="plan-edit-container">
    <view class="page-header">
      <view class="header-title">编辑健身计划</view>
    </view>

    <view class="form-container">
      <nut-form>
        <nut-form-item label="计划名称" required>
          <nut-input v-model="planForm.title" placeholder="请输入计划名称" />
        </nut-form-item>

        <nut-form-item label="计划类型" required>
          <nut-radio-group v-model="planForm.type">
            <nut-radio v-for="option in typeOptions" :key="option.value" :label="option.value">{{ option.text }}</nut-radio>
          </nut-radio-group>
        </nut-form-item>

        <nut-form-item label="计划周期(周)" required>
          <nut-input-number v-model="planForm.duration" min="1" max="52" />
        </nut-form-item>

        <nut-form-item label="训练频率(次/周)" required>
          <nut-input-number v-model="planForm.frequency" min="1" max="7" />
        </nut-form-item>

        <nut-form-item label="开始日期" required>
          <nut-cell @click="showDatePicker = true">
            <view class="date-trigger">{{ planForm.startDate || '请选择开始日期' }}</view>
          </nut-cell>
          <nut-popup v-model:visible="showDatePicker" position="bottom">
            <nut-date-picker 
              :min-date="minDate" 
              :max-date="maxDate" 
              @confirm="onDateConfirm" 
              @close="showDatePicker = false"
            />
          </nut-popup>
        </nut-form-item>

        <nut-form-item label="结束日期">
          <view class="date-display">{{ planForm.endDate || '自动计算' }}</view>
        </nut-form-item>

        <nut-form-item label="计划备注">
          <nut-textarea v-model="planForm.notes" placeholder="请输入计划备注" maxlength="200" />
        </nut-form-item>
      </nut-form>

      <view class="section-title">训练安排</view>

      <view class="week-tabs">
        <nut-tabs v-model="activeWeek">
          <nut-tab-pane
            v-for="week in weeks"
            :key="week.weekNumber"
            :title="'第' + week.weekNumber + '周'"
            :pane-key="week.weekNumber"
          ></nut-tab-pane>
        </nut-tabs>
      </view>

      <view class="day-schedule">
        <view
          v-for="(day, index) in currentWeekDays"
          :key="index"
          class="day-item"
          :class="{'completed': day.completed}"
        >
          <view class="day-header">
            <view class="day-title">{{ '星期' + day.dayOfWeek }}</view>
            <view class="day-status">
              <nut-switch v-model="day.rest" @change="toggleRestDay(day)">休息日</nut-switch>
            </view>
          </view>

          <view class="workout-list" v-if="!day.rest">
            <view v-if="day.workouts.length === 0" class="no-workout">
              <text>暂无训练安排</text>
              <nut-button type="primary" size="small" @click="addWorkout(day)">添加训练</nut-button>
            </view>
            <view v-else>
              <view
                v-for="(workout, wIndex) in day.workouts"
                :key="wIndex"
                class="workout-item"
              >
                <view class="workout-header">
                  <view class="workout-name">
                    <nut-input v-model="workout.name" placeholder="训练名称" />
                  </view>
                  <view class="workout-actions">
                    <nut-button type="primary" size="small" @click="addExercise(workout)">添加动作</nut-button>
                    <nut-button type="danger" size="small" @click="removeWorkout(day, wIndex)">删除</nut-button>
                  </view>
                </view>

                <view class="workout-exercises">
                  <view
                    v-for="(exercise, eIndex) in workout.exercises"
                    :key="eIndex"
                    class="exercise-item"
                  >
                    <view class="exercise-form">
                      <nut-input v-model="exercise.name" placeholder="动作名称" />
                      <view class="exercise-sets">
                        <nut-input-number v-model="exercise.sets" min="1" max="10" /> 组
                      </view>
                      <view class="exercise-reps">
                        <nut-input v-model="exercise.reps" placeholder="次数" /> 次
                      </view>
                      <nut-button type="danger" size="small" @click="removeExercise(workout, eIndex)">删除</nut-button>
                    </view>
                  </view>

                  <view v-if="workout.exercises.length === 0" class="no-exercise">
                    <text>请添加训练动作</text>
                  </view>
                </view>
              </view>

              <view class="add-workout-btn">
                <nut-button type="primary" size="small" @click="addWorkout(day)">添加训练</nut-button>
              </view>
            </view>
          </view>

          <view class="rest-day-info" v-else>
            <text>休息日</text>
          </view>
        </view>
      </view>
    </view>

    <view class="action-buttons">
      <nut-button type="default" @click="cancelEdit">取消</nut-button>
      <nut-button type="primary" @click="savePlan">保存计划</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { formatDate, addDays } from '../../../utils/date';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const planId = router?.params?.id || '';

// 计划表单数据
const planForm = ref({
  id: '',
  title: '',
  type: '',
  duration: 8,
  frequency: 4,
  startDate: '',
  endDate: '',
  notes: '',
  progress: 0,
  active: true
});

// 计划类型选项
const typeOptions = [
  { text: '增肌', value: '增肌' },
  { text: '减脂', value: '减脂' },
  { text: '力量', value: '力量' },
  { text: '耐力', value: '耐力' },
  { text: '塑形', value: '塑形' },
  { text: '康复', value: '康复' }
];

// 日期选择器配置
const minDate = new Date();
const maxDate = addDays(new Date(), 365);

// 日期选择器显示状态
const showDatePicker = ref(false);

// 当前选中的周
const activeWeek = ref(1);

// 周数据
const weeks = ref([]);

// 计算当前周的天数据
const currentWeekDays = computed(() => {
  const week = weeks.value.find(w => w.weekNumber === activeWeek.value);
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
    const planDetail = {
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
      ]
    };

    // 填充表单数据
    planForm.value = {
      id: planDetail.id,
      title: planDetail.title,
      type: planDetail.type,
      duration: planDetail.duration,
      frequency: planDetail.frequency,
      startDate: planDetail.startDate,
      endDate: planDetail.endDate,
      notes: planDetail.notes,
      progress: planDetail.progress,
      active: planDetail.active
    };

    // 填充周数据
    weeks.value = planDetail.weeks;
  }, 500);
};

// 开始日期确认回调
const onDateConfirm = (date) => {
  console.log('日期选择器确认回调:', date);
  
  try {
    // 检查date对象的结构
    if (date && date.selectedValue && Array.isArray(date.selectedValue) && date.selectedValue.length >= 3) {
      // 使用formatDate函数确保日期格式统一为yyyy-mm-dd
      const year = date.selectedValue[0];
      const month = date.selectedValue[1];
      const day = date.selectedValue[2];
      
      // 创建日期对象并格式化
      const selectedDate = new Date(year, month - 1, day);
      
      // 检查日期是否有效
      if (!isNaN(selectedDate.getTime())) {
        planForm.value.startDate = formatDate(selectedDate);
        console.log('更新后的开始日期:', planForm.value.startDate);
        
        // 计算结束日期
        if (planForm.value.startDate) {
          const startDate = new Date(planForm.value.startDate);
          const endDate = addDays(startDate, planForm.value.duration * 7 - 1);
          planForm.value.endDate = formatDate(endDate);
          console.log('更新后的结束日期:', planForm.value.endDate);
        }
      } else {
        console.error('无效的日期对象:', selectedDate);
      }
    } else {
      // 尝试直接使用date作为日期字符串
      console.log('使用备选方法处理日期');
      planForm.value.startDate = typeof date === 'string' ? date : formatDate(new Date(date));
      console.log('备选方法更新后的开始日期:', planForm.value.startDate);
      
      // 计算结束日期
      if (planForm.value.startDate) {
        const startDate = new Date(planForm.value.startDate);
        const endDate = addDays(startDate, planForm.value.duration * 7 - 1);
        planForm.value.endDate = formatDate(endDate);
      }
    }
  } catch (error) {
    console.error('日期处理出错:', error);
  }
  
  showDatePicker.value = false;
};

// 切换休息日状态
const toggleRestDay = (day) => {
  if (day.rest) {
    // 如果设为休息日，清空训练
    day.workouts = [];
  }
};

// 添加训练
const addWorkout = (day) => {
  day.workouts.push({
    name: '',
    exercises: []
  });
};

// 移除训练
const removeWorkout = (day, index) => {
  day.workouts.splice(index, 1);
};

// 添加训练动作
const addExercise = (workout) => {
  workout.exercises.push({
    name: '',
    sets: 3,
    reps: '8-12'
  });
};

// 移除训练动作
const removeExercise = (workout, index) => {
  workout.exercises.splice(index, 1);
};

// 取消编辑
const cancelEdit = () => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消编辑吗？未保存的修改将丢失',
    success: function (res) {
      if (res.confirm) {
        Taro.navigateBack();
      }
    }
  });
};

// 保存计划
const savePlan = () => {
  // 表单验证
  if (!planForm.value.title) {
    return Taro.showToast({
      title: '请输入计划名称',
      icon: 'none'
    });
  }

  if (!planForm.value.type) {
    return Taro.showToast({
      title: '请选择计划类型',
      icon: 'none'
    });
  }

  if (!planForm.value.startDate) {
    return Taro.showToast({
      title: '请选择开始日期',
      icon: 'none'
    });
  }

  // 构建计划数据
  const planData = {
    id: planForm.value.id,
    title: planForm.value.title,
    type: planForm.value.type,
    duration: planForm.value.duration,
    frequency: planForm.value.frequency,
    startDate: planForm.value.startDate,
    endDate: planForm.value.endDate,
    progress: planForm.value.progress,
    active: planForm.value.active,
    notes: planForm.value.notes,
    weeks: weeks.value,
    tags: generateTags()
  };

  // 这里应该发送请求到服务器保存计划
  Taro.showLoading({ title: '保存中...' });

  // 模拟网络请求
  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });

    // 返回上一页
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }, 1500);
};

// 生成标签
const generateTags = () => {
  const tags = [];
  if (planForm.value.type) {
    tags.push(planForm.value.type);
  }

  // 分析训练内容，提取常见训练部位作为标签
  const bodyParts = new Set();
  weeks.value.forEach(week => {
    week.days.forEach(day => {
      if (!day.rest) {
        day.workouts.forEach(workout => {
          // 从训练名称中提取可能的身体部位
          const name = workout.name.toLowerCase();
          if (name.includes('胸')) bodyParts.add('胸肌');
          if (name.includes('背')) bodyParts.add('背部');
          if (name.includes('腿')) bodyParts.add('腿部');
          if (name.includes('肩')) bodyParts.add('肩部');
          if (name.includes('臂') || name.includes('二头') || name.includes('三头')) bodyParts.add('手臂');
          if (name.includes('腹')) bodyParts.add('腹肌');
        });
      }
    });
  });

  // 将提取的身体部位添加到标签中
  bodyParts.forEach(part => tags.push(part));

  return tags.slice(0, 3); // 最多返回3个标签
};
</script>

<style lang="scss">
.plan-edit-container {
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

.form-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.date-trigger {
  padding: 10px 0;
  color: #666;
}

.date-display {
  padding: 10px 0;
  color: #666;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 30px 0 15px;
}

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
      .no-workout {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        gap: 10px;

        text {
          font-size: 14px;
          color: #999;
        }
      }

      .workout-item {
        margin-bottom: 20px;
        background-color: #fff;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

        &:last-child {
          margin-bottom: 15px;
        }

        .workout-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;

          .workout-name {
            flex: 1;
          }

          .workout-actions {
            display: flex;
            gap: 10px;
          }
        }

        .workout-exercises {
          .exercise-item {
            margin-bottom: 10px;

            .exercise-form {
              display: flex;
              align-items: center;
              gap: 10px;
              flex-wrap: wrap;

              .nut-input {
                flex: 1;
                min-width: 120px;
              }

              .exercise-sets, .exercise-reps {
                display: flex;
                align-items: center;
                white-space: nowrap;
              }
            }
          }

          .no-exercise {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #999;
          }
        }
      }

      .add-workout-btn {
        display: flex;
        justify-content: center;
      }
    }

    .rest-day-info {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #999;
    }
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
