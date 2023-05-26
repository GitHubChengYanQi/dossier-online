/**
 * 房屋管理-小区表字段配置页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useBuildArea = ()=>{
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
    const Province:ColumnsType = {
        title:"",
        dataIndex:"province",
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
    const GasType:ColumnsType = {
        title:"",
        dataIndex:"gasType",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const City:ColumnsType = {
        title:"",
        dataIndex:"city",
        hideInForm:true,
        hideInTable:true,
    }
    const County:ColumnsType = {
        title:"",
        dataIndex:"county",
        hideInForm:true,
        hideInTable:true,
    }
    const Identifying:ColumnsType = {
        title:"",
        dataIndex:"identifying",
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
    const Customerservice:ColumnsType = {
        title:"",
        dataIndex:"customerservice",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    return {
        Id,
        Name,
        Inputtime,
        Updatetime,
        Province,
        Display,
        GasType,
        City,
        County,
        Identifying,
        No,
        Customerservice,
    }
}
export default useBuildArea