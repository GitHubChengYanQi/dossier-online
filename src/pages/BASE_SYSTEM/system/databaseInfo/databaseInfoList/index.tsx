/**
 * 数据库信息表列表页
 *
 * @author 
 * @Date 2023-04-11 22:22:11
 */

import React, {useRef} from 'react';
import useDatabaseInfoField from "../schema";
import {getDatabaseInfoList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";

const DatabaseInfoList = () => {
    const {
        DbId,
        DbName,
        JdbcDriver,
        UserName,
        Password,
        JdbcUrl,
        Remarks,
        CreateTime,
    } = useDatabaseInfoField();

    const columns = [
        DbId,
        DbName,
        JdbcDriver,
        UserName,
        Password,
        JdbcUrl,
        Remarks,
        CreateTime,
        ];


    const actionRef = useRef<ActionType>();

    return (
        <PageContainer>
             <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="dbId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getDatabaseInfoList(params, sorter, filter);
                    return {
                        data: data || [],
                        success
                    };
                }}
                toolBarRender={() => [
                                <>
                                    <Button
                                        key="1"
                                        type="primary"
                                        onClick={() => {

                                        }}
                                    >
                                    新建
                                    </Button>
                                </>,
                            ]}
                        />
        </PageContainer>
    );
};

export default DatabaseInfoList;
