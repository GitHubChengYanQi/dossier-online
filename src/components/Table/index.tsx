import {ProTable} from "@ant-design/pro-components";
import React, {useState} from "react";
import {ParamsType} from "@ant-design/pro-provider";
import {ProTableProps, RequestData} from "@ant-design/pro-table/es/typing";
import {LoadingOutlined} from "@ant-design/icons";
import Omit from "omit.js";


/**
 * 为了自定义动画
 * 封装ProTable
 * @param props
 * @constructor
 */
const Table = <
    DataType extends Record<string, any>,
    Params extends ParamsType = ParamsType,
    ValueType = 'text', >(props: ProTableProps<DataType, Params, ValueType>) => {

    const {request} = props;

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ProTable<DataType, Params, ValueType>
            loading={{
                /**
                 * 在这里自定义表格的加载中演示
                 */
                spinning: loading,
                indicator: <LoadingOutlined style={{fontSize: 48}} spin/>
            }}
            request={request ? async (params, sorter, filter) => {
                setLoading(true);
                const response = await request(params, sorter, filter);
                setLoading(false);
                return response as RequestData<DataType>;

            } : undefined}
            {...Omit(props, ["request", "loading"])}
        />
    );
}
export default Table;