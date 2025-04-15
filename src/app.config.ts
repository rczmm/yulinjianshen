export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/topic/index',
    'pages/course/index',
    'pages/course/list',
    'pages/course/video',
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
      root: 'pages/package_my',
      name: 'myPackage',
      pages: [
        'training/index',
        'training/detail',
        'training/new',
        'course/index',
        'favorite/index',
        'plan/index',
        'plan/detail',
        'plan/create',
        'plan/edit',
        'personal/index',
        'personal/detail',
        'membership/index',
        'coupon/index',
        'coupon/use',
        'order/index',
        'fitness/faq',
        'fitness/index',
        'about/index',
        'profile/index',
        'feedback/index',
        'feedback/reply',
        'faq/index',
        'exercise/index',
        'article/index',
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
