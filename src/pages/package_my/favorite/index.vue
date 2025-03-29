<template>
  <view class="favorite-container">
    <view class="page-header">
      <view class="header-title">我的收藏</view>
    </view>
    
    <view class="favorite-filter">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="课程" pane-key="course"></nut-tab-pane>
        <nut-tab-pane title="动作" pane-key="exercise"></nut-tab-pane>
        <nut-tab-pane title="文章" pane-key="article"></nut-tab-pane>
      </nut-tabs>
    </view>
    
    <view class="favorite-list">
      <!-- 课程收藏 -->
      <view v-if="activeTab === 'course'">
        <view v-if="courseList.length === 0" class="empty-state">
          <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
          <view class="empty-text">暂无收藏课程</view>
          <nut-button type="primary" size="small" @click="browseCourses">去浏览课程</nut-button>
        </view>
        
        <view v-else>
          <view v-for="(course, index) in courseList" :key="index" class="course-item" @click="viewCourseDetail(course.id)">
            <view class="course-image">
              <image :src="course.image" mode="aspectFill"></image>
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
                  <nut-button type="danger" size="small" @click.stop="removeFavorite(course.id, 'course')">取消收藏</nut-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 动作收藏 -->
      <view v-if="activeTab === 'exercise'">
        <view v-if="exerciseList.length === 0" class="empty-state">
          <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
          <view class="empty-text">暂无收藏动作</view>
          <nut-button type="primary" size="small" @click="browseExercises">去浏览动作</nut-button>
        </view>
        
        <view v-else>
          <view v-for="(exercise, index) in exerciseList" :key="index" class="exercise-item" @click="viewExerciseDetail(exercise.id)">
            <view class="exercise-image">
              <image :src="exercise.image" mode="aspectFill"></image>
            </view>
            
            <view class="exercise-content">
              <view class="exercise-title">{{ exercise.name }}</view>
              <view class="exercise-info">
                <text class="exercise-target">{{ exercise.target }}</text>
                <text class="exercise-level">{{ exercise.level }}</text>
              </view>
              
              <view class="exercise-footer">
                <view class="exercise-tags">
                  <text v-for="(tag, tagIndex) in exercise.tags" :key="tagIndex" class="tag-item">{{ tag }}</text>
                </view>
                <view class="exercise-action">
                  <nut-button type="danger" size="small" @click.stop="removeFavorite(exercise.id, 'exercise')">取消收藏</nut-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 文章收藏 -->
      <view v-if="activeTab === 'article'">
        <view v-if="articleList.length === 0" class="empty-state">
          <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
          <view class="empty-text">暂无收藏文章</view>
          <nut-button type="primary" size="small" @click="browseArticles">去浏览文章</nut-button>
        </view>
        
        <view v-else>
          <view v-for="(article, index) in articleList" :key="index" class="article-item" @click="viewArticleDetail(article.id)">
            <view class="article-image">
              <image :src="article.image" mode="aspectFill"></image>
            </view>
            
            <view class="article-content">
              <view class="article-title">{{ article.title }}</view>
              <view class="article-info">
                <text class="article-author">{{ article.author }}</text>
                <text class="article-date">{{ article.date }}</text>
              </view>
              <view class="article-desc">{{ article.summary }}</view>
              
              <view class="article-footer">
                <view class="article-tags">
                  <text v-for="(tag, tagIndex) in article.tags" :key="tagIndex" class="tag-item">{{ tag }}</text>
                </view>
                <view class="article-action">
                  <nut-button type="danger" size="small" @click.stop="removeFavorite(article.id, 'article')">取消收藏</nut-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 活动标签页
const activeTab = ref('course');

// 收藏列表
const courseList = ref([]);
const exerciseList = ref([]);
const articleList = ref([]);

// 页面加载时获取收藏列表
onMounted(() => {
  // 这里应该从服务器获取收藏列表，暂时使用模拟数据
  fetchFavoriteList();
});

// 获取收藏列表
const fetchFavoriteList = () => {
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
        tags: ['入门', '全身训练']
      },
      {
        id: '2',
        title: '核心力量训练',
        teacher: '李教练',
        duration: '14天',
        description: '专注于腹部和核心肌群的训练，打造坚实的核心力量',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        tags: ['核心', '中级']
      }
    ];
    
    // 模拟动作数据
    exerciseList.value = [
      {
        id: '1',
        name: '杠铃深蹲',
        target: '腿部',
        level: '中级',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        tags: ['力量', '复合动作']
      },
      {
        id: '2',
        name: '哑铃卧推',
        target: '胸部',
        level: '初级',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        tags: ['力量', '上肢']
      }
    ];
    
    // 模拟文章数据
    articleList.value = [
      {
        id: '1',
        title: '如何科学增肌：从零开始的增肌指南',
        author: '健身专家',
        date: '2023-04-10',
        summary: '本文详细介绍了增肌的科学原理和实践方法，适合健身新手阅读',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        tags: ['增肌', '科普']
      },
      {
        id: '2',
        title: '健身饮食指南：如何合理安排一日三餐',
        author: '营养师',
        date: '2023-04-05',
        summary: '合理的饮食是健身成功的一半，本文将教你如何科学安排饮食计划',
        image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        tags: ['饮食', '营养']
      }
    ];
  }, 500);
};

// 查看课程详情
const viewCourseDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/course/index?id=${id}`
  });
};

// 查看动作详情
const viewExerciseDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/exercise/index?id=${id}`
  });
};

// 查看文章详情
const viewArticleDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/article/index?id=${id}`
  });
};

// 移除收藏
const removeFavorite = (id, type) => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消收藏吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里应该发送请求到服务器取消收藏
        Taro.showLoading({ title: '取消中...' });
        
        // 模拟网络请求
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 2000
          });
          
          // 从列表中移除
          if (type === 'course') {
            courseList.value = courseList.value.filter(item => item.id !== id);
          } else if (type === 'exercise') {
            exerciseList.value = exerciseList.value.filter(item => item.id !== id);
          } else if (type === 'article') {
            articleList.value = articleList.value.filter(item => item.id !== id);
          }
        }, 1000);
      }
    }
  });
};

// 浏览课程
const browseCourses = () => {
  Taro.switchTab({
    url: '/pages/course/index'
  });
};

// 浏览动作
const browseExercises = () => {
  Taro.navigateTo({
    url: '/pages/exercise/list'
  });
};

// 浏览文章
const browseArticles = () => {
  Taro.navigateTo({
    url: '/pages/article/list'
  });
};
</script>

<style lang="scss">
.favorite-container {
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

.favorite-filter {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.favorite-list {
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
  
  .course-item, .exercise-item, .article-item {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    
    .course-image, .exercise-image, .article-image {
      width: 100%;
      height: 150px;
      
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    .course-content, .exercise-content, .article-content {
      padding: 15px;
      
      .course-title, .exercise-title, .article-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      
      .course-info, .exercise-info, .article-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        
        .course-teacher, .exercise-target, .article-author,
        .course-duration, .exercise-level, .article-date {
          font-size: 14px;
          color: #666;
        }
      }
      
      .course-desc, .article-desc {
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
      
      .course-footer, .exercise-footer, .article-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .course-tags, .exercise-tags, .article-tags {
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