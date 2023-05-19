import React from 'react';
import {ApartmentOutlined, AuditOutlined, SendOutlined} from "@ant-design/icons";

type AddNodeOptionProps = {
    name?: string;
    auditType?: string;
    onClick?: () => void;
}

const AddNodeOption: React.FC<AddNodeOptionProps> = (props) => {
    return (<a className={"add-node-popover-item " + props.auditType} onClick={props.onClick}>
        <div className="item-wrapper">
            {props.auditType==="approver"&&<AuditOutlined />}
            {props.auditType==="condition"&&<ApartmentOutlined />}
            {props.auditType==="notifier"&&<SendOutlined/>}
        </div>
        <p>{props.name}</p>
    </a>);
}


export default AddNodeOption;
