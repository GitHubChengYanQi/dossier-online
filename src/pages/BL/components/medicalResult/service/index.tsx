/**
 * 检查结果接口配置
 *
 * @author Sing
 * @Date 2023-05-09 10:04:51
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const medicalResultAdd = {
  url: '/medicalResult/add',
  method: 'POST',
  rowKey:'resultId'
};

export const medicalResultEdit = {
  url: '/medicalResult/edit',
  method: 'POST',
  rowKey:'resultId'
};

export const medicalResultDelete = {
  url: '/medicalResult/delete',
  method: 'POST',
  rowKey:'resultId'
};

export const medicalResultDetail = {
  url: '/medicalResult/detail',
  method: 'POST',
  rowKey:'resultId'
};

export const medicalResultList = {
  url: '/medicalResult/list',
  method: 'POST',
  rowKey:'resultId'
};

export const getMedicalResultList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any>, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(medicalResultList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getMedicalResultInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(medicalResultDetail.url, {
        method: "GET",
        params: {
            resultId: id
        }
    });
    return response.data;
}

export const saveMedicalResult = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.resultId = id;
        return await request(medicalResultEdit.url, {
            data
        });
    } else {
        return await request(medicalResultAdd.url, {
            data
        });
    }
}

export const delMedicalResultInfo = async (id: number) => {
    return await request(medicalResultDelete.url, {
        method: "GET",
        params: {
            resultId: id
        }
    });
}