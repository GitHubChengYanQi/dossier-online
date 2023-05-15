/**
 * 列表页
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */

import React, {useRef, useState} from 'react';
import useBillField from "../schema";
import {delBillInfo, getBillList} from "../service";
import BillEdit from "../billEdit";
import EditButton from "@/components/EditButton";
import {ProTable, ActionType} from "@ant-design/pro-components";
import {Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import LinkButton from "@/components/LinkButton";

type  BillListProps = {
    patientId?: number;
}
const BillList: React.FC<BillListProps> = (props) => {
    const {patientId} = props;

    const [editId, setEditId] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        BillCode,
        MoneyTotal,
        MoneyMiscount,
        MoneyNeedpay,
        MoneyArrears,
        MoneyPaid,
        PayOrNot,
        PayType,
        PayTime,
        RefundOrNot,
        RefundAmount,
        InvoiceOrNot,
        InvoiceNo,
        Type,
        TypeKey,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useBillField();

    const columns: ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        BillCode,
        MoneyTotal,
        MoneyMiscount,
        MoneyNeedpay,
        MoneyArrears,
        MoneyPaid,
        PayOrNot,
        PayType,
        PayTime,
        RefundOrNot,
        RefundAmount,
        InvoiceOrNot,
        InvoiceNo,
        Type,
        TypeKey,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display, {
            dataIndex: "ofId",
            hideInTable: true,
            hideInSearch: true,
        },
        {
            title: "操作",
            hideInSearch: true,
            render: (value: any, record: any) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <LinkButton>缴费</LinkButton>
                    </Space>
                )
            }
        }
    ];

    return (
        <>
            <ProTable
                params={{
                    ofId:patientId
                }}
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="billId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    params["ofId"] = patientId
                    const {data, success} = await getBillList(params, sorter, filter);
                    return {
                        data: data || [],
                        success
                    };
                }}

            />
            <BillEdit onClose={() => {
                setEditId(0);
                setOpen(false)
            }} onSuccess={() => {
                setEditId(0);
                actionRef?.current?.reload();
                setOpen(false)
            }} billId={editId} open={open}/>
        </>
    );
};

export default BillList;
