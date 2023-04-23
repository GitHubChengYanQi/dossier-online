/**
 * 检查列表页
 *
 * @author 
 * @Date 2023-04-20 10:18:26
 */

import React, {useRef, useState} from 'react';
import useMedicalField from "../schema";
import {delMedicalInfo,getMedicalList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import MedicalEdit from "../medicalEdit";

const MedicalList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        MedicalId,
        Title,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        MedicalId,
        Title,
        {
            title:"分组数",
            dataIndex:"medicalGroupId",
            render:(value,record)=>{
                return record.medicalGroupId.length
            }
        },
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            align:"right",
            render:(value: any, record: any)=>{
                return(
                    <TableOptionsWrap>
                        <EditButton onClick={()=>{
                            setEditId(record.medicalId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delMedicalInfo(record.medicalId);
                            if (response.errCode !== 0) {
                                error(response.message);
                            } else {
                                actionRef?.current?.reload();
                                notification.success({message: '操作成功'});
                            }
                        }}/>
                    </TableOptionsWrap>
                )
            }
        }
        ];

    return (
        <PageContainer>
            <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="medicalId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalList(params, sorter, filter);
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
            <MedicalEdit width={460}  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} medicalId={editId} open={open} />
        </PageContainer>
    );
};

export default MedicalList;
