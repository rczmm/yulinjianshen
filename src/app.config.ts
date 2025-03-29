export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/topic/index',
    'pages/course/index',
    'pages/course/list',
    'pages/comment/index',
    'pages/topic/list',
    'pages/services/index',
    'pages/teacher/list',
    'pages/teacher/index',
    'pages/class/list',
    'pages/class/index',
  ],
  subpackages: [
    {
      root: 'pages/my',
      name: 'myPackage',
      pages: [
        'training/index',
        'training/detail',
        'training/new',
        'course/index',
        'favorite/index',
        'plan/index',
        'plan/detail',
        'personal/index',
        'membership/index',
        'coupon/index',
        'order/index',
        'fitness/faq',
        'fitness/index',
        'about/index',
        'profile/index',
        'feedback/index',
        'feedback/reply',
        'faq/index'
      ]
    }
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
