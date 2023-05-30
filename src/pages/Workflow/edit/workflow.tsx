import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import EndNode from './Nodes/EndNode';
import Render from './Nodes/Render';
import { OptionTypes,  NodeTypes } from './Nodes/Constants';
import WFC from './OperatorContext';
import ZoomLayout from './Nodes/ZoomLayout';
import styles from './index.module.scss';
import { ProcessNodeType } from '@/pages/Workflow/edit/type';
import { useParams, useRequest } from '@@/exports';
import { request } from '@/utils/Request';


const auditNodeType = [
  {
    label: '任何人',
    value: 'EVERYONE',
  },
  {
    label: '指定人员',
    value: 'ASSIGNER',
  }, {
    label: '指定部门',
    value: 'DEPTID',
  }, {
    label: '指定部门负责人',
    value: 'DEPTHEAD',
  }, {
    label: '指定职位',
    value: 'POSITION',
  },
  {
    label: '扩展配置',
    value: 'EXTEND',
  },
];

const defaultConfig: ProcessNodeType = {
  auditType: OptionTypes.START,
  childNode: null,  // 下级步骤
  conditionNodeList: [], // 分支
  // nodeSetting: {}
};

const Workflow = ({ value, onChange }: {
  value?: any;
  onChange?: (value: any) => void
}) => {

  const { id } = useParams();

  const { data } = useRequest(async () => {
    const response = await request(`/activiti/detail`, {
      method: 'GET',
      params: {
        activitiId: id,
      },
    });
    return response.data;
  });


  const [config, setConfig] = useState(value || defaultConfig);
  const [, setCurrentNode] = useState<any>();

  const updateNode = () => {
    onChange?.({ ...config });
    setConfig({ ...config });
  };

  // let currentNode = null;

  // 链表操作: 几种行为， 添加行为，删除行为，点击行为     pRef.childNode -> objRef.childNode -> 后继
  // 添加节点

  const onAddNode = (type: any, pRef: any, objRef: any) => {

    const o = objRef.childNode;

    switch (type) {
      case OptionTypes.APPROVER:
      case OptionTypes.NOTIFIER:
      case OptionTypes.CHILDRENPROCESS:
        objRef.childNode = {
          auditType: type,
          nodeSetting: {},
          childNode: o,
        };
        break;
      case OptionTypes.CONDITION:
        objRef.childNode = {
          auditType: type,
          nodeSetting: {},
          conditionNodeList: [
            {
              auditType: OptionTypes.BRANCH,
              nodeSetting: {},
              childNode: o,
            },
            {
              auditType: OptionTypes.BRANCH,
              nodeSetting: {},
            },
          ],
        };
        break;
      case OptionTypes.BRANCH:
        objRef.conditionNodeList.push({
          auditType: type,
          nodeSetting: {},
        });
        break;
    }
    updateNode();
  };

  // 删除节点
  const onDeleteNode = (pRef: ProcessNodeType, objRef: ProcessNodeType, type?: any, index?: number) => {
    Modal.confirm({
      centered: true,
      title: '是否删除节点?',
      onOk: () => {
        if (type === NodeTypes.BRANCH) {
          (objRef.conditionNodeList || []).splice(index || 0, 1);
        } else {
          const newObj = objRef.childNode;
          pRef.childNode = newObj;
        }
        updateNode();
      },
    });
  };


  // 获取节点
  const onSelectNode = (pRef: any, objRef: any) => {
    setCurrentNode({
      current: objRef,
      prev: pRef,
    });
  };

  useEffect(() => {
    if (data) {
      onChange?.(data.config);
      setConfig(data.config);
    }
  }, [
    data,
  ]);

  return (
    <div>
      <WFC.Provider value={{
        config,
        updateNode,
        onAddNode,
        onDeleteNode,
        onSelectNode,
        width: 640,
        auditNodeType,
        condition: data ? data.process.condition : [],
        action: data ? data.process.action : [],
      }}>
        <section className={styles.dingflowDesign}>
          <ZoomLayout>
            <Render
              config={config}
            />
            <EndNode />
          </ZoomLayout>
        </section>


      </WFC.Provider>
    </div>
  );
};

export default Workflow;
