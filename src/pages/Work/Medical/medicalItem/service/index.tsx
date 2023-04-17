/**
 * 检查项目配置接口配置
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const medicalItemAdd = {
  url: '/medicalItem/add',
  method: 'POST',
  rowKey:'medicalItemId'
};

export const medicalItemEdit = {
  url: '/medicalItem/edit',
  method: 'POST',
  rowKey:'medicalItemId'
};

export const medicalItemDelete = {
  url: '/medicalItem/delete',
  method: 'POST',
  rowKey:'medicalItemId'
};

export const medicalItemDetail = {
  url: '/medicalItem/detail',
  method: 'POST',
  rowKey:'medicalItemId'
};

export const medicalItemList = {
  url: '/medicalItem/list',
  method: 'POST',
  rowKey:'medicalItemId'
};

export const getMedicalItemList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(medicalItemList.url, {
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
export const getMedicalItemInfo = async (id: number) => {
    const response: ResponseData<any> = await request(medicalItemEdit.url, {
            params: {
                userId: id
            }
        });
    return response.data;
}

export const saveMedicalItem = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.medicalItemId = id;
        return await request(medicalItemEdit.url, {
            data
        });
    } else {
        return await request(medicalItemAdd.url, {
            data
        });
    }
}