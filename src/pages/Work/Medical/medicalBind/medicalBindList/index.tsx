/**
 * 列表页
 *
 * @author 
 * @Date 2023-04-20 10:18:26
 */

import React, {useRef} from 'react';
import useMedicalBindField from "../schema";
import {delMedicalBindInfo,getMedicalBindList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const MedicalBindList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        MedicalBindId,
        MedicalGroupId,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalBindField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        MedicalBindId,
        MedicalGroupId,
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
                            setEditId(record.medicalBindId);
                            setOpen(true)
                        }} />
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
                rowKey="medicalBindId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalBindList(params, sorter, filter);
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
            <MedicalBindEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} medicalBindId={editId} open={open} />
        </PageContainer>
    );
};

export default MedicalBindList;
