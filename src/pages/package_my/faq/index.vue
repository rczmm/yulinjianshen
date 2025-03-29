<template>
  <view class="faq-container">
    <view class="page-header">
      <view class="header-title">健身常见问题</view>
    </view>
    
    <view class="search-bar">
      <nut-input 
        v-model="searchKeyword" 
        placeholder="搜索问题" 
        type="text"
        :border="false"
      >
        <template #right>
          <nut-icon name="search"></nut-icon>
        </template>
      </nut-input>
    </view>
    
    <view class="faq-categories">
      <nut-grid :column-num="4">
        <nut-grid-item text="初学者" @click="filterByCategory('beginner')">
          <nut-avatar size="small">
            <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-09-64.png" style="object-fit: fill;"/>
          </nut-avatar>
        </nut-grid-item>
        <nut-grid-item text="饮食营养" @click="filterByCategory('nutrition')">
          <nut-avatar size="small">
            <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-19-64.png" style="object-fit: fill;"/>
          </nut-avatar>
        </nut-grid-item>
        <nut-grid-item text="训练方法" @click="filterByCategory('training')">
          <nut-avatar size="small">
            <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-15-64.png" style="object-fit: fill;"/>
          </nut-avatar>
        </nut-grid-item>
        <nut-grid-item text="器材使用" @click="filterByCategory('equipment')">
          <nut-avatar size="small">
            <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-01-64.png" style="object-fit: fill;"/>
          </nut-avatar>
        </nut-grid-item>
      </nut-grid>
    </view>
    
    <view class="faq-list">
      <nut-collapse v-model="activeNames">
        <nut-collapse-item 
          v-for="(item, index) in filteredFaqList" 
          :key="index" 
          :title="item.question" 
          :name="index"
        >
          <view class="faq-answer">
            <text>{{ item.answer }}</text>
          </view>
          <view class="faq-meta">
            <text class="faq-category">{{ item.category }}</text>
            <text class="faq-helpful">{{ item.helpfulCount }}人觉得有帮助</text>
          </view>
          <view class="faq-actions">
            <nut-button 
              type="primary" 
              size="small" 
              @click.stop="markAsHelpful(index)"
            >有帮助</nut-button>
          </view>
        </nut-collapse-item>
      </nut-collapse>
      
      <view v-if="filteredFaqList.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">没有找到相关问题</view>
      </view>
    </view>
    
    <view class="ask-question">
      <nut-button type="primary" block @click="askNewQuestion">我要提问</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 搜索关键词
const searchKeyword = ref('');

// 当前展开的折叠面板
const activeNames = ref([]);

// 当前选中的分类
const selectedCategory = ref('');

// FAQ列表数据
const faqList = ref([]);

// 根据搜索关键词和分类筛选FAQ列表
const filteredFaqList = computed(() => {
  let result = faqList.value;
  
  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(item => item.categoryKey === selectedCategory.value);
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(item => 
      item.question.toLowerCase().includes(keyword) || 
      item.answer.toLowerCase().includes(keyword)
    );
  }
  
  return result;
});

// 页面加载时获取FAQ列表
onMounted(() => {
  // 这里应该从服务器获取FAQ列表，暂时使用模拟数据
  fetchFaqList();
});

// 获取FAQ列表
const fetchFaqList = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟FAQ数据
    faqList.value = [
      {
        id: '1',
        question: '初学者应该如何开始健身？',
        answer: '初学者可以从简单的有氧运动开始，如快走、慢跑等，每周3-4次，每次30分钟。同时，可以尝试一些基础的力量训练，如俯卧撑、深蹲等。建议在开始前咨询专业教练，制定适合自己的训练计划。',
        category: '初学者指南',
        categoryKey: 'beginner',
        helpfulCount: 156
      },
      {
        id: '2',
        question: '健身前后应该吃什么？',
        answer: '健身前1-2小时可以摄入含有碳水化合物和蛋白质的食物，如全麦面包配鸡胸肉、香蕉等。健身后30分钟内应补充蛋白质和碳水化合物，如蛋白粉、牛奶、水果等，帮助肌肉恢复和生长。',
        category: '饮食营养',
        categoryKey: 'nutrition',
        helpfulCount: 203
      },
      {
        id: '3',
        question: '如何正确做深蹲？',
        answer: '正确的深蹲姿势是：双脚与肩同宽，脚尖略微向外，挺胸收腹，目视前方。下蹲时臀部向后坐，膝盖不要超过脚尖，下蹲到大腿与地面平行或更低。上升时通过脚跟发力，保持核心稳定。初学者可以先不用负重，掌握正确姿势后再逐渐增加重量。',
        category: '训练方法',
        categoryKey: 'training',
        helpfulCount: 178
      },
      {
        id: '4',
        question: '跑步机的正确使用方法是什么？',
        answer: '使用跑步机时，应先站在两侧踏板上，启动后再踏上传送带。跑步时保持身体挺直，目视前方，不要低头看脚或屏幕。手臂自然摆动，不要紧握扶手。结束时，先降低速度，待完全停止后再下机。初学者应从低速开始，逐渐适应后再增加速度和坡度。',
        category: '器材使用',
        categoryKey: 'equipment',
        helpfulCount: 132
      },
      {
        id: '5',
        question: '为什么健身后会肌肉酸痛？',
        answer: '健身后的肌肉酸痛通常是延迟性肌肉酸痛(DOMS)，是由于训练导致的微小肌纤维损伤和炎症反应。这是肌肉适应和生长的正常过程，通常在训练后24-72小时达到峰值。适当的热身、拉伸、按摩和充分休息可以缓解酸痛。如果疼痛剧烈或持续时间过长，应考虑是否训练过度或姿势不正确。',
        category: '初学者指南',
        categoryKey: 'beginner',
        helpfulCount: 145
      },
      {
        id: '6',
        question: '蛋白质的每日摄入量应该是多少？',
        answer: '一般建议，普通成年人每天每公斤体重摄入0.8克蛋白质。对于经常健身的人，特别是进行力量训练的人，建议每天每公斤体重摄入1.6-2.2克蛋白质，以支持肌肉修复和生长。例如，一个70公斤的健身爱好者，每天应摄入约112-154克蛋白质。',
        category: '饮食营养',
        categoryKey: 'nutrition',
        helpfulCount: 189
      },
    ];
  }, 500);
};

// 按分类筛选
const filterByCategory = (category) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = ''; // 再次点击同一分类则取消筛选
  } else {
    selectedCategory.value = category;
  }
};

// 标记为有帮助
const markAsHelpful = (index) => {
  const item = filteredFaqList.value[index];
  const originalIndex = faqList.value.findIndex(faq => faq.id === item.id);
  
  if (originalIndex !== -1) {
    faqList.value[originalIndex].helpfulCount++;
    
    Taro.showToast({
      title: '感谢您的反馈',
      icon: 'success',
      duration: 2000
    });
  }
};

// 提出新问题
const askNewQuestion = () => {
  Taro.navigateTo({
    url: '/pages/my/feedback/index'
  });
};
</script>

<style lang="scss">
.faq-container {
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

.search-bar {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.faq-categories {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.faq-list {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .faq-answer {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 10px;
  }
  
  .faq-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  
  .faq-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .empty-state {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .empty-image {
      width: 120px;
      height: 120px;
      margin-bottom: 15px;
    }
    
    .empty-text {
      font-size: 14px;
      color: #999;
    }
  }
}

.ask-question {
  margin-top: 30px;
}
</style>