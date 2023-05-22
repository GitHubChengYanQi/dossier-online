import React from 'react';


import StartNode from '../StartNode/index';
import ApproverNode from '../ApproverNode/index';
import NotifierNode from '../NotifierNode/index';
import ConditionNode from '../ConditionNode/index';
import { OptionTypes } from '../Constants';
import { ProcessNodeType } from '@/pages/Workflow/edit/type';
import ChildrenProcessNode from '@/pages/Workflow/edit/Nodes/ChildrenProcessNode';

const NodeMaps = {
  [OptionTypes.START]: StartNode,
  [OptionTypes.APPROVER]: ApproverNode,
  [OptionTypes.NOTIFIER]: NotifierNode,
  [OptionTypes.CONDITION]: ConditionNode,
  [OptionTypes.CHILDRENPROCESS]: ChildrenProcessNode,
};

const MatchNode = (props: { config: ProcessNodeType, pRef: ProcessNodeType }) => {
  const Node = NodeMaps[props.config.auditType] || null;
  return Node && <Node {...props.config} objRef={props.config} pRef={props.pRef} />;
};

export default MatchNode;
