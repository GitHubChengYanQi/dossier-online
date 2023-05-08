import {request as requestProvide} from "@umijs/max";
import {ResponseData, ResponsePageInfo} from "@/types/common";
import {RequestData} from "@ant-design/pro-table/es/typing";

const request = async <T = any>(url: string, opts: any = {method: 'POST'}) => {
    const response = await requestProvide<ResponseData<T>>(url, {
        getResponse: true,
        method: "POST",
        ...opts
    });

    if (response.data.errCode === 1502) {
        const _window = window as any;
        _window.ds.sessionExpire();
        return Promise.reject(response.data);
    }
    return response.data;
};

const pageRequest = async <T = any>(url: string, opts: any = {method: 'POST'}): Promise<RequestData<T>> => {
    if(opts.data){
        const {pageSize, current, ...otherData} = opts.data;

        opts.params = {
            ...opts.params,
            pageSize,
            current
        }
        opts.data = otherData;
    }



    const response = await requestProvide<ResponsePageInfo<T>>(url, {
        getResponse: true,
        method: "POST",
        ...opts
    });
    if (response.data.errCode === 1502) {
        const _window = window as any;
        _window.ds.sessionExpire();
        return Promise.reject(response.data);
    }
    return {

        ...response.data,
        success: true,
    };
};

export default request;
export {request, pageRequest, requestProvide}