import {App,  Modal} from 'antd';
import React, {PropsWithChildren, useEffect} from 'react';
import {BetaSchemaForm, ProForm, ProTable} from "@ant-design/pro-components";
import {getUserInfo, save} from "../../../../../../services/BASE_SYSTEM/user";
import {Account, Birthday, DeptName, Email, Name, PassWord, PositionName, RePassWord, SexName} from "../../schema";
const EditForm = (props) => {
    const {modalVisible, onCancel, id} = props;
    const { message,notification } = App.useApp();

    const columns = [
        Account,
        Name,
        {
            order: 8,
            valueType: 'dependency',
            name: [],
            columns: (data) => {
                return id === 0 ? [
                    PassWord,
                    RePassWord,

                ] : []
            }
        },
        Birthday,
        Email,
        SexName,
        DeptName,
        PositionName
    ];

    return (
        <Modal
            destroyOnClose
            title={id===0?"新建":"编辑"}
            width={540}
            open={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            <ProForm
                //grid //开启栅格化布局
                // layout={"horizontal"}
                request={async () => {
                    return getUserInfo(id);
                }}
                onFinish={async (values)=>{
                    await save(id,values)
                    notification.success({message:'操作成功'});
                    onCancel(true)
                }}
            >
                <BetaSchemaForm layoutType="Embed" columns={columns}/>
            </ProForm>
        </Modal>
    );
};

export default EditForm;