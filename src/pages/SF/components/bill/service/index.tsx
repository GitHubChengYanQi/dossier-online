/**
 * 接口配置
 *
 * @author Sing
 * @Date 2023-05-12 09:56:46
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";
import {SortOrder} from "antd/es/table/interface";

export const billAdd = {
  url: '/bill/add',
  method: 'POST',
  rowKey:'billId'
};

export const billEdit = {
  url: '/bill/edit',
  method: 'POST',
  rowKey:'billId'
};

export const billDelete = {
  url: '/bill/delete',
  method: 'POST',
  rowKey:'billId'
};

export const billDetail = {
  url: '/bill/detail',
  method: 'POST',
  rowKey:'billId'
};

export const billList = {
  url: '/bill/list',
  method: 'POST',
  rowKey:'billId'
};

export const getBillList = async (
    params: {
        pageSize?: number;
        current?: number;
        keyword?: string;
    } & Record<string, any> , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>
) => {
    return await pageRequest(billList.url, {
        data: {
            ...params
        },
        params:{
            sort,
            filter
        }
    });
}
export const getBillInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(billDetail.url, {
        method: "GET",
        params: {
            billId: id
        }
    });
    return response.data;
}

export const saveBill = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.billId = id;
        return await request(billEdit.url, {
            data
        });
    } else {
        return await request(billAdd.url, {
            data
        });
    }
}

export const delBillInfo = async (id: number) => {
    return await request(billDelete.url, {
        method: "GET",
        params: {
            billId: id
        }
    });
}