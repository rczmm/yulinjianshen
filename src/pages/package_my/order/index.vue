<template>
  <view class="order-container">
    <view class="page-header">
      <view class="header-title">我的订单</view>
    </view>

    <view class="order-filter">
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="全部" pane-key="all"></nut-tab-pane>
        <nut-tab-pane title="待付款" pane-key="unpaid"></nut-tab-pane>
        <nut-tab-pane title="待使用" pane-key="unused"></nut-tab-pane>
        <nut-tab-pane title="已完成" pane-key="completed"></nut-tab-pane>
        <nut-tab-pane title="已取消" pane-key="canceled"></nut-tab-pane>
      </nut-tabs>
    </view>

    <view class="order-list">
      <view v-if="filteredOrderList.length === 0" class="empty-state">
        <image src="https://i0.hdslb.com/bfs/archive/03ec2bfe5e369a8b8e73ba4d2816caf8835cb2f7.jpg" mode="aspectFit" class="empty-image"></image>
        <view class="empty-text">暂无订单</view>
        <nut-button type="primary" size="small" @click="goShopping">去购买</nut-button>
      </view>

      <view v-else>
        <view v-for="(order, index) in filteredOrderList" :key="index" class="order-item" @click="viewOrderDetail(order.id)">
          <view class="order-header">
            <view class="order-number">订单号：{{ order.orderNumber }}</view>
            <view class="order-status" :class="getStatusClass(order.status)">
              {{ getStatusText(order.status) }}
            </view>
          </view>

          <view class="order-content">
            <view class="product-info">
              <view class="product-image">
                <image :src="order.productImage" mode="aspectFill"></image>
              </view>

              <view class="product-details">
                <view class="product-name">{{ order.productName }}</view>
                <view class="product-desc">{{ order.productDesc }}</view>
                <view class="product-price">
                  <text class="price-symbol">¥</text>
                  <text class="price-value">{{ order.price }}</text>
                </view>
              </view>
            </view>
          </view>

          <view class="order-footer">
            <view class="order-time">{{ order.createTime }}</view>

            <view class="order-actions">
              <nut-button
                v-if="order.status === 'unpaid'"
                type="primary"
                size="small"
                @click.stop="payOrder(order.id)"
              >立即付款</nut-button>

              <nut-button
                v-if="order.status === 'unpaid'"
                type="default"
                size="small"
                @click.stop="cancelOrder(order.id)"
              >取消订单</nut-button>

              <nut-button
                v-if="order.status === 'unused'"
                type="primary"
                size="small"
                @click.stop="useOrder(order.id)"
              >立即使用</nut-button>

              <nut-button
                v-if="order.status === 'completed'"
                type="default"
                size="small"
                @click.stop="commentOrder(order.id)"
              >评价</nut-button>

              <nut-button
                v-if="order.status === 'canceled' || order.status === 'completed'"
                type="default"
                size="small"
                @click.stop="deleteOrder(order.id)"
              >删除</nut-button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 活动标签页
const activeTab = ref('all');

// 订单列表
const orderList = ref([]);

// 根据标签筛选订单
const filteredOrderList = computed(() => {
  if (activeTab.value === 'all') {
    return orderList.value;
  } else {
    return orderList.value.filter(order => order.status === activeTab.value);
  }
});

// 页面加载时获取订单列表
onMounted(() => {
  // 这里应该从服务器获取订单列表，暂时使用模拟数据
  fetchOrderList();
});

// 获取订单列表
const fetchOrderList = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟订单数据
    orderList.value = [
      {
        id: '1',
        orderNumber: 'YL20230415001',
        status: 'unpaid',
        productName: '健身年卡',
        productDesc: '无限次健身，专属教练指导',
        productImage: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        price: 2999,
        createTime: '2023-04-15 14:30:25'
      },
      {
        id: '2',
        orderNumber: 'YL20230410002',
        status: 'unused',
        productName: '私教课程套餐',
        productDesc: '10次私教课程，专业指导',
        productImage: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        price: 1500,
        createTime: '2023-04-10 10:15:36'
      },
      {
        id: '3',
        orderNumber: 'YL20230405003',
        status: 'completed',
        productName: '营养餐套餐',
        productDesc: '30天健身营养餐，科学配比',
        productImage: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        price: 1200,
        createTime: '2023-04-05 16:45:12'
      },
      {
        id: '4',
        orderNumber: 'YL20230401004',
        status: 'canceled',
        productName: '瑜伽课程',
        productDesc: '15次瑜伽课程，舒缓压力',
        productImage: 'https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg',
        price: 800,
        createTime: '2023-04-01 09:20:45'
      }
    ];
  }, 500);
};

