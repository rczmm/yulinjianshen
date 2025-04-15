<template>
  <view class="page-container modern-bg">
    <!-- Main Content -->
      <image class="back-image fade-in-bg" :src="avatar" />
      <view class="coach-info card-shadow slide-up-card">
        <view class="coach-person">
          <nut-avatar class="avatar-element" :src="avatar" size="large" />
          <view class="person-name">
            <text>{{ nickName }}</text>
          </view>
        </view>
        <view class="tag-list">
          <view class="tag-item" v-for="(item, index) in tagList" :key="index">
            <text>{{ item }}</text>
          </view>
        </view>
        <view class="coach-desc fade-in-section">
          <text>{{ desc }}</text>
        </view>
        <view class="section-title fade-in-section">
          <text>教练资质</text>
        </view>
        <view class="coach-qu qu-card fade-in-section">
          <view class="list-item" v-for="(item, index) in coachQuList" :key="index">
            <text>{{ item }}</text>
          </view>
        </view>
        <view class="section-title fade-in-section">
          <text>授课范围</text>
        </view>
        <view class="coach-space space-card fade-in-section">
          <view class="list-item" v-for="(item, index) in coachSpaceList" :key="index">
            <text>{{ item }}</text>
          </view>
        </view>
      </view>
  </view>
</template>
<script setup lang="ts">

import { onMounted, ref } from "vue";
import Taro from "@tarojs/taro";

const avatar = ref<string>("");
const nickName = ref<string>("");
const tagList = ref<string[]>([]);
const desc = ref<string>("");
const coachQuList = ref<string[]>([]);
const coachSpaceList = ref<string[]>([]);

onMounted(() => {
  Taro.request({
    url: "http://localhost:8088/",
    method: "POST",
    timeout: 100,
    success: (res) => {
      console.log(res);
    },
    fail: () => {
      console.log('请求失败');
      avatar.value = 'https://i0.hdslb.com/bfs/archive/c542dcc40102b0386f83579adc03eba6018ac502.jpg';
      nickName.value = 'Alex';
      tagList.value = ['减脂塑形', '翘臀马甲线', '损伤防护'];
      desc.value = '我是一个很懒的人，没有介绍';
      coachQuList.value = ['台湾统域leadship Lv1，Lv2', 'ACE-CPT美国运动委员会私人教练认证', '澳洲壶铃FIT LV1 LV2'];
      coachSpaceList.value = ['中国（上海）', '台湾（台北）', '美国（旧金山）', '德国（慕尼黑）', '西班牙（马德里）']
    }
  })
})

</script>

<style lang="scss">
$primary-light: #a78bfa;
$primary: #8b5cf6;
$primary-dark: #7c3aed;
$secondary-light: #e0e7ff;
$secondary: #c7d2fe;
$bg-start: #f5f3ff;
$bg-end: #e0e7ff;
$text-dark: #1f2937;
$text-medium: #4b5563;
$text-light: #f9fafb;
$white-glass: rgba(255, 255, 255, 0.65);
$white-glass-border: rgba(255, 255, 255, 0.3);
$shadow-color: rgba(124, 58, 237, 0.15);

.page-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.modern-bg {
  background: linear-gradient(145deg, $bg-start 0%, $bg-end 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 50px 0;
}


.back-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 0 0 45px 45px;
  box-shadow: 0 10px 40px rgba(31, 38, 135, 0.15);
  filter: blur(1px) brightness(0.95) saturate(1.1);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  opacity: 0;
  transition: filter 0.4s ease-in-out;
}

.fade-in-bg {
  animation: fadeInBg 1.5s ease-out forwards;
}


.card-shadow {
  background: $white-glass;
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  box-shadow: 0 12px 35px $shadow-color;
  border-radius: 36px;
  width: 90%;
  max-width: 700px;
  margin: 280px auto 0; // Combined margin-top and auto horizontal margin
  padding: 40px 28px 35px 28px;
  position: relative;
  z-index: 2;
  border: 1px solid $white-glass-border;
  opacity: 0;
  transform: translateY(50px);
  transition: box-shadow 0.4s ease, transform 0.4s ease;

  &:hover {
    box-shadow: 0 18px 50px rgba(124, 58, 237, 0.22);
    transform: translateY(-5px);
  }
}

.slide-up-card {
  animation: slideUpCard 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  animation-delay: 0.2s;
}

