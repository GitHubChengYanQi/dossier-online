import React, {useContext, useRef, useState} from 'react';
import AddNode from '../AddNode';
import Render from '../Render';
import {NodeTypes, OptionNames} from '../Constants';
import WFC from '../../OperatorContext';
import styles from './index.module.scss';
import { AuditNodeType, conditionType, NodeSettingType, ProcessNodeType } from '../../type';
import { DrawerForm, ProFormDependency, ProFormGroup, ProFormList, ProFormSelect } from '@ant-design/pro-components';
import { FormInstance, Typography } from 'antd';
import RenderField from '@/components/sysCompoents/renderField';
import {QuestionCircleOutlined, CloseOutlined} from '@ant-design/icons';


const CoverLine = ({first = false, last = false}) => {

    return (<React.Fragment>
        {first && <div className='top-left-cover-line'/>}
        {first && <div className='bottom-left-cover-line'/>}
        {last && <div className='top-right-cover-line'/>}
        {last && <div className='bottom-right-cover-line'/>}
    </React.Fragment>);
};

type BranchNodeType = {

    nodeName?: string;

    objRef: ProcessNodeType;


    onBranchClick?: (params: ProcessNodeType) => void;

    delBranch: () => void;

    index: number;
}

const conditionEnum = {
    eq: {
        text: '等于(=)',
    },
    ne: {
        text: '不等于(!=)',
    },
    gt: {
        text: '大于(>)',
    },
    lt: {
        text: '小于(<)',
    },
    ge: {
        text: '大于等于(>=)',
    },
    le: {
        text: '小于等于(<=)',
    },
};

const RenderRow = () => {

        const {condition} = useContext(WFC);
        if (!condition) {
            return null;
        }
        return (
            <ProFormGroup>
                <ProFormSelect label={'选项'} name={'fieldName'} options={condition.map((item: conditionType) => {
                    return {
                        label: item.fieldTitle,
                        value: item.fieldName,
                        key: item.fieldName,
                    };
                })}/>
                <ProFormSelect label={'条件'} name={'condition'} valueEnum={conditionEnum}/>
                <ProFormDependency name={['fieldName']}>
                    {({fieldName: value}) => {
                        if (value) {
                            const node = (condition || []).find((item: conditionType) => item.fieldName === value);
                            if (node) {
                                return [
                                    <RenderField
                                        key={node.fieldName}
                                        config={{
                                            title: node.fieldTitle,
                                            dataIndex: node.fieldName,
                                            type: node.type,
                                            enums: node.enums,
                                            request: node.request,
                                        }}
                                        onChange={(value, allValues: any) => {
                                            console.log(value, allValues)
                                        }}
                                    />,
                                ];
                            } else {
                                return [];
                            }
                        }
                        return [];
                    }}
                </ProFormDependency>
            </ProFormGroup>
        );
    }
;
const BranchNode: React.FC<BranchNodeType> = (props) => {


    const ref = useRef<FormInstance>();

    const {width, condition} = useContext(WFC);

    const [open, setOpen] = useState<boolean>(false);

  const nodeSetting = (props.objRef.nodeSetting || {}) as AuditNodeType;
  const conditions = nodeSetting.condition || [];
  console.log(nodeSetting);
  const onClick = () => {
    setOpen(true);
    if (props.objRef) {
      props.onBranchClick?.(props.objRef);
    }
  };

  return (
    <>
      <div className='condition-node'>
        <div className='condition-node-box'>
          <div className='auto-judge' onClick={onClick}>
            <div className='title-wrapper'>
              <span className='editable-title'>{OptionNames.BRANCH}{props.index + 1}</span>
              <div className='close' onClick={(e) => {
                props.delBranch();
                e.stopPropagation();
              }}>
                <CloseOutlined />
              </div>
            </div>
            <div className='content'>
              <div className='text'>
                {conditions.length === 0 && '无条件'}
                {
                  conditions.map((item: conditionType, index: number) => {
                    return <div key={index}>
                      {condition?.find(conditionItem => conditionItem.fieldName === item.fieldName)?.fieldTitle}
                      &nbsp;&nbsp;
                      {conditionEnum[item.condition]?.text}
                      &nbsp;&nbsp;
                      {/*{item.repairPosition}*/}
                    </div>;
                  })
                }
              </div>
            </div>
          </div>
          <AddNode objRef={props.objRef} />
        </div>
      </div>

      <DrawerForm<AuditNodeType>
        drawerProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        layout={'vertical'}
        formRef={ref}
        title={'分支条件配置'}
        width={width}
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
        }}
        initialValues={props.objRef.nodeSetting}
        // onValuesChange={(changedFields) => {
        // }}
        onFinish={async (values) => {
          props.objRef.nodeSetting = values;
          setOpen(false);
        }}
      >
        <Typography.Title level={5}>同时满足以下条件<QuestionCircleOutlined /></Typography.Title>
        <ProFormList name={'condition'} style={{ width: '100%' }}>
          <RenderRow />
        </ProFormList>
      </DrawerForm>
    </>
  );
};


type ConditionNodeProps = {
    conditionNodeList?: ProcessNodeType[],
    pRef: ProcessNodeType,
    objRef: ProcessNodeType
}
const ConditionNode: React.FC<ConditionNodeProps> = ({conditionNodeList: branches, ...restProps}) => {

    const {onAddNode, onDeleteNode, onSelectNode} = useContext(WFC);

    function addBranch() {
        onAddNode?.(NodeTypes.BRANCH, restProps.pRef, restProps.objRef);
    }

    function delBranch(i: number) {
        if (branches?.length === 2) {
            onDeleteNode?.(restProps.pRef, restProps.objRef);
            return;
        }
        onDeleteNode?.(restProps.pRef, restProps.objRef, NodeTypes.BRANCH, i);
    }

    function onBranchClick(objRef: ProcessNodeType) {
        onSelectNode?.(restProps.objRef, objRef);
    }

    if (!branches || branches.length === 0) {
        return (<div></div>);
    }

    return (
        <div className={styles.branchWrap}>
            <div className='branch-box-wrap'>
                <div className='branch-box'>
                    <div className='add-branch' onClick={addBranch}>添加条件</div>
                    {branches.map((item, index) => {
                        return (<div className='col-box' key={index.toString()}>
                            <BranchNode
                                onBranchClick={onBranchClick}
                                delBranch={() => delBranch(index)}
                                objRef={item}
                                index={index}
                            />
                            {item.childNode && <Render pRef={item} config={item.childNode}/>}
                            <CoverLine first={index === 0} last={index === branches.length - 1}/>
                        </div>);
                    })}
                </div>
                <AddNode objRef={restProps.objRef}/>
            </div>
        </div>
    );
};

export default ConditionNode;

