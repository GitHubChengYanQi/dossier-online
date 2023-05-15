/**
 * 检查接口配置
 *
 * @author
 * @Date 2023-04-20 10:18:26
 */
import {ResponseData} from "@/types/common";
import {request, pageRequest} from "@/utils/Request";

export const medicalAdd = {
    url: '/medical/add',
    method: 'POST',
    rowKey: 'medicalId'
};

export const medicalEdit = {
    url: '/medical/edit',
    method: 'POST',
    rowKey: 'medicalId'
};

export const medicalDelete = {
    url: '/medical/delete',
    method: 'POST',
    rowKey: 'medicalId'
};

export const medicalDetail = {
    url: '/medical/detail',
    method: 'POST',
    rowKey: 'medicalId'
};

export const medicalList = {
    url: '/medical/list',
    method: 'POST',
    rowKey: 'medicalId'
};

export const getMedicalList = async (params: Record<string, any>, sorter: any, filter: any) => {
    return await pageRequest(medicalList.url, {
        data: {
            ...params
        },
        params: {
            sorter,
            filter
        }
        // FIXME: remove @ts-ignore
        // @ts-ignore
        // sorter,
        // filter,
    });
}
export const getMedicalInfo = async (id: number) => {
    if (id === 0) {
        return {};
    }
    const response: ResponseData = await request(medicalDetail.url, {
        method: "GET",
        params: {
            medicalId: id
        }
    });
    return response.data;
}

export const saveMedical = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.medicalId = id;
        return await request(medicalEdit.url, {
            data
        });
    } else {
        return await request(medicalAdd.url, {
            data
        });
    }
}

export const delMedicalInfo = async (id: number) => {
    return await request(medicalDelete.url, {
        method: "GET",
        params: {
            medicalId: id
        }
    });
}
export const selectMedical = async (params:Record<string, any>) => {
    return await request("/medical/listSelect", {
        data: {
            ...params
        },
    });
}
