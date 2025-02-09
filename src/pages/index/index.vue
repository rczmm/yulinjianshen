<template>
  <view class="index">
    <nut-searchbar></nut-searchbar>

    <swiper>
      <swiper-item>1</swiper-item>
      <swiper-item>2</swiper-item>
      <swiper-item>3</swiper-item>
    </swiper>

    <nut-grid :column-num="5">

      <nut-grid-item v-for="(item, index) in 10" :key="index" :text="item">
        <text>1</text>
      </nut-grid-item>


    </nut-grid>

    <nut-divider></nut-divider>

    <RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="卡片标题"
      description="卡片描述"
      :listData="cardListData"
    ></RCard><RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="卡片标题"
      description="卡片描述"
      :listData="cardListData"
    ></RCard><RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="卡片标题"
      description="卡片描述"
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

const show = ref(false)
const onClick = () => {
  show.value = true
}

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
  }
]);

</script>
