import React from 'react';
import AddNodeOption from '../AddNodeOption';
import {OptionNames, OptionTypes} from '../Constants';
import styles from './index.module.scss';

function AddNodeList(props) {
  return (<div className={styles.addNodePopoverBody}>
    <AddNodeOption auditType="approver" onClick={() => props.onOptionClick(OptionTypes.APPROVER)} name={OptionNames[OptionTypes.APPROVER]} />
    <AddNodeOption auditType="notifier" onClick={() => props.onOptionClick(OptionTypes.NOTIFIER)} name={OptionNames[OptionTypes.NOTIFIER]} />
    <AddNodeOption auditType="condition" onClick={() => props.onOptionClick(OptionTypes.CONDITION)} name={OptionNames[OptionTypes.CONDITION]} />
  </div>);
}

export default AddNodeList;
