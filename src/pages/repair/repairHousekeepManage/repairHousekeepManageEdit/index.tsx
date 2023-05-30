/**
 * 房屋的管家设置编辑页
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useRepairHousekeepManageField from "../schema";
import { saveRepairHousekeepManage,getRepairHousekeepManageInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type RepairHousekeepManageEditProps<T> = {
    repairDeptManageId:number
} & FormWrapProps<T>

const RepairHousekeepManageEdit = <T extends Record<string, any>>(props: RepairHousekeepManageEditProps<T>) => {
    const { repairDeptManageId, type, open , onSuccess, onClose, width } = props;
    const {
          RepairDeptManageId,
          UserId,
          AreaId,
          PartitionId,
          Bn,
          Unit,
          Floor,
          IsMain,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useRepairHousekeepManageField();
    const columns = [
        RepairDeptManageId,
        UserId,
        AreaId,
        PartitionId,
        Bn,
        Unit,
        Floor,
        IsMain,
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
                return getRepairHousekeepManageInfo(repairDeptManageId);
            }}
            onFinish={async (values) => {
                const response = await saveRepairHousekeepManage(repairDeptManageId, values);
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

export default RepairHousekeepManageEdit;
