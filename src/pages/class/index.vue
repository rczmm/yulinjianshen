<template>
  <view class="page-container">

    <view class="swiper-image"
          :style="{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}"
          :class="{'animate-in': isPageLoaded}">
      <view class="overlay"></view>
      <view class="class-info">
        <view class="class-title" :class="{'animate-in': isPageLoaded}">
          <text>{{ classTitle }}</text>
        </view>
        <view class="class-desc" :class="{'animate-in': isPageLoaded}">
          <text>{{ classDesc }}</text>
        </view>
      </view>
    </view>

    <view class="tabs-container">
      <view class="tabs-list">
        <view :class="[index === 0 ? 'active' : '', 'tab-item']" @click="switchTab(0)">
          <text>课程简介</text>
          <view class="tab-indicator" v-if="index === 0"></view>
        </view>
        <view :class="[index === 1 ? 'active' : '', 'tab-item']" @click="switchTab(1)">
          <text>上课学习</text>
          <view class="tab-indicator" v-if="index === 1"></view>
        </view>
      </view>
    </view>

    <view class="tab-content">
      <view v-if="index === 0">
        <view class="coach-desc card-shadow">
          <view class="title">
            <text>讲师简介</text>
          </view>
          <view class="info">
            <nut-avatar size="large" :src="avatar" class="avatar-shadow"/>
            <view class="desc">
              <view class="name">
                <text>{{ name }}</text>
              </view>
              <view class="list">
                <view class="item" v-for="(tag,index) in tagList" :key="index">
                  <text>{{ tag }}</text>
                </view>
              </view>
            </view>
          </view>

        </view>

        <view class="class-special card-shadow">
          <view class="title">
            <text>课程亮点</text>
          </view>
          <view class="desc">
            <view class="desc-item" v-for="(item,index) in descList" :key="index" 
                  :class="{'animate-in': isPageLoaded}" 
                  :style="{animationDelay: index * 0.1 + 's'}">
              <text>{{ item }}</text>
            </view>
          </view>
        </view>

      </view>

      <view v-if="index === 1" class="class-list-container">
        <view class="class-item card-shadow" v-for="(item,idx) in classList" :key="idx"
              :class="{'animate-in': isPageLoaded}" 
              :style="{animationDelay: idx * 0.15 + 's'}">
          <image :src="item.img" class="class-image"/>
          <view class="class-info">
            <view class="title">
              <text>{{ item.title }}</text>
            </view>
            <view class="desc">
              <text>{{ item.desc }}</text>
            </view>
            <view class="class-action">
              <view class="action-btn">开始学习</view>
            </view>
          </view>
        </view>
      </view>

    </view>

    <view class="notice card-shadow">
      <view class="title">
        <text>购买须知</text>
      </view>
      <view class="notice-content">
        <view class="notice-item" v-for="(item,index) in noticeList" :key="index"
              :class="{'animate-in': isPageLoaded}" 
              :style="{animationDelay: index * 0.1 + 's'}">
          <text>{{ item }}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const index = ref<number>(0);
const isPageLoaded = ref<boolean>(false);

const backgroundImage = ref<string>('');
const classTitle = ref<string>('');
const classDesc = ref<string>('');
const name = ref<string>('张三 ZhangSan');
const avatar = ref<string>('https://i1.hdslb.com/bfs/archive/e9e11aec4486da83755028d9e3dc0ad06313dec4.jpg');
const tagList = ref<string[]>(['健身', '运动', '瑜伽']);
const descList = ref<string[]>(['1. 课程内容：专为初学者设计的入门级健身课程', '2. 课程内容：科学的训练方法与正确的动作要领', '3. 课程内容：循序渐进的训练计划，避免运动伤害', '4. 课程内容：专业教练一对一指导，确保训练效果', '5. 课程内容：灵活的课程安排，适合各种时间规划', '6. 课程内容：完整的健身理论与实践相结合']);
const noticeList = ref<string[]>(['1. 课程有效期：购买后30天内有效', '2. 退款政策：课程开始前24小时可申请全额退款', '3. 设备要求：需准备基础健身装备，详情见课程说明', '4. 健康提示：如有特殊健康状况，请先咨询医生', '5. 版权声明：课程内容版权所有，禁止传播分享', '6. 客服支持：工作日9:00-18:00提供在线客服支持']);
const classList = ref<any[]>([
  {
    img: 'https://i2.hdslb.com/bfs/archive/8a1e1f5c6a92f695cf55f6f98bbac5a973bd45e5.jpg',
    title: '基础热身训练',
    desc: '正确的热身方式，预防运动伤害'
  },
  {
    img: 'https://i2.hdslb.com/bfs/archive/8a1e1f5c6a92f695cf55f6f98bbac5a973bd45e5.jpg',
    title: '核心力量训练',
    desc: '增强核心稳定性，改善身体姿态'
  }
])

