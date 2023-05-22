import React, { useContext, useRef, useState } from 'react';
import NodeWrap from '../NodeWrap/index';
import WFC from '../../OperatorContext';
import { actionType, AuditNodeType, NodeSettingType, ProcessNodeType } from '@/pages/Workflow/edit/type';
import { DrawerForm, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import AuditNode from '@/pages/Workflow/edit/components/AuditNode';
import { OptionNames } from '@/pages/Workflow/edit/Nodes/Constants';
import styles from './index.module.scss';
import Omit from 'omit.js';

type ApproverNodeProps = {
  pRef: any;
  objRef: ProcessNodeType;
  nodeName?: string;
  onContentClick?: () => void;
}
const ApproverNode: React.FC<ApproverNodeProps> = (props) => {

  const { onDeleteNode, onSelectNode, width, auditNodeType, action, updateNode } = useContext(WFC);
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

  const nodeSetting = (props.objRef.nodeSetting || {}) as AuditNodeType;
  const auditNode = (nodeSetting?.auditNode || {}) as NodeSettingType;
  const auditType = nodeSetting?.auditNode?.type || [];
  const actions = nodeSetting?.actions|| [];

  let defaultAction;

  if (Object.keys(actions[0] || {}).length > 0) {
    defaultAction = actions.map((item: any) => item.type);
  } else {
    defaultAction = actions;
  }

  return (
    <>
      <NodeWrap
        delNode={delNode}
        titleStyle={{ backgroundColor: 'rgb(255, 148, 62)' }}
        onContentClick={onContentClick}
        title={OptionNames.USERTASK}
        objRef={props.objRef}>
        <div>
          {auditType.length === 0 && '请选择审批人'}
          {auditType.map(item => {
            return radio.find(auditItem => auditItem.value === item)?.label || '';
          }).join('、')}
        </div>
        {auditNode.andOr && <div className={styles.andOr}>
          {auditNode.andOr === 'OR' && '或签'}{auditNode.andOr === 'AND' && '并签'}
        </div>}
        <div className={styles.actions}>
          {actions.map((item) => {
            return item.title;
          }).join('、')}
        </div>

      </NodeWrap>
      {props.objRef.nodeSetting ? <DrawerForm<NodeSettingType>
        drawerProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        formRef={ref}
        title={'审批节点配置'}
        width={width}
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
        }}
        onValuesChange={(changedFields) => {
          const { type } = changedFields;
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
        initialValues={{ ...props.objRef.nodeSetting?.auditNode, action: defaultAction }}
        onFinish={async (values: NodeSettingType) => {
          if (props.objRef.nodeSetting) {
            props.objRef.nodeSetting.actions = action?.filter((actionItem: actionType) => values.action?.find(action => action === actionItem.type)) as actionType[];
            props.objRef.nodeSetting.auditNode = Omit(values, ['action']) as NodeSettingType;
          } else {
            props.objRef.nodeSetting = { auditNode: values };
          }
          updateNode?.();
          setOpen(false);
        }}
      >
        <ProFormCheckbox.Group
          name={'type'}
          options={radio}
        />
        <AuditNode />
        <ProFormRadio.Group
          formItemProps={{
            rules: [
              { required: true, message: '审批方式为必选' },
            ],
          }}
          label={'多人审批方式'}
          name={'andOr'}
          // options={[]}
          valueEnum={{
            AND: {
              text: '并签',
            }, OR: {
              text: '或签',
            },
          }}
        />

        <div>审批操作</div>
        <ProFormCheckbox.Group
          layout='vertical'
          fieldProps={{
            style: { flexWrap: 'wrap' },
          }}

          name={'action'}
          options={action?.map(item => ({ label: item.title, value: item.type }))}
        />

      </DrawerForm> : null}
    </>
  );
};

export default ApproverNode;
