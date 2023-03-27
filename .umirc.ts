import { defineConfig } from '@umijs/max';
import routesList from './src/routers/index';

export default defineConfig({
  antd: {
    appConfig:{
      message: {
        // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
        maxCount: 3,
      },
      notification:{
        placement: 'bottomRight',
        bottom: 50,
      }
    }
  },
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

