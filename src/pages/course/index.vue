<template>

  <view class="back-view"
        :style="{backgroundImage: `url(${backgroundImage})`,    backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
    <view class="title-view">

      <view class="title-text">

        <view class="title-text-main">
          <text>{{ title }}</text>
        </view>

        <view class="title-text-sub">
          <text>{{ desc }}</text>
        </view>

      </view>

      <view class="title-info">
        <view class="course-time">
          <view class="content">
            <text>{{ time }}</text>
          </view>
          <view class="style">
            分钟
          </view>
        </view>
        <view class="course-energy">
          <view class="content">
            <text>{{ energy }}</text>
          </view>
          <view class="style">
            千卡
          </view>
        </view>
        <view class="course-level">
          <view class="content">
            <text>{{ level }}</text>
          </view>
          <view class="style">
            难度
          </view>
        </view>
      </view>

    </view>

  </view>

  <view class="practice-frequency">
    <view class="desc">
      <text>训练频率</text>
    </view>
    <view class="content">
      <text>每天早餐进行</text>
    </view>
  </view>

  <view class="tabs-view">
    <view :class="['tab-item' ,index == 0 ? 'active' : '']" @click="index = 0">
      <text>动作{{ actionNum }}</text>
    </view>

    <view :class="['tab-item' ,index == 1 ? 'active' : '']" @click="index = 1">
      <text>课程评论{{ commentNum }}</text>
    </view>
  </view>

  <view class="action-list">
    <view class="action-item" v-for="(item, index) in actionList" :key="index">

      <image class="action-image" :src="item.img"></image>

      <view class="action-info">
        <view class="action-title">
          <text>{{ item.title }}</text>
        </view>
        <view class="action-time">
          <text>{{ item.time }}</text>
        </view>
      </view>
    </view>
  </view>

  <view class="comment-view">

    <view class="comment-desc">

      <view class="comment-title">
        <text>课程评论</text>
      </view>

      <view class="comment-write">
        <text>写评论</text>
      </view>

    </view>

    <view class="comment-list">

      <view class="comment-item" v-for="(item, index) in commentList" :key="index">

        <view class="comment-info">

          <view class="comment-person">
            <nut-avatar :src="item.avatar" size="small"></nut-avatar>
            <text>{{ item.author }}</text>
          </view>
          <view class="comment-num">
            <text>{{ item.num }}</text>
          </view>


        </view>

        <view class="comment-content">
          <text>{{ item.content }}</text>
        </view>


      </view>

    </view>

  </view>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const backgroundImage = ref<string>('');
const title = ref<string>('');
const desc = ref<string>('');

const time = ref<string>('');
const energy = ref<string>('');
const level = ref<string>('');

const actionNum = ref<number>(0);
const commentNum = ref<number>(0);

const index = ref<number>(0);

const actionList = ref<any[]>([]);
const commentList = ref<any[]>([]);

onMounted(() => {
  const currentInstance = Taro.getCurrentInstance();
  if (currentInstance.router && currentInstance.router.params && currentInstance.router.params.id) {
    Taro.request({
      url: "http://localhost:8088/",
      method: "POST",
      data: {
        title: currentInstance.router.params.id
      },
      success: (res) => {
        console.log(res);
      },
      fail: () => {
        backgroundImage.value = 'https://i0.hdslb.com/bfs/archive/2bfadd7c0d2736db0e1a0fbaa7c040af74e03cd2.jpg@672w_378h_1c_!web-search-common-cover.avif';
        title.value = '元气补给晨间操';
        desc.value = '美好的一天从晨间操开始';
        time.value = '5';
        energy.value = '35';
        level.value = '零基础';
        actionNum.value = 10;
        commentNum.value = 319;
        actionList.value = [
          {
            id: 1,
            title: '三角拉伸 左',
            time: "5\'\'",
            img: 'https://i0.hdslb.com/bfs/archive/a2f17b6cd62da85a20570a78c08e5f15e66a8581.jpg@672w_378h_1c_!web-search-common-cover.avif'
          }, {
            id: 2,
            title: '三角拉伸 右',
            time: "5\'\'",
            img: 'https://i0.hdslb.com/bfs/archive/a2f17b6cd62da85a20570a78c08e5f15e66a8581.jpg@672w_378h_1c_!web-search-common-cover.avif'
          }, {
            id: 3,
            title: '燕式平衡 左',
            time: "5\'\'",
            img: 'https://i0.hdslb.com/bfs/archive/a2f17b6cd62da85a20570a78c08e5f15e66a8581.jpg@672w_378h_1c_!web-search-common-cover.avif'
          }, {
            id: 4,
            title: '燕式平衡 右',
            time: "5\'\'",
            img: 'https://i0.hdslb.com/bfs/archive/a2f17b6cd62da85a20570a78c08e5f15e66a8581.jpg@672w_378h_1c_!web-search-common-cover.avif'
          },
        ];
        commentList.value = [
          {
            id: 1,
            author: '小明',
            content: '真棒',
            avatar:
              "https://i0.hdslb.com/bfs/archive/773907c94bd341db33a17d6917adaead52e5b09b.jpg@672w_378h_1c_!web-search-common-cover.avif",
            num: 10
          }, {
            id: 2,
            author: '小明',
            content: '真棒',
            avatar:
              "https://i0.hdslb.com/bfs/archive/773907c94bd341db33a17d6917adaead52e5b09b.jpg@672w_378h_1c_!web-search-common-cover.avif",
            num: 10
          }, {
            id: 3,
            author: '小明',
            content: '真棒',
            avatar:
              "https://i0.hdslb.com/bfs/archive/773907c94bd341db33a17d6917adaead52e5b09b.jpg@672w_378h_1c_!web-search-common-cover.avif",
            num: 10
          }, {
            id: 4,
            author: '小明',
            content: '真棒',
            avatar:
              "https://i0.hdslb.com/bfs/archive/773907c94bd341db33a17d6917adaead52e5b09b.jpg@672w_378h_1c_!web-search-common-cover.avif",
            num: 10
          }, {
            id: 5,
            author: '小明',
            content: '真棒',
            avatar:
              "https://i0.hdslb.com/bfs/archive/773907c94bd341db33a17d6917adaead52e5b09b.jpg@672w_378h_1c_!web-search-common-cover.avif",
            num: 10
          }
        ]
      }
    })
  }
})


</script>

<style lang="scss">

.back-view {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-view {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title-text {

    display: flex;
    flex-direction: column;
    align-items: center;

    .title-text-main {
      font-size: 40px;
      color: #fff;
      font-weight: bold;
    }

    .title-text-sub {
      font-size: 20px;
      color: #fff;
      font-weight: bold;
    }
  }

  .title-info {
    width: 400px;
    font-size: 40px;
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: space-between;

    .course-time, .course-energy, .course-level {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

  }

}

.practice-frequency {
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tabs-view {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  border: 2px solid #ccc;
  color: #ccc;

  .tab-item {
    &.active {
      color: black;
      border-bottom: 3px solid yellow;
      padding-bottom: 4px;
    }
  }

}

.action-item {
  margin-top: 2px;
  display: flex;
  align-items: center;

  border-bottom: 2px solid #ccc;

  .action-image {
    object-fit: cover;
    height: 200rpx;
    width: 200rpx;
    margin-right: 20px;
  }

  .action-info {
    padding: 10px;
  }


}

.comment-desc {
  border-top: 5px solid #ccc;
  display: flex;
  justify-content: space-between;
  margin: 20px 40px;
}

.comment-item {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  border-bottom: 2px solid #ccc;


  .comment-info {
    display: flex;
    justify-content: space-between;
  }

}


</style>
