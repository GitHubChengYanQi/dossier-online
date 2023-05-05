/**
 * 费用配置表字段配置页
 *
 * @author Sing
 * @Date 2023-04-26 15:21:31
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useHisConstConfig = () => {
    const CostConfigId: ColumnsType = {
        title: "",
        dataIndex: "costConfigId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const ConstName: ColumnsType = {
        title: "名称",
        dataIndex: "constName",
        formItemProps:{
            rules:[
                {required:true,message:"名称为必填"}
            ]
        }
    }
    const Type: ColumnsType = {
        title: "类型",
        dataIndex: "type",
        valueType: "radio",
        formItemProps:{
            rules:[
                {required:true,message:"类型为必选"}
            ]
        },
        valueEnum: {
            1: {
                text: "挂号费"
            },
            2: {
                text: "诊费"
            },
            3: {
                text: "药费"
            },
            4: {
                text: "住院费"
            },
        },
    }
    const TypeKey: ColumnsType = {
        title: "",
        dataIndex: "typeKey",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Money: ColumnsType = {
        title: "金额",
        dataIndex: "money",
        valueType: "money",width:100,
        formItemProps:{
            rules:[
                {required:true,message:"金额必填"}
            ]
        },
        hideInTable: true,
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
        CostConfigId,
        ConstName,
        Type,
        TypeKey,
        Money,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useHisConstConfig