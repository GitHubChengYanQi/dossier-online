/**
 * 工单挂起类型接口配置
 *
 * @author Sing
 * @Date 2023-05-30 15:15:48
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const repairSuspendAdd = {
  url: '/repairSuspend/add',
  method: 'POST',
  rowKey:'suspendId'
};

export const repairSuspendEdit = {
  url: '/repairSuspend/edit',
  method: 'POST',
  rowKey:'suspendId'
};

export const repairSuspendDelete = {
  url: '/repairSuspend/delete',
  method: 'POST',
  rowKey:'suspendId'
};

export const repairSuspendDetail = {
  url: '/repairSuspend/detail',
  method: 'POST',
  rowKey:'suspendId'
};

export const repairSuspendList = {
  url: '/repairSuspend/list',
  method: 'POST',
  rowKey:'suspendId'
};

export const getRepairSuspendList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(repairSuspendList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getRepairSuspendInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(repairSuspendDetail.url, {
        method: "GET",
        params: {
            suspendId: id
        }
    });
    return response.data;
}

export const saveRepairSuspend = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.suspendId = id;
        return await request(repairSuspendEdit.url, {
            data
        });
    } else {
        return await request(repairSuspendAdd.url, {
            data
        });
    }
}

export const delRepairSuspendInfo = async (id: number) => {
    return await request(repairSuspendDelete.url, {
        method: "GET",
        params: {
            suspendId: id
        }
    });
}