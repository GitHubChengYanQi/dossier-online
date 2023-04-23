/**
 * 检查分组编辑页
 *
 * @author
 * @Date 2023-04-14 11:48:58
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useMedicalGroupField from "../schema";
import {saveMedicalGroup, getMedicalGroupInfo} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";

type MedicalGroupEditProps<T> = {
    medicalGroupId: number;
} & FormWrapProps<T>
const MedicalGroupEdit = <T extends Record<string, any>>(props: MedicalGroupEditProps<T>) => {
    const {medicalGroupId, type, open, onSuccess,onClose,width} = props;
    const {
        MedicalGroupId,
        Name,
        Code,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalGroupField();
    const columns = [
        MedicalGroupId,
        Name,
        Code,
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
                return getMedicalGroupInfo(medicalGroupId);
            }}
            onFinish={async (values) => {
                const response = await saveMedicalGroup(medicalGroupId, values);
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

export default MedicalGroupEdit;
