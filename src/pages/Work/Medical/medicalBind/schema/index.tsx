/**
 * 字段配置页
 *
 * @author
 * @Date 2023-04-20 10:18:26
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useMedicalBind = () => {
    const MedicalBindId: ColumnsType = {
        title: "",
        dataIndex: "medicalBindId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const MedicalGroupId: ColumnsType = {
        dataIndex: "medicalGroupId",
        valueType: "select",
        fieldProps: {
            showSearch: true
        },
        formItemProps: {
            rules: [
                {
                    required: true, message: "分组选择不能为空"
                }
            ]
        },
        width: 200,
        debounceTime: 500,
        request: async (data) => {
            const response = await request("/medicalGroup/listSelect", data);
            return response.data;
        },
        hideInSearch: true,
    }
    const Sort: ColumnsType = {
        title: "排序",
        dataIndex: "sort",
        valueType: "digit",
        hideInSearch: true,
    }
    const CreateTime: ColumnsType = {
        title: "",
        dataIndex: "createTime",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const CreateUser: ColumnsType = {
        title: "",
        dataIndex: "createUser",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const UpdateTime: ColumnsType = {
        title: "",
        dataIndex: "updateTime",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const UpdateUser: ColumnsType = {
        title: "",
        dataIndex: "updateUser",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Display: ColumnsType = {
        title: "",
        dataIndex: "display",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    return {
        MedicalBindId,
        MedicalGroupId,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedicalBind