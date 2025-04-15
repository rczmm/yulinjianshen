<template>
  <view class="profile-container">
    <!-- Header -->
    <view class="page-header">
      <view class="header-title">个人资料</view>
      <view class="header-subtitle">更新你的个人信息，让大家更好地了解你</view>
    </view>

    <!-- Profile Form Card -->
    <view class="profile-card">
      <nut-form>
        <!-- Avatar Section -->
        <nut-form-item class="avatar-item">
          <template #label>
            <view class="form-label">头像</view>
          </template>
          <view class="avatar-upload" @click="chooseImage" role="button" aria-label="选择头像">
            <view class="avatar-wrapper">
              <image
                :src="userInfo.avatar || 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg'"
                mode="aspectFill"
                class="avatar-image"
                :class="{'image-loading': !userInfo.avatar}"
              />
              <view class="avatar-overlay">
                <nut-icon name="camera" size="24" color="#fff"></nut-icon>
                <view class="overlay-text">更换头像</view>
              </view>
            </view>
          </view>
        </nut-form-item>

        <!-- Form Fields -->
        <nut-form-item label="昵称">
           <template #label>
             <view class="form-label">昵称</view>
           </template>
          <nut-input
            v-model="userInfo.name"
            placeholder="请输入昵称"
            type="text"
            class="form-input"
          />
        </nut-form-item>

        <nut-form-item label="性别">
           <template #label>
             <view class="form-label">性别</view>
           </template>
          <nut-radio-group v-model="userInfo.gender" direction="horizontal" class="form-radio-group">
            <nut-radio label="1" shape="button" class="form-radio-button">男</nut-radio>
            <nut-radio label="2" shape="button" class="form-radio-button">女</nut-radio>
          </nut-radio-group>
        </nut-form-item>

        <nut-form-item label="年龄">
           <template #label>
             <view class="form-label">年龄</view>
           </template>
          <nut-input
            v-model="userInfo.age"
            placeholder="请输入年龄"
            type="number"
            class="form-input"
          />
        </nut-form-item>

        <nut-form-item label="健身等级">
          <template #label>
            <view class="form-label">健身等级</view>
          </template>
          <nut-input
            v-model="userInfo.level"
            placeholder="如：初学者, 中级, 高级"
            type="text"
            class="form-input"
          />
        </nut-form-item>

        <nut-form-item label="个人简介">
          <template #label>
            <view class="form-label">个人简介</view>
          </template>
          <nut-textarea
            v-model="userInfo.bio"
            placeholder="简单介绍一下你自己吧"
            max-length="100"
            class="form-textarea"
            limit-show
            autosize
          />
        </nut-form-item>
      </nut-form>
    </view>

    <!-- Action Button -->
    <view class="form-actions">
      <nut-button type="primary" shape="round" block @click="saveProfile" class="save-button">
        保存资料
      </nut-button>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import '@nutui/nutui-taro/dist/style.css'; // Ensure NutUI styles are imported

/*
 * 页面内容概述：
 * 这是一个个人资料页面，用于展示和编辑用户的个人信息。
 *
 * 主要功能：
 * 1. 展示用户的个人信息，包括头像、昵称、性别、年龄、健身等级和个人简介。
 * 2. 允许用户修改个人信息，并保存到服务器。
 * 3. 支持用户选择新的头像图片。
 *
 * 关键信息：
 * - 页面使用了 NutUI 组件库，表明这是一个基于 Vue.js 的移动应用。
 * - 页面加载时会获取用户的当前信息。
 * - 默认头像 URL: 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg'
 */

// 用户信息
const userInfo = ref({
  avatar: '',
  name: '',
  gender: '1', // Default to '1' (Male)
  age: '',
  level: '',
  bio: ''
});

// 页面加载时获取用户信息
onMounted(() => {
  // TODO: Replace mock data with actual API call to fetch user info
  Taro.showLoading({ title: '加载中...' });
  setTimeout(() => { // Simulate API delay
    userInfo.value = {
      avatar: 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg',
      name: '健身爱好者',
      gender: '1',
      age: '28',
      level: '中级',
      bio: '热爱运动，享受生活。目标是成为更好的自己！💪'
    };
    Taro.hideLoading();
  }, 800);
});

// 选择图片
const chooseImage = () => {
  Taro.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0];
      // --- Image Upload Logic ---
      // TODO: Implement actual image upload to server here
      // On successful upload, update userInfo.value.avatar with the new URL
      console.log('Image selected:', tempFilePath);
      // For demonstration, directly update avatar (replace with server URL after upload)
      userInfo.value.avatar = tempFilePath;
      Taro.showToast({ title: '头像待上传', icon: 'none' });
    },
    fail: (err) => {
      console.error('Choose image failed:', err);
      Taro.showToast({ title: '选择图片失败', icon: 'error' });
    }
  });
};

// 保存个人资料
const saveProfile = () => {
  // --- Data Validation (Optional but Recommended) ---
  if (!userInfo.value.name.trim()) {
    Taro.showToast({ title: '昵称不能为空', icon: 'none' });
    return;
  }
  if (userInfo.value.age && (isNaN(Number(userInfo.value.age)) || Number(userInfo.value.age) <= 0)) {
     Taro.showToast({ title: '请输入有效的年龄', icon: 'none' });
     return;
  }

  Taro.showLoading({ title: '正在保存...' });

  // TODO: Replace setTimeout with actual API call to save profile data
  // const profileData = { ...userInfo.value };
  // If avatar was updated via chooseImage, you might need to handle the uploaded URL separately
  // api.saveUserProfile(profileData).then(...)

  console.log('Saving profile:', userInfo.value);

  // Simulate network request
  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500
    });

    // Optionally navigate back or refresh data
    // setTimeout(() => {
    //   Taro.navigateBack();
    // }, 1500);
  }, 1800);
};
</script>

