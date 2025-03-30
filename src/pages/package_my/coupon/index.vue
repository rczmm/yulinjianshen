  <template>
  <view class="coupon-container">
    <view class="page-header">
      <view class="header-title">我的优惠券</view>
    </view>

    <view class="coupon-filter">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="可使用" pane-key="valid"></nut-tab-pane>
        <nut-tab-pane title="已使用" pane-key="used"></nut-tab-pane>
        <nut-tab-pane title="已过期" pane-key="expired"></nut-tab-pane>
      </nut-tabs>
    </view>

    <view class="coupon-list">
      <view v-if="filteredCouponList.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">暂无优惠券</view>
        <nut-button type="primary" size="small" @click="getCoupon">去领券</nut-button>
      </view>

      <view v-else>
        <view
          v-for="(coupon, index) in filteredCouponList"
          :key="index"
          class="coupon-item"
          :class="{'used': coupon.status === 'used', 'expired': coupon.status === 'expired'}"
        >
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

            <view class="coupon-action">
              <nut-button
                v-if="coupon.status === 'valid'"
                type="primary"
                size="small"
                @click="useCoupon(coupon.id)"
              >立即使用</nut-button>

              <view v-else-if="coupon.status === 'used'" class="coupon-status used">已使用</view>
              <view v-else-if="coupon.status === 'expired'" class="coupon-status expired">已过期</view>
            </view>
          </view>

          <view class="coupon-tag" v-if="coupon.tag">{{ coupon.tag }}</view>
        </view>
      </view>
    </view>

    <view class="coupon-center">
      <view class="section-title">优惠券中心</view>

      <view class="center-list">
        <view v-for="(coupon, index) in centerCouponList" :key="index" class="center-item">
          <view class="center-left">
            <view class="center-amount" v-if="coupon.type === 'discount'">
              <text class="amount-value">{{ coupon.value }}</text>
              <text class="amount-unit">折</text>
            </view>
            <view class="center-amount" v-else>
              <text class="amount-symbol">¥</text>
              <text class="amount-value">{{ coupon.value }}</text>
            </view>
            <view class="center-condition" v-if="coupon.minAmount > 0">满{{ coupon.minAmount }}元可用</view>
          </view>

          <view class="center-right">
            <view class="center-name">{{ coupon.name }}</view>
            <view class="center-desc">{{ coupon.description }}</view>
            <view class="center-validity">{{ coupon.startDate }} - {{ coupon.endDate }}</view>

            <view class="center-action">
              <nut-button
                type="primary"
                size="small"
                @click="receiveCoupon(coupon.id)"
                :disabled="coupon.received"
              >{{ coupon.received ? '已领取' : '立即领取' }}</nut-button>
            </view>
          </view>

          <view class="center-tag" v-if="coupon.tag">{{ coupon.tag }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 活动标签页
const activeTab = ref('valid');

// 优惠券列表
const couponList = ref([]);

// 优惠券中心列表
const centerCouponList = ref([]);

// 根据标签筛选优惠券
const filteredCouponList = computed(() => {
  return couponList.value.filter(coupon => coupon.status === activeTab.value);
});

// 页面加载时获取数据
onMounted(() => {
  // 这里应该从服务器获取数据，暂时使用模拟数据
  fetchCouponData();
  fetchCenterCouponData();
});

// 获取优惠券数据
const fetchCouponData = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟优惠券数据
    couponList.value = [
      {
        id: '1',
        name: '新人专享优惠券',
        description: '适用于所有课程和会员卡',
        type: 'cash',
        value: 50,
        minAmount: 200,
        startDate: '2023-04-01',
        endDate: '2023-05-01',
        status: 'valid',
        tag: '新人专享'
      },
      {
        id: '2',
        name: '会员日优惠券',
        description: '仅限会员日使用',
        type: 'discount',
        value: 8.5,
        minAmount: 0,
        startDate: '2023-04-15',
        endDate: '2023-04-15',
        status: 'valid',
        tag: '限时'
      },
      {
        id: '3',
        name: '私教课程优惠券',
        description: '仅限私教课程使用',
        type: 'cash',
        value: 100,
        minAmount: 500,
        startDate: '2023-03-01',
        endDate: '2023-03-31',
        status: 'expired',
        tag: ''
      },
      {
        id: '4',
        name: '健身器材优惠券',
        description: '仅限健身器材使用',
        type: 'cash',
        value: 200,
        minAmount: 1000,
        startDate: '2023-02-01',
        endDate: '2023-04-01',
        status: 'used',
        tag: ''
      }
    ];
  }, 500);
};

