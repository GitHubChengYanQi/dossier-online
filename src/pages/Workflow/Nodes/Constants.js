// 添加节点类型
export const OptionTypes = {
  START: 'START',
  APPROVER: 'USERTASK',
  NOTIFIER: 'SEND',
  BRANCH: 'BRANCH',
  CONDITION: 'GATEWAY',
};
export const NodeTypes = OptionTypes;
// 节点类型默认标题名
export const OptionNames = {
  [OptionTypes.APPROVER]: '过程',
  [OptionTypes.NOTIFIER]: '抄送',
  [OptionTypes.CONDITION]: '分支',
};
// 节点模板
export const NodeTemplates = {
  [OptionTypes.APPROVER]: {
    auditType: OptionTypes.APPROVER,
  },
  [OptionTypes.NOTIFIER]: {
    auditType: OptionTypes.NOTIFIER,
  },
  [OptionTypes.CONDITION]: {
    auditType: OptionTypes.CONDITION,
  },
  [OptionTypes.BRANCH]: {
    auditType: OptionTypes.BRANCH,
  },
};

