import {request} from "@/utils/Request";
import {ResponseData} from "@/services/type/common";
import {ProFieldRequestData} from "@ant-design/pro-utils/es/typing";
import {GetListType} from "@/types/common";
import {pageRequest} from "@/utils/Request/request";

export const roleAdd = {
    url: '/rest/role/add',
    method: 'POST',
};

export const roleRemove = {
    url: '/role/remove',
    method: 'POST',
};

export const roleSave = {
    url: '/rest/role/edit',
    method: 'POST',
};

export const roleList = {
    url: '/rest/role/list',
    method: 'GET',
};

export const roleView = {
    url: '/rest/role/view',
    method: 'POST',
};
export const roleTree = {
    url: '/rest/role/roleTreeList',
    method: 'POST'
};
export const roleTreeList = {
    url: '/rest/role/roleTree',
    method: 'POST'
};
export const roleSet = {
    url: '/rest/role/setAuthority',
    method: 'POST'
};
export const roleSetView = {
    url: '/rest/menu/menuTreeListByRoleId',
    method: 'POST',
    rowKey: 'roleId'
};
export const roleListByUserIdApi = {
    url: '/rest/role/roleTreeListByUserId',
    method: 'POST',
    rowKey: 'userId'
};
export const roleTreeByUserIdApi = {
    url: '/rest/role/roleTreeByUserId',
    method: 'POST',
    rowKey: 'userId'
};


export const getRoleList:GetListType = async (params:Record<string, any>)=>{
    return await pageRequest(roleList.url,{...params});
}

export const getTree = async () =>{
    const response:ResponseData<ProFieldRequestData> = await request(roleTreeList.url,{
        data:{
            // roleId
        }
    });
    return response.data;
}

export interface roleSelect{
    checked:[]|string
}
export const roleListByUserId = async (userId:number) =>{
    const response:ResponseData<roleSelect> = await request(roleListByUserIdApi.url,{
        params:{
            userId
        }
    });
    response.data.checked = response.data.checked[0];
    return response.data;
}
