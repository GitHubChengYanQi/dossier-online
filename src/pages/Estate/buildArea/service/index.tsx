/**
 * 房屋管理-小区表接口配置
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */
import {ResponseData} from "@/types/common";
import {request, pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const buildAreaAdd = {
    url: '/buildArea/add',
    method: 'POST',
    rowKey: 'id'
};

export const buildAreaEdit = {
    url: '/buildArea/edit',
    method: 'POST',
    rowKey: 'id'
};

export const buildAreaDelete = {
    url: '/buildArea/delete',
    method: 'POST',
    rowKey: 'id'
};

export const buildAreaDetail = {
    url: '/buildArea/detail',
    method: 'POST',
    rowKey: 'id'
};

export const buildAreaList = {
    url: '/buildArea/list',
    method: 'POST',
    rowKey: 'id'
};

export const getBuildAreaList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any>, sort?: Record<string, SortOrder>, filter?: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(buildAreaList.url, {
        data: {
            ...params
        },
        params: {
            sort,
            filter
        }
    });
}
export const getBuildAreaInfo = async (id: number) => {
    if (id === 0) {
        return {};
    }
    const response: ResponseData = await request(buildAreaDetail.url, {
        method: "GET",
        params: {
            id: id
        }
    });
    return response.data;
}

export const saveBuildArea = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.id = id;
        return await request(buildAreaEdit.url, {
            data
        });
    } else {
        return await request(buildAreaAdd.url, {
            data
        });
    }
}

export const delBuildAreaInfo = async (id: number) => {
    return await request(buildAreaDelete.url, {
        method: "GET",
        params: {
            id: id
        }
    });
}

export const selectBuildAreaInfo = async (areaId: number|string) => {

    return await request("/buildArea/listSelect", {
        method: "GET",
        params: {
            areaId
        }
    });
}