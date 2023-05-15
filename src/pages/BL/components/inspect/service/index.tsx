/**
 * 接口配置
 *
 * @author Sing
 * @Date 2023-05-11 15:18:10
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const inspectAdd = {
  url: '/inspect/add',
  method: 'POST',
  rowKey:'inspectId'
};

export const inspectEdit = {
  url: '/inspect/edit',
  method: 'POST',
  rowKey:'inspectId'
};

export const inspectDelete = {
  url: '/inspect/delete',
  method: 'POST',
  rowKey:'inspectId'
};

export const inspectDetail = {
  url: '/inspect/detail',
  method: 'POST',
  rowKey:'inspectId'
};

export const inspectList = {
  url: '/inspect/list',
  method: 'POST',
  rowKey:'inspectId'
};

export const getInspectList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(inspectList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getInspectInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(inspectDetail.url, {
        method: "GET",
        params: {
            inspectId: id
        }
    });
    return response.data;
}

export const saveInspect = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.inspectId = id;
        return await request(inspectEdit.url, {
            data
        });
    } else {
        return await request(inspectAdd.url, {
            data
        });
    }
}

export const delInspectInfo = async (id: number) => {
    return await request(inspectDelete.url, {
        method: "GET",
        params: {
            inspectId: id
        }
    });
}