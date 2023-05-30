/**
 * 列表页
 *
 * @author Sing
 * @Date 2023-05-11 15:18:10
 */

import React, {useRef, useState} from 'react';
import useInspectField from "../schema";
import {delInspectInfo, getInspectList} from "../service";
import InspectEdit from "../inspectEdit";
import EditButton from "@/components/EditButton";
import {ProTable, ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider, Typography, Drawer} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import Index from "@/components/LinkButton";
import RenderMedical from "@/pages/BL/components/RenderMedical";

type InspectListProps = {
    patientId?: number
}
const InspectList: React.FC<InspectListProps> = (props) => {
    const {patientId} = props;

    const [editId, setEditId] = useState<number>(0);

    const [createMedicalId, setCreateMedicalId] = useState<number>(0);

    const [inspectId, setInspectId] = useState<number>(0);


    const [open, setOpen] = useState<boolean>(false);
    const [resultOpen, setResultOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        InspectId,
        PatientId,
        PatientName,
        MedicalId,
        MedicalName,
        Money,
        PayOrNot,
        PayId,
        ResultOrNot,
        ResultId,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useInspectField();

    const columns: ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        InspectId,
        PatientId,
        PatientName,
        MedicalId,
        MedicalName,
        Money,
        PayOrNot,
        PayId,
        ResultOrNot,
        ResultId,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            hideInSearch: true,
            width: 120,
            render: (value: any, record: any) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <Index
                            disabled={record.payOrNot === 0 || record.resultOrNot===1}
                            onClick={() => {
                                setCreateMedicalId(record.medicalId);
                                setInspectId(record.inspectId)
                                setResultOpen(true);
                            }}
                        >添加结果</Index>
                        <DelButton request={async () => {
                            const response = await delInspectInfo(record.inspectId);
                            if (response.errCode !== 0) {
                                error(response.message);
                            } else {
                                actionRef?.current?.reload();
                                notification.success({message: '操作成功'});
                            }
                        }}>作废</DelButton>
                    </Space>
                )
            }
        }
    ];

    return (
        <div>
            <ProTable
                polling={50000}
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="inspectId"
                columns={columns}
                params={{
                    patientId
                }}
                request={async (params, sorter, filter) => {
                    params.patientId = patientId;
                    const {data, success} = await getInspectList(params, sorter, filter);
                    return {
                        data: data || [],
                        success
                    };
                }}
                toolBarRender={() => [
                    <>
                        <Button
                            key="1"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            直接填写结果
                        </Button>
                        <Button
                            key="2"
                            type="primary"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            新增检查
                        </Button>
                    </>,
                ]}
            />
            <Drawer open={resultOpen} width={1200} onClose={() => {
                setResultOpen(false);
            }}>
                <RenderMedical patientId={patientId} medicalId={createMedicalId} inspectId={inspectId}
                               onSuccess={() => {
                                   setResultOpen(false);
                                   actionRef?.current?.reload();
                               }}/>
            </Drawer>
            <InspectEdit patientId={patientId} onClose={() => {
                setEditId(0);
                setOpen(false)
            }} onSuccess={() => {
                setEditId(0);
                actionRef?.current?.reload();
                setOpen(false)
            }} inspectId={editId} open={open}/>
        </div>
    );
};

export default InspectList;
