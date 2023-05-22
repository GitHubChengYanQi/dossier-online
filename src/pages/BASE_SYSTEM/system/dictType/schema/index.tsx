import {Button} from "antd";
import React from "react";
import {ColumnsType} from "@/types/common";
import {useNavigate} from "umi";

const useDictTypeField = (): Record<string, ColumnsType> => {
    const navigate = useNavigate();
    return {
        simpleName: {
            title: '名称',
            dataIndex: 'name',
            formItemProps: {
                rules: [
                    {required: true, message: "名称为必填"}
                ],
                wrapperCol: {
                    span: 12
                }
            },
            render: (value: any, row: any) => {
                return (
                    <Button type="link" onClick={() => {

                        navigate(`/BASE_SYSTEM/system/dict/${row.dictTypeId}`);

                    }}>{row.name}</Button>
                );
            }
        },
        code: {
            title: '编码',
            dataIndex: 'code',
            formItemProps: {
                rules: [
                    {required: true, message: "编码为必填"}
                ],
                wrapperCol: {
                    span: 12
                }
            },
        },
        systemFlag: {
            title: '是否系统',
            dataIndex: 'systemFlag',
            valueType: "radio",
            formItemProps: {
                help: "选择为系统后不能删除",
                rules: [
                    {required: true, message: "请选择是否为系统"}
                ]
            },
            valueEnum: {
                Y: {
                    text: "是"
                },
                N: {
                    text: "否"
                }
            },
            render: (value: any, row: any) => {
                if (row.systemFlag === 'Y') {
                    return ('是');
                }
                return ('否');
            }
        },
        description: {
            title: '描述',
            dataIndex: 'description',
            valueType: "textarea",
        },
        status: {
            title: '状态',
            dataIndex: "status",
            valueType: "radio",
            formItemProps: {
                rules: [
                    {required: true, message: "状态为必选"}
                ]
            },
            valueEnum: {
                ENABLE: {
                    text: "启用"
                },
                DISABLE: {
                    text: "禁用"
                }
            },
            render: (value: any, row: any) => {
                if (row.status === 'ENABLE') {
                    return ('启用');
                }
                return ('禁用');
            }
        },
        sort:{
            title:"排序",
            dataIndex:"sort",
            valueType:"digit",
            formItemProps:{
            }
        }
    }
}
export default useDictTypeField;