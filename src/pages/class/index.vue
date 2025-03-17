<template>
  <view class="page-container">

    <view class="swiper-image"
          :style="{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
      <view class="class-info">
        <view class="class-title">
          <text>{{ classTitle }}</text>
        </view>
        <view class="class-desc">
          <text>{{ classDesc }}</text>
        </view>
      </view>
    </view>

    <view class="tabs-list">
      <view :class="[index === 0 ? 'active' : '', 'tab-item']" @click="index = 0">
        <text>课程简介</text>
      </view>
      <view :class="[index === 1 ? 'active' : '', 'tab-item']" @click="index = 1">
        <text>上课学习</text>
      </view>
    </view>

    <view class="tab-content">
      <view v-if="index === 0">
        <view class="coach-desc">
          <view class="title">
            <text>讲师简介</text>
          </view>
          <view class="info">
            <nut-avatar size="large" :src="avatar"/>
            <view class="desc">
              <view class="name">
                <text>{{ name }}</text>
              </view>
              <view class="list">
                <view class="item" v-for="(tag,index) in tagList" :key="index">
                  <text>{{ tag }}</text>
                </view>
              </view>
            </view>
          </view>

        </view>

        <view class="class-special">
          <view class="title">
            <text>课程亮点</text>
          </view>
          <view class="desc">
            <view class="desc-item" v-for="(item,index) in descList" :key="index">
              <text>{{ item }}</text>
            </view>
          </view>
        </view>

      </view>

      <view v-if="index === 1">
        <view class="class-item" v-for="(item,index) in classList" :key="index">
          <image :src="item.img"/>
          <view class="class-info">
            <view class="title">
              <text>{{ item.title }}</text>
            </view>
            <view class="desc">
              <text>{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </view>

    </view>

    <view class="notice">
      <view class="title">
        <text>购买须知</text>
      </view>
      <view class="notice-item" v-for="(item,index) in noticeList" :key="index">
        <text>{{ item }}</text>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const index = ref<number>(0);

const backgroundImage = ref<string>('');
const classTitle = ref<string>('');
const classDesc = ref<string>('');
const name = ref<string>('张三 ZhangSan');
const avatar = ref<string>('https://i1.hdslb.com/bfs/archive/e9e11aec4486da83755028d9e3dc0ad06313dec4.jpg');
const tagList = ref<string[]>(['健身', '运动', '运动']);
const descList = ref<string[]>(['1. 课程内容：', '2. 课程内容：', '3. 课程内容：', '4. 课程内容：', '5. 课程内容：', '6. 课程内容：']);
const noticeList = ref<string[]>(['1. 课程内容：', '2. 课程内容：', '3. 课程内容：', '4. 课程内容：', '5. 课程内容：', '6. 课程内容：']);
const classList = ref<any[]>([
  {
    img: 'https://i2.hdslb.com/bfs/archive/8a1e1f5c6a92f695cf55f6f98bbac5a973bd45e5.jpg',
    title: '课程标题',
    desc: '课程描述'
  },
  {
    img: 'https://i2.hdslb.com/bfs/archive/8a1e1f5c6a92f695cf55f6f98bbac5a973bd45e5.jpg',
    title: '课程标题',
    desc: '课程描述'
  }
])


onMounted(() => {
  Taro.request({
    url: 'http://localhost:8088/',
    method: 'POST',
    success: (res) => {
      console.log(res);
      backgroundImage.value = res.data.data.url;
    },
    timeout: 100,
    fail: () => {
      backgroundImage.value = 'https://i2.hdslb.com/bfs/archive/8a1e1f5c6a92f695cf55f6f98bbac5a973bd45e5.jpg';
      classTitle.value = '新手健身第一课';
      classDesc.value = '轻松易懂，健身小白第一步';
    }
  })
})

</script>

<style lang="scss">

.swiper-image {
  height: 400px;
  width: 100%;
  position: relative;

  .class-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 10px;

    .class-title {
      color: white;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .class-desc {
      color: #9c9999;
    }

  }
}

.tabs-list {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.tab-content {
  margin: 20px 30px;

  .coach-desc {

    .title {
      margin: 20px 0;
    }

    .info {
      display: flex;
      align-items: flex-start;

      .desc {
        margin-left: 30px;

        .name {
          font-weight: bold;
          margin-bottom: 10px;
        }

      }

    }

  }

  .class-special {
    .title {
      margin: 20px 0;
    }

  }

  .class-item {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;

    image {
      width: 250px;
      height: 250px;
      object-fit: cover;
      margin-right: 20px;
    }

    .class-info {

      .title {
        font-weight: bold;
      }

      .desc {
        color: #9c9999;
      }


    }

  }

}

.notice {
  margin: 20px 30px;
}

</style>
