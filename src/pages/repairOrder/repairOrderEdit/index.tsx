/**
 * 报修编辑页
 *
 * @author Sing
 * @Date 2023-05-19 11:41:59
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useRepairOrderField from "../schema";
import { getRepairOrderInfo} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import {request} from "@/utils/Request";
import {getSelectDictSchema} from "@/components/sysCompoents/selectDict";
import {ColumnsType} from "@/types/common";

type RepairOrderEditProps<T> = {
    repairId: number
} & FormWrapProps<T>

const RepairOrderEdit = <T extends Record<string, any>>(props: RepairOrderEditProps<T>) => {
    const {repairId, type, open, onSuccess, onClose, width} = props;
    const {
        RepairId,
        RepairNo,
        ServiceType,
        AppealType,
        MethodType,
        RepairPosition,
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
    } = useRepairOrderField();
    const columns:ColumnsType[] = [
        RepairId,
        RepairNo,
        ServiceType,
        AppealType,
        MethodType,
        RepairPosition,
        {
            valueType: "dependency",
            name: ["repairPosition"],
            columns: ({repairPosition}) => {
                return [
                    getSelectDictSchema({
                        title: "报修类型",
                        dataIndex: "repairTypeId",
                        hideInTable: true,
                        params: {
                            dictTypeId: "1661295042926710786",
                            parentId:repairPosition
                        }
                    })
                ]
            }
        },
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
    ];

    const {error, notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getRepairOrderInfo(repairId);
            }}
            onFinish={async (values) => {
                // const response = await saveRepairOrder(repairId, values);
                const response = await request("/audit/create", {
                    data: {
                        type: "repair",
                        data: values
                    }
                })
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </FormWrap>
    );
};

export default RepairOrderEdit;
