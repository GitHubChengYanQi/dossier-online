import React from 'react';
import AddNodeOption from '../AddNodeOption/index';
import { OptionNames, OptionTypes } from '../Constants';
import styles from './index.module.scss';

type AddNodeType = {
  onOptionClick: (optionType: string) => {}
}

const AddNodeList: React.FC<AddNodeType> = (props) => {
  return (<div className={styles.addNodePopoverBody}>
    <AddNodeOption
      auditType={OptionTypes.APPROVER}
      onClick={() => props.onOptionClick(OptionTypes.APPROVER)}
      name={OptionNames[OptionTypes.APPROVER]}
    />
    <AddNodeOption
      auditType={OptionTypes.NOTIFIER}
      onClick={() => props.onOptionClick(OptionTypes.NOTIFIER)}
      name={OptionNames[OptionTypes.NOTIFIER]}
    />
    <AddNodeOption
      auditType={OptionTypes.CONDITION}
      onClick={() => props.onOptionClick(OptionTypes.CONDITION)}
      name={OptionNames[OptionTypes.CONDITION]}
    />
    <AddNodeOption
      auditType={OptionTypes.CHILDRENPROCESS}
      onClick={() => props.onOptionClick(OptionTypes.CHILDRENPROCESS)}
      name={OptionNames[OptionTypes.CHILDRENPROCESS]}
    />
  </div>);
};

export default AddNodeList;
