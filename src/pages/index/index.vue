<template>
  <view class="index">
    <nut-searchbar></nut-searchbar>

    <nut-swiper
      class="swiper-view"
      :auto-play="3000"
      pagination-visible
    >
      <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
        <image class="swiper-item" :src="item"></image>
      </nut-swiper-item>
    </nut-swiper>

    <nut-grid :column-num="5">
      <nut-grid-item v-for="(item, index) in gridList" :key="index" :text="item.text">
        <nut-avatar size="small">
          <image
            :src="item.icon" style="object-fit: fill;"
          />
        </nut-avatar>
      </nut-grid-item>


    </nut-grid>

    <nut-divider></nut-divider>

    <!--    为你推荐-->
    <view class="recommend-view">
      <view class="recommend-title">
        <view class="recommend-title-main">
          <text>为你推荐</text>
        </view>
        <view class="recommend-title-sub">
          <text>根据训练目标和基础为你推荐</text>
        </view>
      </view>

      <view class="recommend-card-list">
        <view class="recommend-card-item" v-for="(item,index) in recommendList" :key="index">

          <image :src="item.image" class="recommend-card-image"/>

          <view class="recommend-card-title">
            <text>{{ item.title }}</text>
          </view>

          <view class="recommend-card-info">
            <text>{{ item.time }}</text>
            <text>·</text>
            <text>{{ item.energy }}</text>
            <text>·</text>
            <text>{{ item.level }}</text>
          </view>

        </view>
      </view>
    </view>

    <nut-divider></nut-divider>


    <RCard
      backgroundImage="https://i0.hdslb.com/bfs/archive/dc71302802b7e99320a9f04414536849325853d8.jpg"
      title="上班族醒脑提神"
      description="醒醒 起来上班咯"
      :listData="cardListData"
    ></RCard>
    <RCard
      backgroundImage="https://i1.hdslb.com/bfs/archive/cb398a597840785835f2eb608389f0c5146bb864.jpg"
      title="关爱打工人，拯救“过年肥”"
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
  }
]);

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


</script>

<style lang="scss">

.recommend-view {
  margin: 10px 20px;
}

.recommend-title {
  display: flex;
  margin: 20px auto;
}

.recommend-title-main {
  font-weight: bold;
}

.recommend-title-sub {
  margin-left: 10px;
  color: #666666;
}

.recommend-card-list {
  display: flex;
  overflow-x: scroll;


  /* 隐藏 WebKit 浏览器（包括微信小程序）的滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }

  .recommend-card-item {
    margin-right: 20px;

    .recommend-card-image {
      border-radius: 20px;
      object-fit: cover;
      margin-bottom: 15px;
    }

    .recommend-card-title {
      font-weight: bold;
      margin: 10px auto;
    }

    .recommend-card-info {
      color: #666666;
    }

  }

}


</style>
