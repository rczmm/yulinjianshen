<template>
  <view class="page-container">
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
      <view :class="['tab-item', index == 0 ? 'active' : '']" @click="scrollToSection(0)">
        <text>动作 <text class="tab-count">{{ actionNum }}</text></text>
      </view>

      <view :class="['tab-item', index == 1 ? 'active' : '']" @click="scrollToSection(1)">
        <text>课程评论 <text class="tab-count">{{ commentNum }}</text></text>
      </view>
    </view>

    <!-- 动作列表内容 -->
    <view v-if="index === 0" class="action-list">
      <view class="action-item" v-for="(item, actionIdx) in actionList" :key="actionIdx">
        <image class="action-image" :src="item.img" mode="aspectFill"></image>
        <view class="action-info">
          <view class="action-title">
            <text>{{ item.title }}</text>
          </view>
          <view class="action-time">
            <text>{{ item.time }}</text>
          </view>
        </view>
        <view class="action-arrow">
          <text class="arrow-icon">></text>
        </view>
      </view>
    </view>

    <!-- 评论内容 -->
    <view v-if="index === 1" class="comment-view">
      <view class="comment-desc">
        <view class="comment-title">
          <text>课程评论</text>
        </view>
        <view class="comment-write">
          <nut-button type="primary" size="small">写评论</nut-button>
        </view>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="(item, commentIdx) in commentList" :key="commentIdx">
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
      <view class="comment-more">
        <nut-cell title="查看更多课程评论" desc=">" @click="navToMoreComment(id)"></nut-cell>
      </view>
    </view>
    <view class="add-course">
      <nut-button type="warning" size="large">添加课程</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const backgroundImage = ref<string>('');
const title = ref<string>('');
const desc = ref<string>('');
const id = ref<string>('');

const time = ref<string>('');
const energy = ref<string>('');
const level = ref<string>('');

const actionNum = ref<number>(0);
const commentNum = ref<number>(0);

const index = ref<number>(0);

const actionList = ref<any[]>([]);
const commentList = ref<any[]>([]);

const navToMoreComment = (id: string) => {
  Taro.navigateTo({
    url: `/pages/comment/index?id=${id}`
  })
}

const scrollToSection = (idx: number) => {
  index.value = idx;

  // 使用nextTick确保DOM已更新
  setTimeout(() => {
    const selector = idx === 0 ? '.action-list' : '.comment-view';
    const query = Taro.createSelectorQuery();
    query.select(selector).boundingClientRect().exec(res => {
      if (res && res[0]) {
        Taro.pageScrollTo({
          scrollTop: res[0].top - 100, // 减去一些偏移量，使滚动位置更合适
          duration: 300
        });
      }
    });
  }, 100);
}

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
        ];
        id.value = "1";
      }
    })
  }
})


</script>

<style lang="scss">
@import '../../styles/theme';

.page-container {
  padding-bottom: 200px;
  background-color: $bg-color-secondary;
}

.back-view {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: $shadow-md;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6));
    z-index: 1;
  }
}

.title-view {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 30px 20px;

  .title-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);

    .title-text-main {
      font-size: 40px;
      color: #fff;
      font-weight: $font-weight-bold;
      margin-bottom: 10px;
    }

    .title-text-sub {
      font-size: 20px;
      color: #fff;
      font-weight: $font-weight-medium;
      opacity: 0.9;
    }
  }

  .title-info {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    font-size: 36px;
    color: #fff;
    font-weight: $font-weight-semibold;
    display: flex;
    justify-content: space-between;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border-radius: $border-radius-lg;
    padding: 15px;

    .course-time, .course-energy, .course-level {
      display: flex;
      flex-direction: column;
      align-items: center;

      .content {
        color: #fff;
        font-size: 32px;
        margin-bottom: 5px;
      }

      .style {
        font-size: 14px;
        opacity: 0.8;
      }
    }
  }
}

.practice-frequency {
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 20px;
  background-color: $bg-color;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;

  .desc {
    font-size: $font-size-medium;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: 8px;
  }

  .content {
    font-size: $font-size-normal;
    color: $text-color-secondary;
  }
}

.tabs-view {
  display: flex;
  justify-content: space-around;
  padding: 15px 20px;
  margin: 0 15px 15px;
  background-color: $bg-color;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;

  .tab-item {
    padding: 8px 15px;
    font-size: $font-size-medium;
    color: $text-color-secondary;
    position: relative;
    transition: all 0.3s ease;

    .tab-count {
      display: inline-block;
      margin-left: 5px;
      font-weight: $font-weight-medium;
      color: $primary-color;
    }

    &.active {
      color: $primary-color;
      font-weight: $font-weight-medium;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background: $accent-color;
        border-radius: 3px;
      }
    }
  }
}

.action-list {
  margin: 0 15px;
  background-color: $bg-color;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;
  overflow: hidden;
}

.action-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid $border-color;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: $bg-color-tertiary;
  }

  .action-image {
    object-fit: cover;
    height: 120rpx;
    width: 120rpx;
    margin-right: 20px;
    border-radius: $border-radius-sm;
    box-shadow: $shadow-sm;
  }

  .action-info {
    flex: 1;

    .action-title {
      font-size: $font-size-medium;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: 8px;
    }

    .action-time {
      font-size: $font-size-small;
      color: $text-color-secondary;
    }
  }

  .action-arrow {
    color: $text-color-tertiary;
    font-size: 18px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.comment-view {
  margin: 20px 15px;
  background-color: $bg-color;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;
  overflow: hidden;
}

.comment-desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid $border-color;

  .comment-title {
    font-size: $font-size-medium;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
  }

  .comment-write {
    .nut-button {
      background-color: $primary-color;
      border: none;
      border-radius: $border-radius-sm;
      font-size: $font-size-small;
      padding: 5px 12px;
    }
  }
}

.comment-list {
  padding: 10px 0;
}

.comment-item {
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  border-bottom: 1px solid $border-color;

  &:last-child {
    border-bottom: none;
  }
}

.comment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .comment-person {
    display: flex;
    align-items: center;
    gap: 10px;

    text {
      font-size: $font-size-normal;
      color: $text-color-primary;
      font-weight: $font-weight-medium;
    }
  }

  .comment-num {
    font-size: $font-size-small;
    color: $text-color-secondary;
  }
}

.comment-content {
  font-size: $font-size-normal;
  line-height: 1.6;
  color: $text-color-secondary;
  padding-left: 5px;
}

.comment-more {
  .nut-cell {
    padding: 15px 20px;
    color: $primary-color;
    font-size: $font-size-normal;
  }
}

.add-course {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 20px 30px;
  background: linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.9));
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 10;

  .nut-button {
    background: linear-gradient(to right, $primary-color, $accent-color);
    border: none;
    border-radius: $border-radius-md;
    font-weight: $font-weight-medium;
    box-shadow: $shadow-md;
  }
}
</style>
