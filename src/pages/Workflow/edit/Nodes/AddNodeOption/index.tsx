import React from 'react';
import { ApartmentOutlined, AuditOutlined, SendOutlined, RetweetOutlined } from '@ant-design/icons';
import { OptionTypes } from '@/pages/Workflow/edit/Nodes/Constants';

type AddNodeOptionProps = {
  name?: string;
  auditType?: string;
  onClick?: () => void;
}

const AddNodeOption: React.FC<AddNodeOptionProps> = (props) => {
  return (<a className={'add-node-popover-item ' + props.auditType} onClick={props.onClick}>
    <div className='item-wrapper'>
      {props.auditType === OptionTypes.APPROVER && <AuditOutlined />}
      {props.auditType === OptionTypes.CONDITION && <ApartmentOutlined />}
      {props.auditType === OptionTypes.NOTIFIER && <SendOutlined style={{ transform: 'rotate(310deg)' }} />}
      {props.auditType === OptionTypes.CHILDRENPROCESS && <RetweetOutlined />}
    </div>
    <p>{props.name}</p>
  </a>);
};


export default AddNodeOption;
