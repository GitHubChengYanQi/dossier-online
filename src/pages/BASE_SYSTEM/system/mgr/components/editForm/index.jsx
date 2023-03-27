import { Modal } from 'antd';
import React, {PropsWithChildren, useEffect} from 'react';
import {ProTable} from "@ant-design/pro-components";
import {request, useRequest} from "../../../../../../utils/Request";

const getUserInfo = {
    url: '/rest/mgr/getUserInfo',
    method: 'POST',
    rowKey: 'userId'
};
const EditForm = (props) => {
    const { modalVisible, onCancel,columns,id } = props;

    return (
        <Modal
            destroyOnClose
            title="新建"
            width={420}
            open={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            <ProTable
                type="form"
                columns={columns}
                form={{
                    request:async ()=>{
                        if(id!==null && id!==0){
                            const response = await request({
                                ...getUserInfo,
                                params:{
                                    userId:id
                                }
                            });
                            return response.data;
                        }else{
                            return {};
                        }
                    }
            }}
            />
        </Modal>
    );
};

export default EditForm;