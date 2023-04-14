import {ColumnsType} from "@/types/common";
import {BetaSchemaForm, ModalForm} from "@ant-design/pro-components";
import useMenuField from "@/pages/BASE_SYSTEM/system/menu/schema";
import {getMenuInfo, save} from "@/pages/BASE_SYSTEM/system/menu/service";

type menuEditProps = {
    open: boolean;
    editId: number;

    onOpenChange?: (v: boolean) => void;
}
const MenuEdit: React.FC<menuEditProps> = (props) => {

    const {open, editId, onOpenChange} = props;
    const {
        Label,
        value,
        pids,
        menuFlag,
        url,
        sort
    } = useMenuField();

    const columns: ColumnsType[] = [
        Label,
        value,
        pids,
        menuFlag,
        url,
        sort
    ];

    return (
        <ModalForm
            title={"编辑菜单"}

            width={420}
            modalProps={{
                centered:true,
                destroyOnClose:true
            }}
            open={open}
            onOpenChange={(v) => {
                onOpenChange?.(v);
            }}
            request={async ()=>{
                return await getMenuInfo(editId);
            }}
            onFinish={async (values)=>{
                await save(editId,values);
                onOpenChange?.(false);
            }}
        >
            <BetaSchemaForm columns={columns} layoutType={"Embed"}/>
        </ModalForm>
    );
}
export default MenuEdit;