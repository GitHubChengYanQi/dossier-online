/**
 * 检查结果列表页
 *
 * @author Sing
 * @Date 2023-05-09 10:04:51
 */

import React, {useRef, useState} from 'react';
import {getMedicalResultList} from "../service";
import {ProTable, ActionType} from "@ant-design/pro-components";
import {Space, Divider, Typography, Drawer} from "antd";
import {ColumnsType} from "@/types/common";
import useAlert from "@/components/useAlert";
import RenderMedicalResult from "@/pages/BL/components/RenderMedicalResult";

const MedicalResultList = (props: {
    patientId: number
}) => {

    const {patientId} = props;

    const [resultId, setResultId] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const columns: ColumnsType[] = [
        {
            title: "序号",
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            hideInSearch: true
        },
        {
            title: "检查名",
            dataIndex: "medicalTitle",
            hideInSearch: true
        },
        {
            title: "时间",
            dataIndex: "createTime",
            valueType: "dateTime",
            hideInSearch: true
        },
        {
            title: "时间",
            dataIndex: "createTime",
            valueType: "dateRange",
            hideInTable: true
        },
        {
            title: "操作",
            width: 80,
            hideInSearch: true,
            render: (value: any, record: any) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>} onClick={() => {
                        setResultId(record.resultId);
                    }}>
                        <Typography.Link>查看</Typography.Link>
                    </Space>
                )
            }
        }
    ];

    return (
        <>
            <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="resultId"
                columns={columns}
                params={{
                    patientId
                }}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalResultList(params, sorter, filter);
                    return {
                        data: data || [],
                        success
                    };
                }}

            />
            <Drawer
                width={680}
                open={resultId > 0} onClose={() => {
                setResultId(0);
            }
            }>
                <RenderMedicalResult resultId={resultId}/>
            </Drawer>

        </>
    );
};

export default MedicalResultList;
