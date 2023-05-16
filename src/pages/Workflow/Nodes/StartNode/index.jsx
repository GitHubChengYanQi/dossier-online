import React, {useContext} from 'react';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/Workflow/OperatorContext';


function StartNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={()=>{onContentClick();}}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <div>
        {'请选择发起人'}
      </div>
     icon
    </NodeWrap>);
}

export default StartNode;
