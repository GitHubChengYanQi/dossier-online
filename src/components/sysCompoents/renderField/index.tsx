import {ColumnsType} from "@/types/common";
import {BetaSchemaForm} from "@ant-design/pro-components";
import SelectPosition from "@/components/sysCompoents/selectPosition";
import SelectDept from "@/components/sysCompoents/selectDept";
import {ProSchemaValueEnumMap, ProSchemaValueEnumObj} from "@ant-design/pro-utils/es/typing";

export declare type RenderFieldType = {

    title?: string;

    name?: string;

    type: string;

    enums?: Record<string, ProSchemaValueEnumObj | ProSchemaValueEnumMap>

} & Omit<ColumnsType, "request" | "valueType" | "valueEnum">

type RenderFieldProps = {
    config: RenderFieldType
}
const RenderField: React.FC<RenderFieldProps> = (props) => {

    const {config} = props

    if (!config.type) {
        return null;
    }

    const result: ColumnsType = {
        dataIndex: config.name
    }
    /**
     * 设置字段类型
     */
    switch (config.type) {
        case "position":
            result.renderFormItem = () => {
                return <SelectPosition/>
            }
            break;
        case "dept":
            result.renderFormItem = () => {
                return <SelectDept/>
            }
            break;
        default:
            result.valueType = "text";
    }
    return (
        <BetaSchemaForm columns={[result]} layoutType={"Embed"}/>
    );
}
export default RenderField;