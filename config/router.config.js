export default [
  { path: '/login', component: '../layouts/Login' },
  { path: '/upload', component: '../layouts/UploadImage' },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', component: './User/List' },
      {
        path: '/users',
        name: 'Quản lý người dùng',
        component: './User/List',
        icon: 'user',
      },
      {
        path: '/category',
        name: 'Quản lý chủ đề',
        component: './Category',
        icon: 'container',
       
      },
      {
        path: '/posts',
        name: 'Quản lý bài viết',
        component: './Post',
        icon: 'file-word',
      },

      {
        path: '/group-news',
        name: 'Quản lý nhóm tin',
        component: './GroupNews/index.js',
        icon: 'sound',
      },
      {
        path: '/posts/new-posts',
        component:'./Post/components/CreatePostForm'
      },
      {
        path: '/posts/update-posts/:id',
        component:'./Post/components/EditPostDetail'
      },
    ],
  },
];