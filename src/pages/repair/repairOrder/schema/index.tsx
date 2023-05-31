/**
 * 报修字段配置页
 *
 * @author Sing
 * @Date 2023-05-19 11:41:59
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";
import {getSelectDictSchema} from "@/components/sysCompoents/selectDict";

const useRepairOrder = () => {
    const RepairId: ColumnsType = {
        title: "",
        dataIndex: "repairId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const RepairNo: ColumnsType = {
        title: "工单号",
        dataIndex: "repairNo",
        hideInForm: true,
    }
    const ServiceType: ColumnsType = {
        title: "",
        dataIndex: "serviceType",
        hideInForm: true,
        hideInTable:true,
        hideInSearch: true,
    }
    const AppealType: ColumnsType = {
        title: "",
        dataIndex: "appealType",
        hideInForm: true,
        hideInTable:true,
        hideInSearch: true,
    }
    const MethodType: ColumnsType = {
        title: "",
        dataIndex: "methodType",
        hideInForm: true,
        hideInTable:true,
        hideInSearch: true,
    }
    const RepairPosition: ColumnsType = getSelectDictSchema({
        dataIndex: "repairPosition",
        title:"报修位置",
        formItemProps:{
            rules:[
                {
                    required:true,message:"报修位置为必选"
                }
            ]
        },
        params: {
            dictTypeCode: "repairPosition"
        },
        keyConfig:{
            valueName:"code"
        }
    });
    const RepairTypeId: ColumnsType = {
        title: "报修类型",
        dataIndex: "repairTypeId",
        hideInTable: true,

    }
    const Content: ColumnsType = {
        title: "报修内容",
        dataIndex: "content",
        valueType: "textarea",
        hideInSearch: true,

    }
    const Remarks: ColumnsType = {
        title: "备注说明",
        dataIndex: "remarks",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Time: ColumnsType = {
        title: "预约时间",
        dataIndex: "time",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const TimeSpanId: ColumnsType = {
        title: "预约时段",
        dataIndex: "timeSpanId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const From: ColumnsType = {
        title: "来源",
        dataIndex: "from",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Uuid: ColumnsType = {
        title: "用户",
        dataIndex: "uuid",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Name: ColumnsType = {
        title: "联系人",
        dataIndex: "name",
    }
    const Phone: ColumnsType = {
        title: "联系电话",
        dataIndex: "phone",
    }
    const ProjectId: ColumnsType = {
        title: "所属部门",
        dataIndex: "projectId",
        hideInForm: true,
    }
    const Status: ColumnsType = {
        title: "状态",
        dataIndex: "status",
        hideInForm: true,
        hideInSearch: true,
    }
    const EvaluateTime: ColumnsType = {
        title: "",
        dataIndex: "evaluateTime",
        valueType: "dateTime",
        hideInForm: true,
    }
    const VisitTime: ColumnsType = {
        title: "",
        dataIndex: "visitTime",
        valueType: "dateTime",
        hideInForm: true,
    }
    const FinishTime: ColumnsType = {
        title: "",
        dataIndex: "finishTime",
        valueType: "dateTime",
        hideInForm: true,
    }
    const Version: ColumnsType = {
        title: "",
        dataIndex: "version",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const CreateTime: ColumnsType = {
        title: "报修时间",
        dataIndex: "createTime",
        valueType: "dateTime",
        hideInForm: true,
    }
    const CreateUser: ColumnsType = {
        title: "",
        dataIndex: "createUser",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const UpdateTime: ColumnsType = {
        title: "",
        dataIndex: "updateTime",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const UpdateUser: ColumnsType = {
        title: "",
        dataIndex: "updateUser",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Display: ColumnsType = {
        title: "",
        dataIndex: "display",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    return {
        RepairId,
        RepairNo,
        ServiceType,
        AppealType,
        MethodType,
        RepairPosition,
        RepairTypeId,
        Content,
        Remarks,
        Time,
        TimeSpanId,
        From,
        Uuid,
        Name,
        Phone,
        ProjectId,
        Status,
        EvaluateTime,
        VisitTime,
        FinishTime,
        Version,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    }
}
export default useRepairOrder