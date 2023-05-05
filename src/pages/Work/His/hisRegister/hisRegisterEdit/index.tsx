/**
 * 挂号信息编辑页
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useHisRegisterField from "../schema";
import { saveHisRegister,getHisRegisterInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type HisRegisterEditProps<T> = {
    registerId:number
} & FormWrapProps<T>

const HisRegisterEdit = <T extends Record<string, any>>(props: HisRegisterEditProps<T>) => {
    const { registerId, type, open , onSuccess, onClose, width } = props;
    const {
          RegisterId,
          Department,
          Doctor,
          NumberType,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useHisRegisterField();
    const columns = [
        RegisterId,
        Department,
        Doctor,
        NumberType,
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
                return getHisRegisterInfo(registerId);
            }}
            onFinish={async (values) => {
                const response = await saveHisRegister(registerId, values);
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

export default HisRegisterEdit;
