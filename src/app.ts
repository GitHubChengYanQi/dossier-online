// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { history } from 'umi';
import cookie from "js-cookie";
import {request} from "./utils/Request";
const userInfo = {
  url: '/rest/mgr/getMyInfo',
  method: 'POST',
};
export async function getInitialState(): Promise<{ userInfo:any,menus:any }> {

    const response = await request(userInfo);
    console.log(response.data)

  return { userInfo:response.data,menus:response.data.menus };
}

const formatMenus = (data:any,parentUrl?:string):any=>{
  if(!Array.isArray(data)){
    return null;
  }
  return data.map((item:any)=>{
    const url = (!parentUrl?"":parentUrl.replace("#","")) + (item.url||`/${item.id}`);
    return {
      name:item.name,
      path: url,
      routes:formatMenus(item.subMenus||item.children,url)||[]
    }
  });
}

export const layout = (initialState:any) => {
  const token = cookie.get('tianpeng-token');

  const jwt = token?token.split('.'):[];
  if (jwt.length !== 3) {
    // history.push('/user/login');
    console.warn('本地登录信息不存在');
  }
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    layout:"mix",
    splitMenus: true,
    menu: {
      locale: false,
      // type: 'group',
      /**
       * TODO
       * 动态菜单，最后配置
       */
      params: initialState,
      request: ()=>{
        return formatMenus(initialState.initialState.menus);
      },
    },
  };
};