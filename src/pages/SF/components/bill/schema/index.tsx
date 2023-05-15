/**
 * 字段配置页
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useBill = ()=>{
    const BillId:ColumnsType = {
        title:"",
        dataIndex:"billId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const BillCode:ColumnsType = {
        title:"费用编码",
        dataIndex:"billCode",
        hideInForm:true,
        hideInSearch:true,
    }
    const MoneyTotal:ColumnsType = {
        title:"总金额",
        dataIndex:"moneyTotal",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
    }
    const MoneyMiscount:ColumnsType = {
        title:"优惠金额",
        dataIndex:"moneyMiscount",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
    }
    const MoneyNeedpay:ColumnsType = {
        title:"应付金额",
        dataIndex:"moneyNeedpay",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
    }
    const MoneyArrears:ColumnsType = {
        title:"欠费金额",
        dataIndex:"moneyArrears",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
    }
    const MoneyPaid:ColumnsType = {
        title:"已付金额",
        dataIndex:"moneyPaid",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
    }
    const PayOrNot:ColumnsType = {
        title:"状态",
        dataIndex:"payOrNot",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"已支付"
        },
            0:{
                text:"未支付"
        },
        },
        hideInForm:true,
        hideInSearch:true,
    }
    const PayType:ColumnsType = {
        title:"支付方式",
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
        hideInSearch:true,
    }
    const PayTime:ColumnsType = {
        title:"支付时间",
        dataIndex:"payTime",
        valueType:"dateTime",
        hideInForm:true,
        hideInSearch:true,
    }
    const RefundOrNot:ColumnsType = {
        title:"是否退款",
        dataIndex:"refundOrNot",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"退款"
        },
            0:{
                text:"未退款"
        },
        },
        hideInForm:true,
        hideInSearch:true,
        hideInTable:true
    }
    const RefundAmount:ColumnsType = {
        title:"退款金额",
        dataIndex:"refundAmount",
        valueType:"money",
        hideInForm:true,
        hideInSearch:true,
        hideInTable:true
    }
    const InvoiceOrNot:ColumnsType = {
        title:"发票",
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
        title:"发票号",
        dataIndex:"invoiceNo",
        hideInForm:true,
        hideInTable:true,
    }
    const Type:ColumnsType = {
        title:"",
        dataIndex:"type",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const TypeKey:ColumnsType = {
        title:"",
        dataIndex:"typeKey",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const CreateTime:ColumnsType = {
        title:"账单时间",
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
        valueType:"dateTime",
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
    }
}
export default useBill