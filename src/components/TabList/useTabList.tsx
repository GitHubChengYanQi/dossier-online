import {history, useSelectedRoutes} from "@@/exports";
import {useEffect, useMemo, useState} from "react";
import {RouteMatch, RouteObject} from "react-router/lib/router";
import {tabs} from "@/types/common";
import {useModel} from "umi";


const useTabList = ()=>{
    const route = useSelectedRoutes() as any;
    const {routes,setRoutes} = useModel("useTabs");
    /**
     * 初始化tab
     */
    const firstRoute = route.at(0);
    const homeElement = useMemo(() => {
        return firstRoute.route.children.filter((item: RouteObject) => item.path === "/home").map((item: tabs) => ({
            key: item.path || "",
            label: item.name || "",
            children: item.element,
            closable: false,
        }));
    }, []);

    const lastRoute = route.at(-1) as RouteMatch;

    const renderRoute = lastRoute.route as tabs

    const onEdit = (key: any, action: string) => {
        if (action === "remove") {
            const tmp = [...routes] as tabs[];
            const index = tmp.findIndex(item => item.key === key);
            tmp.splice(index, 1);
            setRoutes([...tmp]);
            if (key === renderRoute.path) {
                history.replace(tmp[index-1].key||"/");
            }
        }
    }

    const element = renderRoute.element as any;

    useEffect(() => {

        const tmp = [...routes] as tabs[];
        const index = tmp.findIndex(item => item.key === renderRoute.path);
        if (!element?.props.to) {
            if (index === -1 && tmp.length!==0) {
                setRoutes([
                    ...tmp,
                    {
                        key: renderRoute.path || "",
                        label: renderRoute.name || "",
                        children: element
                    }
                ]);
            }
            if(tmp.length===0){
                setRoutes(homeElement);
            }
        }
    }, [route]);

    return {
        onEdit,
        renderRoute,
        element,
        routes
    }
}
export default useTabList;