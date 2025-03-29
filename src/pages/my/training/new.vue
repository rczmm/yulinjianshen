<template>
  <view class="new-training-container">
    <view class="page-header">
      <view class="header-title">新增训练记录</view>
    </view>
    
    <view class="training-form">
      <nut-form>
        <!-- 训练标题 -->
        <nut-form-item label="训练标题">
          <nut-input 
            v-model="trainingData.title" 
            placeholder="请输入训练标题" 
            type="text"
          />
        </nut-form-item>
        
        <!-- 训练类型 -->
        <nut-form-item label="训练类型">
          <nut-radio-group v-model="trainingData.type">
            <nut-radio label="力量训练">力量训练</nut-radio>
            <nut-radio label="有氧训练">有氧训练</nut-radio>
            <nut-radio label="拉伸放松">拉伸放松</nut-radio>
            <nut-radio label="混合训练">混合训练</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        
        <!-- 训练日期 -->
        <nut-form-item label="训练日期">
          <nut-cell @click="showDatePicker = true">
            <view>{{ trainingData.date || '请选择日期' }}</view>
          </nut-cell>
          <nut-calendar 
            v-model:visible="showDatePicker" 
            :default-value="trainingData.date" 
            @confirm="onDateConfirm"
          />
        </nut-form-item>
        
        <!-- 训练时长 -->
        <nut-form-item label="训练时长(分钟)">
          <nut-input 
            v-model="trainingData.duration" 
            placeholder="请输入训练时长" 
            type="number"
          />
        </nut-form-item>
        
        <!-- 消耗热量 -->
        <nut-form-item label="消耗热量(千卡)">
          <nut-input 
            v-model="trainingData.calories" 
            placeholder="请输入消耗热量" 
            type="number"
          />
        </nut-form-item>
      </nut-form>
      
      <!-- 训练内容 -->
      <view class="exercise-section">
        <view class="section-header">
          <view class="section-title">训练内容</view>
          <nut-button type="primary" size="small" @click="addExercise">添加动作</nut-button>
        </view>
        
        <view v-if="trainingData.exercises.length === 0" class="empty-exercises">
          <view class="empty-text">请添加训练动作</view>
        </view>
        
        <view v-else class="exercise-list">
          <view v-for="(exercise, index) in trainingData.exercises" :key="index" class="exercise-item">
            <view class="exercise-header">
              <view class="exercise-name">{{ exercise.name }}</view>
              <view class="exercise-actions">
                <nut-button type="primary" size="mini" @click="addSet(index)">添加组数</nut-button>
                <nut-button type="danger" size="mini" @click="removeExercise(index)">删除</nut-button>
              </view>
            </view>
            
            <view class="set-list">
              <view v-for="(set, setIndex) in exercise.setDetails" :key="setIndex" class="set-item">
                <view class="set-number">{{ setIndex + 1 }}</view>
                <view class="set-input">
                  <nut-input 
                    v-model="set.weight" 
                    placeholder="重量(kg)" 
                    type="number"
                  />
                </view>
                <view class="set-input">
                  <nut-input 
                    v-model="set.reps" 
                    placeholder="次数" 
                    type="number"
                  />
                </view>
                <view class="set-input" v-if="setIndex < exercise.setDetails.length - 1">
                  <nut-input 
                    v-model="set.rest" 
                    placeholder="休息(秒)" 
                    type="number"
                  />
                </view>
                <view class="set-action">
                  <nut-button type="danger" size="mini" @click="removeSet(index, setIndex)">删除</nut-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 训练笔记 -->
      <view class="notes-section">
        <view class="section-title">训练笔记</view>
        <nut-textarea 
          v-model="trainingData.notes" 
          placeholder="记录今天的训练感受、进步或需要改进的地方..." 
          max-length="200"
        />
      </view>
      
      <view class="form-actions">
        <nut-button type="primary" block @click="saveTraining">保存记录</nut-button>
      </view>
    </view>
    
    <!-- 添加动作弹窗 -->
    <nut-popup v-model:visible="showExercisePopup" position="bottom">
      <view class="popup-container">
        <view class="popup-header">
          <view class="popup-title">添加训练动作</view>
          <nut-icon name="close" @click="showExercisePopup = false"></nut-icon>
        </view>
        
        <view class="popup-content">
          <nut-form>
            <nut-form-item label="动作名称">
              <nut-input 
                v-model="newExercise.name" 
                placeholder="请输入动作名称" 
                type="text"
              />
            </nut-form-item>
          </nut-form>
          
          <view class="common-exercises">
            <view class="section-title">常用动作</view>
            <view class="exercise-tags">
              <text 
                v-for="(item, index) in commonExercises" 
                :key="index" 
                class="exercise-tag" 
                @click="selectCommonExercise(item)"
              >{{ item }}</text>
            </view>
          </view>
          
          <view class="popup-actions">
            <nut-button type="primary" block @click="confirmAddExercise">确认添加</nut-button>
          </view>
        </view>
      </view>
    </nut-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';

