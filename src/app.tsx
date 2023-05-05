// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import cookie from "js-cookie";
import {RequestConfig} from "@@/plugin-request/request";
import {baseURI} from "@/utils/Service";
import {initType} from "@/types/common";


export const getInitialState = async (): Promise<initType> => {
    return {
        avatar: "",
        name: "",
        userInfo: {},
        menus: []
    }
}


export const request: RequestConfig = {
    timeout: 20000,
    withCredentials: true,
    baseURL: baseURI,
    requestInterceptors: [
        (url, options) => {
            // do something
            const token = cookie.get('Authorization');
            options.headers.common.Authorization = token || '';
            options.headers.Authorization = token || '';

            return {url, options}
        },
        // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
        [(url, options) => {
            return {url, options}
        }, (error: Error) => {
            return Promise.reject(error)
        }],
        // 数组，省略错误处理
        [(url, options) => {
            return {url, options}
        }]
    ]
};