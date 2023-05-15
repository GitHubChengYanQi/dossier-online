/**
 * 检查项目配置字段配置页
 *
 * @author
 * @Date 2023-04-14 11:48:58
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";
import {ProFormGroup, ProFormList, ProFormText} from "@ant-design/pro-components";
import React from "react";

const useMedicalItem = () => {

    const MedicalItemId: ColumnsType = {
        title: "编码",
        dataIndex: "medicalItemId",
        hideInTable: true,
        hideInSearch: true,
        hideInForm: true
    }
    const MedicalGroupId: ColumnsType = {
        title: "所属分组",
        dataIndex: "medicalGroupId",
        valueType: "select",
        formItemProps: {
            rules: [
                {
                    required: true, message: "请选择所属分组"
                }
            ]
        },
        fieldProps: {
            allowClear: false,
            showSearch: true
        },
        debounceTime: 500,
        request: async (data) => {
            const response = await request("/medicalGroup/listSelect", {data});
            return response.data;
        }
    }
    const Title: ColumnsType = {
        title: "名称",
        dataIndex: "title",
        formItemProps: {
            rules: [
                {
                    required: true, message: "请输入项目名称"
                }
            ]
        }
    }
    const Type: ColumnsType = {
        title: "项目类型",
        dataIndex: "type",
        valueType: "select",
        formItemProps: {
            rules: [
                {required: true, message: "类型必选"}
            ]
        },
        fieldProps: {
            allowClear: false,
            options: [
                {label: '文本输入框', value: 'text'},
                {label: '多行文本', value: 'textarea'},
                {label: '数字输入框', value: 'digit'},
                {label: '下拉选择器', value: 'select'},
                {label: '复选框', value: 'checkbox'},
                {label: '单选框', value: 'radio'},
            ]
        }
    }
    const Config: ColumnsType = {
        title: "字段配置",
        dataIndex: "config",
        valueType: "formList",
        formItemProps: {
            rules: [
                {required: true, message: "至少填写一行数据"}
            ]
        },
        columns: [
            {
                valueType: 'group',

                columns: [
                    {
                        width: 140,
                        dataIndex: "label",
                        title: "名称",
                        formItemProps: {
                            rules: [
                                {required: true, message: "名称必填"}
                            ]
                        },
                    },
                    {
                        width: 140,
                        dataIndex: "value",
                        title: "选中值",
                        formItemProps: {
                            rules: [
                                {required: true, message: "选中值必填"}
                            ]
                        },
                    }
                ]
            }
        ],
        hideInTable: true,
        hideInSearch: true,
    }
    const Sort: ColumnsType = {
        title: "排序",
        dataIndex: "sort",
        valueType: "digit",
        tooltip: "数字越大越靠前"
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
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedicalItem