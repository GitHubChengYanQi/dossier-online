import {request} from "@/utils/Request";
import {BetaSchemaForm} from "@ant-design/pro-components";
import {ColumnsType} from "@/types/common";

export type SelectDictProps = {

    keyConfig?: {
        labelName?: string;

        valueName?: string;
    }
}&ColumnsType

const getSelectDictSchema = (params?: SelectDictProps): ColumnsType => {

    const keyConfig = params?.keyConfig;

    return {
        title: "字典",
        dataIndex: "dictId",
        request: async (params?: Record<string, any>) => {
            const {data} = await request("/rest/dict/listDictsByCode", {
                params
            })
            return [
                {
                    label: "无",
                    value: "",
                },
                ...data.map((item: any) => {
                    return {
                        label: keyConfig?.labelName?item[keyConfig.labelName]:item.name,
                        value: keyConfig?.valueName?item[keyConfig.valueName]:item.dictId,
                    }
                })
            ];
        },
        ...params,
        valueType: "select",
    }
}
const SelectDict: React.FC<SelectDictProps> = (props) => {

    // const {params} = props;

    return (
        <BetaSchemaForm columns={[
            getSelectDictSchema(props)
        ]} layoutType={"Embed"}/>
    );
}
export default SelectDict;
export {
    getSelectDictSchema
}