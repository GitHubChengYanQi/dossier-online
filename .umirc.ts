import { defineConfig } from '@umijs/max';
import dayjs from "dayjs";
import zhCN from 'antd/locale/zh_CN';
import routeList from "./src/routers";

dayjs.locale('zh-cn');
export default defineConfig({
  antd: {
    appConfig:{
    },
    configProvider:{
      locale:zhCN
    }
  },
  styledComponents: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: ''
  },
  layout: false,
  history: {type:"browser"},
  routes: routeList,
  npmClient: 'npm',
});

