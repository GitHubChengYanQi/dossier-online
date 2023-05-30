/**
 * 部门负责小区分区设置字段配置页
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useRepairDeptManage = ()=>{
    const RepairDeptManageId:ColumnsType = {
        title:"",
        dataIndex:"repairDeptManageId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const DeptId:ColumnsType = {
        title:"",
        dataIndex:"deptId",
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
        DeptId,
        AreaId,
        PartitionId,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useRepairDeptManage