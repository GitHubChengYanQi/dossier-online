/**
 * 检查分组字段配置页
 *
 * @author
 * @Date 2023-04-14 11:48:58
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useMedicalGroup = () => {
    const MedicalGroupId: ColumnsType = {
        title: "编码",
        dataIndex: "medicalGroupId",
        hideInForm: true,
        hideInSearch: true,
    }
    const ParentId: ColumnsType = {
        title: "上级分组",
        dataIndex: "parentId",
        valueType: "select",
        request: async () => {
            const response = await request("/medicalGroup/listSelect")
            return response.data;
        },
        hideInSearch: true,
        hideInTable: true,
    }
    const Name: ColumnsType = {
        title: "名称",
        dataIndex: "name",
    }
    const Code: ColumnsType = {
        title: "编码",
        dataIndex: "code",
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
        MedicalGroupId,
        ParentId,
        Name,
        Code,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedicalGroup