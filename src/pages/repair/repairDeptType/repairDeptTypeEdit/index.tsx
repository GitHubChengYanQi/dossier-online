/**
 * 编辑页
 *
 * @author Sing
 * @Date 2023-05-29 09:49:34
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useRepairDeptTypeField from "../schema";
import { saveRepairDeptType,getRepairDeptTypeInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type RepairDeptTypeEditProps<T> = {
    repairDeptTypeId:number
} & FormWrapProps<T>

const RepairDeptTypeEdit = <T extends Record<string, any>>(props: RepairDeptTypeEditProps<T>) => {
    const { repairDeptTypeId, type, open , onSuccess, onClose, width } = props;
    const {
          RepairDeptTypeId,
          DeptId,
          DictCode,
          CreateTime,
          UpdateTime,
          CreateUser,
          UpdateUser,
        } = useRepairDeptTypeField();
    const columns = [
        RepairDeptTypeId,
        DeptId,
        DictCode,
        CreateTime,
        UpdateTime,
        CreateUser,
        UpdateUser,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getRepairDeptTypeInfo(repairDeptTypeId);
            }}
            onFinish={async (values) => {
                const response = await saveRepairDeptType(repairDeptTypeId, values);
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

export default RepairDeptTypeEdit;
