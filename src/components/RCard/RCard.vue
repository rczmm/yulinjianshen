<template>
  <view class="card-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
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
import {defineProps} from 'vue';
import './RCard.scss';
import Taro from '@tarojs/taro';

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
  backgroundImage: String,
  title: String,
  description: String,
  listData: {
    type: Array,
    default: () => [],
  },
});
</script>
