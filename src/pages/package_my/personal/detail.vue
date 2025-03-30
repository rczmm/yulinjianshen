<template>
  <view class="detail-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <nut-icon name="left"></nut-icon>
      </view>
      <view class="header-title">课程详情</view>
    </view>

    <view v-if="loading" class="loading-state">
      <nut-icon name="loading" size="30"></nut-icon>
      <text>加载中...</text>
    </view>

    <view v-else-if="!courseDetail" class="error-state">
      <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="error-image"/>
      <view class="error-text">课程信息不存在</view>
      <nut-button type="primary" size="small" @click="goBack">返回列表</nut-button>
    </view>

    <view v-else class="course-detail">
      <view class="course-status" :class="getStatusClass(courseDetail.status)">
        {{ getStatusText(courseDetail.status) }}
      </view>

      <view class="detail-section">
        <view class="section-title">课程信息</view>
        <view class="course-header">
          <view class="course-title">{{ courseDetail.title }}</view>
          <view class="course-time">{{ courseDetail.date }} {{ courseDetail.time }}</view>
        </view>

        <view class="info-grid">
          <view class="info-item" v-for="(item, index) in courseInfoItems" :key="index">
            <view class="info-label">{{ item.label }}</view>
            <view class="info-value">{{ item.value }}</view>
          </view>
        </view>
      </view>

      <view class="detail-section">
        <view class="section-title">教练信息</view>
        <view class="coach-info">
          <view class="coach-avatar">
            <image :src="coachDetail.avatar" mode="aspectFill"></image>
          </view>
          <view class="coach-detail">
            <view class="coach-name">{{ coachDetail.name }}</view>
            <view class="coach-specialty">{{ coachDetail.specialty }}</view>
            <view class="coach-experience">{{ coachDetail.experience || '5年教学经验' }}</view>
          </view>
        </view>
      </view>

      <view class="detail-section">
        <view class="section-title">课程内容</view>
        <view class="course-content">
          <view class="content-text">{{ courseDetail.content || '本课程将针对学员的身体状况和训练目标，制定个性化的训练计划。通过专业的指导和科学的训练方法，帮助学员达到理想的健身效果。课程内容包括热身、主要训练和放松三个部分，全面提升学员的身体素质和健康水平。' }}</view>
        </view>
      </view>

      <view class="detail-section">
        <view class="section-title">上课地点</view>
        <view class="location-info">
          <view class="location-name">{{ courseDetail.location }}</view>
          <view class="location-map">
            <image src="https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg" mode="aspectFill" class="map-image"></image>
          </view>
        </view>
      </view>

      <view class="detail-section" v-if="courseDetail.status === 'upcoming'">
        <view class="action-buttons">
          <nut-button type="danger" size="large" @click="cancelCourse">取消预约</nut-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const courseId = router?.params?.id || '';

// 加载状态
const loading = ref(true);

// 课程详情
const courseDetail = ref<any>(null);

// 教练详情
const coachDetail = ref({
  id: '',
  name: '',
  specialty: '',
  avatar: '',
  experience: ''
});

// 页面加载时获取数据
onMounted(() => {
  fetchCourseDetail();
});

// 获取课程详情
const fetchCourseDetail = () => {
  loading.value = true;

  // 模拟网络请求
  setTimeout(() => {
    // 模拟课程详情数据
    const courseData = {
      id: courseId,
      title: '力量训练私教课',
      date: '2023-04-20',
      time: '10:00-11:00',
      coach: '张教练',
      coachId: '1',
      location: 'A区健身房',
      type: '力量训练',
      status: 'upcoming',
      bookTime: '2023-04-15',
      content: '本课程将针对学员的身体状况和训练目标，制定个性化的训练计划。通过专业的指导和科学的训练方法，帮助学员达到理想的健身效果。'
    };

    courseDetail.value = courseData;

    // 获取教练详情
    fetchCoachDetail(courseData.coachId);

    loading.value = false;
  }, 1000);
};

// 获取教练详情
const fetchCoachDetail = (coachId) => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟教练详情数据
    const coachData = {
      id: coachId,
      name: '张教练',
      specialty: '力量训练',
      avatar: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
      experience: '5年教学经验'
    };

    coachDetail.value = coachData;
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

// 取消课程预约
const cancelCourse = () => {
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
          if (courseDetail.value) {
            courseDetail.value.status = 'canceled';
          }
        }, 1000);
      }
    }
  });
};

// 返回上一页
const goBack = () => {
  Taro.navigateBack();
};
</script>

<style lang="scss">
.detail-container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .back-button {
    margin-right: 10px;
    padding: 5px;
  }

  .header-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;

  .error-image {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }

  .error-text {
    font-size: 16px;
    color: #999;
    margin-bottom: 20px;
  }
}

.course-detail {
  position: relative;
}

.course-status {
  position: absolute;
  top: 0;
  right: 0;
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

.detail-section {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    border-left: 4px solid #2196f3;
    padding-left: 10px;
  }

  .course-header {
    margin-bottom: 15px;

    .course-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .course-time {
      font-size: 14px;
      color: #666;
    }
  }

  .info-grid {
    display: flex;
    flex-wrap: wrap;

    .info-item {
      width: 50%;
      margin-bottom: 15px;

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

  .coach-info {
    display: flex;
    align-items: center;

    .coach-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;

      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .coach-detail {
      flex: 1;

      .coach-name {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }

      .coach-specialty {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }

      .coach-experience {
        font-size: 14px;
        color: #666;
      }
    }
  }

  .course-content {
    .content-text {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  }

  .location-info {
    .location-name {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }

    .location-map {
      width: 100%;
      height: 200px;
      border-radius: 8px;
      overflow: hidden;

      .map-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .action-buttons {
    margin-top: 10px;
  }
}
</style>
