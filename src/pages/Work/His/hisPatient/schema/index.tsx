/**
 * 病人表字段配置页
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useHisPatient = ()=>{
    const PatientId:ColumnsType = {
        title:"",
        dataIndex:"patientId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Name:ColumnsType = {
        title:"姓名",
        dataIndex:"name",
    }
    const Birthday:ColumnsType = {
        title:"生日",
        dataIndex:"birthday",
        valueType:"date",
    }
    const Age:ColumnsType = {
        title:"年龄",
        dataIndex:"age",
        valueType:"digit",
    }
    const Mobile:ColumnsType = {
        title:"手机号",
        dataIndex:"mobile",
    }
    const Gender:ColumnsType = {
        title:"性别",
        dataIndex:"gender",
        valueType:"radio",
        valueEnum:{
            1:{
                text:"男"
        },
            2:{
                text:"女"
        },
        },
    }
    const IdType:ColumnsType = {
        title:"证件类型",
        dataIndex:"idType",
        valueType:"select",
        valueEnum:{
            1:{
                text:"身份证"
        },
        },
    }
    const IdNumber:ColumnsType = {
        title:"证件号",
        dataIndex:"idNumber",
    }
    const Nation:ColumnsType = {
        title:"民族",
        dataIndex:"nation",
    }
    const Education:ColumnsType = {
        title:"文化程度",
        dataIndex:"education",
        valueType:"select",
        valueEnum:{
            1:{
                text:"大学"
        },
            2:{
                text:"大专"
        },
            3:{
                text:"高中"
        },
            4:{
                text:"初中"
        },
            5:{
                text:"小学"
        },
        },
    }
    const Domicile:ColumnsType = {
        title:"",
        dataIndex:"domicile",
        hideInTable:true,
        hideInSearch:true,
    }
    const Residence:ColumnsType = {
        title:"",
        dataIndex:"residence",
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
        PatientId,
        Name,
        Birthday,
        Age,
        Mobile,
        Gender,
        IdType,
        IdNumber,
        Nation,
        Education,
        Domicile,
        Residence,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useHisPatient