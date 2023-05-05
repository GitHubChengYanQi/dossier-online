/**
 * 挂号信息接口配置
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const hisRegisterAdd = {
  url: '/hisRegister/add',
  method: 'POST',
  rowKey:'registerId'
};

export const hisRegisterEdit = {
  url: '/hisRegister/edit',
  method: 'POST',
  rowKey:'registerId'
};

export const hisRegisterDelete = {
  url: '/hisRegister/delete',
  method: 'POST',
  rowKey:'registerId'
};

export const hisRegisterDetail = {
  url: '/hisRegister/detail',
  method: 'POST',
  rowKey:'registerId'
};

export const hisRegisterList = {
  url: '/hisRegister/list',
  method: 'POST',
  rowKey:'registerId'
};

export const getHisRegisterList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(hisRegisterList.url, {
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
export const getHisRegisterInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(hisRegisterDetail.url, {
        method: "GET",
        params: {
            registerId: id
        }
    });
    return response.data;
}

export const saveHisRegister = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.registerId = id;
        return await request(hisRegisterEdit.url, {
            data
        });
    } else {
        return await request(hisRegisterAdd.url, {
            data
        });
    }
}

export const delHisRegisterInfo = async (id: number) => {
    return await request(hisRegisterDelete.url, {
        method: "GET",
        params: {
            registerId: id
        }
    });
}