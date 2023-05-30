/**
 * 部门负责小区分区设置编辑页
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useRepairDeptManageField from "../schema";
import { saveRepairDeptManage,getRepairDeptManageInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type RepairDeptManageEditProps<T> = {
    repairDeptManageId:number
} & FormWrapProps<T>

const RepairDeptManageEdit = <T extends Record<string, any>>(props: RepairDeptManageEditProps<T>) => {
    const { repairDeptManageId, type, open , onSuccess, onClose, width } = props;
    const {
          RepairDeptManageId,
          DeptId,
          AreaId,
          PartitionId,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useRepairDeptManageField();
    const columns = [
        RepairDeptManageId,
        DeptId,
        AreaId,
        PartitionId,
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
                return getRepairDeptManageInfo(repairDeptManageId);
            }}
            onFinish={async (values) => {
                const response = await saveRepairDeptManage(repairDeptManageId, values);
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

export default RepairDeptManageEdit;
