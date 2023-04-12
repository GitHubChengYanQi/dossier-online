import {BetaSchemaForm, ModalForm} from '@ant-design/pro-components';
import type {ProFormColumnsType} from '@ant-design/pro-components';
import React from "react";
import {roleListByUserId} from "@/services/BASE_SYSTEM/role";
import {ModalFormProps} from "@ant-design/pro-form/es/layouts/ModalForm";
import {setUserRole} from "@/services/BASE_SYSTEM/user";
import omit from 'omit.js';
import useAlert from "@/components/useAlert";
import useRoleField from "@/pages/BASE_SYSTEM/system/role/schema";

type DataItem = {
    checked: string;
};



export interface RoleSetProps {
    modalVisible: boolean,
    onCancel: (flag?: boolean) => void,
    userId:number
}

const RoleSet: React.FC<RoleSetProps & ModalFormProps> = (props) => {

    const {modalVisible, onCancel, userId, ...other} = props;

    const otherProps:ModalFormProps = other;

    const {error} = useAlert();

    const {roleTreeByUser} = useRoleField();

    const columns: ProFormColumnsType<DataItem>[] = [
        roleTreeByUser,
    ];
    return (
        <ModalForm<DataItem>
            title="分配角色"
            width={300}
            open={modalVisible}
            {...omit(otherProps, ['modalVisible', 'onCancel','userId'] as any[])}
            modalProps={{
                centered:true,
                destroyOnClose:true
            }}
            request={async (): Promise<any> => {
                return await roleListByUserId(userId);
            }}
            onFinish={async (values) => {
                await setUserRole(userId,`${values.checked}`).catch((e)=>{
                    error(e.message);
                });
                onCancel(true)
            }}
            onOpenChange={(v)=>{
                if(!v){
                    onCancel();
                }
            }}
        >
            <BetaSchemaForm
                layoutType={"Embed"}
                columns={columns}
            />
        </ModalForm>
    );
}
export default RoleSet;