<template>
  <view class="reply-container">
    <view class="page-header">
      <view class="header-title">反馈回复</view>
    </view>
    
    <view class="feedback-card">
      <view class="feedback-header">
        <view class="feedback-type">{{ feedbackData.type }}</view>
        <view class="feedback-time">{{ feedbackData.time }}</view>
      </view>
      
      <view class="feedback-content">
        <text>{{ feedbackData.content }}</text>
      </view>
      
      <view class="feedback-images" v-if="feedbackData.images && feedbackData.images.length > 0">
        <image 
          v-for="(image, index) in feedbackData.images" 
          :key="index" 
          :src="image" 
          mode="aspectFill"
          class="feedback-image"
          @click="previewImage(image)"
        ></image>
      </view>
    </view>
    
    <view class="reply-card">
      <view class="reply-header">
        <view class="reply-title">官方回复</view>
        <view class="reply-time">{{ replyData.time }}</view>
      </view>
      
      <view class="reply-content">
        <text>{{ replyData.content }}</text>
      </view>
      
      <view class="reply-footer">
        <view class="reply-from">来自：{{ replyData.from }}</view>
      </view>
    </view>
    
    <view class="action-buttons">
      <nut-button type="primary" @click="goBack">返回</nut-button>
      <nut-button type="info" @click="contactService">联系客服</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 反馈数据
const feedbackData = ref({
  id: '',
  type: '',
  content: '',
  time: '',
  images: []
});

// 回复数据
const replyData = ref({
  content: '',
  time: '',
  from: '羽林健身客服团队'
});

// 页面加载时获取反馈和回复数据
onMounted(() => {
  const currentInstance = Taro.getCurrentInstance();
  if (currentInstance.router && currentInstance.router.params && currentInstance.router.params.id) {
    const feedbackId = currentInstance.router.params.id;
    // 这里应该从服务器获取反馈和回复数据，暂时使用模拟数据
    fetchFeedbackAndReply(feedbackId);
  } else {
    Taro.showToast({
      title: '参数错误',
      icon: 'none',
      duration: 2000
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  }
});

// 获取反馈和回复数据
const fetchFeedbackAndReply = (id) => {
  // 模拟网络请求
  setTimeout(() => {
    // 根据ID匹配不同的模拟数据
    if (id === '1') {
      feedbackData.value = {
        id: '1',
        type: '功能建议',
        content: '希望能增加更多的训练计划模板，方便用户选择适合自己的计划。',
        time: '2023-04-10 15:30',
        images: [
          'https://i0.hdslb.com/bfs/archive/c6d28cf44bae20cf91c098b24a5bb88d270f4f9d.jpg'
        ]
      };
      replyData.value = {
        content: '感谢您的建议！我们正在开发更多的训练计划模板，预计将在下个版本更新中推出。届时将包括针对不同健身目标和水平的多种计划，敬请期待！',
        time: '2023-04-11 09:15',
        from: '羽林健身产品团队'
      };
    } else if (id === '2') {
      feedbackData.value = {
        id: '2',
        type: '体验问题',
        content: '使用过程中发现课程视频有时加载较慢，希望能优化一下。',
        time: '2023-04-05 09:45',
        images: []
      };
      replyData.value = {
        content: '非常抱歉给您带来不便。我们已经注意到视频加载问题，技术团队正在优化CDN和视频压缩算法，以提升加载速度。同时建议您检查网络连接，或尝试使用WiFi环境观看视频。',
        time: '2023-04-06 14:30',
        from: '羽林健身技术支持'
      };
    } else {
      // 默认数据
      feedbackData.value = {
        id: id,
        type: '未知类型',
        content: '未找到相关反馈内容',
        time: '未知时间',
        images: []
      };
      replyData.value = {
        content: '抱歉，未能找到相关反馈的回复信息。',
        time: '未知时间',
        from: '羽林健身客服团队'
      };
    }
  }, 500);
};

// 预览图片
const previewImage = (current) => {
  Taro.previewImage({
    current: current,
    urls: feedbackData.value.images
  });
};

// 返回上一页
const goBack = () => {
  Taro.navigateBack();
};

// 联系客服
const contactService = () => {
  Taro.showModal({
    title: '联系客服',
    content: '客服热线：400-123-4567\n工作时间：周一至周日 9:00-21:00',
    confirmText: '拨打电话',
    cancelText: '取消',
    success: function (res) {
      if (res.confirm) {
        Taro.makePhoneCall({
          phoneNumber: '4001234567'
        });
      }
    }
  });
};
</script>

<style lang="scss">
.reply-container {
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

.feedback-card, .reply-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.feedback-header, .reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  .feedback-type {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .feedback-time, .reply-time {
    font-size: 12px;
    color: #999;
  }
  
  .reply-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
}

.feedback-content, .reply-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.feedback-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .feedback-image {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
  }
}

.reply-footer {
  display: flex;
  justify-content: flex-end;
  
  .reply-from {
    font-size: 12px;
    color: #999;
  }
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
</style>