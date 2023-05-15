/**
 * 列表页
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */

import React, {useRef,useState} from 'react';
import useBillPaymentField from "../schema";
import {delBillPaymentInfo,getBillPaymentList} from "../service";
import BillPaymentEdit from "../billPaymentEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const BillPaymentList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        PaymentId,
        BillId,
        PayType,
        PayMoney,
        RefundOrNot,
        RefundAmount,
        InvoiceOrNot,
        InvoiceNo,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useBillPaymentField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        PaymentId,
        BillId,
        PayType,
        PayMoney,
        RefundOrNot,
        RefundAmount,
        InvoiceOrNot,
        InvoiceNo,
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
                            setEditId(record.paymentId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delBillPaymentInfo(record.paymentId);
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
                rowKey="paymentId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getBillPaymentList(params, sorter, filter);
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
            <BillPaymentEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} paymentId={editId} open={open} />
        </PageContainer>
    );
};

export default BillPaymentList;
