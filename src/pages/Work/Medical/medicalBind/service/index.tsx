/**
 * 接口配置
 *
 * @author 
 * @Date 2023-04-20 10:18:26
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const medicalBindAdd = {
  url: '/medicalBind/add',
  method: 'POST',
  rowKey:'medicalBindId'
};

export const medicalBindEdit = {
  url: '/medicalBind/edit',
  method: 'POST',
  rowKey:'medicalBindId'
};

export const medicalBindDelete = {
  url: '/medicalBind/delete',
  method: 'POST',
  rowKey:'medicalBindId'
};

export const medicalBindDetail = {
  url: '/medicalBind/detail',
  method: 'POST',
  rowKey:'medicalBindId'
};

export const medicalBindList = {
  url: '/medicalBind/list',
  method: 'POST',
  rowKey:'medicalBindId'
};

export const getMedicalBindList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(medicalBindList.url, {
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
export const getMedicalBindInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(medicalBindDetail.url, {
            params: {
                medicalBindId: id
            }
        });
    return response.data;
}

export const saveMedicalBind = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.medicalBindId = id;
        return await request(medicalBindEdit.url, {
            data
        });
    } else {
        return await request(medicalBindAdd.url, {
            data
        });
    }
}

export const delMedicalBindInfo = async (id: number) => {
    return await request(medicalBindDelete.url, {
        params: {
            medicalGroupId: id
        }
    });
}