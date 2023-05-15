import React from 'react';

function AddNodeOption(props) {
  return (<a className={"add-node-popover-item "+ props.type} onClick={props.onClick}>
    <div className="item-wrapper">
     icon
    </div>
    <p>{props.name}</p>
  </a>);
}


export default AddNodeOption;
