/**
 * 字段配置页
 *
 * @author Sing
 * @Date 2023-05-29 09:49:34
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useRepairDeptType = ()=>{
    const RepairDeptTypeId:ColumnsType = {
        title:"",
        dataIndex:"repairDeptTypeId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const DeptId:ColumnsType = {
        title:"",
        dataIndex:"deptId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const DictCode:ColumnsType = {
        title:"",
        dataIndex:"dictCode",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const CreateTime:ColumnsType = {
        title:"",
        dataIndex:"createTime",
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
    const CreateUser:ColumnsType = {
        title:"",
        dataIndex:"createUser",
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
    return {
        RepairDeptTypeId,
        DeptId,
        DictCode,
        CreateTime,
        UpdateTime,
        CreateUser,
        UpdateUser,
    }
}
export default useRepairDeptType