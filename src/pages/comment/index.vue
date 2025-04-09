<template>
  <view class="page-container">
    <!-- 热门评论区 -->
    <view class="comment-section hot-comment">
      <!-- 使用 round-radius="0" 移除 NutUI Cell 可能自带的圆角，由我们自己控制 -->
      <nut-cell title="热门评论" desc="更多 >" :round-radius="0"></nut-cell>
      <view class="comment-list">
        <view class="comment-item" v-for="(item, index) in hotCommentList" :key="'hot-' + index">
          <view class="comment-item__header">
            <view class="comment-item__author">
              <nut-avatar :src="item.avatar" size="small" class="comment-item__avatar"></nut-avatar>
              <text class="comment-item__nickname">{{ item.nickname }}</text>
            </view>
            <view class="comment-item__meta">
              <!-- 使用 NutUI 图标，颜色来自主题变量 -->
              <nut-icon name="fabulous" size="12px" :color="$text-color-secondary" style="margin-right: 4px;"></nut-icon>
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
      <!-- 注意: 实际应绑定 newCommentList -->
      <nut-cell title="最新评论" desc="全部 >" :round-radius="0"></nut-cell>
      <view class="comment-list">
        <!-- 注意: 实际应遍历 newCommentList -->
        <view class="comment-item" v-for="(item, index) in hotCommentList" :key="'new-' + index">
          <view class="comment-item__header">
            <view class="comment-item__author">
              <nut-avatar :src="item.avatar" size="small" class="comment-item__avatar"></nut-avatar>
              <text class="comment-item__nickname">{{ item.nickname }}</text>
            </view>
            <view class="comment-item__meta">
              <nut-icon name="fabulous" size="12px" :color="$text-color-secondary" style="margin-right: 4px;"></nut-icon>
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
        <!-- 使用主题变量中的 placeholder 颜色 -->
        <nut-input :placeholder="'留下你的精彩评论...'" class="submit-comment__input" />
      </view>
      <!-- 使用主题变量中的 accent-color -->
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
// 1. 导入你的主题变量文件 (!!! 请确保路径正确 !!!)
//    根据你的项目结构调整路径，常见的可能是:
//    @import '@/styles/variables.scss';
//    @import '../../styles/theme.scss';
@import '../../styles/theme';

// 2. 页面基础样式
.page-container {
  background-color: $bg-color-tertiary; // 使用第三级背景色作为页面背景
  padding-bottom: 80px; // 为固定在底部的输入框留出空间 (根据输入框实际高度调整)
  min-height: 100vh;
  box-sizing: border-box; // 推荐加上，避免 padding 影响总高度计算
}

// 3. 评论区段样式
.comment-section {
  background-color: $bg-color; // 使用主背景色 (白色) 作为卡片背景
  margin-bottom: $spacing-md; // 区块之间的间距

  // 覆盖 NutUI Cell 的一些默认样式
  .nut-cell {
    padding: $spacing-md $spacing-lg; // 使用变量定义内边距
    background-color: transparent; // 背景透明，由 .comment-section 控制
    // Cell 底部分割线
    &::after {
      border-bottom: 1px solid $border-color; // 使用变量定义边框颜色和宽度 (1px)
      left: $spacing-lg; // 分割线左侧留白
      right: $spacing-lg; // 分割线右侧留白
    }
    .nut-cell__title {
      font-size: $font-size-medium-large; // 使用中大标题字号
      font-weight: $font-weight-semibold; // 使用半粗体
      color: $text-color-primary; // 使用主要文字颜色
    }
    .nut-cell__value {
      font-size: $font-size-small; // 使用小字号
      color: $text-color-secondary; // 使用次要文字颜色
    }
  }
}

// 4. 评论列表样式
.comment-list {
  padding: 0 $spacing-lg $spacing-md $spacing-lg; // 列表左右及底部内边距
}

// 5. 单条评论样式
.comment-item {
  padding: $spacing-md 0; // 上下内边距

  // 添加上边框作为分隔线，第一个评论项除外
  &:not(:first-child) {
    border-top: 1px solid $border-color; // 使用变量定义边框颜色和宽度 (1px)
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm; // 头部和内容间距
  }

  &__author {
    display: flex;
    align-items: center;
  }

  &__avatar {
    margin-right: $spacing-sm; // 头像和昵称间距
    // 可以考虑给头像添加圆角变量
    // border-radius: $border-radius-circle;
  }

  &__nickname {
    font-size: $font-size-normal; // 使用正文字号
    font-weight: $font-weight-medium; // 使用中等字重
    color: $text-color-primary; // 使用主要文字颜色
  }

  &__meta {
    display: flex;
    align-items: center;
    font-size: $font-size-small; // 使用小字号
    color: $text-color-secondary; // 使用次要文字颜色
  }

  &__content {
    font-size: $font-size-normal; // 使用正文字号
    color: $text-color-primary; // 使用主要文字颜色
    line-height: $line-height-normal; // 使用正常行高
    // 左侧内边距与头像对齐 (假设 NutUI small 头像宽度约 24px)
    padding-left: (24px + $spacing-sm);
    word-break: break-word; // 允许长单词换行
  }
}

// 6. 评论列表空状态
.comment-list-empty {
  padding: $spacing-xl 0;
  text-align: center;
  color: $text-color-secondary; // 使用次要文字颜色
  font-size: $font-size-normal; // 使用正文字号
}


// 7. 底部评论输入区样式
.submit-comment {
  position: fixed; // 固定在底部
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: $spacing-sm $spacing-lg; // 使用变量定义内边距
  background-color: $bg-color; // 使用主背景色 (白色)
  border-top: 1px solid $border-color; // 使用变量定义顶部边框
  z-index: $z-index-fixed; // 使用变量定义层级

  &__input-wrapper {
    flex-grow: 1;
    margin-right: $spacing-md; // 输入框和按钮间距
  }

  &__input {
    // 覆盖 NutUI Input 样式
    .nut-input-inner {
      background-color: $bg-color-tertiary; // 输入框背景使用第三级背景色
      border-radius: 18px; // 可以考虑用变量 $border-radius-xl 或自定义
      padding: $spacing-xs $spacing-md; // 使用变量定义内边距
      border: none; // 移除默认边框
      font-size: $font-size-normal; // 输入文字大小
      color: $text-color-primary; // 输入文字颜色
    }
    // 调整 placeholder 颜色 (Taro H5/小程序可能写法不同)
    .input-text::placeholder, // 小程序
    input::placeholder { // H5
      color: $text-color-secondary; // 使用次要文字颜色作为 placeholder 颜色
      font-size: $font-size-normal;
    }
  }

  &__button {
    // 强制使用主题强调色
    background-color: $accent-color !important;
    border-color: $accent-color !important;
    color: $bg-color !important; // 强调色上的文字用白色 (主背景色)
    padding: $spacing-xs $spacing-md; // 使用变量定义内边距
    border-radius: 18px; // 与输入框一致的圆角
    box-shadow: none; // 移除 NutUI 可能的阴影
    border: none; // 移除 NutUI 可能的边框
    font-size: $font-size-normal; // 按钮文字大小
    font-weight: $font-weight-medium; // 按钮文字字重

    // 添加简单的按下效果
    transition: opacity $transition-fast; // 使用变量定义过渡效果
    &:active {
      opacity: 0.8;
    }
  }
}

</style>
