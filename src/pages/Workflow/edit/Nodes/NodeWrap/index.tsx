import React from 'react';
import { NodeTypes } from '../Constants';
import AddNode from '../AddNode/index';
import styles from './index.module.scss';
import { ProcessNodeType } from '@/pages/Workflow/edit/type';
import { CloseOutlined } from '@ant-design/icons';

type NodeWrapProps = {
  titleStyle?: object,
  auditType?: string,
  title?: any,
  onContentClick?: () => {},
  delNode?: () => {},
  children?: any,
  objRef?: ProcessNodeType
}

const NodeWrap: React.FC<NodeWrapProps> = (props) => {
  return (
    <div>
      <div className={styles.nodeWrap}>
        <div
          className={'node-wrap-box ' + (props.auditType === NodeTypes.START ? 'start-node' : '')}
          onClick={props.onContentClick}
        >
          <div className='title' style={props.titleStyle}>
            <div className='name'>
              {props.title}
            </div>
            <div className='close' onClick={(e) => {
              props.delNode?.();
              e.stopPropagation();
            }}>
              <CloseOutlined />
            </div>
          </div>
          <div className='content'>
            {props.children}
          </div>
        </div>
        <AddNode objRef={props.objRef} />
      </div>
    </div>
  );
};
export default NodeWrap;
