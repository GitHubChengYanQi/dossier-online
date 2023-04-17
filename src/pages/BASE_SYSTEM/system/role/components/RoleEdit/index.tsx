import {BetaSchemaForm, ModalForm} from "@ant-design/pro-components";
import {ColumnsType, ResponseData} from "@/types/common";
import useRoleField from "@/pages/BASE_SYSTEM/system/role/schema";
import React from "react";
import {getRoleInfo, saveRoleInfo} from "@/services/BASE_SYSTEM/role";
import useAlert from "@/components/useAlert";

export type RoleEditProps = {
    open: boolean;
    onOpenChange?: (v: boolean) => void;

    onReload?: () => void;
    editId: number;
}
const RoleEdit: React.FC<RoleEditProps> = (props) => {

    const {open, editId, onOpenChange, onReload} = props;
    const {Name,description} = useRoleField();

    const {error} = useAlert();

    const columns: ColumnsType[] = [
        Name,
        description
    ];

    return (
        <ModalForm
            modalProps={{
                centered: true,
                destroyOnClose: true
            }}
            width={360}
            open={open}
            request={async () => {
                return await getRoleInfo(editId);
            }}
            onOpenChange={(v) => {
                onOpenChange?.(v);
            }}
            onFinish={async (values) => {
                const response:ResponseData = await saveRoleInfo(editId, values)
                if(response.errCode===0){
                    onOpenChange?.(false);
                    onReload?.();
                }else{
                    error(response.message)
                }

            }}
        >
            <BetaSchemaForm columns={columns} layoutType={"Embed"}/>
        </ModalForm>
    );
}
export default RoleEdit;