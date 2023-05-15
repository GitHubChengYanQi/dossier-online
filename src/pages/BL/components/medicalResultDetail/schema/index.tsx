/**
 * 检查结果字段配置页
 *
 * @author Sing
 * @Date 2023-05-09 10:04:51
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useMedicalResultDetail = ()=>{
    const ResultDetailId:ColumnsType = {
        title:"",
        dataIndex:"resultDetailId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const ResultId:ColumnsType = {
        title:"",
        dataIndex:"resultId",
        hideInForm:true,
        hideInTable:true,
    }
    const PatientId:ColumnsType = {
        title:"",
        dataIndex:"patientId",
        hideInForm:true,
        hideInTable:true,
    }
    const MedicalId:ColumnsType = {
        title:"",
        dataIndex:"medicalId",
        hideInForm:true,
        hideInTable:true,
    }
    const MedicalGroupId:ColumnsType = {
        title:"",
        dataIndex:"medicalGroupId",
        hideInForm:true,
        hideInTable:true,
    }
    const MedicalItemId:ColumnsType = {
        title:"",
        dataIndex:"medicalItemId",
        hideInForm:true,
        hideInTable:true,
    }
    const Value:ColumnsType = {
        title:"",
        dataIndex:"value",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Content:ColumnsType = {
        title:"",
        dataIndex:"content",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Title:ColumnsType = {
        title:"",
        dataIndex:"title",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Type:ColumnsType = {
        title:"",
        dataIndex:"type",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Config:ColumnsType = {
        title:"",
        dataIndex:"config",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Sort:ColumnsType = {
        title:"",
        dataIndex:"sort",
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
        ResultDetailId,
        ResultId,
        PatientId,
        MedicalId,
        MedicalGroupId,
        MedicalItemId,
        Value,
        Content,
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
export default useMedicalResultDetail