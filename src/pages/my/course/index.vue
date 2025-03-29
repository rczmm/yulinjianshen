<template>
  <view class="course-container">
    <view class="page-header">
      <view class="header-title">我的课程</view>
    </view>
    
    <view class="course-filter">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="全部" pane-key="all"></nut-tab-pane>
        <nut-tab-pane title="进行中" pane-key="ongoing"></nut-tab-pane>
        <nut-tab-pane title="已完成" pane-key="completed"></nut-tab-pane>
      </nut-tabs>
    </view>
    
    <view class="course-list">
      <view v-if="courseList.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">暂无课程</view>
        <nut-button type="primary" size="small" @click="browseCourses">去选课</nut-button>
      </view>
      
      <view v-else>
        <view v-for="(course, index) in filteredCourseList" :key="index" class="course-item" @click="viewCourseDetail(course.id)">
          <view class="course-image">
            <image :src="course.image" mode="aspectFill"></image>
            <view class="course-progress" v-if="course.progress < 100">
              <text>{{ course.progress }}%</text>
            </view>
            <view class="course-completed" v-else>
              <text>已完成</text>
            </view>
          </view>
          
          <view class="course-content">
            <view class="course-title">{{ course.title }}</view>
            <view class="course-info">
              <text class="course-teacher">{{ course.teacher }}</text>
              <text class="course-duration">{{ course.duration }}</text>
            </view>
            <view class="course-desc">{{ course.description }}</view>
            
            <view class="course-footer">
              <view class="course-tags">
                <text v-for="(tag, tagIndex) in course.tags" :key="tagIndex" class="tag-item">{{ tag }}</text>
              </view>
              <view class="course-action">
                <nut-button type="primary" size="small" @click.stop="continueCourse(course.id)">继续学习</nut-button>
              </view>
            </view>
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

// 课程列表
const courseList = ref([]);

// 根据标签筛选课程
const filteredCourseList = computed(() => {
  if (activeTab.value === 'all') {
    return courseList.value;
  } else if (activeTab.value === 'ongoing') {
    return courseList.value.filter(course => course.progress < 100);
  } else if (activeTab.value === 'completed') {
    return courseList.value.filter(course => course.progress === 100);
  }
  return courseList.value;
});

// 页面加载时获取课程列表
onMounted(() => {
  // 这里应该从服务器获取课程列表，暂时使用模拟数据
  fetchCourseList();
});

// 获取课程列表
const fetchCourseList = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟课程数据
    courseList.value = [
      {
        id: '1',
        title: '30天健身入门计划',
        teacher: '张教练',
        duration: '30天',
        description: '适合健身新手的入门计划，循序渐进提高身体素质',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        progress: 75,
        tags: ['入门', '全身训练']
      },
      {
        id: '2',
        title: '核心力量训练',
        teacher: '李教练',
        duration: '14天',
        description: '专注于腹部和核心肌群的训练，打造坚实的核心力量',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        progress: 100,
        tags: ['核心', '中级']
      },
      {
        id: '3',
        title: '上肢力量塑造',
        teacher: '王教练',
        duration: '21天',
        description: '针对手臂、肩膀和胸部的综合训练，打造完美上半身',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        progress: 30,
        tags: ['上肢', '中级']
      }
    ];
  }, 500);
};

// 查看课程详情
const viewCourseDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/my/course/detail?id=${id}`
  });
};

// 继续学习课程
const continueCourse = (id) => {
  Taro.navigateTo({
    url: `/pages/my/course/learn?id=${id}`
  });
};

// 浏览课程
const browseCourses = () => {
  Taro.switchTab({
    url: '/pages/course/index'
  });
};
</script>

<style lang="scss">
.course-container {
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

.course-filter {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.course-list {
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
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    .course-image {
      position: relative;
      width: 100%;
      height: 150px;
      
      image {
        width: 100%;
        height: 100%;
      }
      
      .course-progress, .course-completed {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }
      
      .course-progress {
        background-color: rgba(33, 150, 243, 0.8);
        color: #fff;
      }
      
      .course-completed {
        background-color: rgba(76, 175, 80, 0.8);
        color: #fff;
      }
    }
    
    .course-content {
      padding: 15px;
      
      .course-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      
      .course-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        
        .course-teacher, .course-duration {
          font-size: 14px;
          color: #666;
        }
      }
      
      .course-desc {
        font-size: 14px;
        color: #666;
        margin-bottom: 15px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .course-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .course-tags {
          display: flex;
          flex-wrap: wrap;
          
          .tag-item {
            font-size: 12px;
            color: #2196f3;
            background-color: #e3f2fd;
            padding: 2px 6px;
            border-radius: 4px;
            margin-right: 8px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>