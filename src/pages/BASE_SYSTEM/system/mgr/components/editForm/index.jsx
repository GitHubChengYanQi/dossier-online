import { Modal } from 'antd';
import React, {PropsWithChildren, useEffect} from 'react';
import {ProTable} from "@ant-design/pro-components";
import {useRequest} from "../../../../../../utils/Request";

const getUserInfo = {
    url: '/rest/mgr/getUserInfo',
    method: 'POST',
    rowKey: 'userId'
};
const EditForm = (props) => {
    const { modalVisible, onCancel,columns,id } = props;

    const {data,run} = useRequest({
        ...getUserInfo,

    },{
        manual: true,
    });

    useEffect(()=>{
        if(id!==null){
            /**
             * 拉数据
             */
            run({
                params:{
                    userId:id
                }
            })
        }
    },[id])

    return (
        <Modal
            destroyOnClose
            title="新建"
            width={420}
            open={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            {id!==null&&data&&<ProTable
                type="form"
                columns={columns}
                form={
                    {
                        initialValues:data.data
                    }
                }
            />}
        </Modal>
    );
};

export default EditForm;