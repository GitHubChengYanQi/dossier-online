import React, {useContext, useRef, useState} from 'react';
import NodeWrap from '../NodeWrap/index';
import WFC from '../../OperatorContext';
import {AuditNodeType, NodeSettingType, ProcessNodeType} from '@/pages/Workflow/edit/type';
import {OptionNames} from '@/pages/Workflow/edit/Nodes/Constants';
import {FormInstance} from 'antd';
import {
    DrawerForm,
    ProFormCheckbox,
} from '@ant-design/pro-components';
import AuditNode from '@/pages/Workflow/edit/components/AuditNode';
import {RestUserResult} from '@/pages/BASE_SYSTEM/system/mgr/types';
import {remakeFormat} from '@/pages/Workflow/edit/Nodes/ApproverNode';
import {useModel} from '@@/exports';

type NotifierNodeType = {
    pRef: ProcessNodeType;
    objRef: ProcessNodeType;
    onContentClick?: () => void
}

const NotifierNode: React.FC<NotifierNodeType> = (props) => {

    const ref = useRef<FormInstance>();
    const {onSelectNode, width, auditNodeType, updateNode, onDeleteNode, auditExtend} = useContext(WFC);

    const [open, setOpen] = useState<boolean>(false);

    const [typeValue, setTypeValue] = useState<string>('');

    const [userRenders, setUserRenders] = useState<RestUserResult[]>([]);

    const {data: deptData} = useModel('dept');
    const {data: positionData} = useModel('position');


    function delNode() {
        onDeleteNode?.(props?.pRef as any, props?.objRef as any);
    }

    const radio = auditNodeType ? [...auditNodeType] : [];
    radio.shift();

    const nodeSetting = (props.objRef.nodeSetting || {}) as AuditNodeType;
    const auditType = nodeSetting?.auditNode?.type || [];
    const remarks = props.objRef.remark || [];

    function onContentClick() {
        onSelectNode?.(props?.pRef, props.objRef);
        setTypeValue(auditType[0]);
        setOpen(true);
        props.onContentClick?.();
    }

    return (
        <>
            <NodeWrap
                delNode={delNode}
                titleStyle={{backgroundColor: 'rgb(50, 150, 250)'}}
                onContentClick={onContentClick}
                title={OptionNames.SEND}
                objRef={props.objRef}>
                <div>
                    {auditType.length === 0 && '请选择抄送人'}
                    <span style={{fontWeight: 'bold'}}>
            {auditType.map(item => {
                return radio.find(auditItem => auditItem.value === item)?.label || '';
            }).join('、')}
          </span>
                </div>
                {remarks.map((item: string, index: number) => {
                    return <div key={index}>{item}</div>;
                })}
            </NodeWrap>

            <DrawerForm<NodeSettingType>
                drawerProps={{
                    destroyOnClose: true,
                    maskClosable: false,
                }}
                formRef={ref}
                title={'抄送节点配置'}
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
                        ref.current?.setFieldValue('type', items);
                        setTypeValue(items[0] || '');
                        // }
                    }
                }}
                initialValues={props.objRef.nodeSetting?.auditNode}
                onFinish={async (values) => {
                    props.objRef.remark = remakeFormat({
                        values,
                        userRenders,
                        deptData,
                        positionData,
                        auditExtend
                    }) as string[];
                    if (props.objRef.nodeSetting) {
                        props.objRef.nodeSetting.auditNode = values as NodeSettingType;
                    } else {
                        props.objRef.nodeSetting = {auditNode: values};
                    }
                    updateNode?.();
                    setOpen(false);
                }}
            >
                <ProFormCheckbox.Group
                    name={'type'}
                    options={radio}
                />
                <AuditNode onUserRender={setUserRenders}/>
            </DrawerForm>
        </>
    );
};

export default NotifierNode;
