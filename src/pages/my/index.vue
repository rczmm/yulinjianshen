<template>
  <view class="my-view">
    <view class="person-view">
      <view class="person-info">
        <view class="person-avatar">
          <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg"
                 mode="aspectFit"></image>
        </view>
        <view class="person-name">
          <text>{{ name }}</text>
        </view>
        <view class="person-desc">
          <text>{{ desc }}</text>
        </view>
      </view>
    </view>

    <view class="other-view">
      <view class="practice-view">
        <nut-cell title="我的训练">
        </nut-cell>
        <nut-grid>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
        </nut-grid>
      </view>

      <view class="service-view">
        <nut-cell title="我的服务">
        </nut-cell>
        <nut-grid>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
          <nut-grid-item>
            <text>1</text>
          </nut-grid-item>
        </nut-grid>
      </view>

      <view class="list-view">
        <nut-cell title="反馈" is-link>
        </nut-cell>
        <nut-cell title="健身常见问题" is-link>
        </nut-cell>
        <nut-cell title="关于我们" is-link>
        </nut-cell>
        <nut-cell title="退出登录" is-link>
        </nut-cell>
      </view>

    </view>

  </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import './index.scss';

const name = ref('Taro')
const desc = ref('20级')


</script>
