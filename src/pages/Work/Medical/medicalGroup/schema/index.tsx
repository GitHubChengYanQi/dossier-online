/**
 * 检查分组字段配置页
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */

import {request} from "@/utils/Request";

const useMedicalGroup = ()=>{
    const MedicalGroupId = {
        title:"编码",
        dataIndex:"medicalGroupId",
        valueType:"",
        hideInForm:true,
        hideInSearch:true,
    }
    const Name = {
        title:"名称",
        dataIndex:"name",
        valueType:"",
    }
    const Code = {
        title:"编码",
        dataIndex:"code",
        valueType:"",
    }
    const CreateTime = {
        title:"",
        dataIndex:"createTime",
        valueType:"",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const CreateUser = {
        title:"",
        dataIndex:"createUser",
        valueType:"",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const UpdateTime = {
        title:"",
        dataIndex:"updateTime",
        valueType:"",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const UpdateUser = {
        title:"",
        dataIndex:"updateUser",
        valueType:"",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Display = {
        title:"",
        dataIndex:"display",
        valueType:"",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    return {
        MedicalGroupId,
        Name,
        Code,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedicalGroup