/**
 * 报修列表页
 *
 * @author Sing
 * @Date 2023-05-19 11:41:59
 */

import React, {useRef,useState} from 'react';
import useRepairOrderField from "../schema";
import {delRepairOrderInfo,getRepairOrderList} from "../service";
import RepairOrderEdit from "../repairOrderEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const RepairOrderList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        RepairId,
        RepairNo,
        ServiceType,
        AppealType,
        MethodType,
        RepairPosition,
        RepairTypeId,
        Content,
        Remarks,
        Time,
        TimeSpanId,
        From,
        Uuid,
        Name,
        Phone,
        ProjectId,
        Status,
        EvaluateTime,
        VisitTime,
        FinishTime,
        Version,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useRepairOrderField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        RepairId,
        RepairNo,
        ServiceType,
        AppealType,
        MethodType,
        RepairPosition,
        RepairTypeId,
        Content,
        Remarks,
        Time,
        TimeSpanId,
        From,
        Uuid,
        Name,
        Phone,
        ProjectId,
        Status,
        EvaluateTime,
        VisitTime,
        FinishTime,
        Version,
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
                            setEditId(record.repairId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delRepairOrderInfo(record.repairId);
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
                rowKey="repairId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getRepairOrderList(params, sorter, filter);
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
            <RepairOrderEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} repairId={editId} open={open} />
        </PageContainer>
    );
};

export default RepairOrderList;
