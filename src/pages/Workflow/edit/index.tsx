import React, {useState} from 'react';
import WorkflowContent from './workflow';
import {Button, Card, Space} from 'antd';
import {request} from "@/utils/Request";
// import {useParams} from "umi";

const Workflow = () => {

    // const {type} = useParams();
    // console.log(params)

    const [value, setValue] = useState('');




    return <>
        <div style={{padding: 16, textAlign: 'right',}}>
            <Space>
                <Button type='primary' onClick={async () => {
                    console.log(value)
                    const response = await request("/activiti/update", {
                        data: value
                    });
                    console.log(response);
                }}>保存</Button>
            </Space>
        </div>
        <Card style={{height: 'calc(100vh - 165px)'}}>
            <WorkflowContent
                value={value}
                onChange={(value: any) => {
                    setValue(value);
                }}/>
        </Card>
    </>;
};

export default Workflow;
