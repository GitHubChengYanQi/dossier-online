/**
 * 数据库信息表接口配置
 *
 * @author 
 * @Date 2023-04-11 22:22:11
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const databaseInfoAdd = {
  url: '/databaseInfo/add',
  method: 'POST',
  rowKey:'dbId'
};

export const databaseInfoEdit = {
  url: '/databaseInfo/edit',
  method: 'POST',
  rowKey:'dbId'
};

export const databaseInfoDelete = {
  url: '/databaseInfo/delete',
  method: 'POST',
  rowKey:'dbId'
};

export const databaseInfoDetail = {
  url: '/databaseInfo/detail',
  method: 'POST',
  rowKey:'dbId'
};

export const databaseInfoList = {
  url: '/databaseInfo/list',
  method: 'POST',
  rowKey:'dbId'
};

export const getDatabaseInfoList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(databaseInfoList.url, {
        data: {
            ...params
        },
        params:{
            sorter,
            filter
        }
        // FIXME: remove @ts-ignore
        // @ts-ignore
        // sorter,
        // filter,
    });
}
export const getDatabaseInfoInfo = async (id: number) => {
    const response: ResponseData<any> = await request(databaseInfoEdit.url, {
            params: {
                userId: id
            }
        });
    return response.data;
}

export const saveDatabaseInfo = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.dbId = id;
        return await request(databaseInfoEdit.url, {
            data
        });
    } else {
        return await request(databaseInfoAdd.url, {
            data
        });
    }
}