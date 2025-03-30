<template>
  <view class="coupon-use-container">
    <view class="page-header">
      <view class="header-title">使用优惠券</view>
    </view>

    <view v-if="loading" class="loading-state">
      <nut-icon name="loading" size="30"></nut-icon>
      <view class="loading-text">加载中...</view>
    </view>

    <view v-else-if="!coupon" class="error-state">
      <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="error-image"></image>
      <view class="error-text">优惠券不存在或已失效</view>
      <nut-button type="primary" size="small" @click="goBack">返回</nut-button>
    </view>

    <view v-else>
      <!-- 优惠券详情 -->
      <view class="coupon-detail">
        <view class="coupon-item">
          <view class="coupon-left">
            <view class="coupon-amount" v-if="coupon.type === 'discount'">
              <text class="amount-value">{{ coupon.value }}</text>
              <text class="amount-unit">折</text>
            </view>
            <view class="coupon-amount" v-else>
              <text class="amount-symbol">¥</text>
              <text class="amount-value">{{ coupon.value }}</text>
            </view>
            <view class="coupon-condition" v-if="coupon.minAmount > 0">满{{ coupon.minAmount }}元可用</view>
          </view>

          <view class="coupon-right">
            <view class="coupon-name">{{ coupon.name }}</view>
            <view class="coupon-desc">{{ coupon.description }}</view>
            <view class="coupon-validity">{{ coupon.startDate }} - {{ coupon.endDate }}</view>
          </view>

          <view class="coupon-tag" v-if="coupon.tag">{{ coupon.tag }}</view>
        </view>
      </view>

      <!-- 使用说明 -->
      <view class="use-instructions">
        <view class="section-title">使用说明</view>
        <view class="instruction-list">
          <view class="instruction-item">
            <nut-icon name="checklist" size="16" color="#2196f3"></nut-icon>
            <text>{{ coupon.type === 'discount' ? '折扣券可直接抵扣商品原价' : '代金券可直接抵扣相应金额' }}</text>
          </view>
          <view class="instruction-item" v-if="coupon.minAmount > 0">
            <nut-icon name="checklist" size="16" color="#2196f3"></nut-icon>
            <text>订单满{{ coupon.minAmount }}元才可使用</text>
          </view>
          <view class="instruction-item">
            <nut-icon name="checklist" size="16" color="#2196f3"></nut-icon>
            <text>{{ coupon.description }}</text>
          </view>
          <view class="instruction-item">
            <nut-icon name="checklist" size="16" color="#2196f3"></nut-icon>
            <text>使用期限: {{ coupon.startDate }} - {{ coupon.endDate }}</text>
          </view>
        </view>
      </view>

      <!-- 可用商品列表 -->
      <view class="available-products">
        <view class="section-title">可用商品</view>
        <view v-if="productList.length === 0" class="empty-state">
          <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
          <view class="empty-text">暂无可用商品</view>
        </view>
        <view v-else class="product-list">
          <view v-for="(product, index) in productList" :key="index" class="product-item" @click="selectProduct(product)">
            <view class="product-image-container">
              <image :src="product.image" mode="aspectFill" class="product-image"></image>
            </view>
            <view class="product-info">
              <view class="product-name">{{ product.name }}</view>
              <view class="product-desc">{{ product.description }}</view>
              <view class="product-price">
                <text class="price-symbol">¥</text>
                <text class="price-value">{{ product.price }}</text>
              </view>
            </view>
            <view class="product-select">
              <nut-icon name="right" size="16" color="#999"></nut-icon>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="bottom-action">
        <nut-button type="default" size="large" @click="goBack">返回</nut-button>
        <nut-button type="primary" size="large" @click="confirmUse" :disabled="productList.length === 0">确认使用</nut-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const couponId = router?.params?.id;

// 加载状态
const loading = ref(true);

// 优惠券数据
const coupon = ref(null);

// 可用商品列表
const productList = ref([]);

// 页面加载时获取数据
onMounted(() => {
  if (!couponId) {
    loading.value = false;
    return;
  }
  
  // 获取优惠券详情
  fetchCouponDetail();
  // 获取可用商品列表
  fetchAvailableProducts();
});

