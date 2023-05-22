// @ts-nocheck
import {Outlet, useModel, useLocation, useNavigate,useAppData,matchRoutes} from 'umi'
import {ProLayout} from "@ant-design/pro-components";
import {Link} from "@@/exports";
import React, {useEffect, useMemo, useState} from "react";
import TabList from "@/components/TabList";
// import cookie from "js-cookie";
import useAlert from "@/components/useAlert";
import {getAvatarRenderContent} from "@/layouts/rightRender";
import ConfigProvider from "@/components/ConfigProvider";
import {getMyInfo} from "@/services/BASE_SYSTEM/user";
import {baseURI} from "@/utils/Service";
import {request} from "@/utils/Request";
import cookie from "js-cookie";
import DiyLoading from "@/components/DiyLoading";
import type { IRoute } from 'umi';
import { useAccessMarkedRoutes } from '@@/plugin-access';
import useTabList from "@/components/TabList/useTabList";
import zhCN from 'antd/locale/zh_CN';

const formatMenus = (data: any, parentUrl?: string): any => {
    if (!Array.isArray(data)) {
        return null;
    }
    return data.map((item: any) => {
        const url = (!parentUrl ? "" : parentUrl.replace("#", "")) + (item.url || `/${item.id}`);
        return {
            name: item.name,
            path: url,
            routes: formatMenus(item.subMenus || item.children, url) || []
        }
    });
}

const filterRoutes = (routes: IRoute[], filterFn: (route: IRoute) => boolean) => {
    if (routes.length === 0) {
        return []
    }

    let newRoutes = []
    for (const route of routes) {
        const newRoute = {...route };
        if (filterFn(route)) {
            console.log(route)
            if (Array.isArray(newRoute.routes)) {
                newRoutes.push(...filterRoutes(newRoute.routes, filterFn))
            }
        } else {
            if (Array.isArray(newRoute.children)) {
                newRoute.children = filterRoutes(newRoute.children, filterFn);
                newRoute.routes = newRoute.children;
            }
            newRoutes.push(newRoute);
        }
    }

    return newRoutes;
}

// 格式化路由 处理因 wrapper 导致的 菜单 path 不一致
const mapRoutes = (routes: IRoute[]) => {
    if (routes.length === 0) {
        return []
    }
    return routes.map(route => {
        // 需要 copy 一份, 否则会污染原始数据
        const newRoute = {...route}
        if (route.originPath) {
            newRoute.path = route.originPath
        }

        if (Array.isArray(route.routes)) {
            newRoute.routes = mapRoutes(route.routes);
        }

        if (Array.isArray(route.children)) {
            newRoute.children = mapRoutes(route.children);
        }

        return newRoute
    })
}

const Main = () => {

    const { clientRoutes } = useAppData();

    const {initialState, setInitialState} = useModel('@@initialState');
    const {run: deptRun} = useModel("dept");
    const {run: areaRun} = useModel("area");
    const {run: positionRun} = useModel("position");

    const location = useLocation();
    const navigate = useNavigate();
    const useAlertFunc = useAlert();
    const {clear} = useTabList();

    const [loading, setLoading] = useState(false);

    // const token = cookie.get('Authorization');


    useEffect(() => {
        const _window = window as any;
        _window.ds = {
            ...useAlertFunc
        };
        setLoading(true);
        getMyInfo().then(async response => {
            const {data} = response;
            /**
             * 初始化部门Tree数据
             */
            await deptRun();
            await areaRun();
            await positionRun();
            setInitialState({
                avatar: `${baseURI}${data.avatar}`,
                name: `${data.name}`,
                userInfo: data,
                menus: data.new_menus
            });
            setLoading(false);
        });
    }, [])

    // const jwt = token ? token.split('.') : [];
    // if (jwt.length !== 3) {
    //     console.warn('本地登录信息不存在');
    //     // sessionExpire();
    //     return <Spin/>;
    // }


    // 现在的 layout 及 wrapper 实现是通过父路由的形式实现的, 会导致路由数据多了冗余层级, proLayout 消费时, 无法正确展示菜单, 这里对冗余数据进行过滤操作
    const newRoutes = filterRoutes(clientRoutes.filter(route => route.id === '@@/global-layout'), (route) => {
        return (!!route.isLayout && route.id !== '@@/global-layout') || !!route.isWrapper;
    })
    // const route = mapRoutes(newRoutes);
    const [route] = useAccessMarkedRoutes(mapRoutes(newRoutes));
    /**
     * 错误页面会用到
     * TODO
     */
    const matchedRoute = useMemo(() => matchRoutes(route.children, location.pathname)?.pop?.()?.route, [location.pathname]);

    // console.log(matchedRoute)
    /**
     * TODO
     * 留着做Tab模式的开关
     * 为True 时 路由都是 replace
     */
    const replace = true;

    if (loading) {
        return (<DiyLoading/>);
    }
    return (
        <ConfigProvider locale={zhCN}>
            <ProLayout
                route={route}
                title="信息系统"
                logo='https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'
                layout="mix"
                splitMenus
                location={location}
                avatarProps={{
                    render: () => {
                        return getAvatarRenderContent({
                            initialState,
                            logout: async () => {
                                await request("/rest/logout", {
                                    method: "GET"
                                });
                                cookie.remove('Authorization');
                                // navigate("/user/login", {replace: true})
                                clear();
                                navigate("/user/login")
                            }
                        })
                    }
                }}
                onMenuHeaderClick={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate('/', {replace: true});
                }}
                menuItemRender={(menuItemProps: any, defaultDom: any) => {
                    if (menuItemProps.isUrl || menuItemProps.children) {
                        return defaultDom;
                    }
                    if (menuItemProps.path && location.pathname !== menuItemProps.path) {
                        return (
                            // handle wildcard route path, for example /slave/* from qiankun
                            <Link replace={replace} to={menuItemProps.path.replace('/*', '')}
                                  target={menuItemProps.target}>
                                {defaultDom}
                            </Link>
                        );
                    }
                    return defaultDom;
                }}
                itemRender={(route: any) => <Link replace={replace} to={route.path}>{route.breadcrumbName}</Link>}
                menu={{
                    locale: false,
                    params: initialState,
                    request: () => {
                        return formatMenus(initialState?.menus);
                    },
                }}
                token={{
                    sider: {
                        colorMenuBackground: "#FFF"
                    }
                }}
                contentStyle={{
                    padding: 0
                }}
            >
                {replace ? <TabList>
                    <Outlet/>
                </TabList> : <Outlet/>}
            </ProLayout>
        </ConfigProvider>);
}
export default Main;