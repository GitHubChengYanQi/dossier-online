export default [
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
    name: '企业功能',
    path: '/ENT_FUNC',
    component: './Home',
  },{
    name: '在线建册',
    path: '/ZXJC',
    redirect:"/ZXJC/quick",
  },
  {
    name: '快速建册',
    path: '/ZXJC/quick',
    component: './ZXJC/Bookbuilding',
  },
  {
    name: '收费',
    path: '/SF',
    component: './SF',
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
    path: '/BASE_SYSTEM',
    redirect:"/BASE_SYSTEM/system/mgr"
    // component: './layout/System',
  },
  {
    name: '用户管理',
    path: '/BASE_SYSTEM/system',
    // component: './BASE_SYSTEM/system/mgr',
  },
  {
    name: '用户管理',
    path: '/BASE_SYSTEM/system/mgr',
    component: './BASE_SYSTEM/system/mgr',
  },
  {
    name: '角色管理',
    path: '/BASE_SYSTEM/system/role',
    component: './BASE_SYSTEM/system/role',
  },
  {
    name: '部门管理',
    path: '/BASE_SYSTEM/system/dept',
    component: './BASE_SYSTEM/system/dept',
  },
  {
    name: '职位管理',
    path: '/BASE_SYSTEM/system/position',
    component: './BASE_SYSTEM/system/position',
  },
  {
    name: '字典管理',
    path: '/BASE_SYSTEM/system/dictType',
    component: './BASE_SYSTEM/system/dictType',
  },
  {
    name: '菜单管理',
    path: '/BASE_SYSTEM/system/menu',
    component: './BASE_SYSTEM/system/menu',
  },
  {
    name: '登录日志',
    path: '/BASE_SYSTEM/system/loginLog',
    component: './BASE_SYSTEM/system/loginLog',
  }
  ,
  {
    name: '业务日志',
    path: '/BASE_SYSTEM/system/log',
    component: './BASE_SYSTEM/system/log',
  },
  {
    name: '用户登录',
    path: '/user/login',
    component: './User/Login',
    layout:false
  }
]
