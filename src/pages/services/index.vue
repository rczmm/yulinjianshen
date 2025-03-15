<template>
  <view class="page-container">
    <text>教练团队</text>

    <view class="teacher-list">
      <view class="teacher-item" v-for="(item, index) in teacherList" :key="index">
        <nut-avatar size="large" :src="item.img"></nut-avatar>
        <text>{{ item.nickName }}</text>
      </view>
    </view>

    <view class="personal-train">

      <view class="one-one"
            :style="{backgroundImage:
            'url(https://i0.hdslb.com/bfs/archive/b3f38588361455c8391a20378ada471ace4027b2.jpg)', backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
        <text style="color: red">SUPER COACH | 超级私教</text>
        <text style="color: black">真人私教 在线1对1</text>
        <text style="color: grey">专属好教练，陪伴式指导</text>
        <nut-button type="primary" size="small" style="width: 100px">限时预约</nut-button>
      </view>

      <view class="one-more"
            :style="{backgroundImage:
            'url(https://i0.hdslb.com/bfs/archive/b3f38588361455c8391a20378ada471ace4027b2.jpg)', backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
        <text style="color: red">SUPER COACH | 超级私教</text>
        <text style="color: black">真人私教 在线1对1</text>
        <text style="color: grey">专属好教练，陪伴式指导</text>
        <nut-button type="primary" size="small" style="width: 100px">限时预约</nut-button>
      </view>

    </view>

  </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const teacherList = ref<any[]>([]);


onMounted(
  () => {
    Taro.request({
      url: "http://localhost:8088/",
      method: "POST",
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
        teacherList.value = [
          {
            id: "1",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "2",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "3",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "4",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "5",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "6",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "7",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "8",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          }, {
            id: "9",
            nickName: "张三",
            img: "https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg"
          },
        ];
      }
    })
  }
)


</script>


<style lang="scss">

.page-container {
  margin: 30px;

  .teacher-list {
    margin-top: 30px;
    display: flex;
    overflow-x: scroll;

    /* 隐藏 WebKit 浏览器（包括微信小程序）的滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }

    .teacher-item {
      margin-right: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

  }

  .personal-train {
    margin-top: 30px;

    .one-one,.one-more {
      padding: 40px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

  }

}


</style>
