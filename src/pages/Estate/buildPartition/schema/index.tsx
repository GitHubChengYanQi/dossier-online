/**
 * 房屋管理-分区表字段配置页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useBuildPartition = ()=>{
    const Id:ColumnsType = {
        title:"",
        dataIndex:"id",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Name:ColumnsType = {
        title:"",
        dataIndex:"name",
        hideInForm:true,
        hideInTable:true,
    }
    const Display:ColumnsType = {
        title:"",
        dataIndex:"display",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Inputtime:ColumnsType = {
        title:"",
        dataIndex:"inputtime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Updatetime:ColumnsType = {
        title:"",
        dataIndex:"updatetime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const BuildAreaId:ColumnsType = {
        title:"",
        dataIndex:"buildAreaId",
        hideInForm:true,
        hideInTable:true,
    }
    const GasMonthSet:ColumnsType = {
        title:"",
        dataIndex:"gasMonthSet",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const GasMonthSetValue:ColumnsType = {
        title:"",
        dataIndex:"gasMonthSetValue",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const No:ColumnsType = {
        title:"",
        dataIndex:"no",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    return {
        Id,
        Name,
        Display,
        Inputtime,
        Updatetime,
        BuildAreaId,
        GasMonthSet,
        GasMonthSetValue,
        No,
    }
}
export default useBuildPartition