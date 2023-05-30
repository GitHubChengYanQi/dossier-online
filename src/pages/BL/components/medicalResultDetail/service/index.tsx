/**
 * 检查结果接口配置
 *
 * @author Sing
 * @Date 2023-05-09 10:04:51
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const medicalResultDetailAdd = {
  url: '/medicalResultDetail/add',
  method: 'POST',
  rowKey:'resultDetailId'
};

export const medicalResultDetailEdit = {
  url: '/medicalResultDetail/edit',
  method: 'POST',
  rowKey:'resultDetailId'
};

export const medicalResultDetailDelete = {
  url: '/medicalResultDetail/delete',
  method: 'POST',
  rowKey:'resultDetailId'
};

export const medicalResultDetailDetail = {
  url: '/medicalResultDetail/detail',
  method: 'POST',
  rowKey:'resultDetailId'
};

export const medicalResultDetailList = {
  url: '/medicalResultDetail/list',
  method: 'POST',
  rowKey:'resultDetailId'
};


export const getMedicalResultDetailInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(medicalResultDetailDetail.url, {
        method: "GET",
        params: {
            resultDetailId: id
        }
    });
    return response.data;
}

export const saveMedicalResultDetail = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.resultDetailId = id;
        return await request(medicalResultDetailEdit.url, {
            data
        });
    } else {
        return await request(medicalResultDetailAdd.url, {
            data
        });
    }
}

export const delMedicalResultDetailInfo = async (id: number) => {
    return await request(medicalResultDetailDelete.url, {
        method: "GET",
        params: {
            resultDetailId: id
        }
    });
}