<template>
  <view class="index">
    <nut-searchbar></nut-searchbar>

    <swiper class="swiper-view">
      <swiper-item>
        <image class="swiper-item"
               src="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image class="swiper-item"
               src="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"></image>
      </swiper-item>
      <swiper-item>
        <image class="swiper-item"
               src="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"></image>
      </swiper-item>
    </swiper>

    <nut-grid :column-num="5">
      <nut-grid-item v-for="(item, index) in 10" :key="index" :text="item">
        <nut-avatar size="small">
          <image
            src="https://i2.hdslb.com/bfs/archive/4eb9dcfa1336cd00433d43a2e526ae2bbf5f3fb6.jpg"
          />
        </nut-avatar>
      </nut-grid-item>
    </nut-grid>

    <nut-divider></nut-divider>

    <RCard
      backgroundImage="https://i0.hdslb.com/bfs/archive/dc71302802b7e99320a9f04414536849325853d8.jpg"
      title="卡片标题"
      description="卡片描述"
      :listData="cardListData"
    ></RCard>
    <RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="唤醒轻盈每一天"
      description="注入新生的能量"
      :listData="cardListData"
    ></RCard>
    <RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="减脂冲刺期"
      description="快速减脂，也是可能的"
      :listData="cardListData"
    ></RCard>
    <RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="卡片标题"
      description="卡片描述"
      :listData="cardListData"
    ></RCard>

  </view>
</template>

<script setup>
import {ref} from 'vue'
import RCard from "../../components/RCard/RCard.vue";
import './index.scss';

const show = ref(false)

const cardListData = ref([
  {
    image: 'https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg',
    title: '列表项标题1',
    time: '时间1',
    energy: '能量1',
    level: '等级1',
  },
  {
    image: 'https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg',
    title: '列表项标题2',
    time: '时间2',
    energy: '能量2',
    level: '等级2',
  }, {
    image: 'https://i2.hdslb.com/bfs/archive/08ff6bb05cb9cf028206691174f2d4125c3a9321.jpg',
    title: '列表项标题2',
    time: '时间2',
    energy: '能量2',
    level: '等级2',
  }
]);

const catgoryList = ref([
  {
    image: "",
    text: ""
  }, {
    image: "",
    text: ""
  },

])


</script>