// 获取优惠券中心数据
const fetchCenterCouponData = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟优惠券中心数据
    centerCouponList.value = [
      {
        id: '5',
        name: '五一特惠券',
        description: '适用于所有课程',
        type: 'cash',
        value: 100,
        minAmount: 300,
        startDate: '2023-05-01',
        endDate: '2023-05-07',
        received: false,
        tag: '限时'
      },
      {
        id: '6',
        name: '会员专享券',
        description: '仅限会员使用',
        type: 'discount',
        value: 7.5,
        minAmount: 0,
        startDate: '2023-04-20',
        endDate: '2023-05-20',
        received: true,
        tag: '会员专享'
      },
      {
        id: '7',
        name: '团课优惠券',
        description: '仅限团课使用',
        type: 'cash',
        value: 30,
        minAmount: 100,
        startDate: '2023-04-15',
        endDate: '2023-05-15',
        received: false,
        tag: ''
      }
    ];
  }, 500);
};

// 使用优惠券
const useCoupon = (id) => {
  Taro.navigateTo({
    url: `/pages/package_my/coupon/use?id=${id}`
  });
};

// 领取优惠券
const receiveCoupon = (id) => {
  // 这里应该发送请求到服务器领取优惠券
  Taro.showLoading({ title: '领取中...' });

  // 模拟网络请求
  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: '领取成功',
      icon: 'success',
      duration: 2000
    });

    // 更新优惠券状态
    const coupon = centerCouponList.value.find(item => item.id === id);
    if (coupon) {
      coupon.received = true;

      // 添加到我的优惠券列表
      couponList.value.push({
        ...coupon,
        status: 'valid'
      });
    }
  }, 1000);
};

// 去领券
const getCoupon = () => {
  // 滚动到优惠券中心
  Taro.pageScrollTo({
    selector: '.coupon-center',
    duration: 300
  });
};
</script>

<style lang="scss">
.coupon-container {
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

.coupon-filter {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.coupon-list {
  margin-bottom: 30px;

  .empty-state {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    .empty-image {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
    }

    .empty-text {
      font-size: 16px;
      color: #999;
      margin-bottom: 20px;
    }
  }

  .coupon-item {
    position: relative;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
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

    &.used, &.expired {
      opacity: 0.6;
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
        margin-bottom: 15px;
      }

      .coupon-action {
        display: flex;
        justify-content: flex-end;

        .coupon-status {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;

          &.used {
            background-color: #f0f0f0;
            color: #999;
          }

          &.expired {
            background-color: #ffebee;
            color: #f44336;
          }
        }
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

.coupon-center {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .center-list {
    .center-item {
      position: relative;
      display: flex;
      background-color: #f8f8f8;
      border-radius: 10px;
      margin-bottom: 15px;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 30%;
        width: 1px;
        background: radial-gradient(circle at center, #e0e0e0 0, #e0e0e0 4px, transparent 5px) repeat-y;
        background-size: 1px 15px;
      }

      .center-left {
        width: 30%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #2196f3;
        color: #fff;

        .center-amount {
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

        .center-condition {
          font-size: 12px;
          margin-top: 5px;
        }
      }

      .center-right {
        flex: 1;
        padding: 15px;

        .center-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .center-desc {
          font-size: 12px;
          color: #666;
          margin-bottom: 10px;
        }

        .center-validity {
          font-size: 12px;
          color: #999;
          margin-bottom: 15px;
        }

        .center-action {
          display: flex;
          justify-content: flex-end;
        }
      }

      .center-tag {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 4px;
        background-color: #e3f2fd;
        color: #2196f3;
      }
    }
  }
}
</style>
