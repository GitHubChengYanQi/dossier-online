import React, { useContext, useRef, useState } from 'react';
import NodeWrap from '../NodeWrap/index';
import WFC from '../../OperatorContext';
import {
  actionType,
  AuditNodePositionType,
  AuditNodeType,
  NodeSettingType,
  ProcessNodeType,
} from '@/pages/Workflow/edit/type';
import { DrawerForm, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import AuditNode from '@/pages/Workflow/edit/components/AuditNode';
import { OptionNames } from '@/pages/Workflow/edit/Nodes/Constants';
import styles from './index.module.scss';
import Omit from 'omit.js';
import { RestUserResult } from '@/pages/BASE_SYSTEM/system/mgr/types';
import { useModel } from '@@/exports';
import { DeptTreeType } from '@/models/dept';

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
  const [userRenders, setUserRenders] = useState<RestUserResult[]>([]);

  const { data: deptData } = useModel('dept');
  const { data: positionData } = useModel('position');

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
  const actions = nodeSetting?.actions || [];
  const remarks = props.objRef.remark || [];

  let defaultAction;

  if (Object.keys(actions[0] || {}).length > 0) {
    defaultAction = actions.map((item: any) => item.type);
  } else {
    defaultAction = actions;
  }

  const treeRender = (ids: any[], data: DeptTreeType[]) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    let render: string[] = [];
    data.forEach((item: DeptTreeType) => {
      if (ids.find(id => `${id}` === `${item.key}`)) {
        render.push(item.title);
      }
      const childrenRender = treeRender(ids, item.children as DeptTreeType[]);
      render = render.concat(childrenRender);
    });
    return render;
  };

  const remakeFormat = (values: NodeSettingType) => {
    let auditData = [];
    const types = values.type;
    if (types.find(type => type === 'ASSIGNER')) {
      auditData.push(userRenders.map(item => item.name).join('、'));
    }

    if (types.find(type => type === 'DEPTID')) {
      if (values.deptIds?.findIndex(deptId => `${deptId}` === '-1') !== -1) {
        auditData.push(['发起的部门', ...treeRender(values.deptIds as any, deptData)].join('、'));
      } else if (values.deptIds) {
        auditData.push(treeRender(values.deptIds as any, deptData).join('、'));
      }
    }

    if (types.find(type => type === 'DEPTHEAD')) {
      if (values.headDeptIds?.findIndex(deptId => `${deptId}` === '-1') !== -1) {
        auditData.push(['发起的部门', ...treeRender(values.deptIds as any, deptData)].join('、'));
      } else if (values.headDeptIds) {
        auditData.push(treeRender(values.headDeptIds as any, deptData).join('、'));
      }
    }

    if (types.find(type => type === 'POSITION')) {
      auditData = values.positionIds?.filter((item, index) => index < 2).map((item: AuditNodePositionType) => {
        const deptName = `${item.deptId}` === '-1' ? '发起的部门' : treeRender([item.deptId], deptData)[0] || '';
        const positionName = positionData.find((position: any) => `${position.value}` === `${item.positionId}`)?.label || '';
        return deptName + '-' + positionName;
      }) || [];
      if ((values.positionIds?.length || 0) > 2) {
        auditData.push('...');
      }
    }
    return auditData;
  };

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
          <span style={{ fontWeight: 'bold' }}>
            {auditType.map(item => {
              return radio.find(auditItem => auditItem.value === item)?.label || '';
            }).join('、')}
          </span>
        </div>
        {remarks.map((item: string, index: number) => {
          return <div key={index}>{item}</div>;
        })}
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
          props.objRef.remark = remakeFormat(values);
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
        <AuditNode onUserRender={setUserRenders} />
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
