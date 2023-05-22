/**
 * 字段配置页
 *
 * @author Sing
 * @Date 2023-05-15 18:42:10
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useActiviti = () => {
    const ActivitiId: ColumnsType = {
        title: "",
        dataIndex: "activitiId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Name: ColumnsType = {
        title: "名称",
        dataIndex: "name",
    }
    const Type: ColumnsType = {
        title: "流程类型",
        dataIndex: "type",
        valueType: "select",
        request: async () => {
            const {data} = await request("/activiti/getType", {
                method: "GET"
            });
            return data;
        }
    }
    const Id: ColumnsType = {
        title: "部署ID",
        dataIndex: "id",
        hideInForm: true,
        hideInSearch: true,
    }
    const Config: ColumnsType = {
        title: "",
        dataIndex: "config",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Version: ColumnsType = {
        title: "",
        dataIndex: "version",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Remark: ColumnsType = {
        title: "备注",
        dataIndex: "remark",
        valueType:"textarea",
        hideInSearch: true
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
        ActivitiId,
        Name,
        Type,
        Id,
        Config,
        Version,
        Remark,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useActiviti