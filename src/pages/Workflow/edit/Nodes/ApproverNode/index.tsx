import React, {useContext, useRef, useState} from 'react';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import {NodeSettingType, ProcessNodeType} from "@/pages/Workflow/type";
import {DrawerForm, ProFormCheckbox, ProFormRadio} from "@ant-design/pro-components";
import {FormInstance} from "antd";
import AuditNode from "@/pages/Workflow/edit/components/AuditNode";
import {OptionNames, OptionTypes} from "@/pages/Workflow/edit/Nodes/Constants";

type ApproverNodeProps = {
    pRef: any;
    objRef: ProcessNodeType;
    nodeName?: string;
    onContentClick?: () => void;
}
const ApproverNode: React.FC<ApproverNodeProps> = (props) => {

    const {onDeleteNode, onSelectNode, width, auditNodeType} = useContext(WFC);
    const [open, setOpen] = useState<boolean>(false);
    const [typeValue, setTypeValue] = useState<string>("");

    const ref = useRef<FormInstance>();

    function delNode() {
        onDeleteNode?.(props.pRef, props.objRef, "", 0);
    }

    function onChange(val: string) {
        // 数据设置不用去重新渲染
        props.pRef.childNode.nodeName = val;
    }

    function onContentClick() {
        setOpen(true);
        onSelectNode?.(props.pRef, props.objRef);
        props.onContentClick?.();
    }

    // TODO: 这里读取props数据
    const TitleEl = <TitleElement
        delNode={delNode} placeholder={props.nodeName || OptionNames[OptionTypes.APPROVER]} nodeName={props.nodeName || OptionNames[OptionTypes.APPROVER]}
        onTitleChange={onChange}/>;

    const radio = auditNodeType ? [...auditNodeType] : [];
    radio.shift();
    return (
        <>
            <NodeWrap
                titleStyle={{backgroundColor: 'rgb(255, 148, 62)'}}
                onContentClick={onContentClick}
                title={TitleEl}
                objRef={props.objRef}>
                <div>
                    {'请选择'}
                </div>
                icon

            </NodeWrap>
            <DrawerForm<NodeSettingType>
                drawerProps={{
                    destroyOnClose: true,
                    maskClosable:false
                }}
                formRef={ref}
                title={"审批节点配置"}
                width={width}
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                }}
                onValuesChange={(changedFields) => {
                    const {type} = changedFields;
                    if (type) {
                        // const is = type === typeValue;
                        // const index = type.findIndex((i: string) => i === typeValue)

                        const items = type.filter((i: string) => i !== typeValue);
                        // if (index !== -1) {
                        ref.current?.setFieldValue("type", items)
                        setTypeValue(items[0] || "");
                        // }

                    }
                }}
                onFinish={async (values) => {
                    props.objRef.nodeSetting = values;
                    setOpen(false)
                }}
            >
                <ProFormCheckbox.Group
                    name={"type"}
                    options={radio}
                />
                <AuditNode/>
                <ProFormRadio.Group
                    formItemProps={{
                        rules: [
                            {required: true, message: "审批方式为必选"}

                        ]
                    }}
                    label={"多人审批方式"}
                    name={"andOr"}
                    // options={[]}
                    valueEnum={{
                        AND: {
                            text: "并签"
                        }, OR: {
                            text: "或签"
                        }
                    }}
                />

            </DrawerForm>
        </>
    );
}

export default ApproverNode;