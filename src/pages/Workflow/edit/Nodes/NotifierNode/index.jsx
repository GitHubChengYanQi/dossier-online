import React, {useContext} from 'react';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';

function NotifierNode(props) {
  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function delNode() {
    onDeleteNode(props.pRef, props.objRef);
  }

  function onChange(val) {
    props.pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  const TitleEl = <TitleElement
    delNode={delNode}
    placeholder={props.nodeName}
    nodeName={props.nodeName || '抄送'}
    onTitleChange={onChange}
  />;
  return (<NodeWrap
    titleStyle={{backgroundColor: 'rgb(50, 150, 250)'}}
    onContentClick={onContentClick}
    title={TitleEl}
    objRef={props.objRef}>
    <div className="text">
      {'请选择抄送人'}
    </div>
    icon
  </NodeWrap>);
}

export default NotifierNode;