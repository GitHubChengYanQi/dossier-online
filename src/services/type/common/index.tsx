/**
 * ResponseData，通用返回结果
 */
export interface ResponseData<T = any> {
    data: T|T[]|any; //any[] | boolean | number | number | { [key: string]: any } | null | string;
    /**
     * 业务状态码
     */
    errCode: number;
    msg?: string;
    success?: boolean;
    count?:number;
    current?:number;
    pageSize?:number;
}
