/**
 * 工单挂起类型列表页
 *
 * @author Sing
 * @Date 2023-05-30 15:15:48
 */

import React, {useRef, useState} from 'react';
import useRepairSuspendField from "../schema";
import {delRepairSuspendInfo, getRepairSuspendList} from "../service";
import RepairSuspendEdit from "../repairSuspendEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable, ActionType, GridContent} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const RepairSuspendList = () => {

    const [editId, setEditId] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        SuspendId,
        RepairSuspend,
        Day,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useRepairSuspendField();

    const columns: ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        SuspendId,
        RepairSuspend,
        Day,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            width: 100,
            hideInSearch: true,
            render: (value: any, record: any) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={() => {
                            setEditId(record.suspendId);
                            setOpen(true)
                        }}/>
                        <DelButton request={async () => {
                            const response = await delRepairSuspendInfo(record.suspendId);
                            if (response.errCode !== 0) {
                                error(response.message);
                            } else {
                                actionRef?.current?.reload();
                                notification.success({message: '操作成功'});
                            }
                        }}/>
                    </Space>
                )
            }
        }
    ];

    return (
        <PageContainer>
            <GridContent contentWidth={"Fixed"}>


                <ProTable
                    scroll={{x: "max-content"}}
                    actionRef={actionRef}
                    rowKey="suspendId"
                    columns={columns}
                    request={async (params, sorter, filter) => {
                        return await getRepairSuspendList(params, sorter, filter);
                    }}
                    toolBarRender={() => [
                        <>
                            <Button
                                key="1"
                                type="primary"
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                新建
                            </Button>
                        </>,
                    ]}
                />
            </GridContent>
            <RepairSuspendEdit
                width={480}
                onClose={() => {
                setEditId(0);
                setOpen(false)
            }}
                onSuccess={() => {
                setEditId(0);
                actionRef?.current?.reload();
                setOpen(false)
            }} suspendId={editId} open={open}/>
        </PageContainer>
    );
};

export default RepairSuspendList;
