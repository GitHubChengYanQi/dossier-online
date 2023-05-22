import React, {useContext, useRef, useState} from 'react';
import NodeWrap from '../NodeWrap/index';
import WFC from '@/pages/Workflow/edit/OperatorContext';
import {Form, FormInstance} from "antd";
import {
    BetaSchemaForm,
    DrawerForm,
    ProFormCheckbox,
    ProFormDependency, ProFormGroup, ProFormList,
} from "@ant-design/pro-components";
import SelectUser from "@/components/sysCompoents/selectUser";
import SelectDept from "@/components/sysCompoents/selectDept";
import SelectPosition from "@/components/sysCompoents/selectPosition";
import {NodeSettingType, ProcessNodeType} from "@/pages/Workflow/edit/type";
import { OptionNames, OptionTypes } from '@/pages/Workflow/edit/Nodes/Constants';

type StartNodeType = {
    pRef: any;
    objRef: ProcessNodeType;
    nodeName?: string;
    onContentClick?: () => void;
}
const StartNode: React.FC<StartNodeType> = (props) => {

    const ref = useRef<FormInstance>();
    const {onSelectNode, width, auditNodeType} = useContext(WFC);

    const [open, setOpen] = useState<boolean>(false);

    const [typeValue, setTypeValue] = useState<string[]>([]);

    function onContentClick() {
        onSelectNode?.(props.pRef, props.objRef);
        setOpen(true);
        props.onContentClick?.();
    }

    return (
        <>
            <NodeWrap
                type={0}
                objRef={props.objRef}
                onContentClick={() => {
                    onContentClick();
                }}
                auditType={OptionTypes.START}
                title={OptionNames.START}>
                <div>
                    {'请选择发起人'}
                </div>
            </NodeWrap>

            <DrawerForm<NodeSettingType>
                drawerProps={{
                    destroyOnClose: true,
                    maskClosable:false
                }}
                formRef={ref}
                title={"发起流程配置"}
                width={width}
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                }}
                onValuesChange={(changedFields) => {
                    const {type} = changedFields;
                    if (type) {
                        const is = typeValue.findIndex((i: string) => i === "EVERYONE");
                        const index = type.findIndex((i: string) => i === "EVERYONE")

                        const items = type.filter((i: string) => i !== "EVERYONE");
                        if (index !== -1) {
                            ref.current?.setFieldValue("type", is !== -1 ? items : ["EVERYONE"])
                            setTypeValue(is !== -1 ? items : ["EVERYONE"]);
                        }

                    }
                }}
                initialValues={props.objRef.nodeSetting}
                onFinish={async (values) => {
                    props.objRef.nodeSetting = values;
                    setOpen(false)
                }}
            >
                <div>可提交申请的成员</div>
                <ProFormCheckbox.Group
                    name={"type"}
                    options={auditNodeType}/>

                <ProFormDependency name={["type"]}>
                    {({type}) => {
                        const items = [];
                        if (type && -1 !== type.findIndex((i: string) => i === "ASSIGNER")) {
                            items.push(
                                <Form.Item
                                    key={"ASSIGNER"}
                                    name={"assigner"}
                                    label={"选择人员"}
                                    help={"选定的人员可以进行操作"}
                                ><SelectUser/>
                                </Form.Item>
                            );
                        }
                        if (type && -1 !== type.findIndex((i: string) => i === "DEPTID")) {
                            items.push(
                                <Form.Item
                                    key={"DEPTID"}
                                    name={"deptIds"}
                                    label={"选择部门"}
                                    help={"选定的部门人员都可以进行操作"}
                                >
                                    <SelectDept/>
                                </Form.Item>
                            );
                        }
                        if (type && -1 !== type.findIndex((i: string) => i === "DEPTHEAD")) {
                            items.push(
                                <Form.Item
                                    key={"DEPTHEAD"}
                                    name={"headDeptIds"}
                                    label={"部门负责人"}
                                    help={"选定部门中的负责人可以进行操作"}
                                >
                                    <SelectDept/>
                                </Form.Item>
                            );
                        }
                        if (type && -1 !== type.findIndex((i: string) => i === "POSITION")) {
                            items.push(
                                <ProFormList
                                    key={"POSITION"}
                                    label={"指定职位"}
                                    name={"positionIds"}>
                                    <ProFormGroup>
                                        <BetaSchemaForm layoutType={"Embed"} columns={[
                                            {
                                                title: "部门",
                                                dataIndex: "deptId",
                                                formItemProps: {
                                                    help: "选定的部门后指定职位"
                                                },
                                                renderFormItem: () => {
                                                    return <SelectDept multiple={false}/>
                                                }
                                            }
                                        ]}/>
                                        <BetaSchemaForm layoutType={"Embed"} columns={[
                                            {
                                                title: "职位",
                                                dataIndex: "positionId",
                                                formItemProps: {
                                                    help: "选定的职位可以进行操作"
                                                },
                                                renderFormItem: () => {
                                                    return <SelectPosition/>
                                                }
                                            }
                                        ]}/>
                                    </ProFormGroup>

                                </ProFormList>
                            );
                        }
                        return items;
                    }}
                </ProFormDependency>

            </DrawerForm>
        </>
    );
}

export default StartNode;
