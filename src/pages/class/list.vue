<template>

  <view class="page-container">

    <image class="back-image" src="https://i0.hdslb.com/bfs/archive/136b6c5a3b446e4ba0e2066ac89191b4610d7b28.jpg"/>

    <view class="class-list">

      <view class="class-item" @click="navToClassIndex(item.id)" v-for="(item, index) in classList" :key="index">
        <image class="class-image" :src="item.image"/>

        <view class="class-info">
          <view class="class-title">
            <text>{{ item.title }}</text>
          </view>
          <view class="class-desc">
            <text>{{ item.desc }}</text>
          </view>
          <view class="class-num">
            <text>{{ item.num }}节课</text>
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

.back-image {
  width: 100%;
  object-fit: cover;
}

.class-item {
  margin: 30px 40px;
  display: flex;

  .class-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 30px;
  }

  .class-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .class-title {
      font-weight: bold;
    }

    .class-desc, .class-num {
      color: #9c9999;
    }

    .class-price {
      color: red;
    }
  }
}

</style>
