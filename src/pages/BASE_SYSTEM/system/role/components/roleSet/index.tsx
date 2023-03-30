import {BetaSchemaForm, ModalForm} from '@ant-design/pro-components';
import type {ProFormColumnsType} from '@ant-design/pro-components';
import {roleTreeByUser} from "@/pages/BASE_SYSTEM/system/role/schema";
import React from "react";
import {roleListByUserId} from "@/services/BASE_SYSTEM/role";
import {ModalFormProps} from "@ant-design/pro-form/es/layouts/ModalForm";
import {error} from "@/utils/Alert";
import {setUserRole} from "@/services/BASE_SYSTEM/user";

type DataItem = {
    name: string;
    state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
    roleTreeByUser,
];

export interface RoleSetProps {
    modalVisible: boolean,
    onCancel: (flag?: boolean) => void,
    userId:number
}

const RoleSet: React.FC<RoleSetProps & ModalFormProps> = (props) => {

    const {modalVisible, onCancel, userId, ...other} = props;

    return (
        <ModalForm
            title="分配角色"
            width={300}
            open={modalVisible}
            {...other}
            modalProps={{
                centered:true,
                destroyOnClose:true
            }}
            request={async (): Promise<any> => {
                return await roleListByUserId(userId);
            }}
            onFinish={async (values) => {
                console.log(values.checked)
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
            <BetaSchemaForm<DataItem>
                layoutType={"Embed"}
                columns={columns}
            />
        </ModalForm>
    );
}
export default RoleSet;