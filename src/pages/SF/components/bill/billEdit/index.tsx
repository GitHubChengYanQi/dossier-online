/**
 * 编辑页
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useBillField from "../schema";
import { saveBill,getBillInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type BillEditProps<T> = {
    billId:number
} & FormWrapProps<T>

const BillEdit = <T extends Record<string, any>>(props: BillEditProps<T>) => {
    const { billId, type, open , onSuccess, onClose, width } = props;
    const {
          BillId,
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
    const columns = [
        BillId,
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
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getBillInfo(billId);
            }}
            onFinish={async (values) => {
                const response = await saveBill(billId, values);
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

export default BillEdit;
