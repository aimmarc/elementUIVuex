export const menuData = [
  {
    index: '1',
    text: '管理',
    url: '',
    children: [
      {
        index: '1-1',
        text: '商品管理',
        url: '/goods',
        icon: 'icon_goods',
      },
      {
        index: '1-2',
        text: '顾客管理',
        url: '/custom',
        icon: 'icon_user',
      },
      {
        index: '1-3',
        text: '员工管理',
        url: '/staff',
        icon: 'icon_users',
      },
    ]
  },
  {
    index: '2',
    text: '分析',
    url: '',
    children: [
      {
        index: '2-1',
        text: '收益统计',
        url: '/goods',
        icon: 'icon_income',
      },
      {
        index: '2-2',
        text: '销售统计',
        url: '/goods',
        icon: 'icon_sales',
      },
    ]
  },
  {
    index: '3',
    text: '营销',
    url: '',
    children: [
      {
        index: '3-1',
        text: '折扣活动',
        url: '/goods',
        icon: 'icon_discounts',
      },
      {
        index: '3-2',
        text: '平台协议',
        url: '/protocol',
        icon: 'icon_plat',
      },
    ]
  },
  {
    index: '4',
    text: '其他',
    url: '',
    children: [
      {
        index: '4-1',
        text: '消息中心',
        url: '/newsCenter',
        icon: 'icon_msg',
      },
      {
        index: '4-2',
        text: '常见问题',
        url: '/problem',
        icon: 'icon_help',
      },
      {
        index: '4-3',
        text: '设置',
        url: '/setting',
        icon: 'icon_setting',
      },
    ]
  }
];
