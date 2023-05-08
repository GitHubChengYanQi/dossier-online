/**
 * 字段配置列表页
 *
 * @author Sing
 * @Date 2020-12-12 10:33:42
 */

import {
    BetaSchemaForm,
    ProForm, ProFormCheckbox,
    ProFormGroup, ProFormInstance,
    ProFormList,  ProFormSelect, ProFormText,
} from "@ant-design/pro-components";
import {getFieldList, saveFieldConfig} from "../../service";
import DbSourceConfig from "../dbSourceConfig";
import React, {useRef} from "react";
import {Modal} from "antd";
import {useRequest} from "umi";

const RenderText = (props: { width?: number | string, value?: any, onChange?: () => void }) => {
    return <div style={{width: props.width || 150}}>{props.value}</div>
}
const FieldConfigList = (
    {
        dbId,
        tableName,
        formRef,
        onClose,
        open
    }: {
        dbId: number,
        tableName: string,
        onLoading?: () => void,
        Loaded?: () => void,
        onClose?: () => void,
        open: boolean,
        formRef?: React.MutableRefObject<ProFormInstance | undefined> | React.RefObject<ProFormInstance | undefined>
    }) => {

    const actionRef = useRef<ProFormInstance>();
    const {run, loading} = useRequest(async (params) => {
            console.log(params)
            return await saveFieldConfig(params)
        },
        {
            manual: true
        });

    return (
        <Modal
            title="字段配置"
            open={open}
            onOk={async () => {
                console.log(1)
                actionRef.current?.submit();
            }}
            onCancel={() => {
                onClose?.();
            }}
            width={1200}
            centered
            destroyOnClose
            confirmLoading={loading}
        >
            <ProForm
                submitter={false}
                formRef={formRef || actionRef}
                labelCol={{
                    span: 4
                }}
                request={async () => {
                    const fieldLists = await getFieldList(dbId,
                        tableName);
                    return {
                        fieldLists
                    }
                }}
                onFinish={async (values) => {
                    await run({
                        ...values,
                        tableName

                    });
                    onClose?.();
                }}
                onValuesChange={(values,allValues)=>{
                    // console.log(values,values[0],allValues)
                    if(values.fieldLists[values.fieldLists.length-1].showTitle){
                        allValues.fieldLists.forEach((item:any)=>{
                            item.showTitle = false;
                        });
                        allValues.fieldLists[values.fieldLists.length-1].showTitle = values.fieldLists[values.fieldLists.length-1].showTitle;
                        actionRef.current?.setFieldValue("fieldLists",allValues.fieldLists);
                    }


                }}
            >
                <ProFormList
                    name={"fieldLists"}
                    creatorButtonProps={false}
                    copyIconProps={false}
                    deleteIconProps={false}
                    itemContainerRender={(doms) => {
                        return doms
                    }}
                >
                    <ProFormGroup key={"group"}>
                        <BetaSchemaForm layoutType={"Embed"} columns={[
                            {
                                dataIndex: "camelFieldName",
                                formItemProps: {
                                    label: <h4>字段名</h4>,
                                },
                                renderFormItem: () => {
                                    return (<RenderText width={100}/>);
                                }
                            }
                        ]}
                        />

                        <BetaSchemaForm layoutType={"Embed"} columns={[
                            {
                                valueType: "checkbox",
                                dataIndex: "columnComment",
                                formItemProps: {
                                    label: <h4>字段描述</h4>
                                },
                                renderFormItem: () => {
                                    return (<RenderText width={200}/>);
                                }
                            }
                        ]}/>
                        <ProFormText width={120} name={"title"} label={<h4>显示名称</h4>}/>
                        <ProFormCheckbox width={50} name={"showTitle"} label={<h4>标题</h4>}/>

                        <ProFormSelect width={160} name={"type"} label={<h4>字段类型</h4>} options={[
                            {label: '文本输入框', value: ''},
                            {label: '多行文本', value: 'textArea'},
                            {label: '上级ID', value: 'parentId'},
                            {label: '密码输入框', value: 'password'},
                            {label: '数字输入框', value: 'digit'},
                            {label: '金额', value: 'money'},
                            {label: '级联选择器', value: 'cascader'},
                            {label: '下拉选择器', value: 'select'},
                            {label: '树形下拉框', value: 'treeSelect'},
                            {label: '复选框', value: 'checkbox'},
                            {label: '单选框', value: 'radio'},
                            {label: '日期选择器', value: 'date'},
                            {label: '周选择器', value: 'dateWeek'},
                            {label: '月选择器', value: 'dateMonth'},
                            {label: '季度选择器', value: 'dateQuarter'},
                            {label: '年选择器', value: 'dateYear'},
                            {label: '日期时间选择器', value: 'dateTime'},
                            {label: '相对时间', value: 'fromNow'},
                            {label: '时间选择器', value: 'time'},
                        ]}/>
                        <BetaSchemaForm layoutType={"Embed"} columns={[
                            {
                                valueType: "dependency",
                                name: ["type"],
                                columns: ({type}) => {
                                    return [{
                                        valueType: "checkbox",
                                        dataIndex: "config",
                                        dependencies: ["type"],

                                        formItemProps: {

                                            label: <h4>字段配置</h4>,
                                        },
                                        renderFormItem: (schema, config) => {
                                            const {value} = config;
                                            return (<DbSourceConfig value={value} type={type}/>);
                                        }
                                    }]
                                }
                            },

                        ]}/>
                        <ProFormCheckbox width={40} name={"inEdit"} label={<h4>编辑</h4>}/>
                        <ProFormCheckbox width={40} name={"inList"} label={<h4>列表</h4>}/>
                        <ProFormCheckbox width={40} name={"inSearch"} label={<h4>搜索</h4>}/>
                    </ProFormGroup>
                </ProFormList>
            </ProForm>
        </Modal>
    );
};

export default FieldConfigList;
