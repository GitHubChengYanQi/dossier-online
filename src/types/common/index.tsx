import {ProColumns, ProFormColumnsType} from "@ant-design/pro-components";
import {RequestData} from "@ant-design/pro-table/es/typing";
import React from "react";
import {RouteObject} from "react-router/lib/router";

/**
 * request请求结果
 */
export interface ResponseData<T = any> {

    /**
     * 业务状态码
     */
    errCode: number;
    data: T | undefined; //any[] | boolean | number | number | { [key: string]: any } | null | string;
    msg?: string;
    message: string;
    success: boolean;
}

/**
 * request 列表请求结果
 */
export interface ResponsePageInfo<T = any> {

    /**
     * 业务状态码
     */
    errCode: number;
    data: T[] | undefined; //any[] | boolean | number | number | { [key: string]: any } | null | string;
    msg?: string;
    message: string;
    success: boolean;
    count?: number;
    current?: number;
    pageSize?: number;
}

export declare type FieldProps = {
    formAction?: any
}

/**
 * 全局初始化状态
 */
export interface initType {
    avatar: string,
    name: string,
    userInfo: any,
    menus: any
}

/**
 * 列表service 定义
 */
export declare type GetListType = <T = any>(params: Record<string, any>, sorter: Record<string, 'descend' | 'ascend' | null>, filter: Record<string, (string | number)[] | null>) => Promise<RequestData<T>>;
/**
 * 字段类型生明
 */
export declare type ColumnsType = ProColumns & ProFormColumnsType;

export declare type tabs = {
    key: string;
    label: string | React.ReactNode;
    children: React.ReactNode | string | undefined;
    name?: string
} & RouteObject