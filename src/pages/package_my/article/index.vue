<template>
  <view class="article-detail-container">
    <view class="page-header">
      <view class="header-title">文章详情</view>
    </view>

    <view class="article-info" v-if="articleDetail">
      <view class="article-header">
        <view class="article-title">{{ articleDetail.title }}</view>
        <view class="article-meta">
          <text class="article-author">{{ articleDetail.author }}</text>
          <text class="article-date">{{ articleDetail.date }}</text>
        </view>

        <view class="article-tags" v-if="articleDetail.tags && articleDetail.tags.length > 0">
          <text v-for="(tag, index) in articleDetail.tags" :key="index" class="tag-item">{{ tag }}</text>
        </view>
      </view>

      <view class="article-cover" v-if="articleDetail.image">
        <image :src="articleDetail.image" mode="aspectFill"></image>
      </view>

      <view class="article-content">
        <nut-textarea :nodes="articleDetail.content"></nut-textarea>
      </view>

      <view class="article-related" v-if="articleDetail.relatedArticles && articleDetail.relatedArticles.length > 0">
        <view class="section-title">相关文章</view>
        <view class="related-list">
          <view
            v-for="(article, index) in articleDetail.relatedArticles"
            :key="index"
            class="related-item"
            @click="viewArticleDetail(article.id)"
          >
            <view class="related-image">
              <image :src="article.image" mode="aspectFill"></image>
            </view>
            <view class="related-content">
              <view class="related-title">{{ article.title }}</view>
              <view class="related-info">
                <text>{{ article.author }}</text>
                <text>{{ article.date }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="action-buttons">
        <nut-button type="primary" @click="toggleFavorite" :class="{ 'favorited': isFavorited }">
          {{ isFavorited ? '取消收藏' : '收藏文章' }}
        </nut-button>
        <nut-button type="info" @click="shareArticle">分享文章</nut-button>
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
const articleId = router?.params?.id || '';

// 文章详情数据
const articleDetail = ref(null);

// 是否已收藏
const isFavorited = ref(false);

// 页面加载时获取文章详情
onMounted(() => {
  if (articleId) {
    fetchArticleDetail(articleId);
    checkFavoriteStatus(articleId);
  } else {
    Taro.showToast({
      title: '文章ID不存在',
      icon: 'none'
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }
});

// 获取文章详情
const fetchArticleDetail = (id) => {
  // 这里应该从服务器获取文章详情，暂时使用模拟数据
  setTimeout(() => {
    // 模拟文章详情数据
    articleDetail.value = {
      id: id,
      title: '如何科学增肌：从零开始的增肌指南',
      author: '健身专家',
      date: '2023-04-10',
      image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
      content: `<div>
        <p>增肌是许多健身爱好者的主要目标之一，但对于初学者来说，如何科学有效地增肌却是一个复杂的问题。本文将从营养、训练和恢复三个方面，为你详细介绍科学增肌的方法。</p>

        <h3>一、营养基础</h3>

        <p>增肌首先需要保证足够的热量摄入。一般来说，增肌期间的热量应该比维持体重所需的热量多300-500卡路里。</p>

        <p>蛋白质是肌肉生长的基础，每公斤体重每天需要摄入1.6-2.2克蛋白质。优质的蛋白质来源包括：</p>

        <ul>
          <li>瘦肉（鸡胸肉、牛肉、猪里脊等）</li>
          <li>鱼类（三文鱼、金枪鱼等）</li>
          <li>蛋类</li>
          <li>奶制品（酸奶、奶酪、牛奶等）</li>
          <li>豆类及豆制品</li>
        </ul>

        <p>碳水化合物提供训练所需的能量，应该占总热量的40-60%。优质的碳水化合物来源包括：</p>

        <ul>
          <li>全谷物（糙米、燕麦、全麦面包等）</li>
          <li>薯类（土豆、红薯等）</li>
          <li>水果和蔬菜</li>
        </ul>

        <p>健康脂肪对荷尔蒙平衡至关重要，应该占总热量的20-30%。优质的脂肪来源包括：</p>

        <ul>
          <li>坚果和种子</li>
          <li>橄榄油和椰子油</li>
          <li>牛油果</li>
          <li>脂肪含量较高的鱼类</li>
        </ul>

        <h3>二、训练原则</h3>

        <p>有效的增肌训练应该遵循以下原则：</p>

        <h4>1. 渐进超负荷</h4>

        <p>肌肉生长的关键是不断增加训练负荷。可以通过增加重量、增加次数或减少休息时间来实现。</p>

        <h4>2. 复合动作为主</h4>

        <p>复合动作（如深蹲、硬拉、卧推等）能够同时锻炼多个肌群，刺激更多的肌纤维生长，提高睾酮等促生长激素的分泌。</p>

        <h4>3. 适当的训练量</h4>

        <p>每个肌群每周应该进行10-20组训练，每组8-12次为宜。初学者可以从较低的训练量开始，逐渐增加。</p>

        <h4>4. 充分的休息时间</h4>

        <p>肌肉在休息时生长，同一肌群应该间隔48-72小时再次训练。</p>

        <h3>三、恢复与休息</h3>

        <p>充分的恢复对于肌肉生长至关重要：</p>

        <h4>1. 睡眠</h4>

        <p>每晚保证7-9小时的高质量睡眠，这是肌肉恢复和生长的黄金时间。</p>

        <h4>2. 训练后营养</h4>

        <p>训练后30分钟内摄入蛋白质和碳水化合物，有助于肌肉修复和糖原补充。</p>

        <h4>3. 适当的放松</h4>

        <p>泡沫轴筋膜放松、拉伸、按摩等方法可以帮助肌肉恢复，减少延迟性肌肉酸痛。</p>

        <h3>四、常见误区</h3>

        <p>增肌过程中，初学者常常会陷入以下误区：</p>

        <ul>
          <li>过度训练，忽视休息</li>
          <li>过分关注孤立动作，忽视复合动作</li>
          <li>蛋白质摄入过多，忽视其他营养素</li>
          <li>过度依赖补剂，忽视基础饮食</li>
          <li>频繁更换训练计划，缺乏持续性</li>
        </ul>

        <p>记住，增肌是一个长期过程，需要耐心和坚持。通过科学的训练、合理的饮食和充分的休息，你一定能够达到理想的增肌效果。</p>
      </div>`,
      tags: ['增肌', '科普', '训练计划'],
      relatedArticles: [
        {
          id: '2',
          title: '健身饮食指南：如何合理安排一日三餐',
          author: '营养师',
          date: '2023-04-05',
          image: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg'
        },
        {
          id: '3',
          title: '力量训练中的常见错误及纠正方法',
          author: '健身教练',
          date: '2023-03-28',
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

// 分享文章
const shareArticle = () => {
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  });
};

// 查看其他文章详情
const viewArticleDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/package_my/article/index?id=${id}`
  });
};
</script>

<style lang="scss">
.article-detail-container {
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

.article-info {
  .article-header {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    .article-title {
      font-size: 22px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      line-height: 1.4;
    }

    .article-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .article-author, .article-date {
        font-size: 14px;
        color: #666;
      }
    }

    .article-tags {
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

  .article-cover {
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

  .article-content {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    :deep(p) {
      font-size: 16px;
      color: #333;
      line-height: 1.8;
      margin-bottom: 15px;
    }

    :deep(h3) {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin: 25px 0 15px;
    }

    :deep(h4) {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin: 20px 0 10px;
    }

    :deep(ul), :deep(ol) {
      padding-left: 20px;
      margin-bottom: 15px;

      li {
        font-size: 16px;
        color: #333;
        line-height: 1.6;
        margin-bottom: 8px;
      }
    }
  }

  .article-related {
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

    .related-list {
      .related-item {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;

        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .related-image {
          width: 80px;
          height: 60px;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 12px;
          flex-shrink: 0;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .related-content {
          flex: 1;

          .related-title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
            margin-bottom: 8px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .related-info {
            display: flex;
            justify-content: space-between;

            text {
              font-size: 12px;
              color: #999;
            }
          }
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