// 日期选择器显示状态
const showDatePicker = ref(false);

// 添加动作弹窗显示状态
const showExercisePopup = ref(false);

// 训练数据
const trainingData = ref({
  title: '',
  type: '力量训练',
  date: formatDate(new Date()),
  duration: '',
  calories: '',
  exercises: [],
  notes: ''
});

// 新动作数据
const newExercise = ref({
  name: ''
});

// 常用动作列表
const commonExercises = ref([
  '深蹲', '硬拉', '卧推', '引体向上', '俯卧撑', '肩推', '划船', 
  '二头弯举', '三头下压', '腿举', '小腿提踵', '平板支撑', '仰卧起坐',
  '跑步', '单车', '椭圆机', '跳绳', '游泳', '瑜伽', '普拉提'
]);

// 格式化日期
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 日期确认回调
const onDateConfirm = (date) => {
  trainingData.value.date = date;
  showDatePicker.value = false;
};

// 添加训练动作
const addExercise = () => {
  newExercise.value.name = '';
  showExercisePopup.value = true;
};

// 选择常用动作
const selectCommonExercise = (exercise) => {
  newExercise.value.name = exercise;
};

// 确认添加动作
const confirmAddExercise = () => {
  if (!newExercise.value.name) {
    Taro.showToast({
      title: '请输入动作名称',
      icon: 'none'
    });
    return;
  }
  
  trainingData.value.exercises.push({
    name: newExercise.value.name,
    setDetails: [
      { weight: '', reps: '', rest: '60' }
    ]
  });
  
  showExercisePopup.value = false;
};

// 移除训练动作
const removeExercise = (index) => {
  trainingData.value.exercises.splice(index, 1);
};

// 添加组数
const addSet = (exerciseIndex) => {
  trainingData.value.exercises[exerciseIndex].setDetails.push({
    weight: '',
    reps: '',
    rest: '60'
  });
};

// 移除组数
const removeSet = (exerciseIndex, setIndex) => {
  if (trainingData.value.exercises[exerciseIndex].setDetails.length > 1) {
    trainingData.value.exercises[exerciseIndex].setDetails.splice(setIndex, 1);
  } else {
    Taro.showToast({
      title: '至少保留一组',
      icon: 'none'
    });
  }
};

// 保存训练记录
const saveTraining = () => {
  // 表单验证
  if (!trainingData.value.title) {
    Taro.showToast({
      title: '请输入训练标题',
      icon: 'none'
    });
    return;
  }
  
  if (!trainingData.value.duration) {
    Taro.showToast({
      title: '请输入训练时长',
      icon: 'none'
    });
    return;
  }
  
  if (trainingData.value.exercises.length === 0) {
    Taro.showToast({
      title: '请添加训练动作',
      icon: 'none'
    });
    return;
  }
  
  // 检查每个动作的组数是否填写完整
  let isValid = true;
  trainingData.value.exercises.forEach((exercise) => {
    exercise.setDetails.forEach((set) => {
      if (!set.weight || !set.reps) {
        isValid = false;
      }
    });
  });
  
  if (!isValid) {
    Taro.showToast({
      title: '请完善训练动作的重量和次数',
      icon: 'none'
    });
    return;
  }
  
  // 提交数据
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
</script>

<style lang="scss">
.new-training-container {
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

.training-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.exercise-section {
  margin-top: 30px;
  margin-bottom: 30px;
  
  .empty-exercises {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    
    .empty-text {
      font-size: 16px;
      color: #999;
    }
  }
  
  .exercise-list {
    .exercise-item {
      margin-bottom: 20px;
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 15px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .exercise-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        
        .exercise-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        
        .exercise-actions {
          display: flex;
          gap: 10px;
        }
      }
      
      .set-list {
        .set-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .set-number {
            width: 30px;
            font-size: 14px;
            font-weight: bold;
            color: #333;
            text-align: center;
          }
          
          .set-input {
            flex: 1;
            margin: 0 5px;
          }
          
          .set-action {
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.notes-section {
  margin-bottom: 30px;
}

.form-actions {
  margin-top: 30px;
}

.popup-container {
  padding: 20px;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    .