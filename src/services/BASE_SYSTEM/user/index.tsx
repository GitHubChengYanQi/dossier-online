import {GetListType, ResponseData} from "@/types/common";
import {request} from "@/utils/Request";
import {pageRequest} from "@/utils/Request/request";
import {SortOrder} from "antd/lib/table/interface";

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

export const userReset = {
    url: '/rest/mgr/reset',
    method: 'POST',
};
export const userInfo = {
    url: '/rest/mgr/getMyInfo',
    method: 'POST',
};


export const userList = {
    url: '/rest/mgr/list',
    method: 'POST',
};

export const loginUrl = {
    url: '/rest/login',
    method: 'POST',
};

export const userFreeze = {
    url: '/rest/mgr/freeze',
    method: 'POST',
};
export const userUnfreeze = {
    url: '/rest/mgr/unfreeze',
    method: 'POST',
};

export const freeze = async (userId: number) => {

    return await request(userFreeze.url, {
        data: {
            userId
        }
    });
}
export const unfreeze = async (userId: number) => {
    return await request(userUnfreeze.url, {
        data: {
            userId
        }
    });
}
export const resetPassWord = async (userId: number) => {
    return await request(userReset.url, {
        method: "GET",
        params: {
            userId
        }
    })
}
export const getUserList = async <T = any>(
    params: T & {
        pageSize?: number;
        current?: number;
        keyword?: string;
    }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest<T>(userList.url, {
        data: {
            ...params
        },
    });
}
export const setUserRole = async (userId: number, roleIds: string) => {
    return await request(userRoleSave.url, {
        data: {
            userId,
            roleIds
        }
    });
}
export const getUserInfo = async (id: number | string) => {
    if (id !== 0 && id !== "0") {
        const response: ResponseData<any> = await request(getUserInfoApi.url, {
            params: {
                userId: id
            }
        });
        const data = {
            ...response.data,
            position: response.data.positionIds ? `${response.data.positionIds}`.split(",") : []
        }
        return data;
    } else {
        return {};
    }
}
export const save = async (id: number | string, data: any) => {
    data.position = data.position.join(",");

    if (id !== null && id !== 0) {
        data.userId = id;

        return await request(userSave.url, {
            data
        });
    } else {
        return await request(userAdd.url, {
            data
        });
    }
}

export const getMyInfo = async () => {
    const response = await request(userInfo.url)
    return response;
}

export declare type loginProps = {
    username: string,
    password: string,

    code?: string
}

export const login = async (values: loginProps): Promise<ResponseData<string>> => {
    return await request(loginUrl.url, {
        method: "POST",
        data: values
    });
}