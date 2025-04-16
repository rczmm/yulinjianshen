<template>
  <view class="page-container">
    <view class="page-header">
      <text class="header-title">精品课程</text>
      <text class="header-subtitle">专业指导，科学健身</text>
    </view>
    
    <image class="back-image" src="https://i0.hdslb.com/bfs/archive/136b6c5a3b446e4ba0e2066ac89191b4610d7b28.jpg" mode="aspectFill"/>

    <view class="class-list">
      <view 
        class="class-item" 
        @click="navToClassIndex(item.id)" 
        v-for="(item, index) in classList" 
        :key="index"
        :style="{animationDelay: index * 0.1 + 's'}"
      >
        <view class="class-image-container">
          <image class="class-image" :src="item.image" mode="aspectFill"/>
          <view class="class-badge">
            <text>{{ item.num }}节课</text>
          </view>
        </view>

        <view class="class-info">
          <view class="class-title">
            <text>{{ item.title }}</text>
          </view>
          <view class="class-desc">
            <text>{{ item.desc }}</text>
          </view>
          <view class="class-price">
            <text>￥{{ item.price }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const classList = ref<any[]>([]);

const navToClassIndex = (id: string) => {
  Taro.navigateTo({
    url: `/pages/class/index?id=${id}`
  })
}

onMounted(() => {
  Taro.request({
    url: "http://localhost:8088/",
    method: "POST",
    success: (res) => {
      console.log(res);
    },
    timeout: 100,
    fail: () => {
      console.log('fail');
      classList.value = [
        {
          image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
          id: '1',
          title: '新手健身第一课',
          desc: '轻松易懂，健身小白第一步',
          price: '99',
          num: '6'
        },
        {
          image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
          id: '1',
          title: '新手健身第一课',
          desc: '轻松易懂，健身小白第一步',
          price: '99',
          num: '6'
        },
        {
          image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
          id: '1',
          title: '新手健身第一课',
          desc: '轻松易懂，健身小白第一步',
          price: '99',
          num: '6'
        },
        {
          image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
          id: '1',
          title: '新手健身第一课',
          desc: '轻松易懂，健身小白第一步',
          price: '99',
          num: '6'
        },
        {
          image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
          id: '1',
          title: '新手健身第一课',
          desc: '轻松易懂，健身小白第一步',
          price: '99',
          num: '6'
        },
        {
          image: 'https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg',
          id: '1',
          title: '新手健身第一课',
          desc: '轻松易懂，健身小白第一步',
          price: '99',
          num: '6'
        }
      ]
    }
  })
});

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

.back-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  transition: transform $transition-normal;
  
  &:active {
    transform: scale(0.98);
  }
}

.class-list {
  padding: 20px;
  position: relative;
  z-index: 1;
}

.class-item {
  background-color: $bg-color;
  border-radius: $border-radius-lg;
  margin-bottom: 35px;
  overflow: hidden;
  box-shadow: $shadow-md;
  transition: all $transition-normal;
  animation: fadeInUp $transition-slow forwards;
  opacity: 0;
  transform: translateY(20px);
  position: relative;
  
  // 添加精致边框效果
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: $border-radius-lg;
    padding: 1px; 
    background: linear-gradient(135deg, rgba($primary-light, 0.3), rgba($accent-color, 0.3));
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
  
  .class-image-container {
    position: relative;
    overflow: hidden;
    
    .class-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      transition: transform $transition-normal;
    }
    
    .class-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: linear-gradient(135deg, $primary-color, $accent-color);
      color: white;
      font-size: 24px;
      padding: 6px 12px;
      border-radius: $border-radius-md;
      box-shadow: $shadow-sm;
      z-index: 2;
    }
  }
  
  &:hover .class-image {
    transform: scale(1.05);
  }
  
  .class-info {
    padding: 24px 20px;
    
    .class-title {
      font-size: $font-size-medium-large;
      font-weight: $font-weight-bold;
      margin-bottom: 10px;
      color: $text-color-primary;
    }
    
    .class-desc {
      font-size: $font-size-normal;
      color: $text-color-secondary;
      margin-bottom: 15px;
      line-height: $line-height-normal;
    }
    
    .class-price {
      font-size: $font-size-medium;
      font-weight: $font-weight-bold;
      color: $accent-color;
      
      &::before {
        content: '';
        display: block;
        width: 40px;
        height: 2px;
        background: linear-gradient(to right, $primary-light, $accent-light);
        margin-bottom: 10px;
        border-radius: $border-radius-circle;
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
