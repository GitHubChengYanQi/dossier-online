import {ColumnsType} from "@/types/common";
import {request} from "@/utils/Request";

const useDictField = (): Record<string, ColumnsType> => {


    return {
        dictType: {
            title: "所属类别",
            dataIndex: "dictTypeId",
            colProps: {
                span: 24
            },
            formItemProps: {
                rules: [
                    {
                        required: true, message: "所属分类为必选"
                    }
                ],
                wrapperCol: {
                    span: 12
                }
            },
            valueType: "select",
            request: async () => {
                const {data} = await request("/rest/dictType/listTypes")
                return data.map((i: any) => {
                    return {
                        label: i.name,
                        key: i.dictTypeId,
                        value: i.dictTypeId,
                    }
                });
            },
            hideInTable: true
        },
        name: {
            title: "名称",
            dataIndex: "name",
            colProps: {
                span: 12
            },
            formItemProps: {
                rules: [
                    {
                        required: true, message: "名称为必填"
                    }
                ]
            },
        },
        code: {
            title: "编码",
            dataIndex: "code",
            colProps: {
                span: 12
            },
            formItemProps: {
                rules: [
                    {
                        required: true, message: "编码为必填"
                    }
                ]
            },
        },
        status: {
            title: "状态",
            dataIndex: "status",
            valueType: "radio",
            colProps: {
                span: 24
            },
            valueEnum: {
                ENABLE: {
                    text: '启用',
                },
                DISABLE: {
                    text: '禁用',
                }
            }
        },
        description: {
            title: "描述",
            dataIndex: "description",
            valueType: "textarea",
            colProps: {
                span: 24
            },
        },
        sort:{
            title:"排序",
            dataIndex:"sort",
            valueType:"digit",
            formItemProps:{
            }
        }
    };
}
export default useDictField;