import React, {useContext} from 'react';
import NodeWrap from '../NodeWrap/index';
import WFC from '../../OperatorContext';
import { ProcessNodeType } from '@/pages/Workflow/edit/type';
import { OptionNames } from '@/pages/Workflow/edit/Nodes/Constants';

type NotifierNodeType = {
  pRef?: ProcessNodeType;
  objRef?: ProcessNodeType;
}

const NotifierNode = (props) => {
  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function delNode() {
    onDeleteNode?.(props.pRef, props.objRef);
  }

  function onContentClick() {
    onSelectNode?.(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (<NodeWrap
    delNode={delNode}
    titleStyle={{backgroundColor: 'rgb(50, 150, 250)'}}
    onContentClick={onContentClick}
    title={OptionNames.SEND}
    objRef={props.objRef}>
    <div className="text">
      {'请选择抄送人'}
    </div>
  </NodeWrap>);
}

export default NotifierNode;
