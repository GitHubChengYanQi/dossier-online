/**
 * 部门负责小区分区设置接口配置
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const repairDeptManageAdd = {
  url: '/repairDeptManage/add',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairDeptManageEdit = {
  url: '/repairDeptManage/edit',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairDeptManageDelete = {
  url: '/repairDeptManage/delete',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairDeptManageDetail = {
  url: '/repairDeptManage/detail',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairDeptManageList = {
  url: '/repairDeptManage/list',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const getRepairDeptManageList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(repairDeptManageList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getRepairDeptManageInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(repairDeptManageDetail.url, {
        method: "GET",
        params: {
            repairDeptManageId: id
        }
    });
    return response.data;
}

export const saveRepairDeptManage = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.repairDeptManageId = id;
        return await request(repairDeptManageEdit.url, {
            data
        });
    } else {
        return await request(repairDeptManageAdd.url, {
            data
        });
    }
}

export const delRepairDeptManageInfo = async (id: number) => {
    return await request(repairDeptManageDelete.url, {
        method: "GET",
        params: {
            repairDeptManageId: id
        }
    });
}