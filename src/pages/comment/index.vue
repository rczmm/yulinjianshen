<template>
  <view class="page-container">
    <!-- 热门评论区 -->
    <view class="comment-section hot-comment">
      <nut-cell title="热门评论" desc="更多 >" :round-radius="0"></nut-cell>
      <view class="comment-list">
        <view class="comment-item" v-for="(item, index) in hotCommentList" :key="'hot-' + index">
          <view class="comment-item__header">
            <view class="comment-item__author">
              <nut-avatar :src="item.avatar" size="small" class="comment-item__avatar"></nut-avatar>
              <text class="comment-item__nickname">{{ item.nickname }}</text>
            </view>
            <view class="comment-item__meta">
              <nut-icon name="fabulous" size="14px" color="#FF9500"></nut-icon>
              <text>{{ item.num }}</text>
            </view>
          </view>
          <view class="comment-item__content">
            <text>{{ item.content }}</text>
          </view>
        </view>
        <!-- 空状态处理 -->
        <view v-if="!hotCommentList.length" class="comment-list-empty">
          <text>暂无热门评论</text>
        </view>
      </view>
    </view>

    <!-- 最新评论区 -->
    <view class="comment-section new-comment">
      <nut-cell title="最新评论" desc="全部 >" :round-radius="0"></nut-cell>
      <view class="comment-list">
        <view class="comment-item" v-for="(item, index) in hotCommentList" :key="'new-' + index">
          <view class="comment-item__header">
            <view class="comment-item__author">
              <nut-avatar :src="item.avatar" size="small" class="comment-item__avatar"></nut-avatar>
              <text class="comment-item__nickname">{{ item.nickname }}</text>
            </view>
            <view class="comment-item__meta">
              <nut-icon name="fabulous" size="14px" color="#FF9500"></nut-icon>
              <text>{{ item.num }}</text>
            </view>
          </view>
          <view class="comment-item__content">
            <text>{{ item.content }}</text>
          </view>
        </view>
        <!-- 空状态处理 -->
        <view v-if="!hotCommentList.length" class="comment-list-empty">
          <text>还没有评论，快来抢沙发吧！</text>
        </view>
      </view>
    </view>

    <!-- 评论输入区 -->
    <view class="submit-comment">
      <view class="submit-comment__input-wrapper">
        <nut-input placeholder="留下你的精彩评论..." class="submit-comment__input" />
      </view>
      <nut-button type="primary" size="small" class="submit-comment__button">发布</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Taro from "@tarojs/taro";

// 建议为热门和最新评论分别创建 ref
const hotCommentList = ref<any[]>([]);
// const newCommentList = ref<any[]>([]); // 实际开发中应分开

onMounted(() => {
  // --- 保留你原有的数据请求逻辑 ---
  const currentInstance = Taro.getCurrentInstance();
  if (currentInstance.router && currentInstance.router.params && currentInstance.router.params.id) {
    Taro.request({
      url: "http://localhost:8088/", // 你的 API 地址
      method: "POST",
      data: {
        title: currentInstance.router.params.id
      },
      success: (res) => {
        console.log(res);
        // 假设 res.data.hotComments 是热门评论数据
        // hotCommentList.value = res.data.hotComments || [];
        // 假设 res.data.newComments 是最新评论数据
        // newCommentList.value = res.data.newComments || [];

        // 如果请求失败或没有数据，使用模拟数据 (保留 fail 中的逻辑)
        if (!res || !res.data /* 或根据你的 API 结构判断 */) {
          loadMockData();
        }
      },
      fail: () => {
        // 请求失败时加载模拟数据
        loadMockData();
      }
    })
  } else {
    // 没有路由参数时也加载模拟数据 (可选)
    loadMockData();
  }
});

