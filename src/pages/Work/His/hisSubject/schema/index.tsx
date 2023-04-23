/**
 * 科目表字段配置页
 *
 * @author Sing
 * @Date 2023-04-23 21:45:11
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useHisSubject = ()=>{
    const SubjectId:ColumnsType = {
        title:"",
        dataIndex:"subjectId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const SubjectName:ColumnsType = {
        title:"科目名称",
        dataIndex:"subjectName",
    }
    const Sort:ColumnsType = {
        title:"排序",
        dataIndex:"sort",
        valueType:"digit",
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
        SubjectId,
        SubjectName,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useHisSubject