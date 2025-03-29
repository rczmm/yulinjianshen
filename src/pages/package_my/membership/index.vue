<template>
  <view class="membership-container">
    <view class="page-header">
      <view class="header-title">我的会员卡</view>
    </view>
    
    <view class="membership-card" v-if="membershipInfo.active">
      <view class="card-header">
        <view class="card-title">{{ membershipInfo.type }}</view>
        <view class="card-status">有效</view>
      </view>
      
      <view class="card-info">
        <view class="card-number">卡号：{{ membershipInfo.cardNumber }}</view>
        <view class="card-validity">有效期：{{ membershipInfo.startDate }} 至 {{ membershipInfo.endDate }}</view>
      </view>
      
      <view class="card-benefits">
        <view class="benefit-item" v-for="(benefit, index) in membershipInfo.benefits" :key="index">
          <nut-icon name="check"></nut-icon>
          <text>{{ benefit }}</text>
        </view>
      </view>
      
      <view class="card-footer">
        <view class="card-remaining">
          <text>剩余天数</text>
          <text class="remaining-days">{{ membershipInfo.remainingDays }}天</text>
        </view>
        <nut-button type="primary" size="small" @click="renewMembership">续费</nut-button>
      </view>
    </view>
    
    <view class="no-membership" v-else>
      <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a" class="empty-image"></image>
      <view class="empty-text">您还没有会员卡</view>
      <nut-button type="primary" @click="purchaseMembership">立即开通</nut-button>
    </view>
    
    <nut-popup v-model:visible="showRenewPopup" position="bottom" :style="{ height: '40%' }">
      <view class="renew-popup">
        <view class="popup-header">
          <view class="popup-title">会员续费</view>
          <nut-icon name="close" @click="showRenewPopup = false"></nut-icon>
        </view>
        
        <view class="membership-options">
          <view 
            class="option-item" 
            v-for="(option, index) in membershipOptions" 
            :key="index"
            :class="{ 'option-selected': selectedOption === index }"
            @click="selectedOption = index"
          >
            <view class="option-name">{{ option.name }}</view>
            <view class="option-price">¥{{ option.price }}</view>
            <view class="option-duration">{{ option.duration }}</view>
          </view>
        </view>
        
        <view class="popup-footer">
          <nut-button type="primary" block @click="confirmRenewal">确认续费</nut-button>
        </view>
      </view>
    </nut-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 会员信息
const membershipInfo = reactive({
  active: true,
  type: '健身黄金会员',
  cardNumber: 'VIP88888888',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  remainingDays: 280,
  benefits: [
    '所有课程免费',
    '专属教练1对1指导',
    '高级器材优先使用权',
    '营养餐优惠券每月赠送'
  ]
});

// 续费选项
const membershipOptions = [
  { name: '月卡', price: 199, duration: '1个月' },
  { name: '季卡', price: 499, duration: '3个月' },
  { name: '年卡', price: 1699, duration: '12个月' }
];

const showRenewPopup = ref(false);
const selectedOption = ref(0);

// 续费会员
const renewMembership = () => {
  showRenewPopup.value = true;
};

// 确认续费
const confirmRenewal = () => {
  // 这里添加续费逻辑
  showRenewPopup.value = false;
  // 更新会员信息
  const option = membershipOptions[selectedOption.value];
  const months = option.name === '月卡' ? 1 : option.name === '季卡' ? 3 : 12;
  
  // 模拟更新会员信息
  const endDate = new Date(membershipInfo.endDate);
  endDate.setMonth(endDate.getMonth() + months);
  membershipInfo.endDate = endDate.toISOString().split('T')[0];
  membershipInfo.remainingDays += months * 30;
};

// 购买会员
const purchaseMembership = () => {
  showRenewPopup.value = true;
};
</script>

<style lang="scss">
.membership-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  
  .page-header {
    margin-bottom: 20px;
    
    .header-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  }
  
  .membership-card {
    background: linear-gradient(135deg, #1976d2, #64b5f6);
    border-radius: 12px;
    padding: 20px;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      .card-title {
        font-size: 18px;
        font-weight: bold;
      }
      
      .card-status {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
    
    .card-info {
      margin-bottom: 15px;
      
      .card-number, .card-validity {
        margin-bottom: 8px;
        font-size: 14px;
      }
    }
    
    .card-benefits {
      margin-bottom: 15px;
      
      .benefit-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        
        .nut-icon {
          margin-right: 8px;
        }
      }
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .card-remaining {
        display: flex;
        flex-direction: column;
        
        .remaining-days {
          font-size: 20px;
          font-weight: bold;
          margin-top: 4px;
        }
      }
    }
  }
  
  .no-membership {
    background-color: white;
    border-radius: 12px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .empty-image {
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
    }
    
    .empty-text {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }
  }
  
  .renew-popup {
    padding: 20px;
    
    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      .popup-title {
        font-size: 18px;
        font-weight: bold;
      }
    }
    
    .membership-options {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      
      .option-item {
        flex: 1;
        margin: 0 5px;
        padding: 15px 10px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        
        &.option-selected {
          border-color: #1976d2;
          background-color: rgba(25, 118, 210, 0.05);
        }
        
        .option-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .option-price {
          font-size: 18px;
          color: #f44336;
          margin-bottom: 5px;
        }
        
        .option-duration {
          font-size: 12px;
          color: #666;
        }
      }
    }
    
    .popup-footer {
      padding-top: 10px;
    }
  }
}
</style>