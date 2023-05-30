/**
 * 接口配置
 *
 * @author Sing
 * @Date 2023-05-29 09:49:34
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const repairDeptTypeAdd = {
  url: '/repairDeptType/add',
  method: 'POST',
  rowKey:'repairDeptTypeId'
};

export const repairDeptTypeEdit = {
  url: '/repairDeptType/edit',
  method: 'POST',
  rowKey:'repairDeptTypeId'
};

export const repairDeptTypeDelete = {
  url: '/repairDeptType/delete',
  method: 'POST',
  rowKey:'repairDeptTypeId'
};

export const repairDeptTypeDetail = {
  url: '/repairDeptType/detail',
  method: 'POST',
  rowKey:'repairDeptTypeId'
};

export const repairDeptTypeList = {
  url: '/repairDeptType/list',
  method: 'POST',
  rowKey:'repairDeptTypeId'
};

export const getRepairDeptTypeList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(repairDeptTypeList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getRepairDeptTypeInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(repairDeptTypeDetail.url, {
        method: "GET",
        params: {
            repairDeptTypeId: id
        }
    });
    return response.data;
}

export const saveRepairDeptType = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.repairDeptTypeId = id;
        return await request(repairDeptTypeEdit.url, {
            data
        });
    } else {
        return await request(repairDeptTypeAdd.url, {
            data
        });
    }
}

export const delRepairDeptTypeInfo = async (id: number) => {
    return await request(repairDeptTypeDelete.url, {
        method: "GET",
        params: {
            repairDeptTypeId: id
        }
    });
}