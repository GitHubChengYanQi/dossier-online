/**
 * 编辑页
 *
 * @author Sing
 * @Date 2023-05-15 18:42:10
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useActivitiField from "../schema";
import { saveActiviti,getActivitiInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type ActivitiEditProps<T> = {
    activitiId:number
} & FormWrapProps<T>

const ActivitiEdit = <T extends Record<string, any>>(props: ActivitiEditProps<T>) => {
    const { activitiId, type, open , onSuccess, onClose, width } = props;
    const {
          ActivitiId,
          Name,
          Type,
          Id,
          Config,
          Version,
          Remark,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useActivitiField();
    const columns = [
        ActivitiId,
        Name,
        Type,
        Id,
        Config,
        Version,
        Remark,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            title={"新建流程"}
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getActivitiInfo(activitiId);
            }}
            onFinish={async (values) => {
                const response = await saveActiviti(activitiId, values);
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

export default ActivitiEdit;
