<template>
  <view class="personal-container">
    <view class="page-header">
      <view class="header-title">私教课程</view>
    </view>
    
    <view class="personal-stats">
      <view class="stats-card">
        <view class="stats-value">{{ stats.totalCourses }}</view>
        <view class="stats-label">总课程数</view>
      </view>
      <view class="stats-card">
        <view class="stats-value">{{ stats.completedCourses }}</view>
        <view class="stats-label">已完成</view>
      </view>
      <view class="stats-card">
        <view class="stats-value">{{ stats.remainingCourses }}</view>
        <view class="stats-label">剩余课时</view>
      </view>
    </view>
    
    <view class="course-filter">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="全部" pane-key="all"></nut-tab-pane>
        <nut-tab-pane title="待上课" pane-key="upcoming"></nut-tab-pane>
        <nut-tab-pane title="已完成" pane-key="completed"></nut-tab-pane>
        <nut-tab-pane title="已取消" pane-key="canceled"></nut-tab-pane>
      </nut-tabs>
    </view>
    
    <view class="course-list">
      <view v-if="filteredCourseList.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">暂无私教课程</view>
        <nut-button type="primary" size="small" @click="bookCourse">立即预约</nut-button>
      </view>
      
      <view v-else>
        <view v-for="(course, index) in filteredCourseList" :key="index" class="course-item">
          <view class="course-status" :class="getStatusClass(course.status)">
            {{ getStatusText(course.status) }}
          </view>
          
          <view class="course-header">
            <view class="course-title">{{ course.title }}</view>
            <view class="course-time">{{ course.date }} {{ course.time }}</view>
          </view>
          
          <view class="course-info">
            <view class="info-item">
              <view class="info-label">教练</view>
              <view class="info-value">{{ course.coach }}</view>
            </view>
            <view class="info-item">
              <view class="info-label">地点</view>
              <view class="info-value">{{ course.location }}</view>
            </view>
            <view class="info-item">
              <view class="info-label">课程类型</view>
              <view class="info-value">{{ course.type }}</view>
            </view>
          </view>
          
          <view class="course-actions">
            <nut-button 
              v-if="course.status === 'upcoming'" 
              type="danger" 
              size="small" 
              @click="cancelCourse(course.id)"
            >取消预约</nut-button>
            
            <nut-button 
              v-if="course.status === 'upcoming'" 
              type="primary" 
              size="small" 
              @click="viewCourseDetail(course.id)"
            >查看详情</nut-button>
            
            <nut-button 
              v-if="course.status === 'completed'" 
              type="primary" 
              size="small" 
              @click="rateCourse(course.id)"
            >评价课程</nut-button>
          </view>
        </view>
      </view>
    </view>
    
    <view class="booking-section">
      <view class="section-title">预约新课程</view>
      
      <view class="coach-list">
        <view v-for="(coach, index) in coachList" :key="index" class="coach-item" @click="selectCoach(coach.id)">
          <view class="coach-avatar">
            <image :src="coach.avatar" mode="aspectFill"></image>
          </view>
          <view class="coach-info">
            <view class="coach-name">{{ coach.name }}</view>
            <view class="coach-specialty">{{ coach.specialty }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 活动标签页
const activeTab = ref('all');

// 课程统计数据
const stats = ref({
  totalCourses: 0,
  completedCourses: 0,
  remainingCourses: 0
});

// 课程列表
const courseList = ref([]);

// 教练列表
const coachList = ref([]);

// 根据标签筛选课程
const filteredCourseList = computed(() => {
  if (activeTab.value === 'all') {
    return courseList.value;
  } else {
    return courseList.value.filter(course => course.status === activeTab.value);
  }
});

// 页面加载时获取数据
onMounted(() => {
  // 这里应该从服务器获取数据，暂时使用模拟数据
  fetchCourseData();
  fetchCoachList();
});

// 获取课程数据
const fetchCourseData = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟课程统计数据
    stats.value = {
      totalCourses: 10,
      completedCourses: 6,
      remainingCourses: 4
    };
    
    // 模拟课程列表数据
    courseList.value = [
      {
        id: '1',
        title: '力量训练私教课',
        date: '2023-04-20',
        time: '10:00-11:00',
        coach: '张教练',
        location: 'A区健身房',
        type: '力量训练',
        status: 'upcoming'
      },
      {
        id: '2',
        title: '核心训练私教课',
        date: '2023-04-25',
        time: '15:00-16:00',
        coach: '李教练',
        location: 'B区健身房',
        type: '核心训练',
        status: 'upcoming'
      },
      {
        id: '3',
        title: '有氧训练私教课',
        date: '2023-04-15',
        time: '14:00-15:00',
        coach: '王教练',
        location: 'C区健身房',
        type: '有氧训练',
        status: 'completed'
      },
      {
        id: '4',
        title: '柔韧性训练私教课',
        date: '2023-04-10',
        time: '16:00-17:00',
        coach: '赵教练',
        location: 'D区健身房',
        type: '柔韧性训练',
        status: 'completed'
      },
      {
        id: '5',
        title: '功能性训练私教课',
        date: '2023-04-05',
        time: '11:00-12:00',
        coach: '钱教练',
        location: 'A区健身房',
        type: '功能性训练',
        status: 'canceled'
      }
    ];
  }, 500);
};

