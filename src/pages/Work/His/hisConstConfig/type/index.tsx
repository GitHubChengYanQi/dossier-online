/**
 * HisConstConfigType，费用配置表
 */
export interface HisConstConfigType {

    costConfigid: number;
    /**
     * 费用名称
     */
    constName?: string;
    /**
     * 金额
     */
    money?: number;
    subjectId?:number;

    positionIds?:number[];
    /**
     * 排序
     */
    sort?: number;
    /**
     * 类型
     */
    type?: string;
    /**
     * 类型key
     */
    typeKey?: string;
}