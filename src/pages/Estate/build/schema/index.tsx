/**
 * 房屋管理-房间表字段配置页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import {request} from "@/utils/Request";
import {ColumnsType} from "@/types/common";

const useBuild = ()=>{
    const Id:ColumnsType = {
        title:"",
        dataIndex:"id",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const EstateId:ColumnsType = {
        title:"",
        dataIndex:"estateId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const CommonAreaId:ColumnsType = {
        title:"",
        dataIndex:"commonAreaId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const BuildAreaId:ColumnsType = {
        title:"",
        dataIndex:"buildAreaId",
        hideInForm:true,
        hideInTable:true,
    }
    const BuildPartitionId:ColumnsType = {
        title:"",
        dataIndex:"buildPartitionId",
        hideInForm:true,
        hideInTable:true,
    }
    const BuildTypeId:ColumnsType = {
        title:"",
        dataIndex:"buildTypeId",
        hideInForm:true,
        hideInTable:true,
    }
    const BuildStatusId:ColumnsType = {
        title:"",
        dataIndex:"buildStatusId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Name:ColumnsType = {
        title:"",
        dataIndex:"name",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Bn:ColumnsType = {
        title:"",
        dataIndex:"bn",
        hideInForm:true,
        hideInTable:true,
    }
    const BnNo:ColumnsType = {
        title:"",
        dataIndex:"bnNo",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Unit:ColumnsType = {
        title:"",
        dataIndex:"unit",
        hideInForm:true,
        hideInTable:true,
    }
    const Floor:ColumnsType = {
        title:"",
        dataIndex:"floor",
        hideInForm:true,
        hideInTable:true,
    }
    const Number:ColumnsType = {
        title:"",
        dataIndex:"number",
        hideInForm:true,
        hideInTable:true,
    }
    const Address:ColumnsType = {
        title:"",
        dataIndex:"address",
        hideInForm:true,
        hideInTable:true,
    }
    const Acreage:ColumnsType = {
        title:"",
        dataIndex:"acreage",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const TrueAcreage:ColumnsType = {
        title:"",
        dataIndex:"trueAcreage",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const FalseAcreage:ColumnsType = {
        title:"",
        dataIndex:"falseAcreage",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Openid:ColumnsType = {
        title:"",
        dataIndex:"openid",
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
    const Inputtime:ColumnsType = {
        title:"",
        dataIndex:"inputtime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Updatetime:ColumnsType = {
        title:"",
        dataIndex:"updatetime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Remarks:ColumnsType = {
        title:"",
        dataIndex:"remarks",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const UniqueChar:ColumnsType = {
        title:"",
        dataIndex:"uniqueChar",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Phone:ColumnsType = {
        title:"",
        dataIndex:"phone",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Numid:ColumnsType = {
        title:"",
        dataIndex:"numid",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Urgent:ColumnsType = {
        title:"",
        dataIndex:"urgent",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const OwnerName:ColumnsType = {
        title:"",
        dataIndex:"ownerName",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const IsGas:ColumnsType = {
        title:"",
        dataIndex:"isGas",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const IsProperty:ColumnsType = {
        title:"",
        dataIndex:"isProperty",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const IsHeating:ColumnsType = {
        title:"",
        dataIndex:"isHeating",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Key:ColumnsType = {
        title:"",
        dataIndex:"key",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Qgp:ColumnsType = {
        title:"",
        dataIndex:"qgp",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const IntoTime:ColumnsType = {
        title:"",
        dataIndex:"intoTime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const DeliveryTime:ColumnsType = {
        title:"",
        dataIndex:"deliveryTime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const Subarea:ColumnsType = {
        title:"",
        dataIndex:"subarea",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const NewTime:ColumnsType = {
        title:"",
        dataIndex:"newTime",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const HousekeeperId:ColumnsType = {
        title:"",
        dataIndex:"housekeeperId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    const ProjectId:ColumnsType = {
        title:"",
        dataIndex:"projectId",
        hideInForm:true,
        hideInTable:true,
        hideInSearch:true,
    }
    return {
        Id,
        EstateId,
        CommonAreaId,
        BuildAreaId,
        BuildPartitionId,
        BuildTypeId,
        BuildStatusId,
        Name,
        Bn,
        BnNo,
        Unit,
        Floor,
        Number,
        Address,
        Acreage,
        TrueAcreage,
        FalseAcreage,
        Openid,
        Display,
        Inputtime,
        Updatetime,
        Remarks,
        UniqueChar,
        Phone,
        Numid,
        Urgent,
        OwnerName,
        IsGas,
        IsProperty,
        IsHeating,
        Key,
        Qgp,
        IntoTime,
        DeliveryTime,
        Subarea,
        NewTime,
        HousekeeperId,
        ProjectId,
    }
}
export default useBuild