// 获取教练列表
const fetchCoachList = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟教练列表数据
    coachList.value = [
      {
        id: '1',
        name: '张教练',
        specialty: '力量训练',
        avatar: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
      },
      {
        id: '2',
        name: '李教练',
        specialty: '核心训练',
        avatar: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
      },
      {
        id: '3',
        name: '王教练',
        specialty: '有氧训练',
        avatar: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
      },
      {
        id: '4',
        name: '赵教练',
        specialty: '柔韧性训练',
        avatar: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
      }
    ];
  }, 500);
};

// 获取状态样式类
const getStatusClass = (status) => {
  switch (status) {
    case 'upcoming':
      return 'status-upcoming';
    case 'completed':
      return 'status-completed';
    case 'canceled':
      return 'status-canceled';
    default:
      return '';
  }
};

// 获取状态文本
const getStatusText = (status) => {
  switch (status) {
    case 'upcoming':
      return '待上课';
    case 'completed':
      return '已完成';
    case 'canceled':
      return '已取消';
    default:
      return '';
  }
};

// 查看课程详情
const viewCourseDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/my/personal/detail?id=${id}`
  });
};

// 取消课程预约
const cancelCourse = (id) => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消这节课程吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里应该发送请求到服务器取消预约
        Taro.showLoading({ title: '取消中...' });
        
        // 模拟网络请求
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title: '已取消预约',
            icon: 'success',
            duration: 2000
          });
          
          // 更新课程状态
          const course = courseList.value.find(item => item.id === id);
          if (course) {
            course.status = 'canceled';
          }
        }, 1000);
      }
    }
  });
};

// 评价课程
const rateCourse = (id) => {
  Taro.navigateTo({
    url: `/pages/my/personal/rate?id=${id}`
  });
};

// 预约新课程
const bookCourse = () => {
  Taro.navigateTo({
    url: '/pages/my/personal/book'
  });
};

// 选择教练
const selectCoach = (id) => {
  Taro.navigateTo({
    url: `/pages/my/personal/book?coachId=${id}`
  });
};
</script>

<style lang="scss">
.personal-container {
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

.personal-stats {
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

.course-filter {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.course-list {
  margin-bottom: 30px;
  
  .empty-state {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
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
  
  .course-item {
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    .course-status {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      
      &.status-upcoming {
        background-color: #e3f2fd;
        color: #2196f3;
      }
      
      &.status-completed {
        background-color: #e8f5e9;
        color: #4caf50;
      }
      
      &.status-canceled {
        background-color: #ffebee;
        color: #f44336;
      }
    }
    
    .course-header {
      margin-bottom: 15px;
      
      .course-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
      
      .course-time {
        font-size: 14px;
        color: #666;
      }
    }
    
    .course-info {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;
      
      .info-item {
        width: 50%;
        margin-bottom: 10px;
        
        .info-label {
          font-size: 14px;
          color: #999;
          margin-bottom: 5px;
        }
        
        .info-value {
          font-size: 14px;
          color: #333;
        }
      }
    }
    
    .course-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.booking-section {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .coach-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    
    .coach-item {
      display: flex;
      align-items: center;
      width: calc(50% - 8px);
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 10px;
      cursor: pointer;
      
      .coach-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        
        image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .coach-info {
        flex: 1;
        
        .coach-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .coach-specialty {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>