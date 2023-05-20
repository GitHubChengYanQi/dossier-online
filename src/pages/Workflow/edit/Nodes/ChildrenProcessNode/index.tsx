import React, { useContext, useRef, useState } from 'react';
import NodeWrap from '../NodeWrap';
import WFC from '../../OperatorContext';
import { NodeSettingType, ProcessNodeType } from '@/pages/Workflow/edit/type';
import { DrawerForm, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import AuditNode from '@/pages/Workflow/edit/components/AuditNode';
import { OptionNames, OptionTypes } from '@/pages/Workflow/edit/Nodes/Constants';

type ChildrenProcessNodeProps = {
  pRef: any;
  objRef: ProcessNodeType;
  nodeName?: string;
  onContentClick?: () => void;
}
const ChildrenProcessNode: React.FC<ChildrenProcessNodeProps> = (props) => {

  const { onDeleteNode, onSelectNode, width, auditNodeType } = useContext(WFC);
  const [open, setOpen] = useState<boolean>(false);
  const [typeValue, setTypeValue] = useState<string>('');

  const ref = useRef<FormInstance>();

  function delNode() {
    onDeleteNode?.(props.pRef, props.objRef, '', 0);
  }

  function onContentClick() {
    setOpen(true);
    onSelectNode?.(props.pRef, props.objRef);
    props.onContentClick?.();
  }


  const radio = auditNodeType ? [...auditNodeType] : [];
  radio.shift();
  return (
    <>
      <NodeWrap
        delNode={delNode}
        titleStyle={{ backgroundColor: '#f5ca17' }}
        onContentClick={onContentClick}
        title={OptionNames.CHILDRENPROCESS}
        objRef={props.objRef}>
        <div>
          {'请选择'}
        </div>

      </NodeWrap>
      <DrawerForm<NodeSettingType>
        drawerProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        formRef={ref}
        title={'子流程节点配置'}
        width={width}
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
        }}
        onValuesChange={(changedFields) => {
          const { type } = changedFields;
          if (type) {

            const items = type.filter((i: string) => i !== typeValue);
            ref.current?.setFieldValue('type', items);
            setTypeValue(items[0] || '');

          }
        }}
        onFinish={async (values) => {
          props.objRef.nodeSetting = values;
          setOpen(false);
        }}
      >


      </DrawerForm>
    </>
  );
};

export default ChildrenProcessNode;
