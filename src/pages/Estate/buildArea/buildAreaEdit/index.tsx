/**
 * 房屋管理-小区表编辑页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useBuildAreaField from "../schema";
import { saveBuildArea,getBuildAreaInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type BuildAreaEditProps<T> = {
    id:number
} & FormWrapProps<T>

const BuildAreaEdit = <T extends Record<string, any>>(props: BuildAreaEditProps<T>) => {
    const { id, type, open , onSuccess, onClose, width } = props;
    const {
          Id,
          Name,
          Inputtime,
          Updatetime,
          Province,
          Display,
          GasType,
          City,
          County,
          Identifying,
          No,
          Customerservice,
        } = useBuildAreaField();
    const columns = [
        Id,
        Name,
        Inputtime,
        Updatetime,
        Province,
        Display,
        GasType,
        City,
        County,
        Identifying,
        No,
        Customerservice,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getBuildAreaInfo(id);
            }}
            onFinish={async (values) => {
                const response = await saveBuildArea(id, values);
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

export default BuildAreaEdit;
