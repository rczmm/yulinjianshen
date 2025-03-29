<template>
  <view class="fitness-container">
    <view class="page-header">
      <view class="header-title">健身常见问题</view>
    </view>
    
    <view class="fitness-categories">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="热门问题" pane-key="hot"></nut-tab-pane>
        <nut-tab-pane title="训练技巧" pane-key="training"></nut-tab-pane>
        <nut-tab-pane title="饮食营养" pane-key="nutrition"></nut-tab-pane>
        <nut-tab-pane title="健康知识" pane-key="health"></nut-tab-pane>
      </nut-tabs>
    </view>
    
    <view class="fitness-list">
      <nut-collapse v-model="activeNames">
        <nut-collapse-item 
          v-for="(item, index) in filteredQuestions" 
          :key="index" 
          :title="item.question" 
          :name="index"
        >
          <view class="answer-content">
            <text>{{ item.answer }}</text>
          </view>
          <view class="answer-footer">
            <view class="answer-tags">
              <text class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{ tag }}</text>
            </view>
            <view class="answer-actions">
              <view class="action-item" @click.stop="likeAnswer(index)">
                <nut-icon name="heart" :color="item.liked ? '#ff4d4f' : '#999'"></nut-icon>
                <text>{{ item.likes }}</text>
              </view>
              <view class="action-item" @click.stop="shareAnswer(index)">
                <nut-icon name="share"></nut-icon>
                <text>分享</text>
              </view>
            </view>
          </view>
        </nut-collapse-item>
      </nut-collapse>
    </view>
    
    <view class="ask-question">
      <nut-button type="primary" block @click="askQuestion">我要提问</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 当前选中的标签页
const activeTab = ref('hot');

// 当前展开的折叠面板
const activeNames = ref([]);

// 问题列表数据
const questionList = ref([]);

// 根据标签页筛选问题列表
const filteredQuestions = computed(() => {
  if (activeTab.value === 'hot') {
    return questionList.value.sort((a, b) => b.likes - a.likes).slice(0, 10);
  } else {
    return questionList.value.filter(item => item.category === activeTab.value);
  }
});

// 页面加载时获取问题列表
onMounted(() => {
  // 这里应该从服务器获取问题列表，暂时使用模拟数据
  fetchQuestionList();
});

