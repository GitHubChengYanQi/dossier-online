/**
 * 房屋管理-房间表接口配置
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const buildAdd = {
  url: '/build/add',
  method: 'POST',
  rowKey:'id'
};

export const buildEdit = {
  url: '/build/edit',
  method: 'POST',
  rowKey:'id'
};

export const buildDelete = {
  url: '/build/delete',
  method: 'POST',
  rowKey:'id'
};

export const buildDetail = {
  url: '/build/detail',
  method: 'POST',
  rowKey:'id'
};

export const buildList = {
  url: '/build/list',
  method: 'POST',
  rowKey:'id'
};

export const getBuildList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(buildList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getBuildInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(buildDetail.url, {
        method: "GET",
        params: {
            id: id
        }
    });
    return response.data;
}

export const saveBuild = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.id = id;
        return await request(buildEdit.url, {
            data
        });
    } else {
        return await request(buildAdd.url, {
            data
        });
    }
}

export const delBuildInfo = async (id: number) => {
    return await request(buildDelete.url, {
        method: "GET",
        params: {
            id: id
        }
    });
}