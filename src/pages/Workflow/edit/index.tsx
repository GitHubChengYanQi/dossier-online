import React, { useState } from 'react';
import WorkflowContent from './workflow';
import { Button, Card, message, Space } from 'antd';
import { request } from '@/utils/Request';
import { useParams } from 'umi';

const Workflow = () => {


  const { id } = useParams();

  const [value, setValue] = useState('');


  return <>
    <div style={{ padding: 16, textAlign: 'right' }}>
      <Space>
        <Button type='primary' onClick={async () => {
          await request(`/activiti/update/${id}`, {
            data: value,
          }).then(() => {
            message.success('yes');
          }).catch(() => {
            message.error('no');
          });
        }}>保存</Button>
      </Space>
    </div>
    <Card style={{ height: 'calc(100vh - 165px)' }}>
      <WorkflowContent
        value={value}
        onChange={(value: any) => {
          setValue(value);
        }} />
    </Card>
  </>;
};

export default Workflow;
