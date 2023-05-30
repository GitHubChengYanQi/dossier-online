/**
 * 报修接口配置
 *
 * @author Sing
 * @Date 2023-05-19 11:41:59
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const repairOrderAdd = {
  url: '/repairOrder/add',
  method: 'POST',
  rowKey:'repairId'
};

export const repairOrderEdit = {
  url: '/repairOrder/edit',
  method: 'POST',
  rowKey:'repairId'
};

export const repairOrderDelete = {
  url: '/repairOrder/delete',
  method: 'POST',
  rowKey:'repairId'
};

export const repairOrderDetail = {
  url: '/repairOrder/detail',
  method: 'POST',
  rowKey:'repairId'
};

export const repairOrderList = {
  url: '/repairOrder/list',
  method: 'POST',
  rowKey:'repairId'
};

export const getRepairOrderList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(repairOrderList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getRepairOrderInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(repairOrderDetail.url, {
        method: "GET",
        params: {
            repairId: id
        }
    });
    return response.data;
}

export const saveRepairOrder = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.repairId = id;
        return await request(repairOrderEdit.url, {
            data
        });
    } else {
        return await request(repairOrderAdd.url, {
            data
        });
    }
}

export const delRepairOrderInfo = async (id: number) => {
    return await request(repairOrderDelete.url, {
        method: "GET",
        params: {
            repairId: id
        }
    });
}