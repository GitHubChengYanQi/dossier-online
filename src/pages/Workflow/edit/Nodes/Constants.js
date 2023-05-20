// 添加节点类型
export const OptionTypes = {
  START: 'START',
  APPROVER: 'USERTASK',
  NOTIFIER: 'SEND',
  BRANCH: 'BRANCH',
  CONDITION: 'GATEWAY',
  CHILDRENPROCESS: 'CHILDRENPROCESS',
};
export const NodeTypes = OptionTypes;
// 节点类型默认标题名
export const OptionNames = {
  [OptionTypes.START]: '发起',
  [OptionTypes.APPROVER]: '审批',
  [OptionTypes.NOTIFIER]: '抄送',
  [OptionTypes.CONDITION]: '条件分支',
  [OptionTypes.BRANCH]: '条件',
  [OptionTypes.CHILDRENPROCESS]: '子流程',
};
// 节点模板
export const NodeTemplates = {
  [OptionTypes.APPROVER]: {
    auditType: OptionTypes.APPROVER,
    nodeSetting: {},
  },
  [OptionTypes.NOTIFIER]: {
    auditType: OptionTypes.NOTIFIER,
    nodeSetting: {},
  },
  [OptionTypes.CONDITION]: {
    auditType: OptionTypes.CONDITION,
    nodeSetting: {},
  },
  [OptionTypes.CHILDRENPROCESS]: {
    auditType: OptionTypes.CHILDRENPROCESS,
    nodeSetting: {},
  },
  [OptionTypes.BRANCH]: {
    auditType: OptionTypes.BRANCH,
    nodeSetting: {},
  },
};

