/**
 * 字段配置页
 *
 * @author Sing
 * @Date 2023-05-11 15:18:10
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useInspect = ()=>{
    const InspectId:ColumnsType = {
        title:"",
        dataIndex:"inspectId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const PatientId:ColumnsType = {
        title:"",
        dataIndex:"patientId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const PatientName:ColumnsType = {
        title:"",
        dataIndex:"patientName",
        hideInForm:true,
        hideInSearch:true,
        hideInTable:true
    }
    const MedicalId:ColumnsType = {
        title:"",
        dataIndex:"medicalId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const MedicalName:ColumnsType = {
        title:"检查名",
        dataIndex:"medicalName",
        hideInForm:true,
    }
    const Money:ColumnsType = {
        title:"金额",
        dataIndex:"money",
        valueType:"money",
        hideInSearch:true,
        formItemProps:{
            rules:[
                {
                    required:true,message:"金额为必填字段"
                }
            ]
        }
    }
    const PayOrNot:ColumnsType = {
        title:"是否缴费",
        dataIndex:"payOrNot",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"已缴费",
                status: 'Success',
        },
            0:{
                status: 'Error',
                text:"未交费"
        },
        },
        hideInForm:true,
    }
    const PayId:ColumnsType = {
        title:"",
        dataIndex:"payId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const ResultOrNot:ColumnsType = {
        title:"是否有结果",
        dataIndex:"resultOrNot",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"有结果"
        },
            0:{
                text:"无结果"
        },
        },
        hideInForm:true,
    }
    const ResultId:ColumnsType = {
        title:"",
        dataIndex:"resultId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const CreateTime:ColumnsType = {
        title:"创建时间",
        dataIndex:"createTime",
        hideInForm:true,
        hideInSearch:true
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
        InspectId,
        PatientId,
        PatientName,
        MedicalId,
        MedicalName,
        Money,
        PayOrNot,
        PayId,
        ResultOrNot,
        ResultId,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useInspect