/**
 * 检查项目配置列表页
 *
 * @author
 * @Date 2023-04-14 11:48:58
 */

import React, {useRef, useState} from 'react';
import useMedicalItemField from "../schema";
import {delMedicalItemInfo, getMedicalItemList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable, ActionType} from "@ant-design/pro-components";
import {Button} from "antd";
import useAlert from "@/components/useAlert";
import MedicalItemEdit from "@/pages/Work/Medical/medicalItem/medicalItemEdit";
import DelButton from "@/components/DelButton";
import {ColumnsType} from "@/types/common";

const MedicalItemList = () => {

    const [editId, setEditId] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalItemField();

    const columns: ColumnsType[] = [
        {
            title: "编号",
            valueType: "indexBorder",
            width: 80,
            render: (value, record, index, action) => {
                const current = action?.pageInfo?.current || 1;
                const pageSize = action?.pageInfo?.pageSize || 20;
                return ((current - 1) * pageSize) + 1 + index;
            }
        },
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
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
                            setEditId(record.medicalItemId);
                            setOpen(true)
                        }}/>
                        <DelButton request={async () => {
                            const response = await delMedicalItemInfo(record.medicalItemId);
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
                rowKey="medicalItemId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalItemList(params, sorter, filter);
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
            <MedicalItemEdit type={"Modal"} onClose={() => {
                setEditId(0);
                setOpen(false)
            }} onSuccess={() => {
                setEditId(0);
                actionRef?.current?.reload();
                setOpen(false)
            }} medicalItemId={editId} open={open} width={420}/>
        </PageContainer>
    );
};

export default MedicalItemList;
