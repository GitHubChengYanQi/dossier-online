/**
 * 列表页
 *
 * @author Sing
 * @Date 2023-05-29 09:49:34
 */

import React, {useRef,useState} from 'react';
import useRepairDeptTypeField from "../schema";
import {delRepairDeptTypeInfo,getRepairDeptTypeList} from "../service";
import RepairDeptTypeEdit from "../repairDeptTypeEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const RepairDeptTypeList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        RepairDeptTypeId,
        DeptId,
        DictCode,
        CreateTime,
        UpdateTime,
        CreateUser,
        UpdateUser,
    } = useRepairDeptTypeField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        RepairDeptTypeId,
        DeptId,
        DictCode,
        CreateTime,
        UpdateTime,
        CreateUser,
        UpdateUser,
        {
            title: "操作",
            hideInSearch:true,
            render:(value: any, record: any)=>{
                return(
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={()=>{
                            setEditId(record.repairDeptTypeId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delRepairDeptTypeInfo(record.repairDeptTypeId);
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
                rowKey="repairDeptTypeId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getRepairDeptTypeList(params, sorter, filter);
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
            <RepairDeptTypeEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} repairDeptTypeId={editId} open={open} />
        </PageContainer>
    );
};

export default RepairDeptTypeList;