// --- Coach Personal Info ---
.coach-person {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.avatar-element {
  margin-right: 25px;
  position: absolute;
  top: -75px;
  left: 20px;
  border-radius: 50%;
  box-shadow: 0 8px 25px rgba(31, 38, 135, 0.2);
  border: 5px solid #fff;
  z-index: 3;
  transform: scale(0.8);
  opacity: 0;
  animation: popInAvatar 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 0.6s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.08) rotate(-3deg);
    box-shadow: 0 12px 30px rgba(31, 38, 135, 0.25);
  }
}

.person-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: $text-dark;
  letter-spacing: 0.5px;
  padding-left: 160px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 15px;
  padding: 15px 0 25px 0;
  margin-left: 5px;
}

.tag-item {
  background: linear-gradient(120deg, $primary-light 0%, $primary 100%);
  color: $text-light;
  border-radius: 20px;
  padding: 9px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(139, 92, 246, 0.25);
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease;
  animation: fadeInUpItem 0.6s ease-out forwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{0.8 + $i * 0.1}s;
    }
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.35);
    background: linear-gradient(120deg, $primary 0%, $primary-dark 100%);
  }
}

.coach-desc {
  background: rgba(240, 243, 255, 0.7);
  margin: 20px 0 30px 0;
  padding: 18px 22px;
  border-radius: 18px;
  color: $text-medium;
  font-size: 1rem;
  line-height: 1.6;
  min-height: 40px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 5px rgba(124, 58, 237, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.6);
  position: relative;
}

.section-title {
  margin: 35px 0 18px 5px;
  font-size: 1.25rem;
  font-weight: 600;
  color: $primary-dark;
  letter-spacing: 0.8px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 50px;
    height: 3.5px;
    background: linear-gradient(90deg, $primary-light 0%, $primary 100%);
    border-radius: 3px;
    transform: scaleX(0);
    transform-origin: left;
    animation: scaleXIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    animation-delay: 1.2s;
  }
}

.qu-card,
.space-card {
  background: linear-gradient(135deg, $secondary-light 0%, $secondary 100%);
  border-radius: 24px;
  padding: 20px 25px;
  margin-bottom: 25px;
  box-shadow: 0 6px 20px rgba(199, 210, 254, 0.5);
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.list-item {
  font-size: 0.98rem;
  color: $text-dark;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 14px;
  padding: 12px 18px;
  box-shadow: 0 3px 8px rgba(99, 102, 241, 0.1);
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInFromLeft 0.6s ease-out forwards;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;

  .coach-qu & {
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{1.4 + $i * 0.1}s;
      }
    }
  }

  .coach-space & {
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{1.6 + $i * 0.1}s;
      }
    }
  }

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.18);
    background-color: #fff;
  }
}

// --- General Section Fade-in ---
.fade-in-section {
  opacity: 0;
  animation: fadeInSection 0.8s ease-out forwards;
  animation-delay: 1s;
}

@keyframes fadeInBg {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUpCard {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes popInAvatar {
  0% { opacity: 0; transform: scale(0.5); }
  70% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeInUpItem {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleXIn {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes slideInFromLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInSection {
  from { opacity: 0; }
  to { opacity: 1; }
}

// --- Responsive Adjustments ---
@media (max-width: 600px) {
  .back-image {
    height: 250px;
    border-radius: 0 0 30px 30px;
  }

  .card-shadow {
    width: 92%;
    margin-top: 180px;
    padding: 30px 18px 25px 18px;
    border-radius: 30px;
  }

  .coach-person {
    margin-bottom: 15px;
  }

  .avatar-element {
    top: -55px;
    left: 15px;
    border-width: 4px;
  }

  .person-name {
    font-size: 1.4rem;
    padding-left: 95px;
    padding-top: 5px;
  }

  .tag-list {
    gap: 8px 10px;
    padding: 10px 0 20px 0;
  }

  .tag-item {
    font-size: 0.85rem;
    padding: 7px 16px;
    border-radius: 16px;
  }

  .coach-desc {
    font-size: 0.95rem;
    padding: 15px 18px;
    margin: 15px 0 25px 0;
  }

  .section-title {
    font-size: 1.15rem;
    margin: 25px 0 15px 3px;

    &::after {
      width: 40px;
      bottom: -5px;
    }
  }

  .qu-card,
  .space-card {
    padding: 18px 15px;
    border-radius: 20px;
    gap: 10px;
  }

  .list-item {
    font-size: 0.92rem;
    padding: 10px 15px;
    border-radius: 12px;
  }
}

</style>