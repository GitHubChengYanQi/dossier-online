/**
 * 房屋的管家设置列表页
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */

import React, {useRef,useState} from 'react';
import useRepairHousekeepManageField from "../schema";
import {delRepairHousekeepManageInfo,getRepairHousekeepManageList} from "../service";
import RepairHousekeepManageEdit from "../repairHousekeepManageEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const RepairHousekeepManageList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        RepairDeptManageId,
        UserId,
        AreaId,
        PartitionId,
        Bn,
        Unit,
        Floor,
        IsMain,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useRepairHousekeepManageField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        RepairDeptManageId,
        UserId,
        AreaId,
        PartitionId,
        Bn,
        Unit,
        Floor,
        IsMain,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            hideInSearch:true,
            render:(value: any, record: any)=>{
                return(
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={()=>{
                            setEditId(record.repairDeptManageId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delRepairHousekeepManageInfo(record.repairDeptManageId);
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
            <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="repairDeptManageId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getRepairHousekeepManageList(params, sorter, filter);
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
                                setOpen(true);
                            }}
                        >
                        新建
                        </Button>
                    </>,
                ]}
            />
            <RepairHousekeepManageEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} repairDeptManageId={editId} open={open} />
        </PageContainer>
    );
};

export default RepairHousekeepManageList;