<style lang="scss">
// Import theme variables if available, otherwise define basics
// Assume variables like $primary-color, $bg-color, $text-color etc. exist
// @import '../../styles/theme';

// Define fallback variables if theme is not imported
$primary-color: #1f78ff; // Example primary color
$primary-color-light: #e6f0ff;
$bg-color: #f7f8fa; // Light background
$card-bg-color: #ffffff;
$text-color: #333333;
$text-color-secondary: #666666;
$text-color-placeholder: #c0c4cc;
$border-color: #e0e0e0;
$border-radius-base: 8px;
$border-radius-round: 50px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$shadow-light: 0 4px 12px rgba(0, 0, 0, 0.08);

.profile-container {
  background-color: $bg-color;
  min-height: 100vh;
  padding: $spacing-lg $spacing-md;
  box-sizing: border-box;
}

// --- Header ---
.page-header {
  margin-bottom: $spacing-lg;
  padding-left: $spacing-sm;

  .header-title {
    font-size: 26px;
    font-weight: bold;
    color: $text-color;
    margin-bottom: $spacing-sm / 2;
    line-height: 1.3;
  }

  .header-subtitle {
    font-size: 14px;
    color: $text-color-secondary;
  }
}

// --- Profile Card ---
.profile-card {
  background-color: $card-bg-color;
  border-radius: $border-radius-base * 1.5;
  padding: $spacing-sm $spacing-md $spacing-lg; // Less top padding
  margin-bottom: $spacing-lg * 1.5;
  box-shadow: $shadow-light;
  overflow: hidden; // Ensure child elements conform to border radius

  .nut-form-item {
    padding: $spacing-md 0; // Vertical spacing for items
    margin-bottom: 0; // Remove default margin if any
    border-bottom: 1px solid $border-color; // Subtle separator
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none; // No border for the last item
    }

     // Improve alignment and spacing for labels
    ::v-deep(.nut-cell__title) {
       flex: 0 0 90px; // Fixed width for labels
       font-weight: 500;
       color: $text-color;
       font-size: 15px;
       padding-right: $spacing-md;
    }
     ::v-deep(.nut-cell__value) {
       flex: 1;
       text-align: right; // Align input content to the right
    }

    // Specific styling for avatar item
    &.avatar-item {
       padding-top: $spacing-lg;
       padding-bottom: $spacing-lg;
       align-items: center; // Vertically center avatar content
        ::v-deep(.nut-cell__value) {
          display: flex;
          justify-content: flex-end;
       }
    }
  }
}

// --- Avatar ---
.avatar-upload {
  cursor: pointer;
  display: inline-block; // Allows text-align: right on parent to work

  .avatar-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee; // Placeholder bg
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      .avatar-overlay {
        opacity: 1;
      }
    }
  }

  .avatar-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; // Ensure image covers the area well
    transition: opacity 0.3s ease;

    &.image-loading {
      opacity: 0.5; // Indicate loading state or default
    }
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 0; // Hidden by default
    transition: opacity 0.3s ease;
    pointer-events: none; // Allow clicks to pass through to the wrapper

    .overlay-text {
      font-size: 10px;
      margin-top: 4px;
    }
  }
}


// --- Form Elements ---
.form-label {
  font-weight: 500;
  color: $text-color;
  font-size: 15px;
}

.form-input {
  ::v-deep(.input-text) { // Target NutUI's input text class
    text-align: right; // Align input text
    font-size: 15px;
    color: $text-color;
    padding: $spacing-sm 0; // Add some padding for better touch area if needed
    &::placeholder {
       color: $text-color-placeholder;
    }
  }
   border: none; // Remove default borders if any
   background-color: transparent;
}

.form-radio-group {
   justify-content: flex-end; // Align radios to the right
   .form-radio-button {
     ::v-deep(.nut-radio__button) { // Target NutUI's button style
       border-radius: $border-radius-round;
       border: 1px solid $border-color;
       background-color: #fff;
       color: $text-color-secondary;
       padding: 4px 12px;
       transition: all 0.2s ease;
     }
     ::v-deep(.nut-radio__button--active) {
        border-color: $primary-color;
        background-color: $primary-color-light;
        color: $primary-color;
        font-weight: 500;
     }
     &:not(:last-child) {
       margin-right: $spacing-sm;
     }
   }
}

.form-textarea {
  ::v-deep(.nut-textarea__textarea) {
     text-align: left; // Textarea usually aligned left
     font-size: 15px;
     color: $text-color;
     background-color: #fdfdfd; // Slightly different bg for textarea
     border: 1px solid $border-color;
     border-radius: $border-radius-base;
     padding: $spacing-sm $spacing-md;
     min-height: 80px; // Ensure a minimum height
     &::placeholder {
       color: $text-color-placeholder;
     }
  }
   ::v-deep(.nut-textarea__limit) {
     text-align: right; // Align limit count
   }
   // Adjust positioning within the form item
   width: 100%; // Take full width in its cell
   margin-top: $spacing-sm; // Add margin if label is above
}

// --- Actions ---
.form-actions {
  padding: $spacing-lg $spacing-md 0; // Padding around the button

  .save-button {
    // Use NutUI props first, then add custom styles
    --nut-button-primary-background-color: $primary-color; // Custom primary color
    --nut-button-primary-border-color: $primary-color;
    font-weight: 500;
    letter-spacing: 1px; // Add some letter spacing
    box-shadow: 0 4px 10px rgba($primary-color, 0.3); // Subtle shadow
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:active {
      transform: scale(0.98); // Press effect
    }
  }
}
</style>
