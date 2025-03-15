# 玉林健身小程序

## 项目介绍

玉林健身小程序是一款基于Taro和Vue3开发的健身服务应用，旨在为用户提供健身课程、教练服务、健身话题交流等功能，帮助用户更好地进行健身活动。

## 技术栈

- 框架：[Taro](https://taro.jd.com/) 4.0.8 + [Vue 3](https://v3.cn.vuejs.org/)
- UI组件库：[NutUI-Taro](https://nutui.jd.com/#/)
- 语言：[TypeScript](https://www.typescriptlang.org/)
- 样式：[Sass](https://sass-lang.com/)
- 构建工具：[Webpack 5](https://webpack.js.org/)

## 安装与运行

### 环境要求

- Node.js (推荐 14.x 以上版本)
- npm 或 yarn

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn
```

### 运行项目

```bash
# 微信小程序
npm run dev:weapp
# 或
yarn dev:weapp

# H5版本
npm run dev:h5
# 或
yarn dev:h5

# 其他平台
# 支付宝小程序
npm run dev:alipay
# 百度小程序
npm run dev:swan
# 字节跳动小程序
npm run dev:tt
# QQ小程序
npm run dev:qq
```

### 打包构建

```bash
# 微信小程序
npm run build:weapp
# 或
yarn build:weapp

# H5版本
npm run build:h5
# 或
yarn build:h5

# 其他平台构建命令类似
```

## 项目结构

```
├── config                 // Taro配置目录
│   ├── dev.ts            // 开发环境配置
│   ├── index.ts          // 主配置文件
│   └── prod.ts           // 生产环境配置
├── src                    // 源代码目录
│   ├── components        // 公共组件
│   │   └── RCard         // 卡片组件
│   ├── pages             // 页面目录
│   │   ├── comment       // 评论页面
│   │   ├── course        // 课程页面
│   │   ├── index         // 首页
│   │   ├── my            // 我的页面
│   │   ├── services      // 服务页面
│   │   ├── teacher       // 教练页面
│   │   └── topic         // 话题页面
│   ├── app.config.ts     // 全局配置
│   ├── app.scss          // 全局样式
│   ├── app.ts            // 入口文件
│   └── index.html        // H5入口HTML
├── babel.config.js        // Babel配置
├── package.json           // 项目依赖
├── project.config.json    // 小程序项目配置
├── tsconfig.json          // TypeScript配置
└── yarn.lock              // Yarn依赖锁定文件
```

## 主要功能

- **首页**：展示推荐课程、热门话题等内容
- **课程**：浏览和报名健身课程
- **话题**：健身相关话题讨论和分享
- **教练**：查看教练信息和预约服务
- **评论**：用户评价和反馈
- **个人中心**：用户个人信息和订单管理

## 多端适配

本项目使用Taro框架开发，支持多端适配：

- 微信小程序
- H5网页版
- 支付宝小程序
- 百度小程序
- 字节跳动小程序
- QQ小程序

## 开发指南

### 新增页面

1. 在`src/pages`目录下创建新的页面目录和文件
2. 在`src/app.config.ts`中添加页面路径

### 组件开发

1. 在`src/components`目录下创建新的组件
2. 使用NutUI组件库提供的组件或自定义组件

### 样式开发

项目使用Sass预处理器，可以在各组件中使用`.scss`文件定义样式。

## 贡献指南

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 许可证

本项目使用MIT许可证 - 详见LICENSE文件