// 模拟数据加载函数
const loadMockData = () => {
  hotCommentList.value = [
    {
      avatar: "https://img1.baidu.com/it/u=14249799,3311829896&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      nickname: "健身达人小明",
      content: "这个训练计划太棒了，坚持下来效果明显！💪",
      num: "128"
    }, {
      avatar: "https://img0.baidu.com/it/u=118694943,1319869867&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      nickname: "爱运动的莉莉",
      content: "动作讲解很清晰，新手也能跟上，赞！",
      num: "99"
    },
  ];
  // newCommentList.value = [ ... ]; // 实际应有不同的模拟数据或请求
}

</script>

<style lang="scss">
// 导入主题变量
@import '../../styles/theme';

// 页面基础样式
.page-container {
  background-color: $bg-color-tertiary;
  padding-bottom: 80px; // 为固定在底部的输入框留出空间
  min-height: 100vh;
  box-sizing: border-box;
}

// 评论区段样式
.comment-section {
  background-color: $bg-color;
  margin-bottom: $spacing-md;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;
  overflow: hidden;

  // 覆盖 NutUI Cell 的默认样式
  .nut-cell {
    padding: $spacing-md $spacing-lg;
    background-color: transparent;
    
    &::after {
      border-bottom: 1px solid $border-color;
      left: $spacing-lg;
      right: $spacing-lg;
    }
    
    .nut-cell__title {
      font-size: $font-size-medium;
      font-weight: $font-weight-semibold;
      color: $text-color-primary;
    }
    
    .nut-cell__value {
      font-size: $font-size-small;
      color: $primary-color;
    }
  }
}

// 评论列表样式
.comment-list {
  padding: 0 $spacing-lg $spacing-md $spacing-lg;
}

// 单条评论样式
.comment-item {
  padding: $spacing-md 0;
  transition: background-color $transition-fast;
  
  &:hover {
    background-color: rgba($primary-light, 0.05);
  }

  // 添加上边框作为分隔线，第一个评论项除外
  &:not(:first-child) {
    border-top: 1px solid $border-color;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm;
  }

  &__author {
    display: flex;
    align-items: center;
  }

  &__avatar {
    margin-right: $spacing-sm;
    border: 2px solid rgba($primary-color, 0.1);
  }

  &__nickname {
    font-size: $font-size-normal;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
  }

  &__meta {
    display: flex;
    align-items: center;
    font-size: $font-size-small;
    color: $text-color-secondary;
    background-color: rgba($accent-color, 0.1);
    padding: $spacing-xxs $spacing-xs;
    border-radius: $border-radius-sm;
    
    .nut-icon {
      margin-right: 4px;
    }
  }

  &__content {
    font-size: $font-size-normal;
    color: $text-color-primary;
    line-height: $line-height-normal;
    padding-left: 36px; // 与头像对齐
    word-break: break-word;
  }
}

// 评论列表空状态
.comment-list-empty {
  padding: $spacing-xl 0;
  text-align: center;
  color: $text-color-secondary;
  font-size: $font-size-normal;
}

// 底部评论输入区样式
.submit-comment {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: $spacing-sm $spacing-lg;
  background-color: $bg-color;
  border-top: 1px solid $border-color;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: $z-index-fixed;

  &__input-wrapper {
    flex-grow: 1;
    margin-right: $spacing-md;
  }

  &__input {
    // 覆盖 NutUI Input 样式
    :deep(.nut-input-inner) {
      background-color: $bg-color-tertiary;
      border-radius: 18px;
      padding: $spacing-xs $spacing-md;
      border: none;
      font-size: $font-size-normal;
      color: $text-color-primary;
    }
    
    :deep(input::placeholder) {
      color: $text-color-secondary;
      font-size: $font-size-normal;
    }
  }

  &__button {
    background-color: $accent-color !important;
    border-color: $accent-color !important;
    color: $bg-color !important;
    padding: $spacing-xs $spacing-md;
    border-radius: 18px;
    box-shadow: none;
    border: none;
    font-size: $font-size-normal;
    font-weight: $font-weight-medium;
    transition: opacity $transition-fast;
    
    &:active {
      opacity: 0.8;
    }
  }
}
</style>
