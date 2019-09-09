const headerNav = [
  {
    regex: /^\/project\/\S*/,
    navs: [
      {
        name: 'Hợp đồng',
        path: '/project/contract',
      },
      {
        name: 'Dự toán',
        path: '/project/contract/estimating',
      },
      {
        name: 'Thanh toán',
        path: '/project/contract/pay',
      },
      {
        name: 'Thống kê',
        path: '/project/contract/statistic',
      },
      {
        name: 'Danh mục',
        path: '/project/contract/category',
      },
    ],
  },
];

export default headerNav;
