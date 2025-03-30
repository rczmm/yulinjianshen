<template>
  <view class="exercise-detail-container">
    <view class="page-header">
      <view class="header-title">动作详情</view>
    </view>

    <view class="exercise-info" v-if="exerciseDetail">
      <view class="exercise-image">
        <image :src="exerciseDetail.image" mode="aspectFill"></image>
      </view>

      <view class="exercise-content">
        <view class="exercise-title">{{ exerciseDetail.name }}</view>

        <view class="exercise-meta">
          <view class="meta-item">
            <view class="meta-label">目标肌群</view>
            <view class="meta-value">{{ exerciseDetail.target }}</view>
          </view>

          <view class="meta-item">
            <view class="meta-label">难度级别</view>
            <view class="meta-value">{{ exerciseDetail.level }}</view>
          </view>

          <view class="meta-item" v-if="exerciseDetail.equipment">
            <view class="meta-label">所需器材</view>
            <view class="meta-value">{{ exerciseDetail.equipment }}</view>
          </view>
        </view>

        <view class="exercise-tags" v-if="exerciseDetail.tags && exerciseDetail.tags.length > 0">
          <text v-for="(tag, index) in exerciseDetail.tags" :key="index" class="tag-item">{{ tag }}</text>
        </view>
      </view>

      <view class="exercise-section">
        <view class="section-title">动作说明</view>
        <view class="section-content">{{ exerciseDetail.description }}</view>
      </view>

      <view class="exercise-section">
        <view class="section-title">执行步骤</view>
        <view class="steps-list">
          <view v-for="(step, index) in exerciseDetail.steps" :key="index" class="step-item">
            <view class="step-number">{{ index + 1 }}</view>
            <view class="step-content">{{ step }}</view>
          </view>
        </view>
      </view>

      <view class="exercise-section" v-if="exerciseDetail.tips && exerciseDetail.tips.length > 0">
        <view class="section-title">注意事项</view>
        <view class="tips-list">
          <view v-for="(tip, index) in exerciseDetail.tips" :key="index" class="tip-item">
            <text class="tip-dot">•</text>
            <text class="tip-content">{{ tip }}</text>
          </view>
        </view>
      </view>

      <view class="exercise-section" v-if="exerciseDetail.variations && exerciseDetail.variations.length > 0">
        <view class="section-title">变式动作</view>
        <view class="variations-list">
          <view v-for="(variation, index) in exerciseDetail.variations" :key="index" class="variation-item" @click="viewExerciseDetail(variation.id)">
            <view class="variation-image">
              <image :src="variation.image" mode="aspectFill"></image>
            </view>
            <view class="variation-name">{{ variation.name }}</view>
          </view>
        </view>
      </view>

      <view class="action-buttons">
        <nut-button type="primary" @click="toggleFavorite" :class="{ 'favorited': isFavorited }">
          {{ isFavorited ? '取消收藏' : '收藏动作' }}
        </nut-button>
        <nut-button type="info" @click="addToTraining">添加到训练</nut-button>
      </view>
    </view>

    <view v-else class="loading-state">
      <view class="loading-text">加载中...</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const exerciseId = router?.params?.id || '';

// 动作详情数据
const exerciseDetail = ref(null);

// 是否已收藏
const isFavorited = ref(false);

