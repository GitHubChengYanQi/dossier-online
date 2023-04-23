/**
 * 检查项目配置编辑页
 *
 * @author
 * @Date 2023-04-14 11:48:58
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useMedicalItemField from "../schema";
import {saveMedicalItem, getMedicalItemInfo} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import {ColumnsType} from "@/types/common";

type MedicalItemEditProps<T> = {
    medicalItemId: number;
} & FormWrapProps<T>

const MedicalItemEdit = <T extends Record<string, any>>(props: MedicalItemEditProps<T>) => {

    const {medicalItemId, type, open, onSuccess, onClose, width} = props;

    const {
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
    } = useMedicalItemField();

    const columns: ColumnsType[] = [
        MedicalGroupId,
        Title,
        Type,
        {
            valueType: "dependency",
            name: ["type"],
            columns: ({type}) => {
                switch (type) {
                    case "select":
                    case "radio":
                    case "checkbox":
                        return [Config];
                    default:
                        return [];
                }

            }
        },
        Sort,
    ];

    const {error, notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                if(medicalItemId===0){
                    return {
                        config:[{}]
                    }
                }
                return getMedicalItemInfo(medicalItemId);
            }}
            onFinish={async (values) => {
                // console.log(values)
                const response = await saveMedicalItem(medicalItemId, values);
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

export default MedicalItemEdit;
