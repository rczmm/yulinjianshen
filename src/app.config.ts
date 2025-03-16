export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/topic/index',
    'pages/course/index',
    'pages/comment/index',
    'pages/topic/list',
    'pages/services/index',
    'pages/teacher/list',
    'pages/teacher/index',
    'pages/class/list',
    'pages/class/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
    }, {
      pagePath: 'pages/my/index',
      text: '我的',
    }
    ]
  }
}
