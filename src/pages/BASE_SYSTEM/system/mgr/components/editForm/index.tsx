import {App} from 'antd';
import React from 'react';
import {BetaSchemaForm, ModalForm} from "@ant-design/pro-components";
import {getUserInfo, save} from "@/services/BASE_SYSTEM/user";
import {ModalFormProps} from "@ant-design/pro-form/es/layouts/ModalForm";
import useAlert from "@/components/useAlert";
import {ColumnsType} from "@/types/common";
import useUserField from "@/pages/BASE_SYSTEM/system/mgr/schema";

export interface userEditProps {
    modalVisible: boolean,
    onCancel: (flag?: boolean) => void,
    userId: number
}

const EditForm: React.FC<userEditProps & ModalFormProps> = (props) => {
    const {modalVisible, onCancel, userId, ...other} = props;
    const {notification} = App.useApp();
    const {error} = useAlert();
    const {Account, Birthday, DeptId, Email, Name, PassWord, PositionName, RePassWord, SexName} = useUserField();

    const columns:Array<ColumnsType> = [
        {
            order: 15,
            valueType: 'dependency',
            name: [],
            columns: ():Array<ColumnsType> => {
                return userId === 0 ? [
                    Account
                ] : []
            }
        },
        Name,
        {
            order: 8,
            valueType: 'dependency',
            name: [],
            columns: ():Array<ColumnsType> => {
                return userId === 0 ? [
                    PassWord,
                    RePassWord,

                ] : []
            }
        },
        Birthday,
        Email,
        SexName,
        DeptId,
        PositionName
    ];

    return (
        <ModalForm
            title="成员管理"
            width={540}
            open={modalVisible}
            {...other}
            modalProps={{
                centered: true,
                destroyOnClose: true
            }}
            request={async () => {
                return getUserInfo(userId);
            }}
            onFinish={async (values) => {
                await save(userId, values).catch((e) => {
                    error(e.message);
                });
                notification.success({message: '操作成功'});
                onCancel(true)
            }}
            onOpenChange={(v) => {
                if (!v) {
                    onCancel();
                }
            }}
        >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </ModalForm>
    );
};

export default EditForm;