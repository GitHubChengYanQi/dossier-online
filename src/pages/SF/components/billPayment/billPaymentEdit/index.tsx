/**
 * 编辑页
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useBillPaymentField from "../schema";
import { saveBillPayment,getBillPaymentInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type BillPaymentEditProps<T> = {
    paymentId:number
} & FormWrapProps<T>

const BillPaymentEdit = <T extends Record<string, any>>(props: BillPaymentEditProps<T>) => {
    const { paymentId, type, open , onSuccess, onClose, width } = props;
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
    const columns = [
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
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getBillPaymentInfo(paymentId);
            }}
            onFinish={async (values) => {
                const response = await saveBillPayment(paymentId, values);
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </FormWrap>
    );
};

export default BillPaymentEdit;
