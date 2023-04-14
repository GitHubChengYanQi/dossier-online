import {request} from "@/utils/Request";

export const menuTree = {
    url: '/rest/menu/selectMenuTreeList',
    method: 'GET',
};

export const menuAdd = {
    url: '/rest/menu/add',
    method: 'POST',
};

export const menuRemove = {
    url: '/rest/menu/remove',
    method: 'GET',
    rowKey: 'menuId'
};

export const menuSave = {
    url: '/rest/menu/edit',
    method: 'POST',
};
export const menuView = {
    url: '/rest/menu/view',
    method: 'POST',
};
export const menuTreeList = {
    url: '/rest/menu/menuTreeList',
    method: 'GET',
};
export const getTree = async () => {
    const response = await request(menuTree.url)
    return response.data
}

export const getMenuInfo = async (menuId: number) => {
    console.log(menuId)
    if (menuId === 0) {
        return {};
    }
    const response = await request(menuView.url, {
        params: {
            menuId
        }
    });
    return response.data;
}

export const save = async (menuId:number, data:any)=>{
    if(menuId===0){
        return await request(menuAdd.url,{
            data
        })
    }else{
        return await request(menuSave.url,{
            data:{
                ...data,
                menuId
            }
        });
    }

}