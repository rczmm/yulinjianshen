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
  </view>

</template>

<script setup lang="ts">

</script>
