import React, { useState } from 'react';
import WorkflowContent from './workflow';
import { Button, Card, Space } from 'antd';

const Workflow = () => {

  const [value, setValue] = useState('');

  return <>
    <div style={{ padding: 16,  textAlign: 'right', }}>
      <Space>
        <Button type='primary' onClick={() => {
          console.log(value);
        }}>保存</Button>
      </Space>
    </div>
    <Card style={{ height: '90vh' }}>
      <WorkflowContent
        value={value}
        onChange={(value) => {
          setValue(value);
        }} />
    </Card>
  </>;
};

export default Workflow;
