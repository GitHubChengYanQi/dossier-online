/**
 * ResponseData，通用返回结果
 */
export interface ResponseData<T> {
    data: T; //any[] | boolean | number | number | { [key: string]: any } | null | string;
    /**
     * 业务状态码
     */
    errCode: number;
    message?: string;
    success?: boolean;
}