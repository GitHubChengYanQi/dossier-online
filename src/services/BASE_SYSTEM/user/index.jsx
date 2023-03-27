import {request} from "../../../utils/Request";

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
export const getUserInfo = async (id)=>{
    if(id!==null && id!==0){
        const response = await request({
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

export const save = async (id, data)=>{
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