import {getTree} from "@/services/BASE_SYSTEM/role";
import {ColumnsType} from "@/types/common";


const useRoleField = () => {
    const Name: ColumnsType = {
        title: '名称',
        width: 200,
        dataIndex: 'name'
    };
    const pName: ColumnsType = {
        title: '上级角色',
        width: 200,
        dataIndex: 'pName',
        formItemProps: {}
    };
    const description: ColumnsType = {
        title: '别名',
        width: 300,
        dataIndex: 'description'
    }


    const roleTreeByUser: ColumnsType = {
        formItemProps: {
            name: "checked"
        },
        fieldProps: {
            treeDefaultExpandAll: true
        },
        request: async (): Promise<any> => {
            return await getTree();
        },
        title: '角色',
        valueType: "treeSelect",
    }
    return {
        Name,
        pName,
        description,
        roleTreeByUser
    }
}
export default useRoleField;