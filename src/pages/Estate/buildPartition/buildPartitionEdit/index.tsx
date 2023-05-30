/**
 * 房屋管理-分区表编辑页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useBuildPartitionField from "../schema";
import {saveBuildPartition, getBuildPartitionInfo} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";

type BuildPartitionEditProps<T> = {
    partitionId: number
} & FormWrapProps<T>

const BuildPartitionEdit = <T extends Record<string, any>>(props: BuildPartitionEditProps<T>) => {
    const {partitionId, type, open, onSuccess, onClose, width} = props;
    const {
        Id,
        Name,
        Display,
        Inputtime,
        Updatetime,
        BuildAreaId,
        GasMonthSet,
        GasMonthSetValue,
        No,
    } = useBuildPartitionField();
    const columns = [
        Id,
        Name,
        Display,
        Inputtime,
        Updatetime,
        BuildAreaId,
        GasMonthSet,
        GasMonthSetValue,
        No,
    ];

    const {error, notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getBuildPartitionInfo(partitionId);
            }}
            onFinish={async (values) => {
                const response = await saveBuildPartition(partitionId, values);
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

export default BuildPartitionEdit;
