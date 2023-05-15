/**
 * 字段配置页
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useBillPayment = ()=>{
    const PaymentId:ColumnsType = {
        title:"",
        dataIndex:"paymentId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const BillId:ColumnsType = {
        title:"",
        dataIndex:"billId",
        hideInForm:true,
        hideInTable:true,
    }
    const PayType:ColumnsType = {
        title:"",
        dataIndex:"payType",
        valueType:"radio",
        valueEnum:{
            cash:{
                text:"现金"
        },
            credit:{
                text:"刷卡"
        },
            alipay:{
                text:"支付宝"
        },
            wxpay:{
                text:"微信支付"
        },
        },
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const PayMoney:ColumnsType = {
        title:"",
        dataIndex:"payMoney",
        valueType:"money",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const RefundOrNot:ColumnsType = {
        title:"退款",
        dataIndex:"refundOrNot",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"已退"
        },
            0:{
                text:"未退"
        },
        },
        hideInForm:true,
    }
    const RefundAmount:ColumnsType = {
        title:"",
        dataIndex:"refundAmount",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
    }
    const InvoiceOrNot:ColumnsType = {
        title:"",
        dataIndex:"invoiceOrNot",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"已开"
        },
            0:{
                text:"未开"
        },
        },
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const InvoiceNo:ColumnsType = {
        title:"",
        dataIndex:"invoiceNo",
        hideInForm:true,
        hideInSearch:true,
    }
    const CreateTime:ColumnsType = {
        title:"",
        dataIndex:"createTime",
        valueType:"dateTime",
        hideInForm:true,
        hideInTable:true,
    }
    const CreateUser:ColumnsType = {
        title:"",
        dataIndex:"createUser",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const UpdateTime:ColumnsType = {
        title:"",
        dataIndex:"updateTime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const UpdateUser:ColumnsType = {
        title:"",
        dataIndex:"updateUser",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Display:ColumnsType = {
        title:"",
        dataIndex:"display",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    return {
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
    }
}
export default useBillPayment