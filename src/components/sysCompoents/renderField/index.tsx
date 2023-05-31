import {ColumnsType} from "@/types/common";
import {BetaSchemaForm} from "@ant-design/pro-components";
import SelectPosition from "@/components/sysCompoents/selectPosition";
import SelectDept from "@/components/sysCompoents/selectDept";
import {
    ProFieldValueType,
    ProSchemaValueEnumMap,
    ProSchemaValueEnumObj
} from "@ant-design/pro-utils/es/typing";
import {request} from "@/utils/Request";
import {ColProps} from "antd";

export type requestType = {
    url: string;

    method?: "GET" | "POST"

    labelName?: string;

    valueName?: string;

    params?: Record<string, any>;

    data?: Record<string, any>;

}
export declare type RenderFieldType = {

    title?: string;

    name?: string;

    type?: string;//"position" | "dept" |ProFieldValueTypeWithFieldProps;

    enums?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

    request?: requestType;

    dataIndex?: string;


    params?: Record<string, any>;

} & Omit<ColumnsType, "request" | "valueType" | "valueEnum">

type RenderFieldProps = {
    config?: RenderFieldType;

    name?: string;

    label?: string;

    span?: ColProps;

    onChange?: (value: any, allValues: any) => void;
}
const RenderField: React.FC<RenderFieldProps> = (props) => {

    const {config, span, onChange} = props

    if (!config?.type) {
        return null;
    }

    const result: ColumnsType = {
        title: config.title,
        dataIndex: config.name || config.dataIndex,
        valueEnum: config.enums,
        colProps: span,
        fieldProps: {
            onChange: (value: any, allValues: any) => {
                onChange?.(value, allValues);
            }
        }
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
        case "dict":
            return <SelectDept/>
        default:
            result.valueType = config.type as ProFieldValueType;
    }

    /**
     *设置数据源
     */
    if (config.enums) {
        result.valueEnum = config.enums
    }
    if (config.request) {
        const reqConfig = config.request;

        result.request = async () => {
            const response = await request(reqConfig?.url, {
                method: reqConfig.method,
                params: reqConfig.params,
                data: reqConfig.data,
            })
            const {data} = response;

            return data ? data.map((item: Record<string, any>) => {
                return {
                    title: reqConfig.labelName ? item[reqConfig.labelName] : "",
                    label: reqConfig.labelName ? item[reqConfig.labelName] : "",
                    value: reqConfig.valueName ? item[reqConfig.valueName] : "",
                    key: reqConfig.valueName ? item[reqConfig.valueName] : "",
                }
            }) : [];
        }
    }
    return (
        <BetaSchemaForm columns={[result]} layoutType={"Embed"}/>
    );
}
export default RenderField;
