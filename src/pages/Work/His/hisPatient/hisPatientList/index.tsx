/**
 * 病人表列表页
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */

import React, {useRef,useState} from 'react';
import useHisPatientField from "../schema";
import {delHisPatientInfo,getHisPatientList} from "../service";
import HisPatientEdit from "../medicalEdit";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const HisPatientList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        PatientId,
        Name,
        Birthday,
        Age,
        Mobile,
        Gender,
        IdType,
        IdNumber,
        Nation,
        Education,
        Domicile,
        Residence,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useHisPatientField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        PatientId,
        Name,
        Birthday,
        Age,
        Mobile,
        Gender,
        IdType,
        IdNumber,
        Nation,
        Education,
        Domicile,
        Residence,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            align:"right",
            hideInSearch:true,
            render:(value: any, record: any)=>{
                return(
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={()=>{
                            setEditId(record.patientId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delHisPatientInfo(record.patientId);
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
                rowKey="patientId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getHisPatientList(params, sorter, filter);
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
            <HisPatientEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} patientId={editId} open={open} />
        </PageContainer>
    );
};

export default HisPatientList;
