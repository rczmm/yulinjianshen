<template>
  <view class="about-container">
    <view class="page-header">
      <view class="header-title">关于我们</view>
    </view>
    
    <view class="app-info">
      <view class="app-logo">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit"></image>
      </view>
      <view class="app-name">羽林健身</view>
      <view class="app-version">版本 1.0.0</view>
    </view>
    
    <view class="about-content">
      <nut-cell-group title="应用介绍">
        <view class="intro-text">
          <text>羽林健身是一款专注于健身训练和健康生活的应用，为用户提供专业的健身指导、个性化训练计划和丰富的健身资源。我们致力于帮助每一位用户科学健身，享受健康生活。</text>
        </view>
      </nut-cell-group>
      
      <nut-cell-group title="主要功能">
        <nut-cell title="个性化训练计划" icon="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-01-64.png">
          <view class="feature-desc">根据用户目标和身体状况，提供定制化的训练计划</view>
        </nut-cell>
        <nut-cell title="专业课程资源" icon="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-19-64.png">
          <view class="feature-desc">提供丰富的健身课程和教学视频，覆盖各种训练类型</view>
        </nut-cell>
        <nut-cell title="训练记录与分析" icon="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-09-64.png">
          <view class="feature-desc">记录训练数据，分析训练效果，帮助用户持续进步</view>
        </nut-cell>
        <nut-cell title="健身社区" icon="https://cdn0.iconfinder.com/data/icons/fitness-and-gym-7/24/fitness-and-gym-15-64.png">
          <view class="feature-desc">连接志同道合的健身爱好者，分享经验和心得</view>
        </nut-cell>
      </nut-cell-group>
      
      <nut-cell-group title="联系我们">
        <nut-cell title="官方网站" is-link url="https://www.yulinjianshen.com">
          <view class="contact-info">www.yulinjianshen.com</view>
        </nut-cell>
        <nut-cell title="客服电话" is-link @click="callService">
          <view class="contact-info">400-123-4567</view>
        </nut-cell>
        <nut-cell title="电子邮箱">
          <view class="contact-info">service@yulinjianshen.com</view>
        </nut-cell>
        <nut-cell title="官方微信">
          <view class="contact-info">yulinjianshen_official</view>
        </nut-cell>
      </nut-cell-group>
      
      <nut-cell-group title="法律信息">
        <nut-cell title="用户协议" is-link @click="showAgreement('user')">
        </nut-cell>
        <nut-cell title="隐私政策" is-link @click="showAgreement('privacy')">
        </nut-cell>
      </nut-cell-group>
    </view>
    
    <view class="copyright">
      <text>© 2023 羽林健身 版权所有</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';

// 拨打客服电话
const callService = () => {
  Taro.makePhoneCall({
    phoneNumber: '4001234567',
    success: function () {
      console.log('拨打电话成功');
    },
    fail: function () {
      console.log('拨打电话失败');
    }
  });
};

// 显示协议内容
const showAgreement = (type) => {
  let title = type === 'user' ? '用户协议' : '隐私政策';
  Taro.showModal({
    title: title,
    content: `这是${title}的内容，详细内容请访问我们的官方网站查看。`,
    showCancel: false,
    confirmText: '我知道了'
  });
};
</script>

<style lang="scss">
.about-container {
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

.app-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  
  .app-logo {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    
    image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .app-name {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }
  
  .app-version {
    font-size: 14px;
    color: #999;
  }
}

.about-content {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  .intro-text {
    padding: 15px;
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
  
  .feature-desc {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
  
  .contact-info {
    font-size: 14px;
    color: #666;
  }
}

.copyright {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 20px 0;
}
</style>