// 获取问题列表
const fetchQuestionList = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟问题数据
    questionList.value = [
      {
        id: '1',
        question: '健身新手应该如何开始？',
        answer: '作为健身新手，建议从以下几个方面入手：1. 制定明确的健身目标；2. 学习基本动作要领，如深蹲、卧推等；3. 开始时以较轻重量练习正确姿势；4. 保持每周3-4次的训练频率；5. 注意饮食和休息，确保身体有足够恢复时间。最好能请专业教练指导初期训练，避免错误姿势导致受伤。',
        category: 'training',
        tags: ['新手指南', '训练计划'],
        likes: 245,
        liked: false
      },
      {
        id: '2',
        question: '健身前后应该吃什么？',
        answer: '训练前1-2小时可以摄入含有碳水化合物和少量蛋白质的食物，如香蕉、全麦面包配鸡胸肉等，提供训练能量。训练后30分钟内（黄金恢复期）应补充蛋白质和碳水化合物，如蛋白粉、牛奶、水果等，帮助肌肉修复和恢复糖原储备。整体饮食应保证足够的蛋白质摄入（每公斤体重1.6-2.2克）和均衡的营养素。',
        category: 'nutrition',
        tags: ['营养补充', '饮食指南'],
        likes: 198,
        liked: false
      },
      {
        id: '3',
        question: '如何有效减脂？',
        answer: '有效减脂需要综合方法：1. 控制热量摄入，形成适度的热量赤字（每天约500卡路里）；2. 增加有氧运动，如HIIT高强度间歇训练效果更佳；3. 保持力量训练，防止肌肉流失；4. 保证充足蛋白质摄入，每公斤体重至少1.6克；5. 保持充足睡眠和水分摄入；6. 减少精制碳水和加工食品摄入。持之以恒是关键，健康减脂应以每周0.5-1公斤为宜。',
        category: 'health',
        tags: ['减脂', '有氧运动'],
        likes: 312,
        liked: false
      },
      {
        id: '4',
        question: '力量训练和有氧训练应该如何安排？',
        answer: '最佳安排取决于你的健身目标。如果以增肌为主，可以将有氧训练安排在力量训练后或分开在不同日进行，每周2-3次有氧，每次20-30分钟。如果以减脂为主，可以增加有氧训练频率至每周4-5次，每次30-45分钟，并保持每周3-4次力量训练。避免在同一天进行相同肌群的力量训练，给肌肉48小时恢复时间。',
        category: 'training',
        tags: ['训练计划', '增肌减脂'],
        likes: 176,
        liked: false
      },
      {
        id: '5',
        question: '蛋白质摄入量应该是多少？',
        answer: '蛋白质摄入量因人而异：普通人每天每公斤体重0.8克；经常进行力量训练者每天每公斤体重1.6-2.2克；减脂期可适当提高至每公斤体重2.2-2.6克，以防止肌肉流失。例如，一个70公斤的健身爱好者，每天应摄入约112-154克蛋白质。优质蛋白来源包括瘦肉、鱼、蛋、奶制品、豆类等。建议将蛋白质分散在各餐中摄入，每餐20-40克为宜。',
        category: 'nutrition',
        tags: ['蛋白质', '营养补充'],
        likes: 230,
        liked: false
      },
      {
        id: '6',
        question: '如何避免健身受伤？',
        answer: '避免健身受伤的关键措施：1. 每次训练前进行充分热身（5-10分钟）；2. 学习并执行正确的动作技术，必要时寻求专业指导；3. 循序渐进增加训练强度和重量；4. 注意倾听身体信号，疼痛时及时停止；5. 保证足够的休息和恢复时间；6. 使用合适的保护装备，如护腕、护膝等；7. 保持良好的姿势和核心稳定性；8. 训练后进行适当拉伸。',
        category: 'health',
        tags: ['安全训练', '伤害预防'],
        likes: 287,
        liked: false
      },
      {
        id: '7',
        question: '健身停滞期如何突破？',
        answer: '突破健身停滞期的方法：1. 改变训练计划，如调整组数、次数、重量或休息时间；2. 尝试新的训练方法，如超级组、递减组、爆发训练等；3. 检查并调整饮食计划，可能需要增加或减少热量摄入；4. 确保充分休息和恢复，包括良好的睡眠质量；5. 考虑周期化训练，安排轻重训练周期；6. 重新评估训练目标，设定新的短期目标；7. 寻求专业教练的指导，找出技术或计划中的不足。',
        category: 'training',
        tags: ['突破瓶颈', '训练技巧'],
        likes: 195,
        liked: false
      },
      {
        id: '8',
        question: '健身后肌肉酸痛怎么缓解？',
        answer: '缓解肌肉酸痛（DOMS）的有效方法：1. 适当的轻度活动，如散步或轻度拉伸，促进血液循环；2. 冷热交替疗法，如冰敷和热敷交替使用；3. 泡温水浴或桑拿，帮助肌肉放松；4. 按摩或使用泡沫轴进行筋膜放松；5. 保证充足的蛋白质摄入，辅助肌肉修复；6. 补充足够水分；7. 适当补充镁、钾等电解质；8. 确保充分休息和睡眠。严重疼痛持续超过3-5天应考虑咨询医生。',
        category: 'health',
        tags: ['恢复', '肌肉酸痛'],
        likes: 267,
        liked: false
      },
    ];
  }, 500);
};

// 点赞回答
const likeAnswer = (index) => {
  const question = filteredQuestions.value[index];
  const originalIndex = questionList.value.findIndex(item => item.id === question.id);
  
  if (originalIndex !== -1) {
    if (questionList.value[originalIndex].liked) {
      questionList.value[originalIndex].likes--;
    } else {
      questionList.value[originalIndex].likes++;
    }
    questionList.value[originalIndex].liked = !questionList.value[originalIndex].liked;
    
    Taro.showToast({
      title: questionList.value[originalIndex].liked ? '已点赞' : '已取消点赞',
      icon: 'success',
      duration: 1500
    });
  }
};

// 分享回答
const shareAnswer = (index) => {
  const question = filteredQuestions.value[index];
  
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  });
  
  Taro.showToast({
    title: '分享成功',
    icon: 'success',
    duration: 1500
  });
};

// 提问问题
const askQuestion = () => {
  Taro.navigateTo({
    url: '/pages/my/feedback/index'
  });
};
</script>

<style lang="scss">
.fitness-container {
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

.fitness-categories {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.fitness-list {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .answer-content {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .answer-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .answer-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      
      .tag {
        font-size: 12px;
        color: #666;
        background-color: #f0f0f0;
        padding: 2px 6px;
        border-radius: 4px;
      }
    }
    
    .answer-actions {
      display: flex;
      gap: 15px;
      
      .action-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.ask-question {
  margin-top: 30px;
}
</style>