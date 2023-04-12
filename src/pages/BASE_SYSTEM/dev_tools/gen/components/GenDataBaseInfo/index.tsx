import React from 'react';
import {Button, Table} from 'antd';
import {DataBaseType, getTableList} from "./service";
import {useRequest} from "umi";
import FieldConfigList from "./components/fieldConfigList";

const {Column} = Table;


const GenDataBaseInfo = ({
                             onChange,
                             dataSourceId
                         }: { onChange?: (selectedRowKeys: any[]) => void, dataSourceId: number }) => {


    const [visible, setVisible] = React.useState<string>("");


    const {data, loading} = useRequest(async () => {
        return await getTableList(dataSourceId)
    });

    return (
        <>
            <Table<DataBaseType>
                dataSource={data as DataBaseType[]}
                loading={loading}
                pagination={false}
                rowKey="tableName"
                rowSelection={{
                    onChange: (selectedRowKeys) => {
                        onChange?.(selectedRowKeys);
                    }
                }}
            >
                <Column title="表名" dataIndex="tableName" width={200}/>
                <Column title="名称" dataIndex="tableComment" width={200}/>
                <Column title="字段配置" align="right" render={(text, values: DataBaseType) => {
                    return (
                        <Button onClick={() => {
                            setVisible(values.tableName);
                        }}>配置</Button>
                    );
                }}/>
            </Table>
            <FieldConfigList
                open={!!visible}
                onClose={() => {
                    setVisible("");
                }} dbId={dataSourceId} tableName={visible}/>
        </>
    );
};

export default GenDataBaseInfo;
