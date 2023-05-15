/**
 * 接口配置
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const billPaymentAdd = {
  url: '/billPayment/add',
  method: 'POST',
  rowKey:'paymentId'
};

export const billPaymentEdit = {
  url: '/billPayment/edit',
  method: 'POST',
  rowKey:'paymentId'
};

export const billPaymentDelete = {
  url: '/billPayment/delete',
  method: 'POST',
  rowKey:'paymentId'
};

export const billPaymentDetail = {
  url: '/billPayment/detail',
  method: 'POST',
  rowKey:'paymentId'
};

export const billPaymentList = {
  url: '/billPayment/list',
  method: 'POST',
  rowKey:'paymentId'
};

export const getBillPaymentList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(billPaymentList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getBillPaymentInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(billPaymentDetail.url, {
        method: "GET",
        params: {
            paymentId: id
        }
    });
    return response.data;
}

export const saveBillPayment = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.paymentId = id;
        return await request(billPaymentEdit.url, {
            data
        });
    } else {
        return await request(billPaymentAdd.url, {
            data
        });
    }
}

export const delBillPaymentInfo = async (id: number) => {
    return await request(billPaymentDelete.url, {
        method: "GET",
        params: {
            paymentId: id
        }
    });
}