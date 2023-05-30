/**
 * 工单挂起类型字段配置页
 *
 * @author Sing
 * @Date 2023-05-30 15:15:48
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useRepairSuspend = ()=>{
    const SuspendId:ColumnsType = {
        title:"",
        dataIndex:"suspendId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const RepairSuspend:ColumnsType = {
        title:"挂起类型",
        dataIndex:"repairSuspend",
    }
    const Day:ColumnsType = {
        title:"天数",
        dataIndex:"day",
        valueType:"digit",
    }
    const Sort:ColumnsType = {
        title:"排序",
        dataIndex:"sort",
        valueType:"digit",
        hideInSearch:true,
    }
    const CreateTime:ColumnsType = {
        title:"",
        dataIndex:"createTime",
        hideInForm:true,
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
        SuspendId,
        RepairSuspend,
        Day,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useRepairSuspend