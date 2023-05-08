import {Outlet, useModel, useLocation, useNavigate} from 'umi'
import {PageContainer, ProLayout} from "@ant-design/pro-components";
import {Link} from "@@/exports";
import React, {useEffect, useState} from "react";
import TabList from "@/components/TabList";
// import cookie from "js-cookie";
import useAlert from "@/components/useAlert";
import {Spin} from "antd";
import {getAvatarRenderContent} from "@/layouts/rightRender";
import ConfigProvider from "@/components/ConfigProvider";
import {getMyInfo} from "@/services/BASE_SYSTEM/user";
import {baseURI} from "@/utils/Service";
import {request} from "@/utils/Request";
import cookie from "js-cookie";

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
const Main = () => {
    const {initialState, error, refresh, setInitialState} = useModel('@@initialState');
    const {run: deptRun} = useModel("dept");
    const {run: areaRun} = useModel("area");

    const location = useLocation();
    const navigate = useNavigate();
    const useAlertFunc = useAlert();

    const [loading,setLoading] = useState(false);

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


    /**
     * TODO
     * 留着做Tab模式的开关
     * 为True 时 路由都是 replace
     */
    const replace = true;

    if (loading) {
        return (<Spin/>);
    }
    return (
        <ConfigProvider>
            <ProLayout
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
                                await request("/rest/logout",{
                                    method:"GET"
                                });
                                cookie.remove('Authorization');
                                navigate("/user/login",{replace:true})
                            }
                        })
                    }
                }}
                onMenuHeaderClick={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate('/',{replace:true});
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
                <TabList>
                    <Outlet/>
                </TabList>
            </ProLayout>
        </ConfigProvider>);
}
export default Main;