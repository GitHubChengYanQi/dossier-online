/**
 * 房屋管理-分区表接口配置
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const buildPartitionAdd = {
  url: '/buildPartition/add',
  method: 'POST',
  rowKey:'id'
};

export const buildPartitionEdit = {
  url: '/buildPartition/edit',
  method: 'POST',
  rowKey:'id'
};

export const buildPartitionDelete = {
  url: '/buildPartition/delete',
  method: 'POST',
  rowKey:'id'
};

export const buildPartitionDetail = {
  url: '/buildPartition/detail',
  method: 'POST',
  rowKey:'id'
};

export const buildPartitionList = {
  url: '/buildPartition/list',
  method: 'POST',
  rowKey:'id'
};

export const getBuildPartitionList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(buildPartitionList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getBuildPartitionInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(buildPartitionDetail.url, {
        method: "GET",
        params: {
            id: id
        }
    });
    return response.data;
}

export const saveBuildPartition = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.id = id;
        return await request(buildPartitionEdit.url, {
            data
        });
    } else {
        return await request(buildPartitionAdd.url, {
            data
        });
    }
}

export const delBuildPartitionInfo = async (id: number) => {
    return await request(buildPartitionDelete.url, {
        method: "GET",
        params: {
            id: id
        }
    });
}