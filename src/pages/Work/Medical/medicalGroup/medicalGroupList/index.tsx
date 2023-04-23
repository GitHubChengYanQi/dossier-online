/**
 * 检查分组列表页
 *
 * @author
 * @Date 2023-04-14 11:48:58
 */

import React, {useRef, useState} from 'react';
import useMedicalGroupField from "../schema";
import {delMedicalGroupInfo, getMedicalGroupList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable, ActionType} from "@ant-design/pro-components";
import {Button} from "antd";
import {ColumnsType} from "@/types/common";
import MedicalGroupEdit from "@/pages/Work/Medical/medicalGroup/medicalGroupEdit";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const MedicalGroupList = () => {

    const [editId, setEditId] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        MedicalGroupId,
        Name,
        Code,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalGroupField();

    const columns: ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        Name,
        Code,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            align: "right",
            render: (value: any, record: any) => {
                return (
                    <TableOptionsWrap>
                        <EditButton onClick={() => {
                            setEditId(record.medicalGroupId);
                            setOpen(true)
                        }}/>
                        <DelButton request={async () => {
                            const response = await delMedicalGroupInfo(record.medicalGroupId);
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
                rowKey="medicalGroupId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalGroupList(params, sorter, filter);
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
            <MedicalGroupEdit type={"Modal"} onClose={() => {
                setEditId(0);
                setOpen(false)
            }} onSuccess={() => {
                setEditId(0);
                actionRef?.current?.reload();
                setOpen(false)
            }} medicalGroupId={editId} open={open} width={360}/>
        </PageContainer>
    );
};

export default MedicalGroupList;
