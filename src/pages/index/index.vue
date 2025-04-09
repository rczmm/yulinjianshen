<template>
  <view class="index">
    <nut-searchbar
      v-model="searchValue"
      placeholder="搜索课程"
      @search="onSearch"
      background="#F8F8F8"
    >
      <template #leftin>
        <nut-icon name="search" size="14" color="#8E8E93"></nut-icon>
      </template>
    </nut-searchbar>

    <nut-swiper
      class="swiper-view"
      :auto-play="3000"
      pagination-visible
      indicator-color="#AEAEB2"
      indicator-active-color="#007AFF"
    >
      <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
        <image class="swiper-item" :src="item"></image>
      </nut-swiper-item>
    </nut-swiper>

    <nut-grid :column-num="5" class="feature-grid" :border="false" :clickable="true">
      <nut-grid-item v-for="(item, index) in gridList" :key="index" :text="item.text" @click="navToPage(item.text)">
        <nut-avatar size="small" class="feature-avatar">
          <image :src="item.icon" style="object-fit: fill;"/>
        </nut-avatar>
      </nut-grid-item>
    </nut-grid>

    <nut-divider dashed></nut-divider>

    <!--    为你推荐-->
    <view class="recommend-view">
      <view class="recommend-title">
        <view class="recommend-title-main">
          <nut-icon name="fire" color="#FF9500" size="18"></nut-icon>
          <text>为你推荐</text>
        </view>
        <view class="recommend-title-sub">
          <text>根据训练目标和基础为你推荐</text>
        </view>
      </view>

      <view class="recommend-card-list">
        <view class="recommend-card-item" v-for="(item,index) in recommendList" :key="index"
              @click="navToCourseDetail(index)">
          <image :src="item.image" class="recommend-card-image"/>

          <view class="recommend-card-title">
            <text>{{ item.title }}</text>
          </view>

          <view class="recommend-card-info">
            <view class="info-item">
              <nut-icon name="clock" size="12" color="#8E8E93"></nut-icon>
              <text>{{ item.time }}</text>
            </view>
            <text class="dot">·</text>
            <view class="info-item">
              <nut-icon name="fire" size="12" color="#8E8E93"></nut-icon>
              <text>{{ item.energy }}</text>
            </view>
            <text class="dot">·</text>
            <view class="info-item">
              <nut-icon name="chart-line" size="12" color="#8E8E93"></nut-icon>
              <text>{{ item.level }}</text>
            </view>
          </view>

        </view>
      </view>
    </view>

    <nut-divider></nut-divider>

    <view class="featured-programs">
      <view class="section-title">
        <nut-icon name="star" color="#007AFF" size="18"></nut-icon>
        <text>精选训练计划</text>
      </view>
    </view>

    <RCard
      backgroundImage="https://i0.hdslb.com/bfs/archive/dc71302802b7e99320a9f04414536849325853d8.jpg"
      title="上班族醒脑提神"
      description="醒醒 起来上班咯"
      :listData="cardListData"
    ></RCard>
    <RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="关爱打工人，拯救’过年肥‘"
      description="赶走油腻，节后一身轻"
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
      title="学而时炼之"
      description="学生党们看过来"
      :listData="cardListData"
    ></RCard>

  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import RCard from "../../components/RCard/RCard.vue";
import './index.scss';
import Taro from "@tarojs/taro";

const swiperList = ref([
  "https://i0.hdslb.com/bfs/archive/8ddfbb4ba58b32e1c3eed0fd8d771c90f804272e.jpg@672w_378h_1c_!web-search-common-cover.avif",
  "https://i0.hdslb.com/bfs/archive/4418aeab7541aa0fe0f994295f2e2cbbd66e72da.jpg@672w_378h_1c_!web-search-common-cover.avif",
  "https://i2.hdslb.com/bfs/archive/6ee887b30fbf6f836bdef1dfbe5a25f6aaaf18b8.jpg@672w_378h_1c_!web-search-common-cover.avif",
  "https://i0.hdslb.com/bfs/archive/f8c099661a8ef2f1911b704ab13aa0e295e91227.jpg@672w_378h_1c_!web-search-common-cover.avif",
  "https://i0.hdslb.com/bfs/archive/7dc7b2313723603485bf0eef67dd545e5e54e2fa.jpg@672w_378h_1c_!web-search-common-cover.avif",
  "https://i1.hdslb.com/bfs/archive/e9e11aec4486da83755028d9e3dc0ad06313dec4.jpg@672w_378h_1c_!web-search-common-cover.avif"
]);

const gridList = ref([
  {
    text: '课程库',
    icon: "https://archive.biliimg.com/bfs/archive/f78357a9765cf68ffd80df1485d58dbd462cf4ad.jpg@672w_378h_1c_!web-search-common-cover.avif"
  },
  {
    text: '课程专题',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '金牌服务',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '找教练',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '大师课堂',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '减脂减重',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '平坦腹部',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '瘦腿',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '体态',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }, {
    text: '产后修复',
    icon: "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/appointment_calendar_date_event_schedule_office_meeting_reminder_day_plan-64.png"
  }
]);

const recommendList = ref([
  {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  },
  {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }, {
    image: "https://i0.hdslb.com/bfs/archive/3d1b25ce0c6785534011b5272e5706ebd4751722.jpg",
    title: "减脂五分钟体验课",
    time: "6分钟",
    energy: "72千卡",
    level: "零基础"
  }
]);

const cardListData = ref([
  {
    title: "核心力量训练",
    time: "30分钟",
    energy: "250千卡",
    level: "中级",
    image: "https://images.unsplash.com/photo-1534258936927-55d62742ed31?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "HIIT燃脂",
    time: "20分钟",
    energy: "300千卡",
    level: "高级",
    image: "https://images.unsplash.com/photo-1517836357463-d6dd53dc2f48?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "瑜伽初学者",
    time: "45分钟",
    energy: "150千卡",
    level: "初级",
    image: "https://images.unsplash.com/photo-1544367567-65529356adbf?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]);


const navToPage = (text) => {
  if (text === '课程专题') {
    Taro.navigateTo({
      url: '/pages/topic/list'
    })
  } else if (text === '金牌服务') {
    Taro.navigateTo({
      url: '/pages/services/index'
    })
  } else if (text === '找教练') {
    Taro.navigateTo({
      url: '/pages/teacher/list'
    })
  } else if (text === '大师课堂') {
    Taro.navigateTo({
      url: '/pages/class/list'
    })
  } else if (text === '课程库') {
    Taro.navigateTo({
      url: '/pages/course/list'
    })
  } else if (['减脂减重', '平坦腹部', '瘦腿', '体态', '产后修复'].includes(text)) {
    // 根据类别跳转到课程库页面并传递类别参数
    Taro.navigateTo({
      url: `/pages/course/list?category=${text}`
    })
  }
};

const searchValue = ref('');

// 搜索处理函数
const onSearch = () => {
  if (searchValue.value.trim()) {
    // 跳转到课程库页面并传递搜索关键词
    Taro.navigateTo({
      url: `/pages/course/list?keyword=${encodeURIComponent(searchValue.value.trim())}`
    });
  }
};

// 导航到课程详情页
const navToCourseDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/course/index?id=${id}`
  });
};

</script>
