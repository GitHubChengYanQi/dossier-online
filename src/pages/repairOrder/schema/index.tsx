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
        title: "",
        dataIndex: "repairNo",
        hideInForm: true,
    }
    const ServiceType: ColumnsType = {
        title: "",
        dataIndex: "serviceType",
        hideInForm: true,
    }
    const AppealType: ColumnsType = {
        title: "",
        dataIndex: "appealType",
        hideInForm: true,
    }
    const MethodType: ColumnsType = {
        title: "",
        dataIndex: "methodType",
        hideInForm: true,
    }
    const RepairPosition: ColumnsType = getSelectDictSchema({
        dataIndex: "repairPosition",
        params: {
            dictTypeId: "1659939293147312129"
        }
    });
    const RepairTypeId: ColumnsType = {
        title: "报修类型",
        dataIndex: "repairTypeId",
        hideInTable: true,
    }
    const Content: ColumnsType = {
        title: "保修内容",
        dataIndex: "content",
        valueType: "textarea",
        hideInTable: true,

    }
    const Remarks: ColumnsType = {
        title: "",
        dataIndex: "remarks",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Time: ColumnsType = {
        title: "",
        dataIndex: "time",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const TimeSpanId: ColumnsType = {
        title: "",
        dataIndex: "timeSpanId",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const From: ColumnsType = {
        title: "",
        dataIndex: "from",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Uuid: ColumnsType = {
        title: "",
        dataIndex: "uuid",
        hideInForm: true,
        hideInTable: true,
        hideInSearch: true,
    }
    const Name: ColumnsType = {
        title: "",
        dataIndex: "name",
        hideInForm: true,
    }
    const Phone: ColumnsType = {
        title: "",
        dataIndex: "phone",
        hideInForm: true,
    }
    const ProjectId: ColumnsType = {
        title: "",
        dataIndex: "projectId",
        hideInForm: true,
    }
    const Status: ColumnsType = {
        title: "",
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
        title: "",
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