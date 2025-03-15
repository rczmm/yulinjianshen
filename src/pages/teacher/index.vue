<template>
  <view class="page-container">
    <image class="back-image" :src="avatar"/>
    <view class="coach-info">
      <view class="coach-person">
        <nut-avatar style="margin-right: 20px;top:-30px" :src="avatar" size="large"/>
        <view class="person-name">
          <text>{{ nickName }}</text>
        </view>
      </view>

      <view class="tag-list">
        <view class="tag-item" v-for="(item, index) in tagList" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>

      <view class="coach-desc">
        <text>{{ desc }}</text>
      </view>

      <view class="coach-qu-title" style="margin-left: 20px;">
        <text>教练资质</text>
      </view>

      <view class="coach-qu">
        <view class="coach-qu-item" v-for="(item, index) in coachQuList" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>

      <view class="coach-space-title" style="margin-left: 20px;">
        <text>授课范围</text>
      </view>

      <view class="coach-space">
        <view class="coach-space-item" v-for="(item, index) in coachSpaceList" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>

    </view>
  </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const avatar = ref<string>("");
const nickName = ref<string>("");
const tagList = ref<string[]>([]);
const desc = ref<string>("");
const coachQuList = ref<string[]>([]);
const coachSpaceList = ref<string[]>([])

onMounted(() => {
  Taro.request({
    url: "http://localhost:8088/",
    method: "POST",
    timeout: 100,
    success: (res) => {
      console.log(res);
    },
    fail: () => {
      console.log('请求失败');
      avatar.value = 'https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg';
      nickName.value = 'Alex';
      tagList.value = ['减脂塑形', '翘臀马甲线', '损伤防护'];
      desc.value = '我是一个很懒的人，没有介绍';
      coachQuList.value = ['台湾统域leadship Lv1，Lv2', 'ACE-CPT美国运动委员会私人教练认证', '澳洲壶铃FIT LV1 LV2'];
      coachSpaceList.value = ['中国（上海）', '台湾（台北）', '美国（旧金山）', '德国（慕尼黑）', '西班牙（马德里）']
    }
  })
})

</script>

<style lang="scss">

.back-image {
  width: 100%;
  object-fit: fill;
}

.coach-info {
  border-radius: 40px;
  width: 98%;

  .coach-person {
    margin-left: 40px;
    display: flex;
  }

  .tag-list {
    display: flex;
    padding: 20px 20px;

    .tag-item {
      margin-right: 20px;
      background-color: #f5f5f5;
      padding: 10px 20px
    }
  }

  .coach-desc {
    background-color: #f5f5f5;
    margin: 20px 20px;
  }

  .coach-qu {
    .coach-qu-item {
      margin-top: 20px;
      margin-left: 20px;
    }
  }

  .coach-space{
    margin-top: 20px;
    margin-left: 20px;
    display: grid;
  }

}


</style>
