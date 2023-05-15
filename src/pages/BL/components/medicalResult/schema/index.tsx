/**
 * 检查结果字段配置页
 *
 * @author Sing
 * @Date 2023-05-09 10:04:51
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useMedicalResult = ()=>{
    const ResultId:ColumnsType = {
        title:"",
        dataIndex:"resultId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
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
        ResultId,
        PatientId,
        MedicalId,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useMedicalResult