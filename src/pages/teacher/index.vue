<template>
  <view class="page-container">
    <image class="back-image" :src="avatar"/>
    <view class="coach-info">
      <view class="coach-person">
        <nut-avatar :src="avatar" size="large"/>
        <text class="person-name">
          <text>{{ nickName }}</text>
        </text>
      </view>

      <view class="tag-list">
        <view class="tag-item" v-for="(item, index) in tagList" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>

      <view class="coach-desc">
        <text>{{ desc }}</text>
      </view>

      <view class="coach-qu">
        <view class="coach-qu-item" v-for="(item, index) in coachQuList" :key="index">
          <text>{{ item }}</text>
        </view>
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

</style>
