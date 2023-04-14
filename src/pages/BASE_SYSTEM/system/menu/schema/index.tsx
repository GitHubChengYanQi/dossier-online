import {ColumnsType} from "@/types/common";
import {getTree} from "../service"

const useMenuField = () => {


    const Label: ColumnsType = {
        title: '名称', dataIndex: 'label',
        formItemProps: {
            name: "name",
            rules: [
                {
                    required: true, message: "请输入名称"
                }
            ]
        }
    };
    const value: ColumnsType = {
        title: '菜单编码', dataIndex: 'value',
        formItemProps: {
            name: "code",
            rules: [
                {
                    required: true, message: "请输入菜单编码"
                }
            ]
        }
    };

    const pids: ColumnsType = {
        title: "上级菜单",
        width: 240,
        valueType: "treeSelect",
        formItemProps: {
            name:"pid",
            rules: [
                {
                    required: true, message: "请选择上级菜单"
                }
            ]
        },
        fieldProps: {
            treeDefaultExpandAll: true
        },
        request: async () => {
            return await getTree();
        }
    }
    const menuFlag: ColumnsType = {
        title: "是否菜单",
        dataIndex: "menuFlag",
        valueType: "radio",
        valueEnum: {
            Y: {text: "是"},
            N: {text: "否"}
        },
        formItemProps: {
            rules: [
                {
                    required: true, message: "请选择是否是菜单"
                }
            ]
        }
    }
    const url = {
        title: "请求地址",
        dataIndex: 'url',
        formItemProps: {
            rules: [
                {
                    required: true, message: "请输入请求地址"
                }
            ]
        }
    }
    const sort:ColumnsType = {
        width: 120,
        title: "排序",
        dataIndex: "sort",
        fieldProps:{
            placeholder:"请输入数字",
        }
    }


    return {
        Label,
        value,
        pids,
        menuFlag,
        url,
        sort
    }
}
export default useMenuField;