<template>
  <view class="page-container">
    <view class="topic-list">
      <view class="topic-item" v-for="(item,index) in topicList" :key="index" @click="navToTopic(item.title)"
            :style="{backgroundImage:`url(${item.img})`,backgroundSize:'cover',backgroundRepeat: 'no-repeat'}">
        <view class="topic-num">
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

.topic-list {
  margin-top: 10px;

  .topic-item {
    display: flex;
    flex-direction: column;
    margin: 20px 20px;
    height: 400px;
    justify-content: space-between;
    position: relative;

    .topic-num {
      font-size: 30px;
      margin-left: 30px;
      width: 150px;
      margin-top: 20px;
      color: white;
      border-bottom: 2px solid white;
    }

    .topic-info {
      margin-left: 30px;
      margin-bottom: 30px;

      .topic-title {
        font-size: 40px;
        margin-bottom: 10px;
        color: white;
        font-weight: bold;
      }

      .topic-desc {
        font-size: 30px;
        color: white;
      }

    }

  }

}


</style>
