/**
 * 检查项目配置字段配置页
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */

import {request} from "@/utils/Request";

const useMedicalItem = ()=>{
    const MedicalItemId = {
        title:"编码",
        dataIndex:"medicalItemId",
        valueType:"",
        hideInTable:true,
        hideInSearch:true,
    }
    const MedicalGroupId = {
        title:"所属分组",
        dataIndex:"medicalGroupId",
        valueType:"select",
        request: async ()=>{
            const response = await request("/medicalGroup/listSelect");
            return response.data;
        }
    }
    const Title = {
        title:"名称",
        dataIndex:"title",
        valueType:"",
    }
    const Type = {
        title:"项目类型",
        dataIndex:"type",
        valueType:"",
    }
    const Config = {
        title:"",
        dataIndex:"config",
        valueType:"",
        hideInTable:true,
        hideInSearch:true,
    }
    const Sort = {
        title:"",
        dataIndex:"sort",
        valueType:"digit",
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
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedicalItem