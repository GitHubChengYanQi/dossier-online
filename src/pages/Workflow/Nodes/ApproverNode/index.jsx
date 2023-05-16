import React, {useContext} from 'react';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';


function ApproverNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function delNode() {
    onDeleteNode(props.pRef, props.objRef);
  }

  function onChange(val) {
    // 数据设置不用去重新渲染
    props.pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  // TODO: 这里读取props数据
  const TitleEl = <TitleElement
    delNode={delNode} placeholder={props.nodeName || '过程'} nodeName={props.nodeName || '过程'}
    onTitleChange={onChange} />;

  return (<NodeWrap
    titleStyle={{backgroundColor: 'rgb(255, 148, 62)'}}
    onContentClick={onContentClick}
    title={TitleEl}
    objRef={props.objRef}>
    <div>
      {'请选择'}
    </div>
   icon

  </NodeWrap>);
}

export default ApproverNode;
