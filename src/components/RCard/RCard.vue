<template>
  <view class="card-container" :style="{ background: gradientBackground }">
    <view class="card-content">
      <view class="title-description">
        <text class="title">{{ title }}</text>
        <text class="description">{{ description }}</text>
      </view>

      <view class="list-container">
        <view class="list-item" v-for="(item, index) in listData" :key="index" @click="navToCourse(title)">
          <image class="item-image" :src="item.image" mode="aspectFill"/>
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <view class="item-details">
              <text class="detail-text">{{ item.time }}</text>
              <text class="detail-text">{{ item.energy }}</text>
              <text class="detail-text">{{ item.level }}</text>
            </view>
          </view>
        </view>
        <view class="view-more-button" v-if="listData.length > 0">
          <view class="button-text" @click="navToTopic(title)">
            <text class="button-text-content">查看更多</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {defineProps, computed, ref} from 'vue';
import './RCard.scss';
import Taro from '@tarojs/taro';

// 定义多种渐变背景方案，基于主题色系统
const gradientBackgrounds = [
  'linear-gradient(135deg, #007AFF, #34C759)', // 蓝色到绿色
  'linear-gradient(135deg, #007AFF, #5856D6)', // 蓝色到紫色
  'linear-gradient(135deg, #FF9500, #FF3B30)', // 橙色到红色
  'linear-gradient(135deg, #FF9500, #FFCC00)', // 橙色到黄色
  'linear-gradient(135deg, #5856D6, #007AFF)', // 紫色到蓝色
  'linear-gradient(135deg, #34C759, #007AFF)', // 绿色到蓝色
  'linear-gradient(135deg, #FF3B30, #FF9500)', // 红色到橙色
  'linear-gradient(135deg, #007AFF, #FF9500)', // 蓝色到橙色（主色到强调色）
];

// 随机选择一个渐变背景
const randomIndex = Math.floor(Math.random() * gradientBackgrounds.length);
const gradientBackground = ref(gradientBackgrounds[randomIndex]);

const navToTopic = (title) => {
  Taro.navigateTo({
    url: `/pages/topic/index?title=${title}`,
  });
};

const navToCourse = (id) => {
  Taro.navigateTo({
    url: `/pages/course/index?id=${id}`,
  });
};

const props = defineProps({
  title: String,
  description: String,
  listData: {
    type: Array,
    default: () => [],
  },
});
</script>
