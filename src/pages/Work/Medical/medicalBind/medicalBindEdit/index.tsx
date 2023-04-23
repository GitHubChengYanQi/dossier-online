/**
 * 编辑页
 *
 * @author 
 * @Date 2023-04-20 10:18:26
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useMedicalBindField from "../schema";
import { saveMedicalBind,getMedicalBindInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type MedicalBindEditProps<T> = {
    medicalBindId:number
} & FormWrapProps<T>

const MedicalBindEdit = <T extends Record<string, any>>(props: MedicalBindEditProps<T>) => {
    const { medicalBindId, type, open , onSuccess } = props;
    const {
          MedicalBindId,
          MedicalGroupId,
          Sort,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useMedicalBindField();
    const columns = [
        MedicalBindId,
        MedicalGroupId,
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
            request={async () => {
                return getMedicalBindInfo(medicalBindId);
            }}
            onFinish={async (values) => {
                const response = await saveMedicalBind(medicalBindId, values);
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

export default MedicalBindEdit;