// 获取优惠券详情
const fetchCouponDetail = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟优惠券数据
    const couponData = {
      id: couponId,
      name: '新人专享优惠券',
      description: '适用于所有课程和会员卡',
      type: 'cash',
      value: 50,
      minAmount: 200,
      startDate: '2023-04-01',
      endDate: '2023-05-01',
      status: 'valid',
      tag: '新人专享'
    };
    
    coupon.value = couponData;
    loading.value = false;
  }, 500);
};

// 获取可用商品列表
const fetchAvailableProducts = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟商品数据
    productList.value = [
      {
        id: '1',
        name: '私教课程套餐',
        description: '10节私教课程，专业指导',
        price: 1200,
        image: 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg'
      },
      {
        id: '2',
        name: '年度会员卡',
        description: '全年不限时健身',
        price: 2000,
        image: 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg'
      },
      {
        id: '3',
        name: '团体课程套餐',
        description: '20节团体课程，丰富多样',
        price: 800,
        image: 'https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg'
      }
    ];
  }, 700);
};

// 选择商品
const selectProduct = (product) => {
  Taro.showToast({
    title: `已选择: ${product.name}`,
    icon: 'none',
    duration: 2000
  });
};

// 确认使用优惠券
const confirmUse = () => {
  Taro.showLoading({ title: '处理中...' });
  
  // 模拟网络请求
  setTimeout(() => {
    Taro.hideLoading();
    Taro.showModal({
      title: '使用成功',
      content: '优惠券已成功使用，已为您抵扣相应金额',
      showCancel: false,
      success: () => {
        // 返回上一页
        Taro.navigateBack();
      }
    });
  }, 1000);
};

// 返回上一页
const goBack = () => {
  Taro.navigateBack();
};
</script>

<style lang="scss">
.coupon-use-container {
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

.loading-state, .error-state {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-top: 50px;

  .loading-text, .error-text {
    font-size: 16px;
    color: #999;
    margin: 20px 0;
  }

  .error-image {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }
}

.coupon-detail {
  margin-bottom: 20px;

  .coupon-item {
    position: relative;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 30%;
      width: 1px;
      background: radial-gradient(circle at center, #f0f0f0 0, #f0f0f0 4px, transparent 5px) repeat-y;
      background-size: 1px 15px;
    }

    .coupon-left {
      width: 30%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #f44336;
      color: #fff;

      .coupon-amount {
        display: flex;
        align-items: baseline;

        .amount-symbol {
          font-size: 16px;
          margin-right: 2px;
        }

        .amount-value {
          font-size: 32px;
          font-weight: bold;
        }

        .amount-unit {
          font-size: 16px;
          margin-left: 2px;
        }
      }

      .coupon-condition {
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .coupon-right {
      flex: 1;
      padding: 15px;

      .coupon-name {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }

      .coupon-desc {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
      }

      .coupon-validity {
        font-size: 12px;
        color: #999;
      }
    }

    .coupon-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
      background-color: #ffebee;
      color: #f44336;
    }
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.use-instructions {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .instruction-list {
    .instruction-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      text {
        margin-left: 10px;
        font-size: 14px;
        color: #666;
      }
    }
  }
}

.available-products {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 80px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .empty-state {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-image {
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
    }

    .empty-text {
      font-size: 14px;
      color: #999;
    }
  }

  .product-list {
    .product-item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .product-image-container {
        width: 80px;
        height: 80px;
        margin-right: 15px;
        border-radius: 5px;
        overflow: hidden;

        .product-image {
          width: 100%;
          height: 100%;
        }
      }

      .product-info {
        flex: 1;

        .product-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .product-desc {
          font-size: 12px;
          color: #666;
          margin-bottom: 10px;
        }

        .product-price {
          display: flex;
          align-items: baseline;
          color: #f44336;

          .price-symbol {
            font-size: 12px;
            margin-right: 2px;
          }

          .price-value {
            font-size: 18px;
            font-weight: bold;
          }
        }
      }

      .product-select {
        display: flex;
        align-items: center;
      }
    }
  }
}

.bottom-action {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);

  .nut-button {
    flex: 1;
    margin: 0 5px;
  }
}
</style>