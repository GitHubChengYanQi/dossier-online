import React from 'react';
import {Button, Typography} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const EditButton = ({onClick,style={}, ...props}) => {

  return (
      <Typography.Link onClick={onClick} style={style} className="right-margin" type='link'  {...props}>编辑</Typography.Link>
  );
};

export default EditButton;
