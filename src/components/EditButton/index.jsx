import React from 'react';
import {Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const EditButton = ({onClick,style={}, ...props}) => {

  return (
      <a onClick={onClick} style={style} className="right-margin" type='link'  {...props}><EditOutlined />编辑</a>
  );
};

export default EditButton;
