// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import cookie from "js-cookie";
import {RuntimeAntdConfig} from "@@/plugin-antd/types";
import {RequestConfig} from "@@/plugin-request/request";
import {getMyInfo} from "@/services/BASE_SYSTEM/user";
import {baseURI} from "@/utils/Service";
import ConfigProvider from "@/components/ConfigProvider";
import {initType} from "@/types/common";


export const getInitialState = async (): Promise<initType> => {

    return new Promise((resolve, reject) => {
        getMyInfo().then(async response => {
            const {data} = response;
            resolve({avatar:`${baseURI}${data.avatar}`,name:`${data.name}`, userInfo: data, menus: data.new_menus});
        }).catch(() => {
            reject({});
        });
    });

}

export const rootContainer = (container: any) => {
    // return React.createElement("div", null, container);
    return <ConfigProvider>
        {container}
    </ConfigProvider>
}

// export const layout: RunTimeLayoutConfig = (initialState: any) => {
//     return {
//
//         logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//         layout: "mix",
//
//         childrenRender: (dom) => {
//             if (!initialState.initialState) {
//                 return null;
//             }
//             return <TabList>{dom}</TabList>;
//         },
//         splitMenus: true,
//         menu: {
//             locale: false,
//             // type: 'group',
//             params: initialState,
//             request: () => {
//                 return formatMenus(initialState.initialState.menus);
//             },
//         },
//     };
// };

export const antd: RuntimeAntdConfig = (memo) => {
    // memo.theme ??= {};
    // memo.theme.algorithm = theme.darkAlgorithm; // 配置 antd5 的预设 dark 算法

    memo.appConfig = {
        message: {
            // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
            maxCount: 2,
            top: 300,
        },
        notification: {
            maxCount: 2,
            placement: 'bottomRight',
            bottom: 50,
        }
    }

    return memo;
};

export const request: RequestConfig = {
    timeout: 20000,
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