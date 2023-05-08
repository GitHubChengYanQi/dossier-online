import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import {BetaSchemaForm} from "@ant-design/pro-components";
import {ColumnsType} from "@/types/common";
import {useModel} from "umi";
import {request} from "@/utils/Request";
import useAlert from "@/components/useAlert";

type DeptEditProps<T> = {
    deptId: string,
    pid?:string
} & FormWrapProps<T>
const DeptEdit = <T extends Record<string, any>>(props: DeptEditProps<T>) => {

    const {deptId, type, open, onClose,pid,onSuccess} = props;

    const {data,refresh} = useModel("dept");

    const pidColunm:ColumnsType[] = !deptId?[{
            title: '所属部门',
            dataIndex: 'pid',
            valueType: "treeSelect",
            fieldProps: {
                options: data,
                treeDefaultExpandAll:true
            }
        }]:[];
    const columns: ColumnsType[] = [
        {
            title: '部门名称',
            dataIndex: 'simpleName'
        },
            ...pidColunm,
        // {
        //     title: '排序',
        //     dataIndex: 'sort',
        //     valueType: "digit",
        // },
    ];

    const {error, notification} = useAlert();

    return (
        <FormWrap
            // title={"编辑部门"}
            open={open}
            type={type}
            onClose={onClose}
            width={360}
            labelCol={{span: 9}}
            request={async ()=>{
                if(!deptId){
                    return {
                        sort:0,
                        pid
                    }
                }
                const response = await request("/rest/dept/detail",{
                    method:"POST",
                    data:{
                        deptId
                    }
                });
                return response.data
            }}
            onFinish={async (values)=>{
                const url = !deptId?"/rest/dept/add":"/rest/dept/update"
                if(deptId){
                    values.deptId = deptId;
                }
                const response = await request(url,{
                    data:values
                })
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    notification.success({message: '操作成功'});
                    refresh();
                    onSuccess?.();
                }
            }}
        >
            <div style={{padding: "16px 16px 0 16px"}}>
                <BetaSchemaForm layoutType="Embed" columns={columns}/>
            </div>
        </FormWrap>
    );
}
export default DeptEdit;