const switchTab = (tabIndex: number) => {
  index.value = tabIndex;
}

onMounted(() => {
  Taro.request({
    url: 'http://localhost:8088/',
    method: 'POST',
    success: (res) => {
      console.log(res);
      backgroundImage.value = res.data.data.url;
    },
    timeout: 100,
    fail: () => {
      backgroundImage.value = 'https://i2.hdslb.com/bfs/archive/8a1e1f5c6a92f695cf55f6f98bbac5a973bd45e5.jpg';
      classTitle.value = '新手健身第一课';
      classDesc.value = '轻松易懂，健身小白第一步';
    }
  })
  
  // 添加页面加载动画延迟
  setTimeout(() => {
    isPageLoaded.value = true;
  }, 100);
})

</script>

<style lang="scss">

// 全局动画定义
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}

@keyframes slideInLeft {
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.page-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.swiper-image {
  height: 450px;
  width: 100%;
  position: relative;
  background-position: center;
  transition: all 0.5s ease;
  transform: scale(1.02);
  overflow: hidden;
  
  &.animate-in {
    transform: scale(1);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
  }

  .class-info {
    position: absolute;
    bottom: 40px;
    left: 30px;
    padding: 15px;
    z-index: 2;
    width: 80%;

    .class-title {
      color: white;
      font-weight: bold;
      margin-bottom: 15px;
      font-size: 32px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
      
      &.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .class-desc {
      color: rgba(255,255,255,0.9);
      font-size: 16px;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease 0.2s;
      
      &.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}

// 卡片阴影样式
.card-shadow {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0,0,0,0.08);
  }
}

// 标签页样式
.tabs-container {
  background: white;
  padding: 5px 0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.tabs-list {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 500px;
  
  .tab-item {
    padding: 12px 30px;
    position: relative;
    font-size: 16px;
    color: #666;
    transition: all 0.3s ease;
    
    &.active {
      color: #3498db;
      font-weight: bold;
    }
    
    .tab-indicator {
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      height: 3px;
      width: 30px;
      background: #3498db;
      border-radius: 3px;
      animation: scaleIn 0.3s ease;
    }
  }
}

.tab-content {
  margin: 30px 20px;

  .coach-desc {
    .title {
      margin: 10px 0 20px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      position: relative;
      padding-left: 12px;
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 18px;
        background: #3498db;
        border-radius: 2px;
      }
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .avatar-shadow {
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        border: 2px solid white;
      }

      .desc {
        margin-left: 30px;

        .name {
          font-weight: bold;
          margin-bottom: 15px;
          font-size: 18px;
          color: #333;
        }

        .list {
          display: flex;
          flex-wrap: wrap;
          
          .item {
            background: #f0f7ff;
            color: #3498db;
            padding: 6px 12px;
            border-radius: 20px;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }

  .class-special {
    .title {
      margin: 10px 0 20px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      position: relative;
      padding-left: 12px;
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 18px;
        background: #3498db;
        border-radius: 2px;
      }
    }
    
    .desc {
      .desc-item {
        margin-bottom: 15px;
        padding-left: 10px;
        position: relative;
        color: #555;
        line-height: 1.6;
        opacity: 0;
        transform: translateX(-10px);
        
        &.animate-in {
          animation: slideInLeft 0.5s ease forwards;
        }
        
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3498db;
        }
      }
    }
  }
  
  .class-list-container {
    .class-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      
      &.animate-in {
        animation: fadeIn 0.5s ease forwards;
      }
      
      .class-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 8px 8px 0 0;
        transition: transform 0.5s ease;
        
        &:hover {
          transform: scale(1.03);
        }
      }

      .class-info {
        padding: 15px;

        .title {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 8px;
          color: #333;
        }

        .desc {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .class-action {
          .action-btn {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
            }
          }
        }
      }
    }
  }
}

.notice {
  margin: 20px;
  
  .title {
    margin: 10px 0 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    position: relative;
    padding-left: 12px;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 18px;
      background: #e74c3c;
      border-radius: 2px;
    }
  }
  
  .notice-content {
    .notice-item {
      margin-bottom: 12px;
      padding-left: 10px;
      position: relative;
      color: #555;
      line-height: 1.6;
      opacity: 0;
      transform: translateX(-10px);
      
      &.animate-in {
        animation: slideInLeft 0.5s ease forwards;
      }
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #e74c3c;
      }
    }
  }
}

</style>
