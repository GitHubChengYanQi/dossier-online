import React from "react";
import {BetaSchemaForm, DrawerForm} from "@ant-design/pro-components";
import {ColumnsType} from "@/types/common";
import useRoleField from "@/pages/BASE_SYSTEM/system/role/schema";
import {getRoleInfo, setRolePermission} from "@/services/BASE_SYSTEM/role";
import useAlert from "@/components/useAlert";

export type SetPermissionProps = {
    editId:number;

    open: boolean;
    onClose?:(v:boolean)=>void;
    onOpenChange?:(v:boolean)=>void;
    onSuccess?:()=>void;
}
const SetPermission: React.FC<SetPermissionProps> = (props) => {

    const {open,onClose,editId} = props;
    const {menuTree} = useRoleField();
    const columns: ColumnsType[] = [menuTree];
    const {success,error} = useAlert();
    return (
        <DrawerForm
            title={"权限配置"}
            drawerProps={{
                destroyOnClose:true
            }}
            open={open}
            onOpenChange={(v)=>{
                if(!v){
                    onClose?.(v)
                }
            }}
            request={async ()=>{
                const response = await getRoleInfo(editId);
                console.log(response)
                return {checked:response.menuIds.map((item:number)=>{
                    return item;
                    })};
            }}
            onFinish={async (values)=>{
                const response = await setRolePermission(editId,values.checked);
                if(response.errCode===0){
                    success(response.message);
                    onClose?.(true);
                }else {
                    error(response.message);
                }

            }}
        >
            <BetaSchemaForm columns={columns} layoutType={"Embed"}/>
        </DrawerForm>
    );
}
export default SetPermission;