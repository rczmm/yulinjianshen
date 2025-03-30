<template>
  <view class="plan-create-container">
    <view class="page-header">
      <view class="header-title">创建健身计划</view>
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
      <nut-button type="default" @click="cancelCreate">取消</nut-button>
      <nut-button type="primary" @click="savePlan">保存计划</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { formatDate, addDays } from '../../../utils/date';

// 计划表单数据
const planForm = ref({
  title: '',
  type: '',
  duration: 8,
  frequency: 4,
  startDate: '',
  endDate: '',
  notes: ''
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
const maxDate = addDays(new Date(),365);

// 日期选择器显示状态
const showDatePicker = ref(false);

// 当前选中的周
const activeWeek = ref(1);

// 生成周数据
const weeks = ref<any[]>([]);

// 初始化周数据
const initWeeks = () => {
  weeks.value = [];
  for (let i = 1; i <= planForm.value.duration; i++) {
    weeks.value.push({
      weekNumber: i,
      days: generateWeekDays()
    });
  }
};

// 生成一周的天数据
const generateWeekDays = () => {
  const days = [];
  const dayNames = ['一', '二', '三', '四', '五', '六', '日'];

  for (let i = 0; i < 7; i++) {
    days.push({
      dayOfWeek: dayNames[i],
      completed: false,
      rest: i >= 5,
      workouts: []
    });
  }

  return days;
};

// 计算当前周的天数据
const currentWeekDays = computed(() => {
  const week = weeks.value.find(w => w.weekNumber === activeWeek.value);
  return week ? week.days : [];
});

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

// 取消创建
const cancelCreate = () => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消创建计划吗？未保存的内容将丢失',
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
    id: Date.now().toString(), // 临时ID
    title: planForm.value.title,
    type: planForm.value.type,
    duration: planForm.value.duration,
    frequency: planForm.value.frequency,
    startDate: planForm.value.startDate,
    endDate: planForm.value.endDate,
    progress: 0,
    active: true,
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
      title: '创建成功',
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

// 页面加载时初始化数据
onMounted(() => {
  initWeeks();
});
</script>

<style lang="scss">
.plan-create-container {
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
