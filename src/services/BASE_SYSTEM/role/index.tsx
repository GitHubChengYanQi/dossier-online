import {request} from "@/utils/Request";
import {ResponseData} from "@/types/common";
import {ProFieldRequestData} from "@ant-design/pro-utils/es/typing";
import {GetListType} from "@/types/common";
import {pageRequest} from "@/utils/Request/request";

export const roleAdd = {
    url: '/rest/role/add',
    method: 'POST',
};

export const roleRemove = {
    url: '/rest/role/remove',
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
    url: '/rest/menu/ ',
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

export const saveRoleInfo = async (roleId: number, data: any) => {
    if (roleId === 0) {
        return await request(roleAdd.url, {
            data
        })
    }
    return await request(roleSave.url, {
        data: {
            ...data,
            roleId
        }
    })
}
export const setRolePermission = async (roleId: number, ids: number[]) => {
    return await request(roleSet.url, {
        data: {
            roleId,
            ids:ids.join(",")
        }
    });
}

export const delRoleInfo = async (roleId: number) => {
    return await request(roleRemove.url, {
        params: {
            roleId
        }
    });
}
export const getRoleInfo = async (roleId: number) => {
    if (roleId === 0) {
        return {};
    }
    const response = await request(roleView.url, {
        params: {
            roleId
        }
    });
    return response.data;
}

export const getRoleList: GetListType = async (params: Record<string, any>) => {
    return await pageRequest(roleList.url, {...params});
}

export const getTree = async () => {
    const response: ResponseData<ProFieldRequestData> = await request(roleTreeList.url, {
        data: {
            // roleId
        }
    });
    return response.data;
}

export interface roleSelect {
    checked: [] | string
}

export const roleListByUserId = async (userId: number) => {
    const response = await request<roleSelect>(roleListByUserIdApi.url, {
        params: {
            userId
        }
    });
    if (response.data?.checked) {
        response.data.checked = response.data?.checked[0];
    }

    return response.data;
}
