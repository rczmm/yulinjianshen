<template>
  <view class="page-container">
    <view class="page-header">
      <text class="header-title">精选主题</text>
      <text class="header-subtitle">探索健身新领域</text>
    </view>
    <view class="topic-list">
      <view class="topic-item" v-for="(item,index) in topicList" :key="index" @click="navToTopic(item.title)"
            :style="{backgroundImage:`url(${item.img})`,backgroundSize:'cover',backgroundPosition:'center'}">
        <view class="overlay"></view>
        <view class="topic-badge">
          <text>{{ item.num }} 节课程</text>
        </view>
        <view class="topic-info">
          <view class="topic-title">
            <text>{{ item.title }}</text>
          </view>
          <view class="topic-desc">
            <text>{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const topicList = ref<any[]>([]);

onMounted(() => {
  Taro.request({
    url: "http://localhost:8088/",
    method: "POST",
    success: (res) => {
      console.log(res);
      topicList.value = res.data;
    },
    fail: () => {
      console.log('请求失败');
      topicList.value = [
        {
          id: "1",
          title: "这是课程标题",
          desc: "这是课程描述",
          num: "101",
          img: 'https://i0.hdslb.com/bfs/archive/b4fb0479097beafc556dcae9a6cf6f52cde970ce.jpg'
        },
        {
          id: "2",
          title: "这是课程标题",
          desc: "这是课程描述",
          num: "101",
          img: "https://i0.hdslb.com/bfs/archive/264e6729c95a295f66e920eac30558f6f4669868.jpg"
        },
        {
          id: "3",
          title: "这是课程标题",
          desc: "这是课程描述",
          num: "101",
          img: "https://i0.hdslb.com/bfs/archive/c7ff8b3706dc1f28f0d06594d6fb2218f92398cb.jpg"
        },
        {
          id: "4",
          title: "这是课程标题",
          desc: "这是课程描述",
          num: "101",
          img: "https://i0.hdslb.com/bfs/archive/788c62f0c5d3432f609a2cb708e2c7534ea00975.jpg"
        }
      ];
    }
  })
});

const navToTopic = (title: string) => {
  Taro.navigateTo({
    url: `/pages/topic/index?title=${title}`
  })
}


</script>

<style lang="scss">
@import "../../styles/theme";

.page-container {
  background-color: $bg-color-secondary;
  background-image: linear-gradient(to bottom, rgba($primary-light, 0.03), rgba($accent-light, 0.02));
  min-height: 100vh;
  padding-bottom: 30px;
  position: relative;
  
  // 添加微妙的背景纹理
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMGEyOCAyOCAwIDEgMCAtNTYgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgc3Ryb2tlLXdpZHRoPSIwLjUiPjwvcGF0aD4KPC9zdmc+');
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
}

.page-header {
  padding: 40px 30px 25px;
  position: relative;
  
  // 添加微妙的装饰元素
  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 30px;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, $primary-color, $accent-color);
    border-radius: $border-radius-circle;
    opacity: 0.8;
  }
  
  .header-title {
    font-size: 44px;
    font-weight: $font-weight-bold;
    color: $text-color-primary;
    display: block;
    margin-top: 15px;
    margin-bottom: 12px;
    position: relative;
    transform: translateZ(0);
    transition: transform $transition-normal;
  }
  
  .header-subtitle {
    font-size: 28px;
    color: $text-color-secondary;
    display: block;
    position: relative;
    transform: translateZ(0);
    transition: transform $transition-fast;
    opacity: 0.9;
  }
}

.topic-list {
  padding: 15px 20px;

  .topic-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
    height: 380px;
    justify-content: space-between;
    position: relative;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow-md;
    transition: all $transition-normal;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    // 添加精致边框效果
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: $border-radius-lg;
      padding: 2px; 
      background: linear-gradient(135deg, rgba($primary-light, 0.5), rgba($accent-color, 0.5));
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 3;
    }
    
    &:active {
      transform: scale(0.98) translateY(2px);
      box-shadow: $shadow-sm;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
      z-index: 1;
    }

    .topic-badge {
      font-size: 26px;
      margin-left: 30px;
      margin-top: 30px;
      color: white;
      background: linear-gradient(135deg, rgba($accent-light, 0.85) 0%, rgba($accent-color, 0.75) 50%, rgba($accent-dark, 0.85) 100%);
      padding: 8px 16px;
      border-radius: $border-radius-md;
      display: inline-block;
      z-index: 2;
      position: relative;
      box-shadow: 0 3px 8px rgba(darken($accent-color, 15%), 0.3);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      transition: all $transition-normal;
      transform: translateZ(0);
      
      // 添加精致的内部阴影
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: $border-radius-md;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
        pointer-events: none;
      }
      
      &:active {
        transform: translateY(2px);
        box-shadow: 0 1px 3px rgba(darken($accent-color, 15%), 0.3);
      }
    }

    .topic-info {
      margin: 0 30px 30px;
      z-index: 2;
      position: relative;
      transform: translateZ(0);
      transition: transform $transition-normal;
      
      // 添加微妙的悬停效果
      .topic-item:hover & {
        transform: translateY(-3px);
      }

      .topic-title {
        font-size: 38px;
        margin-bottom: 14px;
        color: white;
        font-weight: $font-weight-bold;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        position: relative;
        display: inline-block;
        
        // 添加精致的下划线效果
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(to right, $accent-color, $accent-light);
          border-radius: $border-radius-circle;
          opacity: 0.8;
        }
      }

      .topic-desc {
        font-size: 28px;
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.5;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        max-width: 90%;
      }
    }
  }
}
</style>
