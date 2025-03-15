<template>
  <view class="page-container">
    <view class="coach-list">
      <view class="coach-item" v-for="(item, index) in coachList" :key="index" @click="navToCoach(item.id)">
        <nut-avatar :src="item.avatar" size="large"></nut-avatar>
        <view class="coach-info">
          <view class="coach-name">
            <text>{{ item.nickName }}</text>
          </view>
          <view class="coach-tags">
            <view class="coach-tag" v-for="(tag, index) in item.tags" :key="index">
              <text>{{ tag }} -</text>
            </view>
          </view>
        </view>
        <text style="position: absolute;right: 10px">></text>
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
.page-container {
  margin: 30px 20px;

  .coach-list {
    border-top: #666666 2px solid;

    .coach-item {
      display: flex;
      align-items: center;
      margin: 20px 0;

      .coach-info {
        margin-left: 30px;

        .coach-tags {
          margin-top: 20px;
          display: flex;
        }
      }
    }

  }

}


</style>
