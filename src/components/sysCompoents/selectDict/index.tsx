import {request} from "@/utils/Request";
import {BetaSchemaForm} from "@ant-design/pro-components";
import {ColumnsType} from "@/types/common";
export type SelectDictProps = {
    params?: Record<string, any>;
    formItemProps?: Record<string, any>;
}
const getSelectDictSchema = (params?: ColumnsType):ColumnsType=>{
    return {
        title: "字典",
        dataIndex: "dictId",
        request: async (params?: Record<string, any>) => {
            console.log(params)
            const {data} = await request("/rest/dict/listDicts", {
                params
            })
            return [
                {
                    label: "无",
                    value: "",
                },
                ...data.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.dictId,
                    }
                })
            ];
        },
        ...params,
        valueType: "select",
    }
}
const SelectDict:React.FC<SelectDictProps> = (props)=>{

    const {params} = props;

    return (
        <BetaSchemaForm columns={[
            getSelectDictSchema(params)
        ]} layoutType={"Embed"}/>
    );
}
export default SelectDict;
export {
    getSelectDictSchema
}