/**
 * 房屋的管家设置字段配置页
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useRepairHousekeepManage = ()=>{
    const RepairDeptManageId:ColumnsType = {
        title:"",
        dataIndex:"repairDeptManageId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const UserId:ColumnsType = {
        title:"",
        dataIndex:"userId",
        valueType:"digit",
        hideInForm:true,
        hideInTable:true,
    }
    const AreaId:ColumnsType = {
        title:"",
        dataIndex:"areaId",
        valueType:"digit",
        hideInForm:true,
        hideInTable:true,
    }
    const PartitionId:ColumnsType = {
        title:"",
        dataIndex:"partitionId",
        valueType:"digit",
        hideInForm:true,
        hideInTable:true,
    }
    const Bn:ColumnsType = {
        title:"",
        dataIndex:"bn",
        hideInForm:true,
        hideInTable:true,
    }
    const Unit:ColumnsType = {
        title:"",
        dataIndex:"unit",
        valueType:"digit",
        hideInForm:true,
        hideInTable:true,
    }
    const Floor:ColumnsType = {
        title:"",
        dataIndex:"floor",
        valueType:"digit",
        hideInForm:true,
        hideInTable:true,
    }
    const IsMain:ColumnsType = {
        title:"",
        dataIndex:"isMain",
        valueType:"digit",
        hideInForm:true,
        hideInTable:true,
    }
    const CreateTime:ColumnsType = {
        title:"",
        dataIndex:"createTime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
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
        RepairDeptManageId,
        UserId,
        AreaId,
        PartitionId,
        Bn,
        Unit,
        Floor,
        IsMain,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useRepairHousekeepManage