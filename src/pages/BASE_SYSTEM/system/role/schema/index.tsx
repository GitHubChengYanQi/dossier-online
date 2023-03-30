import type { ProFormColumnsType } from '@ant-design/pro-components';
import {getTree, roleTreeByUserId} from "@/services/BASE_SYSTEM/role";

export const Name: ProFormColumnsType = {
    title: '名称',
    width: 200,
    dataIndex: 'name'
};
export const pName: ProFormColumnsType = {
    title: '上级角色',
    width: 200,
    dataIndex: 'pName',
    formItemProps:{

    }
};
export const description: ProFormColumnsType = {
    title: '别名',
    width: 300,
    dataIndex: 'description'
}


export const roleTreeByUser: ProFormColumnsType = {
    formItemProps:{
        name:"checked"
    },
    fieldProps:{
        treeDefaultExpandAll:true
    },
    request:  async ():Promise<any>=>{
        return await getTree();
    },
    title: '角色',
    valueType: "treeSelect",
}
