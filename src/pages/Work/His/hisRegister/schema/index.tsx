/**
 * 挂号信息字段配置页
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useHisRegister = ()=>{
    const RegisterId:ColumnsType = {
        title:"",
        dataIndex:"registerId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Department:ColumnsType = {
        title:"科室",
        dataIndex:"department",
    }
    const Doctor:ColumnsType = {
        title:"医生",
        dataIndex:"doctor",
    }
    const NumberType:ColumnsType = {
        title:"号别",
        dataIndex:"numberType",
        valueType:"radio",
        debounceTime: 500,
        request: async (data)=>{
            const response = await request("/medicalBind/listSelect",data);
            return response.data;
        },
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
        RegisterId,
        Department,
        Doctor,
        NumberType,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useHisRegister