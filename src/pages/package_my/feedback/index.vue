<template>
  <view class="feedback-container">
    <view class="page-header">
      <view class="header-title">意见反馈</view>
    </view>

    <view class="feedback-form">
      <nut-form>
        <!-- 反馈类型 -->
        <nut-form-item label="反馈类型">
          <nut-radio-group v-model="feedbackData.type">
            <nut-radio label="功能建议">功能建议</nut-radio>
            <nut-radio label="体验问题">体验问题</nut-radio>
            <nut-radio label="内容纠错">内容纠错</nut-radio>
            <nut-radio label="其他">其他</nut-radio>
          </nut-radio-group>
        </nut-form-item>

        <!-- 反馈内容 -->
        <nut-form-item label="反馈内容">
          <nut-textarea
            v-model="feedbackData.content"
            placeholder="请详细描述您的问题或建议，以便我们更好地为您解决..."
            max-length="500"
          />
        </nut-form-item>

        <!-- 联系方式 -->
        <nut-form-item label="联系方式">
          <nut-input
            v-model="feedbackData.contact"
            placeholder="请留下您的手机号或邮箱，方便我们与您联系"
            type="text"
          />
        </nut-form-item>

        <!-- 上传图片 -->
        <nut-form-item label="上传图片(选填)">
          <view class="upload-section">
            <view
              v-for="(image, index) in feedbackData.images"
              :key="index"
              class="image-preview"
            >
              <image :src="image" mode="aspectFill"></image>
              <view class="delete-icon" @click="removeImage(index)">
                <nut-icon name="close"></nut-icon>
              </view>
            </view>

            <view class="upload-button" @click="chooseImage" v-if="feedbackData.images.length < 3">
              <nut-icon name="photograph"></nut-icon>
              <text>上传图片</text>
            </view>
          </view>
          <view class="upload-tip">最多上传3张图片，每张不超过5MB</view>
        </nut-form-item>
      </nut-form>

      <view class="form-actions">
        <nut-button type="primary" block @click="submitFeedback">提交反馈</nut-button>
      </view>
    </view>

    <view class="feedback-history">
      <view class="section-title">历史反馈</view>

      <view class="history-list">
        <view v-if="historyList.length === 0" class="empty-history">
          <view class="empty-text">暂无历史反馈</view>
        </view>

        <view v-else>
          <view v-for="(item, index) in historyList" :key="index" class="history-item">
            <view class="history-header">
              <view class="history-type">{{ item.type }}</view>
              <view class="history-status" :class="{'replied': item.replied}">
                {{ item.replied ? '已回复' : '处理中' }}
              </view>
            </view>

            <view class="history-content">{{ item.content }}</view>

            <view class="history-footer">
              <view class="history-time">{{ item.time }}</view>
              <nut-button
                v-if="item.replied"
                type="primary"
                size="small"
                @click="viewReply(item.id)"
              >查看回复</nut-button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 反馈数据
const feedbackData = ref({
  type: '功能建议',
  content: '',
  contact: '',
  images: []
});

// 历史反馈列表
const historyList = ref([]);

// 页面加载时获取历史反馈
onMounted(() => {
  // 这里应该从服务器获取历史反馈，暂时使用模拟数据
  fetchHistoryList();
});

// 获取历史反馈列表
const fetchHistoryList = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟历史反馈数据
    historyList.value = [
      {
        id: '1',
        type: '功能建议',
        content: '希望能增加更多的训练计划模板，方便用户选择适合自己的计划。',
        time: '2023-04-10 15:30',
        replied: true
      },
      {
        id: '2',
        type: '体验问题',
        content: '使用过程中发现课程视频有时加载较慢，希望能优化一下。',
        time: '2023-04-05 09:45',
        replied: true
      },
      {
        id: '3',
        type: '内容纠错',
        content: '在健身知识页面中，关于蛋白质摄入量的描述有误，应该是每公斤体重1.6-2.2克。',
        time: '2023-04-01 14:20',
        replied: false
      }
    ];
  }, 500);
};

// 选择图片
const chooseImage = () => {
  Taro.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      // 最多上传3张图片
      if (feedbackData.value.images.length < 3) {
        feedbackData.value.images.push(res.tempFilePaths[0]);
      }
    }
  });
};

// 移除图片
const removeImage = (index) => {
  feedbackData.value.images.splice(index, 1);
};

// 提交反馈
const submitFeedback = () => {
  // 表单验证
  if (!feedbackData.value.content) {
    Taro.showToast({
      title: '请输入反馈内容',
      icon: 'none'
    });
    return;
  }

  // 这里应该将数据提交到服务器
  Taro.showLoading({ title: '提交中...' });

  // 模拟网络请求
  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    });

    // 重置表单
    feedbackData.value = {
      type: '功能建议',
      content: '',
      contact: '',
      images: []
    };

    // 刷新历史列表
    fetchHistoryList();
  }, 1500);
};

// 查看回复
const viewReply = (id) => {
  Taro.navigateTo({
    url: `/pages/package_my/feedback/reply?id=${id}`
  });
};
</script>

<style lang="scss">
.feedback-container {
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

.feedback-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .upload-section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;

    .image-preview {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .delete-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }

    .upload-button {
      width: 80px;
      height: 80px;
      border: 1px dashed #ddd;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #999;

      text {
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }

  .upload-tip {
    font-size: 12px;
    color: #999;
  }

  .form-actions {
    margin-top: 30px;
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.feedback-history {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .history-list {
    .empty-history {
      padding: 20px;
      text-align: center;

      .empty-text {
        font-size: 14px;
        color: #999;
      }
    }

    .history-item {
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .history-type {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          background-color: #f0f0f0;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .history-status {
          font-size: 12px;
          color: #ff9800;

          &.replied {
            color: #4caf50;
          }
        }
      }

      .history-content {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        line-height: 1.5;
      }

      .history-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .history-time {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
