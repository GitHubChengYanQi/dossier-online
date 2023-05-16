import React from 'react';


import StartNode from '../StartNode';
import ApproverNode from '../ApproverNode';
import NotifierNode from '../NotifierNode';
import ConditionNode from '../ConditionNode';
import { OptionTypes } from '../Constants';

const NodeMaps = {
  [OptionTypes.START]: StartNode,
  [OptionTypes.APPROVER]: ApproverNode,
  [OptionTypes.NOTIFIER]: NotifierNode,
  [OptionTypes.CONDITION]: ConditionNode,
};

const MatchNode = ({ config, pRef }) => {
  const Node = NodeMaps[config.auditType] || null;
  return Node && <Node {...config} objRef={config} pRef={pRef} />;
};

export default MatchNode;
