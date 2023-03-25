import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '妇幼健康服务与管理信息系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '基础功能',
      path: '/BASE_SYSTEM',
      // redirect: '/list'
    },
    {
      name: '企业功能',
      path: '/ENT_FUNC',
      component: './Home',
    },{
      name: '在线建册',
      path: '/ZXJC',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
    },
    {
      name: '系统设置',
      path: '/system',
      // component: '@/layout/System',
      routes:[
        {
          name: '用户管理',
          path: '/system/mgr',
          component: './Table',
        }
      ]
    },
    {
      name: '用户登录',
      path: '/user/login',
      component: './User/Login',
      layout:false
    },
  ],
  npmClient: 'npm',
});

