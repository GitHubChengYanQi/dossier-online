/**
 * 检查编辑页
 *
 * @author
 * @Date 2023-04-20 10:18:26
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useMedicalField from "../schema";
import {saveMedical, getMedicalInfo} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import useMedicalBind from "@/pages/Work/Medical/medicalBind/schema";
import {ColumnsType} from "@/types/common";

type MedicalEditProps<T> = {
    medicalId: number
} & FormWrapProps<T>

const MedicalEdit = <T extends Record<string, any>>(props: MedicalEditProps<T>) => {
    const {medicalId, type, open, onSuccess, onClose, width} = props;
    const {
        Title,
        Sort
    } = useMedicalField();

    const {MedicalGroupId} = useMedicalBind()

    const columns: ColumnsType[] = [
        Title,
        {
            title: "选择分组",
            dataIndex: "medicalGroupId",
            formItemProps:{
                rules:[
                    {
                        required:true,message:"请至少选择一条分组"
                    }
                ]
            },
            valueType: "formList",
            columns: [
                MedicalGroupId
            ]
        },
        Sort
    ];

    const {error, notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getMedicalInfo(medicalId);
            }}
            onFinish={async (values) => {
                const response = await saveMedical(medicalId, values);
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

export default MedicalEdit;
