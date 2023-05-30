/**
 * 房屋的管家设置接口配置
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const repairHousekeepManageAdd = {
  url: '/repairHousekeepManage/add',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairHousekeepManageEdit = {
  url: '/repairHousekeepManage/edit',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairHousekeepManageDelete = {
  url: '/repairHousekeeperManage/delete',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairHousekeepManageDetail = {
  url: '/repairHousekeepManage/detail',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const repairHousekeepManageList = {
  url: '/repairHousekeepManage/list',
  method: 'POST',
  rowKey:'repairDeptManageId'
};

export const getRepairHousekeepManageList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(repairHousekeepManageList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getRepairHousekeepManageInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(repairHousekeepManageDetail.url, {
        method: "GET",
        params: {
            repairDeptManageId: id
        }
    });
    return response.data;
}

export const saveRepairHousekeepManage = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.repairDeptManageId = id;
        return await request(repairHousekeepManageEdit.url, {
            data
        });
    } else {
        return await request(repairHousekeepManageAdd.url, {
            data
        });
    }
}

export const delRepairHousekeeperManageInfo = async (id: number) => {
    return await request(repairHousekeepManageDelete.url, {
        method: "GET",
        params: {
            repairDeptManageId: id
        }
    });
}