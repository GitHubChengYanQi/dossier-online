// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { history } from 'umi';
import cookie from "js-cookie";

export async function getInitialState(): Promise<{ name: string }> {
  const token = cookie.get('tianpeng-token');

  if (!token) {
    history.push('/user/login');
    // throw new Error('本地登录信息不存在');
    return {name:""};
  }
  const jwt = token.split('.');
  if (jwt.length !== 3) {
    // throw new Error('本地登录信息错误');
    history.push('/user/login');
    // throw new Error('本地登录信息不存在');
    return {name:""};
  }
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    layout:"top",
    menu: {
      locale: false,
    },
  };
};
