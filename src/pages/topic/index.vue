<template>
  <view class="Course-view">
    <view class="title-view"
          :style="{backgroundImage: `url(${backgroundImage})`,    backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
      <view class="title-text-view">

        <view class="title-main">
          <text>{{ mainTitle }}</text>
        </view>

        <view class="title-sub">
          <text>{{ subTitle }}</text>
        </view>

      </view>
    </view>

    <view class="desc-view">
      <text>{{ courseDesc }}</text>
    </view>

    <view class="course-list">
      <view class="course-view" v-for="(item,index) in dataList" :key="index" @click="navToCourse(item.id)">
        <image class="course-image" :src="item.img" mode="aspectFill"/>
        <view class="course-info">
          <view class="course-info-main">
            <view class="course-title">
              <text>{{ item.title }}</text>
            </view>
            <view class="course-desc">
              <text>{{ item.time }}</text>
              <text>·</text>
              <text>{{ item.energy }}</text>
              <text>·</text>
              <text>{{ item.level }}</text>
            </view>
          </view>
          <view class="course-count">
            <text>{{ item.count }}</text>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import './index.scss';
import Taro from '@tarojs/taro';
import {onMounted, ref} from "vue";

const mainTitle = ref<string>('');
const subTitle = ref<string>('');
const courseDesc = ref<string>('');
const dataList = ref<any[]>([]);

const backgroundImage = ref<string>('');

const navToCourse = (id: number) => {
  Taro.navigateTo({
    url: `/pages/course/index?id=${id}`
  })
}

onMounted(() => {
  const currentInstance = Taro.getCurrentInstance();
  if (currentInstance.router && currentInstance.router.params && currentInstance.router.params.title) {
    Taro.request({
      url: "http://localhost:8088/",
      method: "POST",
      data: {
        title: currentInstance.router.params.title
      },
      success: (res) => {
        console.log(res);
      },
      fail: () => {
        mainTitle.value = '这是大标题';
        subTitle.value = '这是副标题';
        courseDesc.value = '这是课程描述';
        dataList.value = [
          {
            id: 1,
            title: '这是课程标题',
            time: '5分钟',
            level: '零基础',
            energy: '35千卡',
            count: '101010人已参与',
            img: 'https://i0.hdslb.com/bfs/archive/a2f17b6cd62da85a20570a78c08e5f15e66a8581.jpg@672w_378h_1c_!web-search-common-cover.avif'
          },
          {
            id: 2,
            title: '这是课程标题',
            time: '5分钟',
            level: '零基础',
            energy: '35千卡',
            count: '101010人已参与',
            img: 'https://i0.hdslb.com/bfs/archive/a2f17b6cd62da85a20570a78c08e5f15e66a8581.jpg@672w_378h_1c_!web-search-common-cover.avif'
          },
        ]
        backgroundImage.value = 'https://i0.hdslb.com/bfs/archive/37b7dd0c82b6fa9ce7df299671f47008ec56d98b.jpg@672w_378h_1c_!web-search-common-cover.avif';
      }
    })
  }
});

</script>

<style lang="scss">

.title-view {
  height: 400px;
  position: relative;

  .title-text-view {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fff;
    font-weight: bold;
  }

}

.desc-view {
  margin: 20px 30px;
}

.course-view {
  display: flex;

  margin: 50px 20px;

  .course-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
  }

  .course-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .course-info-main {
      .course-title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .course-desc {
        font-size: 26px;
        color: #999;
      }
    }

    .course-count {
      color: #999;
    }

  }


}


</style>
