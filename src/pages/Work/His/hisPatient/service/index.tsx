/**
 * 病人表接口配置
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const hisPatientAdd = {
  url: '/hisPatient/add',
  method: 'POST',
  rowKey:'patientId'
};

export const hisPatientEdit = {
  url: '/hisPatient/edit',
  method: 'POST',
  rowKey:'patientId'
};

export const hisPatientDelete = {
  url: '/hisPatient/delete',
  method: 'POST',
  rowKey:'patientId'
};

export const hisPatientDetail = {
  url: '/hisPatient/detail',
  method: 'POST',
  rowKey:'patientId'
};

export const hisPatientList = {
  url: '/hisPatient/list',
  method: 'POST',
  rowKey:'patientId'
};

export const getHisPatientList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(hisPatientList.url, {
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
export const getHisPatientInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(hisPatientDetail.url, {
        method: "GET",
        params: {
            patientId: id
        }
    });
    return response.data;
}

export const saveHisPatient = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.patientId = id;
        return await request(hisPatientEdit.url, {
            data
        });
    } else {
        return await request(hisPatientAdd.url, {
            data
        });
    }
}

export const delHisPatientInfo = async (id: number) => {
    return await request(hisPatientDelete.url, {
        method: "GET",
        params: {
            patientId: id
        }
    });
}