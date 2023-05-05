import {Outlet, useModel, useLocation, useNavigate} from 'umi'
import {ProLayout} from "@ant-design/pro-components";
import {Link} from "@@/exports";
import React, {useEffect} from "react";
import TabList from "@/components/TabList";
import cookie from "js-cookie";
import useAlert from "@/components/useAlert";
import {Spin} from "antd";
import {getAvatarRenderContent} from "@/layouts/rightRender";
import ConfigProvider from "@/components/ConfigProvider";
import {getMyInfo} from "@/services/BASE_SYSTEM/user";
import {baseURI} from "@/utils/Service";

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
const Main =()=> {
    const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    const {run:deptRun} = useModel("dept");

    const location = useLocation();
    const navigate = useNavigate();
    const useAlertFunc = useAlert();

    const token = cookie.get('Authorization');



    useEffect(() => {
        const _window = window as any;
        _window.ds = {
            ...useAlertFunc
        };
        getMyInfo().then(async response => {
            const {data} = response;
            /**
             * 初始化部门Tree数据
             */
            await deptRun();
            setInitialState({avatar: `${baseURI}${data.avatar}`, name: `${data.name}`, userInfo: data, menus: data.new_menus});
        });
    }, [])

    const jwt = token ? token.split('.') : [];
    if (jwt.length !== 3) {
        console.warn('本地登录信息不存在');
        // sessionExpire();
        return <Spin/>;
    }


    /**
     * TODO
     * 留着做Tab模式的开关
     * 为True 时 路由都是 replace
     */
    const replace = true;

    if(loading){
        return (<Spin/>);
    }
    return (
        <ConfigProvider>
            <ProLayout
                title="妇幼健康服务与管理信息系统"
                logo='https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'
                layout="mix"
                splitMenus
                location={location}
                avatarProps={{
                    render: () => {
                        return getAvatarRenderContent({
                            initialState,
                            logout: () => {
                            }
                        })
                    }
                }}
                onMenuHeaderClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate('/');
                }}
                menuItemRender={(menuItemProps, defaultDom) => {
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
            >
                <TabList>
                    <Outlet/>
                </TabList>
            </ProLayout>
        </ConfigProvider>);
}
export default Main;