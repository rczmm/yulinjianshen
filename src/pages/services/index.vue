<template>
  <view class="page-container">
    <view class="section-header">
      <view class="title-container">
        <view class="title-line"></view>
        <view class="section-title">
          <text>精英教练团队</text>
        </view>
        <!-- <view class="title-line"></view> -->
      </view>
    </view>

    <view class="teacher-list-container">
      <view class="teacher-list">
        <view class="teacher-item" v-for="(item, index) in teacherList" :key="index" @click="navToTeacher(item.id)">
          <view class="avatar-container">
            <nut-avatar size="large" :src="item.img" class="teacher-avatar"></nut-avatar>
            <view class="avatar-overlay">
              <nut-icon name="eye" size="14"></nut-icon>
              <view class="view-text">
                <text>查看</text>
              </view>
            </view>
          </view>
          <view class="teacher-name">
            <text> {{ item.nickName }}</text>
          </view>
          <view class="teacher-tag">
            <text>私教导师</text>
          </view>
        </view>
      </view>
    </view>


    <view class="personal-train">
      <view class="service-card one-one">
        <view class="service-content">
          <view class="service-badge">PREMIUM</view>
          <text class="service-title">一对一私教</text>
          <text class="service-subtitle">专属定制，精准指导</text>
          <view class="service-features">
            <view class="feature-item">
              <nut-icon name="check-normal" size="14" color="#4CAF50"></nut-icon>
              <text>个性化训练计划</text>
            </view>
            <view class="feature-item">
              <nut-icon name="check-normal" size="14" color="#4CAF50"></nut-icon>
              <text>实时调整训练强度</text>
            </view>
            <view class="feature-item">
              <nut-icon name="check-normal" size="14" color="#4CAF50"></nut-icon>
              <text>专业营养指导</text>
            </view>
          </view>
          <nut-button type="primary" class="book-btn" @click="bookService('one-one')">立即预约</nut-button>
        </view>
      </view>

      <view class="service-card one-more">
        <view class="service-content">
          <view class="service-badge">POPULAR</view>
          <text class="service-title">小团体课程</text>
          <text class="service-subtitle">高效训练，互相激励</text>
          <view class="service-features">
            <view class="feature-item">
              <nut-icon name="check-normal" size="14" color="#4CAF50"></nut-icon>
              <text>科学训练方案</text>
            </view>
            <view class="feature-item">
              <nut-icon name="check-normal" size="14" color="#4CAF50"></nut-icon>
              <text>团队氛围激励</text>
            </view>
            <view class="feature-item">
              <nut-icon name="check-normal" size="14" color="#4CAF50"></nut-icon>
              <text>性价比更高</text>
            </view>
          </view>
          <nut-button type="primary" class="book-btn" @click="bookService('one-more')">立即预约</nut-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Taro from "@tarojs/taro";

const teacherList = ref<any[]>([]);
// 移除滚动相关变量和函数，使用纯CSS实现横向滚动

// 导航到教练详情页
const navToTeacher = (id: string) => {
  Taro.navigateTo({
    url: `/pages/teacher/index?id=${id}`
  });

  // 添加点击动画效果
  Taro.showToast({
    title: '正在加载教练信息',
    icon: 'loading',
    duration: 800
  });
};

// 预约服务
const bookService = (type: string) => {
  Taro.showToast({
    title: '预约成功',
    icon: 'success',
    duration: 2000
  });

  // 这里可以添加实际的预约逻辑
  console.log(`预约${type}服务`);
};

onMounted(() => {
  Taro.request({
    url: "http://localhost:8088/",
    method: "POST",
    success: (res) => {
      console.log(res);
    },
    fail: (err) => {
      console.log(err);
      // 模拟数据 - 为了展示效果，给每个教练不同的名字和随机图片
      const names = ["张教练", "李教练", "王教练", "赵教练", "刘教练", "陈教练", "杨教练", "黄教练", "周教练"];
      teacherList.value = Array.from({ length: 9 }, (_, i) => ({
        id: String(i + 1),
        nickName: names[i],
        img: `https://i0.hdslb.com/bfs/archive/e1a9f7783e7d63725685f0fc905cbb2a488937ee.jpg`
      }));
    }
  });
});
</script>


<style lang="scss">
.page-container {
  margin: 30px;
  padding-bottom: 50px;

  // 通用标题样式
  .section-header {
    margin: 40px 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .title-line {
        width: 30px;
        height: 2px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(66, 133, 244, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
        margin: 0 15px;
      }

      .section-title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
    }

    .section-subtitle {
      font-size: 14px;
      color: #999;
      letter-spacing: 2px;
    }
  }

  // 教练列表样式
  .teacher-list-container {
    position: relative;
    margin: 40px 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; // 增强移动端滚动体验
    
    // 隐藏滚动条但保留滚动功能
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none; // IE and Edge

    .teacher-list {
      display: flex;
      padding: 10px 0;
      white-space: nowrap;

      .teacher-item {
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 120px;
        position: relative;
        transform: translateY(0);
        transition: all 0.3s ease;

        &:hover,
        &:active {
          transform: translateY(-5px);
        }

        .avatar-container {
          position: relative;
          margin-bottom: 10px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

          .teacher-avatar {
            transition: transform 0.3s ease;
          }

          .avatar-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;

            .view-text {
              color: white;
              font-size: 12px;
              margin-top: 5px;
            }
          }

          &:hover {
            .teacher-avatar {
              transform: scale(1.1);
            }

            .avatar-overlay {
              opacity: 1;
            }
          }
        }

        .teacher-name {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .teacher-tag {
          font-size: 12px;
          color: #4285f4;
          background-color: rgba(66, 133, 244, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
        }
      }
    }

    .scroll-controls {
      display: flex;
      justify-content: space-between;
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;

      .scroll-btn {
        width: 30px;
        height: 30px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.2s ease;

        &:hover {
          background: #4285f4;
          color: white;
          transform: scale(1.1);
        }

        &.prev {
          margin-left: -15px;
        }

        &.next {
          margin-right: -15px;
        }
      }
    }
  }

  // 私教服务卡片样式
  .personal-train {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;

    .service-card {
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      height: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
      }

      &.one-one {
        background: linear-gradient(135deg, #6e8efb, #a777e3);

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://i0.hdslb.com/bfs/archive/b3f38588361455c8391a20378ada471ace4027b2.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          mix-blend-mode: overlay;
        }
      }

      &.one-more {
        background: linear-gradient(135deg, #11998e, #38ef7d);

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://i0.hdslb.com/bfs/archive/b3f38588361455c8391a20378ada471ace4027b2.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          mix-blend-mode: overlay;
        }
      }

      .service-content {
        position: relative;
        z-index: 1;
        padding: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: white;

        .service-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .service-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          margin-top: 20px;
        }

        .service-subtitle {
          font-size: 16px;
          opacity: 0.8;
          margin-bottom: 30px;
        }

        .service-features {
          margin-bottom: 30px;

          .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            text {
              margin-left: 10px;
              font-size: 14px;
            }
          }
        }

        .book-btn {
          align-self: flex-start;
          border-radius: 30px;
          padding: 0 30px;
          height: 40px;
          font-weight: bold;
          background: rgba(255, 255, 255, 0.25);
          border: none;
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;

          &:hover,
          &:active {
            background: rgba(255, 255, 255, 0.4);
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style>
