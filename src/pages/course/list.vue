<template>
  <view class="course-list-container">
    <nut-searchbar placeholder="搜索课程" v-model="searchValue" @search="onSearch"></nut-searchbar>
    
    <!-- 分类标签 -->
    <view class="category-tabs">
      <nut-tabs v-model="activeCategory" type="smile" title-scroll>
        <nut-tab-pane v-for="(category, index) in categories" :key="index" :title="category.name" :pane-key="category.id">
          <!-- 课程列表 -->
          <view class="course-list">
            <view class="course-item" v-for="(course, idx) in filteredCourses" :key="idx" @click="navToCourseDetail(course.id)">
              <image class="course-image" :src="course.image" mode="aspectFill"></image>
              <view class="course-info">
                <view class="course-title">{{ course.title }}</view>
                <view class="course-meta">
                  <text>{{ course.time }}</text>
                  <text>·</text>
                  <text>{{ course.energy }}</text>
                  <text>·</text>
                  <text>{{ course.level }}</text>
                </view>
              </view>
            </view>
          </view>
        </nut-tab-pane>
      </nut-tabs>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取页面参数
const params = Taro.getCurrentInstance().router?.params;
const categoryFromParams = params?.category || '';

// 搜索相关
const searchValue = ref('');
const onSearch = () => {
  // 根据搜索值过滤课程
  // 实际应用中可能需要调用API进行搜索
};

// 分类数据
const categories = ref([
  { id: 'all', name: '全部' },
  { id: 'fat_loss', name: '减脂减重' },
  { id: 'abs', name: '平坦腹部' },
  { id: 'legs', name: '瘦腿' },
  { id: 'posture', name: '体态' },
  { id: 'postpartum', name: '产后修复' },
]);

// 根据传入的分类参数设置默认选中的分类
const getCategoryIdByName = (name) => {
  const category = categories.value.find(c => c.name === name);
  return category ? category.id : 'all';
};

const activeCategory = ref(getCategoryIdByName(categoryFromParams));

// 课程数据（示例数据，实际应用中应该从API获取）
const courses = ref([
  {
    id: '1',
    category: 'fat_loss',
    title: '减脂五分钟体验课',
    image: 'https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg',
    time: '6分钟',
    energy: '72千卡',
    level: '零基础'
  },
  {
    id: '2',
    category: 'fat_loss',
    title: '全身燃脂训练',
    image: 'https://i0.hdslb.com/bfs/archive/7dc7b2313723603485bf0eef67dd545e5e54e2fa.jpg',
    time: '15分钟',
    energy: '150千卡',
    level: '初级'
  },
  {
    id: '3',
    category: 'abs',
    title: '腹部核心训练',
    image: 'https://i0.hdslb.com/bfs/archive/f8c099661a8ef2f1911b704ab13aa0e295e91227.jpg',
    time: '10分钟',
    energy: '100千卡',
    level: '中级'
  },
  {
    id: '4',
    category: 'legs',
    title: '瘦腿塑形训练',
    image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
    time: '12分钟',
    energy: '120千卡',
    level: '初级'
  },
  {
    id: '5',
    category: 'posture',
    title: '改善体态训练',
    image: 'https://i0.hdslb.com/bfs/archive/4418aeab7541aa0fe0f994295f2e2cbbd66e72da.jpg',
    time: '20分钟',
    energy: '180千卡',
    level: '中级'
  },
  {
    id: '6',
    category: 'postpartum',
    title: '产后恢复训练',
    image: 'https://i1.hdslb.com/bfs/archive/e9e11aec4486da83755028d9e3dc0ad06313dec4.jpg',
    time: '15分钟',
    energy: '130千卡',
    level: '初级'
  }
]);

// 根据当前选中的分类和搜索值过滤课程
const filteredCourses = computed(() => {
  let result = courses.value;
  
  // 按分类筛选
  if (activeCategory.value !== 'all') {
    result = result.filter(course => course.category === activeCategory.value);
  }
  
  // 按搜索值筛选
  if (searchValue.value) {
    const keyword = searchValue.value.toLowerCase();
    result = result.filter(course => 
      course.title.toLowerCase().includes(keyword)
    );
  }
  
  return result;
});

// 跳转到课程详情页
const navToCourseDetail = (courseId) => {
  Taro.navigateTo({
    url: `/pages/course/index?id=${courseId}`
  });
};

// 页面加载时根据参数设置初始状态
onMounted(() => {
  // 如果有搜索参数，设置搜索值
  if (params?.keyword) {
    searchValue.value = params.keyword;
  }
});
</script>

<style lang="scss">
.course-list-container {
  padding-bottom: 20px;
}

.category-tabs {
  margin-top: 10px;
}

.course-list {
  padding: 10px 15px;
}

.course-item {
  display: flex;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.course-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
}

.course-info {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.course-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  
  text {
    margin: 0 3px;
    
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>