// 页面加载时获取动作详情
onMounted(() => {
  if (exerciseId) {
    fetchExerciseDetail(exerciseId);
    checkFavoriteStatus(exerciseId);
  } else {
    Taro.showToast({
      title: '动作ID不存在',
      icon: 'none'
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }
});

// 获取动作详情
const fetchExerciseDetail = (id) => {
  // 这里应该从服务器获取动作详情，暂时使用模拟数据
  setTimeout(() => {
    // 模拟动作详情数据
    exerciseDetail.value = {
      id: id,
      name: '杠铃深蹲',
      target: '腿部、臀部、核心',
      level: '中级',
      equipment: '杠铃、深蹲架',
      image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
      description: '杠铃深蹲是一种复合性力量训练动作，主要锻炼下半身肌肉群，包括股四头肌、臀大肌和腘绳肌等。它是增强下肢力量和提高整体运动表现的基础动作之一。',
      steps: [
        '站在深蹲架前，将杠铃放置在肩膀后方的斜方肌上。',
        '双脚与肩同宽或稍宽，脚尖略微向外。',
        '挺胸收腹，保持脊柱中立位置。',
        '弯曲膝盖和髋部，慢慢下蹲，直到大腿与地面平行或稍低。',
        '通过脚跟发力，将身体推回起始位置。',
        '重复所需次数。'
      ],
      tips: [
        '保持脊柱中立，避免腰部过度弯曲。',
        '下蹲时膝盖应与脚尖方向一致，避免内扣。',
        '初学者应先掌握正确姿势，再逐渐增加重量。',
        '呼吸节奏：下蹲时吸气，上推时呼气。'
      ],
      tags: ['力量训练', '复合动作', '下肢'],
      variations: [
        {
          id: '101',
          name: '哑铃深蹲',
          image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
        },
        {
          id: '102',
          name: '箱式深蹲',
          image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
        }
      ]
    };
  }, 500);
};

// 检查收藏状态
const checkFavoriteStatus = (id) => {
  // 这里应该从服务器或本地存储检查收藏状态，暂时使用模拟数据
  setTimeout(() => {
    isFavorited.value = Math.random() > 0.5; // 随机设置收藏状态，实际应用中应该根据真实数据
  }, 500);
};

// 切换收藏状态
const toggleFavorite = () => {
  // 这里应该发送请求到服务器更新收藏状态
  Taro.showLoading({ title: isFavorited.value ? '取消中...' : '收藏中...' });

  // 模拟网络请求
  setTimeout(() => {
    Taro.hideLoading();
    isFavorited.value = !isFavorited.value;

    Taro.showToast({
      title: isFavorited.value ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 2000
    });
  }, 1000);
};

// 添加到训练
const addToTraining = () => {
  Taro.navigateTo({
    url: `/pages/package_my/training/new?exerciseId=${exerciseId}`
  });
};

// 查看其他动作详情
const viewExerciseDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/package_my/exercise/index?id=${id}`
  });
};
</script>

<style lang="scss">
.exercise-detail-container {
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

.exercise-info {
  .exercise-image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .exercise-content {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    .exercise-title {
      font-size: 22px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }

    .exercise-meta {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;

      .meta-item {
        flex: 1;
        min-width: 33%;
        margin-bottom: 10px;

        .meta-label {
          font-size: 14px;
          color: #999;
          margin-bottom: 5px;
        }

        .meta-value {
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }
      }
    }

    .exercise-tags {
      display: flex;
      flex-wrap: wrap;

      .tag-item {
        font-size: 12px;
        color: #2196f3;
        background-color: #e3f2fd;
        padding: 4px 8px;
        border-radius: 4px;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }

  .exercise-section {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      position: relative;
      padding-left: 12px;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 4px;
        height: 16px;
        width: 4px;
        background-color: #2196f3;
        border-radius: 2px;
      }
    }

    .section-content {
      font-size: 16px;
      color: #666;
      line-height: 1.6;
    }

    .steps-list {
      .step-item {
        display: flex;
        margin-bottom: 15px;

        .step-number {
          width: 24px;
          height: 24px;
          background-color: #2196f3;
          color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .step-content {
          font-size: 16px;
          color: #666;
          line-height: 1.5;
          flex: 1;
        }
      }
    }

    .tips-list {
      .tip-item {
        display: flex;
        margin-bottom: 10px;

        .tip-dot {
          color: #2196f3;
          font-size: 18px;
          margin-right: 8px;
          line-height: 1.4;
        }

        .tip-content {
          font-size: 16px;
          color: #666;
          line-height: 1.5;
          flex: 1;
        }
      }
    }

    .variations-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;

      .variation-item {
        width: calc(50% - 20px);
        margin: 0 10px 20px;

        .variation-image {
          width: 100%;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 8px;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .variation-name {
          font-size: 14px;
          color: #333;
          text-align: center;
        }
      }
    }
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .nut-button {
      flex: 1;
      margin: 0 10px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.favorited {
        background-color: #ff9800;
        border-color: #ff9800;
      }
    }
  }
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>
