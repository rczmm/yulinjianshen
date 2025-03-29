<template>
  <view class="my-view">
    <view class="person-view" @click="editProfile">
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
          <nut-grid-item text="训练记录" @click="navToPage('训练记录')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-09-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
          <nut-grid-item text="我的课程" @click="navToPage('我的课程')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-19-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
          <nut-grid-item text="收藏" @click="navToPage('收藏')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-15-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
          <nut-grid-item text="健身计划" @click="navToPage('健身计划')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-01-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
        </nut-grid>
      </view>

      <view class="service-view">
        <nut-cell title="我的服务">
        </nut-cell>
        <nut-grid>
          <nut-grid-item text="私教课程" @click="navToPage('私教课程')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-02-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
          <nut-grid-item text="会员卡" @click="navToPage('会员卡')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-13-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
          <nut-grid-item text="优惠券" @click="navToPage('优惠券')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-11-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
          <nut-grid-item text="订单" @click="navToPage('订单')">
            <nut-avatar size="small">
              <image src="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-05-64.png" style="object-fit: fill;"/>
            </nut-avatar>
          </nut-grid-item>
        </nut-grid>
      </view>

      <view class="list-view">
        <nut-cell title="反馈" is-link @click="navToPage('反馈')">
        </nut-cell>
        <nut-cell title="健身常见问题" is-link @click="navToPage('健身常见问题')">
        </nut-cell>
        <nut-cell title="关于我们" is-link @click="navToPage('关于我们')">
        </nut-cell>
        <nut-cell title="退出登录" is-link @click="logout">
        </nut-cell>
      </view>

    </view>

  </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import './index.scss';
import Taro from "@tarojs/taro";

const name = ref('Taro')
const desc = ref('20级')

// 导航到不同页面
const navToPage = (pageName) => {
  switch(pageName) {
    case '训练记录':
      Taro.navigateTo({
        url: '/pages/package_my/training/index'
      })
      break;
    case '我的课程':
      Taro.navigateTo({
        url: '/pages/package_my/course/index'
      })
      break;
    case '收藏':
      Taro.navigateTo({
        url: '/pages/package_my/favorite/index'
      })
      break;
    case '健身计划':
      Taro.navigateTo({
        url: '/pages/package_my/plan/index'
      })
      break;
    case '私教课程':
      Taro.navigateTo({
        url: '/pages/package_my/personal/index'
      })
      break;
    case '会员卡':
      Taro.navigateTo({
        url: '/pages/package_my/membership/index'
      })
      break;
    case '优惠券':
      Taro.navigateTo({
        url: '/pages/package_my/coupon/index'
      })
      break;
    case '订单':
      Taro.navigateTo({
        url: '/pages/package_my/order/index'
      })
      break;
    case '反馈':
      Taro.navigateTo({
        url: '/pages/package_my/feedback/index'
      })
      break;
    case '健身常见问题':
      Taro.navigateTo({
        url: '/pages/package_my/fitness/faq'
      })
      break;
    case '关于我们':
      Taro.navigateTo({
        url: '/pages/package_my/about/index'
      })
      break;
    default:
      break;
  }
}

// 编辑个人资料
const editProfile = () => {
  Taro.navigateTo({
    url: '/pages/package_my/profile/index'
  })
}

// 退出登录
const logout = () => {
  Taro.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里可以添加清除用户信息的逻辑
        Taro.showToast({
          title: '已退出登录',
          icon: 'success',
          duration: 2000
        })
        // 返回首页
        setTimeout(() => {
          Taro.reLaunch({
            url: '/pages/index/index'
          })
        }, 2000)
      }
    }
  })
}

</script>
