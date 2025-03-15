<template>
  <view class="page-container">
    <view class="hot-comment">
      <nut-cell title="热门评论" desc=">"></nut-cell>
      <view class="hot-comment-list">

        <view class="hot-comment-item" v-for="(item,index) in hotCommentList" :key="index">

          <view class="comment-header">
            <view class="person-info">
              <nut-avatar :src="item.avatar" size="small" style="margin-right: 10px"></nut-avatar>
              <text>{{ item.nickname }}</text>
            </view>
            <view class="comment-num">
              <text>{{ item.num }}</text>
            </view>
          </view>
          <view class="comment-content">
            <text>{{ item.content }}</text>
          </view>
        </view>

      </view>
    </view>

    <view class="new-comment">
      <nut-cell title="最新评论" desc=">"></nut-cell>
      <view class="hot-comment-list">

        <view class="hot-comment-item" v-for="(item,index) in hotCommentList" :key="index">

          <view class="comment-header">
            <view class="person-info">
              <nut-avatar :src="item.avatar" size="small" style="margin-right: 10px"></nut-avatar>
              <text>{{ item.nickname }}</text>
            </view>
            <view class="comment-num">
              <text>{{ item.num }}</text>
            </view>
          </view>
          <view class="comment-content">
            <text>{{ item.content }}</text>
          </view>
        </view>

      </view>
    </view>

    <view class="submit-comment">
      <nut-input placeholder="请输入评论内容"></nut-input>
      <nut-button type="primary" size="small">提交</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const hotCommentList = ref<any[]>([]);

onMounted(() => {
  const currentInstance = Taro.getCurrentInstance();
  if (currentInstance.router && currentInstance.router.params && currentInstance.router.params.id) {
    Taro.request({
      url: "http://localhost:8088/",
      method: "POST",
      data: {
        title: currentInstance.router.params.id
      },
      success: (res) => {
        console.log(res);
      },
      fail: () => {
        hotCommentList.value = [
          {
            avatar: "https://i0.hdslb.com/bfs/archive/c6d28cf44bae20cf91c098b24a5bb88d270f4f9d.jpg",
            nickname: "张三",
            content: "帕梅拉+力克体育🔥40分钟合集带拉伸，零基础暴汗燃脂健身操～",
            num: "33"
          }, {
            avatar: "https://i0.hdslb.com/bfs/archive/c6d28cf44bae20cf91c098b24a5bb88d270f4f9d.jpg",
            nickname: "张三",
            content: "帕梅拉+力克体育🔥40分钟合集带拉伸，零基础暴汗燃脂健身操～",
            num: "33"
          }, {
            avatar: "https://i0.hdslb.com/bfs/archive/c6d28cf44bae20cf91c098b24a5bb88d270f4f9d.jpg",
            nickname: "张三",
            content: "帕梅拉+力克体育🔥40分钟合集带拉伸，零基础暴汗燃脂健身操～",
            num: "33"
          }, {
            avatar: "https://i0.hdslb.com/bfs/archive/c6d28cf44bae20cf91c098b24a5bb88d270f4f9d.jpg",
            nickname: "张三",
            content: "帕梅拉+力克体育🔥40分钟合集带拉伸，零基础暴汗燃脂健身操～",
            num: "33"
          }, {
            avatar: "https://i0.hdslb.com/bfs/archive/c6d28cf44bae20cf91c098b24a5bb88d270f4f9d.jpg",
            nickname: "张三",
            content: "帕梅拉+力克体育🔥40分钟合集带拉伸，零基础暴汗燃脂健身操～",
            num: "33"
          }
        ];
      }
    })
  }
})


</script>

<style lang="scss">

.hot-comment, .new-comment {
  .hot-comment-item {
    margin-top: 30px;

    .comment-header {
      padding-left: 40px;
      padding-right: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .person-info {
        display: flex;
        align-items: center;
      }
    }

    .comment-content {
      padding-left: 100px;
    }
  }

  padding-bottom: 20px;
  border-bottom: 5px solid #9c9999;
}

.submit-comment {
  display: flex;
  align-items: center;
}


</style>
