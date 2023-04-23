/**
 * 检查字段配置页
 *
 * @author
 * @Date 2023-04-20 10:18:26
 */

import {ColumnsType} from "@/types/common";

const useMedical = () => {
    const MedicalId: ColumnsType = {
        title: "",
        dataIndex: "medicalId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Title: ColumnsType = {
        title: "检查名称",
        dataIndex: "title",
        formItemProps: {
            rules: [
                {
                    required: true, message: "检查名称必填"
                }
            ]
        }
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
        MedicalId,
        Title,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedical