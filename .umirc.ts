import { defineConfig } from '@umijs/max';
import routesList from './src/routers/index';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '妇幼健康服务与管理信息系统',
  },
  history: {type:"hash"},
  routes: routesList,
  npmClient: 'npm',
});

