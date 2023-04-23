/**
 * 检查分组接口配置
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const medicalGroupAdd = {
  url: '/medicalGroup/add',
  method: 'POST',
  rowKey:'medicalGroupId'
};

export const medicalGroupEdit = {
  url: '/medicalGroup/edit',
  method: 'POST',
  rowKey:'medicalGroupId'
};

export const medicalGroupDelete = {
  url: '/medicalGroup/delete',
  method: 'POST',
  rowKey:'medicalGroupId'
};

export const medicalGroupDetail = {
  url: '/medicalGroup/detail',
  method: 'POST',
  rowKey:'medicalGroupId'
};

export const medicalGroupList = {
  url: '/medicalGroup/list',
  method: 'POST',
  rowKey:'medicalGroupId'
};

export const getMedicalGroupList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(medicalGroupList.url, {
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
export const getMedicalGroupInfo = async (id: number) => {
    const response: ResponseData = await request(medicalGroupDetail.url, {
            params: {
                medicalGroupId: id
            }
        });
    return response.data;
}

export const saveMedicalGroup = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.medicalGroupId = id;
        return await request(medicalGroupEdit.url, {
            data
        });
    } else {
        return await request(medicalGroupAdd.url, {
            data
        });
    }
}
export const delMedicalGroupInfo = async (id: number) => {
    return await request(medicalGroupDelete.url, {
        params: {
            medicalGroupId: id
        }
    });
}
