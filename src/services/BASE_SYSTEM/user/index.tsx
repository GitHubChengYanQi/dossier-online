import {request} from "../../../utils/Request";
import {ResponseData} from "@/services/type/common";

export const getUserInfoApi = {
    url: '/rest/mgr/getUserInfo',
    method: 'POST',
    rowKey: 'userId'
};
export const userAdd = {
    url: '/rest/mgr/add',
    method: 'POST',
};
export const userSave = {
    url: '/rest/mgr/edit',
    method: 'POST',
};

export const userRoleSave = {
    url: '/rest/mgr/setRole',
    method: 'POST',
};
export const setUserRole = async (userId:number,roleIds:string) =>{
    const response = await request({
        ...userRoleSave,
        data:{
            userId,
            roleIds
        }
    });
    return response;
}
export const getUserInfo = async (id:number)=>{
    if(id!==null && id!==0){
        const response:ResponseData<any> = await request({
            ...getUserInfoApi,
            params:{
                userId:id
            }
        });
        const data = {
            ...response.data,
            position: response.data.positionIds?`${response.data.positionIds}`.split(","):[]
        }
        return data;
    }else{
        return {};
    }
}

export const save = async (id:number, data:any)=>{
    data.position = data.position.join(",");

    if(id!==null && id!==0){
        data.userId = id;

        return await request({
            ...userSave,
            data
        });
    }else{
        return await request({
            ...userAdd,
            data
        });
    }
}