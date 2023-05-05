import { defineConfig } from '@umijs/max';
import dayjs from "dayjs";

import routeList from "./src/routers";


export default defineConfig({
  antd: {
    // appConfig:{
    // },
    // configProvider:{
    //   locale:zhCN
    // }
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

