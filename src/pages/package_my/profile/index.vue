<template>
  <view class="profile-container">
    <view class="page-header">
      <view class="header-title">个人资料</view>
    </view>
    
    <view class="profile-form">
      <nut-form>
        <!-- 头像 -->
        <nut-form-item label="头像">
          <view class="avatar-upload" @click="chooseImage">
            <image 
              :src="userInfo.avatar || 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg'" 
              mode="aspectFit"
              class="avatar-image"
            />
            <view class="upload-text">点击更换头像</view>
          </view>
        </nut-form-item>
        
        <!-- 昵称 -->
        <nut-form-item label="昵称">
          <nut-input 
            v-model="userInfo.name" 
            placeholder="请输入昵称" 
            type="text"
          />
        </nut-form-item>
        
        <!-- 性别 -->
        <nut-form-item label="性别">
          <nut-radio-group v-model="userInfo.gender">
            <nut-radio label="1">男</nut-radio>
            <nut-radio label="2">女</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        
        <!-- 年龄 -->
        <nut-form-item label="年龄">
          <nut-input 
            v-model="userInfo.age" 
            placeholder="请输入年龄" 
            type="number"
          />
        </nut-form-item>
        
        <!-- 健身等级 -->
        <nut-form-item label="健身等级">
          <nut-input 
            v-model="userInfo.level" 
            placeholder="请输入健身等级" 
            type="text"
          />
        </nut-form-item>
        
        <!-- 个人简介 -->
        <nut-form-item label="个人简介">
          <nut-textarea 
            v-model="userInfo.bio" 
            placeholder="请输入个人简介" 
            max-length="100"
          />
        </nut-form-item>
      </nut-form>
      
      <view class="form-actions">
        <nut-button type="primary" block @click="saveProfile">保存</nut-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 用户信息
const userInfo = ref({
  avatar: '',
  name: '',
  gender: '1',
  age: '',
  level: '',
  bio: ''
});

// 页面加载时获取用户信息
onMounted(() => {
  // 这里应该从服务器获取用户信息，暂时使用模拟数据
  userInfo.value = {
    avatar: 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg',
    name: 'Taro',
    gender: '1',
    age: '25',
    level: '20级',
    bio: '热爱健身的程序员'
  };
});

// 选择图片
const chooseImage = () => {
  Taro.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      userInfo.value.avatar = res.tempFilePaths[0];
      // 实际应用中，这里应该上传图片到服务器
    }
  });
};

// 保存个人资料
const saveProfile = () => {
  // 这里应该将数据提交到服务器
  Taro.showLoading({ title: '保存中...' });
  
  // 模拟网络请求
  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });
    
    // 返回上一页
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }, 1500);
};
</script>

<style lang="scss">
.profile-container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
  
  .header-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}

.profile-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  
  .avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .avatar-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    
    .upload-text {
      font-size: 14px;
      color: #666;
    }
  }
  
  .form-actions {
    margin-top: 30px;
    padding: 0 20px;
  }
}
</style>