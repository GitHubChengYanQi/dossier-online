/**
 * 费用配置表接口配置
 *
 * @author Sing
 * @Date 2023-04-26 15:21:31
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {HisConstConfigType} from "@/pages/Work/His/hisConstConfig/type";

export const hisConstConfigAdd = {
  url: '/hisConstConfig/add',
  method: 'POST',
  rowKey:'costConfigId'
};

export const hisConstConfigEdit = {
  url: '/hisConstConfig/edit',
  method: 'POST',
  rowKey:'costConfigId'
};

export const hisConstConfigDelete = {
  url: '/hisConstConfig/delete',
  method: 'POST',
  rowKey:'costConfigId'
};

export const hisConstConfigDetail = {
  url: '/hisConstConfig/detail',
  method: 'POST',
  rowKey:'costConfigId'
};

export const hisConstConfigList = {
  url: '/hisConstConfig/list',
  method: 'POST',
  rowKey:'costConfigId'
};

export const getHisConstConfigList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(hisConstConfigList.url, {
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
export const getHisConstConfigInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request<HisConstConfigType>(hisConstConfigDetail.url, {
        method: "GET",
        params: {
            costConfigId: id
        }
    });
    if(response.data.costList){
        response.data.costList = response.data.costList.map((i:any)=> {
            i.positionIds = i.positionIds.map((j:number)=>`${j}`);
            return i;
        });
    }
    return response.data;
}

export const saveHisConstConfig = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.costConfigId = id;
        return await request(hisConstConfigEdit.url, {
            data
        });
    } else {
        return await request(hisConstConfigAdd.url, {
            data
        });
    }
}

export const delHisConstConfigInfo = async (id: number) => {
    return await request(hisConstConfigDelete.url, {
        method: "GET",
        params: {
            costConfigId: id
        }
    });
}