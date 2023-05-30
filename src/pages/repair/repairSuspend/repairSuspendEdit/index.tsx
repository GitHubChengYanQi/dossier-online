/**
 * 工单挂起类型编辑页
 *
 * @author Sing
 * @Date 2023-05-30 15:15:48
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useRepairSuspendField from "../schema";
import { saveRepairSuspend,getRepairSuspendInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type RepairSuspendEditProps<T> = {
    suspendId:number
} & FormWrapProps<T>

const RepairSuspendEdit = <T extends Record<string, any>>(props: RepairSuspendEditProps<T>) => {
    const { suspendId, type, open , onSuccess, onClose, width } = props;
    const {
          SuspendId,
          RepairSuspend,
          Day,
          Sort,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useRepairSuspendField();
    const columns = [
        SuspendId,
        RepairSuspend,
        Day,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getRepairSuspendInfo(suspendId);
            }}
            onFinish={async (values) => {
                const response = await saveRepairSuspend(suspendId, values);
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

export default RepairSuspendEdit;
