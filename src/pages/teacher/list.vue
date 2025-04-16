<template>
  <view class="page-container">
    <view class="page-header">
      <text class="header-title">专业教练</text>
      <text class="header-subtitle">找到适合你的私教</text>
    </view>
    <view class="coach-list">
      <view 
        class="coach-item" 
        v-for="(item, index) in coachList" 
        :key="index" 
        @click="navToCoach(item.id)"
        :style="{animationDelay: index * 0.1 + 's'}"
      >
        <view class="coach-avatar">
          <nut-avatar :src="item.avatar" size="large"></nut-avatar>
        </view>
        <view class="coach-info">
          <view class="coach-name">
            <text>{{ item.nickName }}</text>
          </view>
          <view class="coach-tags">
            <view class="coach-tag" v-for="(tag, index) in item.tags" :key="index">
              <text>{{ tag }}</text>
            </view>
          </view>
        </view>
        <view class="coach-arrow">
          <text class="arrow-icon">›</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const coachList = ref<any[]>([]);

const navToCoach = (id: string) => {
  Taro.navigateTo({
    url: `/pages/teacher/index?id=${id}`
  })
}

onMounted(() => {
  Taro.request({
    url: "http://localhost:8088/",
    method: "POST",
    success: (res) => {
      console.log(res.data)
    },
    fail: (err) => {
      console.log(err);
      coachList.value = [
        {
          id: "1",
          avatar: "https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg",
          nickName: "张三",
          tags: ["减脂塑形", "翘臀马甲线", "损伤防护"]
        },
        {
          id: "1",
          avatar: "https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg",
          nickName: "张三",
          tags: ["减脂塑形", "翘臀马甲线", "损伤防护"]
        }, {
          id: "1",
          avatar: "https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg",
          nickName: "张三",
          tags: ["减脂塑形", "翘臀马甲线", "损伤防护"]
        }, {
          id: "1",
          avatar: "https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg",
          nickName: "张三",
          tags: ["减脂塑形", "翘臀马甲线", "损伤防护"]
        }, {
          id: "1",
          avatar: "https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg",
          nickName: "张三",
          tags: ["减脂塑形", "翘臀马甲线", "损伤防护"]
        },
      ]
    }
  })
})

</script>

<style lang="scss">
@import "../../styles/theme";

.page-container {
  background-color: $bg-color-secondary;
  background-image: linear-gradient(to bottom, rgba($primary-light, 0.05), rgba($accent-light, 0.03));
  min-height: 100vh;
  padding: 20px;
  
  .page-header {
    padding: 30px 10px 20px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 20px;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, $primary-color, $accent-color);
      border-radius: $border-radius-circle;
      opacity: 0.8;
    }
    
    .header-title {
      font-size: 36px;
      font-weight: $font-weight-bold;
      color: $text-color-primary;
      display: block;
      margin-top: 15px;
      margin-bottom: 8px;
      position: relative;
    }
    
    .header-subtitle {
      font-size: 24px;
      color: $text-color-secondary;
      display: block;
      position: relative;
      opacity: 0.9;
    }
  }

  .coach-list {
    margin-top: 20px;

    .coach-item {
      display: flex;
      align-items: center;
      margin: 25px 0;
      padding: 20px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: $border-radius-lg;
      box-shadow: $shadow-md;
      position: relative;
      overflow: hidden;
      transition: all $transition-normal;
      animation: fadeInUp $transition-slow forwards;
      opacity: 0;
      transform: translateY(20px);
      
      // 添加微妙的边框效果
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: $border-radius-lg;
        padding: 1px; 
        background: linear-gradient(135deg, rgba($primary-light, 0.5), rgba($accent-color, 0.5));
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: 3;
      }
      
      &:active {
        transform: scale(0.98);
        box-shadow: $shadow-sm;
      }
      
      .coach-avatar {
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 50%;
          background: linear-gradient(135deg, $primary-color, $accent-color);
          z-index: -1;
          opacity: 0.7;
        }
      }

      .coach-info {
        margin-left: 25px;
        flex: 1;

        .coach-name {
          font-size: $font-size-medium-large;
          font-weight: $font-weight-semibold;
          color: $text-color-primary;
        }

        .coach-tags {
          margin-top: 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          
          .coach-tag {
            background: linear-gradient(to right, rgba($primary-light, 0.15), rgba($accent-light, 0.15));
            padding: 6px 12px;
            border-radius: $border-radius-md;
            font-size: $font-size-small;
            color: $text-color-secondary;
            font-weight: $font-weight-medium;
          }
        }
      }
      
      .coach-arrow {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, $primary-light, $primary-color);
        border-radius: 50%;
        margin-left: 15px;
        transition: transform $transition-normal;
        
        .arrow-icon {
          color: white;
          font-size: 24px;
          font-weight: $font-weight-bold;
        }
      }
      
      &:hover .coach-arrow {
        transform: translateX(3px);
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
