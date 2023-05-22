/**
 * 接口配置
 *
 * @author Sing
 * @Date 2023-05-15 18:42:10
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const activitiAdd = {
  url: '/activiti/add',
  method: 'POST',
  rowKey:'activitiId'
};

export const activitiEdit = {
  url: '/activiti/edit',
  method: 'POST',
  rowKey:'activitiId'
};

export const activitiDelete = {
  url: '/activiti/delete',
  method: 'POST',
  rowKey:'activitiId'
};

export const activitiDetail = {
  url: '/activiti/detail',
  method: 'POST',
  rowKey:'activitiId'
};

export const activitiList = {
  url: '/activiti/list',
  method: 'POST',
  rowKey:'activitiId'
};

export const getActivitiList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(activitiList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getActivitiInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(activitiDetail.url, {
        method: "GET",
        params: {
            activitiId: id
        }
    });
    return response.data;
}

export const saveActiviti = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.activitiId = id;
        return await request(activitiEdit.url, {
            data
        });
    } else {
        return await request(activitiAdd.url, {
            data
        });
    }
}

export const delActivitiInfo = async (id: number) => {
    return await request(activitiDelete.url, {
        method: "GET",
        params: {
            activitiId: id
        }
    });
}