// 获取状态样式类
const getStatusClass = (status) => {
  switch (status) {
    case 'unpaid':
      return 'status-unpaid';
    case 'unused':
      return 'status-unused';
    case 'completed':
      return 'status-completed';
    case 'canceled':
      return 'status-canceled';
    default:
      return '';
  }
};

// 获取状态文本
const getStatusText = (status) => {
  switch (status) {
    case 'unpaid':
      return '待付款';
    case 'unused':
      return '待使用';
    case 'completed':
      return '已完成';
    case 'canceled':
      return '已取消';
    default:
      return '';
  }
};

// 查看订单详情
const viewOrderDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/my/order/detail?id=${id}`
  });
};

// 支付订单
const payOrder = (id) => {
  Taro.navigateTo({
    url: `/pages/my/order/pay?id=${id}`
  });
};

// 取消订单
const cancelOrder = (id) => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消这个订单吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里应该发送请求到服务器取消订单
        Taro.showLoading({ title: '取消中...' });

        // 模拟网络请求
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title: '已取消订单',
            icon: 'success',
            duration: 2000
          });

          // 更新订单状态
          const order = orderList.value.find(item => item.id === id);
          if (order) {
            order.status = 'canceled';
          }
        }, 1000);
      }
    }
  });
};

// 使用订单
const useOrder = (id) => {
  Taro.navigateTo({
    url: `/pages/my/order/use?id=${id}`
  });
};

// 评价订单
const commentOrder = (id) => {
  Taro.navigateTo({
    url: `/pages/my/order/comment?id=${id}`
  });
};

// 删除订单
const deleteOrder = (id) => {
  Taro.showModal({
    title: '提示',
    content: '确定要删除这个订单吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里应该发送请求到服务器删除订单
        Taro.showLoading({ title: '删除中...' });

        // 模拟网络请求
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title:'已删除订单',
            icon: 'success',
            duration: 2000
          });
          
          // 从列表中移除该订单
          const index = orderList.value.findIndex(item => item.id === id);
          if (index !== -1) {
            orderList.value.splice(index, 1);
          }
        }, 1000);
      }
    }
  });
};

// 去购买
const goShopping = () => {
  Taro.switchTab({
    url: '/pages/index/index'
  });
};
</script>

<style lang="scss">
.order-container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;

  .page-header {
    margin-bottom: 20px;
    
    .header-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  }

  .order-filter {
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .order-list {
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

      .empty-image {
        width: 200px;
        height: 150px;
        margin-bottom: 15px;
      }

      .empty-text {
        font-size: 16px;
        color: #999;
        margin-bottom: 15px;
      }
    }

    .order-item {
      margin-bottom: 15px;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 15px;
        border-bottom: 1px solid #f0f0f0;

        .order-number {
          font-size: 14px;
          color: #666;
        }

        .order-status {
          font-size: 14px;
          font-weight: bold;

          &.status-unpaid {
            color: #ff6b00;
          }

          &.status-unused {
            color: #2979ff;
          }

          &.status-completed {
            color: #07c160;
          }

          &.status-canceled {
            color: #999;
          }
        }
      }

      .order-content {
        padding: 15px;

        .product-info {
          display: flex;

          .product-image {
            width: 80px;
            height: 80px;
            margin-right: 12px;
            border-radius: 4px;
            overflow: hidden;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .product-details {
            flex: 1;

            .product-name {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              margin-bottom: 6px;
            }

            .product-desc {
              font-size: 14px;
              color: #666;
              margin-bottom: 8px;
            }

            .product-price {
              font-size: 16px;
              color: #ff4d4f;
              font-weight: bold;

              .price-symbol {
                font-size: 14px;
              }

              .price-value {
                font-size: 18px;
              }
            }
          }
        }
      }

      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 15px;
        border-top: 1px solid #f0f0f0;
        background-color: #fafafa;

        .order-time {
          font-size: 12px;
          color: #999;
        }

        .order-actions {
          display: flex;
          gap: 8px;
        }
      }
    }
  }
}
</style>
