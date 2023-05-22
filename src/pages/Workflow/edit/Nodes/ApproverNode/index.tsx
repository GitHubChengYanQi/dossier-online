import React, { useContext, useRef, useState } from 'react';
import NodeWrap from '../NodeWrap/index';
import WFC from '../../OperatorContext';
import { NodeSettingType, ProcessNodeType } from '@/pages/Workflow/edit/type';
import { DrawerForm, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import AuditNode from '@/pages/Workflow/edit/components/AuditNode';
import { OptionNames } from '@/pages/Workflow/edit/Nodes/Constants';
import styles from './index.module.scss';

type ApproverNodeProps = {
  pRef: any;
  objRef: ProcessNodeType;
  nodeName?: string;
  onContentClick?: () => void;
}
const ApproverNode: React.FC<ApproverNodeProps> = (props) => {

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

  const nodeSetting = (props.objRef.nodeSetting || {}) as NodeSettingType;
  const auditType = nodeSetting?.type || [];

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
        {nodeSetting?.andOr && <div className={styles.andOr}>
          {nodeSetting.andOr === 'OR' && '或签'}{nodeSetting.andOr === 'AND' && '并签'}
        </div>}

      </NodeWrap>
      <DrawerForm<NodeSettingType>
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
        initialValues={props.objRef.nodeSetting}
        onFinish={async (values) => {
          props.objRef.nodeSetting = values;
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

      </DrawerForm>
    </>
  );
};

export default ApproverNode;
